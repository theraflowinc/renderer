import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

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

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const subdomainMatch = host.match(/^([a-z0-9-]+)\.theraflow\.site$/);
  if (!subdomainMatch) return NextResponse.next();

  const subdomain = subdomainMatch[1];
  if (subdomain === "www" || subdomain === "theraflow" || subdomain === "api") {
    return NextResponse.next();
  }

  // Salta route API e file statici
  const path = request.nextUrl.pathname;
  if (path.startsWith("/api/") || path.startsWith("/_next/") || path.includes(".")) {
    return NextResponse.next();
  }
  if (host === "teacher-planner.theraflow.site") {
    const newUrl = `https://www.teacherplanner.app${request.nextUrl.pathname}${request.nextUrl.search}`;
    return NextResponse.redirect(newUrl, { status: 301 });
  }
      const isTheraflowHost = host.endsWith(".theraflow.site");
    if (!isTheraflowHost) {
      const sbCustom = createClient(SUPABASE_URL, SERVICE_KEY);
      const { data: customProject } = await sbCustom
        .from("projects")
        .select("id, name, framework")
        .eq("custom_domain", host)
        .eq("framework", "react")
        .maybeSingle();
      if (customProject) return serveReactProject(sbCustom, customProject as any, request);
    }
  const sb = createClient(SUPABASE_URL, SERVICE_KEY);

  const { data: project } = await sb
    .from("projects")
    .select("id, name, framework")
    .eq("slug", subdomain)
    .maybeSingle();

  if (!project || (project as any).framework !== "react") {
    return NextResponse.next();
  }

  // Progetto React: serve build pubblicata
  const { data: build } = await sb
    .from("project_builds")
    .select("bundle_js, bundle_css")
    .eq("project_id", project.id)
    .eq("status", "ready")
    .not("published_at", "is", null)
    .order("published_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!build) {
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>${project.name}</title></head><body style="font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#f8fafc"><div style="text-align:center"><h1 style="color:#1e293b">${project.name}</h1><p style="color:#94a3b8">Nessuna versione pubblicata. Apri il pannello e clicca Pubblica.</p></div></body></html>`;
    return new NextResponse(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  }

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

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
