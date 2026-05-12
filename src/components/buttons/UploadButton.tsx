import type { ChangeEvent } from "react";
import "./UploadButton.css";
import JSZip from "jszip";

export default function UploadButton({
  activeImport,
  onUploadNote,
}: {
  activeImport: boolean;
  onUploadNote: (name: string, content: string) => void;
}) {
  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const target = e.target;
        if (!target) {
          return;
        }
        const name: string = file.name.split(".")[0];
        const result = target.result;
        onUploadNote(name, typeof result === "string" ? result : "");
        event.target.value = "";
      };
      reader.readAsText(file);
    } else {
      alert(
        "Pretty thing, please upload the .txt, another formats aren't acceptable",
      );
    }
  };

  const handleZipSelect = async (
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const file = event.target.files?.[0];
    if (!file) return;
    console.log("lovvve");
    if (!file.name.endsWith(".zip")) {
      alert("Please upload a .zip file");
      return;
    }

    const zip = new JSZip();
    const contents = await zip.loadAsync(file);

    const uploadPromises: Promise<void>[] = [];

    contents.forEach((relativePath, zipEntry) => {
      if (zipEntry.dir) return;
      if (!relativePath.endsWith(".txt")) return;

      const promise = zipEntry.async("string").then((content) => {
        const name =
          relativePath.split("/").pop()?.replace(".txt", "") || relativePath;
        onUploadNote(name, content);
      });

      uploadPromises.push(promise);
    });
    console.log("Loveee");
    await Promise.all(uploadPromises);
    event.target.value = "";
  };

  return (
    <div>
      <div className={`upload-buttons ${activeImport ? "active" : ""}`}>
        <div className="upload-buttons-container">
          <input
            type="file"
            style={{ display: "none" }}
            id="file-input-txt"
            onChange={handleFileSelect}
            accept="text/plain"
          />
          <label
            htmlFor="file-input-txt"
            className="upload-button"
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
          <input
            type="file"
            style={{ display: "none" }}
            id="file-input-zip"
            onChange={handleZipSelect}
            accept=".zip"
          />
          <label
            htmlFor="file-input-zip"
            className="upload-button"
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
                  d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H12M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
                  stroke="#e84393"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.5 21L17.5 15M17.5 15L20 17.5M17.5 15L15 17.5"
                  stroke="#e84393"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div className="upload-label">Upload Zip</div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
