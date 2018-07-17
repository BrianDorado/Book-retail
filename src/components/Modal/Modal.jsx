import React from 'react'

export default props => (
    <div className="modal-component">
        <h3>{props.title || "sample title, provide title through props.title"}</h3>
        <h6>{props.text || "sample text, give text to props.text"}</h6>
        <div className="modal-btn">{props.buttonText || "CONFIRM"}</div> 
    </div>
)