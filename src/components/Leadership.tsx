
import { Shield, TrendingUp, Users, Award } from "lucide-react";

const Leadership = () => {
  const principles = [
    {
      icon: Shield,
      title: "Transparency builds trust",
      description: "I lead with honesty and clarity, sharing context, being direct, and creating space for open conversations. Trust starts with being someone your team can count on."
    },
    {
      icon: TrendingUp,
      title: "Celebrate progress, not just outcomes",
      description: "Design is demanding. It's easy to skip the moments that matter. I make time to recognize great work, reflect on what we've learned, and keep morale high."
    },
    {
      icon: Users,
      title: "Diverse perspectives make better products",
      description: "I believe the best teams reflect a range of backgrounds and experiences. Diversity makes our work stronger, more inclusive, and more relevant."
    },
    {
      icon: Award,
      title: "Craft matters",
      description: "I hold a high bar for quality and help teams rise to it through thoughtful critique, collaboration, and shared pride in the work. Great design should not only be effective but also something we're genuinely proud to put into the world."
    }
  ];

  return (
    <section id="leadership" className="py-24 bg-surface-secondary">
      <div className="swiss-grid fade-in">
        <div className="col-span-12 text-center mb-16">
          <h2 className="text-headline text-text-primary mb-4">My Leadership Style</h2>
          <div className="h-[3px] w-[7rem] bg-accent-aqua mx-auto mb-6"></div>
          <p className="text-body text-text-secondary max-w-4xl mx-auto">
            Leading design teams is about more than setting direction, it's about creating an environment where people can thrive, grow, and do their best work. Here's what I believe makes that possible:
          </p>
        </div>

        <div className="col-span-12 grid lg:grid-cols-2 gap-12">
          {principles.map((principle, index) => (
            <div key={index} className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <principle.icon className="text-accent-blue" size={28} />
              </div>
              <div>
                <h3 className="text-title text-text-primary font-light mb-4">{principle.title}</h3>
                <p className="text-body text-text-secondary leading-relaxed">{principle.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leadership;
