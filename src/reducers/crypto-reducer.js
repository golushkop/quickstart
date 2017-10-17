/**
 * Created by golushko.p on 29.09.2017.
 */
import actionTypes from '../models/action_types';

const initialState = {
    'allCustomers': []
};
const cryptoReducer  = function (state = initialState, action) {
    let newState = state;

    switch (action.type) {
        case actionTypes.addCustomersList:
            newState.allCustomers = action['customers'];
            return newState;
        default:
            return newState;

    }
};
export default cryptoReducer;