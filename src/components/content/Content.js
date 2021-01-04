import React from "react";
import "./Content.scss";

export default function Content(props) {
  return <main className="main">{props.children}</main>;
}
