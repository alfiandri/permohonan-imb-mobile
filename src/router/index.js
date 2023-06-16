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

let SCREEN = {
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
    MyLapor: {
      path: require(`${path}MyLapor`),
    },
    Persetujuan: {
      path: require(`${path}Persetujuan`),
    },
    CetakLaporan: {
      path: require(`${path}CetakLaporan`),
    },
    Notification: {
      path: require(`${path}Notification`),
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
    MyLapor: {
      path: require(`${path}MyLapor`),
      label: 'Permohonanku',
      icon: 'book',
    },
    Persetujuan: {
      path: require(`${path}Persetujuan`),
      label: 'Persetujuan',
      icon: 'book',
    },
    CetakLaporan: {
      path: require(`${path}CetakLaporan`),
      label: 'CetakLaporan',
      icon: 'print',
    },
    Lapor: {
      path: require(`${path}Lapor`),
      label: 'Permohonan',
      icon: 'plus-circle',
    },
    Notification: {
      path: require(`${path}Notification`),
      label: 'Notifikasi',
      icon: 'bell',
    },
    Profile: {
      path: require(`${path}Profile`),
      label: 'Pengaturan',
      icon: 'cog',
    },
  },
};

const TabNavigator = () => {
  const tipe = useSelector(s => s.login.tipe);
  console.log(tipe)
  
  let SCREENTAB = {
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
      Persetujuan: {
        path: require(`${path}Persetujuan`),
      },
      Notification: {
        path: require(`${path}Notification`),
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
      Persetujuan: {
        path: require(`${path}Persetujuan`),
        label: 'Persetujuan',
        icon: 'book',
      },
      Notification: {
        path: require(`${path}Notification`),
        label: 'Notifikasi',
        icon: 'bell',
      },
      Profile: {
        path: require(`${path}Profile`),
        label: 'Pengaturan',
        icon: 'cog',
      },
    },
  };

  if (tipe == 'kabid') {
    SCREENTAB = {
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
        Persetujuan: {
          path: require(`${path}Persetujuan`),
        },
        Notification: {
          path: require(`${path}Notification`),
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
        Persetujuan: {
          path: require(`${path}Persetujuan`),
          label: 'Persetujuan',
          icon: 'book',
        },
        Notification: {
          path: require(`${path}Notification`),
          label: 'Notifikasi',
          icon: 'bell',
        },
        Profile: {
          path: require(`${path}Profile`),
          label: 'Pengaturan',
          icon: 'cog',
        },
      },
    };
  }
  if (tipe == 'staff') {
    SCREENTAB = {
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
        Persetujuan: {
          path: require(`${path}Persetujuan`),
        },
        CetakLaporan: {
          path: require(`${path}CetakLaporan`),
        },
        Notification: {
          path: require(`${path}Notification`),
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
        Persetujuan: {
          path: require(`${path}Persetujuan`),
          label: 'Persetujuan',
          icon: 'book',
        },
        CetakLaporan: {
          path: require(`${path}CetakLaporan`),
          label: 'CetakLaporan',
          icon: 'print',
        },
        Notification: {
          path: require(`${path}Notification`),
          label: 'Notifikasi',
          icon: 'bell',
        },
        Profile: {
          path: require(`${path}Profile`),
          label: 'Pengaturan',
          icon: 'cog',
        },
      },
    };
  }
  if (tipe == 'pemohon') {
    SCREENTAB = {
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
        MyLapor: {
          path: require(`${path}MyLapor`),
        },
        Notification: {
          path: require(`${path}Notification`),
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
        MyLapor: {
          path: require(`${path}MyLapor`),
          label: 'Permohonanku',
          icon: 'book',
        },
        Lapor: {
          path: require(`${path}Lapor`),
          label: 'Permohonan',
          icon: 'plus-circle',
        },
        Notification: {
          path: require(`${path}Notification`),
          label: 'Notifikasi',
          icon: 'bell',
        },
        Profile: {
          path: require(`${path}Profile`),
          label: 'Pengaturan',
          icon: 'cog',
        },
      },
    };
  }

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
      tabBar={props => <TabOptions {...props} />}>
      {Object.keys(SCREENTAB.Tab).map((key, i) => (
        <Tab.Screen
          key={i}
          name={key}
          component={SCREENTAB.Tab[key].path.default}
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
        <Stack.Navigator
          initialRouteName={initialScreen}
          options={{headerShown: false}}
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
          }}>
          {isLogin && <Stack.Screen name="Tabs" component={TabNavigator} />}
          {Object.keys(screen).map((key, i) => (
            <Stack.Screen
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
