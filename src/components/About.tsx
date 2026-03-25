import { useLanguage } from "@/hooks/use-language";

const About = () => {
  const { content } = useLanguage();

  return (
    <section id="about" className="py-24 bg-surface-secondary">
      <div className="swiss-grid fade-in">
        <div className="col-span-12 text-center mb-16">
          <h2 className="text-headline text-text-primary mb-4">{content.about.title}</h2>
          <div className="w-16 h-px bg-accent-teal mx-auto mb-6" />
          <p className="text-body text-text-secondary max-w-4xl mx-auto">{content.about.intro}</p>
        </div>

        {content.about.columns.map((column) => (
          <div key={column.title} className="col-span-12 lg:col-span-4 space-y-8">
            <div>
              <h3 className="text-title text-text-primary mb-6 font-light">{column.title}</h3>
              <p className="text-body text-text-secondary leading-relaxed whitespace-pre-line">{column.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
