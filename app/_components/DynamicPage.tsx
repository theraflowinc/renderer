// Renderizza una pagina generata da Claude.
// Il contenuto è HTML puro salvato in project_pages.content.html

interface PageContent {
  type: "html" | "template";
  html?: string;
  css?: string;
  template?: string;
}

interface Page {
  id: string;
  title: string;
  content: Record<string, unknown>;
  seo: Record<string, unknown>;
}

interface Project {
  id: string;
  name: string;
}

export default function DynamicPage({ page, project }: { page: Page; project: Project }) {
  const content = page.content as unknown as PageContent;
  const seo = page.seo as { description?: string; og_image?: string };

  const html = content?.html ?? "";
  const css = content?.css ?? "";

  return (
    <>
      {css && (
        <style
          // biome-ignore lint/security/noDangerouslySetInnerHtml: CSS da Claude controllato lato server
          dangerouslySetInnerHTML={{ __html: css }}
        />
      )}
      <div
        // biome-ignore lint/security/noDangerouslySetInnerHtml: HTML da Claude controllato lato server
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}
