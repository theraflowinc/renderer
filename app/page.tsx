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

  // 2. Progetto React → serve bundle da project_builds
  if ((project as any).framework === "react") {
    const { data: build } = await supabaseServer
      .from("project_builds")
      .select("bundle_js, bundle_css")
      .eq("project_id", project.id)
      .eq("status", "ready")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (build) {
      const IMPORT_MAP = {
        "react": "https://esm.sh/react@18.3.1",
        "react/jsx-runtime": "https://esm.sh/react@18.3.1/jsx-runtime",
        "react-dom": "https://esm.sh/react-dom@18.3.1?external=react",
        "react-dom/client": "https://esm.sh/react-dom@18.3.1/client?external=react",
        "react-router-dom": "https://esm.sh/react-router-dom@6.28.2?external=react",
        "react-router": "https://esm.sh/react-router@6.28.2?external=react",
        "lucide-react": "https://esm.sh/lucide-react@0.462.0?external=react",
        "framer-motion": "https://esm.sh/framer-motion@11.3.0?external=react",
        "clsx": "https://esm.sh/clsx@2.1.1",
        "class-variance-authority": "https://esm.sh/class-variance-authority@0.7.1",
        "tailwind-merge": "https://esm.sh/tailwind-merge@2.5.4",
        "@radix-ui/react-slot": "https://esm.sh/@radix-ui/react-slot@1.1.0?external=react",
        "@radix-ui/react-dialog": "https://esm.sh/@radix-ui/react-dialog@1.1.3?external=react",
        "@radix-ui/react-dropdown-menu": "https://esm.sh/@radix-ui/react-dropdown-menu@2.1.3?external=react",
        "@radix-ui/react-tabs": "https://esm.sh/@radix-ui/react-tabs@1.1.1?external=react",
        "@radix-ui/react-select": "https://esm.sh/@radix-ui/react-select@2.1.3?external=react",
        "@radix-ui/react-checkbox": "https://esm.sh/@radix-ui/react-checkbox@1.1.3?external=react",
        "@radix-ui/react-switch": "https://esm.sh/@radix-ui/react-switch@1.1.2?external=react",
        "@radix-ui/react-tooltip": "https://esm.sh/@radix-ui/react-tooltip@1.1.5?external=react",
        "@radix-ui/react-popover": "https://esm.sh/@radix-ui/react-popover@1.1.3?external=react",
        "@radix-ui/react-separator": "https://esm.sh/@radix-ui/react-separator@1.1.0?external=react",
        "@radix-ui/react-label": "https://esm.sh/@radix-ui/react-label@2.1.0?external=react",
        "@radix-ui/react-avatar": "https://esm.sh/@radix-ui/react-avatar@1.1.2?external=react",
        "@radix-ui/react-accordion": "https://esm.sh/@radix-ui/react-accordion@1.2.2?external=react",
        "@radix-ui/react-progress": "https://esm.sh/@radix-ui/react-progress@1.1.0?external=react",
      };
      const html = `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>${project.name}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script type="importmap">${JSON.stringify({ imports: IMPORT_MAP })}</script>
  ${build.bundle_css ? `<style>${build.bundle_css}</style>` : ""}
</head>
<body>
  <div id="root"></div>
  <script type="module">${build.bundle_js}</script>
</body>
</html>`;
      return new Response(html, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
        },
      }) as any;
    }

    // Build non ancora pronta
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center max-w-md px-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">{project.name}</h1>
          <p className="text-slate-400 text-sm">Build in corso, ricarica tra qualche secondo.</p>
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
