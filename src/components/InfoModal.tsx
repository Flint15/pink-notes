import "./InfoModal.css";

export default function InfoModal({
  infoModal,
  closeModal,
}: {
  infoModal: boolean;
  closeModal: () => void;
}) {
  if (!infoModal) return;

  return (
    <div className="info-modal" onClick={closeModal}>
      <div
        className="info-content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        Your notes are stored locally in your browser. They won't sync across
        devices, and will be deleted if you clear your browser data. Export your
        notes regularly to back them up.
      </div>
    </div>
  );
}
