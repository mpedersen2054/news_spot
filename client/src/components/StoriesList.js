
import React, { Component } from 'react'
import Story from './Story'

// import { ListGroup } from 'reactstrap'

export default class StoriesList extends Component {
    constructor() {
        super()
    }
    render() {
        return(
            <div className="stories-list">
                <div className="hspace"></div>
                {this.props.stories.map(story => {
                    console.log('story: ', story)
                    return(
                        <Story key={story.id} data={story} />
                    )
                })}
            </div>
        )
    }
}
