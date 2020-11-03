import React from "react";
import "./SidebarNav.css";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import useSidebarState from "./useSidebarState";

export default function SidebarNav({ title, description, isEditMode }) {
  const [openSidebar, closeSidebar] = useSidebarState();

  const editRouteHandle = () => {
    console.log("");
  };

  const closeSidebarHandle = () => {
    closeSidebar();
  };

  return (
    <div className="sidebarNav">
      <div className="sidebarNav__header">
        <div className="header__title">{title}</div>
        <div className="header__buttonRow">
          {!isEditMode && (
            <IconButton
              aria-label="more"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={editRouteHandle}
            >
              <EditIcon />
            </IconButton>
          )}
          <IconButton
            aria-label="more"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={closeSidebarHandle}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      {description && <div className="sidebarNav__description">{description}</div>}
    </div>
  );
}
