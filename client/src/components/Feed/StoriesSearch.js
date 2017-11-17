
import React, { Component } from 'react'
import { Row, Col, InputGroup, InputGroupButton, Input, Button } from 'reactstrap'
import { Icon } from 'react-fa'

export default class StoriesSearch extends Component {
    render() {
        return(
            <div className="stories-search">
                <Row>
                    <Col md="6">
                        <InputGroup size="lg">
                            <Input
                                placeholder="Search..." />
                            <InputGroupButton>
                                <Button>
                                    <Icon name="search" />
                                </Button>
                            </InputGroupButton>
                        </InputGroup>
                    </Col>
                </Row>
            </div>
        )
    }
}
