import moment from 'moment';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Text } from '.';
import _, { COLORS } from '../styles';

export default (
  {label = 'label', value = new Date(), onChange = () => {}, style = {}},
  ref,
) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <View style={[_.mh_2, _.mb_2, style]}>
        <Text weight="semibold" style={[_.mb_1]}>
          {label}
        </Text>
        <TouchableOpacity
          onPress={setShow.bind(this, true)}
          disabled={show}
          style={[
            _.row,
            _.itemsCenter,
            _.p_1,
            _.radius(6),
            _.borderWidth(1.5),
            _.borderColor('grey'),
          ]}>
          <Text style={[_.flex]}>{moment(value).format('LL')}</Text>
          <Icon
            name="calendar-alt"
            size={18}
            color={COLORS.grey}
            style={_.mr_1}
          />
        </TouchableOpacity>
      </View>
      <DatePicker
        modal
        open={show}
        date={value}
        mode="date"
        onConfirm={date => {
          setShow(false);
          onChange(date);
        }}
        onCancel={() => {
          setShow(false);
        }}
      />
    </>
  );
};
