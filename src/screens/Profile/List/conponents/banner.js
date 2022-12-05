import {useNavigation} from '@react-navigation/native';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import _, {COLORS, FONTS} from '../../../../global/styles';
import {isEmpty} from '../../../../helper/utils';

export default forwardRef(
    /**
     *
     * @param {Object} props
     * @param {Function} props.onEndEditing
     */
    ({addNewUser, onEndEditting = () => {}}, ref) => {
        const [keyword, setKeyword] = useState();

        const navigation = useNavigation();
        const auth = useSelector((s) => s.login);

        useImperativeHandle(ref, () => ({keyword, setKeyword}));

        const roleAllow = ['superadmin', 'admin'];
        const isAllow = !isEmpty(roleAllow.find((s) => s == auth.role));

        return (
            <View style={[_.row, _.p_2, _.bgColor('secondary'), {borderBottomLeftRadius: 10, borderBottomRightRadius: 10}]}>
                <View style={[_.flex, _.row, _.ph_2, _.itemsCenter, _.radius(10), _.bgColor('white')]}>
                    <TextInput
                        value={keyword}
                        onChangeText={setKeyword}
                        onEndEditing={onEndEditting}
                        placeholder={'Cari, cth: Budi'}
                        returnKeyType="search"
                        style={[_.flex, _.height(45), _.mr_1, {fontFamily: FONTS.secondary.medium, fontSize: 16}]}
                    />
                    <Icon name="search" size={16} color={COLORS.secondaryDark} />
                </View>
                {isAllow && (
                    <TouchableOpacity
                        onPress={() => navigation.push('ProfileAdd', {addNewUser})}
                        style={[_.width(45), _.height(45), _.ml_1, _.contentCenter, _.itemsCenter, _.radius(8), _.bgColor('info')]}>
                        <Icon name="plus" color="white" size={18} />
                    </TouchableOpacity>
                )}
            </View>
        );
    },
);
