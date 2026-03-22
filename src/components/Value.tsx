import { useLanguage } from "@/hooks/use-language";

const Value = () => {
  const { content } = useLanguage();

  return (
    <section id="value" className="py-24 bg-surface-primary">
      <div className="swiss-grid fade-in">
        <div className="col-span-12 text-center mb-20">
          <h2 className="text-headline text-text-primary mb-4">{content.value.title}</h2>
          <div className="w-16 h-px bg-accent-orange mx-auto mb-6" />
          <p className="text-body text-text-secondary max-w-3xl mx-auto">{content.value.intro}</p>
        </div>

        <div className="col-span-12 grid lg:grid-cols-2 gap-12">
          {content.value.items.map((value, index) => (
            <div key={index} className="group">
              <h3 className="text-title text-text-primary font-light mb-4">{value.title}</h3>
              <p className="text-body text-text-secondary leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Value;
