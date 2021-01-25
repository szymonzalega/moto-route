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
        <span className="item__label">
          Level:&nbsp;<strong>{level}</strong>
        </span>
      </div>
      <div className="detailsRow__item">
        <TimelineIcon />
        <span className="item__label">
          Length:&nbsp;<strong>{length}km</strong>
        </span>
      </div>
      <div className="detailsRow__item">
        <PanoramaIcon />
        <span className="item__label">
          Type:&nbsp;<strong>{routeType}</strong>
        </span>
      </div>
    </div>
  );
}
