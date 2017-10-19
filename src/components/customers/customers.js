import React, {Component} from 'react';
import store from '../../store';
import getDataService from '../../services/get_data_service';
import action from '../../models/action_types';
import {Table, PageHeader, Button} from 'react-bootstrap';

class Customers extends Component {
    unsubscribe = null;

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
        this.getCustomersLIst()
    }

    async getCustomersLIst() {
        let customers = await getDataService.getCustomers();
        const addAction = {
            type: action.addCustomersList,
            customers: customers
        };
        store.dispatch(addAction);
        console.log(store.getState());
    }

    renderCustomersList() {
        let rows = null;
        const customers = store.getState()['reducer']['allCustomers'];
        if (customers && customers.length) {
            let counter = 0;
            rows = customers.map((x, ind) => {
                counter++;
                return (
                    <tr key={ind}>
                        <td>{counter}</td>
                        <td>{x.name}</td>
                        <td>{x.address}</td>
                        <td>{x.phone}</td>
                    </tr>
                )
            });
        }
        const header = (
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th> </th>
                </tr>
            </thead>
        );
        const table = (
            <Table>
                {header}
                <tbody>
                    {rows}
                </tbody>
            </Table>
        );
        return table;
    }

    render () {
        const table = this.renderCustomersList();
        return (
            <div className="customers">
                <div>
                    <PageHeader class="customer-page-header">
                        <div className="customer-list">Customer list</div>
                        <Button className="create">Create</Button>
                    </PageHeader>
                </div>
                <div>
                    {table}
                </div>
            </div>
        )
    }

    componentWillUnmount() {
        this.unsubscribe()
    }
}
export default Customers;
