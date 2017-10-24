
import '../styles/partials/story-feed.scss'
import axios from 'axios'
import React, { Component } from 'react'
import StoriesSearch from './StoriesSearch'
import StoriesFilter from './StoriesFilter'
import StoriesList from './StoriesList'

export default class StoryFeed extends Component {
    constructor() {
        super()
        this.state = {
            stories: []
        }
    }
    queryStories(queryString) {
        console.log('hi there!')
        console.log(queryString)
    }
    render() {
        return(
            <div className="page-content story-feed">
                <StoriesSearch />
                <hr/>
                <StoriesFilter
                    queryStories={this.queryStories} />
                <StoriesList />
            </div>
        )
    }
}
