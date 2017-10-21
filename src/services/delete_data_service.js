import axios from 'axios';
import sitePaths from '../models/paths';
let serverAddress = sitePaths.serverAdres;
export default class deleteDataService {
    static async deleteCustomer(id) {
        const response = await axios.delete(serverAddress + sitePaths.api_customer_work.replace('customer_id', id));
        return response.data;
    }
    static async deleteProduct(id) {
        const response = await axios.delete(serverAddress + sitePaths.api_product_work.replace('product_id', id));
        return response.data;
    }
}