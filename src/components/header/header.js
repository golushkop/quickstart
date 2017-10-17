import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';
import sitePaths from '../../models/paths';
// import {LinkContainer} from 'react-router-bootstrap'
// import from 'reac'

class Header extends Component {
    render () {
        return (
            <div className="app-header">
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand><Link to="/">Invoice App</Link></Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem><NavLink to={sitePaths.invoice} activeClassName="active">Invoices</NavLink></NavItem>
                        <NavItem><NavLink to={sitePaths.products} activeClassName="active">Products</NavLink></NavItem>
                        <NavItem><NavLink to={sitePaths.customers} activeClassName="active">Customers</NavLink></NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}
export default Header;