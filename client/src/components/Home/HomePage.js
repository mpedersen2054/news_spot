
import '../../styles/partials/home-page.scss'
import axios from 'axios'
import React, { Component } from 'react'
import { Container } from 'reactstrap'

import {
    Head,
    Description,
    Outlets
} from './'

const devOutletsUrl = '/api/v1/outlets'

export default class HomePage extends Component {
    constructor() {
        super()
        this.queryOutlets = this.queryOutlets.bind(this)
        this.loadMoreOutlets = this.loadMoreOutlets.bind(this)
        this.state = {
            outlets: [],
            currentOffset: 0,
            loadingMore: false,
            allOutletsLoaded: false
        }
    }
    componentDidMount() {
        this.setState({ loadingMore: true })
        this.queryOutlets()
    }
    async queryOutlets() {
        let queryStr = `${devOutletsUrl}?limit=8&offset=${this.state.currentOffset}`,
            req
        try {
            req = await axios.get(queryStr)
            console.log(req.data)
        } catch(err) {
            console.log('There was an error querying outlets.', err)
            throw new Error(err)
        }
        this.setState({
            outlets: [
                ...this.state.outlets,
                ...req.data
            ],
            currentOffset: this.state.currentOffset += 8,
            loadingMore: false,
            allOutletsLoaded: req.data.length < 8 ? true : false
        })
    }
    loadMoreOutlets() {
        this.setState({ loadingMore: true })
        this.queryOutlets()
    }
    render() {
        return(
            <div className="page-content home-page">
                <Head />
                <Description />

                <div className="home__outlets">
                    <Container>
                        <Outlets
                            outlets={this.state.outlets}
                            loadMoreOutlets={this.loadMoreOutlets}
                            loadingMore={this.state.loadingMore}
                            allOutletsLoaded={this.state.allOutletsLoaded}
                            isHomePage={true} />
                    </Container>
                </div>
            </div>
        )
    }
}
