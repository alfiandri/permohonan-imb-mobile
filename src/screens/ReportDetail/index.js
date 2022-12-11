/* eslint-disable no-unused-vars */
import moment from 'moment';
import 'moment/locale/id';
import { default as React } from 'react';
import Timeline from 'react-native-timeline-flatlist';
import { Navbar, StatusBar, Text } from '../../global/components';
import _, { COLORS } from '../../global/styles';

export default ({navigation, route}) => {
  const {data: paramsData = {}} = route?.params;

  const responses = paramsData.responses;

  const data = [
    {
      time: moment(paramsData.created_at).fromNow(),
      title: paramsData.title,
      description: paramsData.description,
    },
  ];

  for (let index = 0; index < responses.length; index++) {
    let newArr = {
      time: moment(responses[index].created_at).fromNow(),
      title: 'Petugas membalas',
      description: responses[index].response,
    };
    data.push(newArr);
  }

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Navbar color={COLORS.grey}>
        <Text size={28} weight="bold">
          Detail Laporan
        </Text>
      </Navbar>
      <Text size={18} weight="600" style={_.m_2}>
        {paramsData.title}
      </Text>
      <Timeline style={_.m_2} data={data} />
    </>
  );
};
