import React, {Component} from 'react';
import {BrowserRouter, Route, Router} from 'react-router-dom';
import Header from './header/header';
import '../styles/main.scss';
import sitePaths from '../models/paths';
import Customers from './customers/customers';

class Components extends Component {

    render () {
        return (
            <div>
                <BrowserRouter>
                    {/*<Router>*/}
                        <div>
                            <Header/>
                            <Route path={sitePaths.customers} component={Customers}/>
                        </div>
                    {/*</Router>*/}
                </BrowserRouter>
            </div>
        )
    }
}
export default Components;