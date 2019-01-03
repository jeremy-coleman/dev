//import { createMuiTheme} from "@material-ui/core/styles"
import { observable, computed, action } from "mobx"
import {ToggleValue} from './values'

import {defaultTheme as theme} from '@coglite/common/ux'

let createMuiTheme = (input) => Object.assign({}, {...theme}, {...input})


export class ThemeState {

brandOptions = {
  red: {
    primary: "#F44336",
    secondary: "#FFD740",
    background: "#FFFFFF",
  },
  blue: {
    primary: "#2196F3",
    secondary: "#FFE57F",
    background: "#FFFFFF",
  },
  coglite: {
    primary: "#424242",
    secondary: "#607D8B",
    background: "#FFFFFF",
  },
}

  @observable themeId = "coglite"
  
  @observable SettingsModalToggle = new ToggleValue()


  @computed
  get muiTheme() {
    const basicTheme =  createMuiTheme({
      palette: {
        primary: {
          main: this.brandOptions[this.themeId].primary,
        },
        secondary: {
          main: this.brandOptions[this.themeId].secondary,
        }
      },
      
      typography: {
        useNextVariants: true,
      },
      
  //   props: {
  //   MuiButtonBase: {
  //     // No more ripple, on the whole application 💣!
  //     disableRipple: true, 
  //   },
  // },
    })
    basicTheme["shape"] = {
      borderRadius: 4
    }

    //console.log(basicTheme)

    return basicTheme

  }
  



fabricTheme = {
    palette:{
      themePrimary: this.brandOptions[this.themeId].primary,
      themeDarker:"#004578",
      themeDark:"#005a9e",
      themeDarkAlt:"#106ebe",
      themeSecondary:"#2b88d8",
      themeTertiary:"#71afe5",
      themeLight:"#c7e0f4",
      themeLighter:"#deecf9",
      themeLighterAlt:"#eff6fc",
      black:"#000000",
      blackTranslucent40:"rgba(0,0,0,.4)",
      neutralDark:"#212121",
      neutralPrimary:"#333333",
      neutralPrimaryAlt:"#3c3c3c",
      neutralSecondary:"#666666",
      neutralSecondaryAlt:"#767676",
      neutralTertiary:"#a6a6a6",
      neutralTertiaryAlt:"#c8c8c8",
      neutralQuaternary:"#d0d0d0",
      neutralQuaternaryAlt:"#dadada",
      neutralLight:"#eaeaea",
      neutralLighter:"#f4f4f4",
      neutralLighterAlt:"#f8f8f8",
      accent:"#F44336",
      white:"#ffffff",
      whiteTranslucent40:"rgba(255,255,255,.4)",
      orange:"#d83b01",
      redDark:"#a80000"
   }
  }


@computed 
get combinedTheme(){
  return ({...this.muiTheme, ...this.fabricTheme.palette})
};

@computed get palette(){
  return this.combinedTheme.palette
}


@action
updateTheme(themeId) {
    this.themeId = themeId
  }


  fontSizes:{  
         mini:"10px",
         xSmall:"11px",
         small:"12px",
         smallPlus:"13px",
         medium:"14px",
         mediumPlus:"15px",
         large:"17px",
         xLarge:"21px",
         xxLarge:"28px",
         mega:"72px"
}

fontWeights:{  
         default:400,
         regular:400,
         light:100,
         semibold:600,
         bold:700
}

spacing:{  
      s2:"4px",
      s1:"8px",
      m:"16px",
      l1:"20px",
      l2:"32px"
   }
}

