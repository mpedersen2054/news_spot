
import React, { Component } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap'
import { Icon } from 'react-fa'

export default class Navigation extends Component {
    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this)
        this.state = {
            isOpen: false
        }
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render() {
        return (
            <div>
                <Navbar color="light" fixed="top" light expand="md">
                    <Container>
                        <NavbarBrand href="/">
                            <Icon name="home" size="lg" />
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="/outlets">Outlets</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/api">API</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/feed">Feed</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}
