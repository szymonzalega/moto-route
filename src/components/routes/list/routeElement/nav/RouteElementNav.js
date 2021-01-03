import React, { useState } from "react";
import "./RouteElementNav.scss";
import { useDispatch, useSelector } from "react-redux";
import { deleteRoute } from "../../../../../redux/actions/routeActions";
import ExploreIcon from "@material-ui/icons/Explore";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import useSidebarState from "../../../../sidebar/useSidebarState";

export default function RouteElementNav({ route }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const sidebar = useSelector(({ sidebar }) => sidebar);
  const { closeSidebar } = useSidebarState();

  const { name, userEmail } = route;

  const handleClick = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const handleDeleteRoute = (e) => {
    e.stopPropagation();
    if (sidebar.isOpen && sidebar.routeId === route.id) {
      closeSidebar();
    }
    dispatch(deleteRoute(route));
    setAnchorEl(null);
  };

  return (
    <div className="routeNav">
      <div className="routeNav__left">
        <div className="left__icon">
          <ExploreIcon style={{ fontSize: 50 }} />
        </div>
        <div className="left__title">
          <span className="title__name">{name}</span>
          <span className="title__author">{userEmail}</span>
        </div>
      </div>

      <div>
        <IconButton
          aria-label="more"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleDeleteRoute}>Delete</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
