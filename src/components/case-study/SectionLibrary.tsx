import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { CaseStudyModule, CaseStudySection, CaseStudySectionLayout } from "./types";

type TextContent = { title?: string; text?: string };
type ImageContent = { src?: string; alt?: string; heightPercent?: string | number };
type ListContent = { title?: string; items?: string[] };
type TableContent = { title?: string; headers?: string[]; rows?: string[][] };

const asRecord = (value: unknown): Record<string, unknown> =>
  value && typeof value === "object" ? value as Record<string, unknown> : {};

const normalizeText = (value: unknown): TextContent => {
  if (typeof value === "string") return { text: value };
  const record = asRecord(value);
  return {
    title: typeof record.title === "string" ? record.title : undefined,
    text: typeof record.text === "string" ? record.text : undefined,
  };
};

const RichText = ({ html, className }: { html?: string; className?: string }) => {
  if (!html) return null;
  return <div className={cn("prose prose-slate max-w-none text-body text-text-secondary leading-relaxed", className)} dangerouslySetInnerHTML={{ __html: html }} />;
};

export const CaseStudyText = ({ module }: { module: CaseStudyModule }) => {
  const content = normalizeText(module.content);
  return <div className="space-y-4">{content.title && <h3 className="text-title text-text-primary font-light">{content.title}</h3>}<RichText html={content.text} /></div>;
};

export const CaseStudyImage = ({ module }: { module: CaseStudyModule }) => {
  const content = asRecord(module.content) as ImageContent;
  if (!content.src) return null;
  const heightStyle = content.heightPercent ? { height: `${content.heightPercent}vh`, objectFit: "contain" as const } : undefined;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="block w-full text-left rounded-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-4" aria-label={`Enlarge ${content.alt || "case study image"}`}>
          <img src={content.src} alt={content.alt || "Case study visual"} className="w-full cursor-zoom-in transition-opacity hover:opacity-90" style={heightStyle} loading="lazy" decoding="async" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl w-full p-0 overflow-hidden">
        <img src={content.src} alt={content.alt || "Enlarged case study visual"} className="w-full h-auto max-h-[85vh] object-contain" decoding="async" />
      </DialogContent>
    </Dialog>
  );
};

export const CaseStudyList = ({ module }: { module: CaseStudyModule }) => {
  const content = asRecord(module.content) as ListContent;
  return <div className="space-y-4">{content.title && <h3 className="text-lg text-text-primary font-semibold">{content.title}</h3>}{content.items && <ul className="space-y-2">{content.items.map((item, index) => <li key={index} className="text-body text-text-secondary" dangerouslySetInnerHTML={{ __html: item }} />)}</ul>}</div>;
};

export const CaseStudyQuote = ({ module }: { module: CaseStudyModule }) => {
  const content = normalizeText(module.content);
  return <aside className={cn("bg-surface-secondary p-4", module.variant === "feature" && "border-l-4 border-accent-blue p-6 md:p-8")}>{content.title && <h3 className="text-title text-text-primary font-medium mb-2">{content.title}</h3>}<RichText html={content.text} className="italic" /></aside>;
};

export const CaseStudyTable = ({ module }: { module: CaseStudyModule }) => {
  const content = asRecord(module.content) as TableContent;
  return (
    <div className="space-y-4 overflow-x-auto">
      {content.title && <h3 className="text-title text-text-primary font-light">{content.title}</h3>}
      <Table>
        {content.headers && <TableHeader><TableRow className="bg-gray-50">{content.headers.map((header, index) => <TableHead key={index} className="font-semibold text-gray-900 py-4 px-6">{header}</TableHead>)}</TableRow></TableHeader>}
        {content.rows && <TableBody>{content.rows.map((row, rowIndex) => <TableRow key={rowIndex}>{row.map((cell, cellIndex) => <TableCell key={cellIndex} className="py-4 px-6"><RichText html={cell} /></TableCell>)}</TableRow>)}</TableBody>}
      </Table>
    </div>
  );
};

export const CaseStudyModuleView = ({ module }: { module: CaseStudyModule }) => {
  switch (module.type) {
    case "text": return <CaseStudyText module={module} />;
    case "image": return <CaseStudyImage module={module} />;
    case "bullets": return <CaseStudyList module={module} />;
    case "quote": return <CaseStudyQuote module={module} />;
    case "table": return <CaseStudyTable module={module} />;
    default: return null;
  }
};

const resolveLayout = (section: CaseStudySection): CaseStudySectionLayout => {
  if (section.layout) return section.layout;
  const left = section.modules.filter((module) => module.column === "left");
  const right = section.modules.filter((module) => module.column === "right");
  if (left.some((module) => module.type === "image") && right.some((module) => module.type !== "image")) return "split-reverse";
  return left.length || right.length ? "split" : "stacked";
};

export const CaseStudySectionView = ({ section }: { section: CaseStudySection }) => {
  const full = section.modules.filter((module) => !module.column || module.column === "full");
  const left = section.modules.filter((module) => module.column === "left");
  const right = section.modules.filter((module) => module.column === "right");
  const layout = resolveLayout(section);
  const reverseColumns = section.layout === "split-reverse";
  return (
    <article data-layout={layout}>
      <header className="mb-8">
        <h2 className="text-headline text-text-primary font-light">{section.title}</h2>
        {section.subheader && <p className="text-xl text-text-secondary font-light mt-3 mb-5">{section.subheader}</p>}
        <div className="h-[3px] w-12 bg-accent-blue mt-5" />
      </header>
      <div className="space-y-8">
        {full.map((module, index) => <CaseStudyModuleView key={module.id || `full-${index}`} module={module} />)}
        {(left.length > 0 || right.length > 0) && <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-8 items-start", layout === "stacked" && "lg:grid-cols-1")}>
          <div className={cn("space-y-6", reverseColumns && "lg:order-2")}>{left.map((module, index) => <CaseStudyModuleView key={module.id || `left-${index}`} module={module} />)}</div>
          <div className={cn("space-y-6", reverseColumns && "lg:order-1")}>{right.map((module, index) => <CaseStudyModuleView key={module.id || `right-${index}`} module={module} />)}</div>
        </div>}
      </div>
    </article>
  );
};
