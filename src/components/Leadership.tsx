import { Shield, TrendingUp, Users, Award } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

const Leadership = () => {
  const { content } = useLanguage();

  const principles = [
    { icon: Shield, ...content.leadership.principles[0] },
    { icon: TrendingUp, ...content.leadership.principles[1] },
    { icon: Users, ...content.leadership.principles[2] },
    { icon: Award, ...content.leadership.principles[3] },
  ];

  return (
    <section id="leadership" className="py-24 bg-surface-secondary">
      <div className="swiss-grid fade-in">
        <div className="col-span-12 text-center mb-16">
          <h2 className="text-headline text-text-primary mb-4">{content.leadership.title}</h2>
          <div className="w-16 h-px bg-accent-aqua mx-auto mb-6" />
          <p className="text-body text-text-secondary max-w-4xl mx-auto">{content.leadership.intro}</p>
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
