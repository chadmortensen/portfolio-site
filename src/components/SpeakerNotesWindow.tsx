import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ZoomIn, ZoomOut, Save } from 'lucide-react';

interface SpeakerNotesWindowProps {
  currentSlide: number;
  sections: any[];
  isEditing: boolean;
  onUpdateSpeakerNotes: (sectionIndex: number, notes: string) => void;
  onSave: () => void;
}

const SpeakerNotesWindow = ({ 
  currentSlide, 
  sections, 
  isEditing, 
  onUpdateSpeakerNotes,
  onSave 
}: SpeakerNotesWindowProps) => {
  const [fontSize, setFontSize] = useState(16);
  const windowRef = useRef<Window | null>(null);
  const [isWindowOpen, setIsWindowOpen] = useState(false);

  useEffect(() => {
    // Load saved font size
    const savedFontSize = localStorage.getItem('speaker-notes-font-size');
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize));
    }
  }, []);

  useEffect(() => {
    // Save font size to localStorage
    localStorage.setItem('speaker-notes-font-size', fontSize.toString());
  }, [fontSize]);

  const openSpeakerNotesWindow = () => {
    if (windowRef.current && !windowRef.current.closed) {
      windowRef.current.focus();
      return;
    }

    const newWindow = window.open('', 'speakerNotes', 
      'width=600,height=800,scrollbars=yes,resizable=yes,menubar=no,toolbar=no'
    );
    
    if (newWindow) {
      windowRef.current = newWindow;
      setIsWindowOpen(true);
      
      // Handle window close
      newWindow.onbeforeunload = () => {
        setIsWindowOpen(false);
        windowRef.current = null;
      };

      renderSpeakerNotesContent();
    }
  };

  const closeSpeakerNotesWindow = () => {
    if (windowRef.current) {
      windowRef.current.close();
      windowRef.current = null;
      setIsWindowOpen(false);
    }
  };

  const adjustFontSize = (delta: number) => {
    const newSize = Math.max(12, Math.min(32, fontSize + delta));
    setFontSize(newSize);
    if (isWindowOpen) {
      renderSpeakerNotesContent();
    }
  };

  const getCurrentSpeakerNotes = () => {
    const currentSection = sections[currentSlide];
    return currentSection?.speakerNotes || '';
  };

  const handleNotesChange = (notes: string) => {
    onUpdateSpeakerNotes(currentSlide, notes);
    if (isWindowOpen) {
      renderSpeakerNotesContent();
    }
  };

  const renderSpeakerNotesContent = () => {
    if (!windowRef.current) return;

    const currentSection = sections[currentSlide];
    const speakerNotes = currentSection?.speakerNotes || '';
    const slideTitle = currentSection?.title || `Slide ${currentSlide + 1}`;

    windowRef.current.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Speaker Notes - ${slideTitle}</title>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
              margin: 0;
              padding: 20px;
              background: #1a1a1a;
              color: #e0e0e0;
              line-height: 1.6;
            }
            .header {
              background: #2a2a2a;
              padding: 16px;
              margin: -20px -20px 20px -20px;
              border-bottom: 2px solid #3a3a3a;
              display: flex;
              justify-content: space-between;
              align-items: center;
              flex-wrap: wrap;
              gap: 10px;
            }
            .slide-info {
              font-size: 18px;
              font-weight: 600;
              color: #22d3ee;
            }
            .controls {
              display: flex;
              gap: 8px;
              align-items: center;
            }
            .font-controls {
              display: flex;
              gap: 4px;
              align-items: center;
            }
            .font-size-btn {
              background: #3a3a3a;
              border: 1px solid #4a4a4a;
              color: #e0e0e0;
              padding: 6px 10px;
              border-radius: 4px;
              cursor: pointer;
              font-size: 14px;
              transition: background-color 0.2s;
            }
            .font-size-btn:hover {
              background: #4a4a4a;
            }
            .font-size-display {
              background: #2a2a2a;
              padding: 6px 12px;
              border-radius: 4px;
              font-size: 14px;
              min-width: 50px;
              text-align: center;
              border: 1px solid #4a4a4a;
            }
            .save-btn {
              background: #22d3ee;
              color: #1a1a1a;
              border: none;
              padding: 8px 16px;
              border-radius: 4px;
              cursor: pointer;
              font-weight: 600;
              transition: background-color 0.2s;
            }
            .save-btn:hover {
              background: #06b6d4;
            }
            .notes-container {
              margin-top: 20px;
            }
            .notes-content {
              font-size: ${fontSize}px;
              line-height: 1.8;
              white-space: pre-wrap;
              word-wrap: break-word;
              min-height: 400px;
              padding: 20px;
              background: #2a2a2a;
              border-radius: 8px;
              border: 1px solid #3a3a3a;
            }
            .notes-editor {
              width: 100%;
              min-height: 400px;
              padding: 20px;
              background: #2a2a2a;
              border: 1px solid #3a3a3a;
              border-radius: 8px;
              color: #e0e0e0;
              font-size: ${fontSize}px;
              line-height: 1.8;
              font-family: inherit;
              resize: vertical;
            }
            .notes-editor:focus {
              outline: 2px solid #22d3ee;
              border-color: #22d3ee;
            }
            .empty-notes {
              color: #888;
              font-style: italic;
              text-align: center;
              padding: 40px 20px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="slide-info">
              Slide ${currentSlide + 1}: ${slideTitle}
            </div>
            <div class="controls">
              <div class="font-controls">
                <button class="font-size-btn" onclick="parent.adjustFontSize(-2)">A-</button>
                <div class="font-size-display">${fontSize}px</div>
                <button class="font-size-btn" onclick="parent.adjustFontSize(2)">A+</button>
              </div>
              ${isEditing ? '<button class="save-btn" onclick="parent.saveNotes()">Save</button>' : ''}
            </div>
          </div>
          
          <div class="notes-container">
            ${isEditing ? `
              <textarea 
                class="notes-editor" 
                placeholder="Enter speaker notes for this slide..."
                onchange="parent.updateNotes(this.value)"
                oninput="parent.updateNotes(this.value)"
              >${speakerNotes}</textarea>
            ` : `
              <div class="notes-content">
                ${speakerNotes || '<div class="empty-notes">No speaker notes for this slide</div>'}
              </div>
            `}
          </div>
        </body>
      </html>
    `);

    windowRef.current.document.close();

    // Add event handlers to the new window
    (windowRef.current as any).adjustFontSize = (delta: number) => {
      adjustFontSize(delta);
    };

    (windowRef.current as any).updateNotes = (notes: string) => {
      handleNotesChange(notes);
    };

    (windowRef.current as any).saveNotes = () => {
      onSave();
    };
  };

  // Update content when current slide changes
  useEffect(() => {
    if (isWindowOpen && windowRef.current && !windowRef.current.closed) {
      renderSpeakerNotesContent();
    }
  }, [currentSlide, sections, fontSize, isEditing]);

  return (
    <div className="flex items-center space-x-2">
      {!isWindowOpen ? (
        <Button
          variant="outline"
          size="sm"
          onClick={openSpeakerNotesWindow}
          className="flex items-center space-x-2"
        >
          <span>Open Speaker Notes</span>
        </Button>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={closeSpeakerNotesWindow}
          className="flex items-center space-x-2"
        >
          <span>Close Speaker Notes</span>
        </Button>
      )}
    </div>
  );
};

export default SpeakerNotesWindow;