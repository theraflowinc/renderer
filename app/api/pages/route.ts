// API usata da Claude SDK per creare/aggiornare pagine di un progetto.
// Claude genera HTML+CSS e chiama questo endpoint per salvarlo e pubblicarlo.
import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-webhook-secret");
  if (!process.env.WEBHOOK_SECRET || secret !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { project_id, slug, title, html, css, seo, published } = body;

  if (!project_id || !slug || !html) {
    return NextResponse.json({ error: "project_id, slug e html sono obbligatori" }, { status: 400 });
  }

  const content = { type: "html", html, css: css ?? "" };
  const seoData = seo ?? {};

  // Upsert: crea o aggiorna la pagina
  const { data, error } = await supabaseServer
    .from("project_pages")
    .upsert(
      {
        project_id,
        slug,
        title: title ?? slug,
        content,
        seo: seoData,
        published: published ?? true,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "project_id,slug" }
    )
    .select("id, slug, title, published")
    .single();

  if (error) {
    console.error("[pages]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, page: data });
}

export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-webhook-secret");
  if (!process.env.WEBHOOK_SECRET || secret !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const project_id = req.nextUrl.searchParams.get("project_id");
  if (!project_id) return NextResponse.json({ error: "project_id richiesto" }, { status: 400 });

  const { data, error } = await supabaseServer
    .from("project_pages")
    .select("id, slug, title, published, updated_at")
    .eq("project_id", project_id)
    .order("updated_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ pages: data });
}
