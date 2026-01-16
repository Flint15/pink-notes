import { type Dispatch, type SetStateAction } from "react";
import "./NewNoteButton.css";

interface Note {
  name: string;
  id: string;
  content: string;
}

export default function NewNoteButton({
  notes,
  updateNotes,
}: {
  notes: Note[];
  updateNotes: Dispatch<SetStateAction<Note[]>>;
}) {
  return (
    <button
      onClick={() => {
        updateNotes([
          ...notes,
          { id: crypto.randomUUID(), name: "love", content: "" },
        ]);
      }}
    >
      <svg
        className="icon-new-note"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <rect x="0" fill="none" width="24px" height="24px"></rect>
        <path d="M9.707 12.879L19.59 3 21 4.41l-9.879 9.883L9 15 9.707 12.879zM18 18H6V6h7V4H6.002C4.896 4 4 4.896 4 6.002v11.996C4 19.104 4.896 20 6.002 20h11.996C19.104 20 20 19.104 20 17.998V11h-2V18z"></path>
      </svg>
    </button>
  );
}
