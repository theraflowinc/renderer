import { headers } from "next/headers";
import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `https://${host}/sitemap.xml`,
  };
}
