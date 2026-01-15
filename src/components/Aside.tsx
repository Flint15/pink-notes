import { useEffect, useState } from "react";
import NewNoteButton from "./buttons/NewNoteButton";
import "./Aside.css";
import NoteMenu from "./buttons/NoteMenu";

interface Note {
  name: string;
  id: string;
}

export default function Aside({
  setCurrentNote,
}: {
  setCurrentNote: (noteId: string) => void;
}) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<number>();

  useEffect(() => {
    console.log(notes);
  }, [notes]);

  return (
    <aside>
      <div className="all-notes-label">All Notes</div>
      <NewNoteButton notes={notes} setNotes={setNotes} />
      <div className="notes-container">
        <div>
          {notes.map((note: Note, index: number) => (
            <div key={index} id={note.id} className="note">
              <div
                className={`note-name-container ${
                  index === selectedNote ? "selected" : ""
                }`}
                onClick={() => {
                  setSelectedNote(index);
                  setCurrentNote(note.id);
                }}
              >
                {note.name}
              </div>
              <NoteMenu />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
