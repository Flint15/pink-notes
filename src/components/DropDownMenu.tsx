import "./DropDownMenu.css";

export default function DropDownMenu({
  currentNoteId,
}: {
  currentNoteId: string;
}) {
  return (
    <div className={`dropdown-menu dropdown-menu-note-id-${currentNoteId}`}>
      <button className="dropdown-menu-item can-focus">Star</button>
      <button className="dropdown-menu-item can-focus">Rename</button>
      <button className="dropdown-menu-item can-focus">Delete</button>
    </div>
  );
}
