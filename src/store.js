/**
 * Created by golushko.p on 29.09.2017.
 */
import {createStore} from 'redux';
import reducers from './reducers';
const store = createStore(reducers);
export default store;
