import { ArrowLeft, Play, Edit3, Save, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

interface Section {
  title: string;
  subheader?: string;
  modules: Module[];
}

const CaseStudy4 = () => {
  const navigate = useNavigate();
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
  const [title, setTitle] = useState('Additional work examples');
  const [subtitle, setSubtitle] = useState('Strategic Design Leadership Across Multiple Verticals');

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
        const githubContent = await githubService.readFile('case-study-4.json');
        
        if (githubContent && githubContent.title && githubContent.subtitle && githubContent.sections) {
          setTitle(githubContent.title);
          setSubtitle(githubContent.subtitle);
          // Ensure each section has a speakerNotes property
          const sectionsWithNotes = githubContent.sections.map((section: any) => ({
            ...section,
            speakerNotes: section.speakerNotes || ''
          }));
          setEditableSections(sectionsWithNotes);
          return;
        }
      } catch (error) {
        console.log('GitHub load failed, trying localStorage');
      }

      // Try localStorage
      const saved = localStorage.getItem('case-study-4-content');
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
            return;
          }
        } catch (error) {
          console.log('Error parsing saved content, using static content');
        }
      }

      // Load from the static JSON data file
      try {
        const response = await fetch('/data/case-studies/case-study-4.json');
        if (response.ok) {
          const jsonData = await response.json();
          if (jsonData && Array.isArray(jsonData)) {
            console.log('Loading content from JSON file');
            // Convert JSON sections to editable format
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
            return;
          }
        }
      } catch (error) {
        console.log('Failed to load from JSON file, using fallback');
      }
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
    const success = await githubService.writeFile('case-study-4.json', saveData);
    
    if (success) {
      // Also save to localStorage as backup
      localStorage.setItem('case-study-4-content', JSON.stringify(saveData));
      setIsEditing(false);
      alert('Changes saved successfully to GitHub!');
    } else {
      // If GitHub fails, still save to localStorage
      localStorage.setItem('case-study-4-content', JSON.stringify(saveData));
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
      localStorage.setItem('case-study-4-content', JSON.stringify(saveData));
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

  if (isPresentationMode) {
    return (
      <PresentationMode
        sections={editableSections}
        onExit={() => setIsPresentationMode(false)}
        storageFilename="case-study-4.json"
      />
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
            <div className="w-16 h-px bg-accent-blue mx-auto mb-8"></div>
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
                    <div className="w-12 h-px bg-accent-teal"></div>
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

      <Footer backgroundClassName="bg-surface-secondary" />

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

export default CaseStudy4;
