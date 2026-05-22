import { headers } from "next/headers";
import { supabaseServer } from "@/lib/supabase";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import FunnelSegretarie from "./_templates/FunnelSegretarie";
import DynamicPage from "./_components/DynamicPage";

async function getProjectAndPage() {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const isTheraflowHost = host.endsWith(".theraflow.site") || host === "theraflow.site";
  const subdomain = host.split(".")[0];
  const projectQuery = supabaseServer.from("projects").select("*, workspaces(name)").eq("status", "live").limit(1);
  const { data: project } = isTheraflowHost
    ? await projectQuery.eq("slug", subdomain).maybeSingle()
    : await projectQuery.eq("custom_domain", host).maybeSingle();
  if (!project) return { project: null, page: null };
  const { data: page } = await supabaseServer
    .from("project_pages").select("*")
    .eq("project_id", project.id).eq("slug", "/").eq("published", true).maybeSingle();
  return { project, page };
}

export async function generateMetadata(): Promise<Metadata> {
  const { project, page } = await getProjectAndPage();
  if (!project) return {};
  const seo = (page?.seo ?? {}) as { title?: string; description?: string; og_image?: string };
  const title = seo.title ?? project.name ?? "TheraFlow";
  const description = seo.description ?? "";
  const ogImage = seo.og_image ?? "";
  return {
    title,
    description: description || undefined,
    openGraph: { title, description: description || undefined, images: ogImage ? [ogImage] : [] },
  };
}

export default async function Page() {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const isTheraflowHost = host.endsWith(".theraflow.site") || host === "theraflow.site";
  const subdomain = host.split(".")[0];

  if (isTheraflowHost && (subdomain === "theraflow" || subdomain === "www" || !subdomain)) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">TheraFlow</h1>
          <p className="text-xl opacity-80">La tua piattaforma centralizzata</p>
        </div>
      </main>
    );
  }

  const projectQuery = supabaseServer.from("projects").select("*, workspaces(name)").eq("status", "live").limit(1);
  const { data: project } = isTheraflowHost
    ? await projectQuery.eq("slug", subdomain).maybeSingle()
    : await projectQuery.eq("custom_domain", host).maybeSingle();

  if (!project) return notFound();

  // 1. Template hardcoded (blocchi pre-costruiti)
  if (project.template === "funnel-segretarie" || project.slug === "funnel-segretarie") {
    return <FunnelSegretarie projectId={project.id} />;
  }

  // 2. Progetti React → gestiti dal middleware (middleware.ts)
  // Se arriviamo qui per un progetto React, mostra placeholder
  if ((project as any).framework === "react") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center max-w-md px-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">{project.name}</h1>
          <p className="text-slate-400 text-sm">Nessuna versione pubblicata. Apri il pannello e clicca Pubblica.</p>
        </div>
      </main>
    );
  }

  // 3. Pagina dinamica generata da Claude (home page = slug "/")
  const { data: page } = await supabaseServer
    .from("project_pages")
    .select("*")
    .eq("project_id", project.id)
    .eq("slug", "/")
    .eq("published", true)
    .maybeSingle();

  if (page) {
    return <DynamicPage page={page} project={project} />;
  }

  // 4. Placeholder — nessuna pagina ancora
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center max-w-md px-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-100 to-indigo-100 flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 6L22 10V18L14 22L6 18V10L14 6Z" stroke="#6366f1" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="14" cy="14" r="3" fill="#6366f1"/>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">{project.name}</h1>
        <p className="text-slate-400 text-sm">
          Questo progetto è online ma non ha ancora una pagina pubblicata.
          Parla con Claude nel tuo pannello per crearne una.
        </p>
      </div>
    </main>
  );
}
