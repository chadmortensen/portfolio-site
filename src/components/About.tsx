
const About = () => {
  return (
    <section id="about" className="section-divider mondrian-teal">
      <div className="w-full">
        <div className="text-center py-16 px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">About Me</h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Passionate about building teams, driving innovation, and creating lasting impact through strategic leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[600px]">
          {/* Background Section */}
          <div className="mondrian-orange p-8 lg:p-12 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-white mb-6">Background</h3>
            <p className="text-white leading-relaxed text-lg">
              I'm a product design leader with 25+ years of experience turning complex problems into meaningful outcomes — by guiding teams, shaping culture, and building thoughtful, scalable design solutions across eCommerce, health tech, and omnichannel platforms.
            </p>
          </div>
          
          {/* Passion Section */}
          <div className="mondrian-navy p-8 lg:p-12 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-white mb-6">My Passion</h3>
            <p className="text-white leading-relaxed text-lg">
              I believe great design starts with empathy, scales with systems thinking, and succeeds through collaboration. Whether leading design at Brightside Health, Etsy, or Walmart, I focus on aligning teams around clear goals, supporting individual growth, and delivering thoughtful, high-impact experiences.
            </p>
          </div>

          {/* Outside of Work Section */}
          <div className="mondrian-coral p-8 lg:p-12 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-white mb-6">Outside of Work</h3>
            <p className="text-white leading-relaxed text-lg">
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
