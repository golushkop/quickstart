import axios from 'axios';
import sitePaths from '../models/paths';
let serverAddress = sitePaths.serverAdres;
export default class getDataService {
    static async getCustomers() {
        const response = await axios.get(serverAddress + sitePaths.getCustomers);
        return response.data;
    }
}