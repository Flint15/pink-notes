import Aside from "./components/Aside";
import Main from "./components/Main";
import "./App.css";
import { useState } from "react";

type Notes = Record<string, string>;

export default function App() {
  const [currentNote, setCurrentNote] = useState<string>("love");

  const [notesContent, updateNotesContent] = useState<Notes>({});

  const setNoteName = () => {
    if (notesContent[currentNote]) {
      console.log(notesContent);
    }
  };

  return (
    <div className="app">
      <Aside setCurrentNote={setCurrentNote} />
      <Main
        currentNote={currentNote}
        notesContent={notesContent}
        updateNotesContent={updateNotesContent}
        setNoteName={setNoteName}
      />
    </div>
  );
}
