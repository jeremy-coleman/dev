import { centerCenter, horizontallyCenterSelf, inlineBlock, margin, padding } from 'csstips';
import { color } from 'csx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { style } from 'typestyle';


import { NavState } from '../state';

//color: '#6642C6' purple

const LinkStyle = style(horizontallyCenterSelf, {
  color: 'inherit',
  textDecoration: 'none',
  $nest: {
    '&:hover': {
      transitionDuration: '0.1s',
      color: 'var(--cog-primary)'
    }
  }
})

const leftNavStyles = theme => style({
  maxWidth: 48,
  minWidth: 48,
  width: 48,
  minHeight: "100%",
  flex: "1",
  display: "flex",
  position: 'relative',
  flexDirection: "column",
  alignItems: 'stretch',
  alignContent: 'center',
  alignmentBaseline: "central",
  overflow: "hidden",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08)",
  backgroundColor: theme.palette.primary.main
})

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
  whiteSpace: 'nowrap',
  direction: 'ltr',
  "-webkit-font-feature-settings": 'antialiased',
  textRendering: 'optimizeLegibility',
  "-moz-font-feature-settings": 'grayscale',
  fontFeatureSettings: 'liga',
})


const MuiFontIcon = ({iconName, label}) => 
        <div className={iconStyle}>
            <i className={materialIcons}>{iconName}</i>
            <p className={labelStyle}>{label}</p>
        </div>

type IconBarLinkProps = {
  nav?: NavState
  route: string
  iconName?: any
  label?: any
};


const IconBarLink = inject('nav')(observer((props: IconBarLinkProps) => (
  <a href='#' className={LinkStyle} onClick={() => props.nav.goTo(props.route)}>
    <MuiFontIcon iconName={props.iconName} label={props.label}/>
  </a>
)))


// export const Header = inject('theme')(observer(({theme}) => {
// var styles = headerStylesheet(theme)
// return(

export const IconNavBar = inject('theme')(observer(({theme}) => (  
    <div className={leftNavStyles(theme)}>
      <div>
          <IconBarLink route="workspace" iconName={"dashboard"}/>
          <IconBarLink route="dashboard" iconName={"dashboard"}/>
          <IconBarLink route="notebook" iconName={"device_hub"}/>
          <IconBarLink route="charts" iconName={"insert_chart"}/>
          <IconBarLink route="datasets" iconName={"grid_on"}/>
          <IconBarLink route="cloud" iconName={"cloud"}/>
          <IconBarLink route="catalog" iconName={"dashboard"}/>
        <div style={{position: 'absolute', bottom: 0}}>
          <IconBarLink route="settings" iconName={"settings"}/>
          <IconBarLink route="about" iconName={"help_outline"}/>
        </div>
      </div>
    </div>
)))



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
