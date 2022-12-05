import { StyleSheet } from 'react-native';

const defaultValue = 16;
const xs = 8;
const sm = xs + xs;
const md = sm + xs;
const lg = md + xs;
const xl = lg + xs;

export default StyleSheet.create({
  m: {margin: defaultValue},
  mAuto: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  mb: {marginBottom: defaultValue},
  mbAuto: {marginBottom: 'auto'},
  mh: {marginLeft: defaultValue, marginRight: defaultValue},
  mhAuto: {marginLeft: 'auto', marginRight: 'auto'},
  ml: {marginLeft: defaultValue},
  mlAuto: {marginLeft: 'auto'},
  mr: {marginRight: defaultValue},
  mrAuto: {marginRight: 'auto'},
  me: {marginRight: defaultValue},
  meAuto: {marginRight: 'auto'},
  mt: {marginTop: defaultValue},
  mtAuto: {marginTop: 'auto'},
  mv: {marginTop: defaultValue, marginBottom: defaultValue},
  mvAuto: {marginTop: 'auto', marginBottom: 'auto'},

  ml_1: {marginLeft: xs},
  ml_2: {marginLeft: sm},
  ml_3: {marginLeft: md},
  ml_4: {marginLeft: lg},
  ml_5: {marginLeft: xl},
  mr_1: {marginRight: xs},
  mr_2: {marginRight: sm},
  mr_3: {marginRight: md},
  mr_4: {marginRight: lg},
  mr_5: {marginRight: xl},
  mt_1: {marginTop: xs},
  mt_2: {marginTop: sm},
  mt_3: {marginTop: md},
  mt_4: {marginTop: lg},
  mt_5: {marginTop: xl},
  mb_1: {marginBottom: xs},
  mb_2: {marginBottom: sm},
  mb_3: {marginBottom: md},
  mb_4: {marginBottom: lg},
  mb_5: {marginBottom: xl},
  m_1: {margin: xs},
  m_2: {margin: sm},
  m_3: {margin: md},
  m_4: {margin: lg},
  m_5: {margin: xl},
  mv_1: {marginVertical: xs},
  mv_2: {marginVertical: sm},
  mv_3: {marginVertical: md},
  mv_4: {marginVertical: lg},
  mv_5: {marginVertical: xl},
  mh_1: {marginHorizontal: xs},
  mh_2: {marginHorizontal: sm},
  mh_3: {marginHorizontal: md},
  mh_4: {marginHorizontal: lg},
  mh_5: {marginHorizontal: xl},

  // MANUAL

  mlm: val => {
    return {marginLeft: val};
  },
  mrm: val => {
    return {marginRight: val};
  },
  mtm: val => {
    return {marginTop: val};
  },
  mbm: val => {
    return {marginBottom: val};
  },
  mm: val => {
    return {margin: val};
  },
  mvm: val => {
    return {marginBottom: val, marginTop: val};
  },
  mhm: val => {
    return {marginLeft: val, marginRight: val};
  },
});
