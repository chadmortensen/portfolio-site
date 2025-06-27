
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
    <section id="value" className="py-20 mondrian-gray">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-mondrian-black mb-6">Value I Bring</h2>
          <p className="text-xl text-mondrian-black max-w-3xl mx-auto">
            Organizations partner with me to unlock their potential and achieve breakthrough results through strategic leadership and operational excellence.
          </p>
        </div>

        <div className="mondrian-grid" style={{
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: 'repeat(2, 300px)',
          gap: '4px'
        }}>
          {valueProps.map((value, index) => (
            <div
              key={index}
              className={`mondrian-section p-8 flex flex-col justify-center transition-all duration-300 hover:shadow-xl ${
                index === 0 ? 'mondrian-yellow' :
                index === 1 ? 'mondrian-red' :
                index === 2 ? 'mondrian-blue' :
                'mondrian-white'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 ${
                  index === 1 || index === 2 ? 'bg-white' : 'bg-mondrian-black'
                }`}>
                  <value.icon className={`${
                    index === 1 || index === 2 ? 'text-mondrian-black' : 'text-white'
                  }`} size={24} />
                </div>
                <div>
                  <h3 className={`text-xl font-bold mb-3 ${
                    index === 1 || index === 2 ? 'text-white' : 'text-mondrian-black'
                  }`}>{value.title}</h3>
                  <p className={`leading-relaxed ${
                    index === 1 || index === 2 ? 'text-white' : 'text-mondrian-black'
                  }`}>{value.description}</p>
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
