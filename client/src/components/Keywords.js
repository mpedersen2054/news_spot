
import React, { Component } from 'react'
import { Row, Col, Form, Input, Badge } from 'reactstrap'

export default class Keywords extends Component {
    constructor() {
        super()
        this.updateKeywordInput = this.updateKeywordInput.bind(this)
        this.validateKeyword = this.validateKeyword.bind(this)
        this.state = {
            keywordInput: ''
        }
    }
    updateKeywordInput(e) {
        this.setState({ keywordInput: e.target.value })
    }
    validateKeyword(e) {
        e.preventDefault()
        // do validations here eventually
        this.props.addKeyword(this.state.keywordInput)
        this.setState({ keywordInput: '' })
    }
    render() {
        return(
            <div className="keywords">
                <Row>
                    <Col md="4">
                        <Form onSubmit={this.validateKeyword}>
                            <Input
                                placeholder="Enter keyword..."
                                value={this.state.keywordInput}
                                onChange={this.updateKeywordInput} />
                        </Form>
                    </Col>
                </Row>
                <Row className="keyword-badges">

                </Row>
            </div>
        )
    }
}
