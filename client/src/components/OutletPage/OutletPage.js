
import React, { Component } from 'react'
import axios from 'axios'
import { Container } from 'reactstrap'

import Outlets from '../Home/Outlets'

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
                <Container>
                    hello outlet {id}
                </Container>
            </div>
        )
    }
}
