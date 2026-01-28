import { type Dispatch, type SetStateAction } from "react";
import NewNoteButton from "./buttons/NewNoteButton";
import "./Aside.css";
import NoteMenuButton from "./buttons/NoteMenuButton";
import DropDownMenu from "./DropDownMenu";
import NotePinner from "./buttons/NotePinner";
import type { Note } from "../types/note";
import Info from "./Info";

export default function Aside({
  notes,
  updateNotes,
  currentNoteId,
  setCurrentNoteId,
  setIsModalOpen,
  activeDropDownMenuId,
  setActiveDropDownMenuId,
}: {
  notes: Note[];
  updateNotes: Dispatch<SetStateAction<Note[]>>;
  currentNoteId: string;
  setCurrentNoteId: (noteId: string) => void;
  setIsModalOpen: (state: boolean) => void;
  activeDropDownMenuId: string;
  setActiveDropDownMenuId: Dispatch<SetStateAction<string>>;
}) {
  return (
    <aside>
      <div className="upper-section">
        <div className="all-notes-label">All Notes</div>
        <NewNoteButton
          notes={notes}
          updateNotes={updateNotes}
          setCurrentNoteId={setCurrentNoteId}
        />
      </div>
      <div className="notes-container">
        <div>
          {notes.map((note: Note) => (
            <div
              key={note.id}
              id={note.id}
              className={`note ${note.id === currentNoteId ? "selected" : ""}`}
            >
              <NotePinner
                notes={notes}
                updateNotes={updateNotes}
                currentNoteId={note.id}
              />
              <div
                className="note-name-container"
                onClick={() => {
                  setCurrentNoteId(note.id);
                }}
              >
                {note.name}
              </div>
              <NoteMenuButton
                currentNoteId={note.id}
                activeDropDowmMenuId={activeDropDownMenuId}
                setActiveDropDownMenuId={setActiveDropDownMenuId}
              />
              <DropDownMenu
                notes={notes}
                updateNotes={updateNotes}
                currentNoteId={note.id}
                setIsModalOpen={setIsModalOpen}
                activeDropDownMenuId={activeDropDownMenuId}
              />
            </div>
          ))}
        </div>
      </div>
      <Info />
    </aside>
  );
}
