import { type Dispatch, type SetStateAction } from "react";
import "./DropDownMenu.css";
import type { Note } from "../types/note";

export default function DropDownMenu({
  notes,
  updateNotes,
  currentNoteId,
  setIsModalOpen,
  activeDropDowmMenuId,
}: {
  notes: Note[];
  updateNotes: Dispatch<SetStateAction<Note[]>>;
  currentNoteId: string;
  setIsModalOpen: (state: boolean) => void;
  activeDropDowmMenuId: string;
}) {
  const deleteNote = (): void => {
    updateNotes(notes.filter((note) => note.id !== currentNoteId));
  };

  const renameNote = (): void => {
    document
      .querySelector(`.dropdown-menu-note-id-${currentNoteId}`)
      ?.classList.toggle("active");
    setIsModalOpen(true);
  };

  const downloadNote = (): void => {
    const content = notes.find((note) => note.id === currentNoteId);
    if (!content) return;

    const blob = new Blob([content.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${content.name}.txt`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`dropdown-menu dropdown-menu-note-id-${currentNoteId} ${currentNoteId === activeDropDowmMenuId ? `active` : ``}`}
    >
      <div className="dropdown-menu-items-container">
        <div className="common-items-container">
          <button className="dropdown-menu-item can-focus">Star</button>
          <button className="dropdown-menu-item can-focus" onClick={renameNote}>
            Rename
          </button>
          <button
            className={`dropdown-menu-item delete ${notes.length === 1 ? "alone" : ""} can-focus`}
            onClick={deleteNote}
          >
            Delete
          </button>
        </div>
        <div className="download-button-container">
          <button
            className="dropdown-menu-item can-focus download"
            onClick={downloadNote}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
