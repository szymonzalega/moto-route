import React from "react";
import "./SidebarDetailsRow.css"

export default function SidebarDetailsRow({ label, value }) {
  return (
    <div className="sidebar__detailsRow">
      <span className="detailsRow__label">{label}:&nbsp;</span>
      <span className="detailsRow__value">{value}</span>
    </div>
  );
}
