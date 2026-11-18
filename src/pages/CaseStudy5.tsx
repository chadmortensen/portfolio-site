import { MdxCaseStudyPage } from "@/components/case-study/MdxCaseStudyPage";
import Content, { frontmatter } from "../../content/case-studies/chad-mapped.mdx";

export default function CaseStudy5() {
  return (
    <MdxCaseStudyPage
      title={frontmatter.title}
      subtitle={frontmatter.subtitle}
      Content={Content}
    />
  );
}
