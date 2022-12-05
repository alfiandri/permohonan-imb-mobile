import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import { Platform } from 'react-native';
import deviceInfoModule from 'react-native-device-info';
import { ENDPOINT, STORAGEKEYS } from '../../env';
import { HandleErrorResponse, HandleSuccessResponse } from './handleResponse';

export const createAxios = async () => {
  const token = await AsyncStorage.getItem(STORAGEKEYS.authToken);
  const os = Platform.OS;
  const os_name = deviceInfoModule.getSystemName();
  const os_version = deviceInfoModule.getSystemVersion();
  const mobile_version = deviceInfoModule.getVersion();
  const mobile_hardware = await deviceInfoModule.getHardware();

  console.log(ENDPOINT);

  const globalConfig = {
    baseURL: ENDPOINT,
    params: {
      os,
      os_name,
      os_version,
      mobile_version,
      mobile_hardware,
    },
    headers: {Accept: 'application/json', Authorization: `Bearer ${token}`},
    maxContentLength: 50 * 1000 * 1000,
    timeout: 60000,
  };

  return Axios.create(globalConfig);
};

export const GET = ({url, params, any}) => {
  return new Promise(async (resolve, reject) => {
    console.log(`${url} with params ${JSON.stringify(params)}`);
    try {
      const api = await createAxios();
      const res = await api.get(url, {params, ...any});

      await HandleSuccessResponse(res).then(resolve).catch(reject);
    } catch (error) {
      await HandleErrorResponse(error).then(resolve).catch(reject);
    }
  });
};

export const POST = ({url, body, any}) => {
  return new Promise(async (resolve, reject) => {
    console.log(`${url} with body ${JSON.stringify(body)}`);
    try {
      const api = await createAxios();
      const res = await api.post(url, body);
      await HandleSuccessResponse(res).then(resolve).catch(reject);
    } catch (error) {
      await HandleErrorResponse(error).then(resolve).catch(reject);
    }
  });
};

export const PUT = ({url, body, any}) => {
  return new Promise(async (resolve, reject) => {
    console.log(`${url} with body ${JSON.stringify(body)}`);
    try {
      const api = await createAxios();
      const res = await api.put(url, body, any);
      await HandleSuccessResponse(res).then(resolve).catch(reject);
    } catch (error) {
      await HandleErrorResponse(error).then(resolve).catch(reject);
    }
  });
};
export const PATCH = ({url, body, any}) => {
  return new Promise(async (resolve, reject) => {
    console.log(`${url} with body ${JSON.stringify(body)}`);
    try {
      const api = await createAxios();
      const res = await api.patch(url, body, any);
      await HandleSuccessResponse(res).then(resolve).catch(reject);
    } catch (error) {
      await HandleErrorResponse(error).then(resolve).catch(reject);
    }
  });
};
export const DELETE = ({url, params, any}) => {
  return new Promise(async (resolve, reject) => {
    console.log(`${url} with params ${JSON.stringify(params)}`);
    try {
      const api = await createAxios();
      const res = await api.delete(url, {params, ...any});
      await HandleSuccessResponse(res).then(resolve).catch(reject);
    } catch (error) {
      await HandleErrorResponse(error).then(resolve).catch(reject);
    }
  });
};
