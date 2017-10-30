
import '../styles/partials/story-feed.scss'
import axios from 'axios'
import React, { Component } from 'react'
import StoriesSearch from './StoriesSearch'
import StoriesFilter from './StoriesFilter'
import StoriesList from './StoriesList'

const devStoriesUrl = '//localhost:8080/api/v1'

export default class StoryFeed extends Component {
    constructor() {
        super()
        this.queryStories = this.queryStories.bind(this)
        this.state = {
            stories: []
        }
    }
    async queryStories(queryString) {
        console.log('queryString: ', queryString)
        let req
        try {
            req = await axios.get(`${devStoriesUrl}/stories?${queryString}`)
        } catch(err) {
            console.log('there was an error!', err)
        }
        console.log('data recieved', req.data)
    }
    render() {
        return(
            <div className="page-content story-feed">
                <StoriesSearch />
                <hr/>
                <StoriesFilter
                    queryStories={this.queryStories} />
                <StoriesList
                    stories={this.state.stories} />
            </div>
        )
    }
}
