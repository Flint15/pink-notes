import SidebarButton from "./buttons/SidebarButton";
import "./Main.css";

export default function Main({ currentNote }: { currentNote: string }) {
  return (
    <main>
      <div className="note-toolbar">
        <SidebarButton />
      </div>
      <div className="note-editor">
        <textarea id="textarea" value={currentNote}></textarea>
      </div>
    </main>
  );
}
