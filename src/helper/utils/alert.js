import React, {Component, forwardRef} from 'react';
import {Platform, View, Alert, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Text} from '../../global/components';
import _ from '../../global/styles';
import {screenHeight, screenWidth} from './common';

const AlertContainer = ({title = '', message = '', buttons = [{text: '', onPress: () => {}}]}) => {
    return (
        <View style={[_.absoluteFull, {zIndex: 1000}]}>
            <TouchableWithoutFeedback>
                <View style={[_.width(screenWidth), _.height(screenHeight), _.absoluteFull, _.bgColor('#00000040')]} />
            </TouchableWithoutFeedback>
            <View style={[_.flex]}>
                <View style={[_.width(screenWidth * 0.7), _.mAuto, _.radius(10), _.bgColor('white')]}>
                    <View style={[_.m_2]}>
                        <Text weight="bold" align="center" style={[_.mb_2]}>
                            {title}
                        </Text>
                        <Text size={14} align="center">
                            {message}
                        </Text>
                    </View>
                    <View style={[_.row, _.flexWrap]}>
                        <TouchableOpacity style={[_.flex, _.p_2]}>
                            <Text align="center" size={14}>
                                Test kadj nkaj dka dkja kdj akj dkja dkj ajd aj dkja dkja d
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[_.flex, _.p_2]}>
                            <Text align="center" size={14}>
                                Test kadj nkaj dka dkja kdj akj dkja dkj ajd aj dkja dkja d
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ({title, message, buttons = [], cancelable = true, onDismiss = () => {}}) => {
    try {
        // Check Platfrom
        return <AlertContainer title={title} message={message} buttons={buttons} />;
        // switch (Platform.OS) {
        //     case 'android':
        //         return <AlertContainer title={title} message={message} buttons={buttons} />;
        //     default:
        //         return Alert.alert(title, message, buttons, {cancelable, onDismiss});
        // }
    } catch (error) {
        console.log('[Alert] is error ', error);
    }
};
