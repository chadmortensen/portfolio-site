export type CaseStudyColumn = "full" | "left" | "right";
export type CaseStudySectionLayout = "split" | "split-reverse" | "stacked";
export type CaseStudyModuleVariant = "default" | "feature" | "subtle";

export interface CaseStudyModule {
  id?: string;
  type: "text" | "image" | "bullets" | "quote" | "table";
  column?: CaseStudyColumn;
  variant?: CaseStudyModuleVariant;
  content: unknown;
}

export interface CaseStudySection {
  title: string;
  subheader?: string | null;
  layout?: CaseStudySectionLayout;
  modules: CaseStudyModule[];
}

export interface CaseStudyData {
  title: string;
  subtitle?: string;
  presentation?: { accent?: "blue" | "orange" | "teal" | "aqua" };
  sections: CaseStudySection[];
}
