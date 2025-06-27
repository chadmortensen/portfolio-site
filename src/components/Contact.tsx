
import { Mail, Linkedin, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 mondrian-black text-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Connect</h2>
          <p className="text-xl text-mondrian-gray max-w-3xl mx-auto">
            Ready to chat? 
            I'd love to hear about your challenges and explore potential opportunities.
          </p>
        </div>

        <div className="mondrian-grid max-w-2xl mx-auto" style={{
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: 'repeat(2, 150px)',
          gap: '4px'
        }}>
          <div className="mondrian-red flex items-center justify-center p-6">
            <div className="text-center">
              <div className="bg-white p-3 rounded-lg mb-4 mx-auto w-fit">
                <Mail size={24} className="text-mondrian-black" />
              </div>
              <p className="text-white">Email</p>
              <a href="mailto:chadmor@gmail.com" className="text-white font-medium hover:text-mondrian-gray transition-colors">
                chadmor@gmail.com
              </a>
            </div>
          </div>

          <div className="mondrian-blue flex items-center justify-center p-6">
            <div className="text-center">
              <div className="bg-white p-3 rounded-lg mb-4 mx-auto w-fit">
                <Linkedin size={24} className="text-mondrian-black" />
              </div>
              <p className="text-white">LinkedIn</p>
              <a href="https://linkedin.com/in/chadmortensen" className="text-white font-medium hover:text-mondrian-gray transition-colors">
                linkedin.com/in/chadmortensen
              </a>
            </div>
          </div>

          <div className="mondrian-yellow flex items-center justify-center p-6">
            <div className="text-center">
              <div className="bg-mondrian-black p-3 rounded-lg mb-4 mx-auto w-fit">
                <Phone size={24} className="text-white" />
              </div>
              <p className="text-mondrian-black">Phone</p>
              <a href="tel:+15033470199" className="text-mondrian-black font-medium hover:text-mondrian-red transition-colors">
                (503) 347-0199
              </a>
            </div>
          </div>

          <div className="mondrian-white flex items-center justify-center p-6">
            <div className="text-center">
              <div className="bg-mondrian-black p-3 rounded-lg mb-4 mx-auto w-fit">
                <MapPin size={24} className="text-white" />
              </div>
              <p className="text-mondrian-black">Location</p>
              <p className="text-mondrian-black font-medium">Portland, Oregon</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-16 pt-8 border-t border-mondrian-gray">
          <p className="text-mondrian-gray">
            © 2024 Chad Mortensen. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
