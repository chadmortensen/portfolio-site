import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Play, Edit3, Save, Lock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useCallback, useMemo } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { EditableModule, Module } from "./EditableModule";
import { ModuleLibrary } from "./ModuleLibrary";

interface PresentationModeProps {
  sections: any[];
  onExit: () => void;
}

interface CustomCopyEditorProps {
  sections: any[];
  onSave: (sections: any[]) => void;
  onCancel: () => void;
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
              Passcode required to edit presentation copy
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

const CustomCopyEditor = ({ sections, onSave, onCancel }: CustomCopyEditorProps) => {
  const [editedSections, setEditedSections] = useState(sections);

  const quillModules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ]
  }), []);

  const updateSection = useCallback((index: number, field: string, value: string) => {
    setEditedSections(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }, []);

  const updateArrayField = (sectionIndex: number, field: string, itemIndex: number, value: string) => {
    const updated = [...editedSections];
    const newArray = [...(updated[sectionIndex][field] || [])];
    newArray[itemIndex] = value;
    updated[sectionIndex] = { ...updated[sectionIndex], [field]: newArray };
    setEditedSections(updated);
  };

  const addArrayItem = (sectionIndex: number, field: string) => {
    const updated = [...editedSections];
    const newArray = [...(updated[sectionIndex][field] || []), ""];
    updated[sectionIndex] = { ...updated[sectionIndex], [field]: newArray };
    setEditedSections(updated);
  };

  const removeArrayItem = (sectionIndex: number, field: string, itemIndex: number) => {
    const updated = [...editedSections];
    const newArray = [...(updated[sectionIndex][field] || [])];
    newArray.splice(itemIndex, 1);
    updated[sectionIndex] = { ...updated[sectionIndex], [field]: newArray };
    setEditedSections(updated);
  };

  return (
    <div className="fixed inset-0 bg-surface-primary z-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-light text-text-primary">Edit Presentation Copy</h2>
          <div className="flex items-center space-x-4">
            <Button onClick={onCancel} variant="outline">
              Cancel
            </Button>
            <Button onClick={() => onSave(editedSections)} className="flex items-center space-x-2">
              <Save size={16} />
              <span>Save & Present</span>
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {editedSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-surface-secondary rounded-lg p-6 border border-swiss-light">
              <h3 className="text-xl font-medium text-text-primary mb-6">Slide {sectionIndex + 1}</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor={`title-${sectionIndex}`} className="text-sm font-medium text-text-secondary">
                    Title
                  </Label>
                  <Input
                    id={`title-${sectionIndex}`}
                    value={section.title || ""}
                    onChange={(e) => updateSection(sectionIndex, "title", e.target.value)}
                    className="mt-1"
                  />
                </div>

                {section.subheader !== undefined && (
                  <div>
                    <Label htmlFor={`subheader-${sectionIndex}`} className="text-sm font-medium text-text-secondary">
                      Subheader
                    </Label>
                    <Input
                      id={`subheader-${sectionIndex}`}
                      value={section.subheader || ""}
                      onChange={(e) => updateSection(sectionIndex, "subheader", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                )}

                {section.content !== undefined && (
                  <div>
                    <Label htmlFor={`content-${sectionIndex}`} className="text-sm font-medium text-text-secondary">
                      Content
                    </Label>
                    <div className="mt-1">
                      <ReactQuill
                        value={section.content || ""}
                        onChange={(value) => updateSection(sectionIndex, "content", value)}
                        modules={quillModules}
                        className="bg-surface-primary"
                        style={{ minHeight: '120px' }}
                      />
                    </div>
                  </div>
                )}

                {section.goals && (
                  <div>
                    <Label className="text-sm font-medium text-text-secondary">Goals</Label>
                    <div className="mt-2 space-y-2">
                      {section.goals.map((goal: string, goalIndex: number) => (
                        <div key={goalIndex} className="flex items-center space-x-2">
                          <Input
                            value={goal}
                            onChange={(e) => updateArrayField(sectionIndex, "goals", goalIndex, e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeArrayItem(sectionIndex, "goals", goalIndex)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addArrayItem(sectionIndex, "goals")}
                        className="mt-2"
                      >
                        Add Goal
                      </Button>
                    </div>
                  </div>
                )}

                {section.quotes && (
                  <div>
                    <Label className="text-sm font-medium text-text-secondary">User Feedback Quotes</Label>
                    <div className="mt-2 space-y-2">
                      {section.quotes.map((quote: string, quoteIndex: number) => (
                        <div key={quoteIndex} className="flex items-center space-x-2">
                          <Textarea
                            value={quote}
                            onChange={(e) => updateArrayField(sectionIndex, "quotes", quoteIndex, e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeArrayItem(sectionIndex, "quotes", quoteIndex)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addArrayItem(sectionIndex, "quotes")}
                        className="mt-2"
                      >
                        Add Quote
                      </Button>
                    </div>
                  </div>
                )}

                {section.schedule && (
                  <div>
                    <Label className="text-sm font-medium text-text-secondary">Schedule</Label>
                    <div className="mt-2 space-y-2">
                      {section.schedule.map((item: string, itemIndex: number) => (
                        <div key={itemIndex} className="flex items-center space-x-2">
                          <Input
                            value={item}
                            onChange={(e) => updateArrayField(sectionIndex, "schedule", itemIndex, e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeArrayItem(sectionIndex, "schedule", itemIndex)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addArrayItem(sectionIndex, "schedule")}
                        className="mt-2"
                      >
                        Add Schedule Item
                      </Button>
                    </div>
                  </div>
                )}

                {section.insight !== undefined && (
                  <div>
                    <Label htmlFor={`insight-${sectionIndex}`} className="text-sm font-medium text-text-secondary">
                      Insight
                    </Label>
                    <div className="mt-1">
                      <ReactQuill
                        value={section.insight || ""}
                        onChange={(value) => updateSection(sectionIndex, "insight", value)}
                        modules={quillModules}
                        className="bg-surface-primary"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PresentationMode = ({ sections, onExit }: PresentationModeProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCustomCopyEditor, setShowCustomCopyEditor] = useState(false);
  const [showPasscodeDialog, setShowPasscodeDialog] = useState(false);
  const [customSections, setCustomSections] = useState(sections);
  const [isUsingCustomCopy, setIsUsingCustomCopy] = useState(false);
  const [showModuleLibrary, setShowModuleLibrary] = useState(false);
  const [isModuleEditing, setIsModuleEditing] = useState(false);
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

  const handleCustomCopySave = (editedSections: any[]) => {
    setCustomSections(editedSections);
    setIsUsingCustomCopy(true);
    setShowCustomCopyEditor(false);
  };

  const handleCustomCopyCancel = () => {
    setShowCustomCopyEditor(false);
  };

  const handlePasscodeSuccess = () => {
    setShowPasscodeDialog(false);
    setShowCustomCopyEditor(true);
  };

  const handlePasscodeCancel = () => {
    setShowPasscodeDialog(false);
  };

  const handleEditCopyClick = () => {
    setShowPasscodeDialog(true);
  };

  const handleModuleEditClick = () => {
    if (editableSections.length === 0) {
      // Convert sections to modular format
      const converted = sections.map((section) => {
        const modules: Module[] = [];
        
        if (section.content) {
          modules.push({
            id: `${section.title}-content-${Date.now()}`,
            type: 'text',
            content: { text: section.content },
            column: 'full'
          });
        }

        if (section.goals) {
          modules.push({
            id: `${section.title}-goals-${Date.now()}`,
            type: 'bullets',
            content: { title: 'Goals', items: section.goals },
            column: 'full'
          });
        }

        if (section.quotes) {
          modules.push({
            id: `${section.title}-quotes-${Date.now()}`,
            type: 'bullets',
            content: { title: 'User Feedback', items: section.quotes },
            column: 'full'
          });
        }

        if (section.insight) {
          modules.push({
            id: `${section.title}-insight-${Date.now()}`,
            type: 'quote',
            content: { title: 'Key Insight', text: section.insight },
            column: 'full'
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
    setIsModuleEditing(true);
  };

  const handleUpdateModule = (sectionIndex: number, moduleId: string, content: any) => {
    const newSections = [...editableSections];
    const moduleIndex = newSections[sectionIndex].modules.findIndex(m => m.id === moduleId);
    if (moduleIndex !== -1) {
      newSections[sectionIndex].modules[moduleIndex].content = content;
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

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const section = editableSections[currentSlide];
      const oldIndex = section.modules.findIndex((module) => module.id === active.id);
      const newIndex = section.modules.findIndex((module) => module.id === over.id);
      const newModules = arrayMove(section.modules, oldIndex, newIndex);
      const newSections = [...editableSections];
      newSections[currentSlide] = { ...section, modules: newModules };
      setEditableSections(newSections);
    }
  };

  const activeSections = isModuleEditing ? editableSections : (isUsingCustomCopy ? customSections : sections);

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

  // Smart layout renderer for modular editing
  const renderModulesWithLayout = (modules: Module[]) => {
    const result: JSX.Element[] = [];
    let processedIndices = new Set<number>();

    for (let i = 0; i < modules.length; i++) {
      if (processedIndices.has(i)) continue;

      const module = modules[i];
      
      if (module.type === 'image' && module.content.position === 'beside') {
        // Collect all content modules before this image
        const contentModules = [];
        for (let j = i - 1; j >= 0; j--) {
          if (modules[j].type !== 'image' && !processedIndices.has(j)) {
            contentModules.unshift(modules[j]);
            processedIndices.add(j);
          } else {
            break;
          }
        }

        // Collect all consecutive "beside" images starting from current position
        const besideImages = [];
        for (let k = i; k < modules.length; k++) {
          if (modules[k].type === 'image' && modules[k].content.position === 'beside') {
            besideImages.push(modules[k]);
            processedIndices.add(k);
          } else {
            break;
          }
        }

        const firstImageColumns = parseInt(besideImages[0].content.columns || '6');
        const contentColumns = 12 - firstImageColumns;

        result.push(
          <div key={`layout-group-${i}`} className="grid grid-cols-12 gap-8 items-start">
            {contentModules.length > 0 && (
              <div className={`col-span-12 lg:col-span-${contentColumns} space-y-6`}>
                {contentModules.map((contentModule) => (
                  <EditableModule
                    key={contentModule.id}
                    module={contentModule}
                    isEditing={isModuleEditing}
                    onUpdate={(id, content) => handleUpdateModule(currentSlide, id, content)}
                    onDelete={(id) => handleDeleteModule(currentSlide, id)}
                  />
                ))}
              </div>
            )}
            <div className={`col-span-12 lg:col-span-${firstImageColumns} space-y-6`}>
              {besideImages.map((imageModule) => (
                <div key={imageModule.id} className="w-full">
                  <EditableModule
                    module={imageModule}
                    isEditing={isModuleEditing}
                    onUpdate={(id, content) => handleUpdateModule(currentSlide, id, content)}
                    onDelete={(id) => handleDeleteModule(currentSlide, id)}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      } else {
        // Regular module rendering for non-image or "below" positioned images
        result.push(
          <EditableModule
            key={module.id}
            module={module}
            isEditing={isModuleEditing}
            onUpdate={(id, content) => handleUpdateModule(currentSlide, id, content)}
            onDelete={(id) => handleDeleteModule(currentSlide, id)}
          />
        );
        processedIndices.add(i);
      }
    }
    
    return result;
  };

  const renderSlideContent = (section: any) => {
    // Check if section has any images
    const hasImages = section.image || section.sectionImage || section.fullWidthImage || 
                     section.workshopImages || section.additionalImages;

    // If in module editing mode and section has modules, render with module layout
    if (isModuleEditing && section.modules) {
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

          {/* Add Module Button */}
          <div className="flex justify-center mb-8">
            <Button
              variant="outline"
              onClick={() => setShowModuleLibrary(true)}
              className="flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add Module</span>
            </Button>
          </div>

          {/* Modules with smart layout */}
          <div className="space-y-6">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={section.modules.map((m: Module) => m.id)}
                strategy={verticalListSortingStrategy}
              >
                {renderModulesWithLayout(section.modules)}
              </SortableContext>
            </DndContext>
          </div>
        </div>
      );
    }

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
              <div 
                className="prose prose-lg max-w-none prose-headings:text-text-primary prose-p:text-text-secondary prose-p:text-xl prose-p:lg:text-2xl prose-p:leading-relaxed prose-strong:text-text-primary prose-ul:text-text-secondary prose-ol:text-text-secondary prose-li:text-lg prose-li:lg:text-xl"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
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
                    <div 
                      className="prose prose-lg max-w-none prose-headings:text-text-primary prose-p:text-text-primary prose-p:font-medium prose-strong:text-text-primary prose-ul:text-text-primary prose-ol:text-text-primary"
                      dangerouslySetInnerHTML={{ __html: section.insight }}
                    />
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
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEditCopyClick}
            className="p-2 hover:bg-surface-primary text-text-secondary hover:text-text-primary"
          >
            <Edit3 size={16} />
            <span className="ml-2 text-sm">Edit Copy</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleModuleEditClick}
            className="p-2 hover:bg-surface-primary text-text-secondary hover:text-text-primary"
          >
            <Plus size={16} />
            <span className="ml-2 text-sm">Modules</span>
          </Button>
          
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
              {renderSlideContent(activeSections[currentSlide])}
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

      {/* Custom Copy Editor Modal */}
      {showCustomCopyEditor && (
        <CustomCopyEditor
          sections={activeSections}
          onSave={handleCustomCopySave}
          onCancel={handleCustomCopyCancel}
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