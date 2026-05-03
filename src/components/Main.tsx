import { useEffect, useState } from "react";
import SidebarButton from "./buttons/SidebarButton";
import "./Main.css";
import type { NoteData } from "../types/note";
import PreviewButton from "./buttons/PreviewButton";
import ReactMarkdown from "react-markdown";

export default function Main({
  notes,
  currentNoteId,
  onUpdateNote,
}: {
  notes: NoteData[];
  currentNoteId: string;
  onUpdateNote: (note: NoteData) => void;
}) {
  const [previewMode, turnPreviewMode] = useState<boolean>(false);

  useEffect(() => {
    turnPreviewMode(false);
  }, [currentNoteId]);

  const currentNote = notes.find((note) => note.id === currentNoteId);

  return (
    <main>
      <div className="note-toolbar">
        <SidebarButton />
        <PreviewButton
          previewMode={previewMode}
          turnPreviewMode={turnPreviewMode}
        />
      </div>
      <div className="note-editor">
        {previewMode ? (
          <div className="markdown-preview">
            <ReactMarkdown>
              {notes.find((note) => note.id === currentNoteId)?.content}
            </ReactMarkdown>
          </div>
        ) : (
          <textarea
            onChange={(e) => {
              if (!currentNote) return;
              onUpdateNote({ ...currentNote, content: e.target.value });
            }}
            id="textarea"
            value={
              notes.find((note) => note.id === currentNoteId)?.content || ""
            }
          ></textarea>
        )}
      </div>
    </main>
  );
}
