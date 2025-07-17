import { ArrowLeft, Calendar, Users, Target, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
const CaseStudy1 = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const sections = [{
    title: "The Challenge",
    content: "In 1 quarter; design, develop and launch an improved baby registry experience addressing shortcomings of the previous registry tool.",
    goals: ["Increase quality registry creations (creations that lead to a first curation action)", "Increase curation by 10%", "Increase sharing by 20%", "Increase purchase conversion by 25%", "Helping new parents with this major moment in life"]
    // No image for this section
  }, {
    title: "Assembling the Team",
    subheader: "Leadership alignment and persuasion",
    content: "With just six weeks to take this project from discovery through final deliverables — and much of that timeline landing squarely in the holiday-heavy back half of Q4 — I knew we needed to move quickly and assemble a team that could hit the ground running.\n\nAfter aligning with our business and product partners, I had enough clarity on the scope to start making staffing decisions. One of my staff designers was well-positioned to lead the work, but I also knew that expecting him to carry the full load would put both the team and the project at risk.\n\nRather than waiting for headcount or formal allocations, I looked for creative ways to build the right team. I'd heard that another group at Walmart — the wedding registry team — was entering a period of uncertainty due to pending org changes. That meant talented designers were available but underutilized. I made the case to design leadership to temporarily borrow a couple of their designers, and supplemented the rest of the team with strong contractors from our existing pool.\n\nThis approach allowed us to act fast, stay nimble, and build a cross-functional team that blended deep domain knowledge with fresh perspectives — all without missing a beat on our timeline.",
    image: "/lovable-uploads/e36754b0-b1da-47b9-8e75-731620ea5cf1.png",
    fullWidthImage: "/lovable-uploads/88b85ba6-6a79-47ac-9c76-cb60fb28f194.png"
  }, {
    title: "Ground the Team in Research and Insights",
    subheader: "We had past research so let's not lose that in an effort to be efficient",
    content: "The Routine Consumables team was responsible for the baby category at Walmart. The baby registry had received a design overhaul a couple of years prior; luckily, we had quite a bit of research to start with. Market research, customer feedback and customer interviews provide rich insights.\n\nUnderstanding users' motivations, areas of friction as well as areas of delight is key to building human-centered products. I wanted to ensure that the team was grounded in insights.\n\nWe held an offsite at the beginning of this project to bring together the designers, understand the goals, and align on the initial outline of what we were building. We kicked off this offsite with a deep dive into the past research, presented by the team's UX Researcher.\n\nThe key insights gained from the research review were that Walmart registry users have been asking for a greater level of control, guidance, and needed to establish trust with the experience.",
    quotes: ["I became so frustrated in making the registry through the app, that I quit. It is not intuitive nor easy to navigate in order to add or change something.", "It's not as user friendly as other registries I've used. It would be better if the registry picks fell into the categories provided. That would make it much easier."],
    insight: "Almost half of moms don't want any help creating a registry - they want to take ownership of their list and pick items that are relevant to their person needs (GCIA Oct 2019)",
    image: "/lovable-uploads/7ccb122a-dcc0-42aa-b708-2b4efed30bd9.png",
    additionalImages: [
      "/lovable-uploads/1268a6d5-7794-4290-89ec-54f8fec3cb8a.png", // New Mom Journey
      "/lovable-uploads/34674288-e5b6-4941-953c-a17ddfabc474.png"  // Customer Insights
    ]
  }, {
    title: "Create Design Principles",
    subheader: "Research backed design principles helped to focus the team",
    content: "One of the most effective ways to carry research forward — not just in spirit but in practice — is through clear, actionable design principles. After reviewing the insights as a team, we distilled what we heard into a focused set of principles that would guide our decision-making throughout the project.\n\nThese weren't abstract ideals — they were grounded in the real needs, emotions, and expectations of our registry users. Our goal was to create something that could be revisited easily and used as a north star by anyone on the team, from product to engineering to content.\n\nBy capturing the essence of what mattered most to our users, these principles helped us stay aligned, make faster decisions, and ensure that the experience we were creating stayed rooted in empathy and clarity.",
    image: "/lovable-uploads/b0a6356d-f821-42bf-9254-9434eeb0a7e9.png"
  }, {
    title: "Ideation Workshop - How Might We",
    content: "To bridge our research insights and business goals into actionable opportunities, I partnered with our staff designer to plan and facilitate a cross-functional \"How Might We\" workshop.\n\nWe brought together eight team members from design, product, engineering, and research to explore potential improvements to the registry experience — using our design principles as a foundation.\n\nThis collaborative exercise helped the team align around where to focus, and created a sense of ownership across disciplines as we moved into solutioning.",
    sessionDetails: ["We generated more than 70 \"How Might We\" statements", "Clustered them into 11 thematic categories", "Used dot voting to identify the most promising directions", "Named and prioritized the top 3 opportunity areas to guide the next phase of design"],
    image: "/lovable-uploads/696d025f-a8e0-4a25-8255-da6c90c4a2cb.png"
  }, {
    title: "Aligning Across Design, Product, and Business",
    content: "With research insights in hand and opportunity areas prioritized, the next step was alignment — not just within the design team, but across product, engineering, and the business. I led conversations that helped us distill a shared set of focus areas, ensuring that our design direction was grounded in user needs, technically feasible, and aligned with broader strategic goals.\n\nWe landed on four key areas of opportunity that met our goals and fit within our short timeline:",
    focusAreas: [
      {
        title: "Improve Onboarding",
        description: "Instead of forcing everyone through a pre-populated registry that required manual cleanup, we introduced a flexible, empowering flows that empowered the users to build their registry:",
        points: [
          "Full control for users who prefer to start from scratch",
          "Guided setup for those who want help curating", 
          "A quick-start option with a recommended, pre-filled registry"
        ]
      },
      {
        title: "Enhance Curation and Management",
        description: "We focused on making the registry easier to manage, share, and personalize:",
        points: [
          "Simplified tools to make registries public and shareable",
          "Contextual guidance and recommendations embedded within the experience",
          "Clear visibility into what's been purchased — at both the item and category level"
        ]
      },
      {
        title: "Elevate the Gifting Experience", 
        description: "We looked at the registry from the gift-giver's perspective and brought in best practices from eCommerce:",
        points: [
          "Made it easier to identify in-stock and available items",
          "Created clear pathways for in-store shoppers to attribute purchases to a registry"
        ]
      },
      {
        title: "Streamline Internal Processes",
        description: "Finally, we identified improvements that would increase agility and reduce operational friction:",
        points: [
          "Removed dependencies on engineering for updating curated inventory",
          "Built tools for merchants to manage recommendations and track performance"
        ]
      }
    ],
    conclusion: "This alignment not only clarified what we were building — it empowered every team to move forward with confidence and shared purpose."
    // No image for this section - using full width layout
  }, {
    title: "Low to High Fidelity Design",
    subheader: "Balancing Speed with Alignment",
    content: "With a tight timeline and a lean team, efficiency in our design process was critical. We started in low fidelity — wireframes gave us the flexibility to explore ideas quickly, iterate without friction, and align on the structure of the experience before investing in polished visuals.\n\nTo maintain momentum and ensure we were moving in the right direction, I established a focused cadence of reviews and standups that gave the team space for feedback, alignment, and unblockers:\n\nAs we progressed into higher fidelity, we expanded participation in our design reviews to include engineering partners. This reduced late-stage churn, strengthened cross-functional alignment, and helped the full team stay connected to design intent as implementation began.\n\nThis rhythm created a healthy pace — fast enough to keep the project on track, with just enough structure to build clarity and confidence along the way.",
    schedule: ["Weekly Design Cadence", "Mon / Wed / Fri – Leadership Reviews", "Tue / Thur – Team Critiques", "Daily – 15-minute standups to flag blockers and sync on progress"],
    image: "/lovable-uploads/dc3e659d-a7ff-4523-95e2-9c460eb8a16a.png", // Get Started, Empty, and Filled states
    additionalImages: [
      "/lovable-uploads/1859e055-78bd-4a46-8bc4-96e40ba05ed6.png", // Inspire/Browse and Empty State wireframes
      "/lovable-uploads/14b8d499-bca9-4168-9e49-66c0e7ebcf56.png"  // Current vs Enhancement comparison
    ]
  }, {
    title: "Examples of Enhancements",
    content: "Key design improvements and feature enhancements implemented throughout the registry experience.",
    fullWidthImage: "/lovable-uploads/167b31ed-0f68-4044-9d07-fd3b2e8b30ff.png"
  }, {
    title: "Constant Prioritization",
    subheader: "Staying Focused Without Losing the Spark",
    content: "With a fixed timeline and no room for extension, staying aligned on what mattered most was critical. I partnered closely with our product and engineering directors to continuously reassess scope, timelines, and effort — making sure the team was focused on the highest-impact work at every stage.\n\nThis wasn't a one-time exercise. It was a constant, collaborative practice of cutting, refining, and reshaping the roadmap to fit within what was possible — without compromising on the quality of the experience.\n\nWhen the timeline demanded tough tradeoffs, I worked to keep the team motivated and connected to the \"why.\" That sometimes meant rallying partners around features that added delight or polish — small touches that might not have been strictly required, but were essential to earning user trust and elevating the overall experience.\n\nThis balance of discipline and inspiration helped us ship something we were proud of — on time, and grounded in the needs of the people we were designing for.",
    image: "/lovable-uploads/90200b10-1ca7-46fe-b43a-422df927dde9.png"
  }, {
    title: "Results",
    subheader: "A Registry That Delivered",
    content: "The updated baby registry launched on time — a major accomplishment given the ambitious scope and tight constraints. More importantly, it was a product that truly reflected the needs of our customers.",
    table: {
      headers: ["Goals", "Results"],
      rows: [
        ["Launch on time despite tight constraints", "Successfully delivered within the fixed timeline"],
        ["Create customer-focused experience", "Built a more thoughtful, intuitive, and trustworthy registry"],
        ["Meet business objectives", "Aligned with strategic priorities and positioned team for future growth"],
        ["Maintain team morale under pressure", "Team felt proud and fulfilled with the collective accomplishment"]
      ]
    }
  }, {
    title: "Recap of Learnings",
    content: "Key learnings and methodology from the project",
    learnings: ["Established goals and how we will measure success", "High level estimates and sequencing the work", "Augment the team (1 design lead, 4 designers)", "Build empathy, learn from past research", "Ideate and iterate", "Constant partnership and prioritization to meet an aggressive timeline"],
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80"
  }];
  return <div className="min-h-screen bg-surface-primary">
      {/* Navigation */}
      <nav className="bg-surface-primary border-b border-swiss-light">
        <div className="swiss-grid py-4">
          <div className="col-span-12 flex items-center justify-between">
            <button onClick={() => navigate('/')} className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors">
              <ArrowLeft size={20} />
              <span className="text-body">Back to Portfolio</span>
            </button>
            <span className="text-title text-text-primary text-xl font-bold">Chad Mortensen</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 bg-surface-secondary">
        <div className="swiss-grid">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3 text-center">
            <h1 className="text-display text-text-primary mb-6">A rapid revamp to the Walmart registry</h1>
            <div className="w-16 h-px bg-accent-blue mx-auto mb-8"></div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="py-16">
        <div className="swiss-grid">
          <div className="col-span-12 space-y-24">
            {sections.map((section, index) => <div key={index}>
                {/* Header spans full width */}
                <div className="mb-8">
                  <h2 className={`text-headline text-text-primary font-light ${section.subheader ? 'mb-0' : 'mb-6'}`}>{section.title}</h2>
                  {section.subheader && <h3 className="text-xl text-text-secondary font-light mt-4 mb-6">{section.subheader}</h3>}
                  <div className="w-12 h-px bg-accent-teal"></div>
                </div>
                
                {/* Content and image below header */}
                <div className={section.image ? "grid lg:grid-cols-12 gap-12 items-start" : ""}>
                  <div className={section.image ? "lg:col-span-5 space-y-6" : "space-y-6"}>
                    {section.content.split('\n\n').map((paragraph, pIndex) => <p key={pIndex} className="text-body text-text-secondary leading-relaxed">{paragraph}</p>)}
                    
                    {section.goals && <div>
                        <h3 className="text-title text-text-primary font-light mb-4">Goals</h3>
                        <ul className="space-y-2">
                          {section.goals.map((goal, goalIndex) => <li key={goalIndex} className="flex items-start space-x-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 flex-shrink-0"></div>
                              <span className="text-body text-text-secondary">{goal}</span>
                            </li>)}
                        </ul>
                      </div>}
                    
                    {section.quotes && <div>
                        <h3 className="text-title text-text-primary font-light mb-4">User Feedback</h3>
                        {section.quotes.map((quote, quoteIndex) => <blockquote key={quoteIndex} className="border-l-2 border-accent-orange pl-4 mb-4">
                            <p className="text-body text-text-secondary italic">"{quote}"</p>
                          </blockquote>)}
                        {section.insight && <div className="p-4 bg-surface-secondary border border-swiss-light mt-4">
                            <p className="text-body text-text-primary font-medium">{section.insight}</p>
                          </div>}
                      </div>}
                    
                    {section.sessionDetails && <div>
                        <h3 className="text-title text-text-primary font-light mb-4">Over the course of the session:</h3>
                        <ul className="space-y-2">
                          {section.sessionDetails.map((detail, detailIndex) => <li key={detailIndex} className="flex items-start space-x-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent-aqua mt-2 flex-shrink-0"></div>
                              <span className="text-body text-text-secondary">{detail}</span>
                            </li>)}
                        </ul>
                      </div>}
                    
                    
                    {section.focusAreas && <div className="mt-8">
                        <div className="grid md:grid-cols-2 gap-8">
                          {section.focusAreas.map((area, areaIndex) => <div key={areaIndex} className="space-y-4 p-6 bg-surface-secondary">
                              <h4 className="text-title text-text-primary font-medium">{area.title}</h4>
                              <p className="text-body text-text-secondary">{area.description}</p>
                              <ul className="space-y-3">
                                {area.points.map((point, pointIndex) => <li key={pointIndex} className="flex items-start space-x-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 flex-shrink-0"></div>
                                    <span className="text-body text-text-secondary">{point}</span>
                                  </li>)}
                              </ul>
                            </div>)}
                        </div>
                        {section.conclusion && <div className="mt-8">
                            <p className="text-body text-text-secondary">{section.conclusion}</p>
                          </div>}
                      </div>}
                    
                    {section.schedule && <div>
                        <h3 className="text-title text-text-primary font-light mb-4">Schedule</h3>
                        <ul className="space-y-2 mb-4">
                          {section.schedule.map((item, itemIndex) => <li key={itemIndex} className="flex items-start space-x-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent-orange mt-2 flex-shrink-0"></div>
                              <span className="text-body text-text-secondary">{item}</span>
                            </li>)}
                        </ul>
                      </div>}
                    
                    {section.table && <div>
                        <div className="overflow-x-auto">
                          <table className="w-full border border-swiss-light">
                            <thead className="bg-surface-secondary">
                              <tr>
                                {section.table.headers.map((header, headerIndex) => (
                                  <th key={headerIndex} className="px-6 py-4 text-left text-title text-text-primary font-medium border-b border-swiss-light">
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {section.table.rows.map((row, rowIndex) => (
                                <tr key={rowIndex} className="border-b border-swiss-light">
                                  {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-6 py-4 text-body text-text-secondary">
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>}
                    
                    {section.learnings && <div>
                        <h3 className="text-title text-text-primary font-light mb-4">Key Learnings</h3>
                        <ul className="space-y-2">
                          {section.learnings.map((learning, learningIndex) => <li key={learningIndex} className="flex items-start space-x-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent-teal mt-2 flex-shrink-0"></div>
                              <span className="text-body text-text-secondary">{learning}</span>
                            </li>)}
                        </ul>
                      </div>}
                  </div>
                  
                  {/* Image - Only render if image exists */}
                  {section.image && <div className="lg:col-span-7">
                      <img 
                        src={section.image} 
                        alt={section.title} 
                        className="w-full h-full min-h-80 object-cover object-top border border-swiss-light cursor-pointer hover:opacity-90 transition-opacity" 
                        onClick={() => setSelectedImage(section.image!)}
                      />
                      
                      {/* Additional images below main image */}
                      {section.additionalImages && <div className="mt-6 space-y-4">
                          {section.additionalImages.map((imgSrc, imgIndex) => <div key={imgIndex}>
                              <img 
                                src={imgSrc} 
                                alt={`${section.title} additional image ${imgIndex + 1}`} 
                                className="w-full h-auto border border-swiss-light cursor-pointer hover:opacity-90 transition-opacity" 
                                onClick={() => setSelectedImage(imgSrc)}
                              />
                            </div>)}
                        </div>}
                    </div>}
                </div>
                
                {/* Full width image below main content */}
                {section.fullWidthImage && <div className="mt-8">
                    <img 
                      src={section.fullWidthImage} 
                      alt={`${section.title} timeline`} 
                      className="w-full h-auto border border-swiss-light cursor-pointer hover:opacity-90 transition-opacity" 
                      onClick={() => setSelectedImage(section.fullWidthImage!)}
                    />
                  </div>}
                
                {/* Add separator after each section except the last one */}
                {index < sections.length - 1 && <div className="mt-24">
                    <Separator className="bg-swiss-light" />
                  </div>}
              </div>)}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-surface-secondary border-t border-swiss-light">
        <div className="swiss-grid">
          <div className="col-span-12 text-center">
            <button onClick={() => navigate('/')} className="px-8 py-3 bg-text-primary text-surface-primary hover:bg-swiss-gray transition-colors duration-200">
              Back to Portfolio
            </button>
          </div>
        </div>
      </footer>

      {/* Image Overlay Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-7xl max-h-[90vh] p-0 border-0 bg-transparent">
          {selectedImage && (
            <img 
              src={selectedImage} 
              alt="Enlarged view" 
              className="w-full h-auto max-h-[85vh] object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>;
};
export default CaseStudy1;