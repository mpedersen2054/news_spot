
import React, { Component } from 'react'
import { Container, Row, Col, Alert } from 'reactstrap'

export default class ApiPage extends Component {
    render() {
        return(
            <div className="page-content">
                <Container>
                    <Row>
                        <Col md="12">
                            <Alert color="primary">
                                <h2>The api is currently under construction...</h2>
                            </Alert>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
