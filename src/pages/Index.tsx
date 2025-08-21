
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Leadership from "@/components/Leadership";
import Value from "@/components/Value";
import CaseStudies from "@/components/CaseStudies";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit3, Save, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { EditableModule, Module } from "@/components/EditableModule";
import { ModuleLibrary } from "@/components/ModuleLibrary";
import { SectionEditor } from "@/components/SectionEditor";
import { GitHubStorageService } from "@/services/githubStorage";
import { defaultMainPageContent, MainPageSection } from "@/data/mainPageContent";

const Index = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editPassword, setEditPassword] = useState('');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('main-page-edit-authenticated') === 'true';
  });
  const [showModuleLibrary, setShowModuleLibrary] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [editableSections, setEditableSections] = useState<MainPageSection[]>(defaultMainPageContent.sections);
  const [title, setTitle] = useState(defaultMainPageContent.title);
  const [subtitle, setSubtitle] = useState(defaultMainPageContent.subtitle);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Load content from GitHub or localStorage on mount
  useEffect(() => {
    const loadContent = async () => {
      const githubService = new GitHubStorageService();
      
      // Try to load from GitHub first
      const githubContent = await githubService.readFile('main-page-content.json');
      if (githubContent) {
        if (githubContent.title) setTitle(githubContent.title);
        if (githubContent.subtitle) setSubtitle(githubContent.subtitle);
        if (githubContent.sections) setEditableSections(githubContent.sections);
        return;
      }

      // Fallback to localStorage
      const savedContent = localStorage.getItem('main-page-content');
      if (savedContent) {
        try {
          const parsed = JSON.parse(savedContent);
          if (parsed.title) setTitle(parsed.title);
          if (parsed.subtitle) setSubtitle(parsed.subtitle);
          if (parsed.sections) setEditableSections(parsed.sections);
        } catch (e) {
          console.error('Failed to parse saved content:', e);
        }
      }
    };

    loadContent();
  }, []);

  const handlePasswordSubmit = () => {
    if (editPassword === 'design123') {
      setIsAuthenticated(true);
      setIsEditing(true);
      setShowPasswordPrompt(false);
      localStorage.setItem('main-page-edit-authenticated', 'true');
      setEditPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  const handleSave = async () => {
    const contentToSave = {
      title,
      subtitle,
      sections: editableSections,
      lastModified: new Date().toISOString()
    };

    // Save to GitHub
    const githubService = new GitHubStorageService();
    const githubSuccess = await githubService.writeFile('main-page-content.json', contentToSave);
    
    // Also save to localStorage as backup
    localStorage.setItem('main-page-content', JSON.stringify(contentToSave));
    
    if (githubSuccess) {
      alert('Content saved successfully to GitHub!');
    } else {
      alert('Content saved locally. GitHub sync failed - check your connection and GitHub token.');
    }
  };

  const handleToggleEdit = () => {
    if (!isAuthenticated) {
      setShowPasswordPrompt(true);
    } else {
      setIsEditing(!isEditing);
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeIndex = editableSections.findIndex(section => section.title === active.id);
    const overIndex = editableSections.findIndex(section => section.title === over.id);

    if (activeIndex !== -1 && overIndex !== -1) {
      setEditableSections(arrayMove(editableSections, activeIndex, overIndex));
    }
  };

  const handleAddModule = (sectionIndex: number, moduleType: string, defaultContent: any) => {
    const newModule: Module = {
      id: `${moduleType}-${Date.now()}`,
      type: moduleType as any,
      content: defaultContent,
      column: 'left'
    };

    const updatedSections = [...editableSections];
    updatedSections[sectionIndex].modules.push(newModule);
    setEditableSections(updatedSections);
  };

  const handleDeleteModule = (sectionIndex: number, moduleId: string) => {
    const updatedSections = [...editableSections];
    updatedSections[sectionIndex].modules = updatedSections[sectionIndex].modules.filter(
      module => module.id !== moduleId
    );
    setEditableSections(updatedSections);
  };

  const handleUpdateModule = (sectionIndex: number, moduleId: string, id: string, content: any, column?: string) => {
    const updatedSections = [...editableSections];
    const moduleIndex = updatedSections[sectionIndex].modules.findIndex(m => m.id === moduleId);
    if (moduleIndex !== -1) {
      updatedSections[sectionIndex].modules[moduleIndex] = {
        ...updatedSections[sectionIndex].modules[moduleIndex],
        content,
        ...(column && { column: column as 'full' | 'left' | 'right' })
      };
      setEditableSections(updatedSections);
    }
  };

  const renderEditableSection = (section: MainPageSection, index: number) => {
    return (
      <section key={section.title} className={index % 2 === 0 ? "py-24 bg-surface-primary" : "py-24 bg-surface-secondary"}>
        <div className="swiss-grid fade-in">
          <div className="col-span-12 text-center mb-16">
            <h2 className="text-headline text-text-primary mb-4">{section.title}</h2>
            <div className="w-16 h-px bg-accent-teal mx-auto mb-6"></div>
            {section.subheader && (
              <p className="text-body text-text-secondary max-w-4xl mx-auto">
                {section.subheader}
              </p>
            )}
          </div>

          <div className="col-span-12">
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event) => {
                const { active, over } = event;
                if (!over || active.id === over.id) return;

                const activeIndex = section.modules.findIndex(m => m.id === active.id);
                const overIndex = section.modules.findIndex(m => m.id === over.id);

                if (activeIndex !== -1 && overIndex !== -1) {
                  const updatedSections = [...editableSections];
                  updatedSections[index].modules = arrayMove(section.modules, activeIndex, overIndex);
                  setEditableSections(updatedSections);
                }
              }}
            >
              <SortableContext items={section.modules.map(m => m.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-8">
                  {section.modules.map((module) => (
                    <EditableModule
                      key={module.id}
                      module={module}
                      isEditing={isEditing}
                      onUpdate={(id, content, column) => handleUpdateModule(index, module.id, id, content, column)}
                      onDelete={() => handleDeleteModule(index, module.id)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {isEditing && (
              <div className="mt-8 text-center">
                <Button
                  onClick={() => {
                    setCurrentSectionIndex(index);
                    setShowModuleLibrary(true);
                  }}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Module
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  };

  if (isEditing) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        
        {/* Header with title/subtitle editing */}
        <section id="home" className="relative py-32 bg-surface-primary overflow-hidden">
          <div className="swiss-grid text-center relative z-10">
            <div className="col-span-12">
              <div className="space-y-4 mb-8">
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-center text-4xl font-light border-0 bg-transparent text-text-primary"
                  placeholder="Enter title..."
                />
                <Input
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="text-center text-lg border-0 bg-transparent text-text-secondary"
                  placeholder="Enter subtitle..."
                />
              </div>

              <div className="flex justify-center gap-4">
                <Button onClick={handleSave} className="flex items-center gap-2">
                  <Save size={16} />
                  Save Changes
                </Button>
                <Button onClick={() => setIsEditing(false)} variant="outline">
                  Exit Edit Mode
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Editable sections */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={editableSections.map(s => s.title)} strategy={verticalListSortingStrategy}>
            <SectionEditor
              sections={editableSections}
              onUpdateSections={setEditableSections}
              isEditing={isEditing}
            />
          </SortableContext>
        </DndContext>

        {/* Module Library */}
        <ModuleLibrary
          isOpen={showModuleLibrary}
          onAddModule={(module) => {
            const newModule: Module = {
              id: `${module.type}-${Date.now()}`,
              type: module.type,
              content: module.content,
              column: module.column as 'full' | 'left' | 'right'
            };
            const updatedSections = [...editableSections];
            updatedSections[currentSectionIndex].modules.push(newModule);
            setEditableSections(updatedSections);
            setShowModuleLibrary(false);
          }}
          onClose={() => setShowModuleLibrary(false)}
        />

        {/* Password prompt */}
        {showPasswordPrompt && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Enter Edit Password</h3>
              <Input
                type="password"
                value={editPassword}
                onChange={(e) => setEditPassword(e.target.value)}
                placeholder="Enter password..."
                className="mb-4"
                onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
              />
              <div className="flex gap-2">
                <Button onClick={handlePasswordSubmit} size="sm">Enter</Button>
                <Button onClick={() => setShowPasswordPrompt(false)} variant="outline" size="sm">Cancel</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Leadership />
      <Value />
      <CaseStudies />
      <Contact />
      
      {/* Hidden edit button */}
      <div className="bg-surface-primary border-t border-swiss-light">
        <div className="swiss-grid">
          <div className="col-span-12 text-center py-4">
            <Button
              onClick={handleToggleEdit}
              variant="ghost"
              size="sm"
              className="text-text-tertiary hover:text-text-primary opacity-30 hover:opacity-100 transition-opacity duration-300"
            >
              <Edit3 size={14} className="mr-1" />
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
