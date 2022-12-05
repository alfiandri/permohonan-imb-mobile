import { Platform, StyleSheet } from 'react-native';
import { COLORS } from '.';
import { isEmpty } from '../../helper/utils';

/**
 *
 * @param {("primary" | "secondary" | "tertiary" | "success" | "danger" | "warning" | "info" | "primaryLight" | "primaryDark" | "secondaryLight" | "secondaryDark")} color
 * @returns {backgroundColor: ""}
 */
const bgColor = color => {
  if (!isEmpty(COLORS[color])) {
    return {backgroundColor: COLORS[color]};
  }

  return {backgroundColor: color};
};

/**
 *
 * @param {("primary" | "secondary" | "tertiary" | "success" | "danger" | "warning" | "info" | "primaryLight" | "primaryDark" | "secondaryLight" | "secondaryDark")} color
 * @returns {backgroundColor: ""}
 */
const borderColor = color => {
  if (!isEmpty(COLORS[color])) {
    return {borderColor: COLORS[color]};
  }

  return {borderColor: color};
};

export default StyleSheet.create({
  flex: {flex: 1},
  flexGrow: {flexGrow: 1},
  flexWrap: {flexWrap: 'wrap'},

  row: {flexDirection: 'row'},
  column: {flexDirection: 'column'},

  wrap: {flexWrap: 'wrap'},
  noWrap: {flexWrap: 'nowrap'},

  contentStart: {justifyContent: 'flex-start'},
  contentCenter: {justifyContent: 'center'},
  contentEnd: {justifyContent: 'flex-end'},
  contentSpace: {justifyContent: 'space-between'},

  selfStart: {alignSelf: 'flex-start'},
  selfCenter: {alignSelf: 'center'},
  selfEnd: {alignSelf: 'flex-end'},

  itemsStart: {alignItems: 'flex-start'},
  itemsCenter: {alignItems: 'center'},
  itemsEnd: {alignItems: 'flex-end'},

  relative: {position: 'relative'},
  absolute: {position: 'absolute'},

  show: {display: 'flex'},
  hide: {display: 'none'},

  absoluteFull: {position: 'absolute', top: 0, bottom: 0, left: 0, right: 0},
  absoluteTop: {position: 'absolute', top: 0},
  absoluteBottom: {position: 'absolute', bottom: 0},
  absoluteLeft: {position: 'absolute', left: 0},
  absoluteRight: {position: 'absolute', right: 0},
  absoluteFullWidth: {position: 'absolute', width: '100%'},

  indexLowest: {zIndex: -2},
  indexLow: {zIndex: -1},
  indexNormal: {zIndex: 0},
  indexMiddle: {zIndex: 1},
  indexTop: {zIndex: 2},

  shadowSmooth: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },

  width: val => {
    return {width: val};
  },
  height: val => {
    return {height: val};
  },

  radius: val => {
    return {borderRadius: val};
  },
  radiusTop: val => {
    return {borderTopLeftRadius: val, borderTopRightRadius: val};
  },
  radiusBottom: val => {
    return {borderBottomLeftRadius: val, borderBottomRightRadius: val};
  },

  opacity: val => {
    return {opacity: val};
  },

  top: val => {
    return {top: val};
  },
  bottom: val => {
    return {bottom: val};
  },
  left: val => {
    return {left: val};
  },
  right: val => {
    return {right: val};
  },

  index: val => {
    return {zIndex: val};
  },

  shadow: val => {
    const number =
      val > 20
        ? Platform.OS == 'ios'
          ? 20 / 2
          : val
        : Platform.OS == 'ios'
        ? val / 2
        : val;
    return {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: number * 0.1,
      shadowRadius: 2,
      elevation: number,
    };
  },

  bgColor,
  borderColor,
  borderWidth: (width = 0) => {
    return {borderWidth: width};
  },

  // Shape
  circle: (val = 0) => {
    return {width: val, height: val, borderRadius: val};
  },
  squere: (val = 0) => {
    return {width: val, height: val};
  },
});
