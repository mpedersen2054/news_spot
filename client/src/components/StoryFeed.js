
import '../styles/partials/story-feed.scss'
import axios from 'axios'
import React, { Component } from 'react'
import Waypoint from 'react-waypoint'

import StoriesSearch from './StoriesSearch'
import StoriesFilter from './StoriesFilter'
import StoriesList from './StoriesList'
import Loading from './Loading'

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
        this.queryStories()
    }
    async queryStories(queryString) {
        let offsetLimit = `offset=${this.state.queryOffset}&limit=${this.state.queryLimit}`,
            queryStr,
            req

        if (!queryString || queryString.length == 0) {
            queryStr = `${devStoriesUrl}?${offsetLimit}`
        } else {
            queryStr = `${devStoriesUrl}?${queryString}&${offsetLimit}`
        }
        try {
            // console.log(queryStr)
            req = await axios.get(queryStr)
        } catch(err) {
            console.log('there was an error!', err)
        }
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
        this.queryStories()

    }
    render() {
        let loadingMore
        if (this.state.loadingMore) {
            loadingMore = <Loading />
        }
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
