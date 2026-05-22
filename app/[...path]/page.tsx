import { headers } from "next/headers";
import { supabaseServer } from "@/lib/supabase";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DynamicPage from "../_components/DynamicPage";

type Props = { params: Promise<{ path: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path } = await params;
  const slug = "/" + path.join("/");
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const isTheraflowHost = host.endsWith(".theraflow.site") || host === "theraflow.site";
  const subdomain = host.split(".")[0];
  const projectQuery = supabaseServer.from("projects").select("id, name, slug").eq("status", "live").limit(1);
  const { data: project } = isTheraflowHost
    ? await projectQuery.eq("slug", subdomain).maybeSingle()
    : await projectQuery.eq("custom_domain", host).maybeSingle();
  if (!project) return {};
  const { data: page } = await supabaseServer
    .from("project_pages").select("title, seo")
    .eq("project_id", project.id).eq("slug", slug).eq("published", true).maybeSingle();
  if (!page) return {};
  const seo = (page.seo ?? {}) as { title?: string; description?: string; og_image?: string };
  const title = seo.title ?? page.title ?? project.name;
  const description = seo.description ?? "";
  return {
    title,
    description: description || undefined,
    openGraph: { title, description: description || undefined, images: seo.og_image ? [seo.og_image] : [] },
  };
}

export default async function SubPage({ params }: Props) {
  const { path } = await params;
  const pageSlug = "/" + path.join("/");

  const headersList = await headers();
  const host = headersList.get("host") || "";
  const isTheraflowHost = host.endsWith(".theraflow.site") || host === "theraflow.site";
  const subdomain = host.split(".")[0];

  if (isTheraflowHost && (!subdomain || subdomain === "theraflow" || subdomain === "www")) return notFound();

  const projectQuery = supabaseServer.from("projects").select("id, name, status").eq("status", "live");
  const { data: project } = isTheraflowHost
    ? await projectQuery.eq("slug", subdomain).maybeSingle()
    : await projectQuery.eq("custom_domain", host).maybeSingle();

  if (!project) return notFound();

  const { data: page } = await supabaseServer
    .from("project_pages")
    .select("*")
    .eq("project_id", project.id)
    .eq("slug", pageSlug)
    .eq("published", true)
    .maybeSingle();

  if (!page) return notFound();

  return <DynamicPage page={page} project={project} />;
}
