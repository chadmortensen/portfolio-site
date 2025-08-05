import { ArrowLeft, Play, Edit3, Save, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import PresentationMode from "@/components/PresentationMode";
import { EditableModule, Module } from "@/components/EditableModule";
import { ModuleLibrary } from "@/components/ModuleLibrary";
import { GitHubStorageService } from "@/services/githubStorage";

const CaseStudy2 = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editPassword, setEditPassword] = useState('');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [showModuleLibrary, setShowModuleLibrary] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [editableSections, setEditableSections] = useState<Array<{
    title: string;
    subheader?: string;
    modules: Module[];
  }>>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const sections = [{
    title: "Why This, and Why Now?",
    content: "Our fulfillment teams had roadmaps and short-term goals, but something was missing: a unifying north star. Without shared strategic guideposts, it was difficult to make confident decisions or understand how each initiative fit into Etsy's broader business direction. I saw an opportunity to fill that gap — not with a rigid product plan, but with a shared vision and set of principles grounded in user needs, market realities, and our brand's mission.",
    sectionImage: "/lovable-uploads/31fcdfe5-22ff-450f-b551-e5b251c3fecc.png",
    showGoalsBelow: true,
    goals: ["Create a team vision rooted in research and aligned with Etsy's business strategy", "Define strategic guideposts to shape yearly and quarterly planning", "Build consensus among cross-functional leaders that this alignment work was essential"]
  }, {
    title: "Participants",
    myRole: ["Championed the need for strategic alignment with my partners, using past successes to make the case for investing time in this work", "Designed and orchestrated a three-day workshop, including defining activities and securing a neutral facilitator so I could participate fully alongside my peers", "Synthesized the output into enduring artifacts — a vision statement and set of fulfillment principles — that the team could carry forward into planning and execution"],
    partneredWith: ["Research leadership", "Staff Designer (who facilitated the sessions)"],
    participants: ["GM/VP of Fulfillment", "Product, Engineering, and Research leaders", "Product Marketing, Analytics, and Finance leads", "Product Design Manager"]
  }, {
    title: "Workshop Design",
    content: "To build true alignment across disciplines, I designed a three-day workshop focused on co-creation, strategic thinking, and grounding our decisions in real user needs. The structure was intentional: each activity layered insight and perspective, ultimately enabling the team to converge on a shared direction.\n\nKey components included:",
    sessionDetails: ["Grounding in Research\nWe began by immersing ourselves in key inputs — seller behavior data, industry trends, brand positioning, and a reminder of Etsy's broader mission — to ensure we were anchored in both user insight and business context.", "Thinking Hats Exercise\nTo challenge assumptions and foster empathy, we explored seller opportunities through a set of creative mindsets — including the optimist, pessimist, and visionary — uncovering nuanced perspectives often missed in traditional brainstorming.", "Future View\nWe envisioned what a best-in-class fulfillment experience could look like 3–5 years out, encouraging blue-sky thinking while staying tethered to seller and buyer realities.", "Cover Story\nWe closed with a storytelling exercise where teams imagined Etsy featured in a future success story. This narrative served as a powerful foundation for the Fulfillment Vision I later authored and refined."],
    workshopImages: ["/lovable-uploads/136ddcb5-bb8b-4573-a9e6-8379fd19dca7.png"]
  }, {
    title: "Output: Fulfillment Vision",
    content: "By synthesizing the outputs from our workshop — particularly the Cover Story exercise and the Future Vision exercise — I was able to articulate a mission statement that captured the team's collective thinking. This became our Fulfillment Vision: a unifying narrative that brought clarity, direction, and purpose to our work moving forward. \n\nThe resulting vision captured the heart of Etsy's fulfillment journey: human-centered at its core, but aligned with the company's broader mission and competitive realities. It became the shared voice of our leadership team and a touchstone for our direction.",
    sectionImage: "/lovable-uploads/7af65158-25af-4b70-958c-a2ce6f8cd266.png"
  }, {
    title: "Output: Fulfillment Principles", 
    subheader: "Strategic Guideposts for Decision Making",
    content: "Our principles served as the scaffolding for roadmap planning. These weren't timelines or feature lists — they were evergreen beliefs that helped guide investment decisions and shaped how we evaluated success. They aligned our work around what truly mattered for Etsy sellers.",
    sectionImage: "/lovable-uploads/5994c658-34de-437e-853c-9be70a50c57b.png"
  }, {
    title: "Reflections & Takeaways",
    subheader: "Leading Strategic Alignment in Cross-Functional Teams",
    content: "This initiative demonstrated the power of bringing diverse perspectives together to create shared understanding and direction.",
    learnings: ["Workshop Format Creates Ownership: The collaborative format created high ownership and alignment across disciplines. Because leaders helped shape the output, they became advocates for it within their teams.", "Co-Creation Builds Trust: Co-creating in real time helped deepen trust and cohesion, especially in a distributed setting.", "Strategic Artifacts Drive Action: The resulting vision and principles weren't just artifacts — they directly informed our yearly planning and long-term strategy discussions.", "Preserve Time for Exploration: We had planned to explore \"big bets\" and create visual prototypes for our future vision, but time constraints forced us to leave that behind. Preserving space for that exploration would have been a powerful complement to our strategic framework."]
  }];

  // Convert static sections to editable format on first load
  useEffect(() => {
    if (editableSections.length === 0) {
      const converted = sections.map((section) => {
        const modules: Module[] = [];
        
        // Add main content as text module
        if (section.content) {
          const htmlContent = section.content
            .split('\n\n')
            .map(paragraph => `<p>${paragraph}</p>`)
            .join('');
          
          modules.push({
            id: `${section.title}-content-${Date.now()}`,
            type: 'text',
            content: { text: htmlContent },
            column: 'left'
          });
        }

        // Add goals as bullets module
        if (section.goals) {
          modules.push({
            id: `${section.title}-goals-${Date.now()}`,
            type: 'bullets',
            content: { title: 'Goals', items: section.goals },
            column: 'left'
          });
        }

        // Add image if present
        if (section.sectionImage) {
          modules.push({
            id: `${section.title}-image-${Date.now()}`,
            type: 'image',
            content: { src: section.sectionImage, alt: `${section.title} visual`, position: 'beside', columns: '4' },
            column: 'right'
          });
        }

        return {
          title: section.title,
          subheader: section.subheader,
          modules
        };
      });
      setEditableSections(converted);
    }
  }, []);

  // Check for stored authentication on load
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('edit-authenticated') === 'true';
    if (isAuthenticated) {
      setIsEditing(false); // Start in view mode even if authenticated
    }
  }, []);

  const handlePasswordSubmit = () => {
    if (editPassword === '4455') {
      setIsEditing(true);
      setShowPasswordPrompt(false);
      setEditPassword('');
      localStorage.setItem('edit-authenticated', 'true');
    } else {
      alert('Incorrect password');
      setEditPassword('');
    }
  };

  const handleSave = async () => {
    try {
      const githubService = new GitHubStorageService();
      await githubService.writeFile('case-study-2.json', editableSections);
      
      // Also save to localStorage as backup
      localStorage.setItem('case-study-2-content', JSON.stringify(editableSections));
      setIsEditing(false);
      alert('Changes saved successfully to GitHub!');
    } catch (error) {
      console.error('Error saving to GitHub:', error);
      // Fallback to localStorage only
      localStorage.setItem('case-study-2-content', JSON.stringify(editableSections));
      setIsEditing(false);
      alert('Changes saved locally (GitHub save failed)');
    }
  };

  const handleUpdateModule = (sectionIndex: number, moduleId: string, content: any, column?: string) => {
    const newSections = [...editableSections];
    const moduleIndex = newSections[sectionIndex].modules.findIndex(m => m.id === moduleId);
    if (moduleIndex !== -1) {
      newSections[sectionIndex].modules[moduleIndex].content = content;
      if (column !== undefined) {
        newSections[sectionIndex].modules[moduleIndex].column = column as 'full' | 'left' | 'right';
      }
      setEditableSections(newSections);
    }
  };

  const handleDeleteModule = (sectionIndex: number, moduleId: string) => {
    const newSections = [...editableSections];
    newSections[sectionIndex].modules = newSections[sectionIndex].modules.filter(m => m.id !== moduleId);
    setEditableSections(newSections);
  };

  const handleAddModule = (sectionIndex: number, module: Omit<Module, 'id'>) => {
    const newModule: Module = {
      ...module,
      id: `${Date.now()}-${Math.random()}`
    };
    const newSections = [...editableSections];
    newSections[sectionIndex].modules.push(newModule);
    setEditableSections(newSections);
  };

  if (isPresentationMode) {
    return (
      <PresentationMode
        sections={sections}
        onExit={() => setIsPresentationMode(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-surface-primary">
      {/* Password prompt dialog */}
      {showPasswordPrompt && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-surface-primary p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Enter password to edit</h3>
            <Input
              type="password"
              value={editPassword}
              onChange={(e) => setEditPassword(e.target.value)}
              placeholder="Password"
              className="mb-4"
              onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
            />
            <div className="flex space-x-2">
              <Button onClick={handlePasswordSubmit}>Submit</Button>
              <Button variant="outline" onClick={() => setShowPasswordPrompt(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}

      {/* Module Library */}
      {showModuleLibrary && (
        <ModuleLibrary
          isOpen={showModuleLibrary}
          onAddModule={(module) => {
            handleAddModule(currentSectionIndex, module);
            setShowModuleLibrary(false);
          }}
          onClose={() => setShowModuleLibrary(false)}
        />
      )}

      {/* Navigation */}
      <nav className="bg-surface-primary border-b border-swiss-light py-4">
        <div className="swiss-grid">
          <div className="col-span-12 flex items-center justify-between">
            <button onClick={() => navigate('/')} className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors">
              <ArrowLeft size={20} />
              <span className="text-body">Back to Portfolio</span>
            </button>
            <div className="flex items-center space-x-4">
              {isEditing && (
                <Button onClick={handleSave} size="sm" className="flex items-center space-x-2">
                  <Save size={16} />
                  <span className="text-sm">Save</span>
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPresentationMode(true)}
                className="opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center space-x-2 text-text-secondary hover:text-text-primary"
              >
                <Play size={16} />
                <span className="text-sm">Presentation Mode</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPasswordPrompt(true)}
                className="opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center space-x-2 text-text-secondary hover:text-text-primary"
              >
                <Edit3 size={16} />
                <span className="text-sm">Edit Mode</span>
              </Button>
              <span className="text-body text-text-primary font-bold">Chad Mortensen</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 bg-surface-secondary">
        <div className="swiss-grid">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3 text-center">
            <h1 className="text-display text-text-primary mb-4">Fulfillment at Etsy</h1>
            <p className="text-xl text-text-secondary mb-6">Crafting a Shared Vision and Guiding Principles</p>
            <div className="w-16 h-px bg-accent-blue mx-auto mb-8"></div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="py-16">
        <div className="swiss-grid">
          <div className="col-span-12 space-y-24">
            {(isEditing ? editableSections : sections).map((section, index) => (
              <div key={index}>
                {/* Section Header */}
                <div className="mb-8">
                  <h2 className={`text-headline text-text-primary font-light ${section.subheader ? 'mb-0' : 'mb-6'}`}>
                    {section.title}
                  </h2>
                  {section.subheader && (
                    <h3 className="text-xl text-text-secondary font-light mt-4 mb-6">{section.subheader}</h3>
                  )}
                  <div className="w-12 h-px bg-accent-teal"></div>
                  
                  {/* Edit controls */}
                  {isEditing && (
                    <div className="mt-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setCurrentSectionIndex(index);
                          setShowModuleLibrary(true);
                        }}
                        className="flex items-center space-x-2"
                      >
                        <Plus size={16} />
                        <span>Add Module</span>
                      </Button>
                    </div>
                  )}
                </div>

                {/* Section Content */}
                {isEditing ? (
                  // Editable module layout
                  <div className="space-y-8">
                    {section.modules?.map((module) => (
                      <EditableModule
                        key={module.id}
                        module={module}
                        isEditing={true}
                        onUpdate={(id, content, column) => handleUpdateModule(index, id, content, column)}
                        onDelete={(id) => handleDeleteModule(index, id)}
                      />
                    ))}
                  </div>
                ) : (
                  // Static layout rendering
                  <div className={(section.workshopImages || section.sectionImage) ? "grid lg:grid-cols-12 gap-12 items-start" : ""}>
                    <div className={(section.workshopImages || section.sectionImage) ? "lg:col-span-6 space-y-6" : "space-y-6"}>
                      {section.content && section.content.split('\n\n').map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-body text-text-secondary leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                      
                      {section.showGoalsBelow && (
                        <div className="mt-8">
                          <h3 className="text-title text-text-primary font-light mb-4">Goals</h3>
                          <p className="text-body text-text-secondary mb-4">This strategic alignment initiative focused on three key objectives:</p>
                          <ul className="space-y-2">
                            {section.goals?.map((goal, goalIndex) => (
                              <li key={goalIndex} className="flex items-start space-x-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 flex-shrink-0"></div>
                                <span className="text-body text-text-secondary">{goal}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {section.goals && !section.showGoalsBelow && (
                        <div>
                          <ul className="space-y-2">
                            {section.goals.map((goal, goalIndex) => (
                              <li key={goalIndex} className="flex items-start space-x-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 flex-shrink-0"></div>
                                <span className="text-body text-text-secondary">{goal}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {section.title === "Participants" && (
                        <div className="grid md:grid-cols-2 gap-8 mt-6">
                          {/* My role - First column */}
                          <div>
                            <h3 className="text-lg text-text-primary font-medium mb-4">My role:</h3>
                            <ul className="space-y-2">
                              {section.myRole?.map((role, roleIndex) => (
                                <li key={roleIndex} className="flex items-start space-x-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 flex-shrink-0"></div>
                                  <span className="text-body text-text-secondary">{role}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* I partnered with & Participants - Second column */}
                          <div className="space-y-8">
                            <div>
                              <h3 className="text-lg text-text-primary font-medium mb-4">I partnered with:</h3>
                              <ul className="space-y-2">
                                {section.partneredWith?.map((partner, partnerIndex) => (
                                  <li key={partnerIndex} className="flex items-start space-x-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 flex-shrink-0"></div>
                                    <span className="text-body text-text-secondary">{partner}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h3 className="text-lg text-text-primary font-medium mb-4">Participants included:</h3>
                              <ul className="space-y-2">
                                {section.participants?.map((participant, participantIndex) => (
                                  <li key={participantIndex} className="flex items-start space-x-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 flex-shrink-0"></div>
                                    <span className="text-body text-text-secondary">{participant}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {section.sessionDetails && (
                        <div>
                          <ul className="space-y-4">
                            {section.sessionDetails.map((detail, detailIndex) => {
                              const [title, description] = detail.split('\n');
                              return (
                                <li key={detailIndex} className="flex items-start space-x-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-accent-aqua mt-2 flex-shrink-0"></div>
                                  <div className="text-body text-text-secondary">
                                    <span className="font-semibold">{title}</span>
                                    <br />
                                    {description}
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Workshop Images - Right side */}
                    {section.workshopImages && (
                      <div className="lg:col-span-6 space-y-4">
                        {section.workshopImages.map((image, imageIndex) => (
                          <Dialog key={imageIndex}>
                            <DialogTrigger asChild>
                              <div className="cursor-pointer hover:opacity-90 transition-opacity">
                                <img 
                                  src={image} 
                                  alt={`Workshop design image ${imageIndex + 1}`}
                                  className="w-full h-auto border border-swiss-light rounded-lg shadow-sm"
                                />
                              </div>
                            </DialogTrigger>
                            <DialogContent className="max-w-6xl w-full p-0">
                              <DialogTitle className="sr-only">Workshop design image {imageIndex + 1}</DialogTitle>
                              <DialogDescription className="sr-only">
                                Enlarged view of workshop design image {imageIndex + 1}
                              </DialogDescription>
                              <img 
                                src={image} 
                                alt={`Workshop design image ${imageIndex + 1}`}
                                className="w-full h-auto"
                              />
                            </DialogContent>
                          </Dialog>
                        ))}
                      </div>
                    )}

                    {/* Section Image - Right side */}
                    {section.sectionImage && (
                      <div className="lg:col-span-6">
                        <Dialog>
                          <DialogTrigger asChild>
                            <div className="cursor-pointer hover:opacity-90 transition-opacity">
                              <img 
                                src={section.sectionImage} 
                                alt={`${section.title} illustration`}
                                className="w-full h-auto border border-swiss-light rounded-lg shadow-sm object-cover object-top"
                                style={{ maxHeight: '600px' }}
                              />
                            </div>
                          </DialogTrigger>
                          <DialogContent className="max-w-6xl w-full p-0">
                            <DialogTitle className="sr-only">{section.title} illustration</DialogTitle>
                            <DialogDescription className="sr-only">
                              Enlarged view of {section.title} illustration
                            </DialogDescription>
                            <img 
                              src={section.sectionImage} 
                              alt={`${section.title} illustration`}
                              className="w-full h-auto"
                            />
                          </DialogContent>
                        </Dialog>
                      </div>
                    )}
                  </div>
                )}

                {section.learnings && (
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    {section.learnings.map((learning, learningIndex) => {
                      const [title, description] = learning.split(': ');
                      return (
                        <div key={learningIndex} className="space-y-4 p-6 bg-surface-secondary">
                          <h4 className="text-title text-text-primary font-medium">{title}</h4>
                          <p className="text-body text-text-secondary">{description}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {/* Separator */}
                {index < sections.length - 1 && (
                  <div className="mt-16">
                    <Separator className="w-full" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudy2;
