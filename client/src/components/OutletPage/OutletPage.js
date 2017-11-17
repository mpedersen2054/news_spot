
import React, { Component } from 'react'

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
