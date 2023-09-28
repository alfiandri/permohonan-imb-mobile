import {useNavigation} from '@react-navigation/core';
import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from '../../../global/components';
import _, {COLORS} from '../../../global/styles';
import {isEmpty, Toast} from '../../../helper/utils';
import {ForgotPasswordInput} from './components';
import useRegister from './hooks';

export default () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [nik, setNik] = useState(null);
  const [errEmail, setErrEmail] = useState('');
  const [errPassword, setErrPassword] = useState('');
  const [errNik, setErrNik] = useState('');
  const navigation = useNavigation();

  const {loading, forgot} = useRegister();

  const userRef = useRef();
  const passRef = useRef();
  const nikRef = useRef();

  const enable = !isEmpty(email) && !isEmpty(password) && !isEmpty(nik);

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
              Lupa Password
            </Text>
            <Text size={12} weight="reguler" color="greyDark">
              Silakan reset password akun Anda
            </Text>
          </View>

          <View style={[_.mh_2, _.mt_4]}>
            <ForgotPasswordInput
              ref={userRef}
              label="E-mail"
              value={email}
              setValue={setEmail}
              onChange={() => setErrEmail('')}
              errMessage={errEmail}
              placeholder="Masukkan alamat e-mail Anda"
              returnKeyType="next"
              style={_.mb_2}
            />

            <ForgotPasswordInput
              ref={nikRef}
              label="NIK"
              value={nik}
              setValue={setNik}
              onChange={() => setErrNik('')}
              errMessage={errNik}
              placeholder="Masukkan NIK Anda"
              returnKeyType="next"
              style={_.mb_2}
            />

            <ForgotPasswordInput
              ref={passRef}
              label="Password"
              value={password}
              setValue={setPassword}
              onChange={() => setErrPassword('')}
              errMessage={errPassword}
              placeholder="*****"
              password
              style={_.mb_5}
            />

            <TouchableOpacity
              disabled={loading}
              onPress={() => forgot({email, nik, password})}
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
                  Reset Password
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
