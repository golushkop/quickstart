import React, {Component} from 'react';
import store from '../../store';
import getDataService from '../../services/get_data_service';
import action from '../../models/action_types';

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
        const customers = store.getState()['reducer']['customers'];
        if (customer.length) {
            let counter = 0;
            rows = customers.map(x => {
                counter++;
                return (
                    <tr>
                        <td>{counter}</td>
                        <td>{x.name}</td>
                        <td>{x.address}</td>
                        <td>{x.phone}</td>
                    </tr>
                )
            });
        }
        return rows;
    }

    render () {
        const rows = this.renderCustomersList();
        return (
            <div>
                <table>
                    <thead>
                        <tr>

                        </tr>
                    </thead>
                </table>
            </div>
        )
    }

    componentWillUnmount() {
        this.unsubscribe()
    }
}
export default Customers;
