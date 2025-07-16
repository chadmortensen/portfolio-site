

const Value = () => {
  const valueProps = [
    {
      title: "Build trusted cross-functional partnerships",
      description: "Strong collaboration with product, engineering, analytics, and research is foundational. I invest early and consistently in these relationships to ensure design is part of strategic decision-making — not an afterthought."
    },
    {
      title: "Connect design to company strategy",
      description: "I help design teams zoom out. By aligning day-to-day efforts with broader business goals, I ensure we're focusing on what matters most — advocating for the right resourcing and investing in high-leverage work."
    },
    {
      title: "Grow people and careers",
      description: "Coaching is core to my leadership. I guide performance with empathy and clarity, give honest and useful feedback, and create opportunities for career progression. I strive to make growth conversations feel supportive, not evaluative."
    },
    {
      title: "Design for team health and effectiveness",
      description: "I keep a pulse on team morale and operational clarity — listening for signals and adjusting processes, rituals, or roles to support long-term health, cohesion, and effectiveness."
    },
    {
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

        <div className="col-span-12 grid lg:grid-cols-2 gap-12">
          {valueProps.map((value, index) => (
            <div key={index} className="group">
              <h3 className="text-title text-text-primary font-light mb-4 group-hover:text-accent-blue transition-colors duration-300">
                {value.title}
              </h3>
              <p className="text-body text-text-secondary leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Value;

