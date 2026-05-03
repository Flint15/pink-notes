import { type Dispatch, type SetStateAction } from "react";
import "./Note.css";
import NoteMenuButton from "./buttons/NoteMenuButton";
import DropDownMenu from "./DropDownMenu";
import NotePinner from "./buttons/NotePinner";
import type { NoteData } from "../types/note";

export default function Note({
  note,
  notes,
  setCurrentNoteId,
  currentNoteId,
  setRenameModalOpen,
  activeDropDownMenuId,
  setActiveDropDownMenuId,
  onDeleteNote,
  onPinNote,
}: {
  note: NoteData;
  notes: NoteData[];
  setCurrentNoteId: (noteId: string) => void;
  currentNoteId: string;
  setRenameModalOpen: (state: boolean) => void;
  activeDropDownMenuId: string;
  setActiveDropDownMenuId: Dispatch<SetStateAction<string>>;
  onDeleteNote: (noteId: string) => void;
  onPinNote: (noteId: string) => void;
}) {
  return (
    <div
      key={note.id}
      id={note.id}
      className={`note ${note.id === currentNoteId ? "selected" : ""}`}
    >
      <NotePinner
        currentNoteId={note.id}
        pinned={note.pinned}
        onPinNote={onPinNote}
      />
      <div
        className="note-name-container"
        title={note.name}
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
        currentNoteId={note.id}
        setRenameModalOpen={setRenameModalOpen}
        activeDropDownMenuId={activeDropDownMenuId}
        onDeleteNote={onDeleteNote}
      />
    </div>
  );
}
