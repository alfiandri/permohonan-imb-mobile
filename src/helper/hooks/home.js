import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { STORAGEKEYS } from '../../env';
import { setHome } from '../redux/actions/homeAction';
import { setLogin } from '../redux/actions/loginAction';
import { setProfile } from '../redux/actions/profileAction';
import { GET, isEmpty } from '../utils';
import { logOut } from '../utils/common';
import { CustomError } from '../utils/handleResponse';

let FETCH = axios.CancelToken?.source();

export const useHome = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const {listReport: reduxDataHome = []} = useSelector(s => s.home);
  const dispatch = useDispatch();

  const fetchData = async () => {
    setLoading(true);
    try {
      try {
        FETCH?.cancel();
      } catch (fetch_error) {}
      const res = await GET({
        url: 'data/home',
        any: {CancelToken: FETCH.token},
      });

      const result = res.data;

      if (result.result == 'success') {
        let profile = result?.data.profile;
        profile = profile?.data;

        if (!isEmpty(profile)) {
          // dispatch profile
          dispatch(setProfile(profile));
        }

        const resReport = await GET({
          url: 'report',
          any: {CancelToken: FETCH.token},
        });
        const resultReport = resReport.data;

        if (resultReport.result == 'success') {
          dispatch(setHome({resultReport}));
          setData(last => (last = resultReport));
        }

        // set new token
        const token = await AsyncStorage.getItem(STORAGEKEYS.authToken);
        dispatch(setLogin({token, tipe: profile?.tipe}));
      } else {
        throw new CustomError({
          message: result.title,
          user_message: result.title,
        });
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
    if (!isEmpty(reduxDataHome)) {
      setData(last => (last = reduxDataHome));
    } else {
      fetchData();
    }
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
