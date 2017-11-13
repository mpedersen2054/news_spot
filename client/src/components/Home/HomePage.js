
import '../../styles/partials/home-page.scss'
import axios from 'axios'
import React, { Component } from 'react'

import {
    Head,
    Description,
    Outlets
} from './'

const devOutletsUrl = '//localhost:8080/api/v1/outlets'

export default class HomePage extends Component {
    constructor() {
        super()
        this.state = {
            outlets: [],
            currentOffset: 0
        }
    }
    componentWillMount() {
        this.queryOutlets()
    }
    async queryOutlets() {
        let req
        try {
            req = await axios.get(`${devOutletsUrl}?limit=8&offset=${this.state.currentOffset}`)
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
            currentOffset: this.state.currentOffset += 8
        })
    }
    render() {
        return(
            <div className="page-content home-page">
                <Head />
                <Description />
                <Outlets
                    outlets={this.state.outlets}
                    queryOutlets={this.queryOutlets} />
            </div>
        )
    }
}
