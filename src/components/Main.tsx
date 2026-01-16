import SidebarButton from "./buttons/SidebarButton";
import "./Main.css";

type Notes = Record<string, string>;

export default function Main({
  currentNote,
  notesContent,
  updateNotesContent,
}: {
  currentNote: string;
  notesContent: Notes;
  updateNotesContent: (notes: Notes) => void;
}) {
  return (
    <main>
      <div className="note-toolbar">
        <SidebarButton />
      </div>
      <div className="note-editor">
        <textarea
          onChange={(e) => {
            updateNotesContent({
              ...notesContent,
              [currentNote]: e.target.value,
            });
          }}
          id="textarea"
          value={notesContent[currentNote] || ""}
        ></textarea>
      </div>
    </main>
  );
}
