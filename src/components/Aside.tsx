import { type Dispatch, type SetStateAction } from "react";
import NewNoteButton from "./buttons/NewNoteButton";
import "./Aside.css";
import NoteMenuButton from "./buttons/NoteMenuButton";
import DropDownMenu from "./DropDownMenu";
import NotePinner from "./buttons/NotePinner";
import type { NoteData } from "../types/note";
import Info from "./InfoButton";
import ImportButton from "./buttons/ImportButton";
import UploadButton from "./buttons/UploadButton";

export default function Aside({
  notes,
  updateNotes,
  currentNoteId,
  setCurrentNoteId,
  setRenameModalOpen,
  activeDropDownMenuId,
  setActiveDropDownMenuId,
  activeImport,
  setActiveImport,
  setInfoModal,
}: {
  notes: NoteData[];
  updateNotes: Dispatch<SetStateAction<NoteData[]>>;
  currentNoteId: string;
  setCurrentNoteId: (noteId: string) => void;
  setRenameModalOpen: (state: boolean) => void;
  activeDropDownMenuId: string;
  setActiveDropDownMenuId: Dispatch<SetStateAction<string>>;
  activeImport: boolean;
  setActiveImport: Dispatch<SetStateAction<boolean>>;
  setInfoModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <aside>
      <div className="upper-section">
        <div className="all-notes-label">All Notes</div>
        <div className="create-notes-actions-container">
          <NewNoteButton
            notes={notes}
            updateNotes={updateNotes}
            setCurrentNoteId={setCurrentNoteId}
          />
          <ImportButton setActiveImport={setActiveImport} />
          <UploadButton
            activeImport={activeImport}
            notes={notes}
            updateNotes={updateNotes}
            setCurrentNoteId={setCurrentNoteId}
          />
        </div>
      </div>
      <div className="notes-container">
        <div>
          {notes.map((note: NoteData) => (
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
                updateNotes={updateNotes}
                currentNoteId={note.id}
                setRenameModalOpen={setRenameModalOpen}
                activeDropDownMenuId={activeDropDownMenuId}
              />
            </div>
          ))}
        </div>
      </div>
      <Info setInfoModal={setInfoModal} />
    </aside>
  );
}
