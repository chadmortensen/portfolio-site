import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";

const UXTips = () => {
  const { content } = useLanguage();
  const [currentTip, setCurrentTip] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayTip, setDisplayTip] = useState<string>("");

  const getRandomTip = () => {
    setIsAnimating(true);

    let cycleCount = 0;
    const maxCycles = 12;
    const finalTip = content.uxTips.tips[Math.floor(Math.random() * content.uxTips.tips.length)];

    const cycleInterval = setInterval(() => {
      const randomTip = content.uxTips.tips[Math.floor(Math.random() * content.uxTips.tips.length)];
      setDisplayTip(randomTip);
      cycleCount++;

      if (cycleCount >= maxCycles) {
        clearInterval(cycleInterval);
        setTimeout(() => {
          setDisplayTip(finalTip);
          setCurrentTip(finalTip);
          setIsAnimating(false);
        }, 200);
      }
    }, 100);
  };

  return (
    <section id="ux-tips" className="py-24 bg-surface-secondary">
      <div className="swiss-grid fade-in">
        <div className="col-span-12 text-center">
          <h2 className="text-headline text-text-primary mb-4">{content.uxTips.title}</h2>
          <div className="w-16 h-px bg-accent-blue mx-auto mb-6" />
          <p className="text-body text-text-secondary max-w-3xl mx-auto mb-6">{content.uxTips.intro}</p>
        </div>

        <div className="col-span-12 max-w-2xl mx-auto text-center">
          <Button
            onClick={getRandomTip}
            className="mb-8 px-8 py-3 text-lg rounded"
            variant="default"
            disabled={isAnimating}
          >
            {content.uxTips.buttonLabel}
          </Button>

          {(currentTip || isAnimating) && (
            <div className="bg-surface-primary border border-swiss-light rounded-lg p-8 shadow-sm relative overflow-hidden">
              <div className={`transition-all duration-200 ${isAnimating ? "animate-slot-machine" : "animate-fade-in"}`}>
                {isAnimating ? (
                  <p className="text-body text-text-primary italic leading-relaxed min-h-[60px] flex items-center justify-center">"{displayTip}"</p>
                ) : (
                  <p className="text-body text-text-primary italic leading-relaxed">"{currentTip}"</p>
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
