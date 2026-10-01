import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";

const CaseStudies = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingHover = useRef<number | null>(null);
  const activeIndex = hoveredIndex ?? focusedIndex ?? selectedIndex;

  useEffect(() => () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  }, []);

  const clearHover = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
    pendingHover.current = null;
    setHoveredIndex(null);
  };

  const previewCard = (index: number) => {
    if (pendingHover.current === index) return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    pendingHover.current = index;
    hoverTimer.current = setTimeout(() => {
      setHoveredIndex(index);
      hoverTimer.current = null;
    }, 90);
  };

  const previewFromPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || window.matchMedia("(max-width: 767px)").matches) return;
    // Measure stationary slots, so animated cards cannot change their own hover target.
    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = event.clientX - bounds.left;
    const slots = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(".case-study-fan-slot"));
    const nearest = slots.reduce((best, slot, index) =>
      Math.abs(slot.offsetLeft - pointerX) < Math.abs(slots[best].offsetLeft - pointerX) ? index : best, 0);
    previewCard(nearest);
  };
  const caseStudies = [{
    id: 1,
    title: "Product Vision, Alignment and Coaching a Senior Designer to Lead",
    company: "Brightside Health",
    duration: "6 weeks",
    teamSize: "8",
    image: "/img/case-brightside.jpg?auto=format&fit=crop&w=800&q=80",
    challenge: "The Growth team needed a clear product vision to align cross-functional efforts and guide strategic decisions for scaling mental health services to underserved communities.",
    results: ["Developed comprehensive product vision for Growth initiatives", "Established clear success metrics and KPIs", "Aligned stakeholders across product, engineering, and business teams", "Created roadmap for sustainable growth strategies"],
    route: "/case-study-3"
  },
  {
    id: 2,
    title: "Aligning Senior Fulfillment Leadership Around a Shared Vision and Design Principles",
    company: "Etsy",
    duration: "4 weeks",
    teamSize: "5",
    image: "/img/case-etsy.jpg?auto=format&fit=crop&w=800&q=80",
    challenge: "Teams had near term targets and roadmaps but they were missing something to help guide their decisions and align them to where the business was headed.",
    results: ["Created a product vision for Fulfillment at Etsy", "Created design principles", "Aligned team leadership around a unified goal", "Provided needed guidance to supporting teams"],
    route: "/case-study-2"
  },
    {
    id: 3,
    title: "Leading a Rapid Registry Turnaround That Increased Quality Creations by 28%",
    company: "Walmart", 
    duration: "1 quarter",
    teamSize: "6 people",
    image: "/img/case-walmart.jpg?auto=format&fit=crop&w=800&q=80",
    challenge: "In 1 quarter; design, develop and launch an improved baby registry experience addressing shortcomings of the previous registry tool.",
    goals: ["Increase quality registry creations (creations that lead to a first curation action)", "Increase curation by 10%", "Increase sharing by 20%", "Increase purchase conversion by 25%", "Helping new parents with this major moment in life"],
    route: "/case-study-1"
  },  
    {
    id: 4,
    title: "How I Lead High Performing Teams",
    company: "",
    duration: "Ongoing",
    teamSize: "Various",
    image: "/img/case-additional-projects.jpg?auto=format&fit=crop&w=800&q=80",
    challenge: "Here are some past examples of my influence in driving product strategy through design leadership",
    results: ["Multiple successful product launches", "Cross-functional team leadership", "Strategic planning and execution", "User research and insights"],
    route: "/case-study-4"
  }];

  return <section id="case-studies" className="py-16 sm:py-24 bg-surface-secondary">
      <div className="swiss-grid case-studies-grid fade-in">
        <div className="col-span-12 text-center mb-12 sm:mb-16">
          <h2 className="text-headline text-text-primary mb-4">Case Studies: Product and Leadership</h2>
          <div className="h-[3px] w-[7rem] bg-accent-blue mx-auto mb-6"></div>
          <p className="text-body text-text-secondary max-w-2xl mx-auto px-4">
            Product challenges, leadership decisions, and measurable outcomes across the work, people, and practices I’ve helped shape.
          </p>
        </div>

        <div className="col-span-12 case-study-fan" onPointerLeave={clearHover}>
          <div className="case-study-fan-stage" onPointerMove={previewFromPointer}>
          {caseStudies.map((study, index) => <div
            key={study.id}
            className={`case-study-fan-slot${activeIndex === index ? " is-active" : ""}`}
            style={{ "--fan-offset": index - 1.5, "--fan-angle": `${(index - 1.5) * 8}deg`, "--fan-drop": `${Math.abs(index - 1.5) * 16}px`, "--fan-depth": `${(3 - index) * 2}px` } as CSSProperties}
            onFocusCapture={() => { clearHover(); setFocusedIndex(index); }}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusedIndex(null);
            }}
          ><article id={`case-study-card-${study.id}`} className="case-study-fan-card flex flex-col overflow-hidden rounded-[10px] border border-swiss-light bg-surface-primary">
              <button
                onClick={() => navigate(study.route)}
                className="case-study-fan-image group block w-full shrink-0 overflow-hidden rounded-none text-left focus:outline-2 focus:outline-accent-blue focus:outline-offset-2"
                aria-label={`View ${study.title} case study`}
              >
                <img
                  src={study.image}
                  alt={`${study.title} - ${study.company} case study`}
                  className="case-study-card-image h-full w-full object-cover"
                />
              </button>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="space-y-3">
                  <h3 className="text-case-study-title text-text-primary !font-bold">{study.title}</h3>
                  {study.company && <p className="text-case-study-label text-accent-blue font-medium">{study.company}</p>}
                </div>

                <button
                  onClick={() => navigate(study.route)}
                  className="mt-auto inline-flex items-center gap-2 pt-6 text-body font-medium text-text-primary transition-colors duration-200 hover:text-accent-blue focus:outline-2 focus:outline-accent-blue focus:outline-offset-2"
                  aria-label={`View ${study.title} case study`}
                >
                  <span>{study.id === 4 ? "View Examples" : "View Case Study"}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </article></div>)}
          </div>
          <div className="case-study-fan-selectors" role="group" aria-label="Choose a case study to bring forward">
            {caseStudies.map((study, index) => <button
              key={study.id}
              type="button"
              className="case-study-fan-selector text-body"
              aria-pressed={(activeIndex ?? 0) === index}
              aria-controls={`case-study-card-${study.id}`}
              onPointerEnter={(event) => { if (event.pointerType === "mouse") previewCard(index); }}
              onFocus={() => { clearHover(); setFocusedIndex(index); }}
              onBlur={() => setFocusedIndex(null)}
              onClick={() => { clearHover(); setSelectedIndex(index); }}
            >{study.company || "Leadership"}</button>)}
          </div>
        </div>
      </div>
    </section>;
};

export default CaseStudies;
