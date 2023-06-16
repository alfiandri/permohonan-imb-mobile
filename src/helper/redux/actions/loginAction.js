import { LOGOUT, SET_LOGIN } from '../types';

export const setLogin = ({token = null, tipe = null}) => ({
  type: SET_LOGIN,
  data: {
    token,
    tipe,
  },
});

export const logoutUser = () => ({type: LOGOUT});
