import { headers } from "next/headers";
import { supabaseServer } from "@/lib/supabase";
import { notFound } from "next/navigation";
import DynamicPage from "../_components/DynamicPage";

export default async function SubPage({ params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const pageSlug = "/" + path.join("/");

  const headersList = await headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];

  if (!subdomain || subdomain === "theraflow" || subdomain === "www") return notFound();

  const { data: project } = await supabaseServer
    .from("projects")
    .select("id, name, status")
    .eq("slug", subdomain)
    .eq("status", "live")
    .maybeSingle();

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
