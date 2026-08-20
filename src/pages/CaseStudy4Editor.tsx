import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, Loader2, Save } from "lucide-react";
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  GenericJsxEditor,
  ListsToggle,
  MDXEditor,
  Separator,
  UndoRedo,
  headingsPlugin,
  jsxPlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  type JsxComponentDescriptor,
  type MDXEditorMethods,
  type Translation,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

const editableCaseStudySlugs = new Set([
  "case-study-1",
  "case-study-2",
  "case-study-3",
  "case-study-4",
]);

type EditableCaseStudy = {
  title: string;
  subtitle: string;
  body: string;
};

const readFrontmatterValue = (value: string) => {
  const trimmedValue = value.trim();

  if (trimmedValue.startsWith('"') && trimmedValue.endsWith('"')) {
    try {
      return JSON.parse(trimmedValue) as string;
    } catch {
      return trimmedValue.slice(1, -1);
    }
  }

  if (trimmedValue.startsWith("'") && trimmedValue.endsWith("'")) {
    return trimmedValue.slice(1, -1).replaceAll("''", "'");
  }

  return trimmedValue;
};

const parseCaseStudy = (markdown: string): EditableCaseStudy => {
  const frontmatter = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

  if (!frontmatter) {
    return { title: "Untitled page", subtitle: "", body: markdown };
  }

  const title = frontmatter[1].match(/^title:\s*(.*)$/m)?.[1] ?? "Untitled page";
  const subtitle = frontmatter[1].match(/^subtitle:\s*(.*)$/m)?.[1] ?? "";

  return {
    title: readFrontmatterValue(title),
    subtitle: readFrontmatterValue(subtitle),
    body: markdown.slice(frontmatter[0].length),
  };
};

const serializeCaseStudy = ({ title, subtitle, body }: EditableCaseStudy) =>
  `---\ntitle: ${JSON.stringify(title)}\nsubtitle: ${JSON.stringify(subtitle)}\n---\n\n${body.trim()}\n`;

const headingStyleNames: Record<string, string> = {
  "1": "Display Heading",
  "2": "Large Heading",
  "3": "Medium Heading",
  "4": "Small Heading",
  "5": "Small Text",
  "6": "Muted Text",
};

const designSystemTranslation: Translation = (key, defaultValue, interpolations = {}) => {
  if (key === "toolbar.blockTypes.paragraph") return "Body Text";
  if (key === "toolbar.blockTypes.heading") {
    return headingStyleNames[String(interpolations.level)] ?? defaultValue;
  }
  if (key === "toolbar.blockTypeSelect.placeholder") return "Text style";
  if (key === "toolbar.blockTypeSelect.selectBlockTypeTooltip") return "Select text style";

  return Object.entries(interpolations).reduce(
    (value, [name, replacement]) => value.replaceAll(`{{${name}}}`, String(replacement)),
    defaultValue,
  );
};

const caseStudySectionDescriptor: JsxComponentDescriptor = {
  name: "CaseStudySection",
  kind: "flow",
  props: [
    { name: "title", type: "string", required: true },
    { name: "subheader", type: "string", required: true },
    { name: "image", type: "string" },
    { name: "imageAlt", type: "string" },
    { name: "layout", type: "string" },
  ],
  hasChildren: true,
  Editor: GenericJsxEditor,
};

const caseStudyColumnsDescriptor: JsxComponentDescriptor = {
  name: "CaseStudyColumns",
  kind: "flow",
  props: [{ name: "layout", type: "string" }],
  hasChildren: true,
  Editor: GenericJsxEditor,
};

const caseStudyColumnDescriptor: JsxComponentDescriptor = {
  name: "CaseStudyColumn",
  kind: "flow",
  props: [{ name: "side", type: "string", required: true }],
  hasChildren: true,
  Editor: GenericJsxEditor,
};

const caseStudyImageDescriptor: JsxComponentDescriptor = {
  name: "CaseStudyImage",
  kind: "flow",
  props: [
    { name: "src", type: "string", required: true },
    { name: "alt", type: "string", required: true },
    { name: "heightPercent", type: "string" },
  ],
  hasChildren: false,
  Editor: GenericJsxEditor,
};

