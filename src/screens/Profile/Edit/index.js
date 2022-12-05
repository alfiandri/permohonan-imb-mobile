import React, { useRef, useState } from 'react';
import { ScrollView, StatusBar, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Navbar, Text, TextInput } from '../../../global/components';
import _ from '../../../global/styles';
import { setProfile } from '../../../helper/redux/actions/profileAction';
import { isEmpty, POST, Toast } from '../../../helper/utils';
import { CustomError } from '../../../helper/utils/handleResponse';

export default ({navigation, route}) => {
  const [loading, setLoading] = useState(false);

  const profileStore = useSelector(s => s.profile);
  const dispatch = useDispatch();

  const nameRef = useRef();
  const emailRef = useRef();
  const npHpRef = useRef();
  const nikRef = useRef();
  const modal = useRef();

  //#region Method
  const save = async () => {
    try {
      const body = {
        name: nameRef.current?.value,
        no_hp: npHpRef.current?.value,
        email: emailRef.current?.value,
        nik: nikRef.current?.value,
      };

      const res = await POST({url: '/auth/update/info-user', body});
      const result = res?.data;
      modal.current?.close();

      if (result.result === 'success' && res.code === 200) {
        Toast(result.title);
        dispatch(setProfile({...body}));
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
  };
  //#endregion Method

  //#region Handler
  const handlerSave = () => {
    setLoading(true);
    try {
      if (isEmpty(nameRef.current?.value)) {
        nameRef.current?.setErrMessage('Nama tidak boleh kosong');
        nameRef.current?.focus();
        return;
      }
      if (isEmpty(npHpRef.current?.value)) {
        npHpRef.current?.setErrMessage('Nomor Handphone tidak boleh kosong');
        npHpRef.current?.focus();
        return;
      }
      if (isEmpty(emailRef.current?.value)) {
        emailRef.current?.setErrMessage('E-mail tidak boleh kosong');
        emailRef.current?.focus();
        return;
      }
      if (isEmpty(nikRef.current?.value)) {
        nikRef.current?.setErrMessage('NIK tidak boleh kosong');
        nikRef.current?.focus();
        return;
      }
      if (
        profileStore.name == nameRef.current?.value &&
        profileStore.email == emailRef.current?.value &&
        profileStore.no_hp == npHpRef.current?.value &&
        profileStore.nik == nikRef.current?.value
      ) {
        setLoading(false);
        Toast('Nama, No HP, Email, NIK tidak ada perubahan');
        return;
      }
      save();
    } catch (error) {
      console.log('[HandlerSave] is error ', error);
      Toast('Gagal melakukan perubahan, periksa kembali input anda');
      setLoading(false);
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
      <View style={[_.flex, _.bgColor('white')]}>
        <Navbar color="transparent" weight="bold">
          <Text weight="semibold" size={28}>
            Perbaharui Akun
          </Text>
        </Navbar>
        <ScrollView
          contentContainerStyle={[_.flexGrow]}
          showsVerticalScrollIndicator={false}>
          <View style={[_.mv_2]}>
            <TextInput
              ref={nameRef}
              label="Nama"
              editable={!loading}
              defaultValue={profileStore?.name}
              returnKeyType="next"
              onSubmitEditing={() => {
                try {
                  if (!isEmpty(nameRef?.current?.value)) {
                    nameRef.current?.setErrMessage();
                    emailRef.current?.focus();
                  } else {
                    nameRef.current?.setErrMessage('nama tidak boleh kosong');
                  }
                } catch (error) {}
              }}
            />
            <TextInput
              ref={npHpRef}
              label="Nomor Handphone"
              editable={!loading}
              defaultValue={profileStore?.no_hp}
              returnKeyType="next"
              onSubmitEditing={() => {
                try {
                  if (!isEmpty(nameRef?.current?.value)) {
                    npHpRef.current?.setErrMessage();
                    emailRef.current?.focus();
                  } else {
                    npHpRef.current?.setErrMessage('nama tidak boleh kosong');
                  }
                } catch (error) {}
              }}
            />
            <TextInput
              ref={emailRef}
              label="E-mail"
              editable={!loading}
              defaultValue={profileStore?.email}
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => {
                try {
                  if (!isEmpty(emailRef?.current?.value)) {
                    emailRef.current?.setErrMessage();
                    handlerSave();
                  } else {
                    emailRef.current?.setErrMessage('Email tidak boleh kosong');
                  }
                } catch (error) {}
              }}
            />
            <TextInput
              ref={nikRef}
              label="NIK"
              editable={!loading}
              defaultValue={profileStore?.nik}
              returnKeyType="next"
              onSubmitEditing={() => {
                try {
                  if (!isEmpty(nikRef?.current?.value)) {
                    nikRef.current?.setErrMessage();
                    handlerSave();
                  } else {
                    nikRef.current?.setErrMessage('NIK tidak boleh kosong');
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
        </ScrollView>
      </View>
    </>
  );
};
