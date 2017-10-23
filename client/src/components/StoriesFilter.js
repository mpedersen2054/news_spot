
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
            ],
            politicalLeaning: [
                { name: 'Left', selected: false },
                { name: 'Right', selected: false },
                { name: 'Independant', selected: false },
                { name: 'Any', selected: true },
            ]
        }
    }
    toggleCollapse() {
        this.setState({ collapse: !this.state.collapse })
    }
    selectUploadedAt(selectedIdx) {
        this.setState({
            uploadedAt: this.state.uploadedAt.map((item, idx) => {
                item.selected = (selectedIdx === idx) ? true : false
                return item
            })
        })
    }
    selectPoliticalLeaning(selectedIdx) {
        console.log('hi there!', selectedIdx)
        this.setState({
            politicalLeaning: this.state.politicalLeaning.map((item, idx) => {
                if (selectedIdx === idx) {
                    item.selected = !item.selected
                }
                return item
            })
        })
    }
    renderUploadedAt() {
        return(
            <ul className="select-list">
                {this.state.uploadedAt.map((item, idx) => {
                    return(
                        <li
                            className={`select-item ${item.selected ? 'selected' : ''}`}
                            key={idx}
                            onClick={() => this.selectUploadedAt(idx)} >
                                {item.name}
                        </li>
                    )
                })}
            </ul>
        )
    }
    renderPoliticalLeaning() {
        return(
            <ul className="select-list">
                {this.state.politicalLeaning.map((item, idx) => {
                    return(
                        <li
                            className={`select-item ${item.selected ? 'selected' : ''}`}
                            key={idx}
                            onClick={() => this.selectPoliticalLeaning(idx)} >
                                {item.name}
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
                                        {this.renderPoliticalLeaning()}
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
