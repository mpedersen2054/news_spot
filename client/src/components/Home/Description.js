
import React from 'react'
import { Container, Row, Col } from 'reactstrap'

export default () => {
    return(
        <section className="home__description">
            <Container>
                <Row>
                    <Col xs="0" sm="0" md="2" lg="3"></Col>
                    <Col xs="12" sm="12" md="8" lg="6">
                        <div className="small-container">
                            <h2>What am I?</h2>
                            <div className="text">
                                We provide you will filterable articles from 47+ different news outlets daily. Roughly 10,000 new articles are added daily.
                            </div>
                        </div>
                    </Col>
                    <Col xs="0" sm="0" md="2" lg="3"></Col>
                </Row>
            </Container>
        </section>
    )
}
