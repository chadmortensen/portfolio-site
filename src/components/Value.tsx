
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
    <section id="value" className="section-divider">
      <div className="w-full">
        <div className="mondrian-navy py-16 px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Value I Bring</h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Organizations partner with me to unlock their potential and achieve breakthrough results through strategic leadership and operational excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {valueProps.map((value, index) => (
            <div
              key={index}
              className={`px-8 py-12 transition-all duration-300 hover:shadow-xl ${
                index === 0 ? 'mondrian-coral' :
                index === 1 ? 'mondrian-blue' :
                index === 2 ? 'mondrian-teal' :
                'mondrian-white'
              }`}
            >
              <div className="max-w-lg mx-auto">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 ${
                    index === 3 ? 'bg-mondrian-black' : 'bg-white'
                  }`}>
                    <value.icon className={`${
                      index === 3 ? 'text-white' : 'text-mondrian-black'
                    }`} size={24} />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold mb-3 ${
                      index === 3 ? 'text-mondrian-black' : 'text-white'
                    }`}>{value.title}</h3>
                    <p className={`leading-relaxed ${
                      index === 3 ? 'text-mondrian-black' : 'text-white'
                    }`}>{value.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Value;
