import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { caseStudySummaries } from "./case-study/summaries";

const CaseStudies = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const drag = useRef({ startX: 0, startScroll: 0, active: false, moved: false });
  const animationFrame = useRef<number | null>(null);

  const cancelAnimation = useCallback(() => {
    if (animationFrame.current !== null) cancelAnimationFrame(animationFrame.current);
    animationFrame.current = null;
    trackRef.current?.style.removeProperty("scroll-snap-type");
  }, []);

  const updateControls = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanGoBack(track.scrollLeft > 2);
    setCanGoForward(track.scrollLeft < track.scrollWidth - track.clientWidth - 2);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(() => { cancelAnimation(); updateControls(); });
    observer.observe(track);
    updateControls();
    return () => { observer.disconnect(); cancelAnimation(); };
  }, [updateControls, cancelAnimation]);

  const moveTo = (index: number) => {
    const track = trackRef.current;
    if (!track || animationFrame.current !== null) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>(".case-study-slide"));
    const card = cards[Math.max(0, Math.min(cards.length - 1, index))];
    const inset = parseFloat(getComputedStyle(track).paddingLeft);
    const destination = Math.min(card.offsetLeft - inset, track.scrollWidth - track.clientWidth);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      track.scrollTo({ left: destination, behavior: "instant" });
      updateControls();
      return;
    }
    const start = track.scrollLeft;
    const startedAt = performance.now();
    // Match the reference gallery: 500ms easeInOutQuad, snapping disabled in flight.
    track.style.scrollSnapType = "none";
    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / 500, 1);
      const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      track.scrollLeft = start + (destination - start) * eased;
      if (progress < 1) {
        animationFrame.current = requestAnimationFrame(animate);
      } else {
        animationFrame.current = null;
        track.style.removeProperty("scroll-snap-type");
        updateControls();
      }
    };
    animationFrame.current = requestAnimationFrame(animate);
  };

  const nearestIndex = () => {
    const track = trackRef.current;
    if (!track) return 0;
    const inset = parseFloat(getComputedStyle(track).paddingLeft);
    const cards = Array.from(track.querySelectorAll<HTMLElement>(".case-study-slide"));
    const maxScroll = track.scrollWidth - track.clientWidth;
    const distance = (card: HTMLElement) => Math.abs(Math.min(card.offsetLeft - inset, maxScroll) - track.scrollLeft);
    return cards.reduce((best, card, index) => distance(card) < distance(cards[best]) ? index : best, 0);
  };

  const finishDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setIsDragging(false);
    if (drag.current.moved) moveTo(nearestIndex());
  };
  const caseStudies = [{
    id: 1,
    summary: caseStudySummaries.brightside.card,
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
    summary: caseStudySummaries.etsy.card,
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
    summary: caseStudySummaries.walmart.card,
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
    summary: caseStudySummaries.leadership.card,
    title: "How I Lead High Performing Teams",
    company: "",
    duration: "Ongoing",
    teamSize: "Various",
    image: "/img/case-additional-projects.jpg?auto=format&fit=crop&w=800&q=80",
    challenge: "Here are some past examples of my influence in driving product strategy through design leadership",
    results: ["Multiple successful product launches", "Cross-functional team leadership", "Strategic planning and execution", "User research and insights"],
    route: "/case-study-4"
  }];

  return <section id="case-studies" className="case-study-gallery py-16 sm:py-24 bg-surface-secondary" aria-labelledby="case-studies-heading">
      <div className="swiss-grid fade-in">
        <div className="col-span-12 text-center mb-12 sm:mb-16">
          <h2 id="case-studies-heading" className="text-headline text-text-primary mb-4">Case Studies: Product and Leadership</h2>
          <div className="h-[3px] w-[7rem] bg-accent-blue mx-auto mb-6"></div>
          <p className="text-body text-text-secondary max-w-2xl mx-auto px-4">
            Product challenges, leadership decisions, and measurable outcomes across the work, people, and practices I’ve helped shape.
          </p>
        </div>
      </div>
      <div
        ref={trackRef}
        id="case-study-track"
        className={`case-study-track${isDragging ? " is-dragging" : ""}`}
        role="region"
        aria-roledescription="carousel"
        aria-label="Product and leadership case studies"
        tabIndex={0}
        onScroll={() => { if (animationFrame.current === null) updateControls(); }}
        onWheel={cancelAnimation}
        onKeyDown={(event) => {
          drag.current.moved = false;
          if (event.target !== event.currentTarget || event.shiftKey || event.altKey || event.ctrlKey || event.metaKey) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault(); moveTo(nearestIndex() + (event.key === "ArrowRight" ? 1 : -1));
          } else if (event.key === "Home" || event.key === "End") {
            event.preventDefault(); moveTo(event.key === "Home" ? 0 : caseStudies.length - 1);
          }
        }}
        onPointerDown={(event) => {
          cancelAnimation();
          if (event.pointerType !== "mouse" || event.button !== 0) return;
          drag.current = { startX: event.clientX, startScroll: event.currentTarget.scrollLeft, active: true, moved: false };
        }}
        onPointerMove={(event) => {
          if (!drag.current.active) return;
          const delta = event.clientX - drag.current.startX;
          if (!drag.current.moved && Math.abs(delta) < 8) return;
          drag.current.moved = true;
          setIsDragging(true);
          event.currentTarget.style.scrollSnapType = "none";
          event.currentTarget.setPointerCapture(event.pointerId);
          event.currentTarget.scrollLeft = drag.current.startScroll - delta;
        }}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onLostPointerCapture={finishDrag}
        onPointerLeave={() => { if (!drag.current.moved) drag.current.active = false; }}
        onDragStart={(event) => event.preventDefault()}
        onClickCapture={(event) => {
          if (drag.current.moved) { event.preventDefault(); event.stopPropagation(); drag.current.moved = false; }
        }}
      >
        {caseStudies.map((study, index) => <article key={study.id} className="case-study-slide" aria-roledescription="slide" aria-label={`${index + 1} of ${caseStudies.length}: ${study.company || "Leadership"}`}>
          <Link to={study.route} className="case-study-slide-image" aria-label={`View ${study.title} case study`} draggable={false}>
            <img src={study.image} alt={`${study.company || "Design leadership"} case study`} className="case-study-card-image" draggable={false} loading="lazy" />
          </Link>
          <div className="case-study-slide-copy">
            {study.company && <p className="text-case-study-label text-accent-blue font-medium">{study.company}</p>}
            <h3 className="text-case-study-title text-text-primary !font-bold">{study.title}</h3>
            <p className="text-body text-text-secondary">{study.summary}</p>
            <Link to={study.route} className="case-study-slide-link text-body font-medium" aria-label={`View ${study.title} case study`}>
              {study.id === 4 ? "View Examples" : "View Case Study"}<ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </article>)}
      </div>
      <div className="case-study-gallery-controls" role="group" aria-label="Case study carousel navigation">
        <button type="button" className="case-study-gallery-arrow" aria-label="Previous case study" aria-controls="case-study-track" disabled={!canGoBack} onClick={() => moveTo(nearestIndex() - 1)}><ChevronLeft size={22} aria-hidden="true" /></button>
        <button type="button" className="case-study-gallery-arrow" aria-label="Next case study" aria-controls="case-study-track" disabled={!canGoForward} onClick={() => moveTo(nearestIndex() + 1)}><ChevronRight size={22} aria-hidden="true" /></button>
      </div>
    </section>;
};

export default CaseStudies;
