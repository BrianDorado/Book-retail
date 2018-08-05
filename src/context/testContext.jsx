import React from 'react'

export const SomeContext = React.createContext(
    function(){
        alert('it\'s working!')
    }
)