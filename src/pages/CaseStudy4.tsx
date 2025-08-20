import { useState, useEffect } from "react";
import { ArrowLeft, Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditableModule, Module } from "@/components/EditableModule";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SectionEditor } from "@/components/SectionEditor";
import { GitHubStorageService } from "@/services/githubStorage";

interface Section {
  title: string;
  subheader?: string;
  modules: Module[];
}

const CaseStudy4 = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [title, setTitle] = useState('Other Projects');
  const [subtitle, setSubtitle] = useState('Collection of Additional Work');
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const githubStorage = new GitHubStorageService();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await githubStorage.readFile('case-study-4.json');
      if (data) {
        setTitle(data.title || 'Other Projects');
        setSubtitle(data.subtitle || 'Collection of Additional Work');
        setSections(data.sections || []);
      }
    } catch (error) {
      console.error('Error loading case study data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveData = async () => {
    try {
      await githubStorage.writeFile('case-study-4.json', {
        title,
        subtitle,
        sections
      });
    } catch (error) {
      console.error('Error saving case study data:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && (title !== 'Other Projects' || subtitle !== 'Collection of Additional Work' || sections.length > 0)) {
      saveData();
    }
  }, [title, subtitle, sections, isAuthenticated]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'password') {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      setPassword('');
      setIsEditing(true);
      setShowPasswordPrompt(false);
    } else {
      alert('Incorrect password');
    }
  };

  const handleEdit = () => {
    if (!isAuthenticated) {
      setShowPasswordPrompt(true);
      return;
    }
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    saveData();
  };

  const addModule = (type: Module['type'], sectionIndex: number) => {
    const newModule: Module = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      content: getDefaultContent(type),
      column: 'full'
    };

    const updatedSections = [...sections];
    if (!updatedSections[sectionIndex]) {
      updatedSections[sectionIndex] = { title: '', modules: [] };
    }
    updatedSections[sectionIndex].modules.push(newModule);
    setSections(updatedSections);
  };

  const getDefaultContent = (type: Module['type']) => {
    switch (type) {
      case 'text':
        return { title: '', text: '' };
      case 'image':
        return { src: '', alt: '', width: 100 };
      case 'bullets':
        return { title: '', items: [''] };
      case 'goals':
        return { title: 'Goals', items: [''] };
      case 'findings':
        return { title: 'Key Findings', items: [''] };
      case 'principles':
        return { title: 'Principles', items: [''] };
      case 'quote':
        return { text: '', author: '' };
      case 'table':
        return { title: '', headers: [''], rows: [[''], ['']] };
      default:
        return {};
    }
  };

  const updateModule = (sectionIndex: number, moduleId: string, content: any, column?: string) => {
    const updatedSections = [...sections];
    const moduleIndex = updatedSections[sectionIndex].modules.findIndex(m => m.id === moduleId);
    if (moduleIndex !== -1) {
      updatedSections[sectionIndex].modules[moduleIndex] = {
        ...updatedSections[sectionIndex].modules[moduleIndex],
        content,
        ...(column && { column: column as 'full' | 'left' | 'right' })
      };
      setSections(updatedSections);
    }
  };

  const deleteModule = (sectionIndex: number, moduleId: string) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].modules = updatedSections[sectionIndex].modules.filter(m => m.id !== moduleId);
    setSections(updatedSections);
  };

  function handleDragEnd(event: any, sectionIndex: number) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const updatedSections = [...sections];
      const oldIndex = updatedSections[sectionIndex].modules.findIndex(m => m.id === active.id);
      const newIndex = updatedSections[sectionIndex].modules.findIndex(m => m.id === over.id);
      
      updatedSections[sectionIndex].modules = arrayMove(updatedSections[sectionIndex].modules, oldIndex, newIndex);
      setSections(updatedSections);
    }
  }

  const updateSections = (newSections: Section[]) => {
    setSections(newSections);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-primary flex items-center justify-center">
        <div className="text-text-primary">Loading...</div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-surface-primary">
      <Navigation />
      
      {showPasswordPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="max-w-md w-full mx-4">
            <form onSubmit={handlePasswordSubmit} className="bg-surface-secondary p-8 border border-swiss-light rounded-lg">
              <h2 className="text-title text-text-primary mb-6 text-center">Enter Password to Edit</h2>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="mb-4"
              />
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Access Edit Mode
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowPasswordPrompt(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <main className="pt-20">
        <div className="swiss-grid py-8 sm:py-12">
          <div className="col-span-12">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center space-x-2 text-text-secondary hover:text-text-primary mb-8 transition-colors duration-200"
            >
              <ArrowLeft size={20} />
              <span>Back to Portfolio</span>
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="text-2xl sm:text-3xl font-light"
                      placeholder="Case study title"
                    />
                    <Input
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      className="text-lg"
                      placeholder="Subtitle"
                    />
                  </div>
                ) : (
                  <div>
                    <h1 className="text-headline text-text-primary font-light mb-2">{title}</h1>
                    <p className="text-title text-text-secondary">{subtitle}</p>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                {isEditing ? (
                  <Button onClick={handleSave}>
                    Save Changes
                  </Button>
                ) : (
                  <Button onClick={handleEdit} variant="outline">
                    <Edit2 size={16} className="mr-2" />
                    Edit Case Study
                  </Button>
                )}
              </div>
            </div>

            <div className="w-full h-px bg-swiss-light mb-8"></div>

            <SectionEditor
              sections={sections}
              onUpdateSections={updateSections}
              isEditing={isEditing}
            />

            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-12">
                {section.title && (
                  <div className="mb-8">
                    <h2 className="text-title text-text-primary font-light mb-2">{section.title}</h2>
                    {section.subheader && (
                      <p className="text-body text-text-secondary">{section.subheader}</p>
                    )}
                    <div className="w-16 h-px bg-accent-blue mt-4"></div>
                  </div>
                )}

                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={(event) => handleDragEnd(event, sectionIndex)}
                >
                  <SortableContext
                    items={section.modules.map(m => m.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="grid lg:grid-cols-2 gap-8">
                      <div className="space-y-8">
                        {section.modules
                          .filter(module => module.column === 'left' || module.column === 'full')
                          .map((module) => (
                            <EditableModule
                              key={module.id}
                              module={module}
                              isEditing={isEditing}
                              onUpdate={(id, content, column) => updateModule(sectionIndex, id, content, column)}
                              onDelete={(id) => deleteModule(sectionIndex, id)}
                            />
                          ))}
                      </div>
                      <div className="space-y-8">
                        {section.modules
                          .filter(module => module.column === 'right')
                          .map((module) => (
                            <EditableModule
                              key={module.id}
                              module={module}
                              isEditing={isEditing}
                              onUpdate={(id, content, column) => updateModule(sectionIndex, id, content, column)}
                              onDelete={(id) => deleteModule(sectionIndex, id)}
                            />
                          ))}
                      </div>
                    </div>
                  </SortableContext>
                </DndContext>

                {isEditing && (
                  <div className="mt-8 p-4 bg-surface-secondary border border-swiss-light">
                    <p className="text-sm text-text-secondary mb-4">Add new module to this section:</p>
                    <div className="flex flex-wrap gap-2">
                      {['text', 'image', 'bullets', 'goals', 'findings', 'principles', 'quote', 'table'].map((type) => (
                        <Button
                          key={type}
                          variant="outline"
                          size="sm"
                          onClick={() => addModule(type as Module['type'], sectionIndex)}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CaseStudy4;