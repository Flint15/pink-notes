import React, { useState } from "react";
import "./RenameModal.css";
import type { NoteData } from "../types/note";

export default function RenameModal({
  notes,
  activeDropDownMenuId,
  renameModalOpen,
  closeModal,
  onUpdateNote,
}: {
  notes: NoteData[];
  activeDropDownMenuId: string;
  renameModalOpen: boolean;
  closeModal: () => void;
  onUpdateNote: (note: NoteData) => void;
}) {
  if (!renameModalOpen) return null;

  const [inputContent, setInputContent] = useState<string>("");

  const confirmRename = (): void => {
    const note = notes.find((note) => note.id === activeDropDownMenuId);
    if (!note) return;

    onUpdateNote({ ...note, name: inputContent });
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
