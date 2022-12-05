import { LOGOUT, SET_LOGIN } from '../types';

export const setLogin = ({token = null, role = null}) => ({
  type: SET_LOGIN,
  data: {
    token,
    role,
  },
});

export const logoutUser = () => ({type: LOGOUT});
