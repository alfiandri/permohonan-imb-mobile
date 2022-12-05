import {useRoute} from '@react-navigation/native';
import {unionBy} from 'lodash';
import moment from 'moment';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addFilter} from '../redux/actions/filterAction';
import {GET, isEmpty} from '../utils';
import {CustomError} from '../utils/handleResponse';
import {TYPE} from './report';

export const useFilter = () => {
    const {data: paramsData} = useRoute()?.params;
    const {filter_kapal = '', filter_dibayar = ''} = paramsData;

    const [ship, setShip] = useState(null);
    const idUsaha = paramsData.id;
    const [method, setMethod] = useState(null);
    const [shipList, setShipList] = useState([]);
    const [methodList, setMethodList] = useState([]);
    const [firstDate, setFirstDate] = useState(new Date(moment().startOf('month')));
    const [lastDate, setLastDate] = useState(new Date(moment().endOf('month')));

    const [loading, setLoading] = useState(false);

    const {list_kapal = [], dibayar_dengan = []} = useSelector(s => s.filter);
    const dispatch = useDispatch();

    const checkLocalData = () => {
        const allShip = list_kapal.find(s => s.id == paramsData.id)?.filter;
        const allMethod = dibayar_dengan.find(s => s.id == paramsData.id)?.filter;

        // console.log(JSON.stringify({allShip, allMethod, list_kapal, dibayar_dengan}, 0, 2));

        if (!isEmpty(allShip)) {
            setShip(last => (last = allShip[0]));
            setShipList(last => (last = allShip));
        }

        if (!isEmpty(allMethod)) {
            setMethod(last => (last = allMethod[0]));
            setMethodList(last => (last = allMethod));
        }

        if (isEmpty(allShip) && isEmpty(allMethod)) {
            getData();
        }
    };

    const fetchData = async (url = '') => {
        try {
            const res = await GET({url});
            const result = res.data;
            // console.log('fetch ==> ', JSON.stringify(result, 0, 2));
            if (result.result == 'success') {
                if (!isEmpty(result.data)) {
                    return result.data;
                }
            } else {
                throw new CustomError({message: result.title, user_message: result.title});
            }
        } catch (error) {
            return [];
        }
    };

    const getData = async () => {
        setLoading(true);
        try {
            const _ship = await fetchData(!isEmpty(filter_kapal) ? filter_kapal : `${TYPE[paramsData.id]}/list-kapal`);
            const _method = await fetchData(!isEmpty(filter_dibayar) ? filter_dibayar : `${TYPE[paramsData.id]}/list-paidby`);

            const filter = {
                list_kapal,
                dibayar_dengan,
            };

            if (_ship.length > 0) {
                setShip(_ship[0]);
                setShipList(last => (last = _ship));
                filter.list_kapal = unionBy(filter.list_kapal, [{id: paramsData?.id, filter: _ship}], 'id');
            }

            if (_method.length > 0) {
                setMethod(_method[0]);
                setMethodList(last => (last = _method));
                filter.dibayar_dengan = unionBy(filter.dibayar_dengan, [{id: paramsData?.id, filter: _method}], 'id');
            }

            // console.log(JSON.stringify({filter, _ship, _method, ship: _ship.length > 0, method: _method.length > 0}, 0, 2));
            dispatch(addFilter(filter));
        } catch (error) {}
        setLoading(false);
    };

    return {
        ship,
        method,
        shipList,
        methodList,
        firstDate,
        lastDate,
        setShip,
        setMethod,
        setFirstDate,
        setLastDate,
        loading,
        getData,
        checkLocalData,
        idUsaha,
    };
};
