
const About = () => {
  return (
    <section id="about" className="py-24 bg-surface-secondary">
      <div className="swiss-grid fade-in">
        <div className="col-span-12 text-center mb-16">
          <h2 className="text-headline text-text-primary mb-4">About Me</h2>
          <div className="w-16 h-px bg-accent-teal mx-auto mb-6"></div>
          <p className="text-body text-text-secondary max-w-4xl mx-auto">
            A career in design, a love of people, and a belief that the best solutions start with empathy (and sometimes pie).
          </p>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div>
            <h3 className="text-title text-text-primary mb-6 font-light">Background</h3>
            <p className="text-body text-text-secondary leading-relaxed">
              I'm a product design leader with 25+ years of experience turning complex problems into meaningful outcomes — by guiding teams, shaping culture, and building thoughtful, scalable design solutions across eCommerce, health tech, and omnichannel platforms.
            </p>
          </div>
        </div>
        
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div>
            <h3 className="text-title text-text-primary mb-6 font-light">My Passion</h3>
            <p className="text-body text-text-secondary leading-relaxed">
              I believe great design starts with empathy, scales with systems thinking, and succeeds through collaboration. Whether leading design at Brightside Health, Etsy, or Walmart, I focus on aligning teams around clear goals, supporting individual growth, and delivering thoughtful, high-impact experiences.
            </p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div>
            <h3 className="text-title text-text-primary mb-6 font-light">Outside of Work</h3>
            <p className="text-body text-text-secondary leading-relaxed">
              I'm a dad of two, a fan of quiet weekends on our 20-acre rural property, and married to a pastry chef who runs a local cooking school. Food, friends, and meaningful conversations are my happy place.
              <br /><br />
              Also, I have a framed picture of Yoda in a three-piece suit hanging in my office. Interpret that however you'd like.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
