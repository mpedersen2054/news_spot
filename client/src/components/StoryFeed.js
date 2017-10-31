
import '../styles/partials/story-feed.scss'
import axios from 'axios'
import React, { Component } from 'react'
import Waypoint from 'react-waypoint'

import StoriesSearch from './StoriesSearch'
import StoriesFilter from './StoriesFilter'
import StoriesList from './StoriesList'

const devStoriesUrl = '//localhost:8080/api/v1/stories'

export default class StoryFeed extends Component {
    constructor() {
        super()
        this.queryStories = this.queryStories.bind(this)
        this.loadMore = this.loadMore.bind(this)
        this.state = {
            stories: [],
            queryOffset: 0,
            queryLimit: 15,
            currentQuery: '',
            loadingMore: false
        }
    }
    componentWillMount() {
        this.queryStories(`offset=${this.state.queryOffset}&limit=${this.state.queryLimit}`)
    }
    async queryStories(queryString) {
        console.log('queryString: ', queryString)
        let req
        try {
            req = await axios.get(`${devStoriesUrl}?${queryString}`)
        } catch(err) {
            console.log('there was an error!', err)
        }
        // console.log(req.data)
        this.setState({
            stories: [
                ...this.state.stories,
                ...req.data
            ],
            queryOffset: this.state.queryOffset += this.state.queryLimit,
            loadingMore: false
        })
    }
    loadMore() {
        if (this.state.stories.length == 0) return
        this.setState({ loadingMore: true })
        this.queryStories(`offset=${this.state.queryOffset}&limit=${this.state.queryLimit}`)

    }
    render() {
        let loadingMore
        if (this.state.loadingMore) {
            loadingMore = <div>LOADING MORE...</div>
        }
        console.log(this.state.stories.length)
        return(
            <div className="page-content story-feed">
                <StoriesSearch />
                <hr/>
                <StoriesFilter
                    queryStories={this.queryStories} />
                <StoriesList
                    stories={this.state.stories} />

                <Waypoint onEnter={this.loadMore} />
                {loadingMore}
            </div>
        )
    }
}
