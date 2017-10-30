
import React, { Component } from 'react'
import Story from './Story'

export default class StoriesList extends Component {
    render() {
        return(
            <div className="stories-list">
                <Story />
                <Story />
                <Story />
                <Story />
            </div>
        )
    }
}
