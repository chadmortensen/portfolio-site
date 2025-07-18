import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
const CaseStudy2 = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const sections = [{
    title: "Why This, and Why Now?",
    content: "Our fulfillment teams had roadmaps and short-term goals, but something was missing: a unifying north star. Without shared strategic guideposts, it was difficult to make confident decisions or understand how each initiative fit into Etsy's broader business direction. I saw an opportunity to fill that gap — not with a rigid product plan, but with a shared vision and set of principles grounded in user needs, market realities, and our brand's mission.",
    sectionImage: "/lovable-uploads/27180526-d8f4-4adb-8cfe-dc0f70fd58a7.png"
  }, {
    title: "Goals",
    content: "This strategic alignment initiative focused on three key objectives:",
    goals: ["Create a team vision rooted in research and aligned with Etsy's business strategy", "Define strategic guideposts to shape yearly and quarterly planning", "Build consensus among cross-functional leaders that this alignment work was essential"]
  }, {
    title: "Participants",
    myRole: ["Championed the need for strategic alignment with my partners, using past successes to make the case for investing time in this work", "Designed and orchestrated a three-day workshop, including defining activities and securing a neutral facilitator so I could participate fully alongside my peers", "Synthesized the output into enduring artifacts — a vision statement and set of fulfillment principles — that the team could carry forward into planning and execution"],
    partneredWith: ["Research leadership", "Staff Designer (who facilitated the sessions)"],
    participants: ["GM/VP of Fulfillment", "Product, Engineering, and Research leaders", "Product Marketing, Analytics, and Finance leads", "Product Design Manager"]
  }, {
    title: "Workshop Design",
    content: "The three-day workshop was designed to inspire alignment and co-create meaningful direction for the team. Key activities included:",
    sessionDetails: ["Grounding in research — analytics insights, market trends, brand positioning, and a reminder of Etsy's mission", "Thinking Hats exercise — using personas like the optimist, pessimist, and visionary to explore seller needs from different vantage points", "Future View — ideating what an ideal fulfillment experience could look like in 3–5 years", "Cover Story — imagining a future success story, which I then used as the basis for drafting our vision"],
    workshopImages: ["/lovable-uploads/136ddcb5-bb8b-4573-a9e6-8379fd19dca7.png"]
  }, {
    title: "The Output",
    subheader: "Vision and Principles That Shaped Our Strategy",
    content: "The workshop produced two key artifacts that became the foundation for our team's strategic direction.",
    visionContent: "\"Commodity based ecommerce has put an emphasis on immediate delivery of items from a warehouse shelf to your door and has set this expectation with shoppers. Etsy's buyers shop directly from independent sellers who make handmade items and source vintage goods. The unique nature of our marketplace and the items being sold introduces an unfamiliar fulfillment process. By providing a clear and trustworthy experience we can reset and establish meaningful expectations that are unique to Etsy. By doing this we can then redirect the focus on what matters most - the special.\"",
    principlesContent: "Our principles served as the scaffolding for roadmap planning. These weren't timelines or feature lists — they were evergreen beliefs that helped guide investment decisions and shaped how we evaluated success. They aligned our work around what truly mattered for Etsy sellers."
  }, {
    title: "Reflections & Takeaways",
    subheader: "Leading Strategic Alignment in Cross-Functional Teams",
    content: "This initiative demonstrated the power of bringing diverse perspectives together to create shared understanding and direction.",
    learnings: ["Workshop Format Creates Ownership: The collaborative format created high ownership and alignment across disciplines. Because leaders helped shape the output, they became advocates for it within their teams.", "Co-Creation Builds Trust: Co-creating in real time helped deepen trust and cohesion, especially in a distributed setting.", "Strategic Artifacts Drive Action: The resulting vision and principles weren't just artifacts — they directly informed our yearly planning and long-term strategy discussions.", "Preserve Time for Exploration: We had planned to explore \"big bets\" and create visual prototypes for our future vision, but time constraints forced us to leave that behind. Preserving space for that exploration would have been a powerful complement to our strategic framework."]
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
            <h1 className="text-display text-text-primary mb-4">Fulfillment at Etsy</h1>
            <p className="text-xl text-text-secondary mb-6">Crafting a Shared Vision and Guiding Principles</p>
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
                  <h2 className={`text-headline text-text-primary font-light ${section.subheader ? 'mb-0' : 'mb-6'}`}>
                    {section.title}
                  </h2>
                  {section.subheader && <h3 className="text-xl text-text-secondary font-light mt-4 mb-6">{section.subheader}</h3>}
                  <div className="w-12 h-px bg-accent-teal"></div>
                </div>
                
                {/* Content and image below header */}
                <div className={(section.workshopImages || section.sectionImage) ? "grid lg:grid-cols-12 gap-12 items-start" : ""}>
                  <div className={(section.workshopImages || section.sectionImage) ? "lg:col-span-6 space-y-6" : "space-y-6"}>
                  {section.content && section.content.split('\n\n').map((paragraph, pIndex) => <p key={pIndex} className="text-body text-text-secondary leading-relaxed">
                      {paragraph}
                    </p>)}
                  
                  {section.goals && <div>
                      
                      <ul className="space-y-2">
                        {section.goals.map((goal, goalIndex) => <li key={goalIndex} className="flex items-start space-x-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 flex-shrink-0"></div>
                            <span className="text-body text-text-secondary">{goal}</span>
                          </li>)}
                      </ul>
                    </div>}

                   {section.title === "Participants" && <div className="grid md:grid-cols-2 gap-8 mt-6">
                      {/* My role - First column */}
                      <div>
                        <h3 className="text-lg text-text-primary font-medium mb-4">My role:</h3>
                        <ul className="space-y-2">
                          {section.myRole?.map((role, roleIndex) => <li key={roleIndex} className="flex items-start space-x-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 flex-shrink-0"></div>
                              <span className="text-body text-text-secondary">{role}</span>
                            </li>)}
                        </ul>
                      </div>

                      {/* I partnered with & Participants - Second column */}
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-lg text-text-primary font-medium mb-4">I partnered with:</h3>
                          <ul className="space-y-2">
                            {section.partneredWith?.map((partner, partnerIndex) => <li key={partnerIndex} className="flex items-start space-x-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 flex-shrink-0"></div>
                                <span className="text-body text-text-secondary">{partner}</span>
                              </li>)}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-lg text-text-primary font-medium mb-4">Participants included:</h3>
                          <ul className="space-y-2">
                            {section.participants?.map((participant, participantIndex) => <li key={participantIndex} className="flex items-start space-x-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 flex-shrink-0"></div>
                                <span className="text-body text-text-secondary">{participant}</span>
                              </li>)}
                          </ul>
                        </div>
                      </div>
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

                  </div>

                  {/* Workshop Images - Right side */}
                  {section.workshopImages && <div className="lg:col-span-6 space-y-4">
                      {section.workshopImages.map((image, imageIndex) => (
                        <Dialog key={imageIndex}>
                          <DialogTrigger asChild>
                            <div className="cursor-pointer hover:opacity-90 transition-opacity">
                              <img 
                                src={image} 
                                alt={`Workshop design image ${imageIndex + 1}`}
                                className="w-full h-auto border border-swiss-light rounded-lg shadow-sm"
                              />
                            </div>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl w-full p-0">
                            <DialogTitle className="sr-only">Workshop design image {imageIndex + 1}</DialogTitle>
                            <DialogDescription className="sr-only">
                              Enlarged view of workshop design image {imageIndex + 1}
                            </DialogDescription>
                            <img 
                              src={image} 
                              alt={`Workshop design image ${imageIndex + 1}`}
                              className="w-full h-auto"
                            />
                          </DialogContent>
                        </Dialog>
                      ))}
                    </div>}

                  {/* Section Image - Right side */}
                  {section.sectionImage && <div className="lg:col-span-6">
                      <Dialog>
                        <DialogTrigger asChild>
                          <div className="cursor-pointer hover:opacity-90 transition-opacity">
                            <img 
                              src={section.sectionImage} 
                              alt={`${section.title} illustration`}
                              className="w-full h-auto border border-swiss-light rounded-lg shadow-sm"
                            />
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl w-full p-0">
                          <DialogTitle className="sr-only">{section.title} illustration</DialogTitle>
                          <DialogDescription className="sr-only">
                            Enlarged view of {section.title} illustration
                          </DialogDescription>
                          <img 
                            src={section.sectionImage} 
                            alt={`${section.title} illustration`}
                            className="w-full h-auto"
                          />
                        </DialogContent>
                      </Dialog>
                    </div>}
                </div>
                
                {section.title === "The Output" && <div className="space-y-8">
                    <div className="p-6 bg-surface-secondary border border-swiss-light">
                      <h3 className="text-title text-text-primary font-medium mb-4">Fulfillment Vision</h3>
                      <p className="text-body text-text-secondary italic leading-relaxed">{section.visionContent}</p>
                    </div>
                    
                    <div className="p-6 bg-surface-secondary border border-swiss-light">
                      <h3 className="text-title text-text-primary font-medium mb-4">Fulfillment Principles</h3>
                      <p className="text-body text-text-secondary leading-relaxed">{section.principlesContent}</p>
                    </div>
                  </div>}

                {section.learnings && <div className="grid md:grid-cols-2 gap-6 mt-6">
                    {section.learnings.map((learning, learningIndex) => {
                const [title, description] = learning.split(': ');
                return <div key={learningIndex} className="space-y-4 p-6 bg-surface-secondary">
                          <h4 className="text-title text-text-primary font-medium">{title}</h4>
                          <p className="text-body text-text-secondary">{description}</p>
                        </div>;
              })}
                  </div>}
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};
export default CaseStudy2;