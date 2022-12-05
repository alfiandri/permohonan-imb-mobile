import { useIsFocused } from '@react-navigation/core';
import React from 'react';
import { StatusBar } from 'react-native';

/**
 * @param {import('react-native').StatusBarProps} props
 */
export default props => {
  return (
    useIsFocused && (
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
        {...props}
      />
    )
  );
};
