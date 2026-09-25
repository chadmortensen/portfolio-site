import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import uxTipsData from "../../data/ux-tips.json";

const UXTips = () => {
  const [currentTip, setCurrentTip] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayTip, setDisplayTip] = useState<string>("");
  
  const getRandomTip = () => {
    setIsAnimating(true);
    
    // Start the slot machine animation
    let cycleCount = 0;
    const maxCycles = 12; // Number of tips to cycle through
    const finalTip = uxTipsData.tips[Math.floor(Math.random() * uxTipsData.tips.length)];
    
    const cycleInterval = setInterval(() => {
      const randomTip = uxTipsData.tips[Math.floor(Math.random() * uxTipsData.tips.length)];
      setDisplayTip(randomTip);
      cycleCount++;
      
      if (cycleCount >= maxCycles) {
        clearInterval(cycleInterval);
        // Final tip reveal with slight delay
        setTimeout(() => {
          setDisplayTip(finalTip);
          setCurrentTip(finalTip);
          setIsAnimating(false);
        }, 200);
      }
    }, 100); // Change tip every 100ms
  };

  return (
    <section id="ux-tips" className="py-24 bg-surface-primary">
      <div className="swiss-grid fade-in">
        <div className="col-span-12 text-center">
          <h2 className="text-headline text-text-primary mb-4">UX Tips</h2>
          <div className="h-[3px] w-[7rem] bg-accent-blue mx-auto mb-6"></div>
          <p className="text-body text-text-secondary max-w-3xl mx-auto mb-6">
            Oh, you came here for some tips? Here you go!
          </p>
        </div>

        <div className="col-span-12 max-w-2xl mx-auto text-center">
          <Button
            onClick={getRandomTip}
            className="mb-8"
            variant="default"
            disabled={isAnimating}
          >
            <span>Get a UX Tip</span>
          </Button>

          {(currentTip || isAnimating) && (
            <div className="bg-surface-primary border border-swiss-light rounded-lg p-8 shadow-sm relative overflow-hidden">
              <div className={`transition-all duration-200 ${isAnimating ? 'animate-slot-machine' : 'animate-fade-in'}`}>
                {isAnimating ? (
                  <p className="text-body text-text-primary italic leading-relaxed min-h-[60px] flex items-center justify-center">
                    "{displayTip}"
                  </p>
                ) : (
                  <p className="text-body text-text-primary italic leading-relaxed">
                    "{currentTip}"
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UXTips;
