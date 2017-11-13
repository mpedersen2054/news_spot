
import React from 'react'
import { Container, Row, Col, Card, CardImg, CardBody, CardText } from 'reactstrap'
import { Icon } from 'react-fa'

export default (props) => {
    return(
        <section className="home__outlets">
            <Container>
                <Row>
                    <Col md="12">
                        <h2>Outlets</h2>
                    </Col>
                </Row>
                <Row className="outlet-list">
                    {props.outlets.map((outlet, idx) => {
                        return(
                            <Col xs="6" sm="6" md="4" lg="3" className="outlet" key={idx}>
                                <a href="#">
                                    <Card>
                                        <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                                        <CardBody>
                                            <CardText>{outlet.name}</CardText>
                                        </CardBody>
                                    </Card>
                                </a>
                            </Col>
                        )
                    })}
                </Row>

                <Row>
                    <Col md="12" className="show-more-container">
                        <a href="#" className="show-more">
                            <div className="text">More</div>
                            <div><Icon name="chevron-down" size="2x" /></div>
                        </a>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
