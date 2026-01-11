import Aside from "./components/Aside";
import Main from "./components/Main";
import "./App.css";
import { useState } from "react";

export default function App() {
  const [currentNote, setCurrentNote] = useState<string>("love");

  return (
    <div className="app">
      <Aside setCurrentNote={setCurrentNote} />
      <Main currentNote={currentNote} />
    </div>
  );
}
