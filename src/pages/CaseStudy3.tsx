import { ArrowLeft, Calendar, Users, Target, X, Play, Edit3, Save, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import PresentationMode from "@/components/PresentationMode";
import { EditableModule, Module } from "@/components/EditableModule";
import { ModuleLibrary } from "@/components/ModuleLibrary";
import { SectionEditor } from "@/components/SectionEditor";
import { GitHubStorageService } from "@/services/githubStorage";
import Footer from "@/components/Footer";

const CaseStudy3 = () => {
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
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Load content from GitHub or fallback to static content
  useEffect(() => {
    const loadContent = async () => {
      try {
        const githubService = new GitHubStorageService();
        const githubContent = await githubService.readFile('case-study-3.json');
        
        if (githubContent && githubContent.title && githubContent.subtitle && githubContent.sections) {
          setTitle(githubContent.title);
          setSubtitle(githubContent.subtitle);
          // Ensure each section has a speakerNotes property
          const sectionsWithNotes = githubContent.sections.map((section: any) => ({
            ...section,
            speakerNotes: section.speakerNotes || ''
          }));
          setEditableSections(sectionsWithNotes);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.log('GitHub load failed, trying localStorage');
      }

      // Try localStorage
      const saved = localStorage.getItem('case-study-3-content');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.title && parsed.subtitle && parsed.sections) {
            setTitle(parsed.title);
            setSubtitle(parsed.subtitle);
            // Ensure each section has a speakerNotes property
            const sectionsWithNotes = parsed.sections.map((section: any) => ({
              ...section,
              speakerNotes: section.speakerNotes || ''
            }));
            setEditableSections(sectionsWithNotes);
            setIsLoading(false);
            return;
          }
        } catch (error) {
          console.log('Error parsing saved content, using static content');
        }
      }

      // Load from the static JSON data file
      try {
        const response = await fetch('/data/case-studies/case-study-3.json');
        if (response.ok) {
          const jsonData = await response.json();
          if (jsonData && Array.isArray(jsonData)) {
            console.log('Loading content from JSON file');
            // Convert JSON sections to editable format - properly handle the existing module structure
            const convertedFromJson = jsonData.map(section => ({
              title: section.title,
              subheader: section.subheader || '',
              speakerNotes: section.speakerNotes || '',
              modules: (section.modules || []).map((module: any) => ({
                id: module.id || `${section.title}-${Date.now()}-${Math.random()}`,
                type: module.type,
                content: module.content,
                column: module.column || 'full'
              }))
            }));
            setEditableSections(convertedFromJson);
            setTitle('Brightside Health');
            setSubtitle('Designing a Better Way In (2024)');
            setIsLoading(false);
            return;
          }
        }
      } catch (error) {
        console.log('Failed to load from JSON file, using static content');
      }
      
      const converted = sections.map(section => {
         const modules: Module[] = [];
         
         // Add main content as text module
         if (section.content) {
           modules.push({
             id: `${section.title}-content-${Date.now()}`,
             type: 'text',
             content: section.content,
             column: 'full'
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

         // Add key findings as bullets module
         if (section.keyFindings) {
           modules.push({
             id: `${section.title}-findings-${Date.now()}`,
             type: 'bullets',
             content: { title: 'Key Findings', items: section.keyFindings },
             column: 'full'
           });
         }

         // Add insight as text module
         if (section.insight) {
           modules.push({
             id: `${section.title}-insight-${Date.now()}`,
             type: 'text',
             content: section.insight,
             column: 'full'
           });
         }

         // Add standout ideas as bullets module
         if (section.standoutIdeas) {
           modules.push({
             id: `${section.title}-ideas-${Date.now()}`,
             type: 'bullets',
             content: { title: 'Standout Ideas', items: section.standoutIdeas },
             column: 'full'
           });
         }

         // Add design principles as special bullets module
         if (section.designPrinciples) {
           const principleItems = section.designPrinciples.map((principle: any) => 
             `${principle.title}: ${principle.description}`
           );
           modules.push({
             id: `${section.title}-principles-${Date.now()}`,
             type: 'bullets',
             content: { title: 'Design Principles', items: principleItems },
             column: 'full'
           });
         }

         // Add tradeoffs as text module
         if (section.tradeoffs) {
           modules.push({
             id: `${section.title}-tradeoffs-${Date.now()}`,
             type: 'text',
             content: section.tradeoffs,
             column: 'full'
           });
         }

         // Add personal reflection as text module
         if (section.personalReflection) {
           modules.push({
             id: `${section.title}-reflection-${Date.now()}`,
             type: 'text',
             content: section.personalReflection,
             column: 'full'
           });
         }

         // Add image module if present
         if (section.image) {
           modules.push({
             id: `${section.title}-image-${Date.now()}`,
             type: 'image',
             content: { src: section.image, alt: `${section.title} visual` },
             column: 'right'
           });
         }

         return {
           title: section.title,
           subheader: section.subheader,
           speakerNotes: '',
           modules
         };
        });
        setEditableSections(converted);
        setTitle('Brightside Health');
        setSubtitle('Designing a Better Way In (2024)');
        setIsLoading(false);
    };

    loadContent();
  }, []);


  const handlePasswordSubmit = () => {
    if (editPassword === '4455') {
      setIsEditing(true);
      setShowPasswordPrompt(false);
      setEditPassword('');
      // Store authentication state
      localStorage.setItem('edit-authenticated', 'true');
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
      setEditPassword('');
    }
  };

  const handleSave = async () => {
    const saveData = {
      title,
      subtitle,
      sections: editableSections
    };
    
    const githubService = new GitHubStorageService();
    
    // Save to GitHub
    const success = await githubService.writeFile('case-study-3.json', saveData);
    
    if (success) {
      // Also save to localStorage as backup
      localStorage.setItem('case-study-3-content', JSON.stringify(saveData));
      setIsEditing(false);
      alert('Changes saved successfully to GitHub!');
    } else {
      // If GitHub fails, still save to localStorage
      localStorage.setItem('case-study-3-content', JSON.stringify(saveData));
      setIsEditing(false);
      alert('Saved locally (GitHub save failed - check config)');
    }
  };

  // Auto-save to localStorage when content changes and in edit mode
  useEffect(() => {
    if (isEditing && editableSections.length > 0) {
      const saveData = {
        title,
        subtitle,
        sections: editableSections
      };
      localStorage.setItem('case-study-3-content', JSON.stringify(saveData));
    }
  }, [editableSections, title, subtitle, isEditing]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const sectionIndex = currentSectionIndex;
      const section = editableSections[sectionIndex];
      const oldIndex = section.modules.findIndex((module) => module.id === active.id);
      const newIndex = section.modules.findIndex((module) => module.id === over.id);

      const newModules = arrayMove(section.modules, oldIndex, newIndex);
      const newSections = [...editableSections];
      newSections[sectionIndex] = { ...section, modules: newModules };
      setEditableSections(newSections);
    }
  };

  const handleColumnDragEnd = (event: any, sectionIndex: number, column: 'left' | 'right') => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

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

  const handleUpdateSections = (newSections: Array<{title: string; subheader?: string; modules: Module[]}>) => {
    setEditableSections(newSections);
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

  const sections = [
    {
      title: "The Challenge",
      subheader: "Unifying isolated efforts with a shared vision",
      content: "At Brightside Health, several parallel efforts were in motion to improve the intake funnel. However, they were happening in isolation, each focused on short-term gains without a shared sense of direction. I encouraged the designer on the growth squad to pause and consider a more expansive approach. What if we looked beyond the immediate constraints and imagined what a truly exceptional experience could be?\n\nThe business needed to increase conversion rates and support a wider range of marketing channels. From the user's perspective, the goal was to feel confident in their decisions about seeking care and understanding the cost of services.\n\nSuccess was defined by the squad as improved conversion and the creation of a more adaptable intake flow that could support diverse user journeys. Executives wanted to know that the team had a long-term plan, and the squad needed a vision to unify their efforts and guide decision-making.",
      goals: [
        "Increase conversion rate for prospective members signing up for Brightside Health",
        "Create a flexible solution for new marketing channels", 
        "Balance a concise signup process with capturing important customer health information that assists with treatment"
      ],
      image: "/lovable-uploads/653ebb9d-20fb-4574-8a3e-ce19d02d793c.png"
    },
    {
      title: "The Data",
      subheader: "Grounded decisions through analytics and insights",
      content: "Our design decisions were grounded in both qualitative and quantitative inputs. These included customer survey feedback, funnel analytics, and a competitive audit.\n\nAnalytics showed that the most significant drop-offs occurred at high-friction moments, such as account creation and payment. Interestingly, the long series of personal and health-related questions did contribute to some attrition, but the impact was relatively minor.\n\nAs a side effort, I developed a GPT-based assistant to help designers and product managers generate analytics reports. This tool provided step-by-step instructions for using Brightside's data tools and helped promote a more data-informed culture across the product organization. Although it was not part of the original project scope, it was a valuable enabler.\n\nWe used these insights to identify opportunity areas. The brainstorm process helped us connect what users were telling us with what the data confirmed, allowing us to generate targeted design ideas that addressed both."
    },
    {
      title: "Competitive Audit", 
      subheader: "Understanding the landscape",
      content: "To understand how Brightside compared to other services, I gathered input from stakeholders and conducted a scan of leading telehealth and mental health providers. Using a combination of internal suggestions and external research, I identified 11 companies to include in the audit.\n\nRather than just focusing on individual screens, I mapped each company's intake journey to get a full view of the process. This helped us assess the overall structure, tone, and flow of their experiences.\n\nOne finding stood out immediately. Brightside's intake process had 180 distinct steps. The next closest competitor had 70, and most were in the range of 20 to 40 steps.",
      keyFindings: [
        "The order in which information was requested varied widely across competitors.",
        "Only one other company, Hims, collected full personal and medical history during the initial sign-up. Others either postponed this step or conducted it during a follow-up.",
        "About half of the competitors did not perform an insurance check early in the process, possibly due to differences in their service models."
      ],
      insight: "The main gap was clear. Brightside asked significantly more from users before they even created an account, which made the experience feel heavier and more intrusive than others in the space."
    },
    {
      title: "Ideation",
      subheader: "Expanding beyond immediate constraints", 
      content: "Unlike many vision projects, this effort did not begin with a structured group brainstorm. The designer had already started working on near-term improvements. My goal was to help him think more broadly and explore directions that weren't limited by what could be built in the next sprint.\n\nInstead of formal workshops, we used a series of design critiques to push the work further. I challenged him to integrate new insights from the research and bring more ambition into the designs.\n\nThrough critiques, we evaluated which ideas could be combined, simplified, or expanded. This iterative approach helped us shape a stronger, more inspiring vision.",
      standoutIdeas: [
        "Use AI to offer helpful guidance during complex decision points, such as selecting a payment method or understanding insurance.",
        "Introduce a more human tone by incorporating videos and personalized therapist content, making the process feel more like a conversation than a transaction."
      ]
    },
    {
      title: "Key Aspects of the Design Vision",
      subheader: "Three principles for transforming the user experience",
      content: "The design vision focused on three guiding principles that would transform the user experience:",
      designPrinciples: [
        {
          title: "More Human",
          description: "We aimed to create a sign-up process that felt supportive and empathetic. Video content helped explain complicated decisions. We also highlighted therapist bios and working styles to create a stronger emotional connection between patient and provider."
        },
        {
          title: "More Assistive (AI-Driven)", 
          description: "While AI was not the core of the vision, it played a valuable role in making the experience feel smarter and more responsive. It surfaced relevant content at the right time and used natural language to reduce friction."
        },
        {
          title: "More Concise",
          description: "We removed unnecessary steps, combined related screens, and postponed some questions until after the user created an account. This helped make the experience shorter and less mentally taxing."
        }
      ],
      tradeoffs: "We did face some trade-offs. Removing questions reduced friction, but some of that information was useful to therapists during their first session. We resolved this by determining which data could be safely collected later without affecting clinical readiness."
    },
    {
      title: "Output: Prototype & Presentation",
      subheader: "Bringing the vision to life",
      content: "The final output included a functional prototype of the redesigned intake experience. Built in Figma, it allowed stakeholders to click through and experience the flow firsthand. It was also embedded in a Figma Slides presentation to provide context and narrative.\n\nThe prototype was shared with the head of product, the growth squad, and the CEO. The CEO's response was brief but encouraging. He said it was clear that the work was thoughtful and asked when the new experience could be implemented.\n\nMore importantly, the prototype provided a concrete vision. It gave the team something to rally around and helped connect near-term initiatives with long-term goals."
    },
    {
      title: "Results",
      subheader: "Impact and transformation",
      content: "While the full vision has not yet been implemented, it has already begun to shape the team's direction.\n\nThe design helped validate that the squad's current roadmap was on the right track and provided a more ambitious goal to work toward. It reinforced the value of design as a strategic partner, not just a delivery function.\n\nThe head of engineering noted that he had a clearer understanding of why the team was building what they were building. This clarity improved collaboration and focus.",
      personalReflection: "Personally, I'm most proud of the growth I saw in the designer. He shifted from solving isolated problems to thinking systemically and aspirationally. That shift — from asking what's feasible to imagining what's possible — is where real transformation begins."
    }
  ];

  if (isPresentationMode) {
    return (
      <PresentationMode
        sections={editableSections}
        onExit={() => setIsPresentationMode(false)}
        storageFilename="case-study-3.json"
      />
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-primary flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-accent-teal border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-text-secondary">Loading case study...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-primary">
      <a href="#main-content" className="skip-nav">Skip to main content</a>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-surface-primary/80 backdrop-blur-md backdrop-saturate-150 border-b border-swiss-light py-4 overflow-x-visible">
        <div className="swiss-grid">
          <div className="col-span-12 flex items-center justify-between min-w-0">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors flex-shrink-0"
            >
              <ArrowLeft size={20} />
              <span className="text-body hidden sm:inline">Back to Portfolio</span>
              <span className="text-body sm:hidden">Back</span>
            </button>
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0 overflow-visible">
              {isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSave}
                  className="flex items-center space-x-2 text-text-primary border-accent-blue"
                >
                  <Save size={16} />
                  <span className="text-sm hidden sm:inline">Save Changes</span>
                  <span className="text-sm sm:hidden">Save</span>
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => isAuthenticated ? setIsEditing(true) : setShowPasswordPrompt(true)}
                  className="opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center space-x-2 text-text-secondary hover:text-text-primary"
                >
                  <Edit3 size={16} />
                  <span className="text-sm hidden md:inline">Edit Mode</span>
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
                  placeholder="Subtitle (optional)"
                />
              </div>
            ) : (
              <div className="mb-6">
                <h1 className="text-display text-text-primary">{title}</h1>
                {subtitle && (
                  <p className="text-xl text-text-secondary mt-4">{subtitle}</p>
                )}
              </div>
            )}
            <div className="h-[3px] w-[12rem] bg-accent-teal mx-auto mb-8"></div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div id="main-content" className="py-16">
        <div className="swiss-grid">
          <div className="col-span-12 space-y-24">
            {/* Section Editor */}
            <SectionEditor
              sections={editableSections}
              onUpdateSections={handleUpdateSections}
              isEditing={isEditing}
            />
            
            {editableSections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                {/* Header spans full width */}
                <div className="mb-8 flex items-end justify-between">
                  <div>
                    <h2 className={`text-headline text-text-primary font-light ${section.subheader ? 'mb-0' : 'mb-6'}`}>
                      {section.title}
                    </h2>
                    {section.subheader && (
                      <h3 className="text-xl text-text-secondary font-light mt-4 mb-6">
                        {section.subheader}
                      </h3>
                    )}
                    <div className="w-12 h-[3px] bg-accent-teal"></div>
                  </div>
                  
                  {isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCurrentSectionIndex(sectionIndex);
                        setShowModuleLibrary(true);
                      }}
                      className="flex items-center space-x-2"
                    >
                      <Plus size={16} />
                      <span className="text-sm">Add Module</span>
                    </Button>
                  )}
                </div>
                
                {/* Modules with column-based layout */}
                <div className="space-y-6">
                  {renderModulesWithLayout(section.modules, sectionIndex, isEditing)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />

      {/* Password Prompt Modal */}
      {showPasswordPrompt && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-surface-primary border border-swiss-light rounded-lg p-6 max-w-sm w-full mx-4">
            <h2 className="text-headline text-text-primary mb-4">Enter Edit Password</h2>
            <div className="space-y-4">
              <Input
                type="password"
                value={editPassword}
                onChange={(e) => setEditPassword(e.target.value)}
                placeholder="Password"
                onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
              />
              <div className="flex space-x-2">
                <Button onClick={handlePasswordSubmit} className="flex-1">
                  Enter
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowPasswordPrompt(false);
                    setEditPassword('');
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Module Library */}
      <ModuleLibrary
        isOpen={showModuleLibrary}
        onAddModule={(module) => handleAddModule(currentSectionIndex, module)}
        onClose={() => setShowModuleLibrary(false)}
      />
    </div>
  );
};

export default CaseStudy3;
