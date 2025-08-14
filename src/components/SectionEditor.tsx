import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Edit3, Check, X } from "lucide-react";
import { Label } from "@/components/ui/label";

interface Section {
  title: string;
  subheader?: string;
  modules: any[];
}

interface SectionEditorProps {
  sections: Section[];
  onUpdateSections: (sections: Section[]) => void;
  isEditing: boolean;
}

export const SectionEditor = ({ sections, onUpdateSections, isEditing }: SectionEditorProps) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editSubheader, setEditSubheader] = useState("");

  const handleEditSection = (index: number) => {
    setEditingIndex(index);
    setEditTitle(sections[index].title);
    setEditSubheader(sections[index].subheader || "");
  };

  const handleSaveSection = (index: number) => {
    const newSections = [...sections];
    newSections[index] = {
      ...newSections[index],
      title: editTitle,
      subheader: editSubheader || undefined
    };
    onUpdateSections(newSections);
    setEditingIndex(null);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditTitle("");
    setEditSubheader("");
  };

  const handleDeleteSection = (index: number) => {
    if (confirm("Are you sure you want to delete this section?")) {
      const newSections = sections.filter((_, i) => i !== index);
      onUpdateSections(newSections);
    }
  };

  const handleAddSection = () => {
    const newSection: Section = {
      title: "New Section",
      subheader: "",
      modules: []
    };
    onUpdateSections([...sections, newSection]);
  };

  if (!isEditing) return null;

  return (
    <div className="space-y-4 mb-8 p-4 border border-dashed border-accent-blue rounded-lg bg-surface-secondary/50">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-text-primary">Section Management</h3>
        <Button onClick={handleAddSection} variant="outline" size="sm">
          <Plus size={16} className="mr-2" />
          Add Section
        </Button>
      </div>
      
      <div className="space-y-3">
        {sections.map((section, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-surface-primary rounded-lg border">
            {editingIndex === index ? (
              <div className="flex-1 space-y-2">
                <div>
                  <Label htmlFor={`title-${index}`} className="text-sm">Section Title</Label>
                  <Input
                    id={`title-${index}`}
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Section title"
                  />
                </div>
                <div>
                  <Label htmlFor={`subheader-${index}`} className="text-sm">Subheader (optional)</Label>
                  <Input
                    id={`subheader-${index}`}
                    value={editSubheader}
                    onChange={(e) => setEditSubheader(e.target.value)}
                    placeholder="Section subheader"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleSaveSection(index)} size="sm">
                    <Check size={14} className="mr-1" />
                    Save
                  </Button>
                  <Button onClick={handleCancelEdit} variant="outline" size="sm">
                    <X size={14} className="mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1">
                  <div className="font-medium text-text-primary">{section.title}</div>
                  {section.subheader && (
                    <div className="text-sm text-text-secondary">{section.subheader}</div>
                  )}
                  <div className="text-xs text-text-secondary mt-1">
                    {section.modules.length} module{section.modules.length !== 1 ? 's' : ''}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleEditSection(index)} 
                    variant="ghost" 
                    size="sm"
                  >
                    <Edit3 size={14} />
                  </Button>
                  <Button 
                    onClick={() => handleDeleteSection(index)} 
                    variant="ghost" 
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};