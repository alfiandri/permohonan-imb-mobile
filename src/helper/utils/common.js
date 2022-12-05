import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native';
import { store } from '../../..';
import { STORAGEKEYS } from '../../env';
import { resetHome } from '../redux/actions/homeAction';
import { logoutUser } from '../redux/actions/loginAction';
import { resetProfile } from '../redux/actions/profileAction';

export const screenWidth = Dimensions.get('screen').width;
export const screenHeight = Dimensions.get('screen').height;

export const isEmpty = value => {
  let result = true;
  if (value != undefined || value != null) {
    if (typeof value === 'string' && value != '') {
      result = false;
    } else if (typeof value === 'number' && value > 0) {
      result = false;
    } else if (typeof value === 'object' && Object.keys(value).length > 0) {
      result = false;
    } else if (Array.isArray(value) && value.length > 0) {
      result = false;
    }
  }

  return result;
};

export const isTrue = value => {
  let result = false;
  if (typeof value === 'boolean' || typeof value === 'number') {
    result = value == true || value == 1;
  }
  return result;
};

export const logOut = async () => {
  await AsyncStorage.multiRemove([STORAGEKEYS.authToken]);
  store.dispatch(logoutUser());
  store.dispatch(resetHome());
  store.dispatch(resetProfile());
};
