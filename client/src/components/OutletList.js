
import '../styles/partials/outlets.scss'
import React, { Component } from 'react'
import axios from 'axios'
import { Container } from 'reactstrap'

import Outlets from './Home/Outlets'
import Loading from './Loading'

const devOutletsUrl = '/api/v1/outlets'

export default class OutletList extends Component {
    constructor() {
        super()
        this.state = {
            outlets: [],
            isLoading: true
        }
    }
    async componentDidMount() {
        let req
        try {
            req = await axios.get(devOutletsUrl)
        } catch(err) {
            console.log('There was an error querying outlets.', err)
            throw new Error(err)
        }
        this.setState({
            outlets: req.data,
            isLoading: false
        })
    }
    render() {
        let loading = (this.state.isLoading)
            ? <Loading />
            : <div></div>

        return(
            <div className="page-content outlet-list-page">
                <Container>
                    <h1>All Outlets</h1>

                    {loading}
                    <Outlets
                        outlets={this.state.outlets}
                        allOutletsLoaded={true} />
                </Container>
            </div>
        )
    }
}
