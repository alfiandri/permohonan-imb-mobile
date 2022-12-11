import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../redux/actions/profileAction';
import { GET, isEmpty, POST, Toast } from '../utils';
import { logOut } from '../utils/common';
import { CustomError } from '../utils/handleResponse';

const FETCH = axios.CancelToken.source();

export const useProfile = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const profileRedux = useSelector(s => s.profile);
  const dispatch = useDispatch();

  const fetchData = async () => {
    setLoading(true);
    try {
      try {
        FETCH?.cancel();
      } catch (fetch_error) {}
      const res = await GET({
        url: '/user/profile',
        any: {CancelToken: FETCH.token},
      });
      const result = res.data;

      if (result.result == 'success') {
        // console.log(JSON.stringify(result, 0, 2));
        if (Object.keys(result.data).length > 0) {
          setData(last => (last = result.data));
          dispatch(setProfile(result.data));
        }
      } else {
        throw new CustomError();
      }
    } catch (error) {
      setErr(true);
      setErrMessage(error?.message);
    }
    setLoading(false);
    return;
  };

  const doRefresh = async () => {
    setRefreshing(true);
    setData({});
    setLoading(false);
    setErr(false);
    setErrMessage('');
    await fetchData();
    setRefreshing(false);
  };

  const logout = async () => {
    try {
      const res = await POST({url: 'auth/logout'});
      const result = res.data;

      if (result.result == 'success') {
        Toast('Berhasil logout');
        await logOut();
      } else {
        throw new CustomError({
          message: result.title,
          user_message: result.title,
        });
      }
    } catch (error) {
      console.log('[logout] is error ', error);
      if (isEmpty(error.user_message)) {
        error.user_message = 'Maaf, terjadi kesalahan saat memuat profile';
      }
      Toast(error.user_message);
    }
  };

  const checkingLocalData = React.useCallback(() => {
    if (!isEmpty(profileRedux)) {
      setData(last => (last = profileRedux));
    } else {
      fetchData();
    }
  }, []);

  useEffect(() => {
    checkingLocalData();
    return () => {
      try {
        FETCH?.cancel();
      } catch (error) {}
    };
  }, []);

  return {
    data,
    loading,
    refreshing,
    err,
    errMessage,
    setLoading,
    doRefresh,
    logout,
  };
};
