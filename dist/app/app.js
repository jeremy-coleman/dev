(function(FuseBox){FuseBox.$fuse$=FuseBox;
FuseBox.target = "electron";
Object.assign(global.process.env, {"NODE_ENV":"development"})
FuseBox.pkg("default", {}, function(___scope___){
___scope___.file("index.jsx", function(exports, require, module, __filename, __dirname){
/* fuse:injection: */ var process = require("process");
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import './css.config'
//export = 0;
//import './assets/scss/main.scss'
const ReactDOM = require("react-dom");
const React = require("react");
const App_1 = require("./App");
const icons_1 = require("@uifabric/icons");
//import { Fabric } from "office-ui-fabric-react/lib/Fabric";
icons_1.initializeIcons();
require("./base.css");
const electron_1 = require("electron");
electron_1.webFrame.setZoomLevel(1);
electron_1.webFrame.setZoomFactor(1);
electron_1.webFrame.registerURLSchemeAsPrivileged('coglite');
//import { navigate } from './common/hyperlinkHandler';
process.on('uncaughtException', (error) => { console.error('[err-client]', error.message, error.stack); });
window.onerror = (message, filename, lineno, colno, error) => { console.error('[err-client]', message, filename, lineno, colno, error); return true; }; // prevent default handler
/*
const interceptClickEvent = (e: Event) => {
    let target: any = e.target;
    while (target) {
        if (target.href) {
            e.preventDefault();
            navigate(target.href);
            return;
        }
        target = target.parentNode;
    }
}

document.addEventListener('click', interceptClickEvent);

window.open = (url: string): any => navigate(url); // Monkey patch
*/
window.onload = function () {
    ReactDOM.render(React.createElement(App_1.CogliteAppRoot, null), document.getElementById("coglite-app-root"));
};
/*
// Right-click context menu for edit boxes
const remote = require('electron').remote;

const Menu = remote.Menu;

const ContextMenuRW = Menu.buildFromTemplate([
    {label: 'Undo',role: 'undo',},
    {label: 'Redo', role: 'redo',},
    {type:  'separator',},
    {label: 'Cut',role: 'cut',},
    {label: 'Copy', role: 'copy',},
    {label: 'Paste',role: 'paste',}
]);

const ContextMenuRO = Menu.buildFromTemplate([
    {label: 'Undo',role: 'undo',enabled: false},
    {label: 'Redo',role: 'redo',enabled: false},
    {type: 'separator',},
    {label: 'Cut',role: 'cut',enabled: false},
    {label: 'Copy',role: 'copy',enabled: false},
    {label: 'Paste',role: 'paste', enabled: false}
]);



document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    e.stopPropagation();
    let node: any = e.target;
    while (node) { if (node.nodeName.match(/^(input|textarea)$/i) || node.isContentEditable)
      //@ts-ignore
                    {   if (node.readOnly) {ContextMenuRO.popup(remote.getCurrentWindow());}
                    //@ts-ignore
                        else {ContextMenuRW.popup(remote.getCurrentWindow());}
                        break;
                    }   return node = node.parentNode; }
});

*/ 

});
___scope___.file("App.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const React = require("react");
const mobx_react_1 = require("mobx-react");
const theming_1 = require("theming");
const styled_components_1 = require("styled-components");
const AppLayout_1 = require("./modules/layout/AppLayout");
const Router_1 = require("./Router");
const stores_1 = require("./stores");
exports.CogliteAppRoot = mobx_react_1.observer((props) => {
    const muiTheme = stores_1.cogliteState.uiStore.muiTheme;
    return (React.createElement(mobx_react_1.Provider, Object.assign({}, stores_1.cogliteState),
        React.createElement(theming_1.ThemeProvider, { theme: muiTheme },
            React.createElement("div", { style: { height: '100vh', width: '100vw' } },
                React.createElement(AppLayout_1.AppLayout, null,
                    React.createElement(Router_1.default, null))))));
});
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

});
___scope___.file("modules/layout/AppLayout.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const design_1 = require("../../design");
const Footer_1 = require("./Footer");
const IconNavigation_1 = require("./IconNavigation");
//import { NavStore } from '../stores/NavStore';
const Workspace_1 = require("./Workspace");
const command_bar_1 = require("./command-bar");
let AppLayout = class AppLayout extends React.Component {
    constructor() {
        super(...arguments);
        this.hasError = false;
        this.displayError = () => this.hasError = true;
    }
    componentDidCatch(error, errorInfo) {
        this.displayError();
    }
    render() {
        const { children } = this.props;
        return (React.createElement(design_1.FillFlex, null,
            React.createElement(design_1.Row, null,
                React.createElement(design_1.VerticalStretch, null,
                    React.createElement(command_bar_1.CommandBarPrimary, null),
                    React.createElement(design_1.Row, null,
                        React.createElement(IconNavigation_1.IconNavBar, null),
                        React.createElement(design_1.Row, null,
                            React.createElement(Workspace_1.MiddlePanel, null, this.hasError ? (React.createElement(ErrorDisplay, null)) : (children)))),
                    React.createElement(Footer_1.StatusFooter, null)),
                React.createElement("div", { style: { width: '1px' } }, "same as above. set width to 100px or something to see"))));
    }
};
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], AppLayout.prototype, "hasError", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], AppLayout.prototype, "displayError", void 0);
AppLayout = __decorate([
    mobx_react_1.inject('nav'),
    mobx_react_1.observer
], AppLayout);
exports.AppLayout = AppLayout;
const ErrorDisplay = mobx_react_1.observer((props) => React.createElement("div", { style: { textAlign: 'center', paddingTop: 25, paddingBottom: 25 } },
    React.createElement("h1", null, "An unknown error occurred")));

});
___scope___.file("design/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./dimensions"));

});
___scope___.file("design/dimensions.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_jss_1 = require("styled-jss");
exports.Wrapper = styled_jss_1.default('div')({
    padding: 40,
    background: '#f7df1e',
    textAlign: 'center'
});
exports.FillFlex = styled_jss_1.default('div')({
    display: 'flex',
    flex: '1',
    width: '100%',
    height: '100%',
});
exports.Row = styled_jss_1.default('div')({
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'row',
    justifyContent: 'stretch'
});
exports.HorizontalStretch = styled_jss_1.default('div')({
    display: "flex",
    flex: "auto",
    flexDirection: "row",
    justifyContent: "stretch",
});
exports.VerticalStretch = styled_jss_1.default('div')({
    display: "flex",
    flex: "1 1 auto",
    height: "100%",
    flexDirection: "column",
    justifyContent: "stretch"
});
exports.FillParent = styled_jss_1.default('div')({
    position: 'relative',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
});
exports.CssClassWrapper = ({ children, className }) => (React.createElement("span", Object.assign({}, { className }), children));
/*
import styled from 'styled-components';

export const FillFlex =  styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
`;

export const HorizontalStretch = styled.div`
  display: flex;
  flex: auto;
  flex-direction: row;
  justify-content: stretch;
`;

export const VerticalStretch = styled.div`
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  flex-direction: column;
  justify-content: stretch;
`;

export const FillParent = styled.div`
    position: relative;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

export const Row = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  justify-content: stretch;
`
*/ 

});
___scope___.file("modules/layout/Footer.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const design_1 = require("../../design");
const version = '0.0.1';
const copyrightString = '© Copyright Coglite 2018';
const theming_1 = require("theming");
const styled_jss_1 = require("styled-jss");
const FooterDimensions = theming_1.withTheme(styled_jss_1.default('div')(({ theme }) => ({
    border: "3px solid black",
    display: "flex",
    maxHeight: 25,
    minHeight: 25,
    width: "100%",
    flexDirection: "row",
    position: "relative",
    bottom: 0,
    left: 0,
    right: 0,
    flexWrap: "none",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
})));
exports.StatusFooter = mobx_react_1.observer(props => (React.createElement(FooterDimensions, null,
    React.createElement(design_1.HorizontalStretch, null,
        React.createElement("span", null, copyrightString),
        React.createElement("div", { style: { flex: 'auto' } }),
        React.createElement("span", null, `Version: ${version || 'pre-release'}`)))));
/*

const FooterDimensions1 = styled.div`
  border: 3px solid black;
  display: flex;
  max-height: 25px;
  min-height: 25px;
  width: 100%;
  flex-direction: row;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${props => lighten(0.1, props.theme.main)};
  flex-wrap: none;
`;
*/ 

});
___scope___.file("modules/layout/IconNavigation.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const icons_1 = require("@blueprintjs/icons");
const theming_1 = require("theming");
const styled_jss_1 = require("styled-jss");
const Link_1 = require("../../components/Link");
const LeftNavStylesContainer = theming_1.withTheme(styled_jss_1.default('div')(({ theme, props }) => ({
    maxWidth: 48,
    minWidth: 48,
    width: 48,
    minHeight: "100%",
    flex: "1 1 auto",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignmentBaseline: "central",
    overflow: "hidden",
    border: "3px solid white",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08)",
    backgroundColor: 'white'
})));
/*
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fill: theme.palette.primary.contrastText,
  */
exports.IconNavBar = theming_1.withTheme(mobx_react_1.observer((props) => (React.createElement(LeftNavStylesContainer, Object.assign({}, props),
    React.createElement(Link_1.Link, { icon: icons_1.IconNames.PROJECTS, large: true, route: "dashboard" }),
    React.createElement(Link_1.Link, { icon: icons_1.IconNames.GRAPH, large: true, route: "notebook" }),
    React.createElement(Link_1.Link, { icon: icons_1.IconNames.CHART, large: true, route: "charts" }),
    React.createElement(Link_1.Link, { icon: icons_1.IconNames.DATABASE, large: true, route: "datasets" }),
    React.createElement(Link_1.Link, { icon: icons_1.IconNames.CLOUD, large: true, route: "cloud" }),
    React.createElement(Link_1.Link, { icon: icons_1.IconNames.APPLICATIONS, large: true, route: "catalog" }),
    React.createElement(Link_1.Link, { icon: icons_1.IconNames.COG, large: true, route: "settings" }),
    React.createElement(Link_1.Link, { icon: icons_1.IconNames.HELP, large: true, route: "about" })))));
/*
  const LeftNavStylesContainer = styled.div`
      max-width: 48px;
      min-width: 48px;
      width: 48px;
      min-height: 100%;
      flex: 1 1 auto;
      position: relative;
      display: flex;
      flex-direction: column;
      alignment-baseline: central;
      overflow: hidden;
      border: 3px solid white;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);
      ;`
*/ 

});
___scope___.file("components/Link.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const core_1 = require("@blueprintjs/core");
exports.Link = mobx_react_1.inject('nav')(mobx_react_1.observer((props) => (React.createElement(core_1.Button, Object.assign({ minimal: true }, props, { onClick: () => props.nav.goTo(props.route) }), props.children))));
/*
const LinkStyle = style({
  color: 'black',
  textDecoration: 'none',
  transitionDuration: '0.3s',
  padding: [0, 10, 0, 10],
  $nest: {
    '&:hover': {
      color: '#6642C6',
      transform: scale3d(1.1, 1.1, 1.1)
    }
  }
})
*/

});
___scope___.file("modules/layout/Workspace.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const React = require("react");
const styled_jss_1 = require("styled-jss");
const mobx_react_1 = require("mobx-react");
const design_1 = require("../../design");
//idk why but shit overflows like crazy without using a card
const Container = styled_jss_1.default(core_1.Card)({
    position: "relative",
    display: "flex",
    flex: "1 1 auto",
    width: "100%",
    margin: 5,
});
exports.MiddlePanel = mobx_react_1.observer((props) => React.createElement(Container, null,
    React.createElement(design_1.FillFlex, null, props.children)));
//this works
/*
@observer
export class MiddlePanel11 extends React.Component {
    @observable showSubmenu: boolean = false
    @action.bound toggleSidebar1 () {return this.showSubmenu = !this.showSubmenu}

  render(){
    const menuStyles = {width: this.showSubmenu ? 260 : 0};
    return(

    <Container>
      <div style={menuStyles}>test</div>
     <FillFlex>{this.props.children}</FillFlex>
    </Container>
)
}
}
*/
/*
          <button onClick={this.toggleSidebar}>
            {this.sidebarVisible && 'Hide Sidebar'}
            {!this.sidebarVisible && 'Show Sidebar'}
          </button>
          */
/*
  render() {
    const { showSubmenu } = this.state;
    const menuStyles = {width: showSubmenu ? 260 : 0};
    const contextStyle = {marginLeft: showSubmenu ? 324 : 80};

    return (
      <div>
        <TopLevelNav showSubmenu={showSubmenu} onToggleMenu={this.handleToggleMenu} />
        <DocSidebar style={menuStyles} />
        */ 

});
___scope___.file("modules/layout/command-bar/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./command-bar-primary"));
__export(require("./FileCommandButtons"));
__export(require("./Login"));

});
___scope___.file("modules/layout/command-bar/command-bar-primary.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const core_1 = require("@blueprintjs/core");
const mobx_react_1 = require("mobx-react");
//import styled from 'styled-components'
const Login_1 = require("./Login");
const FileCommandButtons_1 = require("./FileCommandButtons");
const design_1 = require("../../../design");
const theming_1 = require("theming");
const styled_jss_1 = require("styled-jss");
const addressBarMenu_1 = require("../addressBar/addressBarMenu");
const Dimensions = theming_1.withTheme(styled_jss_1.default('div')(({ theme }) => ({
    border: "1px solid black",
    display: "flex",
    maxHeight: 32,
    minHeight: 32,
    width: "100%",
    flexDirection: "row",
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    flexWrap: "none",
    overflow: "hidden !important",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
})));
//background-color: ${props => lighten(0.1, props.theme.main)};
let CommandBarPrimary = class CommandBarPrimary extends React.Component {
    render() {
        return (React.createElement(Dimensions, null,
            React.createElement(design_1.HorizontalStretch, null,
                React.createElement(FileCommandButtons_1.FileCommandButtons, null),
                React.createElement(core_1.NavbarDivider, null),
                React.createElement(Login_1.LoginView, null),
                React.createElement(addressBarMenu_1.AddressBarMenu, null))));
    }
};
CommandBarPrimary = __decorate([
    mobx_react_1.observer
], CommandBarPrimary);
exports.CommandBarPrimary = CommandBarPrimary;
/*
const Dimensions1 = styled.div`
  border: 1px solid black;
  display: flex;
  max-height: 32px;
  min-height: 32px;
  width: 100%;
  flex-direction: row;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.main};
  flex-wrap: none;
  overflow: hidden !important;
`;
*/ 

});
___scope___.file("modules/layout/command-bar/Login/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./LoginButton"));
__export(require("./LoginButtonView"));

});
___scope___.file("modules/layout/command-bar/Login/LoginButton.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
// Material-ui
const core_1 = require("@blueprintjs/core");
const auth_1 = require("../../../../stores/auth");
exports.LoginView = mobx_react_1.observer(() => {
    const displayName = auth_1.default.isLoggedIn ? auth_1.default.profile.username : "Login";
    const login = () => { auth_1.default.isLoggedIn ? auth_1.default.logout() : auth_1.default.login({ whatever: true }); };
    return (React.createElement(core_1.Button, { icon: 'person', text: displayName, onClick: () => login() }));
});
/*
export const LoginMenuView = observer(() => {
    const tooltip = auth.isLoggedIn ? auth.profile.username : "Login";
    const loginLinkText = auth.isLoggedIn ? "Sign out" : "Sign In";
    
    const exampleMenu = (
        <Menu>
            <MenuItem text={loginLinkText} onClick={login} />
        </Menu>
    );
    return (
        <Popover content={exampleMenu} position={Position.RIGHT_BOTTOM}>
            <Tooltip content={tooltip} position={Position.RIGHT}>
                <Button icon='person' text={tooltip} />
            </Tooltip>
        </Popover>

    );
}
);
*/ 

});
___scope___.file("stores/auth/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Auth_1 = require("./Auth");
const mobx_persist_1 = require("mobx-persist");
const auth = new Auth_1.Auth();
exports.default = auth;
const hydrate = mobx_persist_1.create();
hydrate("auth", auth);

});
___scope___.file("stores/auth/Auth.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const mobx_persist_1 = require("mobx-persist");
class Auth {
    constructor() {
        this.isLoggedIn = false;
        this.login = (_args) => {
            this.isLoggedIn = true;
            this.profile = { username: "user" };
        };
        this.logout = () => {
            this.isLoggedIn = false;
            this.profile = {};
        };
        this.profile = {};
    }
}
Auth.persistenceKey = "coglite:auth";
__decorate([
    mobx_persist_1.persist, mobx_1.observable,
    __metadata("design:type", Object)
], Auth.prototype, "isLoggedIn", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], Auth.prototype, "login", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], Auth.prototype, "logout", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], Auth.prototype, "profile", void 0);
exports.Auth = Auth;

});
___scope___.file("modules/layout/command-bar/Login/LoginButtonView.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const core_1 = require("@blueprintjs/core");
const auth_1 = require("../../../../stores/auth");
//this isnt used just example atm
const login = () => { auth_1.default.isLoggedIn ? auth_1.default.logout() : auth_1.default.login({ whatever: true }); };
exports.LoginMenuView = mobx_react_1.observer(() => {
    const tooltip = auth_1.default.isLoggedIn ? auth_1.default.profile.username : "Login";
    const loginLinkText = auth_1.default.isLoggedIn ? "Sign out" : "Sign In";
    const exampleMenu = (React.createElement(core_1.Menu, null,
        React.createElement(core_1.MenuItem, { text: loginLinkText, onClick: login })));
    return (React.createElement(core_1.Popover, { content: exampleMenu, position: core_1.Position.RIGHT_BOTTOM },
        React.createElement(core_1.Tooltip, { content: tooltip, position: core_1.Position.RIGHT },
            React.createElement(core_1.Button, { icon: 'person', text: tooltip }))));
});

});
___scope___.file("modules/layout/command-bar/FileCommandButtons.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@blueprintjs/core");
const React = require("react");
const core_2 = require("@blueprintjs/core");
exports.FileMenu = props => (React.createElement(core_2.Menu, { className: props.className },
    React.createElement(core_2.MenuItem, Object.assign({ text: "New", icon: "document" }, props)),
    React.createElement(core_2.MenuItem, Object.assign({ text: "Open", icon: "folder-shared" }, props)),
    React.createElement(core_2.MenuItem, Object.assign({ text: "Close", icon: "add-to-folder" }, props)),
    React.createElement(core_2.MenuDivider, null),
    React.createElement(core_2.MenuItem, Object.assign({ text: "Save", icon: "floppy-disk" }, props)),
    React.createElement(core_2.MenuItem, Object.assign({ text: "Save as...", icon: "floppy-disk" }, props)),
    React.createElement(core_2.MenuDivider, null),
    React.createElement(core_2.MenuItem, Object.assign({ text: "Exit", icon: "cross" }, props))));
class FileCommandButtons extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            alignText: core_1.Alignment.CENTER,
            intent: core_1.Intent.NONE,
            large: false,
            minimal: true,
            vertical: false,
        };
    }
    render() {
        const _a = this.state, { intent } = _a, bgProps = __rest(_a, ["intent"]);
        return (React.createElement(core_1.ButtonGroup, Object.assign({}, bgProps, { style: { minWidth: 120 } }),
            this.renderButton("File", "document"),
            this.renderButton("Edit", "edit"),
            this.renderButton("View", "eye-open")));
    }
    renderButton(text, iconName) {
        const { intent, vertical } = this.state;
        const rightIconName = vertical ? "caret-right" : "caret-down";
        const position = vertical ? core_1.Position.RIGHT_TOP : core_1.Position.BOTTOM_LEFT;
        return (React.createElement(core_1.Popover, { minimal: true, content: React.createElement(exports.FileMenu, null), position: position },
            React.createElement(core_1.Button, { intent: intent, rightIcon: rightIconName, icon: iconName, text: text })));
    }
}
exports.FileCommandButtons = FileCommandButtons;

});
___scope___.file("modules/layout/addressBar/addressBarMenu.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Icons = require("../../../components/icons");
const electron_1 = require("electron");
const { Menu } = electron_1.remote;
class AddressBarMenu extends React.Component {
    showMenu() {
        const kernelActive = true;
        const kernelInstalled = true;
        const template = [
            {
                label: 'New Service',
                click: () => { },
                enabled: kernelInstalled
            },
            {
                label: 'Execute Service',
                type: 'submenu',
                enabled: kernelActive,
                submenu: [
                    {
                        label: 'Send System Event',
                        type: 'submenu',
                        enabled: true,
                        submenu: [
                            {
                                label: 'TODO: send event to main process',
                                click: () => {
                                    /*NodeJSMainProxy.ping();*/
                                }
                            },
                            {
                                label: 'TODO: send event to main process',
                                click: () => {
                                    /*NodeJSMainProxy.ping();*/
                                }
                            },
                            {
                                label: 'TODO: send event to main process',
                                click: () => {
                                    /*NodeJSMainProxy.ping();*/
                                }
                            },
                            {
                                label: 'TODO: send event to main process',
                                click: () => {
                                    /*NodeJSMainProxy.ping();*/
                                }
                            },
                            {
                                label: 'infos and things',
                                click: () => {
                                    /*NodeJSMainProxy.ping();*/
                                }
                            },
                            {
                                label: 'ping',
                                click: () => {
                                    /*NodeJSMainProxy.ping();*/
                                }
                            },
                            {
                                label: 'delete Data',
                                click: () => {
                                    /*NodeJSMainProxy.ping();*/
                                }
                            }
                        ]
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Leave',
                        click: () => { }
                    }
                ]
            },
            {
                type: 'separator'
            },
            {
                label: 'App Settings TODO: add back modal',
                click: () => { }
            },
            {
                type: 'separator'
            },
            {
                label: 'Zoom',
                type: 'submenu',
                enabled: true,
                submenu: [
                    {
                        label: 'Zoom In',
                        accelerator: 'CommandOrControl+=',
                        click: () => { }
                    },
                    {
                        label: 'Zoom Out',
                        accelerator: 'CommandOrControl+-',
                        click: () => { }
                    },
                    {
                        label: 'Reset Zoom',
                        accelerator: 'CommandOrControl+0',
                        click: () => { }
                    },
                ]
            },
            {
                type: 'separator'
            },
            {
                label: 'About',
                click: () => { }
            },
            {
                type: 'separator'
            },
            {
                label: 'Legal',
                click: () => window.open('https://google.com')
            },
            {
                label: 'Privacy',
                click: () => window.open('https://google.com')
            },
            {
                label: 'Credits',
                click: () => window.open('https://google.com')
            },
            {
                type: 'separator'
            },
            {
                label: 'Report issues',
                click: () => window.open('https://coglite.com')
            },
        ];
        const menu = Menu.buildFromTemplate(template);
        //@ts-ignore
        menu.popup();
    }
    render() {
        return (React.createElement("a", { className: 'undecorated-text', href: 'javascript:void(0)', title: 'Settings' },
            React.createElement("div", { className: "addressbar-menu", dangerouslySetInnerHTML: { __html: Icons.hamburgerIcon('toolbar-button', 24) }, onClick: () => this.showMenu() })));
    }
}
exports.AddressBarMenu = AddressBarMenu;

});
___scope___.file("components/icons/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./icons"));

});
___scope___.file("components/icons/icons.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCloseIcon = (className, size) => {
    return `
<svg class="${className}" width="${size}px" height="${size}px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g id="x-large">
          <g id="refresh">
              <polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon>
              <g id="close" transform="translate(6.000000, 6.000000)" stroke="#FFFFFF" stroke-width="2">
                  <path d="M0.486851205,0.486851205 L11.8005597,11.8005597" id="Line"></path>
                  <path d="M0.486851205,0.486851205 L11.8005597,11.8005597" id="Line" transform="translate(6.143705, 6.143705) scale(-1, 1) translate(-6.143705, -6.143705) "></path>
              </g>
          </g>
      </g>
  </g>
</svg>
  `;
};
exports.hamburgerIcon = (className, size) => {
    return `
<svg class="${className}" width="${size}px" height="${size}px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g id="menu">
          <g>
              <rect id="Rectangle-2" x="0" y="0" width="24" height="24"></rect>
              <path d="M10,6 C10,7.1045695 10.8954305,8 12,8 C13.1045695,8 14,7.1045695 14,6 C14,4.8954305 13.1045695,4 12,4 C10.8954305,4 10,4.8954305 10,6 Z M10,12 C10,13.1045695 10.8954305,14 12,14 C13.1045695,14 14,13.1045695 14,12 C14,10.8954305 13.1045695,10 12,10 C10.8954305,10 10,10.8954305 10,12 Z M10,18 C10,19.1045695 10.8954305,20 12,20 C13.1045695,20 14,19.1045695 14,18 C14,16.8954305 13.1045695,16 12,16 C10.8954305,16 10,16.8954305 10,18 Z" id="Combined-Shape" fill="#FFFFFF"></path>
          </g>
      </g>
  </g>
</svg>
  `;
};
exports.reloadIcon = (className, size) => {
    return `
<svg class="${className}" width="${size}px" height="${size}px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g id="refresh">
          <g id="Shape">
              <polygon points="0 0 24 0 24 24 0 24"></polygon>
              <path d="M11.500938,6 C7.91020633,6 5.01,8.90833016 5.01,12.4990618 C5.01,16.0897934 7.91020633,18.9981236 11.500938,18.9981236 C14.5311255,18.9981236 17.0576358,16.9265476 17.7806564,14.1238272 L16.0909004,14.1238272 C15.4247465,16.016679 13.6212569,17.3733581 11.500938,17.3733581 C8.81195115,17.3733581 6.62664162,15.1880486 6.62664162,12.4990618 C6.62664162,9.81007498 8.81195115,7.62476545 11.500938,7.62476545 C12.8494933,7.62476545 14.0518197,8.18530953 14.9291931,9.0708067 L12.3133207,11.6866791 L17.9999998,11.6866791 L17.9999998,6 L16.0909004,7.9090994 C14.9129454,6.73114445 13.2963038,6 11.500938,6 Z" fill="#FFFFFF"></path>
          </g>
      </g>
  </g>
</svg>
  `;
};
exports.tempFrameworkIconEmbossed = (className, size) => {
    return `
<svg class="${className}" width="${size}px" height="${size}px" viewBox="0 0 158 158" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
      <ellipse id="path-1" cx="40.3301887" cy="34.7878788" rx="4.66981132" ry="4.66666667"></ellipse>
      <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-2">
          <feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetInner1"></feOffset>
          <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite>
          <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.09 0" type="matrix" in="shadowInnerInner1"></feColorMatrix>
      </filter>
      <polygon id="path-3" points="63.4092287 32.1588326 60.7075472 34.8586949 63.4092287 37.5585571 95.6259173 69.753551 101.02928 64.3538265 71.4220495 34.8586949 100.993095 5.39972451 95.5897317 0"></polygon>
      <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-4">
          <feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetInner1"></feOffset>
          <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite>
          <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.09 0" type="matrix" in="shadowInnerInner1"></feColorMatrix>
      </filter>
      <polygon id="path-5" points="2.70168157 32.1588326 0 34.8586949 2.70168157 37.5585571 34.9183701 69.753551 40.3217333 64.3538265 10.7145024 34.8586949 40.2855477 5.39972451 34.8821846 0"></polygon>
      <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-6">
          <feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetInner1"></feOffset>
          <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite>
          <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.09 0" type="matrix" in="shadowInnerInner1"></feColorMatrix>
      </filter>
      <ellipse id="path-7" cx="61.1320755" cy="34.7878788" rx="4.66981132" ry="4.66666667"></ellipse>
      <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-8">
          <feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetInner1"></feOffset>
          <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite>
          <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.09 0" type="matrix" in="shadowInnerInner1"></feColorMatrix>
      </filter>
      <path d="M156,78 C156,34.9217895 121.07821,0 78,0 C34.9217895,0 0,34.9217895 0,78 C0,121.07821 34.9217895,156 78,156 C121.07821,156 156,121.07821 156,78 Z M8,78 C8,39.3400675 39.3400675,8 78,8 C116.659932,8 148,39.3400675 148,78 C148,116.659932 116.659932,148 78,148 C39.3400675,148 8,116.659932 8,78 Z" id="path-9"></path>
      <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-10">
          <feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetInner1"></feOffset>
          <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite>
          <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.09 0" type="matrix" in="shadowInnerInner1"></feColorMatrix>
      </filter>
  </defs>
  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g id="empty_chat">
          <g id="Group" transform="translate(1.000000, 1.000000)">
              <g id="botty_mcbot" transform="translate(27.000000, 43.000000)">
                  <g id="Group-19">
                      <g id="Oval-4">
                          <use fill-opacity="0.548403533" fill="#E3E5E7" fill-rule="evenodd" xlink:href="#path-1"></use>
                          <use fill="black" fill-opacity="1" filter="url(#filter-2)" xlink:href="#path-1"></use>
                      </g>
                      <g id="Path-2" transform="translate(80.868414, 34.876775) scale(-1, 1) translate(-80.868414, -34.876775) ">
                          <use fill-opacity="0.548403533" fill="#E3E5E7" fill-rule="evenodd" xlink:href="#path-3"></use>
                          <use fill="black" fill-opacity="1" filter="url(#filter-4)" xlink:href="#path-3"></use>
                      </g>
                      <g id="Path-2">
                          <use fill-opacity="0.548403533" fill="#E3E5E7" fill-rule="evenodd" xlink:href="#path-5"></use>
                          <use fill="black" fill-opacity="1" filter="url(#filter-6)" xlink:href="#path-5"></use>
                      </g>
                      <g id="Oval-4" transform="translate(61.132075, 34.787879) scale(-1, 1) translate(-61.132075, -34.787879) ">
                          <use fill-opacity="0.548403533" fill="#E3E5E7" fill-rule="evenodd" xlink:href="#path-7"></use>
                          <use fill="black" fill-opacity="1" filter="url(#filter-8)" xlink:href="#path-7"></use>
                      </g>
                  </g>
              </g>
              <g id="Oval">
                  <use fill-opacity="0.548403533" fill="#E3E5E7" fill-rule="evenodd" xlink:href="#path-9"></use>
                  <use fill="black" fill-opacity="1" filter="url(#filter-10)" xlink:href="#path-9"></use>
              </g>
          </g>
      </g>
  </g>
</svg>
  `;
};
exports.tempFrameworkIcon = (className, size) => {
    return `
<svg class="${className}" width="${size}px" height="${size}px" viewBox="0 0 244 244" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
 <g id="Layer_2" data-name="Layer 2">
    <g id="Layer_1-2" data-name="Layer 1">
       <path d="M122,15.25A106.75,106.75,0,1,1,15.25,122h0A106.87,106.87,0,0,1,122,15.25M122,0A122,122,0,1,0,244,122,122,122,0,0,0,122,0Z"/>
       <circle cx="102.93" cy="122" r="11.43"/>
       <circle cx="141.06" cy="122" r="11.43"/>
       <path d="M93.73,188.39l-61-61a7.63,7.63,0,0,1,0-10.78l0,0,61-61,10.82,10.82L48.91,122l55.61,55.61Z"/>
       <path d="M150.27,188.39l-10.82-10.82L195.09,122,139.48,66.39l10.82-10.82,61,61a7.62,7.62,0,0,1,0,10.78l0,0Z"/>
    </g>
 </g>
</svg>
  `;
};
exports.removeIcon = (className, size) => {
    return `
<svg class="${className}" width="${size}px" height="${size}px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g id="Page-1">
      <g id="x-large">
          <g id="refresh">
              <g id="close" transform="translate(6.000000, 6.000000)" stroke-width="1">
                  <path d="M0.486851205,0.486851205 L11.8005597,11.8005597" id="Line"></path>
                  <path d="M0.486851205,0.486851205 L11.8005597,11.8005597" id="Line" transform="translate(6.143705, 6.143705) scale(-1, 1) translate(-6.143705, -6.143705) "></path>
              </g>
          </g>
      </g>
  </g>
</svg>
  `;
};

});
___scope___.file("Router.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const when_switch_1 = require("when-switch");
const typestyle_1 = require("typestyle");
const csstips_1 = require("csstips");
const mobx_react_1 = require("mobx-react");
const View_1 = require("./modules/notebook/View");
const modules_1 = require("./modules");
const designer_screen_1 = require("./modules/workflow-designer/components/workflow-toolbar/designer-screen");
const App_1 = require("./modules/som-designer/App");
const AppRouter = mobx_react_1.inject('nav')(mobx_react_1.observer((props) => (React.createElement("div", { className: typestyle_1.style(csstips_1.flex, csstips_1.vertical) }, when_switch_1.default(props.nav.route)
    .is('notebook', () => React.createElement(View_1.NotebookView, null))
    .is('datasets', () => React.createElement(modules_1.DatasetsPage, null))
    .is('charts', () => React.createElement(App_1.SOMDesigner, null))
    .is('dashboard', () => React.createElement(modules_1.DashboardPage, null))
    .is('cloud', () => React.createElement(designer_screen_1.DesignerApp, null))
    .is('catalog', () => React.createElement(modules_1.CatalogModule, null))
    .is('settings', () => React.createElement(modules_1.SettingsPage, null))
    .is('about', () => React.createElement(modules_1.AboutPage, null))
    .else(() => React.createElement(modules_1.DashboardPage, null))))));
exports.default = AppRouter;

});
___scope___.file("modules/notebook/View.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const layout_1 = require("./layout");
const mobx_react_1 = require("mobx-react");
const Canvas_1 = require("./Diagram/Canvas");
exports.NotebookView = mobx_react_1.observer((props) => {
    return (React.createElement(React.Fragment, null,
        React.createElement(layout_1.NotebookLayout, null,
            React.createElement(Canvas_1.default, { num: "2", someProp: 100 }))));
});

});
___scope___.file("modules/notebook/layout.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const NodeDrawer_1 = require("./Drawers/NodeDrawer");
const toolbar_1 = require("./toolbar");
const Input_1 = require("./Nodes/Input");
const Output_1 = require("./Nodes/Output");
const design_1 = require("../../design");
require("./scss/main.scss");
const theming_1 = require("theming");
const styled_jss_1 = require("styled-jss");
const MainWorkSpace = theming_1.withTheme(styled_jss_1.default('div')(({ theme }) => ({
    display: "flex",
    height: "100%",
    width: "100%",
    backgroundColor: theme.palette.primary.main,
})));
let NotebookLayout = class NotebookLayout extends React.Component {
    constructor() {
        super(...arguments);
        this.setTarget = event => { this.currentClickTarget = event.target; };
    }
    render() {
        const nodeDrawer = (React.createElement(NodeDrawer_1.NodeDrawer, null,
            React.createElement(Input_1.InputNode, null),
            React.createElement(Output_1.OutputNode, null)));
        return (React.createElement(design_1.FillFlex, null,
            React.createElement(design_1.Row, null,
                React.createElement(design_1.VerticalStretch, null,
                    React.createElement(toolbar_1.NotebookWidgetBar, null),
                    React.createElement(design_1.Row, null,
                        React.createElement(design_1.Row, null,
                            React.createElement(MainWorkSpace, null, this.props.children)),
                        nodeDrawer)))));
    }
};
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], NotebookLayout.prototype, "currentClickTarget", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], NotebookLayout.prototype, "setTarget", void 0);
NotebookLayout = __decorate([
    mobx_react_1.observer
], NotebookLayout);
exports.NotebookLayout = NotebookLayout;
/*
import styled from 'styled-components'

export const MainWorkSpace = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background-color: ${props => lighten(0.1, props.theme.main)};
`;
*/ 

});
___scope___.file("modules/notebook/Drawers/NodeDrawer.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const core_1 = require("@blueprintjs/core");
const mobx_react_1 = require("mobx-react");
const styled_jss_1 = require("styled-jss");
const design_1 = require("../../../design");
const NodeDrawerDimensions = styled_jss_1.default(core_1.Card)({
    maxWidth: 180,
    minHeight: "100%",
    flex: "1 1 auto",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignmentBaseline: "central"
});
let NodeDrawer = class NodeDrawer extends React.Component {
    render() {
        const nodeDrawer = (React.createElement(NodeDrawerDimensions, { style: { width: '180px' } },
            React.createElement(design_1.VerticalStretch, null,
                React.createElement("div", null, this.props.children))));
        return nodeDrawer;
    }
};
NodeDrawer = __decorate([
    mobx_react_1.observer
], NodeDrawer);
exports.NodeDrawer = NodeDrawer;
/*
const NodeDrawerDimensions = styled(Card)`
    max-width: 180px;
    min-height: 100%;
    flex: 1 1 auto;
    position: relative;
    display: flex;
    flex-direction: column;
    alignment-baseline: central;
`
*/ 

});
___scope___.file("modules/notebook/toolbar.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const core_1 = require("@blueprintjs/core");
const icons_1 = require("@blueprintjs/icons");
const mobx_react_1 = require("mobx-react");
exports.NotebookWidgetBar = mobx_react_1.observer((props) => (React.createElement(core_1.ButtonGroup, Object.assign({ large: true, fill: true }, props),
    React.createElement(core_1.Button, { icon: icons_1.IconNames.CODE }),
    React.createElement(core_1.Button, { icon: icons_1.IconNames.GRAPH }),
    React.createElement(core_1.Button, { icon: icons_1.IconNames.SCATTER_PLOT }),
    React.createElement(core_1.Button, { icon: icons_1.IconNames.GRAPH }))));

});
___scope___.file("modules/notebook/Nodes/Input.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const core_1 = require("@blueprintjs/core");
let InputNode = class InputNode extends React.Component {
    render() {
        const inputNode = (React.createElement("div", { draggable: true, onDragStart: event => { event.dataTransfer.setData("storm-diagram-node", JSON.stringify({ type: "cogliteIn" })); } },
            React.createElement(core_1.Button, { icon: 'add', text: 'input' })));
        return inputNode;
    }
};
InputNode = __decorate([
    mobx_react_1.observer
], InputNode);
exports.InputNode = InputNode;

});
___scope___.file("modules/notebook/Nodes/Output.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const core_1 = require("@material-ui/core");
const LabelOutline_1 = require("@material-ui/icons/LabelOutline");
const mobx_react_1 = require("mobx-react");
let OutputNode = class OutputNode extends React.Component {
    render() {
        const outputNode = (React.createElement(core_1.ListItem, { component: "div", draggable: true, onDragStart: event => {
                event.dataTransfer.setData("storm-diagram-node", JSON.stringify({ type: "cogliteOut" }));
            } },
            React.createElement(core_1.ListItemIcon, null,
                React.createElement(LabelOutline_1.default, null)),
            React.createElement(core_1.ListItemText, { primary: "Output" })));
        return outputNode;
    }
};
OutputNode = __decorate([
    mobx_react_1.observer
], OutputNode);
exports.OutputNode = OutputNode;

});
___scope___.file("modules/notebook/scss/main.scss", function(exports, require, module, __filename, __dirname){


require("fuse-box-css")("modules/notebook/scss/main.scss", ".srd-diagram {\n  position: relative;\n  flex-grow: 1;\n  display: flex;\n  cursor: move;\n  overflow: hidden; }\n  .srd-diagram__selector {\n    position: absolute;\n    background-color: rgba(0, 192, 255, 0.2);\n    border: solid 2px #00c0ff; }\n\n.srd-link-layer {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  transform-origin: 0 0;\n  overflow: visible !important;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0; }\n\n.srd-node-layer {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  transform-origin: 0 0;\n  width: 100%;\n  height: 100%; }\n\n.srd-node {\n  position: absolute;\n  -webkit-touch-callout: none;\n  /* iOS Safari */\n  -webkit-user-select: none;\n  /* Chrome/Safari/Opera */\n  user-select: none;\n  cursor: move;\n  pointer-events: all; }\n  .srd-node--selected > * {\n    border-color: #00c0ff !important; }\n\n.srd-port {\n  width: 15px;\n  height: 15px;\n  background: rgba(128, 128, 128, 0.1); }\n  .srd-port:hover, .srd-port.selected {\n    background: #c0ff00; }\n\n.srd-default-node {\n  background-color: #1e1e1e;\n  border-radius: 5px;\n  font-family: sans-serif;\n  color: white;\n  border: solid 2px black;\n  overflow: visible;\n  font-size: 11px; }\n  .srd-default-node__title {\n    background: rgba(0, 0, 0, 0.3);\n    display: flex;\n    white-space: nowrap; }\n    .srd-default-node__title > * {\n      align-self: center; }\n    .srd-default-node__title .fa {\n      padding: 5px;\n      opacity: 0.2;\n      cursor: pointer; }\n      .srd-default-node__title .fa:hover {\n        opacity: 1.0; }\n  .srd-default-node__name {\n    flex-grow: 1;\n    padding: 5px 5px; }\n  .srd-default-node__ports {\n    display: flex;\n    background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)); }\n  .srd-default-node__in, .srd-default-node__out {\n    flex-grow: 1;\n    display: flex;\n    flex-direction: column; }\n\n.srd-default-port {\n  display: flex;\n  margin-top: 1px; }\n  .srd-default-port > * {\n    align-self: center; }\n  .srd-default-port__name {\n    padding: 0 5px; }\n  .srd-default-port--out {\n    justify-content: flex-end; }\n    .srd-default-port--out .srd-default-port__name {\n      justify-content: flex-end;\n      text-align: right; }\n\n.srd-default-label {\n  background: rgba(70, 70, 70, 0.8);\n  border: 1px solid #333;\n  border-radius: 4px;\n  color: #fff;\n  display: inline-block;\n  font-size: smaller;\n  padding: 5px; }\n\n@keyframes dash {\n  from {\n    stroke-dashoffset: 24; }\n  to {\n    stroke-dashoffset: 0; } }\n\n.srd-default-link path {\n  fill: none;\n  pointer-events: all; }\n\n.srd-default-link--path-selected {\n  stroke: #00c0ff !important;\n  stroke-dasharray: 10,2;\n  animation: dash 1s linear infinite; }\n\n.srd-default-link__label {\n  pointer-events: none; }\n  .srd-default-link__label > div {\n    display: inline-block;\n    position: absolute; }\n\n.srd-default-link__point {\n  fill: rgba(0, 0, 0, 0.5); }\n\n.srd-default-link--point-selected {\n  fill: #00c0ff; }\n\n.srd-coglite-canvas {\n  height: 100%;\n  min-height: 600px;\n  background-color: #F7F7F7 !important;\n  background-image: linear-gradient(0deg, transparent 24%, rgba(0, 0, 0, 0.1) 25%, rgba(0, 0, 0, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 0, 0, 0.1) 25%, rgba(0, 0, 0, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0.1) 76%, transparent 77%, transparent);\n  background-size: 50px 50px; }\n  .srd-coglite-canvas .pointui {\n    fill: rgba(255, 255, 255, 0.5); }\n\n.diagram-layer {\n  position: relative;\n  height: 100%;\n  flex: 1; }\n\n/*# sourceMappingURL=main.scss.map */")
});
___scope___.file("modules/notebook/Diagram/Canvas.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const React = require("react");
const storm_react_diagrams_1 = require("storm-react-diagrams");
const CogliteLinkFactory_1 = require("./CogliteLinkFactory");
// import the custom models
const CogliteNodeFactory_1 = require("./CogliteNodeFactory");
const CogliteNodeModel_1 = require("./CogliteNodeModel");
const CoglitePortModel_1 = require("./CoglitePortModel");
const SimplePortFactory_1 = require("./SimplePortFactory");
class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.diagramEngine = new storm_react_diagrams_1.DiagramEngine();
        this.diagramEngine.installDefaultFactories();
        this.initialiseModel();
    }
    initialiseModel() {
        this.diagramEngine.registerLinkFactory(new CogliteLinkFactory_1.CogliteLinkFactory());
        this.diagramEngine.registerPortFactory(new SimplePortFactory_1.SimplePortFactory("coglite", config => new CoglitePortModel_1.CoglitePortModel()));
        this.diagramEngine.registerNodeFactory(new CogliteNodeFactory_1.CogliteNodeFactory());
        //2) setup the diagram model
        var model = new storm_react_diagrams_1.DiagramModel();
        //3-A) create a default node
        var node1 = new storm_react_diagrams_1.DefaultNodeModel("Node 1", "rgb(0,192,255)");
        var port1 = node1.addOutPort("Out");
        node1.setPosition(100, 150);
        //3-B) create our new custom node
        var node2 = new CogliteNodeModel_1.CogliteNodeModel("cogliteIn", "Coglite Transform block");
        node2.setPosition(300, 250);
        var node3 = new storm_react_diagrams_1.DefaultNodeModel("Node 3", "red");
        var port3 = node3.addInPort("In");
        node3.setPosition(550, 150);
        var node4 = new CogliteNodeModel_1.CogliteNodeModel("cogliteOut", "Coglite Transform block");
        node4.setPosition(50, 250);
        //3-C) link the 2 nodes together
        var link1 = port1.link(port3);
        //var link2 = port3.link(node2.getPort("rightBottom"));
        var link3 = node4.getPort("rightTop").link(node2.getPort("leftBottom"));
        //4) add the models to the root graph
        model.addAll(node2, node4, link3, node1, node3, link1);
        //5) load model into engine
        this.diagramEngine.setDiagramModel(model);
        //model.addAll(node2, node4, link3, node1, node3, link1)
    }
    componentDidMount() {
        this.forceUpdate();
    }
    render() {
        //6) render the diagram!
        return (React.createElement("div", { className: "diagram-layer", onDrop: event => {
                var data = JSON.parse(event.dataTransfer.getData("storm-diagram-node"));
                var nodesCount = _.keys(this.diagramEngine.getDiagramModel().getNodes()).length;
                var node = null;
                if (data.type === "cogliteIn") {
                    node = new CogliteNodeModel_1.CogliteNodeModel("cogliteIn", "Dragged Input" + (nodesCount + 1), "rgb(192,255,0)");
                    //node.addInPort("In");
                }
                else {
                    node = new CogliteNodeModel_1.CogliteNodeModel("cogliteOut", "Dragged Output" + (nodesCount + 1), "rgb(0,192,255)");
                    //node.addOutPort("Out");
                }
                var points = this.diagramEngine.getRelativeMousePoint(event);
                node.x = points.x;
                node.y = points.y;
                this.diagramEngine.getDiagramModel().addNode(node);
                debugger;
                this.forceUpdate();
            }, onDragOver: event => {
                //event.preventDefault();
            } },
            React.createElement(storm_react_diagrams_1.DiagramWidget, { className: "srd-coglite-canvas", diagramEngine: this.diagramEngine })));
    }
}
exports.default = Canvas;

});
___scope___.file("modules/notebook/Diagram/CogliteLinkFactory.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storm_react_diagrams_1 = require("storm-react-diagrams");
const CogliteLinkModel_1 = require("./CogliteLinkModel");
class CogliteLinkFactory extends storm_react_diagrams_1.DefaultLinkFactory {
    constructor() {
        super();
        this.type = "coglite";
    }
    getNewInstance(initialConfig) {
        return new CogliteLinkModel_1.CogliteLinkModel();
    }
}
exports.CogliteLinkFactory = CogliteLinkFactory;

});
___scope___.file("modules/notebook/Diagram/CogliteLinkModel.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storm_react_diagrams_1 = require("storm-react-diagrams");
class CogliteLinkModel extends storm_react_diagrams_1.DefaultLinkModel {
    constructor() {
        super("coglite");
        super.setColor("rgba(0,0,0,0.75)");
        super.setWidth(2);
    }
}
exports.CogliteLinkModel = CogliteLinkModel;

});
___scope___.file("modules/notebook/Diagram/CogliteNodeFactory.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const SRD = require("storm-react-diagrams");
const CogliteNodeModel_1 = require("./CogliteNodeModel");
const CogliteNodeWidget_1 = require("./CogliteNodeWidget");
class CogliteNodeFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("coglite");
    }
    generateReactWidget(diagramEngine, node) {
        return React.createElement(CogliteNodeWidget_1.default, { node: node });
    }
    getNewInstance(initialConfig) {
        return new CogliteNodeModel_1.CogliteNodeModel();
    }
}
exports.CogliteNodeFactory = CogliteNodeFactory;

});
___scope___.file("modules/notebook/Diagram/CogliteNodeModel.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const storm_react_diagrams_1 = require("storm-react-diagrams");
const CoglitePortModel_1 = require("./CoglitePortModel");
class CogliteNodeModel extends storm_react_diagrams_1.NodeModel {
    constructor(cogType = "cogliteIn", name = "Untitled", color = "rgb(0,192,255)") {
        super("coglite");
        this.cogType = cogType;
        this.name = name;
        this.color = color;
        this.addPort(new CoglitePortModel_1.CoglitePortModel("leftTop"));
        this.addPort(new CoglitePortModel_1.CoglitePortModel("leftBottom"));
        this.addPort(new CoglitePortModel_1.CoglitePortModel("rightTop"));
        this.addPort(new CoglitePortModel_1.CoglitePortModel("rightBottom"));
    }
    deSerialize(object, engine) {
        super.deSerialize(object, engine);
        this.cogType = object.cogType;
        this.name = object.name;
        this.color = object.color;
    }
    serialize() {
        return _.merge(super.serialize(), {
            cogType: this.cogType,
            name: this.name,
            color: this.color,
        });
    }
}
exports.CogliteNodeModel = CogliteNodeModel;

});
___scope___.file("modules/notebook/Diagram/CoglitePortModel.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const storm_react_diagrams_1 = require("storm-react-diagrams");
const CogliteLinkModel_1 = require("./CogliteLinkModel");
class CoglitePortModel extends storm_react_diagrams_1.PortModel {
    constructor(pos = "leftTop") {
        super(pos, "coglite");
        this.position = pos;
    }
    serialize() {
        return _.merge(super.serialize(), {
            position: this.position,
        });
    }
    link(port) {
        let link = this.createLinkModel();
        link.setSourcePort(this);
        link.setTargetPort(port);
        return link;
    }
    deSerialize(data, engine) {
        super.deSerialize(data, engine);
        this.position = data.position;
    }
    createLinkModel() {
        let link = super.createLinkModel();
        return link || new CogliteLinkModel_1.CogliteLinkModel();
    }
}
exports.CoglitePortModel = CoglitePortModel;

});
___scope___.file("modules/notebook/Diagram/CogliteNodeWidget.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@blueprintjs/core");
const React = require("react");
const storm_react_diagrams_1 = require("storm-react-diagrams");
exports.widgetStyles = {
    cardBasic: {
        display: "flex",
        position: "relative",
    },
    details: {
        display: "flex",
        flexDirection: "column",
        minWidth: 180,
    },
    content: {
        flex: "1 0 auto",
        backgroundColor: "white",
    },
    controls: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: '10px',
        backgroundColor: 'inherit',
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    headerText: {
        paddingRight: 10,
    },
    name: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    leftTop: {
        position: "absolute",
        zIndex: 10,
        left: -5,
        top: `calc(100% / 4 - 1px)`,
    },
    leftBottom: {
        position: "absolute",
        zIndex: 10,
        left: -5,
        bottom: `calc(100% / 4 - 1px)`,
    },
    rightTop: {
        position: "absolute",
        zIndex: 10,
        left: `calc(100% - 5px)`,
        top: `calc(100% / 4 - 1px)`,
    },
    rightBottom: {
        position: "absolute",
        zIndex: 10,
        left: `calc(100% - 5px)`,
        bottom: `calc(100% / 4 - 1px)`,
    },
};
//Patch for props resolution
class CogliteNodeWidget extends storm_react_diagrams_1.BaseWidget {
    constructor(props) {
        super("srd-coglite-node", props);
        this.state = {};
    }
    render() {
        const { classes, theme, node } = this.props;
        //To be used in props with styles
        node.color = node.color || theme.palette.common.white;
        return (React.createElement("div", { style: exports.widgetStyles.cardBasic },
            React.createElement(core_1.Card, { style: exports.widgetStyles.details },
                React.createElement("div", null,
                    React.createElement("div", { style: exports.widgetStyles.controls },
                        React.createElement(core_1.Button, { "aria-label": "Previous", style: exports.widgetStyles.playIcon }, node.cogType === "cogliteIn" ? React.createElement(core_1.Icon, { icon: 'add' }) : React.createElement(core_1.Icon, { icon: 'label' })),
                        React.createElement("span", { style: exports.widgetStyles.headerText }, node.cogType === "cogliteIn" ? `Input Node` : `Output Node`))),
                React.createElement(core_1.MenuDivider, null),
                React.createElement("div", { style: exports.widgetStyles.content },
                    React.createElement("p", { style: exports.widgetStyles.name }, node.name))),
            React.createElement("div", { style: exports.widgetStyles.leftTop },
                React.createElement(storm_react_diagrams_1.PortWidget, { name: "leftTop", node: node })),
            React.createElement("div", { style: exports.widgetStyles.leftBottom },
                React.createElement(storm_react_diagrams_1.PortWidget, { name: "leftBottom", node: node })),
            React.createElement("div", { style: exports.widgetStyles.rightTop },
                React.createElement(storm_react_diagrams_1.PortWidget, { name: "rightTop", node: node })),
            React.createElement("div", { style: exports.widgetStyles.rightBottom },
                React.createElement(storm_react_diagrams_1.PortWidget, { name: "rightBottom", node: node }))));
    }
}
CogliteNodeWidget.defaultProps = {
    node: null
};
exports.CogliteNodeWidget = CogliteNodeWidget;
exports.default = CogliteNodeWidget;

});
___scope___.file("modules/notebook/Diagram/SimplePortFactory.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storm_react_diagrams_1 = require("storm-react-diagrams");
class SimplePortFactory extends storm_react_diagrams_1.AbstractPortFactory {
    constructor(type, cb) {
        super(type);
        this.cb = cb;
    }
    getNewInstance(initialConfig) {
        return this.cb(initialConfig);
    }
}
exports.SimplePortFactory = SimplePortFactory;

});
___scope___.file("modules/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./about"));
__export(require("./catalog"));
__export(require("./dashboard"));
__export(require("./datasets"));
__export(require("./notebook"));
__export(require("./lab"));

});
___scope___.file("modules/about.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
exports.AboutPage = mobx_react_1.observer((props) => React.createElement("div", null,
    React.createElement(SettingsKeybindings, null)));
const core_1 = require("@blueprintjs/core");
class SettingsKeybindings extends React.Component {
    render() {
        return (React.createElement("div", { style: { width: '100%', height: '100vh' } },
            React.createElement("input", { style: { width: '80%', display: 'block' }, className: 'pt-input', type: 'text', placeholder: 'Search for keybinding...' }),
            React.createElement("table", { className: 'pt-table pt-small pt-interactive', style: { width: '100%', height: '100vh', overflowY: 'scroll' } },
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, "Keybinding"),
                        React.createElement("th", null, "Command"))),
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement(core_1.KeyCombo, { combo: "ctrl + 1" })),
                        React.createElement("td", null, "Switch to tab 1")),
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement(core_1.KeyCombo, { combo: "ctrl + 2" })),
                        React.createElement("td", null, "Switch to tab 2")),
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement(core_1.KeyCombo, { combo: "ctrl + 3" })),
                        React.createElement("td", null, "Switch to tab 3")),
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement(core_1.KeyCombo, { combo: "ctrl + 4" })),
                        React.createElement("td", null, "Switch to tab 4")),
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement(core_1.KeyCombo, { combo: "ctrl + 5" })),
                        React.createElement("td", null, "Switch to tab 5")),
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement(core_1.KeyCombo, { combo: "ctrl + 6" })),
                        React.createElement("td", null, "Switch to tab 6")),
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement(core_1.KeyCombo, { combo: "ctrl + 7" })),
                        React.createElement("td", null, "Switch to tab 7")),
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement(core_1.KeyCombo, { combo: "ctrl + 8" })),
                        React.createElement("td", null, "Switch to tab 8")),
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement(core_1.KeyCombo, { combo: "ctrl + 9" })),
                        React.createElement("td", null, "Switch to tab 9")),
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement(core_1.KeyCombo, { combo: "ctrl + 0" })),
                        React.createElement("td", null, "Switch to the last tab"))))));
    }
}
exports.SettingsKeybindings = SettingsKeybindings;

});
___scope___.file("modules/catalog/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./catalog"));

});
___scope___.file("modules/catalog/catalog.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const mainView_1 = require("./mainView");
require("./css/resizer.css");
require("./css/application.css");
require("./css/messages.css");
let CatalogModule = class CatalogModule extends React.Component {
    render() {
        return (React.createElement(mainView_1.MainView, null));
    }
};
CatalogModule = __decorate([
    mobx_react_1.observer
], CatalogModule);
exports.CatalogModule = CatalogModule;

});
___scope___.file("modules/catalog/mainView.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
var Splitter = require('react-split-pane');
const inspectorView_1 = require("./inspectorView");
const logView_1 = require("./logView");
const Icons = require("../../components/icons");
const remote = require('electron').remote;
class MainView extends React.Component {
    constructor() {
        super(...arguments);
        this.reuseKey = 0;
        this.shouldWarnOfServiceChange = false;
    }
    verticalSplitChange(size) { this.updateCogChatContainerCSS(size); }
    updateCogChatContainerCSS(size) {
        if (this.cogChatContainer) {
            let bounds = remote.getCurrentWindow().getBounds();
            if (bounds.width - size <= 450) {
                this.cogChatContainer.classList.remove('wc-wide');
                this.cogChatContainer.classList.add('wc-narrow');
            }
            else if (bounds.width - size >= 768) {
                this.cogChatContainer.classList.remove('wc-narrow');
                this.cogChatContainer.classList.add('wc-wide');
            }
            else {
                this.cogChatContainer.classList.remove('wc-wide', 'wc-narrow');
            }
        }
    }
    initCogChatContainerRef(ref, initialWidth) {
        this.cogChatContainer = ref;
        this.updateCogChatContainerCSS(initialWidth);
    }
    cogChatComponent(initialWidth) {
        return (React.createElement("div", { className: 'cog-app-msg-view-background' },
            React.createElement("div", { className: 'box-centered', dangerouslySetInnerHTML: { __html: Icons.tempFrameworkIconEmbossed('', 158) } })));
    }
    render() {
        let vertSplit;
        let horizSplit;
        return (React.createElement("div", { className: 'mainview' },
            React.createElement("div", { className: 'fill-parent' },
                React.createElement(Splitter, { split: "vertical", minSize: 0, maxSize: -200, defaultSize: 300, primary: "first", onChange: (size) => this.verticalSplitChange(size) },
                    React.createElement("div", { className: "fill-parent" },
                        React.createElement(Splitter, { split: "horizontal", primary: "second", minSize: 42, maxSize: -44, defaultSize: 300, onChange: (size) => (size) },
                            React.createElement("div", { className: "wc-app-msg-view-panel" },
                                React.createElement(inspectorView_1.InspectorView, null)),
                            React.createElement("div", { className: "fill-parent" },
                                React.createElement(logView_1.LogView, null)))),
                    React.createElement("div", { className: 'fill-parent' }, this.cogChatComponent(vertSplit))))));
    }
}
exports.MainView = MainView;

});
___scope___.file("modules/catalog/inspectorView.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class InspectorView extends React.Component {
    render() {
        return (React.createElement("div", null,
            React.createElement("div", { className: "cog-panel-header" },
                React.createElement("span", null, "Details")),
            React.createElement("div", { className: "wc-inspectorview" },
                React.createElement("div", { className: "wc-inspectorview-json" }, formatJSON('')))));
    }
}
exports.InspectorView = InspectorView;
const formatJSON = (obj) => {
    if (!obj)
        return null;
    let json = JSON.stringify(obj, null, 2);
    // Hide ampersands we don't want replaced
    json = json.replace(/&(amp|apos|copy|gt|lt|nbsp|quot|#x?\d+|[\w\d]+);/g, '\x01');
    // Escape remaining ampersands and other HTML special characters
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    // Restore hidden ampersands
    json = json.replace(/\x01/g, '&');
    // Match all the JSON parts and add theming markup
    json = json.replace(/"(\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, (match) => {
        // Default to "number"
        let cls = 'number';
        // Detect the type of the JSON part
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            }
            else {
                cls = 'string';
            }
        }
        else if (/true|false/.test(match)) {
            cls = 'boolean';
        }
        else if (/null/.test(match)) {
            cls = 'null';
        }
        if (cls === 'key') {
            // Color string content, not the quotes or colon delimiter
            let exec = /"(.*)":\s*/.exec(match);
            return `"<span class="json-${cls}">${exec[1]}</span>":`;
        }
        else if (cls === 'string') {
            // Color string content, not the quotes
            let exec = /"(.*)"/.exec(match);
            return `"<span class="json-${cls}">${exec[1]}</span>"`;
        }
        else {
            return `<span class="json-${cls}">${match}</span>`;
        }
    });
    return React.createElement("span", { dangerouslySetInnerHTML: { __html: json } });
};

});
___scope___.file("modules/catalog/logView.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const rxjs_1 = require("rxjs");
const Icons = require("../../components/icons");
const utils_1 = require("../../common/utils");
const { remote } = require('electron');
const { Menu } = remote;
var Severity;
(function (Severity) {
    Severity[Severity["log"] = 0] = "log";
    Severity[Severity["info"] = 1] = "info";
    Severity[Severity["trace"] = 2] = "trace";
    Severity[Severity["debug"] = 3] = "debug";
    Severity[Severity["warn"] = 4] = "warn";
    Severity[Severity["error"] = 5] = "error";
})(Severity = exports.Severity || (exports.Severity = {}));
const number2 = (n) => ('0' + n).slice(-2);
const timestamp = (entry) => {
    const hours = number2(entry.timestamp.getHours());
    const minutes = number2(entry.timestamp.getMinutes());
    const seconds = number2(entry.timestamp.getSeconds());
    return React.createElement("span", { className: 'wc-logview-timestamp' },
        `[${hours}:${minutes}:${seconds}]`,
        "\u00A0");
};
const emit = (val, className) => {
    if (!val)
        return null;
    if (val.hasOwnProperty('messageType') && val['messageType'] === 'link') {
        //return <div className={className}><a className={className} title={val.title} href={val.link}>{val.text}</a>&nbsp;</div>
        return React.createElement("span", { className: className, key: val.link },
            React.createElement("a", { title: val.title, href: val.link }, val.text),
            "\u00A0");
    }
    else {
        let str = utils_1.safeStringify(val);
        return str.match(/\S+/g).map((s, i) => React.createElement("span", { className: className, key: s + i },
            s,
            "\u00A0"));
    }
};
const message = (entry, className) => {
    return emit(entry.message, className);
};
const args = (entry, className) => {
    if (entry.args && entry.args.length) {
        return entry.args
            .filter(arg => !!arg)
            .map((arg, i) => emit(arg, className));
    }
    return null;
};
const format = (entry, index, items, wrapStyle) => {
    const className = 'wc-logview-' + Severity[entry.severity];
    return (React.createElement("div", { key: index, className: 'cog-log-entry', style: wrapStyle },
        timestamp(entry),
        message(entry, className),
        args(entry, className)));
};
class LogView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { entries: [] };
    }
    componentDidMount() {
        this.logSubscription = LogView.log$.subscribe(entry => {
            // Yep we have to set this.state here because otherwise we lose entries due to batching.
            if (entry) {
                this.state = { entries: [...this.state.entries, entry] };
            }
            else {
                this.state = { entries: [] };
            }
            this.setState(this.state);
        });
    }
    componentWillUnmount() {
        //this.autoscrollSubscription.unsubscribe();
        //this.logSubscription.unsubscribe();
    }
    componentDidUpdate(prevProps, prevState) { }
    //whitespace can be set to 'nowrap' for no wordwrap
    render() {
        return (React.createElement("div", null,
            React.createElement("div", { className: "cog-panel-header" },
                React.createElement("span", { className: "logview-header-text" }, "Log"),
                React.createElement("a", { className: 'undecorated-text', href: 'javascript:void(0)', title: 'Log Menu' },
                    React.createElement("div", { className: 'logview-clear-output-button', dangerouslySetInnerHTML: { __html: Icons.hamburgerIcon('toolbar-button-dark', 24) }, onClick: () => this.showMenu() }))),
            React.createElement("div", { className: "wc-logview", ref: ref => this.scrollMe = ref }, this.state.entries.map((entry, i, items) => format(entry, i, items, { whiteSpace: ('normal') })))));
    }
    showMenu() {
        const template = [
            { label: 'Clear log', click: () => LogView.clear() },
            { type: 'checkbox',
                label: 'Word wrap', click: () => { } }
        ];
        const menu = Menu.buildFromTemplate(template);
        //@ts-ignore
        menu.popup();
    }
    static add(severity, message, ...args) {
        let entry = {
            severity,
            timestamp: new Date(),
            message,
            args
        };
        this.log$.next(entry);
        console[Severity[severity]](message, ...args);
    }
    static clear() {
        this.log$.next(null);
    }
}
LogView.log$ = new rxjs_1.Subject();
exports.LogView = LogView;

});
___scope___.file("common/utils.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url = require("url");
exports.uniqueId = (length) => Math.random().toString(24).substr(2, length);
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item) && item !== null);
}
exports.isObject = isObject;
function mergeDeep(target, source) {
    let output = Object.assign({}, target);
    {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target))
                    Object.assign(output, { [key]: source[key] });
                else
                    output[key] = mergeDeep(target[key], source[key]);
            }
            else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
}
exports.mergeDeep = mergeDeep;
exports.isLocalhostUrl = (urlStr) => {
    const parsedUrl = url.parse(urlStr);
    return (parsedUrl.hostname === 'localhost' || parsedUrl.hostname === '127.0.0.1');
};
exports.isSecuretUrl = (urlStr) => {
    const parsedUrl = url.parse(urlStr);
    return (!!parsedUrl.protocol && parsedUrl.protocol.startsWith('https'));
};
exports.safeStringify = (o, space = undefined) => {
    let cache = [];
    if (typeof o !== 'object')
        return `${o}`;
    return JSON.stringify(o, function (key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                return;
            }
            cache.push(value);
        }
        return value;
    }, space);
};
exports.approximateObjectSize = (object, cache = []) => {
    switch (typeof object) {
        case 'boolean': return 4;
        case 'number': return 8;
        case 'string': return object.length * 2;
        case 'object':
            let bytes = 0;
            cache.push(object);
            for (let i in object) {
                let value = object[i];
                if (typeof value === 'object' && value !== null) {
                    if (cache.indexOf(value) !== -1) {
                        continue;
                    }
                    cache.push(value);
                }
                bytes += exports.approximateObjectSize(value, cache);
            }
            return bytes;
        default: //value is null, undefined, or a function
            return 0; //this checked for infinite recursion
    }
};
function repeat(str, times) {
    let output = '';
    for (let i = 0; i < times; ++i) {
        output += str;
    }
    return output;
}
exports.repeat = repeat;

});
___scope___.file("modules/catalog/css/resizer.css", function(exports, require, module, __filename, __dirname){


require("fuse-box-css")("modules/catalog/css/resizer.css", "*, *:before, *:after {\r\n    -moz-box-sizing: border-box;\r\n    -webkit-box-sizing: border-box;\r\n    box-sizing: border-box;\r\n}\r\n\r\n.root {\r\n    height: 100vh;\r\n    width: 100vw;\r\n}\r\n\r\n.Resizer {\r\n    -moz-box-sizing: border-box;\r\n    -webkit-box-sizing: border-box;\r\n    box-sizing: border-box;\r\n    background: #000;\r\n    opacity: .74;\r\n    background-clip: padding-box;\r\n    z-index: 99;\r\n}\r\n\r\n.Resizer:hover {\r\n    -webkit-transition: all 2s ease;\r\n    transition: all 2s ease;\r\n}\r\n\r\n.Resizer.horizontal {\r\n    height: 5px;\r\n    margin: -2px 0;\r\n    border-top: 2px solid rgba(255, 255, 255, 0);\r\n    border-bottom: 2px solid rgba(255, 255, 255, 0);\r\n    cursor: row-resize;\r\n    width: 100%;\r\n}\r\n\r\n.Resizer.horizontal:hover {\r\n    border-top: 2px solid rgba(0, 0, 0, 0.5);\r\n    border-bottom: 2px solid rgba(0, 0, 0, 0.5);\r\n}\r\n\r\n.Resizer.vertical {\r\n    width: 5px;\r\n    margin: 0 -2px;\r\n    border-left: 2px solid rgba(255, 255, 255, 0);\r\n    border-right: 2px solid rgba(255, 255, 255, 0);\r\n    cursor: col-resize;\r\n}\r\n\r\n.Resizer.vertical:hover {\r\n    border-left: 2px solid rgba(0, 0, 0, 0.5);\r\n    border-right: 2px solid rgba(0, 0, 0, 0.5);\r\n}\r\n\r\n.vertical section {\r\n    width: 100vh;\r\n    height: 100vh;\r\n    display: -webkit-box;\r\n    display: -webkit-flex;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n    -webkit-flex-direction: column;\r\n        -ms-flex-direction: column;\r\n            flex-direction: column;\r\n}\r\n\r\n.vertical header {\r\n    padding: 1rem;\r\n    background: #eee;\r\n}\r\n\r\n.vertical footer {\r\n    padding: 1rem;\r\n    background: #eee;\r\n}\r\n\r\n.horizontal section {\r\n    width: 100vh;\r\n    height: 100vh;\r\n    display: flex;\r\n    flex-direction: column;\r\n}\r\n\r\n.horizontal header {\r\n    padding: 1rem;\r\n    background: #eee;\r\n}\r\n\r\n.horizontal footer {\r\n    padding: 1rem;\r\n    background: #eee;\r\n}\r\n\r\n.parent {\r\n    width: 100%;\r\n    height: 100%;\r\n    flex: 1;\r\n    display: -webkit-box;\r\n    display: -webkit-flex;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n    -webkit-flex-direction: column;\r\n        -ms-flex-direction: column;\r\n            flex-direction: column;\r\n}\r\n.header {\r\n    background: #aaa;\r\n    height: 3rem;\r\n    line-height: 3rem;\r\n}\r\n.wrapper {\r\n    background: #ffa;\r\n    margin: 5rem;\r\n    flex: 1;\r\n}\r\n")
});
___scope___.file("modules/catalog/css/application.css", function(exports, require, module, __filename, __dirname){


require("fuse-box-css")("modules/catalog/css/application.css", "/* reset */\r\n\r\n    html, body {\r\n        height: 100%;\r\n        width: 100%;\r\n        margin: 0;\r\n        padding: 0;\r\n        overflow: hidden;\r\n    }\r\n\r\n    body, button, input, textarea, select {\r\n        font-family: -apple-system, BlinkMacSystemFont, \"Segoe WPC\", \"Segoe UI\", \"HelveticaNeue-Light\", \"Ubuntu\", \"Droid Sans\", sans-serif;\r\n        font-size: 15px;\r\n        border-radius: 2px;\r\n    }\r\n\r\n    a, button {\r\n        transition: all .2s;\r\n    }\r\n\r\n    input:focus,\r\n    textarea:focus,\r\n    select:focus,\r\n    button:focus {\r\n        outline-width: 0;\r\n    }\r\n\r\n    button {\r\n        background: #3A96DD;\r\n        border: none;\r\n        border-radius: 2px;\r\n        color: #fff;\r\n        cursor: pointer;\r\n        outline: none;\r\n    }\r\n    button:hover {\r\n        background: #0063B1;\r\n    }\r\n\r\n    *, *:before, *:after {\r\n        box-sizing: border-box;\r\n        user-select: none;\r\n        -webkit-user-select: none;\r\n    }\r\n\r\n    input[type=checkbox] {\r\n        width: 20px;\r\n        height: 20px;\r\n        -webkit-appearance: none;\r\n        background: transparent;\r\n        color: #fff;\r\n        padding: 0;\r\n        text-align: center;\r\n        vertical-align: middle;\r\n        margin-left: 0;\r\n        margin-right: 8px;\r\n        margin-top: 8px;\r\n        margin-bottom: 8px;\r\n        border: 1px solid #ccc;\r\n    }\r\n\r\n    input[type=number] {\r\n        text-align: right;\r\n    }\r\n\r\n    input[type=checkbox]:checked {\r\n        background: #3A96DD;\r\n    }\r\n\r\n    input[type=checkbox]:checked:before {\r\n        content: '\\2714';\r\n    }\r\n\r\n    ::-webkit-scrollbar {\r\n        width: 8px;\r\n        height: 8px;\r\n    }\r\n\r\n    ::-webkit-scrollbar-track {\r\n        background: transparent;\r\n    }\r\n\r\n    ::-webkit-scrollbar-thumb {\r\n        border-radius: 1px;\r\n        background: #D5D5D5;\r\n    }\r\n\r\n/* app-msg- overrides */\r\n\r\n    .format-markdown>p {\r\n        margin-bottom: 0px;\r\n        margin-top: 0px;\r\n    }\r\n\r\n    .wc-message-content * {\r\n        user-select: text;\r\n        -webkit-user-select: text;\r\n    }\r\n\r\n    .wc-message-content.selected {\r\n        color: white;\r\n        background-color: #1e1e1e;\r\n        box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.2);\r\n    }\r\n\r\n    .wc-message-content.selected>svg.wc-message-callout>path {\r\n        fill: #1e1e1e;\r\n    }\r\n\r\n    .wc-card {\r\n        color: #000;\r\n    }\r\n\r\n    .wc-card button {\r\n        border: 1px solid #ccc;\r\n        border-radius: 1px;\r\n        cursor: pointer;\r\n        outline: none;\r\n        transition: color .2s ease, background-color .2s ease;\r\n        background-color: transparent;\r\n        color: #3A96DD;\r\n        min-height: 32px;\r\n        width: 100%;\r\n        padding: 0 16px;\r\n    }\r\n\r\n    .wc-list ul {\r\n        padding: 0;\r\n    }\r\n\r\n/* coglator */\r\n\r\n    .cog-app-msg-view-background {\r\n        background: #f7f7f7;\r\n        position: absolute;\r\n        right: 0;\r\n        left: 0;\r\n        top: 0;\r\n        bottom: 0;\r\n    }\r\n\r\n    .box-centered {\r\n        position: absolute;\r\n        top: 50%;\r\n        left: 50%;\r\n        transform: translate(-50%, -50%);\r\n    }\r\n\r\n    .app-msg-container {\r\n        position: absolute;\r\n        top: 0;\r\n        bottom: 0;\r\n        left: 0;\r\n        right: 0;\r\n    }\r\n\r\n    .addressbar {\r\n        background: #3A96DD;\r\n        position: absolute;\r\n        top: 0;\r\n        height: 42px;\r\n        left: 0;\r\n        right: 0;\r\n        color: white;\r\n        z-index: 900;\r\n    }\r\n\r\n    .addressbar-status {\r\n        position: absolute;\r\n        height: 42px;\r\n        width: 32px;\r\n        top: 0;\r\n        left: 0;\r\n        line-height: 42px;\r\n        text-align: center;\r\n    }\r\n\r\n    .addressbar-textbox {\r\n        position: absolute;\r\n        top: 0;\r\n        left: 32px;\r\n        height: 42px;\r\n        right: 84px;\r\n    }\r\n    .addressbar-textbox input[type=text] {\r\n        background: #3A96DD;\r\n        color: white;\r\n        border: none;\r\n        height: 100%;\r\n        outline: none;\r\n        padding: 0;\r\n        resize: none;\r\n        width: 100%;\r\n        padding-left: 4px;\r\n    }\r\n    .addressbar-textbox input[type=text]::-webkit-input-placeholder {\r\n        color: rgba(255, 255, 255, 0.75);\r\n    }\r\n\r\n    .addressbar-control {\r\n        position: absolute;\r\n        width: 32px;\r\n        height: 42px;\r\n        right: 32px;\r\n        top: 0;\r\n        line-height: 42px;\r\n        text-align: center;\r\n    }\r\n\r\n    .addressbar-refresh {\r\n        position: absolute;\r\n        width: 42px;\r\n        height: 42px;\r\n        right: 42px;\r\n        top: 0;\r\n        line-height: 37px;\r\n        text-align: center;\r\n    }\r\n\r\n    .addressbar-payment {\r\n        position: absolute;\r\n        width: 42px;\r\n        height: 42px;\r\n        right: 84px;\r\n        top: 0;\r\n        line-height: 37px;\r\n        text-align: center;\r\n    }\r\n\r\n    .addressbar-menu {\r\n        position: absolute;\r\n        width: 42px;\r\n        height: 42px;\r\n        right: 0;\r\n        top: 0;\r\n        line-height: 37px;\r\n        text-align: center;\r\n    }\r\n\r\n    .addressbar-search {\r\n        background: #3A96DD;\r\n        max-height: 500px;\r\n        overflow-y: auto;\r\n        position: absolute;\r\n        left: 0;\r\n        right: 0;\r\n        top: 42px;\r\n        z-index: 1000;\r\n        transition: all .2s;\r\n        display: block;\r\n        padding-bottom: 8px;\r\n    }\r\n    .addressbar-search.closed {\r\n        max-height: 0;\r\n    }\r\n\r\n    .addressbar-searchresult-a {\r\n        color: #fff;\r\n        text-decoration: none;\r\n    }\r\n\r\n    .addressbar-searchresult {\r\n        position: relative;\r\n        margin-left: 28px;\r\n        margin-right: 6px;\r\n        display: block;\r\n        transition: background-color 0.1s;\r\n    }\r\n\r\n    .addressbar-searchresult:hover {\r\n        background: #6AAFE5;\r\n        border-radius: 2px;\r\n    }\r\n    .addressbar-searchresult:hover .addressbar-searchresult-delete {\r\n        opacity: 1;\r\n    }\r\n\r\n    .addressbar-searchresult-title {\r\n        cursor: pointer;\r\n        display: block;\r\n        line-height: 32px;\r\n        padding-left: 8px;\r\n        padding-right: 24px;\r\n        overflow-wrap: break-word;\r\n    }\r\n\r\n    .addressbar-searchresult-delete {\r\n        opacity: 0;\r\n        cursor: pointer;\r\n        position: absolute;\r\n        right: 8px;\r\n        top: 7px;\r\n        bottom: 0;\r\n        transition: opacity 0.1s;\r\n    }\r\n\r\n    .addressbar-usercreds {\r\n        background-color: white;\r\n        color: black;\r\n        overflow: hidden;\r\n        position: absolute;\r\n        right: 0;\r\n        left: 0;\r\n        top: 42px;\r\n        z-index: 1000;\r\n        background: #fff;\r\n        padding: 24px 24px 24px 40px;\r\n        box-shadow: 0 1px 2px rgba(0,0,0,.2);\r\n    }\r\n    .addressbar-usercreds.closed {\r\n        max-height: 0;\r\n        border-width: 0;\r\n        box-shadow: 0;\r\n    }\r\n    .addressbar-usercreds-title {\r\n        font-weight: 500;\r\n    }\r\n    .addressbar-usercreds input[type=text] {\r\n        border-width: 0.1px;\r\n        border-style: solid;\r\n        border-color: #ccc;\r\n        padding-left: 4px;\r\n        padding-right: 4px;\r\n    }\r\n    .addressbar-usercreds-input {\r\n        display: inline-block;\r\n    }\r\n    .addressbar-usercreds-appid {\r\n        width: 300px;\r\n    }\r\n    .addressbar-usercreds-password {\r\n        width: 160px;\r\n    }\r\n    .addressbar-usercreds-locale {\r\n        width: 50px;\r\n    }\r\n    .addressbar-usercreds-connect-button {\r\n        display: block;\r\n        padding: 11px 16px 10px 16px;\r\n        font-size: 13px;\r\n        text-transform: uppercase;\r\n        line-height: 1.3333333;\r\n        font-weight: 500;\r\n        margin-top: 24px;\r\n    }\r\n    .addressbar-usercreds-callout {\r\n        width: 0;\r\n        height: 0;\r\n        border-left: 8px solid transparent;\r\n        border-right: 8px solid transparent;\r\n        border-top: 8px solid #3A96DD;\r\n        position:absolute;\r\n        top:0;\r\n        left:40px;\r\n    }\r\n\r\n    .clickable:hover {\r\n        cursor: pointer;\r\n    }\r\n\r\n/* appsettings-dialog */\r\n\r\n    .appsettings-dialog {\r\n        width: 512px;\r\n        height: 487px;\r\n    }\r\n\r\n    .appsettings-dialog .input-group {\r\n        margin: 0;\r\n    }\r\n\r\n    .appsettings-checkbox-group {\r\n        width: 100%;\r\n    }\r\n\r\n    .appsettings-checkbox-group .form-label {\r\n        width: 100%;\r\n    }\r\n\r\n    .appsettings-browsebtn {\r\n        padding: 11px 16px 10px 16px;\r\n        margin-left: 8px;\r\n        font-size: 13px;\r\n        text-transform: uppercase;\r\n        line-height: 1.3333333;\r\n        font-weight: 400;\r\n        width: 96px;\r\n    }\r\n\r\n    .appsettings-savebtn {\r\n        position: absolute;\r\n        left: 50%;\r\n        transform: translate(-110%, 0%);\r\n        padding: 11px 16px 10px 16px;\r\n        font-size: 13px;\r\n        text-transform: uppercase;\r\n        line-height: 1.3333333;\r\n        font-weight: 500;\r\n        width: 96px;\r\n    }\r\n\r\n    .appsettings-cancelbtn {\r\n        background: #E6E6E6;\r\n        color: #888;\r\n        position: absolute;\r\n        left: 50%;\r\n        transform: translate(10%, 0%);\r\n        padding: 11px 16px 10px 16px;\r\n        font-size: 13px;\r\n        text-transform: uppercase;\r\n        line-height: 1.3333333;\r\n        font-weight: 500;\r\n        width: 96px;\r\n    }\r\n\r\n    .appsettings-cancelbtn:hover {\r\n        background: #D9D9D9;\r\n    }\r\n\r\n    .appsettings-port {\r\n        width: 155px;\r\n    }\r\n\r\n    .appsettings-port-group {\r\n        padding-bottom: 20px;\r\n    }\r\n\r\n    .appsettings-ngrokpath-input {\r\n        width: 357px;\r\n        margin-bottom: 8px;\r\n    }\r\n\r\n    .appsettings-serviceurl-input {\r\n        width: 460px;\r\n    }\r\n\r\n\r\n/* conversationsettings-dialog */\r\n\r\n    .conversationsettings-dialog {\r\n\r\n        width: 500px;\r\n        height: 400px;\r\n\r\n    }\r\n\r\n    .conversationsettings-closex {\r\n        position: absolute;\r\n        width: 42px;\r\n        height: 42px;\r\n        line-height: 42px;\r\n        text-align: center;\r\n        z-index: 900;\r\n        top: 0;\r\n        right: 0;\r\n    }\r\n\r\n    .conversationsettings-userlist {\r\n        position: absolute;\r\n        top: 24px;\r\n        bottom: 100px;\r\n        left: 24px;\r\n        right: 24px;\r\n        background: lightgray;\r\n        border-width: 1px;\r\n        border-radius: 2px;\r\n        border-color: black;\r\n        overflow: hidden;\r\n    }\r\n\r\n    .conversationsettings-userlist-area {\r\n        position: absolute;\r\n        left: 0;\r\n        right: 0;\r\n        height: 200px;\r\n        background: lightgreen;\r\n        overflow: hidden;\r\n    }\r\n\r\n/* about-dialog */\r\n\r\n    .about-dialog {\r\n        width: 320px;\r\n        height: 360px;\r\n        padding: 0 !important;\r\n    }\r\n\r\n    .about-okbtn {\r\n        position: absolute;\r\n        left: 50%;\r\n        transform: translate(-50%, 0%);\r\n        padding: 11px 16px 10px 16px;\r\n        font-size: 13px;\r\n        text-transform: uppercase;\r\n        line-height: 1.3333333;\r\n        font-weight: 500;\r\n        width: 96px;\r\n    }\r\n\r\n    .about-logo-fill {\r\n        fill: #3A96DD;\r\n    }\r\n    .about-logo {\r\n        padding-top: 50px;\r\n        width: 100%;\r\n        text-align: center;\r\n    }\r\n    .about-name {\r\n        text-align: center;\r\n        width: 100%;\r\n        font-weight: 500;\r\n        font-size: 18px;\r\n        padding-top: 6px;\r\n        padding-bottom: 6px;\r\n        letter-spacing: -0.3px;\r\n    }\r\n    .about-link {\r\n        text-align: center;\r\n        width: 100%;\r\n        padding-bottom: 6px;\r\n    }\r\n    .about-link a {\r\n        text-decoration: none;\r\n        color: #3A96DD;\r\n    }\r\n    .about-version {\r\n        text-align: center;\r\n        width: 100%;\r\n        font-size: 15px;\r\n    }\r\n    .about-copyright {\r\n        text-align: center;\r\n        width: 100%;\r\n        position: absolute;\r\n        bottom: 18px;\r\n        font-size: 12px;\r\n        color: #999;\r\n    }\r\n\r\n/* checkout window */\r\n    .checkout-index {\r\n        height: 100%;\r\n        display: flex;\r\n        flex-direction: column;\r\n    }\r\n\r\n    .checkout-container {\r\n        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n        flex-grow: 1;\r\n        display: flex;\r\n        flex-direction: column;\r\n        padding: 20px;\r\n        border-top-color: darkgray;\r\n        border-top-style: solid;\r\n        border-top-width: 1px;\r\n    }\r\n\r\n    .checkout-table {\r\n        flex-grow: 1;\r\n        display: flex;\r\n        flex-direction: column;\r\n    }\r\n\r\n    .checkout-table .title-container {\r\n        display: flex;\r\n    }\r\n\r\n    .checkout-table .title {\r\n        font-size: 16px;\r\n        font-weight: 500;\r\n        margin-bottom: 10px;\r\n        flex-grow: 1;\r\n    }\r\n\r\n    .checkout-table .fixed-right {\r\n        margin-left: 132px;\r\n    }\r\n\r\n    .checkout-table .checkout-form {\r\n        flex-grow: 1;\r\n    }\r\n\r\n    .checkout-table .checkout-field {\r\n        display: flex;\r\n        flex-direction: row;\r\n    }\r\n\r\n    .checkout-table .checkout-label {\r\n        color: #666;\r\n        font-size: 13px;\r\n        align-self: center;\r\n        min-width: 120px;\r\n        text-align: right;\r\n        margin-right: 8px;\r\n    }\r\n\r\n    .checkout-table .checkout-input {\r\n        background-color: #EEE;\r\n        font-size: 14px;\r\n        margin-top: 4px;\r\n        margin-bottom: 4px;\r\n        margin-left: 4px;\r\n        min-height: 40px;\r\n        flex-grow: 1;\r\n        border-width: 0px;\r\n        border-radius: 0;\r\n        padding-left: 10px;\r\n        padding-right: 10px;\r\n        text-overflow: ellipsis;\r\n    }\r\n\r\n    .checkout-table .checkout-button-bar {\r\n        display: flex;\r\n        flex-direction: row;\r\n    }\r\n\r\n    .checkout-table .button {\r\n        min-height: 28px;\r\n        text-align: center;\r\n        font-size: 14px;\r\n        display: flex;\r\n        flex-direction: column;\r\n        justify-content: center;\r\n        margin-top: 10px;\r\n        flex-grow: 1;\r\n        cursor: pointer;\r\n    }\r\n\r\n    .checkout-table .primary-button {\r\n        color: white;\r\n        background: #3A96DD;\r\n    }\r\n\r\n    .checkout-table .primary-button:hover {\r\n        background: #0063B1;\r\n    }\r\n\r\n    .checkout-table .primary-button:active {\r\n        background: #4C4C4C;\r\n    }\r\n\r\n    .checkout-table .secondary-button {\r\n        color: white;\r\n        background: #ababab;\r\n    }\r\n\r\n    .checkout-table .secondary-button:hover {\r\n        background: #0063B1;\r\n    }\r\n\r\n    .checkout-table .secondary-button:active {\r\n        background: #4C4C4C;\r\n    }\r\n\r\n    .checkout-table .cancel-button {\r\n        margin-right: 20px;\r\n    }\r\n\r\n    .checkout-table .total-line {\r\n        display: flex;\r\n        align-items: center;\r\n    }\r\n\r\n    .checkout-table .total-label-container {\r\n        flex-grow: 1;\r\n        display: flex;\r\n    }\r\n\r\n    .checkout-table .total-label {\r\n        font-weight: 600;\r\n        margin-right: 8px;\r\n    }\r\n\r\n    .checkout-table .total-value {\r\n        font-size: 20px;\r\n    }\r\n\r\n    .checkout-table .show-details {\r\n        color: #3A96DD;\r\n        cursor: pointer;\r\n    }\r\n\r\n    .checkout-table .show-details:hover {\r\n        color: #0063B1;\r\n    }\r\n\r\n    .checkout-table .show-details:active {\r\n        color: #4C4C4C;\r\n    }\r\n\r\n    .checkout-table .line-items {\r\n        border-top-style: solid;\r\n        border-top-width: 1px;\r\n        border-top-color: #999;\r\n        border-bottom-style: solid;\r\n        border-bottom-width: 1px;\r\n        border-bottom-color: #999;\r\n        margin-top: 10px;\r\n        margin-bottom: 10px;\r\n    }\r\n\r\n    .checkout-table .line-item {\r\n        display: flex;\r\n        align-items: center;\r\n        margin-top: 4px;\r\n        margin-bottom: 4px;\r\n        flex-grow: 1;\r\n    }\r\n\r\n    .checkout-table .item-label {\r\n        flex-grow: 1;\r\n    }\r\n\r\n    .checkout-table .not-final {\r\n        font-size: 12px;\r\n    }\r\n\r\n    .checkout-table .checkout-selector {\r\n        cursor: pointer;\r\n        display: flex;\r\n        align-items: center;\r\n        background-color: #EEE;\r\n        font-size: 14px;\r\n        margin-top: 4px;\r\n        margin-bottom: 4px;\r\n        margin-left: 4px;\r\n        min-height: 40px;\r\n        flex-grow: 1;\r\n        border-width: 0px;\r\n        border-radius: 0;\r\n        text-overflow: ellipsis;\r\n    }\r\n\r\n    .checkout-table .selected-item-label-container {\r\n        flex-grow: 1;\r\n        display: flex;\r\n        flex-direction: row;\r\n    }\r\n\r\n    .checkout-table .placeholder-text {\r\n        color: #666;\r\n        margin-left: 10px;\r\n    }\r\n\r\n    .checkout-table .selected-item-label {\r\n        flex-grow: 1;\r\n    }\r\n\r\n    .checkout-table .down-chevron {\r\n        margin-right: 10px;\r\n        width: 20px;\r\n        align-self: center;\r\n        color: #666;\r\n        font-size: 10px;\r\n    }\r\n\r\n    .checkout-table .selector-items {\r\n        border-color: #BBB;\r\n        border-style: solid;\r\n        border-width: 1px;\r\n        z-index: 10;\r\n        animation-duration: 0.25s;\r\n        animation-timing-function: ease-out;\r\n        transform-origin: top;\r\n        position: absolute;\r\n        background: white;\r\n        max-height: 300px;\r\n        overflow-y: auto;\r\n    }\r\n\r\n    .checkout-table .selector-item-container {\r\n        display: flex;\r\n    }\r\n\r\n    .checkout-table .selector-item {\r\n        display: flex;\r\n        flex-grow: 1;\r\n        align-items: center;\r\n        min-height: 40px;\r\n    }\r\n\r\n    .checkout-table .selector-item-container:hover {\r\n        background-color: #EEE;\r\n    }\r\n\r\n    .checkout-table .selector-item-container:active {\r\n        background-color: #BBB;\r\n    }\r\n\r\n    .checkout-table .remove-item {\r\n        display: flex;\r\n        align-items: center;\r\n        stroke: black;\r\n        margin-right: 10px\r\n    }\r\n\r\n    .checkout-table .grow {\r\n        animation-name: show;\r\n    }\r\n\r\n    @keyframes show {\r\n        0%   {transform: scaleY(0); offset: 0;}\r\n        100% {transform: scaleY(-100%); offset: 1; }\r\n    }\r\n\r\n    .checkout-table .add-item {\r\n        color: #3A96DD;\r\n        margin-left: 10px;\r\n        margin-right: 10px;\r\n    }\r\n\r\n    .checkout-table .validation-error {\r\n        color: #FF4444;\r\n        margin-left: 10px;\r\n        margin-right: 10px;\r\n    }\r\n\r\n    .checkout-table .invalid-input {\r\n        background-color: pink;\r\n    }\r\n\r\n    .shipping-method {\r\n        margin-left: 10px;\r\n        margin-right: 10px;\r\n    }\r\n\r\n    .credit-card {\r\n        margin-left: 10px;\r\n        margin-right: 10px;\r\n    }\r\n\r\n    .shipping-address {\r\n        margin: 10px;\r\n    }\r\n\r\n    .postal-code-input {\r\n        width: 140px;\r\n        flex-grow: 0;\r\n    }\r\n\r\n/* base classes */\r\n\r\n    .fill-parent {\r\n        position: absolute;\r\n        top: 0;\r\n        left: 0;\r\n        right: 0;\r\n        bottom: 0;\r\n    }\r\n\r\n    .cog-dialog {\r\n        line-height: initial;\r\n        background: #fff;\r\n        color: black;\r\n        overflow: hidden;\r\n        padding: 0 24px 0 24px;\r\n        box-shadow: 0 1px 2px rgba(0,0,0,.2);\r\n        z-index: 9999;\r\n        position: fixed;\r\n        top: 50%;\r\n        left: 50%;\r\n        transform: translate(-50%, -50%);\r\n        transition: all .2s;\r\n        text-align: left;\r\n        transition: opacity .2s ease;\r\n        border-radius: 2px;\r\n        cursor: default;\r\n    }\r\n\r\n    .cog-dialog-text {\r\n        margin-bottom: 12px;\r\n    }\r\n    .cog-dialog-text a {\r\n        text-decoration: none;\r\n        color: #3A96DD;\r\n    }\r\n\r\n    .dialog-background {\r\n        background: black;\r\n        opacity: 0.5;\r\n        position: fixed;\r\n        top: 0;\r\n        left: 0;\r\n        right: 0;\r\n        bottom: 0;\r\n        z-index: 9998;\r\n        transition: opacity .2s ease;\r\n    }\r\n\r\n    .dialog-closex {\r\n        cursor: pointer;\r\n        position: absolute;\r\n        top: 8px;\r\n        right: 8px;\r\n        cursor: pointer;\r\n    }\r\n\r\n    .dialog-closex path {\r\n        stroke: #CCC;\r\n    }\r\n\r\n    .dialog-buttons {\r\n        position: absolute;\r\n        padding: 0 0 52px 0;\r\n        left: 0;\r\n        right: 0;\r\n        bottom: 0;\r\n    }\r\n\r\n    .invisible {\r\n        opacity: 0;\r\n    }\r\n\r\n    .input-group {\r\n        display: inline-block;\r\n        margin-right: 16px;\r\n    }\r\n\r\n    .form-label {\r\n        display: block;\r\n        font-size: 13px;\r\n        margin-bottom: 8px;\r\n    }\r\n\r\n    .form-input {\r\n        padding: 8px;\r\n        border: 1px solid #ccc;\r\n        font-size: 15px;\r\n    }\r\n\r\n    .toolbar-button {\r\n\t\twidth: 24px;\r\n\t\theight: 24px;\r\n        vertical-align: middle;\r\n        transition: all .2s;\r\n    }\r\n    .toolbar-button:hover {\r\n        background: #6AAFE5;\r\n    }\r\n    .toolbar-button-disabled {\r\n        opacity: 0.5\r\n    }\r\n    svg.toolbar-button-disabled:hover {\r\n        background: initial;\r\n    }\r\n\r\n    .toolbar-button-dark {\r\n\t\twidth: 24px;\r\n\t\theight: 24px;\r\n        vertical-align: middle;\r\n        transition: all .2s;\r\n    }\r\n    .toolbar-button-dark:hover {\r\n        background: #4C4C4C;\r\n    }\r\n\r\n    .cog-visible {\r\n        display: block;\r\n    }\r\n    .cog-hidden {\r\n        display: none;\r\n    }\r\n    .cog-navbar {\r\n        list-style-type: none;\r\n        margin: 16px 0 0 0;\r\n        padding: 0;\r\n        overflow: hidden;\r\n    }\r\n    .cog-navbar li {\r\n        float: left;\r\n    }\r\n    .cog-navbar, .cog-navitem {\r\n        color: #3A96DD;\r\n        text-decoration: none;\r\n        transition: border 0s;\r\n    }\r\n    .cog-navitem {\r\n        padding: 0px 16px 10px 16px;\r\n        margin: 0 26px 0px 0px;\r\n        display: block;\r\n        border-bottom: 3px #CCC solid;\r\n    }\r\n    .cog-navitem-selected {\r\n        color: #000;\r\n        border-bottom: 3px #3A96DD solid;\r\n        transition: border 0s;\r\n    }\r\n    .enu-navhdr {\r\n        height: 0;\r\n        border: 0;\r\n        border-top: 1px solid #CCC;\r\n        margin: -1px 0 0 0;\r\n    }\r\n    .cog-tab {\r\n        margin-top: 16px;\r\n    }\r\n    .cog-readonly {\r\n        background: #EEE;\r\n    }\r\n\r\n    .cog-panel-header {\r\n        background-color: #252526;\r\n        color: #fff;\r\n        border-bottom: solid 1px #403F3F;\r\n        height: 42px;\r\n        left: 0;\r\n        letter-spacing: 0.5px;\r\n        font-size: 13px;\r\n        line-height: 42px;\r\n        padding-left: 8px;\r\n        position: absolute;\r\n        right: 0;\r\n        top: 0;\r\n        z-index: 1000;\r\n        box-shadow: 0 2px 3px rgba(0,0,0,.5);\r\n    }\r\n    .undecorated-text {\r\n        text-decoration: none;\r\n    }\r\n\r\n/* inspectorview */\r\n\r\n    .wc-inspectorview {\r\n        background-color: #1e1e1e;\r\n        color: white;\r\n        position: absolute;\r\n        left: 0;\r\n        right: 0;\r\n        top: 42px;\r\n        bottom: 0;\r\n        overflow-y: auto;\r\n    }\r\n\r\n    .wc-inspectorview * {\r\n        user-select: text;\r\n        -webkit-user-select: text;\r\n    }\r\n\r\n    .wc-inspectorview::-webkit-scrollbar-thumb {\r\n        background: #403F3F;\r\n    }\r\n\r\n    .wc-inspectorview-json {\r\n        font-size: 13px;\r\n\t    font-family: 'Menlo', 'Monaco', 'Consolas', \"Droid Sans Mono\", \"Courier New\", monospace, \"Droid Sans Fallback\";\r\n        position: absolute;\r\n        top: 0;\r\n        left: 0;\r\n        right: 0;\r\n        bottom: 0;\r\n        word-wrap: break-word;\r\n        white-space: pre-wrap;\r\n        padding: 10px 10px 10px 10px;\r\n    }\r\n\r\n/* JSON */\r\n\r\n    .json-key {\r\n        color: #9cdcfe;\r\n    }\r\n\r\n    .json-string {\r\n        color: #ce9178;\r\n    }\r\n\r\n    .json-number {\r\n        color: #b5cea8;\r\n    }\r\n\r\n    .json-boolean {\r\n        color: #569cd6;\r\n    }\r\n\r\n    .json-null {\r\n        color: #569cd6;\r\n    }\r\n\r\n/* logview */\r\n\r\n    .wc-logview {\r\n        background-color: #1e1e1e;\r\n        color: white;\r\n        overflow: auto;\r\n        font-size: 13px;\r\n\t    font-family: 'Menlo', 'Monaco', 'Consolas', \"Droid Sans Mono\", \"Courier New\", monospace, \"Droid Sans Fallback\";\r\n        white-space: nowrap;\r\n        position: absolute;\r\n        left: 0;\r\n        top: 42px;\r\n        right: 0;\r\n        bottom: 0;\r\n        padding: 10px 10px 10px 10px;\r\n    }\r\n\r\n    .wc-logview * {\r\n        user-select: text;\r\n        -webkit-user-select: text;\r\n        font-size: 12px;\r\n    }\r\n\r\n    .wc-logview::-webkit-scrollbar-thumb {\r\n        background: #403F3F;\r\n    }\r\n\r\n    .logview-header-text {\r\n        float: left;\r\n    }\r\n\r\n    .logview-clear-output-button {\r\n        position: absolute;\r\n        right: 12px;\r\n        height: 100%;\r\n    }\r\n\r\n    .wc-logview-timestamp {\r\n        color: lightgray;\r\n        display: inline-block;\r\n    }\r\n\r\n    .wc-logview a {\r\n        color: #9CDCFE;\r\n        display: inline-block;\r\n    }\r\n/*    .wc-logview a {\r\n        color: #d1d1d1;\r\n    }\r\n*/\r\n    .wc-logview-arg {\r\n        color: lightgray;\r\n        display: inline-block;\r\n    }\r\n\r\n    .wc-logview-log {\r\n        color: lightgray;\r\n        display: inline-block;\r\n    }\r\n\r\n    .wc-logview-info {\r\n        color: lightgray;\r\n        display: inline-block;\r\n    }\r\n\r\n    .wc-logview-trace {\r\n        color: lightgreen;\r\n        display: inline-block;\r\n    }\r\n\r\n    .wc-logview-debug {\r\n        color: #808080;\r\n        display: inline-block;\r\n    }\r\n\r\n    .wc-logview-warn {\r\n        color: #f5a623;\r\n        display: inline-block;\r\n    }\r\n\r\n    .wc-logview-error {\r\n        /*color: #ec407a;*/\r\n        color: #ed4556;\r\n        display: inline-block;\r\n    }\r\n")
});
___scope___.file("modules/catalog/css/messages.css", function(exports, require, module, __filename, __dirname){


require("fuse-box-css")("modules/catalog/css/messages.css", "/* reset */\r\nbody .wc-app, .wc-app button, .wc-app input, .wc-app textarea {\r\n  font-family: \"Segoe UI\", sans-serif;\r\n  font-size: 15px; }\r\n\r\n.wc-app button {\r\n  background-color: #0063b1;\r\n  border: 1px solid #cccccc;\r\n  border-radius: 1px;\r\n  color: #ffffff;\r\n  cursor: pointer;\r\n  outline: none;\r\n  transition: color .2s ease, background-color .2s ease; }\r\n\r\n.wc-app h1, .wc-app h2, .wc-app h3, .wc-app h4, .wc-app p, .wc-app ul, .wc-app ol {\r\n  margin: 0;\r\n  padding: 0; }\r\n\r\n.wc-app audio, .wc-app video {\r\n  display: block; }\r\n\r\n\r\n@media (max-width: 450px) {\r\n  .wc-card {\r\n    border: 1px solid #d2dde5;\r\n    width: 198px; }\r\n  .wc-adaptive-card {\r\n    width: 214px; } }\r\n\r\n@media (min-width: 768px) {\r\n  .wc-card {\r\n    border: 1px solid #d2dde5;\r\n    width: 398px; }\r\n  .wc-adaptive-card {\r\n    width: 414px; } }\r\n\r\n\r\n\r\n\r\n/* docking */\r\n.wc-hidden {\r\n  visibility: hidden; }\r\n\r\n.wc-header {\r\n  background-color: #0078D7;\r\n  box-shadow: 0 1px rgba(0, 0, 0, 0.2);\r\n  box-sizing: content-box;\r\n  color: #ffffff;\r\n  font-weight: 500;\r\n  height: 30px;\r\n  left: 0;\r\n  letter-spacing: 0.5px;\r\n  padding: 8px 8px 0 8px;\r\n  position: absolute;\r\n  right: 0;\r\n  top: 0;\r\n  z-index: 1; }\r\n\r\n.wc-time {\r\n  color: #999999;\r\n  margin-bottom: 10px; }\r\n\r\n.wc-message-groups {\r\n  bottom: 50px;\r\n  left: 0;\r\n  transform: translateY(0);\r\n  overflow-x: hidden;\r\n  overflow-y: scroll;\r\n  padding: 10px;\r\n  position: absolute;\r\n  right: 0;\r\n  top: 38px;\r\n  transition: transform 0.2s cubic-bezier(0, 0, 0.5, 1); }\r\n  .wc-message-groups.no-header {\r\n    top: 0; }\r\n\r\n.wc-message-group-content {\r\n  overflow: hidden; }\r\n\r\n.wc-suggested-actions {\r\n  background-color: #f9f9f9;\r\n  bottom: 50px;\r\n  height: 0;\r\n  left: 0;\r\n  overflow: hidden;\r\n  position: absolute;\r\n  right: 0;\r\n  transition: height 0.2s cubic-bezier(0, 0, 0.5, 1); }\r\n  .wc-suggested-actions .wc-hscroll > ul {\r\n    height: 40px;\r\n    padding: 2px 3px; }\r\n    .wc-suggested-actions .wc-hscroll > ul > li {\r\n      display: inline-block;\r\n      margin: 2px;\r\n      max-width: 40%; }\r\n      .wc-suggested-actions .wc-hscroll > ul > li button {\r\n        background-color: #fff;\r\n        color: #0078D7;\r\n        min-height: 32px;\r\n        overflow: hidden;\r\n        padding: 0 16px;\r\n        text-overflow: ellipsis;\r\n        white-space: nowrap;\r\n        width: 100%; }\r\n      .wc-suggested-actions .wc-hscroll > ul > li button:hover {\r\n        background-color: #fff;\r\n        border-color: #0078D7;\r\n        color: #0078D7; }\r\n      .wc-suggested-actions .wc-hscroll > ul > li button:active {\r\n        background-color: #0078D7;\r\n        border-color: #0078D7;\r\n        color: #ffffff; }\r\n  .wc-suggested-actions button.scroll {\r\n    background-color: #d2dde5;\r\n    height: 40px;\r\n    overflow: hidden;\r\n    padding: 0;\r\n    position: absolute;\r\n    top: 0;\r\n    width: 28px; }\r\n  .wc-suggested-actions button.scroll:disabled {\r\n    display: none; }\r\n  .wc-suggested-actions button.scroll:hover {\r\n    background-color: #808c95; }\r\n  .wc-suggested-actions button.scroll svg {\r\n    fill: #ffffff; }\r\n    .wc-suggested-actions button.scroll svg path {\r\n      transform: translateY(6px); }\r\n  .wc-suggested-actions button.scroll.previous {\r\n    left: 0; }\r\n  .wc-suggested-actions button.scroll.next {\r\n    right: 0; }\r\n\r\n.wc-message-pane.show-actions .wc-message-groups {\r\n  transform: translateY(-40px); }\r\n\r\n.wc-message-pane.show-actions .wc-suggested-actions {\r\n  height: 40px; }\r\n\r\n.wc-console {\r\n  border: 5px solid #dbdee1;\r\n  bottom: 0;\r\n  box-sizing: border-box;\r\n  height: 50px;\r\n  left: 0;\r\n  position: absolute;\r\n  right: 0; }\r\n\r\n/* views */\r\n.wc-app-msg-view-panel {\r\n  overflow: hidden;\r\n  position: absolute;\r\n  right: 0;\r\n  left: 0;\r\n  top: 0;\r\n  bottom: 0; }\r\n\r\n/* messages */\r\n.wc-message-wrapper {\r\n  animation: animationFrames 2s;\r\n  animation-iteration-count: 1;\r\n  clear: both;\r\n  margin-bottom: 10px;\r\n  overflow: hidden;\r\n  position: relative;\r\n  /*transition: max-height 2s ease-in-out;*/ }\r\n\r\n@keyframes animationFrames {\r\n  0% {\r\n    /*max-height: 0;*/\r\n    opacity: 0; }\r\n  20% {\r\n    opacity: 1; }\r\n  100% {\r\n    /*max-height: 2000px;*/ } }\r\n\r\n.wc-message {\r\n  position: relative; }\r\n\r\n.wc-message-wrapper.carousel .wc-message {\r\n  max-width: none;\r\n  padding-right: 8px; }\r\n\r\n.wc-message svg.wc-message-callout {\r\n  height: 22px;\r\n  position: absolute;\r\n  stroke: none;\r\n  top: 12px;\r\n  width: 6px; }\r\n\r\n.wc-message-content {\r\n  border-radius: 2px;\r\n  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.2);\r\n  padding: 8px;\r\n  word-break: break-word; }\r\n\r\n.wc-message-content.clickable {\r\n  cursor: pointer; }\r\n\r\n.wc-message-content.selected {\r\n  box-shadow: 0px 1px 1px 0px #ffa333; }\r\n\r\n.wc-message-content img {\r\n  max-height: 320px;\r\n  max-width: 100%; }\r\n\r\n.wc-message-content .video iframe {\r\n  border: 0; }\r\n\r\n.wc-message-content audio, .wc-message-content video {\r\n  max-width: 100%; }\r\n\r\n.wc-message-content audio + h1, .wc-message-content video + h1 {\r\n  margin-top: 11px; }\r\n\r\n.wc-message-from {\r\n  clear: both;\r\n  color: #999999;\r\n  font-size: 11px;\r\n  margin-top: 5px; }\r\n\r\n/* cards */\r\n.wc-card {\r\n  background-color: #ffffff; }\r\n  .wc-card .non-adaptive-content {\r\n    margin: 8px 8px 0 8px; }\r\n  .wc-card button {\r\n    background-color: transparent;\r\n    color: #0078D7;\r\n    min-height: 32px;\r\n    width: 100%;\r\n    padding: 0 16px; }\r\n  .wc-card button:hover {\r\n    background-color: transparent;\r\n    border-color: #0078D7;\r\n    color: #0078D7; }\r\n  .wc-card button:active {\r\n    background-color: #0078D7;\r\n    border-color: #0078D7;\r\n    color: #ffffff; }\r\n  .wc-card.receipt table {\r\n    border-collapse: collapse;\r\n    width: 100%; }\r\n  .wc-card.receipt th, .wc-card.receipt td {\r\n    text-align: right;\r\n    vertical-align: top; }\r\n  .wc-card.receipt th:first-child, .wc-card.receipt td:first-child {\r\n    text-align: left; }\r\n  .wc-card.receipt th {\r\n    color: #808c95;\r\n    font-size: inherit;\r\n    font-weight: normal;\r\n    line-height: 1.75; }\r\n  .wc-card.receipt thead tr:last-child th {\r\n    padding-bottom: 16px; }\r\n  .wc-card.receipt th[colspan=\"2\"] {\r\n    color: inherit;\r\n    font-size: 15px;\r\n    font-weight: 700; }\r\n  .wc-card.receipt td {\r\n    padding: 4px 8px 0 8px; }\r\n  .wc-card.receipt td img {\r\n    float: left;\r\n    margin: 5px 8px 8px 0;\r\n    max-height: 50px;\r\n    max-width: 50px; }\r\n  .wc-card.receipt div.title {\r\n    font-weight: bolder; }\r\n  .wc-card.receipt div.subtitle {\r\n    font-weight: lighter; }\r\n  .wc-card.receipt tbody tr, .wc-card.receipt tfoot tr {\r\n    border-top: 1px solid #d2dde5; }\r\n  .wc-card.receipt tbody tr:first-child, .wc-card.receipt tfoot tr:first-child {\r\n    border-top-width: 2px; }\r\n  .wc-card.receipt tfoot td {\r\n    line-height: 2.25; }\r\n  .wc-card.receipt tfoot .total {\r\n    font-weight: bold; }\r\n  .wc-card.thumbnail img {\r\n    float: right;\r\n    margin-bottom: 10px;\r\n    margin-left: 10px;\r\n    width: 100px; }\r\n  .wc-card.signin h1 {\r\n    margin: 10px 24px 16px 14px; }\r\n  .wc-card.error {\r\n    text-align: center; }\r\n    .wc-card.error .error-icon {\r\n      fill: #cccccc;\r\n      height: 56px;\r\n      margin-bottom: 2px;\r\n      margin-top: 20px;\r\n      padding-left: 12px; }\r\n    .wc-card.error .error-text {\r\n      color: #cccccc;\r\n      font-weight: 600;\r\n      letter-spacing: 0.5px;\r\n      margin-bottom: 20px;\r\n      text-align: inherit; }\r\n\r\n/* alternate app-msg- sizes */\r\n.wc-message {\r\n  max-width: 91%; }\r\n\r\n.wc-card {\r\n  border: 1px solid #d2dde5;\r\n  width: 302px; }\r\n\r\n.wc-adaptive-card {\r\n  width: 318px; }\r\n\r\n.wc-wide .wc-card {\r\n  border: 1px solid #d2dde5;\r\n  width: 398px; }\r\n\r\n.wc-wide .wc-adaptive-card {\r\n  width: 414px; }\r\n\r\n.wc-narrow .wc-card {\r\n  border: 1px solid #d2dde5;\r\n  width: 198px; }\r\n\r\n.wc-narrow .wc-adaptive-card {\r\n  width: 214px; }\r\n\r\n/* adaptive card adjustments from wc-card */\r\n.wc-adaptive-card p {\r\n  margin-left: 0;\r\n  margin-right: 0; }\r\n\r\n/* list */\r\n.wc-list > .wc-card {\r\n  margin-top: 8px; }\r\n\r\n.wc-list > .wc-card:first-child {\r\n  margin-top: 0; }\r\n\r\n/* horizontal scroll */\r\n.wc-hscroll-outer {\r\n  /* allow horizontal scrolling but hide the scrollbar */\r\n  overflow: hidden; }\r\n\r\n.wc-hscroll {\r\n  /* allow horizontal scrolling but hide the scrollbar */\r\n  overflow-x: scroll;\r\n  overflow-y: hidden; }\r\n\r\n.wc-hscroll > ul {\r\n  white-space: nowrap; }\r\n\r\n.wc-hscroll > ul > li {\r\n  display: inline-block;\r\n  vertical-align: top;\r\n  white-space: normal; }\r\n\r\n/* carousel */\r\n.wc-carousel {\r\n  position: relative; }\r\n  .wc-carousel button.scroll {\r\n    background-color: #d2dde5;\r\n    height: 28px;\r\n    overflow: hidden;\r\n    padding: 0;\r\n    position: absolute;\r\n    top: 50%;\r\n    width: 28px; }\r\n  .wc-carousel button.scroll:disabled {\r\n    display: none; }\r\n  .wc-carousel button.scroll:hover {\r\n    background-color: #808c95; }\r\n  .wc-carousel button.scroll svg {\r\n    fill: #ffffff; }\r\n  .wc-carousel button.scroll.previous {\r\n    left: -16px; }\r\n  .wc-carousel button.scroll.next {\r\n    right: -16px; }\r\n  .wc-carousel .wc-hscroll > ul {\r\n    margin-left: -4px; }\r\n  .wc-carousel .wc-hscroll > ul > li {\r\n    padding: 0 4px; }\r\n  .wc-carousel .wc-hscroll > ul > li:last-child {\r\n    padding-right: 0; }\r\n  .wc-carousel li p {\r\n    min-height: 4em;\r\n    white-space: normal; }\r\n  .wc-carousel li .wc-adaptive-card p {\r\n    min-height: initial; }\r\n\r\n/* from me */\r\n.wc-message-from-me {\r\n  float: right;\r\n  margin-right: 6px; }\r\n\r\n.wc-message-from-me.wc-message-from {\r\n  text-align: right; }\r\n\r\n.wc-message-from-me .wc-message-content {\r\n  background-color: #0078D7;\r\n  color: #ffffff; }\r\n\r\n.wc-message-from-me svg.wc-message-callout path {\r\n  fill: #0078D7; }\r\n\r\n.wc-message-from-me svg.wc-message-callout path.point-left {\r\n  display: none; }\r\n\r\n.wc-message-from-me svg.wc-message-callout {\r\n  right: -6px; }\r\n\r\n/* from bot */\r\n.wc-message-from-bot {\r\n  float: left;\r\n  margin-left: 8px; }\r\n\r\n.wc-message-from-bot .wc-message-content {\r\n  background-color: #eceff1;\r\n  color: #000000; }\r\n\r\n.wc-message-from-bot svg.wc-message-callout path {\r\n  fill: #eceff1; }\r\n\r\n.wc-message-from-bot svg.wc-message-callout path.point-right {\r\n  display: none; }\r\n\r\n.wc-message-from-bot svg.wc-message-callout {\r\n  left: -6px; }\r\n\r\n/* console */\r\n.wc-console > * {\r\n  position: absolute;\r\n  top: 0;\r\n  vertical-align: middle; }\r\n\r\n.wc-console label {\r\n  cursor: pointer;\r\n  display: inline-block;\r\n  height: 40px; }\r\n\r\n.wc-console svg {\r\n  fill: #8a8a8a;\r\n  margin: 11px; }\r\n\r\n.wc-console textarea, .wc-console input[type=text] {\r\n  border: none;\r\n  height: 100%;\r\n  outline: none;\r\n  padding: 0;\r\n  resize: none;\r\n  width: 100%; }\r\n\r\n.wc-send svg {\r\n  height: 18px;\r\n  width: 27px; }\r\n\r\n.wc-upload svg {\r\n  height: 18px;\r\n  width: 26px; }\r\n\r\n#wc-upload-input {\r\n  display: none; }\r\n\r\n.wc-textbox {\r\n  bottom: 0;\r\n  left: 48px;\r\n  right: 49px; }\r\n\r\n.wc-send {\r\n  right: 0; }\r\n\r\n.wc-send.hidden {\r\n  visibility: hidden; }\r\n\r\n.wc-mic {\r\n  right: 0; }\r\n\r\n.wc-mic.hidden {\r\n  visibility: hidden; }\r\n\r\n.wc-mic.active path#micFilling {\r\n  fill: #4e3787; }\r\n\r\n.wc-mic.inactive path#micFilling {\r\n  visibility: hidden; }\r\n\r\n.wc-console.has-text .wc-send svg {\r\n  fill: #0078D7; }\r\n\r\n/* animation */\r\n.wc-typing {\r\n  background-image: url(\"data:image/gif;base64,R0lGODlhQAAYAPYBAOzv8evu8Ort7+fq7Ons7ujr7eXo6uTn6ebp6+Xn6ebo6uzu8OPm6OTm6OPm5+Tn6N/i4+Ll59/i5N7h4+Hk5uDj5evu7+Hk5d/h49PV18PFx7/BwsfJysXHyMLExdja3Nfa28vNz72/wL7Awc/S08TGyMDCw9TW2NbY2t3g4trd39bZ2szO0M7Q0dnb3djb3Nvd39ve4Nnc3dze4Nrc3t7g4tzf4dXX2d3f4d7h4tnc3tve383P0MrMzs7Q0sjKzNLU1s/R08jKy9DT1NfZ293g4efp68bIyby+v9bZ27q8vdHT1c7R0uvt78nLzM/R0tjb3ens7bO0tbS2t7GztK+xsrW3uK6vsLe4utfa3L/Awtzf4MnLzamqq5WWl66wsbm7vNrd3uXo6a2ur6yurp2en6KjpKusrZ+goKeoqers7urt7peXmIGBgYSEhHx8fJmamqipqnZ2doqLi8XHyY2NjpGSkpOUlJiYmZOTlI+QkJqbm4eIiJucnIuMjP///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEY0RUJCMDNENkM4MTFFNkI5RENGRDgzMjAyQjU3QzUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEY0RUJCMDRENkM4MTFFNkI5RENGRDgzMjAyQjU3QzUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowRjRFQkIwMUQ2QzgxMUU2QjlEQ0ZEODMyMDJCNTdDNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowRjRFQkIwMkQ2QzgxMUU2QjlEQ0ZEODMyMDJCNTdDNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAUOAAEAIf4YT3B0aW1pemVkIHdpdGggZXpnaWYuY29tACwAAAAAQAAYAAACJoSPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+l0AACH5BAUHAAAALD4ACQACAAYAAAIERI5oBQAh+QQFBwAOACwsAAcAFAAJAAAEJRDISZetmJQ9uhcZyClGSY4hYjbHKqYs06ooLLuBPeM6b2u1SgQAIfkEBQcADQAsGAAHACUACQAABlFAgHAYKBqJyKRS+ahMchKnoSBYWq0Mp+rzimEiiUH1SjaCd64VioaTEo5lbA3GvaWjCmpcfnl27TZ4ent8Mmo6KW6EhXSIEGCDi4VZCG+SSUEAIfkEBQcABgAsEQAHABcACQAAB0aAAIKDAoSGh4RELD8sHwkBiJEoIUKVPSAHkJGJQZaWNQSbnJ6VMAOigzI8pDwxp6gCKUOMnhKFsAgvi59GuKkZPhkTBb6BACH5BAUHAAQALA8ABwANAAkAAAYsQICwYAgMj0LWZokSIAedpTSDREmvxaHyyjy2uN2hCqwZVLmqp2DF0bAkzyAAIfkEBRUABQAsDgAHAAoACQAABidAgDBgGAyHH5NoyUAunxuEcANdkqbVJTa7hZ6EkFFVcAx5ShmCMAgAIfkEBQcAAAAsLAAHABAACQAABC0QyClXpZWUwbsOU/AhSWmQGyiOB+Mq3rJ6zosKM22n+d2YqQzvBOOFcMOgJAIAIfkEBQcAAwAsIQAHABsACQAAB0yAAIKDAgGEh4iJKStLGTARBYmShDgoJEyYNBSRk4ouQJiZNQeFnYc5II2hJzMOBKanH6qiDK+wlBlBqxMGhreDE6m0Ub+xjBi9xYKBACH5BAUHAAYALB0ABwAQAAkAAAc+gACCAgoFg4eIGSNKSj0MiIckjJNHB5AAEiaTkzcBkC8im4w8BJ+hoj6lkBqiSC+XAUmnowOwsT8bJSiGl4EAIfkEBQcAAgAsHAAHAAsACQAABy2AAIIGDIOGRVhXijeHVYqPjIIej5QBglKUjweXmYoIkp0ClpyVhghCiRoUhoEAIfkEBRUAAgAsGwAHAAoACQAAByyAAIKCB4ODMlNkijKHY4qPMIJgj49ggpSUAQBXmIqSnRuEVJgMhiWJJQmCgQAh+QQFBwAAACwxAAcADQAJAAAEJRDICQKdgQyktrBS5h0G91WfSXYaWqjrK8rx6LL1cpf8GaY2SQQAIfkEBQcABgAsKwAHABMACQAABzyAAIKDBISGhzwbSB4ZCIeIIouLQI6PgjcmkpI4AZYDJCOak4WWQ1qiJi8Cnh8eqBiel6GbpLEgHIycsYEAIfkEBQcAAgAsKQAHAA0ACQAABzyAAIIBEhQBg4gBXHh1dWUZiQCLjZQriWWUlF2Hghh2mY14A4MVn6B7UYhmoHVSnJ13maiROFdse1YMiYEAIfkEBQcAAwAsDgAHACUACQAAB2OAA4KCBYOGh4iIETBRAI6PIIYNiZSHKWxymVUCkIcmlaAHbpmkcQCVQ6CUUqStKaeJR6qJcK2kdI6zugNltplOjh6IN7uGJr5vB44YngTFgwKYrRuPwR4dAwLPklNzbV4sj4EAIfkEBQcACgAsCwAHACcACQAAB2qAAIKDBAEACoiJiouMiQ4qBYSCLiw/LCsHho2bjF6KhpM9lpY3D4KcnAmMXaGjozECh6izihMFM5Wul5G0vQodBDY8uruyvqhcARVAxDgWxscbjQatrwOnx4mem8EZLUApkdDZClKJPIKBACH5BAUHAAoALAQABwASAAkAAAdCgACCCwEWhoOIiQMRKTQxFQYCioiMMi8fMJAEk5sQKpegjIWTEzqhNhcIo4qlpxSqnBWZroSxpi4zr5KcnTWei5yBACH5BAUHAAYALAAABwAQAAkAAAMRCLrc/rCIEIe9tOKpd/dfqCUAIfkEBRUAAQAsAAAIAAcACAAAAgaEj6nL7VAAIfkEBQcABQAsGwAHAAoACQAABzSAAIICDAODgyxSX1UeDYiLkEoIABJUkJBDADeXkZqci0eUU58ogkBVlxoEgzobVkpLqwCBACH5BAUHAAMALBMABwARAAkAAAdPgACCgwIEhoSIhTJBRx08RBSFiRQvTBoimI8VkoQ4GU4bmKFLMAqTS42iji8RAYgwqCOqQS4Mpz2hmUAxCJMqQ6mrrYmuOShPLSc2Bq6EgQAh+QQFBwAJACwHAAcAGgAJAAAHWIAAgoMBhYaEiImDFTNZRC44FAiHiomMK0A+mTaSlJWCEUVQJySaNzoYDAWfiJIfGUymkBEDrIuusLI1tJ6VDrs3pUMoKhANBLa3W4+lLym8ycqczwer0YEAIfkEBQcACwAsAAAHABYACQAABS4gIAbkaJ5oVF3HIJTpqWJ048bpVKsFjM+7xA03WgV7xOIRmUQ4jKxh0/V0+oghACH5BAUVAAEALAAABwAKAAkAAAIIhI+py+0PYQEAIfkEBQcABQAsJgAHAAwACQAAB0qAAIIEYhQGAYODN1R1bnpXN4iCGV98bZd+ZxmIFx54l6B4SodhYI2gbXZUOQAwSnqoqVMYrSV9sWUbA5NYp7IwiRgaZndmHhWDgQAh+QQFBwAHACwZAAcAGAAJAAAHboAAgoMEhYYBhImJMUMcGyNII0JANQWKimEkHUpVaWlUSkdLOFGXgxIoIY9dZWZnWCYsRBGmgikZPyJSnmhdU1pOJxKIpkW4kLy+kjfDtRWpHlhnvWOwPB8NxMXHVGevyxBqtacgQSFcTsFQtOOBACH5BAUHAAMALAkABwAgAAkAAAdtgACCgwKFhoSIiYoFFWEZPi1PJDczEQSLmIONQCElGyYckZUFmZg2KEwcHkqsPUsfEwYBpYkRMDc8R59gHkJBKzgNh7SCtriqvL2/KQzDxGIpK0FOq0jKsLLPiConLLrXNs3atS6UqDQS2eMAgQAh+QQFBwALACwAAAcAGQAJAAAHUIAAAYNNhIKHiImIDDk6ICoSCQSKlIg1MjcnmRAHk5WKFTErmqQURoafghA0KKStoQKplpCuMRUKsbKqW0S1EQOoshispQa5urtFMxO/x8iBACH5BAUHAAIALAAABwALAAkAAAIJhI+py+3xolwFACH5BAUHAAEALAAACQABAAUAAAIChF0AOw==\");\r\n  background-repeat: no-repeat;\r\n  height: 20px;\r\n  width: 64px; }\r\n\r\n.wc-animate-scroll {\r\n  left: 0;\r\n  position: absolute;\r\n  transition: left .8s ease; }\r\n\r\n.wc-animate-scroll-rapid {\r\n  left: 0;\r\n  position: absolute;\r\n  transition: left .4s ease; }\r\n\r\n.wc-animate-scroll-near {\r\n  left: 0;\r\n  position: absolute;\r\n  transition: left .3s ease-in-out; }\r\n\r\n/* text formats */\r\n.format-markdown > p {\r\n  margin-bottom: 0px; }\r\n\r\n.format-markdown code {\r\n  white-space: pre-wrap; }\r\n\r\n.format-markdown + div {\r\n  margin-top: 8px; }\r\n\r\n.format-markdown ol {\r\n  padding-left: 30px;\r\n  /* numbers are right-aligned to the period */ }\r\n\r\n.format-markdown ul {\r\n  padding-left: 33px; }\r\n\r\n/* browser scrollbar customization */\r\n.wc-app ::-webkit-scrollbar {\r\n  width: 8px; }\r\n\r\n.wc-app ::-webkit-scrollbar * {\r\n  background-color: transparent; }\r\n\r\n.wc-app ::-webkit-scrollbar-thumb {\r\n  background-color: #dbdee1; }\r\n")
});
___scope___.file("modules/dashboard/index.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const react_emotion_1 = require("react-emotion");
const theming_1 = require("theming");
const TabRouter_1 = require("./TabRouter");
exports.Tester = theming_1.withTheme(react_emotion_1.default('div')(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
})));
exports.DashboardPage = mobx_react_1.observer(() => React.createElement("div", null,
    React.createElement(TabRouter_1.DashboardTabRouterOutlet, null)));

});
___scope___.file("modules/dashboard/TabRouter.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const design_1 = require("../../design");
const when_switch_1 = require("when-switch");
const tabs_1 = require("./tabs");
const csstips_1 = require("csstips");
const typestyle_1 = require("typestyle");
const core_1 = require("@blueprintjs/core");
const icons_1 = require("@blueprintjs/icons");
exports.MLDrawerToolbar = mobx_react_1.observer((props) => (React.createElement(core_1.ButtonGroup, { large: true, fill: true },
    React.createElement(ChartDrawerLink, { icon: icons_1.IconNames.CODE, route: 'mldrawer:charts' }),
    React.createElement(ChartDrawerLink, { icon: icons_1.IconNames.GRAPH, route: 'mldrawer:dashboard' }),
    React.createElement(ChartDrawerLink, { icon: icons_1.IconNames.SCATTER_PLOT, route: 'mldrawer:datasets' }),
    React.createElement(ChartDrawerLink, { icon: icons_1.IconNames.GRAPH, route: 'mldrawer:notebook' }))));
const ChartDrawerLink = mobx_react_1.inject('nav')(mobx_react_1.observer((props) => (React.createElement(core_1.Button, Object.assign({}, props, { onClick: () => props.nav.goToMlDrawer(props.route) }), props.children))));
const DashboardTabRouter = mobx_react_1.inject('nav')(mobx_react_1.observer((props) => (React.createElement("div", Object.assign({ className: typestyle_1.style(csstips_1.flex, csstips_1.vertical) }, props), when_switch_1.default(props.nav.mlDrawerRoute)
    .is('mldrawer:charts', () => React.createElement(tabs_1.DataTab, null))
    .is('mldrawer:datasets', () => React.createElement(tabs_1.SettingsTab, null))
    .is('mldrawer:notebook', () => React.createElement(tabs_1.ModelTab, null))
    .is('mldrawer:dashboard', () => React.createElement(tabs_1.TrainTab, null))
    .else(() => React.createElement(tabs_1.TrainTab, null))))));
exports.DashboardTabRouterOutlet = mobx_react_1.observer((props) => (React.createElement(design_1.FillParent, null,
    React.createElement(exports.MLDrawerToolbar, null),
    React.createElement(DashboardTabRouter, null))));
/*
//import { scale3d } from 'csx/lib';

const LinkStyle = style({
  color: 'black',
  textDecoration: 'none',
  transitionDuration: '0.3s',
  padding: [0, 10, 0, 10],
  $nest: {
    '&:hover': {
      color: '#6642C6',
      transform: scale3d(1.1, 1.1, 1.1)
    }
  }
})

const ChartDrawerLinkWORKS: React.SFC<LinkProps> = inject('nav')(observer((props: LinkProps) => (
  <a href='#' className={LinkStyle}
    onClick={() => props.nav.goToChartDrawer(props.route)}>
    {(props as React.Props<any>).children}
  </a>
)))
*/ 

});
___scope___.file("modules/dashboard/tabs/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./DataTab"));
__export(require("./ModelTab"));
__export(require("./SettingsTab"));
__export(require("./TrainTab"));

});
___scope___.file("modules/dashboard/tabs/DataTab.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const theming_1 = require("theming");
const styled_jss_1 = require("styled-jss");
exports.DataTab = theming_1.withTheme(mobx_react_1.observer((props) => React.createElement("div", null,
    "Charts",
    React.createElement(Button, null))));
const Button = theming_1.withTheme(styled_jss_1.default('button')(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
})));

});
___scope___.file("modules/dashboard/tabs/ModelTab.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const theming_1 = require("theming");
const polynomial_regression_1 = require("../../polynomial-regression");
exports.ModelTab = theming_1.withTheme(mobx_react_1.observer((props) => React.createElement("div", null,
    "model",
    React.createElement(polynomial_regression_1.PolynomialRegression, null))));

});
___scope___.file("modules/polynomial-regression/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("./components");
exports.PolynomialRegression = components_1.PolynomialRegression;

});
___scope___.file("modules/polynomial-regression/components/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./DataChart"));
__export(require("./DataPlot"));
__export(require("./Equation"));
__export(require("./ErrorChart"));
__export(require("./InlineCaption"));
__export(require("./LearningRateSelector"));
__export(require("./NumericParameter"));
__export(require("./ParametersInfo"));
__export(require("./PolynomialRegression"));

});
___scope___.file("modules/polynomial-regression/components/DataChart.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const vegaSpecs_1 = require("../vega/vegaSpecs");
const vega_embed_1 = require("vega-embed");
class DataChart extends React.Component {
    componentDidUpdate() {
        this.createDataChart();
    }
    createDataChart() {
        const { testData, trainingData, predictions, showTestData } = this.props;
        const trainXs = trainingData.xs.dataSync();
        const trainYs = trainingData.ys.dataSync();
        const testXs = testData.xs.dataSync();
        const testYs = testData.ys.dataSync();
        const trainValues = Array.from(trainYs).map((y, i) => ({ trainX: trainXs[i], trainY: trainYs[i], pred: predictions[i] }));
        const values = showTestData ?
            //@ts-ignore
            trainValues.concat(Array.from(testYs).map((y, i) => ({ testX: testXs[i], testY: testYs[i] })))
            : trainValues;
        //@ts-ignore
        return vega_embed_1.default(this.dataChart, vegaSpecs_1.createDataSpec(values, showTestData), { actions: false });
    }
    render() {
        return React.createElement("div", { ref: dataChart => this.dataChart = dataChart });
    }
}
exports.DataChart = DataChart;

});
___scope___.file("modules/polynomial-regression/vega/vegaSpecs.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const $schema = 'https://vega.github.io/schema/vega-lite/v2.json';
exports.createDataSpec = (values, showTestData = false) => {
    const spec = {
        $schema,
        width: 300,
        height: 300,
        data: { values },
        layer: [
            {
                mark: 'point',
                encoding: {
                    x: { field: 'trainX', type: 'quantitative' },
                    y: { field: 'trainY', type: 'quantitative' },
                    color: { value: 'grey' }
                }
            },
            {
                mark: {
                    orient: 'vertical',
                    type: 'line'
                },
                orient: 'vertical',
                encoding: {
                    x: { field: 'trainX', type: 'quantitative' },
                    y: { field: 'pred', type: 'quantitative' },
                    color: { value: 'tomato' }
                },
            }
        ]
    };
    const testLayer = {
        mark: 'point',
        encoding: {
            x: { field: 'testX', type: 'quantitative' },
            y: { field: 'testY', type: 'quantitative' },
            color: { value: 'green' }
        },
    };
    if (showTestData) {
        spec.layer.push(testLayer);
    }
    return spec;
};
exports.createErrorSpec = (errorFieldName, values) => ({
    $schema,
    width: 100,
    height: 100,
    data: { values },
    layer: [
        {
            mark: {
                orient: 'vertical',
                type: 'line'
            },
            encoding: {
                x: { field: 'iterations', type: 'quantitative' },
                y: { field: errorFieldName, type: 'quantitative' },
                color: { value: 'blue' }
            },
        }
    ]
});

});
___scope___.file("modules/polynomial-regression/components/DataPlot.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
//import styled from 'react-emotion';
const DataChart_1 = require("./DataChart");
const ErrorChart_1 = require("./ErrorChart");
const ParametersInfo_1 = require("./ParametersInfo");
exports.DataPlot = ({ className, a, b, c, d, trainingError, iteration, predictions, showTestData, testError, testData, trainingData }) => {
    return (React.createElement("div", { className: className, style: { padding: '1.3em' } },
        React.createElement(ParametersInfo_1.ParametersInfo, { a: a, b: b, c: c, d: d, error: trainingError, iteration: iteration, testError: testError }),
        React.createElement("div", { style: { display: 'flex' } },
            React.createElement(DataChart_1.DataChart, { testData: testData, trainingData: trainingData, predictions: predictions, showTestData: showTestData }),
            React.createElement(ErrorChart_1.ErrorChart, { label: "train_error", error: trainingError }),
            React.createElement(ErrorChart_1.ErrorChart, { label: "test_error", error: testError }))));
};

});
___scope___.file("modules/polynomial-regression/components/ErrorChart.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const vegaSpecs_1 = require("../vega/vegaSpecs");
const vega_embed_1 = require("vega-embed");
class ErrorChart extends React.Component {
    componentDidUpdate() {
        this.createErrorChart();
    }
    createErrorChart() {
        const { error, label } = this.props;
        const values = error.map((e, i) => ({ iterations: i, [label]: e }));
        //@ts-ignore
        return vega_embed_1.default(this.errorChart, vegaSpecs_1.createErrorSpec(label, values), { actions: false });
    }
    render() {
        return React.createElement("div", { ref: errorChart => this.errorChart = errorChart });
    }
}
exports.ErrorChart = ErrorChart;

});
___scope___.file("modules/polynomial-regression/components/ParametersInfo.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const NumericParameter_1 = require("./NumericParameter");
const Equation_1 = require("./Equation");
const react_emotion_1 = require("react-emotion");
const _ParametersInfo = ({ className, a, b, c, d, error, iteration, testError }) => React.createElement("div", { className: className },
    React.createElement(Equation_1.Equation, { a: a, b: b, c: c, d: d }),
    React.createElement("div", { style: { margin: '.25em 0' } },
        React.createElement(NumericParameter_1.NumericParameter, { label: "training error", value: error[error.length - 1] }),
        React.createElement(NumericParameter_1.NumericParameter, { label: "test error", value: testError[testError.length - 1] }),
        React.createElement(NumericParameter_1.NumericParameter, { label: "iteration", value: iteration, round: 0 })));
exports.ParametersInfo = react_emotion_1.default(_ParametersInfo)({
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1em"
});
/*
  .parameters {
    margin: .25em 0;
  }
  */ 

});
___scope___.file("modules/polynomial-regression/components/NumericParameter.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const InlineCaption_1 = require("./InlineCaption");
const react_emotion_1 = require("react-emotion");
const roundNumber = (number, round) => round === 0 ? number : number.toFixed(round);
const _NumericParameter = ({ children, className, label, value, round = 3 }) => {
    const sanitizedValue = typeof value === 'number' ?
        roundNumber(value, round)
        : value;
    return (React.createElement("span", { className: className },
        React.createElement(InlineCaption_1.InlineCaption, null,
            label,
            ": "),
        React.createElement("span", null,
            sanitizedValue,
            children)));
};
exports.NumericParameter = react_emotion_1.default(_NumericParameter)({
    margin: "0 .25em"
});

});
___scope___.file("modules/polynomial-regression/components/InlineCaption.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_emotion_1 = require("react-emotion");
exports.InlineCaption = react_emotion_1.default('span')({
    fontWeight: "bold"
});

});
___scope___.file("modules/polynomial-regression/components/Equation.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_emotion_1 = require("react-emotion");
const sanitizeValue = v => Math.abs(v.toFixed(3));
const _Equation = ({ className, a, b, c, d }) => {
    return React.createElement("div", { className: className },
        React.createElement("span", null, "y = "),
        React.createElement("span", null,
            `${sanitizeValue(a)}x`,
            React.createElement("sup", null, "3")),
        React.createElement("span", null, `${b >= 0 ? ' + ' : ' - '}`),
        React.createElement("span", null,
            `${sanitizeValue(b)}x`,
            React.createElement("sup", null, "2")),
        React.createElement("span", null, `${c >= 0 ? ' + ' : ' - '}`),
        React.createElement("span", null, `${sanitizeValue(c)}x`),
        React.createElement("span", null, `${d >= 0 ? ' + ' : ' - '}`),
        React.createElement("span", null, `${sanitizeValue(d)}`));
};
exports.Equation = react_emotion_1.default(_Equation)({
    fontStyle: "italic",
    margin: ".25em 0"
});

});
___scope___.file("modules/polynomial-regression/components/LearningRateSelector.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const SelectField_1 = require("material-ui/SelectField");
const MenuItem_1 = require("material-ui/MenuItem");
exports.LearningRateSelector = ({ learningRate, onChange }) => React.createElement(SelectField_1.default, { floatingLabelText: "learning rate", value: learningRate, onChange: onChange },
    React.createElement(MenuItem_1.default, { value: 3, primaryText: "3" }),
    React.createElement(MenuItem_1.default, { value: 1, primaryText: "1" }),
    React.createElement(MenuItem_1.default, { value: 0.5, primaryText: "0.5" }),
    React.createElement(MenuItem_1.default, { value: 0.3, primaryText: "0.3" }),
    React.createElement(MenuItem_1.default, { value: 0.1, primaryText: "0.1" }),
    React.createElement(MenuItem_1.default, { value: 0.05, primaryText: "0.05" }),
    React.createElement(MenuItem_1.default, { value: 0.03, primaryText: "0.03" }),
    React.createElement(MenuItem_1.default, { value: 0.01, primaryText: "0.01" }));

});
___scope___.file("modules/polynomial-regression/components/PolynomialRegression.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const tf = require("@tensorflow/tfjs");
const MuiThemeProvider_1 = require("material-ui/styles/MuiThemeProvider");
const Checkbox_1 = require("material-ui/Checkbox");
const FlatButton_1 = require("material-ui/FlatButton");
const Paper_1 = require("material-ui/Paper");
const Toolbar_1 = require("material-ui/Toolbar");
const DataPlot_1 = require("./DataPlot");
const LearningRateSelector_1 = require("./LearningRateSelector");
const data_1 = require("../tensorflow/data");
const trueCoefficients = { a: -.8, b: -.2, c: .9, d: .5 };
class PolynomialRegression extends React.Component {
    static resetState(learningRate = 0.5) {
        const { trainXs, trainYs, testXs, testYs } = data_1.generateData(trueCoefficients);
        return {
            a: tf.variable(tf.scalar(Math.random())),
            b: tf.variable(tf.scalar(Math.random())),
            c: tf.variable(tf.scalar(Math.random())),
            d: tf.variable(tf.scalar(Math.random())),
            trainingError: [],
            testError: [],
            isTraining: false,
            iteration: 0,
            learningRate,
            predictions: new Float32Array(),
            showTestData: true,
            trainingData: { xs: trainXs, ys: trainYs },
            testData: { xs: testXs, ys: testYs }
        };
    }
    constructor(props) {
        super(props);
        this.state = PolynomialRegression.resetState();
    }
    componentDidMount() {
        this.optimizer = tf.train.sgd(this.state.learningRate);
        this.singleStepTrain();
    }
    loss(prediction, labels) {
        // Having a good error function is key for training a machine learning model
        return prediction.sub(labels).square().mean();
    }
    predict(xs, a, b, c, d) {
        // y = a * x ^ 3 + b * x ^ 2 + c * x + d
        return tf.tidy(() => {
            return a.mul(xs.pow(tf.scalar(3, 'int32')))
                .add(b.mul(xs.square()))
                .add(c.mul(xs))
                .add(d);
        });
    }
    continuousTrain(xs, ys) {
        return __awaiter(this, void 0, void 0, function* () {
            while (this.state.isTraining) {
                this.train(xs, ys);
                // Use tf.nextFrame to not block the browser.
                yield tf.nextFrame();
            }
        });
    }
    singleStepTrain() {
        const { xs, ys } = this.state.trainingData;
        this.train(xs, ys);
    }
    train(xs, ys) {
        this.optimizer.minimize(() => {
            const predictions = this.predict(xs, this.state.a, this.state.b, this.state.c, this.state.d);
            const predictionsValue = predictions.dataSync();
            const trainingError = this.loss(predictions, ys);
            const trainingErrorValue = trainingError.dataSync()[0];
            this.setState(({ iteration, trainingError }) => ({ trainingError: trainingError.concat(trainingErrorValue), iteration: iteration + 1, predictions: predictionsValue }));
            return trainingError;
        });
        const { testData } = this.state;
        const testPredictions = this.predict(testData.xs, this.state.a, this.state.b, this.state.c, this.state.d);
        const testErrorValue = this.loss(testPredictions, testData.ys).dataSync()[0];
        this.setState(({ testError }) => ({ testError: testError.concat(testErrorValue) }));
    }
    playToggle() {
        const isTraining = !this.state.isTraining;
        this.setState(() => ({ isTraining }), () => {
            if (this.state.isTraining) {
                const { xs, ys } = this.state.trainingData;
                this.continuousTrain(xs, ys);
            }
        });
    }
    reset(learningRate = this.state.learningRate) {
        this.setState(() => PolynomialRegression.resetState(learningRate), () => {
            this.optimizer = tf.train.sgd(this.state.learningRate);
            this.singleStepTrain();
        });
    }
    render() {
        const _a = this.state, { a, b, c, d, isTraining, learningRate, showTestData } = _a, otherState = __rest(_a, ["a", "b", "c", "d", "isTraining", "learningRate", "showTestData"]);
        return (React.createElement(MuiThemeProvider_1.default, null,
            React.createElement(Paper_1.default, { style: { height: '90vh' }, zDepth: 2 },
                React.createElement(Toolbar_1.Toolbar, null,
                    React.createElement(Toolbar_1.ToolbarGroup, null,
                        React.createElement(LearningRateSelector_1.LearningRateSelector, { learningRate: learningRate, onChange: (e, i, value) => this.reset(value) }),
                        React.createElement(Checkbox_1.default, { label: "show test data", checked: showTestData, onCheck: () => this.setState(({ showTestData }) => ({ showTestData: !showTestData })) })),
                    React.createElement(Toolbar_1.ToolbarGroup, null,
                        React.createElement(Toolbar_1.ToolbarSeparator, null),
                        React.createElement(FlatButton_1.default, { label: isTraining ? 'stop' : 'train', onClick: this.playToggle.bind(this) }),
                        React.createElement(FlatButton_1.default, { label: "reset", onClick: () => this.reset(), secondary: true }),
                        React.createElement(FlatButton_1.default, { label: "step+", disabled: isTraining, onClick: this.singleStepTrain.bind(this) }))),
                React.createElement(DataPlot_1.DataPlot, Object.assign({ a: a.dataSync()[0], b: b.dataSync()[0], c: c.dataSync()[0], d: d.dataSync()[0], showTestData: showTestData }, otherState)))));
    }
}
exports.PolynomialRegression = PolynomialRegression;

});
___scope___.file("modules/polynomial-regression/tensorflow/data.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tf = require("@tensorflow/tfjs");
function generateData(coeff, sigma = 0.04) {
    const numPoints = 120;
    return tf.tidy(() => {
        const [a, b, c, d] = [
            tf.scalar(coeff.a), tf.scalar(coeff.b), tf.scalar(coeff.c),
            tf.scalar(coeff.d)
        ];
        const xs = tf.randomUniform([numPoints], -1, 1);
        // Generate polynomial data
        const three = tf.scalar(3, 'int32');
        const ys = a.mul(xs.pow(three))
            .add(b.mul(xs.square()))
            .add(c.mul(xs))
            .add(d)
            // Add random noise to the generated data
            // to make the problem a bit more interesting
            .add(tf.randomNormal([numPoints], 0, sigma));
        // Normalize the y values to the range 0 to 1.
        const ymin = ys.min();
        const ymax = ys.max();
        const yrange = ymax.sub(ymin);
        const ysNormalized = ys.sub(ymin).div(yrange);
        const trainXs = xs.slice(0, 100);
        const testXs = xs.slice(100);
        const trainYs = ysNormalized.slice(0, 100);
        const testYs = ysNormalized.slice(100);
        return {
            trainXs,
            trainYs,
            testXs,
            testYs
        };
    });
}
exports.generateData = generateData;

});
___scope___.file("modules/dashboard/tabs/SettingsTab.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const theming_1 = require("theming");
exports.SettingsTab = theming_1.withTheme(mobx_react_1.observer((props) => React.createElement("div", null, "settings")));

});
___scope___.file("modules/dashboard/tabs/TrainTab.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const theming_1 = require("theming");
exports.TrainTab = theming_1.withTheme(mobx_react_1.observer((props) => React.createElement("div", null, "train")));

});
___scope___.file("modules/datasets.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
exports.DatasetsPage = mobx_react_1.observer((props) => React.createElement("div", null,
    React.createElement("p", null, "datasets"),
    React.createElement("p", null, "manage data here across projects"),
    React.createElement("p", null, "add connections, manage global datasets, etc "),
    React.createElement("p", null, "adding project datasets will happen within the notebook module")));

});
___scope___.file("modules/notebook/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./Diagram"));
__export(require("./Drawers"));
__export(require("./Nodes"));
__export(require("./View"));

});
___scope___.file("modules/notebook/Diagram/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./Canvas"));
__export(require("./CogliteLinkFactory"));
__export(require("./CogliteLinkModel"));
__export(require("./CogliteNodeFactory"));
__export(require("./CogliteNodeModel"));
__export(require("./CogliteNodeWidget"));
__export(require("./CoglitePortModel"));
__export(require("./Default"));
__export(require("./SimplePortFactory"));

});
___scope___.file("modules/notebook/Diagram/Default.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const storm_react_diagrams_1 = require("storm-react-diagrams");
const CogliteLinkFactory_1 = require("./CogliteLinkFactory");
// import the custom models
const CogliteNodeFactory_1 = require("./CogliteNodeFactory");
const CogliteNodeModel_1 = require("./CogliteNodeModel");
const CoglitePortModel_1 = require("./CoglitePortModel");
const SimplePortFactory_1 = require("./SimplePortFactory");
exports.default = () => {
    //1) setup the diagram engine
    var engine = new storm_react_diagrams_1.DiagramEngine();
    engine.installDefaultFactories();
    // register some other factories as well
    engine.registerLinkFactory(new CogliteLinkFactory_1.CogliteLinkFactory());
    engine.registerPortFactory(new SimplePortFactory_1.SimplePortFactory("coglite", config => new CoglitePortModel_1.CoglitePortModel()));
    engine.registerNodeFactory(new CogliteNodeFactory_1.CogliteNodeFactory());
    //2) setup the diagram model
    var model = new storm_react_diagrams_1.DiagramModel();
    //3-A) create a default node
    var node1 = new storm_react_diagrams_1.DefaultNodeModel("Node 1", "rgb(0,192,255)");
    var port1 = node1.addOutPort("Out");
    node1.setPosition(100, 150);
    //3-B) create our new custom node
    var node2 = new CogliteNodeModel_1.CogliteNodeModel("cogliteIn", "Coglite Transform block");
    node2.setPosition(300, 108);
    var node3 = new storm_react_diagrams_1.DefaultNodeModel("Node 3", "red");
    var port3 = node3.addInPort("In");
    node3.setPosition(550, 150);
    var node4 = new CogliteNodeModel_1.CogliteNodeModel("cogliteOut", "Coglite Transform block");
    node4.setPosition(50, 250);
    //3-C) link the 2 nodes together
    var link1 = port1.link(node2.getPort("leftTop"));
    var link2 = port3.link(node2.getPort("rightBottom"));
    var link3 = node4.getPort("rightTop").link(node2.getPort("leftBottom"));
    //4) add the models to the root graph
    model.addAll(node1, node2, node3, node4, link1, link2, link3);
    //5) load model into engine
    engine.setDiagramModel(model);
    //6) render the diagram!
    return React.createElement(storm_react_diagrams_1.DiagramWidget, { className: "srd-demo-canvas", diagramEngine: engine });
};

});
___scope___.file("modules/notebook/Drawers/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./NodeDrawer"));

});
___scope___.file("modules/notebook/Nodes/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./Input"));
__export(require("./Output"));

});
___scope___.file("modules/lab/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./lab"));

});
___scope___.file("modules/lab/lab.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const App_1 = require("./App");
const design_1 = require("../../design");
const toolbar_1 = require("./toolbar");
exports.SettingsPage = mobx_react_1.observer((props) => React.createElement(design_1.FillParent, null,
    React.createElement(toolbar_1.LabToolbar, null),
    React.createElement(App_1.CogliteLabApp, null)));

});
___scope___.file("modules/lab/App.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_mosaic_component_1 = require("react-mosaic-component");
//import {Mosaic, MosaicWindow} from './mosaic'
//import './styles/index.css'
//import './App.css';
const React = require("react");
require("react-dom");
const design_1 = require("../../design");
const ViewIdMosaic = react_mosaic_component_1.Mosaic.ofType();
const ViewIdMosaicWindow = react_mosaic_component_1.MosaicWindow.ofType();
const TITLE_MAP = {
    a: 'Graph Window',
    b: 'Populations',
    c: 'Layout',
    new: 'New Window',
};
class CogliteLabApp extends React.Component {
    render() {
        return (React.createElement("div", { style: { height: '100vh', display: 'flex' } },
            React.createElement(design_1.VerticalStretch, null,
                React.createElement("nav", { className: "pt-navbar" },
                    React.createElement("div", { className: "pt-navbar-group pt-align-left" },
                        React.createElement("div", { className: "pt-navbar-heading" }, "Untitled Lab"),
                        React.createElement("span", { className: "pt-navbar-divider" }),
                        React.createElement("div", { className: "pt-input-group" },
                            React.createElement("span", { className: "pt-icon pt-icon-search" }),
                            React.createElement("input", { type: "search", className: "pt-input pt-small", placeholder: "Search groups..." }))),
                    React.createElement("div", { className: "pt-navbar-group pt-align-right" },
                        React.createElement("button", { className: "pt-button pt-minimal pt-icon-control" },
                            React.createElement("span", null, "Configure Workspace")),
                        React.createElement("div", { className: "pt-button-group pt-minimal" },
                            React.createElement("a", { className: "pt-button pt-icon-undo", role: "button" }),
                            React.createElement("a", { className: "pt-button pt-icon-redo", role: "button" })),
                        React.createElement("span", { className: "pt-navbar-divider" }),
                        React.createElement("button", { className: "pt-button pt-minimal pt-icon-user" }),
                        React.createElement("button", { className: "pt-button pt-minimal pt-icon-help" }),
                        React.createElement("button", { className: "pt-button pt-minimal pt-icon-cog" }))),
                React.createElement(ViewIdMosaic, { renderTile: (id, path) => (React.createElement(ViewIdMosaicWindow, { path: path, createNode: () => 'new', title: TITLE_MAP[id] },
                        id === 'a' &&
                            React.createElement("div", null, "ID: A"),
                        id === 'b' &&
                            React.createElement("div", null, "ID: B"),
                        id === 'c' && React.createElement("h1", null, TITLE_MAP[id]))), initialValue: {
                        direction: 'row',
                        first: 'a',
                        second: {
                            direction: 'column',
                            first: 'b',
                            second: 'c',
                        },
                    } }))));
    }
}
exports.CogliteLabApp = CogliteLabApp;

});
___scope___.file("modules/lab/toolbar.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const core_1 = require("@blueprintjs/core");
const icons_1 = require("@blueprintjs/icons");
const mobx_react_1 = require("mobx-react");
exports.LabToolbar = mobx_react_1.observer((props) => (React.createElement(core_1.ButtonGroup, { large: true, fill: true },
    React.createElement(core_1.Button, { icon: icons_1.IconNames.CODE }),
    React.createElement(core_1.Button, { icon: icons_1.IconNames.GRAPH }),
    React.createElement(core_1.Button, { icon: icons_1.IconNames.SCATTER_PLOT }),
    React.createElement(core_1.Button, { icon: icons_1.IconNames.GRAPH }))));

});
___scope___.file("modules/workflow-designer/components/workflow-toolbar/designer-screen.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
const fs = require("fs");
const React = require("react");
const ReactDOM = require("react-dom");
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
let injectSheet = require('react-jss').default;
let jss = require('react-jss/lib/jss').default, JssProvider = require('react-jss').JssProvider, ThemeProvider = require('react-jss').ThemeProvider, jssComposer = require('jss-compose').default, jssNested = require('jss-nested').default;
require("../../style/less/website.less");
require("codemirror/mode/yaml/yaml");
const editor_bar_1 = require("./editor-bar");
const designer_state_1 = require("./designer-state");
const react_codemirror2_1 = require("react-codemirror2");
const workflow_editor_1 = require("../workflow-editor");
var electron = require('electron');
var currentWindow = electron.remote.getCurrentWindow();
jss.use(jssComposer());
jss.use(jssNested());
const styles = (theme) => ({
    editorContainer: {},
    editorBody: {
        padding: '63px 0 0 0',
    },
    editor: {
        composes: 'editor',
        fontFamily: 'Courier New',
        fontSize: '16px',
        '& .CodeMirror': {
            position: 'fixed',
            top: '53px',
            left: 0,
            right: 0,
            bottom: 0,
            height: 'auto'
        },
        '& .CodeMirror-lines': {
            paddingTop: '30px'
        }
    },
    downloadSection: {
        composes: 'links',
        padding: '0 20px 0 0'
    },
    button: {
        marginTop: '15px',
        textAlign: 'center'
    },
    title: {
        fontWeight: '700',
        margin: '40px 0 10px 0'
    },
    errAlert: {
        position: 'fixed',
        top: '53px',
        right: 0,
        left: 0,
        zIndex: 1,
        background: '#ffae9c',
        color: '#730f0f',
        display: 'block',
        textAlign: 'center',
        padding: '3px',
        borderBottom: '2px solid #ca1212',
    }
});
let DesignerScreen = class DesignerScreen extends React.Component {
    constructor(props) {
        super(props);
        this.designerState = new designer_state_1.DesignerState();
    }
    componentDidMount() {
        if (currentWindow.args) {
            let args = currentWindow.args;
            if (args.length && args.length > 1) {
                try {
                    if (fs.statSync(args[1]).isFile()) {
                        this.designerState.openWorkflow(args[1]);
                    }
                }
                catch (e) { }
            }
        }
    }
    componentWillUnmount() {
        this.designerState.onDestroy();
    }
    setMode(yamlMode) {
        this.designerState.setMode(yamlMode);
    }
    runDirtyFileCheck() {
        if (this.designerState.dirty) {
            let currentWindow = electron.remote.getCurrentWindow();
            let response = electron.remote.dialog.showMessageBox(currentWindow, {
                type: 'warning',
                buttons: ['Yes', 'No'],
                defaultId: 0,
                cancelId: -1,
                title: 'Workflow modified',
                message: 'Do you want to save changes to the current workflow?'
            });
            if (response == -1) {
                return false;
            }
            else if (response == 0) {
                this.designerState.saveWorkflow();
            }
        }
        return true;
    }
    render() {
        let classes = this.props.classes || {};
        return React.createElement("div", { className: classes.editorContainer },
            React.createElement(editor_bar_1.EditorBar, { uiState: this.designerState.uiState, modeChanged: yaml => this.setMode(yaml), openWorkflow: (workflow) => this.designerState.openWorkflow(workflow), newWorkflow: () => this.designerState.newWorkflow(), save: () => this.designerState.saveWorkflow(), dirty: this.designerState.dirty }),
            this.designerState.uiState.yamlError &&
                React.createElement("div", { className: classes.errAlert }, "An error occured while parsing the yaml content. Please review your workflow file."),
            React.createElement("div", { className: classes.editorBody },
                !this.designerState.uiState.yaml &&
                    React.createElement(workflow_editor_1.WorkflowEditor, { state: this.designerState.editorState, workflow: this.designerState.editorState.workflow }),
                this.designerState.uiState.yaml &&
                    React.createElement(react_codemirror2_1.Controlled, { className: classes.editor, value: this.designerState.yaml, onBeforeChange: (_, __, yaml) => this.designerState.updateYaml(yaml, true), options: { lineNumbers: true, mode: 'yaml', theme: 'elegant', indentWithTabs: false, tabSize: 2 } })));
    }
};
__decorate([
    mobx_1.observable,
    __metadata("design:type", typeof (_a = typeof designer_state_1.DesignerState !== "undefined" && designer_state_1.DesignerState) === "function" && _a || Object)
], DesignerScreen.prototype, "designerState", void 0);
DesignerScreen = __decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    __metadata("design:paramtypes", [Object])
], DesignerScreen);
exports.DesignerScreen = DesignerScreen;
;
let DesignerApp = class DesignerApp extends React.Component {
    constructor(props, context) {
        super(props);
    }
    render() {
        let theme = {};
        return (React.createElement(JssProvider, { jss: jss },
            React.createElement(ThemeProvider, { theme: theme },
                React.createElement(DesignerScreen, null))));
    }
};
DesignerApp = __decorate([
    mobx_react_1.observer,
    __metadata("design:paramtypes", [Object, Object])
], DesignerApp);
exports.DesignerApp = DesignerApp;
function render() {
    let theme = {};
    ReactDOM.render(React.createElement(JssProvider, { jss: jss },
        React.createElement(ThemeProvider, { theme: theme },
            React.createElement(DesignerScreen, null))), document.getElementById('app'));
}
exports.render = render;
//import 'purecss/build/pure.css';
//import 'purecss/build/grids-responsive.css';
//import 'codemirror/lib/codemirror.css';
//import 'codemirror/theme/elegant.css';
//import { CustomInputIO } from '@stackfoundation/workflow-designer/lib/models/custom-input';

});
___scope___.file("modules/workflow-designer/style/less/website.less", function(exports, require, module, __filename, __dirname){


require("fuse-box-css")("modules/workflow-designer/style/less/website.less", "body {\n  background-color: transparent;\n  font-family: 'Lato', sans-serif;\n  text-rendering: optimizeLegibility;\n}\n.pure-g [class*=\"pure-u\"] {\n  font-family: 'Lato', sans-serif !important;\n}\n.links a,\n.links a:visited {\n  text-decoration: none;\n  font-weight: 700;\n  color: #4E73BD;\n}\n.links a:hover {\n  color: #34518b;\n}\ncode {\n  background-color: #F5EEF9;\n  color: #8824CA;\n  padding: 4px 2px;\n}\n.container {\n  margin-right: auto;\n  margin-left: auto;\n  padding-right: 15px;\n  padding-left: 15px;\n  width: 100%;\n  max-width: 80em;\n  overflow-x: hidden;\n}\n.image {\n  max-width: 100%;\n  padding: 0px 20px;\n  box-sizing: border-box;\n}\n.mobile-menu,\n.pure-menu-horizontal .pure-menu-list.mobile-menu {\n  display: block;\n}\n.mobile-menu .pure-menu-item,\n.pure-menu-horizontal .pure-menu-list.mobile-menu .pure-menu-item {\n  float: left;\n  width: 100%;\n}\n@media screen and (min-width: 48em) {\n  .mobile-menu,\n  .pure-menu-horizontal .pure-menu-list.mobile-menu {\n    display: inline-block;\n  }\n  .mobile-menu .pure-menu-item,\n  .pure-menu-horizontal .pure-menu-list.mobile-menu .pure-menu-item {\n    float: none;\n    width: auto;\n  }\n}\n")
});
___scope___.file("modules/workflow-designer/components/workflow-toolbar/editor-bar.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
const path = require("path");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const mobx_1 = require("mobx");
let injectSheet = require('react-jss').default;
const New = require('react-icons/lib/fa/file-o');
const Open = require('react-icons/lib/fa/folder-open-o');
const Save = require('react-icons/lib/fa/floppy-o');
const styles = (theme) => ({
    editorBar: {
        composes: 'pure-menu pure-menu-horizontal',
        borderBottom: 'solid 1px #ddd',
    },
    editorBarInner: {
        composes: 'pure-menu-heading',
        fontWeight: '700',
        width: '100%',
        background: 'white'
    },
    projectMenu: {
        composes: 'pure-menu-list'
    },
    workflowTabs: {
        composes: 'pure-menu-list',
        float: 'right',
        marginRight: '2em'
    },
    menuItem: {
        composes: 'pure-menu-item'
    },
    menuItemWithChildren: {
        composes: 'pure-menu-item pure-menu-has-children pure-menu-allow-hover'
    },
    menuItemActive: {
        composes: 'pure-menu-item pure-menu-selected'
    },
    menuLink: {
        composes: 'pure-menu-link',
        '&:focus': {
            background: 'none'
        }
    },
    menuNonLink: {
        composes: 'pure-menu-link',
        cursor: 'auto',
        '&:hover': {
            background: 'none'
        },
        '&:active': {
            background: 'none'
        }
    }
});
let EditorBar = class EditorBar extends React.Component {
    constructor(props) {
        super(props);
    }
    save(e) {
        if (this.props.save) {
            this.props.save();
        }
        e.preventDefault();
    }
    blankNew(e) {
        if (this.props.newWorkflow) {
            this.props.newWorkflow();
        }
        e.preventDefault();
    }
    openNew(e) {
        if (this.props.openWorkflow) {
            this.props.openWorkflow();
        }
        e.preventDefault();
    }
    openExisting(workflow, e) {
        if (this.props.openWorkflow) {
            this.props.openWorkflow(path.join(this.props.uiState.projectPath, workflow + '.wflow'));
        }
        e.preventDefault();
    }
    get multipleWorkflows() {
        return this.props.uiState && this.props.uiState.projectWorkflows && this.props.uiState.projectWorkflows.length > 1;
    }
    get existingWorkflow() {
        return this.props.uiState && this.props.uiState.projectPath && this.props.uiState.projectPath.length > 0;
    }
    get yamlMode() {
        return this.props.uiState && this.props.uiState.yaml;
    }
    setMode(e, yaml) {
        if (this.props.modeChanged) {
            this.props.modeChanged(yaml);
        }
        e.preventDefault();
    }
    render() {
        let classes = this.props.classes || {};
        return React.createElement("div", { className: classes.editorBar },
            React.createElement("div", { className: classes.editorBarInner },
                React.createElement("ul", { className: classes.projectMenu },
                    React.createElement("li", { className: classes.menuItem },
                        React.createElement("a", { href: "#", className: classes.menuLink, onClick: e => this.blankNew(e) },
                            React.createElement(New, null))),
                    React.createElement("li", { className: classes.menuItem },
                        React.createElement("a", { href: "#", className: classes.menuLink, onClick: e => this.openNew(e) },
                            React.createElement(Open, null))),
                    this.existingWorkflow && React.createElement("li", { className: classes.menuItem }, this.props.uiState &&
                        React.createElement("span", { title: this.props.uiState.projectPath, className: classes.menuNonLink },
                            this.props.uiState.projectName,
                            " >\u00A0")),
                    !this.existingWorkflow && React.createElement("li", { className: classes.menuItem }, this.props.uiState &&
                        React.createElement("span", { title: this.props.uiState.projectPath, className: classes.menuNonLink },
                            "New Workflow",
                            this.props.dirty && React.createElement("span", null, "*"))),
                    this.existingWorkflow && React.createElement("li", { className: this.multipleWorkflows ? classes.menuItemWithChildren : classes.menuItem },
                        this.multipleWorkflows &&
                            React.createElement("a", { href: "#", className: classes.menuLink },
                                this.props.uiState.workflowName,
                                this.existingWorkflow && this.props.dirty && React.createElement("span", null, "*")),
                        !this.multipleWorkflows &&
                            React.createElement("span", { title: this.props.uiState.projectPath, className: classes.menuNonLink },
                                this.props.uiState.workflowName,
                                this.existingWorkflow && this.props.dirty && React.createElement("span", null, "*")),
                        this.multipleWorkflows &&
                            React.createElement("ul", { className: "pure-menu-children" }, this.props.uiState.projectWorkflows.map((workflow, i) => React.createElement("li", { className: classes.menuItem, key: 'wflow-' + i },
                                React.createElement("a", { href: "#", onClick: e => this.openExisting(workflow, e), className: classes.menuLink }, workflow))))),
                    this.props.dirty &&
                        React.createElement("li", { className: classes.menuItem },
                            React.createElement("a", { href: "#", className: classes.menuLink, onClick: e => this.save(e) },
                                React.createElement(Save, null)))),
                React.createElement("ul", { className: classes.workflowTabs },
                    React.createElement("li", { className: this.yamlMode ? classes.menuItem : classes.menuItemActive },
                        React.createElement("a", { href: "#", onClick: e => this.setMode(e, false), className: classes.menuLink }, "Workflow")),
                    React.createElement("li", { className: this.yamlMode ? classes.menuItemActive : classes.menuItem },
                        React.createElement("a", { href: "#", onClick: e => this.setMode(e, true), className: classes.menuLink }, "YAML")))));
    }
};
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = (typeof React !== "undefined" && React).MouseEvent) === "function" && _a || Object, Boolean]),
    __metadata("design:returntype", void 0)
], EditorBar.prototype, "setMode", null);
EditorBar = __decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    __metadata("design:paramtypes", [Object])
], EditorBar);
exports.EditorBar = EditorBar;

});
___scope___.file("modules/workflow-designer/components/workflow-toolbar/designer-state.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
const fs = require("fs");
const path = require("path");
var electron = require('electron');
const electron_1 = require("electron");
var currentWindow = electron.remote.getCurrentWindow();
const lodash_1 = require("lodash");
const mobx_1 = require("mobx");
const React = require("react");
const workflow_loader_1 = require("../../workflow-loader");
const step_code_editor_1 = require("./../step-code-editor");
const state_1 = require("../../models/state");
const workflow_1 = require("../../models/workflow");
const workflow_service_1 = require("../../services/workflow_service");
const scriptEditorFactory = (step, fieldName) => React.createElement(step_code_editor_1.StepCodeEditor, { step: step, fieldName: fieldName });
const externalBrowserLinkFactory = (link, text) => React.createElement("a", { href: "#", onClick: _ => electron.shell.openExternal('https://stack.foundation/#!' + link) },
    " ",
    text,
    " ");
class UIState {
    constructor() {
        this.projectName = '';
        this.projectPath = '';
        this.projectWorkflows = [];
        this.workflowName = '';
        this.workflowPath = '';
        this.yaml = false;
        this.yamlError = false;
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], UIState.prototype, "projectName", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], UIState.prototype, "projectPath", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], UIState.prototype, "projectWorkflows", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], UIState.prototype, "workflowName", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], UIState.prototype, "workflowPath", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], UIState.prototype, "yaml", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], UIState.prototype, "yamlError", void 0);
exports.UIState = UIState;
class DesignerState {
    constructor() {
        this.dirty = false;
        this.originalYaml = '';
        this.yamlMode = false;
        this.yaml = '';
        this.uiState = new UIState();
        this.ipcEventCallbacks = {
            new: () => this.newWorkflow(),
            open: () => this.openWorkflow(),
            save: () => this.saveWorkflow(),
            saveAs: () => this.saveWorkflowAs(),
        };
        this.updateWorkflow = (yaml) => {
            try {
                let workflow = workflow_loader_1.loadWorkflow(yaml);
                this.editorState.workflow = workflow_1.Workflow.apply(workflow);
                this.editorState.selectInitialStep();
                this.uiState.yamlError = false;
                return true;
            }
            catch (e) {
                this.uiState.yamlError = true;
                return false;
            }
        };
        this.saveWorkflowAs = (savePath) => {
            if (!savePath) {
                let path = electron.remote.dialog.showSaveDialog(currentWindow, {
                    title: "Save workflow as",
                    filters: [
                        { name: 'Workflows', extensions: ['wflow'] }
                    ]
                });
                if (!path || path.length === 0) {
                    return false;
                }
                savePath = path;
            }
            if (this.uiState.yaml) {
                fs.writeFileSync(savePath, this.yaml);
                this.updateWorkflow(this.yaml);
            }
            else {
                this.yaml = this.workflowToYaml();
                fs.writeFileSync(savePath, this.yaml);
            }
            this.resetDirtyCheck();
            this.updateUiState(savePath);
            return true;
        };
        this.saveWorkflow = () => {
            if (this.uiState.workflowPath && this.uiState.workflowPath.length > 0) {
                return this.saveWorkflowAs(this.uiState.workflowPath);
            }
            return this.saveWorkflowAs();
        };
        this.openWorkflow = (workflowPath) => {
            if (!this.runDirtyFileCheck()) {
                return;
            }
            if (!workflowPath) {
                let path = electron.remote.dialog.showOpenDialog(currentWindow, {
                    title: "Open workflow",
                    filters: [
                        { name: 'Workflows', extensions: ['wflow'] }
                    ]
                });
                if (!path || path.length === 0) {
                    return;
                }
                workflowPath = path[0];
            }
            this.uiState.workflowPath = workflowPath;
            let buffer = fs.readFileSync(workflowPath);
            if (buffer) {
                if (!this.updateWorkflow(buffer.toString())) {
                    this.setMode(true);
                }
                this.updateYaml(buffer.toString());
                this.editorState.catalog = this.catalog;
                this.resetDirtyCheck();
            }
            this.updateUiState(workflowPath);
        };
        this.newWorkflow = () => {
            if (!this.runDirtyFileCheck()) {
                return;
            }
            this.editorState.workflow = new workflow_1.Workflow();
            this.editorState.selectInitialStep();
            this.yaml = this.workflowToYaml();
            this.editorState.catalog = this.catalog;
            this.resetDirtyCheck();
            this.updateUiState();
        };
        let state = new state_1.EditorState();
        new workflow_service_1.WorkflowService().getWorkflowImagesCatalog()
            .then(response => {
            this.catalog = response;
            state.catalog = this.catalog;
        });
        state.workflow = new workflow_1.Workflow({});
        state.ide = false;
        state.allowCalls = true;
        state.scriptEditorFactory = scriptEditorFactory;
        state.sfLinkFactory = externalBrowserLinkFactory;
        state.selectInitialStep();
        this.editorState = state;
        this.resetDirtyCheck();
        electron_1.ipcRenderer.on('new', this.ipcEventCallbacks.new);
        electron_1.ipcRenderer.on('open', this.ipcEventCallbacks.open);
        electron_1.ipcRenderer.on('save', this.ipcEventCallbacks.save);
        electron_1.ipcRenderer.on('saveAs', this.ipcEventCallbacks.saveAs);
        let forceQuit = false;
        window.onbeforeunload = (e) => {
            if (!forceQuit && this.dirty) {
                e.returnValue = false;
                if (this.runDirtyFileCheck()) {
                    forceQuit = true;
                    setTimeout(() => {
                        electron_1.remote.getCurrentWindow().close();
                        electron_1.ipcRenderer.send('quit');
                    }, 1);
                }
            }
        };
    }
    onDestroy() {
        if (this.dispose) {
            this.dispose();
        }
        electron_1.ipcRenderer.removeListener('new', this.ipcEventCallbacks.new);
        electron_1.ipcRenderer.removeListener('open', this.ipcEventCallbacks.open);
        electron_1.ipcRenderer.removeListener('save', this.ipcEventCallbacks.save);
        electron_1.ipcRenderer.removeListener('saveAs', this.ipcEventCallbacks.saveAs);
    }
    setDirty(dirty) {
        // ipcRenderer.sendSync('file-dirty', dirty);
        this.dirty = dirty;
    }
    quit() {
        electron_1.ipcRenderer.send('quit');
    }
    resetDirtyCheck() {
        if (this.dispose) {
            this.dispose();
        }
        this.originalYaml = this.yaml;
        this.setDirty(false);
        this.dispose = mobx_1.autorun(() => {
            if (!this.dirty) {
                let objectDiff = this.workflowToYaml() !== this.originalYaml;
                let codeDiff = this.yaml !== this.originalYaml;
                if (this.uiState.yaml ? codeDiff : objectDiff) {
                    this.setDirty(true);
                    if (this.dispose) {
                        this.dispose();
                    }
                }
            }
        });
    }
    workflowToYaml() {
        let yaml = workflow_loader_1.saveWorkflow(this.editorState.workflow.toJS()).trim();
        return yaml === "{}" ? '' : yaml;
    }
    updateYaml(yaml, updateWorkflow = false) {
        this.yaml = yaml;
        if (updateWorkflow) {
            lodash_1.debounce(this.updateWorkflow, 500);
        }
    }
    setMode(yamlMode) {
        if (yamlMode === this.uiState.yaml) {
            return;
        }
        if (yamlMode) {
            this.yaml = this.workflowToYaml();
        }
        else {
            if (!this.updateWorkflow(this.yaml)) {
                return;
            }
        }
        this.uiState.yaml = yamlMode;
        this.editorState.catalog = this.catalog;
    }
    runDirtyFileCheck() {
        if (this.dirty) {
            let currentWindow = electron.remote.getCurrentWindow();
            let response = electron.remote.dialog.showMessageBox(currentWindow, {
                type: 'warning',
                buttons: ['Yes', 'No', 'Cancel'],
                noLink: true,
                defaultId: 0,
                cancelId: -1,
                title: 'Workflow modified',
                message: 'Do you want to save changes to the current workflow?'
            });
            if (response == -1 || response == 2) {
                return false;
            }
            else if (response == 0) {
                return this.saveWorkflow();
            }
        }
        return true;
    }
    updateUiState(workflowPath) {
        if (workflowPath) {
            this.uiState.workflowPath = workflowPath;
            this.uiState.workflowName = path.basename(workflowPath);
            if (this.uiState.workflowName.endsWith('.wflow')) {
                this.uiState.workflowName = this.uiState.workflowName.substring(0, this.uiState.workflowName.length - 6);
            }
            this.uiState.projectPath = path.dirname(workflowPath);
            if (path.basename(this.uiState.projectPath) == 'workflows') {
                this.uiState.projectWorkflows = this.listProjectWorkflows(this.uiState.projectPath);
                this.uiState.projectName = path.basename(path.dirname(this.uiState.projectPath));
            }
        }
        else {
            this.uiState = new UIState();
        }
    }
    listProjectWorkflows(projectDirectory) {
        let children = fs.readdirSync(projectDirectory);
        if (children && children.length > 0) {
            children = children
                .filter(workflow => workflow && workflow.endsWith('.wflow'))
                .map(workflow => workflow.substring(0, workflow.length - 6));
        }
        return children;
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], DesignerState.prototype, "dirty", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", typeof (_a = typeof state_1.EditorState !== "undefined" && state_1.EditorState) === "function" && _a || Object)
], DesignerState.prototype, "editorState", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], DesignerState.prototype, "yamlMode", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], DesignerState.prototype, "yaml", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", UIState)
], DesignerState.prototype, "uiState", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], DesignerState.prototype, "setDirty", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DesignerState.prototype, "resetDirtyCheck", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], DesignerState.prototype, "updateWorkflow", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", void 0)
], DesignerState.prototype, "updateYaml", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], DesignerState.prototype, "setMode", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], DesignerState.prototype, "openWorkflow", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DesignerState.prototype, "updateUiState", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], DesignerState.prototype, "newWorkflow", void 0);
exports.DesignerState = DesignerState;
//import { EditorState } from '@stackfoundation/workflow-designer/lib/models/state';
//import { CatalogImage } from '@stackfoundation/workflow-designer/lib/models/catalog';
//import { Workflow, WorkflowStepSimple } from '@stackfoundation/workflow-designer/lib/models/workflow';
//import { WorkflowService } from '@stackfoundation/workflow-designer/lib/services/workflow_service';

});
___scope___.file("modules/workflow-designer/workflow-loader.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as fs from 'fs';
const mobx_1 = require("mobx");
const jsYaml = require("js-yaml");
function isEmptyArray(obj) {
    if (Array.isArray(obj) && obj.length == 0) {
        return true;
    }
    return false;
}
function condense(obj) {
    let condensed = {};
    for (var prop in obj) {
        let value = obj[prop];
        if (!(value === null || value === undefined || value === false || value === '' || isEmptyArray(value))) {
            if (typeof (value) === 'object' && !Array.isArray(value)) {
                value = condense(value);
                if (Object.keys(value).length === 0) {
                    condensed[prop] = value;
                }
            }
            else if (Array.isArray(value) && value.length > 0) {
                condensed[prop] = value.map(element => typeof (element) === 'object' ? condense(element) : element);
            }
            else {
                condensed[prop] = value;
            }
        }
    }
    return condensed;
}
function saveWorkflow(workflow) {
    return jsYaml.safeDump(condense(mobx_1.toJS(workflow)), { skipInvalid: true });
}
exports.saveWorkflow = saveWorkflow;
function loadWorkflow(input) {
    return jsYaml.safeLoad(input);
}
exports.loadWorkflow = loadWorkflow;

});
___scope___.file("modules/workflow-designer/components/step-code-editor.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
let injectSheet = require('react-jss').default;
const react_codemirror2_1 = require("react-codemirror2");
require("codemirror/mode/shell/shell");
const styles = (theme) => ({
    editor: {
        fontFamily: 'Courier New',
        fontSize: '16px'
    }
});
let StepCodeEditor = class StepCodeEditor extends React.Component {
    constructor(props) {
        super(props);
    }
    updateCode(newCode) {
        this.props.step[this.props.fieldName] = newCode;
    }
    render() {
        let classes = this.props.classes || {};
        let script = this.props.step[this.props.fieldName];
        return (React.createElement(react_codemirror2_1.Controlled, { className: classes.editor, value: script, onBeforeChange: (_, __, code) => this.updateCode(code), options: { lineNumbers: true, mode: 'shell', theme: 'pastel-on-dark' } }));
    }
};
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StepCodeEditor.prototype, "updateCode", null);
StepCodeEditor = __decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    __metadata("design:paramtypes", [Object])
], StepCodeEditor);
exports.StepCodeEditor = StepCodeEditor;

});
___scope___.file("modules/workflow-designer/models/state.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b, _c, _d, _e;
const mobx_1 = require("mobx");
const workflow_1 = require("./workflow");
const workflow_2 = require("../models/workflow");
class EditorState {
    setCatalog(catalog) {
        this.catalog = catalog;
    }
    selectInitialStep() {
        if (this.workflow && this.workflow.steps && this.workflow.steps.length > 0) {
            this.selectStep(this.workflow.steps[0]);
        }
    }
    selectStep(step) {
        this.currentStep = step;
    }
    clearSelectedStep() {
        this.currentStep = undefined;
    }
    deleteStep(step) {
        this.workflow.deleteStep(step);
        if (this.currentStep === step) {
            this.selectInitialStep();
        }
    }
    changeCurrentStepType(type) {
        this.currentStep = this.workflow.changeStepType(this.currentStep, type);
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", typeof (_a = typeof workflow_1.Workflow !== "undefined" && workflow_1.Workflow) === "function" && _a || Object)
], EditorState.prototype, "workflow", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", typeof (_b = typeof workflow_1.WorkflowStep !== "undefined" && workflow_1.WorkflowStep) === "function" && _b || Object)
], EditorState.prototype, "currentStep", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], EditorState.prototype, "catalog", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], EditorState.prototype, "setCatalog", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EditorState.prototype, "selectInitialStep", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof workflow_1.WorkflowStep !== "undefined" && workflow_1.WorkflowStep) === "function" && _c || Object]),
    __metadata("design:returntype", void 0)
], EditorState.prototype, "selectStep", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EditorState.prototype, "clearSelectedStep", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof workflow_1.WorkflowStep !== "undefined" && workflow_1.WorkflowStep) === "function" && _d || Object]),
    __metadata("design:returntype", void 0)
], EditorState.prototype, "deleteStep", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof workflow_2.StepType !== "undefined" && workflow_2.StepType) === "function" && _e || Object]),
    __metadata("design:returntype", void 0)
], EditorState.prototype, "changeCurrentStepType", null);
exports.EditorState = EditorState;
;
//import {ImageSource} from './workflow';

});
___scope___.file("modules/workflow-designer/models/workflow.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b, _c, _d;
const mobx_1 = require("mobx");
const workflow_interfaces_1 = require("../workflow-interfaces");
__export(require("../workflow-interfaces"));
class Workflow {
    constructor(workflow) {
        this.steps = [];
        this.workflowVariables = [];
        this.transient = new WorkFlowTransientState();
        this.ignoreFailure = false;
        this.ignoreValidation = false;
        this.ignoreMissing = false;
        if (workflow) {
            Object.assign(this, workflow);
        }
    }
    changeStepType(step, newStepType) {
        let simpleStepTypes = ['sequential', 'service', 'parallel'];
        let newStep = undefined;
        if (simpleStepTypes.indexOf(newStepType) > -1) {
            newStep = new WorkflowStepSimple({ name: '' });
        }
        else if (newStepType === 'compound') {
            newStep = new WorkflowStepCompound({ name: '' });
        }
        if (simpleStepTypes.indexOf(newStepType) > -1 && step.type !== 'compound') {
            Object.assign(newStep, step, { type: newStepType });
        }
        if (newStep) {
            newStep.name = step.name;
            let stepPos = this.findStep(step);
            if (stepPos) {
                this.deleteStep(step, stepPos);
                stepPos.parent.steps.splice(stepPos.index, 0, newStep);
            }
        }
        return newStep;
    }
    deleteStep(step, stepPos, deleteChildren = false) {
        stepPos = stepPos || this.findStep(step);
        if (stepPos) {
            stepPos.parent.steps.splice(stepPos.index, 1);
            if (step.type === 'compound' && !deleteChildren) {
                let steps = step.steps;
                stepPos.parent.steps.splice(stepPos.index, 0, ...(steps.map(a => a)));
            }
        }
    }
    findStep(search, parent) {
        parent = parent || this;
        for (var index = 0; index < parent.steps.length; index++) {
            if (this.test(index, search, parent)) {
                return { parent, index };
            }
            else if (parent.steps[index] instanceof WorkflowStepCompound) {
                let childStep = this.findStep(search, parent.steps[index]);
                if (childStep) {
                    return childStep;
                }
            }
        }
        return undefined;
    }
    get flattenedStepsSimple() {
        return this.getFlattenedSteps(false);
    }
    get flattenedStepsAll() {
        return this.getFlattenedSteps(false);
    }
    stepsBefore(step) {
        if (step) {
            let previousSteps = [];
            let steps = this.flattenedStepsSimple;
            for (let currentStep of steps) {
                if (currentStep !== step) {
                    previousSteps.push(currentStep);
                }
                else {
                    break;
                }
            }
            return previousSteps.map(currentStep => ({ label: currentStep.name, value: currentStep.name }));
        }
        return [];
    }
    getFlattenedSteps(includeCompoundSteps = false) {
        return this.flattenSteps(this.steps, includeCompoundSteps);
    }
    moveStep(step, index, parent = this) {
        let targetEnd = index < parent.steps.length && parent.steps[index];
        this.deleteStep(step, null, true);
        let targetIndex = targetEnd ? parent.steps.indexOf(targetEnd) : parent.steps.length;
        parent.steps.splice(targetIndex, 0, step);
    }
    addStep() {
        let steps = this.flattenedStepsAll, name = 'New step', nameCount = 1;
        while (steps.find(step => step.name === name)) {
            nameCount++;
            name = 'New step (' + nameCount + ')';
        }
        this.steps.push(new WorkflowStepSimple({ name }));
    }
    flattenSteps(steps, includeCompoundSteps = false) {
        let flatSteps = [];
        for (var i = 0; i < steps.length; i++) {
            var step = steps[i];
            if (step.type === 'compound') {
                if (includeCompoundSteps) {
                    flatSteps.push(step);
                }
                flatSteps = flatSteps.concat(this.flattenSteps(step.steps));
            }
            else {
                flatSteps.push(step);
            }
        }
        return flatSteps;
    }
    test(index, test, parent) {
        if (typeof test === 'string') {
            return parent.steps[index].name === test;
        }
        else if (typeof test === 'function') {
            return test(parent.steps[index]);
        }
        else {
            return parent.steps[index] === test;
        }
    }
    static apply(source) {
        let out = Object.assign(new Workflow(), {
            steps: (source.steps || []).map(step => {
                if (step.type === 'compound')
                    return WorkflowStepCompound.apply(step);
                else
                    return WorkflowStepSimple.apply(step);
            })
        });
        tryApply(out, 'workflowVariables', () => out.workflowVariables = source.workflowVariables !== undefined ? cleanKeyValueEntryArray(source.workflowVariables) : [], () => out.workflowVariables = []);
        tryApplyPrimitive(out, 'ignoreFailure', source, 'boolean');
        tryApplyPrimitive(out, 'ignoreValidation', source, 'boolean');
        tryApplyPrimitive(out, 'ignoreMissing', source, 'boolean');
        return out;
    }
    toJS() {
        let out = {
            steps: this.steps.map(step => step.toJS())
        };
        if (this.workflowVariables.length) {
            let arr = cleanKeyValueEntryArray(this.workflowVariables);
            if (arr.length) {
                out.workflowVariables = arr;
            }
        }
        if (this.ignoreFailure !== undefined) {
            out.ignoreFailure = this.ignoreFailure;
        }
        if (this.ignoreValidation !== undefined) {
            out.ignoreValidation = this.ignoreValidation;
        }
        if (this.ignoreMissing !== undefined) {
            out.ignoreMissing = this.ignoreMissing;
        }
        return out;
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], Workflow.prototype, "steps", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], Workflow.prototype, "workflowVariables", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], Workflow.prototype, "transient", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], Workflow.prototype, "ignoreFailure", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], Workflow.prototype, "ignoreValidation", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], Workflow.prototype, "ignoreMissing", void 0);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Workflow.prototype, "flattenedStepsSimple", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Workflow.prototype, "flattenedStepsAll", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], Workflow.prototype, "moveStep", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Workflow.prototype, "addStep", null);
exports.Workflow = Workflow;
class TransientState {
    constructor() {
        this.parseError = [];
        this.errorsDismissed = false;
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], TransientState.prototype, "parseError", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], TransientState.prototype, "errorsDismissed", void 0);
exports.TransientState = TransientState;
//@ts-ignore 
class WorkFlowTransientState extends TransientState {
    constructor() {
        super(...arguments);
        this.parseError = [];
        this.errorsDismissed = false;
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], WorkFlowTransientState.prototype, "parseError", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], WorkFlowTransientState.prototype, "errorsDismissed", void 0);
exports.WorkFlowTransientState = WorkFlowTransientState;
class WorkflowStepBase {
    constructor(step) {
        this.name = '';
        this.transient = new TransientState();
        this.name = step.name;
        Object.assign(this, step);
    }
    static apply(source) {
        return Object.assign(Object.create(WorkflowStepBase.prototype), source);
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], WorkflowStepBase.prototype, "name", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", TransientState)
], WorkflowStepBase.prototype, "transient", void 0);
exports.WorkflowStepBase = WorkflowStepBase;
class StepTransientState extends TransientState {
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], StepTransientState.prototype, "imageSourceTypeSelected", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", typeof (_a = typeof workflow_interfaces_1.HealthType !== "undefined" && workflow_interfaces_1.HealthType) === "function" && _a || Object)
], StepTransientState.prototype, "healthCheckType", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], StepTransientState.prototype, "action", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], StepTransientState.prototype, "healthConfigured", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], StepTransientState.prototype, "readinessConfigured", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", typeof (_b = typeof workflow_interfaces_1.HealthType !== "undefined" && workflow_interfaces_1.HealthType) === "function" && _b || Object)
], StepTransientState.prototype, "readinessCheckType", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], StepTransientState.prototype, "sourceOptions", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], StepTransientState.prototype, "failureOptions", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], StepTransientState.prototype, "environmentConfigured", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], StepTransientState.prototype, "volumesConfigured", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], StepTransientState.prototype, "portsConfigured", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], StepTransientState.prototype, "sourceType", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], StepTransientState.prototype, "explicitSourceIncludes", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], StepTransientState.prototype, "explicitSourceExcludes", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], StepTransientState.prototype, "explicitIncludeVariables", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], StepTransientState.prototype, "explicitExcludeVariables", void 0);
exports.StepTransientState = StepTransientState;
class Health {
    constructor(health) {
        this.type = 'http';
        this.headers = [];
        this.transient = new TransientState();
        Object.assign(this, health);
    }
    static apply(source) {
        let health = Object.assign(new Health({}));
        tryApplyEnum(health, 'type', source, workflow_interfaces_1.HealthTypes, true, () => health.type = 'http');
        if (health.type === 'script') {
            tryApplyPrimitive(health, 'script', source, 'string');
        }
        else if (health.type === 'tcp') {
            tryApplyPrimitive(health, 'port', source, 'string', false, (value) => typeof value === 'number' ? value.toString() : value);
        }
        else {
            tryApplyPrimitive(health, 'port', source, 'string', false, (value) => typeof value === 'number' ? value.toString() : value);
            tryApplyPrimitive(health, 'path', source, 'string');
            tryApply(health, 'headers', () => health.headers = source.headers !== undefined ? cleanKeyValueEntryArray(source.headers) : [], () => health.headers = []);
        }
        tryApplyPrimitive(health, 'interval', source, 'number');
        tryApplyPrimitive(health, 'timeout', source, 'number');
        tryApplyPrimitive(health, 'retries', source, 'number');
        tryApplyPrimitive(health, 'grace', source, 'number');
        return health;
    }
    filled() {
        let keys = Object.keys(this);
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] !== 'transient') {
                if (keys[i] === 'headers') {
                    if (this[keys[i]] && this[keys[i]].length > 0) {
                        return true;
                    }
                }
                else if (keys[i] !== 'type' && this[keys[i]] !== undefined) {
                    return true;
                }
            }
        }
        return false;
    }
    toJS() {
        if (!this.filled()) {
            return undefined;
        }
        let out = fillObj(mobx_1.toJS(this));
        Health.cleanupJSFields(out);
        return out;
    }
    static cleanupJSFields(obj) {
        if (obj.type === 'script') {
            delete obj.port;
            delete obj.path;
            delete obj.headers;
        }
        else if (obj.type === 'tcp') {
            delete obj.script;
            delete obj.path;
            delete obj.headers;
        }
        else if (obj.type === 'http' || obj.type === 'https') {
            delete obj.script;
            if (obj.headers && obj.headers.length === 0) {
                delete obj.headers;
            }
            else {
                obj.headers = cleanKeyValueEntryArray(obj.headers);
            }
        }
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", typeof (_c = typeof workflow_interfaces_1.HealthType !== "undefined" && workflow_interfaces_1.HealthType) === "function" && _c || Object)
], Health.prototype, "type", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], Health.prototype, "script", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], Health.prototype, "port", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], Health.prototype, "path", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], Health.prototype, "interval", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], Health.prototype, "timeout", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], Health.prototype, "retries", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], Health.prototype, "grace", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], Health.prototype, "headers", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", TransientState)
], Health.prototype, "transient", void 0);
exports.Health = Health;
class Readiness extends Health {
    constructor(readiness) {
        super(readiness);
        Object.assign(this, readiness);
    }
    static apply(source) {
        let readiness = Object.assign(new Readiness({}), super.apply(source));
        tryApplyPrimitive(readiness, 'skipCheck', source, 'boolean');
        return readiness;
    }
    toJS() {
        if (!this.filled()) {
            return undefined;
        }
        let out = fillObj(mobx_1.toJS(this));
        Health.cleanupJSFields(out);
        return out;
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], Readiness.prototype, "skipWait", void 0);
exports.Readiness = Readiness;
class WorkflowStepSimple extends WorkflowStepBase {
    constructor(step) {
        super(step);
        this.type = 'sequential';
        this.transient = new StepTransientState();
        this.imageSource = 'image';
        this.image = '';
        this.dockerfile = '';
        this.target = '';
        this.generator = '';
        this.script = '';
        this.omitSource = false;
        this.ignoreFailure = false;
        this.ignoreValidation = false;
        this.ignoreMissing = false;
        this.sourceLocation = '';
        this.health = new Health({});
        this.readiness = new Readiness({});
        this.environment = [];
        this.ports = [];
        this.volumes = [];
        this.dockerignore = '';
        this.sourceIncludes = [];
        this.sourceExcludes = [];
        this.includeVariables = [];
        this.excludeVariables = [];
        Object.assign(this, step);
    }
    static apply(source) {
        let step = Object.assign(new WorkflowStepSimple(source));
        tryApply(step, 'health', () => {
            step.health = source.health !== undefined ? Health.apply(source.health) : new Health({});
            if (step.health.transient.parseError.length) {
                throw Error;
            }
        });
        tryApply(step, 'readiness', () => {
            step.readiness = source.readiness !== undefined ? Readiness.apply(source.readiness) : new Readiness({});
            if (step.readiness.transient.parseError.length) {
                throw Error;
            }
        });
        tryApply(step, 'environment', () => step.environment = source.environment !== undefined ? cleanKeyValueEntryArray(source.environment) : [], () => { step.environment = []; });
        tryApply(step, 'volumes', () => step.volumes = source.volumes !== undefined ? cleanVolumes(source.volumes) : [], () => step.volumes = []);
        tryApply(step, 'ports', () => step.ports = source.ports !== undefined ? cleanPortEntryArray(source.ports) : [], () => { step.ports = []; });
        tryApply(step, 'includeVariables', () => {
            if (source.includeVariables !== undefined) {
                if (!Array.isArray(source.includeVariables)) {
                    step.includeVariables = [source.includeVariables];
                }
                else {
                    step.includeVariables = source.includeVariables;
                }
            }
            else {
                step.includeVariables = ['*'];
            }
            step.transient.explicitIncludeVariables = source.includeVariables !== undefined;
        }, () => step.includeVariables = ['*']);
        tryApply(step, 'excludeVariables', () => {
            if (source.excludeVariables !== undefined) {
                if (!Array.isArray(source.excludeVariables)) {
                    step.excludeVariables = [source.excludeVariables];
                }
                else {
                    step.excludeVariables = source.excludeVariables;
                }
            }
            else {
                step.excludeVariables = [];
            }
            step.transient.explicitExcludeVariables = source.includeVariables !== undefined;
        }, () => step.excludeVariables = []);
        tryApplyPrimitive(step, 'name', source, 'string', false);
        tryApplyEnum(step, 'type', source, workflow_interfaces_1.StepTypes, false);
        tryApplyEnum(step, 'imageSource', source, workflow_interfaces_1.ImageSources);
        tryApplyPrimitive(step, 'dockerignore', source, 'string');
        tryApplyPrimitive(step, 'image', source, 'string');
        tryApplyPrimitive(step, 'dockerfile', source, 'string');
        tryApplyPrimitive(step, 'target', source, 'string');
        tryApplyPrimitive(step, 'generator', source, 'string');
        tryApplyPrimitive(step, 'script', source, 'string');
        tryApplyPrimitive(step, 'omitSource', source, 'boolean');
        tryApplyPrimitive(step, 'ignoreFailure', source, 'boolean');
        tryApplyPrimitive(step, 'ignoreValidation', source, 'boolean');
        tryApplyPrimitive(step, 'ignoreMissing', source, 'boolean');
        tryApplyPrimitive(step, 'sourceLocation', source, 'string');
        return step;
    }
    get action() {
        if (this.transient && this.transient.action) {
            return this.transient.action;
        }
        else if (this.dockerfile) {
            return 'dockerfile';
        }
        else if (this.target) {
            return 'call';
        }
        else if (this.generator) {
            return 'generated';
        }
        return 'script';
    }
    toJS() {
        let out = fillObj(mobx_1.toJS(this));
        if (out.type === 'service') {
            let health = this.health.toJS();
            health ? out.health = health : delete out.health;
            let readiness = this.readiness.toJS();
            readiness ? out.readiness = readiness : delete out.readiness;
        }
        else {
            delete out.health;
            delete out.readiness;
        }
        if (out.type === 'sequential') {
            delete out.type;
        }
        if (this.action !== 'script' && this.action !== 'generated') {
            this.deleteScriptStepFields(out);
        }
        if (this.action !== 'script') {
            delete out.script;
        }
        if (this.action !== 'dockerfile' && this.action !== 'generated') {
            delete out.includeVariables;
            delete out.excludeVariables;
        }
        else {
            if (this.action !== 'generated') {
                delete out.generator;
            }
            if (this.action !== 'dockerfile') {
                delete out.dockerfile;
            }
            if (this.transient.explicitExcludeVariables) {
                out.excludeVariables = this.excludeVariables || [];
            }
            if (this.transient.explicitIncludeVariables) {
                out.includeVariables = this.includeVariables || [];
            }
        }
        if (this.action !== 'call') {
            delete out.target;
        }
        if (out.imageSource === 'image') {
            delete out.imageSource;
        }
        if (out.environment && out.environment.length === 0) {
            delete out.environment;
        }
        else if (out.environment) {
            out.environment = cleanKeyValueEntryArray(out.environment);
        }
        if (out.ports && out.ports.length === 0) {
            delete out.ports;
        }
        if (out.volumes && out.volumes.length === 0) {
            delete out.volumes;
        }
        return out;
    }
    deleteScriptStepFields(step) {
        delete step.environment;
        delete step.generator;
        delete step.health;
        delete step.ignoreFailure;
        delete step.ignoreMissing;
        delete step.ignoreValidation;
        delete step.image;
        delete step.omitSource;
        delete step.dockerignore;
        delete step.ports;
        delete step.readiness;
        delete step.script;
        delete step.sourceLocation;
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", StepTransientState)
], WorkflowStepSimple.prototype, "transient", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", typeof (_d = typeof workflow_interfaces_1.ImageSource !== "undefined" && workflow_interfaces_1.ImageSource) === "function" && _d || Object)
], WorkflowStepSimple.prototype, "imageSource", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], WorkflowStepSimple.prototype, "image", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], WorkflowStepSimple.prototype, "dockerfile", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], WorkflowStepSimple.prototype, "target", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], WorkflowStepSimple.prototype, "generator", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], WorkflowStepSimple.prototype, "script", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], WorkflowStepSimple.prototype, "omitSource", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], WorkflowStepSimple.prototype, "ignoreFailure", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], WorkflowStepSimple.prototype, "ignoreValidation", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Boolean)
], WorkflowStepSimple.prototype, "ignoreMissing", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], WorkflowStepSimple.prototype, "sourceLocation", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Health)
], WorkflowStepSimple.prototype, "health", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Readiness)
], WorkflowStepSimple.prototype, "readiness", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], WorkflowStepSimple.prototype, "environment", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], WorkflowStepSimple.prototype, "ports", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], WorkflowStepSimple.prototype, "volumes", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], WorkflowStepSimple.prototype, "dockerignore", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], WorkflowStepSimple.prototype, "sourceIncludes", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], WorkflowStepSimple.prototype, "sourceExcludes", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], WorkflowStepSimple.prototype, "includeVariables", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], WorkflowStepSimple.prototype, "excludeVariables", void 0);
exports.WorkflowStepSimple = WorkflowStepSimple;
class WorkflowStepCompound extends WorkflowStepBase {
    constructor(step) {
        super(step);
        this.type = 'compound';
        this.steps = [];
        Object.assign(this, step);
    }
    static apply(source) {
        return Object.assign(new WorkflowStepCompound({}), source, {
            type: 'compound',
            steps: (source.steps || []).map(step => {
                if (step.type === 'compound')
                    return WorkflowStepCompound.apply(step);
                else
                    return WorkflowStepSimple.apply(step);
            })
        });
    }
    toJS() {
        return {
            name: this.name,
            type: this.type,
            steps: this.steps.map(step => step.toJS())
        };
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Array)
], WorkflowStepCompound.prototype, "steps", void 0);
exports.WorkflowStepCompound = WorkflowStepCompound;
function fillObj(source) {
    let out = {}, keys = Object.keys(source);
    for (var i = 0; i < keys.length; i++) {
        if (typeof source[keys[i]] !== 'function' && keys[i] !== 'transient') {
            out[keys[i]] = source[keys[i]];
        }
    }
    return out;
}
function cleanKeyValueEntryArray(source) {
    let out = [];
    try {
        if (!Array.isArray(source) && !mobx_1.isObservableArray(source)) {
            throw Error;
        }
        for (var i = 0; i < source.length; i++) {
            if (source[i].file) {
                out.push({ file: source[i].file });
            }
            else {
                out.push({ name: source[i].name, value: source[i].name });
            }
        }
    }
    catch (e) {
        console.error(e);
        throw "Structure error parsing KeyValueEntry";
    }
    return out;
}
function cleanPortEntryArray(source) {
    let out = [];
    try {
        if (!Array.isArray(source) && !mobx_1.isObservableArray(source)) {
            throw Error;
        }
        for (var i = 0; i < source.length; i++) {
            out.push({
                name: source[i].name || undefined,
                internalPort: source[i].internalPort || undefined,
                externalPort: source[i].externalPort || undefined,
                containerPort: source[i].containerPort,
                protocol: source[i].protocol || 'tcp'
            });
        }
    }
    catch (e) {
        console.error(e);
        throw "Structure error parsing PortEntry";
    }
    return out;
}
function cleanVolumes(source) {
    let out = [];
    try {
        if (!Array.isArray(source) && !mobx_1.isObservableArray(source)) {
            throw Error;
        }
        for (var i = 0; i < source.length; i++) {
            out.push({ hostPath: source[i].hostPath, mountPath: source[i].mountPath });
        }
    }
    catch (e) {
        console.error(e);
        throw "Structure error parsing Volumes";
    }
    return out;
}
function cleanPorts(source) {
    let out = [];
    try {
        if (!Array.isArray(source) && !mobx_1.isObservableArray(source)) {
            throw Error;
        }
        for (var i = 0; i < source.length; i++) {
            if (source[i] !== undefined) {
                if (typeof source[i] !== 'string') {
                    throw "Structure error parsing ports";
                }
                out.push(source[i]);
            }
        }
    }
    catch (e) {
        throw "Structure error parsing ports";
    }
    return out;
}
exports.cleanPorts = cleanPorts;
function tryApply(obj, key, fn, catchFn) {
    let success;
    try {
        success = fn();
    }
    catch (e) {
        success = false;
    }
    if (success === false) {
        obj.transient.parseError.push(key);
        catchFn && catchFn();
    }
    return success;
}
function tryApplyPrimitive(obj, key, source, type, require = false, cast) {
    return tryApply(obj, key, () => {
        if (require || source[key] !== undefined) {
            let value = source[key];
            if (cast) {
                value = cast(value);
            }
            if (typeof value === type) {
                obj[key] = value;
            }
            else
                throw "type error on field " + key;
        }
    });
}
function tryApplyEnum(obj, key, source, enumVals, require = false, catchFn) {
    return tryApply(obj, key, () => {
        if (require || source[key] !== undefined) {
            if (enumVals.indexOf(source[key]) > -1) {
                obj[key] = source[key];
            }
            else
                throw Error;
        }
    }, catchFn);
}
;
//import { keysOfIHealth,keysOfIReadiness,keysOfIWorkflowStepSimple} from '../workflow-interfaces';

});
___scope___.file("modules/workflow-designer/workflow-interfaces.js", function(exports, require, module, __filename, __dirname){

"use strict";
//import { observable } from "mobx";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageSources = {
    image: '',
    step: ''
};
exports.ImageSources = Object.keys(exports.imageSources);
exports.stepTypes = {
    sequential: '',
    parallel: '',
    service: '',
    compound: ''
};
exports.StepTypes = Object.keys(exports.stepTypes);
exports.healthTypes = {
    http: '',
    https: '',
    tcp: '',
    script: ''
};
exports.HealthTypes = Object.keys(exports.healthTypes);
function isStepType(x) {
    return exports.stepTypes.hasOwnProperty(x);
}
exports.isStepType = isStepType;
exports.keysOfIHealth = [
    "type", "script", "port", "path",
    "interval", "retries", "grace", "timeout", "headers"
];
exports.keysOfIReadiness = [
    "type", "script", "port", "path", "skipCheck",
    "interval", "retries", "grace", "timeout", "headers"
];
exports.keysOfIWorkflowStepSimple = [
    "imageSource", "image", "target",
    "generator", "script", "omitSource", "sourceLocation",
    "ignoreFailure", "ignoreValidation", "ignoreMissing",
    "includeVariables", "excludeVariables", "dockerignore",
    "ignoreFailure", "health", "readiness", "environment",
    "ports", "volumes", "dockerfile", "name", "type"
];

});
___scope___.file("modules/workflow-designer/services/workflow_service.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WorkflowService {
    constructor() {
        this._urlBase = 'https://s3-eu-west-1.amazonaws.com/dev.stack.foundation/catalog/';
        this.catalogInfoHtmlStrings = {};
    }
    // constructor (private http: HttpService) {
    // }
    get urlBase() {
        return this._urlBase;
    }
    // public catalogInfoHtml (key: string): Observable<string> {
    //     if (this.catalogInfoHtmlStrings[key]) {
    //         return Observable.of(this.catalogInfoHtmlStrings[key]);
    //     }
    //     return this.http.get(this._urlBase + key + '.md')
    //         .map(response => {
    //             // this.catalogInfoHtmlStrings[key] = (new Showdown.Converter()).makeHtml(response.text());
    //             return this.catalogInfoHtmlStrings[key];
    //         });
    // }
    getWorkflowImagesCatalog(refresh = false) {
        if (this.catalogImages && !refresh) {
            return Promise.resolve(this.catalogImages);
        }
        else {
            return fetch(this._urlBase + 'catalog.json')
                .then(response => response.json())
                .then(catalog => {
                this.catalogImages = catalog;
                return this.catalogImages;
            });
        }
    }
    downloadYAML(workflow, filename = 'workflow.yaml') {
        // let data = yaml.safeDump(workflow, {skipInvalid: true}),
        //     blob = new Blob([data], {type: 'application/x-yaml'});
        // if(this.windowService.window.navigator.msSaveOrOpenBlob) {
        //     window.navigator.msSaveBlob(blob, filename);
        // }
        // else{
        //     var elem = this.windowService.window.document.createElement('a');
        //     elem.href = this.windowService.window.URL.createObjectURL(blob);
        //     elem.download = filename;        
        //     document.body.appendChild(elem);
        //     elem.click();        
        //     document.body.removeChild(elem);
        // }
    }
}
exports.WorkflowService = WorkflowService;

});
___scope___.file("modules/workflow-designer/components/workflow-editor.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const AngleDown = require('react-icons/lib/fa/angle-down');
const AngleUp = require('react-icons/lib/fa/angle-up');
const ReactTooltip = require('react-tooltip');
require("../util/translations");
const translation_service_1 = require("../services/translation-service");
const step_editor_1 = require("./step-editor/step-editor");
const step_list_1 = require("./step-list");
const variables_editor_1 = require("../components/step-editor/variables-editor");
const failure_options_1 = require("../components/step-editor/failure-options");
const variable_editor_1 = require("../components/step-editor/variable-editor");
let injectSheet = require('react-jss').default;
const style_1 = require("../style");
const styles = (theme) => {
    let list = style_1.listStyles(theme);
    let section = style_1.sectionStyles(theme);
    list.rootListTree.marginBottom = '0px';
    list.listItem.fontSize = '1.2em';
    list.listItem.paddingLeft = '0px';
    list.listItem.fontWeight = 'bold';
    list.listTitle.color = theme.ide ? undefined : '#666';
    return Object.assign({
        form: {
            composes: theme.ide ? '' : 'pure-form',
        },
        editor: {
            composes: `pure-g padded workflow-editor ${theme.ide ? 'base-ide-style' : 'base-web-style'}`,
            [style_1.mediaQueries.md]: {
                padding: theme.ide ? '' : '0px 15px',
            },
        },
        tooltipWrapper: {
            composes: 'pure-u-1',
            position: 'absolute'
        },
        tooltip: {
            composes: theme.ide ? 'ide-tooltip' : '',
        },
        listWrapper: {
            composes: `pure-u-1 pure-u-md-1-4 ${theme.ide ? 'block' : ''}`,
            padding: '10px',
            position: 'relative',
            margin: '10px 0px',
            background: theme.ide ? undefined : '#eee',
            [style_1.mediaQueries.md]: {
                background: theme.ide ? undefined : 'transparent',
                padding: '0px',
                paddingRight: '10px',
                margin: '0px',
            },
        },
        listWrapperTopShadow: Object.assign({
            [style_1.mediaQueries.md]: {
                display: 'none',
            },
        }, style_1.shadows.top),
        listWrapperBottomShadow: Object.assign({
            [style_1.mediaQueries.md]: {
                display: 'none',
            },
        }, style_1.shadows.bottom),
        list: {
            composes: theme.ide ? 'inset-panel padded' : '',
            '&.closed': {
                display: 'none',
                [style_1.mediaQueries.md]: {
                    display: 'block',
                },
            }
        },
        mainEditor: {
            composes: `pure-u-1 pure-u-md-3-4 ${theme.ide ? 'block' : ''}`,
            padding: '0px 10px',
            [style_1.mediaQueries.md]: {
                padding: '0px',
            },
        },
        workflowVarsCount: theme.ide ? {
            composes: 'badge badge-info',
            marginRight: '5px',
        } : {
            marginRight: '5px',
            padding: '0.375em 0.6em',
            minWidth: '1.875em',
            fontWeight: 'normal',
            color: 'white',
            borderRadius: '2em',
            backgroundColor: style_1.themeColors.darkerGreen
        },
        listMobileHeader: {
            textAlign: 'center',
            '& > h3': {
                marginTop: '10px',
                marginBottom: '0px'
            },
            '& > hr': {
                marginBottom: '0px'
            },
            [style_1.mediaQueries.md]: {
                display: 'none',
            }
        },
        listMobileSwitch: {
            fontSize: '2em',
            lineHeight: '0.5em',
        }
    }, list, section);
};
let WorkflowEditor = class WorkflowEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            section: 'workflow',
            mobileMenuOpen: false
        };
    }
    selectStep(step) {
        this.setState({ section: 'step' });
    }
    componentWillMount() {
        if (this.props.workflow.steps.length) {
            this.props.state.selectInitialStep();
            this.selectStep(this.props.workflow.steps[0]);
        }
        else {
            this.selectSection('workflow');
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.workflow !== this.props.workflow) {
            if (nextProps.workflow.steps.length) {
                this.props.state.selectInitialStep();
                this.selectStep(nextProps.workflow.steps[0]);
            }
            else {
                this.selectSection('workflow');
            }
        }
    }
    selectSection(section) {
        this.setState({ section });
        this.props.state.clearSelectedStep();
    }
    get selectedItemDescription() {
        //let out = '';
        if (this.state.section === 'workflow') {
            return translation_service_1.translate('TITLE_WORKFLOW_VARIABLES');
        }
        else {
            return 'Step - ' + this.props.state.currentStep.name;
        }
    }
    render() {
        let classes = this.props.classes || {}, workflowVarCount = this.props.workflow ? this.props.workflow.workflowVariables.length : 0;
        return (React.createElement("div", { className: classes.editor },
            React.createElement("div", { className: classes.tooltipWrapper },
                React.createElement(ReactTooltip, { id: "workflowEditor", effect: "solid", class: classes.tooltip, html: true })),
            React.createElement("div", { className: classes.listWrapper },
                React.createElement("div", { className: classes.listMobileHeader, onClick: () => this.setState({ mobileMenuOpen: !this.state.mobileMenuOpen }) },
                    React.createElement("h3", null, this.selectedItemDescription),
                    React.createElement("hr", null),
                    React.createElement("span", { className: classes.listMobileSwitch }, this.state.mobileMenuOpen ? React.createElement(AngleUp, null) : React.createElement(AngleDown, null))),
                React.createElement("div", { className: classes.listWrapperTopShadow }),
                React.createElement("div", { className: classes.listWrapperBottomShadow }),
                React.createElement("div", { className: [classes.list, this.state.mobileMenuOpen ? 'open' : 'closed'].join(' ') },
                    React.createElement("ul", { className: classes.rootListTree },
                        React.createElement("li", { className: [classes.listItem, this.state.section === 'workflow' ? classes.listItemSelected : ''].join(' '), onClick: e => this.selectSection('workflow') },
                            React.createElement("span", null,
                                React.createElement("span", null, translation_service_1.translate('TITLE_WORKFLOW'))))),
                    React.createElement("h3", { className: [classes.listTitle, this.state.section === 'step' ? classes.listItemSelected : ''].join(' ') }, translation_service_1.translate('TITLE_STEPS')),
                    React.createElement(step_list_1.StepList, { state: this.props.state, onStepSelect: step => this.selectStep(step) }),
                    this.props.children)),
            React.createElement("div", { className: classes.mainEditor },
                this.state.section === 'step' &&
                    React.createElement(step_editor_1.StepEditor, { state: this.props.state, ide: this.props.state.ide, scriptEditorFactory: this.props.state.scriptEditorFactory, sfLinkFactory: this.props.state.sfLinkFactory, catalog: this.props.state.catalog, workflow: this.props.workflow, step: this.props.state.currentStep }),
                this.state.section === 'workflow' &&
                    React.createElement("form", { className: classes.form },
                        React.createElement("div", { className: [classes.section, workflowVarCount.toString()].join(' ') },
                            React.createElement("div", { className: classes.sectionTitle }, translation_service_1.translate('TITLE_WORKFLOW_VARIABLES')),
                            React.createElement("div", { className: classes.sectionBody },
                                React.createElement(variables_editor_1.VariablesEditor, { variables: this.props.workflow ? this.props.workflow.workflowVariables : [], ide: this.props.state.ide, sourceEditorFactory: variable_editor_1.variableEditorFactory, sourceFactory: variable_editor_1.variableSourceFactory }))),
                        React.createElement("div", { className: classes.section },
                            React.createElement("div", { className: classes.sectionTitle }, translation_service_1.translate('TITLE_WORKFLOW_FAILURE')),
                            React.createElement("div", { className: classes.sectionBody },
                                React.createElement(failure_options_1.FailureOptions, { obj: this.props.workflow })))))));
    }
};
WorkflowEditor = __decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    __metadata("design:paramtypes", [Object])
], WorkflowEditor);
exports.WorkflowEditor = WorkflowEditor;
//import 'purecss/build/pure.css';
//import 'purecss/build/grids-responsive.css';
//import 'react-select/dist/react-select.css';
//import 'react-virtualized/styles.css';
//import 'react-virtualized-select/styles.css';

});
___scope___.file("modules/workflow-designer/util/translations.js", function(exports, require, module, __filename, __dirname){

window.translations = Object.assign(window.translations || {}, {
    ADD_STEP: 'Add Step',
    CONFIGURE: 'Add additional configuration',
    CONFIGURE_HEALTH: 'Health check',
    CONFIGURE_ENVIRONMENT: 'Environment variables',
    CONFIGURE_FAILURE: 'Failure behavior',
    CONFIGURE_SOURCE: 'Source availability',
    CONFIGURE_VOLUMES: 'Volumes',
    CONFIGURE_PORTS: 'Ports',
    CONFIGURE_READINESS: 'Readiness check',
    DELETE: 'Delete',
    HELP_HEALTH_TEXT: 'Configure the check that determines whether the service started by this step is healthy',
    HELP_HEALTH_LINK: 'Read more about health checks in the documentation',
    HELP_ENVIRONMENT_TEXT: 'Environment variables that you want to be made available to the Docker container that is run for this step',
    HELP_ENVIRONMENT_LINK: 'Read more about environment variables in the documentation',
    HELP_FAILURE_TEXT: 'Configure what happens when a particular step fails',
    HELP_FAILURE_LINK: 'Read more about failure behavior in the documentation',
    HELP_SOURCE_TEXT: 'Change how your project source files are made available to the Docker container that is run for this step',
    HELP_SOURCE_LINK: 'Read more about source availability in the documentation',
    HELP_VOLUMES_TEXT: 'Volumes are paths relative to your project source folder that you want available in the Docker container for this step',
    HELP_VOLUMES_LINK: 'Read more about volumes in the documentation',
    HELP_PORTS_TEXT: 'Configure the ports on the Docker container for this step that should be exposed',
    HELP_PORTS_LINK: 'Read more about exposing ports in the documentation',
    HELP_READINESS_TEXT: 'Configure the check that determines whether the service started by this step is considered ready',
    HELP_READINESS_LINK: 'Read more about readiness checks in the documentation',
    INSTRUCTION_PORTS: 'Enter a valid port number ( format: [tcp|udp/]sourcePort[:targetContainerPort] )',
    INSTRUCTION_INCLUDE_VARIABLES: 'Add variables to include in the workflow. "*" will include all.',
    INSTRUCTION_EXCLUDE_VARIABLES: 'Add variables to exclude in the workflow. "*" will exclude all.',
    INSTRUCTION_SOURCE_EXCLUDES: 'Add file glob patterns to exclude in the workflow. "*" will exclude all.',
    INSTRUCTION_SOURCE_INCLUDES: 'Add file glob patterns to include in the workflow. "*" will include all.',
    LABEL_CONTAINER_PORT: 'Container port',
    LABEL_INTERNAL_PORT: 'Internal port',
    LABEL_EXTERNAL_PORT: 'External port',
    LABEL_PROTOCOL: 'Protocol',
    LABEL_DOCKERFILE: 'Dockerfile',
    LABEL_DOCKERIGNORE: 'dockerignore file',
    LABEL_EXCLUDE_VARIABLES: 'Variables to exclude',
    LABEL_FILE: 'File',
    LABEL_GENERATOR: 'Generator',
    LABEL_GRACE: 'Initial grace period (in seconds)',
    LABEL_HOST_PATH: 'Host path',
    LABEL_INCLUDE_VARIABLES: 'Variables to include',
    LABEL_INTERVAL: 'Interval between checks (in seconds)',
    LABEL_MOUNT_PATH: 'Mount path',
    LABEL_NAME: 'Name',
    LABEL_PATH: 'Path',
    LABEL_PORT: 'Port',
    LABEL_RETRIES: 'Number of retry attempts',
    LABEL_SCRIPT: 'Script',
    LABEL_SERVICE_NAME: 'Service Name',
    LABEL_TIMEOUT: 'Timeout for check (in seconds)',
    LABEL_VALUE: 'Value',
    LABEL_VARIABLE_PROMPT: 'Add variable {}',
    LABEL_SOURCE_EXCLUDES: 'File exclude patterns',
    LABEL_SOURCE_INCLUDES: 'File include patterns',
    LABEL_WORKFLOW: 'Workflow',
    OPTION_HTTP: 'HTTP port readiness',
    OPTION_HTTPS: 'HTTPS port readiness',
    OPTION_IGNORE_FAILURE: 'If step fails, continue running rest of workflow',
    OPTION_IGNORE_MISSING: 'Ignore missing variables when expanding variable placeholders',
    OPTION_IGNORE_VALIDATION: 'Ignore any validation errors',
    OPTION_OMIT_SOURCE: 'Do not mount the project source for this step',
    OPTION_NOSOURCE: 'No source',
    OPTION_DOCKERIGNORE: 'Use dockerignore',
    OPTION_INCLUDEEXCLUDE: 'Set patterns',
    OPTION_SKIP_WAIT: 'Skip waiting for this readiness check before starting following step',
    OPTION_SCRIPT: 'Health check script',
    OPTION_TCP: 'TCP port readiness',
    PLACEHOLDER_IMAGE: 'Select image for step...',
    PLACEHOLDER_PORTS: 'Add ports...',
    PLACEHOLDER_VERSION: 'Select version...',
    PLACEHOLDER_TYPE: 'Select step type...',
    PLACEHOLDER_VARIABLES: 'Add variables...',
    PLACEHOLDER_SOURCE_EXCLUDES: 'Add patterns...',
    PLACEHOLDER_SOURCE_INCLUDES: 'Add patterns...',
    RUN_CALL: 'Call another workflow',
    RUN_GENERATED: 'Generate and run a workflow',
    RUN_SCRIPT: 'Run a script',
    RUN_DOCKERFILE: 'Use an existing Dockerfile',
    SELECT_TEXT_CREATE_PORT: 'Create {} port {} mapped to target container port {}',
    SOURCE_CATALOG: 'Use official Docker image',
    SOURCE_MANUAL: 'Use custom Docker image',
    SOURCE_STEP: 'Use final state of previous step as image',
    TITLE_ENVIRONMENT: 'Environment variables',
    TITLE_FAILURE: 'Behavior on step failure',
    TITLE_SOURCE: 'Project source availability',
    TITLE_VOLUMES: 'Volumes',
    TITLE_PORTS: 'Exposed ports',
    TITLE_READINESS: 'Readiness check',
    TITLE_HEALTH: 'Health check',
    TITLE_STEPS: 'Steps',
    TITLE_WORKFLOW: 'Workflow',
    TITLE_WORKFLOW_VARIABLES: 'Workflow Variables',
    TITLE_WORKFLOW_FAILURE: 'General behavior on step failure',
    STEP_HAS_ERRORS: 'This step had errors in the workflow definition in the following fields: {}.',
    TYPE_DESCRIPTION_COMPOUND: 'Wait for all sub-steps to complete or be healthy',
    TYPE_DESCRIPTION_SEQUENTIAL: 'Workflow will wait for the step to complete',
    TYPE_DESCRIPTION_PARALLEL: 'Workflow will not wait for this step to complete',
    TYPE_DESCRIPTION_SERVICE: 'Workflow will wait for this step to be healthy',
    TYPE_NAME_COMPOUND: 'Compound Step',
    TYPE_NAME_SEQUENTIAL: 'Sequential Step',
    TYPE_NAME_PARALLEL: 'Parallel Step',
    TYPE_NAME_SERVICE: 'Service Step'
});

});
___scope___.file("modules/workflow-designer/services/translation-service.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function translate(_key, _args) {
    let key, args = [];
    if (typeof _key === 'string') {
        key = _key;
    }
    else {
        key = _key[0];
        args = args.concat(_key.slice(1));
    }
    if (_args) {
        if (Array.isArray(_args)) {
            args = args.concat(_args);
        }
        else {
            args.push(_args);
        }
    }
    let translated = undefined;
    if (window.translations) {
        translated = window.translations[key];
    }
    if (translated === undefined) {
        console.warn('No translation defined for "%s"', key);
        translated = key;
    }
    else {
        for (var i = 0; i < args.length; i++) {
            let position = translated.indexOf('{}');
            if (position < 0) {
                break;
            }
            translated = translated.substring(0, position) + args[i] + translated.substring(position + 2);
        }
    }
    return translated;
}
exports.translate = translate;

});
___scope___.file("modules/workflow-designer/components/step-editor/step-editor.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
const React = require("react");
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
let injectSheet = require('react-jss').default;
const step_type_select_1 = require("../step-type-select");
const simple_step_editor_1 = require("./simple-step-editor");
const centered_content_1 = require("../../util/centered-content");
const react_1 = require("react");
const validating_react_component_1 = require("../react-forms/validating-react-component");
const style_1 = require("../../style");
const translation_service_1 = require("../../services/translation-service");
const error_panel_1 = require("../../components/error-panel");
;
const styles = (theme) => {
    return {
        form: {
            composes: theme.ide ? '' : 'pure-form',
        },
        formInner: {
            minWidth: '100%'
        },
        stepNameDiv: {
            composes: 'pure-g pure-u-1 pure-u-lg-1-2 block-md',
            position: 'relative',
            [style_1.mediaQueries.lg]: {
                marginBottom: '0px'
            }
        },
        stepNameLabel: {
            composes: 'pure-u-1-4 pure-u-md-1-6 pure-u-lg-1-3',
            fontSize: theme.ide ? '2em' : '26px',
            paddingRight: '10px',
            height: '100%',
            textAlign: 'right',
            '& > label': {
                height: '100%'
            }
        },
        stepNameInputDiv: {
            composes: 'pure-u-3-4 pure-u-md-5-6 pure-u-lg-2-3',
            height: '100%'
        },
        stepNameInput: {
            composes: 'pure-u-1 input-text native-key-bindings',
            height: '100%',
            margin: '0 !important',
            fontSize: theme.ide ? '2em' : '26px',
        },
        stepTypeInputDiv: {
            composes: 'pure-u-1 pure-u-lg-1-2 step-type-input',
            [style_1.mediaQueries.lg]: {
                paddingLeft: '10px'
            }
        }
    };
};
let StepEditor = class StepEditor extends validating_react_component_1.FormReactComponent {
    constructor(props) {
        super(props);
        this.onTypeChange = (type) => {
            this.props.state.changeCurrentStepType(type);
        };
        this.nameField = this.createField('props.step.name', value => {
            let errors = [], stepFoundPos = this.props.workflow.findStep(step => step.name === value);
            if (!value || value.length === 0) {
                errors.push('requiredField');
            }
            if (stepFoundPos && stepFoundPos.parent.steps[stepFoundPos.index] !== this.props.step) {
                errors.push('nameConflict');
            }
            return errors;
        });
    }
    dismissErrors() {
        this.props.step.transient.errorsDismissed = true;
    }
    render() {
        let classes = this.props.classes;
        return (React.createElement("form", { className: classes.form },
            React.createElement("fieldset", { className: classes.formInner },
                this.props.step.transient.parseError.length > 0 && !this.props.step.transient.errorsDismissed &&
                    React.createElement(error_panel_1.ErrorPanel, { message: translation_service_1.translate('STEP_HAS_ERRORS', this.props.step.transient.parseError.join(', ')), onClose: () => this.dismissErrors() }),
                React.createElement("div", { className: "pure-g block" },
                    React.createElement("div", { className: classes.stepNameDiv },
                        React.createElement("div", { className: classes.stepNameLabel },
                            React.createElement(centered_content_1.CenteredContent, null, "Step:")),
                        React.createElement("div", { className: classes.stepNameInputDiv },
                            React.createElement("input", { type: "text", className: classes.stepNameInput, name: "name", value: this.nameField.fieldVal || '', onChange: e => this.onNameChange(e) }))),
                    React.createElement("div", { className: classes.stepTypeInputDiv },
                        React.createElement(step_type_select_1.StepTypeSelect, { type: (this.props.step && this.props.step.type || 'sequential'), onChange: this.onTypeChange }))),
                this.props.step && this.props.step.type === 'compound' ?
                    null :
                    (React.createElement(simple_step_editor_1.SimpleStepEditor, { sfLinkFactory: this.props.sfLinkFactory, scriptEditorFactory: this.props.scriptEditorFactory, workflow: this.props.workflow, ide: this.props.ide, allowCalls: this.props.state.allowCalls, catalog: this.props.catalog, step: this.props.step })))));
    }
    onNameChange(event) {
        this.updateField(this.nameField, event.target.value);
    }
};
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StepEditor.prototype, "dismissErrors", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof react_1.ChangeEvent !== "undefined" && react_1.ChangeEvent) === "function" && _a || Object]),
    __metadata("design:returntype", void 0)
], StepEditor.prototype, "onNameChange", null);
StepEditor = __decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    __metadata("design:paramtypes", [Object])
], StepEditor);
exports.StepEditor = StepEditor;
//const CloseIcon = require('react-icons/lib/go/x');
//import {WorkflowStepCompound} from '../../models/workflow';
//import { setTimeout } from 'timers';
//import { WorkflowService } from '../../services/workflow_service';

});
___scope___.file("modules/workflow-designer/components/step-type-select.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_virtualized_select_1 = require("react-virtualized-select");
const translation_service_1 = require("../services/translation-service");
const centered_content_1 = require("../util/centered-content");
const workflow_1 = require("../models/workflow");
let injectSheet = require('react-jss').default;
const style_1 = require("../style");
//import {themeColors } from '../style';
const styles = (theme) => ({
    select: {
        composes: `${style_1.editorStyles.mediumSelect} native-key-bindings`,
    },
    title: {
        composes: theme.ide ? 'text-color' : '',
        padding: 0,
        margin: 0,
        fontSize: '20px',
        fontWeight: 'bold',
        lineHeight: '24px'
    },
    description: {
        composes: theme.ide ? 'text-color' : '',
        padding: 0,
        margin: 0,
        fontSize: '14px',
        lineHeight: '16px'
    },
    option: {
        cursor: 'pointer',
        margin: 0,
        padding: '0 20px'
    },
    selected: {
        composes: 'selected',
    },
    focused: {
        composes: 'focused',
    }
});
const typeOptions = workflow_1.StepTypes.map(type => ({ value: type }));
let StepTypeSelect = class StepTypeSelect extends React.Component {
    constructor(props) {
        super(props);
        this.valueRenderer = (option) => {
            let classes = this.props.classes || {};
            return (React.createElement(centered_content_1.CenteredContent, { container: false },
                React.createElement("div", { className: classes.title }, translation_service_1.translate('TYPE_NAME_' + option.value.toUpperCase())),
                React.createElement("div", { className: classes.description }, translation_service_1.translate('TYPE_DESCRIPTION_' + option.value.toUpperCase()))));
        };
        this.optionRenderer = (options) => {
            let option = options.option, classes = this.props.classes || {}, focused = options.focusedOption == option, selected = options.valueArray.indexOf(option) > -1;
            return (React.createElement(centered_content_1.CenteredContent, { className: `${classes.option} ${focused ? classes.focused : ''} ${selected ? classes.selected : ''}`, key: options.key, onClick: () => options.selectValue(option), onMouseOver: () => options.focusOption(option), style: options.style },
                React.createElement("div", { className: classes.title }, translation_service_1.translate('TYPE_NAME_' + option.value.toUpperCase())),
                React.createElement("div", { className: classes.description }, translation_service_1.translate('TYPE_DESCRIPTION_' + option.value.toUpperCase()))));
        };
    }
    placeholder() {
        return (React.createElement(centered_content_1.CenteredContent, null, translation_service_1.translate('PLACEHOLDER_TYPE')));
    }
    render() {
        let classes = this.props.classes || {};
        return (React.createElement(react_virtualized_select_1.default, { className: classes.select, clearable: false, options: typeOptions, optionRenderer: this.optionRenderer, searchable: false, optionHeight: 70, maxHeight: 400, placeholder: this.placeholder(), valueRenderer: this.valueRenderer, onChange: option => this.props.onChange(option.value), value: this.props.type }));
    }
};
StepTypeSelect = __decorate([
    injectSheet(styles),
    __metadata("design:paramtypes", [Object])
], StepTypeSelect);
exports.StepTypeSelect = StepTypeSelect;

});
___scope___.file("modules/workflow-designer/util/centered-content.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
let injectSheet = require('react-jss').default;
const styles = (theme) => ({
    container: {
        height: '100%',
        '&:before': {
            content: "''",
            display: 'inline-block',
            height: '100%',
            verticalAlign: 'middle',
        }
    },
    content: {
        display: 'inline-block',
        verticalAlign: 'middle'
    }
});
let CenteredContent = class CenteredContent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let _a = this.props, { container, className, classes, sheet, theme } = _a, other = __rest(_a, ["container", "className", "classes", "sheet", "theme"]);
        classes = classes || {};
        if (container !== false) {
            const containerClasses = classes.container;
            return (React.createElement("div", Object.assign({ className: className ? className + ' ' + containerClasses : containerClasses }, other),
                React.createElement("div", { className: classes.content }, this.props.children)));
        }
        else {
            const contentClasses = classes.content;
            return (React.createElement("div", Object.assign({ className: className ? className + ' ' + contentClasses : contentClasses }, other), this.props.children));
        }
    }
};
CenteredContent = __decorate([
    injectSheet(styles),
    __metadata("design:paramtypes", [Object])
], CenteredContent);
exports.CenteredContent = CenteredContent;

});
___scope___.file("modules/workflow-designer/style/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import 'dragula/dist/dragula.css'
require("./style.less");
exports.themeColors = {
    darkerGreen: '#33A626',
    darkestGreen: '#23731A',
    fadedGreen: '#95CC8F',
    darkerRed: '#d13b2e',
};
exports.editorStyles = {
    largeSelect: 'select-large',
    mediumSelect: 'select-medium',
    imageSelect: 'select-image',
    normalSelect: 'select-normal'
};
var style_constants_1 = require("./style-constants");
exports.mediaQueries = style_constants_1.mediaQueries;
exports.noSelectStyle = style_constants_1.noSelectStyle;
function sectionStyles(theme) {
    return {
        section: theme.ide ?
            {
                composes: 'inset-panel block'
            } :
            {
                composes: 'pure-u-1',
                marginBottom: '20px'
            },
        sectionTitle: theme.ide ?
            {
                composes: 'panel-heading',
                position: 'relative'
            } :
            {
                fontWeight: '700',
                border: '1px solid #ddd',
                borderBottom: 'none',
                padding: '5px',
                background: '#eee',
                position: 'relative'
            },
        sectionTooltip: {
            position: 'absolute',
            right: '6px',
            top: '3px',
            display: 'block',
        },
        sectionTitleLarge: {
            composes: '$sectionTitle',
            fontSize: '2em',
            fontWeight: 'bold',
            padding: '10px',
        },
        sectionBody: theme.ide ?
            { composes: 'panel-body padded' }
            : {
                border: '1px solid #ddd',
                padding: '10px'
            },
        sectionBodyTight: theme.ide ?
            { composes: 'panel-body' }
            : {
                composes: '$sectionBody',
                padding: '0px'
            },
        sectionBodyBorderless: theme.ide ?
            { composes: 'panel-body' }
            : {
                composes: '$sectionBody',
                border: 'none'
            }
    };
}
exports.sectionStyles = sectionStyles;
function listStyles(theme) {
    return {
        listTitle: {
            composes: 'title',
            fontSize: theme.ide ? undefined : '1.2em',
            marginTop: '10px',
        },
        listTree: {
            composes: theme.ide ? 'list-tree' : '',
            padding: '0 0 0 8px',
            marginLeft: theme.ide ? '0' : '6px',
            borderLeft: theme.ide ? 'none' : 'solid 17px #ddd',
        },
        rootListTree: {
            composes: '$listTree',
            padding: '0px',
            margin: '0',
            marginBottom: '20px',
            borderLeft: 'none'
        },
        listItem: theme.ide ?
            {
                composes: 'list-item step',
                cursor: 'pointer',
                position: 'relative',
                listStyle: 'none',
                paddingLeft: '10px'
            } : {
            composes: 'step',
            listStyle: 'none',
            lineHeight: '2em',
            fontSize: '16px',
            color: '#666',
            fontWeight: 'normal',
            cursor: 'pointer',
            position: 'relative',
            paddingLeft: '10px',
            '& > span': {
                lineHeight: '2em',
                overflowX: 'hidden',
                marginRight: '45px',
                maxWidth: '100%',
                whiteSpace: 'nowrap',
                boxSizing: 'border-box',
                display: 'block',
            },
            '&:hover': {
                color: '#000',
            }
        },
        listItemSelected: theme.ide ? {
            composes: 'selected'
        } : {
            fontWeight: 'bold',
            color: exports.themeColors.darkerGreen,
            '&:hover': {
                color: exports.themeColors.darkerGreen,
            }
        },
        listItemSubList: {
            composes: theme.ide ? 'list-nested-item' : '',
            '& > $listTree': {
                position: 'relative',
                top: '-10px',
                marginTop: '10px',
                marginBottom: '-10px',
                minHeight: '20px'
            },
        },
    };
}
exports.listStyles = listStyles;
function errorStyles(theme) {
    return {
        errorPanel: theme.ide ?
            {
                composes: 'pure-u-1 inset-panel padded background-error',
                color: 'white',
                fontWeight: 'bold'
            } : {
            composes: 'pure-u-1',
            color: 'white',
            fontWeight: 'bold',
            background: exports.themeColors.darkerRed,
            padding: '16px',
            position: 'relative',
            borderRadius: '5px',
            boxSizing: 'border-box'
        },
        errorPanelClose: {
            composes: theme.ide ? 'text-error' : '',
            position: 'absolute',
            right: '0.2em',
            top: '0.2em',
            fontSize: '2em',
            lineHeight: '1em',
            '&:hover': {
                color: 'white',
                cursor: 'pointer'
            }
        }
    };
}
exports.errorStyles = errorStyles;
exports.shadows = {
    top: {
        content: " ",
        display: 'block',
        position: 'absolute',
        height: '20px',
        left: '-10px',
        right: '-10px',
        top: '-20px',
        boxShadow: '0px 5px 5px rgba(0,0,0,0.2)',
    },
    bottom: {
        content: " ",
        display: 'block',
        position: 'absolute',
        height: '20px',
        left: '-10px',
        right: '-10px',
        bottom: '-20px',
        boxShadow: '0px -5px 5px rgba(0,0,0,0.2)',
    }
};

});
___scope___.file("modules/workflow-designer/style/style.less", function(exports, require, module, __filename, __dirname){


require("fuse-box-css")("modules/workflow-designer/style/style.less", ".workflow-editor.base-web-style [class*=\"pure-u\"],\n.workflow-editor.base-web-style [class=\"pure-g\"] {\n  font-family: 'Lato' !important;\n}\n.workflow-editor.base-web-style [class*=\"pure-u\"] input,\n.workflow-editor.base-web-style [class=\"pure-g\"] input {\n  box-shadow: none;\n  border-radius: 0;\n}\n.workflow-editor.base-web-style [class*=\"pure-u\"] input.code,\n.workflow-editor.base-web-style [class=\"pure-g\"] input.code {\n  font-family: 'Courier New' !important;\n}\n.workflow-editor.base-ide-style {\n  position: relative;\n  height: 100%;\n  overflow-y: auto;\n}\n@media screen and (min-width: 64em) {\n  .workflow-editor.base-ide-style {\n    overflow-y: hidden;\n  }\n}\n@media screen and (min-width: 64em) {\n  .workflow-editor.base-ide-style > div {\n    height: 100%;\n    overflow-y: auto;\n  }\n}\n.workflow-editor.base-ide-style fieldset {\n  padding: 0;\n  margin: 0;\n  border: 0;\n  min-width: 0;\n}\n.workflow-editor.base-ide-style label {\n  margin-bottom: 0;\n}\n.select-medium .Select-control {\n  height: 70px;\n}\n.select-medium .Select-control .Select-value:before {\n  content: '';\n  display: inline-block;\n  height: 100%;\n  vertical-align: middle;\n  margin-right: -0.25em;\n}\n.select-medium .Select-control .Select-input input {\n  border: none;\n  box-shadow: none;\n}\n.select-medium .Select-menu-outer {\n  max-height: 400px;\n  z-index: 5;\n}\n.select-medium .Select-menu-outer .Select-menu {\n  max-height: 398px;\n}\n.select-normal .Select-control .Select-input input {\n  border: none;\n  box-shadow: none;\n  margin: 0;\n}\n.select-large .Select-control {\n  height: 100px;\n}\n.select-large .Select-control .Select-value:before {\n  content: '';\n  display: inline-block;\n  height: 100%;\n  vertical-align: middle;\n  margin-right: -0.25em;\n}\n.select-large .Select-control .Select-input input {\n  border: none;\n  box-shadow: none;\n}\n.select-large .Select-menu-outer {\n  max-height: 400px;\n  z-index: 5;\n}\n.select-large .Select-menu-outer .Select-menu {\n  max-height: 398px;\n}\n.block:not(:last-child) {\n  margin-bottom: 10px;\n}\n.block-force {\n  margin-bottom: 10px;\n}\n@media screen and (max-width: 47.99em) {\n  .block-sm:not(:last-child) {\n    margin-bottom: 10px;\n  }\n}\n.block-md {\n  margin-bottom: 10px;\n}\n@media screen and (min-width: 64em) {\n  .block-md {\n    margin-bottom: 0px;\n  }\n}\n@media screen and (max-width: 63.99em) {\n  .not-block-md {\n    margin-bottom: 0px;\n  }\n  .not-block-md:not(:last-child) {\n    margin-bottom: 0px;\n  }\n}\n.pure-g > div,\n.pure-g > label {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.pure-form label {\n  margin: 0px;\n}\n.tooltip a,\n.tooltip a:hover,\n.tooltip a:active,\n.tooltip a:visited {\n  color: #ddd;\n  text-decoration: none;\n  font-weight: 700;\n}\n.tooltip a:hover,\n.tooltip a:hover:hover,\n.tooltip a:active:hover,\n.tooltip a:visited:hover,\n.tooltip a:active,\n.tooltip a:hover:active,\n.tooltip a:active:active,\n.tooltip a:visited:active {\n  color: #fff;\n}\n")
});
___scope___.file("modules/workflow-designer/style/style-constants.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaQueries = {
    sm: '@media screen and (min-width: 35.5em)',
    md: '@media screen and (min-width: 48em)',
    lg: '@media screen and (min-width: 64em)',
    xl: '@media screen and (min-width: 80em)',
    uptoMd: '@media screen and (max-width: 48em)',
    uptoSm: '@media screen and (max-width: 35.5em)'
};
exports.mediaWidths = {
    sm: '35.5em',
    md: '48em',
    lg: '64em',
    xl: '80em',
};
exports.noSelectStyle = {
    '-webkit-touch-callout': 'none',
    '-webkit-user-select': 'none',
    '-khtml-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
};
exports.themeColors = {
    darkerGreen: '#33A626',
    darkestGreen: '#23731A',
    fadedGreen: '#95CC8F'
};

});
___scope___.file("modules/workflow-designer/components/step-editor/simple-step-editor.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
const React = require("react");
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const workflow_1 = require("../../models/workflow");
const options_1 = require("../options");
const translation_service_1 = require("../../services/translation-service");
const script_step_editor_1 = require("./script-step-editor");
const dockerfile_step_editor_1 = require("./dockerfile-step-editor");
const ext_workflow_step_editor_1 = require("./ext-workflow-step-editor");
let injectSheet = require('react-jss').default;
const styles = (theme) => {
    return {
        labelContainer: {
            composes: 'pure-u-1-4 pure-u-md-1-6',
            textAlign: 'right'
        },
        label: {
            paddingRight: '5px'
        }
    };
};
let SimpleStepEditor = class SimpleStepEditor extends React.Component {
    constructor(props) {
        super(props);
    }
    get action() {
        if (this.props.step) {
            return this.props.step.action;
        }
        return 'script';
    }
    setAction(action) {
        if (!this.props.step.transient) {
            this.props.step.transient = new workflow_1.StepTransientState();
        }
        this.props.step.transient.action = action;
    }
    actionOption(action) {
        return {
            value: action,
            display: (React.createElement("span", null, translation_service_1.translate('RUN_' + action.toUpperCase())))
        };
    }
    options() {
        return this.props.allowCalls ?
            [
                this.actionOption('script'),
                this.actionOption('call'),
                this.actionOption('generated'),
                this.actionOption('dockerfile')
            ] :
            [
                this.actionOption('script'),
                this.actionOption('dockerfile')
            ];
    }
    selectedEditor() {
        if (this.action == 'script') {
            return (React.createElement(script_step_editor_1.ScriptStepEditor, { scriptEditorFactory: this.props.scriptEditorFactory, sfLinkFactory: this.props.sfLinkFactory, scriptField: 'script', workflow: this.props.workflow, ide: this.props.ide, catalog: this.props.catalog, step: this.props.step }));
        }
        else if (this.action == 'generated') {
            return (React.createElement(script_step_editor_1.ScriptStepEditor, { scriptEditorFactory: this.props.scriptEditorFactory, sfLinkFactory: this.props.sfLinkFactory, includeWorkflowVariables: true, scriptField: 'generator', workflow: this.props.workflow, ide: this.props.ide, catalog: this.props.catalog, step: this.props.step }));
        }
        else if (this.action == 'dockerfile') {
            return (React.createElement(dockerfile_step_editor_1.DockerfileStepEditor, { step: this.props.step }));
        }
        else if (this.action == 'call') {
            return (React.createElement(ext_workflow_step_editor_1.ExtWorkflowStepEditor, { step: this.props.step }));
        }
        else
            return console.log('incomplete coniditional chain in simple-stepeditor.tsx');
    }
    render() {
        //let classes = this.props.classes || {};
        return (React.createElement("div", null,
            React.createElement(options_1.Options, { ide: this.props.ide, fill: true, options: this.options(), onChange: a => this.setAction(a.value), selected: this.action }),
            this.selectedEditor()));
    }
};
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof workflow_1.ActionType !== "undefined" && workflow_1.ActionType) === "function" && _a || Object]),
    __metadata("design:returntype", void 0)
], SimpleStepEditor.prototype, "setAction", null);
SimpleStepEditor = __decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    __metadata("design:paramtypes", [Object])
], SimpleStepEditor);
exports.SimpleStepEditor = SimpleStepEditor;
//import { EditorState } from '../../models/state';
//import { editorStyles, themeColors } from '../../style';
//import { CenteredContent } from '../../util/centered-content';

});
___scope___.file("modules/workflow-designer/components/options.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
let injectSheet = require('react-jss').default;
const style_1 = require("../style");
const activeOption = {
    fontWeight: 'bold',
    color: style_1.themeColors.fadedGreen,
    borderBottom: 'solid 3px ' + style_1.themeColors.fadedGreen,
    background: 'none'
};
const activeSelectedOption = {
    fontWeight: 'bold',
    color: style_1.themeColors.darkerGreen,
    borderBottom: 'solid 3px ' + style_1.themeColors.darkerGreen,
    background: 'none'
};
const styles = (theme) => {
    let out;
    if (theme.ide) {
        out = {
            optionsList: {
                composes: 'btn-group'
            },
            option: {
                composes: 'btn'
            },
            selected: {
                composes: 'btn selected'
            },
            fullWidth: {
                width: '100%'
            },
        };
    }
    else {
        out = {
            optionsList: {
                composes: 'pure-menu-list select-list'
            },
            fullWidth: {
                width: '100%'
            },
            option: {
                composes: 'pure-menu-link',
                color: '#aaa',
                fontWeight: 'bold',
                borderBottom: 'solid 3px transparent',
                'a&': {
                    color: '#aaa',
                },
                '&:hover': activeOption,
                '&:focus': {
                    background: 'none',
                    color: '#aaa',
                    fontWeight: 'bold'
                }
            },
            selected: {
                composes: 'pure-menu-link',
                borderBottom: 'solid 3px ' + style_1.themeColors.darkerGreen,
                color: style_1.themeColors.darkerGreen,
                fontWeight: 'bold',
                'a&': {
                    color: style_1.themeColors.darkerGreen
                },
                '&:hover': activeSelectedOption,
                '&:focus': activeSelectedOption
            }
        };
    }
    Object.assign(out, {
        'options-1': optionStyle(1),
        'options-2': optionStyle(2),
        'options-3': optionStyle(3),
        'options-4': optionStyle(4),
        'options-5': optionStyle(5),
        'options-6': optionStyle(6),
    });
    return out;
};
function optionStyle(optionNumber) {
    return {
        width: '100%',
        textAlign: 'center',
        float: 'left',
        [style_1.mediaQueries.md]: {
            width: (100 / optionNumber).toPrecision(5) + '%',
        }
    };
}
let Options = class Options extends React.Component {
    constructor(props) {
        super(props);
    }
    optionClass(option) {
        let classes = this.props.classes || {};
        return this.props.selected === option.value ? classes.selected : classes.option;
    }
    setSelected(e, option) {
        if (this.props.onChange) {
            this.props.onChange(option);
        }
        e.preventDefault();
    }
    option(option, key) {
        let optionCount = this.props.options.length, classes = this.props.classes;
        return this.props.ide ?
            (React.createElement("button", { key: key, className: [this.optionClass(option), classes['options-' + optionCount]].join(' '), onClick: e => this.setSelected(e, option) }, option.display)) :
            (React.createElement("li", { key: key, className: ['pure-menu-item', classes['options-' + optionCount]].join(' '), onClick: e => this.setSelected(e, option) },
                React.createElement("a", { href: "#", className: this.optionClass(option) }, option.display)));
    }
    render() {
        let classes = this.props.classes || {};
        return this.props.ide ?
            (React.createElement("div", { className: `block ${this.props.className || ''}` },
                React.createElement("div", { className: [classes.optionsList, this.props.fill ? classes.fullWidth : ''].join(' ') }, this.props.options && this.props.options.map((o, i) => this.option(o, i))))) :
            (React.createElement("div", { className: `block pure-menu pure-menu-horizontal ${this.props.className || ''}` },
                React.createElement("ul", { className: [classes.optionsList, this.props.fill ? classes.fullWidth : ''].join(' ') }, this.props.options && this.props.options.map((o, i) => this.option(o, i)))));
    }
};
Options = __decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    __metadata("design:paramtypes", [Object])
], Options);
exports.Options = Options;
//import { computed } from 'mobx';
//import { editorStyles } from '../style';

});
___scope___.file("modules/workflow-designer/components/step-editor/script-step-editor.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const step_workflow_variables_1 = require("../../components/step-editor/step-workflow-variables");
const translation_service_1 = require("../../services/translation-service");
const advanced_options_1 = require("./advanced-options");
const image_field_1 = require("../image-field/image-field");
let injectSheet = require('react-jss').default;
const style_1 = require("../../style");
const styles = (theme) => {
    let section = style_1.sectionStyles(theme);
    return Object.assign({
        select: {
            composes: `${style_1.editorStyles.largeSelect}`
        },
        title: {
            composes: theme.ide ? 'text-color' : '',
            padding: 0,
            margin: 0,
            fontSize: '20px',
            fontWeight: 'bold',
            lineHeight: '24px'
        },
        description: {
            composes: theme.ide ? 'text-color' : '',
            padding: 0,
            margin: 0,
            fontSize: '14px',
            lineHeight: '16px'
        },
        option: {
            cursor: 'pointer',
            margin: 0,
            padding: '0 20px'
        },
        selected: {
            composes: 'selected',
        },
        focused: {
            composes: 'focused',
        }
    }, section);
};
let ScriptStepEditor = class ScriptStepEditor extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const classes = this.props.classes || {};
        return this.props.step ?
            React.createElement("div", { className: "pure-g" },
                React.createElement("div", { className: "pure-u-1" },
                    React.createElement(image_field_1.ImageField, { catalog: this.props.catalog, ide: this.props.ide, workflow: this.props.workflow, step: this.props.step })),
                this.props.includeWorkflowVariables &&
                    React.createElement("div", { className: "pure-u-1" },
                        React.createElement(step_workflow_variables_1.StepWorkflowVariables, { step: this.props.step })),
                React.createElement(advanced_options_1.AdvancedOptions, { ide: this.props.ide, step: this.props.step, sfLinkFactory: this.props.sfLinkFactory }),
                React.createElement("div", { className: "pure-u-1" },
                    React.createElement("div", { className: classes.section },
                        React.createElement("div", { className: classes.sectionTitle },
                            translation_service_1.translate('LABEL_' + this.props.scriptField.toUpperCase()),
                            ":"),
                        React.createElement("div", { className: [classes.sectionBodyTight, classes.sectionBodyBorderless].join(' ') }, this.props.scriptEditorFactory(this.props.step, this.props.scriptField)))))
            : null;
    }
};
ScriptStepEditor = __decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    __metadata("design:paramtypes", [Object])
], ScriptStepEditor);
exports.ScriptStepEditor = ScriptStepEditor;
//import * as ReactDOM from 'react-dom';
// import { AceEditor } from '../ace-editor';
//import { WorkflowStep } from '../../models/workflow';
// import 'brace/theme/monokai';
// import 'brace/mode/sh';
//import VirtualizedSelect, { VirtualizedOptionRenderOptions } from 'react-virtualized-select';
//import { autorun } from "mobx";
//import { Option } from "react-select";
//import { CenteredContent } from "../../util/centered-content";
// const atom = require('atom');
//import { themeColors } from '../../style';

});
___scope___.file("modules/workflow-designer/components/step-editor/step-workflow-variables.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
const React = require("react");
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
let injectSheet = require('react-jss').default;
const style_1 = require("../../style");
const translation_service_1 = require("../../services/translation-service");
const react_select_1 = require("react-select");
const centered_content_1 = require("../../util/centered-content");
const jssStyles = (theme) => {
    let section = style_1.sectionStyles(theme);
    return Object.assign({
        label: {
            composes: 'pure-u-1-4 text-right',
            paddingRight: '5px'
        },
        selectInput: {
            composes: theme.ide ? 'text-color' : ''
        },
        inputsDiv: {
            '& .Select-arrow-zone': {
                display: 'none'
            }
        }
    }, section);
};
let StepWorkflowVariables = class StepWorkflowVariables extends React.Component {
    constructor(props) {
        super(props);
        this.promptTextCreator = (label) => {
            return translation_service_1.translate('LABEL_VARIABLE_PROMPT', label);
        };
        this.props.step.includeVariables = this.props.step.includeVariables || [];
        this.props.step.excludeVariables = this.props.step.excludeVariables || [];
    }
    get includeVariables() {
        return this.props.step.includeVariables;
    }
    get excludeVariables() {
        return this.props.step.excludeVariables;
    }
    add(variables, arrayName) {
        if (variables) {
            let newVars = [];
            for (let i = 0; i < variables.length; i++) {
                newVars.push(variables[i].value);
            }
            this.props.step[arrayName] = newVars;
            if (arrayName === 'includeVariables') {
                this.props.step.transient.explicitIncludeVariables = true;
            }
            else {
                this.props.step.transient.explicitExcludeVariables = true;
            }
        }
    }
    shouldKeyDownEventCreateNewOption(arg) {
        return arg.keyCode === 32 || arg.keyCode === 9 || arg.keyCode === 13 || arg.keyCode === 188;
    }
    render() {
        let classes = this.props.classes || {};
        let includeVariablesArray = [];
        let excludeVariablesArray = [];
        this.includeVariables.forEach(variable => includeVariablesArray.push({ label: variable, value: variable }));
        this.excludeVariables.forEach(variable => excludeVariablesArray.push({ label: variable, value: variable }));
        return (React.createElement("div", { className: [classes.section, classes.inputsDiv].join(' ') },
            React.createElement("div", { className: classes.sectionTitle }, translation_service_1.translate('TITLE_WORKFLOW_VARIABLES')),
            React.createElement("div", { className: classes.sectionBody },
                React.createElement("div", { className: "pure-g block" },
                    React.createElement("label", { className: this.props.classes.label },
                        React.createElement(centered_content_1.CenteredContent, null,
                            React.createElement("span", null,
                                translation_service_1.translate('LABEL_INCLUDE_VARIABLES'),
                                ":"))),
                    React.createElement("div", { className: "pure-u-3-4" },
                        React.createElement(react_select_1.Creatable, { className: `${style_1.editorStyles.normalSelect} native-key-bindings`, inputProps: { className: this.props.classes.selectInput }, shouldKeyDownEventCreateNewOption: this.shouldKeyDownEventCreateNewOption, multi: true, clearable: true, placeholder: translation_service_1.translate('PLACEHOLDER_VARIABLES'), noResultsText: translation_service_1.translate('INSTRUCTION_INCLUDE_VARIABLES'), promptTextCreator: this.promptTextCreator, value: includeVariablesArray, onChange: p => this.add(p, 'includeVariables') }))),
                React.createElement("div", { className: "pure-g block" },
                    React.createElement("label", { className: this.props.classes.label },
                        React.createElement(centered_content_1.CenteredContent, null,
                            React.createElement("span", null,
                                translation_service_1.translate('LABEL_EXCLUDE_VARIABLES'),
                                ":"))),
                    React.createElement("div", { className: "pure-u-3-4" },
                        React.createElement(react_select_1.Creatable, { className: `${style_1.editorStyles.normalSelect} native-key-bindings`, inputProps: { className: this.props.classes.selectInput }, shouldKeyDownEventCreateNewOption: this.shouldKeyDownEventCreateNewOption, multi: true, clearable: true, placeholder: translation_service_1.translate('PLACEHOLDER_VARIABLES'), noResultsText: translation_service_1.translate('INSTRUCTION_EXCLUDE_VARIABLES'), promptTextCreator: this.promptTextCreator, value: excludeVariablesArray, onChange: p => this.add(p, 'excludeVariables') }))))));
    }
};
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof react_select_1.Option !== "undefined" && react_select_1.Option) === "function" && _a || Object, String]),
    __metadata("design:returntype", void 0)
], StepWorkflowVariables.prototype, "add", null);
StepWorkflowVariables = __decorate([
    injectSheet(jssStyles),
    mobx_react_1.observer,
    __metadata("design:paramtypes", [Object])
], StepWorkflowVariables);
exports.StepWorkflowVariables = StepWorkflowVariables;
//const Text = require('react-icons/lib/fa/font');
//const File = require('react-icons/lib/fa/file-text-o');
//const Remove = require('react-icons/lib/fa/times-circle');
//import { Options } from '../options';
//import { observable, computed } from 'mobx';

});
___scope___.file("modules/workflow-designer/components/step-editor/advanced-options.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
let injectSheet = require('react-jss').default;
const source_options_1 = require("./source-options");
const failure_options_1 = require("./failure-options");
const variables_editor_1 = require("./variables-editor");
const volume_options_1 = require("./volume-options");
const health_options_1 = require("./health-options");
const drop_down_menu_1 = require("../drop-down-menu");
const translation_service_1 = require("../../services/translation-service");
const style_1 = require("../../style");
const tooltip_1 = require("../../components/tooltip");
const variable_editor_1 = require("../../components/step-editor/variable-editor");
const port_editor_1 = require("../../components/step-editor/port-editor");
const styles = (theme) => {
    let section = style_1.sectionStyles(theme);
    return Object.assign({
        advanced: {
            composes: 'pure-u-1 block',
            marginTop: '16px'
        },
        link: {
            color: '#4E73BD',
            fontWeight: '700',
            textDecoration: 'none',
            '&:hover': {
                color: '#34518b',
                textDecoration: 'none'
            },
            '&:visited': {
                textDecoration: 'none'
            }
        }
    }, section);
};
let AdvancedOptions = class AdvancedOptions extends React.Component {
    constructor(props) {
        super(props);
    }
    setup(props) {
        props.step.transient.healthConfigured = props.step.health.filled();
    }
    componentWillMount() {
        this.setup(this.props);
    }
    componentWillReceiveProps(newProps) {
        this.setup(newProps);
    }
    get transient() {
        return this.props.step.transient;
    }
    get healthConfigured() {
        if (this.transient.healthConfigured) {
            return true;
        }
        if (this.props.step.health) {
            return this.props.step.health.filled();
        }
        return false;
    }
    get readinessConfigured() {
        if (this.transient.readinessConfigured) {
            return true;
        }
        if (this.props.step.readiness) {
            return this.props.step.readiness.filled();
        }
        return false;
    }
    get environmentConfigured() {
        if (this.transient.environmentConfigured) {
            return true;
        }
        return this.props.step.environment && this.props.step.environment.length > 0;
    }
    get volumesConfigured() {
        if (this.transient.volumesConfigured) {
            return true;
        }
        return this.props.step.volumes && this.props.step.volumes.length > 0;
    }
    get portsConfigured() {
        if (this.transient.portsConfigured) {
            return true;
        }
        return this.props.step.ports && this.props.step.ports.length > 0;
    }
    get sourceOptions() {
        if (this.transient.sourceOptions) {
            return true;
        }
        return this.props.step.omitSource ||
            (this.props.step.sourceLocation && this.props.step.sourceLocation.length > 0 &&
                this.props.step.sourceLocation !== '/app');
    }
    get failureOptions() {
        if (this.transient.failureOptions) {
            return true;
        }
        return this.props.step.ignoreFailure || this.props.step.ignoreMissing || this.props.step.ignoreValidation;
    }
    section(title, body, helpMessage) {
        const classes = this.props.classes || {};
        return (React.createElement("div", { className: classes.section },
            React.createElement("div", { className: classes.sectionTitle },
                title,
                helpMessage && React.createElement(tooltip_1.InfoTooltip, { className: classes.sectionTooltip }, helpMessage)),
            React.createElement("div", { className: classes.sectionBody }, body)));
    }
    runAction(action) {
        action();
    }
    button(label, handler) {
        return {
            display: React.createElement("span", null, label),
            onClick: () => this.runAction(handler)
        };
    }
    get additionalAdvancedOptionsAvailable() {
        return !this.sourceOptions ||
            !this.failureOptions ||
            !this.healthConfigured ||
            !this.readinessConfigured ||
            !this.environmentConfigured ||
            !this.volumesConfigured ||
            !this.portsConfigured;
    }
    generateOptionItems() {
        let items = [];
        if (this.props.step.type === 'service') {
            if (!this.healthConfigured) {
                items.push(this.button(translation_service_1.translate('CONFIGURE_HEALTH'), () => this.transient.healthConfigured = true));
            }
            if (!this.readinessConfigured) {
                items.push(this.button(translation_service_1.translate('CONFIGURE_READINESS'), () => this.transient.readinessConfigured = true));
            }
        }
        if (!this.environmentConfigured) {
            items.push(this.button(translation_service_1.translate('CONFIGURE_ENVIRONMENT'), () => this.transient.environmentConfigured = true));
        }
        if (!this.portsConfigured) {
            items.push(this.button(translation_service_1.translate('CONFIGURE_PORTS'), () => this.transient.portsConfigured = true));
        }
        if (!this.volumesConfigured) {
            items.push(this.button(translation_service_1.translate('CONFIGURE_VOLUMES'), () => this.transient.volumesConfigured = true));
        }
        if (!this.sourceOptions) {
            items.push(this.button(translation_service_1.translate('CONFIGURE_SOURCE'), () => this.transient.sourceOptions = true));
        }
        if (!this.failureOptions) {
            items.push(this.button(translation_service_1.translate('CONFIGURE_FAILURE'), () => this.transient.failureOptions = true));
        }
        return items;
    }
    render() {
        let step = this.props.step;
        const classes = this.props.classes || {};
        let items = this.generateOptionItems();
        return (React.createElement("div", { className: classes.advanced },
            step.type === 'service' && this.healthConfigured &&
                this.section(translation_service_1.translate('TITLE_HEALTH'), React.createElement(health_options_1.HealthOptions, { step: step, ide: this.props.ide }), React.createElement("div", null,
                    translation_service_1.translate('HELP_HEALTH_TEXT'),
                    React.createElement("br", null),
                    React.createElement("br", null),
                    this.props.sfLinkFactory("/docs/workflows#health", translation_service_1.translate('HELP_HEALTH_LINK')))),
            step.type === 'service' && this.readinessConfigured &&
                this.section(translation_service_1.translate('TITLE_READINESS'), React.createElement(health_options_1.HealthOptions, { typeField: "readinessCheckType", field: "readiness", step: step, ide: this.props.ide }), React.createElement("div", null,
                    translation_service_1.translate('HELP_READINESS_TEXT'),
                    React.createElement("br", null),
                    React.createElement("br", null),
                    this.props.sfLinkFactory("/docs/workflows#readiness", translation_service_1.translate('HELP_READINESS_LINK')))),
            this.sourceOptions &&
                this.section(translation_service_1.translate('TITLE_SOURCE'), React.createElement(source_options_1.SourceOptions, { step: step, ide: this.props.ide }), React.createElement("div", null,
                    translation_service_1.translate('HELP_SOURCE_TEXT'),
                    React.createElement("br", null),
                    React.createElement("br", null),
                    this.props.sfLinkFactory("/docs/workflows#source", translation_service_1.translate('HELP_SOURCE_LINK')))),
            this.failureOptions &&
                this.section(translation_service_1.translate('TITLE_FAILURE'), React.createElement(failure_options_1.FailureOptions, { obj: step }), React.createElement("div", null,
                    translation_service_1.translate('HELP_FAILURE_TEXT'),
                    React.createElement("br", null),
                    React.createElement("br", null),
                    this.props.sfLinkFactory("/docs/workflows#failure", translation_service_1.translate('HELP_FAILURE_LINK')))),
            this.environmentConfigured &&
                this.section(translation_service_1.translate('TITLE_ENVIRONMENT'), React.createElement(variables_editor_1.VariablesEditor, { variables: step.environment, ide: this.props.ide, sourceEditorFactory: variable_editor_1.variableEditorFactory, sourceFactory: variable_editor_1.variableSourceFactory }), React.createElement("div", null,
                    translation_service_1.translate('HELP_ENVIRONMENT_TEXT'),
                    React.createElement("br", null),
                    React.createElement("br", null),
                    this.props.sfLinkFactory("/docs/workflows#environment", translation_service_1.translate('HELP_ENVIRONMENT_LINK')))),
            this.volumesConfigured &&
                this.section(translation_service_1.translate('TITLE_VOLUMES'), React.createElement(volume_options_1.VolumeOptions, { step: step, ide: this.props.ide }), React.createElement("div", null,
                    translation_service_1.translate('HELP_VOLUMES_TEXT'),
                    React.createElement("br", null),
                    React.createElement("br", null),
                    this.props.sfLinkFactory("/docs/workflows#volumes", translation_service_1.translate('HELP_VOLUMES_LINK')))),
            this.portsConfigured &&
                this.section(translation_service_1.translate('TITLE_PORTS'), React.createElement(variables_editor_1.VariablesEditor, { variables: step.ports, onlyPairs: true, ide: this.props.ide, sourceEditorFactory: port_editor_1.portEditorFactory, sourceFactory: port_editor_1.portEntrySourceFactory }), React.createElement("div", null,
                    translation_service_1.translate('HELP_PORTS_TEXT'),
                    React.createElement("br", null),
                    React.createElement("br", null),
                    this.props.sfLinkFactory("/docs/workflows#ports", translation_service_1.translate('HELP_PORTS_LINK')))),
            items.length > 0 &&
                React.createElement(drop_down_menu_1.DropDownMenu, { ide: this.props.ide, label: translation_service_1.translate('CONFIGURE'), items: items })));
    }
};
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdvancedOptions.prototype, "setup", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", void 0)
], AdvancedOptions.prototype, "runAction", null);
AdvancedOptions = __decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    __metadata("design:paramtypes", [Object])
], AdvancedOptions);
exports.AdvancedOptions = AdvancedOptions;

});
___scope___.file("modules/workflow-designer/components/step-editor/source-options.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b, _c;
const React = require("react");
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
let injectSheet = require('react-jss').default;
const translation_service_1 = require("../../services/translation-service");
const centered_content_1 = require("../../util/centered-content");
const options_1 = require("../options");
const react_select_1 = require("react-select");
const style_1 = require("../../style");
const styles = (theme) => ({
    label: {
        composes: 'input-label pure-u-1 pure-u-md-1-4 text-right',
        paddingRight: '5px'
    },
    textCenter: {
        textAlign: 'center'
    }
});
let SourceOptions = class SourceOptions extends React.Component {
    constructor(props) {
        super(props);
        this.promptTextCreator = (label) => {
            return translation_service_1.translate('LABEL_VARIABLE_PROMPT', label);
        };
    }
    get sourceOmitted() {
        return this.props.step.omitSource === true;
    }
    get sourceTypes() {
        return [
            {
                value: 'noSource',
                display: (React.createElement("span", null, translation_service_1.translate('OPTION_NOSOURCE')))
            },
            {
                value: 'dockerignore',
                display: (React.createElement("span", null, translation_service_1.translate('OPTION_DOCKERIGNORE')))
            },
            {
                value: 'includeExclude',
                display: (React.createElement("span", null, translation_service_1.translate('OPTION_INCLUDEEXCLUDE')))
            },
        ];
    }
    omitSource(e) {
        this.props.step.omitSource = e.currentTarget.checked;
    }
    updateDockerignore(e) {
        this.props.step.dockerignore = e.target.value;
    }
    setSourceType(type) {
        this.props.step.transient.sourceType = type;
    }
    get currentSourceType() {
        if (this.props.step.transient.sourceType) {
            return this.props.step.transient.sourceType;
        }
        if (this.sourceOmitted) {
            return 'noSource';
        }
        return ((this.props.step.sourceIncludes || []).length || (this.props.step.sourceExcludes || []).length) ?
            'includeExclude' : 'dockerignore';
    }
    shouldKeyDownEventCreateNewOption(arg) {
        return arg.keyCode === 32 || arg.keyCode === 9 || arg.keyCode === 13 || arg.keyCode === 188;
    }
    setSources(variables, arrayName) {
        if (variables) {
            let newVars = [];
            for (let i = 0; i < variables.length; i++) {
                newVars.push(variables[i].value);
            }
            this.props.step[arrayName] = newVars;
            if (arrayName === 'sourceIncludes') {
                this.props.step.transient.explicitSourceIncludes = true;
            }
            else {
                this.props.step.transient.explicitSourceExcludes = true;
            }
        }
    }
    render() {
        let classes = this.props.classes || {};
        let sourceIncludesArray = [];
        let sourceExcludesArray = [];
        this.props.step.sourceIncludes.forEach(sourceLine => sourceIncludesArray.push({ label: sourceLine, value: sourceLine }));
        this.props.step.sourceExcludes.forEach(sourceLine => sourceExcludesArray.push({ label: sourceLine, value: sourceLine }));
        return (React.createElement("div", null, !this.sourceOmitted && (React.createElement("div", null,
            React.createElement("div", { className: "pure-u-1 block" },
                React.createElement(options_1.Options, { ide: this.props.ide, fill: true, options: this.sourceTypes, onChange: a => this.setSourceType(a.value), selected: this.currentSourceType })),
            this.currentSourceType === 'noSource' &&
                React.createElement("div", { className: "pure-g block" },
                    React.createElement("div", { className: "pure-u-1" },
                        React.createElement("div", { className: classes.textCenter }, translation_service_1.translate('OPTION_OMIT_SOURCE')))),
            this.currentSourceType === 'dockerignore' &&
                React.createElement("div", { className: "pure-g" },
                    React.createElement("label", { className: classes.label },
                        React.createElement(centered_content_1.CenteredContent, null,
                            React.createElement("span", null,
                                translation_service_1.translate('LABEL_DOCKERIGNORE'),
                                ":"))),
                    React.createElement("div", { className: "pure-u-1 pure-u-md-3-4" },
                        React.createElement("input", { className: 'pure-input-1 code input-text native-key-bindings', type: "text", value: this.props.step.dockerignore || '', onChange: e => this.updateDockerignore(e) }))),
            this.currentSourceType === 'includeExclude' &&
                React.createElement("div", null,
                    React.createElement("div", { className: "pure-g block" },
                        React.createElement("label", { className: this.props.classes.label },
                            React.createElement(centered_content_1.CenteredContent, null,
                                React.createElement("span", null,
                                    translation_service_1.translate('LABEL_SOURCE_INCLUDES'),
                                    ":"))),
                        React.createElement("div", { className: "pure-u-3-4" },
                            React.createElement(react_select_1.Creatable, { className: `${style_1.editorStyles.normalSelect} native-key-bindings`, inputProps: { className: this.props.classes.selectInput }, shouldKeyDownEventCreateNewOption: this.shouldKeyDownEventCreateNewOption, multi: true, clearable: true, placeholder: translation_service_1.translate('PLACEHOLDER_SOURCE_INCLUDES'), noResultsText: translation_service_1.translate('INSTRUCTION_SOURCE_INCLUDES'), promptTextCreator: this.promptTextCreator, value: sourceIncludesArray, onChange: p => this.setSources(p, 'sourceIncludes') }))),
                    React.createElement("div", { className: "pure-g block" },
                        React.createElement("label", { className: this.props.classes.label },
                            React.createElement(centered_content_1.CenteredContent, null,
                                React.createElement("span", null,
                                    translation_service_1.translate('LABEL_SOURCE_EXCLUDES'),
                                    ":"))),
                        React.createElement("div", { className: "pure-u-3-4" },
                            React.createElement(react_select_1.Creatable, { className: `${style_1.editorStyles.normalSelect} native-key-bindings`, inputProps: { className: this.props.classes.selectInput }, shouldKeyDownEventCreateNewOption: this.shouldKeyDownEventCreateNewOption, multi: true, clearable: true, placeholder: translation_service_1.translate('PLACEHOLDER_SOURCE_EXCLUDES'), noResultsText: translation_service_1.translate('INSTRUCTION_SOURCE_EXCLUDES'), promptTextCreator: this.promptTextCreator, value: sourceExcludesArray, onChange: p => this.setSources(p, 'sourceExcludes') }))))))));
    }
};
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = (typeof React !== "undefined" && React).ChangeEvent) === "function" && _a || Object]),
    __metadata("design:returntype", void 0)
], SourceOptions.prototype, "omitSource", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = (typeof React !== "undefined" && React).ChangeEvent) === "function" && _b || Object]),
    __metadata("design:returntype", void 0)
], SourceOptions.prototype, "updateDockerignore", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SourceOptions.prototype, "setSourceType", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof react_select_1.Option !== "undefined" && react_select_1.Option) === "function" && _c || Object, String]),
    __metadata("design:returntype", void 0)
], SourceOptions.prototype, "setSources", null);
SourceOptions = __decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    __metadata("design:paramtypes", [Object])
], SourceOptions);
exports.SourceOptions = SourceOptions;

});
___scope___.file("modules/workflow-designer/components/step-editor/failure-options.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b, _c;
const React = require("react");
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
let injectSheet = require('react-jss').default;
//import { WorkflowStepSimple } from '../../models/workflow';
const translation_service_1 = require("../../services/translation-service");
const styles = (theme) => ({});
let FailureOptions = class FailureOptions extends React.Component {
    constructor(props) {
        super(props);
    }
    get failureIgnored() {
        return this.props.obj.ignoreFailure === true;
    }
    get missingIgnored() {
        return this.props.obj.ignoreMissing === true;
    }
    get validationIgnored() {
        return this.props.obj.ignoreValidation === true;
    }
    ignoreFailure(e) {
        this.props.obj.ignoreFailure = e.currentTarget.checked;
    }
    ignoreMissing(e) {
        this.props.obj.ignoreMissing = e.currentTarget.checked;
    }
    ignoreValidation(e) {
        this.props.obj.ignoreValidation = e.currentTarget.checked;
    }
    render() {
        //let classes = this.props.classes || {}
        return (React.createElement("div", null,
            React.createElement("div", { className: "pure-u-1 block" },
                React.createElement("label", { className: "input-label" },
                    React.createElement("input", { className: "input-checkbox", type: "checkbox", checked: this.failureIgnored, onChange: e => this.ignoreFailure(e) }),
                    ' ',
                    translation_service_1.translate('OPTION_IGNORE_FAILURE'))),
            React.createElement("div", { className: "pure-u-1 block" },
                React.createElement("label", { className: "input-label" },
                    React.createElement("input", { className: "input-checkbox", type: "checkbox", checked: this.missingIgnored, onChange: e => this.ignoreMissing(e) }),
                    ' ',
                    translation_service_1.translate('OPTION_IGNORE_MISSING'))),
            React.createElement("div", { className: "pure-u-1" },
                React.createElement("label", { className: "input-label" },
                    React.createElement("input", { className: "input-checkbox", type: "checkbox", checked: this.validationIgnored, onChange: e => this.ignoreValidation(e) }),
                    ' ',
                    translation_service_1.translate('OPTION_IGNORE_VALIDATION')))));
    }
};
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = (typeof React !== "undefined" && React).ChangeEvent) === "function" && _a || Object]),
    __metadata("design:returntype", void 0)
], FailureOptions.prototype, "ignoreFailure", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = (typeof React !== "undefined" && React).ChangeEvent) === "function" && _b || Object]),
    __metadata("design:returntype", void 0)
], FailureOptions.prototype, "ignoreMissing", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = (typeof React !== "undefined" && React).ChangeEvent) === "function" && _c || Object]),
    __metadata("design:returntype", void 0)
], FailureOptions.prototype, "ignoreValidation", null);
FailureOptions = __decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    __metadata("design:paramtypes", [Object])
], FailureOptions);
exports.FailureOptions = FailureOptions;

});
___scope___.file("modules/workflow-designer/components/step-editor/variables-editor.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b;
const React = require("react");
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const Text = require('react-icons/lib/fa/font');
const File = require('react-icons/lib/fa/file-text-o');
const Remove = require('react-icons/lib/fa/times-circle');
const options_1 = require("../options");
const workflow_1 = require("../../models/workflow");
const style_1 = require("../../style");
let injectSheet = require('react-jss').default;
const jssStyles = (theme) => ({
    fieldBlock: {
        composes: 'pure-g block-force base-border-color component-padding-bottom',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: theme.ide ? undefined : '#ddd',
        paddingBottom: '10px',
        '&:last-child': {
            borderBottom: 'none',
            paddingBottom: '0px'
        },
    },
    editorDiv: {
        composes: 'pure-u-1 pure-u-lg-5-6'
    },
    optionSettings: {
        composes: 'pure-u-1 pure-u-lg-1-6',
        textAlign: 'right',
        paddingLeft: '0px',
        [style_1.mediaQueries.lg]: {
            paddingLeft: '10px'
        }
    },
    options: {
        '& > .btn-group': {
            width: '100%',
            '& > button': {
                width: '50%'
            }
        }
    },
    deleteButton: {
        composes: theme.ide ? 'btn btn-error btn-block' : 'pure-button danger',
        width: '100%',
        display: 'block',
        '& > svg': {
            position: 'relative',
            display: 'inline-block',
            top: '-0.10em'
        }
    }
});
class EditorState {
    constructor(variables, source, committed, sourceType) {
        this.variables = variables;
        this.source = source;
        this.committed = committed;
        this.sourceType = sourceType;
    }
    commitIfNecessary() {
        if (!this.committed) {
            this.variables.push(this.source);
            this.committed = true;
        }
    }
}
exports.EditorState = EditorState;
let VariablesEditor = class VariablesEditor extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.setState({ sourceType: 'pair' });
    }
    get variables() {
        return this.props.variables;
    }
    sourceTypeEditor() {
        return React.createElement("div", { className: "pure-g" },
            React.createElement("div", { className: "pure-u-1-4 pure-u-lg-0" }),
            React.createElement("div", { className: "pure-u-3-4 pure-u-lg-1" },
                React.createElement(options_1.Options, { selected: this.state && this.state.sourceType, ide: this.props.ide, className: this.props.classes.options, onChange: a => this.setSourceType(a.value), options: this.sourceTypes() })));
    }
    remove(e, source) {
        this.variables.splice(this.variables.indexOf(source), 1);
        e.preventDefault();
    }
    sourceEditor(source, key, committed) {
        let editor = this.props.sourceEditorFactory(source, new EditorState(this.variables, source, committed, this.state.sourceType));
        return (React.createElement("div", { className: this.props.classes.fieldBlock, key: key },
            React.createElement("div", { className: this.props.classes.editorDiv }, editor),
            React.createElement("div", { className: this.props.classes.optionSettings },
                committed && this.deleteButton(source),
                !committed && !this.props.onlyPairs && this.sourceTypeEditor())));
    }
    deleteButton(source) {
        return React.createElement("div", { className: "pure-g" },
            React.createElement("div", { className: "pure-u-1-4 pure-u-lg-0" }),
            React.createElement("div", { className: "pure-u-3-4 pure-u-lg-1" },
                React.createElement("button", { className: this.props.classes.deleteButton, onClick: e => this.remove(e, source) },
                    React.createElement(Remove, null),
                    " Remove")));
    }
    sourceEditors() {
        let editors = [];
        if (this.variables) {
            for (let i = 0; i <= this.variables.length; i++) {
                let source = undefined;
                let committed = false;
                if (i < this.variables.length) {
                    source = this.variables[i];
                    committed = true;
                }
                else {
                    source = this.props.sourceFactory();
                }
                editors.push(this.sourceEditor(source, i, committed));
            }
        }
        else {
            editors.push(this.sourceEditor(this.props.sourceFactory(), 0, false));
        }
        return editors;
    }
    sourceTypes() {
        return [
            {
                display: (React.createElement(Text, null)),
                value: 'pair'
            },
            {
                display: (React.createElement(File, null)),
                value: 'file'
            }
        ];
    }
    setSourceType(source) {
        this.setState({ sourceType: source });
    }
    render() {
        return (React.createElement("div", null, this.sourceEditors()));
    }
};
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = (typeof React !== "undefined" && React).MouseEvent) === "function" && _a || Object, typeof (_b = typeof workflow_1.KeyValueEntry !== "undefined" && workflow_1.KeyValueEntry) === "function" && _b || Object]),
    __metadata("design:returntype", void 0)
], VariablesEditor.prototype, "remove", null);
VariablesEditor = __decorate([
    injectSheet(jssStyles),
    mobx_react_1.observer,
    __metadata("design:paramtypes", [Object])
], VariablesEditor);
exports.VariablesEditor = VariablesEditor;
//import { WorkflowStepSimple } from '../../models/workflow';
//import { translate } from '../../services/translation-service';
//import { VariableEditor } from './variable-editor';

});
___scope___.file("modules/workflow-designer/components/step-editor/volume-options.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
const React = require("react");
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const Remove = require('react-icons/lib/fa/times-circle');
const workflow_1 = require("../../models/workflow");
const volume_editor_1 = require("./volume-editor");
const style_1 = require("../../style");
let injectSheet = require('react-jss').default;
const jssStyles = (theme) => {
    return {
        fieldBlock: {
            composes: 'pure-g block-force base-border-color component-padding-bottom',
            borderBottomWidth: theme.ide ? '1px' : '0px',
            borderBottomStyle: 'solid',
            '&:last-child': {
                borderBottom: 'none',
                paddingBottom: '0px'
            },
            [style_1.mediaQueries.lg]: {
                borderBottom: 'none',
                paddingBottom: '0px'
            }
        },
        optionSettings: {
            composes: 'pure-u-1 pure-u-lg-1-6',
            textAlign: 'right',
            paddingLeft: '0px',
            [style_1.mediaQueries.lg]: {
                paddingLeft: '10px'
            }
        },
        deleteButton: {
            composes: theme.ide ? 'btn btn-error btn-block' : 'pure-button danger',
            width: '100%',
            display: 'block',
            '& > svg': {
                position: 'relative',
                display: 'inline-block',
                top: '-0.10em'
            }
        },
        editorDiv: {
            composes: 'pure-u-1 pure-u-lg-5-6'
        }
    };
};
class EditorState {
    constructor(step, volume, committed) {
        this.step = step;
        this.volume = volume;
        this.committed = committed;
    }
    commitIfNecessary() {
        if (!this.committed) {
            if (!this.step.volumes) {
                this.step.volumes = [];
            }
            this.step.volumes.push(this.volume);
            this.committed = true;
        }
    }
}
class EditorVolume {
    constructor() {
        this.mountPath = '';
        this.hostPath = '';
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], EditorVolume.prototype, "mountPath", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], EditorVolume.prototype, "hostPath", void 0);
let VolumeOptions = class VolumeOptions extends React.Component {
    constructor(props) {
        super(props);
    }
    get volumes() {
        return this.props.step.volumes;
    }
    remove(volume) {
        this.volumes.splice(this.volumes.indexOf(volume), 1);
    }
    volumeEditor(volume, key, committed) {
        let state = new EditorState(this.props.step, volume, committed), classes = this.props.classes, editor = (React.createElement(volume_editor_1.VolumeEditor, { volume: volume, onChange: () => state.commitIfNecessary() }));
        return (React.createElement("div", { className: classes.fieldBlock, key: key },
            React.createElement("div", { className: classes.editorDiv }, editor),
            React.createElement("div", { className: classes.optionSettings }, committed && this.deleteButton(volume))));
    }
    deleteButton(volume) {
        return React.createElement("div", { className: "pure-g" },
            React.createElement("div", { className: "pure-u-1-4 pure-u-lg-0" }),
            React.createElement("div", { className: "pure-u-3-4 pure-u-lg-1" },
                React.createElement("button", { className: this.props.classes.deleteButton, onClick: e => this.remove(volume) },
                    React.createElement(Remove, null),
                    " Remove")));
    }
    sourceEditors() {
        let editors = [];
        if (this.volumes) {
            for (let i = 0; i <= this.volumes.length; i++) {
                let volume = undefined;
                let committed = false;
                if (i < this.volumes.length) {
                    volume = this.volumes[i];
                    committed = true;
                }
                else {
                    volume = new EditorVolume();
                }
                editors.push(this.volumeEditor(volume, i, committed));
            }
        }
        else {
            editors.push(this.volumeEditor(new EditorVolume(), 0, false));
        }
        return editors;
    }
    render() {
        //let classes = this.props.classes || {}
        return (React.createElement("div", null, this.sourceEditors()));
    }
};
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof workflow_1.Volume !== "undefined" && workflow_1.Volume) === "function" && _a || Object]),
    __metadata("design:returntype", void 0)
], VolumeOptions.prototype, "remove", null);
VolumeOptions = __decorate([
    injectSheet(jssStyles),
    mobx_react_1.observer,
    __metadata("design:paramtypes", [Object])
], VolumeOptions);
exports.VolumeOptions = VolumeOptions;
//import { Options } from '../options';
//import { translate } from '../../services/translation-service';
//const Text = require('react-icons/lib/fa/font');
//const File = require('react-icons/lib/fa/file-text-o');

});
___scope___.file("modules/workflow-designer/components/step-editor/volume-editor.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
let injectSheet = require('react-jss').default;
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const centered_content_1 = require("../../util/centered-content");
const translation_service_1 = require("../../services/translation-service");
const styles = (theme) => ({
    mountPath: {
        composes: 'pure-u-1-6',
        textAlign: 'right'
    },
    hostPath: {
        composes: 'pure-u-1-6',
        textAlign: 'right'
    },
    label: {
        paddingRight: '5px'
    },
    input: {
        composes: 'pure-input-1 code input-text native-key-bindings'
    }
});
let VolumeEditor = class VolumeEditor extends React.Component {
    constructor(props) {
        super(props);
    }
    notifyChange() {
        if (this.props.onChange) {
            this.props.onChange();
        }
    }
    setMountPath(name) {
        this.props.volume.mountPath = name;
        this.notifyChange();
    }
    setHostPath(value) {
        this.props.volume.hostPath = value;
        this.notifyChange();
    }
    render() {
        let classes = this.props.classes || {};
        return (React.createElement("div", { className: "pure-g" },
            React.createElement("label", { className: classes.mountPath },
                React.createElement(centered_content_1.CenteredContent, null,
                    React.createElement("span", { className: classes.label },
                        translation_service_1.translate('LABEL_MOUNT_PATH'),
                        ":"))),
            React.createElement("div", { className: "pure-u-1-3" },
                React.createElement("input", { className: classes.input, type: "text", value: this.props.volume.mountPath, onChange: e => this.setMountPath(e.target.value) })),
            React.createElement("label", { className: classes.hostPath },
                React.createElement(centered_content_1.CenteredContent, null,
                    React.createElement("span", { className: classes.label },
                        translation_service_1.translate('LABEL_HOST_PATH'),
                        ":"))),
            React.createElement("div", { className: "pure-u-1-3" },
                React.createElement("input", { className: classes.input, type: "text", value: this.props.volume.hostPath, onChange: e => this.setHostPath(e.target.value) }))));
    }
};
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VolumeEditor.prototype, "setMountPath", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VolumeEditor.prototype, "setHostPath", null);
VolumeEditor = __decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    __metadata("design:paramtypes", [Object])
], VolumeEditor);
exports.VolumeEditor = VolumeEditor;

});
___scope___.file("modules/workflow-designer/components/step-editor/health-options.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b;
const React = require("react");
let injectSheet = require('react-jss').default;
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
//import { observable, computed } from 'mobx';
//const Text = require('react-icons/lib/fa/font');
//const File = require('react-icons/lib/fa/file-text-o');
//const Remove = require('react-icons/lib/fa/times-circle');
//import { editorStyles } from '../../style';
//import { Creatable, Option, OptionValues } from 'react-select';
const options_1 = require("../options");
const centered_content_1 = require("../../util/centered-content");
const translation_service_1 = require("../../services/translation-service");
const workflow_1 = require("../../models/workflow");
const variables_editor_1 = require("../../components/step-editor/variables-editor");
const variable_editor_1 = require("../../components/step-editor/variable-editor");
const styles = (theme) => ({
    labelContainer: {
        textAlign: 'right'
    },
    smallLabelContainer: {
        composes: '$labelContainer pure-u-1-6'
    },
    largeLabelContainer: {
        composes: '$labelContainer pure-u-5-6'
    },
    healthNumberPropDiv: {
        composes: 'pure-u-1 pure-u-lg-1-2 block'
    },
    healthNumberPropFieldDiv: {
        composes: 'pure-u-1-6'
    },
    healthNumberPropField: {
        composes: 'pure-input-1 input-text native-key-bindings'
    },
    headersTitle: {
        composes: theme.ide ? 'tab-border' : '',
        marginTop: '0px',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        paddingBottom: '5px',
        fontSize: '1em'
    },
    label: {
        paddingRight: '5px'
    }
});
let HealthOptions = class HealthOptions extends React.Component {
    constructor(props) {
        super(props);
    }
    get typeField() {
        let field = this.props.typeField || 'healthCheckType';
        return this.props.step.transient[field];
    }
    get healthField() {
        let field = this.props.field || 'health';
        if (this.props.step[field].skipWait !== undefined) {
            return this.props.step[field];
        }
        else {
            return this.props.step[field];
        }
    }
    get isReadiness() {
        return this.healthField.skipWait !== undefined;
    }
    get currentHealthCheckType() {
        if (this.props.step) {
            if (this.typeField) {
                return this.typeField;
            }
            else if (this.healthField && this.healthField.type) {
                return this.healthField.type;
            }
        }
        return 'script';
    }
    setHealthCheckType(checkType) {
        let field = this.props.typeField || 'healthCheckType';
        this.props.step.transient[field] = checkType;
    }
    healthCheckTypes() {
        return workflow_1.HealthTypes.map(type => ({
            value: type,
            display: (React.createElement("span", null, translation_service_1.translate('OPTION_' + type.toUpperCase())))
        }));
    }
    scriptTypeEditor() {
        let classes = this.props.classes || {};
        return (React.createElement("div", { className: "pure-g" },
            React.createElement("label", { className: classes.smallLabelContainer },
                React.createElement(centered_content_1.CenteredContent, null,
                    React.createElement("span", { className: classes.label },
                        translation_service_1.translate('LABEL_SCRIPT'),
                        ":"))),
            React.createElement("div", { className: "pure-u-5-6" },
                React.createElement("input", { className: "pure-input-1 input-text native-key-bindings", type: "text", value: this.healthField.script || "", onChange: e => this.setHealthCheckProperty(() => this.healthField.script = e.target.value) }))));
    }
    requestTypeEditor(checkType) {
        let classes = this.props.classes || {};
        return (React.createElement("div", { className: "pure-g" },
            React.createElement("label", { className: classes.smallLabelContainer },
                React.createElement(centered_content_1.CenteredContent, null,
                    React.createElement("span", { className: classes.label },
                        translation_service_1.translate('LABEL_PORT'),
                        ":"))),
            React.createElement("div", { className: checkType === "tcp" ? "pure-u-5-6" : "pure-u-1-3" },
                React.createElement("input", { className: "pure-input-1 input-text native-key-bindings", type: "text", value: this.healthField.port || "", onChange: e => this.setHealthCheckProperty(() => this.healthField.port = e.target.value) })),
            checkType !== "tcp" &&
                (React.createElement("label", { className: classes.smallLabelContainer },
                    React.createElement(centered_content_1.CenteredContent, null,
                        React.createElement("span", { className: classes.label },
                            translation_service_1.translate('LABEL_PATH'),
                            ":")))),
            checkType !== "tcp" &&
                (React.createElement("div", { className: "pure-u-1-3" },
                    React.createElement("input", { className: "pure-input-1 input-text native-key-bindings", type: "text", value: this.healthField.path, onChange: e => this.setHealthCheckProperty(() => this.healthField.path = e.target.value) })))));
    }
    selectedEditor() {
        //let classes = this.props.classes || {};
        let type = this.currentHealthCheckType;
        return (React.createElement("div", { className: "pure-u-1 block" }, type && (type === 'script' ? this.scriptTypeEditor() : this.requestTypeEditor(type))));
    }
    setHealthCheckProperty(setter) {
        setter();
    }
    toggleSkipWait(e) {
        this.healthField.skipWait = e.currentTarget.checked;
    }
    get skipWait() {
        return this.healthField.skipWait === true;
    }
    healthCheckNumberProperty(property) {
        let classes = this.props.classes || {};
        //@ts-ignore
        let onNumberChange = (property, e) => {
            this.setHealthCheckProperty(() => {
                let value = parseInt(e.target.value);
                if (!isNaN(value)) {
                    //@ts-ignore
                    let stringVal = value;
                    this.healthField[property] = value;
                }
            });
        };
        return (React.createElement("div", { className: classes.healthNumberPropDiv },
            React.createElement("div", { className: "pure-g" },
                React.createElement("label", { className: classes.largeLabelContainer },
                    React.createElement(centered_content_1.CenteredContent, null,
                        React.createElement("span", { className: classes.label },
                            translation_service_1.translate('LABEL_' + property.toUpperCase()),
                            ":"))),
                React.createElement("div", { className: classes.healthNumberPropFieldDiv },
                    React.createElement("input", { type: "text", className: classes.healthNumberPropField, value: this.healthField[property] || "", onChange: e => this.setHealthCheckProperty(() => this.healthField[property] = parseInt(e.target.value)) })))));
    }
    render() {
        let classes = this.props.classes || {};
        return (React.createElement("div", { className: "pure-g" },
            React.createElement("div", { className: "pure-u-1 block" },
                React.createElement(options_1.Options, { ide: this.props.ide, fill: true, options: this.healthCheckTypes(), onChange: a => this.setHealthCheckType(a.value), selected: this.currentHealthCheckType })),
            this.isReadiness &&
                (React.createElement("div", { className: "pure-u-1 block" },
                    React.createElement("label", { className: "input-label" },
                        React.createElement("input", { className: "input-checkbox", type: "checkbox", checked: this.skipWait, onChange: e => this.toggleSkipWait(e) }),
                        ' ',
                        translation_service_1.translate('OPTION_SKIP_WAIT')))),
            this.selectedEditor(),
            this.healthCheckNumberProperty('interval'),
            this.healthCheckNumberProperty('retries'),
            this.healthCheckNumberProperty('timeout'),
            this.healthCheckNumberProperty('grace'),
            (this.currentHealthCheckType === 'http' || this.currentHealthCheckType === 'https') &&
                React.createElement("div", { className: "pure-u-1 block" },
                    React.createElement("h3", { className: classes.headersTitle }, "Headers"),
                    React.createElement(variables_editor_1.VariablesEditor, { variables: this.healthField.headers, ide: this.props.ide, onlyPairs: true, sourceEditorFactory: variable_editor_1.variableEditorFactory, sourceFactory: variable_editor_1.variableSourceFactory }))));
    }
};
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof workflow_1.HealthType !== "undefined" && workflow_1.HealthType) === "function" && _a || Object]),
    __metadata("design:returntype", void 0)
], HealthOptions.prototype, "setHealthCheckType", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", void 0)
], HealthOptions.prototype, "setHealthCheckProperty", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = (typeof React !== "undefined" && React).ChangeEvent) === "function" && _b || Object]),
    __metadata("design:returntype", void 0)
], HealthOptions.prototype, "toggleSkipWait", null);
HealthOptions = __decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    __metadata("design:paramtypes", [Object])
], HealthOptions);
exports.HealthOptions = HealthOptions;

});
___scope___.file("modules/workflow-designer/components/step-editor/variable-editor.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
let injectSheet = require('react-jss').default;
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const centered_content_1 = require("../../util/centered-content");
const translation_service_1 = require("../../services/translation-service");
const styles = (theme) => ({
    labelContainer: {
        composes: 'pure-u-1-4',
        textAlign: 'right'
    },
    fieldContainer: {
        composes: 'pure-u-3-4'
    },
    doubleLabelContainer: {
        composes: 'pure-u-1-4 pure-u-lg-1-8',
        textAlign: 'right'
    },
    doubleFieldContainer: {
        composes: 'pure-u-3-4 pure-u-lg-7-8'
    },
    label: {
        paddingRight: '5px'
    },
    input: {
        composes: `code pure-input-1 input-text native-key-bindings`
    }
});
class VariableSource {
    constructor() {
        this.file = '';
        this.name = '';
        this.value = '';
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], VariableSource.prototype, "file", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], VariableSource.prototype, "name", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], VariableSource.prototype, "value", void 0);
exports.VariableSource = VariableSource;
function variableSourceFactory() {
    return new VariableSource();
}
exports.variableSourceFactory = variableSourceFactory;
function variableEditorFactory(source, state) {
    return React.createElement(VariableEditor, { source: source, sourceType: state.committed ? (source.file ? 'file' : 'pair') : state.sourceType, onChange: () => state.commitIfNecessary() });
}
exports.variableEditorFactory = variableEditorFactory;
let VariableEditor = class VariableEditor extends React.Component {
    constructor(props) {
        super(props);
    }
    notifyChange() {
        if (this.props.onChange) {
            this.props.onChange();
        }
    }
    setFile(file) {
        this.props.source.file = file;
        this.notifyChange();
    }
    setName(name) {
        this.props.source.name = name;
        this.notifyChange();
    }
    setValue(value) {
        this.props.source.value = value;
        this.notifyChange();
    }
    render() {
        let classes = this.props.classes || {};
        return this.props.sourceType === 'pair' ?
            (React.createElement("div", { className: "pure-g" },
                React.createElement("div", { className: "pure-u-1 pure-u-lg-1-2 block-md" },
                    React.createElement("div", { className: "pure-g" },
                        React.createElement("label", { className: classes.labelContainer },
                            React.createElement(centered_content_1.CenteredContent, null,
                                React.createElement("span", { className: classes.label },
                                    translation_service_1.translate('LABEL_NAME'),
                                    ":"))),
                        React.createElement("div", { className: classes.fieldContainer },
                            React.createElement("input", { className: classes.input, type: "text", value: this.props.source.name, onChange: e => this.setName(e.target.value) })))),
                React.createElement("div", { className: "pure-u-1 pure-u-lg-1-2 block-md" },
                    React.createElement("div", { className: "pure-g" },
                        React.createElement("label", { className: classes.labelContainer },
                            React.createElement(centered_content_1.CenteredContent, null,
                                React.createElement("span", { className: classes.label },
                                    translation_service_1.translate('LABEL_VALUE'),
                                    ":"))),
                        React.createElement("div", { className: classes.fieldContainer },
                            React.createElement("input", { className: classes.input, type: "text", value: this.props.source.value, onChange: e => this.setValue(e.target.value) })))))) :
            (this.props.sourceType === 'file' &&
                React.createElement("div", { className: "pure-g block-md" },
                    React.createElement("label", { className: classes.doubleLabelContainer },
                        React.createElement(centered_content_1.CenteredContent, null,
                            React.createElement("span", { className: classes.label },
                                translation_service_1.translate('LABEL_FILE'),
                                ":"))),
                    React.createElement("div", { className: classes.doubleFieldContainer },
                        React.createElement("input", { className: classes.input, type: "text", value: this.props.source.file, onChange: e => this.setFile(e.target.value) }))));
    }
};
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VariableEditor.prototype, "setFile", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VariableEditor.prototype, "setName", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VariableEditor.prototype, "setValue", null);
VariableEditor = __decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    __metadata("design:paramtypes", [Object])
], VariableEditor);
exports.VariableEditor = VariableEditor;

});
___scope___.file("modules/workflow-designer/components/drop-down-menu.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
let injectSheet = require('react-jss').default;
//import { computed } from 'mobx';
//import { editorStyles, themeColors } from '../style';
const hoverItem = {
    color: '#000',
    background: 'none',
    fontWeight: '700'
};
const hoverLabel = {
    color: '#000',
    background: 'none'
};
const styles = (theme) => {
    if (theme.ide) {
        return {
            container: {
                composes: 'block padded'
            },
            menu: {
                composes: 'btn-group'
            },
            button: {
                composes: 'btn'
            }
        };
    }
    else {
        return {
            container: {
                composes: 'pure-menu pure-menu-horizontal',
                display: 'inline-block',
                width: 'auto'
            },
            menuLabelContainer: {
                composes: 'pure-menu pure-menu-horizontal'
            },
            menuLabel: {
                composes: 'pure-menu-item pure-menu-has-children pure-menu-allow-hover',
                background: 'none',
                color: '#aaa',
                fontWeight: 'bold',
                '&:hover': hoverLabel,
                '&:focus': hoverLabel
            },
            labelLink: {
                composes: theme.ide ? "" : "pure-button",
                textDecoration: 'none',
                'a&': { color: '#444' },
                '&:hover': theme.ide ? Object.assign({ cursor: "pointer" }, hoverLabel) : {},
                '&:focus': hoverLabel
            },
            menuContainer: {
                composes: 'pure-menu-children',
                padding: '5px',
                border: 'solid 1px #ccc',
                zIndex: '10',
                minWidth: '100%',
                boxSizing: 'border-box',
            },
            item: {
                composes: 'pure-menu-link',
                padding: '10px 15px',
                fontWeight: '500',
                borderBottom: 'solid 3px transparent',
                'a&': { color: '#444' },
                '&:hover': hoverItem,
                '&:focus': {
                    background: 'none',
                    color: '#444',
                    fontWeight: '700'
                }
            }
        };
    }
};
let DropDownMenu = class DropDownMenu extends React.Component {
    constructor(props) {
        super(props);
    }
    handleClick(e, item) {
        if (item.onClick) {
            item.onClick();
        }
        e.preventDefault();
    }
    item(item, key) {
        let classes = this.props.classes || {};
        return this.props.ide ?
            (React.createElement("button", { key: key, className: classes.button, onClick: e => this.handleClick(e, item) }, item.display)) :
            (React.createElement("li", { key: key, className: "pure-menu-item", onClick: e => this.handleClick(e, item) },
                React.createElement("a", { href: "#", className: classes.item }, item.display)));
    }
    render() {
        let classes = this.props.classes || {};
        return this.props.ide ?
            (React.createElement("div", null,
                React.createElement("h3", null,
                    this.props.label,
                    ":"),
                React.createElement("div", { className: "block" },
                    React.createElement("div", { className: "btn-group" }, this.props.items && this.props.items.map((b, i) => this.item(b, i)))))) :
            (React.createElement("div", { className: classes.menuLabelContainer },
                React.createElement("li", { className: classes.menuLabel },
                    React.createElement("a", { className: classes.labelLink },
                        this.props.label,
                        " ",
                        React.createElement("span", { className: "Select-arrow" })),
                    React.createElement("ul", { className: classes.menuContainer }, this.props.items && this.props.items.map((b, i) => this.item(b, i))))));
    }
};
DropDownMenu = __decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    __metadata("design:paramtypes", [Object])
], DropDownMenu);
exports.DropDownMenu = DropDownMenu;

});
___scope___.file("modules/workflow-designer/components/tooltip.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const InfoCircle = require('react-icons/lib/fa/info-circle');
const ReactTooltip = require('react-tooltip');
let injectSheet = require('react-jss').default;
var tooltipCount = 0;
const styles = (theme) => ({
    solid: {
        composes: 'tooltip',
        pointerEvents: 'auto !important',
        '&:hover': {
            visibility: 'visible !important',
            opacity: '1 !important'
        }
    }
});
let InfoTooltip = class InfoTooltip extends React.Component {
    constructor(props) {
        super(props);
        this.tooltipId = 'InfoTooltip-' + tooltipCount++;
    }
    componentWillUpdate() {
        ReactTooltip.rebuild();
    }
    componentWillMount() {
        ReactTooltip.rebuild();
    }
    render() {
        let classes = this.props.classes || {};
        return React.createElement("span", { "data-tip": "", "data-for": this.tooltipId, "data-delay-hide": 300, "data-effect": 'solid', "data-class": classes.solid, className: this.props.className || '' },
            React.createElement(InfoCircle, null),
            React.createElement(ReactTooltip, { id: this.tooltipId }, this.props.children));
    }
};
InfoTooltip = __decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    __metadata("design:paramtypes", [Object])
], InfoTooltip);
exports.InfoTooltip = InfoTooltip;
//import { computed } from 'mobx';

});
___scope___.file("modules/workflow-designer/components/step-editor/port-editor.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
let injectSheet = require('react-jss').default;
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const centered_content_1 = require("../../util/centered-content");
const translation_service_1 = require("../../services/translation-service");
const react_select_1 = require("react-select");
const styles = (theme) => ({
    labelContainer: {
        composes: 'pure-u-1-3',
        textAlign: 'right'
    },
    fieldContainer: {
        composes: 'pure-u-2-3'
    },
    doubleLabelContainer: {
        composes: 'pure-u-1-3 pure-u-lg-1-6',
        textAlign: 'right'
    },
    doubleFieldContainer: {
        composes: 'pure-u-2-3 pure-u-lg-5-6'
    },
    label: {
        paddingRight: '5px'
    },
    input: {
        composes: `code pure-input-1 input-text native-key-bindings`
    }
});
class PortEntrySource {
    constructor() {
        this.name = '';
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], PortEntrySource.prototype, "name", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], PortEntrySource.prototype, "containerPort", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], PortEntrySource.prototype, "internalPort", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Number)
], PortEntrySource.prototype, "externalPort", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], PortEntrySource.prototype, "protocol", void 0);
exports.PortEntrySource = PortEntrySource;
function portEntrySourceFactory() {
    return new PortEntrySource();
}
exports.portEntrySourceFactory = portEntrySourceFactory;
function portEditorFactory(source, state) {
    return React.createElement(PortEditor, { source: source, onChange: () => state.commitIfNecessary() });
}
exports.portEditorFactory = portEditorFactory;
let PortEditor = class PortEditor extends React.Component {
    constructor(props) {
        super(props);
    }
    notifyChange() {
        if (this.props.onChange) {
            this.props.onChange();
        }
    }
    setName(name) {
        this.props.source.name = name;
        this.notifyChange();
    }
    setContainerPort(value) {
        if (this.props.source.containerPort !== value) {
            this.props.source.containerPort = value;
            this.notifyChange();
        }
    }
    setInternalPort(value) {
        if (this.props.source.internalPort !== value) {
            this.props.source.internalPort = value;
            this.notifyChange();
        }
    }
    setExternalPort(value) {
        if (this.props.source.externalPort !== value) {
            this.props.source.externalPort = value;
            this.notifyChange();
        }
    }
    setProtocol(value) {
        this.props.source.protocol = value;
        this.notifyChange();
    }
    render() {
        let classes = this.props.classes || {};
        let portProtocols = [{ label: 'tcp', value: 'tcp' }, { label: 'udp', value: 'udp' }];
        return React.createElement("div", null,
            React.createElement("div", { className: "pure-g block not-block-md" },
                React.createElement("div", { className: "pure-u-1 pure-u-lg-1-2 block-md" },
                    React.createElement("div", { className: "pure-g" },
                        React.createElement("label", { className: classes.labelContainer },
                            React.createElement(centered_content_1.CenteredContent, null,
                                React.createElement("span", { className: classes.label },
                                    translation_service_1.translate('LABEL_CONTAINER_PORT'),
                                    ":"))),
                        React.createElement("div", { className: classes.fieldContainer },
                            React.createElement("input", { className: classes.input, type: "text", value: this.props.source.containerPort || '', onChange: e => this.setContainerPort(parseInt(e.target.value)) })))),
                React.createElement("div", { className: "pure-u-1 pure-u-lg-1-2 block-md" },
                    React.createElement("div", { className: "pure-g" },
                        React.createElement("label", { className: classes.labelContainer },
                            React.createElement(centered_content_1.CenteredContent, null,
                                React.createElement("span", { className: classes.label },
                                    translation_service_1.translate('LABEL_INTERNAL_PORT'),
                                    ":"))),
                        React.createElement("div", { className: classes.fieldContainer },
                            React.createElement("input", { className: classes.input, type: "text", value: this.props.source.internalPort || '', onChange: e => this.setInternalPort(parseInt(e.target.value)) }))))),
            React.createElement("div", { className: "pure-g block not-block-md" },
                React.createElement("div", { className: "pure-u-1 block-md" },
                    React.createElement("div", { className: "pure-g" },
                        React.createElement("label", { className: classes.doubleLabelContainer },
                            React.createElement(centered_content_1.CenteredContent, null,
                                React.createElement("span", { className: classes.label },
                                    translation_service_1.translate('LABEL_NAME'),
                                    ":"))),
                        React.createElement("div", { className: classes.doubleFieldContainer },
                            React.createElement("input", { className: classes.input, type: "text", value: this.props.source.name || '', onChange: e => this.setName(e.target.value) }))))),
            React.createElement("div", { className: "pure-g" },
                React.createElement("div", { className: "pure-u-1 pure-u-lg-1-2 block-md" },
                    React.createElement("div", { className: "pure-g" },
                        React.createElement("label", { className: classes.labelContainer },
                            React.createElement(centered_content_1.CenteredContent, null,
                                React.createElement("span", { className: classes.label },
                                    translation_service_1.translate('LABEL_EXTERNAL_PORT'),
                                    ":"))),
                        React.createElement("div", { className: classes.fieldContainer },
                            React.createElement("input", { className: classes.input, type: "text", value: this.props.source.externalPort || '', onChange: e => this.setExternalPort(parseInt(e.target.value)) })))),
                React.createElement("div", { className: "pure-u-1 pure-u-lg-1-2 block-md" },
                    React.createElement("div", { className: "pure-g" },
                        React.createElement("label", { className: classes.labelContainer },
                            React.createElement(centered_content_1.CenteredContent, null,
                                React.createElement("span", { className: classes.label },
                                    translation_service_1.translate('LABEL_PROTOCOL'),
                                    ":"))),
                        React.createElement("div", { className: classes.fieldContainer },
                            React.createElement(react_select_1.default, { className: classes.tagSelect, clearable: false, searchable: false, options: portProtocols, onChange: option => this.setProtocol(option.value), value: this.props.source.protocol || 'tcp' }))))));
    }
};
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PortEditor.prototype, "setName", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PortEditor.prototype, "setContainerPort", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PortEditor.prototype, "setInternalPort", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PortEditor.prototype, "setExternalPort", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PortEditor.prototype, "setProtocol", null);
PortEditor = __decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    __metadata("design:paramtypes", [Object])
], PortEditor);
exports.PortEditor = PortEditor;

});
___scope___.file("modules/workflow-designer/components/image-field/image-field.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
const React = require("react");
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const translation_service_1 = require("../../services/translation-service");
const workflow_1 = require("../../models/workflow");
const options_1 = require("../options");
const catalog_image_field_1 = require("./catalog-image-field");
const manual_image_field_1 = require("./manual-image-field");
const step_image_field_1 = require("./step-image-field");
let injectSheet = require('react-jss').default;
const styles = (theme) => ({
    editor: {
        marginTop: '8px'
    }
});
let ImageField = class ImageField extends React.Component {
    constructor(props) {
        super(props);
    }
    get imageSource() {
        if (this.props.step.imageSource == 'step') {
            return this.props.step.imageSource;
        }
        let isCatalogImage = this.props.step.transient.imageSourceTypeSelected === undefined ?
            this.isImageInCatalog() : this.props.step.transient.imageSourceTypeSelected === 'catalog';
        return isCatalogImage ? 'catalog' : 'manual';
    }
    setImageSource(source) {
        this.props.step.transient.imageSourceTypeSelected = source;
        this.props.step.imageSource = source === 'step' ? 'step' : 'image';
    }
    imageSourceOption(source) {
        return {
            value: source,
            display: (React.createElement("span", null, translation_service_1.translate('SOURCE_' + source.toUpperCase())))
        };
    }
    options() {
        let options = [
            this.imageSourceOption('catalog'),
            this.imageSourceOption('manual')
        ];
        if (this.props.workflow.stepsBefore(this.props.step).length > 0) {
            options.push(this.imageSourceOption('step'));
        }
        return options;
    }
    isImageInCatalog() {
        let catalog = this.props.catalog || [], image = catalog_image_field_1.parseImage(this.props.step.image);
        let catalogImage = catalog.find(catEntry => catEntry.name === image.image);
        if (catalogImage) {
            let tag = catalogImage.tags.find(tag => tag === image.tag);
            if (tag) {
                return true;
            }
        }
        return false;
    }
    selectedEditor() {
        switch (this.imageSource) {
            case 'step':
                return (React.createElement(step_image_field_1.StepImageField, { step: this.props.step, workflow: this.props.workflow }));
            case 'manual':
                return (React.createElement(manual_image_field_1.ManualImageField, { step: this.props.step }));
            default:
                return (React.createElement(catalog_image_field_1.CatalogImageField, { catalog: this.props.catalog, step: this.props.step, workflow: this.props.workflow }));
        }
    }
    render() {
        let classes = this.props.classes || {};
        return (React.createElement("div", null,
            React.createElement(options_1.Options, { ide: this.props.ide, fill: true, options: this.options(), onChange: a => this.setImageSource(a.value), selected: this.imageSource }),
            React.createElement("div", { className: classes.editor }, this.selectedEditor())));
    }
};
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof workflow_1.UXImageSourceType !== "undefined" && workflow_1.UXImageSourceType) === "function" && _a || Object]),
    __metadata("design:returntype", void 0)
], ImageField.prototype, "setImageSource", null);
ImageField = __decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    __metadata("design:paramtypes", [Object])
], ImageField);
exports.ImageField = ImageField;
//import { EditorState } from '../../models/state';
//import { editorStyles, themeColors } from '../../style';
//import { ImageSource } from '../../models/workflow';

});
___scope___.file("modules/workflow-designer/components/image-field/catalog-image-field.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_virtualized_select_1 = require("react-virtualized-select");
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
let injectSheet = require('react-jss').default;
const translation_service_1 = require("../../services/translation-service");
const style_1 = require("../../style");
const catalog_select_1 = require("./catalog-select");
const centered_content_1 = require("../../util/centered-content");
const jssStyles = (theme) => ({
    editor: {
        composes: 'pure-u-g'
    },
    title: {
        composes: theme.ide ? 'text-color' : '',
        padding: 0,
        margin: 0,
        fontSize: '20px',
        fontWeight: 'bold',
        lineHeight: '24px'
    },
    placeholder: {
        composes: theme.ide ? 'text-color' : '',
        padding: 0,
        margin: 0,
        fontSize: '16px',
        lineHeight: '24px'
    },
    catalogSelectDiv: {
        composes: 'pure-u-1 pure-u-lg-3-4 block-md'
    },
    catalogSelect: {
        composes: style_1.editorStyles.largeSelect,
        [style_1.mediaQueries.lg]: {
            '& .Select-control': {
                'border-right': 'none',
                'border-top-right-radius': '0',
                'border-bottom-right-radius': '0',
            }
        }
    },
    tagSelectDiv: {
        composes: 'pure-u-1 pure-u-lg-1-4'
    },
    tagSelect: {
        composes: style_1.editorStyles.largeSelect + ' VirtualizedSelect',
        '& > .Select-control': {
            height: '40px',
            textAlign: 'center'
        },
        [style_1.mediaQueries.lg]: {
            '& > .Select-control': {
                height: '100px',
                textAlign: 'inherit',
                'border-top-left-radius': '0',
                'border-bottom-left-radius': '0',
            }
        }
    }
});
function parseImage(imageString) {
    let tagSeparator = imageString.lastIndexOf(':');
    return {
        image: tagSeparator > 0 ? imageString.substring(0, tagSeparator) : imageString,
        tag: tagSeparator > 0 ? imageString.substring(tagSeparator + 1) : ''
    };
}
exports.parseImage = parseImage;
let CatalogImageField = class CatalogImageField extends React.Component {
    constructor(props) {
        super(props);
        this.onImageChange = (image) => {
            this.props.step.image = image.name;
        };
        this.onTagChange = (tag) => {
            let image = this.props.step.image;
            if (image) {
                image = parseImage(image).image;
                if (!tag || tag === '') {
                    tag = 'latest';
                }
                this.props.step.image = image + ':' + tag;
            }
        };
        this.valueRenderer = (option) => {
            return (React.createElement(centered_content_1.CenteredContent, { container: false },
                React.createElement("div", { className: this.props.classes.title }, option.value)));
        };
    }
    get tags() {
        let currentStep = this.props.step;
        if (currentStep && currentStep.image && this.props.catalog) {
            let currentImage = parseImage(currentStep.image).image;
            let image = this.props.catalog.find(image => image.name === currentImage);
            if (image) {
                return image.tags.map(tag => ({ label: tag, value: tag }));
            }
        }
        return [];
    }
    get image() {
        if (this.props.step && this.props.step.image) {
            let image = this.props.step.image;
            return parseImage(image).image;
        }
        return '';
    }
    get tag() {
        if (this.props.step && this.props.step.image) {
            let image = this.props.step.image;
            let tag = 'latest';
            let tagSeparator = image.lastIndexOf(':');
            if (tagSeparator > 0) {
                tag = image.substring(tagSeparator + 1);
            }
            return tag;
        }
        return '';
    }
    placeholder() {
        return (React.createElement(centered_content_1.CenteredContent, null,
            React.createElement("div", { className: this.props.classes.placeholder }, translation_service_1.translate('PLACEHOLDER_VERSION'))));
    }
    render() {
        let classes = this.props.classes || {};
        return (React.createElement("div", { className: classes.editor },
            React.createElement("div", { className: classes.catalogSelectDiv },
                React.createElement(catalog_select_1.CatalogSelect, { className: classes.catalogSelect, catalog: this.props.catalog, value: this.image, onChange: this.onImageChange })),
            React.createElement("div", { className: classes.tagSelectDiv },
                React.createElement(react_virtualized_select_1.default, { className: classes.tagSelect, clearable: false, valueRenderer: this.valueRenderer, searchable: false, options: this.tags, optionHeight: 40, placeholder: this.placeholder(), maxHeight: 400, onChange: option => this.onTagChange(option.value), value: this.tag }))));
    }
};
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], CatalogImageField.prototype, "tags", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], CatalogImageField.prototype, "onImageChange", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], CatalogImageField.prototype, "onTagChange", void 0);
CatalogImageField = __decorate([
    injectSheet(jssStyles),
    mobx_react_1.observer,
    __metadata("design:paramtypes", [Object])
], CatalogImageField);
exports.CatalogImageField = CatalogImageField;

});
___scope___.file("modules/workflow-designer/components/image-field/catalog-select.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const react_virtualized_select_1 = require("react-virtualized-select");
let injectSheet = require('react-jss').default;
const translation_service_1 = require("../../services/translation-service");
const style_1 = require("../../style");
const centered_content_1 = require("../../util/centered-content");
//import { themeColors } from '../../style';
//import { EditorState } from '../../models/state';
//import { WorkflowStepSimple } from '../../models/workflow';
const jssStyles = (theme) => ({
    select: {
        composes: `${style_1.editorStyles.largeSelect} ${style_1.editorStyles.imageSelect}`,
        '& .Select-control .Select-value': {
            paddingLeft: '160px'
        },
        '& .Select-menu-outer $option': {
            paddingLeft: '160px'
        },
    },
    title: {
        composes: theme.ide ? 'text-color' : '',
        padding: 0,
        margin: 0,
        fontSize: '20px',
        fontWeight: 'bold',
        lineHeight: '24px'
    },
    placeholder: {
        composes: theme.ide ? 'text-color' : '',
        padding: 0,
        margin: 0,
        fontSize: '16px',
        lineHeight: '24px'
    },
    description: {
        composes: theme.ide ? 'text-color' : '',
        paddingRight: '20px',
        margin: 0,
        fontSize: '14px',
        lineHeight: '16px',
        whiteSpace: 'normal'
    },
    logo: {
        position: 'absolute',
        top: '10px',
        bottom: '10px',
        left: '20px',
        width: '120px',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50%',
        backgroundColor: 'white',
        border: '3px solid white',
    },
    option: {
        cursor: 'pointer',
        margin: 0,
        padding: '0 20px',
    },
    selected: {
        composes: 'selected',
    },
    focused: {
        composes: 'focused',
    }
});
const catalogBase = 'https://s3-eu-west-1.amazonaws.com/dev.stack.foundation/catalog/';
class ImageOption {
    constructor(option) {
        Object.assign(this, option);
    }
}
let CatalogSelect = class CatalogSelect extends React.Component {
    constructor(props) {
        super(props);
        this.valueRenderer = (option) => {
            const classes = this.props.classes || {};
            return (React.createElement(centered_content_1.CenteredContent, { container: false },
                React.createElement("div", { className: classes.title }, option.image.title),
                React.createElement("div", { className: classes.description }, option.image.description),
                React.createElement("div", { className: classes.logo, style: { backgroundImage: 'url(' + catalogBase + option.image.name + '.png)' } })));
        };
        this.optionRenderer = (options) => {
            let option = options.option;
            const classes = this.props.classes || {}, focused = options.focusedOption == option, selected = options.valueArray.indexOf(option) > -1;
            return (React.createElement(centered_content_1.CenteredContent, { className: `${classes.option} ${focused ? classes.focused : ''} ${selected ? classes.selected : ''}`, key: options.key, onClick: () => options.selectValue(option), onMouseOver: () => options.focusOption(option), style: options.style },
                React.createElement("div", { className: classes.title }, option.image.title),
                React.createElement("div", { className: classes.description }, option.image.description),
                React.createElement("div", { className: classes.logo, style: { backgroundImage: 'url(' + catalogBase + option.image.name + '.png)' } })));
        };
    }
    get options() {
        return this.props.catalog ?
            this.props.catalog
                .sort((a, b) => a.title.localeCompare(b.title))
                .map(image => new ImageOption({ image: image, value: image.name })) :
            [];
    }
    get selectedOption() {
        return this.options.find(el => el.image.name === this.props.value);
    }
    placeholder() {
        return (React.createElement(centered_content_1.CenteredContent, null,
            React.createElement("div", { className: this.props.classes.placeholder }, translation_service_1.translate('PLACEHOLDER_IMAGE'))));
    }
    render() {
        const classes = this.props.classes || {};
        return (React.createElement(react_virtualized_select_1.default, { className: `native-key-bindings ${classes.select} ${this.props.className || ''}`, options: this.options, optionRenderer: this.optionRenderer, searchable: false, optionHeight: 100, placeholder: this.placeholder(), maxHeight: 400, clearable: false, valueRenderer: this.valueRenderer, onChange: option => this.props.onChange(option.image), value: this.selectedOption }));
    }
};
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], CatalogSelect.prototype, "options", null);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], CatalogSelect.prototype, "selectedOption", null);
CatalogSelect = __decorate([
    injectSheet(jssStyles),
    mobx_react_1.observer,
    __metadata("design:paramtypes", [Object])
], CatalogSelect);
exports.CatalogSelect = CatalogSelect;

});
___scope___.file("modules/workflow-designer/components/image-field/manual-image-field.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
const React = require("react");
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
let ManualImageField = class ManualImageField extends React.Component {
    constructor(props) {
        super(props);
    }
    onImageChange(event) {
        this.props.step.image = event.target.value;
    }
    render() {
        return (React.createElement("div", { className: "pure-g" },
            React.createElement("div", { className: "pure-u-1 native-key-bindings" },
                React.createElement("input", { type: "text", className: "pure-input-1 input-text native-key-bindings", name: "image", value: this.props.step.image || '', onChange: e => this.onImageChange(e) }))));
    }
};
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = (typeof React !== "undefined" && React).ChangeEvent) === "function" && _a || Object]),
    __metadata("design:returntype", void 0)
], ManualImageField.prototype, "onImageChange", null);
ManualImageField = __decorate([
    mobx_react_1.observer,
    __metadata("design:paramtypes", [Object])
], ManualImageField);
exports.ManualImageField = ManualImageField;
//import { Workflow } from "../../models/workflow";
//import { EditorState } from '../../models/state';

});
___scope___.file("modules/workflow-designer/components/image-field/step-image-field.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_virtualized_select_1 = require("react-virtualized-select");
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
let injectSheet = require('react-jss').default;
const centered_content_1 = require("../../util/centered-content");
const translation_service_1 = require("../../services/translation-service");
const jssStyles = (theme) => ({
    title: {
        composes: theme.ide ? 'text-color' : '',
        padding: 0,
        margin: 0,
        fontSize: '20px',
        fontWeight: 'bold',
        lineHeight: '24px'
    },
    placeholder: {
        composes: theme.ide ? 'text-color' : '',
        padding: 0,
        margin: 0,
        fontSize: '16px',
        lineHeight: '24px'
    },
});
let StepImageField = class StepImageField extends React.Component {
    constructor(props) {
        super(props);
        this.valueRenderer = (option) => {
            return (React.createElement(centered_content_1.CenteredContent, null,
                React.createElement("div", { className: this.props.classes.title }, option.label)));
        };
    }
    onImageChange(image) {
        this.props.step.image = image;
    }
    placeholder() {
        return (React.createElement(centered_content_1.CenteredContent, null,
            React.createElement("div", { className: this.props.classes.placeholder }, translation_service_1.translate('PLACEHOLDER_IMAGE'))));
    }
    render() {
        return (React.createElement("div", { className: "pure-g" },
            React.createElement("div", { className: "pure-u-1" },
                React.createElement(react_virtualized_select_1.default, { className: "native-key-bindings", clearable: false, searchable: false, placeholder: this.placeholder(), valueRenderer: this.valueRenderer, options: this.props.workflow.stepsBefore(this.props.step), maxHeight: 400, onChange: option => this.onImageChange(option.value), value: this.props.step.image || '' }))));
    }
};
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StepImageField.prototype, "onImageChange", null);
StepImageField = __decorate([
    injectSheet(jssStyles),
    mobx_react_1.observer,
    __metadata("design:paramtypes", [Object])
], StepImageField);
exports.StepImageField = StepImageField;
//import { computed } from 'mobx';
//import { editorStyles } from '../../style';
//import { EditorState } from '../../models/state';

});
___scope___.file("modules/workflow-designer/components/step-editor/dockerfile-step-editor.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
const React = require("react");
const centered_content_1 = require("../../util/centered-content");
const translation_service_1 = require("../../services/translation-service");
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
//import { EditorState } from '../../models/state';
//import {  Workflow } from "../../models/workflow";
let injectSheet = require('react-jss').default;
const styles = (theme) => ({
    label: {
        composes: 'pure-u-1-6 text-right',
        paddingRight: '5px'
    }
});
let DockerfileStepEditor = class DockerfileStepEditor extends React.Component {
    constructor(props) {
        super(props);
    }
    onDockerfileChange(event) {
        this.props.step.dockerfile = event.target.value;
    }
    render() {
        return (React.createElement("div", { className: "pure-g" },
            React.createElement("div", { className: this.props.classes.label },
                React.createElement(centered_content_1.CenteredContent, null,
                    React.createElement("span", null,
                        translation_service_1.translate('LABEL_DOCKERFILE'),
                        ":"))),
            React.createElement("div", { className: "pure-u-5-6" },
                React.createElement("input", { type: "text", className: "pure-input-1 input-text native-key-bindings", name: "image", value: this.props.step.dockerfile || '', onChange: e => this.onDockerfileChange(e) }))));
    }
};
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = (typeof React !== "undefined" && React).ChangeEvent) === "function" && _a || Object]),
    __metadata("design:returntype", void 0)
], DockerfileStepEditor.prototype, "onDockerfileChange", null);
DockerfileStepEditor = __decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    __metadata("design:paramtypes", [Object])
], DockerfileStepEditor);
exports.DockerfileStepEditor = DockerfileStepEditor;

});
___scope___.file("modules/workflow-designer/components/step-editor/ext-workflow-step-editor.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
const React = require("react");
const centered_content_1 = require("../../util/centered-content");
const translation_service_1 = require("../../services/translation-service");
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const step_workflow_variables_1 = require("../../components/step-editor/step-workflow-variables");
//import { EditorState } from '../../models/state';
//import {  Workflow } from "../../models/workflow";
let injectSheet = require('react-jss').default;
const styles = (theme) => ({
    label: {
        composes: 'pure-u-1-6 text-right',
        paddingRight: '5px'
    }
});
;
let ExtWorkflowStepEditor = class ExtWorkflowStepEditor extends React.Component {
    constructor(props) {
        super(props);
    }
    onWorkflowChange(event) {
        this.props.step.target = event.target.value;
    }
    render() {
        return (React.createElement("div", { className: "pure-g" },
            React.createElement("div", { className: "pure-u-1 block" },
                React.createElement("div", { className: this.props.classes.label },
                    React.createElement(centered_content_1.CenteredContent, null,
                        React.createElement("span", null,
                            translation_service_1.translate('LABEL_WORKFLOW'),
                            ":"))),
                React.createElement("div", { className: "pure-u-5-6" },
                    React.createElement("input", { type: "text", className: "pure-input-1 input-text native-key-bindings", name: "image", value: this.props.step.target || '', onChange: e => this.onWorkflowChange(e) }))),
            React.createElement("div", { className: "pure-u-1" },
                React.createElement(step_workflow_variables_1.StepWorkflowVariables, { step: this.props.step }))));
    }
};
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = (typeof React !== "undefined" && React).ChangeEvent) === "function" && _a || Object]),
    __metadata("design:returntype", void 0)
], ExtWorkflowStepEditor.prototype, "onWorkflowChange", null);
ExtWorkflowStepEditor = __decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    __metadata("design:paramtypes", [Object])
], ExtWorkflowStepEditor);
exports.ExtWorkflowStepEditor = ExtWorkflowStepEditor;

});
___scope___.file("modules/workflow-designer/components/react-forms/validating-react-component.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b;
const React = require("react");
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const field_1 = require("./field");
const mobx_2 = require("mobx");
let FormReactComponent = class FormReactComponent extends React.Component {
    constructor(p, s) {
        super(p, s);
        this._fields = [];
        let componentWillReact = this.componentWillReact;
        this.componentWillReact = () => {
            this.refreshFields();
            componentWillReact.apply(this);
        };
    }
    componentWillReact() { }
    refreshFields() {
        for (var i = 0; i < this._fields.length; i++) {
            this.refreshField(this._fields[i]);
        }
    }
    refreshField(field, force = false) {
        let newVal = getProp(this, field.originalRef);
        if (force || newVal !== field.originalVal) {
            field.originalVal = field.fieldVal = newVal;
        }
        field.validate();
    }
    get fields() {
        return this._fields;
    }
    createField(originalRef, validatorFn) {
        let field = new field_1.Field(originalRef, validatorFn);
        this._fields.push(field);
        this.refreshField(field, true);
        return field;
    }
    updateField(field, newVal) {
        field.updateValue(newVal);
        if (field.valid) {
            setProp(field.fieldVal, this, field.originalRef);
            field.originalVal = field.fieldVal;
        }
    }
};
__decorate([
    mobx_2.observable,
    __metadata("design:type", Array)
], FormReactComponent.prototype, "_fields", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FormReactComponent.prototype, "refreshFields", null);
FormReactComponent = __decorate([
    mobx_react_1.observer,
    __metadata("design:paramtypes", [typeof (_a = typeof P !== "undefined" && P) === "function" && _a || Object, typeof (_b = typeof S !== "undefined" && S) === "function" && _b || Object])
], FormReactComponent);
exports.FormReactComponent = FormReactComponent;
function getProp(parent, accessor) {
    let accessorParts = accessor.split('.');
    for (var i = 0; i < accessorParts.length; i++) {
        if (!parent) {
            return undefined;
        }
        parent = parent[accessorParts[i]];
    }
    return parent;
}
function setProp(value, parent, accessor) {
    let accessorParts = accessor.split('.');
    for (var i = 0; i < accessorParts.length - 1; i++) {
        if (!parent) {
            return undefined;
        }
        parent = parent[accessorParts[i]];
    }
    parent[accessorParts[accessorParts.length - 1]] = value;
}

});
___scope___.file("modules/workflow-designer/components/react-forms/field.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b;
const mobx_1 = require("mobx");
class Field {
    constructor(originalRef, validator) {
        this._errors = [];
        this.originalRef = originalRef;
        this._validator = validator;
        this._errors = [];
    }
    get valid() {
        return this._errors && this._errors.length === 0;
    }
    get errors() {
        return this._errors;
    }
    updateValue(value) {
        this.fieldVal = value;
        this.validate();
    }
    validate() {
        if (this._validator) {
            this._errors = this._validator(this.fieldVal) || [];
        }
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], Field.prototype, "originalRef", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", typeof (_a = typeof T !== "undefined" && T) === "function" && _a || Object)
], Field.prototype, "originalVal", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", typeof (_b = typeof T !== "undefined" && T) === "function" && _b || Object)
], Field.prototype, "fieldVal", void 0);
exports.Field = Field;

});
___scope___.file("modules/workflow-designer/components/error-panel.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const CloseIcon = require('react-icons/lib/go/x');
let injectSheet = require('react-jss').default;
const style_1 = require("../style");
const styles = (theme) => {
    return style_1.errorStyles(theme);
};
let ErrorPanel = class ErrorPanel extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let classes = this.props.classes;
        return React.createElement("div", { className: "block" },
            React.createElement("div", { className: classes.errorPanel },
                this.props.message,
                React.createElement("div", { onClick: () => this.props.onClose && this.props.onClose(), className: classes.errorPanelClose },
                    React.createElement(CloseIcon, null))));
    }
};
ErrorPanel = __decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    __metadata("design:paramtypes", [Object])
], ErrorPanel);
exports.ErrorPanel = ErrorPanel;
// import { computed } from 'mobx';
//import { editorStyles, themeColors } from '../style';
//import { translate } from '../services/translation-service';

});
___scope___.file("modules/workflow-designer/components/step-list.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const Plus = require('react-icons/lib/go/plus');
const Bars = require('react-icons/lib/fa/bars');
const Trash = require('react-icons/lib/fa/trash');
const AlertIcon = require('react-icons/lib/go/alert');
const workflow_1 = require("../models/workflow");
const translation_service_1 = require("../services/translation-service");
let injectSheet = require('react-jss').default;
const style_1 = require("../style");
const stepListClass = 'step-list';
const styles = (theme) => {
    let list = style_1.listStyles(theme), addButton = {
        composes: theme.ide ? 'btn' : 'pure-button success',
        display: 'block',
        position: 'relative',
        backgroundColor: theme.ide ? undefined : '#f5f5f5',
        '& > div': {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        },
        [style_1.mediaQueries.md]: {
            marginRight: theme.ide ? '0px' : '20px',
        },
        '& svg': {
            position: 'relative',
            top: '-0.15em',
        },
    }, deleteButton = Object.assign({}, addButton, {
        composes: theme.ide ? 'btn btn-error' : 'pure-button danger',
    });
    list.listItemSelected['& $stepError'] = {
        color: list.listItemSelected.color
    };
    let styles = {
        addButton,
        deleteButton,
        deleteStepDeleting: {
            composes: theme.ide ? '' : 'pure-button-hover',
        },
        stepPrefix: {
            fontWeight: 'bold'
        },
        hidden: {
            display: 'none'
        },
        handle: Object.assign({
            position: 'absolute !important',
            top: '0px',
            right: theme.ide ? '0px' : '25px',
            cursor: 'move',
        }, style_1.noSelectStyle),
        handleIcon: {
            composes: theme.ide ? 'icon icon-grabber' : '',
        },
        handleDragger: {
            composes: 'dragula-handle',
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
        },
        stepError: {
            composes: theme.ide ? 'text-color-error' : '',
            color: theme.ide ? undefined : style_1.themeColors.darkerRed,
            marginRight: '5px'
        }
    };
    return Object.assign(list, styles);
};
let StepList = class StepList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dragging: false,
            deleting: false
        };
        this.addStep = () => {
            this.props.state.workflow.addStep();
        };
        this.onDragEnd = (el) => {
            this.setState({ dragging: false, deleting: false });
        };
        this.onDrop = (el, target, source, sibling) => {
            if (!this.state.deleting) {
                this.drake.cancel(true);
                let siblingStep = sibling && sibling.relatedStep, parentStep = target.parentStep;
                let targetIndex = siblingStep ? this.props.state.workflow.findStep(siblingStep, parentStep).index : parentStep.steps.length;
                this.props.state.workflow.moveStep(el.relatedStep, targetIndex, parentStep);
            }
            else {
                this.drake.cancel(true);
            }
        };
        this.onDrag = (el, source) => {
            if (source.classList.contains(stepListClass)) {
                this.setState({ dragging: true });
            }
        };
        this.onCancel = (el, container, source) => {
            if (this.state.deleting) {
                this.props.state.deleteStep(el.relatedStep);
            }
        };
        this.setStep = (el, parent, step) => {
            if (el) {
                if (parent) { }
                el.relatedStep = step;
            }
        };
    }
    get currentStep() {
        return this.props.state.currentStep;
    }
    get workflow() {
        return this.props.state.workflow;
    }
    selectStep(step, event) {
        this.props.state.selectStep(step);
        this.props.onStepSelect && this.props.onStepSelect(step);
        event.stopPropagation();
    }
    stepPrefix(parentList, index) {
        if (index === 0) {
            return '';
        }
        else if (parentList[index - 1].type === "sequential") {
            let step = parentList[index - 1];
            if (step.type === 'sequential') {
                return 'Then';
            }
            else if (step.type === 'parallel') {
                return 'And';
            }
            else if (step.type === 'service') {
                return 'After ready';
            }
        }
        else if (parentList[index - 1].type === 'compound') {
            let compoundStep = parentList[index - 1];
            if (compoundStep.steps.length > 0) {
                return this.stepPrefix(compoundStep.steps, compoundStep.steps.length);
            }
            else {
                return this.stepPrefix(parentList, index - 1);
            }
        }
        return '';
    }
    /*
        componentDidMount() {
            let container = ReactDOM.findDOMNode(this),
                list = container.querySelectorAll('.' + stepListClass),
                classes = this.props.classes;
            this.drake = Dragula(Array.prototype.slice.call(list), {
                mirrorContainer: container,
                accepts: (el: Element, target: Element, source: Element, sibling: Element) => {
                    if (target === this.deleteDiv) {
                        this.setState({deleting: true});
                        return false;
                    }
                    else {
                        this.setState({deleting: false});
                    }
    
                    let parent = target.parentElement;
                    while (parent !== null) {
                        if (parent === el) {
                            return false;
                        }
                        parent = parent.parentElement;
                    }
    
                    return true;
                },
                moves: (el: Element, target: Element, handle: Element) => {
                    return handle.classList.contains('dragula-handle');
                },
                isContainer: (el: Element) => {
                    return el.classList.contains(stepListClass);
                }
        
            });
    
            this.drake.on('drag', this.onDrag);
            this.drake.on('dragend', this.onDragEnd);
            this.drake.on('cancel', this.onCancel);
            this.drake.on('drop', this.onDrop);
        }
    */
    componentWillUnmount() {
        //this.props.drake.destroy();
    }
    stepClasses(step) {
        let classes = this.props.classes || {};
        try {
            return classes.listItem +
                (this.currentStep === step ? ' ' + classes.listItemSelected : '') +
                (step.type == 'compound' ? ' ' + classes.listItemSubList : '');
        }
        catch (e) {
            throw (e);
        }
    }
    stepTitle(parentList, step, key) {
        let classes = this.props.classes || {}, prefix = this.stepPrefix(parentList, key);
        return (React.createElement("span", null,
            step.transient.parseError.length > 0 && !step.transient.errorsDismissed && React.createElement(AlertIcon, { className: classes.stepError }),
            prefix.length > 0 && React.createElement("span", { className: classes.stepPrefix },
                this.stepPrefix(parentList, key),
                "\u00A0"),
            step.name && step.name.length > 0 ? step.name : '(Unnamed step)'));
    }
    StepHandle() {
        return React.createElement("div", { className: this.props.classes.handle },
            React.createElement("div", { className: this.props.classes.handleDragger }),
            this.props.state.ide ? React.createElement("span", { className: this.props.classes.handleIcon }) : React.createElement(Bars, { className: this.props.classes.handleIcon }));
    }
    subSteps(parent) {
        let classes = this.props.classes || {};
        let rootList = parent instanceof workflow_1.Workflow;
        if (parent instanceof workflow_1.WorkflowStepCompound || parent instanceof workflow_1.Workflow) {
            return (React.createElement("ul", { className: `${stepListClass} ${rootList ? classes.rootListTree : classes.listTree}`, ref: el => el && (el.parentStep = parent) }, parent.steps.map((step, i) => (React.createElement("li", { className: this.stepClasses(step), key: 'step-' + i + '-' + step.name, ref: el => this.setStep(el, parent, step), onClick: e => this.selectStep(step, e) },
                this.stepTitle(parent.steps, step, i),
                this.StepHandle(),
                step instanceof workflow_1.WorkflowStepCompound && this.subSteps(step))))));
        }
        return null;
    }
    render() {
        const classes = this.props.classes || {};
        return (React.createElement("div", null,
            this.subSteps(this.props.state.workflow),
            React.createElement("div", { ref: (div) => { this.deleteDiv = div; }, onClick: this.addStep, className: [
                    stepListClass,
                    (this.state.dragging ? classes.deleteButton : classes.addButton),
                    (this.state.deleting ? classes.deleteStepDeleting : '')
                ].join(' ') },
                this.state.dragging ?
                    React.createElement("span", null,
                        React.createElement(Trash, null),
                        translation_service_1.translate('DELETE'),
                        "...") :
                    React.createElement("span", null,
                        React.createElement(Plus, null),
                        " ",
                        translation_service_1.translate('ADD_STEP'),
                        "..."),
                React.createElement("div", null))));
    }
};
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], StepList.prototype, "addStep", void 0);
StepList = __decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    __metadata("design:paramtypes", [Object])
], StepList);
exports.StepList = StepList;
//import * as ReactDOM from 'react-dom';
//import { observable, computed } from 'mobx';

});
___scope___.file("modules/som-designer/App.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const material_ui_1 = require("material-ui");
const ScatterPlot_1 = require("./ScatterPlot");
const GridPlot_1 = require("./GridPlot");
const DataTab_1 = require("./tabs/DataTab");
const ModelTab_1 = require("./tabs/ModelTab");
const TrainTab_1 = require("./tabs/TrainTab");
const SettingsTab_1 = require("./tabs/SettingsTab");
const lib_1 = require("../../lib");
const MuiThemeProvider_1 = require("material-ui/styles/MuiThemeProvider");
const style = require("./App.scss");
const react_splitter_layout_1 = require("react-splitter-layout");
const design_1 = require("../../design");
const lib_2 = require("typestyle/lib");
const csstips_1 = require("csstips");
class SOMDesigner extends React.Component {
    constructor(props) {
        super(props);
        this.som = new lib_1.SOMController();
        this.errorPrecision = {
            animating: 100,
            idle: 1000
        };
        this.state = {
            animationInterval: null,
            stepAnimationInterval: null,
            animationSpeed: 1,
            datasetRevision: 0,
            modelRevision: 0,
            selectedDatasource: null,
            quantizationError: 0,
            topographicError: 0,
            displayMap: true,
            displayUMatrix: true
        };
    }
    initializeModel() {
        this.som.initialize();
        this.recalculateError(this.errorPrecision.idle);
    }
    componentDidMount() {
        this.initializeModel();
    }
    recalculateError(sampleCount) {
        let { eQ, eT } = this.som.getErrors();
        this.setState({
            quantizationError: eQ,
            topographicError: eT
        });
    }
    startAnimating() {
        if (this.isAnimating || this.som.trainer.hasFinished)
            return;
        let animationCounter = 0;
        this.setState({
            animationInterval: setInterval(() => {
                if (this.som.trainer.hasFinished) {
                    this.stopAnimating();
                    return;
                }
                animationCounter += this.state.animationSpeed;
                let iterationCount = Math.floor(animationCounter);
                this.som.iterate(iterationCount);
                this.recalculateError(this.errorPrecision.animating);
                animationCounter -= iterationCount;
                console.log(animationCounter);
            }, 1000 / 30)
        });
    }
    stopAnimating() {
        clearInterval(this.state.animationInterval);
        this.recalculateError(this.errorPrecision.idle);
        this.setState({ animationInterval: null });
    }
    iterateSingle() {
        if (this.state.stepAnimationInterval !== null)
            // already animating
            return;
        let targetWeightMatrix = this.som.model.weightMatrix.cloneWithoutData();
        this.som.trainer.iterate(1, targetWeightMatrix);
        // perform animation
        let t = 0;
        let prevE = 0;
        this.setState({
            stepAnimationInterval: setInterval(() => {
                // calculate interpolation parameters
                let e = t < 0.5 ? 4 * Math.pow(t, 3) : 4 * Math.pow(t - 1, 3) + 1;
                let aFactor = (1 - e) / (1 - prevE);
                let bFactor = (e - prevE) / (1 - prevE);
                prevE = e;
                // update neuron weights
                for (let neuronIndex = 0; neuronIndex < this.som.model.neuronCount; ++neuronIndex) {
                    let target = targetWeightMatrix.getRow(neuronIndex);
                    target.forEach((b, dim) => {
                        let a = this.som.model.weightMatrix.get(neuronIndex, dim);
                        this.som.model.weightMatrix.set(neuronIndex, dim, a * aFactor + b * bFactor);
                    });
                }
                ;
                if (t >= 1) {
                    clearInterval(this.state.stepAnimationInterval);
                    this.recalculateError(this.errorPrecision.idle);
                    this.setState({
                        stepAnimationInterval: null
                    });
                    return;
                }
                else
                    this.forceUpdate();
                t += 0.05; // @todo Magic constant
            }, 1000 / 30)
        });
    }
    get isAnimating() {
        return this.state.animationInterval !== null;
    }
    reset() {
        this.stopAnimating();
        this.initializeModel();
    }
    render() {
        let gridScale = Math.floor(256 / Math.sqrt(Math.pow(this.som.model.width, 2) +
            Math.pow(this.som.model.height, 2)));
        return (React.createElement(MuiThemeProvider_1.default, null,
            React.createElement("div", null,
                React.createElement(react_splitter_layout_1.default, { percentage: true, secondaryInitialSize: 25, style: { height: '100%', position: 'relative', display: 'flex', flexDirection: 'row' } },
                    React.createElement(design_1.FillParent, null,
                        React.createElement("div", { className: style["main-view"] },
                            React.createElement(ScatterPlot_1.ScatterPlot, { dataset: this.som.dataset, datasetRevision: this.state.datasetRevision, currentSample: this.som.trainer.currentSample, model: this.som.model, modelRevision: this.state.modelRevision, animating: this.state.animationInterval !== null ||
                                    this.state.stepAnimationInterval !== null })),
                        React.createElement("div", { className: style["grid-plot"] },
                            React.createElement(GridPlot_1.GridPlot, { model: this.som.model, tileWidth: gridScale, tileHeight: gridScale, width: this.som.model.width, height: this.som.model.height, displayMap: this.state.displayMap, displayUMatrix: this.state.displayUMatrix }))),
                    React.createElement(design_1.FillParent, null,
                        React.createElement("div", { className: lib_2.style(csstips_1.flex, csstips_1.vertical) },
                            React.createElement("div", { className: style["sidebar"] },
                                React.createElement(material_ui_1.Tabs, { style: { height: "100%", overflow: "scroll" } },
                                    React.createElement(material_ui_1.Tab, { icon: React.createElement(material_ui_1.FontIcon, { className: "material-icons" }, "pie_chart"), label: "DATA" },
                                        React.createElement(DataTab_1.DataTab, { dataset: this.som.dataset, revision: this.state.datasetRevision, onUpdate: () => {
                                                this.initializeModel();
                                                this.setState({ datasetRevision: this.state.datasetRevision + 1 });
                                            }, onSelect: selectedDatasource => this.setState({ selectedDatasource }) })),
                                    React.createElement(material_ui_1.Tab, { icon: React.createElement(material_ui_1.FontIcon, { className: "material-icons" }, "apps"), label: "MODEL" },
                                        React.createElement(ModelTab_1.ModelTab, { model: this.som.model, initializer: this.som.initializer, trainer: this.som.trainer, modelRevision: this.state.modelRevision, onUpdateModel: () => {
                                                this.initializeModel();
                                                this.setState({ modelRevision: this.state.modelRevision + 1 });
                                            }, onUpdateTrainer: () => {
                                                this.forceUpdate();
                                            }, onChangeInitializer: initializer => {
                                                this.som.initializer = initializer;
                                                this.initializeModel();
                                            } })),
                                    React.createElement(material_ui_1.Tab, { icon: React.createElement(material_ui_1.FontIcon, { className: "material-icons" }, "last_page"), label: "TRAIN" },
                                        React.createElement(TrainTab_1.TrainTab, { trainer: this.som.trainer, quantizationError: this.state.quantizationError, topographicError: this.state.topographicError, isTraining: this.isAnimating, animationSpeed: this.state.animationSpeed, setAnimationSpeed: animationSpeed => this.setState({ animationSpeed }), startTraining: () => this.startAnimating(), endTraining: () => this.stopAnimating(), iterateSingle: () => this.iterateSingle(), reset: () => this.reset() })),
                                    React.createElement(material_ui_1.Tab, { icon: React.createElement(material_ui_1.FontIcon, { className: "material-icons" }, "settings"), label: "OTHER" },
                                        React.createElement(SettingsTab_1.SettingsTab, { displayMap: this.state.displayMap, displayUMatrix: this.state.displayUMatrix, onUpdateDisplayMap: displayMap => this.setState({ displayMap }), onUpdateDisplayUMatrix: displayUMatrix => this.setState({ displayUMatrix }) }))))))))));
    }
}
exports.SOMDesigner = SOMDesigner;

});
___scope___.file("modules/som-designer/ScatterPlot.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const THREE = require("three");
class ScatterPlot extends React.Component {
    constructor(props) {
        super(props);
        this.isDirty = true;
        // initialize camera
        this.camera = new THREE.PerspectiveCamera(30, 1, 1, 10000);
        this.camera.position.z = 3;
        this.camera.position.x = -1;
        this.camera.position.y = 1;
        // initialize scene
        this.scene = new THREE.Scene();
        // initialize scatter plot
        this.scatterPlot = new THREE.Object3D();
        this.scatterPlot.rotation.y = 0;
        this.scene.add(this.scatterPlot);
        // others
        this.initializeCoordinateSystem();
        this.updateDatasetGeometry();
        this.initializeMapGeometry();
        this.initializeSampleIndicatorGeometry();
    }
    initializeCoordinateSystem() {
        function v(x, y, z) {
            return new THREE.Vector3(x, y, z);
        }
        const vpts = {
            min: { x: 0, y: 0, z: 0 },
            max: { x: 1, y: 1, z: 1 }
        };
        let black = new THREE.Color(0, 0, 0);
        let gray = new THREE.Color(0.8, 0.8, 0.8);
        let lineGeo = new THREE.Geometry();
        lineGeo.vertices.push(v(vpts.min.x, vpts.min.y, vpts.min.z), v(vpts.max.x, vpts.min.y, vpts.min.z), v(vpts.min.x, vpts.min.y, vpts.min.z), v(vpts.min.x, vpts.max.y, vpts.min.z), v(vpts.min.x, vpts.min.y, vpts.min.z), v(vpts.min.x, vpts.min.y, vpts.max.z));
        for (let i = 0; i < 6; ++i)
            lineGeo.colors.push(black);
        let axes = ["x", "y", "z"];
        axes.forEach(axis => {
            let others = axes.filter(a => a !== axis);
            for (let value = vpts.min[axis] + 0.1; value < vpts.max[axis]; value += 0.1) {
                others.forEach(otherAxis => {
                    let a = Object.assign({}, vpts.min);
                    let b = Object.assign({}, vpts.min);
                    a[axis] = value;
                    b[axis] = value;
                    a[otherAxis] = vpts.min[otherAxis];
                    b[otherAxis] = vpts.max[otherAxis];
                    lineGeo.vertices.push(v(a.x, a.y, a.z), v(b.x, b.y, b.z));
                    lineGeo.colors.push(gray, gray);
                });
            }
        });
        lineGeo.applyMatrix(new THREE.Matrix4().makeTranslation(-0.5, -0.5, -0.5));
        let lineMat = new THREE.LineBasicMaterial({
            color: 0xffffff,
            vertexColors: THREE.VertexColors,
            linewidth: 2
        });
        this.coordinateSystem = new THREE.Line(lineGeo, lineMat, THREE.LinePieces);
        this.scatterPlot.add(this.coordinateSystem);
    }
    updateDatasetGeometry() {
        let needsNewGeometry = !this.datasetGeometry || this.datasetGeometry.vertices.length !== this.props.dataset.sampleCount;
        if (needsNewGeometry) {
            // create new geometry
            if (this.datasetPoints)
                this.scatterPlot.remove(this.datasetPoints);
            let mat = new THREE.PointsMaterial({
                color: 0x222222,
                size: 0.01
            });
            this.datasetGeometry = new THREE.Geometry();
            for (let i = 0; i < this.props.dataset.sampleCount; ++i) {
                let [x, y, z] = this.props.dataset.getSample(i);
                this.datasetGeometry.vertices.push(new THREE.Vector3(x, y, z));
            }
            this.datasetPoints = new THREE.Points(this.datasetGeometry, mat);
            this.scatterPlot.add(this.datasetPoints);
        }
        else {
            // update existing geometry
            for (let i = 0; i < this.props.dataset.sampleCount; ++i) {
                let vertex = this.datasetGeometry.vertices[i];
                [vertex.x, vertex.y, vertex.z] = this.props.dataset.getSample(i);
            }
            this.datasetGeometry.verticesNeedUpdate = true;
        }
        this.datasetGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(-0.5, -0.5, -0.5));
    }
    initializeMapGeometry() {
        this.weightsToVectors = new Map();
        this.mapGeometry = new THREE.Geometry();
        for (let i = 0; i < this.props.model.neuronCount; ++i) {
            if (!this.weightsToVectors.has(i))
                this.weightsToVectors.set(i, new Set());
            for (let j = 0; j < this.props.model.neuronCount; ++j) {
                if (!this.weightsToVectors.has(j))
                    this.weightsToVectors.set(j, new Set());
                if (this.props.model.distanceMatrix.get(i, j) <= 1) {
                    let iW = this.props.model.weightMatrix.getRow(i);
                    let jW = this.props.model.weightMatrix.getRow(j);
                    let iWT = new THREE.Vector3(iW[0], iW[1], iW[2]);
                    let jWT = new THREE.Vector3(jW[0], jW[1], jW[2]);
                    this.weightsToVectors.get(i).add(iWT);
                    this.weightsToVectors.get(j).add(jWT);
                    this.mapGeometry.vertices.push(iWT, jWT);
                }
            }
            ;
        }
        ;
        let lineMat = new THREE.LineBasicMaterial({
            color: 0xff0000,
            linewidth: 1
        });
        this.mapGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(-0.5, -0.5, -0.5));
        if (this.mapLineSegments)
            this.scatterPlot.remove(this.mapLineSegments);
        this.mapLineSegments = new THREE.LineSegments(this.mapGeometry, lineMat);
        this.scatterPlot.add(this.mapLineSegments);
    }
    updateMapGeometry() {
        [...this.weightsToVectors].forEach(([neuronIndex, tvs]) => {
            let weights = this.props.model.weightMatrix.getRow(neuronIndex);
            tvs.forEach(tv => {
                tv.x = weights[0] - 0.5;
                tv.y = weights[1] - 0.5;
                tv.z = weights[2] - 0.5;
            });
        });
        this.mapGeometry.verticesNeedUpdate = true;
    }
    updateAspectRatio() {
        let canvas = this.refs["canvas"];
        let w = canvas.width, h = canvas.height;
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
        canvas.style.width = "";
        canvas.style.height = "";
        this.isDirty = true;
    }
    componentDidMount() {
        let canvas = this.refs["canvas"];
        // initialize renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas
        });
        this.renderer.setClearColor(0xEEEEEE, 1.0);
        // update canvas resolution on resize
        let resizeTimeout;
        window.addEventListener("resize", e => {
            // throttle to improve performance
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                console.log("resize");
                this.resizeCanvas();
            }, 500);
        });
        this.resizeCanvas();
        // drag handlers
        let down = false;
        let sx = 0, sy = 0;
        canvas.onmousedown = ev => {
            down = true;
            dx = 0;
            dy = 0;
            sx = ev.clientX;
            sy = ev.clientY;
        };
        window.onmouseup = () => {
            down = false;
        };
        let dx = 0, dy = 0;
        let lastMouseMove = new Date().getTime();
        window.onmousemove = ev => {
            let t = new Date().getTime();
            let deltaT = t - lastMouseMove;
            lastMouseMove = t;
            if (down) {
                let timeFactor = Math.max(deltaT / 1000 * 60, 0.001);
                dx = (ev.clientX - sx) / timeFactor;
                dy = (ev.clientY - sy) / timeFactor;
                this.scatterPlot.rotation.y += dx * timeFactor * 0.01;
                this.camera.position.y += dy * timeFactor * 0.01;
                const softMax = (a, max) => max * (1 / (1 + Math.exp(-4 * a / max)) - 1 / 2);
                dx = softMax(dx * 0.5, 40);
                dy = softMax(dy * 0.5, 40);
                sx = ev.clientX;
                sy = ev.clientY;
            }
        };
        let lastT = new Date().getTime();
        const animate = () => {
            let t = new Date().getTime();
            let deltaT = t - lastT;
            lastT = t;
            if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
                // stop moving
                dx = 0;
                dy = 0;
            }
            if (this.isDirty ||
                down ||
                dx !== 0 || dy !== 0 ||
                this.props.animating) {
                this.isDirty = false;
                if (!down) {
                    let timeFactor = deltaT / 1000 * 60;
                    dx *= Math.pow(0.99, timeFactor);
                    dy *= Math.pow(0.95, timeFactor);
                    this.scatterPlot.rotation.y += dx * 0.01 * timeFactor;
                    this.camera.position.y += dy * 0.01 * timeFactor;
                }
                this.updateMapGeometry();
                this.renderer.clear();
                this.camera.lookAt(this.scene.position);
                this.renderer.render(this.scene, this.camera);
            }
            window.requestAnimationFrame(animate);
        };
        animate();
    }
    resizeCanvas() {
        let canvas = this.refs["canvas"];
        let rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * 2;
        canvas.height = rect.height * 2;
        this.updateAspectRatio();
    }
    initializeSampleIndicatorGeometry() {
        let mat = new THREE.PointsMaterial({
            color: 0xFF00FF,
            size: 0.05
        });
        this.sampleIndicatorGeometry = new THREE.Geometry();
        this.sampleIndicatorGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
        this.sampleIndicatorPoints = new THREE.Points(this.sampleIndicatorGeometry, mat);
    }
    updateCurrentSample(currentSample) {
        if (!currentSample) {
            this.scatterPlot.remove(this.sampleIndicatorPoints);
            return;
        }
        let vertex = this.sampleIndicatorGeometry.vertices[0];
        [vertex.x, vertex.y, vertex.z] = currentSample;
        this.sampleIndicatorGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(-0.5, -0.5, -0.5));
        if (this.scatterPlot.children.indexOf(this.sampleIndicatorPoints) > -1) {
            this.sampleIndicatorGeometry.verticesNeedUpdate = true;
        }
        else {
            this.scatterPlot.add(this.sampleIndicatorPoints);
        }
    }
    componentWillReceiveProps(props) {
        if (this.props.datasetRevision !== props.datasetRevision)
            // dataset was updated
            this.updateDatasetGeometry();
        if (this.props.modelRevision !== props.modelRevision)
            // model dimensions were updated
            this.initializeMapGeometry();
        if (this.props.currentSample !== props.currentSample)
            // update current sample
            this.updateCurrentSample(props.currentSample);
        this.isDirty = true;
    }
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return React.createElement("canvas", { ref: "canvas" });
    }
}
exports.ScatterPlot = ScatterPlot;

});
___scope___.file("modules/som-designer/GridPlot.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class GridPlot extends React.Component {
    colorForNeuron(neuronIndex, model) {
        return "rgb(" +
            model.weightMatrix.getRow(neuronIndex)
                .map(v => Math.max(0, Math.min(Math.floor(v * 255), 255)))
                .join(", ") +
            ")";
    }
    avgDistForNeuron(neuronIndex, model) {
        let weights = model.weightMatrix.getRow(neuronIndex);
        let distances = [];
        for (let i = 0; i < model.neuronCount; ++i)
            if (i !== neuronIndex && model.distanceMatrix.get(neuronIndex, i) <= 1) {
                let w = model.weightMatrix.getRow(i);
                let dist = weights.reduce((sum, v, i) => sum + Math.pow((v - w[i]), 2), 0);
                distances.push(Math.sqrt(dist));
            }
        return distances.reduce((sum, v) => sum + v, 0) / distances.length;
    }
    redraw(props) {
        let width = 0;
        width += props.displayMap ? 1 : 0;
        width += props.displayUMatrix ? 1 : 0;
        let canvas = this.refs["canvas"];
        canvas.width = width * props.width * props.tileWidth;
        canvas.height = props.height * props.tileHeight;
        let ctx = canvas.getContext("2d");
        let umatrix = new Map();
        let minDist = 0, maxDist = 0;
        if (props.displayUMatrix) {
            for (let i = 0; i < props.model.neuronCount; ++i)
                umatrix.set(i, this.avgDistForNeuron(i, props.model));
            let v = [...umatrix.values()].sort((a, b) => a - b);
            minDist = v.shift();
            maxDist = v.pop();
        }
        // redraw canvas
        for (let neuronIndex = 0; neuronIndex < props.model.neuronCount; ++neuronIndex) {
            let xOffset = 0;
            let [x, y] = props.model.neuronPositionInLattice(neuronIndex);
            if (props.displayMap) {
                ctx.fillStyle = this.colorForNeuron(neuronIndex, props.model);
                ctx.fillRect(xOffset + x * props.tileWidth, y * props.tileHeight, props.tileWidth, props.tileHeight);
                xOffset += props.width * props.tileWidth;
            }
            if (props.displayUMatrix) {
                let normDist = (umatrix.get(neuronIndex) - minDist) / (maxDist - minDist);
                let shade = Math.floor(normDist * 255);
                ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;
                ctx.fillRect(xOffset + x * props.tileWidth, y * props.tileHeight, props.tileWidth, props.tileHeight);
                xOffset += props.width * props.tileWidth;
            }
        }
    }
    componentDidMount() {
        this.redraw(this.props);
    }
    componentWillReceiveProps(props) {
        this.redraw(props);
    }
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return React.createElement("canvas", { ref: "canvas", width: 0, height: 0 });
    }
}
exports.GridPlot = GridPlot;

});
___scope___.file("modules/som-designer/tabs/DataTab.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Popover_1 = require("material-ui/Popover");
const Slider_1 = require("material-ui/Slider");
const IconMenu_1 = require("material-ui/IconMenu");
const MenuItem_1 = require("material-ui/MenuItem");
const FontIcon_1 = require("material-ui/FontIcon");
const Subheader_1 = require("material-ui/Subheader");
const Divider_1 = require("material-ui/Divider");
const Toolbar_1 = require("material-ui/Toolbar");
const Dialog_1 = require("material-ui/Dialog");
const FlatButton_1 = require("material-ui/FlatButton");
const lib_1 = require("../../../lib");
const LogSlider_1 = require("../LogSlider");
const NumberInput_1 = require("../NumberInput");
const style = require("./DataTab.scss");
//const MonacoEditor = require("react-monaco-editor").default;
const ronaco_1 = require("ronaco");
class WeightEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchorElement: undefined
        };
    }
    render() {
        return React.createElement("div", { className: style["weight-editor"] },
            React.createElement("div", { className: "color", style: {
                    backgroundColor: `rgb(${this.props.weights.map(v => Math.round(v * 255)).join(", ")})`
                }, onClick: e => this.setState({ open: true, anchorElement: e.currentTarget }) }),
            React.createElement(Popover_1.default, { open: this.state.open, anchorEl: this.state.anchorElement, anchorOrigin: { horizontal: "left", vertical: "center" }, targetOrigin: { horizontal: "right", vertical: "center" }, onRequestClose: () => this.setState({ open: false }), style: {
                    padding: "12px 0",
                    overflow: "hidden"
                } },
                React.createElement("div", { className: style["we-popover-content"] },
                    React.createElement("span", { className: "title" }, this.props.weights.map(w => w.toFixed(2)).join("/")),
                    this.props.weights.map((weight, dim) => React.createElement("div", { key: dim, style: { paddingLeft: 20 }, className: "coordinate" },
                        React.createElement("b", { className: "caption" }, ["X", "Y", "Z"][dim]),
                        React.createElement(Slider_1.default, { defaultValue: weight, onChange: (e, newValue) => this.props.onChange(this.props.weights.map((prev, i) => i === dim ? newValue : prev)), style: {
                                display: "inline-block",
                                width: 200,
                                verticalAlign: "middle",
                                marginRight: 30
                            }, sliderStyle: {
                                margin: 4
                            } }))))));
    }
}
class ScriptEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false
        };
    }
    openModal() {
        this.setState({ modalOpen: true });
    }
    closeModal() {
        this.setState({ modalOpen: false });
    }
    editorDidMount(editor) {
        let monaco = window.monaco;
        monaco.languages.typescript.javascriptDefaults.addExtraLib(require("raw-loader!client/assets/script-environment.d.ts"));
        editor.focus();
    }
    render() {
        const options = {
            selectOnLineNumbers: true
        };
        return React.createElement("div", null,
            React.createElement("span", { className: "js-label", onClick: () => this.openModal() }, "JS"),
            React.createElement(Dialog_1.default, { title: "Edit code", actions: [
                    React.createElement(FlatButton_1.default, { label: "Cancel", primary: true, onClick: () => this.closeModal() }),
                    React.createElement(FlatButton_1.default, { label: "Save", primary: true, keyboardFocused: true, onClick: () => {
                            // commit code change
                            this.props.source.code = this.newCode;
                            this.closeModal();
                            this.props.onUpdate();
                        } })
                ], modal: true, open: this.state.modalOpen, onRequestClose: () => this.closeModal() },
                React.createElement(ronaco_1.MonacoEditor, { width: "100%", height: "600", language: "javascript", value: this.props.source.code, options: options, onChange: (v) => this.newCode = v, editorDidMount: (editor) => this.editorDidMount(editor) })));
    }
}
class Example {
}
class DataTab extends React.Component {
    renderSourceTitle(source) {
        return React.createElement("span", { className: "title" },
            React.createElement("span", { className: "cluster-type" }, "Cluster"),
            " ",
            "with",
            React.createElement(NumberInput_1.NumberInput, { value: source.sampleCount, onChange: value => {
                    source.sampleCount = value;
                    this.props.onUpdate();
                } }),
            " datapoints");
    }
    renderClusterSource(source, key) {
        return React.createElement("div", { key: key, className: style["datasource"] },
            React.createElement(WeightEditor, { weights: source.center, onChange: weights => {
                    source.center = weights;
                    this.props.onUpdate();
                } }),
            React.createElement("div", { className: "content" },
                this.renderSourceTitle(source),
                React.createElement("div", null,
                    React.createElement("span", null, "\u03C3"),
                    React.createElement(LogSlider_1.LogSlider, { min: -4, max: 0, step: 0.1, value: source.stddev, onChange: (e, newValue) => {
                            source.stddev = newValue;
                            this.props.onUpdate();
                        }, style: {
                            display: "inline-block",
                            width: "calc(100% - 60px)",
                            verticalAlign: "middle",
                            marginRight: 0
                        }, sliderStyle: {
                            margin: 4
                        } }))));
    }
    renderCallbackSource(source, key) {
        return React.createElement("div", { key: key, className: style["datasource"] },
            React.createElement(ScriptEditor, { source: source, onUpdate: this.props.onUpdate }),
            React.createElement("div", { className: "content" }, this.renderSourceTitle(source)));
    }
    renderSource(source, key) {
        let interior = React.createElement("b", null, "Unknown datasource");
        if (source instanceof lib_1.ClusterDatasetSource)
            interior = this.renderClusterSource(source, key);
        else if (source instanceof lib_1.CallbackDatasetSource)
            interior = this.renderCallbackSource(source, key);
        return React.createElement("div", null,
            React.createElement(FontIcon_1.default, { className: "material-icons", style: { float: "right", zIndex: 1000 }, onClick: () => this.removeSource(source) }, "remove"),
            interior);
    }
    addSource(source) {
        this.props.dataset.sources.push(source);
        this.props.onUpdate();
    }
    removeSource(source) {
        let { dataset } = this.props;
        dataset.sources = dataset.sources.filter(s => s !== source);
        this.props.onUpdate();
    }
    removeAllSources() {
        this.props.dataset.sources = [];
        this.props.onUpdate();
    }
    renderToolbar() {
        return React.createElement(Toolbar_1.Toolbar, { style: {
                height: 36,
                padding: "6px 8px",
                lineHeight: "1em"
            } },
            React.createElement(Toolbar_1.ToolbarGroup, { firstChild: true, style: { marginLeft: 0 } },
                React.createElement(Toolbar_1.ToolbarTitle, { text: `${this.props.dataset.sources.length} sources`, style: {
                        fontSize: 12,
                        lineHeight: "20px"
                    } })),
            React.createElement(Toolbar_1.ToolbarGroup, null,
                React.createElement(IconMenu_1.default, { iconButtonElement: React.createElement(FontIcon_1.default, { style: { fontSize: 20, marginRight: 8 }, className: "material-icons" }, "add") },
                    React.createElement(MenuItem_1.default, { value: "1", primaryText: "Cluster", onClick: () => this.addSource(new lib_1.ClusterDatasetSource(1000, [0, 0, 0], 0.1)) }),
                    React.createElement(MenuItem_1.default, { value: "2", primaryText: "JavaScript", onClick: () => this.addSource(new lib_1.CallbackDatasetSource(1000, require("raw-loader!client/assets/examples/template.js"))) })),
                React.createElement(IconMenu_1.default, { iconButtonElement: React.createElement(FontIcon_1.default, { style: { fontSize: 20 }, className: "material-icons" }, "expand_more") },
                    React.createElement(MenuItem_1.default, { primaryText: "Remove all", onClick: () => this.removeAllSources() }),
                    React.createElement(Divider_1.default, null),
                    React.createElement(Subheader_1.default, null, "Examples"),
                    DataTab.examples.map(example => React.createElement(MenuItem_1.default, { value: "1", primaryText: example.name, onClick: () => {
                            this.props.dataset.sources = example.generate();
                            this.props.onUpdate();
                        } })))));
    }
    render() {
        return React.createElement("div", null,
            this.renderToolbar(),
            React.createElement("div", { className: "sources" }, this.props.dataset.sources.map((source, key) => this.renderSource(source, key))));
    }
}
DataTab.examples = [];
exports.DataTab = DataTab;
DataTab.examples.push(new class extends Example {
    constructor() {
        super(...arguments);
        this.name = "Clusters";
    }
    generate() {
        return [
            new lib_1.ClusterDatasetSource(400, [0.80, 0.10, 0.10], 0.01),
            new lib_1.ClusterDatasetSource(1000, [0.88, 0.50, 0.10], 0.02),
            new lib_1.ClusterDatasetSource(1000, [1.00, 0.88, 0.39], 0.04),
            new lib_1.ClusterDatasetSource(2000, [0.40, 0.30, 0.50], 0.08),
            new lib_1.ClusterDatasetSource(1000, [0.35, 0.45, 0.75], 0.03),
            new lib_1.ClusterDatasetSource(200, [0.49, 0.69, 0.21], 0.005)
        ];
    }
});
DataTab.examples.push(new class extends Example {
    constructor() {
        super(...arguments);
        this.name = "JavaScript";
    }
    generate() {
        return [
            new lib_1.CallbackDatasetSource(10000, require("raw-loader!client/assets/examples/sin.js"))
        ];
    }
});
DataTab.examples.push(new class extends Example {
    constructor() {
        super(...arguments);
        this.name = "Sphere";
    }
    generate() {
        return [
            new lib_1.CallbackDatasetSource(10000, require("raw-loader!client/assets/examples/sphere.js"))
        ];
    }
});
DataTab.examples.push(new class extends Example {
    constructor() {
        super(...arguments);
        this.name = "Spiral";
    }
    generate() {
        return [
            new lib_1.CallbackDatasetSource(1000, require("raw-loader!client/assets/examples/spiral.js"))
        ];
    }
});

});
___scope___.file("lib/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./som"));
__export(require("./SOMController"));

});
___scope___.file("lib/som/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./Dataset"));
__export(require("./DatasetSampler"));
__export(require("./DatasetSource"));
__export(require("./Initializer"));
__export(require("./Lattice"));
__export(require("./Matrix"));
__export(require("./Model"));
__export(require("./Trainer"));
__export(require("./utils"));

});
___scope___.file("lib/som/Dataset.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Represents a set of datapoints. */
class Dataset {
    constructor(sources) {
        this.sources = sources;
    }
    get sampleCount() {
        return this.sources.reduce((sum, source) => sum + source.sampleCount, 0);
    }
    getSample(sampleIndex) {
        let sourceIndex = 0;
        while (sourceIndex < this.sources.length) {
            let source = this.sources[sourceIndex++];
            if (source.sampleCount > sampleIndex)
                return source.getSample(sampleIndex);
            sampleIndex -= source.sampleCount;
        }
        throw new Error("Sample index out of bounds");
    }
    getAllSamples() {
        let matrix = [];
        for (let i = 0; i < this.sampleCount; ++i)
            matrix[i] = this.getSample(i);
        return matrix;
    }
}
exports.Dataset = Dataset;

});
___scope___.file("lib/som/DatasetSampler.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Provides a stream of datapoints from a `Dataset`. */
class DatasetSampler {
    constructor(dataset) {
        this.dataset = dataset;
    }
}
exports.DatasetSampler = DatasetSampler;
//export default DatasetSampler;
/** Returns a random datapoint from the `Dataset` on each request. */
class BootstrapDatasetSampler extends DatasetSampler {
    nextSample() {
        return this.dataset.getSample(Math.floor(Math.random() * this.dataset.sampleCount));
    }
}
exports.BootstrapDatasetSampler = BootstrapDatasetSampler;

});
___scope___.file("lib/som/DatasetSource.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DatasetSource {
    constructor(sampleCount) {
        this.sampleCount = sampleCount;
    }
}
exports.DatasetSource = DatasetSource;
exports.default = DatasetSource;
var Distribution;
(function (Distribution) {
    Distribution[Distribution["UNIFORM"] = 0] = "UNIFORM";
    Distribution[Distribution["GAUSSIAN"] = 1] = "GAUSSIAN";
})(Distribution = exports.Distribution || (exports.Distribution = {}));
class RandomDatasetSource extends DatasetSource {
    constructor() {
        super(...arguments);
        this.randomValues = new Map();
    }
    getRandomValue(index, distribution = Distribution.GAUSSIAN) {
        if (!this.randomValues.has(index))
            this.randomValues.set(index, this.generateRandomValue(distribution));
        return this.randomValues.get(index);
    }
    generateRandomValue(distribution) {
        switch (distribution) {
            case Distribution.UNIFORM: return Math.random();
            case Distribution.GAUSSIAN: { // Box-Muller
                let u1 = 1.0 - Math.random();
                let u2 = 1.0 - Math.random();
                return Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
            }
        }
    }
}
exports.RandomDatasetSource = RandomDatasetSource;
class ClusterDatasetSource extends RandomDatasetSource {
    constructor(sampleCount, center, stddev) {
        super(sampleCount);
        this.center = center;
        this.stddev = stddev;
    }
    getSample(index) {
        return this.center.map((v, i) => v + this.getRandomValue(index * this.center.length + i, Distribution.GAUSSIAN) * this.stddev);
    }
}
exports.ClusterDatasetSource = ClusterDatasetSource;
class CallbackDatasetSource extends RandomDatasetSource {
    constructor(sampleCount, code) {
        super(sampleCount);
        this.code = code;
    }
    set code(code) {
        // we provide "source" because there seems to be no way to specify the "this"-context for monaco-editor
        // we provide "Distribution"" because there seems to be no other way to add something to the context of a function
        this._callback = new Function("index", "source", "Distribution", code);
        this._code = code;
    }
    get code() {
        return this._code;
    }
    getSample(index) {
        return this._callback(index, this, Distribution);
    }
}
exports.CallbackDatasetSource = CallbackDatasetSource;

});
___scope___.file("lib/som/Initializer.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PCA_1 = require("./utils/PCA");
/** Used to initialize a `Model`. */
class Initializer {
}
exports.Initializer = Initializer;
//export default Initializer
/** Initializes all neuron weights to random positions. */
class RandomInitializer extends Initializer {
    performInitialization(dataset, model) {
        for (let neuronIndex = 0; neuronIndex < model.neuronCount; ++neuronIndex)
            for (let dim = 0; dim < model.dataDimension; ++dim)
                model.weightMatrix.set(neuronIndex, dim, Math.random());
    }
}
exports.RandomInitializer = RandomInitializer;
/** Initializes all neuron weights using a PCA dimension reduction. */
class PCAInitializer extends Initializer {
    performInitialization(dataset, model) {
        let pca;
        try {
            pca = new PCA_1.PCA(dataset.getAllSamples(), 2);
        }
        catch (e) {
            console.warn(e);
            // no PCA convergence
            return;
        }
        for (let x = 0; x < model.width; ++x)
            for (let y = 0; y < model.height; ++y) {
                let weights = pca.recover([(x + 0.5) / model.width, (y + 0.5) / model.height]);
                weights.forEach((weight, dim) => model.weightMatrix.set(model.getNeuronIndex(x, y), dim, weight));
            }
    }
}
exports.PCAInitializer = PCAInitializer;

});
___scope___.file("lib/som/utils/PCA.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const numeric = require("numericjs");
class PCA {
    constructor(data, k // reduction
    ) {
        this.k = k;
        // normalize data
        this.means = PCA.mean(data);
        data = data.map(row => row.map((v, i) => v - this.means[i]));
        this.stddevs = PCA.squareMean(data).map(Math.sqrt);
        data.forEach(row => row.forEach((v, i) => row[i] /= this.stddevs[i]));
        this.data = data;
        // do PCA
        let m = data.length;
        let sigma = numeric.div(numeric.dot(numeric.transpose(data), data), m);
        this.U = numeric.svd(sigma).U.map(row => row.slice(0, k));
        // find min/max
        let projected = numeric.dot(this.data, this.U);
        this.min = [...projected[0]];
        this.max = [...projected[0]];
        projected.forEach(row => row.forEach((v, i) => {
            if (this.min[i] > v)
                this.min[i] = v;
            else if (this.max[i] < v)
                this.max[i] = v;
        }));
    }
    static mean(data) {
        return data
            .reduce((sum, row) => {
            for (let i = 0; i < sum.length; ++i)
                sum[i] += row[i];
            return sum;
        }, data[0].map(v => 0))
            .map(v => v / data.length);
    }
    static squareMean(data) {
        return data
            .reduce((sum, row) => {
            for (let i = 0; i < sum.length; ++i)
                sum[i] += row[i] * row[i];
            return sum;
        }, data[0].map(v => 0))
            .map(v => v / data.length);
    }
    recover(vector) {
        vector = vector.map((v, i) => v * (this.max[i] - this.min[i]) + this.min[i]);
        let raw = numeric.dot(vector, numeric.transpose(this.U));
        return raw.map((v, i) => v * this.stddevs[i] + this.means[i]);
    }
}
exports.PCA = PCA;

});
___scope___.file("lib/som/Lattice.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Lattice {
}
exports.Lattice = Lattice;
//export default Lattice;
class SquareLattice extends Lattice {
    calculatePosition(x, y) {
        return [x, y];
    }
}
exports.SquareLattice = SquareLattice;
class HexagonalLattice extends Lattice {
    calculatePosition(x, y) {
        return [
            x + (y % 2) * HexagonalLattice.X_OFFSET,
            y * HexagonalLattice.Y_OFFSET
        ];
    }
}
HexagonalLattice.X_OFFSET = Math.cos(Math.PI / 3);
HexagonalLattice.Y_OFFSET = Math.sin(Math.PI / 3);
exports.HexagonalLattice = HexagonalLattice;

});
___scope___.file("lib/som/Matrix.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Matrix {
    constructor(
    /** The constructor for the kind of ArrayBufferView to be used with this Matrix. */
    arrayConstructor, 
    /** The vertical dimension of the matrix. */
    rows, 
    /** The horizontal dimension of the matrix. */
    columns, 
    /** Buffer for the ArrayBufferView. */
    buffer = new ArrayBuffer(arrayConstructor.BYTES_PER_ELEMENT * columns * rows)) {
        this.arrayConstructor = arrayConstructor;
        this.rows = rows;
        this.columns = columns;
        this.buffer = buffer;
        this.data = new arrayConstructor(this.buffer);
    }
    /** Sets a single element in the matrix. */
    set(row, col, value) {
        this.data[col + row * this.columns] = value;
    }
    /** Returns a single element from the matrix. */
    get(row, col) {
        return this.data[col + row * this.columns];
    }
    /** Returns a row vector from the matrix. */
    getRow(row) {
        return this.data.slice(row * this.columns, (row + 1) * this.columns);
    }
    /** Returns a new matrix with identical dimensions and elements. */
    clone() {
        return new Matrix(this.arrayConstructor, this.rows, this.columns, this.buffer.slice(0));
    }
    /** Returns a new uninitialized matrix with identical dimensions. */
    cloneWithoutData() {
        return new Matrix(this.arrayConstructor, this.rows, this.columns);
    }
}
exports.Matrix = Matrix;

});
___scope___.file("lib/som/Model.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Matrix_1 = require("./Matrix");
/** Represents the model of a self-organizing map. */
class Model {
    constructor(width, height, lattice) {
        /** The dimension the dataset and therefore the neurons' weights have. */
        this.dataDimension = 3;
        this._lattice = lattice;
        this.setDimensions(width, height);
    }
    /** Contains the squared euclidean distance from a neuron to another neuron. */
    get distanceMatrix() { return this._distanceMatrix; }
    /** Contains the weight vectors (as row vectors) of all neurons. */
    get weightMatrix() { return this._weightMatrix; }
    get width() { return this._width; }
    get height() { return this._height; }
    get lattice() { return this._lattice; }
    /**
     * Resizes the model.
     * Warning: This will reset the weight matrix.
     */
    setDimensions(width, height) {
        this._width = width;
        this._height = height;
        // initialize distance matrix
        this._distanceMatrix = new Matrix_1.Matrix(Float64Array, this.neuronCount, this.neuronCount);
        this.calculateDistanceMatrix();
        // allocate weight matrix
        this._weightMatrix = new Matrix_1.Matrix(Float64Array, this.neuronCount, this.dataDimension);
    }
    /** Updates the lattice and causes the distanceMatrix to be recalculated. */
    set lattice(lattice) {
        this._lattice = lattice;
        this.calculateDistanceMatrix();
    }
    neuronPositionInLattice(neuronIndex) {
        return this.lattice.calculatePosition(neuronIndex % this.width, Math.floor(neuronIndex / this.width));
    }
    /** Populates the distanceMatrix. */
    calculateDistanceMatrix() {
        // from each neuron
        for (let i = 0; i < this.neuronCount; ++i) {
            let posI = this.neuronPositionInLattice(i);
            // to each other neuron
            for (let j = i; j < this.neuronCount; ++j) {
                // calculate the distance
                let posJ = this.neuronPositionInLattice(j);
                let distSqr = Math.pow((posJ[0] - posI[0]), 2) + Math.pow((posJ[1] - posI[1]), 2);
                this.distanceMatrix.set(i, j, distSqr);
                this.distanceMatrix.set(j, i, distSqr);
            }
        }
    }
    /** Returns the count of neurons in this model. */
    get neuronCount() {
        return this.width * this.height;
    }
    /**
     * Returns the index of the neuron (used as row index in matrices) at a given position.
     * The position is the grid index (i. e. not processed by Lattice.calculatePosition).
     */
    getNeuronIndex(x, y) {
        return x + y * this.width;
    }
    /**
     * Returns the index of the neuron whose weights are closest to a given weight vector.
     * @param excludeNeuron Will exclude a given neuron from the search (for example to find the second best matching unit).
     */
    findBestMatchingUnit(weights) {
        let bmu = 0, dist = Infinity;
        for (let i = 0; i < this.neuronCount; ++i) {
            let d = this._weightMatrix.getRow(i).reduce((sum, v, i) => sum + Math.pow((weights[i] - v), 2), 0);
            if (d < dist) {
                dist = d;
                bmu = i;
            }
        }
        return bmu;
    }
    findBestMatchingUnits(weights, count) {
        let dists = new Map();
        let neurons = [];
        for (let i = 0; i < this.neuronCount; ++i) {
            let d = this._weightMatrix.getRow(i).reduce((sum, v, i) => sum + Math.pow((weights[i] - v), 2), 0);
            dists.set(i, d);
            neurons.push(i);
        }
        return neurons.sort((a, b) => dists.get(a) - dists.get(b)).slice(0, count);
    }
}
exports.Model = Model;

});
___scope___.file("lib/som/Trainer.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exponentialDecay = (value, t) => value.start * Math.pow(value.end / value.start, t);
/** Used to train a `Model`. */
class Trainer {
    constructor(model, datasetSampler) {
        this.model = model;
        this.datasetSampler = datasetSampler;
        this.currentIteration = 0;
    }
    /** Returns the learning rate for the current iteration. */
    get learningRate() {
        return exponentialDecay(this.learningRateBounds, this.progress);
    }
    /** Returns the neighbor size for the current iteration. */
    get neighborSize() {
        return exponentialDecay(this.neighborSizeBounds, this.progress);
    }
    /** Returns a number between [0;1] to denote current training progress. */
    get progress() {
        return this.currentIteration / this.maxIteration;
    }
    iterate(count, targetWeightMatrix = this.model.weightMatrix) {
        count = Math.min(count, this.maxIteration - this.currentIteration);
        let input;
        for (let iteration = 0; iteration < count; ++iteration) {
            // get a datapoint for this iteration
            this.currentSample = input = this.datasetSampler.nextSample();
            // get learning properties
            let learningRate = this.learningRate;
            let neighborSizeSqr = Math.pow(this.neighborSize, 2);
            // find best matching unit
            let bmu = this.model.findBestMatchingUnit(input);
            for (let i = 0; i < this.model.neuronCount; ++i) {
                // adjust every neuron's weights
                let distSqr = this.model.distanceMatrix.get(bmu, i);
                let exponent = -distSqr / (2 * neighborSizeSqr);
                let df = exponent < -2.3 ? 0 : Math.exp(exponent);
                let lf = 1.0 - learningRate * df;
                for (let dim = 0; dim < this.model.dataDimension; ++dim)
                    targetWeightMatrix.set(i, dim, 
                    // blend between previous value and input vector
                    this.model.weightMatrix.get(i, dim) * lf + input[dim] * (1 - lf));
            }
            // advance to next iteration
            ++this.currentIteration;
        }
    }
    get hasFinished() {
        return this.currentIteration >= this.maxIteration;
    }
    reset() {
        this.currentIteration = 0;
    }
}
exports.Trainer = Trainer;

});
___scope___.file("lib/som/utils/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./PCA"));

});
___scope___.file("lib/SOMController.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("./som/Model");
const Trainer_1 = require("./som/Trainer");
const Dataset_1 = require("./som/Dataset");
const DatasetSource_1 = require("./som/DatasetSource");
const Lattice_1 = require("./som/Lattice");
const DatasetSampler_1 = require("./som/DatasetSampler");
const Initializer_1 = require("./som/Initializer");
/** Controller for self-organizing maps. */
class SOMController {
    constructor() {
        this.model = new Model_1.Model(12, 12, new Lattice_1.SquareLattice());
        this.initializer = new Initializer_1.PCAInitializer();
        let sources = [];
        for (let i = 0; i < 6; ++i)
            sources.push(new DatasetSource_1.ClusterDatasetSource(1000, [0, 0, 0].map(Math.random), 0.02));
        this.dataset = new Dataset_1.Dataset(sources);
        this.trainer = new Trainer_1.Trainer(this.model, new DatasetSampler_1.BootstrapDatasetSampler(this.dataset));
        this.trainer.learningRateBounds = { start: 0.2, end: 0.02 };
        this.trainer.neighborSizeBounds = { start: 4, end: 0.1 };
        this.trainer.maxIteration = 5000;
    }
    initialize() {
        this.initializer.performInitialization(this.dataset, this.model);
        this.trainer.reset();
    }
    iterate(count) {
        this.trainer.iterate(count);
    }
    getErrors(sampleCount = 100) {
        let stride = Math.max(1, Math.floor(this.dataset.sampleCount / sampleCount));
        //@ts-ignore
        let eQ = 0, eT = 0, count = 0;
        for (let i = 0; i < this.dataset.sampleCount; i += stride) {
            let point = this.dataset.getSample(i);
            let [bmu, bmu2] = this.model.findBestMatchingUnits(point, 2);
            let point2 = this.model.weightMatrix.getRow(bmu);
            eQ += Math.sqrt(point.map((a, i) => Math.pow((a - point2[i]), 2)).reduce((sum, v) => sum + v, 0));
            eT += this.model.distanceMatrix.get(bmu, bmu2) <= 1 ? 0 : 1;
            ++count;
        }
        eQ /= sampleCount;
        eT /= sampleCount;
        return {
            eQ, eT
        };
    }
}
exports.SOMController = SOMController;

});
___scope___.file("modules/som-designer/LogSlider.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const material_ui_1 = require("material-ui");
class LogSlider extends React.Component {
    render() {
        let _a = this.props, { value, onChange } = _a, props = __rest(_a, ["value", "onChange"]);
        return React.createElement(material_ui_1.Slider, Object.assign({ value: Math.log10(value), onChange: (event, value) => onChange(event, Math.pow(10, value)) }, props));
    }
}
exports.LogSlider = LogSlider;

});
___scope___.file("modules/som-designer/NumberInput.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class NumberInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: String(props.value || 0)
        };
    }
    componentWillReceiveProps(props) {
        this.setState({
            value: String(props.value)
        });
    }
    handleKeyDown(e) {
        switch (e.keyCode) {
            case 13: // enter
                this.commitValue(); // commit value
                break;
            case 27: // escape
                this.setState({ value: String(this.props.value) }); // reset to previous value
                break;
            default:
                console.log(e.keyCode);
        }
    }
    commitValue() {
        let newValue = Number(this.state.value);
        if (this.props.value !== newValue)
            // only update if value has changed
            this.props.onChange(newValue);
    }
    render() {
        let _a = this.props, { value, onChange } = _a, props = __rest(_a, ["value", "onChange"]);
        return React.createElement("input", Object.assign({ type: "number", value: this.state.value, onChange: e => this.setState({ value: e.currentTarget.value }), onKeyDown: e => this.handleKeyDown(e), onBlur: e => this.commitValue() }, props));
    }
}
exports.NumberInput = NumberInput;

});
___scope___.file("modules/som-designer/tabs/DataTab.scss", function(exports, require, module, __filename, __dirname){


require("fuse-box-css")("modules/som-designer/tabs/DataTab.scss", ":local(.tab) {\n  padding: 10px 16px; }\n  :local(.tab) hr {\n    border: none;\n    border-top: 1px solid #ccc;\n    margin: 20px -16px; }\n  :local(.tab) h2 {\n    color: rgba(0, 0, 0, 0.54);\n    font-weight: 500;\n    font-size: 14px;\n    line-height: 1em; }\n\n:local(.datasource) {\n  position: relative;\n  border-bottom: 1px solid #ddd;\n  min-height: 48px; }\n  :local(.datasource) span.js-label {\n    position: absolute;\n    display: block;\n    width: 40px;\n    text-align: center;\n    line-height: 48px;\n    color: #ccc;\n    font-weight: bold;\n    font-size: 1.4em;\n    transition: 0.3s ease all; }\n    :local(.datasource) span.js-label:hover {\n      color: #888; }\n  :local(.datasource) div.content {\n    padding: 6px 0 2px 50px; }\n    :local(.datasource) div.content span.title {\n      font-size: .8em; }\n      :local(.datasource) div.content span.title span.cluster-type {\n        font-weight: bold;\n        text-transform: uppercase; }\n      :local(.datasource) div.content span.title input {\n        outline: none;\n        font: inherit;\n        border: none;\n        border-bottom: 1px solid #e0e0e0;\n        width: 30px;\n        line-height: 1em;\n        text-align: center;\n        margin: 0 2px;\n        /* Make this look like an ordinary text field */\n        -moz-appearance: textfield; }\n        :local(.datasource) div.content span.title input::-webkit-outer-spin-button, :local(.datasource) div.content span.title input::-webkit-inner-spin-button {\n          -webkit-appearance: none; }\n        :local(.datasource) div.content span.title input:focus {\n          border-bottom-color: #00bcd4; }\n\n:local(.weight-editor) div.color {\n  position: absolute;\n  top: 20px;\n  left: 14px;\n  width: 24px;\n  height: 24px;\n  border-radius: 100%;\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.4); }\n\n:local(.we-popover-content) span.title {\n  display: block;\n  text-align: center;\n  margin: 4px 0; }\n\n:local(.we-popover-content) div.coordinate b.caption {\n  display: inline-block;\n  width: 20px; }\n\n/*# sourceMappingURL=DataTab.scss.map */")
});
___scope___.file("modules/som-designer/tabs/ModelTab.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const NumberInput_1 = require("../NumberInput");
const LearningRatePreview_1 = require("../LearningRatePreview");
const lib_1 = require("../../../lib");
const style = require("./ModelTab.scss");
const SelectField_1 = require("material-ui/SelectField");
const MenuItem_1 = require("material-ui/MenuItem");
class ModelTab extends React.Component {
    constructor() {
        super(...arguments);
        this.resizeHandler = () => {
            this.forceUpdate();
        };
    }
    renderModelControls() {
        return React.createElement("div", null,
            React.createElement("div", { className: style["control-with-label"] },
                React.createElement("span", null, "Size"),
                React.createElement(NumberInput_1.NumberInput, { min: 1, step: 1, onChange: width => {
                        this.props.model.setDimensions(width, this.props.model.height);
                        this.props.onUpdateModel();
                    }, value: this.props.model.width }),
                "\u00D7",
                React.createElement(NumberInput_1.NumberInput, { min: 1, step: 1, onChange: height => {
                        this.props.model.setDimensions(this.props.model.width, height);
                        this.props.onUpdateModel();
                    }, value: this.props.model.height })));
    }
    renderInitializationControls() {
        return React.createElement(SelectField_1.default, { floatingLabelText: "Method", value: this.props.initializer.constructor, onChange: (e, index, klass) => {
                this.props.onChangeInitializer(new klass());
            }, style: {
                marginTop: -20
            } },
            React.createElement(MenuItem_1.default, { value: lib_1.RandomInitializer, primaryText: "Random" }),
            React.createElement(MenuItem_1.default, { value: lib_1.PCAInitializer, primaryText: "PCA" }));
    }
    renderTrainingControls() {
        let parentWidth = this.refs["tab"] ? this.refs["tab"].clientWidth - 30 : 200;
        return React.createElement("div", null,
            React.createElement("div", { className: style["control-with-label"] },
                React.createElement("span", null, "# iterations"),
                React.createElement(NumberInput_1.NumberInput, { min: 0, step: 1000, value: this.props.trainer.maxIteration, onChange: v => {
                        this.props.trainer.maxIteration = v;
                        this.props.onUpdateTrainer();
                    } })),
            React.createElement("div", { className: style["control-with-label"] },
                React.createElement("span", null, "Learning rate"),
                React.createElement(NumberInput_1.NumberInput, { step: 0.01, value: this.props.trainer.learningRateBounds.start, onChange: v => {
                        this.props.trainer.learningRateBounds.start = v;
                        this.props.onUpdateTrainer();
                    } }),
                " to",
                React.createElement(NumberInput_1.NumberInput, { step: 0.001, value: this.props.trainer.learningRateBounds.end, onChange: v => {
                        this.props.trainer.learningRateBounds.end = v;
                        this.props.onUpdateTrainer();
                    } })),
            React.createElement("div", { className: style["control-with-label"] },
                React.createElement("span", null, "Neighbor size"),
                React.createElement(NumberInput_1.NumberInput, { step: 1, value: this.props.trainer.neighborSizeBounds.start, onChange: v => {
                        this.props.trainer.neighborSizeBounds.start = v;
                        this.props.onUpdateTrainer();
                    } }),
                " to",
                React.createElement(NumberInput_1.NumberInput, { step: 0.01, value: this.props.trainer.neighborSizeBounds.end, onChange: v => {
                        this.props.trainer.neighborSizeBounds.end = v;
                        this.props.onUpdateTrainer();
                    } })),
            React.createElement(LearningRatePreview_1.LearningRatePreview, { learningRate: this.props.trainer.learningRate, neighborSize: this.props.trainer.neighborSize, width: parentWidth, height: 150, style: {
                    marginTop: 30
                } }));
    }
    componentDidMount() {
        window.addEventListener("resize", this.resizeHandler);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeHandler);
    }
    render() {
        return React.createElement("div", { className: style["tab"], ref: "tab" },
            React.createElement("h2", null, "Model"),
            this.renderModelControls(),
            React.createElement("hr", null),
            React.createElement("h2", null, "Initialization"),
            this.renderInitializationControls(),
            React.createElement("hr", null),
            React.createElement("h2", null, "Training"),
            this.renderTrainingControls());
    }
}
exports.ModelTab = ModelTab;

});
___scope___.file("modules/som-designer/LearningRatePreview.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const lib_1 = require("../../lib");
class SimpleDatasetSampler extends lib_1.DatasetSampler {
    constructor() {
        super(null);
    }
    nextSample() {
        return [0.5, 1, 0.5];
    }
}
class LearningRatePreview extends React.Component {
    constructor(props) {
        super(props);
        // setup model and trainer
        this.model = new lib_1.Model(15, 15, new lib_1.SquareLattice());
        this.trainer = new lib_1.Trainer(this.model, new SimpleDatasetSampler());
        this.trainer.maxIteration = 1;
        // initialize model to square
        for (let i = 0; i < this.model.neuronCount; ++i) {
            let [x, z] = this.model.neuronPositionInLattice(i);
            this.model.weightMatrix.set(i, 0, x / (this.model.width - 1));
            // dim 1 stays zero
            this.model.weightMatrix.set(i, 2, z / (this.model.height - 1));
        }
        // clone weight matrix
        this.weightMatrix = this.model.weightMatrix.clone();
    }
    updateWeightMatrix() {
        // setup trainer
        this.trainer.learningRateBounds = { start: this.props.learningRate, end: 0 };
        this.trainer.neighborSizeBounds = { start: this.props.neighborSize, end: 0 };
        // iterate
        this.trainer.currentIteration = 0;
        this.trainer.iterate(1, this.weightMatrix);
    }
    project(vec) {
        let x = (vec[0] + (vec[2] - 0.5) * 0.5) * 0.8 + 0.1;
        let y = 0.8 - (vec[1] + vec[2] * 0.5) * 0.6;
        return [
            x * this.props.height + (this.props.width - this.props.height) / 2,
            y * this.props.height
        ];
    }
    render() {
        this.updateWeightMatrix();
        let projections = new Map();
        let interior = [];
        // add dataset circle and dashed line
        {
            let [cx, cy] = this.project([0.5, 1, 0.5]);
            let [cx2, cy2] = this.project([0.5, 0, 0.5]);
            interior.push(React.createElement("circle", { cx: cx, cy: cy, r: 1, fill: "#000" }), React.createElement("line", { x1: cx, y1: cy, x2: cx2, y2: cy2, strokeDasharray: "5, 5", style: {
                    stroke: "#ccc",
                    strokeWidth: 1
                } }));
        }
        // add model grid
        for (let i = 0; i < this.weightMatrix.rows; ++i) {
            let projection = this.project(this.weightMatrix.getRow(i));
            let [x, y] = projection;
            projections.set(i, [x, y]);
            // find connections to previous neurons
            for (let j = 0; j < i; ++j)
                if (this.model.distanceMatrix.get(i, j) <= 1) {
                    // connect these neighboring neurons
                    let [x2, y2] = projections.get(j);
                    interior.push(React.createElement("line", { x1: x, y1: y, x2: x2, y2: y2, style: {
                            stroke: `rgb(255, 0, 0)`,
                            strokeWidth: 1
                        } }));
                }
        }
        // render
        return React.createElement("svg", { width: this.props.width, height: this.props.height, style: this.props.style },
            React.createElement("text", { x: "0", y: "15", fill: "#333" },
                "LR: ",
                this.props.learningRate.toFixed(3)),
            React.createElement("text", { x: "0", y: "30", fill: "#333" },
                "NS: ",
                this.props.neighborSize.toFixed(3)),
            interior);
    }
}
exports.LearningRatePreview = LearningRatePreview;

});
___scope___.file("modules/som-designer/tabs/ModelTab.scss", function(exports, require, module, __filename, __dirname){


require("fuse-box-css")("modules/som-designer/tabs/ModelTab.scss", ":local(.tab) {\n  padding: 10px 16px; }\n  :local(.tab) hr {\n    border: none;\n    border-top: 1px solid #ccc;\n    margin: 20px -16px; }\n  :local(.tab) h2 {\n    color: rgba(0, 0, 0, 0.54);\n    font-weight: 500;\n    font-size: 14px;\n    line-height: 1em; }\n\n:local(.tab) input[type=\"number\"] {\n  outline: none;\n  font: inherit;\n  border: none;\n  border-bottom: 1px solid #e0e0e0;\n  width: 30px;\n  line-height: 1em;\n  text-align: center;\n  margin: 0 2px;\n  /* Make this look like an ordinary text field */\n  -moz-appearance: textfield; }\n  :local(.tab) input[type=\"number\"]::-webkit-outer-spin-button, :local(.tab) input[type=\"number\"]::-webkit-inner-spin-button {\n    -webkit-appearance: none; }\n  :local(.tab) input[type=\"number\"]:focus {\n    border-bottom-color: #00bcd4; }\n\n:local(.control-with-label) span {\n  display: inline-block;\n  width: 80px; }\n\n:local(.control-with-label) input[type=\"number\"] {\n  width: 40px; }\n\n/*# sourceMappingURL=ModelTab.scss.map */")
});
___scope___.file("modules/som-designer/tabs/TrainTab.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const LogSlider_1 = require("../LogSlider");
const IterationPlot_1 = require("../IterationPlot");
const LearningRatePreview_1 = require("../LearningRatePreview");
const style = require("./TrainTab.scss");
const IconButton_1 = require("material-ui/IconButton");
const LinearProgress_1 = require("material-ui/LinearProgress");
class TrainTab extends React.Component {
    constructor() {
        super(...arguments);
        this.resizeHandler = () => {
            this.forceUpdate();
        };
    }
    renderProgress() {
        let percentCompleted = Math.round(this.props.trainer.progress * 100);
        return React.createElement("div", { className: "progress" },
            React.createElement(LinearProgress_1.default, { mode: "determinate", value: percentCompleted }),
            React.createElement("div", { style: {
                    marginTop: 5,
                    textAlign: "center"
                } },
                "#",
                this.props.trainer.currentIteration,
                React.createElement("span", { style: {
                        paddingLeft: 5,
                        opacity: 0.5
                    } },
                    "(",
                    percentCompleted,
                    " %)")));
    }
    renderControls() {
        let toggleTraining = this.props.isTraining ? this.props.endTraining : this.props.startTraining;
        return React.createElement("div", { className: "controls" },
            React.createElement(IconButton_1.default, { iconClassName: "material-icons", tooltip: this.props.isTraining ? "Stop training" : "Start training", onClick: toggleTraining, disabled: this.props.trainer.hasFinished }, this.props.isTraining ? "pause" : "play_arrow"),
            React.createElement(IconButton_1.default, { iconClassName: "material-icons", tooltip: "One iteration", onClick: this.props.iterateSingle, disabled: this.props.trainer.hasFinished }, "skip_next"),
            React.createElement(IconButton_1.default, { iconClassName: "material-icons", tooltip: "Reset", onClick: this.props.reset }, "replay"));
    }
    renderSpeedControl() {
        return React.createElement("div", { className: "speed-control" },
            React.createElement(LogSlider_1.LogSlider, { step: 1, min: -1, max: 3, value: this.props.animationSpeed, sliderStyle: {
                    margin: 0
                }, onChange: (event, animationSpeed) => this.props.setAnimationSpeed(animationSpeed) }),
            React.createElement("b", null, "Speed:"),
            " ",
            this.props.animationSpeed,
            "\u00D7");
    }
    renderStatus() {
        let parentWidth = this.refs["tab"] ? this.refs["tab"].clientWidth - 30 : 200;
        return React.createElement("div", { className: "status" },
            React.createElement(IterationPlot_1.IterationPlot, { width: parentWidth, height: 50, min: 0, max: 0.2, iteration: this.props.trainer.currentIteration, maxIteration: this.props.trainer.maxIteration, title: "Eq", value: this.props.quantizationError }),
            React.createElement(IterationPlot_1.IterationPlot, { width: parentWidth, height: 50, min: 0, max: 0.5, iteration: this.props.trainer.currentIteration, maxIteration: this.props.trainer.maxIteration, title: "Et", value: this.props.topographicError }),
            React.createElement(LearningRatePreview_1.LearningRatePreview, { learningRate: this.props.trainer.learningRate, neighborSize: this.props.trainer.neighborSize, width: parentWidth, height: 150 }));
    }
    componentDidMount() {
        window.addEventListener("resize", this.resizeHandler);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeHandler);
    }
    render() {
        return React.createElement("div", { className: style["tab"], ref: "tab" },
            this.renderControls(),
            this.renderSpeedControl(),
            this.renderProgress(),
            React.createElement("hr", null),
            React.createElement("h2", null, "Status"),
            this.renderStatus());
    }
}
exports.TrainTab = TrainTab;

});
___scope___.file("modules/som-designer/IterationPlot.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class IterationPlot extends React.Component {
    constructor() {
        super(...arguments);
        this.points = [];
    }
    redraw(props) {
        let canvas = this.refs["canvas"];
        canvas.width = props.width * 2;
        canvas.height = props.height * 2;
        canvas.style.width = props.width + "px";
        canvas.style.height = props.height + "px";
        let ctx = canvas.getContext("2d");
        ctx.scale(2, 2);
        const x = (iteration) => iteration / props.maxIteration * props.width;
        const y = (value) => (1 - (value - props.min) / (props.max - props.min)) * props.height;
        // redraw canvas
        // draw text
        ctx.fillText(`${props.title}: ${props.value.toFixed(3)}`, 10, 10);
        // draw plot
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, props.height);
        ctx.lineTo(props.width, props.height);
        ctx.stroke();
        ctx.closePath();
        if (this.points.length > 1) {
            ctx.beginPath();
            this.points.reduce((lastPoint, point) => {
                if (lastPoint) {
                    ctx.moveTo(x(lastPoint.iteration), y(lastPoint.value));
                    ctx.lineTo(x(point.iteration), y(point.value));
                }
                return point;
            }, undefined);
            ctx.stroke();
            ctx.closePath();
        }
    }
    componentDidMount() {
        this.redraw(this.props);
    }
    componentWillReceiveProps(props) {
        this.points = this.points.filter(point => point.iteration < props.iteration);
        this.points.push({
            iteration: props.iteration,
            value: props.value
        });
        this.redraw(props);
    }
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return React.createElement("canvas", { ref: "canvas" });
    }
}
exports.IterationPlot = IterationPlot;

});
___scope___.file("modules/som-designer/tabs/TrainTab.scss", function(exports, require, module, __filename, __dirname){


require("fuse-box-css")("modules/som-designer/tabs/TrainTab.scss", ":local(.tab) {\n  padding: 10px 16px; }\n  :local(.tab) hr {\n    border: none;\n    border-top: 1px solid #ccc;\n    margin: 20px -16px; }\n  :local(.tab) h2 {\n    color: rgba(0, 0, 0, 0.54);\n    font-weight: 500;\n    font-size: 14px;\n    line-height: 1em; }\n\n:local(.tab) div.controls {\n  text-align: center; }\n\n:local(.tab) div.speed-control {\n  margin: 10px 0 20px; }\n\n:local(.tab) div.status {\n  text-align: center; }\n  :local(.tab) div.status * {\n    margin-top: 20px; }\n\n/*# sourceMappingURL=TrainTab.scss.map */")
});
___scope___.file("modules/som-designer/tabs/SettingsTab.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const material_ui_1 = require("material-ui");
const style = require("./SettingsTab.scss");
class SettingsTab extends React.Component {
    renderSettings() {
        return (React.createElement(material_ui_1.List, { style: {
                padding: 0
            } },
            React.createElement(material_ui_1.ListItem, { style: {
                    padding: "10px 0 10px 60px"
                }, leftCheckbox: React.createElement(material_ui_1.Checkbox, { style: { top: 14 }, checked: this.props.displayMap, onCheck: (e, checked) => this.props.onUpdateDisplayMap(checked) }), primaryText: "Display color-coded map", secondaryText: "Visualizes positions of neurons" }),
            React.createElement(material_ui_1.ListItem, { style: {
                    padding: "10px 0 10px 60px"
                }, leftCheckbox: React.createElement(material_ui_1.Checkbox, { style: { top: 14 }, checked: this.props.displayUMatrix, onCheck: (e, checked) => this.props.onUpdateDisplayUMatrix(checked) }), primaryText: "Display U-Matrix", secondaryText: "Visualizes weight distance of adjacent neurons" })));
    }
    renderAbout() {
        return (React.createElement("div", null,
            "TODO: add infos.",
            React.createElement("br", null)));
    }
    render() {
        return React.createElement("div", { className: style["tab"] },
            React.createElement("h2", null, "Settings"),
            this.renderSettings(),
            React.createElement("hr", null),
            React.createElement("h2", null, "Guide"),
            this.renderAbout());
    }
}
exports.SettingsTab = SettingsTab;

});
___scope___.file("modules/som-designer/tabs/SettingsTab.scss", function(exports, require, module, __filename, __dirname){


require("fuse-box-css")("modules/som-designer/tabs/SettingsTab.scss", ":local(.tab) {\n  padding: 10px 16px; }\n  :local(.tab) hr {\n    border: none;\n    border-top: 1px solid #ccc;\n    margin: 20px -16px; }\n  :local(.tab) h2 {\n    color: rgba(0, 0, 0, 0.54);\n    font-weight: 500;\n    font-size: 14px;\n    line-height: 1em; }\n\n/*# sourceMappingURL=SettingsTab.scss.map */")
});
___scope___.file("modules/som-designer/App.scss", function(exports, require, module, __filename, __dirname){


require("fuse-box-css")("modules/som-designer/App.scss", ":local .main-view {\n  position: absolute;\n  z-index: 90;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 25%; }\n  :local .main-view canvas {\n    width: 100%;\n    height: 100%; }\n\n:local .grid-plot {\n  position: absolute;\n  z-index: 100;\n  bottom: 10px;\n  right: calc(25% + 10px); }\n\n:local .sidebar {\n  position: absolute;\n  z-index: 200;\n  background-color: white;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  width: 25%; }\n\n/*# sourceMappingURL=App.scss.map */")
});
___scope___.file("stores/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NavStore_1 = require("./NavStore");
const UiStore_1 = require("./UiStore");
class CogliteState {
    constructor() {
        this.uiStore = new UiStore_1.UiStore();
        this.nav = new NavStore_1.NavStore();
    }
}
exports.cogliteState = new CogliteState();

});
___scope___.file("stores/NavStore.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
class NavStore {
    constructor() {
        this.goTo = (inputRoute) => this.route = inputRoute;
        this.goToChartDrawer = (inputRoute) => this.chartDrawerRoute = inputRoute;
        this.goToMlDrawer = (inputRoute) => this.mlDrawerRoute = inputRoute;
        this.route = 'home';
    }
    ;
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], NavStore.prototype, "route", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], NavStore.prototype, "chartDrawerRoute", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], NavStore.prototype, "mlDrawerRoute", void 0);
__decorate([
    mobx_1.action.bound,
    __metadata("design:type", Object)
], NavStore.prototype, "goTo", void 0);
__decorate([
    mobx_1.action.bound,
    __metadata("design:type", Object)
], NavStore.prototype, "goToChartDrawer", void 0);
__decorate([
    mobx_1.action.bound,
    __metadata("design:type", Object)
], NavStore.prototype, "goToMlDrawer", void 0);
exports.NavStore = NavStore;
/*
import {observable, action} from 'mobx';
import Navigation from './Navigation';

export class Counter {
  @observable count: number = 0;

  @action
  navigateToAbout(): void {
    Navigation.push('/about');
  }

  @action
  increment(): void {
    this.count += 1;
  }

  @action
  decrement(): void {
    this.count -= 1;
  }
}

export default new Counter();
*/ 

});
___scope___.file("stores/UiStore.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
const palette_1 = require("../styles/palette");
const styles_1 = require("@material-ui/core/styles");
const mobx_1 = require("mobx");
class ToggleOpenValue {
    constructor() {
        this.open = false;
        this.openDrawer = (open) => {
            this.open = open;
        };
        this.closeDrawer = () => {
            this.open = false;
        };
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], ToggleOpenValue.prototype, "open", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], ToggleOpenValue.prototype, "openDrawer", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], ToggleOpenValue.prototype, "closeDrawer", void 0);
exports.ToggleOpenValue = ToggleOpenValue;
class TabValue {
    constructor() {
        this.tabValue = 0;
    }
    setTab(event, tabValue) { this.tabValue = tabValue; }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], TabValue.prototype, "tabValue", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TabValue.prototype, "setTab", null);
exports.TabValue = TabValue;
class UiStore {
    constructor() {
        this.title = "Coglite";
        this.themeId = "blueprint";
        this.themeDialogToggle = new ToggleOpenValue();
        this.menuDrawerToggle = new ToggleOpenValue();
        this.nodeDrawerToggle = new ToggleOpenValue();
        this.nodeFormDrawerToggle = new ToggleOpenValue();
        this.appBarSettingsMenuToggle = new ToggleOpenValue();
        this.appTabs = new TabValue();
        this.isThemeDialogOpen = false;
        this.onError = (error) => { this.uiError = error; };
    }
    get muiTheme() {
        return styles_1.createMuiTheme({
            palette: {
                primary: {
                    main: palette_1.palette[this.themeId].primary,
                },
                secondary: {
                    main: palette_1.palette[this.themeId].secondary,
                },
            },
        });
    }
    updateTheme(themeId) {
        this.themeId = themeId;
    }
    openThemeDialog() {
        this.isThemeDialogOpen = true;
    }
    closeThemeDialog() {
        this.isThemeDialogOpen = false;
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], UiStore.prototype, "title", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], UiStore.prototype, "themeId", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], UiStore.prototype, "themeDialogToggle", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], UiStore.prototype, "menuDrawerToggle", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], UiStore.prototype, "nodeDrawerToggle", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], UiStore.prototype, "nodeFormDrawerToggle", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], UiStore.prototype, "appBarSettingsMenuToggle", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], UiStore.prototype, "appTabs", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], UiStore.prototype, "isThemeDialogOpen", void 0);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], UiStore.prototype, "muiTheme", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UiStore.prototype, "updateTheme", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UiStore.prototype, "openThemeDialog", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UiStore.prototype, "closeThemeDialog", null);
__decorate([
    mobx_1.observable,
    __metadata("design:type", typeof (_a = typeof Error !== "undefined" && Error) === "function" && _a || Object)
], UiStore.prototype, "uiError", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], UiStore.prototype, "onError", void 0);
exports.UiStore = UiStore;

});
___scope___.file("styles/palette.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.palette = {
    myriad: {
        primary: "#F44336",
        secondary: "#FFD740",
        background: "#FFFFFF",
    },
    ranger: {
        primary: "#2196F3",
        secondary: "#FFE57F",
        background: "#FFFFFF",
    },
    velocity: {
        primary: "#FFA000",
        secondary: "#607D8B",
        background: "#FFFFFF",
    },
    blueprint: {
        primary: "#607d8b",
        secondary: "#3f51b5",
        background: "#FFFFFF",
    },
};

});
___scope___.file("base.css", function(exports, require, module, __filename, __dirname){


require("fuse-box-css")("base.css", "@import url(https://fonts.googleapis.com/css?family=Roboto:400,500&subset=latin-ext);\r\n@import url(https://fonts.googleapis.com/css?family=Roboto+Mono:400,500&subset=latin-ext);\r\n@import url(https://fonts.googleapis.com/icon?family=Material+Icons);\r\n\r\n/******************************* Basic elements *******************************/\r\n::selection {\r\n  background: #43464b;\r\n}\r\n\r\na,\r\na:active,\r\na.alt:hover {\r\n  color: #b60127;\r\n}\r\n\r\na:hover,\r\na.alt,\r\na.alt:active {\r\n  color: #43464b;\r\n}\r\n\r\nbody {\r\n  font-family: 'Roboto', sans-serif;\r\n  font-size: 13px;\r\n  line-height: 1.3;\r\n}\r\n\r\nhr {\r\n  border: 0;\r\n  border-top: 1px solid #e9e9e9;\r\n  margin: 10px 0 10px 0;\r\n}\r\n\r\n/************************************ Misc ************************************/\r\n.mono {\r\n  font-family: 'Roboto Mono';\r\n}\r\n\r\n/************************* Success, warning and error *************************/\r\n.green > .ant-input-sm, /** Recipient list address coloring */\r\n.green {\r\n  color: #4fb71c;\r\n}\r\n\r\n.orange {\r\n  color: #ff7200;\r\n}\r\n\r\n.red > .ant-input-sm, /** Recipient list address coloring */\r\n.red {\r\n  color: #b60127;\r\n}\r\n\r\n/******************************** Flex aliases ********************************/\r\n.flex,\r\n.flex-center,\r\n.flex-sb {\r\n  align-items: center;\r\n  display: flex;\r\n}\r\n\r\n.flex-center {\r\n  justify-content: center;\r\n}\r\n\r\n.flex-sb {\r\n  justify-content: space-between; /** Align elements left and right */\r\n  width: 100%;\r\n}\r\n\r\n/******************************** Grid aliases ********************************/\r\n.grid-lc {\r\n  display: grid;\r\n  grid-gap: 5px 50px;\r\n  grid-template-columns: auto 1fr; /** Labels and content perfectly aligned */\r\n}\r\n\r\n.grid-lc.gap-5-30 {\r\n  grid-gap: 5px 30px;\r\n}\r\n\r\n.grid-tb {\r\n  display: grid;\r\n  grid-template-rows: 1fr auto; /** Align elements top and bottom */\r\n  height: 100%;\r\n}\r\n\r\n/******* React \"infinite\" list, limited by browser max scrolling height *******/\r\n.list,\r\n.list-plain {\r\n  overflow: auto;\r\n  z-index: 10;\r\n}\r\n\r\n.list {\r\n  background: #fafafa;\r\n  box-shadow: 1px 0px 5px 0px #888888;\r\n}\r\n\r\n.list-header {\r\n  border-bottom: 1px solid #d5d5d5;\r\n  font-weight: 500;\r\n  padding: 0 5px 3px 5px;\r\n}\r\n\r\n.list-item {\r\n  border-right: 1px solid #d5d5d5;\r\n  border-bottom: 1px solid #d5d5d5;\r\n  border-left: 1px solid #d5d5d5;\r\n  cursor: pointer;\r\n}\r\n\r\n.list-item > div,\r\n.list-item-plain > div {\r\n  padding: 3px 5px;\r\n}\r\n\r\n.list-item.even,\r\n.list-item-plain.even {\r\n  background: #ededed;\r\n}\r\n\r\n.list-item:hover,\r\n.list-item-plain:hover {\r\n  background: #dddddd;\r\n}\r\n\r\n.list-item.selected,\r\n.list-item-plain.selected {\r\n  background: #cdcdcd;\r\n}\r\n\r\n/******************************* Material icons *******************************/\r\n.material-icons.md-40 {\r\n  font-size: 40px;\r\n}\r\n\r\n.material-icons.md-22 {\r\n  font-size: 22px;\r\n}\r\n\r\n.material-icons.md-20 {\r\n  font-size: 20px;\r\n}\r\n\r\n.material-icons.md-19 {\r\n  font-size: 19px;\r\n}\r\n\r\n.material-icons.md-18 {\r\n  font-size: 18px;\r\n}\r\n\r\n.material-icons.md-16 {\r\n  font-size: 16px;\r\n}\r\n\r\n.material-icons.md-14 {\r\n  font-size: 14px;\r\n}\r\n\r\n.material-icons + p {\r\n  margin: 0 0 0 5px;\r\n}\r\n\r\n/****************************** Recharts tooltip ******************************/\r\n.chartTooltip {\r\n  background-color: rgba(255, 255, 255, 0.85);\r\n  border: 1px solid #f5f5f5;\r\n  margin: 0;\r\n  padding: 10px;\r\n}\r\n\r\n.chartTooltip .label {\r\n  border-bottom: 1px solid #cccccc;\r\n  font-weight: 500;\r\n  margin: 0;\r\n}\r\n\r\n/******************************** Application *********************************/\r\n#App {\r\n  display: grid;\r\n  grid-template-columns: 40px 1fr; /** Main menu, right-side content */\r\n  height: 100vh;\r\n}\r\n\r\n#App > div:first-child {\r\n  z-index: 2; /** Main menu shadow is always above content */\r\n}\r\n\r\n#App > div:last-child {\r\n  z-index: 1; /** Content is always below main menu shadow */\r\n}\r\n\r\n#AppHeaderFooter {\r\n  display: grid;\r\n  grid-template-rows: 30px 1fr 25px; /** Header, content, footer */\r\n}\r\n\r\n#AppHeaderFooter > div,\r\n#Connection > div {\r\n  padding: 10px 10px 10px 11px; /** 1px extra on left to offset the shadow */\r\n}\r\n\r\n#AppListContent {\r\n  display: grid;\r\n  grid-template-columns: 300px 1fr; /** List / page-menu, right-side content */\r\n  height: 100vh;\r\n}\r\n\r\n#AppListContent .ant-menu-item:not(.ant-menu-item-selected) {\r\n  background-color: #fafafa; /** Background of non-selected menu items */\r\n}\r\n\r\n#AppListContent .ant-menu > li {\r\n  padding: 0 10px !important; /** Left and right menu item padding */\r\n}\r\n\r\n#Connection {\r\n  display: grid;\r\n  grid-template-rows: 30px 1fr 32px; /** Header, connection, add / remove */\r\n}\r\n\r\n#Connection .labels > p {\r\n  line-height: 22px; /** Same height as .inputs below */\r\n  margin: 0 20px 5px 0;\r\n}\r\n\r\n#Connection .labels > p:last-child {\r\n  margin: 0 20px 0 0; /** Last label has no bottom 5px margin */\r\n}\r\n\r\n#Connection .inputs {\r\n  align-items: flex-start;\r\n  flex-direction: column;\r\n}\r\n\r\n#Console {\r\n  display: grid;\r\n  grid-template-rows: 1fr auto; /** RPC results, RPC input */\r\n  height: 100%;\r\n}\r\n\r\n#Console > div:first-child {\r\n  font-size: 11px;\r\n}\r\n\r\n#Console > div:last-child {\r\n  padding: 5px 0 9px 0;\r\n}\r\n\r\n#Console .ant-input {\r\n  height: 22px; /** Same autocomplete height as buttons  */\r\n}\r\n\r\n#Footer {\r\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),\r\n              0 3px 1px -2px rgba(0, 0, 0, 0.2),\r\n              0 1px 5px 0 rgba(0, 0, 0, 0.12);\r\n}\r\n\r\n#Header {\r\n  background: #b60127;\r\n  box-shadow: 0px 2px 5px 0px #888888;\r\n  color: #ffffff;\r\n  height: 30px;\r\n}\r\n\r\n#Header p > span {\r\n  font-size: 14px;\r\n  font-weight: 500;\r\n  margin: 0 4px 0 2px;\r\n}\r\n\r\n#Header .ant-btn {\r\n  background-color: #43464b;\r\n  border-color: #43464b;\r\n  color: #ffffff;\r\n  padding: 0 5px;\r\n  height: 24px;\r\n}\r\n\r\n#Header .ant-btn:hover,\r\n#Header .ant-btn:focus {\r\n  background-color: #43464b;\r\n  border-color: #43464b;\r\n  color: #b60127;\r\n}\r\n\r\n#InfoBlocks {\r\n  display: grid;\r\n  grid-gap: 50px;\r\n  grid-template-columns: auto 1fr; /** Network info, recent blocks */\r\n}\r\n\r\n#MainMenu {\r\n  background-color: #b60127;\r\n  box-shadow: 1px 0px 5px 0px #888888;\r\n  display: grid;\r\n  grid-template-rows: 1fr auto; /** Logo, main menu */\r\n}\r\n\r\n#MainMenu .logo {\r\n  align-items: center;\r\n  display: flex;\r\n  height: 40px;\r\n  justify-content: center;\r\n}\r\n\r\n#MainMenu .logo img {\r\n  height: 28px;\r\n  width: 28px;\r\n}\r\n\r\n#MainMenu .ant-menu {\r\n  background: inherit; /** Ant Menu inherits main menu color */\r\n}\r\n\r\n#MainMenu .ant-menu-inline-collapsed {\r\n  width: 40px;\r\n}\r\n\r\n#MainMenu .ant-menu-inline-collapsed > .ant-menu-item {\r\n  padding: 0 10px !important;\r\n}\r\n\r\n#MainMenu .ant-menu-item {\r\n  line-height: 42px;\r\n  color: #35000b;\r\n}\r\n\r\n#MainMenu .ant-menu-item:active {\r\n  background: #89011d;\r\n}\r\n\r\n#MainMenu .ant-menu-item-selected {\r\n  background: #89011d;\r\n  border-right: none;\r\n  color: #ffffff;\r\n}\r\n\r\n#MainMenu .ant-menu-vertical {\r\n  border-right: none;\r\n}\r\n\r\n#OutputsRecipients {\r\n  display: grid;\r\n  grid-gap: 20px;\r\n  grid-template-columns: 250px 1fr; /** UTXO selection, sending recipients */\r\n}\r\n\r\n#OutputsRecipients > div:first-child > div:nth-child(1) {\r\n  margin: 0 0 40px 0; /** Address outputs bottom margin */\r\n}\r\n\r\n#OutputsRecipients > div:first-child > div:nth-child(2) {\r\n  margin: 0 0 20px 0; /** Selected outputs bottom margin */\r\n}\r\n\r\n/********************************* Ant Design *********************************/\r\n.ant-btn:hover,\r\n.ant-btn:focus {\r\n  border-color: #b60127;\r\n  color: #b60127;\r\n}\r\n\r\n.ant-btn-clicked:after {\r\n  border: 0 solid #b60127;\r\n}\r\n\r\n.ant-btn-primary {\r\n  background-color: #b60127;\r\n  border-color: #b60127;\r\n}\r\n\r\n.ant-btn-primary:hover,\r\n.ant-btn-primary:focus {\r\n  background-color: #43464b;\r\n  border-color: #43464b;\r\n  color: #ffffff;\r\n}\r\n\r\n.ant-btn-primary:active,\r\n.ant-btn-primary.active {\r\n  background-color: #b60127;\r\n  border-color: #b60127;\r\n}\r\n\r\n.ant-checkbox-wrapper:hover .ant-checkbox-inner,\r\n.ant-checkbox:hover .ant-checkbox-inner,\r\n.ant-checkbox-input:focus + .ant-checkbox-inner {\r\n  border-color: #b60127;\r\n}\r\n\r\n.ant-checkbox-checked:after {\r\n  border: 1px solid #b60127;\r\n}\r\n\r\n.ant-checkbox-checked .ant-checkbox-inner,\r\n.ant-checkbox-indeterminate .ant-checkbox-inner {\r\n  background-color: #b60127;\r\n  border-color: #b60127;\r\n}\r\n\r\n.ant-input:hover:not(.ant-input-disabled),\r\n.ant-input:focus {\r\n  border-color: #808080;\r\n  box-shadow: 0 0 0 1px rgba(80, 80, 80, 0.2);\r\n}\r\n\r\n.ant-input-affix-wrapper:hover .ant-input:not(.ant-input-disabled) {\r\n  border-color: #808080;\r\n}\r\n\r\n.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {\r\n  background-color: #efefef;\r\n}\r\n\r\n.ant-menu-inline .ant-menu-item:after,\r\n.ant-menu-vertical .ant-menu-item:after {\r\n  border-right: none;\r\n}\r\n\r\n.ant-menu-inline .ant-menu-item {\r\n  line-height: 40px;\r\n  height: 40px; /** Same as logo on the left with 6px padding on top / bottom */\r\n}\r\n\r\n.ant-menu-item-selected,\r\n.ant-menu-item-selected > a,\r\n.ant-menu-item-selected > a:hover {\r\n  color: #35000b;\r\n}\r\n\r\n.ant-menu-item:hover,\r\n.ant-menu-item-active,\r\n.ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open,\r\n.ant-menu-submenu-active,\r\n.ant-menu-submenu-title:hover {\r\n  color: #35000b;\r\n}\r\n\r\n.ant-progress-bg {\r\n  background-color: #b60127;\r\n}\r\n\r\n.ant-select-auto-complete.ant-select .ant-input:focus,\r\n.ant-select-auto-complete.ant-select .ant-input:hover,\r\n.ant-select-focused .ant-select-selection,\r\n.ant-select-selection:focus,\r\n.ant-select-selection:hover,\r\n.ant-select-selection:active {\r\n  border-color: #808080;\r\n  box-shadow: 0 0 0 1px rgba(80, 80, 80, 0.2);\r\n}\r\n\r\n.ant-select-dropdown-menu-item:hover,\r\n.ant-select-dropdown-menu-item-active {\r\n  background-color: #f1f1f1;\r\n}\r\n\r\n.ant-switch-checked {\r\n  background-color: #b60127;\r\n  border-color: #b60127;\r\n}\r\n\r\n.ant-table-small .ant-table-thead > tr > th {\r\n  background: #fafafa;\r\n}\r\n\r\n.ant-table-fixed-header .ant-table-scroll .ant-table-header {\r\n  background: #fafafa;\r\n  margin: 0 !important;\r\n  overflow: auto;\r\n}\r\n\r\n.ant-table-small .ant-table-tbody > tr > td {\r\n  padding: 2px 8px;\r\n}\r\n\r\n.ant-table-small .ant-table-title,\r\n.ant-table-small .ant-table-footer,\r\n.ant-table-small .ant-table-thead > tr > th:not(.ant-table-selection-column) {\r\n  padding: 4px 8px;\r\n}\r\n\r\n.ant-table-thead > tr.ant-table-row-hover > td,\r\n.ant-table-tbody > tr.ant-table-row-hover > td,\r\n.ant-table-thead > tr:hover > td,\r\n.ant-table-tbody > tr:hover > td {\r\n  background: #efefef;\r\n}\r\n")
});
return ___scope___.entry = "index.jsx";
});
FuseBox.pkg("events", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
if (FuseBox.isServer) {
    module.exports = global.require("events");
} else {
    function EventEmitter() {
        this._events = this._events || {};
        this._maxListeners = this._maxListeners || undefined;
    }
    module.exports = EventEmitter;

    // Backwards-compat with node 0.10.x
    EventEmitter.EventEmitter = EventEmitter;

    EventEmitter.prototype._events = undefined;
    EventEmitter.prototype._maxListeners = undefined;

    // By default EventEmitters will print a warning if more than 10 listeners are
    // added to it. This is a useful default which helps finding memory leaks.
    EventEmitter.defaultMaxListeners = 10;

    // Obviously not all Emitters should be limited to 10. This function allows
    // that to be increased. Set to zero for unlimited.
    EventEmitter.prototype.setMaxListeners = function(n) {
        if (!isNumber(n) || n < 0 || isNaN(n))
            throw TypeError("n must be a positive number");
        this._maxListeners = n;
        return this;
    };

    EventEmitter.prototype.emit = function(type) {
        var er, handler, len, args, i, listeners;

        if (!this._events)
            this._events = {};

        // If there is no 'error' event listener then throw.
        if (type === "error") {
            if (!this._events.error ||
                (isObject(this._events.error) && !this._events.error.length)) {
                er = arguments[1];
                if (er instanceof Error) {
                    throw er; // Unhandled 'error' event
                }
                throw TypeError("Uncaught, unspecified \"error\" event.");
            }
        }

        handler = this._events[type];

        if (isUndefined(handler))
            return false;

        if (isFunction(handler)) {
            switch (arguments.length) {
                // fast cases
                case 1:
                    handler.call(this);
                    break;
                case 2:
                    handler.call(this, arguments[1]);
                    break;
                case 3:
                    handler.call(this, arguments[1], arguments[2]);
                    break;
                    // slower
                default:
                    args = Array.prototype.slice.call(arguments, 1);
                    handler.apply(this, args);
            }
        } else if (isObject(handler)) {
            args = Array.prototype.slice.call(arguments, 1);
            listeners = handler.slice();
            len = listeners.length;
            for (i = 0; i < len; i++)
                listeners[i].apply(this, args);
        }

        return true;
    };

    EventEmitter.prototype.addListener = function(type, listener) {
        var m;

        if (!isFunction(listener))
            throw TypeError("listener must be a function");

        if (!this._events)
            this._events = {};

        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        if (this._events.newListener)
            this.emit("newListener", type,
                isFunction(listener.listener) ?
                listener.listener : listener);

        if (!this._events[type])
        // Optimize the case of one listener. Don't need the extra array object.
            this._events[type] = listener;
        else if (isObject(this._events[type]))
        // If we've already got an array, just append.
            this._events[type].push(listener);
        else
        // Adding the second element, need to change to array.
            this._events[type] = [this._events[type], listener];

        // Check for listener leak
        if (isObject(this._events[type]) && !this._events[type].warned) {
            if (!isUndefined(this._maxListeners)) {
                m = this._maxListeners;
            } else {
                m = EventEmitter.defaultMaxListeners;
            }

            if (m && m > 0 && this._events[type].length > m) {
                this._events[type].warned = true;
                console.error("(node) warning: possible EventEmitter memory " +
                    "leak detected. %d listeners added. " +
                    "Use emitter.setMaxListeners() to increase limit.",
                    this._events[type].length);
                if (typeof console.trace === "function") {
                    // not supported in IE 10
                    console.trace();
                }
            }
        }

        return this;
    };

    EventEmitter.prototype.on = EventEmitter.prototype.addListener;

    EventEmitter.prototype.once = function(type, listener) {
        if (!isFunction(listener))
            throw TypeError("listener must be a function");

        var fired = false;

        function g() {
            this.removeListener(type, g);

            if (!fired) {
                fired = true;
                listener.apply(this, arguments);
            }
        }

        g.listener = listener;
        this.on(type, g);

        return this;
    };

    // emits a 'removeListener' event iff the listener was removed
    EventEmitter.prototype.removeListener = function(type, listener) {
        var list, position, length, i;

        if (!isFunction(listener))
            throw TypeError("listener must be a function");

        if (!this._events || !this._events[type])
            return this;

        list = this._events[type];
        length = list.length;
        position = -1;

        if (list === listener ||
            (isFunction(list.listener) && list.listener === listener)) {
            delete this._events[type];
            if (this._events.removeListener)
                this.emit("removeListener", type, listener);

        } else if (isObject(list)) {
            for (i = length; i-- > 0;) {
                if (list[i] === listener ||
                    (list[i].listener && list[i].listener === listener)) {
                    position = i;
                    break;
                }
            }

            if (position < 0)
                return this;

            if (list.length === 1) {
                list.length = 0;
                delete this._events[type];
            } else {
                list.splice(position, 1);
            }

            if (this._events.removeListener)
                this.emit("removeListener", type, listener);
        }

        return this;
    };

    EventEmitter.prototype.removeAllListeners = function(type) {
        var key, listeners;

        if (!this._events)
            return this;

        // not listening for removeListener, no need to emit
        if (!this._events.removeListener) {
            if (arguments.length === 0)
                this._events = {};
            else if (this._events[type])
                delete this._events[type];
            return this;
        }

        // emit removeListener for all listeners on all events
        if (arguments.length === 0) {
            for (key in this._events) {
                if (key === "removeListener") continue;
                this.removeAllListeners(key);
            }
            this.removeAllListeners("removeListener");
            this._events = {};
            return this;
        }

        listeners = this._events[type];

        if (isFunction(listeners)) {
            this.removeListener(type, listeners);
        } else if (listeners) {
            // LIFO order
            while (listeners.length)
                this.removeListener(type, listeners[listeners.length - 1]);
        }
        delete this._events[type];

        return this;
    };

    EventEmitter.prototype.listeners = function(type) {
        var ret;
        if (!this._events || !this._events[type])
            ret = [];
        else if (isFunction(this._events[type]))
            ret = [this._events[type]];
        else
            ret = this._events[type].slice();
        return ret;
    };

    EventEmitter.prototype.listenerCount = function(type) {
        if (this._events) {
            var evlistener = this._events[type];

            if (isFunction(evlistener))
                return 1;
            else if (evlistener)
                return evlistener.length;
        }
        return 0;
    };

    EventEmitter.listenerCount = function(emitter, type) {
        return emitter.listenerCount(type);
    };

    function isFunction(arg) {
        return typeof arg === "function";
    }

    function isNumber(arg) {
        return typeof arg === "number";
    }

    function isObject(arg) {
        return typeof arg === "object" && arg !== null;
    }

    function isUndefined(arg) {
        return arg === void 0;
    }
}

});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("fuse-box-css", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

/**
 * Listens to 'async' requets and if the name is a css file
 * wires it to `__fsbx_css`
 */

var runningInBrowser = FuseBox.isBrowser || FuseBox.target === "electron";

var cssHandler = function(__filename, contents) {
    if (runningInBrowser) {
        var styleId = __filename.replace(/[\.\/]+/g, '-');
        if (styleId.charAt(0) === '-') styleId = styleId.substring(1);
        var exists = document.getElementById(styleId);
        if (!exists) {
            //<link href="//fonts.googleapis.com/css?family=Covered+By+Your+Grace" rel="stylesheet" type="text/css">
            var s = document.createElement(contents ? 'style' : 'link');
            s.id = styleId;
            s.type = 'text/css';
            if (contents) {
                s.innerHTML = contents;
            } else {
                s.rel = 'stylesheet';
                s.href = __filename;
            }
            document.getElementsByTagName('head')[0].appendChild(s);
        } else {
            if (contents) {
                exists.innerHTML = contents;
            }
        }
    }
}
if (typeof FuseBox !== "undefined" && runningInBrowser) {
    FuseBox.on('async', function(name) {
        if (/\.css$/.test(name)) {
            cssHandler(name);
            return false;
        }
    });
}

module.exports = cssHandler;
});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("fusebox-hot-reload", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

"use strict";
/**
 * @module listens to `source-changed` socket events and actions hot reload
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Client = require('fusebox-websocket').SocketClient, bundleErrors = {}, outputElement = document.createElement('div'), styleElement = document.createElement('style'), minimizeToggleId = 'fuse-box-toggle-minimized', hideButtonId = 'fuse-box-hide', expandedOutputClass = 'fuse-box-expanded-output', localStoragePrefix = '__fuse-box_';
function storeSetting(key, value) {
    localStorage[localStoragePrefix + key] = value;
}
function getSetting(key) {
    return localStorage[localStoragePrefix + key] === 'true' ? true : false;
}
var outputInBody = false, outputMinimized = getSetting(minimizeToggleId), outputHidden = false;
outputElement.id = 'fuse-box-output';
styleElement.innerHTML = "\n    #" + outputElement.id + ", #" + outputElement.id + " * {\n        box-sizing: border-box;\n    }\n    #" + outputElement.id + " {\n        z-index: 999999999999;\n        position: fixed;\n        top: 10px;\n        right: 10px;\n        width: 400px;\n        overflow: auto;\n        background: #fdf3f1;\n        border: 1px solid #eca494;\n        border-radius: 5px;\n        font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n        box-shadow: 0px 3px 6px 1px rgba(0,0,0,.15);\n    }\n    #" + outputElement.id + "." + expandedOutputClass + " {\n        height: auto;\n        width: auto;\n        left: 10px;\n        max-height: calc(100vh - 50px);\n    }\n    #" + outputElement.id + " .fuse-box-errors {\n        display: none;\n    }\n    #" + outputElement.id + "." + expandedOutputClass + " .fuse-box-errors {\n        display: block;\n        border-top: 1px solid #eca494;\n        padding: 0 10px;\n    }\n    #" + outputElement.id + " button {\n        border: 1px solid #eca494;\n        padding: 5px 10px;\n        border-radius: 4px;\n        margin-left: 5px;\n        background-color: white;\n        color: black;\n        box-shadow: 0px 2px 2px 0px rgba(0,0,0,.05);\n    }\n    #" + outputElement.id + " .fuse-box-header {\n        padding: 10px;\n    }\n    #" + outputElement.id + " .fuse-box-header h4 {\n        display: inline-block;\n        margin: 4px;\n    }";
styleElement.type = 'text/css';
document.getElementsByTagName('head')[0].appendChild(styleElement);
function displayBundleErrors() {
    var errorMessages = Object.keys(bundleErrors).reduce(function (allMessages, bundleName) {
        var bundleMessages = bundleErrors[bundleName];
        return allMessages.concat(bundleMessages.map(function (message) {
            var messageOutput = message
                .replace(/\n/g, '<br>')
                .replace(/\t/g, '&nbsp;&nbps;&npbs;&nbps;')
                .replace(/ /g, '&nbsp;');
            return "<pre>" + messageOutput + "</pre>";
        }));
    }, []), errorOutput = errorMessages.join('');
    if (errorOutput && !outputHidden) {
        outputElement.innerHTML = "\n        <div class=\"fuse-box-header\" style=\"\">\n            <h4 style=\"\">Fuse Box Bundle Errors (" + errorMessages.length + "):</h4>\n            <div style=\"float: right;\">\n                <button id=\"" + minimizeToggleId + "\">" + (outputMinimized ? 'Expand' : 'Minimize') + "</button>\n                <button id=\"" + hideButtonId + "\">Hide</button>\n            </div>\n        </div>\n        <div class=\"fuse-box-errors\">\n            " + errorOutput + "\n        </div>\n        ";
        document.body.appendChild(outputElement);
        outputElement.className = outputMinimized ? '' : expandedOutputClass;
        outputInBody = true;
        document.getElementById(minimizeToggleId).onclick = function () {
            outputMinimized = !outputMinimized;
            storeSetting(minimizeToggleId, outputMinimized);
            displayBundleErrors();
        };
        document.getElementById(hideButtonId).onclick = function () {
            outputHidden = true;
            displayBundleErrors();
        };
    }
    else if (outputInBody) {
        document.body.removeChild(outputElement);
        outputInBody = false;
    }
}
exports.connect = function (port, uri, reloadFullPage) {
    if (FuseBox.isServer) {
        return;
    }
    port = port || window.location.port;
    var client = new Client({
        port: port,
        uri: uri,
    });
    client.connect();
    client.on('page-reload', function (data) {
        return window.location.reload();
    });
    client.on('page-hmr', function (data) {
        FuseBox.flush();
        FuseBox.dynamic(data.path, data.content);
        if (FuseBox.mainFile) {
            try {
                FuseBox.import(FuseBox.mainFile);
            }
            catch (e) {
                if (typeof e === 'string') {
                    if (/not found/.test(e)) {
                        return window.location.reload();
                    }
                }
                console.error(e);
            }
        }
    });
    client.on('source-changed', function (data) {
        console.info("%cupdate \"" + data.path + "\"", 'color: #237abe');
        if (reloadFullPage) {
            return window.location.reload();
        }
        /**
         * If a plugin handles this request then we don't have to do anything
         **/
        for (var index = 0; index < FuseBox.plugins.length; index++) {
            var plugin = FuseBox.plugins[index];
            if (plugin.hmrUpdate && plugin.hmrUpdate(data)) {
                return;
            }
        }
        if (data.type === "hosted-css") {
            var fileId = data.path.replace(/^\//, '').replace(/[\.\/]+/g, '-');
            var existing = document.getElementById(fileId);
            if (existing) {
                existing.setAttribute("href", data.path + "?" + new Date().getTime());
            }
            else {
                var node = document.createElement('link');
                node.id = fileId;
                node.type = 'text/css';
                node.rel = 'stylesheet';
                node.href = data.path;
                document.getElementsByTagName('head')[0].appendChild(node);
            }
        }
        if (data.type === 'js' || data.type === "css") {
            FuseBox.flush();
            FuseBox.dynamic(data.path, data.content);
            if (FuseBox.mainFile) {
                try {
                    FuseBox.import(FuseBox.mainFile);
                }
                catch (e) {
                    if (typeof e === 'string') {
                        if (/not found/.test(e)) {
                            return window.location.reload();
                        }
                    }
                    console.error(e);
                }
            }
        }
    });
    client.on('error', function (error) {
        console.log(error);
    });
    client.on('bundle-error', function (_a) {
        var bundleName = _a.bundleName, message = _a.message;
        console.error("Bundle error in " + bundleName + ": " + message);
        var errorsForBundle = bundleErrors[bundleName] || [];
        errorsForBundle.push(message);
        bundleErrors[bundleName] = errorsForBundle;
        displayBundleErrors();
    });
    client.on('update-bundle-errors', function (_a) {
        var bundleName = _a.bundleName, messages = _a.messages;
        messages.forEach(function (message) { return console.error("Bundle error in " + bundleName + ": " + message); });
        bundleErrors[bundleName] = messages;
        displayBundleErrors();
    });
};

});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("fusebox-websocket", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events = require('events');
var SocketClient = /** @class */ (function () {
    function SocketClient(opts) {
        opts = opts || {};
        var port = opts.port || window.location.port;
        var protocol = location.protocol === 'https:' ? 'wss://' : 'ws://';
        var domain = location.hostname || 'localhost';
        this.url = opts.host || "" + protocol + domain + ":" + port;
        if (opts.uri) {
            this.url = opts.uri;
        }
        this.authSent = false;
        this.emitter = new events.EventEmitter();
    }
    SocketClient.prototype.reconnect = function (fn) {
        var _this = this;
        setTimeout(function () {
            _this.emitter.emit('reconnect', { message: 'Trying to reconnect' });
            _this.connect(fn);
        }, 5000);
    };
    SocketClient.prototype.on = function (event, fn) {
        this.emitter.on(event, fn);
    };
    SocketClient.prototype.connect = function (fn) {
        var _this = this;
        console.log('%cConnecting to fusebox HMR at ' + this.url, 'color: #237abe');
        setTimeout(function () {
            _this.client = new WebSocket(_this.url);
            _this.bindEvents(fn);
        }, 0);
    };
    SocketClient.prototype.close = function () {
        this.client.close();
    };
    SocketClient.prototype.send = function (eventName, data) {
        if (this.client.readyState === 1) {
            this.client.send(JSON.stringify({ event: eventName, data: data || {} }));
        }
    };
    SocketClient.prototype.error = function (data) {
        this.emitter.emit('error', data);
    };
    /** Wires up the socket client messages to be emitted on our event emitter */
    SocketClient.prototype.bindEvents = function (fn) {
        var _this = this;
        this.client.onopen = function (event) {
            console.log('%cConnected', 'color: #237abe');
            if (fn) {
                fn(_this);
            }
        };
        this.client.onerror = function (event) {
            _this.error({ reason: event.reason, message: 'Socket error' });
        };
        this.client.onclose = function (event) {
            _this.emitter.emit('close', { message: 'Socket closed' });
            if (event.code !== 1011) {
                _this.reconnect(fn);
            }
        };
        this.client.onmessage = function (event) {
            var data = event.data;
            if (data) {
                var item = JSON.parse(data);
                _this.emitter.emit(item.type, item.data);
                _this.emitter.emit('*', item);
            }
        };
    };
    return SocketClient;
}());
exports.SocketClient = SocketClient;

});
return ___scope___.entry = "index.js";
});
FuseBox.import("fusebox-hot-reload").connect(9696, "", false)

FuseBox.import("default/index.jsx");
FuseBox.main("default/index.jsx");
})
(function(e){function r(e){var r=e.charCodeAt(0),n=e.charCodeAt(1);if((m||58!==n)&&(r>=97&&r<=122||64===r)){if(64===r){var t=e.split("/"),i=t.splice(2,t.length).join("/");return[t[0]+"/"+t[1],i||void 0]}var o=e.indexOf("/");if(o===-1)return[e];var a=e.substring(0,o),u=e.substring(o+1);return[a,u]}}function n(e){return e.substring(0,e.lastIndexOf("/"))||"./"}function t(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];for(var n=[],t=0,i=arguments.length;t<i;t++)n=n.concat(arguments[t].split("/"));for(var o=[],t=0,i=n.length;t<i;t++){var a=n[t];a&&"."!==a&&(".."===a?o.pop():o.push(a))}return""===n[0]&&o.unshift(""),o.join("/")||(o.length?"/":".")}function i(e){var r=e.match(/\.(\w{1,})$/);return r&&r[1]?e:e+".js"}function o(e){if(m){var r,n=document,t=n.getElementsByTagName("head")[0];/\.css$/.test(e)?(r=n.createElement("link"),r.rel="stylesheet",r.type="text/css",r.href=e):(r=n.createElement("script"),r.type="text/javascript",r.src=e,r.async=!0),t.insertBefore(r,t.firstChild)}}function a(e,r){for(var n in e)e.hasOwnProperty(n)&&r(n,e[n])}function u(e){return{server:require(e)}}function f(e,n){var o=n.path||"./",a=n.pkg||"default",f=r(e);if(f&&(o="./",a=f[0],n.v&&n.v[a]&&(a=a+"@"+n.v[a]),e=f[1]),e)if(126===e.charCodeAt(0))e=e.slice(2,e.length),o="./";else if(!m&&(47===e.charCodeAt(0)||58===e.charCodeAt(1)))return u(e);var s=x[a];if(!s){if(m&&"electron"!==y.target)throw"Package not found "+a;return u(a+(e?"/"+e:""))}e=e?e:"./"+s.s.entry;var l,d=t(o,e),c=i(d),p=s.f[c];return!p&&c.indexOf("*")>-1&&(l=c),p||l||(c=t(d,"/","index.js"),p=s.f[c],p||"."!==d||(c=s.s&&s.s.entry||"index.js",p=s.f[c]),p||(c=d+".js",p=s.f[c]),p||(p=s.f[d+".jsx"]),p||(c=d+"/index.jsx",p=s.f[c])),{file:p,wildcard:l,pkgName:a,versions:s.v,filePath:d,validPath:c}}function s(e,r,n){if(void 0===n&&(n={}),!m)return r(/\.(js|json)$/.test(e)?g.require(e):"");if(n&&n.ajaxed===e)return console.error(e,"does not provide a module");var i=new XMLHttpRequest;i.onreadystatechange=function(){if(4==i.readyState)if(200==i.status){var n=i.getResponseHeader("Content-Type"),o=i.responseText;/json/.test(n)?o="module.exports = "+o:/javascript/.test(n)||(o="module.exports = "+JSON.stringify(o));var a=t("./",e);y.dynamic(a,o),r(y.import(e,{ajaxed:e}))}else console.error(e,"not found on request"),r(void 0)},i.open("GET",e,!0),i.send()}function l(e,r){var n=_[e];if(n)for(var t in n){var i=n[t].apply(null,r);if(i===!1)return!1}}function d(e){return null!==e&&["function","object","array"].indexOf(typeof e)>-1&&void 0===e.default?Object.isFrozen(e)?e.default=e:Object.defineProperty(e,"default",{value:e,writable:!0,enumerable:!1}):void 0}function c(e,r){if(void 0===r&&(r={}),58===e.charCodeAt(4)||58===e.charCodeAt(5))return o(e);var t=f(e,r);if(t.server)return t.server;var i=t.file;if(t.wildcard){var a=new RegExp(t.wildcard.replace(/\*/g,"@").replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&").replace(/@@/g,".*").replace(/@/g,"[a-z0-9$_-]+"),"i"),u=x[t.pkgName];if(u){var p={};for(var v in u.f)a.test(v)&&(p[v]=c(t.pkgName+"/"+v));return p}}if(!i){var h="function"==typeof r,_=l("async",[e,r]);if(_===!1)return;return s(e,function(e){return h?r(e):null},r)}var w=t.pkgName;if(i.locals&&i.locals.module)return i.locals.module.exports;var b=i.locals={},j=n(t.validPath);b.exports={},b.module={exports:b.exports},b.require=function(e,r){var n=c(e,{pkg:w,path:j,v:t.versions});return y.sdep&&d(n),n},m||!g.require.main?b.require.main={filename:"./",paths:[]}:b.require.main=g.require.main;var k=[b.module.exports,b.require,b.module,t.validPath,j,w];return l("before-import",k),i.fn.apply(k[0],k),l("after-import",k),b.module.exports}if(e.FuseBox)return e.FuseBox;var p="undefined"!=typeof ServiceWorkerGlobalScope,v="undefined"!=typeof WorkerGlobalScope,m="undefined"!=typeof window&&"undefined"!=typeof window.navigator||v||p,g=m?v||p?{}:window:global;m&&(g.global=v||p?{}:window),e=m&&"undefined"==typeof __fbx__dnm__?e:module.exports;var h=m?v||p?{}:window.__fsbx__=window.__fsbx__||{}:g.$fsbx=g.$fsbx||{};m||(g.require=require);var x=h.p=h.p||{},_=h.e=h.e||{},y=function(){function r(){}return r.global=function(e,r){return void 0===r?g[e]:void(g[e]=r)},r.import=function(e,r){return c(e,r)},r.on=function(e,r){_[e]=_[e]||[],_[e].push(r)},r.exists=function(e){try{var r=f(e,{});return void 0!==r.file}catch(e){return!1}},r.remove=function(e){var r=f(e,{}),n=x[r.pkgName];n&&n.f[r.validPath]&&delete n.f[r.validPath]},r.main=function(e){return this.mainFile=e,r.import(e,{})},r.expose=function(r){var n=function(n){var t=r[n].alias,i=c(r[n].pkg);"*"===t?a(i,function(r,n){return e[r]=n}):"object"==typeof t?a(t,function(r,n){return e[n]=i[r]}):e[t]=i};for(var t in r)n(t)},r.dynamic=function(r,n,t){this.pkg(t&&t.pkg||"default",{},function(t){t.file(r,function(r,t,i,o,a){var u=new Function("__fbx__dnm__","exports","require","module","__filename","__dirname","__root__",n);u(!0,r,t,i,o,a,e)})})},r.flush=function(e){var r=x.default;for(var n in r.f)e&&!e(n)||delete r.f[n].locals},r.pkg=function(e,r,n){if(x[e])return n(x[e].s);var t=x[e]={};return t.f={},t.v=r,t.s={file:function(e,r){return t.f[e]={fn:r}}},n(t.s)},r.addPlugin=function(e){this.plugins.push(e)},r.packages=x,r.isBrowser=m,r.isServer=!m,r.plugins=[],r}();return m||(g.FuseBox=y),e.FuseBox=y}(this))