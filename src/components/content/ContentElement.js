import React from "react";
import "./ContentElement.scss";

export default function ContentElement(props) {
  return <div className="contentElement">{props.children}</div>;
}
