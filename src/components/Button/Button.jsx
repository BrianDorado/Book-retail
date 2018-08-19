import React from 'react'

export default props => (
    <button className='button-component' onClick={props.fn || (_=>console.log('no_function_assigned'))}>
        {props.text}
    </button>
)