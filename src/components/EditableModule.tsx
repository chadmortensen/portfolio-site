import { useState } from "react";
import { GripVertical, Trash2, Plus, Palette } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export interface Module {
  id: string;
  type: 'text' | 'image' | 'bullets' | 'goals' | 'findings' | 'principles' | 'quote';
  content: any;
}

interface EditableModuleProps {
  module: Module;
  isEditing: boolean;
  onUpdate: (id: string, content: any) => void;
  onDelete: (id: string) => void;
}

export const EditableModule = ({ module, isEditing, onUpdate, onDelete }: EditableModuleProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: module.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // Custom Quill toolbar configuration
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'background': [] }],
      [{ 'color': [] }],
      ['clean']
    ],
  };

  const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'background', 'color'
  ];

  const renderEditMode = () => {
    switch (module.type) {
      case 'text':
        return (
          <div className="space-y-4">
            <Input
              value={module.content.title || ''}
              onChange={(e) => onUpdate(module.id, { ...module.content, title: e.target.value })}
              placeholder="Title (optional)"
              className="font-medium"
            />
            <div className="rich-text-editor">
              <ReactQuill
                theme="snow"
                value={module.content.text || ''}
                onChange={(value) => onUpdate(module.id, { ...module.content, text: value })}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Enter text content..."
                style={{ minHeight: '120px' }}
              />
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-4">
            <Input
              value={module.content.src || ''}
              onChange={(e) => onUpdate(module.id, { ...module.content, src: e.target.value })}
              placeholder="Image URL or path"
            />
            <Input
              value={module.content.alt || ''}
              onChange={(e) => onUpdate(module.id, { ...module.content, alt: e.target.value })}
              placeholder="Alt text"
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Position</label>
                <Select
                  value={module.content.position || 'below'}
                  onValueChange={(value) => onUpdate(module.id, { ...module.content, position: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Image position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="below">Below content</SelectItem>
                    <SelectItem value="beside">Beside content</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Width</label>
                <Select
                  value={module.content.columns || '6'}
                  onValueChange={(value) => onUpdate(module.id, { ...module.content, columns: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Image width" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">1/4 width (3 cols)</SelectItem>
                    <SelectItem value="4">1/3 width (4 cols)</SelectItem>
                    <SelectItem value="6">1/2 width (6 cols)</SelectItem>
                    <SelectItem value="8">2/3 width (8 cols)</SelectItem>
                    <SelectItem value="9">3/4 width (9 cols)</SelectItem>
                    <SelectItem value="12">Full width (12 cols)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 'bullets':
        return (
          <div className="space-y-4">
            <Input
              value={module.content.title || ''}
              onChange={(e) => onUpdate(module.id, { ...module.content, title: e.target.value })}
              placeholder="List title"
            />
            <div className="space-y-2">
              {(module.content.items || ['']).map((item: string, index: number) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => {
                      const newItems = [...(module.content.items || [])];
                      newItems[index] = e.target.value;
                      onUpdate(module.id, { ...module.content, items: newItems });
                    }}
                    placeholder={`Item ${index + 1}`}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newItems = (module.content.items || []).filter((_: any, i: number) => i !== index);
                      onUpdate(module.id, { ...module.content, items: newItems });
                    }}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newItems = [...(module.content.items || []), ''];
                  onUpdate(module.id, { ...module.content, items: newItems });
                }}
              >
                <Plus size={16} className="mr-2" />
                Add Item
              </Button>
            </div>
          </div>
        );

      case 'quote':
        return (
          <div className="space-y-4">
            <Input
              value={module.content.title || ''}
              onChange={(e) => onUpdate(module.id, { ...module.content, title: e.target.value })}
              placeholder="Quote title (optional)"
            />
            <Textarea
              value={module.content.text || ''}
              onChange={(e) => onUpdate(module.id, { ...module.content, text: e.target.value })}
              placeholder="Enter quote text..."
              rows={3}
            />
          </div>
        );

      default:
        return <div>Editing not supported for this module type yet</div>;
    }
  };

  const renderViewMode = () => {
    switch (module.type) {
      case 'text':
        return (
          <div className="space-y-4">
            {module.content.title && (
              <h3 className="text-title text-text-primary font-light">{module.content.title}</h3>
            )}
            {module.content.text && (
              <div 
                className="prose prose-slate max-w-none text-body text-text-secondary leading-relaxed"
                dangerouslySetInnerHTML={{ __html: module.content.text }}
              />
            )}
          </div>
        );

      case 'image':
        if (!module.content.src) return null;
        return (
          <img
            src={module.content.src}
            alt={module.content.alt || ''}
            className="w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
          />
        );

      case 'bullets':
        return (
          <div className="space-y-4">
            {module.content.title && (
              <h3 className="text-title text-text-primary font-light">{module.content.title}</h3>
            )}
            {module.content.items && module.content.items.length > 0 && (
              <ul className="space-y-2">
                {module.content.items.map((item: string, index: number) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 flex-shrink-0"></div>
                    <span className="text-body text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );

      case 'quote':
        return (
          <div className="p-4 bg-surface-secondary border border-swiss-light">
            {module.content.title && (
              <h4 className="text-title text-text-primary font-medium mb-2">{module.content.title}</h4>
            )}
            <p className="text-body text-text-secondary italic">{module.content.text}</p>
          </div>
        );

      default:
        return <div>Unknown module type: {module.type}</div>;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group ${isEditing ? 'border border-dashed border-accent-blue p-4 rounded-lg' : ''}`}
    >
      {isEditing && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="cursor-grab active:cursor-grabbing"
              {...attributes}
              {...listeners}
            >
              <GripVertical size={16} />
            </Button>
            <span className="text-sm text-text-secondary font-medium">
              {module.type.charAt(0).toUpperCase() + module.type.slice(1)} Module
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(module.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      )}
      
      {isEditing ? renderEditMode() : renderViewMode()}
    </div>
  );
};