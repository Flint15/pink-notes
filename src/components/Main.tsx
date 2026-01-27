import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import SidebarButton from "./buttons/SidebarButton";
import "./Main.css";
import type { Note } from "../types/note";
import PreviewButton from "./buttons/PreviewButton";
import ReactMarkdown from "react-markdown";

export default function Main({
  notes,
  updateNotes,
  currentNoteId,
}: {
  notes: Note[];
  updateNotes: Dispatch<SetStateAction<Note[]>>;
  currentNoteId: string;
}) {
  const [previewMode, turnPreviewMode] = useState<boolean>(false);

  useEffect(() => {
    turnPreviewMode((prevMode) => (prevMode ? false : false));
  }, [currentNoteId]);

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
              updateNotes(
                notes.map((note) => {
                  if (note.id === currentNoteId) {
                    note.content = e.target.value;
                    return note;
                  }
                  return note;
                }),
              );
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
