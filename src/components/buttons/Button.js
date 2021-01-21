import React from "react";
import "./Button.scss";

export function PrimaryButton(props) {
  return (
    <div
      className={`button button__primary${
        props.autoWidth ? " button--auto-width" : ""
      }`}
    >
      {props.children}
    </div>
  );
}

export function SecondaryButton(props) {
  return (
    <div
      className={`button button__secondary${
        props.autoWidth ? " button--auto-width" : ""
      }`}
    >
      {props.children}
    </div>
  );
}
