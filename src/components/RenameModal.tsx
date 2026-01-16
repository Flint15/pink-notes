import "./RenameModal.css";

export default function RenameModal() {
  return (
    <div
      className="rename-modal-overlay"
      onClick={() => {
        document
          .querySelector(".rename-modal-overlay")
          ?.classList.remove("active");
      }}
    ></div>
  );
}
