import axios from 'axios';
import sitePaths from '../models/paths';
let serverAddress = sitePaths.serverAdres;
export default class getDataService {
    static async getCustomers() {
        const response = await axios.get(serverAddress + sitePaths.api_customers);
        return response.data;
    }
    static async getProducts() {
        const response = await axios.get(serverAddress + sitePaths.api_products);
        return response.data;
    }
}