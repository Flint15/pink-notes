import Aside from "./components/Aside";
import Main from "./components/Main";
import "./App.css";
import { useState, useEffect } from "react";
import RenameModal from "./components/RenameModal";
import type { NoteData } from "./types/note.ts";
import { uuid } from "./utils/uuid.ts";
import InfoModal from "./components/InfoModal.tsx";

const DEFAULT_NOTE: NoteData = {
  id: uuid(),
  pinned: false,
  name: "Initial love",
  content: "Write something, pretty ≽^•⩊•^≼ ",
};

export default function App() {
  const [notes, updateNotes] = useState<NoteData[]>(() => {
    try {
      const storedNotes = localStorage.getItem("notes");
      const parsedNotes = storedNotes ? JSON.parse(storedNotes) : [];
      return parsedNotes.length > 0 ? parsedNotes : [DEFAULT_NOTE];
    } catch (error) {
      console.error("Failed to load notes from localStorage");
      return [DEFAULT_NOTE];
    }
  });
  const [currentNoteId, setCurrentNoteId] = useState<string>(
    () => notes[0].id || DEFAULT_NOTE.id,
  );
  const [renameModalOpen, setRenameModalOpen] = useState<boolean>(false);
  const [infoModal, setInfoModal] = useState<boolean>(false);
  const [activeDropDownMenuId, setActiveDropDownMenuId] =
    useState<string>("none");
  const [activeImport, setActiveImport] = useState<boolean>(false);

  useEffect(() => {
    console.log(notes);
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    setActiveDropDownMenuId("none");
    setActiveImport(false);
  }, [currentNoteId]);

  return (
    <div className="app">
      <Aside
        notes={notes}
        updateNotes={updateNotes}
        currentNoteId={currentNoteId}
        setCurrentNoteId={setCurrentNoteId}
        setRenameModalOpen={setRenameModalOpen}
        activeDropDownMenuId={activeDropDownMenuId}
        setActiveDropDownMenuId={setActiveDropDownMenuId}
        activeImport={activeImport}
        setActiveImport={setActiveImport}
        setInfoModal={setInfoModal}
      />
      <Main
        notes={notes}
        updateNotes={updateNotes}
        currentNoteId={currentNoteId}
      />
      <RenameModal
        notes={notes}
        updateNotes={updateNotes}
        activeDropDownMenuId={activeDropDownMenuId}
        renameModalOpen={renameModalOpen}
        closeModal={() => {
          setRenameModalOpen(false);
        }}
      />
      <InfoModal
        infoModal={infoModal}
        closeModal={() => {
          setInfoModal(false);
        }}
      />
    </div>
  );
}
