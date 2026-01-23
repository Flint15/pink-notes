import { type Dispatch, type SetStateAction } from "react";
import "./DropDownMenu.css";
import type { Note } from "../types/note";

export default function DropDownMenu({
  notes,
  updateNotes,
  currentNoteId,
  setIsModalOpen,
}: {
  notes: Note[];
  updateNotes: Dispatch<SetStateAction<Note[]>>;
  currentNoteId: string;
  setIsModalOpen: (state: boolean) => void;
}) {
  const deleteNote = () => {
    console.log(currentNoteId);
    updateNotes(notes.filter((note) => note.id !== currentNoteId));
  };

  const renameNote = () => {
    document
      .querySelector(`.dropdown-menu-note-id-${currentNoteId}`)
      ?.classList.toggle("active");
    setIsModalOpen(true);
  };

  return (
    <div className={`dropdown-menu dropdown-menu-note-id-${currentNoteId}`}>
      <div className="buttons-container">
        <button className="dropdown-menu-item can-focus">Star</button>
        <button className="dropdown-menu-item can-focus" onClick={renameNote}>
          Rename
        </button>
        <button className="dropdown-menu-item can-focus" onClick={deleteNote}>
          Delete
        </button>
      </div>
    </div>
  );
}
