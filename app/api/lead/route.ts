import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { project_id, nome, cognome, telefono, email, citta, provincia, via, cap, interno, pagamento } = body;

  if (!project_id || !nome || !telefono) {
    return NextResponse.json({ error: "Dati mancanti" }, { status: 400 });
  }

  const { error } = await supabaseServer.from("project_leads").insert({
    project_id,
    data: { nome, cognome, telefono, email, citta, provincia, via, cap, interno, pagamento },
  });

  if (error) {
    console.error("[lead]", error);
    return NextResponse.json({ error: "Errore salvataggio" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
