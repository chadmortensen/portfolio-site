import type { ComponentType, ReactNode } from "react";
import { CaseStudyImage } from "./SectionLibrary";
import { CaseStudyShell } from "./CaseStudyPage";

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
  image: string;
  imageAlt: string;
  children: ReactNode;
};

const CaseStudySection = ({
  title,
  subheader,
  image,
  imageAlt,
  children,
}: CaseStudySectionProps) => (
  <article className="border-b border-swiss-light pb-24 last:border-b-0 last:pb-0">
    <header className="mb-8">
      <h2 className="text-headline text-text-primary font-light">{title}</h2>
      {subheader && <p className="text-xl text-text-secondary font-light mt-3 mb-5">{subheader}</p>}
      <div className="h-[3px] w-12 bg-accent-blue mt-5" />
    </header>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <CaseStudyImage
        module={{
          type: "image",
          content: { src: image, alt: imageAlt },
        }}
      />
      <div className="case-study-mdx-content prose prose-slate max-w-none text-case-study-body text-text-secondary leading-relaxed">
        {children}
      </div>
    </div>
  </article>
);

export const MdxCaseStudyPage = ({ title, subtitle, Content }: MdxCaseStudyPageProps) => (
  <CaseStudyShell title={title} subtitle={subtitle}>
    <Content components={{ CaseStudySection } as MdxComponents} />
  </CaseStudyShell>
);
