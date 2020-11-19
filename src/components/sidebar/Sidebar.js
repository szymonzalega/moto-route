import React from "react";
import "./Sidebar.css";
import { useSelector } from "react-redux";

export default function Sidebar(props) {
  const sidebar = useSelector((state) => state.sidebar);

  return (
    <div id="sidebar" className={`sidebar ${sidebar.isOpen && "sidebar--visible"}`}>
      {sidebar.isOpen && (
        <div>{props.children}</div>
      )}
    </div>
  );
}
