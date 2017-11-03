
import React, { Component } from 'react'
import { Row, Col, Collapse, Button, CardBody, Card } from 'reactstrap'
import { Icon } from 'react-fa'
import queryString from 'query-string'
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
        this.addKeyword = this.addKeyword.bind(this)
        this.removeKeyword = this.removeKeyword.bind(this)
        this.submitFilterOpts = this.submitFilterOpts.bind(this)
        this.state = {
            collapse: false,
            // collapse: true, // open on start
            uploadedAt: [
                { name: 'Last Hour', uniq: 'hour', selected: false },
                { name: 'Today', uniq: 'today', selected: false },
                { name: 'This Week', uniq: 'week', selected: false },
                { name: 'This Month', uniq: 'month', selected: false },
                { name: 'This Year', uniq: 'year', selected: false },
                { name: 'All', uniq: 'all', selected: true }
            ],
            politicalLeaning: [
                { name: 'Left', uniq: 'l', selected: false },
                { name: 'Right', uniq: 'r', selected: false },
                { name: 'Independant', uniq: 'i', selected: false },
                { name: 'Any', uniq: 'a', selected: true },
            ],
            // import a data obj, might want to query for this in future?
            outlets: outlets.map((outlet, idx) => {
                outlet.selected = (idx === 0) ? true : false
                return outlet
            }),
            categories: categories.map((cat, idx) => {
                cat.selected = (idx === 0) ? true : false
                return cat
            }),
            keywords: []
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
                        item.selected = !item.selected
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
    addKeyword(word) {
        console.log('hello world!', word)
        const kwObj = { name: word }
        this.setState({
            keywords: [
                ...this.state.keywords,
                kwObj
            ]
        })
    }
    removeKeyword(keywordId) {
        console.log('removing kw', keywordId)
        this.setState({
            keywords: [
                ...this.state.keywords.slice(0, keywordId),
                ...this.state.keywords.slice(keywordId + 1)
            ]
        })
    }
    submitFilterOpts() {
        const { uploadedAt, politicalLeaning, outlets, categories, keywords } = this.state
        // get the names of whats selected
        const selUploadedAt = uploadedAt.find(opt => opt.selected)
        const selPolitcalLeaning = politicalLeaning.find(opt => opt.selected)
        // create an object that will have the opts only if they are not default
        let filterOpts = {}
        // if uploadedAt is not only 'Any'
        if (selUploadedAt.name !== 'All') {
            filterOpts['uploadedAt'] = selUploadedAt.uniq
        }
        // if politicalLeaning is not only 'Any'
        if (selPolitcalLeaning.name !== 'Any') {
            filterOpts['politicalLeaning'] = selPolitcalLeaning.uniq
        }
        // if outlets is not only 'All'
        if (!outlets[0].selected) {
            filterOpts['outlets'] = outlets
                .filter(o => o.selected)
                .map(o => o.id)
        }
        // if categories is not only 'All'
        if (!categories[0].selected) {
            filterOpts['categories'] = categories
                .filter(c => c.selected)
                .map(c => c.uniq)
        }
        // if keywords is not empty
        if (keywords.length > 0) {
            filterOpts['keywords'] = keywords.map(k => k.name.toLowerCase())
        }

        // query for the stories
        this.props.queryStories(queryString.stringify(filterOpts, { arrayFormat: 'bracket' }))
    }
    render() {
        // console.log(this.state)
        return(
            <div className="stories-filter">
                <a href="#" onClick={this.toggleCollapse} className="toggle-link">
                    <Icon name="bars" />
                    <span className="toggle-link-text">Filter</span>
                </a>
                <div className="hspace"></div>
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
                                        <Keywords
                                            keywords={this.state.keywords}
                                            addKeyword={this.addKeyword}
                                            removeKeyword={this.removeKeyword} />
                                    </div>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col md="12">
                                    {/* To use a block button or normal...? */}
                                    <Button
                                        onClick={this.submitFilterOpts}
                                        color="primary"
                                        size="lg"
                                        block>
                                            Update
                                    </Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        )
    }
}
