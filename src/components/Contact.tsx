
import { Mail, Linkedin, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="section-divider">
      <div className="w-full">
        <div className="mondrian-black py-16 px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's Connect</h2>
          <p className="text-xl text-mondrian-gray max-w-3xl mx-auto">
            Ready to chat? 
            I'd love to hear about your challenges and explore potential opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="mondrian-orange px-8 py-12">
            <div className="text-center max-w-sm mx-auto">
              <div className="bg-white p-4 rounded-lg mb-6 mx-auto w-fit">
                <Mail size={32} className="text-mondrian-black" />
              </div>
              <p className="text-white text-lg mb-2">Email</p>
              <a href="mailto:chadmor@gmail.com" className="text-white font-medium hover:text-mondrian-gray transition-colors text-lg">
                chadmor@gmail.com
              </a>
            </div>
          </div>

          <div className="mondrian-teal px-8 py-12">
            <div className="text-center max-w-sm mx-auto">
              <div className="bg-white p-4 rounded-lg mb-6 mx-auto w-fit">
                <Linkedin size={32} className="text-mondrian-black" />
              </div>
              <p className="text-white text-lg mb-2">LinkedIn</p>
              <a href="https://linkedin.com/in/chadmortensen" className="text-white font-medium hover:text-mondrian-gray transition-colors text-lg">
                linkedin.com/in/chadmortensen
              </a>
            </div>
          </div>

          <div className="mondrian-coral px-8 py-12">
            <div className="text-center max-w-sm mx-auto">
              <div className="bg-white p-4 rounded-lg mb-6 mx-auto w-fit">
                <Phone size={32} className="text-mondrian-black" />
              </div>
              <p className="text-white text-lg mb-2">Phone</p>
              <a href="tel:+15033470199" className="text-white font-medium hover:text-mondrian-gray transition-colors text-lg">
                (503) 347-0199
              </a>
            </div>
          </div>

          <div className="mondrian-white px-8 py-12">
            <div className="text-center max-w-sm mx-auto">
              <div className="bg-mondrian-black p-4 rounded-lg mb-6 mx-auto w-fit">
                <MapPin size={32} className="text-white" />
              </div>
              <p className="text-mondrian-black text-lg mb-2">Location</p>
              <p className="text-mondrian-black font-medium text-lg">Portland, Oregon</p>
            </div>
          </div>
        </div>

        <div className="mondrian-gray py-8 px-6 text-center">
          <p className="text-mondrian-black">
            © 2024 Chad Mortensen. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
