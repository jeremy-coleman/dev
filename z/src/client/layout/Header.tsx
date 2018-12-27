import { verticallySpaced } from 'csstips';
import { observer, inject } from 'mobx-react';
import * as React from 'react';
import { stylesheet, style } from 'typestyle';
import {defaultTheme as theme, css} from '@coglite/common/ux'


import {InfoDropdown} from './settings/InfoDropdown'
import {WorkspaceMenu} from './workspace/WorkspaceMenu'


const headerStylesheet = theme => stylesheet({
 root:{ 
    top: 0,
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
 headerLeft:{
     position:'absolute',
     left: '10px'
    },
 headerRight: {
     position: 'absolute',
     right: '10px'
    }
})
 

export const Header = inject('theme')(observer(({theme}) => {
var styles = headerStylesheet(theme)
return(
  <header className={styles.root}>
    <span className={css(styles.headerLeft, style(verticallySpaced(5)))}><WorkspaceMenu/></span>
    <span className={css(styles.headerRight, style(verticallySpaced(5)))}><InfoDropdown/></span>
  </header>
)}))

export default Header
