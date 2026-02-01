import React, { useState, type Dispatch, type SetStateAction } from "react";
import "./RenameModal.css";
import type { Note } from "../types/note";

export default function RenameModal({
  notes,
  updateNotes,
  activeDropDownMenuId,
  renameModalOpen,
  closeModal,
}: {
  notes: Note[];
  updateNotes: Dispatch<SetStateAction<Note[]>>;
  activeDropDownMenuId: string;
  renameModalOpen: boolean;
  closeModal: () => void;
}) {
  if (!renameModalOpen) return null;

  const [inputContent, setInputContent] = useState<string>("");

  const confirmRename = (): void => {
    updateNotes(
      notes.map((note) =>
        note.id === activeDropDownMenuId
          ? { ...note, name: inputContent }
          : note,
      ),
    );
    closeModal();
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.key === "Enter") {
      confirmRename();
    }
  };

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
          onKeyDown={handleKeyDown}
        />
        <div className="buttons">
          <button className="cancel-button" onClick={closeModal}>
            Cancel
          </button>
          <button className="save-button" onClick={confirmRename}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
