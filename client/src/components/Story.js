
import React from 'react'

import { Row, Col } from 'reactstrap'

export default ({data}) => {
    let pubAt = new Date(data.publishedAt),
        pubAtDate = pubAt.toLocaleDateString('en-US'),
        pubAtTime = pubAt.toLocaleTimeString(),
        pubAtFormatted

    pubAtDate = pubAtDate.split('/')
    pubAtDate[2] = pubAtDate[2].slice(2)
    pubAtDate = pubAtDate.join('-')

    pubAtTime = pubAtTime.split(':')
    const tod = pubAtTime[2].slice(3)
    pubAtTime = pubAtTime.slice(0, 2).join(':') + '' + tod.toLowerCase()

    pubAtFormatted = `${pubAtTime} | ${pubAtDate}`

    return(
        <div className="story">
            <Row>
                <Col xs="12" sm="12" md="12" className="date-col">
                    <small className="date text-muted">
                        {pubAtFormatted}
                    </small>
                </Col>
                <Col xs="12" sm="12" md="12">
                    <div className="title">
                        {data.title}
                    </div>
                </Col>
                <Col xs="12" sm="12" md="12">
                    <div className="story-hr"></div>
                </Col>
                <Col xs="12" sm="12" md="12">
                    <Row className="meta-row">
                        <Col md="6">
                            <div className="meta-1">
                                <div className="outlet">
                                    <a href="#">{data.storyOutlet.name}({data.storyOutlet.leaning.toUpperCase()})</a>
                                    <span className="h-divider">|</span>
                                    <a href="#">{data.storyHeadline.category}</a>
                                </div>
                                <div className="story-extra">
                                    <a href="#">Image</a>
                                    <span className="h-divider">|</span>
                                    <a href="#">Description</a>
                                </div>
                            </div>
                        </Col>
                        <Col md="6" className="meta-2-col">
                            <div className="meta-2">
                                meta 2
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
