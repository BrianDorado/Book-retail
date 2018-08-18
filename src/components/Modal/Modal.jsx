import propTypes from "prop-types";
import React from "react";
import Button from "../Button/Button";

function handleClick() {
  document.body.classList.toggle("show-modal");
}

export default function Modal({ title, text, btn1text, btn1fn, btn2text, btn2fn }) {
  return (
    <div className="modal-component">
      <h3>{title}</h3>
      <h6>{text}</h6>
      <Button fn={btn1fn} text={btn1text} />
      {/* // if btn2 data provided in props, reneder second button */}
      {btn2text && <Button fn={btn2fn ? btn2fn : null} text={btn2text} />}
    </div>
  );
}

Modal.propTypes = {
  title: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  btn1text: propTypes.string.isRequired,
  btn1fn: propTypes.func.isRequired,
  btn2text: propTypes.string,
  btn2fn: propTypes.func
};
