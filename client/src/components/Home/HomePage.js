
import '../../styles/partials/home-page.scss'
import React, { Component } from 'react'

import {
    Head,
    Description,
    Outlets
} from './'

export default class HomePage extends Component {
    constructor() {
        super()
        this.state = {}
    }
    componentWillMount() {}
    render() {
        return(
            <div className="page-content home-page">
                <Head />
                <Description />
                <Outlets />
            </div>
        )
    }
}
