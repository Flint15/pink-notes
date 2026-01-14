import Aside from "./components/Aside";
import Main from "./components/Main";
import "./App.css";
import { useState } from "react";

type Notes = Record<string, string>;

export default function App() {
  const [currentNote, setCurrentNote] = useState<string>("love");

  const [notes, updateNotes] = useState<Notes>({});

  return (
    <div className="app">
      <Aside setCurrentNote={setCurrentNote} />
      <Main currentNote={currentNote} notes={notes} updateNotes={updateNotes} />
    </div>
  );
}
