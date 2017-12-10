import '../../styles/partials/outlet-page.scss'
import React, { Component } from 'react'
import axios from 'axios'
import { Container, Row, Col } from 'reactstrap'

import Outlets from '../Home/Outlets'
import Loading from '../Loading'

export default class OutletPage extends Component {
    constructor() {
        super()
        this.state = {
            name: null,
            leaning: null,
            logo: null,
            website: null,
            stories: [],
            headlines: [],
            categories: [],
            loadingOutlet: false
        }
    }
    componentDidMount() {
        this.setState({ loadingOutlet: true })
        this.queryOutlet()
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

        console.log(req.data)

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
    render() {
        let loading = (this.state.loadingOutlet)
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
                                {loading}
                                <Row>
                                    {this.state.headlines.map(h => {
                                        return(
                                            <Col md="3" key={h.id}>
                                                <div className="o-headline">
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
                                {loading}
                                <Row>
                                    {this.state.categories.map(c => {
                                        return(
                                            <Col md="3" key={c.id}>
                                                <div className="o-category">
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
                                    <Col md="12">stories</Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
