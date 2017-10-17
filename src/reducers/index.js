/**
 * Created by golushko.p on 29.09.2017.
 */
import {combineReducers} from 'redux';
import cryptoReducer from './crypto-reducer';
const reducers = combineReducers({
    cryptoReducer
});
export default reducers;