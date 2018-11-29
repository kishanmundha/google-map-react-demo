import { createStore, combineReducers, compose } from 'redux';
import MapReducer from './MapReducer';

// Enable redux dev tool
const middleware = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// fetch persistState from sessionStorage
// As demo we just want to persist on session storage
// and clear once browser close
const persistState = !sessionStorage.getItem('br-codingexamps')
  ? undefined
  : JSON.parse(sessionStorage.getItem('br-codingexamps'));

// Create redux store
const store = createStore(
  combineReducers({
    map: MapReducer,
  }),
  persistState,
  middleware
);

// Listen store change and keep change on sessionStorage
store.subscribe(() => {
  sessionStorage.setItem('br-codingexamps', JSON.stringify(store.getState()));
});

export default store;
