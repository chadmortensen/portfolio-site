import { MdxCaseStudyPage } from "@/components/case-study/MdxCaseStudyPage";
import Content, { frontmatter } from "../../content/case-studies/etsy-fulfillment-vision.mdx";

export default function CaseStudy2() {
  return (
    <MdxCaseStudyPage
      title={frontmatter.title}
      subtitle={frontmatter.subtitle}
      Content={Content}
    />
  );
}
