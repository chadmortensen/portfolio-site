import { MdxCaseStudyPage } from "@/components/case-study/MdxCaseStudyPage";
import Content, { frontmatter } from "../../content/case-studies/additional-work-examples.mdx";

export default function CaseStudy4() {
  return (
    <MdxCaseStudyPage
      title={frontmatter.title}
      subtitle={frontmatter.subtitle}
      Content={Content}
    />
  );
}
