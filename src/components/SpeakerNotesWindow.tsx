import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ZoomIn, ZoomOut, Save, StickyNote, Play, Pause, RotateCcw } from 'lucide-react';

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
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

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

  // Timer logic
  useEffect(() => {
    if (isTimerRunning) {
      timerIntervalRef.current = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => setIsTimerRunning(true);
  const stopTimer = () => setIsTimerRunning(false);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(0);
  };

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
    // Font size display will be updated via useEffect
  };

  const getCurrentSpeakerNotes = () => {
    const currentSection = sections[currentSlide];
    return currentSection?.speakerNotes || '';
  };

  const handleNotesChange = (notes: string) => {
    onUpdateSpeakerNotes(currentSlide, notes);
    // Don't re-render content immediately to avoid focus loss
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
              gap: 12px;
              align-items: center;
              flex-wrap: wrap;
            }
            .timer-controls {
              display: flex;
              gap: 6px;
              align-items: center;
              background: #1a1a1a;
              padding: 8px 12px;
              border-radius: 6px;
              border: 1px solid #3a3a3a;
            }
            .timer-display {
              font-family: 'Courier New', monospace;
              font-size: 18px;
              font-weight: 600;
              color: #22d3ee;
              min-width: 65px;
              text-align: center;
            }
            .timer-btn {
              background: #3a3a3a;
              border: 1px solid #4a4a4a;
              color: #e0e0e0;
              padding: 6px 8px;
              border-radius: 4px;
              cursor: pointer;
              font-size: 14px;
              transition: background-color 0.2s;
              min-width: 32px;
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .timer-btn:hover {
              background: #4a4a4a;
            }
            .timer-btn.start {
              color: #10b981;
            }
            .timer-btn.stop {
              color: #ef4444;
            }
            .timer-btn.reset {
              color: #f59e0b;
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
            <div class="slide-info" id="slide-info">
              Slide ${currentSlide + 1}: ${slideTitle}
            </div>
            <div class="controls">
              <div class="timer-controls">
                <div class="timer-display" id="timer-display">${formatTime(timerSeconds)}</div>
                <button class="timer-btn start" id="timer-start-btn" onclick="window.toggleTimer()">
                  ▶
                </button>
                <button class="timer-btn reset" id="timer-reset-btn" onclick="window.resetTimer()">↻</button>
              </div>
              <div class="font-controls">
                <button class="font-size-btn" onclick="parent.adjustFontSize(-2)">A-</button>
                <div class="font-size-display" id="font-size-display">${fontSize}px</div>
                <button class="font-size-btn" onclick="parent.adjustFontSize(2)">A+</button>
              </div>
              ${isEditing ? '<button class="save-btn" onclick="parent.saveNotes()">Save</button>' : ''}
            </div>
          </div>
          
          <div class="notes-container">
            ${isEditing ? `
              <textarea 
                id="notes-editor"
                class="notes-editor" 
                placeholder="Enter speaker notes for this slide..."
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

    // Timer functions
    (windowRef.current as any).toggleTimer = () => {
      if (isTimerRunning) {
        stopTimer();
      } else {
        startTimer();
      }
    };

    (windowRef.current as any).resetTimer = () => {
      resetTimer();
    };

    // Set up textarea event listener with proper event handling
    if (isEditing && windowRef.current.document.getElementById('notes-editor')) {
      const textarea = windowRef.current.document.getElementById('notes-editor') as HTMLTextAreaElement;
      let debounceTimer: NodeJS.Timeout;
      
      // Prevent event bubbling that could cause focus loss
      textarea.addEventListener('keydown', (e) => {
        e.stopPropagation();
      });

      textarea.addEventListener('keyup', (e) => {
        e.stopPropagation();
      });

      textarea.addEventListener('input', (e) => {
        e.stopPropagation();
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          handleNotesChange((e.target as HTMLTextAreaElement).value);
        }, 300);
      });

      // Focus the textarea
      setTimeout(() => textarea.focus(), 100);
    }
  };

  // Update timer display without full re-render
  const updateTimerDisplay = () => {
    if (windowRef.current && !windowRef.current.closed && windowRef.current.document) {
      const timerDisplay = windowRef.current.document.getElementById('timer-display');
      const startBtn = windowRef.current.document.getElementById('timer-start-btn');
      
      if (timerDisplay) {
        timerDisplay.textContent = formatTime(timerSeconds);
      }
      
      if (startBtn) {
        startBtn.textContent = isTimerRunning ? '⏸' : '▶';
        startBtn.className = `timer-btn ${isTimerRunning ? 'stop' : 'start'}`;
      }
    }
  };

  // Update font size display without full re-render
  const updateFontSizeDisplay = () => {
    if (windowRef.current && !windowRef.current.closed && windowRef.current.document) {
      const fontSizeDisplay = windowRef.current.document.getElementById('font-size-display');
      if (fontSizeDisplay) {
        fontSizeDisplay.textContent = `${fontSize}px`;
      }
    }
  };

  // Update content when current slide changes or for initial render
  useEffect(() => {
    if (isWindowOpen && windowRef.current && !windowRef.current.closed) {
      renderSpeakerNotesContent();
    }
  }, [currentSlide, sections, isEditing]);

  // Update timer display without full re-render
  useEffect(() => {
    if (isWindowOpen && windowRef.current && !windowRef.current.closed) {
      updateTimerDisplay();
    }
  }, [timerSeconds, isTimerRunning]);

  // Update font size display without full re-render
  useEffect(() => {
    if (isWindowOpen && windowRef.current && !windowRef.current.closed) {
      updateFontSizeDisplay();
    }
  }, [fontSize]);

  return (
    <div className="flex items-center space-x-2">
      {!isWindowOpen ? (
        <Button
          variant="outline"
          size="sm"
          onClick={openSpeakerNotesWindow}
          className="flex items-center space-x-2"
        >
          <StickyNote className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={closeSpeakerNotesWindow}
          className="flex items-center space-x-2"
        >
          <StickyNote className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default SpeakerNotesWindow;