import { CaseStudyPage } from "@/components/case-study/CaseStudyPage";
import type { CaseStudyData } from "@/components/case-study/types";
import data from "../../data/case-studies/case-study-4.json";

export default function CaseStudy4() {
  return <CaseStudyPage data={data as CaseStudyData} />;
}
