import Aside from "./components/Aside";
import Main from "./components/Main";
import "./App.css";
import { useState, useEffect } from "react";
import RenameModal from "./components/RenameModal";

interface Note {
  id: string;
  name: string;
  content: string;
}

export default function App() {
  const [notes, updateNotes] = useState<Note[]>([]);
  const [currentNoteId, setCurrentNoteId] = useState<string>("love");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log(notes);
  }, [notes]);

  return (
    <div className="app">
      <Aside
        notes={notes}
        updateNotes={updateNotes}
        setCurrentNoteId={setCurrentNoteId}
        setIsModalOpen={setIsModalOpen}
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
