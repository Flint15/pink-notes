import { useState, type Dispatch, type SetStateAction } from "react";
import "./RenameModal.css";
import type { Note } from "../types/note";

export default function RenameModal({
  notes,
  updateNotes,
  currentNoteId,
  renameModalOpen,
  closeModal,
}: {
  notes: Note[];
  updateNotes: Dispatch<SetStateAction<Note[]>>;
  currentNoteId: string;
  renameModalOpen: boolean;
  closeModal: () => void;
}) {
  if (!renameModalOpen) return null;

  const [inputContent, setInputContent] = useState<string>("");

  return (
    <div
      className="rename-modal-overlay"
      onClick={() => {
        closeModal();
      }}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <input
          className="rename-input"
          type="text"
          onChange={(e) => {
            setInputContent(e.target.value);
          }}
        />
        <div className="buttons">
          <button className="cancel-button" onClick={closeModal}>
            Cancel
          </button>
          <button
            className="save-button"
            onClick={() => {
              updateNotes(
                notes.map((note) =>
                  note.id === currentNoteId
                    ? { ...note, name: inputContent }
                    : note,
                ),
              );
              closeModal();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
