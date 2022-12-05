import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Button, Text, TextInput} from '../../../global/components';
import _, {COLORS} from '../../../global/styles';
import {isEmpty, screenWidth} from '../../../helper/utils';

export default ({data = undefined}) => {
    const navigation = useNavigation();

    return (
        !isEmpty(data) && (
            <>
                <View style={[_.mv_2]}>
                    <Text size={14} weight="bold" color="primary" style={[_.mh_2, _.mb_2, {textTransform: 'uppercase'}]}>
                        Tanaman
                    </Text>
                    <View style={[_.mb_2]}>
                        <View style={[_.row, _.itemsCenter, _.bgColor('white'), {borderBottomWidth: 1, borderBottomColor: COLORS.primaryLight}]}>
                            <Text weight="bold" style={[_.flex, _.ml_2]}>
                                Jenis Tanaman
                            </Text>
                            <Button onPress={() => navigation.navigate('Tanaman')} color="transparent" textColor="secondary">
                                Lihat Semua
                            </Button>
                        </View>
                        {data.map((item, index) => (
                            <TextInput
                                key={index}
                                editable={false}
                                label={item?.name}
                                defaultValue={item?.total_area?.toString() ?? '0'}
                                rightLabel="Area/Blog"
                            />
                        ))}
                    </View>
                </View>
            </>
        )
    );
};
