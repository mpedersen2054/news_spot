
import React, { Component } from 'react'
import Story from './Story'
import Loading from './Loading'

export default class StoriesList extends Component {
    constructor() {
        super()
    }
    render() {
        let loading
        if (this.props.stories.length < 1) {
            loading = <Loading />
        }
        return(
            <div className="stories-list">
                {loading}
                {this.props.stories.map(story => {
                    return(
                        <Story key={story.id} data={story} />
                    )
                })}
            </div>
        )
    }
}
