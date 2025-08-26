
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

        <div className="col-span-12 max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center gap-6">
              <div className="flex-shrink-0">
                <Mail size={24} className="text-accent-blue" />
              </div>
              <div className="text-left">
                <h3 className="text-body text-text-primary font-medium mb-1">Email</h3>
                <a href="mailto:chadmor@gmail.com" className="text-body text-text-secondary hover:text-accent-blue transition-colors">
                  chadmor@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex-shrink-0">
                <Linkedin size={24} className="text-accent-blue" />
              </div>
              <div className="text-left">
                <h3 className="text-body text-text-primary font-medium mb-1">LinkedIn</h3>
                <a href="https://linkedin.com/in/chadmortensen" className="text-body text-text-secondary hover:text-accent-blue transition-colors">
                  linkedin.com/in/chadmortensen
                </a>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex-shrink-0">
                <Phone size={24} className="text-accent-blue" />
              </div>
              <div className="text-left">
                <h3 className="text-body text-text-primary font-medium mb-1">Phone</h3>
                <a href="tel:+15033470199" className="text-body text-text-secondary hover:text-accent-blue transition-colors">
                  (503) 347-0199
                </a>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex-shrink-0">
                <MapPin size={24} className="text-accent-blue" />
              </div>
              <div className="text-left">
                <h3 className="text-body text-text-primary font-medium mb-1">Location</h3>
                <p className="text-body text-text-secondary">Portland, Oregon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
