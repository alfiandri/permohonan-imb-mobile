import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import { Button, Text, TextInput } from '.';
import { isEmpty, isTrue, POST, Toast } from '../../helper/utils';
import _, { COLORS } from '../styles';

export default ({data = undefined, onLoading = () => {}, style = {}}) => {
    let [maintenance, setMaintenance] = useState();
    const [loading, setLoading] = useState(false);

    const auth = useSelector((s) => s?.login?.tipe);

    useEffect(() => {
        if (!isEmpty(data)) {
            maintenance = data;
            setMaintenance(data);
        }
    }, [data]);

    //#region Method
    const verify = async () => {
        try {
            const res = await POST({url: `/maintenance-verify/${maintenance?.id}`});
            const result = res.data;

            console.log({result});

            if (result.status == 'success' && result.code === 200) {
                setMaintenance({...result?.data});
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.log('[Verify] is error ', error);
            Toast(error.message);
        }
        setLoading(false);
        onLoading(false);
    };
    //#endregion Method

    //#region Handler
    const handlerVerify = () => {
        try {
            if (!isEmpty(maintenance?.id)) {
                if (loading) {
                    return;
                }

                setLoading(true);
                onLoading(true);
                verify();
            } else {
                Toast('Data perawatan tidak valid');
            }
        } catch (error) {
            console.log('[HandlerVerify] is error ', error);
        }
        setLoading(false);
    };
    //#endregion Handler

    return (
        <>
            <View style={[_.mb_2, _.ph_2, _.pb_2, _.bgColor('white'), style]}>
                <TextInput editable={false} defaultValue={maintenance?.name} label="Label Perawatan" />
                <View style={[_.row, _.p_2, {borderBottomColor: COLORS.primaryLight, borderBottomWidth: 1}]}>
                    <Text color="primaryDark" style={[_.flex, _.mr_2]}>
                        Status
                    </Text>
                    <View style={[_.row, _.itemsCenter]}>
                        <Text weight="bold" color={isTrue(maintenance?.status) ? 'success' : 'warning'} style={_.mr_1}>
                            {isTrue(maintenance?.status) ? 'selesai' : 'pending'}
                        </Text>
                        <Icon
                            name={isTrue(maintenance?.status) ? 'check-circle' : 'exclamation-circle'}
                            size={24}
                            color={isTrue(maintenance?.status) ? COLORS.success : COLORS.warning}
                        />
                    </View>
                </View>
                <View style={[_.row, _.itemsCenter, _.p_2]}>
                    <Text size={14} color="primaryDark" style={[_.flex, _.mr_2]}>
                        tgl. kegiatan {moment(maintenance?.schedule).format('LL')}
                    </Text>
                    {auth != 'admin' && auth != 'head_development' && !isTrue(maintenance?.status) && (
                        <Button onPress={handlerVerify} small style={[_.selfEnd]} loading={loading}>
                            Verifikasi
                        </Button>
                    )}
                </View>
            </View>
        </>
    );
};
