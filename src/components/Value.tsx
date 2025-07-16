
import { Users, Target, TrendingUp, Heart, Building } from "lucide-react";

const Value = () => {
  const valueProps = [
    {
      icon: Users,
      title: "Build trusted cross-functional partnerships",
      description: "Strong collaboration with product, engineering, analytics, and research is foundational. I invest early and consistently in these relationships to ensure design is part of strategic decision-making — not an afterthought."
    },
    {
      icon: Target,
      title: "Connect design to company strategy",
      description: "I help design teams zoom out. By aligning day-to-day efforts with broader business goals, I ensure we're focusing on what matters most — advocating for the right resourcing and investing in high-leverage work."
    },
    {
      icon: TrendingUp,
      title: "Grow people and careers",
      description: "Coaching is core to my leadership. I guide performance with empathy and clarity, give honest and useful feedback, and create opportunities for career progression. I strive to make growth conversations feel supportive, not evaluative."
    },
    {
      icon: Heart,
      title: "Design for team health and effectiveness",
      description: "I keep a pulse on team morale and operational clarity — listening for signals and adjusting processes, rituals, or roles to support long-term health, cohesion, and effectiveness."
    },
    {
      icon: Building,
      title: "Contribute to org-wide design culture",
      description: "Beyond my direct team, I contribute to the broader design organization — leading or sponsoring initiatives around hiring, recognition, design thinking, and internal education that make the culture stronger and more inclusive."
    }
  ];

  return (
    <section id="value" className="py-24 bg-surface-primary">
      <div className="swiss-grid fade-in">
        <div className="col-span-12 text-center mb-20">
          <h2 className="text-headline text-text-primary mb-4">Value I Bring</h2>
          <div className="w-16 h-px bg-accent-orange mx-auto mb-6"></div>
          <p className="text-body text-text-secondary max-w-3xl mx-auto">
            Organizations partner with me to unlock their potential and achieve breakthrough results through strategic leadership and operational excellence.
          </p>
        </div>

        <div className="col-span-12 space-y-16">
          {valueProps.map((value, index) => (
            <div key={index} className="flex items-start space-x-8 group">
              <div className="flex-shrink-0 mt-1">
                <div className="w-12 h-12 border-2 border-swiss-light flex items-center justify-center group-hover:border-accent-teal transition-colors duration-300">
                  <value.icon className="text-accent-teal group-hover:text-accent-blue transition-colors duration-300" size={20} />
                </div>
              </div>
              <div className="flex-1 border-b border-swiss-light pb-16 last:border-b-0 last:pb-0">
                <h3 className="text-title text-text-primary font-light mb-4 group-hover:text-accent-blue transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-body text-text-secondary leading-relaxed max-w-4xl">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Value;
