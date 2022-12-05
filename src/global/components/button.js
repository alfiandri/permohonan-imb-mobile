import React, { Component } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import {
    default as FontAwesome5Icon,
    default as Icon
} from 'react-native-vector-icons/FontAwesome5';
import { Text } from '.';
import { isEmpty } from '../../helper/utils';
import _, { COLORS } from '../styles';

/**
 * @param {Object} props
 * @param {Function} [props.onPress]
 * @param {FontAwesome5Icon} [props.icon]
 * @param {Boolean} [props.solid]
 * @param {18} [props.size]
 * @param {true} [props.enable]
 * @param {false} [props.loading]
 * @param {String} [props.color]
 * @param {String} [props.textColor]
 * @param {'bold' | 'reguler' | 'light'} [props.weight]
 * @param {import('react-native/Libraries/StyleSheet/StyleSheet').ViewStyleProp} [props.style]
 * @param {import('react-native/Libraries/StyleSheet/StyleSheet').TextStyleProp} [props.textStyle]
 * @param {Component} [props.children]
 */
export default ({
  onPress = () => {},
  icon = null,
  solid = false,
  enable = true,
  loading = false,
  color = 'primaryDark',
  expand = false,
  small = false,
  textColor = 'white',
  size = 18,
  style = {},
  textStyle = {},
  weight = 'bold',
  children,
}) => {
  return (
    <>
      <TouchableOpacity
        disabled={!enable || loading}
        onPress={onPress}
        style={[
          (typeof children === 'string' ||
            (Array.isArray(children) &&
              children.find(s => typeof s === 'string'))) &&
            !isEmpty(icon) &&
            _.row,
          small ? _.p_1 : _.p_2,
          _.bgColor(color),
          _.itemsCenter,
          _.contentCenter,
          expand && _.selfCenter,
          _.radius(4),
          style,
        ]}>
        {!loading ? (
          (typeof children === 'string' ||
            (Array.isArray(children) &&
              children.find(s => typeof s === 'string'))) &&
          !isEmpty(icon) ? (
            <>
              <Icon
                name={icon}
                size={size}
                color={
                  !isEmpty(COLORS[textColor]) ? COLORS[textColor] : textColor
                }
                solid={solid}
              />
              <Text
                align="center"
                weight={weight}
                color={
                  !isEmpty(COLORS[textColor]) ? COLORS[textColor] : textColor
                }
                style={[_.ml_2, textStyle]}>
                {children}
              </Text>
            </>
          ) : !isEmpty(icon) ? (
            <Icon
              name={icon}
              size={size}
              color={
                !isEmpty(COLORS[textColor]) ? COLORS[textColor] : textColor
              }
              solid={solid}
            />
          ) : typeof children === 'string' ||
            (Array.isArray(children) &&
              children.find(s => typeof s === 'string')) ? (
            <Text
              align="center"
              weight={weight}
              color={
                !isEmpty(COLORS[textColor]) ? COLORS[textColor] : textColor
              }
              style={textStyle}>
              {children}
            </Text>
          ) : (
            children
          )
        ) : (
          <ActivityIndicator
            size="small"
            color={!isEmpty(COLORS[textColor]) ? COLORS[textColor] : textColor}
          />
        )}
      </TouchableOpacity>
    </>
  );
};
