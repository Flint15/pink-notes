import SidebarButton from "./buttons/SidebarButton";
import "./Main.css";

export default function Main() {
  return (
    <main>
      <div className="note-toolbar">
        <SidebarButton />
      </div>
      <div className="note-editor">
        <textarea id="textarea"></textarea>
      </div>
    </main>
  );
}
