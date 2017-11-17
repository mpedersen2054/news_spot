
import '../../styles/partials/story-feed.scss'
import axios from 'axios'
import React, { Component } from 'react'
import Waypoint from 'react-waypoint'
import { Container } from 'reactstrap'

import StoriesSearch from './StoriesSearch'
import StoriesFilter from './StoriesFilter'
import StoriesList from './StoriesList'
import Loading from '../Loading'

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
        this.queryStories(null, true)
    }
    async queryStories(queryString, refresh) {
        let offsetLimit = `offset=${this.state.queryOffset}&limit=${this.state.queryLimit}`,
            queryStr,
            notDefaultQuery,
            req

        // add offset/limit to the end of queryString if it exists
        if (!queryString || queryString.length == 0) {
            queryStr = `${devStoriesUrl}?${offsetLimit}`
        } else {
            queryStr = `${devStoriesUrl}?${queryString}&${offsetLimit}`
            notDefaultQuery = true
        }
        try {
            req = await axios.get(queryStr)
        } catch(err) {
            console.log('there was an error!', err)
            throw new Error(err)
        }
        this.setState({
            // replace all current stories if refresh, in case of a
            // new filter being set forward, else add to current stories
            stories: refresh ?
                     [ ...req.data ] :
                     [
                         ...this.state.stories,
                         ...req.data
                     ],
            queryOffset: this.state.queryOffset += this.state.queryLimit,
            loadingMore: false,
            currentQuery: notDefaultQuery ? queryString : ''
        })
    }
    loadMore() {
        if (this.state.stories.length == 0) return
        this.setState({ loadingMore: true })
        // query for the current query, if theres a filter
        this.queryStories(this.state.currentQuery, false)

    }
    render() {
        let loadingMore
        if (this.state.loadingMore) {
            loadingMore = <Loading />
        }
        return(
            <div className="page-content story-feed">
                <Container>
                    <StoriesSearch />
                    <hr/>
                    <StoriesFilter
                        queryStories={this.queryStories} />
                    <StoriesList
                        stories={this.state.stories} />

                    <Waypoint onEnter={this.loadMore} />
                    {loadingMore}
                </Container>
            </div>
        )
    }
}
