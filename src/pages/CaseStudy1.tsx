import { ArrowLeft, Calendar, Users, Target, X, Play, Edit3, Save, Plus, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useLanguage } from "@/hooks/use-language";
import { pageCopy } from "@/lib/page-copy";
import { languageOptions, type LanguageCode } from "@/lib/site-content";

const CaseStudy1 = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { language, setLanguage, content } = useLanguage();
  const copy = pageCopy[language];
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
  const [title, setTitle] = useState('Walmart eCommerce');
  const [subtitle, setSubtitle] = useState('Building a customer-centered registry experience under tight constraints (2019)');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const LanguageSelector = () => (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex items-center gap-1 rounded-full border border-swiss-light px-3 py-1 text-caption text-text-secondary transition-colors hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2"
        aria-label={content.navigation.languageSelectorAriaLabel}
      >
        <span>{language.toUpperCase()}</span>
        <ChevronDown size={14} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-24 bg-surface-primary border border-swiss-light shadow-lg">
        <DropdownMenuRadioGroup value={language} onValueChange={(value) => setLanguage(value as LanguageCode)}>
          {languageOptions.map((option) => (
            <DropdownMenuRadioItem
              key={option.code}
              value={option.code}
              className="cursor-pointer text-text-secondary hover:text-text-primary hover:bg-surface-secondary"
            >
              <div className="flex w-full items-center justify-between gap-3">
                <span>{option.label}</span>
                <span className="text-caption text-text-tertiary">{option.name}</span>
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const sections = [{
    title: "The Challenge",
    subheader: "Rapid transformation under tight constraints",
    content: "In 1 quarter; design, develop and launch an improved baby registry experience addressing shortcomings of the previous registry tool.",
    goals: ["Increase quality registry creations (creations that lead to a first curation action)", "Increase curation by 10%", "Increase sharing by 20%", "Increase purchase conversion by 25%", "Helping new parents with this major moment in life"]
    // No image for this section
  }, {
    title: "Assembling the Team",
    subheader: "Leadership alignment and persuasion",
    content: "With just six weeks to take this project from discovery through final deliverables — and much of that timeline landing squarely in the holiday-heavy back half of Q4 — I knew we needed to move quickly and assemble a team that could hit the ground running.\n\nAfter aligning with our business and product partners, I had enough clarity on the scope to start making staffing decisions. One of my staff designers was well-positioned to lead the work, but I also knew that expecting him to carry the full load would put both the team and the project at risk.\n\nRather than waiting for headcount or formal allocations, I looked for creative ways to build the right team. I'd heard that another group at Walmart — the wedding registry team — was entering a period of uncertainty due to pending org changes. That meant talented designers were available but underutilized. I made the case to design leadership to temporarily borrow a couple of their designers, and supplemented the rest of the team with strong contractors from our existing pool.\n\nThis approach allowed us to act fast, stay nimble, and build a cross-functional team that blended deep domain knowledge with fresh perspectives — all without missing a beat on our timeline.",
    image: "/lovable-uploads/e36754b0-b1da-47b9-8e75-731620ea5cf1.png",
    fullWidthImage: "/lovable-uploads/88b85ba6-6a79-47ac-9c76-cb60fb28f194.png"
  }, {
    title: "Ground the Team in Research and Insights",
    subheader: "We had past research so let's not lose that in an effort to be efficient",
    content: "The Routine Consumables team was responsible for the baby category at Walmart. The baby registry had received a design overhaul a couple of years prior; luckily, we had quite a bit of research to start with. Market research, customer feedback and customer interviews provide rich insights.\n\nUnderstanding users' motivations, areas of friction as well as areas of delight is key to building human-centered products. I wanted to ensure that the team was grounded in insights.\n\nWe held an offsite at the beginning of this project to bring together the designers, understand the goals, and align on the initial outline of what we were building. We kicked off this offsite with a deep dive into the past research, presented by the team's UX Researcher.\n\nThe key insights gained from the research review were that Walmart registry users have been asking for a greater level of control, guidance, and needed to establish trust with the experience.",
    quotes: ["I became so frustrated in making the registry through the app, that I quit. It is not intuitive nor easy to navigate in order to add or change something.", "It's not as user friendly as other registries I've used. It would be better if the registry picks fell into the categories provided. That would make it much easier."],
    insight: "Almost half of moms don't want any help creating a registry - they want to take ownership of their list and pick items that are relevant to their person needs (GCIA Oct 2019)",
    image: "/lovable-uploads/7ccb122a-dcc0-42aa-b708-2b4efed30bd9.png",
    additionalImages: [
      "/lovable-uploads/1268a6d5-7794-4290-89ec-54f8fec3cb8a.png", // New Mom Journey
      "/lovable-uploads/34674288-e5b6-4941-953c-a17ddfabc474.png"  // Customer Insights
    ]
  }, {
    title: "Create Design Principles",
    subheader: "Research backed design principles helped to focus the team",
    content: "One of the most effective ways to carry research forward — not just in spirit but in practice — is through clear, actionable design principles. After reviewing the insights as a team, we distilled what we heard into a focused set of principles that would guide our decision-making throughout the project.\n\nThese weren't abstract ideals — they were grounded in the real needs, emotions, and expectations of our registry users. Our goal was to create something that could be revisited easily and used as a north star by anyone on the team, from product to engineering to content.\n\nBy capturing the essence of what mattered most to our users, these principles helped us stay aligned, make faster decisions, and ensure that the experience we were creating stayed rooted in empathy and clarity.",
    image: "/lovable-uploads/b0a6356d-f821-42bf-9254-9434eeb0a7e9.png"
  }, {
    title: "Ideation Workshop - How Might We",
    subheader: "Cross-functional collaboration to prioritize opportunities",
    content: "To bridge our research insights and business goals into actionable opportunities, I partnered with our staff designer to plan and facilitate a cross-functional \"How Might We\" workshop.\n\nWe brought together eight team members from design, product, engineering, and research to explore potential improvements to the registry experience — using our design principles as a foundation.\n\nThis collaborative exercise helped the team align around where to focus, and created a sense of ownership across disciplines as we moved into solutioning.",
    sessionDetails: ["We generated more than 70 \"How Might We\" statements", "Clustered them into 11 thematic categories", "Used dot voting to identify the most promising directions", "Named and prioritized the top 3 opportunity areas to guide the next phase of design"],
    image: "/lovable-uploads/696d025f-a8e0-4a25-8255-da6c90c4a2cb.png"
  }, {
    title: "Aligning Across Design, Product, and Business",
    subheader: "Strategic focus areas for maximum impact",
    content: "With research insights in hand and opportunity areas prioritized, the next step was alignment — not just within the design team, but across product, engineering, and the business. I led conversations that helped us distill a shared set of focus areas, ensuring that our design direction was grounded in user needs, technically feasible, and aligned with broader strategic goals.\n\nWe landed on four key areas of opportunity that met our goals and fit within our short timeline:",
    focusAreas: [
      {
        title: "Improve Onboarding",
        description: "Instead of forcing everyone through a pre-populated registry that required manual cleanup, we introduced a flexible, empowering flows that empowered the users to build their registry:",
        points: [
          "Full control for users who prefer to start from scratch",
          "Guided setup for those who want help curating", 
          "A quick-start option with a recommended, pre-filled registry"
        ]
      },
      {
        title: "Enhance Curation and Management",
        description: "We focused on making the registry easier to manage, share, and personalize:",
        points: [
          "Simplified tools to make registries public and shareable",
          "Contextual guidance and recommendations embedded within the experience",
          "Clear visibility into what's been purchased — at both the item and category level"
        ]
      },
      {
        title: "Elevate the Gifting Experience", 
        description: "We looked at the registry from the gift-giver's perspective and brought in best practices from eCommerce:",
        points: [
          "Made it easier to identify in-stock and available items",
          "Created clear pathways for in-store shoppers to attribute purchases to a registry"
        ]
      },
      {
        title: "Streamline Internal Processes",
        description: "Finally, we identified improvements that would increase agility and reduce operational friction:",
        points: [
          "Removed dependencies on engineering for updating curated inventory",
          "Built tools for merchants to manage recommendations and track performance"
        ]
      }
    ],
    conclusion: "This alignment not only clarified what we were building — it empowered every team to move forward with confidence and shared purpose."
    // No image for this section - using full width layout
  }, {
    title: "Low to High Fidelity Design",
    subheader: "Balancing Speed with Alignment",
    content: "With a tight timeline and a lean team, efficiency in our design process was critical. We started in low fidelity — wireframes gave us the flexibility to explore ideas quickly, iterate without friction, and align on the structure of the experience before investing in polished visuals.\n\nTo maintain momentum and ensure we were moving in the right direction, I established a focused cadence of reviews and standups that gave the team space for feedback, alignment, and unblockers:\n\nAs we progressed into higher fidelity, we expanded participation in our design reviews to include engineering partners. This reduced late-stage churn, strengthened cross-functional alignment, and helped the full team stay connected to design intent as implementation began.\n\nThis rhythm created a healthy pace — fast enough to keep the project on track, with just enough structure to build clarity and confidence along the way.",
    schedule: ["Weekly Design Cadence", "Mon / Wed / Fri – Leadership Reviews", "Tue / Thur – Team Critiques", "Daily – 15-minute standups to flag blockers and sync on progress"],
    image: "/lovable-uploads/dc3e659d-a7ff-4523-95e2-9c460eb8a16a.png", // Get Started, Empty, and Filled states
    additionalImages: [
      "/lovable-uploads/1859e055-78bd-4a46-8bc4-96e40ba05ed6.png", // Inspire/Browse and Empty State wireframes
      "/lovable-uploads/14b8d499-bca9-4168-9e49-66c0e7ebcf56.png"  // Current vs Enhancement comparison
    ]
  }, {
    title: "Examples of Enhancements",
    subheader: "Key improvements and feature implementations",
    content: "Key design improvements and feature enhancements implemented throughout the registry experience.",
    fullWidthImage: "/lovable-uploads/167b31ed-0f68-4044-9d07-fd3b2e8b30ff.png"
  }, {
    title: "Constant Prioritization",
    subheader: "Staying Focused Without Losing the Spark",
    content: "With a fixed timeline and no room for extension, staying aligned on what mattered most was critical. I partnered closely with our product and engineering directors to continuously reassess scope, timelines, and effort — making sure the team was focused on the highest-impact work at every stage.\n\nThis wasn't a one-time exercise. It was a constant, collaborative practice of cutting, refining, and reshaping the roadmap to fit within what was possible — without compromising on the quality of the experience.\n\nWhen the timeline demanded tough tradeoffs, I worked to keep the team motivated and connected to the \"why.\" That sometimes meant rallying partners around features that added delight or polish — small touches that might not have been strictly required, but were essential to earning user trust and elevating the overall experience.\n\nThis balance of discipline and inspiration helped us ship something we were proud of — on time, and grounded in the needs of the people we were designing for.",
    image: "/lovable-uploads/90200b10-1ca7-46fe-b43a-422df927dde9.png"
  }, {
    title: "Results",
    subheader: "A Registry That Delivered",
    content: "The updated baby registry launched on time — a major accomplishment given the ambitious scope and tight constraints. More importantly, it was a product that truly reflected the needs of our customers.",
    table: {
      headers: ["Goals", "Results"],
      rows: [
        ["Increase quality registry creations (creations that lead to a first curation action)", "+28% vs. Last year"],
        ["Increase curation by 10%", "70% edited within 3-7 days. +20% increase"],
        ["Increase sharing by 20%", "55% shared within 7 days +8% increase"],
        ["Increase purchase conversion by 25%", "GMV initially increased but then decreased starting in April possibly due to COVID"]
      ]
    }
  }, {
    title: "What We Learned",
    subheader: "Leading with Clarity, Empathy, and Focus",
    content: "This project was a clear reminder that even with tight timelines, it's possible to deliver meaningful, customer-centered work — as long as you're intentional about how you lead, how you listen, and how you prioritize.",
    learnings: [
      "Define the \"Why\" Early: Set clear goals and success metrics up front — so every team member understood what we were solving for and how we'd measure impact.",
      "Plan for Reality, Not Perfection: Sequenced the work with rough estimates to balance ambition with feasibility — helping the team stay focused without overcommitting.",
      "Right-Size the Team for the Mission: Augmented the core team (1 design lead, 4 designers total) by tapping into adjacent talent and available contractor resources.",
      "Lead with Empathy, Not Assumptions: Built on existing research and kept user needs front and center — creating space for insight to guide every decision.",
      "Make Space to Explore: Ideated and iterated quickly in low fidelity before polishing — ensuring feedback loops were short, inclusive, and grounded.",
      "Prioritize Ruthlessly, Together: Partnered closely with product and engineering to cut noise, make tough tradeoffs, and still deliver moments of delight."
    ]
  }];

  // Load content from GitHub or fallback to localStorage on mount
  useEffect(() => {
    const loadContent = async () => {
      const githubService = new GitHubStorageService();
      const storageBase = "case-study-1";
      const localizedFilename = `${storageBase}.${language}.json`;
      const legacyFilename = `${storageBase}.json`;
      const localizedStorageKey = `${storageBase}-content-${language}`;
      const legacyStorageKey = `${storageBase}-content`;
      
      try {
        // Try to load from GitHub first
        const githubContent =
          (await githubService.readFile(localizedFilename)) ?? (await githubService.readFile(legacyFilename));
        if (githubContent && Array.isArray(githubContent)) {
          // Handle array format (sections only)
          const migratedContent = githubContent.map((section: any, index: number) => ({
            ...section,
            subheader: section.subheader || sections[index]?.subheader,
            speakerNotes: section.speakerNotes || ''
          }));
          setEditableSections(migratedContent);
          return;
        } else if (githubContent && githubContent.sections) {
          // Handle object format with title, subtitle, and sections
          if (githubContent.title) {
            setTitle(githubContent.title);
          }
          if (githubContent.subtitle) {
            setSubtitle(githubContent.subtitle);
          }
          const migratedContent = githubContent.sections.map((section: any, index: number) => ({
            ...section,
            subheader: section.subheader || sections[index]?.subheader,
            speakerNotes: section.speakerNotes || ''
          }));
          setEditableSections(migratedContent);
          return;
        }
      } catch (error) {
        console.error('Error loading from GitHub:', error);
      }

      // Fallback to localStorage
      try {
        const savedContent = localStorage.getItem(localizedStorageKey) ?? localStorage.getItem(legacyStorageKey);
        if (savedContent) {
          const parsed = JSON.parse(savedContent);
          if (Array.isArray(parsed)) {
            // Handle array format (sections only)
            const migratedContent = parsed.map((section: any, index: number) => ({
              ...section,
              subheader: section.subheader || sections[index]?.subheader,
              speakerNotes: section.speakerNotes || ''
            }));
            setEditableSections(migratedContent);
            return;
          } else if (parsed.sections) {
            // Handle object format with title, subtitle, and sections
            if (parsed.title) {
              setTitle(parsed.title);
            }
            if (parsed.subtitle) {
              setSubtitle(parsed.subtitle);
            }
            const migratedContent = parsed.sections.map((section: any, index: number) => ({
              ...section,
              subheader: section.subheader || sections[index]?.subheader,
              speakerNotes: section.speakerNotes || ''
            }));
            setEditableSections(migratedContent);
            return;
          }
        }
      } catch (e) {
        console.error('Failed to parse saved content:', e);
      }

      // Convert static sections as fallback - always run if no saved content loaded
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
        if (section.image) {
          modules.push({
            id: `${section.title}-image-${Date.now()}`,
            type: 'image',
            content: { src: section.image, alt: `${section.title} visual`, position: 'beside', columns: '4' },
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
    };

    loadContent();
  }, [language]);



  const handlePasswordSubmit = () => {
    if (editPassword === '4455') {
      setIsEditing(true);
      setShowPasswordPrompt(false);
      setEditPassword('');
      localStorage.setItem('edit-authenticated', 'true');
      setIsAuthenticated(true);
    } else {
      alert(copy.incorrectPassword);
      setEditPassword('');
    }
  };

  const handleSave = async () => {
    try {
      const storageBase = "case-study-1";
      const localizedFilename = `${storageBase}.${language}.json`;
      const localizedStorageKey = `${storageBase}-content-${language}`;
      const saveData = {
        title,
        subtitle,
        sections: editableSections
      };
      
      const githubService = new GitHubStorageService();
      await githubService.writeFile(localizedFilename, saveData);
      
      // Also save to localStorage as backup
      localStorage.setItem(localizedStorageKey, JSON.stringify(saveData));
      setIsEditing(false);
      alert('Changes saved successfully to GitHub!');
    } catch (error) {
      console.error('Error saving to GitHub:', error);
      // Fallback to localStorage only
      const storageBase = "case-study-1";
      const localizedStorageKey = `${storageBase}-content-${language}`;
      const saveData = {
        title,
        subtitle,
        sections: editableSections
      };
      localStorage.setItem(localizedStorageKey, JSON.stringify(saveData));
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

  // Reorder within a specific column (edit mode)
  const handleColumnDragEnd = (event: any, sectionIndex: number, column: 'left' | 'right') => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const section = editableSections[sectionIndex];
    const columnModules = section.modules.filter(m => m.column === column);
    const oldIndex = columnModules.findIndex((m) => m.id === active.id);
    const newIndex = columnModules.findIndex((m) => m.id === over.id);

    const reordered = arrayMove(columnModules, oldIndex, newIndex);

    // Merge back preserving other modules
    const merged = section.modules.map(m => (
      m.column === column ? { ...m, order: reordered.findIndex(x => x.id === m.id) } : m
    ));

    const sorted = [
      ...merged.filter(m => m.column === 'full'),
      ...reordered,
      ...merged.filter(m => m.column !== column && m.column !== 'full')
    ];

    const newSections = [...editableSections];
    newSections[sectionIndex] = { ...section, modules: sorted };
    setEditableSections(newSections);
  };

  // Column-based layout renderer for both view and edit
  const renderModulesWithLayout = (modules: Module[], sectionIndex: number, editing: boolean) => {
    const full = modules.filter(m => m.column === 'full');
    const left = modules.filter(m => m.column === 'left');
    const right = modules.filter(m => m.column === 'right');
    const hasColumns = left.length > 0 || right.length > 0;

    return (
      <div className="space-y-8">
        {full.map((module) => (
          <EditableModule
            key={module.id}
            module={module}
            isEditing={editing}
            onUpdate={(id, content, column) => handleUpdateModule(sectionIndex, id, content, column)}
            onDelete={(id) => handleDeleteModule(sectionIndex, id)}
          />
        ))}

        {hasColumns && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              {editing ? (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={(event) => handleColumnDragEnd(event, sectionIndex, 'left')}
                >
                  <SortableContext items={left.map(m => m.id)} strategy={verticalListSortingStrategy}>
                    {left.map((module) => (
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
                left.map((module) => (
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

            <div className="space-y-6 items-start">
              {editing ? (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={(event) => handleColumnDragEnd(event, sectionIndex, 'right')}
                >
                  <SortableContext items={right.map(m => m.id)} strategy={verticalListSortingStrategy}>
                    {right.map((module) => (
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
                right.map((module) => (
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
  if (isPresentationMode) {
    return (
      <PresentationMode
        sections={editableSections.length > 0 ? editableSections : sections.map(section => ({
          ...section,
          modules: [],
          speakerNotes: ''
        }))}
        onExit={() => setIsPresentationMode(false)}
        storageFilename="case-study-1.json"
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
            <h3 className="text-lg font-medium mb-4">{copy.enterPasswordToEdit}</h3>
            <Input
              type="password"
              value={editPassword}
              onChange={(e) => setEditPassword(e.target.value)}
              placeholder={copy.passwordPlaceholder}
              className="mb-4"
              onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
            />
            <div className="flex space-x-2">
              <Button onClick={handlePasswordSubmit}>{copy.submit}</Button>
              <Button variant="outline" onClick={() => setShowPasswordPrompt(false)}>{copy.cancel}</Button>
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
              <span className="text-body hidden sm:inline">{copy.backToPortfolio}</span>
              <span className="text-body sm:hidden">{copy.backShort}</span>
            </button>
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0 overflow-visible">
              <LanguageSelector />
              {isEditing && (
                <Button onClick={handleSave} size="sm" className="flex items-center space-x-2">
                  <Save size={16} />
                  <span className="text-sm hidden sm:inline">{copy.save}</span>
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPresentationMode(true)}
                className="opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center space-x-2 text-text-secondary hover:text-text-primary"
              >
                <Play size={16} />
                <span className="text-sm hidden md:inline">{copy.presentationMode}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => isAuthenticated ? setIsEditing(true) : setShowPasswordPrompt(true)}
                className="opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center space-x-2 text-text-secondary hover:text-text-primary"
              >
                <Edit3 size={16} />
                <span className="text-sm hidden md:inline">{copy.editMode}</span>
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
                  placeholder={copy.caseStudyTitlePlaceholder}
                />
                <Input
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="text-lg text-center bg-transparent border-none text-text-secondary placeholder:text-text-secondary"
                  placeholder={copy.subtitlePlaceholder}
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
                        <span>{copy.addModule}</span>
                      </Button>
                    </div>
                  )}
                </div>

                {/* Section Content */}
                {renderModulesWithLayout(section.modules || [], index, isEditing)}
                
                {/* Add separator after each section except the last one */}
                {index < sections.length - 1 && (
                  <div className="mt-24">
                    <Separator className="bg-swiss-light" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-surface-secondary border-t border-swiss-light">
        <div className="swiss-grid">
          <div className="col-span-12 text-center">
            <button onClick={() => navigate('/')} className="px-8 py-3 bg-text-primary text-surface-primary hover:bg-swiss-gray transition-colors duration-200">
              {copy.backToPortfolio}
            </button>
          </div>
        </div>
      </footer>

      {/* Image Overlay Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-7xl max-h-[90vh] p-0 border-0 bg-transparent">
          {selectedImage && (
             <img 
               src={selectedImage} 
               alt="Enlarged case study image showing detailed design process and outcomes" 
               className="w-full h-auto max-h-[85vh] object-contain"
               loading="lazy"
               decoding="async"
             />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CaseStudy1;
