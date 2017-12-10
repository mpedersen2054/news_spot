import '../../styles/partials/outlet-page.scss'
import React, { Component } from 'react'
import axios from 'axios'
import { Container, Row, Col } from 'reactstrap'

import Outlets from '../Home/Outlets'

export default class OutletPage extends Component {
    constructor() {
        super()
        this.state = {}
    }
    render() {
        const id = this.props.match.params.id
        console.log(id)
        return(
            <div className="page-content outlet-page">
                <Container>
                    <Row>
                        <Col md="12">
                            <div className="banner">
                                <div className="overlay-txt">
                                    Fox News
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="12">
                            <div className="headlines">
                                <h4>Headlines</h4>
                                <Row>
                                    <Col md="4">hello</Col>
                                    <Col md="4">hello</Col>
                                    <Col md="4">hello</Col>
                                    <Col md="4">hello</Col>
                                    <Col md="4">hello</Col>
                                    <Col md="4">hello</Col>
                                    <Col md="4">hello</Col>
                                    <Col md="4">hello</Col>
                                    <Col md="4">hello</Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>

                    <hr/>

                    <Row>
                        <Col md="12">
                            <div className="types">
                                <h4>Types</h4>
                                <Row>
                                    <Col md="4">hello</Col>
                                    <Col md="4">hello</Col>
                                    <Col md="4">hello</Col>
                                    <Col md="4">hello</Col>
                                    <Col md="4">hello</Col>
                                    <Col md="4">hello</Col>
                                    <Col md="4">hello</Col>
                                    <Col md="4">hello</Col>
                                    <Col md="4">hello</Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>

                    <hr/>

                    <Row>
                        <Col md="12">
                            <div className="stories">
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
