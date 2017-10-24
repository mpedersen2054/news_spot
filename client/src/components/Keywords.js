
import React, { Component } from 'react'
import { Row, Col, Form, Input, Badge } from 'reactstrap'

export default class Keywords extends Component {
    constructor() {
        super()
        this.updateKeywordInput = this.updateKeywordInput.bind(this)
        this.validateKeyword = this.validateKeyword.bind(this)
        this.state = {
            keywordInput: '',
            warnings: []
        }
    }
    updateKeywordInput(e) {
        this.setState({ keywordInput: e.target.value })
    }
    validateKeyword(e) {
        e.preventDefault()
        // do validations
        const exists = this.props.keywords.some(kw => {
            return kw.name.toLowerCase() === this.state.keywordInput.toLowerCase()
        })
        if (exists) {
            const existsWarning = 'That keyword already exists'
            const existsWarningExists = this.state.warnings.some(warning => {
                return warning === existsWarning
            })
            if (!existsWarningExists) {
                this.setState({
                    warnings: [
                        ...this.state.warnings,
                        'That keyword already exists'
                    ]
                })
            }
        } else {
            this.props.addKeyword(this.state.keywordInput)
            this.setState({
                keywordInput: '',
                warnings: []
            })
        }
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
                            <div className="warnings">
                                {this.state.warnings.map((warning, i) => {
                                    return <small key={i} className="text-danger warning">{warning}</small>
                                })}
                            </div>
                        </Form>
                    </Col>
                </Row>
                <Row className="keyword-badges">
                    <Col md="2">hello</Col>
                    <Col md="2">hello</Col>
                    <Col md="2">hello</Col>
                    <Col md="2">hello</Col>
                </Row>
            </div>
        )
    }
}
