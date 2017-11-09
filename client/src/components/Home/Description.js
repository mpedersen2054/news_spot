
import React from 'react'
import { Container, Row, Col } from 'reactstrap'

export default () => {
    return(
        <section className="home__description">
            <Container>
                <Row>
                    <Col md="12">
                        <div className="small-container">
                            <h2>What am I?</h2>
                            <div className="text">
                                We provide you will filterable articles from 47+ different news outlets daily. Roughly 10,000 new articles are added daily.
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
