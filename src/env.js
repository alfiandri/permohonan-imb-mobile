/**
 * @author Alfiandri Putra Perdana <alfiandri.putra@gmail.com>
 * @file Global configuration like app name, endpoint, key, and etc.
 */

import deviceInfoModule from 'react-native-device-info';

// config endpoint
const uri = 'https://melapor.sibolgakota.go.id/api/';
// const uri = 'http://127.0.0.1:8002/api/';
// console.log(uri);
// config store
const keys = {
  authToken: '@authToken',
};

/**
 * ==============EXPORT DEFAULT==============
 */

export const APP_NAME = 'Melapor';
export const APP_DESCRIPTION = 'Melapor Sibolga';
export const APP_VERSION = deviceInfoModule.getVersion();
export const APP_BUILD = deviceInfoModule.getBuildNumber();
export const ENDPOINT = uri;
export const STORAGEKEYS = keys;

/**
 * ==============EXPORT DEFAULT==============
 */
