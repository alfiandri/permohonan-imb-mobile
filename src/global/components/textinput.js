import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import { Button, Text } from '.';
import { isEmpty } from '../../helper/utils';
import _, { COLORS, FONTS } from '../styles';

export default forwardRef(
  /**
   * @param {import('react-native').TextInputProps} props
   */
  (props, ref) => {
    const {
      label,
      editable = true,
      disableForm = false,
      password = false,
      disableBorder = false,
      onEndEditing = () => {},
      onReset = () => {},
      defaultValue,
      rightLabel,
      containerStyle,
      style,
    } = props;

    const [value, setValue] = useState(defaultValue ?? undefined);
    const [showPassword, setShowPassword] = useState(false);
    const [errMessage, setErrMessage] = useState();
    const input = useRef();

    useImperativeHandle(ref, () => ({
      value,
      setValue,
      setErrMessage,
      focus: () => input.current?.focus(),
      reset,
    }));

    const change = () => {
      onEndEditing(value);
    };

    const reset = () => {
      setValue();
      setErrMessage();
      onReset();
    };

    return (
      <>
        <View style={[_.mh_2, _.mb_2, _.bgColor('white')]}>
          <View style={[_.row, _.itemsCenter, containerStyle]}>
            {!disableForm && <Text>{label ?? 'label'}</Text>}
          </View>
          <View style={[_.row, _.itemsCenter, containerStyle]}>
            <TextInput
              ref={input}
              value={value}
              onChangeText={setValue}
              style={[
                _.flex,
                _.height(45),
                !isEmpty(rightLabel) && _.mr_1,
                _.radius(6),
                _.borderWidth(1.5),
                _.ph_1,
                _.borderColor('grey'),
                {
                  fontFamily: FONTS.primary.reguler,
                  fontSize: 16,
                  color: editable ? COLORS.black : COLORS.grey,
                  textAlign: disableForm ? 'left' : 'left',
                },
                style,
              ]}
              onSubmitEditing={change}
              secureTextEntry={password ? !showPassword : false}
              {...props}
            />
            {!isEmpty(rightLabel) && <Text color="primary">{rightLabel}</Text>}
            {password && (
              <Button
                onPress={() => setShowPassword(!showPassword)}
                icon={showPassword ? 'eye' : 'eye-slash'}
                color="transparent"
                textColor={COLORS.black}
              />
            )}
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
