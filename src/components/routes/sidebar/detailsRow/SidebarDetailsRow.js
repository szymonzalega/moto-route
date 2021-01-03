import React from "react";
import "./SidebarDetailsRow.scss";

export default function SidebarDetailsRow({ label, value }) {
  return (
    <div className="sidebarDetailsRow">
      <span>{label}:&nbsp;</span>
      <span className="sidebarDetailsRow__value">{value}</span>
    </div>
  );
}
