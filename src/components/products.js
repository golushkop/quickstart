import React, {Component} from 'react';
import store from '../store';
import getDataService from '../services/get_data_service';
import action from '../models/action_types';
import {Table, PageHeader, Button, Modal, Form, FormControl, FormGroup} from 'react-bootstrap';
import putDataService from '../services/put_data_service';
import deleteDataService from  '../services/delete_data_service';

class Products extends Component {
    unsubscribe = null;

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            showDeleteModal: false,
            name: '',
            price: '',
            id: ''
        };
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
        this.getProductsLIst()
    }

    clearStore() {
        const clearAction = {type: action.clearStore};
        store.dispatch(clearAction)
    }

    async getProductsLIst() {
        await this.clearStore();
        let products = null;
        try {
            products = await getDataService.getProducts();
        }
        catch(err) {
            console.error('Downloading products list is not completed')
        }
        if (products) {
            products.forEach(x => {
                this.addProductToStore(x)
            });

        }
    }

    addProductToStore(x) {
        const addAction = {
            type: action.addProduct,
            product: x
        };
        store.dispatch(addAction);
    }

    async createProduct() {
        this.closeModal();
        const product = {
            name: this.state.name,
            price: this.state.price
        };
        let create = await putDataService.createProduct(product);
        debugger;
        this.addProductToStore(create)
    }

    async deleteProduct() {
        this.closeModal();
        const id = this.state.id;
        let deleteProduct = await deleteDataService.deleteProduct(id);
        const actionDelete = {
            type: action.deleteProduct,
            id: id
        };
        store.dispatch(actionDelete)
    }

    showModal() {
        this.setState({
            showModal: true,
            name: '',
            price: ''
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


    renderProductsList() {
        let rows = null;
        const products = store.getState()['reducer']['allProducts'];
        if (products && products.length) {
            let counter = 0;
            rows = products.map((x, ind) => {
                counter++;
                return (
                    <tr key={ind} onClick={this.showDeleteModal.bind(this, x)}>
                        <td>{counter}</td>
                        <td>{x.name}</td>
                        <td>{x.price}</td>
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
                    <Modal.Title>Insert new product details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FormGroup>
                            <FormControl id="name" placeholder="Name" type="text"
                                         value={this.state['name']} onChange={this.handleChange.bind(this)}/>
                        </FormGroup>
                        <FormGroup>
                            <FormControl id="price" placeholder="Price" value={this.state['price']} onChange={this.handleChange.bind(this)}/>
                        </FormGroup>
                    </Form>
                    <Button onClick={this.createProduct.bind(this)}>Confirm</Button>
                </Modal.Body>
            </Modal>

        )
    }

    renderDeleteModal() {
        return (
            <Modal show={this.state.showDeleteModal} onHide={this.closeModal.bind(this)}>
                <Modal.Header closeButton>Are you sure you want to delete product: {this.state['name']}</Modal.Header>
                <div className="button-div">
                    <Button onClick={this.deleteProduct.bind(this)}>Confirm</Button>
                </div>
            </Modal>
        )
    }

    render () {
        const table = this.renderProductsList();
        const modalWindow = this.renderCreateModal();
        const deleteModalWindow = this.renderDeleteModal();
        return (
            <div className="products">
                <div>
                    <PageHeader className="product-page-header">
                        <div className="product-list">Product list</div>
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
export default Products;
