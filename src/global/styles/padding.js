import { StyleSheet } from 'react-native';

const defaultValue = 16;
const xs = 8;
const sm = xs + xs;
const md = sm + xs;
const lg = md + xs;
const xl = lg + xs;

export default StyleSheet.create({
  p: {padding: defaultValue},
  pAuto: {
    paddingLeft: 'auto',
    paddingRight: 'auto',
    paddingTop: 'auto',
    paddingBottom: 'auto',
  },
  pb: {paddingBottom: defaultValue},
  pbAuto: {paddingBottom: 'auto'},
  ph: {paddingLeft: defaultValue, paddingRight: defaultValue},
  phAuto: {paddingLeft: 'auto', paddingRight: 'auto'},
  pl: {paddingLeft: defaultValue},
  plAuto: {paddingLeft: 'auto'},
  pe: {paddingRight: defaultValue},
  peAuto: {paddingRight: 'auto'},
  pt: {paddingTop: defaultValue},
  ptAuto: {paddingTop: 'auto'},
  pv: {paddingTop: defaultValue, paddingBottom: defaultValue},
  pvAuto: {paddingTop: 'auto', paddingBottom: 'auto'},

  pl_1: {paddingLeft: xs},
  pl_2: {paddingLeft: sm},
  pl_3: {paddingLeft: md},
  pl_4: {paddingLeft: lg},
  pl_5: {paddingLeft: xl},
  pr_1: {paddingRight: xs},
  pr_2: {paddingRight: sm},
  pr_3: {paddingRight: md},
  pr_4: {paddingRight: lg},
  pr_5: {paddingRight: xl},
  pt_1: {paddingTop: xs},
  pt_2: {paddingTop: sm},
  pt_3: {paddingTop: md},
  pt_4: {paddingTop: lg},
  pt_5: {paddingTop: xl},
  pb_1: {paddingBottom: xs},
  pb_2: {paddingBottom: sm},
  pb_3: {paddingBottom: md},
  pb_4: {paddingBottom: lg},
  pb_5: {paddingBottom: xl},
  p_1: {padding: xs},
  p_2: {padding: sm},
  p_3: {padding: md},
  p_4: {padding: lg},
  p_5: {padding: xl},
  pv_1: {paddingVertical: xs},
  pv_2: {paddingVertical: sm},
  pv_3: {paddingVertical: md},
  pv_4: {paddingVertical: lg},
  pv_5: {paddingVertical: xl},
  ph_1: {paddingHorizontal: xs},
  ph_2: {paddingHorizontal: sm},
  ph_3: {paddingHorizontal: md},
  ph_4: {paddingHorizontal: lg},
  ph_5: {paddingHorizontal: xl},

  // MANUAL

  plm: val => {
    return {paddingLeft: val};
  },
  prm: val => {
    return {paddingRight: val};
  },
  ptm: val => {
    return {paddingTop: val};
  },
  pbm: val => {
    return {paddingBottom: val};
  },
  pm: val => {
    return {padding: val};
  },
  pvm: val => {
    return {paddingBottom: val, paddingTop: val};
  },
  phm: val => {
    return {paddingLeft: val, paddingRight: val};
  },
});
