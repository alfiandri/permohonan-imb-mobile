import { RESET_PROFILE, SET_PROFILE } from '../types';

const initialState = {
    email: null,
    id: null,
    name: null,
    photo: null,
    tipe: null,
    updated_at: null,
    username: null,
};

const profileReducer = (state = initialState, {data = {}, type = ''}) => {
    const {email = null, id = null, name = null, photo = null, tipe = null, updated_at = null, username = null} = data;
    switch (type) {
        case SET_PROFILE:
            return {
                ...state,
                ...data,
                email,
                id,
                name,
                photo,
                tipe,
                updated_at,
                username,
            };

        case RESET_PROFILE:
            return initialState;

        default:
            return state;
    }
};

export default profileReducer;
