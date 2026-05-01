import { headers } from "next/headers";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export default async function Page() {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];

  if (subdomain === "theraflow" || subdomain === "www" || !subdomain) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">TheraFlow</h1>
          <p className="text-xl opacity-80">La tua piattaforma centralizzata</p>
        </div>
      </main>
    );
  }

  const { data: project } = await supabase
    .from("projects")
    .select("*, workspaces(name)")
    .eq("slug", subdomain)
    .single();

  if (!project) return notFound();

  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">{project.name}</h1>
        <p className="text-xl text-gray-500">{project.category}</p>
      </div>
    </main>
  );
}
