import React from "react";
import "./RouteElementInfo.scss";
import TimelineIcon from "@material-ui/icons/Timeline";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import PanoramaIcon from "@material-ui/icons/Panorama";

export default function RouteElementInfo({ route }) {
  const { level, length, routeType } = route;

  return (
    <div className="route__detailsRow">
      <div className="detailsRow__item">
        <EqualizerIcon />
        <span className="item__label">Level:</span>
        <span className="item__value">{level}</span>
      </div>
      <div className="detailsRow__item">
        <TimelineIcon />
        <span className="item__label">Length:</span>
        <span className="item__value">{length}km</span>
      </div>
      <div className="detailsRow__item">
        <PanoramaIcon />
        <span className="item__label">Type:</span>
        <span className="item__value">{routeType}</span>
      </div>
    </div>
  );
}
