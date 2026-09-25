import type { ComponentType, ReactNode } from "react";
import { ExecutiveSummary } from "./ExecutiveSummary";
import { cn } from "@/lib/utils";
import {
  CaseStudyImage as CaseStudyImageView,
  CaseStudyTable as CaseStudyTableView,
} from "./SectionLibrary";
import { CaseStudyShell } from "./CaseStudyPage";
import type { CaseStudyModule, CaseStudySectionLayout } from "./types";

type MdxComponents = Record<string, ComponentType<Record<string, unknown>>>;

type MdxContentComponent = ComponentType<{
  components?: MdxComponents;
}>;

type MdxCaseStudyPageProps = {
  title: string;
  subtitle?: string;
  Content: MdxContentComponent;
};

type CaseStudySectionProps = {
  title: string;
  subheader?: string;
  image?: string;
  imageAlt?: string;
  layout?: CaseStudySectionLayout;
  children: ReactNode;
};

type CaseStudyColumnsProps = {
  layout?: CaseStudySectionLayout;
  children: ReactNode;
};

type CaseStudyColumnProps = {
  side: "full" | "left" | "right";
  children: ReactNode;
};

type CaseStudyImageProps = {
  src: string;
  alt: string;
  heightPercent?: string;
};

type CaseStudyQuoteProps = {
  title?: string;
  variant?: "default" | "feature" | "subtle";
  children: ReactNode;
};

type CaseStudyTableProps = {
  title?: string;
  headers: string[];
  rows: string[][];
};

const SectionHeader = ({ title, subheader }: Pick<CaseStudySectionProps, "title" | "subheader">) => (
  <header className="mb-8">
    <h2 className="text-headline text-text-primary font-light">{title}</h2>
    {subheader && <p className="text-xl text-text-secondary font-light mt-3 mb-5">{subheader}</p>}
    <div className="h-[3px] w-12 bg-accent-blue mt-5" />
  </header>
);

const CaseStudySection = ({
  title,
  subheader,
  image,
  imageAlt,
  children,
}: CaseStudySectionProps) => (
  <article className="border-b border-swiss-light pb-24 last:border-b-0 last:pb-0">
    <SectionHeader title={title} subheader={subheader} />
    {image ? (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <CaseStudyImage src={image} alt={imageAlt || title} />
        <div className="case-study-mdx-content prose prose-slate max-w-none text-case-study-body text-text-secondary leading-relaxed">
          {children}
        </div>
      </div>
    ) : (
      <div className="space-y-8">{children}</div>
    )}
  </article>
);

const CaseStudyColumns = ({ layout = "split", children }: CaseStudyColumnsProps) => (
  <div
    className={cn(
      "grid grid-cols-1 lg:grid-cols-2 gap-8 items-start",
      layout === "stacked" && "lg:grid-cols-1",
      layout === "split-reverse" && "[&>[data-column=left]]:lg:order-2 [&>[data-column=right]]:lg:order-1",
    )}
    data-layout={layout}
  >
    {children}
  </div>
);

const CaseStudyColumn = ({ side, children }: CaseStudyColumnProps) => (
  <div
    className={cn(
      "case-study-mdx-content prose prose-slate max-w-none space-y-6 text-case-study-body text-text-secondary leading-relaxed",
      side === "full" && "lg:col-span-2",
    )}
    data-column={side}
  >
    {children}
  </div>
);

const CaseStudyImage = ({ src, alt, heightPercent }: CaseStudyImageProps) => (
  <CaseStudyImageView
    module={{
      type: "image",
      content: { src, alt, heightPercent },
    }}
  />
);

const CaseStudyQuote = ({ title, variant = "default", children }: CaseStudyQuoteProps) => (
  <aside
    className={cn(
      "case-study-quote not-prose bg-surface-secondary p-4 text-text-secondary",
      variant === "feature" && "border-l-4 border-accent-blue p-6 md:p-8",
    )}
  >
    {title && <h3 className="mt-0 mb-2 text-[1.1rem] leading-[1.3] text-text-primary font-medium">{title}</h3>}
    <div className="case-study-mdx-content prose prose-slate max-w-none italic">{children}</div>
  </aside>
);

const CaseStudyTable = ({ title, headers, rows }: CaseStudyTableProps) => {
  const module: CaseStudyModule = {
    type: "table",
    content: { title, headers, rows },
  };

  return <CaseStudyTableView module={module} />;
};

const mdxComponents = {
  ExecutiveSummary,
  CaseStudySection,
  CaseStudyColumns,
  CaseStudyColumn,
  CaseStudyImage,
  CaseStudyQuote,
  CaseStudyTable,
} as unknown as MdxComponents;

export const MdxCaseStudyPage = ({ title, subtitle, Content }: MdxCaseStudyPageProps) => (
  <CaseStudyShell title={title} subtitle={subtitle}>
    <Content components={mdxComponents} />
  </CaseStudyShell>
);
