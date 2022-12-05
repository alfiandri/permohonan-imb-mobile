import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Modal, Text} from '.';
import {isEmpty} from '../../helper/utils';
import _, {COLORS} from '../styles';

export default forwardRef(
    /**
     *
     * @param {Object} props
     * @param {String} [props.placeholder]
     * @param {false} [props.important]
     * @param {true} [props.editAble]
     * @param {[]} [props.defaultValue]
     * @param {[]} [props.options]
     * @param {[]} [props.options]
     * @param {String} [props.keyValue]
     * @param {String} [props.keyLabel]
     * @param {Function} [props.onChange]
     * @param {{}} [props.children]
     */
    (
        {
            placeholder = 'Tambah',
            important = false,
            editAble = true,
            defaultValue,
            options = [],
            keyValue = 'id',
            keyLabel = 'label',
            onChange = () => {},
            children,
        },
        ref,
    ) => {
        const [value, setValue] = useState(defaultValue ?? []);
        const [errMessage, setErrMessage] = useState();

        const modal = useRef();

        useImperativeHandle(ref, () => ({value, setValue, setErrMessage, reset}));

        //#region Mwthod
        const add = (item) => {
            try {
                value.push(item);
                setValue([...value]);
                onChange(value);
                setErrMessage();
            } catch (error) {
                console.log('[Add] is error ', error);
            }
        };

        const remove = (i) => {
            try {
                if (i > -1) {
                    if (important && value.length - 1 <= 0) {
                        setErrMessage(`${placeholder} tidak boleh kosong`);
                        return;
                    }
                    value.splice(i, 1);
                    setValue([...value]);
                    onChange(value);
                    setErrMessage();
                }
            } catch (error) {
                console.log('[remove] is error ', error);
            }
        };

        const reset = () => {
            try {
                setValue([]);
                setErrMessage();
            } catch (error) {
                console.log('[Reset] is error ', error);
            }
        };
        //#endregion Method

        //#region Handler
        const handlerAdd = () => {
            try {
                modal.current?.show();
            } catch (error) {
                console.log('[handlerAdd] is error ', error);
            }
        };
        //#endregion Handler

        const renderOptions = (item, index) => {
            const selected = !isEmpty(value.find((s) => s?.[keyValue] == item?.[keyValue]));
            return (
                <TouchableOpacity onPress={() => add(item)} key={index} style={[_.row, _.height(45), _.mh_2]}>
                    <Text style={[_.flex, _.mr_2]}>{item?.[keyLabel]}</Text>
                    {selected && <Icon name="check-circle" color={COLORS.success} size={20} />}
                </TouchableOpacity>
            );
        };

        return (
            <>
                <Modal ref={modal} placeholder={placeholder}>
                    <View>{Array.isArray(options) && options.length > 0 && <View>{options.map(renderOptions)}</View>}</View>
                </Modal>
                <View style={[_.bgColor('white'), {borderBottomColor: COLORS.primaryLight, borderBottomWidth: 1}]}>
                    <TouchableOpacity onPress={handlerAdd} disabled={!editAble} style={[_.row, _.itemsCenter, _.p_1, _.ph_2]}>
                        {editAble && <Icon name="plus-circle" size={24} color={COLORS.success} style={[_.mr_2]} />}
                        <Text>{placeholder}</Text>
                    </TouchableOpacity>
                    {!isEmpty(value) &&
                        value.map((v, i) => (
                            <View
                                key={i}
                                style={[_.row, _.p_1, _.ph_2, _.bgColor('white'), {borderBottomColor: COLORS.primaryLight, borderBottomWidth: 1}]}>
                                <TouchableOpacity onPress={() => remove(i)} style={[_.mlm(-16), _.ph_2]}>
                                    <Icon
                                        name={editAble ? 'minus-circle' : 'minus'}
                                        size={24}
                                        color={editAble ? COLORS.danger : COLORS.primaryDark}
                                    />
                                </TouchableOpacity>
                                <Text>{v?.[keyLabel]}</Text>
                            </View>
                        ))}
                    {!isEmpty(errMessage) && (
                        <Text size={14} color="danger" style={[_.mh_2, _.mv_1]}>
                            {errMessage}
                        </Text>
                    )}
                </View>
            </>
        );
    },
);
