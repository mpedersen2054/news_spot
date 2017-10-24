
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
        const exists = this.props.keywords.some(kw => {
            return kw.name.toLowerCase() === this.state.keywordInput.toLowerCase()
        })
        if (exists) {
            // check if the warning is already there, if it is dont
            // add another if it isnt add the warning into warnings
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
            const keyword = this.state.keywordInput.toLowerCase()
            const capitalized = keyword[0].toUpperCase() + keyword.slice(1)
            this.props.addKeyword(capitalized)
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
                                    return <small key={i} className="text-danger warning">
                                        {warning}
                                    </small>
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
