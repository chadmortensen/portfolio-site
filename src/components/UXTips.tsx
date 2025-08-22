import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import uxTipsData from "../../data/ux-tips.json";

const UXTips = () => {
  const [currentTip, setCurrentTip] = useState<string | null>(null);
  
  const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * uxTipsData.tips.length);
    setCurrentTip(uxTipsData.tips[randomIndex]);
  };

  return (
    <section id="ux-tips" className="py-24 bg-surface-secondary">
      <div className="swiss-grid fade-in">
        <div className="col-span-12 text-center mb-16">
          <h2 className="text-headline text-text-primary mb-4">UX Tips</h2>
          <div className="w-16 h-px bg-accent-blue mx-auto mb-6"></div>
          <p className="text-body text-text-secondary max-w-3xl mx-auto">
            Oh, you came here for the UX tips? Well, I can't disappoint!
          </p>
        </div>

        <div className="col-span-12 max-w-2xl mx-auto text-center">
          <Button 
            onClick={getRandomTip}
            className="mb-8 px-8 py-3 text-lg"
            variant="default"
          >
            <Lightbulb className="mr-2 h-5 w-5" />
            UX Tip, Please
          </Button>

          {currentTip && (
            <div className="animate-fade-in bg-surface-primary border border-swiss-light rounded-lg p-8 shadow-sm">
              <p className="text-body text-text-primary italic leading-relaxed">
                "{currentTip}"
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UXTips;