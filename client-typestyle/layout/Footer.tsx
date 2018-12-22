import { verticallySpaced } from 'csstips';
import { observer, inject } from 'mobx-react';
import * as React from 'react';
import { stylesheet, style } from 'typestyle';
import {defaultTheme as theme, css} from '@coglite/common/ux'


const footerStylesheet = theme => stylesheet({
 root:{ 
    bottom: 0,
    width: '100%',
    position: 'relative',
    display: 'flex',
    maxHeight: '25px',
    minHeight: '25px',
    flexDirection: "row",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    alignItems: 'center',
    justifyContent: 'center'
},
 footerLeft:{
     position:'absolute',
     left: '10px'
    },
 footerRight: {
     position: 'absolute',
     right: '10px'
    }
})
 
const version = '0.0.1';
const copyrightString = '© Copyright Coglite 2018';


export const Footer = inject('theme')(observer(({theme}) => {
var styles = footerStylesheet(theme)
return(
  <footer className={styles.root}>
    <span className={css(styles.footerLeft, style(verticallySpaced(5)))}><DropupButton/></span>
    <span className={css(styles.footerRight, style(verticallySpaced(5)))}>{`Version: ${version || 'pre-release'}`}</span>
  </footer>
)}))

export default Footer;

let dropUpStyle = stylesheet({
    dropbtn: {
      backgroundColor: 'inherit',
      color: 'white',
      //padding: 16,
      fontSize: 16,
      border: 'none',
      $nest:{
        '&:hover':{
          backgroundColor: '#2980B9'
        }
      }
    },

    dropup: {
      position: 'relative',
      display: 'inline-block',
    },

    dropupContent: {
        display: 'none',
        position: 'absolute',
        backgroundColor: '#f1f1f1',
        minWidth: 160,
        bottom: 50,
        zIndex: 999999,
        $nest:{
          '& :hover': { display: 'block important!'},
          '&>*': {
            color: 'black',
            padding: '12px 16px',
            textDecoration: 'none',
            display: 'block',
            $nest:{
              '&:hover': {backgroundColor: '#ccc'}
            }
          },
          
        }
    }

});

let DropupButton = observer(() =>
<div className={dropUpStyle.dropup}>
  <button className={dropUpStyle.dropbtn}>Dropup</button>
  <div className={dropUpStyle.dropupContent}>
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
  </div>
</div>
)




namespace ButtonStyle {
  const baseButton = {
    border: 'solid thin lightgray',
    borderRadius: 2,
    color: 'white',
    padding: '4px 10px'
  }

  export const component = style({
    $debugName: 'component',
    display: 'flex'
  }, baseButton);

  export const primaryButton = style({
    $debugName: 'primaryButton',
    backgroundColor: 'darkblue',
  }, baseButton);

  export const secondaryButton = style({
    $debugName: 'secondaryButton',
    backgroundColor: 'teal',
  }, baseButton);
}


<div className={ButtonStyle.component}>
  <button className={ButtonStyle.primaryButton}>Primary</button>
  <button className={ButtonStyle.secondaryButton}>Secondary</button>
</div>