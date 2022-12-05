import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGEKEYS } from '../../../env';
import { LOGOUT, SET_LOGIN } from '../types';

const initialState = {
  token: null,
  loading: true,
  role: null,
};

const loginReducer = (state = initialState, {data = {}, type = ''}) => {
  const {token = null, role = ''} = data;
  switch (type) {
    case SET_LOGIN:
      if (!token) {
        return;
      }

      AsyncStorage.setItem(STORAGEKEYS.authToken, token);
      return {
        token,
        role,
        loading: false,
      };
    case LOGOUT:
      AsyncStorage.clear();
      return {
        ...initialState,
        loading: false,
      };
    default:
      return state;
  }
};

export default loginReducer;
