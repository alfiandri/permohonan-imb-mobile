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
import { LoginInput } from './components';
import useLogin from './hooks';

export default () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errEmail, setErrEmail] = useState('');
  const [errPassword, setErrPassword] = useState('');
  const navigation = useNavigation();

  const {loading, login, check} = useLogin();

  const userRef = useRef();
  const passRef = useRef();

  const enable = !isEmpty(email) && !isEmpty(password);

  const openLink = async (apiURL = '') => {
    try {
      Linking.openURL(apiURL);
    } catch (error) {
      console.log('[openLink] is error ', error);
      if (isEmpty(error.user_message)) {
        error.user_message = 'Terjadi kesalahan saat memuat laporan';
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
              Selamat Datang
            </Text>
            <Text size={12} weight="reguler" color="greyDark">
              Masuk terlebih untuk melanjutkan!
            </Text>
          </View>

          <View style={[_.mh_2, _.mt_4]}>
            <LoginInput
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
                const err = check({a: email});
                if (!err) {
                  passRef.current?.focus();
                } else {
                  setErrEmail(err);
                }
              }}
            />

            <LoginInput
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
                const err = check({a: password, isPassword: true});
                if (err) {
                  setErrPassword(err);
                }
              }}
            />

            <TouchableOpacity
              disabled={loading}
              onPress={() => login({email, password})}
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
                  Login
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={[_.selfCenter, _.itemsCenter, _.mt_1]}>
            <TouchableOpacity
              onPress={() =>
                openLink('https://melapor.sibolgakota.go.id/password/reset')
              }
              style={[_.mb_1]}>
              <Text weight="light">Lupa Password</Text>
            </TouchableOpacity>
            <Text weight="light" style={[_.mb_1]}>
              Atau
            </Text>

            <TouchableOpacity onPress={() => goToScreen('Register')}>
              <Text weight="medium">Belum punya akun? Silakan mendaftar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};
