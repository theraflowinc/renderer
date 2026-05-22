import { NextRequest, NextResponse } from "next/server";

const VERCEL_TOKEN = process.env.VERCEL_AUTOMATION_TOKEN;
const VERCEL_PROJECT_ID = "renderer";
const VERCEL_TEAM_ID = "theraflowinc-8537s-projects";
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

async function addDomainToVercel(domain: string) {
  const res = await fetch(
    `https://api.vercel.com/v10/projects/${VERCEL_PROJECT_ID}/domains?teamId=${VERCEL_TEAM_ID}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: domain }),
    }
  );
  const data = await res.json();
  if (!res.ok && data?.error?.code !== "domain_already_in_use") {
    throw new Error(data?.error?.message ?? "Vercel error");
  }
  return domain;
}

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-webhook-secret");
  if (!WEBHOOK_SECRET || secret !== WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  // Domini custom (es. miosito.com)
  if (body?.custom_domain) {
    const custom: string = body.custom_domain;
    try {
      const domain = await addDomainToVercel(custom);
      return NextResponse.json({ ok: true, domain });
    } catch (e) {
      return NextResponse.json({ error: String(e) }, { status: 500 });
    }
  }

  // Sottodominio theraflow (comportamento esistente)
  const slug: string | undefined = body?.record?.slug ?? body?.slug;
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }
  try {
    const domain = await addDomainToVercel(`${slug}.theraflow.site`);
    return NextResponse.json({ ok: true, domain });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
