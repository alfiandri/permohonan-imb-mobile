import {ADD_FILTER, RESET_FILTER} from '../types';

export const addFilter = ({list_kapal = [], dibayar_dengan = []}) => ({
    type: ADD_FILTER,
    data: {list_kapal, dibayar_dengan},
});

export const resetFilter = () => ({type: RESET_FILTER});
