import { useState } from "react";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";

const Experience = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { content } = useLanguage();

  return (
    <section id="experience" className="py-16 sm:py-24 bg-surface-primary">
      <div className="swiss-grid fade-in">
        <div className="col-span-12 text-center mb-12 sm:mb-16">
          <h2 className="text-headline text-text-primary mb-4">{content.experience.title}</h2>
          <div className="w-16 h-px bg-accent-orange mx-auto mb-6" />
          <p className="text-body text-text-secondary max-w-3xl mx-auto px-4">{content.experience.intro}</p>

          <div className="mt-8 flex justify-center">
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              variant="default"
              className="flex items-center gap-2 rounded"
              aria-expanded={isExpanded}
              aria-label={isExpanded ? content.experience.hideAria : content.experience.showAria}
            >
              {isExpanded ? (
                <>
                  {content.experience.hideLabel}
                  <ChevronUp size={16} />
                </>
              ) : (
                <>
                  {content.experience.showLabel}
                  <ChevronDown size={16} />
                </>
              )}
            </Button>
          </div>
        </div>

        {isExpanded && (
          <div className="col-span-12 max-w-[950px] mx-auto space-y-12 sm:space-y-16">
            {content.experience.entries.map((experience, index) => (
              <div key={index} className="border-l-2 border-swiss-light pl-6 sm:pl-8 relative">
                <div className="absolute -left-2 top-0 w-3 h-3 bg-accent-blue rounded-full" />

                <div className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <h3 className="text-title text-text-primary font-light">{experience.title}</h3>
                      <p className="text-body text-accent-orange font-medium">{experience.company}</p>
                      <p className="text-caption text-text-tertiary">{experience.location}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-text-tertiary mt-2 lg:mt-0">
                      <Calendar size={16} />
                      <span className="text-caption">{experience.period}</span>
                    </div>
                  </div>

                  <p className="text-body text-text-secondary leading-relaxed">{experience.description}</p>

                  {"roles" in experience ? (
                    <div className="space-y-8">
                      {experience.roles.map((role, roleIndex) => (
                        <div key={roleIndex} className="border-l border-swiss-light pl-6 ml-2">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                            <div>
                              <h4 className="text-body text-text-primary font-bold">{role.title}</h4>
                            </div>
                            <div className="flex items-center space-x-2 text-text-tertiary mt-1 lg:mt-0">
                              <Calendar size={14} />
                              <span className="text-caption">{role.period}</span>
                            </div>
                          </div>

                          <p className="text-body text-text-secondary leading-relaxed mb-4">{role.description}</p>

                          <div>
                            <h5 className="text-body text-text-primary font-medium mb-3">{content.experience.achievementsLabel}</h5>
                            <ul className="grid gap-3">
                              {role.achievements.map((achievement, achievementIndex) => (
                                <li key={achievementIndex} className="flex items-start space-x-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-accent-teal mt-2 flex-shrink-0" />
                                  <span className="text-body text-text-secondary leading-relaxed">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <h5 className="text-body text-text-primary font-medium mb-4">{content.experience.achievementsLabel}</h5>
                      <ul className="grid gap-3">
                        {experience.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="flex items-start space-x-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-teal mt-2 flex-shrink-0" />
                            <span className="text-body text-text-secondary leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
