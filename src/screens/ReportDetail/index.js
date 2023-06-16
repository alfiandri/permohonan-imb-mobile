/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import { useNavigation } from '@react-navigation/core';
import moment from 'moment';
import 'moment/locale/id';
import React, { useEffect, useRef, useState } from 'react';
import { Image, SafeAreaView, StatusBar, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import Timeline from 'react-native-timeline-flatlist';
import { useSelector } from 'react-redux';
import {
  Button,
  Navbar,
  OptionPicker,
  Text,
  TextInput
} from '../../global/components';
import _, { COLORS } from '../../global/styles';
import { isEmpty, POST, Toast } from '../../helper/utils';
import { CustomError } from '../../helper/utils/handleResponse';

export default ({nav, route}) => {
  const [loading, setLoading] = useState(false);
  const {data: paramsData = {}} = route?.params;
  const [result, setResult] = useState();
  const navigation = useNavigation();

  const tipeRef = useRef();
  const tanggapanRef = useRef();

  const responses = paramsData.responses;

  const tipe = useSelector(s => s.login.tipe);

  let validate = [];
  if (tipe === 'staff') {
    validate = [
      {id: 'DITOLAK_STAFF', label: 'Tolak'},
      {
        id: 'DITERIMA_STAFF',
        label: 'Terima',
      },
    ];
  } else {
    validate = [
      {id: 'DITOLAK_KABID', label: 'Tolak'},
      {
        id: 'DITERIMA_KABID',
        label: 'Terima',
      },
    ];
  }

  useEffect(() => {
    const data = [];

    for (let index = 0; index < responses?.length; index++) {
      let newArr = {
        time: moment(responses[index].created_at).format('DD-MM-YYYY HH:ss'),
        title: 'Petugas membalas',
        description: responses[index].response,
      };

      data.push(newArr);
    }
    setResult(data);
  }, [responses]);

  const save = async () => {
    let dataResultData = [];
    try {
      const body = {
        tipe: tipeRef.current?.value,
        tanggapan: tanggapanRef.current?.value,
        id_permohonan: paramsData.id,
      };

      const res = await POST({url: '/response', body});
      const resultData = res?.data;

      if (resultData.resultData === 'success' && res.code === 200) {
        Toast(resultData.title);
        dataResultData = resultData.data;
      } else {
        throw new CustomError({
          message: resultData.title,
          user_message: resultData.title,
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
    if (dataResultData) {
      console.log(dataResultData);
      navigation.push('Home');
    }
  };
  //#endregion Method

  //#region Handler
  const handlerSave = () => {
    // setLoading(true);
    try {
      // console.log('saving...');
      if (isEmpty(tanggapanRef.current?.value)) {
        tanggapanRef.current?.setErrMessage('Tanggapan tidak boleh kosong');
        tanggapanRef.current?.focus();
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

  return (
    <>
      <SafeAreaView style={[_.flex, _.bgColor('white')]}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <Navbar color={COLORS.grey}>
          <Text size={28} weight="bold">
            Detail Permohonan
          </Text>
        </Navbar>

        <ScrollView
          contentContainerStyle={[_.flexGrow]}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}>
          <View style={[_.mv_2]}>
            <DataTable>
              <DataTable.Row style={{width: 500}}>
                <DataTable.Cell style={{width: 100, fontWeight: 'bold'}}>
                  Status
                </DataTable.Cell>
                <DataTable.Cell style={{width: 400}}>
                  : {paramsData.status}
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row style={{width: 500}}>
                <DataTable.Cell style={{width: 100}}>
                  Jenis Permohonan
                </DataTable.Cell>
                <DataTable.Cell style={{width: 400}}>
                  : {paramsData.jenis_permohonan}
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row style={{width: 500}}>
                <DataTable.Cell style={{width: 100}}>
                  Nama Pemohon
                </DataTable.Cell>
                <DataTable.Cell style={{width: 350}}>
                  : {paramsData.nama}
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row style={{width: 500}}>
                <DataTable.Cell style={{width: 100}}>
                  Alamat Pemohon
                </DataTable.Cell>
                <DataTable.Cell style={{width: 350}}>
                  : {paramsData.alamat}
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row style={{width: 500}}>
                <DataTable.Cell style={{width: 100}}>
                  Kelurahan/kecamatan
                </DataTable.Cell>
                <DataTable.Cell style={{width: 350}}>
                  : {paramsData.kelurahan_kecamatan}
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row style={{width: 500}}>
                <DataTable.Cell style={{width: 100}}>
                  Nomor Telp.
                </DataTable.Cell>
                <DataTable.Cell style={{width: 350}}>
                  : {paramsData.nomor_telp}
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row style={{width: 500}}>
                <DataTable.Cell style={{width: 100}}>
                  Nama Perusahaan
                </DataTable.Cell>
                <DataTable.Cell style={{width: 350}}>
                  : {paramsData.nama_perusahaan}
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row style={{width: 500}}>
                <DataTable.Cell style={{width: 100}}>
                  Bentuk Badan Usaha
                </DataTable.Cell>
                <DataTable.Cell style={{width: 350}}>
                  : {paramsData.bentuk_badan_usaha}
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row style={{width: 500}}>
                <DataTable.Cell style={{width: 100}}>
                  Alamat Perusahaan
                </DataTable.Cell>
                <DataTable.Cell style={{width: 350}}>
                  : {paramsData.alamat_perusahaan}
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row style={{width: 500}}>
                <DataTable.Cell style={{width: 100}}>
                  Kelurahan/kecamatan Perusahaan
                </DataTable.Cell>
                <DataTable.Cell style={{width: 350}}>
                  : {paramsData.kelurahan_kecamatan_perusahaan}
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row style={{width: 500}}>
                <DataTable.Cell style={{width: 100}}>
                  Nomor Telp. Perusahaan
                </DataTable.Cell>
                <DataTable.Cell style={{width: 350}}>
                  : {paramsData.nomor_telp_perusahaan}
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row style={{width: 500}}>
                <DataTable.Cell style={{width: 100}}>
                  Jenis Penggunaan Bangunan
                </DataTable.Cell>
                <DataTable.Cell style={{width: 350}}>
                  : {paramsData.jenis_penggunaan_bangunan}
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row style={{width: 500}}>
                <DataTable.Cell style={{width: 100}}>
                  Jumlah Unit
                </DataTable.Cell>
                <DataTable.Cell style={{width: 350}}>
                  : {paramsData.jumlah_unit}
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row style={{width: 500}}>
                <DataTable.Cell style={{width: 100}}>
                  Jumlah Lantai
                </DataTable.Cell>
                <DataTable.Cell style={{width: 350}}>
                  : {paramsData.jumlah_lantai}
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row style={{width: 500}}>
                <DataTable.Cell style={{width: 100}}>
                  Luas Bangunan
                </DataTable.Cell>
                <DataTable.Cell style={{width: 350}}>
                  : {paramsData.luas_bangunan}
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row style={{width: 500}}>
                <DataTable.Cell style={{width: 100}}>
                  Status dan Luas Tanah
                </DataTable.Cell>
                <DataTable.Cell style={{width: 350}}>
                  : {paramsData.status_dan_luas_tanah}
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row style={{width: 500}}>
                <DataTable.Cell style={{width: 100}}>Jalan</DataTable.Cell>
                <DataTable.Cell style={{width: 350}}>
                  : {paramsData.jalan_bangunan}
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row style={{width: 500}}>
                <DataTable.Cell style={{width: 100}}>Kelurahan</DataTable.Cell>
                <DataTable.Cell style={{width: 350}}>
                  : {paramsData.kelurahan_bangunan}
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row style={{width: 500}}>
                <DataTable.Cell style={{width: 100}}>Kecamatan</DataTable.Cell>
                <DataTable.Cell style={{width: 350}}>
                  : {paramsData.kecamatan_bangunan}
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </View>

          {paramsData.bukti_pembayaran && (
            <View style={[_.m_2]}>
              <Text style={[{fontWeight: 'bold'}]}>Bukti Pembayaran</Text>
              <Image
                source={{uri: paramsData.bukti_pembayaran}}
                style={{height: 200, width: 250}}
              />
            </View>
          )}
          {responses?.length > 0 && (
            <View style={[_.mv_1]}>
              <Timeline style={_.m_4} data={result} />
            </View>
          )}

          {((paramsData.status !== 'DITERIMA_STAFF' && tipe === 'staff') ||
            (paramsData.status !== 'DITERIMA_KABID' && tipe === 'kabid')) && (
            <View>
              <Text style={[_.m_2, {fontWeight: 'bold'}]}>Beri Tanggapan</Text>
              <OptionPicker
                editAble={!loading}
                label="Pilih Status"
                options={validate}
                ref={tipeRef}
                containerStyle={[_.mb_2]}
              />
              <TextInput
                ref={tanggapanRef}
                label="Tanggapan *"
                editable={!loading}
                returnKeyType="next"
                onSubmitEditing={() => {
                  try {
                    if (!isEmpty(tanggapanRef?.current?.value)) {
                      tanggapanRef.current?.setErrMessage();
                    } else {
                      tanggapanRef.current?.setErrMessage(
                        'Tanggapan tidak boleh kosong',
                      );
                    }
                  } catch (error) {}
                }}
              />

              <Button
                loading={loading}
                onPress={handlerSave}
                style={[_.m_2, _.mt_4, _.shadowSmooth]}>
                Simpan
              </Button>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
