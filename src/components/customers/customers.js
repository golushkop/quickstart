import React, {Component} from 'react';
import store from '../../store';
import getDataService from '../../services/get_data_service';

class Customers extends Component {

    componentDidMount() {
        store.subscribe(() => this.forceUpdate());
        this.getCustomersLIst()
    }

    async getCustomersLIst() {
        let customers = await getDataService.getCustomers();
        console.log(customers);
    }

    render () {
        return (
            <div>
                Customers
            </div>
        )
    }
}
export default Customers;
