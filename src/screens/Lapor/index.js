import axios from 'axios';
import React, {useEffect} from 'react';
import {Image, RefreshControl, ScrollView, StatusBar, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {Navbar, Text, ViewError} from '../../global/components';
import _, {COLORS} from '../../global/styles';
import {useHome} from '../../helper/hooks/home';
import {isTrue, screenWidth} from '../../helper/utils';

const FETCH = axios.CancelToken?.source();

export default ({navigation}) => {
    const {data, loading, refreshing, err, errMessage, doRefresh} = useHome();

    const renderItems = (item, index, array) => {
        return (
            isTrue(item?.enabled) && (
                <View key={index} style={[_.mh_2, index != array.length - 1 && {borderBottomWidth: 1, borderBottomColor: COLORS.grey}]}>
                    <TouchableOpacity
                        onPress={() => {
                            if (item.id === 5) {
                                navigation.push('Absensi', {data: item});
                            } else if (item.id === 6) {
                                navigation.push('Penggajian', {data: item});
                            } else if (item.id === 7) {
                                navigation.push('Pabrik', {data: item});
                            } else {
                                navigation.push('Report', {data: item});
                            }
                        }}
                        style={[_.row, _.itemsCenter, _.pv_2, _.ph_1]}>
                        <View style={[_.flex, _.row, _.itemsCenter]}>
                            <Image source={{uri: item.icon}} style={[_.width(30), _.height(30)]} />
                            <Text size={14} weight="medium" color="black" style={[_.flex, _.mh_2, _.mt_1]}>
                                {item.nama_fitur}
                            </Text>
                        </View>
                        <Icon name="angle-right" color={COLORS.greyDark} size={18} />
                    </TouchableOpacity>
                </View>
            )
        );
    };

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <Navbar color="white" disableBack>
                <Text size={28} weight="bold">
                    Jenis Usaha
                </Text>
            </Navbar>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={[_.pt_2, _.bgColor('white')]}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={doRefresh} />}>
                <View>
                    {!loading ? (
                        !err ? (
                            data.length > 0 ? (
                                data.map(renderItems)
                            ) : (
                                <ViewError empty onPress={doRefresh} />
                            )
                        ) : (
                            <ViewError onPress={doRefresh}>{errMessage}</ViewError>
                        )
                    ) : (
                        <SkeletonPlaceholder>
                            <View style={[_.row, _.wrap]}>
                                {Array(4)
                                    .fill('')
                                    .map((v, i) => (
                                        <View key={i} style={[_.width(screenWidth - 32), _.height(60), _.mh_2, _.mb_2]} />
                                    ))}
                            </View>
                        </SkeletonPlaceholder>
                    )}
                </View>
            </ScrollView>
        </>
    );
};
