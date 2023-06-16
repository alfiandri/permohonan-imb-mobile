import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, RefreshControl, ScrollView, StatusBar, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useSelector } from 'react-redux';
import {
    Button,
    Navbar,
    OptionPicker,
    Text,
    TextInput,
    ViewError
} from '../../../global/components';
import _ from '../../../global/styles';
import {
    DELETE,
    GET,
    isEmpty,
    POST,
    screenWidth,
    Toast
} from '../../../helper/utils';

const FETCH = axios.CancelToken.source();

export default ({navigation, route}) => {
  const id = route.params?.id;
  const deleteUser = route?.params?.deleteUser;

  let [data, setData] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editAble, setEditAble] = useState(false);

  const auth = useSelector(s => s.login.tipe);

  const nameRef = useRef();
  const emailRef = useRef();
  const typeRef = useRef();
  const errRef = useRef();

  const validate = [
    {id: 1, label: 'superadmin'},
    {id: 2, label: 'admin'},
    {id: 3, label: 'kepala bagian'},
    {id: 4, label: 'koordinator nursary'},
    {id: 5, label: 'staf'},
  ];

  if (auth != 'superadmin') {
    validate.splice(0, 1);
  }

  useEffect(() => {
    fetchData();

    return () => {
      FETCH?.cancel();
    };
  }, []);

  const fetchData = async () => {
    try {
      FETCH?.cancel();
      const res = await GET({
        url: '/user',
        params: {key: 'id', value: id, options: true},
        any: {CancelToken: FETCH.token},
      });
      const result = res?.data;

      console.log({result});

      if (result.status == 'success' && result.code === 200) {
        setData(result.data);
        const type = validate.find(s => s.id == result.data?.types);
        typeRef?.current?.setValue(type);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.log('[fetchData] is error ', error);
      setData('error');
      errRef.current?.setErrMessage(error?.message);
    }
    setLoading(false);
    setRefreshing(false);
  };

  const doRefresh = () => {
    try {
      data = undefined;
      reset();
      setData(data);
      setLoading(false);
      setRefreshing(true);
      setEditAble(false);
      fetchData();
    } catch (error) {
      console.log('[doRefresh] is error ', error);
    }
  };

  const reset = () => {
    try {
      errRef.current?.setErrMessage();
      nameRef.current?.reset();
      emailRef.current?.reset();
    } catch (error) {
      console.log('[reset] is error ', error);
    }
  };

  const save = async () => {
    try {
      const body = {};
      if (data.name != nameRef.current?.value)
        body.name = nameRef.current?.value;
      if (data?.email != emailRef.current?.value)
        body.email = emailRef.current?.value;
      if (data?.tipes != typeRef.current?.value)
        body.types = typeRef.current?.value;

      const res = await POST({url: `/user/${id}`, body});
      const result = res?.data;

      console.log({result});

      if (result.status == 'success' && result.code === 200) {
        setData(result.data);
        Toast(result.message);
        setEditAble(false);
      } else if (result.status == 'validation' || result.code == 401) {
        Toast(result.message);
        nameRef.current?.setValue();
        emailRef.current?.setValue();
        nameRef.current?.setErrMessage(result?.data?.name[0]);
        emailRef.current?.setErrMessage(result?.data?.email[0]);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.log('[save] is error ', error);
      Toast('Gagal memperbaharui akun');
      reset();
    }
    setLoading(false);
  };

  const deleteAccount = async () => {
    try {
      const res = await DELETE({url: `/user/${id}`});
      const result = res.data;

      console.log({result});

      if (result.status == 'success' && result.code === 200) {
        if (typeof deleteUser == 'function') {
          deleteUser(id);
        }
        Toast(result?.message);
        navigation.pop();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.log('[DeleteMaintenance] is error ', error);
    }
    setLoading(false);
  };

  const resetPassword = async () => {
    try {
      const res = await POST({url: `/reset-password/${id}`});
      const result = res.data;

      console.log({result});

      if (result.status == 'success' && result.code === 200) {
        Toast(result?.message);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.log('[DeleteMaintenance] is error ', error);
    }
    setLoading(false);
  };
  //#end
  //#endregion Method

  //#region Handler
  const handlerSend = () => {
    try {
      if (editAble || auth == 'supervisor' || auth == 'admin') {
        console.log({
          name: nameRef.current?.value,
          email: emailRef.current?.value,
        });
        if (isEmpty(nameRef.current?.value)) {
          nameRef.current?.setErrMessage('nama tidak boleh kosong');
          nameRef.current?.focus();
          return;
        }
        if (isEmpty(emailRef.current?.value)) {
          emailRef.current?.setErrMessage('email tidak boleh kosong');
          emailRef.current?.focus();
          return;
        }
        if (
          data.name == nameRef.current?.value &&
          data.email == emailRef.current?.value &&
          data.types == typeRef.current?.value
        ) {
          Toast('nama, email dan tipe  tidak ada perubahan');
          return;
        }
        setLoading(true);
        save();
      } else {
        setLoading(true);
        Alert.alert(
          `Yakin menghapus akun ${data?.name}?`,
          'dengan menghapus data ini, akan berdampak pada laporan dan data yang terkait',
          [
            {text: 'Batal', onPress: () => setLoading(false)},
            {text: 'Hapus', onPress: () => deleteAccount()},
          ],
        );
      }
    } catch (error) {
      console.log('[handler] is error ', error);
    }
  };

  const handleReset = async () => {
    try {
      setLoading(true);
      Alert.alert(
        `Yakin mereset kata sandi akun ${data?.name}?`,
        'dengan mereset kata sandi, kata sandi akan di ubah ke "password"',
        [
          {text: 'Batal', onPress: () => setLoading(false)},
          {text: 'Reset', onPress: () => resetPassword()},
        ],
      );
    } catch (error) {
      console.log('[handleReset] is error ', error);
    }
  };
  //#endregion Handler

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Navbar>
        <View style={[_.flex, _.row, _.itemsCenter]}>
          <Text weight="bold" style={[_.flex]}>
            Pengguna
          </Text>
          <Button
            icon="pencil-alt"
            onPress={() => setEditAble(!editAble)}
            textColor="black"
          />
        </View>
      </Navbar>
      <View style={[_.flex]}>
        <ScrollView
          contentContainerStyle={[_.flexGrow]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={doRefresh} />
          }>
          {data ? (
            data != 'error' && !isEmpty(data) ? (
              <View style={[_.mv_2]}>
                <Text
                  size={14}
                  weight="bold"
                  color="primary"
                  style={[_.mh_2, _.mb_2, {textTransform: 'uppercase'}]}>
                  Akun
                </Text>
                <TextInput
                  ref={nameRef}
                  label="Nama"
                  defaultValue={data?.name}
                  editable={editAble}
                  returnKeyType="next"
                  placeholder="Budi"
                  onSubmitEditing={() => {
                    try {
                      if (!isEmpty(nameRef?.current?.value)) {
                        nameRef.current?.setErrMessage();
                        emailRef.current?.focus();
                      } else {
                        nameRef.current?.setErrMessage(
                          'nama tidak boleh kosong',
                        );
                      }
                    } catch (error) {}
                  }}
                />
                <TextInput
                  ref={emailRef}
                  label="Email"
                  defaultValue={data?.email}
                  editable={editAble}
                  keyboardType="email-address"
                  returnKeyType="next"
                  placeholder="contoh@sampel.com"
                  onSubmitEditing={() => {
                    try {
                      if (!isEmpty(emailRef?.current?.value)) {
                        emailRef.current?.setErrMessage();
                      } else {
                        nameRef.current?.setErrMessage(
                          'nama tidak boleh kosong',
                        );
                      }
                    } catch (error) {}
                  }}
                />

                <OptionPicker
                  ref={typeRef}
                  editAble={editAble}
                  label="Tipe User"
                  options={validate}
                  containerStyle={[_.mb_2]}
                />

                {!editAble && (
                  <Button
                    loading={loading}
                    onPress={handleReset}
                    color="warning"
                    style={[_.m_2, _.mtm(0), _.shadowSmooth]}>
                    Reset Password
                  </Button>
                )}

                {(auth == 'superadmin' || auth == 'admin') && (
                  <Button
                    onPress={handlerSend}
                    loading={loading}
                    color={editAble ? 'secondary' : 'danger'}
                    style={[_.mh_2, _.radius(8), _.mb_1]}>
                    {editAble ? 'Simpan' : 'Hapus'}
                  </Button>
                )}
              </View>
            ) : (
              <ViewError ref={errRef} onPress={doRefresh} />
            )
          ) : (
            <SkeletonPlaceholder>
              <View style={[_.mv_2]}>
                <View style={[_.width(90), _.height(20), _.mb_2, _.ml_2]} />
                {new Array(3).fill('').map((v, i) => (
                  <View
                    key={i}
                    style={[_.width(screenWidth), _.height(60), _.mbm(3)]}
                  />
                ))}
              </View>
            </SkeletonPlaceholder>
          )}
        </ScrollView>
      </View>
    </>
  );
};
