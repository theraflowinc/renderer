import { headers } from "next/headers";
import { supabaseServer } from "@/lib/supabase";
import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const isTheraflowHost = host.endsWith(".theraflow.site") || host === "theraflow.site";
  const subdomain = host.split(".")[0];

  const projectQuery = supabaseServer.from("projects").select("id, slug").eq("status", "live").limit(1);
  const { data: project } = isTheraflowHost
    ? await projectQuery.eq("slug", subdomain).maybeSingle()
    : await projectQuery.eq("custom_domain", host).maybeSingle();

  if (!project) return [];

  const { data: pages } = await supabaseServer
    .from("project_pages")
    .select("slug, updated_at")
    .eq("project_id", project.id)
    .eq("published", true);

  const base = `https://${host}`;

  return (pages ?? []).map((p) => ({
    url: `${base}${p.slug === "/" ? "" : p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: "weekly" as const,
    priority: p.slug === "/" ? 1 : 0.8,
  }));
}
