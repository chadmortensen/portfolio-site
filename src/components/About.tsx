
const About = () => {
  return (
    <section id="about" className="py-20 mondrian-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-mondrian-black mb-6">About Me</h2>
          <p className="text-xl text-mondrian-black max-w-3xl mx-auto">
            Passionate about building teams, driving innovation, and creating lasting impact through strategic leadership.
          </p>
        </div>

        <div className="mondrian-grid" style={{
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 200px)',
          gap: '4px'
        }}>
          {/* Background Section */}
          <div className="mondrian-red flex items-center justify-center p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">Background</h3>
            </div>
          </div>
          
          <div className="mondrian-white flex items-center justify-center p-6 col-span-2">
            <p className="text-mondrian-black leading-relaxed">
              I'm a product design leader with 25+ years of experience turning complex problems into meaningful outcomes — by guiding teams, shaping culture, and building thoughtful, scalable design solutions across eCommerce, health tech, and omnichannel platforms.
            </p>
          </div>

          {/* Passion Section */}
          <div className="mondrian-white flex items-center justify-center p-6 col-span-2">
            <p className="text-mondrian-black leading-relaxed">
              I believe great design starts with empathy, scales with systems thinking, and succeeds through collaboration. Whether leading design at Brightside Health, Etsy, or Walmart, I focus on aligning teams around clear goals, supporting individual growth, and delivering thoughtful, high-impact experiences.
            </p>
          </div>
          
          <div className="mondrian-blue flex items-center justify-center p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">Passion</h3>
            </div>
          </div>

          {/* Outside of Work Section */}
          <div className="mondrian-yellow flex items-center justify-center p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-mondrian-black mb-2">Outside of Work</h3>
            </div>
          </div>
          
          <div className="mondrian-white flex items-center justify-center p-6 col-span-2">
            <p className="text-mondrian-black leading-relaxed">
              I'm a dad of two, a fan of quiet weekends on our 20-acre rural property, and married to a pastry chef who runs a local cooking school. Food, friends, and meaningful conversations are my happy place.
              <br />
              Also, I have a framed picture of Yoda in a three-piece suit hanging in my office. Interpret that however you'd like.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
