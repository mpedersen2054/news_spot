
import React from 'react'
import { Container, Row, Col, Card, CardImg, CardBody, CardText } from 'reactstrap'
import { Icon } from 'react-fa'

import Loading from '../Loading'

export default (props) => {

    let loadMore = (e) => {
        e.preventDefault()
        props.loadMoreOutlets()
    }

    let loadingMore = () => props.loadingMore ? <Loading /> : <div></div>
    const loading = loadingMore()

    let showMoreButton
    if (!props.allOutletsLoaded) {
        showMoreButton = <a href="#" className="show-more" onClick={loadMore}>
            <div className="text">More</div>
            <div><Icon name="chevron-down" size="2x" /></div>
        </a>
    } else {
        showMoreButton = <div></div>
    }

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
                                <a href="#" title={outlet.name}>
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

                    {loading}
                </Row>

                <Row>
                    <Col md="12" className="show-more-container">
                        {showMoreButton}
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
