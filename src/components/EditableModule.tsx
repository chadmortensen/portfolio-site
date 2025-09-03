import { useState } from "react";
import { GripVertical, Trash2, Plus, Palette } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export interface Module {
  id: string;
  type: 'text' | 'image' | 'bullets' | 'goals' | 'findings' | 'principles' | 'quote' | 'table';
  content: any;
  column: 'full' | 'left' | 'right';
}

interface EditableModuleProps {
  module: Module;
  isEditing: boolean;
  onUpdate: (id: string, content: any, column?: string) => void;
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

  // Custom Quill toolbar configuration with lists - color removal to prevent span styling
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'background': [] }],
      ['clean']
    ],
  };

  const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'list', 'bullet', 'background'
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
            <Input
              type="number"
              min="10"
              max="100"
              value={module.content.heightPercent || ''}
              onChange={(e) => onUpdate(module.id, { ...module.content, heightPercent: e.target.value })}
              placeholder="Height % (optional)"
            />
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
            <div className="rich-text-editor">
              <ReactQuill
                theme="snow"
                value={module.content.text || ''}
                onChange={(value) => onUpdate(module.id, { ...module.content, text: value })}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Enter quote text..."
                style={{ minHeight: '100px' }}
              />
            </div>
          </div>
        );

      case 'table':
        return (
          <div className="space-y-4">
            <Input
              value={module.content.title || ''}
              onChange={(e) => onUpdate(module.id, { ...module.content, title: e.target.value })}
              placeholder="Table title (optional)"
            />
            
            <div className="border border-swiss-light rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    {(module.content.headers || []).map((header: string, index: number) => (
                      <TableHead key={index}>
                        <Input
                          value={header}
                          onChange={(e) => {
                            const newHeaders = [...(module.content.headers || [])];
                            newHeaders[index] = e.target.value;
                            onUpdate(module.id, { ...module.content, headers: newHeaders });
                          }}
                          className="bg-transparent border-none"
                          placeholder={`Header ${index + 1}`}
                        />
                      </TableHead>
                    ))}
                    <TableHead className="w-12">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newHeaders = [...(module.content.headers || []), 'New Column'];
                          const newRows = (module.content.rows || []).map((row: string[]) => [...row, '']);
                          onUpdate(module.id, { ...module.content, headers: newHeaders, rows: newRows });
                        }}
                      >
                        <Plus size={16} />
                      </Button>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(module.content.rows || []).map((row: string[], rowIndex: number) => (
                    <TableRow key={rowIndex}>
                       {row.map((cell: string, cellIndex: number) => (
                         <TableCell key={cellIndex}>
                           <div className="rich-text-editor">
                             <ReactQuill
                               theme="snow"
                               value={cell || ''}
                               onChange={(value) => {
                                 const newRows = [...(module.content.rows || [])];
                                 newRows[rowIndex][cellIndex] = value;
                                 onUpdate(module.id, { ...module.content, rows: newRows });
                               }}
                               modules={quillModules}
                               formats={quillFormats}
                               placeholder={`Cell ${rowIndex + 1}-${cellIndex + 1}`}
                               style={{ minHeight: '60px' }}
                             />
                           </div>
                         </TableCell>
                       ))}
                      <TableCell className="w-12">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newRows = (module.content.rows || []).filter((_: any, index: number) => index !== rowIndex);
                            onUpdate(module.id, { ...module.content, rows: newRows });
                          }}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="p-2 border-t border-swiss-light bg-gray-50">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newRow = new Array(module.content.headers?.length || 2).fill('');
                    const newRows = [...(module.content.rows || []), newRow];
                    onUpdate(module.id, { ...module.content, rows: newRows });
                  }}
                >
                  <Plus size={16} className="mr-2" />
                  Add Row
                </Button>
              </div>
            </div>
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
        const heightStyle = module.content.heightPercent 
          ? { height: `${module.content.heightPercent}vh`, objectFit: 'contain' as const }
          : {};
        return (
          <Dialog>
            <DialogTrigger asChild>
               <img
                 src={module.content.src}
                 alt={module.content.alt || 'Case study visual content'}
                 className="w-full cursor-pointer hover:opacity-90 transition-opacity self-start"
                 style={heightStyle}
                 loading="lazy"
                 decoding="async"
               />
            </DialogTrigger>
            <DialogContent className="max-w-6xl w-full p-0">
               <img
                 src={module.content.src}
                 alt={module.content.alt || 'Enlarged case study visual content'}
                 className="w-full h-auto"
                 loading="lazy"
                 decoding="async"
               />
            </DialogContent>
          </Dialog>
        );

      case 'bullets':
        return (
          <div className="space-y-4">
            {module.content.title && (
              <h3 className="text-lg mb-2 text-foreground font-semibold">{module.content.title}</h3>
            )}
            {module.content.items && module.content.items.length > 0 && (
              <ul className="space-y-2">
                {module.content.items.map((item: string, index: number) => (
                  <li key={index} className="text-body text-text-secondary" dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            )}
          </div>
        );

      case 'quote':
        return (
          <div className="p-4 bg-surface-secondary">
            {module.content.title && (
              <h4 className="text-title text-text-primary font-medium mb-2">{module.content.title}</h4>
            )}
            <div 
              className="prose prose-slate max-w-none text-body text-text-secondary italic [&_h3]:text-lg [&_h3]:mb-2 [&_h3]:text-foreground [&_h3]:font-semibold"
              dangerouslySetInnerHTML={{ __html: module.content.text }}
            />
          </div>
        );

      case 'table':
        return (
          <div className="space-y-4">
            {module.content.title && (
              <h3 className="text-title text-text-primary font-light">{module.content.title}</h3>
            )}
            {(module.content.headers || module.content.rows) && (
              <div className="overflow-hidden">
                <Table>
                  {module.content.headers && (
                    <TableHeader>
                      <TableRow className="bg-gray-50 border-b border-gray-200">
                        {module.content.headers.map((header: string, index: number) => (
                          <TableHead key={index} className="font-semibold text-gray-900 py-4 px-6">
                            {header}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                  )}
                  {module.content.rows && (
                     <TableBody>
                       {module.content.rows.map((row: string[], rowIndex: number) => (
                         <TableRow key={rowIndex} className="border-b border-gray-200 last:border-b-0">
                           {row.map((cell: string, cellIndex: number) => (
                             <TableCell key={cellIndex} className="py-4 px-6">
                               <div 
                                 className="prose prose-slate max-w-none text-body text-text-secondary"
                                 dangerouslySetInnerHTML={{ __html: cell }}
                               />
                             </TableCell>
                           ))}
                         </TableRow>
                       ))}
                     </TableBody>
                  )}
                </Table>
              </div>
            )}
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
        <>
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
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-secondary mb-2">Column</label>
            <Select
              value={module.column}
              onValueChange={(value) => onUpdate(module.id, module.content, value as 'full' | 'left' | 'right')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select column" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full Width</SelectItem>
                <SelectItem value="left">Left Column</SelectItem>
                <SelectItem value="right">Right Column</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
      
      {isEditing ? renderEditMode() : renderViewMode()}
    </div>
  );
};