import type { Dispatch, SetStateAction } from "react";
import SidebarButton from "./buttons/SidebarButton";
import "./Main.css";
import type { Note } from "../types/note";

export default function Main({
  notes,
  updateNotes,
  currentNoteId,
}: {
  notes: Note[];
  updateNotes: Dispatch<SetStateAction<Note[]>>;
  currentNoteId: string;
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
                if (note.id === currentNoteId) {
                  note.content = e.target.value;
                  return note;
                }
                return note;
              }),
            );
          }}
          id="textarea"
          value={notes.find((note) => note.id === currentNoteId)?.content || ""}
        ></textarea>
      </div>
    </main>
  );
}
