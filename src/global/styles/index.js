import layout from './layout';
import margin from './margin';
import padding from './padding';

export const COLORS = {
  secondary: '#57A37D',
  secondaryLight: '#7DCE9F',
  secondaryDark: '#2E7B5D',

  tertiary: '#BCA848',

  success: '#22bb33',
  danger: '#bb2124',
  warning: '#f0ad4e',
  info: '#5bc0de',

  primaryLight: '#668cff',
  primary: '#1a53ff',
  primaryDark: '#002db3',

  greyLight: '#F4F8FF',
  grey: '#C9D1DE',
  greyDark: '#8A9BAB',

  puceLight: '#E7A1B6',
  puce: '#C67191',
  puceDark: '#644360',

  greenLight: '#95C99F',
  green: '#69A76E',
  greenDark: '#5B905F',

  blueLight: '#86C9EA',
  blue: '#5F9AD1',
  blueDark: '#4E81DE',

  red: '#CD6861',
  orange: '#DC9E64',
  yellow: '#E7C972',

  black: '#000000',
  black100: '#141414',
  blackDark200: '#1B1B1B',

  white: '#FFFFFF',
  white100: '#F3F3F3',
  whiteDark200: '#E1E1E1',
};

export const FONTS = {
  primary: {
    light: 'Poppins-Light',
    reguler: 'Poppins-Regular',
    bold: 'Poppins-Bold',
    extrabold: 'Poppins-ExtraBold',
    semibold: 'Poppins-SemiBold',
    medium: 'Poppins-Medium',
    thin: 'Poppins-Thin',
  },
  secondary: {
    light: 'Raleway-Light',
    medium: 'Raleway-Medium',
    reguler: 'Raleway-Regular',
    bold: 'Raleway-Bold',
  },
};

export default {
  ...layout,
  ...margin,
  ...padding,
};
