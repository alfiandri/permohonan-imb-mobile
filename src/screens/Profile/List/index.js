import axios from 'axios';
import lodash from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, FlatList, Platform, StatusBar, TouchableOpacity, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Navbar, Text, ViewError} from '../../../global/components';
import _, {COLORS} from '../../../global/styles';
import {GET, isEmpty, screenWidth, Toast} from '../../../helper/utils';
import {ProfileListBanner} from './conponents';

const FETCH = axios.CancelToken.source();

export default ({navigation, route}) => {
    let [totalData, setTotalData] = useState(0);
    let [data, setData] = useState();
    let [keyword, setKeyword] = useState();
    const [loadMore, setLoadMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const page = useRef(1);
    const disableLoadMore = useRef(false);

    const searchRef = useRef();
    const errorRef = useRef();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            FETCH?.cancel();
            const config = {
                url: '/users',
                params: {keyword: searchRef.current?.keyword, page: page.current},
                any: {CancelToken: FETCH?.token},
            };
            const res = await GET(config);
            const result = res.data;

            if (result.status == 'success' && result.code === 200) {
                if (data) {
                    data = lodash.unionBy(data, result.data.data, 'id');
                } else {
                    data = result.data.data;
                    if (isEmpty(result?.data?.data)) {
                        setData(data);
                        errorRef.current?.mode('empty');
                        errorRef.current?.setErrMessage(
                            isEmpty(keyword) ? 'Data User yang anda minta belum tersedia' : `Data User dengan keyword ${keyword} tidak tersedia`,
                        );
                        return;
                    }
                }

                const {current_page, last_page, total} = result.data;
                disableLoadMore.current = current_page >= last_page;
                setTotalData(total);
                setData(data);
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.log('[fetchData] is error ', error);
            setData('error');
            errorRef.current?.setErrMessage('gagal memuat data Area blog');
        }
        setRefreshing(false);
        setLoadMore(false);
    };

    const search = () => {
        try {
            data = undefined;
            page.current = 1;
            disableLoadMore.current = false;
            setData(data);
            setTotalData(0);
            setLoadMore(false);
            setKeyword(searchRef.current?.keyword);
            fetchData();
        } catch (error) {
            console.log('search is error ', error);
        }
    };

    const doRefresh = () => {
        try {
            data = undefined;
            page.current = 1;
            disableLoadMore.current = false;
            searchRef.current?.setKeyword();
            setData(data);
            setKeyword(undefined);
            setTotalData(0);
            setLoadMore(false);
            setRefreshing(true);
            fetchData();
        } catch (error) {
            console.log('[doRefresh] is error ', error);
        }
    };

    const getMore = () => {
        if (!disableLoadMore.current && !loadMore) {
            page.current++;
            setLoadMore(true);
            fetchData();
        }
    };

    const addNewUser = (item) => {
        data.unshift(item);
        setData([...data]);
        setTotalData(totalData + 1);
    };

    const deleteUser = (dataId) => {
        const index = data.findIndex((s) => s?.id == dataId);
        if (index > -1) {
            data.splice(index, 1);
            setData([...data]);
            setTotalData(totalData - 1);
        }
    };

    const onPress = (item) => {
        if (isEmpty(item?.id)) {
            Toast('Maaf, data tanaman yang anda pilih belum tersedia');
            return;
        }
        navigation.push('ProfileDetail', {...item, deleteUser});
    };

    const renderItem = ({item, index}) => {
        return (
            <TouchableOpacity key={index} onPress={() => onPress(item)} style={[_.row, _.m_1, _.mh_2, _.pv_1, _.itemsCenter]}>
                <Text style={[_.flex, _.mr_1]}>{item?.name}</Text>
                <Icon name="chevron-right" size={16} />
            </TouchableOpacity>
        );
    };

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <Navbar>
                <Text size={18} weight="bold">
                    Daftar Pengguna
                </Text>
            </Navbar>
            <View style={[_.flex]}>
                <FlatList
                    data={!isEmpty(data) && data != 'error' ? data : []}
                    keyExtractor={(v) => (typeof v.id == 'number' ? v.id.toString() : v.id)}
                    renderItem={renderItem}
                    refreshing={refreshing}
                    onRefresh={doRefresh}
                    onEndReachedThreshold={0.9}
                    onEndReached={getMore}
                    ListHeaderComponent={
                        <>
                            {data != 'error' && (
                                <>
                                    <ProfileListBanner ref={searchRef} addNewUser={addNewUser} onEndEditting={() => search()} />
                                    <View style={[_.pv_2, _.m_2, _.borderColor('primaryLight'), {borderBottomWidth: 1.5}]}>
                                        <Text>
                                            Hasil <Text weight="bold">({totalData})</Text>
                                        </Text>
                                    </View>
                                </>
                            )}
                        </>
                    }
                    contentContainerStyle={_.flexGrow}
                    ListFooterComponentStyle={_.flexGrow}
                    ListFooterComponent={
                        data ? (
                            data != 'error' && !isEmpty(data) ? (
                                loadMore && <ActivityIndicator color={COLORS.secondaryDark} size={Platform.OS == 'ios' ? 'small' : 'large'} />
                            ) : (
                                <ViewError ref={errorRef} onPress={doRefresh} />
                            )
                        ) : (
                            <SkeletonPlaceholder>
                                {new Array(3).fill('').map((v, i) => (
                                    <View key={i} style={[_.width(screenWidth - 32), _.height(20), _.m_2]} />
                                ))}
                            </SkeletonPlaceholder>
                        )
                    }
                />
            </View>
        </>
    );
};
