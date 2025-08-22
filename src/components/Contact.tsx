
import { Mail, Linkedin, Phone, MapPin, Lightbulb } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import uxTipsData from "../../data/ux-tips.json";

const Contact = () => {
  const [currentTip, setCurrentTip] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const getRandomTip = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * uxTipsData.tips.length);
      setCurrentTip(uxTipsData.tips[randomIndex]);
      setIsAnimating(false);
    }, 600);
  };

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

        {/* UX Tips Section */}
        <div className="col-span-12 text-center pt-16 mt-16">
          <h3 className="text-subheadline text-text-primary mb-4">UX Tips</h3>
          <p className="text-body text-text-secondary mb-8 max-w-2xl mx-auto">
            Oh, you came here for the UX tips? Well, I can't disappoint!
          </p>
          
          <Button 
            onClick={getRandomTip}
            className="mb-8 px-8 py-3 text-lg"
            variant="default"
            disabled={isAnimating}
          >
            <Lightbulb className="mr-2 h-5 w-5" />
            UX Tip, Please
          </Button>

          {(currentTip || isAnimating) && (
            <div className="max-w-2xl mx-auto bg-surface-primary border border-swiss-light rounded-lg p-8 shadow-sm relative overflow-hidden">
              <div className={`transition-all duration-600 ${isAnimating ? 'animate-slot-machine' : 'animate-fade-in'}`}>
                {isAnimating ? (
                  <div className="text-body text-text-secondary italic leading-relaxed">
                    Generating wisdom...
                  </div>
                ) : (
                  <p className="text-body text-text-primary italic leading-relaxed">
                    "{currentTip}"
                  </p>
                )}
              </div>
            </div>
          )}
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
