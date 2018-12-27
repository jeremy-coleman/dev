import { centerCenter, inlineBlock, margin, padding } from 'csstips';
import { color } from 'csx';
import * as React from 'react';
import { style, classes } from 'typestyle';

import { fontFace } from 'typestyle'
import { url } from 'csx'

const FONT_STYLES = {
  normal: 'Regular',
  italic: 'Italic'
}

const FONT_WEIGHTS = {
  100: 'Thin',
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  700: 'Bold',
  900: 'Black'
}

type FontStyle = keyof typeof FONT_STYLES
type FontWeight = keyof typeof FONT_WEIGHTS

type Font = {
  name: string
  styles: FontStyle[]
  weights: FontWeight[]
}

/**
 * Helper to load fonts downloaded from Google Fonts.
 * Reference fonts in index.ts
 */

/*
fontFace({
        fontFamily: font.name,
        fontWeight,
        fontStyle,
        src: url(require(`./MaterialIcons/MaterialIcons-Regular.woff2`))
      })
*/

let iconStyle = style(
  centerCenter,
  margin(0),
  padding(0),
  {
  width: 48,
  height: 48,
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  alignmentBaseline: "central",
  overflow: "hidden",
  backgroundColor: 'inherit'
  //border: '1px solid black'
})


let labelStyle = style(
  margin(0),
  padding(0),
  {
  textAlign: 'center',
  fontSize: '11px'
})


fontFace({
  src: url(require(`./MaterialIcons/MaterialIcons-Regular.woff2`)),
  fontFamily: 'Material Icons',
  fontWeight: 'normal',
  fontStyle: 'normal',
  fontFeatureSettings: 'liga',
})

let materialIcons = style({
  fontFamily: 'Material Icons',
  fontWeight: 'normal',
  fontStyle: 'normal',
  fontSize: 24,
  display: 'inline-block',
  lineHeight: 1,
  textTransform: 'none',
  letterSpacing: 'normal',
  wordWrap: 'normal',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  direction: 'ltr',
  "-webkit-font-feature-settings": 'antialiased',
  textRendering: 'optimizeLegibility',
  "-moz-font-feature-settings": 'grayscale',
  fontFeatureSettings: 'liga',
})

export const MuiFontIcon = ({iconName, label}) => 
        <div className={iconStyle}>
            <i className={materialIcons}>{iconName}</i>
            <p className={labelStyle}>{label}</p>
        </div>


export const MDFontIconOnly = ({icon, ...props}) => <i className={materialIcons}>{icon}</i>


export const MDFontIconBox = ({icon}) => 
        <div className={iconStyle}>
            <i className={materialIcons}>{icon}</i>
        </div>
