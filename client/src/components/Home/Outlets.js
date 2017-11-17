
import React from 'react'
import { Container, Row, Col, Card, CardImg, CardBody, CardText } from 'reactstrap'
import { Icon } from 'react-fa'
import { Link } from 'react-router-dom'

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

    let outletsHeader
    if (props.isHomePage) {
        outletsHeader = (
            <Row>
                <Col md="12">
                    <h2>Outlets</h2>
                </Col>
            </Row>
        )
    }

    return(
        <section className="outlets">
            {outletsHeader}
            <Row className="outlet-list">
                {props.outlets.map((outlet, idx) => {
                    return(
                        <Col xs="6" sm="6" md="4" lg="3" className="outlet" key={idx}>
                            <Link to={`/outlets/${outlet.id}`} title={outlet.name}>
                                <Card>
                                    <CardImg
                                        top
                                        width="100%"
                                        className="img"
                                        style={{
                                            backgroundImage: `url(${outlet.logo})`
                                        }} />
                                    <div className="img-overlay"></div>
                                    <CardBody className="text">
                                        <CardText>{outlet.name}</CardText>
                                    </CardBody>
                                </Card>
                            </Link>
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
        </section>
    )
}
