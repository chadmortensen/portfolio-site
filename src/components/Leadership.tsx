
import { Shield, TrendingUp, Users, Award } from "lucide-react";

const Leadership = () => {
  const principles = [
    {
      icon: Shield,
      title: "Transparency builds trust",
      description: "I lead with honesty and clarity — sharing context, being direct, and creating space for open conversations. Trust starts with being someone your team can count on."
    },
    {
      icon: TrendingUp,
      title: "Celebrate progress, not just outcomes",
      description: "Design is demanding — it's easy to skip the moments that matter. I make time to recognize great work, reflect on what we've learned, and keep morale high."
    },
    {
      icon: Users,
      title: "Diverse perspectives make better products",
      description: "I believe the best teams reflect a range of backgrounds and experiences. Diversity makes our work stronger, more inclusive, and more relevant."
    },
    {
      icon: Award,
      title: "Craft matters — and so does accountability",
      description: "I set a high bar for quality, while supporting accountability and growth. Our work should be effective, thoughtful — and something we're proud to stand behind."
    }
  ];

  return (
    <section id="leadership" className="section-divider">
      <div className="w-full">
        <div className="mondrian-orange py-16 px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">My Leadership Style</h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Leading design teams is about more than setting direction — it's about creating an environment where people can thrive, grow, and do their best work. Here's what I believe makes that possible:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {principles.map((principle, index) => (
            <div
              key={index}
              className={`px-8 py-12 ${
                index === 0 ? 'mondrian-teal' :
                index === 1 ? 'mondrian-navy' :
                index === 2 ? 'mondrian-coral' :
                'mondrian-white'
              }`}
            >
              <div className="max-w-lg mx-auto">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 ${
                    index === 0 || index === 1 || index === 2 ? 'bg-white' : 'bg-mondrian-black'
                  }`}>
                    <principle.icon className={`${
                      index === 0 || index === 1 || index === 2 ? 'text-mondrian-black' : 'text-white'
                    }`} size={24} />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold mb-3 ${
                      index === 0 || index === 1 || index === 2 ? 'text-white' : 'text-mondrian-black'
                    }`}>{principle.title}</h3>
                    <p className={`leading-relaxed ${
                      index === 0 || index === 1 || index === 2 ? 'text-white' : 'text-mondrian-black'
                    }`}>{principle.description}</p>
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

export default Leadership;
