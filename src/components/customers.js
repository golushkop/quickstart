import React, {Component} from 'react';
import store from '../store';
import getDataService from '../services/get_data_service';
import action from '../models/action_types';
import {Table, PageHeader, Button, Modal, Form, FormControl, FormGroup} from 'react-bootstrap';
import putDataService from '../services/put_data_service';
import deleteDataService from  '../services/delete_data_service';

class Customers extends Component {
    unsubscribe = null;

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            showDeleteModal: false,
            name: '',
            address: '',
            phone: ''
        };
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
        this.getCustomersLIst()
    }

    clearStore() {
        const clearAction = {type: action.clearStore};
        store.dispatch(clearAction)
    }

    async getCustomersLIst() {
        await this.clearStore();
        let customers = null;
        try {
            customers = await getDataService.getCustomers();
        }
        catch(err) {
            console.error('Downloading cutomers list is not completed')
        }
        if (customers) {
            customers.forEach(x => {
                this.addCustomerToStore(x)
            });

        }
    }

    addCustomerToStore(x) {
        const addAction = {
            type: action.addCustomersList,
            customer: x
        };
        store.dispatch(addAction);
    }

    async createCustomer() {
        this.closeModal();
        const customer = {
            name: this.state.name,
            phone: this.state.phone,
            address: this.state.address
        };
        let create = await putDataService.createCustomer(customer);
        this.addCustomerToStore(create)
    }

    async deleteCustomer() {
        this.closeModal();
        const id = this.state.id;
        let deleteCustomer = await deleteDataService.deleteCustomer(id);
        const actionDelete = {
            type: action.deleteCustomer,
            id: id
        };
        store.dispatch(actionDelete)
    }

    showModal() {
        this.setState({
            showModal: true,
            name: '',
            address: '',
            phone: ''
        })
    }

    closeModal() {
        this.setState({
            showModal: false,
            showDeleteModal: false
        });
    }

    handleChange(e) {
        let value = e.target.value;
        const id = e.target.id;
        if (id === 'name' && value.length) {
            value = value.split('');
            value[0] = value[0].toUpperCase();
            value = value.join().replace(new RegExp(',', 'g'), '')
        }
        this.setState({
            [id]: value
        });
        e.preventDefault()
    }

    showDeleteModal(value) {
        this.setState({
            showDeleteModal: true,
            name: value.name,
            id: value.id
        });

    }


    renderCustomersList() {
        let rows = null;
        const customers = store.getState()['reducer']['allCustomers'];
        if (customers && customers.length) {
            let counter = 0;
            rows = customers.map((x, ind) => {
                counter++;
                return (
                    <tr key={ind} onClick={this.showDeleteModal.bind(this, x)}>
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
                    <th>Address</th>
                    <th>Phone</th>
                </tr>
            </thead>
        );
        const table = (
            <Table striped condensed hover>
                {header}
                <tbody>
                    {rows}
                </tbody>
            </Table>
        );
        return table;
    }
    renderCreateModal() {
        return (
            <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Insert new customer details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FormGroup>
                            <FormControl id="name" placeholder="Name" type="text"
                                         value={this.state['name']} onChange={this.handleChange.bind(this)}/>
                        </FormGroup>
                        <FormGroup>
                            <FormControl id="address" placeholder="Address" value={this.state['address']} onChange={this.handleChange.bind(this)}/>
                        </FormGroup>
                        <FormGroup>
                            <FormControl id="phone" placeholder="Phone" value={this.state['phone']} onChange={this.handleChange.bind(this)}/>
                        </FormGroup>
                    </Form>
                    <Button onClick={this.createCustomer.bind(this)}>Confirm</Button>
                </Modal.Body>
            </Modal>

        )
    }

    renderDeleteModal() {
        return (
            <Modal show={this.state.showDeleteModal} onHide={this.closeModal.bind(this)}>
                <Modal.Header closeButton>Are you sure you want to delete customer: {this.state['name']}</Modal.Header>
                <div className="button-div">
                    <Button onClick={this.deleteCustomer.bind(this)}>Confirm</Button>
                </div>
            </Modal>
        )
    }

    render () {
        const table = this.renderCustomersList();
        const modalWindow = this.renderCreateModal();
        const deleteModalWindow = this.renderDeleteModal();
        return (
            <div className="customers">
                <div>
                    <PageHeader className="customer-page-header">
                        <div className="customer-list">Customer list</div>
                        <Button className="create" onClick={this.showModal.bind(this)}>Create</Button>
                    </PageHeader>
                </div>
                <div>
                    {table}
                </div>
                {modalWindow}
                {deleteModalWindow}
            </div>
        )
    }

    componentWillUnmount() {
        this.unsubscribe()
    }
}
export default Customers;
