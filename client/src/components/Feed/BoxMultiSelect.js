
import React from 'react'
import { Row, Col } from 'reactstrap'

export default ({name, items, select}) => {
    return(
        <div className="multi-select-box">
            <Row>
                {items.map((item, idx) => {
                    return(
                        <Col
                            xs="6" sm="4" md="3" lg="2"
                            key={item.id}
                            className={`box ${item.selected ? 'selected' : ''}`}
                            onClick={() => select(idx, name)} >
                                {item.name}
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}
