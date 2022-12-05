import React from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View
} from 'react-native';
import { APP_BUILD, APP_VERSION } from '../../env';
import { Text, ViewError } from '../../global/components';
import _, { COLORS } from '../../global/styles';
import { useHome } from '../../helper/hooks/home';
import { isEmpty } from '../../helper/utils';

export default () => {
  const {loading, err, errMessage, doRefresh = () => {}} = useHome();

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <ScrollView
        style={[
          _.flex,
          _.bgColor(isEmpty(errMessage) ? 'primaryDark' : 'white'),
        ]}
        contentContainerStyle={_.flexGrow}
        showsVerticalScrollIndicator={false}>
        <View style={[_.mvAuto, _.mhAuto, _.itemsCenter]}>
          {!err ? (
            <>
              <Image
                source={require('../../assets/images/Lambang_Kota_Sibolga.png')}
                style={[_.flex, _.itemsCenter]}
              />
               <Text color="white" size={30} weight="bold">
                Melapor!
              </Text>
            </>
          ) : (
            <>
              <ViewError onPress={doRefresh.bind(this)}>{errMessage}</ViewError>
            </>
          )}
        </View>
        <SafeAreaView
          style={[_.absoluteFullWidth, _.absoluteBottom, _.itemsCenter]}>
          {loading && (
            <>
              <ActivityIndicator color={COLORS.white} style={_.mb_2} />
              <Text color="white" size={12} weight="medium">
                sedang memuat...
              </Text>
            </>
          )}
          <Text
            font="secondary"
            weight="bold"
            align="center"
            color="white"
            style={_.mv_2}>{`versi ${APP_VERSION} build ${APP_BUILD}`}</Text>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};
