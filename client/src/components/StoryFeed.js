
import axios from 'axios'
import React, { Component } from 'react'
import StoriesSearch from './StoriesSearch'
import StoriesFilter from './StoriesFilter'
import StoriesList from './StoriesList'

export default class StoryFeed extends Component {
    componentWillDidMount() {
        axios.get('/api/v1/outlets')
    }
    render() {
        return(
            <div className="page-content story-feed">
                <StoriesSearch />
                <StoriesFilter />
                <StoriesList />
            </div>
        )
    }
}
