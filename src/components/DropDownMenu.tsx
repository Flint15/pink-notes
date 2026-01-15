import "./DropDownMenu.css";

interface Note {
  name: string;
  id: string;
}

export default function DropDownMenu({
  currentNoteId,
  notes,
  setNotes,
}: {
  currentNoteId: string;
  notes: Note[];
  setNotes: (notes: Note[]) => void;
}) {
  const deleteNote = () => {
    console.log(currentNoteId);
    setNotes(notes.filter((note) => note.id !== currentNoteId));
  };

  return (
    <div className={`dropdown-menu dropdown-menu-note-id-${currentNoteId}`}>
      <button className="dropdown-menu-item can-focus">Star</button>
      <button className="dropdown-menu-item can-focus">Rename</button>
      <button className="dropdown-menu-item can-focus" onClick={deleteNote}>
        Delete
      </button>
    </div>
  );
}
