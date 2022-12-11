import { useNavigation } from '@react-navigation/core';
import { Checkbox } from 'galio-framework';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { Platform, ScrollView, View } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import RadioForm from 'react-native-simple-radio-button';
import {
  Button,
  DatePicker,
  Modal,
  OptionPicker,
  Text,
  TextInput
} from '../../global/components';
import _, { COLORS } from '../../global/styles';
import { isEmpty, POST, Toast } from '../../helper/utils';
import { CustomError } from '../../helper/utils/handleResponse';

export default () => {
  const [loading, setLoading] = useState(false);
  const [incidentDate, setIncidentDate] = useState(new Date(moment()));
  const [anonym, setAnonym] = useState(false);
  const [secret, setSecret] = useState(false);
  const [chosenOption, setChosenOption] = useState('ASPIRASI');
  const [file, setFile] = useState(null);
  const modal = useRef();

  const navigation = useNavigation();

  const titleRef = useRef();
  const descriptionRef = useRef();
  const eventLocationRef = useRef();
  const categoryRef = useRef();
  const attachmentRef = useRef();

  const cancelModal = () => {
    try {
      modal.current?.close();
    } catch (error) {
      console.log('[cancelModal] is error ', error);
    }
  };

  //#region Method
  const save = async () => {
    let dataResult = [];
    try {
      const body = {
        title: titleRef.current?.value,
        category_id: categoryRef.current?.value,
        description: descriptionRef.current?.value,
        event_date: incidentDate,
        event_location: eventLocationRef.current?.value,
        type: chosenOption,
        is_anonym: anonym,
        is_secret: secret,
        attachment: file,
      };

      const res = await POST({url: '/report', body});
      const result = res?.data;

      if (result.result === 'success' && res.code === 200) {
        Toast(result.title);
        dataResult = result.data;
      } else {
        throw new CustomError({
          message: result.title,
          user_message: result.title,
        });
      }
    } catch (error) {
      if (isEmpty(error.user_message)) {
        error.user_message = 'Maaf, terjadi kesalahan saat melakukan aksi';
      }
      Toast(error.user_message);
      console.log('[save] is error ', error);
    }
    setLoading(false);
    if (dataResult) {
      navigation.navigate('ReportDetail', {data: dataResult});
    }
  };
  //#endregion Method

  //#region Handler
  const handlerSave = () => {
    setLoading(true);
    try {
      console.log('saving...');
      if (isEmpty(titleRef.current?.value)) {
        titleRef.current?.setErrMessage('Title tidak boleh kosong');
        titleRef.current?.focus();
        setLoading(false);
        return;
      }
      if (isEmpty(descriptionRef.current?.value)) {
        descriptionRef.current?.setErrMessage('Deskripsi tidak boleh kosong');
        descriptionRef.current?.focus();
        setLoading(false);
        return;
      }
      if (isEmpty(eventLocationRef.current?.value)) {
        eventLocationRef.current?.setErrMessage('eventDate tidak boleh kosong');
        eventLocationRef.current?.focus();
        setLoading(false);
        return;
      }
      save();
    } catch (error) {
      console.log('[HandlerSave] is error ', error);
      Toast('Gagal melakukan perubahan, periksa kembali input anda');
      setLoading(false);
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

  //#endregion Handler
  // eslint-disable-next-line no-sparse-arrays
  var radioProps = [
    {label: 'Aspirasi', value: 'ASPIRASI'},
    {label: 'Pengaduan', value: 'PENGADUAN'},
  ];

  const validate = [
    {id: 1, label: 'Agama'},
    {id: 6, label: 'Kependudukan'},
    {id: 2, label: 'Kesehatan'},
    {id: 7, label: 'Ketenagakerjaan'},
    {id: 3, label: 'Lingkungan Hidup'},
    {id: 4, label: 'Pendidikan dan Kebudayaan'},
    {id: 9, label: 'Perhubungan'},
    {id: 5, label: 'Politik dan Hukum'},
    {id: 8, label: 'Sosial dan Kesejahteraan'},
    {id: 10, label: 'Teknologi Informasi dan KomueventDateasi'},
    {id: 11, label: 'Topik Lainnya'},
  ];

  return (
    <>
      <View style={[_.flex, _.bgColor('white')]}>
        <Text weight="semibold" size={28} style={_.ml_2}>
          Laporkan!
        </Text>

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
        <ScrollView
          contentContainerStyle={[_.flexGrow]}
          showsVerticalScrollIndicator={false}>
          <View style={[_.mv_2]}>
            <View style={_.ml_2}>
              <RadioForm
                radio_props={radioProps}
                initial={0}
                formHorizontal={false}
                labelHorizontal={true}
                buttonColor={'#2196f3'}
                animation={true}
                onPress={value => {
                  setChosenOption(value);
                }}
              />
            </View>
            <OptionPicker
              editAble={!loading}
              label="Pilih Kategori Laporan "
              options={validate}
              ref={categoryRef}
              containerStyle={[_.mb_2]}
            />
            <TextInput
              ref={titleRef}
              label="Ketik Judul Laporan Anda *"
              editable={!loading}
              returnKeyType="next"
              onSubmitEditing={() => {
                try {
                  if (!isEmpty(titleRef?.current?.value)) {
                    titleRef.current?.setErrMessage();
                    descriptionRef.current?.focus();
                  } else {
                    titleRef.current?.setErrMessage('Title tidak boleh kosong');
                  }
                } catch (error) {}
              }}
            />
            <TextInput
              ref={descriptionRef}
              label="Ketik Isi Laporan Anda *"
              editable={!loading}
              returnKeyType="next"
              onSubmitEditing={() => {
                try {
                  if (!isEmpty(descriptionRef?.current?.value)) {
                    descriptionRef.current?.setErrMessage();
                  } else {
                    descriptionRef.current?.setErrMessage(
                      'Deskripsi tidak boleh kosong',
                    );
                  }
                } catch (error) {}
              }}
            />

            <DatePicker
              label="Pilih Tanggal Kejadian *"
              editable={!loading}
              keyboardType="date"
              value={incidentDate}
              onChange={date => setIncidentDate(new Date(date))}
              returnKeyType="next"
            />
            <TextInput
              ref={eventLocationRef}
              label="Ketik Lokasi Kejadian *"
              editable={!loading}
              keyboardType="date"
              returnKeyType="next"
              onSubmitEditing={() => {
                try {
                  if (!isEmpty(eventLocationRef?.current?.value)) {
                    eventLocationRef.current?.setErrMessage();
                  } else {
                    eventLocationRef.current?.setErrMessage(
                      'Tanggal tidak boleh kosong',
                    );
                  }
                } catch (error) {}
              }}
            />
            <Button
              icon="edit"
              color="blueLight"
              solid
              textColor="white"
              onPress={() => modal.current?.show()}>
              Pilih File
            </Button>
            <View style={[_.ml_2, _.mt_2]}>
              <Checkbox
                color="info"
                onChange={value => setAnonym(value)}
                label="Is Anonym?"
              />
            </View>
            <View style={[_.ml_2, _.mt_1]}>
              <Checkbox
                color="info"
                onChange={value => setSecret(value)}
                label="Is Secret?"
              />
            </View>
            <Button
              loading={loading}
              onPress={handlerSave}
              style={[_.m_2, _.mt_4, _.shadowSmooth]}>
              Simpan
            </Button>
          </View>
        </ScrollView>
      </View>
    </>
  );
};
