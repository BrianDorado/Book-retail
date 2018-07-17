import React from 'react'

function handleClick(){
    document.body.classList.toggle('show-modal');
}

export default props => (
    <div className="modal-component">
        <h3>{props.title || "sample title, provide title through props.title"}</h3>
        <h6>{props.text || "sample text, give text to props.text"}</h6>
        <div className="modal-btn"
        onClick={handleClick}
        >{props.buttonText || "CONFIRM"}</div> 
        <div className="modal-btn"
        onClick={handleClick}
        >{props.buttonText || "CANCEL"}</div> 
    </div>
)