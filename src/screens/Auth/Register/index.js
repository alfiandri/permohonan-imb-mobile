import React from 'react';
import {StatusBar, Text, View} from 'react-native';

export default () => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={{padding: 20, paddingTop: 40, backgroundColor: '#aaf'}}>
        <Text>Register</Text>
      </View>
    </>
  );
};
