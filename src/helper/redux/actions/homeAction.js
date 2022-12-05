import { RESET_HOME, SET_HOME } from '../types';

export const setHome = ({listReport = []}) => ({
    type: SET_HOME,
    data: {listReport},
});

export const resetHome = () => ({type: RESET_HOME});
