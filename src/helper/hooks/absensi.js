import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Linking } from 'react-native';
import { GET, isEmpty, Toast } from '../utils';
import { CustomError } from '../utils/handleResponse';

export const useReport = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [err, setErr] = useState(false);
    const [errMessage, setErrMessage] = useState();

    const paramsRef = useRef({
        paid: '-',
        outlet: '-',
        start_date: moment().startOf('month').format('YYYY-MM-DD'),
        end_date: moment().endOf('month').format('YYYY-MM-DD'),
    });

    const fetchData = React.useCallback(async () => {
        setLoading(true);
        try {
            const res = await GET({url: 'absensi/reports', params: paramsRef.current});
            const result = res?.data;
            if (result.result == 'success') {
                if (!isEmpty(result.data)) {
                    setData(last => (last = result.data));
                }
            } else {
                throw new CustomError({message: result.title, user_message: result.title});
            }
        } catch (error) {
            console.log('[fetchData] is error ', error.user_message);
            if (isEmpty(error.user_message)) {
                error.user_message = 'Terjadi kesalahan saat memuat laporan';
            }
            setErr(true);
            setErrMessage(error.user_message);
        }
        setLoading(false);
        return;
    }, []);

    const doRefresh = async () => {
        setRefreshing(true);
        paramsRef.current = {
            paid: '-',
            outlet: '-',
            start_date: moment().startOf('month').format('YYYY-MM-DD'),
            end_date: moment().endOf('month').format('YYYY-MM-DD'),
        };
        setData([]);
        setErr(false);
        setErrMessage();
        await fetchData();
        setRefreshing(false);
    };

    const openLink = async (apiURL = '') => {
        try {
            const isValid = await Linking.canOpenURL(apiURL);
            if (isValid) {
                Linking.openURL(apiURL);
            } else {
                throw new CustomError({message: 'Terjadi kesalahan saat membuka tautan', user_message: 'Terjadi kesalahan saat membuka tautan'});
            }
        } catch (error) {
            console.log('[openLink] is error ', error);
            if (isEmpty(error.user_message)) {
                error.user_message = 'Terjadi kesalahan saat memuat laporan';
            }
            Toast('Gagal membuka tautan', 'Terjadi kesalahan saat membuka tautan');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {
        data,
        loading,
        refreshing,
        err,
        errMessage,
        paramsRef,
        fetchData,
        doRefresh,
        openLink,
    };
};
