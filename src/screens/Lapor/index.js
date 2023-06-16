import { useNavigation } from '@react-navigation/core';
import React, { useRef, useState } from 'react';
import { Image, Platform, SafeAreaView, ScrollView, View } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import {
  Button,
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
  // const [incidentDate, setIncidentDate] = useState(new Date(moment()));
  // const [anonym, setAnonym] = useState(false);
  // const [secret, setSecret] = useState(false);
  // const [chosenOption, setChosenOption] = useState('ASPIRASI');
  const [file, setFile] = useState(null);
  const modal = useRef();

  const navigation = useNavigation();

  const namaPemohonRef = useRef();
  const alamatPemohonRef = useRef();
  const jenisPermohonanRef = useRef();
  const kelurahan_kecamatanRef = useRef();
  const nomor_telpRef = useRef();
  const nama_perusahaanRef = useRef();
  const bentuk_badan_usahaRef = useRef();
  const alamat_perusahaanRef = useRef();
  const kelurahan_kecamatan_perusahaanRef = useRef();
  const nomor_telp_perusahaanRef = useRef();
  const jenis_penggunaan_bangunanRef = useRef();
  const jumlah_unitRef = useRef();
  const jumlah_lantaiRef = useRef();
  const luas_bangunanRef = useRef();
  const status_dan_luas_tanahRef = useRef();
  const jalan_bangunanRef = useRef();
  const kelurahan_bangunanRef = useRef();
  const kecamatan_bangunanRef = useRef();

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
        jenis_permohonan: jenisPermohonanRef.current?.value,
        nama: namaPemohonRef.current?.value,
        alamat: alamatPemohonRef.current?.value,
        kelurahan_kecamatan: kelurahan_kecamatanRef.current?.value,
        nomor_telp: nomor_telpRef.current?.value,
        nama_perusahaan: nama_perusahaanRef.current?.value,
        bentuk_badan_usaha: bentuk_badan_usahaRef.current?.value,
        alamat_perusahaan: alamat_perusahaanRef.current?.value,
        kelurahan_kecamatan_perusahaan:
          kelurahan_kecamatan_perusahaanRef.current?.value,
        nomor_telp_perusahaan: nomor_telp_perusahaanRef.current?.value,
        jenis_penggunaan_bangunan: jenis_penggunaan_bangunanRef.current?.value,
        jumlah_unit: jumlah_unitRef.current?.value,
        jumlah_lantai: jumlah_lantaiRef.current?.value,
        luas_bangunan: luas_bangunanRef.current?.value,
        status_dan_luas_tanah: status_dan_luas_tanahRef.current?.value,
        jalan_bangunan: jalan_bangunanRef.current?.value,
        kelurahan_bangunan: kelurahan_bangunanRef.current?.value,
        kecamatan_bangunan: kecamatan_bangunanRef.current?.value,
        bukti_pembayaran: file,
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
      navigation.push('ReportDetail', {data: dataResult});
    }
  };
  //#endregion Method

  //#region Handler
  const handlerSave = () => {
    // setLoading(true);
    try {
      // console.log('saving...');
      if (isEmpty(namaPemohonRef.current?.value)) {
        namaPemohonRef.current?.setErrMessage('Nama tidak boleh kosong');
        namaPemohonRef.current?.focus();
        setLoading(false);
        return;
      }
      // if (isEmpty(alamatPemohonRef.current?.value)) {
      //   alamatPemohonRef.current?.setErrMessage('Alamat tidak boleh kosong');
      //   alamatPemohonRef.current?.focus();
      //   setLoading(false);
      //   return;
      // }
      // if (isEmpty(eventLocationRef.current?.value)) {
      //   eventLocationRef.current?.setErrMessage('eventDate tidak boleh kosong');
      //   eventLocationRef.current?.focus();
      //   setLoading(false);
      //   return;
      // }
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
          return 'RESULTS.DENIED';
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
    {id: 'Permohonan Baru', label: 'Permohonan Baru'},
    {
      id: 'Permohonan Rehabilitasi/Renovasi',
      label: 'Permohonan Rehabilitasi/Renovasi',
    },
    {
      id: 'Permohonan Memperluas/menambah Lantai',
      label: 'Permohonan Memperluas/menambah Lantai',
    },
    {
      id: 'Permohonan Pelestarian/Pemugaran',
      label: 'Permohonan Pelestarian/Pemugaran',
    },
    {id: 'Pemecahan Dokumen IMB', label: 'Pemecahan Dokumen IMB'},
    {
      id: 'Pembuatan Duplikat/Copy Dokumen IMB',
      label: 'Pembuatan Duplikat/Copy Dokumen IMB',
    },
    {
      id: 'Pemutakhiran Data/Perubahan Non Teknis Lainnya',
      label: 'Pemutakhiran Data/Perubahan Non Teknis Lainnya',
    },
  ];

  return (
    <>
      <SafeAreaView style={[_.flex, _.bgColor('white')]}>
        <Text weight="semibold" size={28} style={_.ml_2}>
          Buat Permohonan
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
            <OptionPicker
              editAble={!loading}
              label="Pilih Jenis Permohonan"
              options={validate}
              ref={jenisPermohonanRef}
              containerStyle={[_.mb_2]}
            />
            <TextInput
              ref={namaPemohonRef}
              label="Nama Pemohon *"
              editable={!loading}
              returnKeyType="next"
              onSubmitEditing={() => {
                try {
                  if (!isEmpty(namaPemohonRef?.current?.value)) {
                    namaPemohonRef.current?.setErrMessage();
                    alamatPemohonRef.current?.focus();
                  } else {
                    namaPemohonRef.current?.setErrMessage(
                      'Nama Pemohon tidak boleh kosong',
                    );
                  }
                } catch (error) {}
              }}
            />
            <TextInput
              ref={alamatPemohonRef}
              label="Ketik Alamat Anda *"
              editable={!loading}
              returnKeyType="next"
              onSubmitEditing={() => {
                try {
                  if (!isEmpty(alamatPemohonRef?.current?.value)) {
                    alamatPemohonRef.current?.setErrMessage();
                    kelurahan_kecamatanRef.current?.focus();
                  } else {
                    alamatPemohonRef.current?.setErrMessage(
                      'Alamat tidak boleh kosong',
                    );
                  }
                } catch (error) {}
              }}
            />

            <TextInput
              ref={kelurahan_kecamatanRef}
              label="Ketik Kelurahan/Kecamatan Anda"
              editable={!loading}
              returnKeyType="next"
              onSubmitEditing={() => {
                try {
                  if (!isEmpty(kelurahan_kecamatanRef?.current?.value)) {
                    kelurahan_kecamatanRef.current?.setErrMessage();
                    nomor_telpRef.current?.focus();
                  }
                } catch (error) {}
              }}
            />

            <TextInput
              ref={nomor_telpRef}
              label="Ketik No Telp"
              editable={!loading}
              returnKeyType="next"
              onSubmitEditing={() => {
                try {
                  if (!isEmpty(nomor_telpRef?.current?.value)) {
                    nomor_telpRef.current?.setErrMessage();
                    nama_perusahaanRef.current?.focus();
                  }
                } catch (error) {}
              }}
            />

            <TextInput
              ref={nama_perusahaanRef}
              label="Ketik Nama Perusahaan Anda"
              editable={!loading}
              returnKeyType="next"
              onSubmitEditing={() => {
                try {
                  if (!isEmpty(nama_perusahaanRef?.current?.value)) {
                    nama_perusahaanRef.current?.setErrMessage();
                    bentuk_badan_usahaRef.current?.focus();
                  }
                } catch (error) {}
              }}
            />

            <TextInput
              ref={bentuk_badan_usahaRef}
              label="Ketik Bentuk Badan Usaha"
              editable={!loading}
              returnKeyType="next"
              onSubmitEditing={() => {
                try {
                  if (!isEmpty(bentuk_badan_usahaRef?.current?.value)) {
                    bentuk_badan_usahaRef.current?.setErrMessage();
                    alamat_perusahaanRef.current?.focus();
                  }
                } catch (error) {}
              }}
            />

            <TextInput
              ref={alamat_perusahaanRef}
              label="Ketik Alamat Perusahaan"
              editable={!loading}
              returnKeyType="next"
              onSubmitEditing={() => {
                try {
                  if (!isEmpty(alamat_perusahaanRef?.current?.value)) {
                    alamat_perusahaanRef.current?.setErrMessage();
                    kelurahan_kecamatan_perusahaanRef.current?.focus();
                  }
                } catch (error) {}
              }}
            />

            <TextInput
              ref={kelurahan_kecamatan_perusahaanRef}
              label="Ketik Kelurahan Kecamatan Perusahaan"
              editable={!loading}
              returnKeyType="next"
              onSubmitEditing={() => {
                try {
                  if (
                    !isEmpty(kelurahan_kecamatan_perusahaanRef?.current?.value)
                  ) {
                    kelurahan_kecamatan_perusahaanRef.current?.setErrMessage();
                    nomor_telp_perusahaanRef.current?.focus();
                  }
                } catch (error) {}
              }}
            />

            <TextInput
              ref={nomor_telp_perusahaanRef}
              label="Ketik No Telp. Perusahaan"
              editable={!loading}
              returnKeyType="next"
              onSubmitEditing={() => {
                try {
                  if (!isEmpty(nomor_telp_perusahaanRef?.current?.value)) {
                    nomor_telp_perusahaanRef.current?.setErrMessage();
                    jenis_penggunaan_bangunanRef.current?.focus();
                  }
                } catch (error) {}
              }}
            />

            <TextInput
              ref={jenis_penggunaan_bangunanRef}
              label="Ketik Jenis Penggunaan Bangunan"
              editable={!loading}
              returnKeyType="next"
              onSubmitEditing={() => {
                try {
                  if (!isEmpty(jenis_penggunaan_bangunanRef?.current?.value)) {
                    jenis_penggunaan_bangunanRef.current?.setErrMessage();
                    jumlah_unitRef.current?.focus();
                  }
                } catch (error) {}
              }}
            />

            <TextInput
              ref={jumlah_unitRef}
              label="Ketik Jumlah Unit"
              editable={!loading}
              returnKeyType="next"
              onSubmitEditing={() => {
                try {
                  if (!isEmpty(jumlah_unitRef?.current?.value)) {
                    jumlah_unitRef.current?.setErrMessage();
                    jumlah_lantaiRef.current?.focus();
                  }
                } catch (error) {}
              }}
            />

            <TextInput
              ref={jumlah_lantaiRef}
              label="Ketik Jumlah Lantai"
              editable={!loading}
              returnKeyType="next"
              onSubmitEditing={() => {
                try {
                  if (!isEmpty(jumlah_lantaiRef?.current?.value)) {
                    jumlah_lantaiRef.current?.setErrMessage();
                    luas_bangunanRef.current?.focus();
                  }
                } catch (error) {}
              }}
            />

            <TextInput
              ref={luas_bangunanRef}
              label="Ketik Luas Bangunan"
              editable={!loading}
              returnKeyType="next"
              onSubmitEditing={() => {
                try {
                  if (!isEmpty(luas_bangunanRef?.current?.value)) {
                    luas_bangunanRef.current?.setErrMessage();
                    status_dan_luas_tanahRef.current?.focus();
                  }
                } catch (error) {}
              }}
            />

            <TextInput
              ref={status_dan_luas_tanahRef}
              label="Ketik Status dan Luas Tanah"
              editable={!loading}
              returnKeyType="next"
              onSubmitEditing={() => {
                try {
                  if (!isEmpty(status_dan_luas_tanahRef?.current?.value)) {
                    status_dan_luas_tanahRef.current?.setErrMessage();
                    jalan_bangunanRef.current?.focus();
                  }
                } catch (error) {}
              }}
            />

            <TextInput
              ref={jalan_bangunanRef}
              label="Ketik Jalan Bangunan"
              editable={!loading}
              returnKeyType="next"
              onSubmitEditing={() => {
                try {
                  if (!isEmpty(jalan_bangunanRef?.current?.value)) {
                    jalan_bangunanRef.current?.setErrMessage();
                    kecamatan_bangunanRef.current?.focus();
                  }
                } catch (error) {}
              }}
            />

            <TextInput
              ref={kecamatan_bangunanRef}
              label="Ketik Kecamatan Bangunan"
              editable={!loading}
              returnKeyType="next"
              onSubmitEditing={() => {
                try {
                  if (!isEmpty(kecamatan_bangunanRef?.current?.value)) {
                    kecamatan_bangunanRef.current?.setErrMessage();
                    kelurahan_bangunanRef.current?.focus();
                  }
                } catch (error) {}
              }}
            />

            <TextInput
              ref={kelurahan_bangunanRef}
              label="Ketik Kelurahan Bangunan"
              editable={!loading}
              returnKeyType="next"
              onSubmitEditing={() => {
                try {
                  if (!isEmpty(kelurahan_bangunanRef?.current?.value)) {
                    kelurahan_bangunanRef.current?.setErrMessage();
                    // kecamatan_bangunanRef.current?.focus();
                  }
                } catch (error) {}
              }}
            />

            <View style={[_.m_2]}>
              <Button
                icon="edit"
                color="blueLight"
                solid
                textColor="white"
                onPress={() => modal.current?.show()}>
                Upload Bukti Pembayaran
              </Button>
            </View>

            {file && (
              <View style={[_.m_2]}>
                <Image source={{uri: file}} style={{height: 200, width: 250}} />
              </View>
            )}

            <Button
              loading={loading}
              onPress={handlerSave}
              style={[_.m_2, _.mt_4, _.shadowSmooth]}>
              Simpan
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
