
import React from 'react'

export default ({name, items, select}) => {
    return(
        <ul className="select-list">
            {items.map((item, idx) => {
                return(
                    <li
                        className={`select-item ${item.selected ? 'selected' : ''}`}
                        key={idx}
                        onClick={() => select(idx, name)} >
                            {item.name}
                    </li>
                )
            })}
        </ul>
    )
}
