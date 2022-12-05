import React, { useRef, useState } from 'react';
import { ScrollView, StatusBar, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Navbar, Text, TextInput } from '../../../global/components';
import _ from '../../../global/styles';
import { isEmpty, POST, Toast } from '../../../helper/utils';
import { CustomError } from '../../../helper/utils/handleResponse';

export default ({navigation, route}) => {
    const [loading, setLoading] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    const profileStore = useSelector(s => s.profile);
    const dispatch = useDispatch();

    const oldPasswordRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    //#region Method
    const save = async () => {
        setLoading(true);
        try {
            const body = {
                password_lama: oldPasswordRef.current?.value,
                password: passwordRef.current?.value,
                password_confirmation: passwordConfirmRef?.current?.value,
            };

            const res = await POST({url: '/auth/update/password', body});
            const result = res?.data;

            console.log({result});

            if (result.result === 'success' && res.code === 200) {
                oldPasswordRef.current?.setValue();
                passwordRef.current?.setValue();
                passwordConfirmRef.current?.setValue();
                Toast(result.title);
            } else {
                throw new CustomError({message: result.title, user_message: result.title});
            }
        } catch (error) {
            console.log('[save] is error ', error);
            if (isEmpty(error.user_message)) {
                error.user_message = 'Maaf, terjadi kesalahan saat memuat profile';
            }
            Toast(error.user_message);
        }
        setLoading(false);
    };
    //#endregion Method

    //#region Handler
    const handlerSave = () => {
        try {
            if (isEmpty(oldPasswordRef.current?.value)) {
                oldPasswordRef.current?.setErrMessage('password sekarang tidak boleh kosong');
                oldPasswordRef.current?.focus();
                return;
            }
            if (isEmpty(passwordRef.current?.value)) {
                passwordRef.current?.setErrMessage('password tidak boleh kosong');
                passwordRef.current?.focus();
                return;
            }
            if (isEmpty(passwordConfirmRef.current?.value)) {
                passwordConfirmRef.current?.setErrMessage('password konfirmasi tidak boleh kosong');
                passwordConfirmRef.current?.focus();
                return;
            }

            if (passwordConfirmRef.current?.value != passwordRef.current?.value) {
                passwordConfirmRef.current?.setErrMessage('password tidak sama');
                passwordConfirmRef.current?.focus();
                return;
            }
            save();
        } catch (error) {
            console.log('[HandlerSave] is error ', error);
            Toast('Gagal melakukan perubahan, periksa kembali input anda');
        }
    };
    //#endregion Handler

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

            <View style={[_.flex, _.bgColor('white')]}>
                <Navbar color="transparent" weight="bold">
                    <Text weight="semibold" size={28}>
                        Ubah Kata Sandi
                    </Text>
                </Navbar>
                <ScrollView contentContainerStyle={[_.flexGrow]} showsVerticalScrollIndicator={false}>
                    <View style={[_.mv_2]}>
                        <TextInput
                            ref={oldPasswordRef}
                            editable={!loading}
                            placeholder="Kata Sandi Sekarang"
                            returnKeyType="next"
                            disableForm
                            password
                            containerStyle={[_.mm(0)]}
                            onSubmitEditing={() => {
                                try {
                                    if (!isEmpty(oldPasswordRef?.current?.value)) {
                                        oldPasswordRef.current?.setErrMessage();
                                        passwordRef.current?.focus();
                                    } else {
                                        oldPasswordRef.current?.setErrMessage('nama tidak boleh kosong');
                                    }
                                } catch (error) {}
                            }}
                        />
                        <TextInput
                            ref={passwordRef}
                            editable={!loading}
                            placeholder="Kata Sandi baru"
                            returnKeyType="next"
                            disableForm
                            password
                            onSubmitEditing={() => {
                                try {
                                    if (!isEmpty(passwordRef?.current?.value)) {
                                        passwordRef.current?.setErrMessage();
                                        passwordConfirmRef.current?.focus();
                                    } else {
                                        passwordRef.current?.setErrMessage('nama tidak boleh kosong');
                                    }
                                } catch (error) {}
                            }}
                        />
                        <TextInput
                            ref={passwordConfirmRef}
                            editable={!loading}
                            placeholder="Konfirmasi Kata Sandi"
                            keyboardType="email-address"
                            returnKeyType="next"
                            disableForm
                            password
                            onSubmitEditing={() => {
                                try {
                                    if (!isEmpty(passwordConfirmRef?.current?.value)) {
                                        passwordConfirmRef.current?.setErrMessage();
                                        handlerSave();
                                    } else {
                                        passwordConfirmRef.current?.setErrMessage('nama tidak boleh kosong');
                                    }
                                } catch (error) {}
                            }}
                        />
                        <Button loading={loading} onPress={handlerSave} style={[_.m_2, _.mt_4, _.shadowSmooth]}>
                            Simpan
                        </Button>
                    </View>
                </ScrollView>
            </View>
        </>
    );
};
