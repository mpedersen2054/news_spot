
import '../styles/partials/story-feed.scss'
import axios from 'axios'
import React, { Component } from 'react'
import StoriesSearch from './StoriesSearch'
import StoriesFilter from './StoriesFilter'
import StoriesList from './StoriesList'

export default class StoryFeed extends Component {
    render() {
        return(
            <div className="page-content story-feed">
                <StoriesSearch />
                <hr/>
                <StoriesFilter />
                <StoriesList />
            </div>
        )
    }
}
