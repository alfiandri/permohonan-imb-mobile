/* eslint-disable react-native/no-inline-styles */
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { ActivityIndicator, Platform, TextInput, View } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { Button, Modal } from '../../../global/components';
import _, { COLORS } from '../../../global/styles';
import { isEmpty, Toast } from '../../../helper/utils';

export default forwardRef(
  /**
   * @param {import('react-native').TextInputProps} props
   */
  (props, ref) => {
    const {
      label,
      editable = true,
      disableForm = false,
      password = false,
      disableBorder = false,
      onEndEditing = () => {},
      onReset = () => {},
      defaultValue,
      rightLabel,
      containerStyle,
      style,
    } = props;
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const modal = useRef();

  useImperativeHandle(ref, () => ({show}));

  const show = () => {
    try {
      modal.current?.show();
    } catch (error) {
      console.log('error => ', error);
    }
  };

  const cancelModal = () => {
    try {
      modal.current?.close();
    } catch (error) {
      console.log('[cancelModal] is error ', error);
    }
  };

  const getPermission = async (type = 'camera') => {
    try {
      switch (type) {
        case 'camera':
          return await check(
            Platform.OS == 'android'
              ? PERMISSIONS.ANDROID.CAMERA
              : PERMISSIONS.IOS.CAMERA,
          );
        case 'galery':
          return await check(
            Platform.OS == 'android'
              ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
              : PERMISSIONS.IOS.PHOTO_LIBRARY,
          );
        default:
          return RESULTS.DENIED;
      }
    } catch (error) {
      console.log('[getPermission]  is error ', error);
      return false;
    }
  };

  const askPermission = async (type = 'camera') => {
    try {
      switch (type) {
        case 'camera':
          return await request(
            Platform.OS == 'android'
              ? PERMISSIONS.ANDROID.CAMERA
              : PERMISSIONS.IOS.CAMERA,
          );
        case 'galery':
          return await request(
            Platform.OS == 'android'
              ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
              : PERMISSIONS.IOS.PHOTO_LIBRARY,
          );
        default:
          return RESULTS.DENIED;
      }
    } catch (error) {
      console.log('[askPermission] is error ', error);
      return RESULTS.DENIED;
    }
  };

  const permissionStatus = async (type = 'camera') => {
    try {
      // Check status
      let status = await getPermission(type);

      if (status == RESULTS.UNAVAILABLE) {
        return Toast('Tidak dapat membuka ' + type);
      }
      while (status != RESULTS.GRANTED && status != RESULTS.LIMITED) {
        status = await askPermission(type);
      }

      if (type == 'camera') {
        openCamera();
      } else {
        openGalery();
      }
    } catch (error) {
      console.log('[permissionStatus] is error ', error);
    }
  };

  const openCamera = async () => {
    try {
      const image = await ImageCropPicker.openCamera({
        cropping: true,
        compressImageQuality: 0.9,
        mediaType: 'photo',
        includeBase64: true,
      });

      if (!isEmpty(image?.data)) {
        updatePhoto(`data:${image.mime};base64,${image.data}`);
      } else {
        throw new Error('Data base64 pada image tidak tersedia');
      }
    } catch (error) {
      console.log('[openCamera] is error ', error);
      if (error.message.match(/cancelled/)) {
        return;
      }
      Toast('Tidak dapat membuka Kamera');
    }
  };

  const openGalery = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
        mediaType: 'photo',
        compressImageQuality: 0.5,
        includeBase64: true,
      });

      if (!isEmpty(image?.data)) {
        updatePhoto(`data:${image.mime};base64,${image.data}`);
      } else {
        throw new Error('Data base64 pada image tidak tersedia');
      }
    } catch (error) {
      console.log('[openGalery] is error ', error);
      if (error.message.match(/cancelled/)) {
        return;
      }
      Toast('Tidak dapat membuka Galery');
    }
  };

  const updatePhoto = async photo => {
    setLoading(true);
    cancelModal();
    setFile(photo);
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <View
          style={[
            _.absoluteFull,
            _.itemsCenter,
            _.contentCenter,
            _.bgColor('#00000050'),
            {zIndex: 10},
          ]}>
          <ActivityIndicator
            size={Platform.OS == 'ios' ? 'small' : 'large'}
            color={COLORS.white}
          />
        </View>
      )}
      {file && (
        <View>
          <TextInput ref={attachmentRef} value={file} />
        </View>
      )}
      <Modal ref={modal}>
        <View style={[_.ph_2]}>
          <Button
            onPress={permissionStatus.bind(this, 'camera')}
            color="transparent"
            icon="camera"
            textColor="greyDark"
            weight="medium"
            style={{borderBottomWidth: 1, borderBottomColor: COLORS.grey}}>
            Kamera
          </Button>
          <Button
            onPress={permissionStatus.bind(this, 'galery')}
            color="transparent"
            icon="images"
            textColor="greyDark"
            weight="medium">
            Galeri
          </Button>
        </View>
      </Modal>
    </>
  );
});
