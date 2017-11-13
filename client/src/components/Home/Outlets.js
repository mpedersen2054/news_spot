
import React from 'react'
import { Container, Row, Col, Card, CardImg, CardBody, CardText } from 'reactstrap'

export default () => {
    return(
        <section className="home__outlets">
            <Container>
                <Row>
                    <Col md="12">
                        <h2>Outlets</h2>
                    </Col>
                </Row>
                <Row className="outlet-list">
                    <Col xs="6" sm="6" md="4" lg="3" className="outlet">
                        <a href="#">
                            <Card>
                                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                                <CardBody>
                                    <CardText>Card Text</CardText>
                                </CardBody>
                            </Card>
                        </a>
                    </Col>
                    <Col xs="6" sm="6" md="4" lg="3" className="outlet">
                        <a href="#">
                            <Card>
                                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                                <CardBody>
                                    <CardText>Card Text</CardText>
                                </CardBody>
                            </Card>
                        </a>
                    </Col>
                    <Col xs="6" sm="6" md="4" lg="3" className="outlet">
                        <a href="#">
                            <Card>
                                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                                <CardBody>
                                    <CardText>Card Text</CardText>
                                </CardBody>
                            </Card>
                        </a>
                    </Col>
                    <Col xs="6" sm="6" md="4" lg="3" className="outlet">
                        <a href="#">
                            <Card>
                                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                                <CardBody>
                                    <CardText>Card Text</CardText>
                                </CardBody>
                            </Card>
                        </a>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
