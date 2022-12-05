import {RESET_HOME, SET_HOME} from '../types';

const initialState = {
  list_usaha: [],
};

const homeReducer = (state = initialState, {data = {}, type = ''}) => {
  const {list_usaha = []} = data;
  switch (type) {
    case SET_HOME:
      return {list_usaha};

    case RESET_HOME:
      return initialState;

    default:
      return state;
  }
};

export default homeReducer;
