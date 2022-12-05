import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Text} from '.';
import _, {COLORS} from '../styles';

export default forwardRef(
    /**
     *
     * @param {Object} props
     * @param {''} props.label
     * @param {{}} props.value
     * @param {[]} props.options
     * @param {Function} props.onChange
     * @param {''} props.keyValue
     * @param {''} props.keyLabel
     * @param {import('react-native').ViewStyle} props.style
     * @param {*} ref
     * @returns
     */
    ({label = 'label', value = {}, options = [], onChange = () => {}, keyValue = 'id', keyLabel = 'label', style}, ref) => {
        const [showOptions, setShowOptions] = useState(false);

        useImperativeHandle(ref, () => ({close: () => setShowOptions(false)}));

        const onPress = item => {
            onChange(item);
            setShowOptions(false);
        };

        const renderOptions = (item, i, arr) => {
            const isSelected = value[keyValue] == item[keyValue];
            const isLast = i != arr.length - 1;
            return (
                <TouchableOpacity
                    onPress={onPress.bind(this, item)}
                    key={i}
                    style={[_.row, _.itemsCenter, _.mh_1, {minHeight: 40, borderBottomColor: COLORS.grey}, isLast && {borderBottomWidth: 1.5}]}>
                    <Text style={[_.flex]}>{item[keyLabel]}</Text>
                    {isSelected && <Icon name="check" color={COLORS.success} size={18} style={_.mr_1} />}
                </TouchableOpacity>
            );
        };

        return (
            <>
                <View style={[_.mh_2, _.mb_3, style]}>
                    <Text weight="semibold" style={[_.mb_1]}>
                        {label}
                    </Text>
                    <TouchableOpacity
                        onPress={setShowOptions.bind(this, true)}
                        disabled={showOptions}
                        style={[!showOptions && _.row, _.itemsCenter, _.p_1, _.radius(6), _.borderWidth(1.5), _.borderColor('grey')]}>
                        {!showOptions ? (
                            <>
                                <Text style={[_.flex]}>{value[keyLabel]}</Text>
                                <Icon name="angle-down" size={18} color={COLORS.grey} style={_.mr_1} />
                            </>
                        ) : (
                            <>{options.map(renderOptions)}</>
                        )}
                    </TouchableOpacity>
                </View>
            </>
        );
    }
);
