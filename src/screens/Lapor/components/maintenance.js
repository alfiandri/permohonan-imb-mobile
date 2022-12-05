import React, {useState} from 'react';
import {ActivityIndicator, Modal, Platform, View} from 'react-native';
import {MaintenanceTODO, Text} from '../../../global/components';
import _, {COLORS} from '../../../global/styles';
import {isEmpty, screenWidth} from '../../../helper/utils';

export default ({data = undefined}) => {
    const [loading, setLoading] = useState(false);

    const renderItems = (item, index) => {
        return <MaintenanceTODO data={item} key={index} onLoading={setLoading} />;
    };

    return (
        !isEmpty(data) && (
            <>
                <Modal visible={loading} transparent statusBarTranslucent>
                    <View style={[_.flex, _.bgColor('#00000060')]}>
                        <View style={[_.squere(screenWidth * 0.5), _.radius(8), _.mAuto, _.itemsCenter, _.contentCenter, _.bgColor('#00000050')]}>
                            <ActivityIndicator size={Platform.OS == 'ios' ? 'small' : 'large'} color={COLORS.white} />
                            <Text weight="bold" color="white" style={[_.mt_2]}>
                                Sedang Memproses...
                            </Text>
                        </View>
                    </View>
                </Modal>
                <View style={[_.mv_2]}>
                    <Text size={14} weight="bold" color="primary" style={[_.mh_2, _.mb_2, {textTransform: 'uppercase'}]}>
                        Perawatan
                    </Text>
                    {data.map((item, index) => {
                        if (!isEmpty(item?.maintenance)) {
                            return (
                                <View key={index} style={[_.mb_2]}>
                                    <View
                                        style={[
                                            _.row,
                                            _.itemsCenter,
                                            _.bgColor('white'),
                                            {borderBottomWidth: 1, borderBottomColor: COLORS.primaryLight},
                                        ]}>
                                        <Text weight="bold" style={[_.flex, _.pv_2, _.ml_2]}>
                                            Area/Blog {item?.area?.name}
                                        </Text>
                                    </View>
                                    {item?.maintenance.map(renderItems)}
                                </View>
                            );
                        }
                    })}
                </View>
            </>
        )
    );
};
