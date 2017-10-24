
import React from 'react'
import { Row, Col } from 'reactstrap'

export default ({items}) => {
    return(
        <div className="multi-select-box">
            <Row>
                {items.map((item, idx) => {
                    return(
                        <Col xs="6" sm="4" md="3" lg="2" className="box">
                            {item.name}
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}
