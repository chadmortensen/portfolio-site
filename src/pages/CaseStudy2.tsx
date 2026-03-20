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
import Footer from "@/components/Footer";
import { EditableModule, Module } from "@/components/EditableModule";
import { ModuleLibrary } from "@/components/ModuleLibrary";
import { SectionEditor } from "@/components/SectionEditor";
import { GitHubStorageService } from "@/services/githubStorage";

const CaseStudy2 = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editPassword, setEditPassword] = useState('');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('edit-authenticated') === 'true';
  });
  const [showModuleLibrary, setShowModuleLibrary] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [editableSections, setEditableSections] = useState<Array<{
    title: string;
    subheader?: string;
    modules: Module[];
  }>>([]);
  const [title, setTitle] = useState('Fulfillment at Etsy');
  const [subtitle, setSubtitle] = useState('Crafting a Shared Vision and Guiding Principles (2022)');

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

  // Load content from GitHub or fallback to localStorage on mount
  useEffect(() => {
    const loadContent = async () => {
      try {
        // Try to load from GitHub first
        const githubService = new GitHubStorageService();
        const githubContent = await githubService.readFile('case-study-2.json');
        
        if (githubContent) {
          // Handle array format (sections only)
          if (Array.isArray(githubContent)) {
            console.log('Loading sections from GitHub (array format)');
            const sectionsWithNotes = githubContent.map((section: any) => ({
              ...section,
              speakerNotes: section.speakerNotes || ''
            }));
            setEditableSections(sectionsWithNotes);
            return;
          }
          // Handle object format with title, subtitle, and sections
          else if (githubContent.title && githubContent.subtitle && githubContent.sections) {
            console.log('Loading full content from GitHub (object format)');
            setTitle(githubContent.title);
            setSubtitle(githubContent.subtitle);
            const sectionsWithNotes = githubContent.sections.map((section: any) => ({
              ...section,
              speakerNotes: section.speakerNotes || ''
            }));
            setEditableSections(sectionsWithNotes);
            return;
          }
        }
      } catch (error) {
        console.log('No GitHub content found, trying localStorage');
      }

      // Try localStorage
      const saved = localStorage.getItem('case-study-2-content');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Handle array format (sections only)
          if (Array.isArray(parsed)) {
            console.log('Loading sections from localStorage (array format)');
            const sectionsWithNotes = parsed.map((section: any) => ({
              ...section,
              speakerNotes: section.speakerNotes || ''
            }));
            setEditableSections(sectionsWithNotes);
            return;
          }
          // Handle object format with title, subtitle, and sections
          else if (parsed && parsed.title && parsed.subtitle && parsed.sections) {
            console.log('Loading full content from localStorage (object format)');
            setTitle(parsed.title);
            setSubtitle(parsed.subtitle);
            const sectionsWithNotes = parsed.sections.map((section: any) => ({
              ...section,
              speakerNotes: section.speakerNotes || ''
            }));
            setEditableSections(sectionsWithNotes);
            return;
          }
        } catch (error) {
          console.log('Error parsing saved content, using static content');
        }
      }

      // Convert static sections to editable format as fallback
      console.log('Converting static sections to editable format');
      const converted = sections.map(section => {
        const modules: Module[] = [];
        
        // Add main content as text module
        if (section.content) {
          modules.push({
            id: `${section.title}-content-${Date.now()}`,
            type: 'text',
            content: section.content,
            column: 'left'
          });
        }

        // Add goals as bullets if present
        if ('goals' in section) {
          modules.push({
            id: `${section.title}-goals-${Date.now()}`,
            type: 'bullets',
            content: { title: 'Goals', items: (section as any).goals },
            column: 'left'
          });
        }

        // Add my role content if present
        if ('myRole' in section) {
          modules.push({
            id: `${section.title}-role-${Date.now()}`,
            type: 'bullets',
            content: { title: 'My Role', items: (section as any).myRole },
            column: 'left'
          });
        }

        // Add partnered with content if present
        if ('partneredWith' in section) {
          modules.push({
            id: `${section.title}-partners-${Date.now()}`,
            type: 'bullets',
            content: { title: 'Partnered With', items: (section as any).partneredWith },
            column: 'left'
          });
        }

        // Add participants content if present
        if ('participants' in section) {
          modules.push({
            id: `${section.title}-participants-${Date.now()}`,
            type: 'bullets',
            content: { title: 'Participants', items: (section as any).participants },
            column: 'right'
          });
        }

        // Add session details if present
        if ('sessionDetails' in section) {
          const sessionDetails = (section as any).sessionDetails;
          sessionDetails.forEach((detail: string, index: number) => {
            modules.push({
              id: `${section.title}-session-${index}-${Date.now()}`,
              type: 'text',
              content: detail,
              column: 'full'
            });
          });
        }

        // Add workshop images if present
        if ('workshopImages' in section) {
          const images = (section as any).workshopImages;
          images.forEach((imageSrc: string, index: number) => {
            modules.push({
              id: `${section.title}-workshop-img-${index}-${Date.now()}`,
              type: 'image',
              content: { src: imageSrc, alt: `${section.title} workshop image ${index + 1}` },
              column: 'right'
            });
          });
        }

        // Add section image if present
        if ('sectionImage' in section) {
          modules.push({
            id: `${section.title}-image-${Date.now()}`,
            type: 'image',
            content: { src: (section as any).sectionImage, alt: `${section.title} visual` },
            column: 'right'
          });
        }

        // Add learnings if present
        if ('learnings' in section) {
          modules.push({
            id: `${section.title}-learnings-${Date.now()}`,
            type: 'bullets',
            content: { title: 'Key Learnings', items: (section as any).learnings },
            column: 'full'
          });
        }

        return {
          title: section.title,
          subheader: section.subheader || '',
          modules
        };
      });
      setEditableSections(converted);
    };

    loadContent();
  }, []);


  const handlePasswordSubmit = () => {
    if (editPassword === '4455') {
      setIsEditing(true);
      setShowPasswordPrompt(false);
      setEditPassword('');
      localStorage.setItem('edit-authenticated', 'true');
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
      setEditPassword('');
    }
  };

  const handleSave = async () => {
    try {
      const saveData = {
        title,
        subtitle,
        sections: editableSections
      };
      
      const githubService = new GitHubStorageService();
      await githubService.writeFile('case-study-2.json', saveData);
      
      // Also save to localStorage as backup
      localStorage.setItem('case-study-2-content', JSON.stringify(saveData));
      setIsEditing(false);
      alert('Changes saved successfully to GitHub!');
    } catch (error) {
      console.error('Error saving to GitHub:', error);
      // Fallback to localStorage only
      const saveData = {
        title,
        subtitle,
        sections: editableSections
      };
      localStorage.setItem('case-study-2-content', JSON.stringify(saveData));
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

  // Column-based layout renderer for flexible module positioning
  const renderModulesWithLayout = (modules: Module[], sectionIndex: number, editing: boolean) => {
    // Group modules by column
    const fullWidthModules = modules.filter(m => m.column === 'full');
    const leftColumnModules = modules.filter(m => m.column === 'left');
    const rightColumnModules = modules.filter(m => m.column === 'right');

    const hasColumnModules = leftColumnModules.length > 0 || rightColumnModules.length > 0;

    return (
      <div className="space-y-8">
        {/* Full width modules */}
        {fullWidthModules.map((module) => (
          <EditableModule
            key={module.id}
            module={module}
            isEditing={editing}
            onUpdate={(id, content, column) => handleUpdateModule(sectionIndex, id, content, column)}
            onDelete={(id) => handleDeleteModule(sectionIndex, id)}
          />
        ))}

        {/* Column layout for left/right modules */}
        {hasColumnModules && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left column */}
            <div className="space-y-6">
              {editing ? (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={(event) => handleColumnDragEnd(event, sectionIndex, 'left')}
                >
                  <SortableContext
                    items={leftColumnModules.map(m => m.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {leftColumnModules.map((module) => (
                      <EditableModule
                        key={module.id}
                        module={module}
                        isEditing={editing}
                        onUpdate={(id, content, column) => handleUpdateModule(sectionIndex, id, content, column)}
                        onDelete={(id) => handleDeleteModule(sectionIndex, id)}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              ) : (
                leftColumnModules.map((module) => (
                  <EditableModule
                    key={module.id}
                    module={module}
                    isEditing={editing}
                    onUpdate={(id, content, column) => handleUpdateModule(sectionIndex, id, content, column)}
                    onDelete={(id) => handleDeleteModule(sectionIndex, id)}
                  />
                ))
              )}
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {editing ? (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={(event) => handleColumnDragEnd(event, sectionIndex, 'right')}
                >
                  <SortableContext
                    items={rightColumnModules.map(m => m.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {rightColumnModules.map((module) => (
                      <EditableModule
                        key={module.id}
                        module={module}
                        isEditing={editing}
                        onUpdate={(id, content, column) => handleUpdateModule(sectionIndex, id, content, column)}
                        onDelete={(id) => handleDeleteModule(sectionIndex, id)}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              ) : (
                rightColumnModules.map((module) => (
                  <EditableModule
                    key={module.id}
                    module={module}
                    isEditing={editing}
                    onUpdate={(id, content, column) => handleUpdateModule(sectionIndex, id, content, column)}
                    onDelete={(id) => handleDeleteModule(sectionIndex, id)}
                  />
                ))
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleColumnDragEnd = (event: any, sectionIndex: number, column: 'left' | 'right') => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const section = editableSections[sectionIndex];
      const columnModules = section.modules.filter(m => m.column === column);
      const oldIndex = columnModules.findIndex((module) => module.id === active.id);
      const newIndex = columnModules.findIndex((module) => module.id === over.id);

      const reorderedColumnModules = arrayMove(columnModules, oldIndex, newIndex);
      
      // Update the full modules array with the reordered column modules
      const newModules = section.modules.map(module => {
        if (module.column === column) {
          const newOrder = reorderedColumnModules.findIndex(m => m.id === module.id);
          return { ...module, order: newOrder };
        }
        return module;
      });

      // Sort modules to maintain column order
      const sortedModules = [
        ...newModules.filter(m => m.column === 'full'),
        ...reorderedColumnModules,
        ...newModules.filter(m => m.column !== column && m.column !== 'full')
      ];

      const newSections = [...editableSections];
      newSections[sectionIndex] = { ...section, modules: sortedModules };
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
        sections={editableSections.length > 0 ? editableSections : sections.map(section => ({
          ...section,
          modules: [],
          speakerNotes: ''
        }))}
        onExit={() => setIsPresentationMode(false)}
        storageFilename="case-study-2.json"
      />
    );
  }

  return (
    <div className="min-h-screen bg-surface-primary">
      <a href="#main-content" className="skip-nav">Skip to main content</a>
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
      <nav className="sticky top-0 z-50 bg-surface-primary/80 backdrop-blur-md backdrop-saturate-150 border-b border-swiss-light py-4 overflow-x-visible">
        <div className="swiss-grid">
          <div className="col-span-12 flex items-center justify-between min-w-0">
            <button onClick={() => navigate('/')} className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors flex-shrink-0">
              <ArrowLeft size={20} />
              <span className="text-body hidden sm:inline">Back to Portfolio</span>
              <span className="text-body sm:hidden">Back</span>
            </button>
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0 overflow-visible">
              {isEditing && (
                <Button onClick={handleSave} size="sm" className="flex items-center space-x-2">
                  <Save size={16} />
                  <span className="text-sm hidden sm:inline">Save</span>
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPresentationMode(true)}
                className="opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center space-x-2 text-text-secondary hover:text-text-primary"
              >
                <Play size={16} />
                <span className="text-sm hidden md:inline">Presentation Mode</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => isAuthenticated ? setIsEditing(true) : setShowPasswordPrompt(true)}
                className="opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center space-x-2 text-text-secondary hover:text-text-primary"
              >
                <Edit3 size={16} />
                <span className="text-sm hidden md:inline">Edit Mode</span>
              </Button>
              <span className="text-body text-text-primary font-bold hidden sm:inline whitespace-nowrap">Chad Mortensen</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 bg-surface-secondary">
        <div className="swiss-grid">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3 text-center">
            {isEditing ? (
              <div className="space-y-4 mb-6">
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-display text-center bg-transparent border-none text-text-primary placeholder:text-text-secondary"
                  placeholder="Case study title"
                />
                <Input
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="text-lg text-center bg-transparent border-none text-text-secondary placeholder:text-text-secondary"
                  placeholder="Subtitle"
                />
              </div>
            ) : (
              <div className="mb-6">
                <h1 className="text-display text-text-primary">{title}</h1>
                <p className="text-xl text-text-secondary mt-4">{subtitle}</p>
              </div>
            )}
            <div className="w-16 h-px bg-accent-blue mx-auto mb-8"></div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div id="main-content" className="py-16">
        <div className="swiss-grid">
          <div className="col-span-12 space-y-24">
            <SectionEditor
              sections={editableSections}
              onUpdateSections={setEditableSections}
              isEditing={isEditing}
            />
            {editableSections.map((section, index) => (
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
                {renderModulesWithLayout(section.modules || [], index, isEditing)}
                
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

      <Footer backgroundClassName="bg-surface-secondary" />
    </div>
  );
};

export default CaseStudy2;
