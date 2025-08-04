import { ArrowLeft, Calendar, Users, Target, X, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import PresentationMode from "@/components/PresentationMode";

const CaseStudy3 = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  const sections = [
    {
      title: "The Challenge",
      content: "At Brightside Health, several parallel efforts were in motion to improve the intake funnel. However, they were happening in isolation, each focused on short-term gains without a shared sense of direction. I encouraged the designer on the growth squad to pause and consider a more expansive approach. What if we looked beyond the immediate constraints and imagined what a truly exceptional experience could be?\n\nThe business needed to increase conversion rates and support a wider range of marketing channels. From the user's perspective, the goal was to feel confident in their decisions about seeking care and understanding the cost of services.\n\nSuccess was defined by the squad as improved conversion and the creation of a more adaptable intake flow that could support diverse user journeys. Executives wanted to know that the team had a long-term plan, and the squad needed a vision to unify their efforts and guide decision-making.",
      goals: [
        "Increase conversion rate for prospective members signing up for Brightside Health",
        "Create a flexible solution for new marketing channels", 
        "Balance a concise signup process with capturing important customer health information that assists with treatment"
      ],
      image: "/lovable-uploads/653ebb9d-20fb-4574-8a3e-ce19d02d793c.png"
    },
    {
      title: "The Data",
      subheader: "Grounded decisions through analytics and insights",
      content: "Our design decisions were grounded in both qualitative and quantitative inputs. These included customer survey feedback, funnel analytics, and a competitive audit.\n\nAnalytics showed that the most significant drop-offs occurred at high-friction moments, such as account creation and payment. Interestingly, the long series of personal and health-related questions did contribute to some attrition, but the impact was relatively minor.\n\nAs a side effort, I developed a GPT-based assistant to help designers and product managers generate analytics reports. This tool provided step-by-step instructions for using Brightside's data tools and helped promote a more data-informed culture across the product organization. Although it was not part of the original project scope, it was a valuable enabler.\n\nWe used these insights to identify opportunity areas. The brainstorm process helped us connect what users were telling us with what the data confirmed, allowing us to generate targeted design ideas that addressed both."
    },
    {
      title: "Competitive Audit", 
      subheader: "Understanding the landscape",
      content: "To understand how Brightside compared to other services, I gathered input from stakeholders and conducted a scan of leading telehealth and mental health providers. Using a combination of internal suggestions and external research, I identified 11 companies to include in the audit.\n\nRather than just focusing on individual screens, I mapped each company's intake journey to get a full view of the process. This helped us assess the overall structure, tone, and flow of their experiences.\n\nOne finding stood out immediately. Brightside's intake process had 180 distinct steps. The next closest competitor had 70, and most were in the range of 20 to 40 steps.",
      keyFindings: [
        "The order in which information was requested varied widely across competitors.",
        "Only one other company, Hims, collected full personal and medical history during the initial sign-up. Others either postponed this step or conducted it during a follow-up.",
        "About half of the competitors did not perform an insurance check early in the process, possibly due to differences in their service models."
      ],
      insight: "The main gap was clear. Brightside asked significantly more from users before they even created an account, which made the experience feel heavier and more intrusive than others in the space."
    },
    {
      title: "Ideation",
      subheader: "Expanding beyond immediate constraints", 
      content: "Unlike many vision projects, this effort did not begin with a structured group brainstorm. The designer had already started working on near-term improvements. My goal was to help him think more broadly and explore directions that weren't limited by what could be built in the next sprint.\n\nInstead of formal workshops, we used a series of design critiques to push the work further. I challenged him to integrate new insights from the research and bring more ambition into the designs.\n\nThrough critiques, we evaluated which ideas could be combined, simplified, or expanded. This iterative approach helped us shape a stronger, more inspiring vision.",
      standoutIdeas: [
        "Use AI to offer helpful guidance during complex decision points, such as selecting a payment method or understanding insurance.",
        "Introduce a more human tone by incorporating videos and personalized therapist content, making the process feel more like a conversation than a transaction."
      ]
    },
    {
      title: "Key Aspects of the Design Vision",
      content: "The design vision focused on three guiding principles that would transform the user experience:",
      designPrinciples: [
        {
          title: "More Human",
          description: "We aimed to create a sign-up process that felt supportive and empathetic. Video content helped explain complicated decisions. We also highlighted therapist bios and working styles to create a stronger emotional connection between patient and provider."
        },
        {
          title: "More Assistive (AI-Driven)", 
          description: "While AI was not the core of the vision, it played a valuable role in making the experience feel smarter and more responsive. It surfaced relevant content at the right time and used natural language to reduce friction."
        },
        {
          title: "More Concise",
          description: "We removed unnecessary steps, combined related screens, and postponed some questions until after the user created an account. This helped make the experience shorter and less mentally taxing."
        }
      ],
      tradeoffs: "We did face some trade-offs. Removing questions reduced friction, but some of that information was useful to therapists during their first session. We resolved this by determining which data could be safely collected later without affecting clinical readiness."
    },
    {
      title: "Output: Prototype & Presentation",
      subheader: "Bringing the vision to life",
      content: "The final output included a functional prototype of the redesigned intake experience. Built in Figma, it allowed stakeholders to click through and experience the flow firsthand. It was also embedded in a Figma Slides presentation to provide context and narrative.\n\nThe prototype was shared with the head of product, the growth squad, and the CEO. The CEO's response was brief but encouraging. He said it was clear that the work was thoughtful and asked when the new experience could be implemented.\n\nMore importantly, the prototype provided a concrete vision. It gave the team something to rally around and helped connect near-term initiatives with long-term goals."
    },
    {
      title: "Results",
      subheader: "Impact and transformation",
      content: "While the full vision has not yet been implemented, it has already begun to shape the team's direction.\n\nThe design helped validate that the squad's current roadmap was on the right track and provided a more ambitious goal to work toward. It reinforced the value of design as a strategic partner, not just a delivery function.\n\nThe head of engineering noted that he had a clearer understanding of why the team was building what they were building. This clarity improved collaboration and focus.",
      personalReflection: "Personally, I'm most proud of the growth I saw in the designer. He shifted from solving isolated problems to thinking systemically and aspirationally. That shift — from asking what's feasible to imagining what's possible — is where real transformation begins."
    }
  ];

  if (isPresentationMode) {
    return (
      <PresentationMode
        sections={sections}
        onExit={() => setIsPresentationMode(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-surface-primary">
      {/* Navigation */}
      <nav className="bg-surface-primary border-b border-swiss-light py-4">
        <div className="swiss-grid">
          <div className="col-span-12 flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="text-body">Back to Portfolio</span>
            </button>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPresentationMode(true)}
                className="opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center space-x-2 text-text-secondary hover:text-text-primary"
              >
                <Play size={16} />
                <span className="text-sm">Presentation Mode</span>
              </Button>
              <span className="text-body text-text-primary font-bold">Chad Mortensen</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 bg-surface-secondary">
        <div className="swiss-grid">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3 text-center">
            <h1 className="text-display text-text-primary mb-6">
              Brightside Health – Designing a Better Way In
            </h1>
            <div className="w-16 h-px bg-accent-blue mx-auto mb-8"></div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="py-16">
        <div className="swiss-grid">
          <div className="col-span-12 space-y-24">
            {sections.map((section, index) => (
              <div key={index}>
                {/* Header spans full width */}
                <div className="mb-8">
                  <h2 className={`text-headline text-text-primary font-light ${section.subheader ? 'mb-0' : 'mb-6'}`}>
                    {section.title}
                  </h2>
                  {section.subheader && (
                    <h3 className="text-xl text-text-secondary font-light mt-4 mb-6">
                      {section.subheader}
                    </h3>
                  )}
                  <div className="w-12 h-px bg-accent-teal"></div>
                </div>
                
                {/* Content and image below header */}
                <div className={('image' in section) ? "grid lg:grid-cols-12 gap-12 items-start" : ""}>
                  <div className={('image' in section) ? "lg:col-span-8 space-y-6" : "space-y-6"}>
                    {section.content.split('\n\n').map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-body text-text-secondary leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                    
                    {section.goals && (
                      <div>
                        <h3 className="text-title text-text-primary font-light mb-4">Goals</h3>
                        <ul className="space-y-2">
                          {section.goals.map((goal, goalIndex) => (
                            <li key={goalIndex} className="flex items-start space-x-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 flex-shrink-0"></div>
                              <span className="text-body text-text-secondary">{goal}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {section.keyFindings && (
                      <div>
                        <h3 className="text-title text-text-primary font-light mb-4">Key Findings</h3>
                        <ul className="space-y-2">
                          {section.keyFindings.map((finding, findingIndex) => (
                            <li key={findingIndex} className="flex items-start space-x-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent-orange mt-2 flex-shrink-0"></div>
                              <span className="text-body text-text-secondary">{finding}</span>
                            </li>
                          ))}
                        </ul>
                        {section.insight && (
                          <div className="p-4 bg-surface-secondary border border-swiss-light mt-4">
                            <p className="text-body text-text-primary font-medium">{section.insight}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {section.standoutIdeas && (
                      <div>
                        <h3 className="text-title text-text-primary font-light mb-4">Two Standout Ideas</h3>
                        <ul className="space-y-2">
                          {section.standoutIdeas.map((idea, ideaIndex) => (
                            <li key={ideaIndex} className="flex items-start space-x-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent-teal mt-2 flex-shrink-0"></div>
                              <span className="text-body text-text-secondary">{idea}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {section.designPrinciples && (
                      <div>
                        <div className="space-y-6">
                          {section.designPrinciples.map((principle, principleIndex) => (
                            <div key={principleIndex} className="p-6 bg-surface-secondary border border-swiss-light">
                              <h4 className="text-title text-text-primary font-medium mb-3">{principle.title}</h4>
                              <p className="text-body text-text-secondary">{principle.description}</p>
                            </div>
                          ))}
                        </div>
                        {section.tradeoffs && (
                          <div className="mt-6 p-4 bg-surface-secondary border border-swiss-light">
                            <h4 className="text-title text-text-primary font-medium mb-2">Trade-offs</h4>
                            <p className="text-body text-text-secondary">{section.tradeoffs}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {section.personalReflection && (
                      <div className="p-4 bg-surface-secondary border border-swiss-light">
                        <h4 className="text-title text-text-primary font-medium mb-2">Personal Reflection</h4>
                        <p className="text-body text-text-secondary italic">{section.personalReflection}</p>
                      </div>
                    )}
                  </div>
                  
                    {('image' in section) && (
                     <div className="lg:col-span-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <img
                            src={(section as any).image}
                            alt={`${section.title} visual`}
                            className="w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setSelectedImage((section as any).image)}
                          />
                        </DialogTrigger>
                        <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto bg-surface-primary">
                          <img
                            src={(section as any).image}
                            alt={`${section.title} visual`}
                            className="w-full h-auto"
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudy3;