import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { STORAGEKEYS } from '../../env';
import { setHome } from '../redux/actions/homeAction';
import { GET, isEmpty } from '../utils';
import { logOut } from '../utils/common';

let FETCH = axios.CancelToken?.source();

export const useMyReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const dispatch = useDispatch();

  const fetchData = async () => {
    setLoading(true);
    try {
      const resReport = await GET({
        url: 'my-report',
        any: {CancelToken: FETCH.token},
      });
      const resultReport = resReport.data;

      if (resultReport.result == 'success') {
        dispatch(setHome({resultReport}));
        setData(last => (last = resultReport));
      }
    } catch (error) {
      setErr(true);
      if (isEmpty(error.user_message)) {
        error.user_message = 'Maaf, terjadi kesalahan saat memuat data';
      }
      setErrMessage(error.user_message);
    }
    setLoading(false);
    return;
  };

  const doRefresh = async () => {
    setRefreshing(true);
    setData([]);
    setErr(false);
    setErrMessage('');
    await fetchData();
    setRefreshing(false);
  };

  const checkingLocalData = React.useCallback(async () => {
    const token = await AsyncStorage.getItem(STORAGEKEYS.authToken);
    // check token
    if (isEmpty(token)) {
      logOut();
    }

    fetchData();
  }, []);

  useEffect(() => {
    checkingLocalData();

    return () => {
      try {
        try {
          FETCH?.cancel();
        } catch (fetch_error) {}
      } catch (error) {}
    };
  }, []);

  return {
    data,
    loading,
    refreshing,
    err,
    errMessage,
    doRefresh,
  };
};
