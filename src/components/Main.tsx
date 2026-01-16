import type { Dispatch, SetStateAction } from "react";
import SidebarButton from "./buttons/SidebarButton";
import "./Main.css";

interface Note {
  id: string;
  name: string;
  content: string;
}

export default function Main({
  notes,
  updateNotes,
  currentNote,
}: {
  notes: Note[];
  updateNotes: Dispatch<SetStateAction<Note[]>>;
  currentNote: string;
}) {
  return (
    <main>
      <div className="note-toolbar">
        <SidebarButton />
      </div>
      <div className="note-editor">
        <textarea
          onChange={(e) => {
            updateNotes(
              notes.map((note) => {
                if (note.id === currentNote) {
                  note.content = e.target.value;
                  return note;
                }
                return note;
              })
            );
          }}
          id="textarea"
          value={notes.find((note) => note.id === currentNote)?.content || ""}
        ></textarea>
      </div>
    </main>
  );
}
