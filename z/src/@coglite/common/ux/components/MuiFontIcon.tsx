import { centerCenter, inlineBlock, margin, padding } from 'csstips';
import { color } from 'csx';
import * as React from 'react';
import { style } from 'typestyle';


let iconStyle = style(
  centerCenter,
  margin(0),
  padding(0),
  {
  width: 48,
  height: 48,
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



const SendIcon = () => <MuiFontIcon iconName={'send'} label={'send'}/>

//<div className={prettyBox}>Hello World</div>
const bg = color('black');
const textColor = color('white');

const prettyBox = style(
  padding(10),
  inlineBlock,
  {
    color: textColor.darken(.2).toHexString(),
    cursor:'pointer',
    backgroundColor:bg.toHexString(),
    transition: 'color .2s, background-color .2s',
    $nest: {
      '&:hover':{
        color: textColor.toHexString(),
        backgroundColor:bg.lighten(.2).toHexString(),
      }
    }
  }
);
