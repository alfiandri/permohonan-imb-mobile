import axios from 'axios';
import moment from 'moment';
import 'moment/locale/id';
import React from 'react';
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Navbar, Text, ViewError } from '../../global/components';
import _ from '../../global/styles';
import { useNotification } from '../../helper/hooks/notifications';
import { screenWidth } from '../../helper/utils';

const FETCH = axios.CancelToken?.source();

export default ({navigation}) => {
  const {data, loading, refreshing, err, errMessage, doRefresh} =
    useNotification();
  const STATUSBAR_HEIGHT = StatusBar.currentHeight;

  const styles = StyleSheet.create({
    container: {
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 6,
      shadowOpacity: 0.26,
      elevation: 8,
      backgroundColor: 'white',
      paddingTop: 30,
      paddingLeft: 20,
      paddingBottom: 10,
      borderRadius: 30,
      flexDirection: 'row',
    },
    image: {
      width: 70,
      height: 70,
      borderRadius: 10,
    },
    titleContainer: {
      flex: 1,
    },
    description: {
      flexWrap: 'wrap',
      fontWeight: '400',
      fontSize: 13,
      marginHorizontal: 10,
    },
    title: {
      flexWrap: 'wrap',
      fontWeight: 'bold',
      fontSize: 16,
      marginTop: -20,
      marginHorizontal: 10,
    },
  });

  function renderItems(item, index, array) {
    return (
      <View
        key={index}
        style={[
          _.mh_2,
          // eslint-disable-next-line react-native/no-inline-styles
          index != array.length - 1,
        ]}>
        <View style={[_.row, _.itemsCenter, _.pv_2, _.ph_1]}>
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.description}>
                <Icon name="clock" size={12} /> {''}
                {moment(item.created_at).fromNow()}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Navbar color="white" disableBack>
        <Text size={28} weight="bold">
          Notifikasi
        </Text>
      </Navbar>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[_.pt_2, _.bgColor('white')]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={doRefresh} />
        }>
        <View>
          {!loading ? (
            !err ? (
              data?.data?.length > 0 ? (
                data.data.map(renderItems)
              ) : (
                <ViewError empty onPress={doRefresh} />
              )
            ) : (
              <ViewError onPress={doRefresh}>{errMessage}</ViewError>
            )
          ) : (
            <SkeletonPlaceholder>
              <View style={[_.row, _.wrap]}>
                {Array(4)
                  .fill('')
                  .map((v, i) => (
                    <View
                      key={i}
                      style={[
                        _.width(screenWidth - 32),
                        _.height(60),
                        _.mh_2,
                        _.mb_2,
                      ]}
                    />
                  ))}
              </View>
            </SkeletonPlaceholder>
          )}
        </View>
      </ScrollView>
    </>
  );
};
