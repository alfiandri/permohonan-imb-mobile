import React, { useRef, useState } from 'react';
import { ScrollView, StatusBar, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, Navbar, OptionPicker, Text, TextInput } from '../../../global/components';
import _ from '../../../global/styles';
import { isEmpty, POST, Toast } from '../../../helper/utils';

export default ({navigation, route}) => {
    const addNewUser = route.params?.addNewUser;
    const [loading, setLoading] = useState(false);

    const auth = useSelector((s) => s.login.tipe);

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const typeRef = useRef();

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

    const save = async () => {
        setLoading(true);
        try {
            const body = {
                name: nameRef.current?.value,
                email: emailRef.current?.value,
                password: passwordRef.current?.value,
                types: typeRef.current?.value,
            };

            const res = await POST({url: '/register', body});
            const result = res?.data;

            console.log({result});

            if (result.status == 'success' && result.code === 200) {
                if (typeof addNewUser == 'function') {
                    addNewUser(result.data.user);
                }
                Toast(result.message);
                nameRef.current?.setValue();
                emailRef.current?.setValue();
                passwordRef.current?.setValue();
            } else if (result.status == 'validation' || result.code == 401) {
                Toast(result.message);
                nameRef.current?.setValue();
                emailRef.current?.setValue();
                passwordRef.current?.setValue();
                nameRef.current?.setErrMessage(result?.data?.name[0]);
                emailRef.current?.setErrMessage(result?.data?.email[0]);
                passwordRef.current?.setErrMessage(result?.data?.password[0]);
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.log('[save] is error ', error);
        }
        setLoading(false);
    };
    //#endregion Method

    //#region Handler
    const handlerSave = () => {
        try {
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
            if (isEmpty(passwordRef.current?.value)) {
                passwordRef.current?.setErrMessage('email tidak boleh kosong');
                passwordRef.current?.focus();
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
            <Navbar weight="bold">Tambah Pengguna</Navbar>
            <View style={[_.flex]}>
                <ScrollView contentContainerStyle={[_.flexGrow]} showsVerticalScrollIndicator={false}>
                    <View style={[_.mv_2]}>
                        <Text size={14} weight="bold" color="primary" style={[_.mh_2, _.mb_2, {textTransform: 'uppercase'}]}>
                            Akun
                        </Text>
                        <TextInput
                            ref={nameRef}
                            label="Nama"
                            editable={!loading}
                            returnKeyType="next"
                            placeholder="Budi"
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
                            ref={emailRef}
                            label="Email"
                            editable={!loading}
                            keyboardType="email-address"
                            returnKeyType="next"
                            placeholder="contoh@sampel.com"
                            onSubmitEditing={() => {
                                try {
                                    if (!isEmpty(emailRef?.current?.value)) {
                                        emailRef.current?.setErrMessage();
                                    } else {
                                        nameRef.current?.setErrMessage('nama tidak boleh kosong');
                                    }
                                } catch (error) {}
                            }}
                        />
                        <OptionPicker ref={typeRef} editAble={!loading} label="Tipe User" defaultValue={{id: 5, label: 'staf'}} options={validate} />
                        <TextInput
                            ref={passwordRef}
                            editable={!loading}
                            placeholder="Kata Sandi"
                            returnKeyType="next"
                            disableForm
                            password
                            containerStyle={[_.mm(0)]}
                            onSubmitEditing={() => {
                                try {
                                    if (!isEmpty(emailRef?.current?.value)) {
                                        emailRef.current?.setErrMessage();
                                        handlerSave();
                                    } else {
                                        nameRef.current?.setErrMessage('nama tidak boleh kosong');
                                    }
                                } catch (error) {}
                            }}
                        />
                        <Button loading={loading} onPress={handlerSave} style={[_.m_2, _.shadowSmooth]}>
                            Simpan
                        </Button>
                    </View>
                </ScrollView>
            </View>
        </>
    );
};
