import { useState } from "react";
import NewNoteButton from "./buttons/NewNoteButton";
import "./Aside.css";

export default function Aside() {
  const [notes, setNotes] = useState<string[]>([]);

  return (
    <aside>
      <div className="all-notes-label">All Notes</div>
      <NewNoteButton notes={notes} setNotes={setNotes} />
      <div className="notes-container">
        <div>
          {notes.map((note: string) => (
            <div className="note">{note}</div>
          ))}
        </div>
      </div>
    </aside>
  );
}
