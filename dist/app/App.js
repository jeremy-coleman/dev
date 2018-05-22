"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const React = require("react");
const mobx_react_1 = require("mobx-react");
const core_1 = require("@material-ui/core");
const emotion_theming_1 = require("emotion-theming");
const styled_components_1 = require("styled-components");
//import {theme} from './theme';
const AppLayout_1 = require("./layout/AppLayout");
const AppRoutes_1 = require("./AppRoutes");
const stores_1 = require("./stores");
const react_router_dom_1 = require("react-router-dom");
const UiStore_1 = require("./stores/UiStore");
var theme = core_1.createMuiTheme();
exports.stores = {
    navigation: new stores_1.NavigationStore(),
    uiStore: new UiStore_1.UiStore()
};
let CogliteAppRoot = class CogliteAppRoot extends React.Component {
    render() {
        const { navigation } = this.props;
        return (React.createElement(emotion_theming_1.ThemeProvider, { theme: theme },
            React.createElement(mobx_react_1.Provider, Object.assign({}, exports.stores),
                React.createElement(react_router_dom_1.Router, { history: exports.stores.navigation.history },
                    React.createElement("div", { style: { height: '100vh', width: '100vw' } },
                        React.createElement(AppLayout_1.AppLayout, null,
                            React.createElement(AppRoutes_1.AppRoutes, null)))))));
    }
};
CogliteAppRoot = __decorate([
    mobx_react_1.observer
], CogliteAppRoot);
exports.CogliteAppRoot = CogliteAppRoot;
// body > font-size: ${theme.fontSizes[1]}px;
styled_components_1.injectGlobal `
* {
  box-sizing: border-box;
  font-weight: inherit;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: subpixel-antialiased;
  -webkit-appearance: none;
  -moz-appearance: none;
  user-select: none
  font: caption;
}

html,
body {
  min-height: 100%;
  min-width: 100%;
  overflow: hidden;
}

body {
  padding: 0;
  margin: 0;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  line-height: 1.5;
  position: relative;
  height: 100%;
  max-height: 100%;
  width: 100vw;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

a {
  color: currentColor;
  text-decoration: none;
}

textarea {
  resize: none;
},
#root {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
`;
document.addEventListener("dragover", event => event.preventDefault());
document.addEventListener("drop", event => event.preventDefault());
/*
css.global("html, body, root", {
  userSelect: "none",  // turn off text highlighting
  cursor: "default",  // reset the cursor pointer
  font: "caption",
  WebkitFontSmoothing: "subpixel-antialiased",
  textRendering: "optimizeLegibility",
  height:  '100%',
  margin:  '0px auto',
  padding: '0px auto',
  overflow: 'hidden'
})

*/ 
