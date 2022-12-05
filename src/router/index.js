import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import { Text } from '../global/components';
import _, { COLORS } from '../global/styles';
import { isEmpty } from '../helper/utils';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const path = '../screens/';

const SCREEN = {
  Auth: {
    Login: {
      path: require(`${path}Auth/Login`),
    },
    Register: {
      path: require(`${path}Auth/Register`),
    },
  },
  SplashScreen: {
    SplashScreen: {
      path: require(`${path}SplashScreen`),
    },
  },
  App: {
    Home: {
      path: require(`${path}Home`),
    },
    ProfileList: {
      path: require(`${path}Profile/List`),
    },
    ProfileAdd: {
      path: require(`${path}Profile/Add`),
    },
    ProfileEdit: {
      path: require(`${path}Profile/Edit`),
    },
    ProfileDetail: {
      path: require(`${path}Profile/Detail`),
    },
    ProfileChangePassword: {
      path: require(`${path}Profile/ChangePassword`),
    },
    ReportDetail: {
      path: require(`${path}ReportDetail`),
    },
  },
  Tab: {
    Home: {
      path: require(`${path}Home`),
      label: 'Beranda',
      icon: 'home',
    },
    Lapor: {
      path: require(`${path}Lapor`),
      label: 'Lapor',
      icon: 'plus-circle',
    },
    Profile: {
      path: require(`${path}Profile`),
      label: 'Pengaturan',
      icon: 'cog',
    },
  },
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={props => <TabOptions {...props} />}>
      {Object.keys(SCREEN.Tab).map((key, i) => (
        <Tab.Screen
          key={i}
          name={key}
          component={SCREEN.Tab[key].path.default}
        />
      ))}
    </Tab.Navigator>
  );
};

const TabOptions = ({state, descriptors, navigation}) => {
  const routes = state?.routes;

  const renderItems = (route, index) => {
    const isFocused = state.index === index;
    const icon = SCREEN.Tab[route?.name].icon;
    const name = SCREEN.Tab[route?.name].label;
    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    return (
      <TouchableOpacity onPress={onPress} key={index} style={[_.flex, _.pt_1]}>
        <View style={[_.p_1, _.itemsCenter]}>
          <Icon
            name={icon}
            size={20}
            color={isFocused ? COLORS.primaryDark : COLORS.greyDark}
            solid
          />
          <Text
            size={12}
            font="secondary"
            weight="normal"
            color={isFocused ? COLORS.primaryDark : COLORS.greyDark}
            align="center"
            style={_.mt_1}>
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[_.row, _.bgColor('white'), _.shadowSmooth]}>
      {Array.isArray(routes) && routes.map(renderItems)}
    </SafeAreaView>
  );
};

const Router = () => {
  const {loading = false, token = null} = useSelector(s => s.login);
  const isLogin = !isEmpty(token);

  const screen = SCREEN[loading ? 'SplashScreen' : isLogin ? 'App' : 'Auth'];
  const initialScreen = loading ? 'SplashScreen' : isLogin ? 'Home' : 'Login';

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialScreen} headerMode="none">
          {isLogin && <Stack.Screen name="Tabs" component={TabNavigator} />}
          {Object.keys(screen).map((key, i) => (
            <Tab.Screen
              key={i}
              name={key}
              component={screen[key].path.default}
              options={screen[key].options}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Router;
