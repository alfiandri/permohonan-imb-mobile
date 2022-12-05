import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Button, OptionPicker, Text, TextInput} from '../../../global/components';
import {isEmpty, screenWidth} from '../../../helper/utils';
import Icon from 'react-native-vector-icons/FontAwesome5';
import _, {COLORS} from '../../../global/styles';
import {useNavigation} from '@react-navigation/native';

export default ({data = undefined}) => {
    const navigation = useNavigation();

    return (
        !isEmpty(data) && (
            <>
                <View style={[_.mv_2]}>
                    <Text size={14} weight="bold" color="primary" style={[_.mh_2, _.mb_2, {textTransform: 'uppercase'}]}>
                        Area/Blog
                    </Text>
                    {data.map((item, index) => (
                        <View key={index} style={[_.mb_1]}>
                            <View style={[_.row, _.itemsCenter, _.bgColor('white'), {borderBottomWidth: 1, borderBottomColor: COLORS.primaryLight}]}>
                                <Text weight="bold" style={[_.flex, _.ml_2]}>
                                    Area/Blog {item?.name}
                                </Text>
                                <Button onPress={() => navigation.push('AreaBlogDetail', {...item})} color="transparent" textColor="secondary">
                                    Lihat
                                </Button>
                            </View>
                            <OptionPicker defaultValue={item?.plant} editAble={false} label="Jenis tanaman" keyLabel="name" />
                            <TextInput editable={false} defaultValue={item?.quantity?.toString() ?? '0'} label="Jumlah Tanaman" rightLabel="Batang" />
                            <OptionPicker defaultValue={item?.supervisor} editAble={false} label="Koordinator Nursary" keyLabel="name" />
                        </View>
                    ))}
                </View>
            </>
        )
    );
};
