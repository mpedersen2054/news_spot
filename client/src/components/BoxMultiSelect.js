
import React from 'react'

export default ({items}) => {
    console.log('items from BoxMultiSelect', items)
    const clicked = (e) => {
        console.log('clicked! ', e)
    }
    return(
        <div onClick={clicked}>hello box multiselect!</div>
    )
}
