import React from 'react';
import store from '../../store';
import getDataService from '../../services/get_data_service';
import {Table} from 'react-bootstrap';
import actionType from '../../models/action_types';

class Customers extends React.Component {
    unsubscribe = null;
    // componentWillMount() {
    //     this._ismounted = false;
    // }

    componentDidMount() {
        // this._ismounted = true;
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
        this.getCustomersLIst()
    }

    async getCustomersLIst() {
        // if (this.state._ismounted) {
            const customers = await getDataService.getCustomers();
            const action = {
                type: actionType.addCustomersList,
                customers: customers
            };
            store.dispatch(action);
            console.log(store.getState()['reducer']['allCustomers']);
        // }
    }

    // renderTable() {
    //     let data = store.getState()['reducer']['allCustomers'];
    //     let rows = [];
    //     if (data.length) {
    //         rows = data.map(x => {
    //             return (
    //                 <tr>
    //                     <td></td>
    //                 </tr>
    //             )
    //         })
    //     }
    //
    // }

    render () {
        // let table = this.renderTable();
        return (
            <div>
                Customers
            </div>
        )
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
}
export default Customers;
