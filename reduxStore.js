import { createStore } from 'redux';
import reducer from './reducers/index';

const store = createStore(reducer);

export default store;

// Mock redux store
// {
//   location: 'Seattle, WA',   <-- handled by combineReducers
//   animal: 'dog'
// }
