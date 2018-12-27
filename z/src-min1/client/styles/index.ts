import { cssRule } from 'typestyle'
import { px } from 'csx';

import * as FONTS from './fonts'
import * as PALETTE from './palette'

export { FONTS, PALETTE }

cssRule('body', {
  fontFamily: FONTS.Roboto,
  fontWeight: 500,
  fontSize: px(20),
  backgroundColor: PALETTE.BLACK.toHexString(),
  color: PALETTE.WHITE.toHexString()
})
