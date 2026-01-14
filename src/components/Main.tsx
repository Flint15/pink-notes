import SidebarButton from "./buttons/SidebarButton";
import "./Main.css";

type Notes = Record<string, string>;

export default function Main({
  currentNote,
  notes,
  updateNotes,
}: {
  currentNote: string;
  notes: Notes;
  updateNotes: (notes: Notes) => void;
}) {
  return (
    <main>
      <div className="note-toolbar">
        <SidebarButton />
      </div>
      <div className="note-editor">
        <textarea
          onChange={(e) => {
            updateNotes({ ...notes, [currentNote]: e.target.value });
          }}
          id="textarea"
          value={notes[currentNote] || ""}
        ></textarea>
      </div>
    </main>
  );
}
