import { useState } from "react";
import NewNoteButton from "./buttons/NewNoteButton";
import "./Aside.css";

export default function Aside() {
  const [notes, setNotes] = useState<string[]>([]);
  const [selectedNote, setSelectedNote] = useState<number>();

  return (
    <aside>
      <div className="all-notes-label">All Notes</div>
      <NewNoteButton notes={notes} setNotes={setNotes} />
      <div className="notes-container">
        <div>
          {notes.map((note: string, index: number) => (
            <div
              key={index}
              className={`note ${index === selectedNote ? "selected" : ""}`}
              onClick={() => {
                setSelectedNote(index);
              }}
            >
              {note}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
