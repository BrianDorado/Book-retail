import React from 'react'

export default props => (
    <button className='button-component' onClick={props.fn}>
        {props.text}
    </button>
)