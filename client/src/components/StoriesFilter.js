
import React, { Component } from 'react'
import { Row, Col, Collapse, Button, CardBody, Card } from 'reactstrap'
import { Icon } from 'react-fa'
import outlets from '../data/outlets'
import categories from '../data/categories'

import SelectList from './SelectList'
import BoxMultiSelect from './BoxMultiSelect'
import Keywords from './Keywords'

export default class StoriesFilter extends Component {
    constructor(props) {
        super(props)
        this.toggleCollapse = this.toggleCollapse.bind(this)
        this.selectFromSelectList = this.selectFromSelectList.bind(this)
        this.selectFromBoxMultiSelect = this.selectFromBoxMultiSelect.bind(this)
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
            }),
            categories: categories.map((cat, idx) => {
                cat.selected = (idx === 0) ? true : false
                return cat
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
    selectFromBoxMultiSelect(selectedIdx, listName) {
        const stateList = (listName === 'outlets')
            ? this.state.outlets
            : this.state.categories
        this.setState({
            [stateList]: stateList.map((item, idx) => {
                // if anything other than 'All' selected unselected 'All'
                if (selectedIdx !== 0) {
                    if (idx === 0) {
                        item.selected = false
                    }
                    if (selectedIdx === idx) {
                        item.selected = true
                    }
                // if 'All' selected unselect everything else
                } else {
                    if (idx === 0) {
                        item.selected = true
                    } else {
                        item.selected = false
                    }
                }
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
                                <Col xs="12" sm="6" md="6">
                                    <div className="filter-section uploaded-at">
                                        <div className="head">Uploaded At</div>
                                        <SelectList
                                            name="uploadedAt"
                                            items={this.state.uploadedAt}
                                            select={this.selectFromSelectList} />
                                    </div>
                                </Col>
                                <Col xs="12" sm="6" md="6">
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
                                        <BoxMultiSelect
                                            name="outlets"
                                            items={this.state.outlets}
                                            select={this.selectFromBoxMultiSelect} />
                                    </div>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col md="12">
                                    <div className="filter-section categories">
                                        <div className="head">Categories</div>
                                        <BoxMultiSelect
                                            name="categories"
                                            items={this.state.categories}
                                            select={this.selectFromBoxMultiSelect} />
                                    </div>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col md="12">
                                    <div className="filter-section keywords">
                                        <div className="head">Keywords</div>
                                        <Keywords />
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        )
    }
}
