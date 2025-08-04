import { Plus, Type, Image, List, Quote, Target, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Module } from "./EditableModule";

interface ModuleLibraryProps {
  isOpen: boolean;
  onAddModule: (module: Omit<Module, 'id'>) => void;
  onClose: () => void;
}

export const ModuleLibrary = ({ isOpen, onAddModule, onClose }: ModuleLibraryProps) => {
  if (!isOpen) return null;

  const moduleTypes = [
    {
      type: 'text' as const,
      icon: Type,
      title: 'Text Block',
      description: 'Add paragraphs of content',
      defaultContent: { title: '', text: '' }
    },
    {
      type: 'image' as const,
      icon: Image,
      title: 'Image',
      description: 'Add an image with positioning and sizing controls',
      defaultContent: { src: '', alt: '', position: 'below', columns: '6' }
    },
    {
      type: 'bullets' as const,
      icon: List,
      title: 'Bullet List',
      description: 'Add a list of items',
      defaultContent: { title: '', items: [''] }
    },
    {
      type: 'quote' as const,
      icon: Quote,
      title: 'Quote Block',
      description: 'Add a highlighted quote or insight',
      defaultContent: { title: '', text: '' }
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-surface-primary border border-swiss-light rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-headline text-text-primary">Add Module</h2>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {moduleTypes.map((moduleType) => (
            <Button
              key={moduleType.type}
              variant="outline"
              className="h-auto p-4 flex flex-col items-start space-y-2 hover:bg-surface-secondary"
              onClick={() => {
                onAddModule({
                  type: moduleType.type,
                  content: moduleType.defaultContent,
                  column: 'full'
                });
                onClose();
              }}
            >
              <div className="flex items-center space-x-2">
                <moduleType.icon size={20} className="text-accent-blue" />
                <span className="font-medium">{moduleType.title}</span>
              </div>
              <span className="text-sm text-text-secondary text-left">
                {moduleType.description}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};