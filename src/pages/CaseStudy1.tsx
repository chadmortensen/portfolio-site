import { ArrowLeft, Calendar, Users, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
const CaseStudy1 = () => {
  const navigate = useNavigate();
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
    content: "We had past research so let's not lose that in an effort to be efficient. Walmart registrant users have been asking for a greater level of control, guidance and trust within today's experience.",
    quotes: ["I became so frustrated in making the registry through the app, that I quit. It is not intuitive nor easy to navigate in order to add or change something.", "It's not as user friendly as other registries I've used. It would be better if the registry picks fell into the categories provided. That would make it much easier."],
    insight: "Almost half of moms don't want any help creating a registry - they want to take ownership of their list and pick items that are relevant to their person needs (GCIA Oct 2019)",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
  }, {
    title: "Create Design Principles",
    content: "Research backed design principles helped to focus the team",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"
  }, {
    title: "Ideation Workshop - How Might We",
    content: "After planning the workshop with our staff designer I facilitated the group in generating a list of potential areas of improvement within the experience.",
    stats: ["8 cross functional participants", "70+ ideas / HMWs", "11 categories", "Dot voting", "Name and rank top 3 categories"],
    image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?auto=format&fit=crop&w=800&q=80"
  }, {
    title: "Design + Product + Business Aligned on Our Areas of Focus",
    content: "Cross-functional alignment on key improvement areas",
    focusAreas: [{
      area: "Improve Onboarding",
      details: "Pivot away from pre-population and manually pruning the pre-built registry. Create a 3-tier strategy for customization (no help -> populated)"
    }, {
      area: "Improve Curation and Management",
      details: "Continue to provide easy access for making my registry public and to share it with others. Provide additional guidance and control by offering relevant recommendations within the registry experience"
    }, {
      area: "Improve Gifting",
      details: "Allow Gift Givers to easily find products that are available to purchase and apply ecommerce best practices"
    }, {
      area: "Improve Internal Processes",
      details: "Remove dependencies on engineering to support changes to pre-curated inventory"
    }],
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80"
  }, {
    title: "Low to High Fidelity Design",
    content: "Establishing a cadence of standups, reviews and critiques helped the team to continuously receive direction and allowed me to help unblock moments of uncertainty.",
    schedule: ["Mon, Wed, Fri = Leadership Reviews", "Tue, Thur = Team Crit", "Daily standup = 15 min"],
    note: "Later in the project we included product/engineering/design as part of reviews to reduce churn",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
  }, {
    title: "Examples of Enhancements",
    content: "Key design improvements and feature enhancements implemented throughout the registry experience.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80"
  }, {
    title: "Constant Prioritization",
    content: "Partnered with my cross functional leaders (product, engineering) to constantly reassess the scope and timelines, aggressively cutting and prioritizing features to fit the time allocated for engineering. At times I needed to rally my partners and the teams to get them excited to build in features that we thought would add delight and an extra layer of polish that was needed to build trust with the customers of the product.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
  }, {
    title: "Results",
    content: "Overall everyone was very proud of the accomplishment and the updated baby registry that was created. This version of the baby registry closer met the needs of the customer and ultimately met the business goals.",
    results: [{
      goal: "Increase quality registry creations (creations that lead to a first curation action)",
      result: "+28% vs. Last year"
    }, {
      goal: "Increase curation by 10%",
      result: "70% edited within 3-7 days. +20% increase"
    }, {
      goal: "Increase sharing by 20%",
      result: "55% shared within 7 days. +8% increase"
    }, {
      goal: "Increase purchase conversion by 25%",
      result: "GMV initially increased but then decreased starting in April possibly due to COVID"
    }],
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80"
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
                <div className={section.image ? "grid lg:grid-cols-12 gap-12 items-start" : ""}>
                  {/* Content - Full width if no image, left column if image exists */}
                  <div className={section.image ? "lg:col-span-5 space-y-6" : "space-y-6"}>
                    <h2 className="text-headline text-text-primary font-light">{section.title}</h2>
                    {section.subheader && <h3 className="text-xl text-text-secondary font-light -mt-2 my-[12px]">{section.subheader}</h3>}
                    <div className="w-12 h-px bg-accent-teal"></div>
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
                    
                    {section.stats && <div>
                        <h3 className="text-title text-text-primary font-light mb-4">Workshop Stats</h3>
                        <ul className="space-y-2">
                          {section.stats.map((stat, statIndex) => <li key={statIndex} className="flex items-start space-x-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent-aqua mt-2 flex-shrink-0"></div>
                              <span className="text-body text-text-secondary">{stat}</span>
                            </li>)}
                        </ul>
                      </div>}
                    
                    {section.focusAreas && <div>
                        <h3 className="text-title text-text-primary font-light mb-4">Focus Areas</h3>
                        <div className="space-y-4">
                          {section.focusAreas.map((area, areaIndex) => <div key={areaIndex} className="p-4 bg-surface-secondary border border-swiss-light">
                              <h4 className="text-body text-text-primary font-medium mb-2">{area.area}</h4>
                              <p className="text-body text-text-secondary">{area.details}</p>
                            </div>)}
                        </div>
                      </div>}
                    
                    {section.schedule && <div>
                        <h3 className="text-title text-text-primary font-light mb-4">Schedule</h3>
                        <ul className="space-y-2 mb-4">
                          {section.schedule.map((item, itemIndex) => <li key={itemIndex} className="flex items-start space-x-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent-orange mt-2 flex-shrink-0"></div>
                              <span className="text-body text-text-secondary">{item}</span>
                            </li>)}
                        </ul>
                        {section.note && <div className="p-4 bg-surface-secondary border border-swiss-light">
                            <p className="text-body text-text-primary">{section.note}</p>
                          </div>}
                      </div>}
                    
                    {section.results && <div>
                        <h3 className="text-title text-text-primary font-light mb-4">Results</h3>
                        <div className="space-y-4">
                          {section.results.map((result, resultIndex) => <div key={resultIndex} className="p-4 bg-surface-secondary border border-swiss-light">
                              <h4 className="text-body text-text-primary font-medium mb-2">{result.goal}</h4>
                              <p className="text-body text-accent-blue font-medium">{result.result}</p>
                            </div>)}
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
                      <img src={section.image} alt={section.title} className="w-full h-full min-h-80 object-cover object-top border border-swiss-light" />
                    </div>}
                </div>
                
                {/* Full width image below main content */}
                {section.fullWidthImage && <div className="mt-8">
                    <img src={section.fullWidthImage} alt={`${section.title} timeline`} className="w-full h-auto border border-swiss-light" />
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
    </div>;
};
export default CaseStudy1;