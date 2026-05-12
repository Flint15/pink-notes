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
        <div className="info-storage">
          Notes are tied to your user account. You can still export individual
          notes or all notes as a `.zip` for local backups.
        </div>
        <div className="info-source">
          Pink Notes is open source. View on GitHub -
          <a href="https://github.com/Flint15/pink-notes" target="_blank">
            ≽^•⩊•^≼
          </a>
        </div>
      </div>
    </div>
  );
}
