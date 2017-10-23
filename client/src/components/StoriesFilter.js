
import React, { Component } from 'react'
import { Row, Col, Collapse, Button, CardBody, Card } from 'reactstrap'
import { Icon } from 'react-fa'
import startCase from '../helpers/startCase'

export default class StoriesFilter extends Component {
    constructor(props) {
        super(props)
        this.toggleCollapse = this.toggleCollapse.bind(this)
        this.selectUploadedAt = this.selectUploadedAt.bind(this)
        this.state = {
            collapse: false,
            uploadedAt: [
                { name: 'Last Hour', selected: false },
                { name: 'Today', selected: false },
                { name: 'This Week', selected: false },
                { name: 'This Month', selected: false },
                { name: 'This Year', selected: false },
                { name: 'All', selected: true }
            ]
        }
    }
    toggleCollapse() {
        this.setState({ collapse: !this.state.collapse })
    }
    selectUploadedAt(selectedIdx) {
        this.setState({
            uploadedAt: this.state.uploadedAt.map((item, idx) => {
                if (selectedIdx === idx) {
                    item.selected = true
                } else {
                    item.selected = false
                }
                return item
            })
        })
    }
    renderUploadedAt() {
        return(
            <ul className="select-list">
                {this.state.uploadedAt.map((item, idx) => {
                    const formatted = startCase(item.name)
                    const isSelected = item.selected ? 'selected' : ''
                    return(
                        <li
                            className={`select-item ${isSelected}`}
                            key={idx}
                            onClick={() => this.selectUploadedAt(idx)} >
                                {formatted}
                        </li>
                    )
                })}
            </ul>
        )
    }
    render() {
        return(
            <div className="stories-filter">
                <a href="#" onClick={this.toggleCollapse}>
                    <Icon name="bars" />
                    <span>Filter</span>
                </a>
                <Collapse isOpen={this.state.collapse} className="filter-container">
                    <Card>
                        <CardBody>
                            <Row>
                                <Col md="6">
                                    <div className="filter-section uploaded-at">
                                        <div className="head">Uploaded At</div>
                                        {this.renderUploadedAt()}
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className="filter-section political-leaning">
                                        <div className="head">Political Leaning</div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <div className="filter-section outlets"></div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <div className="filter-section categories"></div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <div className="filter-section keywords"></div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        )
    }
}
