import React, {
    useImperativeHandle, useRef, useState
} from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Text } from '../../../../global/components';
import _, { COLORS, FONTS } from '../../../../global/styles';
import { isEmpty } from '../../../../helper/utils';

const Input = (
  {
    value = '',
    setValue = () => {},
    onEndEditing = () => {},
    onChange = () => {},
    errMessage = '',
    label = '',
    placeholder = '',
    style = {},
    containerStyle = {},
    keyboardType = 'default',
    password = false,
    returnKeyType = 'done',
  },
  ref,
) => {
  const [show, setShow] = useState(true);

  const inputRef = useRef();

  useImperativeHandle(ref, () => ({focus: () => inputRef.current.focus()}));

  return (
    <>
      <View style={style}>
        <View
          style={[
            _.pl_2,
            errMessage != '' && _.mb_1,
            _.radius(8),
            _.bgColor('greyLight'),
            !isEmpty(errMessage) && _.borderWidth(1.5),
            !isEmpty(errMessage) && _.borderColor('danger'),
            {overflow: 'hidden'},
            containerStyle,
          ]}>
          <Text size={10} color="primaryDark" style={[_.mt_1]}>
            {label}
          </Text>
          <View style={[_.row, _.itemsCenter]}>
            <TextInput
              ref={inputRef}
              value={value}
              onChange={onChange}
              onChangeText={setValue}
              onEndEditing={onEndEditing}
              placeholder={placeholder}
              secureTextEntry={password ? show : false}
              dataDetectorTypes="all"
              blurOnSubmit
              keyboardType={keyboardType}
              placeholderTextColor={COLORS.greyDark}
              returnKeyType={returnKeyType}
              autoCapitalize="none"
              autoCorrect={false}
              style={[
                _.flex,
                _.pv_1,
                _.mr_2,
                {
                  fontSize: 13,
                  color: COLORS.black,
                  fontFamily: FONTS.primary.reguler,
                },
              ]}
            />
            {password && (
              <TouchableOpacity onPress={() => setShow(!show)} style={[_.mh_2]}>
                <Icon
                  name={show ? 'eye' : 'eye-slash'}
                  size={18}
                  color={COLORS.blackDark200}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {!isEmpty(errMessage) && (
          <Text size={12} color={COLORS.danger} style={_.mh_2}>
            {errMessage}
          </Text>
        )}
      </View>
    </>
  );
};
export default React.forwardRef(Input);
