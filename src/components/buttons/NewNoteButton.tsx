import { type Dispatch, type SetStateAction } from "react";
import "./NewNoteButton.css";
import type { Note } from "../../types/note";

export default function NewNoteButton({
  notes,
  updateNotes,
}: {
  notes: Note[];
  updateNotes: Dispatch<SetStateAction<Note[]>>;
}) {
  return (
    <button
      className="new-note-button"
      onClick={() => {
        updateNotes([
          ...notes,
          { id: crypto.randomUUID(), pinned: false, name: "love", content: "" },
        ]);
      }}
    >
      <svg
        className="icon-new-note"
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#F3F3F3"
      >
        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h240v80H200v560h560v-240h80v240q0 33-23.5 56.5T760-120H200Zm440-400v-120H520v-80h120v-120h80v120h120v80H720v120h-80Z" />
      </svg>
    </button>
  );
}
