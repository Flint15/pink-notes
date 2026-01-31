import type { ChangeEvent } from "react";
import "./UploadButton.css";

export default function UploadButton({
  activeImport,
}: {
  activeImport: boolean;
}) {
  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (event) => {
        const target = event.target;
        if (!target) {
          return;
        }
        console.log(target.result);
      };
      reader.readAsText(file);
    } else {
      alert(
        "Pretty thing, please upload the .txt, another formats aren't acceptable",
      );
    }
  };

  return (
    <div>
      <input
        type="file"
        style={{ display: "none" }}
        id="file-input"
        className="visually-hidden"
        onChange={handleFileSelect}
        accept="text/plain"
      />
      <label
        htmlFor="file-input"
        className={`upload-button ${activeImport ? "active" : ""}`}
        tabIndex={0}
        role="button"
      >
        <div className="upload-button-container">
          <svg
            className="icon-upload"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 11L12 15M12 15L16 11M12 15V3M21 11V17.7992C21 18.9193 21 19.4794 20.782 19.9072C20.5903 20.2835 20.2843 20.5895 19.908 20.7812C19.4802 20.9992 18.9201 20.9992 17.8 20.9992H6.2C5.0799 20.9992 4.51984 20.9992 4.09202 20.7812C3.71569 20.5895 3.40973 20.2835 3.21799 19.9072C3 19.4794 3 18.9193 3 17.7992V11"
              stroke="#e84393"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="upload-label">Upload File</div>
        </div>
      </label>
    </div>
  );
}
