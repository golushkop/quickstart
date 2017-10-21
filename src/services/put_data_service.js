import axios from 'axios';
import sitePaths from '../models/paths';
let serverAddress = sitePaths.serverAdres;
export default class putDataService {
    static async createCustomer(customer) {
        const response = await axios.post(serverAddress + sitePaths.api_customers, customer);
        return response.data;
    }
    static async createProduct(product) {
        const response = await axios.post(serverAddress + sitePaths.api_products, product);
        return response.data;
    }
}