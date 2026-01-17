import { useState, type Dispatch, type SetStateAction } from "react";
import NewNoteButton from "./buttons/NewNoteButton";
import "./Aside.css";
import NoteMenuButton from "./buttons/NoteMenuButton";
import DropDownMenu from "./DropDownMenu";
import NotePinner from "./buttons/NotePinner";

interface Note {
  id: string;
  name: string;
  content: string;
}

export default function Aside({
  notes,
  updateNotes,
  setCurrentNoteId,
  setIsModalOpen,
}: {
  notes: Note[];
  updateNotes: Dispatch<SetStateAction<Note[]>>;
  setCurrentNoteId: (noteId: string) => void;
  setIsModalOpen: (state: boolean) => void;
}) {
  const [selectedNote, setSelectedNote] = useState<number>();

  return (
    <aside>
      <div className="all-notes-label">All Notes</div>
      <NewNoteButton notes={notes} updateNotes={updateNotes} />
      <div className="notes-container">
        <div>
          {notes.map((note: Note, index: number) => (
            <div key={index} id={note.id} className="note">
              <div className="note-status">
                <NotePinner />
              </div>
              <div
                className={`note-name-container ${
                  index === selectedNote ? "selected" : ""
                }`}
                onClick={() => {
                  setSelectedNote(index);
                  setCurrentNoteId(note.id);
                }}
              >
                {note.name}
              </div>
              <NoteMenuButton
                currentNoteId={note.id}
                setCurrentNoteId={setCurrentNoteId}
              />
              <DropDownMenu
                notes={notes}
                updateNotes={updateNotes}
                currentNoteId={note.id}
                setIsModalOpen={setIsModalOpen}
              />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
