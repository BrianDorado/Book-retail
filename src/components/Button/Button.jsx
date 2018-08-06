import React from 'react'

export default props => (
    <div className='button-component' onClick={props.fn || (_=>console.log('no_function_assigned'))}>
        {props.text}
    </div>
)