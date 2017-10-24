
import React, { Component } from 'react'
import { Row, Col, Collapse, Button, CardBody, Card } from 'reactstrap'
import { Icon } from 'react-fa'
import outlets from '../data/outlets'

import SelectList from './SelectList'
import BoxMultiSelect from './BoxMultiSelect'

export default class StoriesFilter extends Component {
    constructor(props) {
        super(props)
        this.toggleCollapse = this.toggleCollapse.bind(this)
        this.selectFromSelectList = this.selectFromSelectList.bind(this)
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
            ],
            // import a data obj, might want to query for this in future?
            outlets: outlets.map((outlet, idx) => {
                outlet.selected = (idx === 0) ? true : false
                return outlet
            })
        }
    }
    toggleCollapse() {
        this.setState({ collapse: !this.state.collapse })
    }
    selectFromSelectList(selectedIdx, listName) {
        // combined to alter both 'updatedAt' & 'politicalLeaning'
        const stateList = (listName === 'uploadedAt')
            ? this.state.uploadedAt
            : this.state.politicalLeaning
        this.setState({
            [stateList]: stateList.map((item, idx) => {
                item.selected = (selectedIdx === idx) ? true : false
                return item
            })
        })
    }
    render() {
        console.log(this.state)
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
                                        <SelectList
                                            name="uploadedAt"
                                            items={this.state.uploadedAt}
                                            select={this.selectFromSelectList} />
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className="filter-section political-leaning">
                                        <div className="head">Political Leaning</div>
                                        <SelectList
                                            name="politicalLeaning"
                                            items={this.state.politicalLeaning}
                                            select={this.selectFromSelectList} />
                                    </div>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col md="12">
                                    <div className="filter-section outlets">
                                        <div className="head">Outlets</div>
                                        <BoxMultiSelect items={this.state.outlets} />
                                    </div>
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
