import {StyleSheet} from 'react-native';
import Colors from './Colors';
import Fonts from './Fonts';

const Styles = StyleSheet.create({
  text14White: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: Fonts.TajawalRegular,
    fontWeight: '500',
  },
  text14Black: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: Fonts.TajawalRegular,
    fontWeight: '500',
  },
  whiteScreen: {flex: 1, backgroundColor: Colors.white},
  borderRadiusBottom10: {
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  borderRadiusTop10: {borderTopEndRadius: 10, borderTopStartRadius: 10},
  spaceBtwRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text10White: {
    fontSize: 10,
    color: Colors.white,
    fontFamily: Fonts.TajawalRegular,
    fontWeight: '700',
  },
});

export default Styles;
