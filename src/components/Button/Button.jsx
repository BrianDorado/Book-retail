import React from 'react'

export default props => (
    <button className='button-component' onClick={props.action}>
        {props.text}
    </button>
)