import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CaseStudyModuleView, CaseStudySectionView } from "./SectionLibrary";
import type { CaseStudyModule, CaseStudySection } from "./types";

const textModule: CaseStudyModule = {
  type: "text",
  column: "left",
  content: { text: "<h3>A clear narrative moment</h3><p>Text and media can work together while the content remains independent from the layout component.</p>" },
};

const imageModule: CaseStudyModule = {
  type: "image",
  column: "right",
  content: { src: "/img/bright-challenge.jpg", alt: "Example product design process artwork" },
};

const sectionExamples: Array<{ name: string; description: string; section: CaseStudySection }> = [
  {
    name: "Split",
    description: "Narrative on the left and supporting media on the right—the current default.",
    section: { title: "Split section", subheader: "Balanced storytelling and visual evidence", layout: "split", modules: [textModule, imageModule] },
  },
  {
    name: "Split reverse",
    description: "Media-led composition used by Additional Work examples.",
    section: { title: "Split reverse section", subheader: "Lead with the visual", layout: "split-reverse", modules: [textModule, imageModule] },
  },
  {
    name: "Stacked",
    description: "Full-width reading flow for results, tables, and reflective narratives.",
    section: { title: "Stacked section", subheader: "A focused long-form rhythm", layout: "stacked", modules: [{ ...textModule, column: "full" }] },
  },
];

const moduleExamples: Array<{ name: string; description: string; module: CaseStudyModule }> = [
  { name: "Text", description: "Rich narrative content", module: { ...textModule, column: "full" } },
  { name: "Image", description: "Responsive, expandable media", module: { ...imageModule, column: "full" } },
  { name: "Bullets", description: "Goals, findings, and concise lists", module: { type: "bullets", column: "full", content: { title: "Goals", items: ["Create a shared direction", "Connect customer and business outcomes"] } } },
  { name: "Quote", description: "Highlighted insight or principle", module: { type: "quote", column: "full", content: { title: "Design principle", text: "<p>Make the next decision feel obvious.</p>" } } },
  { name: "Table", description: "Structured results and comparisons", module: { type: "table", column: "full", content: { headers: ["Measure", "Outcome"], rows: [["Completion", "+18%"], ["Satisfaction", "+12 pts"]] } } },
];

export const SectionLibraryShowcase = () => (
  <section className="mb-16" aria-labelledby="case-study-library-title">
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <h2 id="case-study-library-title" className="text-2xl font-bold">Case Study Section Library</h2>
        <Badge variant="secondary">JSON-driven</Badge>
      </div>
      <p className="text-muted-foreground max-w-3xl">These are the reusable layouts and content styles used by the live case studies. JSON chooses a section layout and module type; this library owns spacing, typography, responsive behavior, and interaction.</p>
    </div>

    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-semibold mb-4">Section layouts</h3>
        <div className="space-y-8">
          {sectionExamples.map((example) => <Card key={example.name} className="overflow-hidden"><CardHeader><CardTitle>{example.name}</CardTitle><CardDescription>{example.description}</CardDescription></CardHeader><CardContent className="bg-surface-primary py-8"><CaseStudySectionView section={example.section} /></CardContent></Card>)}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Content modules</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {moduleExamples.map((example) => <Card key={example.name} className={example.name === "Image" || example.name === "Table" ? "lg:col-span-2" : undefined}><CardHeader><CardTitle>{example.name}</CardTitle><CardDescription>{example.description}</CardDescription></CardHeader><CardContent><CaseStudyModuleView module={example.module} /></CardContent></Card>)}
        </div>
      </div>

      <Card className="border-accent-blue/30 bg-accent-blue/5">
        <CardHeader><CardTitle>Available JSON options</CardTitle><CardDescription>Intentionally limited choices keep the system flexible and coherent.</CardDescription></CardHeader>
        <CardContent className="flex flex-wrap gap-2"><Badge>layout: split</Badge><Badge>layout: split-reverse</Badge><Badge>layout: stacked</Badge><Badge variant="outline">column: full</Badge><Badge variant="outline">column: left</Badge><Badge variant="outline">column: right</Badge><Badge variant="secondary">variant: default</Badge><Badge variant="secondary">variant: feature</Badge></CardContent>
      </Card>
    </div>
  </section>
);
