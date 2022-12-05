import { combineReducers, createStore } from 'redux';
import filterReducer from './reducers/filterReducers';
import homeReducers from './reducers/homeReducers';
import loginReducer from './reducers/loginReducers';
import profileReducer from './reducers/profileReducers';

const rootReducer = combineReducers({
  login: loginReducer,
  home: homeReducers,
  profile: profileReducer,
  filter: filterReducer,
});

export default () => createStore(rootReducer);
