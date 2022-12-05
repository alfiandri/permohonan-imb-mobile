/* eslint-disable no-unused-vars */
import moment from 'moment';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Navbar, StatusBar, Text } from '../../global/components';
import _, { COLORS } from '../../global/styles';

export default ({navigation, route}) => {
  const {data: paramsData = {}} = route?.params;

  console.log(paramsData);

  const styles = StyleSheet.create({
    newsContainer: {
      padding: 10,
    },
    title: {
      fontSize: 18,
      marginTop: 10,
      fontWeight: '600',
    },
    newsDescription: {
      fontSize: 16,
      marginTop: 10,
    },
    date: {
      fontSize: 14,
    },
    spinner: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 400,
    },
  });

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
      <View>
        <View style={_.pm(10)}>
          <Text style={styles.title}>Title: {paramsData.title}</Text>
          <Text style={styles.title}>
            Kategori: {paramsData.category.title}
          </Text>
          <Text style={styles.title}>Deskripsi: {paramsData.description}</Text>
          <Text style={styles.title}>Pelapor: {paramsData.reporter.nama}</Text>
          <Text style={styles.title}>
            Tanggal Laporan: {moment(paramsData.created_at).format('LLL')}
          </Text>
          <Text style={styles.title}>Tipe: {paramsData.type}</Text>
          <Text style={styles.title}>Status: {paramsData.status}</Text>
        </View>
      </View>
    </>
  );
};
