import { MdxCaseStudyPage } from "@/components/case-study/MdxCaseStudyPage";
import Content, { frontmatter } from "../../content/case-studies/brightside-growth-vision.mdx";

export default function CaseStudy3() {
  return (
    <MdxCaseStudyPage
      title={frontmatter.title}
      subtitle={frontmatter.subtitle}
      Content={Content}
    />
  );
}
