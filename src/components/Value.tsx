
import { TrendingUp, Shield, Rocket, Star } from "lucide-react";

const Value = () => {
  const valueProps = [
    {
      icon: TrendingUp,
      title: "Strategic Growth",
      description: "I bring a proven track record of identifying opportunities, developing comprehensive strategies, and executing plans that drive sustainable growth and competitive advantage."
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "My approach balances innovation with prudent risk management, ensuring organizations can pursue ambitious goals while protecting against potential pitfalls."
    },
    {
      icon: Rocket,
      title: "Operational Excellence",
      description: "I excel at optimizing processes, implementing best practices, and creating systems that scale efficiently while maintaining quality and team satisfaction."
    },
    {
      icon: Star,
      title: "Culture Development",
      description: "I specialize in building high-performance cultures where talent thrives, collaboration flourishes, and teams consistently exceed expectations."
    }
  ];

  return (
    <section id="value" className="py-24 bg-surface-primary">
      <div className="swiss-grid fade-in">
        <div className="col-span-12 text-center mb-16">
          <h2 className="text-headline text-text-primary mb-4">Value I Bring</h2>
          <div className="w-16 h-px bg-accent-orange mx-auto mb-6"></div>
          <p className="text-body text-text-secondary max-w-3xl mx-auto">
            Organizations partner with me to unlock their potential and achieve breakthrough results through strategic leadership and operational excellence.
          </p>
        </div>

        <div className="col-span-12 grid lg:grid-cols-2 gap-12">
          {valueProps.map((value, index) => (
            <div key={index} className="flex items-start space-x-6 p-8 bg-surface-secondary border border-swiss-light hover:border-accent-blue/30 transition-colors duration-200">
              <div className="p-3 bg-surface-primary border border-swiss-light flex-shrink-0">
                <value.icon className="text-accent-teal" size={24} />
              </div>
              <div>
                <h3 className="text-title text-text-primary font-light mb-4">{value.title}</h3>
                <p className="text-body text-text-secondary leading-relaxed">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Value;
