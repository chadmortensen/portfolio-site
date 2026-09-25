import { MdxCaseStudyPage } from "@/components/case-study/MdxCaseStudyPage";
import Content, { frontmatter } from "../../content/case-studies/baby-registry-revamp.mdx";

export default function CaseStudy1() {
  return (
    <MdxCaseStudyPage
      title={frontmatter.title}
      subtitle={frontmatter.subtitle}
      Content={Content}
    />
  );
}
