
import React, { Component } from 'react'
import Outlets from '../Home/Outlets'
import axios from 'axios'

export default class OutletPage extends Component {
    constructor() {
        super()
        this.state = {}
    }
    render() {
        const id = this.props.match.params.id
        console.log(id)
        return(
            <div className="page-content outlet-page">
                hello single outlet!
            </div>
        )
    }
}
