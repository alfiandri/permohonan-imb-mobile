import { useNavigation } from '@react-navigation/core';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View
} from 'react-native';
import { Text } from '../../../global/components';
import _, { COLORS } from '../../../global/styles';
import { isEmpty, Toast } from '../../../helper/utils';
import { RegisterInput } from './components';
import useRegister from './hooks';

export default () => {
  const [nama, setNama] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [nik, setNik] = useState(null);
  const [nohp, setNoHp] = useState(null);
  const [errNama, setErrNama] = useState('');
  const [errEmail, setErrEmail] = useState('');
  const [errPassword, setErrPassword] = useState('');
  const [errNik, setErrNik] = useState('');
  const [errNoHp, setErrNoHp] = useState('');
  const navigation = useNavigation();

  const {loading, register, check} = useRegister();

  const namaRef = useRef();
  const userRef = useRef();
  const passRef = useRef();
  const nikRef = useRef();
  const nohpRef = useRef();

  const enable =
    !isEmpty(email) && !isEmpty(password) && !isEmpty(nik) && !isEmpty(nohp);

  const openLink = async (apiURL = '') => {
    try {
      Linking.openURL(apiURL);
    } catch (error) {
      console.log('[openLink] is error ', error);
      if (isEmpty(error.user_message)) {
        error.user_message = 'Terjadi kesalahan membuka tautan';
      }
      Toast('Gagal membuka tautan', 'Terjadi kesalahan saat membuka tautan');
    }
  };

  const goToScreen = navigate => {
    try {
      navigation.push(navigate);
    } catch (error) {
      console.log('[onPress] is error ', error);
      Toast('Terjadi kesalahan saat menuju halaman tersebut');
    }
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <KeyboardAvoidingView style={_.flex} behavior="padding">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            _.flexGrow,
            _.contentCenter,
            _.bgColor(COLORS.white),
          ]}>
          <Image
            source={require('../../../assets/images/logo_login.png')}
            style={[_.width(90), _.height(90), _.selfCenter]}
          />

          <View style={[_.selfCenter, _.itemsCenter, _.mt_3]}>
            <Text size={22} weight="medium" style={_.mb_1}>
              Registrasi Akun
            </Text>
            <Text size={12} weight="reguler" color="greyDark">
              Silakan mendaftar untuk dapat mengakses akun Anda
            </Text>
          </View>

          <View style={[_.mh_2, _.mt_4]}>
            <RegisterInput
              ref={namaRef}
              label="Nama"
              value={nama}
              setValue={setNama}
              onChange={() => setErrNama('')}
              errMessage={errNama}
              placeholder="Masukkan Nama Anda"
              returnKeyType="next"
              style={_.mb_2}
              onEndEditing={() => {
                const err = check({a: nama, name: 'Nama'});
                if (!err) {
                  userRef.current?.focus();
                } else {
                  setErrNama(err);
                }
              }}
            />

            <RegisterInput
              ref={userRef}
              label="E-mail"
              value={email}
              setValue={setEmail}
              onChange={() => setErrEmail('')}
              errMessage={errEmail}
              placeholder="Masukkan alamat e-mail Anda"
              returnKeyType="next"
              style={_.mb_2}
              onEndEditing={() => {
                const err = check({a: email, name: 'E-mail'});
                if (!err) {
                  nikRef.current?.focus();
                } else {
                  setErrEmail(err);
                }
              }}
            />

            <RegisterInput
              ref={nikRef}
              label="NIK"
              value={nik}
              setValue={setNik}
              onChange={() => setErrNik('')}
              errMessage={errNik}
              placeholder="Masukkan NIK Anda"
              returnKeyType="next"
              style={_.mb_2}
              onEndEditing={() => {
                const err = check({a: nik, name: 'NIK'});
                if (!err) {
                  nohpRef.current?.focus();
                } else {
                  setErrNik(err);
                }
              }}
            />
            <RegisterInput
              ref={nohpRef}
              label="Nomor Handphone"
              value={nohp}
              setValue={setNoHp}
              onChange={() => setErrNoHp('')}
              errMessage={errNoHp}
              placeholder="Masukkan Nomor Handphone Anda"
              returnKeyType="next"
              style={_.mb_2}
              onEndEditing={() => {
                const err = check({a: nohp, name: 'Nomor Handphone'});
                if (!err) {
                  passRef.current?.focus();
                } else {
                  setErrNoHp(err);
                }
              }}
            />

            <RegisterInput
              ref={passRef}
              label="Password"
              value={password}
              setValue={setPassword}
              onChange={() => setErrPassword('')}
              errMessage={errPassword}
              placeholder="*****"
              password
              style={_.mb_5}
              onEndEditing={() => {
                const err = check({
                  a: password,
                  name: 'Password',
                  isPassword: true,
                });
                if (err) {
                  setErrPassword(err);
                }
              }}
            />

            <TouchableOpacity
              disabled={loading}
              onPress={() => register({nama, email, nik, nohp, password})}
              style={[
                _.height(50),
                _.bgColor(enable && !loading ? 'primaryDark' : 'primary'),
                _.radius(4),
                _.contentCenter,
                _.mv_1,
              ]}>
              {loading ? (
                <ActivityIndicator
                  size={Platform.OS === 'ios' ? 'small' : 'large'}
                  color="white"
                />
              ) : (
                <Text
                  size={14}
                  align="center"
                  weight="medium"
                  color={COLORS.white}>
                  Mendaftar
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={[_.selfCenter, _.itemsCenter, _.mt_1]}>
            <TouchableOpacity onPress={() => goToScreen('Login')}>
              <Text weight="medium">Sudah memiliki akun? Silakan masuk</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};
