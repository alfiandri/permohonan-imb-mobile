import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Text } from '.';
import { isEmpty, screenWidth } from '../../helper/utils';
import _, { COLORS } from '../styles';

export default ({
  disableImage = false,
  empty = false,
  customImage = {},
  onPress = () => {},
  children,
  style = {},
  buttonStyle = {},
  titleStyle = {},
  descStyle = {},
}) => {
  return (
    <View style={[_.mvAuto, _.mhAuto, style]}>
      {!disableImage && (
        <Image
          source={
            !isEmpty(customImage)
              ? customImage
              : !empty
              ? require('../../assets/images/error.png')
              : require('../../assets/images/empty.png')
          }
          style={[
            _.width(screenWidth * 0.7),
            _.height(screenWidth * 0.7),
            _.selfCenter,
          ]}
          resizeMode="contain"
        />
      )}

      <Text
        size={14}
        align="center"
        color="primaryDark"
        style={[_.mt_5, titleStyle]}>
        {!empty
          ? 'Maaf, terjadi kesalahan pada sistem...'
          : 'Maaf, data belum tersedia'}
      </Text>
      {!empty && (
        <Text
          size={12}
          weight="bold"
          align="center"
          style={[
            _.width(screenWidth * 0.86),
            _.mt_1,
            // eslint-disable-next-line react-native/no-inline-styles
            {textTransform: 'capitalize'},
            descStyle,
          ]}>
          {children}
        </Text>
      )}
      <TouchableOpacity onPress={onPress} style={buttonStyle}>
        <Text
          size={14}
          align="center"
          color="primaryDark"
          style={[!empty ? _.mt_3 : _.mt_2]}>
          <Icon name="undo" size={16} color={COLORS.primaryDark} /> Muat
          Ulang...
        </Text>
      </TouchableOpacity>
    </View>
  );
};
