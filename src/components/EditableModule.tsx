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

type TextContent = {
  title?: string;
  text?: string;
};

type ImageContent = {
  src?: string;
  alt?: string;
  heightPercent?: string | number;
};

type BulletsContent = {
  title?: string;
  items?: string[];
};

type QuoteContent = {
  title?: string;
  text?: string;
};

type TableContent = {
  title?: string;
  headers?: string[];
  rows?: string[][];
};

const wrapPlainTextAsHtml = (value: string) =>
  value
    .split('\n\n')
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, '<br />')}</p>`)
    .join('');

const getTextContent = (content: unknown): TextContent => {
  if (typeof content === "string") {
    return { text: wrapPlainTextAsHtml(content) };
  }

  if (content && typeof content === "object") {
    return content as TextContent;
  }

  return {};
};

const getImageContent = (content: unknown): ImageContent => {
  if (content && typeof content === "object") {
    return content as ImageContent;
  }

  return {};
};

const getBulletsContent = (content: unknown): BulletsContent => {
  if (content && typeof content === "object") {
    return content as BulletsContent;
  }

  return {};
};

const getQuoteContent = (content: unknown): QuoteContent => {
  if (typeof content === "string") {
    return { text: wrapPlainTextAsHtml(content) };
  }

  if (content && typeof content === "object") {
    return content as QuoteContent;
  }

  return {};
};

const getTableContent = (content: unknown): TableContent => {
  if (content && typeof content === "object") {
    return content as TableContent;
  }

  return {};
};

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
      case 'text': {
        const textContent = getTextContent(module.content);
        return (
          <div className="space-y-4">
            <Input
              value={textContent.title || ''}
              onChange={(e) => onUpdate(module.id, { ...textContent, title: e.target.value })}
              placeholder="Title (optional)"
              className="font-medium"
            />
            <div className="rich-text-editor">
              <ReactQuill
                theme="snow"
                value={textContent.text || ''}
                onChange={(value) => onUpdate(module.id, { ...textContent, text: value })}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Enter text content..."
                style={{ minHeight: '120px' }}
              />
            </div>
          </div>
        );
      }

      case 'image': {
        const imageContent = getImageContent(module.content);
        return (
          <div className="space-y-4">
            <Input
              value={imageContent.src || ''}
              onChange={(e) => onUpdate(module.id, { ...imageContent, src: e.target.value })}
              placeholder="Image URL or path"
            />
            <Input
              value={imageContent.alt || ''}
              onChange={(e) => onUpdate(module.id, { ...imageContent, alt: e.target.value })}
              placeholder="Alt text"
            />
            <Input
              type="number"
              min="10"
              max="100"
              value={imageContent.heightPercent || ''}
              onChange={(e) => onUpdate(module.id, { ...imageContent, heightPercent: e.target.value })}
              placeholder="Height % (optional)"
            />
          </div>
        );
      }

      case 'bullets': {
        const bulletsContent = getBulletsContent(module.content);
        return (
          <div className="space-y-4">
            <Input
              value={bulletsContent.title || ''}
              onChange={(e) => onUpdate(module.id, { ...bulletsContent, title: e.target.value })}
              placeholder="List title"
            />
            <div className="space-y-2">
              {(bulletsContent.items || ['']).map((item: string, index: number) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => {
                      const newItems = [...(bulletsContent.items || [])];
                      newItems[index] = e.target.value;
                      onUpdate(module.id, { ...bulletsContent, items: newItems });
                    }}
                    placeholder={`Item ${index + 1}`}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newItems = (bulletsContent.items || []).filter((_, i: number) => i !== index);
                      onUpdate(module.id, { ...bulletsContent, items: newItems });
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
                  const newItems = [...(bulletsContent.items || []), ''];
                  onUpdate(module.id, { ...bulletsContent, items: newItems });
                }}
              >
                <Plus size={16} className="mr-2" />
                Add Item
              </Button>
            </div>
          </div>
        );
      }

      case 'quote': {
        const quoteContent = getQuoteContent(module.content);
        return (
          <div className="space-y-4">
            <Input
              value={quoteContent.title || ''}
              onChange={(e) => onUpdate(module.id, { ...quoteContent, title: e.target.value })}
              placeholder="Quote title (optional)"
            />
            <div className="rich-text-editor">
              <ReactQuill
                theme="snow"
                value={quoteContent.text || ''}
                onChange={(value) => onUpdate(module.id, { ...quoteContent, text: value })}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Enter quote text..."
                style={{ minHeight: '100px' }}
              />
            </div>
          </div>
        );
      }

      case 'table': {
        const tableContent = getTableContent(module.content);
        return (
          <div className="space-y-4">
            <Input
              value={tableContent.title || ''}
              onChange={(e) => onUpdate(module.id, { ...tableContent, title: e.target.value })}
              placeholder="Table title (optional)"
            />
            
            <div className="border border-swiss-light rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    {(tableContent.headers || []).map((header: string, index: number) => (
                      <TableHead key={index}>
                        <Input
                          value={header}
                          onChange={(e) => {
                            const newHeaders = [...(tableContent.headers || [])];
                            newHeaders[index] = e.target.value;
                            onUpdate(module.id, { ...tableContent, headers: newHeaders });
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
                          const newHeaders = [...(tableContent.headers || []), 'New Column'];
                          const newRows = (tableContent.rows || []).map((row: string[]) => [...row, '']);
                          onUpdate(module.id, { ...tableContent, headers: newHeaders, rows: newRows });
                        }}
                      >
                        <Plus size={16} />
                      </Button>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(tableContent.rows || []).map((row: string[], rowIndex: number) => (
                    <TableRow key={rowIndex}>
                       {row.map((cell: string, cellIndex: number) => (
                         <TableCell key={cellIndex}>
                           <div className="rich-text-editor">
                             <ReactQuill
                               theme="snow"
                               value={cell || ''}
                               onChange={(value) => {
                                 const newRows = [...(tableContent.rows || [])];
                                 newRows[rowIndex][cellIndex] = value;
                                 onUpdate(module.id, { ...tableContent, rows: newRows });
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
                          const newRows = (tableContent.rows || []).filter((_, index: number) => index !== rowIndex);
                          onUpdate(module.id, { ...tableContent, rows: newRows });
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
                    const newRow = new Array(tableContent.headers?.length || 2).fill('');
                    const newRows = [...(tableContent.rows || []), newRow];
                    onUpdate(module.id, { ...tableContent, rows: newRows });
                  }}
                >
                  <Plus size={16} className="mr-2" />
                  Add Row
                </Button>
              </div>
            </div>
          </div>
        );
      }

      default:
        return <div>Editing not supported for this module type yet</div>;
    }
  };

  const renderViewMode = () => {
    switch (module.type) {
      case 'text': {
        const textContent = getTextContent(module.content);
        return (
          <div className="space-y-4">
            {textContent.title && (
              <h3 className="text-title text-text-primary font-light">{textContent.title}</h3>
            )}
            {textContent.text && (
              <div 
                className="prose prose-slate max-w-none text-body text-text-secondary leading-relaxed"
                dangerouslySetInnerHTML={{ __html: textContent.text }}
              />
            )}
          </div>
        );
      }

      case 'image': {
        const imageContent = getImageContent(module.content);
        if (!imageContent.src) return null;
        const heightStyle = imageContent.heightPercent
          ? { height: `${imageContent.heightPercent}vh`, objectFit: 'contain' as const }
          : {};
        return (
          <Dialog>
            <DialogTrigger asChild>
               <img
                  src={imageContent.src}
                  alt={imageContent.alt || 'Case study visual content'}
                  className="w-full cursor-pointer hover:opacity-90 transition-opacity self-start"
                  style={heightStyle}
                />
            </DialogTrigger>
            <DialogContent className="max-w-6xl w-full p-0">
               <img
                  src={imageContent.src}
                  alt={imageContent.alt || 'Enlarged case study visual content'}
                  className="w-full h-auto"
                  decoding="async"
               />
            </DialogContent>
          </Dialog>
        );
      }

      case 'bullets': {
        const bulletsContent = getBulletsContent(module.content);
        return (
          <div className="space-y-4">
            {bulletsContent.title && (
              <h3 className="text-lg mb-2 text-foreground font-semibold">{bulletsContent.title}</h3>
            )}
            {bulletsContent.items && bulletsContent.items.length > 0 && (
              <ul className="space-y-2">
                {bulletsContent.items.map((item: string, index: number) => (
                  <li key={index} className="text-body text-text-secondary" dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            )}
          </div>
        );
      }

      case 'quote': {
        const quoteContent = getQuoteContent(module.content);
        return (
          <div className="p-4 bg-surface-secondary">
            {quoteContent.title && (
              <h4 className="text-title text-text-primary font-medium mb-2">{quoteContent.title}</h4>
            )}
            <div 
              className="prose prose-slate max-w-none text-body text-text-secondary italic [&_h3]:text-lg [&_h3]:mb-2 [&_h3]:text-foreground [&_h3]:font-semibold"
              dangerouslySetInnerHTML={{ __html: quoteContent.text || '' }}
            />
          </div>
        );
      }

      case 'table': {
        const tableContent = getTableContent(module.content);
        return (
          <div className="space-y-4">
            {tableContent.title && (
              <h3 className="text-title text-text-primary font-light">{tableContent.title}</h3>
            )}
            {(tableContent.headers || tableContent.rows) && (
              <div className="overflow-hidden">
                <Table>
                  {tableContent.headers && (
                    <TableHeader>
                      <TableRow className="bg-gray-50 border-b border-gray-200">
                        {tableContent.headers.map((header: string, index: number) => (
                          <TableHead key={index} className="font-semibold text-gray-900 py-4 px-6">
                            {header}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                  )}
                  {tableContent.rows && (
                     <TableBody>
                       {tableContent.rows.map((row: string[], rowIndex: number) => (
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
      }

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
