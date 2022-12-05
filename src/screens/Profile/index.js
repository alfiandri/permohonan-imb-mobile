import axios from 'axios';
import {isEmpty} from 'lodash';
import React, {useRef} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  Navbar,
  StatusBar,
  Text,
  ViewError,
} from '../../global/components';
import _, {COLORS} from '../../global/styles';
import {useProfile} from '../../helper/hooks/profile';
import {EditPhoto, ProfileSettings} from './components';

const FETCH = axios.CancelToken.source();

export default ({navigation, route}) => {
  const {
    data,
    loading,
    setLoading,
    refreshing,
    err,
    errMessage,
    doRefresh,
    logout,
  } = useProfile();
  const {name = '', photo = null} = data;

  const modalEditPhoto = useRef();

  const buttonLogout = () => {
    setLoading(true);
    Alert.alert('Keluar', 'Apakah anda ingin keluar?', [
      {
        text: 'Batal',
        onPress: () => setLoading(false),
      },
      {text: 'Keluar', onPress: () => logout()},
    ]);
  };

  return (
    <>
      <StatusBar />
      <EditPhoto ref={modalEditPhoto} />
      <Navbar color="white" disableBack>
        <Text size={28} weight="bold">
          Pengaturan
        </Text>
      </Navbar>
      <ScrollView
        style={[_.bgColor('white')]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={_.flexGrow}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={doRefresh} />
        }>
        {!loading &&
          (!err ? (
            Object.keys(data).length ? (
              <>
                <View
                  style={[
                    _.row,
                    _.pv_2,
                    _.mt_2,
                    _.mh_2,
                    _.bgColor('white'),
                    {
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      borderTopColor: COLORS.grey,
                      borderBottomColor: COLORS.grey,
                    },
                  ]}>
                  <View>
                    <Image
                      source={
                        isEmpty(photo)
                          ? require('../../assets/images/asli.png')
                          : {uri: photo}
                      }
                      style={[_.circle(60)]}
                    />
                    <Button
                      icon="edit"
                      color="transparent"
                      solid
                      textColor="primary"
                      onPress={() => modalEditPhoto.current?.show()}
                      style={[
                        {position: 'absolute', bottom: -10, right: -15},
                        _.pm(0),
                        _.circle(40),
                      ]}
                    />
                  </View>
                  <View style={[_.flex, _.ml_3, _.contentCenter]}>
                    <Text size={12} weight="reguler" style={[_.mbm(4)]}>
                      Selamat Datang
                    </Text>
                    <Text size={20} weight="semibold" style={[]}>
                      {name}
                    </Text>
                  </View>
                </View>

                <ProfileSettings />

                <View style={[_.mb_2]}>
                  <TouchableOpacity
                    disabled={loading}
                    onPress={buttonLogout}
                    style={[
                      _.flex,
                      _.p_2,
                      _.m_2,
                      _.bgColor('primaryDark'),
                      _.radius(4),
                      _.shadow(8),
                    ]}>
                    {loading ? (
                      <ActivityIndicator
                        size={Platform.OS == 'ios' ? 'small' : 'large'}
                        color="white"
                      />
                    ) : (
                      <Text align="center" color="white" weight="bold">
                        Keluar
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <ViewError empty />
            )
          ) : (
            <ViewError onPress={doRefresh}>{errMessage}</ViewError>
          ))}
      </ScrollView>
    </>
  );
};
