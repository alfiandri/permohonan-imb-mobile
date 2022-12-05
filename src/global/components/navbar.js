import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {SafeAreaView, StatusBar, TouchableOpacity, View} from 'react-native';
import {Text} from '.';
import {hasNotch} from 'react-native-device-info';
import Icon from 'react-native-vector-icons/FontAwesome5';
import _ from '../styles';

/**
 * @param {Object} props
 * @param {Boolean} [props.disableBack = false]
 * @param {import('chalk').ColorSupport} [props.color = secondary]
 * @param {('reguler' | 'bold' | 'light')} [props.weight = reguler]
 * @param {import('chalk').ColorSupport} [props.textColor = black]
 * @param {import('react-native').ViewStyle} [props.style]
 * @param {import('react-native').TextStyle} [props.textStyle]
 */
export default ({
    children,
    onLayout = () => {},
    color = 'secondary',
    weight = 'reguler',
    textColor = 'black',
    style = {},
    textStyle = {},
    disableBack = false,
}) => {
    const navigation = useNavigation();

    return (
        <>
            <SafeAreaView style={_.bgColor(color)}>
                <View
                    onLayout={onLayout}
                    style={[_.p_2, _.ptm(StatusBar?.currentHeight ? StatusBar?.currentHeight + 16 : hasNotch() ? 0 : 16), {minHeight: 50}]}>
                    {!disableBack && (
                        <TouchableOpacity
                            onPress={() => navigation.pop()}
                            style={[_.width(40), _.height(40), _.itemsCenter, _.contentCenter, _.mb_2]}>
                            <Icon name="chevron-left" size={16} color={textColor} />
                        </TouchableOpacity>
                    )}
                    {typeof children === 'string' || (Array.isArray(children) && children.find((s) => typeof s === 'string')) ? (
                        <Text color={textColor} weight={weight} style={textStyle}>
                            {children}
                        </Text>
                    ) : (
                        children
                    )}
                </View>
            </SafeAreaView>
        </>
    );
};
