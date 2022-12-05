import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from '../../../global/components';
import _, {COLORS} from '../../../global/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {isEmpty, Toast} from '../../../helper/utils';

export default ({}) => {
    const auth = useSelector((s) => s.login.role);
    const navigation = useNavigation();

    const menu = {
        Akun: [
            {
                label: 'Ubah Akun',
                icon: 'user-circle',
                navigation: 'ProfileEdit',
            },
            {
                label: 'Ubah Kata Sandi',
                icon: 'unlock-alt',
                navigation: 'ProfileChangePassword',
            },
        ],
        Pengguna: [
            {
                label: 'Tambah Pengguna',
                icon: 'user-plus',
                navigation: 'ProfileAdd',
                role: ['superadmin', 'admin'],
            },
        ],
    };

    const onPress = (navigate) => {
        try {
            if (!isEmpty(navigate)) {
                navigation.push(navigate);
            } else {
                throw new Error(`navigation is ${navigate}`);
            }
        } catch (error) {
            console.log('[onPress] is error ', error);
            Toast('Terjadi kesalahan saat menuju halaman tersebut');
        }
    };

    return (
        <>
            {Object.keys(menu).map((key, index) => {
                if (menu[key].find((s) => isEmpty(s?.role) || s?.role.find((role) => role == auth))) {
                    return (
                        <View key={index} style={[_.ph_3, _.mt_2, _.bgColor('white')]}>
                            {/* <Text weight="bold" size={18}>
                                {key}
                            </Text> */}

                            <View style={_.mt_2}>
                                {menu[key].map((item, i) => {
                                    if (isEmpty(item.role) || item?.role.find((role) => role == auth)) {
                                        return (
                                            <TouchableOpacity
                                                key={i}
                                                onPress={() => onPress(item.navigation)}
                                                style={[
                                                    _.row,
                                                    _.pv_3,
                                                    _.itemsCenter,
                                                    // menu[key].length - 1 != i && {borderBottomWidth: 1.5, borderBottomColor: COLORS.primaryLight},
                                                ]}>
                                                <Icon name={item?.icon} size={24} color={COLORS.black} />
                                                <Text weight="medium" style={[_.flex, _.ml_2]}>
                                                    {item?.label}
                                                </Text>
                                                <Icon name="angle-right" color={COLORS.greyDark} size={18} />
                                            </TouchableOpacity>
                                        );
                                    }
                                })}
                            </View>
                        </View>
                    );
                }
            })}
        </>
    );
};
