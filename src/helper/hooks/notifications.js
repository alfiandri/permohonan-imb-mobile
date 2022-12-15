import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { STORAGEKEYS } from '../../env';
import { GET, isEmpty } from '../utils';
import { logOut } from '../utils/common';

let FETCH = axios.CancelToken?.source();

export const useNotification = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const resReport = await GET({
        url: 'notifications',
        any: {CancelToken: FETCH.token},
      });
      const resultReport = resReport.data;
      console.log(resultReport);

      if (resultReport.result == 'success') {
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
