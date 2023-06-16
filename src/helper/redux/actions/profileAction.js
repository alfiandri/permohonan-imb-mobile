import { RESET_PROFILE, SET_PROFILE } from '../types';

export const setProfile = (data = {}) => {
  const {
    email = null,
    id = null,
    name = null,
    photo = null,
    tipe = null,
    updated_at = null,
    username = null,
  } = data;
  return {
    type: SET_PROFILE,
    data: {...data, email, id, name, photo, tipe, updated_at, username},
  };
};

export const resetProfile = () => ({type: RESET_PROFILE});
