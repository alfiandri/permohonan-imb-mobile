import {isEmpty} from '../../utils';
import {ADD_FILTER, RESET_FILTER} from '../types';

const initialState = {
    list_kapal: [],
    dibayar_dengan: [],
};

const filterReducer = (state = initialState, {data = {}, type = ''}) => {
    let {list_kapal = [], dibayar_dengan = []} = data;

    switch (type) {
        case ADD_FILTER:
            list_kapal = filterSelection(list_kapal);
            dibayar_dengan = filterSelection(dibayar_dengan);
            return {
                ...state,
                list_kapal,
                dibayar_dengan,
            };

        case RESET_FILTER:
            return initialState;

        default:
            return state;
    }
};

const filterSelection = (filter = []) => filter.filter(s => !isEmpty(s.id));

export default filterReducer;
