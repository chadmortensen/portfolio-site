import { ArrowLeft, Target, Users, Lightbulb, Calendar, Award, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CaseStudy2 = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Why This, and Why Now?",
      content: "Our fulfillment teams had roadmaps and short-term goals, but something was missing: a unifying north star. Without shared strategic guideposts, it was difficult to make confident decisions or understand how each initiative fit into Etsy's broader business direction. I saw an opportunity to fill that gap — not with a rigid product plan, but with a shared vision and set of principles grounded in user needs, market realities, and our brand's mission."
    },
    {
      title: "Goals",
      content: "This strategic alignment initiative focused on three key objectives:",
      bullets: [
        "Create a team vision rooted in research and aligned with Etsy's business strategy",
        "Define strategic guideposts to shape yearly and quarterly planning", 
        "Build consensus among cross-functional leaders that this alignment work was essential"
      ]
    },
    {
      title: "My Role",
      content: "I led the effort from the ground up:",
      bullets: [
        "Championed the need for strategic alignment with my partners, using past successes to make the case for investing time in this work",
        "Designed and orchestrated a three-day workshop, including defining activities and securing a neutral facilitator so I could participate fully alongside my peers",
        "Synthesized the output into enduring artifacts — a vision statement and set of fulfillment principles — that the team could carry forward into planning and execution"
      ]
    },
    {
      title: "Who Was Involved",
      content: "This was a deeply cross-functional effort. I partnered closely with research leadership and a Staff Designer (who facilitated the sessions). Participants included:",
      bullets: [
        "GM/VP of Fulfillment",
        "Product, Engineering, and Research leaders", 
        "Product Marketing, Analytics, and Finance leads",
        "Product Design Manager"
      ]
    },
    {
      title: "Workshop Design",
      content: "The three-day workshop was designed to inspire alignment and co-create meaningful direction for the team. Key activities included:",
      bullets: [
        "Grounding in research — analytics insights, market trends, brand positioning, and a reminder of Etsy's mission",
        "Thinking Hats exercise — using personas like the optimist, pessimist, and visionary to explore seller needs from different vantage points",
        "Future View — ideating what an ideal fulfillment experience could look like in 3–5 years",
        "Cover Story — imagining a future success story, which I then used as the basis for drafting our vision"
      ]
    },
    {
      title: "The Output",
      subheader: "Vision and Principles That Shaped Our Strategy",
      content: "The workshop produced two key artifacts that became the foundation for our team's strategic direction.",
      visionContent: "\"Commodity based ecommerce has put an emphasis on immediate delivery of items from a warehouse shelf to your door and has set this expectation with shoppers. Etsy's buyers shop directly from independent sellers who make handmade items and source vintage goods. The unique nature of our marketplace and the items being sold introduces an unfamiliar fulfillment process. By providing a clear and trustworthy experience we can reset and establish meaningful expectations that are unique to Etsy. By doing this we can then redirect the focus on what matters most - the special.\"",
      principlesContent: "Our principles served as the scaffolding for roadmap planning. These weren't timelines or feature lists — they were evergreen beliefs that helped guide investment decisions and shaped how we evaluated success. They aligned our work around what truly mattered for Etsy sellers."
    },
    {
      title: "Reflections & Takeaways",
      subheader: "Leading Strategic Alignment in Cross-Functional Teams",
      content: "This initiative demonstrated the power of bringing diverse perspectives together to create shared understanding and direction.",
      learnings: [
        "Workshop Format Creates Ownership: The collaborative format created high ownership and alignment across disciplines. Because leaders helped shape the output, they became advocates for it within their teams.",
        "Co-Creation Builds Trust: Co-creating in real time helped deepen trust and cohesion, especially in a distributed setting.",
        "Strategic Artifacts Drive Action: The resulting vision and principles weren't just artifacts — they directly informed our yearly planning and long-term strategy discussions.",
        "Preserve Time for Exploration: We had planned to explore \"big bets\" and create visual prototypes for our future vision, but time constraints forced us to leave that behind. Preserving space for that exploration would have been a powerful complement to our strategic framework."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-mist">
      {/* Header */}
      <div className="bg-forest-dark text-white py-8">
        <div className="max-w-4xl mx-auto px-6">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center space-x-2 text-sage hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back to Portfolio</span>
          </button>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Fulfillment at Etsy: Crafting a Shared Vision and Guiding Principles</h1>
          <p className="text-xl text-mist">Strategic Vision & Cross-Functional Alignment</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {sections.map((section, index) => (
          <section key={index} className="bg-white rounded-xl p-8 shadow-lg mb-12">
            {section.title === "The Output" && (
              <div className="flex items-center space-x-3 mb-6">
                <Award className="text-sage" size={28} />
                <div>
                  <h2 className="text-3xl font-bold text-forest-dark">{section.title}</h2>
                  {section.subheader && (
                    <p className="text-lg text-forest-medium mt-1">{section.subheader}</p>
                  )}
                </div>
              </div>
            )}
            
            {section.title === "Reflections & Takeaways" && (
              <div className="flex items-center space-x-3 mb-6">
                <Lightbulb className="text-moss" size={28} />
                <div>
                  <h2 className="text-3xl font-bold text-forest-dark">{section.title}</h2>
                  {section.subheader && (
                    <p className="text-lg text-forest-medium mt-1">{section.subheader}</p>
                  )}
                </div>
              </div>
            )}

            {section.title !== "The Output" && section.title !== "Reflections & Takeaways" && (
              <h2 className="text-3xl font-bold text-forest-dark mb-6">{section.title}</h2>
            )}

            <div className="space-y-6 text-forest-medium">
              <p className="text-lg leading-relaxed">{section.content}</p>
              
              {section.bullets && (
                <ul className="list-disc list-inside space-y-2 ml-4">
                  {section.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex}>{bullet}</li>
                  ))}
                </ul>
              )}

              {section.title === "The Output" && (
                <div className="space-y-8">
                  <div className="bg-sage/10 rounded-lg p-6 border border-sage/20">
                    <h3 className="text-xl font-bold text-forest-dark mb-4">Fulfillment Vision</h3>
                    <p className="italic text-forest-medium leading-relaxed">{section.visionContent}</p>
                  </div>
                  
                  <div className="bg-moss/10 rounded-lg p-6 border border-moss/20">
                    <h3 className="text-xl font-bold text-forest-dark mb-4">Fulfillment Principles</h3>
                    <p className="text-forest-medium leading-relaxed">{section.principlesContent}</p>
                  </div>
                </div>
              )}

              {section.learnings && (
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  {section.learnings.map((learning, learningIndex) => {
                    const [title, description] = learning.split(': ');
                    return (
                      <div key={learningIndex} className="bg-mist/50 rounded-lg p-6">
                        <h3 className="font-bold text-forest-dark mb-2">{title}</h3>
                        <p className="text-sm">{description}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default CaseStudy2;