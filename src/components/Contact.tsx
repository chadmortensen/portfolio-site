
import { Mail, Linkedin, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-surface-primary">
      <div className="swiss-grid fade-in">
        <div className="col-span-12 text-center mb-16">
          <h2 className="text-headline text-text-primary mb-4">Let's Connect</h2>
          <div className="w-16 h-px bg-accent-aqua mx-auto mb-6"></div>
          <p className="text-body text-text-secondary max-w-3xl mx-auto">
            Ready to chat? I'd love to hear about your challenges and explore potential opportunities.
          </p>
        </div>

        <div className="col-span-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-8 bg-surface-secondary border border-swiss-light hover:border-accent-blue/30 transition-colors duration-200">
            <div className="p-4 bg-surface-primary border border-swiss-light mx-auto w-fit mb-6">
              <Mail size={24} className="text-accent-blue" />
            </div>
            <h3 className="text-body text-text-primary font-medium mb-2">Email</h3>
            <a href="mailto:chadmor@gmail.com" className="text-body text-text-secondary hover:text-accent-blue transition-colors">
              chadmor@gmail.com
            </a>
          </div>

          <div className="text-center p-8 bg-surface-secondary border border-swiss-light hover:border-accent-teal/30 transition-colors duration-200">
            <div className="p-4 bg-surface-primary border border-swiss-light mx-auto w-fit mb-6">
              <Linkedin size={24} className="text-accent-teal" />
            </div>
            <h3 className="text-body text-text-primary font-medium mb-2">LinkedIn</h3>
            <a href="https://linkedin.com/in/chadmortensen" className="text-body text-text-secondary hover:text-accent-teal transition-colors">
              linkedin.com/in/chadmortensen
            </a>
          </div>

          <div className="text-center p-8 bg-surface-secondary border border-swiss-light hover:border-accent-orange/30 transition-colors duration-200">
            <div className="p-4 bg-surface-primary border border-swiss-light mx-auto w-fit mb-6">
              <Phone size={24} className="text-accent-orange" />
            </div>
            <h3 className="text-body text-text-primary font-medium mb-2">Phone</h3>
            <a href="tel:+15033470199" className="text-body text-text-secondary hover:text-accent-orange transition-colors">
              (503) 347-0199
            </a>
          </div>

          <div className="text-center p-8 bg-surface-secondary border border-swiss-light hover:border-accent-aqua/30 transition-colors duration-200">
            <div className="p-4 bg-surface-primary border border-swiss-light mx-auto w-fit mb-6">
              <MapPin size={24} className="text-accent-aqua" />
            </div>
            <h3 className="text-body text-text-primary font-medium mb-2">Location</h3>
            <p className="text-body text-text-secondary">Portland, Oregon</p>
          </div>
        </div>

        <div className="col-span-12 text-center pt-16 border-t border-swiss-light mt-16">
          <p className="text-caption text-text-tertiary">
            © 2024 Chad Mortensen. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
