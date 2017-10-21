/**
 * Created by golushko.p on 29.09.2017.
 */
import actionTypes from '../models/action_types';

const initialState = {
    'allCustomers': [],
    'allProducts': []
};
const cryptoReducer  = function (state = initialState, action) {
    let newState = state;

    switch (action.type) {
        case actionTypes.addCustomersList:
            newState.allCustomers.push(action['customer']);
            return newState;
        case actionTypes.deleteCustomer:
            newState.allCustomers = newState.allCustomers.filter(x => {
                return x.id!==action.id
            });
            return newState;
        case actionTypes.addProduct:
            newState.allProducts.push(action['product']);
            return newState;
        case actionTypes.deleteProduct:
            newState.allProducts = newState.allProducts.filter(x => {
                return x.id!==action.id
            });
            return newState;
        case actionTypes.clearStore:
            newState = {
                allProducts: [],
                allCustomers: []
            };
            return newState;
        default:
            return newState;

    }
};
export default cryptoReducer;