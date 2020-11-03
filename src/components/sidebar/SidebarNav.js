import React from "react";
import "./SidebarNav.css";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import * as sidebarActions from "../../redux/actions/sidebarActions";
import { useDispatch } from "react-redux";

export default function SidebarNav({ title, isEditMode }) {
  const dispatch = useDispatch();

  const editRoute = () => {
    console.log("");
  };

  const closeSidebar = () => {
    dispatch(sidebarActions.closeSidebar());
  };

  return (
    <div className="sidebarNav">
      <div className="sidebarNav__title">{title}</div>
      <div className="sidebarNav__buttonRow">
        {isEditMode && (
          <IconButton
            aria-label="more"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={editRoute}
          >
            <EditIcon />
          </IconButton>
        )}
        <IconButton
          aria-label="more"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={closeSidebar}
        >
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  );
}
