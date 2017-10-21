import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import sitePaths from '../models/paths';
import {LinkContainer} from 'react-router-bootstrap'

class Header extends Component {

    render () {
        return (
            <div className="app-header">
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand><Link to="/">Invoice App</Link></Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <LinkContainer to={sitePaths.invoice}>
                            <NavItem eventKey={1}>Invoices</NavItem>
                        </LinkContainer>
                        <LinkContainer to={sitePaths.products}>
                            <NavItem eventKey={2}>Products</NavItem>
                        </LinkContainer>
                        <LinkContainer to={sitePaths.customers}>
                            <NavItem eventKey={3}>Customers</NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}
export default Header;