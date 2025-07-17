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
                          {section.focusAreas.map((area, areaIndex) => <div key={areaIndex} className="space-y-4">
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
                        {section.conclusion && <div className="mt-8 p-6 bg-surface-secondary border border-swiss-light">
                            <p className="text-body text-text-primary">{section.conclusion}</p>
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
                      
                      {/* Additional images below main image */}
                      {section.additionalImages && <div className="mt-6 space-y-4">
                          {section.additionalImages.map((imgSrc, imgIndex) => <div key={imgIndex}>
                              <img src={imgSrc} alt={`${section.title} additional image ${imgIndex + 1}`} className="w-full h-auto border border-swiss-light" />
                            </div>)}
                        </div>}
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