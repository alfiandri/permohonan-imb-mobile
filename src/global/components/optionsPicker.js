import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Modal, Text } from '.';
import { isEmpty } from '../../helper/utils';
import _, { COLORS } from '../styles';

export default forwardRef(
  /**
   *
   * @param {Object} props
   * @param {String} props.label
   * @param {String} props.keyValue
   * @param {String} props.keyLabel
   * @param {[]} props.options
   * @param {{}} [props.defaultValue]
   * @param {Function} [props.onChange]
   * @param {String} [props.placeholder]
   * @param {true} [props.editAble]
   * @param {import('react-native/Libraries/StyleSheet/StyleSheet').ViewStyleProp} [props.style]
   * @param {import('react-native/Libraries/StyleSheet/StyleSheet').ViewStyleProp} [props.containerStyle]
   * @returns
   */
  (
    {
      label = 'Label',
      defaultValue = undefined,
      keyValue = 'id',
      keyLabel = 'label',
      options = [],
      onChange = () => {},
      placeholder = 'Pilih',
      style = {},
      editAble = true,
      containerStyle = {},
    },
    ref,
  ) => {
    const [value, setValue] = useState(defaultValue ?? undefined);
    const [errMessage, setErrMessage] = useState();

    const modal = useRef();

    useImperativeHandle(ref, () => ({
      value: value?.[keyValue],
      setValue,
      setErrMessage,
      focus: () => {
        modal?.current?.show();
      },
      reset,
    }));

    const reset = () => {
      setValue(defaultValue);
      setErrMessage();
    };

    //#region Render
    const renderOptions = (item, index) => {
      const selected = item?.[keyValue] == value?.[keyValue];
      return (
        <TouchableOpacity
          onPress={() => {
            try {
              setValue(item);
              onChange(item);
              modal.current?.close();
            } catch (error) {}
          }}
          key={index}
          style={[_.row, _.height(45), _.mh_2]}>
          <Text style={[_.flex, _.mr_2]}>{item?.[keyLabel]}</Text>
          {selected && (
            <Icon name="check-circle" color={COLORS.success} size={20} />
          )}
        </TouchableOpacity>
      );
    };
    //#endregion Render

    return (
      <>
        <Modal ref={modal} placeholder={label} style={{minHeight: 120}}>
          <View>
            {Array.isArray(options) && options.length > 0 && (
              <View>{options.map(renderOptions)}</View>
            )}
          </View>
        </Modal>
        <View style={[_.p_1, _.ph_2, _.bgColor('white'), containerStyle]}>
          <Text style={[_.mr_2]}>{label}</Text>
          <View
            style={
              ([_.row, _.itemsCenter, style],
              {borderBottomColor: COLORS.grey, borderBottomWidth: 1})
            }>
            <TouchableOpacity
              disabled={!editAble}
              onPress={() => modal?.current.show()}
              style={[_.flex, _.row]}>
              <Text
                color={
                  !isEmpty(value?.[keyLabel])
                    ? editAble
                      ? 'black'
                      : 'primary'
                    : 'primary'
                }
                align="left"
                style={[_.flex, editAble && _.mr_2]}>
                {value?.[keyLabel] ?? placeholder}
              </Text>
              {editAble && <Icon name="chevron-down" size={16} />}
            </TouchableOpacity>
          </View>
          {!isEmpty(errMessage) && (
            <Text color="danger" size={14}>
              {errMessage}
            </Text>
          )}
        </View>
      </>
    );
  },
);
