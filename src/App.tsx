import Aside from "./components/Aside";
import Main from "./components/Main";
import "./App.css";
import { useState, useEffect } from "react";
import RenameModal from "./components/RenameModal";
import type { Note } from "./types/note.ts";

const DEFAULT_NOTE: Note = {
  id: crypto.randomUUID(),
  pinned: false,
  name: "Initial love",
  content: "Write something pretty ≽^•⩊•^≼ ",
};

export default function App() {
  const [notes, updateNotes] = useState<Note[]>(() => {
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeDropDowmMenuId, setActiveDropDownMenuId] =
    useState<string>("none");

  useEffect(() => {
    console.log(notes);
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="app">
      <Aside
        notes={notes}
        updateNotes={updateNotes}
        currentNoteId={currentNoteId}
        setCurrentNoteId={setCurrentNoteId}
        setIsModalOpen={setIsModalOpen}
        activeDropDownMenuId={activeDropDowmMenuId}
        setActiveDropDownMenuId={setActiveDropDownMenuId}
      />
      <Main
        notes={notes}
        updateNotes={updateNotes}
        currentNoteId={currentNoteId}
      />
      <RenameModal
        notes={notes}
        updateNotes={updateNotes}
        currentNoteId={currentNoteId}
        isModalOpen={isModalOpen}
        closeModal={() => {
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
