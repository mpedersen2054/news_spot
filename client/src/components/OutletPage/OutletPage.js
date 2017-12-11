import '../../styles/partials/outlet-page.scss'
import React, { Component } from 'react'
import axios from 'axios'
import { Container, Row, Col } from 'reactstrap'
import Waypoint from 'react-waypoint'

import Outlets from '../Home/Outlets'
import Loading from '../Loading'
import StoriesList from '../Feed/StoriesList'

const devStoriesUrl = '/api/v1/stories'

export default class OutletPage extends Component {
    constructor() {
        super()
        this.queryOutlet = this.queryOutlet.bind(this)
        this.queryOutletStories = this.queryOutletStories.bind(this)
        this.loadMore = this.loadMore.bind(this)
        this.state = {
            name: null,
            leaning: null,
            logo: null,
            website: null,
            stories: [],
            headlines: [],
            categories: [],
            loadingOutlet: false,
            loadingStories: false,
            currentQuery: '',
            queryOffset: 0,
            queryLimit: 15
        }
    }
    componentDidMount() {
        this.setState({ loadingOutlet: true })
        this.queryOutlet()
        this.queryOutletStories(null, true)
    }
    async queryOutlet() {
        let req,
            headlines,
            categories

        try {
            req = await axios.get(`/api/v1/outlets/${this.props.match.params.id}`)
        } catch(err) {
            console.log('there was an error!', err)
            throw new Error(err)
        }
        // turn headlines & categories into array of objects
        // to be loaded into state
        headlines = req.data.outletHeadlines.map(h => {
            const name = h.name
                .split('_')
                .map(n => n.slice(0, 1).toUpperCase() + n.slice(1))
                .join(' ')

            return {
                id: h.id,
                name: name,
                selected: false
            }
        })
        categories = req.data.outletHeadlineCategories.map((c, i) => {
            // handle is EU / AF / CN ...
            return {
                id: i + 1,
                name: c.slice(0, 1).toUpperCase() + c.slice(1),
                selected: false
            }
        })
        this.setState({
            name: req.data.name,
            leaning: req.data.leaning,
            logo: req.data.logo,
            website: req.data.website,
            headlines: [
                ...this.state.headlines,
                ...headlines
            ],
            categories: [
                ...this.state.categories,
                ...categories
            ],
            loadingOutlet: false
        })
    }
    async queryOutletStories(queryString, refresh) {
        // /api/v1/stories?categories[]=science&limit=10&offset=0&outlets[]=31
        let offsetLimit = `offset=${this.state.queryOffset}&limit=${this.state.queryLimit}`,
            queryStr,
            notDefaultQuery,
            req

        // check if there is already a query going, used to infinite scroll
        if (!queryString || queryString.length == 0) {
            queryStr = `${devStoriesUrl}?${offsetLimit}&outlets[]=${this.props.match.params.id}`
        } else {
            queryStr = `${devStoriesUrl}?${queryString}&${offsetLimit}&outlets[]=${this.props.match.params.id}`
            notDefaultQuery = true
        }

        console.log('querying for:')
        console.log(queryStr)

        try {
            req = await axios(queryStr)
        } catch(err) {
            console.log('there was an error!', err)
            throw new Error(err)
        }

        this.setState({
            stories: refresh ?
                     [ ...req.data ] :
                     [
                         ...this.state.stories,
                         ...req.data
                     ],
            queryOffset: this.state.queryOffset += this.state.queryLimit,
            loadingStories: false,
            currentQuery: notDefaultQuery ? queryString : ''
        })
    }
    loadMore() {
        if (this.state.stories.length == 0) return
        this.setState({ loadingStories: true })
        this.queryOutletStories(this.state.currentQuery, false)
    }
    // click handler for clicking on either Headline or Category
    // if headline clicked, make selected=true for that headline,
    // and all other headlines selected=false & ALL categories
    // selected=false & visa-versa for clicking on category
    selectOption(selectedId, which) {
        let currentWhich,
            otherWhich,
            whichName1,
            whichName2,
            toBeSelected,
            removeSelected,
            newQString

        if (which === 'headlines') {
            whichName1 = 'headlines'
            whichName2 = 'categories'
            currentWhich = this.state.headlines
            otherWhich = this.state.categories
        } else {
            whichName1 = 'categories'
            whichName2 = 'headlines'
            currentWhich = this.state.categories
            otherWhich = this.state.headlines
        }

        toBeSelected = currentWhich.map((item, idx) => {
            item.selected = (item.id == selectedId)
                ? true
                : false
            return item
        })
        removeSelected = otherWhich.map((item, idx) => {
            item.selected = false
            return item
        })

        // create the new query string based on weather
        // it was a headline or a category
        const story = currentWhich.filter(s => s.id == selectedId)
        if (whichName1 === 'headlines') {
            console.log(story)
            newQString = `headline=${story[0].id}`
        } else {
            newQString = `categories[]=${story[0].name.slice(0, 1).toLowerCase() + story[0].name.slice(1)}`
        }

        this.setState({
            [whichName1]: toBeSelected,
            [whichName2]: removeSelected,
            currentQuery: newQString
        })

        this.queryOutletStories(newQString, true)
    }
    render() {
        let loadingOutlet = (this.state.loadingOutlet)
            ? <Loading />
            : <div></div>

        let loadingStories = (this.state.loadingStories)
            ? <Loading />
            : <div></div>

        return(
            <div className="page-content outlet-page">
                <Container>
                    <Row>
                        <Col md="12">
                            <div
                                className="banner"
                                style={{
                                    backgroundImage: `url(${this.state.logo})`
                                }}>
                            </div>
                        </Col>
                        <Col md="12">
                            <div className="o-name">{this.state.name}</div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="12">
                            <div className="o-headlines">
                                <h4>Headlines</h4>
                                {loadingOutlet}
                                <Row>
                                    {this.state.headlines.map(h => {
                                        return(
                                            <Col
                                                md="3"
                                                key={h.id}
                                                onClick={() => this.selectOption(h.id, 'headlines')}>
                                                <div className={`o-headline ${h.selected ? 'active' : ''}`}>
                                                    {h.name}
                                                </div>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </div>
                        </Col>
                    </Row>

                    <hr/>

                    <Row>
                        <Col md="12">
                            <div className="o-categories">
                                <h4>Types</h4>
                                {loadingOutlet}
                                <Row>
                                    {this.state.categories.map(c => {
                                        return(
                                            <Col
                                                md="3"
                                                key={c.id}
                                                onClick={() => this.selectOption(c.id, 'categories')}>
                                                <div className={`o-category ${c.selected ? 'active' : ''}`}>
                                                    {c.name}
                                                </div>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </div>
                        </Col>
                    </Row>

                    <hr/>

                    <Row>
                        <Col md="12">
                            <div className="o-stories">
                                <h4>Stories</h4>
                                <Row>
                                    <Col md="12">
                                        <StoriesList
                                            stories={this.state.stories} />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="12">
                            <Waypoint onEnter={this.loadMore} />
                            {loadingStories}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
