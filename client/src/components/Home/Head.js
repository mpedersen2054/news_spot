
import React from 'react'
import { Container, Row, Col } from 'reactstrap'

export default () => {
    return(
        <header className="home__head">
            <Container fluid>
                <Container>
                    <Row>
                        <Col md="12">
                            <div className="text">
                                <h1>News Spot</h1>
                                <p>
                                    <span className="text-p">News from 47 different news sources daily</span>
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </header>
    )
}
