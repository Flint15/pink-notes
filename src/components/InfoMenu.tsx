import type { Dispatch, SetStateAction } from "react";
import "./InfoMenu.css";

export default function InfoMenu({ infoMenu }: { infoMenu: boolean }) {
  if (!infoMenu) return;

  return (
    <div className="info-menu">
      <div className="info-menu-items-container">
        <div className="about can-focus">
          <button className="button-about">About</button>
        </div>
        <div className="export-all can-focus">
          <button className="button-export-all">Export All</button>
        </div>
      </div>
    </div>
  );
}
