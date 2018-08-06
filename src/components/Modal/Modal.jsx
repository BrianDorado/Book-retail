import React from "react";
import Button from "../Button/Button";

function handleClick() {
  document.body.classList.toggle("show-modal");
}

export default props => (
  <div className="modal-component">
    <h3>{props.title || "sample title, provide title through props.title"}</h3>
    <h6>{props.text || "sample text, give text to props.text"}</h6>
    <Button fn={handleClick} text={props.buttonText || "confirm"}></Button>
    <Button fn={handleClick} text={props.buttonText || "CANCEL"}></Button>
  </div>
);
