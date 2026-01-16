import "./RenameModal.css";

export default function RenameModal({
  isModalOpen,
  closeModal,
}: {
  isModalOpen: boolean;
  closeModal: () => void;
}) {
  if (!isModalOpen) return null;

  return (
    <div
      className="rename-modal-overlay"
      onClick={() => {
        closeModal();
      }}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <input type="text" />
        <div className="buttons">
          <button className="cancel" onClick={closeModal}>
            Cancel
          </button>
          <button className="save">Save</button>
        </div>
      </div>
    </div>
  );
}
