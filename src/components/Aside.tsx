import { type Dispatch, type SetStateAction } from "react";
import NewNoteButton from "./buttons/NewNoteButton";
import "./Aside.css";
import type { NoteData } from "../types/note";
import Info from "./InfoButton";
import ImportButton from "./buttons/ImportButton";
import UploadButton from "./buttons/UploadButton";
import Note from "./Note";
import InfoMenu from "./InfoMenu";

export default function Aside({
  notes,
  currentNoteId,
  setCurrentNoteId,
  setRenameModalOpen,
  activeDropDownMenuId,
  setActiveDropDownMenuId,
  activeImport,
  setActiveImport,
  setInfoModal,
  infoMenu,
  setInfoMenu,
  onCreateNote,
  onDeleteNote,
  onPinNote,
  onUploadNote,
}: {
  notes: NoteData[];
  currentNoteId: string;
  setCurrentNoteId: (noteId: string) => void;
  setRenameModalOpen: (state: boolean) => void;
  activeDropDownMenuId: string;
  setActiveDropDownMenuId: Dispatch<SetStateAction<string>>;
  activeImport: boolean;
  setActiveImport: Dispatch<SetStateAction<boolean>>;
  setInfoModal: Dispatch<SetStateAction<boolean>>;
  infoMenu: boolean;
  setInfoMenu: Dispatch<SetStateAction<boolean>>;
  onCreateNote: () => void;
  onDeleteNote: (noteId: string) => void;
  onPinNote: (noteId: string) => void;
  onUploadNote: (name: string, content: string) => void;
}) {
  return (
    <aside>
      <div className="upper-section">
        <div className="all-notes-label">All Notes</div>
        <div className="create-notes-actions-container">
          <NewNoteButton onCreateNote={onCreateNote} />
          <ImportButton setActiveImport={setActiveImport} />
          <UploadButton
            activeImport={activeImport}
            onUploadNote={onUploadNote}
          />
        </div>
      </div>
      <div className="notes-container">
        <div>
          {notes.map((note: NoteData) => (
            <Note
              key={note.id}
              note={note}
              notes={notes}
              setCurrentNoteId={setCurrentNoteId}
              currentNoteId={currentNoteId}
              setRenameModalOpen={setRenameModalOpen}
              activeDropDownMenuId={activeDropDownMenuId}
              setActiveDropDownMenuId={setActiveDropDownMenuId}
              onDeleteNote={onDeleteNote}
              onPinNote={onPinNote}
            />
          ))}
        </div>
      </div>
      <Info setInfoMenu={setInfoMenu} />
      <InfoMenu
        notes={notes}
        infoMenu={infoMenu}
        setInfoModal={setInfoModal}
        closeMenu={() => {
          setInfoMenu(false);
        }}
      />
    </aside>
  );
}
