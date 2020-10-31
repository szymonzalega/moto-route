import React, { useState } from "react";
import "./RouteElementNav.css";
import ExploreIcon from "@material-ui/icons/Explore";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";

export default function RouteElementNav({route}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const {name, userId } = route;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
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
          <span className="title__author">{userId}</span>
        </div>
      </div>

      <div className="routeNav__options">
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
            <MenuItem onClick={handleClose}>Delete</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}
