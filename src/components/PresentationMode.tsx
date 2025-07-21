import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface PresentationModeProps {
  sections: any[];
  onExit: () => void;
}

const PresentationMode = ({ sections, onExit }: PresentationModeProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (currentSlide < sections.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(currentSlide + 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(currentSlide - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "Escape") {
        onExit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, isTransitioning]);

  const renderSlideContent = (section: any) => {
    // Check if section has any images
    const hasImages = section.image || section.sectionImage || section.fullWidthImage || 
                     section.workshopImages || section.additionalImages;

    return (
      <div className="space-y-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-light text-text-primary mb-4">
            {section.title}
          </h1>
          {section.subheader && (
            <h2 className="text-2xl lg:text-3xl text-text-secondary font-light">
              {section.subheader}
            </h2>
          )}
          <div className="w-24 h-px bg-accent-teal mx-auto mt-8"></div>
        </div>

        {/* Main Content Layout */}
        <div className={`grid ${hasImages ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-12 items-start`}>
          {/* Content Column */}
          <div className="space-y-8">
            {/* Text Content */}
            {section.content && (
              <div className="space-y-4">
                {section.content.split('\n\n').map((paragraph: string, pIndex: number) => (
                  <p key={pIndex} className="text-xl lg:text-2xl text-text-secondary leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {/* Goals */}
            {section.goals && (
              <div className="space-y-4">
                <h3 className="text-2xl text-text-primary font-light">
                  {section.showGoalsBelow ? "Goals" : "Goals"}
                </h3>
                {section.showGoalsBelow && (
                  <p className="text-lg text-text-secondary mb-4">
                    This strategic alignment initiative focused on three key objectives:
                  </p>
                )}
                <ul className="space-y-3">
                  {section.goals.map((goal: string, goalIndex: number) => (
                    <li key={goalIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-accent-blue mt-3 flex-shrink-0"></div>
                      <span className="text-lg text-text-secondary">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* User Feedback Quotes */}
            {section.quotes && (
              <div className="space-y-4">
                <h3 className="text-2xl text-text-primary font-light">User Feedback</h3>
                {section.quotes.map((quote: string, quoteIndex: number) => (
                  <blockquote key={quoteIndex} className="border-l-4 border-accent-orange pl-6 mb-4">
                    <p className="text-lg text-text-secondary italic">"{quote}"</p>
                  </blockquote>
                ))}
                {section.insight && (
                  <div className="p-6 bg-surface-secondary border border-swiss-light rounded-lg">
                    <p className="text-lg text-text-primary font-medium">{section.insight}</p>
                  </div>
                )}
              </div>
            )}

            {/* Participants Section */}
            {section.title === "Participants" && (
              <div className="space-y-8">
                {section.myRole && (
                  <div>
                    <h3 className="text-2xl text-text-primary font-light mb-4">My Role</h3>
                    <ul className="space-y-3">
                      {section.myRole.map((role: string, roleIndex: number) => (
                        <li key={roleIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full bg-accent-blue mt-3 flex-shrink-0"></div>
                          <span className="text-lg text-text-secondary">{role}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {section.partneredWith && (
                  <div>
                    <h3 className="text-2xl text-text-primary font-light mb-4">I Partnered With</h3>
                    <ul className="space-y-3">
                      {section.partneredWith.map((partner: string, partnerIndex: number) => (
                        <li key={partnerIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full bg-accent-teal mt-3 flex-shrink-0"></div>
                          <span className="text-lg text-text-secondary">{partner}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {section.participants && (
                  <div>
                    <h3 className="text-2xl text-text-primary font-light mb-4">Participants Included</h3>
                    <ul className="space-y-3">
                      {section.participants.map((participant: string, participantIndex: number) => (
                        <li key={participantIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full bg-accent-blue mt-3 flex-shrink-0"></div>
                          <span className="text-lg text-text-secondary">{participant}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Session Details */}
            {section.sessionDetails && (
              <div className="space-y-6">
                <h3 className="text-2xl text-text-primary font-light">Workshop Components</h3>
                <div className="space-y-4">
                  {section.sessionDetails.map((detail: string, detailIndex: number) => {
                    const [title, description] = detail.split('\n');
                    return (
                      <div key={detailIndex} className="p-6 bg-surface-secondary rounded-lg">
                        <h4 className="text-xl text-text-primary font-medium mb-3">{title}</h4>
                        <p className="text-lg text-text-secondary">{description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Schedule */}
            {section.schedule && (
              <div className="space-y-4">
                <h3 className="text-2xl text-text-primary font-light">Schedule</h3>
                <ul className="space-y-3">
                  {section.schedule.map((item: string, itemIndex: number) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-accent-blue mt-3 flex-shrink-0"></div>
                      <span className="text-lg text-text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Focus Areas */}
            {section.focusAreas && (
              <div className="space-y-6">
                <h3 className="text-2xl text-text-primary font-light mb-6">Focus Areas</h3>
                {section.focusAreas.map((area: any, areaIndex: number) => (
                  <div key={areaIndex} className="p-6 bg-surface-secondary rounded-lg">
                    <h4 className="text-xl text-text-primary font-medium mb-3">{area.title}</h4>
                    <p className="text-lg text-text-secondary mb-4">{area.description}</p>
                    <ul className="space-y-2">
                      {area.points.map((point: string, pointIndex: number) => (
                        <li key={pointIndex} className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 flex-shrink-0"></div>
                          <span className="text-base text-text-secondary">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {section.conclusion && (
                  <p className="text-lg text-text-secondary mt-6">{section.conclusion}</p>
                )}
              </div>
            )}

            {/* Learnings */}
            {section.learnings && (
              <div className="space-y-4">
                <h3 className="text-2xl text-text-primary font-light">Key Learnings</h3>
                <div className="grid md:grid-cols-1 gap-6 mt-6">
                  {section.learnings.map((learning: string, learningIndex: number) => {
                    const [title, description] = learning.split(': ');
                    return (
                      <div key={learningIndex} className="p-6 bg-surface-secondary rounded-lg">
                        <h4 className="text-xl text-text-primary font-medium mb-3">{title}</h4>
                        <p className="text-lg text-text-secondary">{description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Table Results */}
            {section.table && (
              <div className="bg-surface-secondary rounded-lg p-6">
                <h3 className="text-2xl text-text-primary font-light mb-6">Results</h3>
                <div className="space-y-4">
                  {section.table.rows.map((row: string[], rowIndex: number) => (
                    <div key={rowIndex} className="grid grid-cols-2 gap-4 p-4 bg-surface-primary rounded">
                      <span className="text-lg text-text-primary font-medium">{row[0]}</span>
                      <span className="text-lg text-accent-blue font-bold">{row[1]}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Images Column - Right Side */}
          {hasImages && (
            <div className="space-y-6">
              {/* Main Image */}
              {(section.image || section.sectionImage || section.fullWidthImage) && (
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer hover:opacity-90 transition-opacity">
                      <img
                        src={section.image || section.sectionImage || section.fullWidthImage}
                        alt={`${section.title} illustration`}
                        className="w-full h-auto rounded-lg shadow-lg"
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-6xl w-full p-0">
                    <DialogTitle className="sr-only">{section.title} illustration</DialogTitle>
                    <DialogDescription className="sr-only">
                      Enlarged view of {section.title} illustration
                    </DialogDescription>
                    <img
                      src={section.image || section.sectionImage || section.fullWidthImage}
                      alt={`${section.title} illustration`}
                      className="w-full h-auto"
                    />
                  </DialogContent>
                </Dialog>
              )}

              {/* Workshop Images */}
              {section.workshopImages && (
                <div className="space-y-4">
                  {section.workshopImages.map((image: string, imageIndex: number) => (
                    <Dialog key={imageIndex}>
                      <DialogTrigger asChild>
                        <div className="cursor-pointer hover:opacity-90 transition-opacity">
                          <img
                            src={image}
                            alt={`Workshop image ${imageIndex + 1}`}
                            className="w-full h-auto rounded-lg shadow-lg"
                          />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-6xl w-full p-0">
                        <DialogTitle className="sr-only">Workshop image {imageIndex + 1}</DialogTitle>
                        <DialogDescription className="sr-only">
                          Enlarged view of workshop image {imageIndex + 1}
                        </DialogDescription>
                        <img
                          src={image}
                          alt={`Workshop image ${imageIndex + 1}`}
                          className="w-full h-auto"
                        />
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              )}

              {/* Additional Images */}
              {section.additionalImages && (
                <div className="space-y-4">
                  {section.additionalImages.map((image: string, imageIndex: number) => (
                    <Dialog key={imageIndex}>
                      <DialogTrigger asChild>
                        <div className="cursor-pointer hover:opacity-90 transition-opacity">
                          <img
                            src={image}
                            alt={`Additional image ${imageIndex + 1}`}
                            className="w-full h-auto rounded-lg shadow-lg"
                          />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-6xl w-full p-0">
                        <DialogTitle className="sr-only">Additional image {imageIndex + 1}</DialogTitle>
                        <DialogDescription className="sr-only">
                          Enlarged view of additional image {imageIndex + 1}
                        </DialogDescription>
                        <img
                          src={image}
                          alt={`Additional image ${imageIndex + 1}`}
                          className="w-full h-auto"
                        />
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-surface-primary z-50 overflow-hidden">
      {/* Backdrop Bar with Gradient Fade */}
      <div className="fixed top-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white/80 backdrop-blur-sm z-50"></div>
      
      {/* Controls */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[70]">
        <div className="flex items-center space-x-4 bg-surface-secondary/90 backdrop-blur-sm rounded-full px-6 py-3 border border-swiss-light">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-2 hover:bg-surface-primary"
          >
            <ChevronLeft size={20} />
          </Button>
          
          <span className="text-sm text-text-secondary font-medium min-w-[80px] text-center">
            {currentSlide + 1} / {sections.length}
          </span>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={nextSlide}
            disabled={currentSlide === sections.length - 1}
            className="p-2 hover:bg-surface-primary"
          >
            <ChevronRight size={20} />
          </Button>
          
          <div className="w-px h-6 bg-swiss-light mx-2"></div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onExit}
            className="p-2 hover:bg-surface-primary text-text-secondary hover:text-text-primary"
          >
            <X size={20} />
            <span className="ml-2 text-sm">Exit</span>
          </Button>
        </div>
      </div>

      {/* Slide Container */}
      <div className="h-full overflow-y-auto p-8 pt-32 pb-16">
        <div className="max-w-6xl mx-auto">
          <div
            className={`transition-all duration-700 ease-out transform ${
              isTransitioning
                ? 'opacity-0 translate-y-12 scale-95'
                : 'opacity-100 translate-y-0 scale-100'
            }`}
            style={{
              filter: isTransitioning ? 'blur(8px)' : 'blur(0px)',
              transform: isTransitioning 
                ? 'translateY(30px) scale(0.95) rotateX(5deg)' 
                : 'translateY(0px) scale(1) rotateX(0deg)',
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
          >
            <div className={`
              ${isTransitioning ? 'animate-water-emerge-out' : 'animate-water-emerge-in'}
            `}>
              {renderSlideContent(sections[currentSlide])}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-surface-secondary">
        <div
          className="h-full bg-gradient-to-r from-accent-blue to-accent-teal transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / sections.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default PresentationMode;