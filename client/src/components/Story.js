
import React from 'react'

import { Row, Col } from 'reactstrap'

export default (props) => {
    return(
        <div className="story">
            <Row>
                <Col xs="12" sm="12" md="12" className="date-col">
                    <small className="date text-muted">
                        3:30 pm |03-27-1992
                    </small>
                </Col>
                <Col xs="12" sm="12" md="12">
                    <div className="title">
                        The chief of staff described the aftermath of his own son's death in 2010.
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
                                    <a href="#">CNN News(L)</a>
                                    <span className="h-divider">|</span>
                                    <a href="#">Politics</a>
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
