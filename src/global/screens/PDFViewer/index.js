import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import Pdf from 'react-native-pdf';
import {useSelector} from 'react-redux';
import {isEmpty, Toast} from '../../../helper/utils';
import {Navbar, ViewError} from '../../components';
import _ from '../../styles';

export default ({navigation, route}) => {
    const name = route?.params?.name;
    const uri = route?.params?.uri;
    const token = useSelector((s) => s.login.token);

    const [loading, setLoading] = useState(true);

    const errRef = useRef();

    const source = {
        uri,
        method: 'GET',
        // cache: true,
        // expiration: 1800,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/pdf',
            // Accept: 'application/xhtml+xml',
        },
    };

    useEffect(() => {
        console.log({source, token});
        if (isEmpty(uri)) {
            Toast('Maaf, Pdf belum tersedia');
            navigation.pop();
        }
    }, []);

    const doRefresh = () => {
        setLoading(true);
    };

    const onError = (error) => {
        try {
            console.log('[onError]', error);
            setLoading('error');
            errRef?.current?.setErrMessage('Gagal dalam menampilkan pdf');
        } catch (err) {
            console.log('[onError] is error ', err);
        }
    };

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <Navbar weight="bold">Pdf {name}</Navbar>
            <SafeAreaView style={[_.flex]}>
                <View style={[_.flex]}>
                    {loading != 'error' && !isEmpty(uri) ? (
                        <Pdf
                            source={source}
                            onLoadComplete={(numberOfPages, filePath) => {
                                setLoading(false);
                                console.log(`number of pages: ${numberOfPages}`);
                            }}
                            onError={onError}
                            style={[_.flex]}
                        />
                    ) : (
                        <ViewError ref={errRef} onPress={doRefresh} />
                    )}
                </View>
            </SafeAreaView>
        </>
    );
};
