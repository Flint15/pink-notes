import type { Dispatch, SetStateAction } from "react";
import "./InfoMenu.css";
import type { NoteData } from "../types/note";
import JSZip from "jszip";
import { supabase } from "../lib/supabase";

export default function InfoMenu({
  notes,
  infoMenu,
  setInfoModal,
  closeMenu,
}: {
  notes: NoteData[];
  infoMenu: boolean;
  setInfoModal: Dispatch<SetStateAction<boolean>>;
  closeMenu: () => void;
}) {
  if (!infoMenu) return;

  const exportAll = async () => {
    closeMenu();

    const zip = new JSZip();

    notes.forEach((note) => {
      zip.file(note.name + ".txt", note.content);
    });

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);

    const link = document.createElement("a");
    link.href = url;
    link.download = "notes.zip";
    link.click();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 100);
  };

  const signOut = async () => {
    closeMenu();
    await supabase.auth.signOut();
  };

  return (
    <div className="info-menu">
      <div className="info-menu-items-container">
        <div className="about can-focus">
          <button
            className="button-about"
            onClick={() => {
              closeMenu();
              setInfoModal(true);
            }}
          >
            About
          </button>
        </div>
        <div className="export-all can-focus">
          <button className="button-export-all" onClick={exportAll}>
            Export All
          </button>
        </div>
        <div className="sign-out can-focus">
          <button className="button-sign-" onClick={signOut}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
