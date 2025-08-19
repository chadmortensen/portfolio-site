import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Edit3, Save, Lock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { EditableModule, Module } from "./EditableModule";
import { ModuleLibrary } from "./ModuleLibrary";
import { SectionEditor } from "./SectionEditor";
import { GitHubStorageService } from "../services/githubStorage";

interface PresentationModeProps {
  sections: any[];
  onExit: () => void;
  storageFilename?: string;
}

interface PasscodeDialogProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const PasscodeDialog = ({ onSuccess, onCancel }: PasscodeDialogProps) => {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");

  // Check for stored authentication on mount
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('presentation-edit-authenticated') === 'true';
    if (isAuthenticated) {
      onSuccess();
    }
  }, [onSuccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "4455") {
      localStorage.setItem('presentation-edit-authenticated', 'true');
      onSuccess();
    } else {
      setError("Incorrect passcode");
      setPasscode("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-surface-primary rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex items-center space-x-3 mb-6">
          <Lock className="w-6 h-6 text-accent-blue" />
          <h2 className="text-2xl font-light text-text-primary">Enter Passcode</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="passcode" className="text-sm font-medium text-text-secondary">
              Passcode required to edit presentation
            </Label>
            <Input
              id="passcode"
              type="password"
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                setError("");
              }}
              className="mt-2"
              placeholder="Enter passcode"
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>
          
          <div className="flex items-center space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Unlock
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PresentationMode = ({ sections, onExit, storageFilename }: PresentationModeProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showPasscodeDialog, setShowPasscodeDialog] = useState(false);
  const [showModuleLibrary, setShowModuleLibrary] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showRipples, setShowRipples] = useState(true);
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

  // Use sections prop directly - they're already loaded in parent component
  useEffect(() => {
    if (sections && sections.length > 0) {
      setEditableSections(sections);
    }
  }, [sections]);

  // Handle ripple animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRipples(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handlePasscodeSuccess = () => {
    setShowPasscodeDialog(false);
    setIsEditing(true);
  };

  const handlePasscodeCancel = () => {
    setShowPasscodeDialog(false);
  };

  const handleEditClick = () => {
    setShowPasscodeDialog(true);
  };

  const handleSave = async () => {
    try {
      const githubService = new GitHubStorageService();
      const filename = storageFilename || 'presentation-mode.json';
      await githubService.writeFile(filename, editableSections);
      
      // Also save to localStorage as backup
      localStorage.setItem(filename.replace('.json', ''), JSON.stringify(editableSections));
      setIsEditing(false);
      alert('Changes saved successfully to GitHub!');
    } catch (error) {
      console.error('Error saving to GitHub:', error);
      // Fallback to localStorage only
      const filename = storageFilename || 'presentation-mode.json';
      localStorage.setItem(filename.replace('.json', ''), JSON.stringify(editableSections));
      setIsEditing(false);
      alert('Changes saved locally (GitHub save failed)');
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

  const renderSlideContent = (section: any, sectionIndex: number) => {
    const activeSection = isEditing ? editableSections[sectionIndex] : section;
    
    // Safety check - if section is undefined, return empty slide
    if (!activeSection && !section) {
      return <div className="text-center text-text-secondary">Loading...</div>;
    }
    
    // Check if we have modules to display (either in editing mode or view mode)
    const hasModules = activeSection?.modules && activeSection.modules.length > 0;
    
    // If we have modules, render with module layout
    if (hasModules) {
      return (
        <div className="space-y-8">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-light text-text-primary mb-4">
              {activeSection.title}
            </h1>
            {activeSection.subheader && (
              <h2 className="text-2xl lg:text-3xl text-text-secondary font-light">
                {activeSection.subheader}
              </h2>
            )}
            <div className="w-24 h-px bg-accent-teal mx-auto mt-8"></div>
          </div>

          {/* Section Editor and Add Module Button */}
            {isEditing && (
              <div className="space-y-4">
                <SectionEditor
                  sections={editableSections}
                  onUpdateSections={handleUpdateSections}
                  isEditing={isEditing}
                />
                
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    onClick={() => setShowModuleLibrary(true)}
                    className="flex items-center space-x-2"
                  >
                    <Plus size={16} />
                    <span>Add Module</span>
                  </Button>
                </div>
              </div>
            )}

          {/* Modules with column layout */}
          {renderModulesWithLayout(activeSection.modules, sectionIndex, isEditing)}
        </div>
      );
    }

    // Regular presentation view for original sections
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
            {section.content && (
              <div 
                className="prose prose-lg max-w-none prose-headings:text-text-primary prose-p:text-text-secondary prose-p:text-xl prose-p:lg:text-2xl prose-p:leading-relaxed prose-strong:text-text-primary prose-ul:text-text-secondary prose-ol:text-text-secondary prose-li:text-lg prose-li:lg:text-xl"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            )}

            {section.goals && (
              <div className="space-y-4">
                <h3 className="text-2xl text-text-primary font-light">Goals</h3>
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
                    <div 
                      className="prose prose-lg max-w-none prose-headings:text-text-primary prose-p:text-text-primary prose-p:font-medium prose-strong:text-text-primary prose-ul:text-text-primary prose-ol:text-text-primary"
                      dangerouslySetInnerHTML={{ __html: section.insight }}
                    />
                  </div>
                )}
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
            </div>
          )}
        </div>
      </div>
    );
  };

  const activeSections = isEditing ? editableSections : sections;

  // Reset currentSlide if it's out of bounds when switching modes
  useEffect(() => {
    if (currentSlide >= activeSections.length && activeSections.length > 0) {
      setCurrentSlide(0);
    }
  }, [activeSections.length, currentSlide]);

  const nextSlide = () => {
    if (currentSlide < activeSections.length - 1 && !isTransitioning) {
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
      // Don't allow spacebar navigation when in editing mode to avoid conflicts with typing
      if (e.key === "ArrowRight" || (e.key === " " && !isEditing)) {
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
  }, [currentSlide, isTransitioning, isEditing]);

  return (
    <div className="fixed inset-0 bg-surface-primary z-50 overflow-hidden">
      {/* Water Ripple Overlay Effects */}
      {showRipples && (
        <div className="fixed inset-0 z-[60] pointer-events-none">
          {/* Multiple ripple rings for realistic effect */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <div 
                className="w-32 h-32 border-2 border-accent-blue/30 rounded-full animate-ripple-overlay"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1.5s'
                }}
              />
            </div>
          ))}
          {/* Secondary ripples with different colors */}
          {[...Array(3)].map((_, i) => (
            <div
              key={`teal-${i}`}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <div 
                className="w-24 h-24 border border-accent-teal/40 rounded-full animate-ripple-overlay"
                style={{
                  animationDelay: `${0.3 + i * 0.25}s`,
                  animationDuration: '1.2s'
                }}
              />
            </div>
          ))}
        </div>
      )}
      
      {/* Backdrop Bar with Gradient Fade */}
      <div className="fixed top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/80 to-transparent backdrop-blur-sm z-50"></div>
      
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
            {currentSlide + 1} / {activeSections.length}
          </span>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={nextSlide}
            disabled={currentSlide === activeSections.length - 1}
            className="p-2 hover:bg-surface-primary"
          >
            <ChevronRight size={20} />
          </Button>
          
          <div className="w-px h-6 bg-swiss-light mx-2"></div>
          
          {isEditing ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className="p-2 hover:bg-surface-primary text-text-secondary hover:text-text-primary"
            >
              <Save size={16} />
              <span className="ml-2 text-sm">Save</span>
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEditClick}
              className="p-2 hover:bg-surface-primary text-text-secondary hover:text-text-primary"
            >
              <Edit3 size={16} />
              <span className="ml-2 text-sm">Edit</span>
            </Button>
          )}
          
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
          {/* Slide Content with Water Ripple Effect */}
          <div
            className={`transition-all duration-700 ease-out transform ${
              isTransitioning
                ? 'opacity-0 translate-y-12 scale-95'
                : 'opacity-100 translate-y-0 scale-100'
            } ${showRipples ? 'animate-water-ripple' : ''}`}
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
              {activeSections.length > 0 && currentSlide < activeSections.length ? 
                renderSlideContent(activeSections[currentSlide], currentSlide) :
                <div className="text-center text-text-secondary">No slides available</div>
              }
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-surface-secondary">
        <div
          className="h-full bg-gradient-to-r from-accent-blue to-accent-teal transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / activeSections.length) * 100}%` }}
        ></div>
      </div>

      {/* Passcode Dialog */}
      {showPasscodeDialog && (
        <PasscodeDialog
          onSuccess={handlePasscodeSuccess}
          onCancel={handlePasscodeCancel}
        />
      )}

      {/* Module Library */}
      <ModuleLibrary
        isOpen={showModuleLibrary}
        onAddModule={(module) => handleAddModule(currentSlide, module)}
        onClose={() => setShowModuleLibrary(false)}
      />
    </div>
  );
};

export default PresentationMode;
