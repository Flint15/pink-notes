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
  updateNotes,
  setCurrentNoteId,
  currentNoteId,
  setRenameModalOpen,
  activeDropDownMenuId,
  setActiveDropDownMenuId,
  activeImport,
  setActiveImport,
  setInfoModal,
  infoMenu,
  setInfoMenu,
}: {
  notes: NoteData[];
  updateNotes: Dispatch<SetStateAction<NoteData[]>>;
  setCurrentNoteId: (noteId: string) => void;
  currentNoteId: string;
  setRenameModalOpen: (state: boolean) => void;
  activeDropDownMenuId: string;
  setActiveDropDownMenuId: Dispatch<SetStateAction<string>>;
  activeImport: boolean;
  setActiveImport: Dispatch<SetStateAction<boolean>>;
  setInfoModal: Dispatch<SetStateAction<boolean>>;
  infoMenu: boolean;
  setInfoMenu: Dispatch<SetStateAction<boolean>>;
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
            <Note
              note={note}
              notes={notes}
              updateNotes={updateNotes}
              setCurrentNoteId={setCurrentNoteId}
              currentNoteId={currentNoteId}
              setRenameModalOpen={setRenameModalOpen}
              activeDropDownMenuId={activeDropDownMenuId}
              setActiveDropDownMenuId={setActiveDropDownMenuId}
            />
          ))}
        </div>
      </div>
      <Info setInfoMenu={setInfoMenu} />
      <InfoMenu infoMenu={infoMenu} setInfoModal={setInfoModal} />
    </aside>
  );
}