const caseStudyQuoteDescriptor: JsxComponentDescriptor = {
  name: "CaseStudyQuote",
  kind: "flow",
  props: [
    { name: "title", type: "string" },
    { name: "variant", type: "string" },
  ],
  hasChildren: true,
  Editor: GenericJsxEditor,
};

const caseStudyTableDescriptor: JsxComponentDescriptor = {
  name: "CaseStudyTable",
  kind: "flow",
  props: [
    { name: "title", type: "string" },
    { name: "headers", type: "expression", required: true },
    { name: "rows", type: "expression", required: true },
  ],
  hasChildren: false,
  Editor: GenericJsxEditor,
};

const CaseStudy4Editor = () => {
  const { caseStudySlug = "" } = useParams();
  const isEditableCaseStudy = editableCaseStudySlugs.has(caseStudySlug);
  const editorApiUrl = `/__mdx-editor/${caseStudySlug}`;
  const caseStudyUrl = `/${caseStudySlug}`;
  const editorRef = useRef<MDXEditorMethods>(null);
  const [savedDocument, setSavedDocument] = useState<EditableCaseStudy | null>(null);
  const [pageTitle, setPageTitle] = useState("");
  const [pageSubtitle, setPageSubtitle] = useState("");
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "saving" | "saved" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isEditableCaseStudy) {
      setMessage("This page does not have an MDX editor.");
      setStatus("error");
      return;
    }

    const controller = new AbortController();

    const loadCaseStudy = async () => {
      try {
        const response = await fetch(editorApiUrl, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(await response.text());
        }

        const caseStudy = parseCaseStudy(await response.text());
        setSavedDocument(caseStudy);
        setPageTitle(caseStudy.title);
        setPageSubtitle(caseStudy.subtitle);
        setDraft(caseStudy.body);
        setStatus("ready");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setMessage(error instanceof Error ? error.message : "Unable to load the case study.");
        setStatus("error");
      }
    };

    void loadCaseStudy();
    return () => controller.abort();
  }, [editorApiUrl, isEditableCaseStudy]);

  useEffect(() => {
    const warnBeforeLeaving = (event: BeforeUnloadEvent) => {
      if (
        savedDocument !== null &&
        (draft !== savedDocument.body ||
          pageTitle !== savedDocument.title ||
          pageSubtitle !== savedDocument.subtitle)
      ) {
        event.preventDefault();
      }
    };

    window.addEventListener("beforeunload", warnBeforeLeaving);
    return () => window.removeEventListener("beforeunload", warnBeforeLeaving);
  }, [draft, pageSubtitle, pageTitle, savedDocument]);

  const plugins = useMemo(
    () => [
      headingsPlugin(),
      listsPlugin(),
      thematicBreakPlugin(),
      linkPlugin(),
      linkDialogPlugin(),
      jsxPlugin({
        jsxComponentDescriptors: [
          caseStudySectionDescriptor,
          caseStudyColumnsDescriptor,
          caseStudyColumnDescriptor,
          caseStudyImageDescriptor,
          caseStudyQuoteDescriptor,
          caseStudyTableDescriptor,
        ],
      }),
      toolbarPlugin({
        toolbarContents: () => (
          <>
            <UndoRedo />
            <Separator />
            <BlockTypeSelect />
            <Separator />
            <BoldItalicUnderlineToggles />
            <Separator />
            <ListsToggle />
            <CreateLink />
          </>
        ),
      }),
    ],
    [],
  );

  const isDirty =
    savedDocument !== null &&
    (draft !== savedDocument.body ||
      pageTitle !== savedDocument.title ||
      pageSubtitle !== savedDocument.subtitle);

  const saveCaseStudy = async () => {
    const caseStudy = {
      title: pageTitle.trim(),
      subtitle: pageSubtitle.trim(),
      body: editorRef.current?.getMarkdown() ?? draft,
    };
    const markdown = serializeCaseStudy(caseStudy);
    setStatus("saving");
    setMessage("");

    try {
      const response = await fetch(editorApiUrl, {
        method: "PUT",
        headers: { "Content-Type": "text/plain; charset=utf-8" },
        body: markdown,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setDraft(caseStudy.body);
      setSavedDocument(caseStudy);
      setStatus("saved");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save the case study.");
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-surface-primary text-text-primary">
      <header className="sticky top-0 z-50 border-b border-border-primary bg-surface-primary/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 sm:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <Link
              to={caseStudyUrl}
              className="inline-flex shrink-0 items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              View case study
            </Link>
            <div className="hidden h-5 w-px bg-border-primary sm:block" aria-hidden="true" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{pageTitle || "Case study editor"}</p>
              <p className="text-xs text-text-secondary">Local editor</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-text-secondary sm:inline" aria-live="polite">
              {status === "saving" && "Saving…"}
              {status === "saved" && (
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4" aria-hidden="true" /> Saved
                </span>
              )}
              {status === "ready" && (isDirty ? "Unsaved changes" : "No changes")}
              {status === "error" && "Something went wrong"}
            </span>
            <button
              type="button"
              onClick={() => void saveCaseStudy()}
              disabled={savedDocument === null || status === "saving" || status === "loading"}
              className="inline-flex items-center gap-2 rounded-md bg-text-primary px-4 py-2 text-sm font-medium text-surface-primary transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {status === "saving" ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Save className="h-4 w-4" aria-hidden="true" />
              )}
              Save
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-[1100px] px-4 py-8 sm:px-8 sm:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Edit</h1>
          <p className="mt-3 text-xl font-semibold">{pageTitle || "Untitled page"}</p>
          {pageSubtitle && <p className="mt-1 text-text-secondary">{pageSubtitle}</p>}
        </div>

        {status === "loading" && (
          <div className="flex min-h-[360px] items-center justify-center rounded-xl border border-border-primary">
            <Loader2 className="h-6 w-6 animate-spin text-text-secondary" aria-label="Loading editor" />
          </div>
        )}

        {status === "error" && savedDocument === null && (
          <div className="rounded-xl border border-red-300 bg-red-50 p-5 text-red-900">
            <p className="font-medium">The editor couldn’t load this case study.</p>
            <p className="mt-1 text-sm">{message}</p>
          </div>
        )}

        {savedDocument !== null && (
          <>
            <div className="mb-6 rounded-xl border border-border-primary bg-white p-5 text-slate-900 shadow-sm sm:p-6">
              <h2 className="text-base font-semibold">Page details</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1.5 text-sm font-medium">
                  Page title
                  <input
                    type="text"
                    value={pageTitle}
                    onChange={(event) => {
                      setPageTitle(event.target.value);
                      setStatus("ready");
                    }}
                    className="rounded-md border border-slate-300 px-3 py-2.5 text-base font-normal outline-none transition-shadow focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  />
                </label>
                <label className="grid gap-1.5 text-sm font-medium">
                  Page subtitle
                  <input
                    type="text"
                    value={pageSubtitle}
                    onChange={(event) => {
                      setPageSubtitle(event.target.value);
                      setStatus("ready");
                    }}
                    className="rounded-md border border-slate-300 px-3 py-2.5 text-base font-normal outline-none transition-shadow focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  />
                </label>
              </div>
            </div>

            <div className="mb-3 flex items-baseline justify-between gap-4">
              <h2 className="text-base font-semibold">Page content</h2>
              <p className="text-sm text-text-secondary">
                Use each section’s gear icon to edit its details.
              </p>
            </div>

            <div className="portfolio-mdx-editor rounded-xl border border-border-primary bg-white text-slate-900 shadow-sm">
              <MDXEditor
                ref={editorRef}
                markdown={savedDocument.body}
                plugins={plugins}
                contentEditableClassName="portfolio-mdx-editor-content"
                onChange={(markdown, initialMarkdownNormalize) => {
                  if (initialMarkdownNormalize) {
                    setSavedDocument((currentDocument) =>
                      currentDocument ? { ...currentDocument, body: markdown } : currentDocument,
                    );
                    setDraft(markdown);
                    return;
                  }

                  setDraft(markdown);
                  setStatus("ready");
                }}
                onError={({ error }) => {
                  setMessage(error);
                  setStatus("error");
                }}
                translation={designSystemTranslation}
                spellCheck
              />
            </div>
          </>
        )}

        {message && savedDocument !== null && (
          <p className="mt-3 text-sm text-red-700" role="alert">
            {message}
          </p>
        )}
      </section>
    </main>
  );
};

export default CaseStudy4Editor;
