(function(FuseBox){FuseBox.$fuse$=FuseBox;
FuseBox.target = "electron";
Object.assign(global.process.env, {"NODE_ENV":"development"})
FuseBox.pkg("default", {}, function(___scope___){
___scope___.file("index.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./css.config");
const ReactDOM = require("react-dom");
const React = require("react");
const App_1 = require("./App");
require("./assets/scss/main.scss");
ReactDOM.render(React.createElement(App_1.CogliteAppRoot, null), document.getElementById("coglite-app-root"));

});
___scope___.file("css.config.js", function(exports, require, module, __filename, __dirname){

let Module = require('module');
let _require = Module.prototype.require;
Module.prototype.require = function () {
    let name = arguments[0];
    if (/\.css$/.test(name)) {
        // no-op
        return;
    }
    return _require.apply(this, arguments);
};

});
___scope___.file("App.jsx", function(exports, require, module, __filename, __dirname){

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
const theming_1 = require("theming");
const styled_components_1 = require("styled-components");
const AppLayout_1 = require("./layout/AppLayout");
const AppRoutes_1 = require("./AppRoutes");
const stores_1 = require("./stores");
const react_router_dom_1 = require("react-router-dom");
const colors_1 = require("@material-ui/core/colors");
const UiStore_1 = require("./stores/UiStore");
const theme_1 = require("./theme");
var themeConfig = { palette: { primary: colors_1.deepPurple } };
var theme = core_1.createMuiTheme(themeConfig);
exports.stores = {
    navigation: new stores_1.NavigationStore(),
    uiStore: new UiStore_1.UiStore()
};
let CogliteAppRoot = class CogliteAppRoot extends React.Component {
    render() {
        const { navigation } = this.props;
        return (React.createElement(theming_1.ThemeProvider, { theme: theme },
            React.createElement(styled_components_1.ThemeProvider, { theme: theme_1.styledTheme },
                React.createElement(mobx_react_1.Provider, Object.assign({}, exports.stores),
                    React.createElement(react_router_dom_1.Router, { history: exports.stores.navigation.history },
                        React.createElement("div", { style: { height: '100vh', width: '100vw' } },
                            React.createElement(AppLayout_1.AppLayout, null,
                                React.createElement(AppRoutes_1.AppRoutes, null))))))));
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

});
___scope___.file("layout/AppLayout.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const styled_jss_1 = require("styled-jss");
const design_1 = require("../design");
const Footer_1 = require("./Footer");
const WidgetToolbar_1 = require("./WidgetToolbar");
const IconNavigation_1 = require("./IconNavigation");
const Workspace_1 = require("./Workspace");
const MainWorkSpace = styled_jss_1.default('div')({
    display: "flex",
    height: "100%",
    width: "100%",
});
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
        const { navigation } = this.props;
        const { children } = this.props;
        return (React.createElement(react_router_dom_1.Router, { history: navigation.history },
            React.createElement(design_1.FillFlex, null,
                React.createElement(design_1.Row, null,
                    React.createElement(design_1.VerticalStretch, null,
                        React.createElement(WidgetToolbar_1.WidgetToolbar, null),
                        React.createElement(design_1.Row, null,
                            React.createElement(IconNavigation_1.IconNavBar, null),
                            React.createElement(design_1.Row, null,
                                React.createElement(Workspace_1.MiddlePanel, null, this.hasError ? (React.createElement(ErrorDisplay, null)) : (children)))),
                        React.createElement(Footer_1.Footer, null))))));
    }
};
__decorate([
    mobx_1.observable
], AppLayout.prototype, "hasError", void 0);
__decorate([
    mobx_1.action
], AppLayout.prototype, "displayError", void 0);
AppLayout = __decorate([
    mobx_react_1.inject('navigation'),
    mobx_react_1.observer
], AppLayout);
exports.AppLayout = AppLayout;
const ErrorDisplay = props => React.createElement("div", { style: { textAlign: 'center', paddingTop: 25, paddingBottom: 25 } },
    React.createElement("h1", null, "An unknown error occurred"));

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

});
___scope___.file("layout/Footer.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const styled_jss_1 = require("styled-jss");
const core_1 = require("@material-ui/core");
const version = '0.0.1';
const copyrightString = '© Copyright Coglite 2018';
const FooterDimensions = styled_jss_1.default(core_1.AppBar)({
    border: "1px solid orange",
    display: "flex",
    flexDirection: 'row',
    width: "100%",
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0
});
const polished_1 = require("polished");
exports.default = (theme) => {
    return {
        root: {
            display: 'block',
            position: 'relative',
            backgroundColor: polished_1.rgba(theme.background.primary.level0, theme.alpha),
            '&$exiting, &$exited': {
                backgroundColor: 'transparent',
                '& $separator': {
                    width: 0,
                },
            },
        },
        separator: {
            position: 'absolute',
            top: 'auto',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'block',
            width: '100%',
            borderStyle: 'solid',
            borderColor: theme.color.primary.dark,
            borderWidth: '0 0 1px',
            transition: `all ${theme.animTime}ms ease-in`,
        },
        children: {
            display: 'block',
        },
        entering: {},
        entered: {},
        exiting: {},
        exited: {},
    };
};
exports.Footer = mobx_react_1.observer((P) => (React.createElement(FooterDimensions, null,
    React.createElement("span", null, copyrightString),
    React.createElement("div", { style: { flex: 'auto' } }),
    React.createElement("span", null, `Version: ${version || 'pre-release'}`))));

});
___scope___.file("layout/WidgetToolbar.jsx", function(exports, require, module, __filename, __dirname){

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
const mobx_react_1 = require("mobx-react");
const styled_jss_1 = require("styled-jss");
const design_1 = require("../design");
const ToolbarDimensions = styled_jss_1.default(core_1.AppBar)({
    display: "flex",
    position: 'relative',
    height: 50,
    width: "100%",
    overflow: "hidden"
});
let WidgetToolbar = class WidgetToolbar extends React.Component {
    render() {
        return (React.createElement(ToolbarDimensions, null,
            React.createElement(design_1.Row, null,
                React.createElement(WidgetIcons, null))));
    }
};
WidgetToolbar = __decorate([
    mobx_react_1.observer
], WidgetToolbar);
exports.WidgetToolbar = WidgetToolbar;
const icons_1 = require("@material-ui/icons");
const NavIcon_1 = require("./NavIcon");
const RowContainer = styled_jss_1.default('div')({
    height: '100%',
    flex: '1',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignmentBaseline: 'central'
});
let WidgetIcons = class WidgetIcons extends React.Component {
    render() {
        const nav = this.props;
        return (React.createElement(RowContainer, Object.assign({}, this.props),
            React.createElement(NavIcon_1.NavListIcon, { route: "/", icon: React.createElement(icons_1.Dashboard, null) }),
            React.createElement(NavIcon_1.NavListIcon, { route: "/pages/notebook", icon: React.createElement(icons_1.SwapHoriz, null) }),
            React.createElement(NavIcon_1.NavListIcon, { route: "/pages/charts", icon: React.createElement(icons_1.SwapHoriz, null) }),
            React.createElement(NavIcon_1.NavListIcon, { route: "/pages/datasets", icon: React.createElement(icons_1.AccountBalanceWallet, null) }),
            React.createElement(NavIcon_1.NavListIcon, { route: "/pages/workflowgraph", icon: React.createElement(icons_1.SwapHoriz, null) }),
            React.createElement(NavIcon_1.NavListIcon, { route: "/pages/cloud", icon: React.createElement(icons_1.Cloud, null) }),
            React.createElement(NavIcon_1.NavListIcon, { route: "/pages/settings", icon: React.createElement(icons_1.Settings, null) }),
            React.createElement(NavIcon_1.NavListIcon, { route: "/pages/about", icon: React.createElement(icons_1.HelpOutline, null) })));
    }
};
WidgetIcons = __decorate([
    mobx_react_1.inject('navigation'),
    mobx_react_1.observer
], WidgetIcons);
exports.WidgetIcons = WidgetIcons;

});
___scope___.file("layout/NavIcon.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
function NavListIcon({ icon, label, route }) {
    return (React.createElement(core_1.MenuItem, { button: true, component: props => React.createElement(react_router_dom_1.NavLink, Object.assign({}, props, { exact: true, to: route })) },
        React.createElement(core_1.ListItemIcon, null, icon),
        React.createElement(core_1.ListItemText, { primary: label })));
}
exports.NavListIcon = NavListIcon;

});
___scope___.file("layout/IconNavigation.jsx", function(exports, require, module, __filename, __dirname){

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
const styled_jss_1 = require("styled-jss");
const icons_1 = require("@material-ui/icons");
const NavIcon_1 = require("./NavIcon");
const core_1 = require("@material-ui/core");
const VertFlexContainer = styled_jss_1.default(core_1.Card)({
    maxWidth: '64px',
    minHeight: '100%',
    flex: '1 1 auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignmentBaseline: 'central',
    marginBottom: '5px'
});
let IconNavBar = class IconNavBar extends React.Component {
    render() {
        const nav = this.props;
        return (React.createElement(VertFlexContainer, Object.assign({}, this.props),
            React.createElement(NavIcon_1.NavListIcon, { route: "/", icon: React.createElement(icons_1.Dashboard, null) }),
            React.createElement(NavIcon_1.NavListIcon, { route: "/pages/notebook", icon: React.createElement(icons_1.SwapHoriz, null) }),
            React.createElement(NavIcon_1.NavListIcon, { route: "/pages/charts", icon: React.createElement(icons_1.SwapHoriz, null) }),
            React.createElement(NavIcon_1.NavListIcon, { route: "/pages/datasets", icon: React.createElement(icons_1.AccountBalanceWallet, null) }),
            React.createElement(NavIcon_1.NavListIcon, { route: "/pages/workflowgraph", icon: React.createElement(icons_1.SwapHoriz, null) }),
            React.createElement(NavIcon_1.NavListIcon, { route: "/pages/cloud", icon: React.createElement(icons_1.Cloud, null) }),
            React.createElement(NavIcon_1.NavListIcon, { route: "/pages/settings", icon: React.createElement(icons_1.Settings, null) }),
            React.createElement(NavIcon_1.NavListIcon, { route: "/pages/about", icon: React.createElement(icons_1.HelpOutline, null) })));
    }
};
IconNavBar = __decorate([
    mobx_react_1.inject('navigation'),
    mobx_react_1.observer
], IconNavBar);
exports.IconNavBar = IconNavBar;
/*
const VertFlexContainer = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
  justify-content: flex-start;
`;
*/
/*
 export const IconNavigation  = observer(({fill, vertical, large, size, props}: BlueprintNavIconProps) => (
            <StyledButtonGroup large={true} fill={true} vertical={true}>
                <BlueprintNavIcon icon={IconNames.DASHBOARD} size={35} large={true} route="/"/>
                <BlueprintNavIcon icon={IconNames.CODE} size={35} large={true} route="/pages/notebook"/>
                <BlueprintNavIcon icon={IconNames.CHART} size={35} large={true} route="/pages/charts"/>
                <BlueprintNavIcon icon={IconNames.DATABASE} size={35} large={true}  route="/pages/datasets"/>
                <BlueprintNavIcon icon={IconNames.GRAPH} size={35} large={true}  route="/pages/dashboard" />
                <BlueprintNavIcon icon={IconNames.CLOUD} size={35} large={true}  route="/pages/cloud"/>
                <BlueprintNavIcon icon={IconNames.COG} size={35} large={true}  route="/pages/settings"/>
                <BlueprintNavIcon icon={IconNames.HELP} size={35} large={true}  route="/pages/about"/>
            </StyledButtonGroup >
  ))
  */
//import styled from 'styled-components'
/*
const Container = styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  padding: 0px !important;
  list-style: none;
  background-color: ${props => props.theme.main} !important;
  color: ${props => props.theme.text} !important;
  width: 50px !important;
  border-color: white;
  border: 10px;
`;

const VertFlexContainer = styled(ButtonGroup)`
  display: flex;
  flex: auto;
  flex-direction: column;
  justify-content: flex-start;
`;

export const MenuIcon = styled(Button)`
  background: ${props => props.theme.main} !important;
  color: ${props => props.theme.text} !important;
`;

export const MenuIconDivider = styled(MenuDivider)`
  width: 50px !important;
`;

const LeftNavSC = styled.div`
    width: 64px;
    flex-direction: column;
    align-items: central;
    border: 3px solid black;
`
*/ 

});
___scope___.file("layout/Workspace.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const React = require("react");
const styled_jss_1 = require("styled-jss");
const design_1 = require("../design");
const Container = styled_jss_1.default(core_1.Card)({
    position: 'relative',
    display: "flex",
    flex: '1 1 auto',
    width: "100%",
    margin: '5px'
});
exports.MiddlePanel = props => React.createElement(Container, null,
    React.createElement(design_1.FillFlex, null, props.children));

});
___scope___.file("AppRoutes.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const mobx_react_1 = require("mobx-react");
const View_1 = require("./pages/notebook/View");
const pages_1 = require("./pages");
let AppRoutes = class AppRoutes extends React.Component {
    render() {
        const { navigation } = this.props;
        return (React.createElement(react_router_dom_1.Router, { history: navigation.history },
            React.createElement(react_router_dom_1.Switch, null,
                React.createElement(react_router_dom_1.Route, { path: '/pages/dashboard', component: pages_1.DashboardPage }),
                React.createElement(react_router_dom_1.Route, { path: '/pages/notebook', component: pages_1.NotebookPage }),
                React.createElement(react_router_dom_1.Route, { path: '/pages/datasets', component: pages_1.DatasetsPage }),
                React.createElement(react_router_dom_1.Route, { path: '/pages/charts', component: pages_1.ChartsPage }),
                React.createElement(react_router_dom_1.Route, { path: '/pages/cloud', component: pages_1.CloudPage }),
                React.createElement(react_router_dom_1.Route, { path: '/pages/settings', component: pages_1.SettingsPage }),
                React.createElement(react_router_dom_1.Route, { path: '/pages/workflowgraph', component: View_1.NotebookView }),
                React.createElement(react_router_dom_1.Route, { path: '/pages/about', component: pages_1.AboutPage }),
                React.createElement(react_router_dom_1.Route, { path: '*', component: pages_1.DashboardPage }))));
    }
};
AppRoutes = __decorate([
    mobx_react_1.inject('navigation'),
    mobx_react_1.observer
], AppRoutes);
exports.AppRoutes = AppRoutes;
//export let AppRoutes = withRouter(_AppRoutes)

});
___scope___.file("pages/notebook/View.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const NotebookFrame_1 = require("./NotebookFrame");
const routes_1 = require("./routes");
const mobx_react_1 = require("mobx-react");
exports.NotebookView = mobx_react_1.observer(props => {
    return (React.createElement(React.Fragment, null,
        React.createElement(NotebookFrame_1.default, null,
            React.createElement(routes_1.CogliteNotebookRoutes, null))));
});

});
___scope___.file("pages/notebook/NotebookFrame.jsx", function(exports, require, module, __filename, __dirname){
/* fuse:injection: */ var process = require("process");
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Grid_1 = require("@material-ui/core/Grid");
const classNames = require("classnames");
const layout_styles_1 = require("./layout.styles");
const mobx_react_1 = require("mobx-react");
const react_jss_1 = require("react-jss");
const mobx_1 = require("mobx");
const NodeDrawer_1 = require("./Drawers/NodeDrawer");
const NotebookAppBar_1 = require("./NotebookAppBar");
const Input_1 = require("./Nodes/Input");
const Output_1 = require("./Nodes/Output");
let AppFrame = class AppFrame extends React.Component {
    constructor() {
        super(...arguments);
        this.setTarget = event => {
            this.currentClickTarget = event.target;
        };
        this.handleThemeDialogClose = (selectedOption, action) => {
            const uiStore = this.props.uiStore;
            if (action === "ok") {
                uiStore.updateTheme(selectedOption);
            }
            uiStore.themeDialogToggle.openDrawer(false);
        };
    }
    renderDevTool() {
        if (process.env.NODE_ENV !== "production") {
            const DevTools = require("mobx-react-devtools").default;
            return React.createElement(DevTools, null);
        }
        return null;
    }
    render() {
        const { classes } = this.props;
        const { nodeDrawerToggle, nodeFormDrawerToggle, themeDialogToggle } = this.props.uiStore;
        const nodeDrawer = (React.createElement(NodeDrawer_1.NodeDrawer, null,
            React.createElement(Input_1.InputNode, null),
            React.createElement(Output_1.OutputNode, null)));
        return (React.createElement(Grid_1.default, { container: true, className: classes.root },
            React.createElement("div", { className: classes.root },
                React.createElement("div", { className: classes.appFrame },
                    React.createElement(NotebookAppBar_1.NotebookAppBar, null),
                    React.createElement("main", { className: classNames(classes.content, {
                            [classes.contentRightShift]: nodeDrawerToggle.open || nodeFormDrawerToggle.open,
                        }) }, this.props.children),
                    nodeDrawer))));
    }
};
__decorate([
    mobx_1.observable
], AppFrame.prototype, "currentClickTarget", void 0);
__decorate([
    mobx_1.action
], AppFrame.prototype, "setTarget", void 0);
AppFrame = __decorate([
    mobx_react_1.inject("uiStore"),
    mobx_react_1.observer
], AppFrame);
exports.AppFrame = AppFrame;
exports.default = react_jss_1.default(layout_styles_1.layoutStyles)(AppFrame);

});
___scope___.file("pages/notebook/layout.styles.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appMenuDrawerWidth = 240;
const nodeDrawerWidth = 180;
const nodeFormDrawerWidth = 150;
exports.layoutStyles = theme => ({
    root: {
        width: "100%",
        zIndex: 1,
        overflow: "hidden",
    },
    appFrame: {
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
    },
    appBar: {
        position: "absolute",
        /* zIndex: theme.zIndex.drawer + 1, */
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarLeftShift: {
        marginLeft: appMenuDrawerWidth,
        width: `calc(100% - ${appMenuDrawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    appBarRightShift: {
        width: (props) => {
            let shiftWidth = 0;
            if (props.isMenuDrawerOpen)
                shiftWidth += appMenuDrawerWidth;
            if (props.isNodeDrawerOpen)
                shiftWidth += nodeDrawerWidth;
            if (props.isNodeFormDrawerOpen)
                shiftWidth += nodeFormDrawerWidth;
            return `calc(100% - ${shiftWidth}px)`;
        },
        marginRight: (props) => {
            let shiftWidth = 0;
            if (props.isNodeDrawerOpen)
                shiftWidth += nodeDrawerWidth;
            if (props.isNodeFormDrawerOpen)
                shiftWidth += nodeFormDrawerWidth;
            return shiftWidth;
        },
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 60,
        marginRight: 36,
    },
    hide: {
        display: "none",
    },
    drawerPaper: {
        position: "relative",
        height: "100%",
        width: appMenuDrawerWidth,
        overflow: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        width: 60,
        overflow: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    // Make the items inside not wrap when transitioning:
    drawerInner: { width: appMenuDrawerWidth },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 8px",
        boxShadow: theme.shadows["4"],
        ...theme.mixins.toolbar,
    },
    flex: {
        flex: 1,
    },
    headerLogo: {
        position: "relative",
        padding: 0,
        width: "120px",
        height: "40px",
    },
    nodeDrawerPaper: {
        position: "relative",
        width: nodeDrawerWidth,
    },
    nodeDrawerPaperAnchorRight: {
        left: "auto",
        right: 0,
    },
    nodeDrawerHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar,
    },
    nodeFormDrawerPaper: {
        position: "relative",
        width: nodeFormDrawerWidth,
    },
    nodeFormDrawerPaperAnchorRight: {
        left: "auto",
        right: props => {
            if (!props.isNodeDrawerOpen && props.isNodeFormDrawerOpen) {
                return -nodeDrawerWidth;
            }
            else {
                return 0;
            }
        },
    },
    nodeFormDrawerHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar,
    },
    content: {
        width: "100%",
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 2,
        height: "calc(100% - 56px)",
        marginTop: 56,
        [theme.breakpoints.up("sm")]: {
            height: "calc(100% - 64px)",
            marginTop: 64,
        },
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -(nodeDrawerWidth + nodeFormDrawerWidth),
    },
    contentRightShift: {
        transition: theme.transitions.create("marginRight", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: (props) => {
            let currentMargin;
            if (props.isNodeDrawerOpen && props.isNodeFormDrawerOpen)
                currentMargin = 0;
            else if (props.isNodeDrawerOpen)
                currentMargin = -nodeFormDrawerWidth;
            else if (props.isNodeFormDrawerOpen)
                currentMargin = -nodeDrawerWidth;
            return currentMargin;
        },
    },
    dialog: {
        width: "80%",
        maxHeight: 435,
    },
});

});
___scope___.file("pages/notebook/Drawers/NodeDrawer.jsx", function(exports, require, module, __filename, __dirname){

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
const ArrowForward_1 = require("@material-ui/icons/ArrowForward");
const mobx_react_1 = require("mobx-react");
const layout_styles_1 = require("../layout.styles");
const react_jss_1 = require("react-jss");
let _NodeDrawer = class _NodeDrawer extends React.Component {
    render() {
        const { classes } = this.props;
        const { nodeDrawerToggle } = this.props.uiStore;
        const nodeDrawer = (React.createElement(core_1.Drawer, { variant: "persistent", anchor: "right", open: nodeDrawerToggle.open ? true : false, classes: {
                paper: classes.nodeDrawerPaper,
                paperAnchorRight: classes.nodeDrawerPaperAnchorRight,
            } },
            React.createElement("div", { className: classes.nodeDrawerHeader },
                React.createElement(core_1.IconButton, { onClick: () => nodeDrawerToggle.openDrawer(false) },
                    React.createElement(ArrowForward_1.default, null))),
            React.createElement(core_1.Divider, null),
            React.createElement(core_1.List, null,
                React.createElement("div", null, this.props.children))));
        return nodeDrawer;
    }
};
_NodeDrawer = __decorate([
    mobx_react_1.inject("uiStore"),
    mobx_react_1.observer
], _NodeDrawer);
exports.NodeDrawer = react_jss_1.default(layout_styles_1.layoutStyles)(_NodeDrawer);

});
___scope___.file("pages/notebook/NotebookAppBar.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const classNames = require("classnames");
const AccountCircle_1 = require("@material-ui/icons/AccountCircle");
const BorderRight_1 = require("@material-ui/icons/BorderRight");
const FormatAlignRight_1 = require("@material-ui/icons/FormatAlignRight");
const Menu_1 = require("@material-ui/icons/Menu");
const core_1 = require("@material-ui/core");
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const react_jss_1 = require("react-jss");
const layout_styles_1 = require("./layout.styles");
let _NotebookAppBar = class _NotebookAppBar extends React.Component {
    constructor() {
        super(...arguments);
        this.setTarget = event => { this.currentClickTarget = event.target; };
    }
    render() {
        const { classes } = this.props;
        const { menuDrawerToggle, nodeDrawerToggle, nodeFormDrawerToggle, themeDialogToggle, appBarSettingsMenuToggle, } = this.props.uiStore;
        const _notebookAppBar = (React.createElement(core_1.AppBar, { className: classNames(classes.appBar, menuDrawerToggle.open && classes.appBarLeftShift, {
                [classes.appBarRightShift]: nodeDrawerToggle.open || nodeFormDrawerToggle.open,
            }) },
            React.createElement(core_1.Toolbar, { disableGutters: !menuDrawerToggle.open },
                React.createElement(core_1.IconButton, { color: "inherit", "aria-label": "open drawer", onClick: e => { menuDrawerToggle.openDrawer(true); }, className: classNames(classes.menuButton, menuDrawerToggle.open && classes.hide) },
                    React.createElement(Menu_1.default, null)),
                React.createElement("div", null,
                    React.createElement(core_1.IconButton, { "aria-owns": "appbar-account-icon", "aria-haspopup": "true", onClick: e => {
                            this.setTarget(e);
                            appBarSettingsMenuToggle.openDrawer(true);
                        }, color: "inherit" },
                        React.createElement(AccountCircle_1.default, null)),
                    React.createElement(core_1.IconButton, { onClick: () => nodeFormDrawerToggle.openDrawer(true), color: "inherit" },
                        React.createElement(BorderRight_1.default, null)),
                    React.createElement(core_1.IconButton, { onClick: () => nodeDrawerToggle.openDrawer(true), color: "inherit" },
                        React.createElement(FormatAlignRight_1.default, null)),
                    React.createElement(core_1.Menu, { anchorEl: this.currentClickTarget, id: "appbar-account-icon", "aria-label": "appbar-account-icon", anchorOrigin: { vertical: "top", horizontal: "right" }, transformOrigin: { vertical: "top", horizontal: "right" }, open: appBarSettingsMenuToggle.open, onClose: () => {
                            appBarSettingsMenuToggle.openDrawer(false);
                        } },
                        React.createElement(core_1.MenuItem, { onClick: () => { appBarSettingsMenuToggle.openDrawer(false); } }, "Profile"),
                        React.createElement(core_1.MenuItem, { onClick: () => { themeDialogToggle.openDrawer(true), appBarSettingsMenuToggle.openDrawer(false); } }, "Theme Settings"))))));
        return _notebookAppBar;
    }
};
__decorate([
    mobx_1.observable
], _NotebookAppBar.prototype, "currentClickTarget", void 0);
__decorate([
    mobx_1.action
], _NotebookAppBar.prototype, "setTarget", void 0);
_NotebookAppBar = __decorate([
    mobx_react_1.inject("uiStore"),
    mobx_react_1.observer
], _NotebookAppBar);
exports.NotebookAppBar = react_jss_1.default(layout_styles_1.layoutStyles)(_NotebookAppBar);

});
___scope___.file("pages/notebook/Nodes/Input.jsx", function(exports, require, module, __filename, __dirname){

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
const Input_1 = require("@material-ui/icons/Input");
const mobx_react_1 = require("mobx-react");
let InputNode = class InputNode extends React.Component {
    render() {
        const { classes } = this.props;
        const inputNode = (React.createElement(core_1.ListItem, { classes: classes, component: "div", draggable: true, onDragStart: event => {
                event.dataTransfer.setData("storm-diagram-node", JSON.stringify({ type: "cogliteIn" }));
            } },
            React.createElement(core_1.ListItemIcon, null,
                React.createElement(Input_1.default, null)),
            React.createElement(core_1.ListItemText, { primary: "Input" })));
        return inputNode;
    }
};
InputNode = __decorate([
    mobx_react_1.observer
], InputNode);
exports.InputNode = InputNode;

});
___scope___.file("pages/notebook/Nodes/Output.jsx", function(exports, require, module, __filename, __dirname){

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
        const { classes } = this.props;
        const outputNode = (React.createElement(core_1.ListItem, { classes: classes, component: "div", draggable: true, onDragStart: event => {
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
___scope___.file("pages/notebook/routes.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const Canvas_1 = require("./Diagram/Canvas");
exports.CogliteNotebookRoutes = props => (React.createElement(react_router_dom_1.Switch, null,
    React.createElement(react_router_dom_1.Route, { path: "/", render: () => React.createElement(Canvas_1.default, { num: "2", someProp: 100 }) }),
    React.createElement(react_router_dom_1.Route, { path: "/second", render: () => React.createElement(Canvas_1.default, { num: "2", someProp: 100 }) })));

});
___scope___.file("pages/notebook/Diagram/Canvas.jsx", function(exports, require, module, __filename, __dirname){

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
___scope___.file("pages/notebook/Diagram/CogliteLinkFactory.jsx", function(exports, require, module, __filename, __dirname){

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
___scope___.file("pages/notebook/Diagram/CogliteLinkModel.jsx", function(exports, require, module, __filename, __dirname){

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
___scope___.file("pages/notebook/Diagram/CogliteNodeFactory.jsx", function(exports, require, module, __filename, __dirname){

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
___scope___.file("pages/notebook/Diagram/CogliteNodeModel.js", function(exports, require, module, __filename, __dirname){

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
___scope___.file("pages/notebook/Diagram/CoglitePortModel.js", function(exports, require, module, __filename, __dirname){

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
___scope___.file("pages/notebook/Diagram/CogliteNodeWidget.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const Input_1 = require("@material-ui/icons/Input");
const LabelOutline_1 = require("@material-ui/icons/LabelOutline");
const React = require("react");
const storm_react_diagrams_1 = require("storm-react-diagrams");
const react_jss_1 = require("react-jss");
exports.styles = theme => ({
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
        paddingLeft: theme.spacing.unit,
        backgroundColor: theme.palette.background.default,
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
});
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
        return (React.createElement("div", { className: classes.cardBasic },
            React.createElement(core_1.Card, { className: classes.details },
                React.createElement("div", null,
                    React.createElement("div", { className: classes.controls },
                        React.createElement(core_1.IconButton, { "aria-label": "Previous", className: classes.playIcon }, node.cogType === "cogliteIn" ? React.createElement(Input_1.default, null) : React.createElement(LabelOutline_1.default, null)),
                        React.createElement(core_1.Typography, { variant: "subheading", className: classes.headerText }, node.cogType === "cogliteIn" ? `Input Node` : `Output Node`))),
                React.createElement(core_1.Divider, null),
                React.createElement("div", null,
                    React.createElement(core_1.CardContent, { className: classes.content },
                        React.createElement(core_1.Typography, { component: "p", className: classes.name }, node.name)))),
            React.createElement("div", { className: classes.leftTop },
                React.createElement(storm_react_diagrams_1.PortWidget, { name: "leftTop", node: node })),
            React.createElement("div", { className: classes.leftBottom },
                React.createElement(storm_react_diagrams_1.PortWidget, { name: "leftBottom", node: node })),
            React.createElement("div", { className: classes.rightTop },
                React.createElement(storm_react_diagrams_1.PortWidget, { name: "rightTop", node: node })),
            React.createElement("div", { className: classes.rightBottom },
                React.createElement(storm_react_diagrams_1.PortWidget, { name: "rightBottom", node: node }))));
    }
}
CogliteNodeWidget.defaultProps = {
    node: null,
    classes: {},
};
exports.CogliteNodeWidget = CogliteNodeWidget;
exports.default = react_jss_1.default(exports.styles)(CogliteNodeWidget);

});
___scope___.file("pages/notebook/Diagram/SimplePortFactory.js", function(exports, require, module, __filename, __dirname){

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
___scope___.file("pages/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./about"));
__export(require("./charts"));
__export(require("./cloud"));
__export(require("./dashboard"));
__export(require("./datasets"));
__export(require("./notebook"));
__export(require("./settings"));
__export(require("./WorkflowGraph"));

});
___scope___.file("pages/about.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
exports.AboutPage = mobx_react_1.observer(props => React.createElement("div", null, "About"));

});
___scope___.file("pages/charts/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./charts"));

});
___scope___.file("pages/charts/charts.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
exports.ChartsPage = () => React.createElement(exports.TogglableSidebarLayout, null);
const react_splitter_layout_1 = require("react-splitter-layout");
const design_1 = require("../../design");
const drawer_1 = require("./drawer/drawer");
const toolbar_1 = require("./drawer/toolbar");
const react_router_dom_1 = require("react-router-dom");
class _TogglableSidebarLayout extends React.Component {
    constructor(props) {
        super(props);
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.state = {
            sidebarVisible: true
        };
    }
    toggleSidebar() { this.setState({ sidebarVisible: !this.state.sidebarVisible }); }
    render() {
        return (React.createElement(react_splitter_layout_1.default, { percentage: true, secondaryInitialSize: 25, style: { height: '100%', position: 'relative', display: 'flex', flexDirection: 'row' } },
            React.createElement(design_1.FillParent, null,
                React.createElement("h2", null, "1st Pane"),
                React.createElement("button", { onClick: this.toggleSidebar },
                    this.state.sidebarVisible && 'Hide Sidebar',
                    !this.state.sidebarVisible && 'Show Sidebar')),
            this.state.sidebarVisible &&
                React.createElement(design_1.FillParent, null,
                    React.createElement("h2", null, "2nd Pane"),
                    React.createElement(toolbar_1.ChartDrawerToolbar, null),
                    React.createElement(drawer_1.WorkDrawerRoutes, null))));
    }
}
exports.TogglableSidebarLayout = react_router_dom_1.withRouter(_TogglableSidebarLayout);

});
___scope___.file("pages/charts/drawer/drawer.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_react_1 = require("mobx-react");
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const styled_jss_1 = require("styled-jss");
const core_1 = require("@material-ui/core");
const Menu_1 = require("@material-ui/icons/Menu");
const routes_1 = require("./routes");
exports.Drawer = styled_jss_1.default('div')({
    width: props => { props.width || '360px'; },
    flexDirection: 'column',
    alignItems: 'central',
    border: '3px solid black',
    right: 0
});
exports.IconNavBar = mobx_react_1.observer(props => (React.createElement(core_1.Toolbar, null,
    React.createElement(core_1.Button, null, React.createElement(Menu_1.default, null)),
    React.createElement(core_1.Button, null, React.createElement(Menu_1.default, null)),
    React.createElement(core_1.Button, null, React.createElement(Menu_1.default, null)))));
const _WorkDrawer = props => (React.createElement(exports.Drawer, { width: props.width },
    React.createElement(exports.IconNavBar, null),
    React.createElement(WorkDrawerRoutes, null)));
exports.WorkDrawer = mobx_react_1.observer(_WorkDrawer);
let WorkDrawerRoutes = class WorkDrawerRoutes extends React.Component {
    render() {
        const { navigation } = this.props;
        return (React.createElement(react_router_dom_1.Router, { history: navigation.history },
            React.createElement(react_router_dom_1.Switch, null,
                React.createElement(react_router_dom_1.Route, { path: '/nbdrawer/dashboard', render: () => routes_1.DashboardPage }),
                React.createElement(react_router_dom_1.Route, { path: '/nbdrawer/notebook', component: routes_1.NotebookPage }),
                React.createElement(react_router_dom_1.Route, { path: '/nbdrawer/datasets', component: routes_1.DatasetsPage }),
                React.createElement(react_router_dom_1.Route, { path: '/nbdrawer/charts', component: routes_1.ChartsPage }))));
    }
};
WorkDrawerRoutes = __decorate([
    mobx_react_1.inject('navigation'),
    mobx_react_1.observer
], WorkDrawerRoutes);
exports.WorkDrawerRoutes = WorkDrawerRoutes;
//const LeftNav = withStyles(styles, {withTheme: true})(_LeftNav);
//export {LeftNav as default, LeftNav}
// add "label" if you want to use text ie: <NavIcon label="Portfolio" route="/" icon={<Dashboard />} />

});
___scope___.file("pages/charts/drawer/routes/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./notebook"));
__export(require("./datasets"));
__export(require("./charts"));
__export(require("./dashboard"));
__export(require("./cloud"));

});
___scope___.file("pages/charts/drawer/routes/notebook.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
exports.NotebookPage = props => React.createElement("div", null,
    React.createElement("h2", null, "Notebook Page"));

});
___scope___.file("pages/charts/drawer/routes/datasets.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
exports.DatasetsPage = mobx_react_1.observer(props => React.createElement("div", null, "datasets"));

});
___scope___.file("pages/charts/drawer/routes/charts.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
exports.ChartsPage = mobx_react_1.observer(props => React.createElement("div", null, "Charts"));

});
___scope___.file("pages/charts/drawer/routes/dashboard.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
exports.DashboardPage = mobx_react_1.observer(props => React.createElement("div", null, "Dashboard"));

});
___scope___.file("pages/charts/drawer/routes/cloud.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
exports.CloudPage = mobx_react_1.observer(props => React.createElement("div", null,
    React.createElement("div", null, "Cloud")));

});
___scope___.file("pages/charts/drawer/toolbar.jsx", function(exports, require, module, __filename, __dirname){

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
const icons_1 = require("@material-ui/icons");
const NavIcon_1 = require("../../../layout/NavIcon");
const mobx_react_1 = require("mobx-react");
const styled_jss_1 = require("styled-jss");
const design_1 = require("../../../design");
const ToolbarDimensions = styled_jss_1.default(core_1.Toolbar)({
    display: "flex",
    position: 'relative',
    height: 50,
    width: "100%",
    overflow: "hidden"
});
let WidgetToolbar = class WidgetToolbar extends React.Component {
    render() {
        return (React.createElement(ToolbarDimensions, null,
            React.createElement(design_1.Row, null,
                React.createElement(ChartDrawerToolbar, null))));
    }
};
WidgetToolbar = __decorate([
    mobx_react_1.observer
], WidgetToolbar);
exports.WidgetToolbar = WidgetToolbar;
const RowContainer = styled_jss_1.default('div')({
    height: '100%',
    flex: '1',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignmentBaseline: 'central'
});
let ChartDrawerToolbar = class ChartDrawerToolbar extends React.Component {
    render() {
        return (React.createElement(RowContainer, Object.assign({}, this.props),
            React.createElement(NavIcon_1.NavListIcon, { route: '/nbdrawer/dashboard', icon: React.createElement(icons_1.Dashboard, null) }),
            React.createElement(NavIcon_1.NavListIcon, { route: '/nbdrawer/notebook', icon: React.createElement(icons_1.Cloud, null) }),
            React.createElement(NavIcon_1.NavListIcon, { route: '/nbdrawer/charts', icon: React.createElement(icons_1.SwapHoriz, null) }),
            React.createElement(NavIcon_1.NavListIcon, { route: '/nbdrawer/datasets', icon: React.createElement(icons_1.AccountBalanceWallet, null) })));
    }
};
ChartDrawerToolbar = __decorate([
    mobx_react_1.observer
], ChartDrawerToolbar);
exports.ChartDrawerToolbar = ChartDrawerToolbar;

});
___scope___.file("pages/cloud.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
exports.CloudPage = mobx_react_1.observer(props => React.createElement("div", null,
    React.createElement("div", null, "Cloud")));

});
___scope___.file("pages/dashboard.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
exports.DashboardPage = mobx_react_1.observer(props => React.createElement("div", null, "Dashboard"));

});
___scope___.file("pages/datasets.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
exports.DatasetsPage = mobx_react_1.observer(props => React.createElement("div", null, "datasets"));

});
___scope___.file("pages/notebook.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
exports.NotebookPage = props => React.createElement("div", null,
    React.createElement("h2", null, "Notebook Page"));

});
___scope___.file("pages/settings.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
exports.SettingsPage = mobx_react_1.observer(props => React.createElement("div", null, "Settings"));

});
___scope___.file("pages/WorkflowGraph.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
exports.WorkflowGraph = mobx_react_1.observer(props => React.createElement("div", null, "graph"));

});
___scope___.file("stores/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./NavigationStore"));

});
___scope___.file("stores/NavigationStore.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const history_1 = require("history");
class NavigationStore {
    constructor() {
        this.location = window.location;
        this.history = history_1.createHashHistory();
        this.history.listen((location) => { console.log(location); });
    }
    isActive(path) {
        return location.pathname === path;
    }
    goTo(event, { name }) {
        this.history.push(String(name));
    }
    push(location) {
        this.history.push(location);
    }
    replace(location) {
        this.history.replace(location);
    }
    go(n) {
        this.history.go(n);
    }
    goBack() {
        this.history.goBack();
    }
    goForward() {
        this.history.goForward();
    }
}
__decorate([
    mobx_1.observable
], NavigationStore.prototype, "location", void 0);
__decorate([
    mobx_1.action.bound
], NavigationStore.prototype, "isActive", null);
__decorate([
    mobx_1.action.bound
], NavigationStore.prototype, "goTo", null);
__decorate([
    mobx_1.action
], NavigationStore.prototype, "push", null);
__decorate([
    mobx_1.action
], NavigationStore.prototype, "replace", null);
__decorate([
    mobx_1.action
], NavigationStore.prototype, "go", null);
__decorate([
    mobx_1.action
], NavigationStore.prototype, "goBack", null);
__decorate([
    mobx_1.action
], NavigationStore.prototype, "goForward", null);
exports.NavigationStore = NavigationStore;
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
Object.defineProperty(exports, "__esModule", { value: true });
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
    mobx_1.observable
], ToggleOpenValue.prototype, "open", void 0);
__decorate([
    mobx_1.action
], ToggleOpenValue.prototype, "openDrawer", void 0);
__decorate([
    mobx_1.action
], ToggleOpenValue.prototype, "closeDrawer", void 0);
exports.ToggleOpenValue = ToggleOpenValue;
class TabValue {
    constructor() {
        this.tabValue = 0;
    }
    setTab(event, tabValue) {
        this.tabValue = tabValue;
    }
}
__decorate([
    mobx_1.observable
], TabValue.prototype, "tabValue", void 0);
__decorate([
    mobx_1.action
], TabValue.prototype, "setTab", null);
exports.TabValue = TabValue;
class UiStore {
    constructor() {
        this.title = "Coglite";
        this.themeId = "myriad";
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
    get muiThemeVariables() {
        return palette_1.ThemeVariables[this.themeId];
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
    mobx_1.observable
], UiStore.prototype, "title", void 0);
__decorate([
    mobx_1.observable
], UiStore.prototype, "themeId", void 0);
__decorate([
    mobx_1.observable
], UiStore.prototype, "themeDialogToggle", void 0);
__decorate([
    mobx_1.observable
], UiStore.prototype, "menuDrawerToggle", void 0);
__decorate([
    mobx_1.observable
], UiStore.prototype, "nodeDrawerToggle", void 0);
__decorate([
    mobx_1.observable
], UiStore.prototype, "nodeFormDrawerToggle", void 0);
__decorate([
    mobx_1.observable
], UiStore.prototype, "appBarSettingsMenuToggle", void 0);
__decorate([
    mobx_1.observable
], UiStore.prototype, "appTabs", void 0);
__decorate([
    mobx_1.observable
], UiStore.prototype, "isThemeDialogOpen", void 0);
__decorate([
    mobx_1.computed
], UiStore.prototype, "muiTheme", null);
__decorate([
    mobx_1.computed
], UiStore.prototype, "muiThemeVariables", null);
__decorate([
    mobx_1.action
], UiStore.prototype, "updateTheme", null);
__decorate([
    mobx_1.action
], UiStore.prototype, "openThemeDialog", null);
__decorate([
    mobx_1.action
], UiStore.prototype, "closeThemeDialog", null);
__decorate([
    mobx_1.observable
], UiStore.prototype, "uiError", void 0);
__decorate([
    mobx_1.action
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
};
exports.ThemeVariables = {
    myriad: {
        "--mdc-theme-primary": "#F44336",
        "--mdc-theme-secondary": "#FFD740",
        "--mdc-theme-background": " #FFFFFF",
        "--mdc-theme-text-primary-on-primary": " white",
        "--mdc-theme-text-secondary-on-primary": "rgba(255, 255, 255, 0.7)",
        "--mdc-theme-text-hint-on-primary": "rgba(255, 255, 255, 0.5)",
        "--mdc-theme-text-disabled-on-primary": "rgba(255, 255, 255, 0.5)",
        "--mdc-theme-text-icon-on-primary": "rgba(255, 255, 255, 0.5)",
        "--mdc-theme-text-primary-on-secondary": "rgba(0, 0, 0, 0.87)",
        "--mdc-theme-text-secondary-on-secondary": "rgba(0, 0, 0, 0.54)",
        "--mdc-theme-text-hint-on-secondary": "rgba(0, 0, 0, 0.38)",
        "--mdc-theme-text-disabled-on-secondary": "rgba(0, 0, 0, 0.38)",
        "--mdc-theme-text-icon-on-secondary": "rgba(0, 0, 0, 0.38)",
        "--mdc-theme-text-primary-on-background": "rgba(0, 0, 0, 0.87)",
        "--mdc-theme-text-secondary-on-background": "rgba(0, 0, 0, 0.54)",
        "--mdc-theme-text-hint-on-background": "rgba(0, 0, 0, 0.38)",
        "--mdc-theme-text-disabled-on-background": "rgba(0, 0, 0, 0.38)",
        "--mdc-theme-text-icon-on-background": "rgba(0, 0, 0, 0.38)",
        "--mdc-theme-text-primary-on-light": "rgba(0, 0, 0, 0.87)",
        "--mdc-theme-text-secondary-on-light": "rgba(0, 0, 0, 0.54)",
        "--mdc-theme-text-hint-on-light": "rgba(0, 0, 0, 0.38)",
        "--mdc-theme-text-disabled-on-light": "rgba(0, 0, 0, 0.38)",
        "--mdc-theme-text-icon-on-light": "rgba(0, 0, 0, 0.38)",
        "--mdc-theme-text-primary-on-dark": "white",
        "--mdc-theme-text-secondary-on-dark": "rgba(255, 255, 255, 0.7)",
        "--mdc-theme-text-hint-on-dark": "rgba(255, 255, 255, 0.5)",
        "--mdc-theme-text-disabled-on-dark": "rgba(255, 255, 255, 0.5)",
        "--mdc-theme-text-icon-on-dark": "rgba(255, 255, 255, 0.5)",
    },
    ranger: {
        "--mdc-theme-primary": "#2196F3",
        "--mdc-theme-secondary": "#FFE57F",
        "--mdc-theme-background": "#FFFFFF",
        "--mdc-theme-text-primary-on-primary": "white",
        "--mdc-theme-text-secondary-on-primary": "rgba(255, 255, 255, 0.7)",
        "--mdc-theme-text-hint-on-primary": "rgba(255, 255, 255, 0.5)",
        "--mdc-theme-text-disabled-on-primary": "rgba(255, 255, 255, 0.5)",
        "--mdc-theme-text-icon-on-primary": "rgba(255, 255, 255, 0.5)",
        "--mdc-theme-text-primary-on-secondary": "rgba(0, 0, 0, 0.87)",
        "--mdc-theme-text-secondary-on-secondary": "rgba(0, 0, 0, 0.54)",
        "--mdc-theme-text-hint-on-secondary": "rgba(0, 0, 0, 0.38)",
        "--mdc-theme-text-disabled-on-secondary": "rgba(0, 0, 0, 0.38)",
        "--mdc-theme-text-icon-on-secondary": "rgba(0, 0, 0, 0.38)",
        "--mdc-theme-text-primary-on-background": "rgba(0, 0, 0, 0.87)",
        "--mdc-theme-text-secondary-on-background": "rgba(0, 0, 0, 0.54)",
        "--mdc-theme-text-hint-on-background": "rgba(0, 0, 0, 0.38)",
        "--mdc-theme-text-disabled-on-background": "rgba(0, 0, 0, 0.38)",
        "--mdc-theme-text-icon-on-background": "rgba(0, 0, 0, 0.38)",
        "--mdc-theme-text-primary-on-light": "rgba(0, 0, 0, 0.87)",
        "--mdc-theme-text-secondary-on-light": "rgba(0, 0, 0, 0.54)",
        "--mdc-theme-text-hint-on-light": "rgba(0, 0, 0, 0.38)",
        "--mdc-theme-text-disabled-on-light": "rgba(0, 0, 0, 0.38)",
        "--mdc-theme-text-icon-on-light": "rgba(0, 0, 0, 0.38)",
        "--mdc-theme-text-primary-on-dark": "white",
        "--mdc-theme-text-secondary-on-dark": "rgba(255, 255, 255, 0.7)",
        "--mdc-theme-text-hint-on-dark": "rgba(255, 255, 255, 0.5)",
        "--mdc-theme-text-disabled-on-dark": "rgba(255, 255, 255, 0.5)",
        "--mdc-theme-text-icon-on-dark": "rgba(255, 255, 255, 0.5)",
    },
    velocity: {
        "--mdc-theme-primary": "#FFA000",
        "--mdc-theme-secondary": "#607D8B",
        "--mdc-theme-background": "#FFFFFF",
        "--mdc-theme-text-primary-on-primary": "rgba(0, 0, 0, 0.87)",
        "--mdc-theme-text-secondary-on-primary": "rgba(0, 0, 0, 0.54)",
        "--mdc-theme-text-hint-on-primary": "rgba(0, 0, 0, 0.38)",
        "--mdc-theme-text-disabled-on-primary": "rgba(0, 0, 0, 0.38)",
        "--mdc-theme-text-icon-on-primary": "rgba(0, 0, 0, 0.38)",
        "--mdc-theme-text-primary-on-secondary": "white",
        "--mdc-theme-text-secondary-on-secondary": "rgba(255, 255, 255, 0.7)",
        "--mdc-theme-text-hint-on-secondary": "rgba(255, 255, 255, 0.5)",
        "--mdc-theme-text-disabled-on-secondary": "rgba(255, 255, 255, 0.5)",
        "--mdc-theme-text-icon-on-secondary": "rgba(255, 255, 255, 0.5)",
        "--mdc-theme-text-primary-on-background": "rgba(0, 0, 0, 0.87)",
        "--mdc-theme-text-secondary-on-background": "rgba(0, 0, 0, 0.54)",
        "--mdc-theme-text-hint-on-background": "rgba(0, 0, 0, 0.38)",
        "--mdc-theme-text-disabled-on-background": "rgba(0, 0, 0, 0.38)",
        "--mdc-theme-text-icon-on-background": "rgba(0, 0, 0, 0.38)",
        "--mdc-theme-text-primary-on-light": "rgba(0, 0, 0, 0.87)",
        "--mdc-theme-text-secondary-on-light": "rgba(0, 0, 0, 0.54)",
        "--mdc-theme-text-hint-on-light": "rgba(0, 0, 0, 0.38)",
        "--mdc-theme-text-disabled-on-light": "rgba(0, 0, 0, 0.38)",
        "--mdc-theme-text-icon-on-light": "rgba(0, 0, 0, 0.38)",
        "--mdc-theme-text-primary-on-dark": "white",
        "--mdc-theme-text-secondary-on-dark": "rgba(255, 255, 255, 0.7)",
        "--mdc-theme-text-hint-on-dark": "rgba(255, 255, 255, 0.5)",
        "--mdc-theme-text-disabled-on-dark": "rgba(255, 255, 255, 0.5)",
        "--mdc-theme-text-icon-on-dark": "rgba(255, 255, 255, 0.5)",
    }
};

});
___scope___.file("theme.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styledTheme = {
    main: '#26282A',
    primary: '#E73C2F',
    secondary: '#EBEDF0',
    text: 'white',
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72, 96],
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512]
};

});
___scope___.file("assets/scss/main.scss", function(exports, require, module, __filename, __dirname){


require("fuse-box-css")("assets/scss/main.scss", ".srd-diagram {\n  position: relative;\n  flex-grow: 1;\n  display: flex;\n  cursor: move;\n  overflow: hidden; }\n  .srd-diagram__selector {\n    position: absolute;\n    background-color: rgba(0, 192, 255, 0.2);\n    border: solid 2px #00c0ff; }\n\n.srd-link-layer {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  transform-origin: 0 0;\n  overflow: visible !important;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0; }\n\n.srd-node-layer {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  transform-origin: 0 0;\n  width: 100%;\n  height: 100%; }\n\n.srd-node {\n  position: absolute;\n  -webkit-touch-callout: none;\n  /* iOS Safari */\n  -webkit-user-select: none;\n  /* Chrome/Safari/Opera */\n  user-select: none;\n  cursor: move;\n  pointer-events: all; }\n  .srd-node--selected > * {\n    border-color: #00c0ff !important; }\n\n.srd-port {\n  width: 15px;\n  height: 15px;\n  background: rgba(128, 128, 128, 0.1); }\n  .srd-port:hover, .srd-port.selected {\n    background: #c0ff00; }\n\n.srd-default-node {\n  background-color: #1e1e1e;\n  border-radius: 5px;\n  font-family: sans-serif;\n  color: white;\n  border: solid 2px black;\n  overflow: visible;\n  font-size: 11px; }\n  .srd-default-node__title {\n    background: rgba(0, 0, 0, 0.3);\n    display: flex;\n    white-space: nowrap; }\n    .srd-default-node__title > * {\n      align-self: center; }\n    .srd-default-node__title .fa {\n      padding: 5px;\n      opacity: 0.2;\n      cursor: pointer; }\n      .srd-default-node__title .fa:hover {\n        opacity: 1.0; }\n  .srd-default-node__name {\n    flex-grow: 1;\n    padding: 5px 5px; }\n  .srd-default-node__ports {\n    display: flex;\n    background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)); }\n  .srd-default-node__in, .srd-default-node__out {\n    flex-grow: 1;\n    display: flex;\n    flex-direction: column; }\n\n.srd-default-port {\n  display: flex;\n  margin-top: 1px; }\n  .srd-default-port > * {\n    align-self: center; }\n  .srd-default-port__name {\n    padding: 0 5px; }\n  .srd-default-port--out {\n    justify-content: flex-end; }\n    .srd-default-port--out .srd-default-port__name {\n      justify-content: flex-end;\n      text-align: right; }\n\n.srd-default-label {\n  background: rgba(70, 70, 70, 0.8);\n  border: 1px solid #333;\n  border-radius: 4px;\n  color: #fff;\n  display: inline-block;\n  font-size: smaller;\n  padding: 5px; }\n\n@keyframes dash {\n  from {\n    stroke-dashoffset: 24; }\n  to {\n    stroke-dashoffset: 0; } }\n\n.srd-default-link path {\n  fill: none;\n  pointer-events: all; }\n\n.srd-default-link--path-selected {\n  stroke: #00c0ff !important;\n  stroke-dasharray: 10,2;\n  animation: dash 1s linear infinite; }\n\n.srd-default-link__label {\n  pointer-events: none; }\n  .srd-default-link__label > div {\n    display: inline-block;\n    position: absolute; }\n\n.srd-default-link__point {\n  fill: rgba(0, 0, 0, 0.5); }\n\n.srd-default-link--point-selected {\n  fill: #00c0ff; }\n\n.srd-coglite-canvas {\n  height: 100%;\n  min-height: 600px;\n  background-color: #F7F7F7 !important;\n  background-image: linear-gradient(0deg, transparent 24%, rgba(0, 0, 0, 0.1) 25%, rgba(0, 0, 0, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 0, 0, 0.1) 25%, rgba(0, 0, 0, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0.1) 76%, transparent 77%, transparent);\n  background-size: 50px 50px; }\n  .srd-coglite-canvas .pointui {\n    fill: rgba(255, 255, 255, 0.5); }\n\n.diagram-layer {\n  position: relative;\n  height: 100%;\n  flex: 1; }\n\n/*# sourceMappingURL=main.scss.map */")
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