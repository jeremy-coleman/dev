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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const React = require("react");
const mobx_react_1 = require("mobx-react");
const theming_1 = require("theming");
const styled_components_1 = require("styled-components");
const AppLayout_1 = require("./layout/AppLayout");
const Router_1 = require("./Router");
const stores_1 = require("./stores");
exports.CogliteAppRoot = mobx_react_1.observer((props) => {
    const theme = stores_1.cogliteState.uiStore.muiTheme;
    return (React.createElement(mobx_react_1.Provider, Object.assign({}, stores_1.cogliteState),
        React.createElement(theming_1.ThemeProvider, { theme: theme },
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
___scope___.file("layout/AppLayout.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const design_1 = require("../design");
const Footer_1 = require("./Footer");
const WidgetNavBar_1 = require("./WidgetNavBar");
const IconNavigation_1 = require("./IconNavigation");
const Workspace_1 = require("./Workspace");
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
                React.createElement("div", { style: { width: '1px' } }, "place holders, these can expand on both sides of the app without fucking anything up"),
                React.createElement(design_1.VerticalStretch, null,
                    React.createElement(WidgetNavBar_1.WidgetNavBar, null),
                    React.createElement(design_1.Row, null,
                        React.createElement(IconNavigation_1.IconNavBar, null),
                        React.createElement(design_1.Row, null,
                            React.createElement(Workspace_1.MiddlePanel, null, this.hasError ? (React.createElement(ErrorDisplay, null)) : (children)))),
                    React.createElement(Footer_1.Footer, null)),
                React.createElement("div", { style: { width: '1px' } }, "same as above. set width to 100px or something to see"))));
    }
};
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Object)
], AppLayout.prototype, "hasError", void 0);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Object)
], AppLayout.prototype, "displayError", void 0);
AppLayout = tslib_1.__decorate([
    mobx_react_1.inject('nav'),
    mobx_react_1.observer
], AppLayout);
exports.AppLayout = AppLayout;
const ErrorDisplay = mobx_react_1.observer((props) => React.createElement("div", { style: { textAlign: 'center', paddingTop: 25, paddingBottom: 25 } },
    React.createElement("h1", null, "An unknown error occurred")));

});
___scope___.file("design/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./dimensions"), exports);

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
//import Typography from '@material-ui/core/Typography';
const React = require("react");
const mobx_react_1 = require("mobx-react");
const styled_jss_1 = require("styled-jss");
const core_1 = require("@material-ui/core");
const theming_1 = require("theming");
const version = '0.0.1';
const copyrightString = '© Copyright Coglite 2018';
const FooterDimensions = styled_jss_1.default(core_1.AppBar)({
    display: "flex",
    flexDirection: 'row',
    width: "100%",
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0
});
exports.Footer = theming_1.withTheme(mobx_react_1.observer((P) => (React.createElement(FooterDimensions, null,
    React.createElement("span", null, copyrightString),
    React.createElement("div", { style: { flex: 'auto' } }),
    React.createElement("span", null, `Version: ${version || 'pre-release'}`)))));

});
___scope___.file("layout/WidgetNavBar.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const styled_jss_1 = require("styled-jss");
const icons_1 = require("@material-ui/icons");
const core_1 = require("@material-ui/core");
const typestyle_1 = require("typestyle");
const csx_1 = require("csx");
const CommandBar_1 = require("./CommandBar");
const ElectronMenuIcons_1 = require("./ElectronMenuIcons");
const LinkStyle = typestyle_1.style({
    color: 'white',
    textDecoration: 'none',
    transitionDuration: '0.3s',
    padding: [0, 10, 0, 10],
    $nest: {
        '&:hover': {
            color: '#6642C6',
            transform: csx_1.scale3d(1.1, 1.1, 1.1)
        }
    }
});
const Link = mobx_react_1.inject('nav')(mobx_react_1.observer((props) => (React.createElement("a", { href: '#', className: LinkStyle, onClick: () => props.nav.goTo(props.route) }, props.children))));
const ToolbarDimensions1 = styled_jss_1.default(core_1.AppBar)({
    display: "flex",
    position: 'relative',
    height: 50,
    width: "100%",
    overflow: "hidden"
});
const RowContainer = styled_jss_1.default('div')({
    height: '100%',
    flex: '1',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignmentBaseline: 'central'
});
exports.WidgetNavBar1 = mobx_react_1.observer((props) => (React.createElement(ToolbarDimensions, Object.assign({}, props),
    React.createElement(RowContainer, Object.assign({}, this.props),
        React.createElement(Link, { route: "dashboard" },
            React.createElement(icons_1.Dashboard, null)),
        React.createElement(Link, { route: "notebook" },
            React.createElement(icons_1.DeviceHub, null)),
        React.createElement(Link, { route: "charts" },
            React.createElement(icons_1.InsertChart, null)),
        React.createElement(Link, { route: "datasets" },
            React.createElement(icons_1.GridOn, null)),
        React.createElement(Link, { route: "cloud" },
            React.createElement(icons_1.Cloud, null)),
        React.createElement(Link, { route: "settings" },
            React.createElement(icons_1.Settings, null)),
        React.createElement(Link, { route: "about" },
            React.createElement(icons_1.HelpOutline, null))))));
const ToolbarDimensions = styled_jss_1.default(core_1.AppBar)({
    display: "flex",
    position: 'relative',
    height: '30px',
    width: "100%",
    overflow: "hidden"
});
exports.WidgetNavBar = mobx_react_1.observer((props) => (React.createElement(ToolbarDimensions, Object.assign({}, props),
    React.createElement(RowContainer, Object.assign({}, this.props),
        React.createElement(CommandBar_1.FileCommandButtons, null),
        React.createElement(ElectronMenuIcons_1.ElectronCommandBarMenu, null)))));

});
___scope___.file("layout/CommandBar.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
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
            minimal: false,
            vertical: false,
        };
    }
    render() {
        const { intent, ...bgProps } = this.state;
        return (React.createElement(core_1.ButtonGroup, Object.assign({}, bgProps, { style: { minWidth: 120 } }),
            this.renderButton("File", "document"),
            this.renderButton("Edit", "edit"),
            this.renderButton("View", "eye-open")));
    }
    renderButton(text, iconName) {
        const { intent, vertical } = this.state;
        const rightIconName = vertical ? "caret-right" : "caret-down";
        const position = vertical ? core_1.Position.RIGHT_TOP : core_1.Position.BOTTOM_LEFT;
        return (React.createElement(core_1.Popover, { content: React.createElement(exports.FileMenu, null), position: position },
            React.createElement(core_1.Button, { intent: intent, rightIcon: rightIconName, icon: iconName, text: text })));
    }
}
exports.FileCommandButtons = FileCommandButtons;

});
___scope___.file("layout/ElectronMenuIcons.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Icons = require("../components/icons");
const electron_1 = require("electron");
const { Menu } = electron_1.remote;
class ElectronCommandBarMenu extends React.Component {
    showMenu() {
        const settings = null;
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
exports.ElectronCommandBarMenu = ElectronCommandBarMenu;

});
___scope___.file("components/icons/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./icons"), exports);

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
___scope___.file("layout/IconNavigation.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const styled_jss_1 = require("styled-jss");
//import { AccountBalanceWallet, Cloud, Dashboard, HelpOutline, Settings, SwapHoriz, DeviceHub, InsertChart, GridOn } from '@material-ui/icons';
const core_1 = require("@material-ui/core");
const core_2 = require("@material-ui/core");
const theming_1 = require("theming");
const Cloud_1 = require("rmdi/lib/Cloud");
const Dashboard_1 = require("rmdi/lib/Dashboard");
const HelpOutline_1 = require("rmdi/lib/HelpOutline");
const Settings_1 = require("rmdi/lib/Settings");
const DeviceHub_1 = require("rmdi/lib/DeviceHub");
const InsertChart_1 = require("rmdi/lib/InsertChart");
const GridOn_1 = require("rmdi/lib/GridOn");
const Link = mobx_react_1.inject('nav')(mobx_react_1.observer((props) => (React.createElement("a", Object.assign({ href: '#' }, props, { onClick: () => props.nav.goTo(props.route) }), props.children))));
function _NavListIcon({ icon, label, route }) {
    return (React.createElement(core_2.ListItem, { button: true, component: props => React.createElement(Link, Object.assign({}, props, { route: route })) },
        React.createElement(core_2.ListItemIcon, null, icon),
        React.createElement(core_2.ListItemText, { primary: label })));
}
exports.NavListIcon = theming_1.withTheme(_NavListIcon);
const LeftNavStylesContainer = styled_jss_1.default(core_1.Card)({
    maxWidth: '64px',
    minHeight: '100%',
    flex: '1 1 auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignmentBaseline: 'central',
    marginBottom: '5px',
    overflow: 'hidden'
});
exports.IconNavBar = theming_1.withTheme(mobx_react_1.observer((props) => (React.createElement(LeftNavStylesContainer, Object.assign({}, props),
    React.createElement(exports.NavListIcon, { route: "dashboard", icon: React.createElement(Dashboard_1.default, null) }),
    React.createElement(exports.NavListIcon, { route: "notebook", icon: React.createElement(DeviceHub_1.default, null) }),
    React.createElement(exports.NavListIcon, { route: "charts", icon: React.createElement(InsertChart_1.default, null) }),
    React.createElement(exports.NavListIcon, { route: "datasets", icon: React.createElement(GridOn_1.default, null) }),
    React.createElement(exports.NavListIcon, { route: "cloud", icon: React.createElement(Cloud_1.default, null) }),
    React.createElement(exports.NavListIcon, { route: "settings", icon: React.createElement(Settings_1.default, null) }),
    React.createElement(exports.NavListIcon, { route: "about", icon: React.createElement(HelpOutline_1.default, null) })))));
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
                <BlueprintNavIcon>IconNames.DASHBOARD} size={35} large={true} route="/"/>
                <BlueprintNavIcon>IconNames.CODE} size={35} large={true} route="notebook"/>
                <BlueprintNavIcon>IconNames.CHART} size={35} large={true} route="charts"/>
                <BlueprintNavIcon>IconNames.DATABASE} size={35} large={true}  route="datasets"/>
                <BlueprintNavIcon>IconNames.GRAPH} size={35} large={true}  route="dashboard" />
                <BlueprintNavIcon>IconNames.CLOUD} size={35} large={true}  route="cloud"/>
                <BlueprintNavIcon>IconNames.COG} size={35} large={true}  route="settings"/>
                <BlueprintNavIcon>IconNames.HELP} size={35} large={true}  route="about"/>
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
const mobx_react_1 = require("mobx-react");
const design_1 = require("../design");
const Container = styled_jss_1.default(core_1.Card)({
    position: 'relative',
    display: "flex",
    flex: '1 1 auto',
    width: "100%",
    margin: '5px'
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
const AppRouter = mobx_react_1.inject('nav')(mobx_react_1.observer((props) => (React.createElement("div", { className: typestyle_1.style(csstips_1.flex, csstips_1.vertical) }, when_switch_1.default(props.nav.route)
    .is('notebook', () => React.createElement(View_1.NotebookView, null))
    .is('datasets', () => React.createElement(modules_1.DatasetsPage, null))
    .is('charts', () => React.createElement(modules_1.ChartsPage, null))
    .is('dashboard', () => React.createElement(modules_1.DashboardPage, null))
    .is('cloud', () => React.createElement(modules_1.CloudPage, null))
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
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const NodeDrawer_1 = require("./Drawers/NodeDrawer");
const toolbar_1 = require("./toolbar");
const Input_1 = require("./Nodes/Input");
const Output_1 = require("./Nodes/Output");
const design_1 = require("../../design");
//import { WidgetToolbar } from "../charts/drawer/toolbar";
const core_1 = require("@material-ui/core");
const styled_jss_1 = require("styled-jss");
const Container = styled_jss_1.default(core_1.Card)({
    position: 'relative',
    display: "flex",
    flex: '1 1 auto',
    width: "100%",
    margin: '5px'
});
let MiddlePanel = mobx_react_1.observer(props => React.createElement(Container, null,
    React.createElement(design_1.FillFlex, null, props.children)));
let NotebookLayout = class NotebookLayout extends React.Component {
    constructor() {
        super(...arguments);
        this.setTarget = event => { this.currentClickTarget = event.target; };
        this.handleThemeDialogClose = (selectedOption, action) => {
            const uiStore = this.props.uiStore;
            if (action === "ok") {
                uiStore.updateTheme(selectedOption);
            }
            uiStore.themeDialogToggle.openDrawer(false);
        };
    }
    render() {
        //const { classes } = this.props
        const { nodeDrawerToggle, nodeFormDrawerToggle, themeDialogToggle } = this.props.uiStore;
        const nodeDrawer = (React.createElement(NodeDrawer_1.NodeDrawer, null,
            React.createElement(Input_1.InputNode, null),
            React.createElement(Output_1.OutputNode, null)));
        return (React.createElement(design_1.FillFlex, null,
            React.createElement(design_1.Row, null,
                React.createElement(design_1.VerticalStretch, null,
                    React.createElement(toolbar_1.NotebookToolbar, null),
                    React.createElement(design_1.Row, null,
                        React.createElement(design_1.Row, null,
                            React.createElement(MiddlePanel, null, this.props.children)),
                        nodeDrawer)))));
    }
};
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Object)
], NotebookLayout.prototype, "currentClickTarget", void 0);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Object)
], NotebookLayout.prototype, "setTarget", void 0);
NotebookLayout = tslib_1.__decorate([
    mobx_react_1.inject("uiStore"),
    mobx_react_1.observer
], NotebookLayout);
exports.NotebookLayout = NotebookLayout;
/*
      <Grid container>
<div style={{width: "100%",overflow: "hidden"}}>
  <div style={{position: "relative",display: "flex",width: "100%",height: "100%"}}>
    <NotebookToolbar />
    <main style={{width: "100%", flexGrow: 1}}>
      {this.props.children}
      {nodeDrawer}
    </main>
    
  </div>
</div>
</Grid>
*/ 

});
___scope___.file("modules/notebook/Drawers/NodeDrawer.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const core_1 = require("@material-ui/core");
const mobx_react_1 = require("mobx-react");
const styled_jss_1 = require("styled-jss");
const NodeDrawerDimensions = styled_jss_1.default(core_1.Card)({
    maxWidth: '180px',
    minHeight: '100%',
    flex: '1 1 auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignmentBaseline: 'central',
    marginBottom: '5px',
});
//position: "relative", width: nodeDrawerWidth, left: "auto", right: 0,
let NodeDrawer = class NodeDrawer extends React.Component {
    render() {
        const { nodeDrawerToggle } = this.props.uiStore;
        const nodeDrawer = (React.createElement(NodeDrawerDimensions, { open: nodeDrawerToggle.open ? true : false },
            React.createElement(core_1.List, null,
                React.createElement("div", null, this.props.children))));
        return nodeDrawer;
    }
};
NodeDrawer = tslib_1.__decorate([
    mobx_react_1.inject("uiStore"),
    mobx_react_1.observer
], NodeDrawer);
exports.NodeDrawer = NodeDrawer;
//export let NodeDrawer = injectSheet(layoutStyles)(_NodeDrawer)

});
___scope___.file("modules/notebook/toolbar.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
//import {observer, inject} from 'mobx-react'
//import styled, { StyledFunction } from 'styled-components';
const core_1 = require("@blueprintjs/core");
const icons_1 = require("@blueprintjs/icons");
exports.NotebookToolbar = () => (React.createElement(core_1.ButtonGroup, { large: true, fill: true },
    React.createElement(core_1.Button, { icon: icons_1.IconNames.CODE }),
    React.createElement(core_1.Button, { icon: icons_1.IconNames.GRAPH }),
    React.createElement(core_1.Button, { icon: icons_1.IconNames.SCATTER_PLOT }),
    React.createElement(core_1.Button, { icon: icons_1.IconNames.GRAPH })));

});
___scope___.file("modules/notebook/Nodes/Input.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const core_1 = require("@material-ui/core");
const Input_1 = require("@material-ui/icons/Input");
const mobx_react_1 = require("mobx-react");
let InputNode = class InputNode extends React.Component {
    render() {
        const inputNode = (React.createElement(core_1.ListItem, { component: "div", draggable: true, onDragStart: event => { event.dataTransfer.setData("storm-diagram-node", JSON.stringify({ type: "cogliteIn" })); } },
            React.createElement(core_1.ListItemIcon, null,
                React.createElement(Input_1.default, null)),
            React.createElement(core_1.ListItemText, { primary: "Input" })));
        return inputNode;
    }
};
InputNode = tslib_1.__decorate([
    mobx_react_1.observer
], InputNode);
exports.InputNode = InputNode;

});
___scope___.file("modules/notebook/Nodes/Output.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
OutputNode = tslib_1.__decorate([
    mobx_react_1.observer
], OutputNode);
exports.OutputNode = OutputNode;

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
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./about"), exports);
tslib_1.__exportStar(require("./charts"), exports);
tslib_1.__exportStar(require("./cloud"), exports);
tslib_1.__exportStar(require("./dashboard"), exports);
tslib_1.__exportStar(require("./datasets"), exports);
tslib_1.__exportStar(require("./notebook"), exports);
tslib_1.__exportStar(require("./lab"), exports);

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
___scope___.file("modules/charts/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./charts"), exports);

});
___scope___.file("modules/charts/charts.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const mobx_react_1 = require("mobx-react");
exports.ChartsPage = mobx_react_1.observer(() => React.createElement(TogglableSidebarLayout, null));
const react_splitter_layout_1 = require("react-splitter-layout");
const design_1 = require("../../design");
const drawer_1 = require("./drawer");
const lib_1 = require("typestyle/lib");
const csstips_1 = require("csstips");
const mobx_1 = require("mobx");
let TogglableSidebarLayout = class TogglableSidebarLayout extends React.Component {
    constructor() {
        super(...arguments);
        this.sidebarVisible = true;
    }
    toggleSidebar() { return this.sidebarVisible = !this.sidebarVisible; }
    //toggleSidebar() {this.setState({ sidebarVisible: !this.sidebarVisible })}
    render() {
        return (React.createElement(react_splitter_layout_1.default, { percentage: true, secondaryInitialSize: 25, style: { height: '100%', position: 'relative', display: 'flex', flexDirection: 'row' } },
            React.createElement(design_1.FillParent, null,
                React.createElement("h2", null, "1st Pane"),
                React.createElement("button", { onClick: this.toggleSidebar },
                    this.sidebarVisible && 'Hide Sidebar',
                    !this.sidebarVisible && 'Show Sidebar')),
            this.sidebarVisible &&
                React.createElement(design_1.FillParent, null,
                    React.createElement("div", { className: lib_1.style(csstips_1.flex, csstips_1.vertical) },
                        React.createElement("h2", null, "2nd Pane"),
                        React.createElement(drawer_1.WorkDrawer, null)))));
    }
};
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Boolean)
], TogglableSidebarLayout.prototype, "sidebarVisible", void 0);
tslib_1.__decorate([
    mobx_1.action.bound,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], TogglableSidebarLayout.prototype, "toggleSidebar", null);
TogglableSidebarLayout = tslib_1.__decorate([
    mobx_react_1.observer
], TogglableSidebarLayout);
exports.TogglableSidebarLayout = TogglableSidebarLayout;
//added fill parent remember to take it uot
/*

interface SBState {
    sidebarVisible: boolean
}

@observer
export class TogglableSidebarLayout extends React.Component<any, SBState> {
  constructor(props, context?) {
    super(props, context);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.state = {
      sidebarVisible: true
    };
  }

  toggleSidebar() {this.setState({ sidebarVisible: !this.state.sidebarVisible })}

  render() {
    return (
      <SplitterLayout percentage secondaryInitialSize={25} style={{height: '100%', position: 'relative', display: 'flex', flexDirection: 'row'}}>
        <FillParent>
          <h2>1st Pane</h2>
          <button onClick={this.toggleSidebar}>
            {this.state.sidebarVisible && 'Hide Sidebar'}
            {!this.state.sidebarVisible && 'Show Sidebar'}
          </button>
        </FillParent>
        {this.state.sidebarVisible &&
          <FillParent>
            <div className={style(flex, vertical)}>
            <h2>2nd Pane</h2>
            <WorkDrawer/>
            </div>
          </FillParent>
        }
      </SplitterLayout>
    );
  }
}

*/ 

});
___scope___.file("modules/charts/drawer.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const styled_jss_1 = require("styled-jss");
const icons_1 = require("@material-ui/icons");
const core_1 = require("@material-ui/core");
const when_switch_1 = require("when-switch");
const theming_1 = require("theming");
const tabs_1 = require("./tabs");
const csstips_1 = require("csstips");
const typestyle_1 = require("typestyle");
const lib_1 = require("csx/lib");
exports.Drawer = styled_jss_1.default(core_1.Card)({
    flexDirection: 'column',
    alignItems: 'central',
    border: '3px solid black',
    minHeight: '100%',
    right: 0
});
const ToolbarDimensions = styled_jss_1.default(core_1.AppBar)({
    display: "flex",
    position: 'relative',
    height: 50,
    width: "100%",
    overflow: "hidden"
});
const RowContainer = styled_jss_1.default('div')({
    height: '100%',
    flex: '1',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignmentBaseline: 'central'
});
const WidgetIconBar = theming_1.withTheme(mobx_react_1.observer((props) => (React.createElement(ToolbarDimensions, Object.assign({}, props),
    React.createElement(RowContainer, Object.assign({}, this.props, { style: { alignItems: 'space-between' } }),
        React.createElement(ChartDrawerLink, { route: 'chartdrawer:charts' },
            React.createElement(icons_1.SwapHoriz, null)),
        React.createElement(ChartDrawerLink, { route: 'chartdrawer:dashboard' },
            React.createElement(icons_1.Dashboard, null)),
        React.createElement(ChartDrawerLink, { route: 'chartdrawer:datasets' },
            React.createElement(icons_1.AccountBalanceWallet, null)),
        React.createElement(ChartDrawerLink, { route: 'chartdrawer:notebook' },
            React.createElement(icons_1.SwapHoriz, null)))))));
const LinkStyle = typestyle_1.style({
    color: 'black',
    textDecoration: 'none',
    transitionDuration: '0.3s',
    padding: [0, 10, 0, 10],
    $nest: {
        '&:hover': {
            color: '#6642C6',
            transform: lib_1.scale3d(1.1, 1.1, 1.1)
        }
    }
});
const ChartDrawerLink = mobx_react_1.inject('nav')(mobx_react_1.observer((props) => (React.createElement("a", { href: '#', className: LinkStyle, onClick: () => props.nav.goToChartDrawer(props.route) }, props.children))));
const ChartDrawerRouter = mobx_react_1.inject('nav')(mobx_react_1.observer((props) => (React.createElement("div", Object.assign({ className: typestyle_1.style(csstips_1.flex, csstips_1.vertical) }, props), when_switch_1.default(props.nav.chartDrawerRoute)
    .is('chartdrawer:charts', () => React.createElement(tabs_1.ChartsPage, null))
    .is('chartdrawer:datasets', () => React.createElement(tabs_1.DatasetsPage, null))
    .is('chartdrawer:notebook', () => React.createElement(tabs_1.NotebookPage, null))
    .is('chartdrawer:dashboard', () => React.createElement(tabs_1.DashboardPage, null))
    .else(() => React.createElement(tabs_1.DashboardPage, null))))));
exports.WorkDrawer = mobx_react_1.observer(props => (React.createElement("div", { className: typestyle_1.style(csstips_1.flex, csstips_1.vertical) },
    React.createElement(WidgetIconBar, null),
    React.createElement(ChartDrawerRouter, null))));

});
___scope___.file("modules/charts/tabs/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./notebook"), exports);
tslib_1.__exportStar(require("./datasets"), exports);
tslib_1.__exportStar(require("./charts"), exports);
tslib_1.__exportStar(require("./dashboard"), exports);
tslib_1.__exportStar(require("./cloud"), exports);

});
___scope___.file("modules/charts/tabs/notebook.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
exports.NotebookPage = (props) => React.createElement("div", null,
    React.createElement("h2", null, "Notebook Page"));

});
___scope___.file("modules/charts/tabs/datasets.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
exports.DatasetsPage = mobx_react_1.observer((props) => React.createElement("div", null, "datasets"));

});
___scope___.file("modules/charts/tabs/charts.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const theming_1 = require("theming");
const styled_jss_1 = require("styled-jss");
exports.ChartsPage = theming_1.withTheme(mobx_react_1.observer((props) => React.createElement("div", null,
    "Charts",
    React.createElement(Button, null))));
const Button = theming_1.withTheme(styled_jss_1.default('button')(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
})));

});
___scope___.file("modules/charts/tabs/dashboard.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
exports.DashboardPage = mobx_react_1.observer((props) => React.createElement("div", null, "Dashboard"));

});
___scope___.file("modules/charts/tabs/cloud.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
exports.CloudPage = mobx_react_1.observer((props) => React.createElement("div", null,
    React.createElement("div", null, "Cloud")));

});
___scope___.file("modules/cloud/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./cloud"), exports);

});
___scope___.file("modules/cloud/cloud.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
exports.CloudPage = mobx_react_1.observer((props) => React.createElement("div", null,
    React.createElement("div", null, "Cloud")));

});
___scope___.file("modules/dashboard.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
exports.DashboardPage = mobx_react_1.observer(props => React.createElement("div", null,
    React.createElement("p", null, "Dashboard"),
    React.createElement("p", null, "Recent Projects"),
    React.createElement("p", null, "Reports"),
    React.createElement("p", null, "Feeds"),
    React.createElement("p", null, "Breadcrumbs / Progress for most recent project")));

});
___scope___.file("modules/datasets.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
exports.DatasetsPage = mobx_react_1.observer(props => React.createElement("div", null,
    React.createElement("p", null, "datasets"),
    React.createElement("p", null, "manage data here across projects"),
    React.createElement("p", null, "add connections, manage global datasets, etc "),
    React.createElement("p", null, "adding project datasets will happen within the notebook module")));

});
___scope___.file("modules/notebook.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
exports.NotebookPage = props => React.createElement("div", null,
    React.createElement("h2", null, "Notebook Page"));

});
___scope___.file("modules/lab/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./lab"), exports);

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
    React.createElement(toolbar_1.ChartDrawerToolbar, null),
    React.createElement(App_1.CogliteLabApp, null)));

});
___scope___.file("modules/lab/App.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_mosaic_component_1 = require("react-mosaic-component");
const styled_jss_1 = require("styled-jss");
require("./styles/index.css");
require("./App.css");
const React = require("react");
const design_1 = require("../../design");
const core_1 = require("@material-ui/core");
const ToolbarDimensions = styled_jss_1.default(core_1.AppBar)({
    display: "flex",
    position: 'relative',
    height: 50,
    width: "100%",
    overflow: "hidden"
});
const ViewIdMosaic = react_mosaic_component_1.Mosaic.ofType();
const ViewIdMosaicWindow = react_mosaic_component_1.MosaicWindow.ofType();
const TITLE_MAP = {
    a: 'Graph Window',
    b: 'Populations',
    c: 'Layout',
    new: 'New Window',
};
class CogliteLabApp extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { showHeader: true };
    }
    render() {
        const { showHeader, ...calloutProps } = this.state;
        return (React.createElement("div", { style: { height: '100vh', display: 'flex' } },
            React.createElement(design_1.VerticalStretch, null,
                React.createElement("nav", { className: "pt-navbar" },
                    React.createElement("div", { className: "pt-navbar-group pt-align-left" },
                        React.createElement("div", { className: "pt-navbar-heading" }, "Untitled Lab"),
                        React.createElement("span", { className: "pt-navbar-divider" }),
                        React.createElement("div", { className: "sm:hidden md:flex pt-input-group" },
                            React.createElement("span", { className: "pt-icon pt-icon-search" }),
                            React.createElement("input", { type: "search", className: "pt-input pt-small", placeholder: "Search groups..." })),
                        React.createElement("div", { className: "sm:hidden lg:flex lg:flex-col ml-4" },
                            React.createElement("div", { className: "pt-ui-text ml-2" }, "Notebooks"),
                            React.createElement("div", { className: "pt-ui-text pt-text-muted ml-2 text-xs" }, "380 events"))),
                    React.createElement("div", { className: "pt-navbar-group pt-align-right" },
                        React.createElement("button", { className: "pt-button pt-minimal pt-icon-control" },
                            React.createElement("span", { className: "sm:hidden lg:flex" }, "Configure Workspace")),
                        React.createElement("div", { className: "pt-button-group pt-minimal" },
                            React.createElement("a", { className: "pt-button pt-icon-undo", role: "button" }),
                            React.createElement("a", { className: "pt-button pt-icon-redo", role: "button" })),
                        React.createElement("span", { className: "pt-navbar-divider" }),
                        React.createElement("button", { className: "pt-button pt-minimal pt-icon-user" }),
                        React.createElement("button", { className: "pt-button pt-minimal pt-icon-help" }),
                        React.createElement("button", { className: "pt-button pt-minimal pt-icon-cog" }))),
                React.createElement(ViewIdMosaic, { renderTile: (id, path) => (
                    // tslint:disable-next-line jsx-no-lambda
                    React.createElement(ViewIdMosaicWindow, { path: path, createNode: () => 'new', title: TITLE_MAP[id] },
                        id === 'a' &&
                            React.createElement("div", { className: "grid max-w-l mx-auto p-8" },
                                React.createElement("div", { className: "bg-white rounded h-full text-grey-darkest shadow-md" },
                                    React.createElement("img", { src: "img/histogram1.png", alt: "Histogran 1", className: "w-full block rounded-b" })),
                                React.createElement("div", { className: "bg-white rounded h-full text-grey-darkest shadow-md" },
                                    React.createElement("img", { src: "img/dot-plot1.png", alt: "Dotplot 1", className: "w-full block rounded-b" })),
                                React.createElement("div", { className: "bg-white rounded h-full text-grey-darkest shadow-md" },
                                    React.createElement("img", { src: "img/density3.png", alt: "Quads 1", className: "w-full block rounded-b" })),
                                React.createElement("div", { className: "bg-white rounded h-full text-grey-darkest shadow-md" },
                                    React.createElement("img", { src: "img/gate1.png", alt: "Gate 1", className: "w-full block rounded-b" })),
                                React.createElement("div", { className: "bg-white rounded h-full text-grey-darkest shadow-md" },
                                    React.createElement("img", { src: "img/quad2.png", alt: "Quad 2", className: "w-full block rounded-b" })),
                                React.createElement("div", { className: "span-col-2 span-row-2 bg-white rounded h-full text-grey-darkest shadow-md" },
                                    React.createElement("img", { src: "img/quads1.png", alt: "Quads 1", className: "w-full block rounded-b" })),
                                React.createElement("div", { className: "bg-white rounded h-full text-grey-darkest shadow-md" },
                                    React.createElement("img", { src: "img/cdf1.png", alt: "Quad 2", className: "w-full block rounded-b" })),
                                React.createElement("div", { className: "bg-white rounded h-full text-grey-darkest shadow-md" },
                                    React.createElement("img", { src: "img/heatmap1.png", alt: "Quad 2", className: "w-full block rounded-b" })),
                                React.createElement("div", { className: "bg-white rounded h-full text-grey-darkest shadow-md" },
                                    React.createElement("img", { src: "img/zebra1.png", alt: "Quad 2", className: "w-full block rounded-b" })),
                                React.createElement("div", { className: "bg-white rounded h-full text-grey-darkest shadow-md" },
                                    React.createElement("img", { src: "img/density-plot1.png", alt: "Quad 2", className: "w-full block rounded-b" })),
                                React.createElement("div", { className: "bg-white rounded h-full text-grey-darkest shadow-md" },
                                    React.createElement("img", { src: "img/contour-plot1.png", alt: "Contour plot", className: "w-full block rounded-b" })),
                                React.createElement("div", { className: "bg-white rounded h-full text-grey-darkest shadow-md" },
                                    React.createElement("img", { src: "img/density2.png", alt: "Contour plot", className: "w-full block rounded-b" })),
                                React.createElement("div", { className: "bg-white rounded h-full text-grey-darkest shadow-md" },
                                    React.createElement("img", { src: "img/histogram2.png", alt: "Contour plot", className: "w-full block rounded-b" }))),
                        id === 'b' &&
                            React.createElement("div", null,
                                React.createElement("div", { className: "pt-tree pt-elevation-0" },
                                    React.createElement("ul", { className: "pt-tree-node-list pt-tree-root" },
                                        React.createElement("li", { className: "pt-tree-node pt-tree-node-expanded border-b bg-orange-lightest" },
                                            React.createElement("div", { className: "bg-orange-lightest border-l-4 border-orange-dark" },
                                                React.createElement("div", { className: "pt-tree-node-content flex-none border-b border-dotted" },
                                                    React.createElement("span", { className: "pt-tree-node-caret pt-tree-node-caret-open pt-icon-standard" }),
                                                    React.createElement("span", { className: "pt-tree-node-icon pt-icon-standard pt-icon-selection text-green" }),
                                                    React.createElement("span", { className: "pt-tree-node-label font-bold text-orange-dark" }, "mynotebook.ipynb"),
                                                    React.createElement("span", { className: "pt-tree-node-secondary-label text-xs" }, "96,670 events")),
                                                React.createElement("ul", { className: "pt-tree-node-list" },
                                                    React.createElement("li", { className: "pt-tree-node border-b border-dotted" },
                                                        React.createElement("div", { className: "pt-tree-node-content" },
                                                            React.createElement("span", { className: "pt-tree-node-caret-none pt-icon-standard" }),
                                                            React.createElement("span", { className: "pt-tree-node-icon pt-icon-standard pt-icon-left-join" }),
                                                            React.createElement("span", { className: "pt-tree-node-label" }, "Q1: DTG:Domain "),
                                                            React.createElement("span", { className: "pt-tree-node-secondary-label text-xs" }, "42,908 events"))),
                                                    React.createElement("li", { className: "pt-tree-node" },
                                                        React.createElement("div", { className: "pt-tree-node-content" },
                                                            React.createElement("span", { className: "pt-tree-node-caret-none pt-icon-standard" }),
                                                            React.createElement("span", { className: "pt-tree-node-icon pt-icon-standard pt-icon-left-join" }),
                                                            React.createElement("span", { className: "pt-tree-node-label" }, "Q2: DTG:Domain "),
                                                            React.createElement("span", { className: "pt-tree-node-secondary-label text-xs" }, "25,398 events")))))),
                                        React.createElement("li", { className: "pt-tree-node pt-tree-node-expanded border-b" },
                                            React.createElement("div", { className: "pt-tree-node-content" },
                                                React.createElement("span", { className: "pt-tree-node-caret pt-tree-node-caret-closed pt-icon-standard" }),
                                                React.createElement("span", { className: "pt-tree-node-icon pt-icon-standard pt-icon-selection text-blue" }),
                                                React.createElement("span", { className: "pt-tree-node-label font-bold" }, "mynb2.ipynb"),
                                                React.createElement("span", { className: "pt-tree-node-secondary-label text-xs" }, "222,670 events"))),
                                        React.createElement("li", { className: "pt-tree-node pt-tree-node-expanded border-b" },
                                            React.createElement("div", { className: "pt-tree-node-content" },
                                                React.createElement("span", { className: "pt-tree-node-caret pt-tree-node-caret-closed pt-icon-standard" }),
                                                React.createElement("span", { className: "pt-tree-node-icon pt-icon-standard pt-icon-selection text-red" }),
                                                React.createElement("span", { className: "pt-tree-node-label font-bold" }, "mynb3.ipynb"),
                                                React.createElement("span", { className: "pt-tag pt-intent-danger" }, "File not found"),
                                                React.createElement("span", { className: "pt-tree-node-secondary-label" },
                                                    React.createElement("button", { type: "button", className: "pt-button pt-intent-danger pt-minimal text-xs" },
                                                        React.createElement("span", { className: "pt-icon-standard pt-icon-refresh pt-align-right" })))))),
                                    React.createElement("a", { href: "#" }, "Add Statistics"),
                                    React.createElement("a", { href: "#", className: "ml-3" }, "Add Keyword"))),
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
___scope___.file("modules/lab/styles/index.css", function(exports, require, module, __filename, __dirname){


require("fuse-box-css")("modules/lab/styles/index.css", "/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n      -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: .67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"],\n/* 1 */\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: .35em .75em .625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n\ndetails,\n/* 1 */\nmenu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\n\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10-.\n */\n\n[hidden] {\n  display: none;\n}\n\n/**\n * Manually forked from SUIT CSS Base: https://github.com/suitcss/base\n * A thin layer on top of normalize.css that provides a starting point more\n * suitable for web applications.\n */\n\n/**\n * 1. Prevent padding and border from affecting element width\n * https://goo.gl/pYtbK7\n * 2. Change the default font family in all browsers (opinionated)\n */\n\nhtml {\n  box-sizing: border-box; /* 1 */\n  font-family: sans-serif; /* 2 */\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: inherit;\n}\n\n/**\n * Removes the default spacing and border for appropriate elements.\n */\n\nblockquote,\ndl,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nfigure,\np,\npre {\n  margin: 0;\n}\n\nbutton {\n  background: transparent;\n  padding: 0;\n}\n\n/**\n * Work around a Firefox/IE bug where the transparent `button` background\n * results in a loss of the default `button` focus styles.\n */\n\nbutton:focus {\n  outline: 1px dotted;\n  outline: 5px auto -webkit-focus-ring-color;\n}\n\nfieldset {\n  margin: 0;\n  padding: 0;\n}\n\nol,\nul {\n  margin: 0;\n}\n\n/**\n * Suppress the focus outline on elements that cannot be accessed via keyboard.\n * This prevents an unwanted focus outline from appearing around elements that\n * might still respond to pointer events.\n */\n\n[tabindex=\"-1\"]:focus {\n  outline: none !important;\n}\n\n/**\n * Tailwind custom reset styles\n */\n\n/**\n * Allow adding a border to an element by just adding a border-width.\n *\n * By default, the way the browser specifies that an element should have no\n * border is by setting it's border-style to `none` in the user-agent\n * stylesheet.\n *\n * In order to easily add borders to elements by just setting the `border-width`\n * property, we change the default border-style for all elements to `solid`, and\n * use border-width to hide them instead. This way our `border` utilities only\n * need to set the `border-width` property instead of the entire `border`\n * shorthand, making our border utilities much more straightforward to compose.\n *\n * https://github.com/tailwindcss/tailwindcss/pull/116\n */\n\n*,\n*::before,\n*::after {\n  border-width: 0;\n  border-style: solid;\n  border-color: #dae1e7;\n}\n\n/**\n * Undo the `border-style: none` reset that Normalize applies to images so that\n * our `border-{width}` utilities have the expected effect.\n *\n * The Normalize reset is unnecessary for us since we default the border-width\n * to 0 on all elements.\n *\n * https://github.com/tailwindcss/tailwindcss/issues/362\n */\n\nimg {\n  border-style: solid;\n}\n\n/**\n * Temporary reset for a change introduced in Chrome 62 but now reverted.\n *\n * We can remove this when the reversion is in a normal Chrome release.\n */\n\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  border-radius: 0;\n}\n\ntextarea {\n  resize: vertical;\n}\n\nimg {\n  max-width: 100%;\n}\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit;\n}\n\ninput::-webkit-input-placeholder,\ntextarea::-webkit-input-placeholder {\n  color: inherit;\n  opacity: .5;\n}\n\ninput:-ms-input-placeholder,\ntextarea:-ms-input-placeholder {\n  color: inherit;\n  opacity: .5;\n}\n\ninput::-ms-input-placeholder,\ntextarea::-ms-input-placeholder {\n  color: inherit;\n  opacity: .5;\n}\n\ninput::placeholder,\ntextarea::placeholder {\n  color: inherit;\n  opacity: .5;\n}\n\nbutton,\n[role=button] {\n  cursor: pointer;\n}\n\n.container {\n  width: 100%;\n}\n\n@media (min-width: 576px) {\n  .container {\n    max-width: 576px;\n  }\n}\n\n@media (min-width: 768px) {\n  .container {\n    max-width: 768px;\n  }\n}\n\n@media (min-width: 992px) {\n  .container {\n    max-width: 992px;\n  }\n}\n\n@media (min-width: 1200px) {\n  .container {\n    max-width: 1200px;\n  }\n}\n\n.list-reset {\n  list-style: none;\n  padding: 0;\n}\n\n.appearance-none {\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n}\n\n.bg-fixed {\n  background-attachment: fixed;\n}\n\n.bg-local {\n  background-attachment: local;\n}\n\n.bg-scroll {\n  background-attachment: scroll;\n}\n\n.bg-transparent {\n  background-color: transparent;\n}\n\n.bg-black {\n  background-color: #22292f;\n}\n\n.bg-grey-darkest {\n  background-color: #3d4852;\n}\n\n.bg-grey-darker {\n  background-color: #606f7b;\n}\n\n.bg-grey-dark {\n  background-color: #8795a1;\n}\n\n.bg-grey {\n  background-color: #b8c2cc;\n}\n\n.bg-grey-light {\n  background-color: #dae1e7;\n}\n\n.bg-grey-lighter {\n  background-color: #f1f5f8;\n}\n\n.bg-grey-lightest {\n  background-color: #f8fafc;\n}\n\n.bg-white {\n  background-color: #fff;\n}\n\n.bg-red-darkest {\n  background-color: #3b0d0c;\n}\n\n.bg-red-darker {\n  background-color: #621b18;\n}\n\n.bg-red-dark {\n  background-color: #cc1f1a;\n}\n\n.bg-red {\n  background-color: #e3342f;\n}\n\n.bg-red-light {\n  background-color: #ef5753;\n}\n\n.bg-red-lighter {\n  background-color: #f9acaa;\n}\n\n.bg-red-lightest {\n  background-color: #fcebea;\n}\n\n.bg-orange-darkest {\n  background-color: #462a16;\n}\n\n.bg-orange-darker {\n  background-color: #613b1f;\n}\n\n.bg-orange-dark {\n  background-color: #de751f;\n}\n\n.bg-orange {\n  background-color: #f6993f;\n}\n\n.bg-orange-light {\n  background-color: #faad63;\n}\n\n.bg-orange-lighter {\n  background-color: #fcd9b6;\n}\n\n.bg-orange-lightest {\n  background-color: #fff5eb;\n}\n\n.bg-yellow-darkest {\n  background-color: #453411;\n}\n\n.bg-yellow-darker {\n  background-color: #684f1d;\n}\n\n.bg-yellow-dark {\n  background-color: #f2d024;\n}\n\n.bg-yellow {\n  background-color: #ffed4a;\n}\n\n.bg-yellow-light {\n  background-color: #fff382;\n}\n\n.bg-yellow-lighter {\n  background-color: #fff9c2;\n}\n\n.bg-yellow-lightest {\n  background-color: #fcfbeb;\n}\n\n.bg-green-darkest {\n  background-color: #0f2f21;\n}\n\n.bg-green-darker {\n  background-color: #1a4731;\n}\n\n.bg-green-dark {\n  background-color: #1f9d55;\n}\n\n.bg-green {\n  background-color: #38c172;\n}\n\n.bg-green-light {\n  background-color: #51d88a;\n}\n\n.bg-green-lighter {\n  background-color: #a2f5bf;\n}\n\n.bg-green-lightest {\n  background-color: #e3fcec;\n}\n\n.bg-teal-darkest {\n  background-color: #0d3331;\n}\n\n.bg-teal-darker {\n  background-color: #20504f;\n}\n\n.bg-teal-dark {\n  background-color: #38a89d;\n}\n\n.bg-teal {\n  background-color: #4dc0b5;\n}\n\n.bg-teal-light {\n  background-color: #64d5ca;\n}\n\n.bg-teal-lighter {\n  background-color: #a0f0ed;\n}\n\n.bg-teal-lightest {\n  background-color: #e8fffe;\n}\n\n.bg-blue-darkest {\n  background-color: #12283a;\n}\n\n.bg-blue-darker {\n  background-color: #1c3d5a;\n}\n\n.bg-blue-dark {\n  background-color: #2779bd;\n}\n\n.bg-blue {\n  background-color: #3490dc;\n}\n\n.bg-blue-light {\n  background-color: #6cb2eb;\n}\n\n.bg-blue-lighter {\n  background-color: #bcdefa;\n}\n\n.bg-blue-lightest {\n  background-color: #eff8ff;\n}\n\n.bg-indigo-darkest {\n  background-color: #191e38;\n}\n\n.bg-indigo-darker {\n  background-color: #2f365f;\n}\n\n.bg-indigo-dark {\n  background-color: #5661b3;\n}\n\n.bg-indigo {\n  background-color: #6574cd;\n}\n\n.bg-indigo-light {\n  background-color: #7886d7;\n}\n\n.bg-indigo-lighter {\n  background-color: #b2b7ff;\n}\n\n.bg-indigo-lightest {\n  background-color: #e6e8ff;\n}\n\n.bg-purple-darkest {\n  background-color: #21183c;\n}\n\n.bg-purple-darker {\n  background-color: #382b5f;\n}\n\n.bg-purple-dark {\n  background-color: #794acf;\n}\n\n.bg-purple {\n  background-color: #9561e2;\n}\n\n.bg-purple-light {\n  background-color: #a779e9;\n}\n\n.bg-purple-lighter {\n  background-color: #d6bbfc;\n}\n\n.bg-purple-lightest {\n  background-color: #f3ebff;\n}\n\n.bg-pink-darkest {\n  background-color: #451225;\n}\n\n.bg-pink-darker {\n  background-color: #6f213f;\n}\n\n.bg-pink-dark {\n  background-color: #eb5286;\n}\n\n.bg-pink {\n  background-color: #f66d9b;\n}\n\n.bg-pink-light {\n  background-color: #fa7ea8;\n}\n\n.bg-pink-lighter {\n  background-color: #ffbbca;\n}\n\n.bg-pink-lightest {\n  background-color: #ffebef;\n}\n\n.hover\\:bg-transparent:hover {\n  background-color: transparent;\n}\n\n.hover\\:bg-black:hover {\n  background-color: #22292f;\n}\n\n.hover\\:bg-grey-darkest:hover {\n  background-color: #3d4852;\n}\n\n.hover\\:bg-grey-darker:hover {\n  background-color: #606f7b;\n}\n\n.hover\\:bg-grey-dark:hover {\n  background-color: #8795a1;\n}\n\n.hover\\:bg-grey:hover {\n  background-color: #b8c2cc;\n}\n\n.hover\\:bg-grey-light:hover {\n  background-color: #dae1e7;\n}\n\n.hover\\:bg-grey-lighter:hover {\n  background-color: #f1f5f8;\n}\n\n.hover\\:bg-grey-lightest:hover {\n  background-color: #f8fafc;\n}\n\n.hover\\:bg-white:hover {\n  background-color: #fff;\n}\n\n.hover\\:bg-red-darkest:hover {\n  background-color: #3b0d0c;\n}\n\n.hover\\:bg-red-darker:hover {\n  background-color: #621b18;\n}\n\n.hover\\:bg-red-dark:hover {\n  background-color: #cc1f1a;\n}\n\n.hover\\:bg-red:hover {\n  background-color: #e3342f;\n}\n\n.hover\\:bg-red-light:hover {\n  background-color: #ef5753;\n}\n\n.hover\\:bg-red-lighter:hover {\n  background-color: #f9acaa;\n}\n\n.hover\\:bg-red-lightest:hover {\n  background-color: #fcebea;\n}\n\n.hover\\:bg-orange-darkest:hover {\n  background-color: #462a16;\n}\n\n.hover\\:bg-orange-darker:hover {\n  background-color: #613b1f;\n}\n\n.hover\\:bg-orange-dark:hover {\n  background-color: #de751f;\n}\n\n.hover\\:bg-orange:hover {\n  background-color: #f6993f;\n}\n\n.hover\\:bg-orange-light:hover {\n  background-color: #faad63;\n}\n\n.hover\\:bg-orange-lighter:hover {\n  background-color: #fcd9b6;\n}\n\n.hover\\:bg-orange-lightest:hover {\n  background-color: #fff5eb;\n}\n\n.hover\\:bg-yellow-darkest:hover {\n  background-color: #453411;\n}\n\n.hover\\:bg-yellow-darker:hover {\n  background-color: #684f1d;\n}\n\n.hover\\:bg-yellow-dark:hover {\n  background-color: #f2d024;\n}\n\n.hover\\:bg-yellow:hover {\n  background-color: #ffed4a;\n}\n\n.hover\\:bg-yellow-light:hover {\n  background-color: #fff382;\n}\n\n.hover\\:bg-yellow-lighter:hover {\n  background-color: #fff9c2;\n}\n\n.hover\\:bg-yellow-lightest:hover {\n  background-color: #fcfbeb;\n}\n\n.hover\\:bg-green-darkest:hover {\n  background-color: #0f2f21;\n}\n\n.hover\\:bg-green-darker:hover {\n  background-color: #1a4731;\n}\n\n.hover\\:bg-green-dark:hover {\n  background-color: #1f9d55;\n}\n\n.hover\\:bg-green:hover {\n  background-color: #38c172;\n}\n\n.hover\\:bg-green-light:hover {\n  background-color: #51d88a;\n}\n\n.hover\\:bg-green-lighter:hover {\n  background-color: #a2f5bf;\n}\n\n.hover\\:bg-green-lightest:hover {\n  background-color: #e3fcec;\n}\n\n.hover\\:bg-teal-darkest:hover {\n  background-color: #0d3331;\n}\n\n.hover\\:bg-teal-darker:hover {\n  background-color: #20504f;\n}\n\n.hover\\:bg-teal-dark:hover {\n  background-color: #38a89d;\n}\n\n.hover\\:bg-teal:hover {\n  background-color: #4dc0b5;\n}\n\n.hover\\:bg-teal-light:hover {\n  background-color: #64d5ca;\n}\n\n.hover\\:bg-teal-lighter:hover {\n  background-color: #a0f0ed;\n}\n\n.hover\\:bg-teal-lightest:hover {\n  background-color: #e8fffe;\n}\n\n.hover\\:bg-blue-darkest:hover {\n  background-color: #12283a;\n}\n\n.hover\\:bg-blue-darker:hover {\n  background-color: #1c3d5a;\n}\n\n.hover\\:bg-blue-dark:hover {\n  background-color: #2779bd;\n}\n\n.hover\\:bg-blue:hover {\n  background-color: #3490dc;\n}\n\n.hover\\:bg-blue-light:hover {\n  background-color: #6cb2eb;\n}\n\n.hover\\:bg-blue-lighter:hover {\n  background-color: #bcdefa;\n}\n\n.hover\\:bg-blue-lightest:hover {\n  background-color: #eff8ff;\n}\n\n.hover\\:bg-indigo-darkest:hover {\n  background-color: #191e38;\n}\n\n.hover\\:bg-indigo-darker:hover {\n  background-color: #2f365f;\n}\n\n.hover\\:bg-indigo-dark:hover {\n  background-color: #5661b3;\n}\n\n.hover\\:bg-indigo:hover {\n  background-color: #6574cd;\n}\n\n.hover\\:bg-indigo-light:hover {\n  background-color: #7886d7;\n}\n\n.hover\\:bg-indigo-lighter:hover {\n  background-color: #b2b7ff;\n}\n\n.hover\\:bg-indigo-lightest:hover {\n  background-color: #e6e8ff;\n}\n\n.hover\\:bg-purple-darkest:hover {\n  background-color: #21183c;\n}\n\n.hover\\:bg-purple-darker:hover {\n  background-color: #382b5f;\n}\n\n.hover\\:bg-purple-dark:hover {\n  background-color: #794acf;\n}\n\n.hover\\:bg-purple:hover {\n  background-color: #9561e2;\n}\n\n.hover\\:bg-purple-light:hover {\n  background-color: #a779e9;\n}\n\n.hover\\:bg-purple-lighter:hover {\n  background-color: #d6bbfc;\n}\n\n.hover\\:bg-purple-lightest:hover {\n  background-color: #f3ebff;\n}\n\n.hover\\:bg-pink-darkest:hover {\n  background-color: #451225;\n}\n\n.hover\\:bg-pink-darker:hover {\n  background-color: #6f213f;\n}\n\n.hover\\:bg-pink-dark:hover {\n  background-color: #eb5286;\n}\n\n.hover\\:bg-pink:hover {\n  background-color: #f66d9b;\n}\n\n.hover\\:bg-pink-light:hover {\n  background-color: #fa7ea8;\n}\n\n.hover\\:bg-pink-lighter:hover {\n  background-color: #ffbbca;\n}\n\n.hover\\:bg-pink-lightest:hover {\n  background-color: #ffebef;\n}\n\n.bg-bottom {\n  background-position: bottom;\n}\n\n.bg-center {\n  background-position: center;\n}\n\n.bg-left {\n  background-position: left;\n}\n\n.bg-left-bottom {\n  background-position: left bottom;\n}\n\n.bg-left-top {\n  background-position: left top;\n}\n\n.bg-right {\n  background-position: right;\n}\n\n.bg-right-bottom {\n  background-position: right bottom;\n}\n\n.bg-right-top {\n  background-position: right top;\n}\n\n.bg-top {\n  background-position: top;\n}\n\n.bg-repeat {\n  background-repeat: repeat;\n}\n\n.bg-no-repeat {\n  background-repeat: no-repeat;\n}\n\n.bg-repeat-x {\n  background-repeat: repeat-x;\n}\n\n.bg-repeat-y {\n  background-repeat: repeat-y;\n}\n\n.bg-auto {\n  background-size: auto;\n}\n\n.bg-cover {\n  background-size: cover;\n}\n\n.bg-contain {\n  background-size: contain;\n}\n\n.border-transparent {\n  border-color: transparent;\n}\n\n.border-black {\n  border-color: #22292f;\n}\n\n.border-grey-darkest {\n  border-color: #3d4852;\n}\n\n.border-grey-darker {\n  border-color: #606f7b;\n}\n\n.border-grey-dark {\n  border-color: #8795a1;\n}\n\n.border-grey {\n  border-color: #b8c2cc;\n}\n\n.border-grey-light {\n  border-color: #dae1e7;\n}\n\n.border-grey-lighter {\n  border-color: #f1f5f8;\n}\n\n.border-grey-lightest {\n  border-color: #f8fafc;\n}\n\n.border-white {\n  border-color: #fff;\n}\n\n.border-red-darkest {\n  border-color: #3b0d0c;\n}\n\n.border-red-darker {\n  border-color: #621b18;\n}\n\n.border-red-dark {\n  border-color: #cc1f1a;\n}\n\n.border-red {\n  border-color: #e3342f;\n}\n\n.border-red-light {\n  border-color: #ef5753;\n}\n\n.border-red-lighter {\n  border-color: #f9acaa;\n}\n\n.border-red-lightest {\n  border-color: #fcebea;\n}\n\n.border-orange-darkest {\n  border-color: #462a16;\n}\n\n.border-orange-darker {\n  border-color: #613b1f;\n}\n\n.border-orange-dark {\n  border-color: #de751f;\n}\n\n.border-orange {\n  border-color: #f6993f;\n}\n\n.border-orange-light {\n  border-color: #faad63;\n}\n\n.border-orange-lighter {\n  border-color: #fcd9b6;\n}\n\n.border-orange-lightest {\n  border-color: #fff5eb;\n}\n\n.border-yellow-darkest {\n  border-color: #453411;\n}\n\n.border-yellow-darker {\n  border-color: #684f1d;\n}\n\n.border-yellow-dark {\n  border-color: #f2d024;\n}\n\n.border-yellow {\n  border-color: #ffed4a;\n}\n\n.border-yellow-light {\n  border-color: #fff382;\n}\n\n.border-yellow-lighter {\n  border-color: #fff9c2;\n}\n\n.border-yellow-lightest {\n  border-color: #fcfbeb;\n}\n\n.border-green-darkest {\n  border-color: #0f2f21;\n}\n\n.border-green-darker {\n  border-color: #1a4731;\n}\n\n.border-green-dark {\n  border-color: #1f9d55;\n}\n\n.border-green {\n  border-color: #38c172;\n}\n\n.border-green-light {\n  border-color: #51d88a;\n}\n\n.border-green-lighter {\n  border-color: #a2f5bf;\n}\n\n.border-green-lightest {\n  border-color: #e3fcec;\n}\n\n.border-teal-darkest {\n  border-color: #0d3331;\n}\n\n.border-teal-darker {\n  border-color: #20504f;\n}\n\n.border-teal-dark {\n  border-color: #38a89d;\n}\n\n.border-teal {\n  border-color: #4dc0b5;\n}\n\n.border-teal-light {\n  border-color: #64d5ca;\n}\n\n.border-teal-lighter {\n  border-color: #a0f0ed;\n}\n\n.border-teal-lightest {\n  border-color: #e8fffe;\n}\n\n.border-blue-darkest {\n  border-color: #12283a;\n}\n\n.border-blue-darker {\n  border-color: #1c3d5a;\n}\n\n.border-blue-dark {\n  border-color: #2779bd;\n}\n\n.border-blue {\n  border-color: #3490dc;\n}\n\n.border-blue-light {\n  border-color: #6cb2eb;\n}\n\n.border-blue-lighter {\n  border-color: #bcdefa;\n}\n\n.border-blue-lightest {\n  border-color: #eff8ff;\n}\n\n.border-indigo-darkest {\n  border-color: #191e38;\n}\n\n.border-indigo-darker {\n  border-color: #2f365f;\n}\n\n.border-indigo-dark {\n  border-color: #5661b3;\n}\n\n.border-indigo {\n  border-color: #6574cd;\n}\n\n.border-indigo-light {\n  border-color: #7886d7;\n}\n\n.border-indigo-lighter {\n  border-color: #b2b7ff;\n}\n\n.border-indigo-lightest {\n  border-color: #e6e8ff;\n}\n\n.border-purple-darkest {\n  border-color: #21183c;\n}\n\n.border-purple-darker {\n  border-color: #382b5f;\n}\n\n.border-purple-dark {\n  border-color: #794acf;\n}\n\n.border-purple {\n  border-color: #9561e2;\n}\n\n.border-purple-light {\n  border-color: #a779e9;\n}\n\n.border-purple-lighter {\n  border-color: #d6bbfc;\n}\n\n.border-purple-lightest {\n  border-color: #f3ebff;\n}\n\n.border-pink-darkest {\n  border-color: #451225;\n}\n\n.border-pink-darker {\n  border-color: #6f213f;\n}\n\n.border-pink-dark {\n  border-color: #eb5286;\n}\n\n.border-pink {\n  border-color: #f66d9b;\n}\n\n.border-pink-light {\n  border-color: #fa7ea8;\n}\n\n.border-pink-lighter {\n  border-color: #ffbbca;\n}\n\n.border-pink-lightest {\n  border-color: #ffebef;\n}\n\n.hover\\:border-transparent:hover {\n  border-color: transparent;\n}\n\n.hover\\:border-black:hover {\n  border-color: #22292f;\n}\n\n.hover\\:border-grey-darkest:hover {\n  border-color: #3d4852;\n}\n\n.hover\\:border-grey-darker:hover {\n  border-color: #606f7b;\n}\n\n.hover\\:border-grey-dark:hover {\n  border-color: #8795a1;\n}\n\n.hover\\:border-grey:hover {\n  border-color: #b8c2cc;\n}\n\n.hover\\:border-grey-light:hover {\n  border-color: #dae1e7;\n}\n\n.hover\\:border-grey-lighter:hover {\n  border-color: #f1f5f8;\n}\n\n.hover\\:border-grey-lightest:hover {\n  border-color: #f8fafc;\n}\n\n.hover\\:border-white:hover {\n  border-color: #fff;\n}\n\n.hover\\:border-red-darkest:hover {\n  border-color: #3b0d0c;\n}\n\n.hover\\:border-red-darker:hover {\n  border-color: #621b18;\n}\n\n.hover\\:border-red-dark:hover {\n  border-color: #cc1f1a;\n}\n\n.hover\\:border-red:hover {\n  border-color: #e3342f;\n}\n\n.hover\\:border-red-light:hover {\n  border-color: #ef5753;\n}\n\n.hover\\:border-red-lighter:hover {\n  border-color: #f9acaa;\n}\n\n.hover\\:border-red-lightest:hover {\n  border-color: #fcebea;\n}\n\n.hover\\:border-orange-darkest:hover {\n  border-color: #462a16;\n}\n\n.hover\\:border-orange-darker:hover {\n  border-color: #613b1f;\n}\n\n.hover\\:border-orange-dark:hover {\n  border-color: #de751f;\n}\n\n.hover\\:border-orange:hover {\n  border-color: #f6993f;\n}\n\n.hover\\:border-orange-light:hover {\n  border-color: #faad63;\n}\n\n.hover\\:border-orange-lighter:hover {\n  border-color: #fcd9b6;\n}\n\n.hover\\:border-orange-lightest:hover {\n  border-color: #fff5eb;\n}\n\n.hover\\:border-yellow-darkest:hover {\n  border-color: #453411;\n}\n\n.hover\\:border-yellow-darker:hover {\n  border-color: #684f1d;\n}\n\n.hover\\:border-yellow-dark:hover {\n  border-color: #f2d024;\n}\n\n.hover\\:border-yellow:hover {\n  border-color: #ffed4a;\n}\n\n.hover\\:border-yellow-light:hover {\n  border-color: #fff382;\n}\n\n.hover\\:border-yellow-lighter:hover {\n  border-color: #fff9c2;\n}\n\n.hover\\:border-yellow-lightest:hover {\n  border-color: #fcfbeb;\n}\n\n.hover\\:border-green-darkest:hover {\n  border-color: #0f2f21;\n}\n\n.hover\\:border-green-darker:hover {\n  border-color: #1a4731;\n}\n\n.hover\\:border-green-dark:hover {\n  border-color: #1f9d55;\n}\n\n.hover\\:border-green:hover {\n  border-color: #38c172;\n}\n\n.hover\\:border-green-light:hover {\n  border-color: #51d88a;\n}\n\n.hover\\:border-green-lighter:hover {\n  border-color: #a2f5bf;\n}\n\n.hover\\:border-green-lightest:hover {\n  border-color: #e3fcec;\n}\n\n.hover\\:border-teal-darkest:hover {\n  border-color: #0d3331;\n}\n\n.hover\\:border-teal-darker:hover {\n  border-color: #20504f;\n}\n\n.hover\\:border-teal-dark:hover {\n  border-color: #38a89d;\n}\n\n.hover\\:border-teal:hover {\n  border-color: #4dc0b5;\n}\n\n.hover\\:border-teal-light:hover {\n  border-color: #64d5ca;\n}\n\n.hover\\:border-teal-lighter:hover {\n  border-color: #a0f0ed;\n}\n\n.hover\\:border-teal-lightest:hover {\n  border-color: #e8fffe;\n}\n\n.hover\\:border-blue-darkest:hover {\n  border-color: #12283a;\n}\n\n.hover\\:border-blue-darker:hover {\n  border-color: #1c3d5a;\n}\n\n.hover\\:border-blue-dark:hover {\n  border-color: #2779bd;\n}\n\n.hover\\:border-blue:hover {\n  border-color: #3490dc;\n}\n\n.hover\\:border-blue-light:hover {\n  border-color: #6cb2eb;\n}\n\n.hover\\:border-blue-lighter:hover {\n  border-color: #bcdefa;\n}\n\n.hover\\:border-blue-lightest:hover {\n  border-color: #eff8ff;\n}\n\n.hover\\:border-indigo-darkest:hover {\n  border-color: #191e38;\n}\n\n.hover\\:border-indigo-darker:hover {\n  border-color: #2f365f;\n}\n\n.hover\\:border-indigo-dark:hover {\n  border-color: #5661b3;\n}\n\n.hover\\:border-indigo:hover {\n  border-color: #6574cd;\n}\n\n.hover\\:border-indigo-light:hover {\n  border-color: #7886d7;\n}\n\n.hover\\:border-indigo-lighter:hover {\n  border-color: #b2b7ff;\n}\n\n.hover\\:border-indigo-lightest:hover {\n  border-color: #e6e8ff;\n}\n\n.hover\\:border-purple-darkest:hover {\n  border-color: #21183c;\n}\n\n.hover\\:border-purple-darker:hover {\n  border-color: #382b5f;\n}\n\n.hover\\:border-purple-dark:hover {\n  border-color: #794acf;\n}\n\n.hover\\:border-purple:hover {\n  border-color: #9561e2;\n}\n\n.hover\\:border-purple-light:hover {\n  border-color: #a779e9;\n}\n\n.hover\\:border-purple-lighter:hover {\n  border-color: #d6bbfc;\n}\n\n.hover\\:border-purple-lightest:hover {\n  border-color: #f3ebff;\n}\n\n.hover\\:border-pink-darkest:hover {\n  border-color: #451225;\n}\n\n.hover\\:border-pink-darker:hover {\n  border-color: #6f213f;\n}\n\n.hover\\:border-pink-dark:hover {\n  border-color: #eb5286;\n}\n\n.hover\\:border-pink:hover {\n  border-color: #f66d9b;\n}\n\n.hover\\:border-pink-light:hover {\n  border-color: #fa7ea8;\n}\n\n.hover\\:border-pink-lighter:hover {\n  border-color: #ffbbca;\n}\n\n.hover\\:border-pink-lightest:hover {\n  border-color: #ffebef;\n}\n\n.rounded-none {\n  border-radius: 0;\n}\n\n.rounded-sm {\n  border-radius: .125rem;\n}\n\n.rounded {\n  border-radius: .25rem;\n}\n\n.rounded-lg {\n  border-radius: .5rem;\n}\n\n.rounded-full {\n  border-radius: 9999px;\n}\n\n.rounded-t-none {\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n}\n\n.rounded-r-none {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n\n.rounded-b-none {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n\n.rounded-l-none {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n\n.rounded-t-sm {\n  border-top-left-radius: .125rem;\n  border-top-right-radius: .125rem;\n}\n\n.rounded-r-sm {\n  border-top-right-radius: .125rem;\n  border-bottom-right-radius: .125rem;\n}\n\n.rounded-b-sm {\n  border-bottom-right-radius: .125rem;\n  border-bottom-left-radius: .125rem;\n}\n\n.rounded-l-sm {\n  border-top-left-radius: .125rem;\n  border-bottom-left-radius: .125rem;\n}\n\n.rounded-t {\n  border-top-left-radius: .25rem;\n  border-top-right-radius: .25rem;\n}\n\n.rounded-r {\n  border-top-right-radius: .25rem;\n  border-bottom-right-radius: .25rem;\n}\n\n.rounded-b {\n  border-bottom-right-radius: .25rem;\n  border-bottom-left-radius: .25rem;\n}\n\n.rounded-l {\n  border-top-left-radius: .25rem;\n  border-bottom-left-radius: .25rem;\n}\n\n.rounded-t-lg {\n  border-top-left-radius: .5rem;\n  border-top-right-radius: .5rem;\n}\n\n.rounded-r-lg {\n  border-top-right-radius: .5rem;\n  border-bottom-right-radius: .5rem;\n}\n\n.rounded-b-lg {\n  border-bottom-right-radius: .5rem;\n  border-bottom-left-radius: .5rem;\n}\n\n.rounded-l-lg {\n  border-top-left-radius: .5rem;\n  border-bottom-left-radius: .5rem;\n}\n\n.rounded-t-full {\n  border-top-left-radius: 9999px;\n  border-top-right-radius: 9999px;\n}\n\n.rounded-r-full {\n  border-top-right-radius: 9999px;\n  border-bottom-right-radius: 9999px;\n}\n\n.rounded-b-full {\n  border-bottom-right-radius: 9999px;\n  border-bottom-left-radius: 9999px;\n}\n\n.rounded-l-full {\n  border-top-left-radius: 9999px;\n  border-bottom-left-radius: 9999px;\n}\n\n.rounded-tl-none {\n  border-top-left-radius: 0;\n}\n\n.rounded-tr-none {\n  border-top-right-radius: 0;\n}\n\n.rounded-br-none {\n  border-bottom-right-radius: 0;\n}\n\n.rounded-bl-none {\n  border-bottom-left-radius: 0;\n}\n\n.rounded-tl-sm {\n  border-top-left-radius: .125rem;\n}\n\n.rounded-tr-sm {\n  border-top-right-radius: .125rem;\n}\n\n.rounded-br-sm {\n  border-bottom-right-radius: .125rem;\n}\n\n.rounded-bl-sm {\n  border-bottom-left-radius: .125rem;\n}\n\n.rounded-tl {\n  border-top-left-radius: .25rem;\n}\n\n.rounded-tr {\n  border-top-right-radius: .25rem;\n}\n\n.rounded-br {\n  border-bottom-right-radius: .25rem;\n}\n\n.rounded-bl {\n  border-bottom-left-radius: .25rem;\n}\n\n.rounded-tl-lg {\n  border-top-left-radius: .5rem;\n}\n\n.rounded-tr-lg {\n  border-top-right-radius: .5rem;\n}\n\n.rounded-br-lg {\n  border-bottom-right-radius: .5rem;\n}\n\n.rounded-bl-lg {\n  border-bottom-left-radius: .5rem;\n}\n\n.rounded-tl-full {\n  border-top-left-radius: 9999px;\n}\n\n.rounded-tr-full {\n  border-top-right-radius: 9999px;\n}\n\n.rounded-br-full {\n  border-bottom-right-radius: 9999px;\n}\n\n.rounded-bl-full {\n  border-bottom-left-radius: 9999px;\n}\n\n.border-solid {\n  border-style: solid;\n}\n\n.border-dashed {\n  border-style: dashed;\n}\n\n.border-dotted {\n  border-style: dotted;\n}\n\n.border-none {\n  border-style: none;\n}\n\n.border-0 {\n  border-width: 0;\n}\n\n.border-2 {\n  border-width: 2px;\n}\n\n.border-4 {\n  border-width: 4px;\n}\n\n.border-8 {\n  border-width: 8px;\n}\n\n.border {\n  border-width: 1px;\n}\n\n.border-t-0 {\n  border-top-width: 0;\n}\n\n.border-r-0 {\n  border-right-width: 0;\n}\n\n.border-b-0 {\n  border-bottom-width: 0;\n}\n\n.border-l-0 {\n  border-left-width: 0;\n}\n\n.border-t-2 {\n  border-top-width: 2px;\n}\n\n.border-r-2 {\n  border-right-width: 2px;\n}\n\n.border-b-2 {\n  border-bottom-width: 2px;\n}\n\n.border-l-2 {\n  border-left-width: 2px;\n}\n\n.border-t-4 {\n  border-top-width: 4px;\n}\n\n.border-r-4 {\n  border-right-width: 4px;\n}\n\n.border-b-4 {\n  border-bottom-width: 4px;\n}\n\n.border-l-4 {\n  border-left-width: 4px;\n}\n\n.border-t-8 {\n  border-top-width: 8px;\n}\n\n.border-r-8 {\n  border-right-width: 8px;\n}\n\n.border-b-8 {\n  border-bottom-width: 8px;\n}\n\n.border-l-8 {\n  border-left-width: 8px;\n}\n\n.border-t {\n  border-top-width: 1px;\n}\n\n.border-r {\n  border-right-width: 1px;\n}\n\n.border-b {\n  border-bottom-width: 1px;\n}\n\n.border-l {\n  border-left-width: 1px;\n}\n\n.cursor-auto {\n  cursor: auto;\n}\n\n.cursor-default {\n  cursor: default;\n}\n\n.cursor-pointer {\n  cursor: pointer;\n}\n\n.cursor-wait {\n  cursor: wait;\n}\n\n.cursor-move {\n  cursor: move;\n}\n\n.cursor-not-allowed {\n  cursor: not-allowed;\n}\n\n.block {\n  display: block;\n}\n\n.inline-block {\n  display: inline-block;\n}\n\n.inline {\n  display: inline;\n}\n\n.table {\n  display: table;\n}\n\n.table-row {\n  display: table-row;\n}\n\n.table-cell {\n  display: table-cell;\n}\n\n.hidden {\n  display: none;\n}\n\n.flex {\n  display: flex;\n}\n\n.inline-flex {\n  display: inline-flex;\n}\n\n.flex-row {\n  flex-direction: row;\n}\n\n.flex-row-reverse {\n  flex-direction: row-reverse;\n}\n\n.flex-col {\n  flex-direction: column;\n}\n\n.flex-col-reverse {\n  flex-direction: column-reverse;\n}\n\n.flex-wrap {\n  flex-wrap: wrap;\n}\n\n.flex-wrap-reverse {\n  flex-wrap: wrap-reverse;\n}\n\n.flex-no-wrap {\n  flex-wrap: nowrap;\n}\n\n.items-start {\n  align-items: flex-start;\n}\n\n.items-end {\n  align-items: flex-end;\n}\n\n.items-center {\n  align-items: center;\n}\n\n.items-baseline {\n  align-items: baseline;\n}\n\n.items-stretch {\n  align-items: stretch;\n}\n\n.self-auto {\n  align-self: auto;\n}\n\n.self-start {\n  align-self: flex-start;\n}\n\n.self-end {\n  align-self: flex-end;\n}\n\n.self-center {\n  align-self: center;\n}\n\n.self-stretch {\n  align-self: stretch;\n}\n\n.justify-start {\n  justify-content: flex-start;\n}\n\n.justify-end {\n  justify-content: flex-end;\n}\n\n.justify-center {\n  justify-content: center;\n}\n\n.justify-between {\n  justify-content: space-between;\n}\n\n.justify-around {\n  justify-content: space-around;\n}\n\n.content-center {\n  align-content: center;\n}\n\n.content-start {\n  align-content: flex-start;\n}\n\n.content-end {\n  align-content: flex-end;\n}\n\n.content-between {\n  align-content: space-between;\n}\n\n.content-around {\n  align-content: space-around;\n}\n\n.flex-1 {\n  flex: 1;\n}\n\n.flex-auto {\n  flex: auto;\n}\n\n.flex-initial {\n  flex: initial;\n}\n\n.flex-none {\n  flex: none;\n}\n\n.flex-grow {\n  flex-grow: 1;\n}\n\n.flex-shrink {\n  flex-shrink: 1;\n}\n\n.flex-no-grow {\n  flex-grow: 0;\n}\n\n.flex-no-shrink {\n  flex-shrink: 0;\n}\n\n.float-right {\n  float: right;\n}\n\n.float-left {\n  float: left;\n}\n\n.float-none {\n  float: none;\n}\n\n.clearfix:after {\n  content: \"\";\n  display: table;\n  clear: both;\n}\n\n.font-sans {\n  font-family: system-ui, BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;\n}\n\n.font-serif {\n  font-family: Constantia, Lucida Bright, Lucidabright, Lucida Serif, Lucida, DejaVu Serif, Bitstream Vera Serif, Liberation Serif, Georgia, serif;\n}\n\n.font-mono {\n  font-family: Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;\n}\n\n.font-hairline {\n  font-weight: 100;\n}\n\n.font-thin {\n  font-weight: 200;\n}\n\n.font-light {\n  font-weight: 300;\n}\n\n.font-normal {\n  font-weight: 400;\n}\n\n.font-medium {\n  font-weight: 500;\n}\n\n.font-semibold {\n  font-weight: 600;\n}\n\n.font-bold {\n  font-weight: 700;\n}\n\n.font-extrabold {\n  font-weight: 800;\n}\n\n.font-black {\n  font-weight: 900;\n}\n\n.hover\\:font-hairline:hover {\n  font-weight: 100;\n}\n\n.hover\\:font-thin:hover {\n  font-weight: 200;\n}\n\n.hover\\:font-light:hover {\n  font-weight: 300;\n}\n\n.hover\\:font-normal:hover {\n  font-weight: 400;\n}\n\n.hover\\:font-medium:hover {\n  font-weight: 500;\n}\n\n.hover\\:font-semibold:hover {\n  font-weight: 600;\n}\n\n.hover\\:font-bold:hover {\n  font-weight: 700;\n}\n\n.hover\\:font-extrabold:hover {\n  font-weight: 800;\n}\n\n.hover\\:font-black:hover {\n  font-weight: 900;\n}\n\n.h-1 {\n  height: .25rem;\n}\n\n.h-2 {\n  height: .5rem;\n}\n\n.h-3 {\n  height: .75rem;\n}\n\n.h-4 {\n  height: 1rem;\n}\n\n.h-6 {\n  height: 1.5rem;\n}\n\n.h-8 {\n  height: 2rem;\n}\n\n.h-10 {\n  height: 2.5rem;\n}\n\n.h-12 {\n  height: 3rem;\n}\n\n.h-16 {\n  height: 4rem;\n}\n\n.h-24 {\n  height: 6rem;\n}\n\n.h-32 {\n  height: 8rem;\n}\n\n.h-48 {\n  height: 12rem;\n}\n\n.h-64 {\n  height: 16rem;\n}\n\n.h-auto {\n  height: auto;\n}\n\n.h-px {\n  height: 1px;\n}\n\n.h-full {\n  height: 100%;\n}\n\n.h-screen {\n  height: 100vh;\n}\n\n.leading-none {\n  line-height: 1;\n}\n\n.leading-tight {\n  line-height: 1.25;\n}\n\n.leading-normal {\n  line-height: 1.5;\n}\n\n.leading-loose {\n  line-height: 2;\n}\n\n.m-0 {\n  margin: 0;\n}\n\n.m-1 {\n  margin: .25rem;\n}\n\n.m-2 {\n  margin: .5rem;\n}\n\n.m-3 {\n  margin: .75rem;\n}\n\n.m-4 {\n  margin: 1rem;\n}\n\n.m-6 {\n  margin: 1.5rem;\n}\n\n.m-8 {\n  margin: 2rem;\n}\n\n.m-auto {\n  margin: auto;\n}\n\n.m-px {\n  margin: 1px;\n}\n\n.my-0 {\n  margin-top: 0;\n  margin-bottom: 0;\n}\n\n.mx-0 {\n  margin-left: 0;\n  margin-right: 0;\n}\n\n.my-1 {\n  margin-top: .25rem;\n  margin-bottom: .25rem;\n}\n\n.mx-1 {\n  margin-left: .25rem;\n  margin-right: .25rem;\n}\n\n.my-2 {\n  margin-top: .5rem;\n  margin-bottom: .5rem;\n}\n\n.mx-2 {\n  margin-left: .5rem;\n  margin-right: .5rem;\n}\n\n.my-3 {\n  margin-top: .75rem;\n  margin-bottom: .75rem;\n}\n\n.mx-3 {\n  margin-left: .75rem;\n  margin-right: .75rem;\n}\n\n.my-4 {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n}\n\n.mx-4 {\n  margin-left: 1rem;\n  margin-right: 1rem;\n}\n\n.my-6 {\n  margin-top: 1.5rem;\n  margin-bottom: 1.5rem;\n}\n\n.mx-6 {\n  margin-left: 1.5rem;\n  margin-right: 1.5rem;\n}\n\n.my-8 {\n  margin-top: 2rem;\n  margin-bottom: 2rem;\n}\n\n.mx-8 {\n  margin-left: 2rem;\n  margin-right: 2rem;\n}\n\n.my-auto {\n  margin-top: auto;\n  margin-bottom: auto;\n}\n\n.mx-auto {\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.my-px {\n  margin-top: 1px;\n  margin-bottom: 1px;\n}\n\n.mx-px {\n  margin-left: 1px;\n  margin-right: 1px;\n}\n\n.mt-0 {\n  margin-top: 0;\n}\n\n.mr-0 {\n  margin-right: 0;\n}\n\n.mb-0 {\n  margin-bottom: 0;\n}\n\n.ml-0 {\n  margin-left: 0;\n}\n\n.mt-1 {\n  margin-top: .25rem;\n}\n\n.mr-1 {\n  margin-right: .25rem;\n}\n\n.mb-1 {\n  margin-bottom: .25rem;\n}\n\n.ml-1 {\n  margin-left: .25rem;\n}\n\n.mt-2 {\n  margin-top: .5rem;\n}\n\n.mr-2 {\n  margin-right: .5rem;\n}\n\n.mb-2 {\n  margin-bottom: .5rem;\n}\n\n.ml-2 {\n  margin-left: .5rem;\n}\n\n.mt-3 {\n  margin-top: .75rem;\n}\n\n.mr-3 {\n  margin-right: .75rem;\n}\n\n.mb-3 {\n  margin-bottom: .75rem;\n}\n\n.ml-3 {\n  margin-left: .75rem;\n}\n\n.mt-4 {\n  margin-top: 1rem;\n}\n\n.mr-4 {\n  margin-right: 1rem;\n}\n\n.mb-4 {\n  margin-bottom: 1rem;\n}\n\n.ml-4 {\n  margin-left: 1rem;\n}\n\n.mt-6 {\n  margin-top: 1.5rem;\n}\n\n.mr-6 {\n  margin-right: 1.5rem;\n}\n\n.mb-6 {\n  margin-bottom: 1.5rem;\n}\n\n.ml-6 {\n  margin-left: 1.5rem;\n}\n\n.mt-8 {\n  margin-top: 2rem;\n}\n\n.mr-8 {\n  margin-right: 2rem;\n}\n\n.mb-8 {\n  margin-bottom: 2rem;\n}\n\n.ml-8 {\n  margin-left: 2rem;\n}\n\n.mt-auto {\n  margin-top: auto;\n}\n\n.mr-auto {\n  margin-right: auto;\n}\n\n.mb-auto {\n  margin-bottom: auto;\n}\n\n.ml-auto {\n  margin-left: auto;\n}\n\n.mt-px {\n  margin-top: 1px;\n}\n\n.mr-px {\n  margin-right: 1px;\n}\n\n.mb-px {\n  margin-bottom: 1px;\n}\n\n.ml-px {\n  margin-left: 1px;\n}\n\n.max-h-full {\n  max-height: 100%;\n}\n\n.max-h-screen {\n  max-height: 100vh;\n}\n\n.max-w-xs {\n  max-width: 20rem;\n}\n\n.max-w-sm {\n  max-width: 30rem;\n}\n\n.max-w-md {\n  max-width: 40rem;\n}\n\n.max-w-lg {\n  max-width: 50rem;\n}\n\n.max-w-xl {\n  max-width: 60rem;\n}\n\n.max-w-2xl {\n  max-width: 70rem;\n}\n\n.max-w-3xl {\n  max-width: 80rem;\n}\n\n.max-w-4xl {\n  max-width: 90rem;\n}\n\n.max-w-5xl {\n  max-width: 100rem;\n}\n\n.max-w-full {\n  max-width: 100%;\n}\n\n.min-h-0 {\n  min-height: 0;\n}\n\n.min-h-full {\n  min-height: 100%;\n}\n\n.min-h-screen {\n  min-height: 100vh;\n}\n\n.min-w-0 {\n  min-width: 0;\n}\n\n.min-w-full {\n  min-width: 100%;\n}\n\n.-m-0 {\n  margin: 0;\n}\n\n.-m-1 {\n  margin: -0.25rem;\n}\n\n.-m-2 {\n  margin: -0.5rem;\n}\n\n.-m-3 {\n  margin: -0.75rem;\n}\n\n.-m-4 {\n  margin: -1rem;\n}\n\n.-m-6 {\n  margin: -1.5rem;\n}\n\n.-m-8 {\n  margin: -2rem;\n}\n\n.-m-px {\n  margin: -1px;\n}\n\n.-my-0 {\n  margin-top: 0;\n  margin-bottom: 0;\n}\n\n.-mx-0 {\n  margin-left: 0;\n  margin-right: 0;\n}\n\n.-my-1 {\n  margin-top: -0.25rem;\n  margin-bottom: -0.25rem;\n}\n\n.-mx-1 {\n  margin-left: -0.25rem;\n  margin-right: -0.25rem;\n}\n\n.-my-2 {\n  margin-top: -0.5rem;\n  margin-bottom: -0.5rem;\n}\n\n.-mx-2 {\n  margin-left: -0.5rem;\n  margin-right: -0.5rem;\n}\n\n.-my-3 {\n  margin-top: -0.75rem;\n  margin-bottom: -0.75rem;\n}\n\n.-mx-3 {\n  margin-left: -0.75rem;\n  margin-right: -0.75rem;\n}\n\n.-my-4 {\n  margin-top: -1rem;\n  margin-bottom: -1rem;\n}\n\n.-mx-4 {\n  margin-left: -1rem;\n  margin-right: -1rem;\n}\n\n.-my-6 {\n  margin-top: -1.5rem;\n  margin-bottom: -1.5rem;\n}\n\n.-mx-6 {\n  margin-left: -1.5rem;\n  margin-right: -1.5rem;\n}\n\n.-my-8 {\n  margin-top: -2rem;\n  margin-bottom: -2rem;\n}\n\n.-mx-8 {\n  margin-left: -2rem;\n  margin-right: -2rem;\n}\n\n.-my-px {\n  margin-top: -1px;\n  margin-bottom: -1px;\n}\n\n.-mx-px {\n  margin-left: -1px;\n  margin-right: -1px;\n}\n\n.-mt-0 {\n  margin-top: 0;\n}\n\n.-mr-0 {\n  margin-right: 0;\n}\n\n.-mb-0 {\n  margin-bottom: 0;\n}\n\n.-ml-0 {\n  margin-left: 0;\n}\n\n.-mt-1 {\n  margin-top: -0.25rem;\n}\n\n.-mr-1 {\n  margin-right: -0.25rem;\n}\n\n.-mb-1 {\n  margin-bottom: -0.25rem;\n}\n\n.-ml-1 {\n  margin-left: -0.25rem;\n}\n\n.-mt-2 {\n  margin-top: -0.5rem;\n}\n\n.-mr-2 {\n  margin-right: -0.5rem;\n}\n\n.-mb-2 {\n  margin-bottom: -0.5rem;\n}\n\n.-ml-2 {\n  margin-left: -0.5rem;\n}\n\n.-mt-3 {\n  margin-top: -0.75rem;\n}\n\n.-mr-3 {\n  margin-right: -0.75rem;\n}\n\n.-mb-3 {\n  margin-bottom: -0.75rem;\n}\n\n.-ml-3 {\n  margin-left: -0.75rem;\n}\n\n.-mt-4 {\n  margin-top: -1rem;\n}\n\n.-mr-4 {\n  margin-right: -1rem;\n}\n\n.-mb-4 {\n  margin-bottom: -1rem;\n}\n\n.-ml-4 {\n  margin-left: -1rem;\n}\n\n.-mt-6 {\n  margin-top: -1.5rem;\n}\n\n.-mr-6 {\n  margin-right: -1.5rem;\n}\n\n.-mb-6 {\n  margin-bottom: -1.5rem;\n}\n\n.-ml-6 {\n  margin-left: -1.5rem;\n}\n\n.-mt-8 {\n  margin-top: -2rem;\n}\n\n.-mr-8 {\n  margin-right: -2rem;\n}\n\n.-mb-8 {\n  margin-bottom: -2rem;\n}\n\n.-ml-8 {\n  margin-left: -2rem;\n}\n\n.-mt-px {\n  margin-top: -1px;\n}\n\n.-mr-px {\n  margin-right: -1px;\n}\n\n.-mb-px {\n  margin-bottom: -1px;\n}\n\n.-ml-px {\n  margin-left: -1px;\n}\n\n.opacity-0 {\n  opacity: 0;\n}\n\n.opacity-25 {\n  opacity: .25;\n}\n\n.opacity-50 {\n  opacity: .5;\n}\n\n.opacity-75 {\n  opacity: .75;\n}\n\n.opacity-100 {\n  opacity: 1;\n}\n\n.overflow-auto {\n  overflow: auto;\n}\n\n.overflow-hidden {\n  overflow: hidden;\n}\n\n.overflow-visible {\n  overflow: visible;\n}\n\n.overflow-scroll {\n  overflow: scroll;\n}\n\n.overflow-x-auto {\n  overflow-x: auto;\n}\n\n.overflow-y-auto {\n  overflow-y: auto;\n}\n\n.overflow-x-scroll {\n  overflow-x: scroll;\n}\n\n.overflow-y-scroll {\n  overflow-y: scroll;\n}\n\n.scrolling-touch {\n  -webkit-overflow-scrolling: touch;\n}\n\n.scrolling-auto {\n  -webkit-overflow-scrolling: auto;\n}\n\n.p-0 {\n  padding: 0;\n}\n\n.p-1 {\n  padding: .25rem;\n}\n\n.p-2 {\n  padding: .5rem;\n}\n\n.p-3 {\n  padding: .75rem;\n}\n\n.p-4 {\n  padding: 1rem;\n}\n\n.p-6 {\n  padding: 1.5rem;\n}\n\n.p-8 {\n  padding: 2rem;\n}\n\n.p-px {\n  padding: 1px;\n}\n\n.py-0 {\n  padding-top: 0;\n  padding-bottom: 0;\n}\n\n.px-0 {\n  padding-left: 0;\n  padding-right: 0;\n}\n\n.py-1 {\n  padding-top: .25rem;\n  padding-bottom: .25rem;\n}\n\n.px-1 {\n  padding-left: .25rem;\n  padding-right: .25rem;\n}\n\n.py-2 {\n  padding-top: .5rem;\n  padding-bottom: .5rem;\n}\n\n.px-2 {\n  padding-left: .5rem;\n  padding-right: .5rem;\n}\n\n.py-3 {\n  padding-top: .75rem;\n  padding-bottom: .75rem;\n}\n\n.px-3 {\n  padding-left: .75rem;\n  padding-right: .75rem;\n}\n\n.py-4 {\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n}\n\n.px-4 {\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\n\n.py-6 {\n  padding-top: 1.5rem;\n  padding-bottom: 1.5rem;\n}\n\n.px-6 {\n  padding-left: 1.5rem;\n  padding-right: 1.5rem;\n}\n\n.py-8 {\n  padding-top: 2rem;\n  padding-bottom: 2rem;\n}\n\n.px-8 {\n  padding-left: 2rem;\n  padding-right: 2rem;\n}\n\n.py-px {\n  padding-top: 1px;\n  padding-bottom: 1px;\n}\n\n.px-px {\n  padding-left: 1px;\n  padding-right: 1px;\n}\n\n.pt-0 {\n  padding-top: 0;\n}\n\n.pr-0 {\n  padding-right: 0;\n}\n\n.pb-0 {\n  padding-bottom: 0;\n}\n\n.pl-0 {\n  padding-left: 0;\n}\n\n.pt-1 {\n  padding-top: .25rem;\n}\n\n.pr-1 {\n  padding-right: .25rem;\n}\n\n.pb-1 {\n  padding-bottom: .25rem;\n}\n\n.pl-1 {\n  padding-left: .25rem;\n}\n\n.pt-2 {\n  padding-top: .5rem;\n}\n\n.pr-2 {\n  padding-right: .5rem;\n}\n\n.pb-2 {\n  padding-bottom: .5rem;\n}\n\n.pl-2 {\n  padding-left: .5rem;\n}\n\n.pt-3 {\n  padding-top: .75rem;\n}\n\n.pr-3 {\n  padding-right: .75rem;\n}\n\n.pb-3 {\n  padding-bottom: .75rem;\n}\n\n.pl-3 {\n  padding-left: .75rem;\n}\n\n.pt-4 {\n  padding-top: 1rem;\n}\n\n.pr-4 {\n  padding-right: 1rem;\n}\n\n.pb-4 {\n  padding-bottom: 1rem;\n}\n\n.pl-4 {\n  padding-left: 1rem;\n}\n\n.pt-6 {\n  padding-top: 1.5rem;\n}\n\n.pr-6 {\n  padding-right: 1.5rem;\n}\n\n.pb-6 {\n  padding-bottom: 1.5rem;\n}\n\n.pl-6 {\n  padding-left: 1.5rem;\n}\n\n.pt-8 {\n  padding-top: 2rem;\n}\n\n.pr-8 {\n  padding-right: 2rem;\n}\n\n.pb-8 {\n  padding-bottom: 2rem;\n}\n\n.pl-8 {\n  padding-left: 2rem;\n}\n\n.pt-px {\n  padding-top: 1px;\n}\n\n.pr-px {\n  padding-right: 1px;\n}\n\n.pb-px {\n  padding-bottom: 1px;\n}\n\n.pl-px {\n  padding-left: 1px;\n}\n\n.pointer-events-none {\n  pointer-events: none;\n}\n\n.pointer-events-auto {\n  pointer-events: auto;\n}\n\n.static {\n  position: static;\n}\n\n.fixed {\n  position: fixed;\n}\n\n.absolute {\n  position: absolute;\n}\n\n.relative {\n  position: relative;\n}\n\n.sticky {\n  position: -webkit-sticky;\n  position: sticky;\n}\n\n.pin-none {\n  top: auto;\n  right: auto;\n  bottom: auto;\n  left: auto;\n}\n\n.pin {\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n\n.pin-y {\n  top: 0;\n  bottom: 0;\n}\n\n.pin-x {\n  right: 0;\n  left: 0;\n}\n\n.pin-t {\n  top: 0;\n}\n\n.pin-r {\n  right: 0;\n}\n\n.pin-b {\n  bottom: 0;\n}\n\n.pin-l {\n  left: 0;\n}\n\n.resize-none {\n  resize: none;\n}\n\n.resize-y {\n  resize: vertical;\n}\n\n.resize-x {\n  resize: horizontal;\n}\n\n.resize {\n  resize: both;\n}\n\n.shadow {\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n}\n\n.shadow-md {\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n}\n\n.shadow-lg {\n  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n}\n\n.shadow-inner {\n  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n}\n\n.shadow-none {\n  box-shadow: none;\n}\n\n.fill-current {\n  fill: currentColor;\n}\n\n.stroke-current {\n  stroke: currentColor;\n}\n\n.text-left {\n  text-align: left;\n}\n\n.text-center {\n  text-align: center;\n}\n\n.text-right {\n  text-align: right;\n}\n\n.text-justify {\n  text-align: justify;\n}\n\n.text-transparent {\n  color: transparent;\n}\n\n.text-black {\n  color: #22292f;\n}\n\n.text-grey-darkest {\n  color: #3d4852;\n}\n\n.text-grey-darker {\n  color: #606f7b;\n}\n\n.text-grey-dark {\n  color: #8795a1;\n}\n\n.text-grey {\n  color: #b8c2cc;\n}\n\n.text-grey-light {\n  color: #dae1e7;\n}\n\n.text-grey-lighter {\n  color: #f1f5f8;\n}\n\n.text-grey-lightest {\n  color: #f8fafc;\n}\n\n.text-white {\n  color: #fff;\n}\n\n.text-red-darkest {\n  color: #3b0d0c;\n}\n\n.text-red-darker {\n  color: #621b18;\n}\n\n.text-red-dark {\n  color: #cc1f1a;\n}\n\n.text-red {\n  color: #e3342f;\n}\n\n.text-red-light {\n  color: #ef5753;\n}\n\n.text-red-lighter {\n  color: #f9acaa;\n}\n\n.text-red-lightest {\n  color: #fcebea;\n}\n\n.text-orange-darkest {\n  color: #462a16;\n}\n\n.text-orange-darker {\n  color: #613b1f;\n}\n\n.text-orange-dark {\n  color: #de751f;\n}\n\n.text-orange {\n  color: #f6993f;\n}\n\n.text-orange-light {\n  color: #faad63;\n}\n\n.text-orange-lighter {\n  color: #fcd9b6;\n}\n\n.text-orange-lightest {\n  color: #fff5eb;\n}\n\n.text-yellow-darkest {\n  color: #453411;\n}\n\n.text-yellow-darker {\n  color: #684f1d;\n}\n\n.text-yellow-dark {\n  color: #f2d024;\n}\n\n.text-yellow {\n  color: #ffed4a;\n}\n\n.text-yellow-light {\n  color: #fff382;\n}\n\n.text-yellow-lighter {\n  color: #fff9c2;\n}\n\n.text-yellow-lightest {\n  color: #fcfbeb;\n}\n\n.text-green-darkest {\n  color: #0f2f21;\n}\n\n.text-green-darker {\n  color: #1a4731;\n}\n\n.text-green-dark {\n  color: #1f9d55;\n}\n\n.text-green {\n  color: #38c172;\n}\n\n.text-green-light {\n  color: #51d88a;\n}\n\n.text-green-lighter {\n  color: #a2f5bf;\n}\n\n.text-green-lightest {\n  color: #e3fcec;\n}\n\n.text-teal-darkest {\n  color: #0d3331;\n}\n\n.text-teal-darker {\n  color: #20504f;\n}\n\n.text-teal-dark {\n  color: #38a89d;\n}\n\n.text-teal {\n  color: #4dc0b5;\n}\n\n.text-teal-light {\n  color: #64d5ca;\n}\n\n.text-teal-lighter {\n  color: #a0f0ed;\n}\n\n.text-teal-lightest {\n  color: #e8fffe;\n}\n\n.text-blue-darkest {\n  color: #12283a;\n}\n\n.text-blue-darker {\n  color: #1c3d5a;\n}\n\n.text-blue-dark {\n  color: #2779bd;\n}\n\n.text-blue {\n  color: #3490dc;\n}\n\n.text-blue-light {\n  color: #6cb2eb;\n}\n\n.text-blue-lighter {\n  color: #bcdefa;\n}\n\n.text-blue-lightest {\n  color: #eff8ff;\n}\n\n.text-indigo-darkest {\n  color: #191e38;\n}\n\n.text-indigo-darker {\n  color: #2f365f;\n}\n\n.text-indigo-dark {\n  color: #5661b3;\n}\n\n.text-indigo {\n  color: #6574cd;\n}\n\n.text-indigo-light {\n  color: #7886d7;\n}\n\n.text-indigo-lighter {\n  color: #b2b7ff;\n}\n\n.text-indigo-lightest {\n  color: #e6e8ff;\n}\n\n.text-purple-darkest {\n  color: #21183c;\n}\n\n.text-purple-darker {\n  color: #382b5f;\n}\n\n.text-purple-dark {\n  color: #794acf;\n}\n\n.text-purple {\n  color: #9561e2;\n}\n\n.text-purple-light {\n  color: #a779e9;\n}\n\n.text-purple-lighter {\n  color: #d6bbfc;\n}\n\n.text-purple-lightest {\n  color: #f3ebff;\n}\n\n.text-pink-darkest {\n  color: #451225;\n}\n\n.text-pink-darker {\n  color: #6f213f;\n}\n\n.text-pink-dark {\n  color: #eb5286;\n}\n\n.text-pink {\n  color: #f66d9b;\n}\n\n.text-pink-light {\n  color: #fa7ea8;\n}\n\n.text-pink-lighter {\n  color: #ffbbca;\n}\n\n.text-pink-lightest {\n  color: #ffebef;\n}\n\n.hover\\:text-transparent:hover {\n  color: transparent;\n}\n\n.hover\\:text-black:hover {\n  color: #22292f;\n}\n\n.hover\\:text-grey-darkest:hover {\n  color: #3d4852;\n}\n\n.hover\\:text-grey-darker:hover {\n  color: #606f7b;\n}\n\n.hover\\:text-grey-dark:hover {\n  color: #8795a1;\n}\n\n.hover\\:text-grey:hover {\n  color: #b8c2cc;\n}\n\n.hover\\:text-grey-light:hover {\n  color: #dae1e7;\n}\n\n.hover\\:text-grey-lighter:hover {\n  color: #f1f5f8;\n}\n\n.hover\\:text-grey-lightest:hover {\n  color: #f8fafc;\n}\n\n.hover\\:text-white:hover {\n  color: #fff;\n}\n\n.hover\\:text-red-darkest:hover {\n  color: #3b0d0c;\n}\n\n.hover\\:text-red-darker:hover {\n  color: #621b18;\n}\n\n.hover\\:text-red-dark:hover {\n  color: #cc1f1a;\n}\n\n.hover\\:text-red:hover {\n  color: #e3342f;\n}\n\n.hover\\:text-red-light:hover {\n  color: #ef5753;\n}\n\n.hover\\:text-red-lighter:hover {\n  color: #f9acaa;\n}\n\n.hover\\:text-red-lightest:hover {\n  color: #fcebea;\n}\n\n.hover\\:text-orange-darkest:hover {\n  color: #462a16;\n}\n\n.hover\\:text-orange-darker:hover {\n  color: #613b1f;\n}\n\n.hover\\:text-orange-dark:hover {\n  color: #de751f;\n}\n\n.hover\\:text-orange:hover {\n  color: #f6993f;\n}\n\n.hover\\:text-orange-light:hover {\n  color: #faad63;\n}\n\n.hover\\:text-orange-lighter:hover {\n  color: #fcd9b6;\n}\n\n.hover\\:text-orange-lightest:hover {\n  color: #fff5eb;\n}\n\n.hover\\:text-yellow-darkest:hover {\n  color: #453411;\n}\n\n.hover\\:text-yellow-darker:hover {\n  color: #684f1d;\n}\n\n.hover\\:text-yellow-dark:hover {\n  color: #f2d024;\n}\n\n.hover\\:text-yellow:hover {\n  color: #ffed4a;\n}\n\n.hover\\:text-yellow-light:hover {\n  color: #fff382;\n}\n\n.hover\\:text-yellow-lighter:hover {\n  color: #fff9c2;\n}\n\n.hover\\:text-yellow-lightest:hover {\n  color: #fcfbeb;\n}\n\n.hover\\:text-green-darkest:hover {\n  color: #0f2f21;\n}\n\n.hover\\:text-green-darker:hover {\n  color: #1a4731;\n}\n\n.hover\\:text-green-dark:hover {\n  color: #1f9d55;\n}\n\n.hover\\:text-green:hover {\n  color: #38c172;\n}\n\n.hover\\:text-green-light:hover {\n  color: #51d88a;\n}\n\n.hover\\:text-green-lighter:hover {\n  color: #a2f5bf;\n}\n\n.hover\\:text-green-lightest:hover {\n  color: #e3fcec;\n}\n\n.hover\\:text-teal-darkest:hover {\n  color: #0d3331;\n}\n\n.hover\\:text-teal-darker:hover {\n  color: #20504f;\n}\n\n.hover\\:text-teal-dark:hover {\n  color: #38a89d;\n}\n\n.hover\\:text-teal:hover {\n  color: #4dc0b5;\n}\n\n.hover\\:text-teal-light:hover {\n  color: #64d5ca;\n}\n\n.hover\\:text-teal-lighter:hover {\n  color: #a0f0ed;\n}\n\n.hover\\:text-teal-lightest:hover {\n  color: #e8fffe;\n}\n\n.hover\\:text-blue-darkest:hover {\n  color: #12283a;\n}\n\n.hover\\:text-blue-darker:hover {\n  color: #1c3d5a;\n}\n\n.hover\\:text-blue-dark:hover {\n  color: #2779bd;\n}\n\n.hover\\:text-blue:hover {\n  color: #3490dc;\n}\n\n.hover\\:text-blue-light:hover {\n  color: #6cb2eb;\n}\n\n.hover\\:text-blue-lighter:hover {\n  color: #bcdefa;\n}\n\n.hover\\:text-blue-lightest:hover {\n  color: #eff8ff;\n}\n\n.hover\\:text-indigo-darkest:hover {\n  color: #191e38;\n}\n\n.hover\\:text-indigo-darker:hover {\n  color: #2f365f;\n}\n\n.hover\\:text-indigo-dark:hover {\n  color: #5661b3;\n}\n\n.hover\\:text-indigo:hover {\n  color: #6574cd;\n}\n\n.hover\\:text-indigo-light:hover {\n  color: #7886d7;\n}\n\n.hover\\:text-indigo-lighter:hover {\n  color: #b2b7ff;\n}\n\n.hover\\:text-indigo-lightest:hover {\n  color: #e6e8ff;\n}\n\n.hover\\:text-purple-darkest:hover {\n  color: #21183c;\n}\n\n.hover\\:text-purple-darker:hover {\n  color: #382b5f;\n}\n\n.hover\\:text-purple-dark:hover {\n  color: #794acf;\n}\n\n.hover\\:text-purple:hover {\n  color: #9561e2;\n}\n\n.hover\\:text-purple-light:hover {\n  color: #a779e9;\n}\n\n.hover\\:text-purple-lighter:hover {\n  color: #d6bbfc;\n}\n\n.hover\\:text-purple-lightest:hover {\n  color: #f3ebff;\n}\n\n.hover\\:text-pink-darkest:hover {\n  color: #451225;\n}\n\n.hover\\:text-pink-darker:hover {\n  color: #6f213f;\n}\n\n.hover\\:text-pink-dark:hover {\n  color: #eb5286;\n}\n\n.hover\\:text-pink:hover {\n  color: #f66d9b;\n}\n\n.hover\\:text-pink-light:hover {\n  color: #fa7ea8;\n}\n\n.hover\\:text-pink-lighter:hover {\n  color: #ffbbca;\n}\n\n.hover\\:text-pink-lightest:hover {\n  color: #ffebef;\n}\n\n.text-xs {\n  font-size: .75rem;\n}\n\n.text-sm {\n  font-size: .875rem;\n}\n\n.text-base {\n  font-size: 1rem;\n}\n\n.text-lg {\n  font-size: 1.125rem;\n}\n\n.text-xl {\n  font-size: 1.25rem;\n}\n\n.text-2xl {\n  font-size: 1.5rem;\n}\n\n.text-3xl {\n  font-size: 1.875rem;\n}\n\n.text-4xl {\n  font-size: 2.25rem;\n}\n\n.text-5xl {\n  font-size: 3rem;\n}\n\n.italic {\n  font-style: italic;\n}\n\n.roman {\n  font-style: normal;\n}\n\n.uppercase {\n  text-transform: uppercase;\n}\n\n.lowercase {\n  text-transform: lowercase;\n}\n\n.capitalize {\n  text-transform: capitalize;\n}\n\n.normal-case {\n  text-transform: none;\n}\n\n.underline {\n  text-decoration: underline;\n}\n\n.line-through {\n  text-decoration: line-through;\n}\n\n.no-underline {\n  text-decoration: none;\n}\n\n.antialiased {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.subpixel-antialiased {\n  -webkit-font-smoothing: auto;\n  -moz-osx-font-smoothing: auto;\n}\n\n.hover\\:italic:hover {\n  font-style: italic;\n}\n\n.hover\\:roman:hover {\n  font-style: normal;\n}\n\n.hover\\:uppercase:hover {\n  text-transform: uppercase;\n}\n\n.hover\\:lowercase:hover {\n  text-transform: lowercase;\n}\n\n.hover\\:capitalize:hover {\n  text-transform: capitalize;\n}\n\n.hover\\:normal-case:hover {\n  text-transform: none;\n}\n\n.hover\\:underline:hover {\n  text-decoration: underline;\n}\n\n.hover\\:line-through:hover {\n  text-decoration: line-through;\n}\n\n.hover\\:no-underline:hover {\n  text-decoration: none;\n}\n\n.hover\\:antialiased:hover {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.hover\\:subpixel-antialiased:hover {\n  -webkit-font-smoothing: auto;\n  -moz-osx-font-smoothing: auto;\n}\n\n.tracking-tight {\n  letter-spacing: -0.05em;\n}\n\n.tracking-normal {\n  letter-spacing: 0;\n}\n\n.tracking-wide {\n  letter-spacing: .05em;\n}\n\n.select-none {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.select-text {\n  -webkit-user-select: text;\n     -moz-user-select: text;\n      -ms-user-select: text;\n          user-select: text;\n}\n\n.align-baseline {\n  vertical-align: baseline;\n}\n\n.align-top {\n  vertical-align: top;\n}\n\n.align-middle {\n  vertical-align: middle;\n}\n\n.align-bottom {\n  vertical-align: bottom;\n}\n\n.align-text-top {\n  vertical-align: text-top;\n}\n\n.align-text-bottom {\n  vertical-align: text-bottom;\n}\n\n.visible {\n  visibility: visible;\n}\n\n.invisible {\n  visibility: hidden;\n}\n\n.whitespace-normal {\n  white-space: normal;\n}\n\n.whitespace-no-wrap {\n  white-space: nowrap;\n}\n\n.whitespace-pre {\n  white-space: pre;\n}\n\n.whitespace-pre-line {\n  white-space: pre-line;\n}\n\n.whitespace-pre-wrap {\n  white-space: pre-wrap;\n}\n\n.break-words {\n  word-wrap: break-word;\n}\n\n.break-normal {\n  word-wrap: normal;\n}\n\n.truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.w-1 {\n  width: .25rem;\n}\n\n.w-2 {\n  width: .5rem;\n}\n\n.w-3 {\n  width: .75rem;\n}\n\n.w-4 {\n  width: 1rem;\n}\n\n.w-6 {\n  width: 1.5rem;\n}\n\n.w-8 {\n  width: 2rem;\n}\n\n.w-10 {\n  width: 2.5rem;\n}\n\n.w-12 {\n  width: 3rem;\n}\n\n.w-16 {\n  width: 4rem;\n}\n\n.w-24 {\n  width: 6rem;\n}\n\n.w-32 {\n  width: 8rem;\n}\n\n.w-48 {\n  width: 12rem;\n}\n\n.w-64 {\n  width: 16rem;\n}\n\n.w-auto {\n  width: auto;\n}\n\n.w-px {\n  width: 1px;\n}\n\n.w-1\\/2 {\n  width: 50%;\n}\n\n.w-1\\/3 {\n  width: 33.33333%;\n}\n\n.w-2\\/3 {\n  width: 66.66667%;\n}\n\n.w-1\\/4 {\n  width: 25%;\n}\n\n.w-3\\/4 {\n  width: 75%;\n}\n\n.w-1\\/5 {\n  width: 20%;\n}\n\n.w-2\\/5 {\n  width: 40%;\n}\n\n.w-3\\/5 {\n  width: 60%;\n}\n\n.w-4\\/5 {\n  width: 80%;\n}\n\n.w-1\\/6 {\n  width: 16.66667%;\n}\n\n.w-5\\/6 {\n  width: 83.33333%;\n}\n\n.w-full {\n  width: 100%;\n}\n\n.w-screen {\n  width: 100vw;\n}\n\n.z-0 {\n  z-index: 0;\n}\n\n.z-10 {\n  z-index: 10;\n}\n\n.z-20 {\n  z-index: 20;\n}\n\n.z-30 {\n  z-index: 30;\n}\n\n.z-40 {\n  z-index: 40;\n}\n\n.z-50 {\n  z-index: 50;\n}\n\n.z-auto {\n  z-index: auto;\n}\n\n@media (min-width: 576px) {\n  .sm\\:list-reset {\n    list-style: none;\n    padding: 0;\n  }\n\n  .sm\\:appearance-none {\n    -webkit-appearance: none;\n       -moz-appearance: none;\n            appearance: none;\n  }\n\n  .sm\\:bg-fixed {\n    background-attachment: fixed;\n  }\n\n  .sm\\:bg-local {\n    background-attachment: local;\n  }\n\n  .sm\\:bg-scroll {\n    background-attachment: scroll;\n  }\n\n  .sm\\:bg-transparent {\n    background-color: transparent;\n  }\n\n  .sm\\:bg-black {\n    background-color: #22292f;\n  }\n\n  .sm\\:bg-grey-darkest {\n    background-color: #3d4852;\n  }\n\n  .sm\\:bg-grey-darker {\n    background-color: #606f7b;\n  }\n\n  .sm\\:bg-grey-dark {\n    background-color: #8795a1;\n  }\n\n  .sm\\:bg-grey {\n    background-color: #b8c2cc;\n  }\n\n  .sm\\:bg-grey-light {\n    background-color: #dae1e7;\n  }\n\n  .sm\\:bg-grey-lighter {\n    background-color: #f1f5f8;\n  }\n\n  .sm\\:bg-grey-lightest {\n    background-color: #f8fafc;\n  }\n\n  .sm\\:bg-white {\n    background-color: #fff;\n  }\n\n  .sm\\:bg-red-darkest {\n    background-color: #3b0d0c;\n  }\n\n  .sm\\:bg-red-darker {\n    background-color: #621b18;\n  }\n\n  .sm\\:bg-red-dark {\n    background-color: #cc1f1a;\n  }\n\n  .sm\\:bg-red {\n    background-color: #e3342f;\n  }\n\n  .sm\\:bg-red-light {\n    background-color: #ef5753;\n  }\n\n  .sm\\:bg-red-lighter {\n    background-color: #f9acaa;\n  }\n\n  .sm\\:bg-red-lightest {\n    background-color: #fcebea;\n  }\n\n  .sm\\:bg-orange-darkest {\n    background-color: #462a16;\n  }\n\n  .sm\\:bg-orange-darker {\n    background-color: #613b1f;\n  }\n\n  .sm\\:bg-orange-dark {\n    background-color: #de751f;\n  }\n\n  .sm\\:bg-orange {\n    background-color: #f6993f;\n  }\n\n  .sm\\:bg-orange-light {\n    background-color: #faad63;\n  }\n\n  .sm\\:bg-orange-lighter {\n    background-color: #fcd9b6;\n  }\n\n  .sm\\:bg-orange-lightest {\n    background-color: #fff5eb;\n  }\n\n  .sm\\:bg-yellow-darkest {\n    background-color: #453411;\n  }\n\n  .sm\\:bg-yellow-darker {\n    background-color: #684f1d;\n  }\n\n  .sm\\:bg-yellow-dark {\n    background-color: #f2d024;\n  }\n\n  .sm\\:bg-yellow {\n    background-color: #ffed4a;\n  }\n\n  .sm\\:bg-yellow-light {\n    background-color: #fff382;\n  }\n\n  .sm\\:bg-yellow-lighter {\n    background-color: #fff9c2;\n  }\n\n  .sm\\:bg-yellow-lightest {\n    background-color: #fcfbeb;\n  }\n\n  .sm\\:bg-green-darkest {\n    background-color: #0f2f21;\n  }\n\n  .sm\\:bg-green-darker {\n    background-color: #1a4731;\n  }\n\n  .sm\\:bg-green-dark {\n    background-color: #1f9d55;\n  }\n\n  .sm\\:bg-green {\n    background-color: #38c172;\n  }\n\n  .sm\\:bg-green-light {\n    background-color: #51d88a;\n  }\n\n  .sm\\:bg-green-lighter {\n    background-color: #a2f5bf;\n  }\n\n  .sm\\:bg-green-lightest {\n    background-color: #e3fcec;\n  }\n\n  .sm\\:bg-teal-darkest {\n    background-color: #0d3331;\n  }\n\n  .sm\\:bg-teal-darker {\n    background-color: #20504f;\n  }\n\n  .sm\\:bg-teal-dark {\n    background-color: #38a89d;\n  }\n\n  .sm\\:bg-teal {\n    background-color: #4dc0b5;\n  }\n\n  .sm\\:bg-teal-light {\n    background-color: #64d5ca;\n  }\n\n  .sm\\:bg-teal-lighter {\n    background-color: #a0f0ed;\n  }\n\n  .sm\\:bg-teal-lightest {\n    background-color: #e8fffe;\n  }\n\n  .sm\\:bg-blue-darkest {\n    background-color: #12283a;\n  }\n\n  .sm\\:bg-blue-darker {\n    background-color: #1c3d5a;\n  }\n\n  .sm\\:bg-blue-dark {\n    background-color: #2779bd;\n  }\n\n  .sm\\:bg-blue {\n    background-color: #3490dc;\n  }\n\n  .sm\\:bg-blue-light {\n    background-color: #6cb2eb;\n  }\n\n  .sm\\:bg-blue-lighter {\n    background-color: #bcdefa;\n  }\n\n  .sm\\:bg-blue-lightest {\n    background-color: #eff8ff;\n  }\n\n  .sm\\:bg-indigo-darkest {\n    background-color: #191e38;\n  }\n\n  .sm\\:bg-indigo-darker {\n    background-color: #2f365f;\n  }\n\n  .sm\\:bg-indigo-dark {\n    background-color: #5661b3;\n  }\n\n  .sm\\:bg-indigo {\n    background-color: #6574cd;\n  }\n\n  .sm\\:bg-indigo-light {\n    background-color: #7886d7;\n  }\n\n  .sm\\:bg-indigo-lighter {\n    background-color: #b2b7ff;\n  }\n\n  .sm\\:bg-indigo-lightest {\n    background-color: #e6e8ff;\n  }\n\n  .sm\\:bg-purple-darkest {\n    background-color: #21183c;\n  }\n\n  .sm\\:bg-purple-darker {\n    background-color: #382b5f;\n  }\n\n  .sm\\:bg-purple-dark {\n    background-color: #794acf;\n  }\n\n  .sm\\:bg-purple {\n    background-color: #9561e2;\n  }\n\n  .sm\\:bg-purple-light {\n    background-color: #a779e9;\n  }\n\n  .sm\\:bg-purple-lighter {\n    background-color: #d6bbfc;\n  }\n\n  .sm\\:bg-purple-lightest {\n    background-color: #f3ebff;\n  }\n\n  .sm\\:bg-pink-darkest {\n    background-color: #451225;\n  }\n\n  .sm\\:bg-pink-darker {\n    background-color: #6f213f;\n  }\n\n  .sm\\:bg-pink-dark {\n    background-color: #eb5286;\n  }\n\n  .sm\\:bg-pink {\n    background-color: #f66d9b;\n  }\n\n  .sm\\:bg-pink-light {\n    background-color: #fa7ea8;\n  }\n\n  .sm\\:bg-pink-lighter {\n    background-color: #ffbbca;\n  }\n\n  .sm\\:bg-pink-lightest {\n    background-color: #ffebef;\n  }\n\n  .sm\\:hover\\:bg-transparent:hover {\n    background-color: transparent;\n  }\n\n  .sm\\:hover\\:bg-black:hover {\n    background-color: #22292f;\n  }\n\n  .sm\\:hover\\:bg-grey-darkest:hover {\n    background-color: #3d4852;\n  }\n\n  .sm\\:hover\\:bg-grey-darker:hover {\n    background-color: #606f7b;\n  }\n\n  .sm\\:hover\\:bg-grey-dark:hover {\n    background-color: #8795a1;\n  }\n\n  .sm\\:hover\\:bg-grey:hover {\n    background-color: #b8c2cc;\n  }\n\n  .sm\\:hover\\:bg-grey-light:hover {\n    background-color: #dae1e7;\n  }\n\n  .sm\\:hover\\:bg-grey-lighter:hover {\n    background-color: #f1f5f8;\n  }\n\n  .sm\\:hover\\:bg-grey-lightest:hover {\n    background-color: #f8fafc;\n  }\n\n  .sm\\:hover\\:bg-white:hover {\n    background-color: #fff;\n  }\n\n  .sm\\:hover\\:bg-red-darkest:hover {\n    background-color: #3b0d0c;\n  }\n\n  .sm\\:hover\\:bg-red-darker:hover {\n    background-color: #621b18;\n  }\n\n  .sm\\:hover\\:bg-red-dark:hover {\n    background-color: #cc1f1a;\n  }\n\n  .sm\\:hover\\:bg-red:hover {\n    background-color: #e3342f;\n  }\n\n  .sm\\:hover\\:bg-red-light:hover {\n    background-color: #ef5753;\n  }\n\n  .sm\\:hover\\:bg-red-lighter:hover {\n    background-color: #f9acaa;\n  }\n\n  .sm\\:hover\\:bg-red-lightest:hover {\n    background-color: #fcebea;\n  }\n\n  .sm\\:hover\\:bg-orange-darkest:hover {\n    background-color: #462a16;\n  }\n\n  .sm\\:hover\\:bg-orange-darker:hover {\n    background-color: #613b1f;\n  }\n\n  .sm\\:hover\\:bg-orange-dark:hover {\n    background-color: #de751f;\n  }\n\n  .sm\\:hover\\:bg-orange:hover {\n    background-color: #f6993f;\n  }\n\n  .sm\\:hover\\:bg-orange-light:hover {\n    background-color: #faad63;\n  }\n\n  .sm\\:hover\\:bg-orange-lighter:hover {\n    background-color: #fcd9b6;\n  }\n\n  .sm\\:hover\\:bg-orange-lightest:hover {\n    background-color: #fff5eb;\n  }\n\n  .sm\\:hover\\:bg-yellow-darkest:hover {\n    background-color: #453411;\n  }\n\n  .sm\\:hover\\:bg-yellow-darker:hover {\n    background-color: #684f1d;\n  }\n\n  .sm\\:hover\\:bg-yellow-dark:hover {\n    background-color: #f2d024;\n  }\n\n  .sm\\:hover\\:bg-yellow:hover {\n    background-color: #ffed4a;\n  }\n\n  .sm\\:hover\\:bg-yellow-light:hover {\n    background-color: #fff382;\n  }\n\n  .sm\\:hover\\:bg-yellow-lighter:hover {\n    background-color: #fff9c2;\n  }\n\n  .sm\\:hover\\:bg-yellow-lightest:hover {\n    background-color: #fcfbeb;\n  }\n\n  .sm\\:hover\\:bg-green-darkest:hover {\n    background-color: #0f2f21;\n  }\n\n  .sm\\:hover\\:bg-green-darker:hover {\n    background-color: #1a4731;\n  }\n\n  .sm\\:hover\\:bg-green-dark:hover {\n    background-color: #1f9d55;\n  }\n\n  .sm\\:hover\\:bg-green:hover {\n    background-color: #38c172;\n  }\n\n  .sm\\:hover\\:bg-green-light:hover {\n    background-color: #51d88a;\n  }\n\n  .sm\\:hover\\:bg-green-lighter:hover {\n    background-color: #a2f5bf;\n  }\n\n  .sm\\:hover\\:bg-green-lightest:hover {\n    background-color: #e3fcec;\n  }\n\n  .sm\\:hover\\:bg-teal-darkest:hover {\n    background-color: #0d3331;\n  }\n\n  .sm\\:hover\\:bg-teal-darker:hover {\n    background-color: #20504f;\n  }\n\n  .sm\\:hover\\:bg-teal-dark:hover {\n    background-color: #38a89d;\n  }\n\n  .sm\\:hover\\:bg-teal:hover {\n    background-color: #4dc0b5;\n  }\n\n  .sm\\:hover\\:bg-teal-light:hover {\n    background-color: #64d5ca;\n  }\n\n  .sm\\:hover\\:bg-teal-lighter:hover {\n    background-color: #a0f0ed;\n  }\n\n  .sm\\:hover\\:bg-teal-lightest:hover {\n    background-color: #e8fffe;\n  }\n\n  .sm\\:hover\\:bg-blue-darkest:hover {\n    background-color: #12283a;\n  }\n\n  .sm\\:hover\\:bg-blue-darker:hover {\n    background-color: #1c3d5a;\n  }\n\n  .sm\\:hover\\:bg-blue-dark:hover {\n    background-color: #2779bd;\n  }\n\n  .sm\\:hover\\:bg-blue:hover {\n    background-color: #3490dc;\n  }\n\n  .sm\\:hover\\:bg-blue-light:hover {\n    background-color: #6cb2eb;\n  }\n\n  .sm\\:hover\\:bg-blue-lighter:hover {\n    background-color: #bcdefa;\n  }\n\n  .sm\\:hover\\:bg-blue-lightest:hover {\n    background-color: #eff8ff;\n  }\n\n  .sm\\:hover\\:bg-indigo-darkest:hover {\n    background-color: #191e38;\n  }\n\n  .sm\\:hover\\:bg-indigo-darker:hover {\n    background-color: #2f365f;\n  }\n\n  .sm\\:hover\\:bg-indigo-dark:hover {\n    background-color: #5661b3;\n  }\n\n  .sm\\:hover\\:bg-indigo:hover {\n    background-color: #6574cd;\n  }\n\n  .sm\\:hover\\:bg-indigo-light:hover {\n    background-color: #7886d7;\n  }\n\n  .sm\\:hover\\:bg-indigo-lighter:hover {\n    background-color: #b2b7ff;\n  }\n\n  .sm\\:hover\\:bg-indigo-lightest:hover {\n    background-color: #e6e8ff;\n  }\n\n  .sm\\:hover\\:bg-purple-darkest:hover {\n    background-color: #21183c;\n  }\n\n  .sm\\:hover\\:bg-purple-darker:hover {\n    background-color: #382b5f;\n  }\n\n  .sm\\:hover\\:bg-purple-dark:hover {\n    background-color: #794acf;\n  }\n\n  .sm\\:hover\\:bg-purple:hover {\n    background-color: #9561e2;\n  }\n\n  .sm\\:hover\\:bg-purple-light:hover {\n    background-color: #a779e9;\n  }\n\n  .sm\\:hover\\:bg-purple-lighter:hover {\n    background-color: #d6bbfc;\n  }\n\n  .sm\\:hover\\:bg-purple-lightest:hover {\n    background-color: #f3ebff;\n  }\n\n  .sm\\:hover\\:bg-pink-darkest:hover {\n    background-color: #451225;\n  }\n\n  .sm\\:hover\\:bg-pink-darker:hover {\n    background-color: #6f213f;\n  }\n\n  .sm\\:hover\\:bg-pink-dark:hover {\n    background-color: #eb5286;\n  }\n\n  .sm\\:hover\\:bg-pink:hover {\n    background-color: #f66d9b;\n  }\n\n  .sm\\:hover\\:bg-pink-light:hover {\n    background-color: #fa7ea8;\n  }\n\n  .sm\\:hover\\:bg-pink-lighter:hover {\n    background-color: #ffbbca;\n  }\n\n  .sm\\:hover\\:bg-pink-lightest:hover {\n    background-color: #ffebef;\n  }\n\n  .sm\\:bg-bottom {\n    background-position: bottom;\n  }\n\n  .sm\\:bg-center {\n    background-position: center;\n  }\n\n  .sm\\:bg-left {\n    background-position: left;\n  }\n\n  .sm\\:bg-left-bottom {\n    background-position: left bottom;\n  }\n\n  .sm\\:bg-left-top {\n    background-position: left top;\n  }\n\n  .sm\\:bg-right {\n    background-position: right;\n  }\n\n  .sm\\:bg-right-bottom {\n    background-position: right bottom;\n  }\n\n  .sm\\:bg-right-top {\n    background-position: right top;\n  }\n\n  .sm\\:bg-top {\n    background-position: top;\n  }\n\n  .sm\\:bg-repeat {\n    background-repeat: repeat;\n  }\n\n  .sm\\:bg-no-repeat {\n    background-repeat: no-repeat;\n  }\n\n  .sm\\:bg-repeat-x {\n    background-repeat: repeat-x;\n  }\n\n  .sm\\:bg-repeat-y {\n    background-repeat: repeat-y;\n  }\n\n  .sm\\:bg-auto {\n    background-size: auto;\n  }\n\n  .sm\\:bg-cover {\n    background-size: cover;\n  }\n\n  .sm\\:bg-contain {\n    background-size: contain;\n  }\n\n  .sm\\:border-transparent {\n    border-color: transparent;\n  }\n\n  .sm\\:border-black {\n    border-color: #22292f;\n  }\n\n  .sm\\:border-grey-darkest {\n    border-color: #3d4852;\n  }\n\n  .sm\\:border-grey-darker {\n    border-color: #606f7b;\n  }\n\n  .sm\\:border-grey-dark {\n    border-color: #8795a1;\n  }\n\n  .sm\\:border-grey {\n    border-color: #b8c2cc;\n  }\n\n  .sm\\:border-grey-light {\n    border-color: #dae1e7;\n  }\n\n  .sm\\:border-grey-lighter {\n    border-color: #f1f5f8;\n  }\n\n  .sm\\:border-grey-lightest {\n    border-color: #f8fafc;\n  }\n\n  .sm\\:border-white {\n    border-color: #fff;\n  }\n\n  .sm\\:border-red-darkest {\n    border-color: #3b0d0c;\n  }\n\n  .sm\\:border-red-darker {\n    border-color: #621b18;\n  }\n\n  .sm\\:border-red-dark {\n    border-color: #cc1f1a;\n  }\n\n  .sm\\:border-red {\n    border-color: #e3342f;\n  }\n\n  .sm\\:border-red-light {\n    border-color: #ef5753;\n  }\n\n  .sm\\:border-red-lighter {\n    border-color: #f9acaa;\n  }\n\n  .sm\\:border-red-lightest {\n    border-color: #fcebea;\n  }\n\n  .sm\\:border-orange-darkest {\n    border-color: #462a16;\n  }\n\n  .sm\\:border-orange-darker {\n    border-color: #613b1f;\n  }\n\n  .sm\\:border-orange-dark {\n    border-color: #de751f;\n  }\n\n  .sm\\:border-orange {\n    border-color: #f6993f;\n  }\n\n  .sm\\:border-orange-light {\n    border-color: #faad63;\n  }\n\n  .sm\\:border-orange-lighter {\n    border-color: #fcd9b6;\n  }\n\n  .sm\\:border-orange-lightest {\n    border-color: #fff5eb;\n  }\n\n  .sm\\:border-yellow-darkest {\n    border-color: #453411;\n  }\n\n  .sm\\:border-yellow-darker {\n    border-color: #684f1d;\n  }\n\n  .sm\\:border-yellow-dark {\n    border-color: #f2d024;\n  }\n\n  .sm\\:border-yellow {\n    border-color: #ffed4a;\n  }\n\n  .sm\\:border-yellow-light {\n    border-color: #fff382;\n  }\n\n  .sm\\:border-yellow-lighter {\n    border-color: #fff9c2;\n  }\n\n  .sm\\:border-yellow-lightest {\n    border-color: #fcfbeb;\n  }\n\n  .sm\\:border-green-darkest {\n    border-color: #0f2f21;\n  }\n\n  .sm\\:border-green-darker {\n    border-color: #1a4731;\n  }\n\n  .sm\\:border-green-dark {\n    border-color: #1f9d55;\n  }\n\n  .sm\\:border-green {\n    border-color: #38c172;\n  }\n\n  .sm\\:border-green-light {\n    border-color: #51d88a;\n  }\n\n  .sm\\:border-green-lighter {\n    border-color: #a2f5bf;\n  }\n\n  .sm\\:border-green-lightest {\n    border-color: #e3fcec;\n  }\n\n  .sm\\:border-teal-darkest {\n    border-color: #0d3331;\n  }\n\n  .sm\\:border-teal-darker {\n    border-color: #20504f;\n  }\n\n  .sm\\:border-teal-dark {\n    border-color: #38a89d;\n  }\n\n  .sm\\:border-teal {\n    border-color: #4dc0b5;\n  }\n\n  .sm\\:border-teal-light {\n    border-color: #64d5ca;\n  }\n\n  .sm\\:border-teal-lighter {\n    border-color: #a0f0ed;\n  }\n\n  .sm\\:border-teal-lightest {\n    border-color: #e8fffe;\n  }\n\n  .sm\\:border-blue-darkest {\n    border-color: #12283a;\n  }\n\n  .sm\\:border-blue-darker {\n    border-color: #1c3d5a;\n  }\n\n  .sm\\:border-blue-dark {\n    border-color: #2779bd;\n  }\n\n  .sm\\:border-blue {\n    border-color: #3490dc;\n  }\n\n  .sm\\:border-blue-light {\n    border-color: #6cb2eb;\n  }\n\n  .sm\\:border-blue-lighter {\n    border-color: #bcdefa;\n  }\n\n  .sm\\:border-blue-lightest {\n    border-color: #eff8ff;\n  }\n\n  .sm\\:border-indigo-darkest {\n    border-color: #191e38;\n  }\n\n  .sm\\:border-indigo-darker {\n    border-color: #2f365f;\n  }\n\n  .sm\\:border-indigo-dark {\n    border-color: #5661b3;\n  }\n\n  .sm\\:border-indigo {\n    border-color: #6574cd;\n  }\n\n  .sm\\:border-indigo-light {\n    border-color: #7886d7;\n  }\n\n  .sm\\:border-indigo-lighter {\n    border-color: #b2b7ff;\n  }\n\n  .sm\\:border-indigo-lightest {\n    border-color: #e6e8ff;\n  }\n\n  .sm\\:border-purple-darkest {\n    border-color: #21183c;\n  }\n\n  .sm\\:border-purple-darker {\n    border-color: #382b5f;\n  }\n\n  .sm\\:border-purple-dark {\n    border-color: #794acf;\n  }\n\n  .sm\\:border-purple {\n    border-color: #9561e2;\n  }\n\n  .sm\\:border-purple-light {\n    border-color: #a779e9;\n  }\n\n  .sm\\:border-purple-lighter {\n    border-color: #d6bbfc;\n  }\n\n  .sm\\:border-purple-lightest {\n    border-color: #f3ebff;\n  }\n\n  .sm\\:border-pink-darkest {\n    border-color: #451225;\n  }\n\n  .sm\\:border-pink-darker {\n    border-color: #6f213f;\n  }\n\n  .sm\\:border-pink-dark {\n    border-color: #eb5286;\n  }\n\n  .sm\\:border-pink {\n    border-color: #f66d9b;\n  }\n\n  .sm\\:border-pink-light {\n    border-color: #fa7ea8;\n  }\n\n  .sm\\:border-pink-lighter {\n    border-color: #ffbbca;\n  }\n\n  .sm\\:border-pink-lightest {\n    border-color: #ffebef;\n  }\n\n  .sm\\:hover\\:border-transparent:hover {\n    border-color: transparent;\n  }\n\n  .sm\\:hover\\:border-black:hover {\n    border-color: #22292f;\n  }\n\n  .sm\\:hover\\:border-grey-darkest:hover {\n    border-color: #3d4852;\n  }\n\n  .sm\\:hover\\:border-grey-darker:hover {\n    border-color: #606f7b;\n  }\n\n  .sm\\:hover\\:border-grey-dark:hover {\n    border-color: #8795a1;\n  }\n\n  .sm\\:hover\\:border-grey:hover {\n    border-color: #b8c2cc;\n  }\n\n  .sm\\:hover\\:border-grey-light:hover {\n    border-color: #dae1e7;\n  }\n\n  .sm\\:hover\\:border-grey-lighter:hover {\n    border-color: #f1f5f8;\n  }\n\n  .sm\\:hover\\:border-grey-lightest:hover {\n    border-color: #f8fafc;\n  }\n\n  .sm\\:hover\\:border-white:hover {\n    border-color: #fff;\n  }\n\n  .sm\\:hover\\:border-red-darkest:hover {\n    border-color: #3b0d0c;\n  }\n\n  .sm\\:hover\\:border-red-darker:hover {\n    border-color: #621b18;\n  }\n\n  .sm\\:hover\\:border-red-dark:hover {\n    border-color: #cc1f1a;\n  }\n\n  .sm\\:hover\\:border-red:hover {\n    border-color: #e3342f;\n  }\n\n  .sm\\:hover\\:border-red-light:hover {\n    border-color: #ef5753;\n  }\n\n  .sm\\:hover\\:border-red-lighter:hover {\n    border-color: #f9acaa;\n  }\n\n  .sm\\:hover\\:border-red-lightest:hover {\n    border-color: #fcebea;\n  }\n\n  .sm\\:hover\\:border-orange-darkest:hover {\n    border-color: #462a16;\n  }\n\n  .sm\\:hover\\:border-orange-darker:hover {\n    border-color: #613b1f;\n  }\n\n  .sm\\:hover\\:border-orange-dark:hover {\n    border-color: #de751f;\n  }\n\n  .sm\\:hover\\:border-orange:hover {\n    border-color: #f6993f;\n  }\n\n  .sm\\:hover\\:border-orange-light:hover {\n    border-color: #faad63;\n  }\n\n  .sm\\:hover\\:border-orange-lighter:hover {\n    border-color: #fcd9b6;\n  }\n\n  .sm\\:hover\\:border-orange-lightest:hover {\n    border-color: #fff5eb;\n  }\n\n  .sm\\:hover\\:border-yellow-darkest:hover {\n    border-color: #453411;\n  }\n\n  .sm\\:hover\\:border-yellow-darker:hover {\n    border-color: #684f1d;\n  }\n\n  .sm\\:hover\\:border-yellow-dark:hover {\n    border-color: #f2d024;\n  }\n\n  .sm\\:hover\\:border-yellow:hover {\n    border-color: #ffed4a;\n  }\n\n  .sm\\:hover\\:border-yellow-light:hover {\n    border-color: #fff382;\n  }\n\n  .sm\\:hover\\:border-yellow-lighter:hover {\n    border-color: #fff9c2;\n  }\n\n  .sm\\:hover\\:border-yellow-lightest:hover {\n    border-color: #fcfbeb;\n  }\n\n  .sm\\:hover\\:border-green-darkest:hover {\n    border-color: #0f2f21;\n  }\n\n  .sm\\:hover\\:border-green-darker:hover {\n    border-color: #1a4731;\n  }\n\n  .sm\\:hover\\:border-green-dark:hover {\n    border-color: #1f9d55;\n  }\n\n  .sm\\:hover\\:border-green:hover {\n    border-color: #38c172;\n  }\n\n  .sm\\:hover\\:border-green-light:hover {\n    border-color: #51d88a;\n  }\n\n  .sm\\:hover\\:border-green-lighter:hover {\n    border-color: #a2f5bf;\n  }\n\n  .sm\\:hover\\:border-green-lightest:hover {\n    border-color: #e3fcec;\n  }\n\n  .sm\\:hover\\:border-teal-darkest:hover {\n    border-color: #0d3331;\n  }\n\n  .sm\\:hover\\:border-teal-darker:hover {\n    border-color: #20504f;\n  }\n\n  .sm\\:hover\\:border-teal-dark:hover {\n    border-color: #38a89d;\n  }\n\n  .sm\\:hover\\:border-teal:hover {\n    border-color: #4dc0b5;\n  }\n\n  .sm\\:hover\\:border-teal-light:hover {\n    border-color: #64d5ca;\n  }\n\n  .sm\\:hover\\:border-teal-lighter:hover {\n    border-color: #a0f0ed;\n  }\n\n  .sm\\:hover\\:border-teal-lightest:hover {\n    border-color: #e8fffe;\n  }\n\n  .sm\\:hover\\:border-blue-darkest:hover {\n    border-color: #12283a;\n  }\n\n  .sm\\:hover\\:border-blue-darker:hover {\n    border-color: #1c3d5a;\n  }\n\n  .sm\\:hover\\:border-blue-dark:hover {\n    border-color: #2779bd;\n  }\n\n  .sm\\:hover\\:border-blue:hover {\n    border-color: #3490dc;\n  }\n\n  .sm\\:hover\\:border-blue-light:hover {\n    border-color: #6cb2eb;\n  }\n\n  .sm\\:hover\\:border-blue-lighter:hover {\n    border-color: #bcdefa;\n  }\n\n  .sm\\:hover\\:border-blue-lightest:hover {\n    border-color: #eff8ff;\n  }\n\n  .sm\\:hover\\:border-indigo-darkest:hover {\n    border-color: #191e38;\n  }\n\n  .sm\\:hover\\:border-indigo-darker:hover {\n    border-color: #2f365f;\n  }\n\n  .sm\\:hover\\:border-indigo-dark:hover {\n    border-color: #5661b3;\n  }\n\n  .sm\\:hover\\:border-indigo:hover {\n    border-color: #6574cd;\n  }\n\n  .sm\\:hover\\:border-indigo-light:hover {\n    border-color: #7886d7;\n  }\n\n  .sm\\:hover\\:border-indigo-lighter:hover {\n    border-color: #b2b7ff;\n  }\n\n  .sm\\:hover\\:border-indigo-lightest:hover {\n    border-color: #e6e8ff;\n  }\n\n  .sm\\:hover\\:border-purple-darkest:hover {\n    border-color: #21183c;\n  }\n\n  .sm\\:hover\\:border-purple-darker:hover {\n    border-color: #382b5f;\n  }\n\n  .sm\\:hover\\:border-purple-dark:hover {\n    border-color: #794acf;\n  }\n\n  .sm\\:hover\\:border-purple:hover {\n    border-color: #9561e2;\n  }\n\n  .sm\\:hover\\:border-purple-light:hover {\n    border-color: #a779e9;\n  }\n\n  .sm\\:hover\\:border-purple-lighter:hover {\n    border-color: #d6bbfc;\n  }\n\n  .sm\\:hover\\:border-purple-lightest:hover {\n    border-color: #f3ebff;\n  }\n\n  .sm\\:hover\\:border-pink-darkest:hover {\n    border-color: #451225;\n  }\n\n  .sm\\:hover\\:border-pink-darker:hover {\n    border-color: #6f213f;\n  }\n\n  .sm\\:hover\\:border-pink-dark:hover {\n    border-color: #eb5286;\n  }\n\n  .sm\\:hover\\:border-pink:hover {\n    border-color: #f66d9b;\n  }\n\n  .sm\\:hover\\:border-pink-light:hover {\n    border-color: #fa7ea8;\n  }\n\n  .sm\\:hover\\:border-pink-lighter:hover {\n    border-color: #ffbbca;\n  }\n\n  .sm\\:hover\\:border-pink-lightest:hover {\n    border-color: #ffebef;\n  }\n\n  .sm\\:rounded-none {\n    border-radius: 0;\n  }\n\n  .sm\\:rounded-sm {\n    border-radius: .125rem;\n  }\n\n  .sm\\:rounded {\n    border-radius: .25rem;\n  }\n\n  .sm\\:rounded-lg {\n    border-radius: .5rem;\n  }\n\n  .sm\\:rounded-full {\n    border-radius: 9999px;\n  }\n\n  .sm\\:rounded-t-none {\n    border-top-left-radius: 0;\n    border-top-right-radius: 0;\n  }\n\n  .sm\\:rounded-r-none {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n  }\n\n  .sm\\:rounded-b-none {\n    border-bottom-right-radius: 0;\n    border-bottom-left-radius: 0;\n  }\n\n  .sm\\:rounded-l-none {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n  }\n\n  .sm\\:rounded-t-sm {\n    border-top-left-radius: .125rem;\n    border-top-right-radius: .125rem;\n  }\n\n  .sm\\:rounded-r-sm {\n    border-top-right-radius: .125rem;\n    border-bottom-right-radius: .125rem;\n  }\n\n  .sm\\:rounded-b-sm {\n    border-bottom-right-radius: .125rem;\n    border-bottom-left-radius: .125rem;\n  }\n\n  .sm\\:rounded-l-sm {\n    border-top-left-radius: .125rem;\n    border-bottom-left-radius: .125rem;\n  }\n\n  .sm\\:rounded-t {\n    border-top-left-radius: .25rem;\n    border-top-right-radius: .25rem;\n  }\n\n  .sm\\:rounded-r {\n    border-top-right-radius: .25rem;\n    border-bottom-right-radius: .25rem;\n  }\n\n  .sm\\:rounded-b {\n    border-bottom-right-radius: .25rem;\n    border-bottom-left-radius: .25rem;\n  }\n\n  .sm\\:rounded-l {\n    border-top-left-radius: .25rem;\n    border-bottom-left-radius: .25rem;\n  }\n\n  .sm\\:rounded-t-lg {\n    border-top-left-radius: .5rem;\n    border-top-right-radius: .5rem;\n  }\n\n  .sm\\:rounded-r-lg {\n    border-top-right-radius: .5rem;\n    border-bottom-right-radius: .5rem;\n  }\n\n  .sm\\:rounded-b-lg {\n    border-bottom-right-radius: .5rem;\n    border-bottom-left-radius: .5rem;\n  }\n\n  .sm\\:rounded-l-lg {\n    border-top-left-radius: .5rem;\n    border-bottom-left-radius: .5rem;\n  }\n\n  .sm\\:rounded-t-full {\n    border-top-left-radius: 9999px;\n    border-top-right-radius: 9999px;\n  }\n\n  .sm\\:rounded-r-full {\n    border-top-right-radius: 9999px;\n    border-bottom-right-radius: 9999px;\n  }\n\n  .sm\\:rounded-b-full {\n    border-bottom-right-radius: 9999px;\n    border-bottom-left-radius: 9999px;\n  }\n\n  .sm\\:rounded-l-full {\n    border-top-left-radius: 9999px;\n    border-bottom-left-radius: 9999px;\n  }\n\n  .sm\\:rounded-tl-none {\n    border-top-left-radius: 0;\n  }\n\n  .sm\\:rounded-tr-none {\n    border-top-right-radius: 0;\n  }\n\n  .sm\\:rounded-br-none {\n    border-bottom-right-radius: 0;\n  }\n\n  .sm\\:rounded-bl-none {\n    border-bottom-left-radius: 0;\n  }\n\n  .sm\\:rounded-tl-sm {\n    border-top-left-radius: .125rem;\n  }\n\n  .sm\\:rounded-tr-sm {\n    border-top-right-radius: .125rem;\n  }\n\n  .sm\\:rounded-br-sm {\n    border-bottom-right-radius: .125rem;\n  }\n\n  .sm\\:rounded-bl-sm {\n    border-bottom-left-radius: .125rem;\n  }\n\n  .sm\\:rounded-tl {\n    border-top-left-radius: .25rem;\n  }\n\n  .sm\\:rounded-tr {\n    border-top-right-radius: .25rem;\n  }\n\n  .sm\\:rounded-br {\n    border-bottom-right-radius: .25rem;\n  }\n\n  .sm\\:rounded-bl {\n    border-bottom-left-radius: .25rem;\n  }\n\n  .sm\\:rounded-tl-lg {\n    border-top-left-radius: .5rem;\n  }\n\n  .sm\\:rounded-tr-lg {\n    border-top-right-radius: .5rem;\n  }\n\n  .sm\\:rounded-br-lg {\n    border-bottom-right-radius: .5rem;\n  }\n\n  .sm\\:rounded-bl-lg {\n    border-bottom-left-radius: .5rem;\n  }\n\n  .sm\\:rounded-tl-full {\n    border-top-left-radius: 9999px;\n  }\n\n  .sm\\:rounded-tr-full {\n    border-top-right-radius: 9999px;\n  }\n\n  .sm\\:rounded-br-full {\n    border-bottom-right-radius: 9999px;\n  }\n\n  .sm\\:rounded-bl-full {\n    border-bottom-left-radius: 9999px;\n  }\n\n  .sm\\:border-solid {\n    border-style: solid;\n  }\n\n  .sm\\:border-dashed {\n    border-style: dashed;\n  }\n\n  .sm\\:border-dotted {\n    border-style: dotted;\n  }\n\n  .sm\\:border-none {\n    border-style: none;\n  }\n\n  .sm\\:border-0 {\n    border-width: 0;\n  }\n\n  .sm\\:border-2 {\n    border-width: 2px;\n  }\n\n  .sm\\:border-4 {\n    border-width: 4px;\n  }\n\n  .sm\\:border-8 {\n    border-width: 8px;\n  }\n\n  .sm\\:border {\n    border-width: 1px;\n  }\n\n  .sm\\:border-t-0 {\n    border-top-width: 0;\n  }\n\n  .sm\\:border-r-0 {\n    border-right-width: 0;\n  }\n\n  .sm\\:border-b-0 {\n    border-bottom-width: 0;\n  }\n\n  .sm\\:border-l-0 {\n    border-left-width: 0;\n  }\n\n  .sm\\:border-t-2 {\n    border-top-width: 2px;\n  }\n\n  .sm\\:border-r-2 {\n    border-right-width: 2px;\n  }\n\n  .sm\\:border-b-2 {\n    border-bottom-width: 2px;\n  }\n\n  .sm\\:border-l-2 {\n    border-left-width: 2px;\n  }\n\n  .sm\\:border-t-4 {\n    border-top-width: 4px;\n  }\n\n  .sm\\:border-r-4 {\n    border-right-width: 4px;\n  }\n\n  .sm\\:border-b-4 {\n    border-bottom-width: 4px;\n  }\n\n  .sm\\:border-l-4 {\n    border-left-width: 4px;\n  }\n\n  .sm\\:border-t-8 {\n    border-top-width: 8px;\n  }\n\n  .sm\\:border-r-8 {\n    border-right-width: 8px;\n  }\n\n  .sm\\:border-b-8 {\n    border-bottom-width: 8px;\n  }\n\n  .sm\\:border-l-8 {\n    border-left-width: 8px;\n  }\n\n  .sm\\:border-t {\n    border-top-width: 1px;\n  }\n\n  .sm\\:border-r {\n    border-right-width: 1px;\n  }\n\n  .sm\\:border-b {\n    border-bottom-width: 1px;\n  }\n\n  .sm\\:border-l {\n    border-left-width: 1px;\n  }\n\n  .sm\\:cursor-auto {\n    cursor: auto;\n  }\n\n  .sm\\:cursor-default {\n    cursor: default;\n  }\n\n  .sm\\:cursor-pointer {\n    cursor: pointer;\n  }\n\n  .sm\\:cursor-wait {\n    cursor: wait;\n  }\n\n  .sm\\:cursor-move {\n    cursor: move;\n  }\n\n  .sm\\:cursor-not-allowed {\n    cursor: not-allowed;\n  }\n\n  .sm\\:block {\n    display: block;\n  }\n\n  .sm\\:inline-block {\n    display: inline-block;\n  }\n\n  .sm\\:inline {\n    display: inline;\n  }\n\n  .sm\\:table {\n    display: table;\n  }\n\n  .sm\\:table-row {\n    display: table-row;\n  }\n\n  .sm\\:table-cell {\n    display: table-cell;\n  }\n\n  .sm\\:hidden {\n    display: none;\n  }\n\n  .sm\\:flex {\n    display: flex;\n  }\n\n  .sm\\:inline-flex {\n    display: inline-flex;\n  }\n\n  .sm\\:flex-row {\n    flex-direction: row;\n  }\n\n  .sm\\:flex-row-reverse {\n    flex-direction: row-reverse;\n  }\n\n  .sm\\:flex-col {\n    flex-direction: column;\n  }\n\n  .sm\\:flex-col-reverse {\n    flex-direction: column-reverse;\n  }\n\n  .sm\\:flex-wrap {\n    flex-wrap: wrap;\n  }\n\n  .sm\\:flex-wrap-reverse {\n    flex-wrap: wrap-reverse;\n  }\n\n  .sm\\:flex-no-wrap {\n    flex-wrap: nowrap;\n  }\n\n  .sm\\:items-start {\n    align-items: flex-start;\n  }\n\n  .sm\\:items-end {\n    align-items: flex-end;\n  }\n\n  .sm\\:items-center {\n    align-items: center;\n  }\n\n  .sm\\:items-baseline {\n    align-items: baseline;\n  }\n\n  .sm\\:items-stretch {\n    align-items: stretch;\n  }\n\n  .sm\\:self-auto {\n    align-self: auto;\n  }\n\n  .sm\\:self-start {\n    align-self: flex-start;\n  }\n\n  .sm\\:self-end {\n    align-self: flex-end;\n  }\n\n  .sm\\:self-center {\n    align-self: center;\n  }\n\n  .sm\\:self-stretch {\n    align-self: stretch;\n  }\n\n  .sm\\:justify-start {\n    justify-content: flex-start;\n  }\n\n  .sm\\:justify-end {\n    justify-content: flex-end;\n  }\n\n  .sm\\:justify-center {\n    justify-content: center;\n  }\n\n  .sm\\:justify-between {\n    justify-content: space-between;\n  }\n\n  .sm\\:justify-around {\n    justify-content: space-around;\n  }\n\n  .sm\\:content-center {\n    align-content: center;\n  }\n\n  .sm\\:content-start {\n    align-content: flex-start;\n  }\n\n  .sm\\:content-end {\n    align-content: flex-end;\n  }\n\n  .sm\\:content-between {\n    align-content: space-between;\n  }\n\n  .sm\\:content-around {\n    align-content: space-around;\n  }\n\n  .sm\\:flex-1 {\n    flex: 1;\n  }\n\n  .sm\\:flex-auto {\n    flex: auto;\n  }\n\n  .sm\\:flex-initial {\n    flex: initial;\n  }\n\n  .sm\\:flex-none {\n    flex: none;\n  }\n\n  .sm\\:flex-grow {\n    flex-grow: 1;\n  }\n\n  .sm\\:flex-shrink {\n    flex-shrink: 1;\n  }\n\n  .sm\\:flex-no-grow {\n    flex-grow: 0;\n  }\n\n  .sm\\:flex-no-shrink {\n    flex-shrink: 0;\n  }\n\n  .sm\\:float-right {\n    float: right;\n  }\n\n  .sm\\:float-left {\n    float: left;\n  }\n\n  .sm\\:float-none {\n    float: none;\n  }\n\n  .sm\\:clearfix:after {\n    content: \"\";\n    display: table;\n    clear: both;\n  }\n\n  .sm\\:font-sans {\n    font-family: system-ui, BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;\n  }\n\n  .sm\\:font-serif {\n    font-family: Constantia, Lucida Bright, Lucidabright, Lucida Serif, Lucida, DejaVu Serif, Bitstream Vera Serif, Liberation Serif, Georgia, serif;\n  }\n\n  .sm\\:font-mono {\n    font-family: Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;\n  }\n\n  .sm\\:font-hairline {\n    font-weight: 100;\n  }\n\n  .sm\\:font-thin {\n    font-weight: 200;\n  }\n\n  .sm\\:font-light {\n    font-weight: 300;\n  }\n\n  .sm\\:font-normal {\n    font-weight: 400;\n  }\n\n  .sm\\:font-medium {\n    font-weight: 500;\n  }\n\n  .sm\\:font-semibold {\n    font-weight: 600;\n  }\n\n  .sm\\:font-bold {\n    font-weight: 700;\n  }\n\n  .sm\\:font-extrabold {\n    font-weight: 800;\n  }\n\n  .sm\\:font-black {\n    font-weight: 900;\n  }\n\n  .sm\\:hover\\:font-hairline:hover {\n    font-weight: 100;\n  }\n\n  .sm\\:hover\\:font-thin:hover {\n    font-weight: 200;\n  }\n\n  .sm\\:hover\\:font-light:hover {\n    font-weight: 300;\n  }\n\n  .sm\\:hover\\:font-normal:hover {\n    font-weight: 400;\n  }\n\n  .sm\\:hover\\:font-medium:hover {\n    font-weight: 500;\n  }\n\n  .sm\\:hover\\:font-semibold:hover {\n    font-weight: 600;\n  }\n\n  .sm\\:hover\\:font-bold:hover {\n    font-weight: 700;\n  }\n\n  .sm\\:hover\\:font-extrabold:hover {\n    font-weight: 800;\n  }\n\n  .sm\\:hover\\:font-black:hover {\n    font-weight: 900;\n  }\n\n  .sm\\:h-1 {\n    height: .25rem;\n  }\n\n  .sm\\:h-2 {\n    height: .5rem;\n  }\n\n  .sm\\:h-3 {\n    height: .75rem;\n  }\n\n  .sm\\:h-4 {\n    height: 1rem;\n  }\n\n  .sm\\:h-6 {\n    height: 1.5rem;\n  }\n\n  .sm\\:h-8 {\n    height: 2rem;\n  }\n\n  .sm\\:h-10 {\n    height: 2.5rem;\n  }\n\n  .sm\\:h-12 {\n    height: 3rem;\n  }\n\n  .sm\\:h-16 {\n    height: 4rem;\n  }\n\n  .sm\\:h-24 {\n    height: 6rem;\n  }\n\n  .sm\\:h-32 {\n    height: 8rem;\n  }\n\n  .sm\\:h-48 {\n    height: 12rem;\n  }\n\n  .sm\\:h-64 {\n    height: 16rem;\n  }\n\n  .sm\\:h-auto {\n    height: auto;\n  }\n\n  .sm\\:h-px {\n    height: 1px;\n  }\n\n  .sm\\:h-full {\n    height: 100%;\n  }\n\n  .sm\\:h-screen {\n    height: 100vh;\n  }\n\n  .sm\\:leading-none {\n    line-height: 1;\n  }\n\n  .sm\\:leading-tight {\n    line-height: 1.25;\n  }\n\n  .sm\\:leading-normal {\n    line-height: 1.5;\n  }\n\n  .sm\\:leading-loose {\n    line-height: 2;\n  }\n\n  .sm\\:m-0 {\n    margin: 0;\n  }\n\n  .sm\\:m-1 {\n    margin: .25rem;\n  }\n\n  .sm\\:m-2 {\n    margin: .5rem;\n  }\n\n  .sm\\:m-3 {\n    margin: .75rem;\n  }\n\n  .sm\\:m-4 {\n    margin: 1rem;\n  }\n\n  .sm\\:m-6 {\n    margin: 1.5rem;\n  }\n\n  .sm\\:m-8 {\n    margin: 2rem;\n  }\n\n  .sm\\:m-auto {\n    margin: auto;\n  }\n\n  .sm\\:m-px {\n    margin: 1px;\n  }\n\n  .sm\\:my-0 {\n    margin-top: 0;\n    margin-bottom: 0;\n  }\n\n  .sm\\:mx-0 {\n    margin-left: 0;\n    margin-right: 0;\n  }\n\n  .sm\\:my-1 {\n    margin-top: .25rem;\n    margin-bottom: .25rem;\n  }\n\n  .sm\\:mx-1 {\n    margin-left: .25rem;\n    margin-right: .25rem;\n  }\n\n  .sm\\:my-2 {\n    margin-top: .5rem;\n    margin-bottom: .5rem;\n  }\n\n  .sm\\:mx-2 {\n    margin-left: .5rem;\n    margin-right: .5rem;\n  }\n\n  .sm\\:my-3 {\n    margin-top: .75rem;\n    margin-bottom: .75rem;\n  }\n\n  .sm\\:mx-3 {\n    margin-left: .75rem;\n    margin-right: .75rem;\n  }\n\n  .sm\\:my-4 {\n    margin-top: 1rem;\n    margin-bottom: 1rem;\n  }\n\n  .sm\\:mx-4 {\n    margin-left: 1rem;\n    margin-right: 1rem;\n  }\n\n  .sm\\:my-6 {\n    margin-top: 1.5rem;\n    margin-bottom: 1.5rem;\n  }\n\n  .sm\\:mx-6 {\n    margin-left: 1.5rem;\n    margin-right: 1.5rem;\n  }\n\n  .sm\\:my-8 {\n    margin-top: 2rem;\n    margin-bottom: 2rem;\n  }\n\n  .sm\\:mx-8 {\n    margin-left: 2rem;\n    margin-right: 2rem;\n  }\n\n  .sm\\:my-auto {\n    margin-top: auto;\n    margin-bottom: auto;\n  }\n\n  .sm\\:mx-auto {\n    margin-left: auto;\n    margin-right: auto;\n  }\n\n  .sm\\:my-px {\n    margin-top: 1px;\n    margin-bottom: 1px;\n  }\n\n  .sm\\:mx-px {\n    margin-left: 1px;\n    margin-right: 1px;\n  }\n\n  .sm\\:mt-0 {\n    margin-top: 0;\n  }\n\n  .sm\\:mr-0 {\n    margin-right: 0;\n  }\n\n  .sm\\:mb-0 {\n    margin-bottom: 0;\n  }\n\n  .sm\\:ml-0 {\n    margin-left: 0;\n  }\n\n  .sm\\:mt-1 {\n    margin-top: .25rem;\n  }\n\n  .sm\\:mr-1 {\n    margin-right: .25rem;\n  }\n\n  .sm\\:mb-1 {\n    margin-bottom: .25rem;\n  }\n\n  .sm\\:ml-1 {\n    margin-left: .25rem;\n  }\n\n  .sm\\:mt-2 {\n    margin-top: .5rem;\n  }\n\n  .sm\\:mr-2 {\n    margin-right: .5rem;\n  }\n\n  .sm\\:mb-2 {\n    margin-bottom: .5rem;\n  }\n\n  .sm\\:ml-2 {\n    margin-left: .5rem;\n  }\n\n  .sm\\:mt-3 {\n    margin-top: .75rem;\n  }\n\n  .sm\\:mr-3 {\n    margin-right: .75rem;\n  }\n\n  .sm\\:mb-3 {\n    margin-bottom: .75rem;\n  }\n\n  .sm\\:ml-3 {\n    margin-left: .75rem;\n  }\n\n  .sm\\:mt-4 {\n    margin-top: 1rem;\n  }\n\n  .sm\\:mr-4 {\n    margin-right: 1rem;\n  }\n\n  .sm\\:mb-4 {\n    margin-bottom: 1rem;\n  }\n\n  .sm\\:ml-4 {\n    margin-left: 1rem;\n  }\n\n  .sm\\:mt-6 {\n    margin-top: 1.5rem;\n  }\n\n  .sm\\:mr-6 {\n    margin-right: 1.5rem;\n  }\n\n  .sm\\:mb-6 {\n    margin-bottom: 1.5rem;\n  }\n\n  .sm\\:ml-6 {\n    margin-left: 1.5rem;\n  }\n\n  .sm\\:mt-8 {\n    margin-top: 2rem;\n  }\n\n  .sm\\:mr-8 {\n    margin-right: 2rem;\n  }\n\n  .sm\\:mb-8 {\n    margin-bottom: 2rem;\n  }\n\n  .sm\\:ml-8 {\n    margin-left: 2rem;\n  }\n\n  .sm\\:mt-auto {\n    margin-top: auto;\n  }\n\n  .sm\\:mr-auto {\n    margin-right: auto;\n  }\n\n  .sm\\:mb-auto {\n    margin-bottom: auto;\n  }\n\n  .sm\\:ml-auto {\n    margin-left: auto;\n  }\n\n  .sm\\:mt-px {\n    margin-top: 1px;\n  }\n\n  .sm\\:mr-px {\n    margin-right: 1px;\n  }\n\n  .sm\\:mb-px {\n    margin-bottom: 1px;\n  }\n\n  .sm\\:ml-px {\n    margin-left: 1px;\n  }\n\n  .sm\\:max-h-full {\n    max-height: 100%;\n  }\n\n  .sm\\:max-h-screen {\n    max-height: 100vh;\n  }\n\n  .sm\\:max-w-xs {\n    max-width: 20rem;\n  }\n\n  .sm\\:max-w-sm {\n    max-width: 30rem;\n  }\n\n  .sm\\:max-w-md {\n    max-width: 40rem;\n  }\n\n  .sm\\:max-w-lg {\n    max-width: 50rem;\n  }\n\n  .sm\\:max-w-xl {\n    max-width: 60rem;\n  }\n\n  .sm\\:max-w-2xl {\n    max-width: 70rem;\n  }\n\n  .sm\\:max-w-3xl {\n    max-width: 80rem;\n  }\n\n  .sm\\:max-w-4xl {\n    max-width: 90rem;\n  }\n\n  .sm\\:max-w-5xl {\n    max-width: 100rem;\n  }\n\n  .sm\\:max-w-full {\n    max-width: 100%;\n  }\n\n  .sm\\:min-h-0 {\n    min-height: 0;\n  }\n\n  .sm\\:min-h-full {\n    min-height: 100%;\n  }\n\n  .sm\\:min-h-screen {\n    min-height: 100vh;\n  }\n\n  .sm\\:min-w-0 {\n    min-width: 0;\n  }\n\n  .sm\\:min-w-full {\n    min-width: 100%;\n  }\n\n  .sm\\:-m-0 {\n    margin: 0;\n  }\n\n  .sm\\:-m-1 {\n    margin: -0.25rem;\n  }\n\n  .sm\\:-m-2 {\n    margin: -0.5rem;\n  }\n\n  .sm\\:-m-3 {\n    margin: -0.75rem;\n  }\n\n  .sm\\:-m-4 {\n    margin: -1rem;\n  }\n\n  .sm\\:-m-6 {\n    margin: -1.5rem;\n  }\n\n  .sm\\:-m-8 {\n    margin: -2rem;\n  }\n\n  .sm\\:-m-px {\n    margin: -1px;\n  }\n\n  .sm\\:-my-0 {\n    margin-top: 0;\n    margin-bottom: 0;\n  }\n\n  .sm\\:-mx-0 {\n    margin-left: 0;\n    margin-right: 0;\n  }\n\n  .sm\\:-my-1 {\n    margin-top: -0.25rem;\n    margin-bottom: -0.25rem;\n  }\n\n  .sm\\:-mx-1 {\n    margin-left: -0.25rem;\n    margin-right: -0.25rem;\n  }\n\n  .sm\\:-my-2 {\n    margin-top: -0.5rem;\n    margin-bottom: -0.5rem;\n  }\n\n  .sm\\:-mx-2 {\n    margin-left: -0.5rem;\n    margin-right: -0.5rem;\n  }\n\n  .sm\\:-my-3 {\n    margin-top: -0.75rem;\n    margin-bottom: -0.75rem;\n  }\n\n  .sm\\:-mx-3 {\n    margin-left: -0.75rem;\n    margin-right: -0.75rem;\n  }\n\n  .sm\\:-my-4 {\n    margin-top: -1rem;\n    margin-bottom: -1rem;\n  }\n\n  .sm\\:-mx-4 {\n    margin-left: -1rem;\n    margin-right: -1rem;\n  }\n\n  .sm\\:-my-6 {\n    margin-top: -1.5rem;\n    margin-bottom: -1.5rem;\n  }\n\n  .sm\\:-mx-6 {\n    margin-left: -1.5rem;\n    margin-right: -1.5rem;\n  }\n\n  .sm\\:-my-8 {\n    margin-top: -2rem;\n    margin-bottom: -2rem;\n  }\n\n  .sm\\:-mx-8 {\n    margin-left: -2rem;\n    margin-right: -2rem;\n  }\n\n  .sm\\:-my-px {\n    margin-top: -1px;\n    margin-bottom: -1px;\n  }\n\n  .sm\\:-mx-px {\n    margin-left: -1px;\n    margin-right: -1px;\n  }\n\n  .sm\\:-mt-0 {\n    margin-top: 0;\n  }\n\n  .sm\\:-mr-0 {\n    margin-right: 0;\n  }\n\n  .sm\\:-mb-0 {\n    margin-bottom: 0;\n  }\n\n  .sm\\:-ml-0 {\n    margin-left: 0;\n  }\n\n  .sm\\:-mt-1 {\n    margin-top: -0.25rem;\n  }\n\n  .sm\\:-mr-1 {\n    margin-right: -0.25rem;\n  }\n\n  .sm\\:-mb-1 {\n    margin-bottom: -0.25rem;\n  }\n\n  .sm\\:-ml-1 {\n    margin-left: -0.25rem;\n  }\n\n  .sm\\:-mt-2 {\n    margin-top: -0.5rem;\n  }\n\n  .sm\\:-mr-2 {\n    margin-right: -0.5rem;\n  }\n\n  .sm\\:-mb-2 {\n    margin-bottom: -0.5rem;\n  }\n\n  .sm\\:-ml-2 {\n    margin-left: -0.5rem;\n  }\n\n  .sm\\:-mt-3 {\n    margin-top: -0.75rem;\n  }\n\n  .sm\\:-mr-3 {\n    margin-right: -0.75rem;\n  }\n\n  .sm\\:-mb-3 {\n    margin-bottom: -0.75rem;\n  }\n\n  .sm\\:-ml-3 {\n    margin-left: -0.75rem;\n  }\n\n  .sm\\:-mt-4 {\n    margin-top: -1rem;\n  }\n\n  .sm\\:-mr-4 {\n    margin-right: -1rem;\n  }\n\n  .sm\\:-mb-4 {\n    margin-bottom: -1rem;\n  }\n\n  .sm\\:-ml-4 {\n    margin-left: -1rem;\n  }\n\n  .sm\\:-mt-6 {\n    margin-top: -1.5rem;\n  }\n\n  .sm\\:-mr-6 {\n    margin-right: -1.5rem;\n  }\n\n  .sm\\:-mb-6 {\n    margin-bottom: -1.5rem;\n  }\n\n  .sm\\:-ml-6 {\n    margin-left: -1.5rem;\n  }\n\n  .sm\\:-mt-8 {\n    margin-top: -2rem;\n  }\n\n  .sm\\:-mr-8 {\n    margin-right: -2rem;\n  }\n\n  .sm\\:-mb-8 {\n    margin-bottom: -2rem;\n  }\n\n  .sm\\:-ml-8 {\n    margin-left: -2rem;\n  }\n\n  .sm\\:-mt-px {\n    margin-top: -1px;\n  }\n\n  .sm\\:-mr-px {\n    margin-right: -1px;\n  }\n\n  .sm\\:-mb-px {\n    margin-bottom: -1px;\n  }\n\n  .sm\\:-ml-px {\n    margin-left: -1px;\n  }\n\n  .sm\\:opacity-0 {\n    opacity: 0;\n  }\n\n  .sm\\:opacity-25 {\n    opacity: .25;\n  }\n\n  .sm\\:opacity-50 {\n    opacity: .5;\n  }\n\n  .sm\\:opacity-75 {\n    opacity: .75;\n  }\n\n  .sm\\:opacity-100 {\n    opacity: 1;\n  }\n\n  .sm\\:overflow-auto {\n    overflow: auto;\n  }\n\n  .sm\\:overflow-hidden {\n    overflow: hidden;\n  }\n\n  .sm\\:overflow-visible {\n    overflow: visible;\n  }\n\n  .sm\\:overflow-scroll {\n    overflow: scroll;\n  }\n\n  .sm\\:overflow-x-auto {\n    overflow-x: auto;\n  }\n\n  .sm\\:overflow-y-auto {\n    overflow-y: auto;\n  }\n\n  .sm\\:overflow-x-scroll {\n    overflow-x: scroll;\n  }\n\n  .sm\\:overflow-y-scroll {\n    overflow-y: scroll;\n  }\n\n  .sm\\:scrolling-touch {\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .sm\\:scrolling-auto {\n    -webkit-overflow-scrolling: auto;\n  }\n\n  .sm\\:p-0 {\n    padding: 0;\n  }\n\n  .sm\\:p-1 {\n    padding: .25rem;\n  }\n\n  .sm\\:p-2 {\n    padding: .5rem;\n  }\n\n  .sm\\:p-3 {\n    padding: .75rem;\n  }\n\n  .sm\\:p-4 {\n    padding: 1rem;\n  }\n\n  .sm\\:p-6 {\n    padding: 1.5rem;\n  }\n\n  .sm\\:p-8 {\n    padding: 2rem;\n  }\n\n  .sm\\:p-px {\n    padding: 1px;\n  }\n\n  .sm\\:py-0 {\n    padding-top: 0;\n    padding-bottom: 0;\n  }\n\n  .sm\\:px-0 {\n    padding-left: 0;\n    padding-right: 0;\n  }\n\n  .sm\\:py-1 {\n    padding-top: .25rem;\n    padding-bottom: .25rem;\n  }\n\n  .sm\\:px-1 {\n    padding-left: .25rem;\n    padding-right: .25rem;\n  }\n\n  .sm\\:py-2 {\n    padding-top: .5rem;\n    padding-bottom: .5rem;\n  }\n\n  .sm\\:px-2 {\n    padding-left: .5rem;\n    padding-right: .5rem;\n  }\n\n  .sm\\:py-3 {\n    padding-top: .75rem;\n    padding-bottom: .75rem;\n  }\n\n  .sm\\:px-3 {\n    padding-left: .75rem;\n    padding-right: .75rem;\n  }\n\n  .sm\\:py-4 {\n    padding-top: 1rem;\n    padding-bottom: 1rem;\n  }\n\n  .sm\\:px-4 {\n    padding-left: 1rem;\n    padding-right: 1rem;\n  }\n\n  .sm\\:py-6 {\n    padding-top: 1.5rem;\n    padding-bottom: 1.5rem;\n  }\n\n  .sm\\:px-6 {\n    padding-left: 1.5rem;\n    padding-right: 1.5rem;\n  }\n\n  .sm\\:py-8 {\n    padding-top: 2rem;\n    padding-bottom: 2rem;\n  }\n\n  .sm\\:px-8 {\n    padding-left: 2rem;\n    padding-right: 2rem;\n  }\n\n  .sm\\:py-px {\n    padding-top: 1px;\n    padding-bottom: 1px;\n  }\n\n  .sm\\:px-px {\n    padding-left: 1px;\n    padding-right: 1px;\n  }\n\n  .sm\\:pt-0 {\n    padding-top: 0;\n  }\n\n  .sm\\:pr-0 {\n    padding-right: 0;\n  }\n\n  .sm\\:pb-0 {\n    padding-bottom: 0;\n  }\n\n  .sm\\:pl-0 {\n    padding-left: 0;\n  }\n\n  .sm\\:pt-1 {\n    padding-top: .25rem;\n  }\n\n  .sm\\:pr-1 {\n    padding-right: .25rem;\n  }\n\n  .sm\\:pb-1 {\n    padding-bottom: .25rem;\n  }\n\n  .sm\\:pl-1 {\n    padding-left: .25rem;\n  }\n\n  .sm\\:pt-2 {\n    padding-top: .5rem;\n  }\n\n  .sm\\:pr-2 {\n    padding-right: .5rem;\n  }\n\n  .sm\\:pb-2 {\n    padding-bottom: .5rem;\n  }\n\n  .sm\\:pl-2 {\n    padding-left: .5rem;\n  }\n\n  .sm\\:pt-3 {\n    padding-top: .75rem;\n  }\n\n  .sm\\:pr-3 {\n    padding-right: .75rem;\n  }\n\n  .sm\\:pb-3 {\n    padding-bottom: .75rem;\n  }\n\n  .sm\\:pl-3 {\n    padding-left: .75rem;\n  }\n\n  .sm\\:pt-4 {\n    padding-top: 1rem;\n  }\n\n  .sm\\:pr-4 {\n    padding-right: 1rem;\n  }\n\n  .sm\\:pb-4 {\n    padding-bottom: 1rem;\n  }\n\n  .sm\\:pl-4 {\n    padding-left: 1rem;\n  }\n\n  .sm\\:pt-6 {\n    padding-top: 1.5rem;\n  }\n\n  .sm\\:pr-6 {\n    padding-right: 1.5rem;\n  }\n\n  .sm\\:pb-6 {\n    padding-bottom: 1.5rem;\n  }\n\n  .sm\\:pl-6 {\n    padding-left: 1.5rem;\n  }\n\n  .sm\\:pt-8 {\n    padding-top: 2rem;\n  }\n\n  .sm\\:pr-8 {\n    padding-right: 2rem;\n  }\n\n  .sm\\:pb-8 {\n    padding-bottom: 2rem;\n  }\n\n  .sm\\:pl-8 {\n    padding-left: 2rem;\n  }\n\n  .sm\\:pt-px {\n    padding-top: 1px;\n  }\n\n  .sm\\:pr-px {\n    padding-right: 1px;\n  }\n\n  .sm\\:pb-px {\n    padding-bottom: 1px;\n  }\n\n  .sm\\:pl-px {\n    padding-left: 1px;\n  }\n\n  .sm\\:pointer-events-none {\n    pointer-events: none;\n  }\n\n  .sm\\:pointer-events-auto {\n    pointer-events: auto;\n  }\n\n  .sm\\:static {\n    position: static;\n  }\n\n  .sm\\:fixed {\n    position: fixed;\n  }\n\n  .sm\\:absolute {\n    position: absolute;\n  }\n\n  .sm\\:relative {\n    position: relative;\n  }\n\n  .sm\\:sticky {\n    position: -webkit-sticky;\n    position: sticky;\n  }\n\n  .sm\\:pin-none {\n    top: auto;\n    right: auto;\n    bottom: auto;\n    left: auto;\n  }\n\n  .sm\\:pin {\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n  }\n\n  .sm\\:pin-y {\n    top: 0;\n    bottom: 0;\n  }\n\n  .sm\\:pin-x {\n    right: 0;\n    left: 0;\n  }\n\n  .sm\\:pin-t {\n    top: 0;\n  }\n\n  .sm\\:pin-r {\n    right: 0;\n  }\n\n  .sm\\:pin-b {\n    bottom: 0;\n  }\n\n  .sm\\:pin-l {\n    left: 0;\n  }\n\n  .sm\\:resize-none {\n    resize: none;\n  }\n\n  .sm\\:resize-y {\n    resize: vertical;\n  }\n\n  .sm\\:resize-x {\n    resize: horizontal;\n  }\n\n  .sm\\:resize {\n    resize: both;\n  }\n\n  .sm\\:shadow {\n    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n  }\n\n  .sm\\:shadow-md {\n    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n  }\n\n  .sm\\:shadow-lg {\n    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n  }\n\n  .sm\\:shadow-inner {\n    box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n  }\n\n  .sm\\:shadow-none {\n    box-shadow: none;\n  }\n\n  .sm\\:text-left {\n    text-align: left;\n  }\n\n  .sm\\:text-center {\n    text-align: center;\n  }\n\n  .sm\\:text-right {\n    text-align: right;\n  }\n\n  .sm\\:text-justify {\n    text-align: justify;\n  }\n\n  .sm\\:text-transparent {\n    color: transparent;\n  }\n\n  .sm\\:text-black {\n    color: #22292f;\n  }\n\n  .sm\\:text-grey-darkest {\n    color: #3d4852;\n  }\n\n  .sm\\:text-grey-darker {\n    color: #606f7b;\n  }\n\n  .sm\\:text-grey-dark {\n    color: #8795a1;\n  }\n\n  .sm\\:text-grey {\n    color: #b8c2cc;\n  }\n\n  .sm\\:text-grey-light {\n    color: #dae1e7;\n  }\n\n  .sm\\:text-grey-lighter {\n    color: #f1f5f8;\n  }\n\n  .sm\\:text-grey-lightest {\n    color: #f8fafc;\n  }\n\n  .sm\\:text-white {\n    color: #fff;\n  }\n\n  .sm\\:text-red-darkest {\n    color: #3b0d0c;\n  }\n\n  .sm\\:text-red-darker {\n    color: #621b18;\n  }\n\n  .sm\\:text-red-dark {\n    color: #cc1f1a;\n  }\n\n  .sm\\:text-red {\n    color: #e3342f;\n  }\n\n  .sm\\:text-red-light {\n    color: #ef5753;\n  }\n\n  .sm\\:text-red-lighter {\n    color: #f9acaa;\n  }\n\n  .sm\\:text-red-lightest {\n    color: #fcebea;\n  }\n\n  .sm\\:text-orange-darkest {\n    color: #462a16;\n  }\n\n  .sm\\:text-orange-darker {\n    color: #613b1f;\n  }\n\n  .sm\\:text-orange-dark {\n    color: #de751f;\n  }\n\n  .sm\\:text-orange {\n    color: #f6993f;\n  }\n\n  .sm\\:text-orange-light {\n    color: #faad63;\n  }\n\n  .sm\\:text-orange-lighter {\n    color: #fcd9b6;\n  }\n\n  .sm\\:text-orange-lightest {\n    color: #fff5eb;\n  }\n\n  .sm\\:text-yellow-darkest {\n    color: #453411;\n  }\n\n  .sm\\:text-yellow-darker {\n    color: #684f1d;\n  }\n\n  .sm\\:text-yellow-dark {\n    color: #f2d024;\n  }\n\n  .sm\\:text-yellow {\n    color: #ffed4a;\n  }\n\n  .sm\\:text-yellow-light {\n    color: #fff382;\n  }\n\n  .sm\\:text-yellow-lighter {\n    color: #fff9c2;\n  }\n\n  .sm\\:text-yellow-lightest {\n    color: #fcfbeb;\n  }\n\n  .sm\\:text-green-darkest {\n    color: #0f2f21;\n  }\n\n  .sm\\:text-green-darker {\n    color: #1a4731;\n  }\n\n  .sm\\:text-green-dark {\n    color: #1f9d55;\n  }\n\n  .sm\\:text-green {\n    color: #38c172;\n  }\n\n  .sm\\:text-green-light {\n    color: #51d88a;\n  }\n\n  .sm\\:text-green-lighter {\n    color: #a2f5bf;\n  }\n\n  .sm\\:text-green-lightest {\n    color: #e3fcec;\n  }\n\n  .sm\\:text-teal-darkest {\n    color: #0d3331;\n  }\n\n  .sm\\:text-teal-darker {\n    color: #20504f;\n  }\n\n  .sm\\:text-teal-dark {\n    color: #38a89d;\n  }\n\n  .sm\\:text-teal {\n    color: #4dc0b5;\n  }\n\n  .sm\\:text-teal-light {\n    color: #64d5ca;\n  }\n\n  .sm\\:text-teal-lighter {\n    color: #a0f0ed;\n  }\n\n  .sm\\:text-teal-lightest {\n    color: #e8fffe;\n  }\n\n  .sm\\:text-blue-darkest {\n    color: #12283a;\n  }\n\n  .sm\\:text-blue-darker {\n    color: #1c3d5a;\n  }\n\n  .sm\\:text-blue-dark {\n    color: #2779bd;\n  }\n\n  .sm\\:text-blue {\n    color: #3490dc;\n  }\n\n  .sm\\:text-blue-light {\n    color: #6cb2eb;\n  }\n\n  .sm\\:text-blue-lighter {\n    color: #bcdefa;\n  }\n\n  .sm\\:text-blue-lightest {\n    color: #eff8ff;\n  }\n\n  .sm\\:text-indigo-darkest {\n    color: #191e38;\n  }\n\n  .sm\\:text-indigo-darker {\n    color: #2f365f;\n  }\n\n  .sm\\:text-indigo-dark {\n    color: #5661b3;\n  }\n\n  .sm\\:text-indigo {\n    color: #6574cd;\n  }\n\n  .sm\\:text-indigo-light {\n    color: #7886d7;\n  }\n\n  .sm\\:text-indigo-lighter {\n    color: #b2b7ff;\n  }\n\n  .sm\\:text-indigo-lightest {\n    color: #e6e8ff;\n  }\n\n  .sm\\:text-purple-darkest {\n    color: #21183c;\n  }\n\n  .sm\\:text-purple-darker {\n    color: #382b5f;\n  }\n\n  .sm\\:text-purple-dark {\n    color: #794acf;\n  }\n\n  .sm\\:text-purple {\n    color: #9561e2;\n  }\n\n  .sm\\:text-purple-light {\n    color: #a779e9;\n  }\n\n  .sm\\:text-purple-lighter {\n    color: #d6bbfc;\n  }\n\n  .sm\\:text-purple-lightest {\n    color: #f3ebff;\n  }\n\n  .sm\\:text-pink-darkest {\n    color: #451225;\n  }\n\n  .sm\\:text-pink-darker {\n    color: #6f213f;\n  }\n\n  .sm\\:text-pink-dark {\n    color: #eb5286;\n  }\n\n  .sm\\:text-pink {\n    color: #f66d9b;\n  }\n\n  .sm\\:text-pink-light {\n    color: #fa7ea8;\n  }\n\n  .sm\\:text-pink-lighter {\n    color: #ffbbca;\n  }\n\n  .sm\\:text-pink-lightest {\n    color: #ffebef;\n  }\n\n  .sm\\:hover\\:text-transparent:hover {\n    color: transparent;\n  }\n\n  .sm\\:hover\\:text-black:hover {\n    color: #22292f;\n  }\n\n  .sm\\:hover\\:text-grey-darkest:hover {\n    color: #3d4852;\n  }\n\n  .sm\\:hover\\:text-grey-darker:hover {\n    color: #606f7b;\n  }\n\n  .sm\\:hover\\:text-grey-dark:hover {\n    color: #8795a1;\n  }\n\n  .sm\\:hover\\:text-grey:hover {\n    color: #b8c2cc;\n  }\n\n  .sm\\:hover\\:text-grey-light:hover {\n    color: #dae1e7;\n  }\n\n  .sm\\:hover\\:text-grey-lighter:hover {\n    color: #f1f5f8;\n  }\n\n  .sm\\:hover\\:text-grey-lightest:hover {\n    color: #f8fafc;\n  }\n\n  .sm\\:hover\\:text-white:hover {\n    color: #fff;\n  }\n\n  .sm\\:hover\\:text-red-darkest:hover {\n    color: #3b0d0c;\n  }\n\n  .sm\\:hover\\:text-red-darker:hover {\n    color: #621b18;\n  }\n\n  .sm\\:hover\\:text-red-dark:hover {\n    color: #cc1f1a;\n  }\n\n  .sm\\:hover\\:text-red:hover {\n    color: #e3342f;\n  }\n\n  .sm\\:hover\\:text-red-light:hover {\n    color: #ef5753;\n  }\n\n  .sm\\:hover\\:text-red-lighter:hover {\n    color: #f9acaa;\n  }\n\n  .sm\\:hover\\:text-red-lightest:hover {\n    color: #fcebea;\n  }\n\n  .sm\\:hover\\:text-orange-darkest:hover {\n    color: #462a16;\n  }\n\n  .sm\\:hover\\:text-orange-darker:hover {\n    color: #613b1f;\n  }\n\n  .sm\\:hover\\:text-orange-dark:hover {\n    color: #de751f;\n  }\n\n  .sm\\:hover\\:text-orange:hover {\n    color: #f6993f;\n  }\n\n  .sm\\:hover\\:text-orange-light:hover {\n    color: #faad63;\n  }\n\n  .sm\\:hover\\:text-orange-lighter:hover {\n    color: #fcd9b6;\n  }\n\n  .sm\\:hover\\:text-orange-lightest:hover {\n    color: #fff5eb;\n  }\n\n  .sm\\:hover\\:text-yellow-darkest:hover {\n    color: #453411;\n  }\n\n  .sm\\:hover\\:text-yellow-darker:hover {\n    color: #684f1d;\n  }\n\n  .sm\\:hover\\:text-yellow-dark:hover {\n    color: #f2d024;\n  }\n\n  .sm\\:hover\\:text-yellow:hover {\n    color: #ffed4a;\n  }\n\n  .sm\\:hover\\:text-yellow-light:hover {\n    color: #fff382;\n  }\n\n  .sm\\:hover\\:text-yellow-lighter:hover {\n    color: #fff9c2;\n  }\n\n  .sm\\:hover\\:text-yellow-lightest:hover {\n    color: #fcfbeb;\n  }\n\n  .sm\\:hover\\:text-green-darkest:hover {\n    color: #0f2f21;\n  }\n\n  .sm\\:hover\\:text-green-darker:hover {\n    color: #1a4731;\n  }\n\n  .sm\\:hover\\:text-green-dark:hover {\n    color: #1f9d55;\n  }\n\n  .sm\\:hover\\:text-green:hover {\n    color: #38c172;\n  }\n\n  .sm\\:hover\\:text-green-light:hover {\n    color: #51d88a;\n  }\n\n  .sm\\:hover\\:text-green-lighter:hover {\n    color: #a2f5bf;\n  }\n\n  .sm\\:hover\\:text-green-lightest:hover {\n    color: #e3fcec;\n  }\n\n  .sm\\:hover\\:text-teal-darkest:hover {\n    color: #0d3331;\n  }\n\n  .sm\\:hover\\:text-teal-darker:hover {\n    color: #20504f;\n  }\n\n  .sm\\:hover\\:text-teal-dark:hover {\n    color: #38a89d;\n  }\n\n  .sm\\:hover\\:text-teal:hover {\n    color: #4dc0b5;\n  }\n\n  .sm\\:hover\\:text-teal-light:hover {\n    color: #64d5ca;\n  }\n\n  .sm\\:hover\\:text-teal-lighter:hover {\n    color: #a0f0ed;\n  }\n\n  .sm\\:hover\\:text-teal-lightest:hover {\n    color: #e8fffe;\n  }\n\n  .sm\\:hover\\:text-blue-darkest:hover {\n    color: #12283a;\n  }\n\n  .sm\\:hover\\:text-blue-darker:hover {\n    color: #1c3d5a;\n  }\n\n  .sm\\:hover\\:text-blue-dark:hover {\n    color: #2779bd;\n  }\n\n  .sm\\:hover\\:text-blue:hover {\n    color: #3490dc;\n  }\n\n  .sm\\:hover\\:text-blue-light:hover {\n    color: #6cb2eb;\n  }\n\n  .sm\\:hover\\:text-blue-lighter:hover {\n    color: #bcdefa;\n  }\n\n  .sm\\:hover\\:text-blue-lightest:hover {\n    color: #eff8ff;\n  }\n\n  .sm\\:hover\\:text-indigo-darkest:hover {\n    color: #191e38;\n  }\n\n  .sm\\:hover\\:text-indigo-darker:hover {\n    color: #2f365f;\n  }\n\n  .sm\\:hover\\:text-indigo-dark:hover {\n    color: #5661b3;\n  }\n\n  .sm\\:hover\\:text-indigo:hover {\n    color: #6574cd;\n  }\n\n  .sm\\:hover\\:text-indigo-light:hover {\n    color: #7886d7;\n  }\n\n  .sm\\:hover\\:text-indigo-lighter:hover {\n    color: #b2b7ff;\n  }\n\n  .sm\\:hover\\:text-indigo-lightest:hover {\n    color: #e6e8ff;\n  }\n\n  .sm\\:hover\\:text-purple-darkest:hover {\n    color: #21183c;\n  }\n\n  .sm\\:hover\\:text-purple-darker:hover {\n    color: #382b5f;\n  }\n\n  .sm\\:hover\\:text-purple-dark:hover {\n    color: #794acf;\n  }\n\n  .sm\\:hover\\:text-purple:hover {\n    color: #9561e2;\n  }\n\n  .sm\\:hover\\:text-purple-light:hover {\n    color: #a779e9;\n  }\n\n  .sm\\:hover\\:text-purple-lighter:hover {\n    color: #d6bbfc;\n  }\n\n  .sm\\:hover\\:text-purple-lightest:hover {\n    color: #f3ebff;\n  }\n\n  .sm\\:hover\\:text-pink-darkest:hover {\n    color: #451225;\n  }\n\n  .sm\\:hover\\:text-pink-darker:hover {\n    color: #6f213f;\n  }\n\n  .sm\\:hover\\:text-pink-dark:hover {\n    color: #eb5286;\n  }\n\n  .sm\\:hover\\:text-pink:hover {\n    color: #f66d9b;\n  }\n\n  .sm\\:hover\\:text-pink-light:hover {\n    color: #fa7ea8;\n  }\n\n  .sm\\:hover\\:text-pink-lighter:hover {\n    color: #ffbbca;\n  }\n\n  .sm\\:hover\\:text-pink-lightest:hover {\n    color: #ffebef;\n  }\n\n  .sm\\:text-xs {\n    font-size: .75rem;\n  }\n\n  .sm\\:text-sm {\n    font-size: .875rem;\n  }\n\n  .sm\\:text-base {\n    font-size: 1rem;\n  }\n\n  .sm\\:text-lg {\n    font-size: 1.125rem;\n  }\n\n  .sm\\:text-xl {\n    font-size: 1.25rem;\n  }\n\n  .sm\\:text-2xl {\n    font-size: 1.5rem;\n  }\n\n  .sm\\:text-3xl {\n    font-size: 1.875rem;\n  }\n\n  .sm\\:text-4xl {\n    font-size: 2.25rem;\n  }\n\n  .sm\\:text-5xl {\n    font-size: 3rem;\n  }\n\n  .sm\\:italic {\n    font-style: italic;\n  }\n\n  .sm\\:roman {\n    font-style: normal;\n  }\n\n  .sm\\:uppercase {\n    text-transform: uppercase;\n  }\n\n  .sm\\:lowercase {\n    text-transform: lowercase;\n  }\n\n  .sm\\:capitalize {\n    text-transform: capitalize;\n  }\n\n  .sm\\:normal-case {\n    text-transform: none;\n  }\n\n  .sm\\:underline {\n    text-decoration: underline;\n  }\n\n  .sm\\:line-through {\n    text-decoration: line-through;\n  }\n\n  .sm\\:no-underline {\n    text-decoration: none;\n  }\n\n  .sm\\:antialiased {\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  .sm\\:subpixel-antialiased {\n    -webkit-font-smoothing: auto;\n    -moz-osx-font-smoothing: auto;\n  }\n\n  .sm\\:hover\\:italic:hover {\n    font-style: italic;\n  }\n\n  .sm\\:hover\\:roman:hover {\n    font-style: normal;\n  }\n\n  .sm\\:hover\\:uppercase:hover {\n    text-transform: uppercase;\n  }\n\n  .sm\\:hover\\:lowercase:hover {\n    text-transform: lowercase;\n  }\n\n  .sm\\:hover\\:capitalize:hover {\n    text-transform: capitalize;\n  }\n\n  .sm\\:hover\\:normal-case:hover {\n    text-transform: none;\n  }\n\n  .sm\\:hover\\:underline:hover {\n    text-decoration: underline;\n  }\n\n  .sm\\:hover\\:line-through:hover {\n    text-decoration: line-through;\n  }\n\n  .sm\\:hover\\:no-underline:hover {\n    text-decoration: none;\n  }\n\n  .sm\\:hover\\:antialiased:hover {\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  .sm\\:hover\\:subpixel-antialiased:hover {\n    -webkit-font-smoothing: auto;\n    -moz-osx-font-smoothing: auto;\n  }\n\n  .sm\\:tracking-tight {\n    letter-spacing: -0.05em;\n  }\n\n  .sm\\:tracking-normal {\n    letter-spacing: 0;\n  }\n\n  .sm\\:tracking-wide {\n    letter-spacing: .05em;\n  }\n\n  .sm\\:select-none {\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n  }\n\n  .sm\\:select-text {\n    -webkit-user-select: text;\n       -moz-user-select: text;\n        -ms-user-select: text;\n            user-select: text;\n  }\n\n  .sm\\:align-baseline {\n    vertical-align: baseline;\n  }\n\n  .sm\\:align-top {\n    vertical-align: top;\n  }\n\n  .sm\\:align-middle {\n    vertical-align: middle;\n  }\n\n  .sm\\:align-bottom {\n    vertical-align: bottom;\n  }\n\n  .sm\\:align-text-top {\n    vertical-align: text-top;\n  }\n\n  .sm\\:align-text-bottom {\n    vertical-align: text-bottom;\n  }\n\n  .sm\\:visible {\n    visibility: visible;\n  }\n\n  .sm\\:invisible {\n    visibility: hidden;\n  }\n\n  .sm\\:whitespace-normal {\n    white-space: normal;\n  }\n\n  .sm\\:whitespace-no-wrap {\n    white-space: nowrap;\n  }\n\n  .sm\\:whitespace-pre {\n    white-space: pre;\n  }\n\n  .sm\\:whitespace-pre-line {\n    white-space: pre-line;\n  }\n\n  .sm\\:whitespace-pre-wrap {\n    white-space: pre-wrap;\n  }\n\n  .sm\\:break-words {\n    word-wrap: break-word;\n  }\n\n  .sm\\:break-normal {\n    word-wrap: normal;\n  }\n\n  .sm\\:truncate {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .sm\\:w-1 {\n    width: .25rem;\n  }\n\n  .sm\\:w-2 {\n    width: .5rem;\n  }\n\n  .sm\\:w-3 {\n    width: .75rem;\n  }\n\n  .sm\\:w-4 {\n    width: 1rem;\n  }\n\n  .sm\\:w-6 {\n    width: 1.5rem;\n  }\n\n  .sm\\:w-8 {\n    width: 2rem;\n  }\n\n  .sm\\:w-10 {\n    width: 2.5rem;\n  }\n\n  .sm\\:w-12 {\n    width: 3rem;\n  }\n\n  .sm\\:w-16 {\n    width: 4rem;\n  }\n\n  .sm\\:w-24 {\n    width: 6rem;\n  }\n\n  .sm\\:w-32 {\n    width: 8rem;\n  }\n\n  .sm\\:w-48 {\n    width: 12rem;\n  }\n\n  .sm\\:w-64 {\n    width: 16rem;\n  }\n\n  .sm\\:w-auto {\n    width: auto;\n  }\n\n  .sm\\:w-px {\n    width: 1px;\n  }\n\n  .sm\\:w-1\\/2 {\n    width: 50%;\n  }\n\n  .sm\\:w-1\\/3 {\n    width: 33.33333%;\n  }\n\n  .sm\\:w-2\\/3 {\n    width: 66.66667%;\n  }\n\n  .sm\\:w-1\\/4 {\n    width: 25%;\n  }\n\n  .sm\\:w-3\\/4 {\n    width: 75%;\n  }\n\n  .sm\\:w-1\\/5 {\n    width: 20%;\n  }\n\n  .sm\\:w-2\\/5 {\n    width: 40%;\n  }\n\n  .sm\\:w-3\\/5 {\n    width: 60%;\n  }\n\n  .sm\\:w-4\\/5 {\n    width: 80%;\n  }\n\n  .sm\\:w-1\\/6 {\n    width: 16.66667%;\n  }\n\n  .sm\\:w-5\\/6 {\n    width: 83.33333%;\n  }\n\n  .sm\\:w-full {\n    width: 100%;\n  }\n\n  .sm\\:w-screen {\n    width: 100vw;\n  }\n\n  .sm\\:z-0 {\n    z-index: 0;\n  }\n\n  .sm\\:z-10 {\n    z-index: 10;\n  }\n\n  .sm\\:z-20 {\n    z-index: 20;\n  }\n\n  .sm\\:z-30 {\n    z-index: 30;\n  }\n\n  .sm\\:z-40 {\n    z-index: 40;\n  }\n\n  .sm\\:z-50 {\n    z-index: 50;\n  }\n\n  .sm\\:z-auto {\n    z-index: auto;\n  }\n}\n\n@media (min-width: 768px) {\n  .md\\:list-reset {\n    list-style: none;\n    padding: 0;\n  }\n\n  .md\\:appearance-none {\n    -webkit-appearance: none;\n       -moz-appearance: none;\n            appearance: none;\n  }\n\n  .md\\:bg-fixed {\n    background-attachment: fixed;\n  }\n\n  .md\\:bg-local {\n    background-attachment: local;\n  }\n\n  .md\\:bg-scroll {\n    background-attachment: scroll;\n  }\n\n  .md\\:bg-transparent {\n    background-color: transparent;\n  }\n\n  .md\\:bg-black {\n    background-color: #22292f;\n  }\n\n  .md\\:bg-grey-darkest {\n    background-color: #3d4852;\n  }\n\n  .md\\:bg-grey-darker {\n    background-color: #606f7b;\n  }\n\n  .md\\:bg-grey-dark {\n    background-color: #8795a1;\n  }\n\n  .md\\:bg-grey {\n    background-color: #b8c2cc;\n  }\n\n  .md\\:bg-grey-light {\n    background-color: #dae1e7;\n  }\n\n  .md\\:bg-grey-lighter {\n    background-color: #f1f5f8;\n  }\n\n  .md\\:bg-grey-lightest {\n    background-color: #f8fafc;\n  }\n\n  .md\\:bg-white {\n    background-color: #fff;\n  }\n\n  .md\\:bg-red-darkest {\n    background-color: #3b0d0c;\n  }\n\n  .md\\:bg-red-darker {\n    background-color: #621b18;\n  }\n\n  .md\\:bg-red-dark {\n    background-color: #cc1f1a;\n  }\n\n  .md\\:bg-red {\n    background-color: #e3342f;\n  }\n\n  .md\\:bg-red-light {\n    background-color: #ef5753;\n  }\n\n  .md\\:bg-red-lighter {\n    background-color: #f9acaa;\n  }\n\n  .md\\:bg-red-lightest {\n    background-color: #fcebea;\n  }\n\n  .md\\:bg-orange-darkest {\n    background-color: #462a16;\n  }\n\n  .md\\:bg-orange-darker {\n    background-color: #613b1f;\n  }\n\n  .md\\:bg-orange-dark {\n    background-color: #de751f;\n  }\n\n  .md\\:bg-orange {\n    background-color: #f6993f;\n  }\n\n  .md\\:bg-orange-light {\n    background-color: #faad63;\n  }\n\n  .md\\:bg-orange-lighter {\n    background-color: #fcd9b6;\n  }\n\n  .md\\:bg-orange-lightest {\n    background-color: #fff5eb;\n  }\n\n  .md\\:bg-yellow-darkest {\n    background-color: #453411;\n  }\n\n  .md\\:bg-yellow-darker {\n    background-color: #684f1d;\n  }\n\n  .md\\:bg-yellow-dark {\n    background-color: #f2d024;\n  }\n\n  .md\\:bg-yellow {\n    background-color: #ffed4a;\n  }\n\n  .md\\:bg-yellow-light {\n    background-color: #fff382;\n  }\n\n  .md\\:bg-yellow-lighter {\n    background-color: #fff9c2;\n  }\n\n  .md\\:bg-yellow-lightest {\n    background-color: #fcfbeb;\n  }\n\n  .md\\:bg-green-darkest {\n    background-color: #0f2f21;\n  }\n\n  .md\\:bg-green-darker {\n    background-color: #1a4731;\n  }\n\n  .md\\:bg-green-dark {\n    background-color: #1f9d55;\n  }\n\n  .md\\:bg-green {\n    background-color: #38c172;\n  }\n\n  .md\\:bg-green-light {\n    background-color: #51d88a;\n  }\n\n  .md\\:bg-green-lighter {\n    background-color: #a2f5bf;\n  }\n\n  .md\\:bg-green-lightest {\n    background-color: #e3fcec;\n  }\n\n  .md\\:bg-teal-darkest {\n    background-color: #0d3331;\n  }\n\n  .md\\:bg-teal-darker {\n    background-color: #20504f;\n  }\n\n  .md\\:bg-teal-dark {\n    background-color: #38a89d;\n  }\n\n  .md\\:bg-teal {\n    background-color: #4dc0b5;\n  }\n\n  .md\\:bg-teal-light {\n    background-color: #64d5ca;\n  }\n\n  .md\\:bg-teal-lighter {\n    background-color: #a0f0ed;\n  }\n\n  .md\\:bg-teal-lightest {\n    background-color: #e8fffe;\n  }\n\n  .md\\:bg-blue-darkest {\n    background-color: #12283a;\n  }\n\n  .md\\:bg-blue-darker {\n    background-color: #1c3d5a;\n  }\n\n  .md\\:bg-blue-dark {\n    background-color: #2779bd;\n  }\n\n  .md\\:bg-blue {\n    background-color: #3490dc;\n  }\n\n  .md\\:bg-blue-light {\n    background-color: #6cb2eb;\n  }\n\n  .md\\:bg-blue-lighter {\n    background-color: #bcdefa;\n  }\n\n  .md\\:bg-blue-lightest {\n    background-color: #eff8ff;\n  }\n\n  .md\\:bg-indigo-darkest {\n    background-color: #191e38;\n  }\n\n  .md\\:bg-indigo-darker {\n    background-color: #2f365f;\n  }\n\n  .md\\:bg-indigo-dark {\n    background-color: #5661b3;\n  }\n\n  .md\\:bg-indigo {\n    background-color: #6574cd;\n  }\n\n  .md\\:bg-indigo-light {\n    background-color: #7886d7;\n  }\n\n  .md\\:bg-indigo-lighter {\n    background-color: #b2b7ff;\n  }\n\n  .md\\:bg-indigo-lightest {\n    background-color: #e6e8ff;\n  }\n\n  .md\\:bg-purple-darkest {\n    background-color: #21183c;\n  }\n\n  .md\\:bg-purple-darker {\n    background-color: #382b5f;\n  }\n\n  .md\\:bg-purple-dark {\n    background-color: #794acf;\n  }\n\n  .md\\:bg-purple {\n    background-color: #9561e2;\n  }\n\n  .md\\:bg-purple-light {\n    background-color: #a779e9;\n  }\n\n  .md\\:bg-purple-lighter {\n    background-color: #d6bbfc;\n  }\n\n  .md\\:bg-purple-lightest {\n    background-color: #f3ebff;\n  }\n\n  .md\\:bg-pink-darkest {\n    background-color: #451225;\n  }\n\n  .md\\:bg-pink-darker {\n    background-color: #6f213f;\n  }\n\n  .md\\:bg-pink-dark {\n    background-color: #eb5286;\n  }\n\n  .md\\:bg-pink {\n    background-color: #f66d9b;\n  }\n\n  .md\\:bg-pink-light {\n    background-color: #fa7ea8;\n  }\n\n  .md\\:bg-pink-lighter {\n    background-color: #ffbbca;\n  }\n\n  .md\\:bg-pink-lightest {\n    background-color: #ffebef;\n  }\n\n  .md\\:hover\\:bg-transparent:hover {\n    background-color: transparent;\n  }\n\n  .md\\:hover\\:bg-black:hover {\n    background-color: #22292f;\n  }\n\n  .md\\:hover\\:bg-grey-darkest:hover {\n    background-color: #3d4852;\n  }\n\n  .md\\:hover\\:bg-grey-darker:hover {\n    background-color: #606f7b;\n  }\n\n  .md\\:hover\\:bg-grey-dark:hover {\n    background-color: #8795a1;\n  }\n\n  .md\\:hover\\:bg-grey:hover {\n    background-color: #b8c2cc;\n  }\n\n  .md\\:hover\\:bg-grey-light:hover {\n    background-color: #dae1e7;\n  }\n\n  .md\\:hover\\:bg-grey-lighter:hover {\n    background-color: #f1f5f8;\n  }\n\n  .md\\:hover\\:bg-grey-lightest:hover {\n    background-color: #f8fafc;\n  }\n\n  .md\\:hover\\:bg-white:hover {\n    background-color: #fff;\n  }\n\n  .md\\:hover\\:bg-red-darkest:hover {\n    background-color: #3b0d0c;\n  }\n\n  .md\\:hover\\:bg-red-darker:hover {\n    background-color: #621b18;\n  }\n\n  .md\\:hover\\:bg-red-dark:hover {\n    background-color: #cc1f1a;\n  }\n\n  .md\\:hover\\:bg-red:hover {\n    background-color: #e3342f;\n  }\n\n  .md\\:hover\\:bg-red-light:hover {\n    background-color: #ef5753;\n  }\n\n  .md\\:hover\\:bg-red-lighter:hover {\n    background-color: #f9acaa;\n  }\n\n  .md\\:hover\\:bg-red-lightest:hover {\n    background-color: #fcebea;\n  }\n\n  .md\\:hover\\:bg-orange-darkest:hover {\n    background-color: #462a16;\n  }\n\n  .md\\:hover\\:bg-orange-darker:hover {\n    background-color: #613b1f;\n  }\n\n  .md\\:hover\\:bg-orange-dark:hover {\n    background-color: #de751f;\n  }\n\n  .md\\:hover\\:bg-orange:hover {\n    background-color: #f6993f;\n  }\n\n  .md\\:hover\\:bg-orange-light:hover {\n    background-color: #faad63;\n  }\n\n  .md\\:hover\\:bg-orange-lighter:hover {\n    background-color: #fcd9b6;\n  }\n\n  .md\\:hover\\:bg-orange-lightest:hover {\n    background-color: #fff5eb;\n  }\n\n  .md\\:hover\\:bg-yellow-darkest:hover {\n    background-color: #453411;\n  }\n\n  .md\\:hover\\:bg-yellow-darker:hover {\n    background-color: #684f1d;\n  }\n\n  .md\\:hover\\:bg-yellow-dark:hover {\n    background-color: #f2d024;\n  }\n\n  .md\\:hover\\:bg-yellow:hover {\n    background-color: #ffed4a;\n  }\n\n  .md\\:hover\\:bg-yellow-light:hover {\n    background-color: #fff382;\n  }\n\n  .md\\:hover\\:bg-yellow-lighter:hover {\n    background-color: #fff9c2;\n  }\n\n  .md\\:hover\\:bg-yellow-lightest:hover {\n    background-color: #fcfbeb;\n  }\n\n  .md\\:hover\\:bg-green-darkest:hover {\n    background-color: #0f2f21;\n  }\n\n  .md\\:hover\\:bg-green-darker:hover {\n    background-color: #1a4731;\n  }\n\n  .md\\:hover\\:bg-green-dark:hover {\n    background-color: #1f9d55;\n  }\n\n  .md\\:hover\\:bg-green:hover {\n    background-color: #38c172;\n  }\n\n  .md\\:hover\\:bg-green-light:hover {\n    background-color: #51d88a;\n  }\n\n  .md\\:hover\\:bg-green-lighter:hover {\n    background-color: #a2f5bf;\n  }\n\n  .md\\:hover\\:bg-green-lightest:hover {\n    background-color: #e3fcec;\n  }\n\n  .md\\:hover\\:bg-teal-darkest:hover {\n    background-color: #0d3331;\n  }\n\n  .md\\:hover\\:bg-teal-darker:hover {\n    background-color: #20504f;\n  }\n\n  .md\\:hover\\:bg-teal-dark:hover {\n    background-color: #38a89d;\n  }\n\n  .md\\:hover\\:bg-teal:hover {\n    background-color: #4dc0b5;\n  }\n\n  .md\\:hover\\:bg-teal-light:hover {\n    background-color: #64d5ca;\n  }\n\n  .md\\:hover\\:bg-teal-lighter:hover {\n    background-color: #a0f0ed;\n  }\n\n  .md\\:hover\\:bg-teal-lightest:hover {\n    background-color: #e8fffe;\n  }\n\n  .md\\:hover\\:bg-blue-darkest:hover {\n    background-color: #12283a;\n  }\n\n  .md\\:hover\\:bg-blue-darker:hover {\n    background-color: #1c3d5a;\n  }\n\n  .md\\:hover\\:bg-blue-dark:hover {\n    background-color: #2779bd;\n  }\n\n  .md\\:hover\\:bg-blue:hover {\n    background-color: #3490dc;\n  }\n\n  .md\\:hover\\:bg-blue-light:hover {\n    background-color: #6cb2eb;\n  }\n\n  .md\\:hover\\:bg-blue-lighter:hover {\n    background-color: #bcdefa;\n  }\n\n  .md\\:hover\\:bg-blue-lightest:hover {\n    background-color: #eff8ff;\n  }\n\n  .md\\:hover\\:bg-indigo-darkest:hover {\n    background-color: #191e38;\n  }\n\n  .md\\:hover\\:bg-indigo-darker:hover {\n    background-color: #2f365f;\n  }\n\n  .md\\:hover\\:bg-indigo-dark:hover {\n    background-color: #5661b3;\n  }\n\n  .md\\:hover\\:bg-indigo:hover {\n    background-color: #6574cd;\n  }\n\n  .md\\:hover\\:bg-indigo-light:hover {\n    background-color: #7886d7;\n  }\n\n  .md\\:hover\\:bg-indigo-lighter:hover {\n    background-color: #b2b7ff;\n  }\n\n  .md\\:hover\\:bg-indigo-lightest:hover {\n    background-color: #e6e8ff;\n  }\n\n  .md\\:hover\\:bg-purple-darkest:hover {\n    background-color: #21183c;\n  }\n\n  .md\\:hover\\:bg-purple-darker:hover {\n    background-color: #382b5f;\n  }\n\n  .md\\:hover\\:bg-purple-dark:hover {\n    background-color: #794acf;\n  }\n\n  .md\\:hover\\:bg-purple:hover {\n    background-color: #9561e2;\n  }\n\n  .md\\:hover\\:bg-purple-light:hover {\n    background-color: #a779e9;\n  }\n\n  .md\\:hover\\:bg-purple-lighter:hover {\n    background-color: #d6bbfc;\n  }\n\n  .md\\:hover\\:bg-purple-lightest:hover {\n    background-color: #f3ebff;\n  }\n\n  .md\\:hover\\:bg-pink-darkest:hover {\n    background-color: #451225;\n  }\n\n  .md\\:hover\\:bg-pink-darker:hover {\n    background-color: #6f213f;\n  }\n\n  .md\\:hover\\:bg-pink-dark:hover {\n    background-color: #eb5286;\n  }\n\n  .md\\:hover\\:bg-pink:hover {\n    background-color: #f66d9b;\n  }\n\n  .md\\:hover\\:bg-pink-light:hover {\n    background-color: #fa7ea8;\n  }\n\n  .md\\:hover\\:bg-pink-lighter:hover {\n    background-color: #ffbbca;\n  }\n\n  .md\\:hover\\:bg-pink-lightest:hover {\n    background-color: #ffebef;\n  }\n\n  .md\\:bg-bottom {\n    background-position: bottom;\n  }\n\n  .md\\:bg-center {\n    background-position: center;\n  }\n\n  .md\\:bg-left {\n    background-position: left;\n  }\n\n  .md\\:bg-left-bottom {\n    background-position: left bottom;\n  }\n\n  .md\\:bg-left-top {\n    background-position: left top;\n  }\n\n  .md\\:bg-right {\n    background-position: right;\n  }\n\n  .md\\:bg-right-bottom {\n    background-position: right bottom;\n  }\n\n  .md\\:bg-right-top {\n    background-position: right top;\n  }\n\n  .md\\:bg-top {\n    background-position: top;\n  }\n\n  .md\\:bg-repeat {\n    background-repeat: repeat;\n  }\n\n  .md\\:bg-no-repeat {\n    background-repeat: no-repeat;\n  }\n\n  .md\\:bg-repeat-x {\n    background-repeat: repeat-x;\n  }\n\n  .md\\:bg-repeat-y {\n    background-repeat: repeat-y;\n  }\n\n  .md\\:bg-auto {\n    background-size: auto;\n  }\n\n  .md\\:bg-cover {\n    background-size: cover;\n  }\n\n  .md\\:bg-contain {\n    background-size: contain;\n  }\n\n  .md\\:border-transparent {\n    border-color: transparent;\n  }\n\n  .md\\:border-black {\n    border-color: #22292f;\n  }\n\n  .md\\:border-grey-darkest {\n    border-color: #3d4852;\n  }\n\n  .md\\:border-grey-darker {\n    border-color: #606f7b;\n  }\n\n  .md\\:border-grey-dark {\n    border-color: #8795a1;\n  }\n\n  .md\\:border-grey {\n    border-color: #b8c2cc;\n  }\n\n  .md\\:border-grey-light {\n    border-color: #dae1e7;\n  }\n\n  .md\\:border-grey-lighter {\n    border-color: #f1f5f8;\n  }\n\n  .md\\:border-grey-lightest {\n    border-color: #f8fafc;\n  }\n\n  .md\\:border-white {\n    border-color: #fff;\n  }\n\n  .md\\:border-red-darkest {\n    border-color: #3b0d0c;\n  }\n\n  .md\\:border-red-darker {\n    border-color: #621b18;\n  }\n\n  .md\\:border-red-dark {\n    border-color: #cc1f1a;\n  }\n\n  .md\\:border-red {\n    border-color: #e3342f;\n  }\n\n  .md\\:border-red-light {\n    border-color: #ef5753;\n  }\n\n  .md\\:border-red-lighter {\n    border-color: #f9acaa;\n  }\n\n  .md\\:border-red-lightest {\n    border-color: #fcebea;\n  }\n\n  .md\\:border-orange-darkest {\n    border-color: #462a16;\n  }\n\n  .md\\:border-orange-darker {\n    border-color: #613b1f;\n  }\n\n  .md\\:border-orange-dark {\n    border-color: #de751f;\n  }\n\n  .md\\:border-orange {\n    border-color: #f6993f;\n  }\n\n  .md\\:border-orange-light {\n    border-color: #faad63;\n  }\n\n  .md\\:border-orange-lighter {\n    border-color: #fcd9b6;\n  }\n\n  .md\\:border-orange-lightest {\n    border-color: #fff5eb;\n  }\n\n  .md\\:border-yellow-darkest {\n    border-color: #453411;\n  }\n\n  .md\\:border-yellow-darker {\n    border-color: #684f1d;\n  }\n\n  .md\\:border-yellow-dark {\n    border-color: #f2d024;\n  }\n\n  .md\\:border-yellow {\n    border-color: #ffed4a;\n  }\n\n  .md\\:border-yellow-light {\n    border-color: #fff382;\n  }\n\n  .md\\:border-yellow-lighter {\n    border-color: #fff9c2;\n  }\n\n  .md\\:border-yellow-lightest {\n    border-color: #fcfbeb;\n  }\n\n  .md\\:border-green-darkest {\n    border-color: #0f2f21;\n  }\n\n  .md\\:border-green-darker {\n    border-color: #1a4731;\n  }\n\n  .md\\:border-green-dark {\n    border-color: #1f9d55;\n  }\n\n  .md\\:border-green {\n    border-color: #38c172;\n  }\n\n  .md\\:border-green-light {\n    border-color: #51d88a;\n  }\n\n  .md\\:border-green-lighter {\n    border-color: #a2f5bf;\n  }\n\n  .md\\:border-green-lightest {\n    border-color: #e3fcec;\n  }\n\n  .md\\:border-teal-darkest {\n    border-color: #0d3331;\n  }\n\n  .md\\:border-teal-darker {\n    border-color: #20504f;\n  }\n\n  .md\\:border-teal-dark {\n    border-color: #38a89d;\n  }\n\n  .md\\:border-teal {\n    border-color: #4dc0b5;\n  }\n\n  .md\\:border-teal-light {\n    border-color: #64d5ca;\n  }\n\n  .md\\:border-teal-lighter {\n    border-color: #a0f0ed;\n  }\n\n  .md\\:border-teal-lightest {\n    border-color: #e8fffe;\n  }\n\n  .md\\:border-blue-darkest {\n    border-color: #12283a;\n  }\n\n  .md\\:border-blue-darker {\n    border-color: #1c3d5a;\n  }\n\n  .md\\:border-blue-dark {\n    border-color: #2779bd;\n  }\n\n  .md\\:border-blue {\n    border-color: #3490dc;\n  }\n\n  .md\\:border-blue-light {\n    border-color: #6cb2eb;\n  }\n\n  .md\\:border-blue-lighter {\n    border-color: #bcdefa;\n  }\n\n  .md\\:border-blue-lightest {\n    border-color: #eff8ff;\n  }\n\n  .md\\:border-indigo-darkest {\n    border-color: #191e38;\n  }\n\n  .md\\:border-indigo-darker {\n    border-color: #2f365f;\n  }\n\n  .md\\:border-indigo-dark {\n    border-color: #5661b3;\n  }\n\n  .md\\:border-indigo {\n    border-color: #6574cd;\n  }\n\n  .md\\:border-indigo-light {\n    border-color: #7886d7;\n  }\n\n  .md\\:border-indigo-lighter {\n    border-color: #b2b7ff;\n  }\n\n  .md\\:border-indigo-lightest {\n    border-color: #e6e8ff;\n  }\n\n  .md\\:border-purple-darkest {\n    border-color: #21183c;\n  }\n\n  .md\\:border-purple-darker {\n    border-color: #382b5f;\n  }\n\n  .md\\:border-purple-dark {\n    border-color: #794acf;\n  }\n\n  .md\\:border-purple {\n    border-color: #9561e2;\n  }\n\n  .md\\:border-purple-light {\n    border-color: #a779e9;\n  }\n\n  .md\\:border-purple-lighter {\n    border-color: #d6bbfc;\n  }\n\n  .md\\:border-purple-lightest {\n    border-color: #f3ebff;\n  }\n\n  .md\\:border-pink-darkest {\n    border-color: #451225;\n  }\n\n  .md\\:border-pink-darker {\n    border-color: #6f213f;\n  }\n\n  .md\\:border-pink-dark {\n    border-color: #eb5286;\n  }\n\n  .md\\:border-pink {\n    border-color: #f66d9b;\n  }\n\n  .md\\:border-pink-light {\n    border-color: #fa7ea8;\n  }\n\n  .md\\:border-pink-lighter {\n    border-color: #ffbbca;\n  }\n\n  .md\\:border-pink-lightest {\n    border-color: #ffebef;\n  }\n\n  .md\\:hover\\:border-transparent:hover {\n    border-color: transparent;\n  }\n\n  .md\\:hover\\:border-black:hover {\n    border-color: #22292f;\n  }\n\n  .md\\:hover\\:border-grey-darkest:hover {\n    border-color: #3d4852;\n  }\n\n  .md\\:hover\\:border-grey-darker:hover {\n    border-color: #606f7b;\n  }\n\n  .md\\:hover\\:border-grey-dark:hover {\n    border-color: #8795a1;\n  }\n\n  .md\\:hover\\:border-grey:hover {\n    border-color: #b8c2cc;\n  }\n\n  .md\\:hover\\:border-grey-light:hover {\n    border-color: #dae1e7;\n  }\n\n  .md\\:hover\\:border-grey-lighter:hover {\n    border-color: #f1f5f8;\n  }\n\n  .md\\:hover\\:border-grey-lightest:hover {\n    border-color: #f8fafc;\n  }\n\n  .md\\:hover\\:border-white:hover {\n    border-color: #fff;\n  }\n\n  .md\\:hover\\:border-red-darkest:hover {\n    border-color: #3b0d0c;\n  }\n\n  .md\\:hover\\:border-red-darker:hover {\n    border-color: #621b18;\n  }\n\n  .md\\:hover\\:border-red-dark:hover {\n    border-color: #cc1f1a;\n  }\n\n  .md\\:hover\\:border-red:hover {\n    border-color: #e3342f;\n  }\n\n  .md\\:hover\\:border-red-light:hover {\n    border-color: #ef5753;\n  }\n\n  .md\\:hover\\:border-red-lighter:hover {\n    border-color: #f9acaa;\n  }\n\n  .md\\:hover\\:border-red-lightest:hover {\n    border-color: #fcebea;\n  }\n\n  .md\\:hover\\:border-orange-darkest:hover {\n    border-color: #462a16;\n  }\n\n  .md\\:hover\\:border-orange-darker:hover {\n    border-color: #613b1f;\n  }\n\n  .md\\:hover\\:border-orange-dark:hover {\n    border-color: #de751f;\n  }\n\n  .md\\:hover\\:border-orange:hover {\n    border-color: #f6993f;\n  }\n\n  .md\\:hover\\:border-orange-light:hover {\n    border-color: #faad63;\n  }\n\n  .md\\:hover\\:border-orange-lighter:hover {\n    border-color: #fcd9b6;\n  }\n\n  .md\\:hover\\:border-orange-lightest:hover {\n    border-color: #fff5eb;\n  }\n\n  .md\\:hover\\:border-yellow-darkest:hover {\n    border-color: #453411;\n  }\n\n  .md\\:hover\\:border-yellow-darker:hover {\n    border-color: #684f1d;\n  }\n\n  .md\\:hover\\:border-yellow-dark:hover {\n    border-color: #f2d024;\n  }\n\n  .md\\:hover\\:border-yellow:hover {\n    border-color: #ffed4a;\n  }\n\n  .md\\:hover\\:border-yellow-light:hover {\n    border-color: #fff382;\n  }\n\n  .md\\:hover\\:border-yellow-lighter:hover {\n    border-color: #fff9c2;\n  }\n\n  .md\\:hover\\:border-yellow-lightest:hover {\n    border-color: #fcfbeb;\n  }\n\n  .md\\:hover\\:border-green-darkest:hover {\n    border-color: #0f2f21;\n  }\n\n  .md\\:hover\\:border-green-darker:hover {\n    border-color: #1a4731;\n  }\n\n  .md\\:hover\\:border-green-dark:hover {\n    border-color: #1f9d55;\n  }\n\n  .md\\:hover\\:border-green:hover {\n    border-color: #38c172;\n  }\n\n  .md\\:hover\\:border-green-light:hover {\n    border-color: #51d88a;\n  }\n\n  .md\\:hover\\:border-green-lighter:hover {\n    border-color: #a2f5bf;\n  }\n\n  .md\\:hover\\:border-green-lightest:hover {\n    border-color: #e3fcec;\n  }\n\n  .md\\:hover\\:border-teal-darkest:hover {\n    border-color: #0d3331;\n  }\n\n  .md\\:hover\\:border-teal-darker:hover {\n    border-color: #20504f;\n  }\n\n  .md\\:hover\\:border-teal-dark:hover {\n    border-color: #38a89d;\n  }\n\n  .md\\:hover\\:border-teal:hover {\n    border-color: #4dc0b5;\n  }\n\n  .md\\:hover\\:border-teal-light:hover {\n    border-color: #64d5ca;\n  }\n\n  .md\\:hover\\:border-teal-lighter:hover {\n    border-color: #a0f0ed;\n  }\n\n  .md\\:hover\\:border-teal-lightest:hover {\n    border-color: #e8fffe;\n  }\n\n  .md\\:hover\\:border-blue-darkest:hover {\n    border-color: #12283a;\n  }\n\n  .md\\:hover\\:border-blue-darker:hover {\n    border-color: #1c3d5a;\n  }\n\n  .md\\:hover\\:border-blue-dark:hover {\n    border-color: #2779bd;\n  }\n\n  .md\\:hover\\:border-blue:hover {\n    border-color: #3490dc;\n  }\n\n  .md\\:hover\\:border-blue-light:hover {\n    border-color: #6cb2eb;\n  }\n\n  .md\\:hover\\:border-blue-lighter:hover {\n    border-color: #bcdefa;\n  }\n\n  .md\\:hover\\:border-blue-lightest:hover {\n    border-color: #eff8ff;\n  }\n\n  .md\\:hover\\:border-indigo-darkest:hover {\n    border-color: #191e38;\n  }\n\n  .md\\:hover\\:border-indigo-darker:hover {\n    border-color: #2f365f;\n  }\n\n  .md\\:hover\\:border-indigo-dark:hover {\n    border-color: #5661b3;\n  }\n\n  .md\\:hover\\:border-indigo:hover {\n    border-color: #6574cd;\n  }\n\n  .md\\:hover\\:border-indigo-light:hover {\n    border-color: #7886d7;\n  }\n\n  .md\\:hover\\:border-indigo-lighter:hover {\n    border-color: #b2b7ff;\n  }\n\n  .md\\:hover\\:border-indigo-lightest:hover {\n    border-color: #e6e8ff;\n  }\n\n  .md\\:hover\\:border-purple-darkest:hover {\n    border-color: #21183c;\n  }\n\n  .md\\:hover\\:border-purple-darker:hover {\n    border-color: #382b5f;\n  }\n\n  .md\\:hover\\:border-purple-dark:hover {\n    border-color: #794acf;\n  }\n\n  .md\\:hover\\:border-purple:hover {\n    border-color: #9561e2;\n  }\n\n  .md\\:hover\\:border-purple-light:hover {\n    border-color: #a779e9;\n  }\n\n  .md\\:hover\\:border-purple-lighter:hover {\n    border-color: #d6bbfc;\n  }\n\n  .md\\:hover\\:border-purple-lightest:hover {\n    border-color: #f3ebff;\n  }\n\n  .md\\:hover\\:border-pink-darkest:hover {\n    border-color: #451225;\n  }\n\n  .md\\:hover\\:border-pink-darker:hover {\n    border-color: #6f213f;\n  }\n\n  .md\\:hover\\:border-pink-dark:hover {\n    border-color: #eb5286;\n  }\n\n  .md\\:hover\\:border-pink:hover {\n    border-color: #f66d9b;\n  }\n\n  .md\\:hover\\:border-pink-light:hover {\n    border-color: #fa7ea8;\n  }\n\n  .md\\:hover\\:border-pink-lighter:hover {\n    border-color: #ffbbca;\n  }\n\n  .md\\:hover\\:border-pink-lightest:hover {\n    border-color: #ffebef;\n  }\n\n  .md\\:rounded-none {\n    border-radius: 0;\n  }\n\n  .md\\:rounded-sm {\n    border-radius: .125rem;\n  }\n\n  .md\\:rounded {\n    border-radius: .25rem;\n  }\n\n  .md\\:rounded-lg {\n    border-radius: .5rem;\n  }\n\n  .md\\:rounded-full {\n    border-radius: 9999px;\n  }\n\n  .md\\:rounded-t-none {\n    border-top-left-radius: 0;\n    border-top-right-radius: 0;\n  }\n\n  .md\\:rounded-r-none {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n  }\n\n  .md\\:rounded-b-none {\n    border-bottom-right-radius: 0;\n    border-bottom-left-radius: 0;\n  }\n\n  .md\\:rounded-l-none {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n  }\n\n  .md\\:rounded-t-sm {\n    border-top-left-radius: .125rem;\n    border-top-right-radius: .125rem;\n  }\n\n  .md\\:rounded-r-sm {\n    border-top-right-radius: .125rem;\n    border-bottom-right-radius: .125rem;\n  }\n\n  .md\\:rounded-b-sm {\n    border-bottom-right-radius: .125rem;\n    border-bottom-left-radius: .125rem;\n  }\n\n  .md\\:rounded-l-sm {\n    border-top-left-radius: .125rem;\n    border-bottom-left-radius: .125rem;\n  }\n\n  .md\\:rounded-t {\n    border-top-left-radius: .25rem;\n    border-top-right-radius: .25rem;\n  }\n\n  .md\\:rounded-r {\n    border-top-right-radius: .25rem;\n    border-bottom-right-radius: .25rem;\n  }\n\n  .md\\:rounded-b {\n    border-bottom-right-radius: .25rem;\n    border-bottom-left-radius: .25rem;\n  }\n\n  .md\\:rounded-l {\n    border-top-left-radius: .25rem;\n    border-bottom-left-radius: .25rem;\n  }\n\n  .md\\:rounded-t-lg {\n    border-top-left-radius: .5rem;\n    border-top-right-radius: .5rem;\n  }\n\n  .md\\:rounded-r-lg {\n    border-top-right-radius: .5rem;\n    border-bottom-right-radius: .5rem;\n  }\n\n  .md\\:rounded-b-lg {\n    border-bottom-right-radius: .5rem;\n    border-bottom-left-radius: .5rem;\n  }\n\n  .md\\:rounded-l-lg {\n    border-top-left-radius: .5rem;\n    border-bottom-left-radius: .5rem;\n  }\n\n  .md\\:rounded-t-full {\n    border-top-left-radius: 9999px;\n    border-top-right-radius: 9999px;\n  }\n\n  .md\\:rounded-r-full {\n    border-top-right-radius: 9999px;\n    border-bottom-right-radius: 9999px;\n  }\n\n  .md\\:rounded-b-full {\n    border-bottom-right-radius: 9999px;\n    border-bottom-left-radius: 9999px;\n  }\n\n  .md\\:rounded-l-full {\n    border-top-left-radius: 9999px;\n    border-bottom-left-radius: 9999px;\n  }\n\n  .md\\:rounded-tl-none {\n    border-top-left-radius: 0;\n  }\n\n  .md\\:rounded-tr-none {\n    border-top-right-radius: 0;\n  }\n\n  .md\\:rounded-br-none {\n    border-bottom-right-radius: 0;\n  }\n\n  .md\\:rounded-bl-none {\n    border-bottom-left-radius: 0;\n  }\n\n  .md\\:rounded-tl-sm {\n    border-top-left-radius: .125rem;\n  }\n\n  .md\\:rounded-tr-sm {\n    border-top-right-radius: .125rem;\n  }\n\n  .md\\:rounded-br-sm {\n    border-bottom-right-radius: .125rem;\n  }\n\n  .md\\:rounded-bl-sm {\n    border-bottom-left-radius: .125rem;\n  }\n\n  .md\\:rounded-tl {\n    border-top-left-radius: .25rem;\n  }\n\n  .md\\:rounded-tr {\n    border-top-right-radius: .25rem;\n  }\n\n  .md\\:rounded-br {\n    border-bottom-right-radius: .25rem;\n  }\n\n  .md\\:rounded-bl {\n    border-bottom-left-radius: .25rem;\n  }\n\n  .md\\:rounded-tl-lg {\n    border-top-left-radius: .5rem;\n  }\n\n  .md\\:rounded-tr-lg {\n    border-top-right-radius: .5rem;\n  }\n\n  .md\\:rounded-br-lg {\n    border-bottom-right-radius: .5rem;\n  }\n\n  .md\\:rounded-bl-lg {\n    border-bottom-left-radius: .5rem;\n  }\n\n  .md\\:rounded-tl-full {\n    border-top-left-radius: 9999px;\n  }\n\n  .md\\:rounded-tr-full {\n    border-top-right-radius: 9999px;\n  }\n\n  .md\\:rounded-br-full {\n    border-bottom-right-radius: 9999px;\n  }\n\n  .md\\:rounded-bl-full {\n    border-bottom-left-radius: 9999px;\n  }\n\n  .md\\:border-solid {\n    border-style: solid;\n  }\n\n  .md\\:border-dashed {\n    border-style: dashed;\n  }\n\n  .md\\:border-dotted {\n    border-style: dotted;\n  }\n\n  .md\\:border-none {\n    border-style: none;\n  }\n\n  .md\\:border-0 {\n    border-width: 0;\n  }\n\n  .md\\:border-2 {\n    border-width: 2px;\n  }\n\n  .md\\:border-4 {\n    border-width: 4px;\n  }\n\n  .md\\:border-8 {\n    border-width: 8px;\n  }\n\n  .md\\:border {\n    border-width: 1px;\n  }\n\n  .md\\:border-t-0 {\n    border-top-width: 0;\n  }\n\n  .md\\:border-r-0 {\n    border-right-width: 0;\n  }\n\n  .md\\:border-b-0 {\n    border-bottom-width: 0;\n  }\n\n  .md\\:border-l-0 {\n    border-left-width: 0;\n  }\n\n  .md\\:border-t-2 {\n    border-top-width: 2px;\n  }\n\n  .md\\:border-r-2 {\n    border-right-width: 2px;\n  }\n\n  .md\\:border-b-2 {\n    border-bottom-width: 2px;\n  }\n\n  .md\\:border-l-2 {\n    border-left-width: 2px;\n  }\n\n  .md\\:border-t-4 {\n    border-top-width: 4px;\n  }\n\n  .md\\:border-r-4 {\n    border-right-width: 4px;\n  }\n\n  .md\\:border-b-4 {\n    border-bottom-width: 4px;\n  }\n\n  .md\\:border-l-4 {\n    border-left-width: 4px;\n  }\n\n  .md\\:border-t-8 {\n    border-top-width: 8px;\n  }\n\n  .md\\:border-r-8 {\n    border-right-width: 8px;\n  }\n\n  .md\\:border-b-8 {\n    border-bottom-width: 8px;\n  }\n\n  .md\\:border-l-8 {\n    border-left-width: 8px;\n  }\n\n  .md\\:border-t {\n    border-top-width: 1px;\n  }\n\n  .md\\:border-r {\n    border-right-width: 1px;\n  }\n\n  .md\\:border-b {\n    border-bottom-width: 1px;\n  }\n\n  .md\\:border-l {\n    border-left-width: 1px;\n  }\n\n  .md\\:cursor-auto {\n    cursor: auto;\n  }\n\n  .md\\:cursor-default {\n    cursor: default;\n  }\n\n  .md\\:cursor-pointer {\n    cursor: pointer;\n  }\n\n  .md\\:cursor-wait {\n    cursor: wait;\n  }\n\n  .md\\:cursor-move {\n    cursor: move;\n  }\n\n  .md\\:cursor-not-allowed {\n    cursor: not-allowed;\n  }\n\n  .md\\:block {\n    display: block;\n  }\n\n  .md\\:inline-block {\n    display: inline-block;\n  }\n\n  .md\\:inline {\n    display: inline;\n  }\n\n  .md\\:table {\n    display: table;\n  }\n\n  .md\\:table-row {\n    display: table-row;\n  }\n\n  .md\\:table-cell {\n    display: table-cell;\n  }\n\n  .md\\:hidden {\n    display: none;\n  }\n\n  .md\\:flex {\n    display: flex;\n  }\n\n  .md\\:inline-flex {\n    display: inline-flex;\n  }\n\n  .md\\:flex-row {\n    flex-direction: row;\n  }\n\n  .md\\:flex-row-reverse {\n    flex-direction: row-reverse;\n  }\n\n  .md\\:flex-col {\n    flex-direction: column;\n  }\n\n  .md\\:flex-col-reverse {\n    flex-direction: column-reverse;\n  }\n\n  .md\\:flex-wrap {\n    flex-wrap: wrap;\n  }\n\n  .md\\:flex-wrap-reverse {\n    flex-wrap: wrap-reverse;\n  }\n\n  .md\\:flex-no-wrap {\n    flex-wrap: nowrap;\n  }\n\n  .md\\:items-start {\n    align-items: flex-start;\n  }\n\n  .md\\:items-end {\n    align-items: flex-end;\n  }\n\n  .md\\:items-center {\n    align-items: center;\n  }\n\n  .md\\:items-baseline {\n    align-items: baseline;\n  }\n\n  .md\\:items-stretch {\n    align-items: stretch;\n  }\n\n  .md\\:self-auto {\n    align-self: auto;\n  }\n\n  .md\\:self-start {\n    align-self: flex-start;\n  }\n\n  .md\\:self-end {\n    align-self: flex-end;\n  }\n\n  .md\\:self-center {\n    align-self: center;\n  }\n\n  .md\\:self-stretch {\n    align-self: stretch;\n  }\n\n  .md\\:justify-start {\n    justify-content: flex-start;\n  }\n\n  .md\\:justify-end {\n    justify-content: flex-end;\n  }\n\n  .md\\:justify-center {\n    justify-content: center;\n  }\n\n  .md\\:justify-between {\n    justify-content: space-between;\n  }\n\n  .md\\:justify-around {\n    justify-content: space-around;\n  }\n\n  .md\\:content-center {\n    align-content: center;\n  }\n\n  .md\\:content-start {\n    align-content: flex-start;\n  }\n\n  .md\\:content-end {\n    align-content: flex-end;\n  }\n\n  .md\\:content-between {\n    align-content: space-between;\n  }\n\n  .md\\:content-around {\n    align-content: space-around;\n  }\n\n  .md\\:flex-1 {\n    flex: 1;\n  }\n\n  .md\\:flex-auto {\n    flex: auto;\n  }\n\n  .md\\:flex-initial {\n    flex: initial;\n  }\n\n  .md\\:flex-none {\n    flex: none;\n  }\n\n  .md\\:flex-grow {\n    flex-grow: 1;\n  }\n\n  .md\\:flex-shrink {\n    flex-shrink: 1;\n  }\n\n  .md\\:flex-no-grow {\n    flex-grow: 0;\n  }\n\n  .md\\:flex-no-shrink {\n    flex-shrink: 0;\n  }\n\n  .md\\:float-right {\n    float: right;\n  }\n\n  .md\\:float-left {\n    float: left;\n  }\n\n  .md\\:float-none {\n    float: none;\n  }\n\n  .md\\:clearfix:after {\n    content: \"\";\n    display: table;\n    clear: both;\n  }\n\n  .md\\:font-sans {\n    font-family: system-ui, BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;\n  }\n\n  .md\\:font-serif {\n    font-family: Constantia, Lucida Bright, Lucidabright, Lucida Serif, Lucida, DejaVu Serif, Bitstream Vera Serif, Liberation Serif, Georgia, serif;\n  }\n\n  .md\\:font-mono {\n    font-family: Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;\n  }\n\n  .md\\:font-hairline {\n    font-weight: 100;\n  }\n\n  .md\\:font-thin {\n    font-weight: 200;\n  }\n\n  .md\\:font-light {\n    font-weight: 300;\n  }\n\n  .md\\:font-normal {\n    font-weight: 400;\n  }\n\n  .md\\:font-medium {\n    font-weight: 500;\n  }\n\n  .md\\:font-semibold {\n    font-weight: 600;\n  }\n\n  .md\\:font-bold {\n    font-weight: 700;\n  }\n\n  .md\\:font-extrabold {\n    font-weight: 800;\n  }\n\n  .md\\:font-black {\n    font-weight: 900;\n  }\n\n  .md\\:hover\\:font-hairline:hover {\n    font-weight: 100;\n  }\n\n  .md\\:hover\\:font-thin:hover {\n    font-weight: 200;\n  }\n\n  .md\\:hover\\:font-light:hover {\n    font-weight: 300;\n  }\n\n  .md\\:hover\\:font-normal:hover {\n    font-weight: 400;\n  }\n\n  .md\\:hover\\:font-medium:hover {\n    font-weight: 500;\n  }\n\n  .md\\:hover\\:font-semibold:hover {\n    font-weight: 600;\n  }\n\n  .md\\:hover\\:font-bold:hover {\n    font-weight: 700;\n  }\n\n  .md\\:hover\\:font-extrabold:hover {\n    font-weight: 800;\n  }\n\n  .md\\:hover\\:font-black:hover {\n    font-weight: 900;\n  }\n\n  .md\\:h-1 {\n    height: .25rem;\n  }\n\n  .md\\:h-2 {\n    height: .5rem;\n  }\n\n  .md\\:h-3 {\n    height: .75rem;\n  }\n\n  .md\\:h-4 {\n    height: 1rem;\n  }\n\n  .md\\:h-6 {\n    height: 1.5rem;\n  }\n\n  .md\\:h-8 {\n    height: 2rem;\n  }\n\n  .md\\:h-10 {\n    height: 2.5rem;\n  }\n\n  .md\\:h-12 {\n    height: 3rem;\n  }\n\n  .md\\:h-16 {\n    height: 4rem;\n  }\n\n  .md\\:h-24 {\n    height: 6rem;\n  }\n\n  .md\\:h-32 {\n    height: 8rem;\n  }\n\n  .md\\:h-48 {\n    height: 12rem;\n  }\n\n  .md\\:h-64 {\n    height: 16rem;\n  }\n\n  .md\\:h-auto {\n    height: auto;\n  }\n\n  .md\\:h-px {\n    height: 1px;\n  }\n\n  .md\\:h-full {\n    height: 100%;\n  }\n\n  .md\\:h-screen {\n    height: 100vh;\n  }\n\n  .md\\:leading-none {\n    line-height: 1;\n  }\n\n  .md\\:leading-tight {\n    line-height: 1.25;\n  }\n\n  .md\\:leading-normal {\n    line-height: 1.5;\n  }\n\n  .md\\:leading-loose {\n    line-height: 2;\n  }\n\n  .md\\:m-0 {\n    margin: 0;\n  }\n\n  .md\\:m-1 {\n    margin: .25rem;\n  }\n\n  .md\\:m-2 {\n    margin: .5rem;\n  }\n\n  .md\\:m-3 {\n    margin: .75rem;\n  }\n\n  .md\\:m-4 {\n    margin: 1rem;\n  }\n\n  .md\\:m-6 {\n    margin: 1.5rem;\n  }\n\n  .md\\:m-8 {\n    margin: 2rem;\n  }\n\n  .md\\:m-auto {\n    margin: auto;\n  }\n\n  .md\\:m-px {\n    margin: 1px;\n  }\n\n  .md\\:my-0 {\n    margin-top: 0;\n    margin-bottom: 0;\n  }\n\n  .md\\:mx-0 {\n    margin-left: 0;\n    margin-right: 0;\n  }\n\n  .md\\:my-1 {\n    margin-top: .25rem;\n    margin-bottom: .25rem;\n  }\n\n  .md\\:mx-1 {\n    margin-left: .25rem;\n    margin-right: .25rem;\n  }\n\n  .md\\:my-2 {\n    margin-top: .5rem;\n    margin-bottom: .5rem;\n  }\n\n  .md\\:mx-2 {\n    margin-left: .5rem;\n    margin-right: .5rem;\n  }\n\n  .md\\:my-3 {\n    margin-top: .75rem;\n    margin-bottom: .75rem;\n  }\n\n  .md\\:mx-3 {\n    margin-left: .75rem;\n    margin-right: .75rem;\n  }\n\n  .md\\:my-4 {\n    margin-top: 1rem;\n    margin-bottom: 1rem;\n  }\n\n  .md\\:mx-4 {\n    margin-left: 1rem;\n    margin-right: 1rem;\n  }\n\n  .md\\:my-6 {\n    margin-top: 1.5rem;\n    margin-bottom: 1.5rem;\n  }\n\n  .md\\:mx-6 {\n    margin-left: 1.5rem;\n    margin-right: 1.5rem;\n  }\n\n  .md\\:my-8 {\n    margin-top: 2rem;\n    margin-bottom: 2rem;\n  }\n\n  .md\\:mx-8 {\n    margin-left: 2rem;\n    margin-right: 2rem;\n  }\n\n  .md\\:my-auto {\n    margin-top: auto;\n    margin-bottom: auto;\n  }\n\n  .md\\:mx-auto {\n    margin-left: auto;\n    margin-right: auto;\n  }\n\n  .md\\:my-px {\n    margin-top: 1px;\n    margin-bottom: 1px;\n  }\n\n  .md\\:mx-px {\n    margin-left: 1px;\n    margin-right: 1px;\n  }\n\n  .md\\:mt-0 {\n    margin-top: 0;\n  }\n\n  .md\\:mr-0 {\n    margin-right: 0;\n  }\n\n  .md\\:mb-0 {\n    margin-bottom: 0;\n  }\n\n  .md\\:ml-0 {\n    margin-left: 0;\n  }\n\n  .md\\:mt-1 {\n    margin-top: .25rem;\n  }\n\n  .md\\:mr-1 {\n    margin-right: .25rem;\n  }\n\n  .md\\:mb-1 {\n    margin-bottom: .25rem;\n  }\n\n  .md\\:ml-1 {\n    margin-left: .25rem;\n  }\n\n  .md\\:mt-2 {\n    margin-top: .5rem;\n  }\n\n  .md\\:mr-2 {\n    margin-right: .5rem;\n  }\n\n  .md\\:mb-2 {\n    margin-bottom: .5rem;\n  }\n\n  .md\\:ml-2 {\n    margin-left: .5rem;\n  }\n\n  .md\\:mt-3 {\n    margin-top: .75rem;\n  }\n\n  .md\\:mr-3 {\n    margin-right: .75rem;\n  }\n\n  .md\\:mb-3 {\n    margin-bottom: .75rem;\n  }\n\n  .md\\:ml-3 {\n    margin-left: .75rem;\n  }\n\n  .md\\:mt-4 {\n    margin-top: 1rem;\n  }\n\n  .md\\:mr-4 {\n    margin-right: 1rem;\n  }\n\n  .md\\:mb-4 {\n    margin-bottom: 1rem;\n  }\n\n  .md\\:ml-4 {\n    margin-left: 1rem;\n  }\n\n  .md\\:mt-6 {\n    margin-top: 1.5rem;\n  }\n\n  .md\\:mr-6 {\n    margin-right: 1.5rem;\n  }\n\n  .md\\:mb-6 {\n    margin-bottom: 1.5rem;\n  }\n\n  .md\\:ml-6 {\n    margin-left: 1.5rem;\n  }\n\n  .md\\:mt-8 {\n    margin-top: 2rem;\n  }\n\n  .md\\:mr-8 {\n    margin-right: 2rem;\n  }\n\n  .md\\:mb-8 {\n    margin-bottom: 2rem;\n  }\n\n  .md\\:ml-8 {\n    margin-left: 2rem;\n  }\n\n  .md\\:mt-auto {\n    margin-top: auto;\n  }\n\n  .md\\:mr-auto {\n    margin-right: auto;\n  }\n\n  .md\\:mb-auto {\n    margin-bottom: auto;\n  }\n\n  .md\\:ml-auto {\n    margin-left: auto;\n  }\n\n  .md\\:mt-px {\n    margin-top: 1px;\n  }\n\n  .md\\:mr-px {\n    margin-right: 1px;\n  }\n\n  .md\\:mb-px {\n    margin-bottom: 1px;\n  }\n\n  .md\\:ml-px {\n    margin-left: 1px;\n  }\n\n  .md\\:max-h-full {\n    max-height: 100%;\n  }\n\n  .md\\:max-h-screen {\n    max-height: 100vh;\n  }\n\n  .md\\:max-w-xs {\n    max-width: 20rem;\n  }\n\n  .md\\:max-w-sm {\n    max-width: 30rem;\n  }\n\n  .md\\:max-w-md {\n    max-width: 40rem;\n  }\n\n  .md\\:max-w-lg {\n    max-width: 50rem;\n  }\n\n  .md\\:max-w-xl {\n    max-width: 60rem;\n  }\n\n  .md\\:max-w-2xl {\n    max-width: 70rem;\n  }\n\n  .md\\:max-w-3xl {\n    max-width: 80rem;\n  }\n\n  .md\\:max-w-4xl {\n    max-width: 90rem;\n  }\n\n  .md\\:max-w-5xl {\n    max-width: 100rem;\n  }\n\n  .md\\:max-w-full {\n    max-width: 100%;\n  }\n\n  .md\\:min-h-0 {\n    min-height: 0;\n  }\n\n  .md\\:min-h-full {\n    min-height: 100%;\n  }\n\n  .md\\:min-h-screen {\n    min-height: 100vh;\n  }\n\n  .md\\:min-w-0 {\n    min-width: 0;\n  }\n\n  .md\\:min-w-full {\n    min-width: 100%;\n  }\n\n  .md\\:-m-0 {\n    margin: 0;\n  }\n\n  .md\\:-m-1 {\n    margin: -0.25rem;\n  }\n\n  .md\\:-m-2 {\n    margin: -0.5rem;\n  }\n\n  .md\\:-m-3 {\n    margin: -0.75rem;\n  }\n\n  .md\\:-m-4 {\n    margin: -1rem;\n  }\n\n  .md\\:-m-6 {\n    margin: -1.5rem;\n  }\n\n  .md\\:-m-8 {\n    margin: -2rem;\n  }\n\n  .md\\:-m-px {\n    margin: -1px;\n  }\n\n  .md\\:-my-0 {\n    margin-top: 0;\n    margin-bottom: 0;\n  }\n\n  .md\\:-mx-0 {\n    margin-left: 0;\n    margin-right: 0;\n  }\n\n  .md\\:-my-1 {\n    margin-top: -0.25rem;\n    margin-bottom: -0.25rem;\n  }\n\n  .md\\:-mx-1 {\n    margin-left: -0.25rem;\n    margin-right: -0.25rem;\n  }\n\n  .md\\:-my-2 {\n    margin-top: -0.5rem;\n    margin-bottom: -0.5rem;\n  }\n\n  .md\\:-mx-2 {\n    margin-left: -0.5rem;\n    margin-right: -0.5rem;\n  }\n\n  .md\\:-my-3 {\n    margin-top: -0.75rem;\n    margin-bottom: -0.75rem;\n  }\n\n  .md\\:-mx-3 {\n    margin-left: -0.75rem;\n    margin-right: -0.75rem;\n  }\n\n  .md\\:-my-4 {\n    margin-top: -1rem;\n    margin-bottom: -1rem;\n  }\n\n  .md\\:-mx-4 {\n    margin-left: -1rem;\n    margin-right: -1rem;\n  }\n\n  .md\\:-my-6 {\n    margin-top: -1.5rem;\n    margin-bottom: -1.5rem;\n  }\n\n  .md\\:-mx-6 {\n    margin-left: -1.5rem;\n    margin-right: -1.5rem;\n  }\n\n  .md\\:-my-8 {\n    margin-top: -2rem;\n    margin-bottom: -2rem;\n  }\n\n  .md\\:-mx-8 {\n    margin-left: -2rem;\n    margin-right: -2rem;\n  }\n\n  .md\\:-my-px {\n    margin-top: -1px;\n    margin-bottom: -1px;\n  }\n\n  .md\\:-mx-px {\n    margin-left: -1px;\n    margin-right: -1px;\n  }\n\n  .md\\:-mt-0 {\n    margin-top: 0;\n  }\n\n  .md\\:-mr-0 {\n    margin-right: 0;\n  }\n\n  .md\\:-mb-0 {\n    margin-bottom: 0;\n  }\n\n  .md\\:-ml-0 {\n    margin-left: 0;\n  }\n\n  .md\\:-mt-1 {\n    margin-top: -0.25rem;\n  }\n\n  .md\\:-mr-1 {\n    margin-right: -0.25rem;\n  }\n\n  .md\\:-mb-1 {\n    margin-bottom: -0.25rem;\n  }\n\n  .md\\:-ml-1 {\n    margin-left: -0.25rem;\n  }\n\n  .md\\:-mt-2 {\n    margin-top: -0.5rem;\n  }\n\n  .md\\:-mr-2 {\n    margin-right: -0.5rem;\n  }\n\n  .md\\:-mb-2 {\n    margin-bottom: -0.5rem;\n  }\n\n  .md\\:-ml-2 {\n    margin-left: -0.5rem;\n  }\n\n  .md\\:-mt-3 {\n    margin-top: -0.75rem;\n  }\n\n  .md\\:-mr-3 {\n    margin-right: -0.75rem;\n  }\n\n  .md\\:-mb-3 {\n    margin-bottom: -0.75rem;\n  }\n\n  .md\\:-ml-3 {\n    margin-left: -0.75rem;\n  }\n\n  .md\\:-mt-4 {\n    margin-top: -1rem;\n  }\n\n  .md\\:-mr-4 {\n    margin-right: -1rem;\n  }\n\n  .md\\:-mb-4 {\n    margin-bottom: -1rem;\n  }\n\n  .md\\:-ml-4 {\n    margin-left: -1rem;\n  }\n\n  .md\\:-mt-6 {\n    margin-top: -1.5rem;\n  }\n\n  .md\\:-mr-6 {\n    margin-right: -1.5rem;\n  }\n\n  .md\\:-mb-6 {\n    margin-bottom: -1.5rem;\n  }\n\n  .md\\:-ml-6 {\n    margin-left: -1.5rem;\n  }\n\n  .md\\:-mt-8 {\n    margin-top: -2rem;\n  }\n\n  .md\\:-mr-8 {\n    margin-right: -2rem;\n  }\n\n  .md\\:-mb-8 {\n    margin-bottom: -2rem;\n  }\n\n  .md\\:-ml-8 {\n    margin-left: -2rem;\n  }\n\n  .md\\:-mt-px {\n    margin-top: -1px;\n  }\n\n  .md\\:-mr-px {\n    margin-right: -1px;\n  }\n\n  .md\\:-mb-px {\n    margin-bottom: -1px;\n  }\n\n  .md\\:-ml-px {\n    margin-left: -1px;\n  }\n\n  .md\\:opacity-0 {\n    opacity: 0;\n  }\n\n  .md\\:opacity-25 {\n    opacity: .25;\n  }\n\n  .md\\:opacity-50 {\n    opacity: .5;\n  }\n\n  .md\\:opacity-75 {\n    opacity: .75;\n  }\n\n  .md\\:opacity-100 {\n    opacity: 1;\n  }\n\n  .md\\:overflow-auto {\n    overflow: auto;\n  }\n\n  .md\\:overflow-hidden {\n    overflow: hidden;\n  }\n\n  .md\\:overflow-visible {\n    overflow: visible;\n  }\n\n  .md\\:overflow-scroll {\n    overflow: scroll;\n  }\n\n  .md\\:overflow-x-auto {\n    overflow-x: auto;\n  }\n\n  .md\\:overflow-y-auto {\n    overflow-y: auto;\n  }\n\n  .md\\:overflow-x-scroll {\n    overflow-x: scroll;\n  }\n\n  .md\\:overflow-y-scroll {\n    overflow-y: scroll;\n  }\n\n  .md\\:scrolling-touch {\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .md\\:scrolling-auto {\n    -webkit-overflow-scrolling: auto;\n  }\n\n  .md\\:p-0 {\n    padding: 0;\n  }\n\n  .md\\:p-1 {\n    padding: .25rem;\n  }\n\n  .md\\:p-2 {\n    padding: .5rem;\n  }\n\n  .md\\:p-3 {\n    padding: .75rem;\n  }\n\n  .md\\:p-4 {\n    padding: 1rem;\n  }\n\n  .md\\:p-6 {\n    padding: 1.5rem;\n  }\n\n  .md\\:p-8 {\n    padding: 2rem;\n  }\n\n  .md\\:p-px {\n    padding: 1px;\n  }\n\n  .md\\:py-0 {\n    padding-top: 0;\n    padding-bottom: 0;\n  }\n\n  .md\\:px-0 {\n    padding-left: 0;\n    padding-right: 0;\n  }\n\n  .md\\:py-1 {\n    padding-top: .25rem;\n    padding-bottom: .25rem;\n  }\n\n  .md\\:px-1 {\n    padding-left: .25rem;\n    padding-right: .25rem;\n  }\n\n  .md\\:py-2 {\n    padding-top: .5rem;\n    padding-bottom: .5rem;\n  }\n\n  .md\\:px-2 {\n    padding-left: .5rem;\n    padding-right: .5rem;\n  }\n\n  .md\\:py-3 {\n    padding-top: .75rem;\n    padding-bottom: .75rem;\n  }\n\n  .md\\:px-3 {\n    padding-left: .75rem;\n    padding-right: .75rem;\n  }\n\n  .md\\:py-4 {\n    padding-top: 1rem;\n    padding-bottom: 1rem;\n  }\n\n  .md\\:px-4 {\n    padding-left: 1rem;\n    padding-right: 1rem;\n  }\n\n  .md\\:py-6 {\n    padding-top: 1.5rem;\n    padding-bottom: 1.5rem;\n  }\n\n  .md\\:px-6 {\n    padding-left: 1.5rem;\n    padding-right: 1.5rem;\n  }\n\n  .md\\:py-8 {\n    padding-top: 2rem;\n    padding-bottom: 2rem;\n  }\n\n  .md\\:px-8 {\n    padding-left: 2rem;\n    padding-right: 2rem;\n  }\n\n  .md\\:py-px {\n    padding-top: 1px;\n    padding-bottom: 1px;\n  }\n\n  .md\\:px-px {\n    padding-left: 1px;\n    padding-right: 1px;\n  }\n\n  .md\\:pt-0 {\n    padding-top: 0;\n  }\n\n  .md\\:pr-0 {\n    padding-right: 0;\n  }\n\n  .md\\:pb-0 {\n    padding-bottom: 0;\n  }\n\n  .md\\:pl-0 {\n    padding-left: 0;\n  }\n\n  .md\\:pt-1 {\n    padding-top: .25rem;\n  }\n\n  .md\\:pr-1 {\n    padding-right: .25rem;\n  }\n\n  .md\\:pb-1 {\n    padding-bottom: .25rem;\n  }\n\n  .md\\:pl-1 {\n    padding-left: .25rem;\n  }\n\n  .md\\:pt-2 {\n    padding-top: .5rem;\n  }\n\n  .md\\:pr-2 {\n    padding-right: .5rem;\n  }\n\n  .md\\:pb-2 {\n    padding-bottom: .5rem;\n  }\n\n  .md\\:pl-2 {\n    padding-left: .5rem;\n  }\n\n  .md\\:pt-3 {\n    padding-top: .75rem;\n  }\n\n  .md\\:pr-3 {\n    padding-right: .75rem;\n  }\n\n  .md\\:pb-3 {\n    padding-bottom: .75rem;\n  }\n\n  .md\\:pl-3 {\n    padding-left: .75rem;\n  }\n\n  .md\\:pt-4 {\n    padding-top: 1rem;\n  }\n\n  .md\\:pr-4 {\n    padding-right: 1rem;\n  }\n\n  .md\\:pb-4 {\n    padding-bottom: 1rem;\n  }\n\n  .md\\:pl-4 {\n    padding-left: 1rem;\n  }\n\n  .md\\:pt-6 {\n    padding-top: 1.5rem;\n  }\n\n  .md\\:pr-6 {\n    padding-right: 1.5rem;\n  }\n\n  .md\\:pb-6 {\n    padding-bottom: 1.5rem;\n  }\n\n  .md\\:pl-6 {\n    padding-left: 1.5rem;\n  }\n\n  .md\\:pt-8 {\n    padding-top: 2rem;\n  }\n\n  .md\\:pr-8 {\n    padding-right: 2rem;\n  }\n\n  .md\\:pb-8 {\n    padding-bottom: 2rem;\n  }\n\n  .md\\:pl-8 {\n    padding-left: 2rem;\n  }\n\n  .md\\:pt-px {\n    padding-top: 1px;\n  }\n\n  .md\\:pr-px {\n    padding-right: 1px;\n  }\n\n  .md\\:pb-px {\n    padding-bottom: 1px;\n  }\n\n  .md\\:pl-px {\n    padding-left: 1px;\n  }\n\n  .md\\:pointer-events-none {\n    pointer-events: none;\n  }\n\n  .md\\:pointer-events-auto {\n    pointer-events: auto;\n  }\n\n  .md\\:static {\n    position: static;\n  }\n\n  .md\\:fixed {\n    position: fixed;\n  }\n\n  .md\\:absolute {\n    position: absolute;\n  }\n\n  .md\\:relative {\n    position: relative;\n  }\n\n  .md\\:sticky {\n    position: -webkit-sticky;\n    position: sticky;\n  }\n\n  .md\\:pin-none {\n    top: auto;\n    right: auto;\n    bottom: auto;\n    left: auto;\n  }\n\n  .md\\:pin {\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n  }\n\n  .md\\:pin-y {\n    top: 0;\n    bottom: 0;\n  }\n\n  .md\\:pin-x {\n    right: 0;\n    left: 0;\n  }\n\n  .md\\:pin-t {\n    top: 0;\n  }\n\n  .md\\:pin-r {\n    right: 0;\n  }\n\n  .md\\:pin-b {\n    bottom: 0;\n  }\n\n  .md\\:pin-l {\n    left: 0;\n  }\n\n  .md\\:resize-none {\n    resize: none;\n  }\n\n  .md\\:resize-y {\n    resize: vertical;\n  }\n\n  .md\\:resize-x {\n    resize: horizontal;\n  }\n\n  .md\\:resize {\n    resize: both;\n  }\n\n  .md\\:shadow {\n    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n  }\n\n  .md\\:shadow-md {\n    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n  }\n\n  .md\\:shadow-lg {\n    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n  }\n\n  .md\\:shadow-inner {\n    box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n  }\n\n  .md\\:shadow-none {\n    box-shadow: none;\n  }\n\n  .md\\:text-left {\n    text-align: left;\n  }\n\n  .md\\:text-center {\n    text-align: center;\n  }\n\n  .md\\:text-right {\n    text-align: right;\n  }\n\n  .md\\:text-justify {\n    text-align: justify;\n  }\n\n  .md\\:text-transparent {\n    color: transparent;\n  }\n\n  .md\\:text-black {\n    color: #22292f;\n  }\n\n  .md\\:text-grey-darkest {\n    color: #3d4852;\n  }\n\n  .md\\:text-grey-darker {\n    color: #606f7b;\n  }\n\n  .md\\:text-grey-dark {\n    color: #8795a1;\n  }\n\n  .md\\:text-grey {\n    color: #b8c2cc;\n  }\n\n  .md\\:text-grey-light {\n    color: #dae1e7;\n  }\n\n  .md\\:text-grey-lighter {\n    color: #f1f5f8;\n  }\n\n  .md\\:text-grey-lightest {\n    color: #f8fafc;\n  }\n\n  .md\\:text-white {\n    color: #fff;\n  }\n\n  .md\\:text-red-darkest {\n    color: #3b0d0c;\n  }\n\n  .md\\:text-red-darker {\n    color: #621b18;\n  }\n\n  .md\\:text-red-dark {\n    color: #cc1f1a;\n  }\n\n  .md\\:text-red {\n    color: #e3342f;\n  }\n\n  .md\\:text-red-light {\n    color: #ef5753;\n  }\n\n  .md\\:text-red-lighter {\n    color: #f9acaa;\n  }\n\n  .md\\:text-red-lightest {\n    color: #fcebea;\n  }\n\n  .md\\:text-orange-darkest {\n    color: #462a16;\n  }\n\n  .md\\:text-orange-darker {\n    color: #613b1f;\n  }\n\n  .md\\:text-orange-dark {\n    color: #de751f;\n  }\n\n  .md\\:text-orange {\n    color: #f6993f;\n  }\n\n  .md\\:text-orange-light {\n    color: #faad63;\n  }\n\n  .md\\:text-orange-lighter {\n    color: #fcd9b6;\n  }\n\n  .md\\:text-orange-lightest {\n    color: #fff5eb;\n  }\n\n  .md\\:text-yellow-darkest {\n    color: #453411;\n  }\n\n  .md\\:text-yellow-darker {\n    color: #684f1d;\n  }\n\n  .md\\:text-yellow-dark {\n    color: #f2d024;\n  }\n\n  .md\\:text-yellow {\n    color: #ffed4a;\n  }\n\n  .md\\:text-yellow-light {\n    color: #fff382;\n  }\n\n  .md\\:text-yellow-lighter {\n    color: #fff9c2;\n  }\n\n  .md\\:text-yellow-lightest {\n    color: #fcfbeb;\n  }\n\n  .md\\:text-green-darkest {\n    color: #0f2f21;\n  }\n\n  .md\\:text-green-darker {\n    color: #1a4731;\n  }\n\n  .md\\:text-green-dark {\n    color: #1f9d55;\n  }\n\n  .md\\:text-green {\n    color: #38c172;\n  }\n\n  .md\\:text-green-light {\n    color: #51d88a;\n  }\n\n  .md\\:text-green-lighter {\n    color: #a2f5bf;\n  }\n\n  .md\\:text-green-lightest {\n    color: #e3fcec;\n  }\n\n  .md\\:text-teal-darkest {\n    color: #0d3331;\n  }\n\n  .md\\:text-teal-darker {\n    color: #20504f;\n  }\n\n  .md\\:text-teal-dark {\n    color: #38a89d;\n  }\n\n  .md\\:text-teal {\n    color: #4dc0b5;\n  }\n\n  .md\\:text-teal-light {\n    color: #64d5ca;\n  }\n\n  .md\\:text-teal-lighter {\n    color: #a0f0ed;\n  }\n\n  .md\\:text-teal-lightest {\n    color: #e8fffe;\n  }\n\n  .md\\:text-blue-darkest {\n    color: #12283a;\n  }\n\n  .md\\:text-blue-darker {\n    color: #1c3d5a;\n  }\n\n  .md\\:text-blue-dark {\n    color: #2779bd;\n  }\n\n  .md\\:text-blue {\n    color: #3490dc;\n  }\n\n  .md\\:text-blue-light {\n    color: #6cb2eb;\n  }\n\n  .md\\:text-blue-lighter {\n    color: #bcdefa;\n  }\n\n  .md\\:text-blue-lightest {\n    color: #eff8ff;\n  }\n\n  .md\\:text-indigo-darkest {\n    color: #191e38;\n  }\n\n  .md\\:text-indigo-darker {\n    color: #2f365f;\n  }\n\n  .md\\:text-indigo-dark {\n    color: #5661b3;\n  }\n\n  .md\\:text-indigo {\n    color: #6574cd;\n  }\n\n  .md\\:text-indigo-light {\n    color: #7886d7;\n  }\n\n  .md\\:text-indigo-lighter {\n    color: #b2b7ff;\n  }\n\n  .md\\:text-indigo-lightest {\n    color: #e6e8ff;\n  }\n\n  .md\\:text-purple-darkest {\n    color: #21183c;\n  }\n\n  .md\\:text-purple-darker {\n    color: #382b5f;\n  }\n\n  .md\\:text-purple-dark {\n    color: #794acf;\n  }\n\n  .md\\:text-purple {\n    color: #9561e2;\n  }\n\n  .md\\:text-purple-light {\n    color: #a779e9;\n  }\n\n  .md\\:text-purple-lighter {\n    color: #d6bbfc;\n  }\n\n  .md\\:text-purple-lightest {\n    color: #f3ebff;\n  }\n\n  .md\\:text-pink-darkest {\n    color: #451225;\n  }\n\n  .md\\:text-pink-darker {\n    color: #6f213f;\n  }\n\n  .md\\:text-pink-dark {\n    color: #eb5286;\n  }\n\n  .md\\:text-pink {\n    color: #f66d9b;\n  }\n\n  .md\\:text-pink-light {\n    color: #fa7ea8;\n  }\n\n  .md\\:text-pink-lighter {\n    color: #ffbbca;\n  }\n\n  .md\\:text-pink-lightest {\n    color: #ffebef;\n  }\n\n  .md\\:hover\\:text-transparent:hover {\n    color: transparent;\n  }\n\n  .md\\:hover\\:text-black:hover {\n    color: #22292f;\n  }\n\n  .md\\:hover\\:text-grey-darkest:hover {\n    color: #3d4852;\n  }\n\n  .md\\:hover\\:text-grey-darker:hover {\n    color: #606f7b;\n  }\n\n  .md\\:hover\\:text-grey-dark:hover {\n    color: #8795a1;\n  }\n\n  .md\\:hover\\:text-grey:hover {\n    color: #b8c2cc;\n  }\n\n  .md\\:hover\\:text-grey-light:hover {\n    color: #dae1e7;\n  }\n\n  .md\\:hover\\:text-grey-lighter:hover {\n    color: #f1f5f8;\n  }\n\n  .md\\:hover\\:text-grey-lightest:hover {\n    color: #f8fafc;\n  }\n\n  .md\\:hover\\:text-white:hover {\n    color: #fff;\n  }\n\n  .md\\:hover\\:text-red-darkest:hover {\n    color: #3b0d0c;\n  }\n\n  .md\\:hover\\:text-red-darker:hover {\n    color: #621b18;\n  }\n\n  .md\\:hover\\:text-red-dark:hover {\n    color: #cc1f1a;\n  }\n\n  .md\\:hover\\:text-red:hover {\n    color: #e3342f;\n  }\n\n  .md\\:hover\\:text-red-light:hover {\n    color: #ef5753;\n  }\n\n  .md\\:hover\\:text-red-lighter:hover {\n    color: #f9acaa;\n  }\n\n  .md\\:hover\\:text-red-lightest:hover {\n    color: #fcebea;\n  }\n\n  .md\\:hover\\:text-orange-darkest:hover {\n    color: #462a16;\n  }\n\n  .md\\:hover\\:text-orange-darker:hover {\n    color: #613b1f;\n  }\n\n  .md\\:hover\\:text-orange-dark:hover {\n    color: #de751f;\n  }\n\n  .md\\:hover\\:text-orange:hover {\n    color: #f6993f;\n  }\n\n  .md\\:hover\\:text-orange-light:hover {\n    color: #faad63;\n  }\n\n  .md\\:hover\\:text-orange-lighter:hover {\n    color: #fcd9b6;\n  }\n\n  .md\\:hover\\:text-orange-lightest:hover {\n    color: #fff5eb;\n  }\n\n  .md\\:hover\\:text-yellow-darkest:hover {\n    color: #453411;\n  }\n\n  .md\\:hover\\:text-yellow-darker:hover {\n    color: #684f1d;\n  }\n\n  .md\\:hover\\:text-yellow-dark:hover {\n    color: #f2d024;\n  }\n\n  .md\\:hover\\:text-yellow:hover {\n    color: #ffed4a;\n  }\n\n  .md\\:hover\\:text-yellow-light:hover {\n    color: #fff382;\n  }\n\n  .md\\:hover\\:text-yellow-lighter:hover {\n    color: #fff9c2;\n  }\n\n  .md\\:hover\\:text-yellow-lightest:hover {\n    color: #fcfbeb;\n  }\n\n  .md\\:hover\\:text-green-darkest:hover {\n    color: #0f2f21;\n  }\n\n  .md\\:hover\\:text-green-darker:hover {\n    color: #1a4731;\n  }\n\n  .md\\:hover\\:text-green-dark:hover {\n    color: #1f9d55;\n  }\n\n  .md\\:hover\\:text-green:hover {\n    color: #38c172;\n  }\n\n  .md\\:hover\\:text-green-light:hover {\n    color: #51d88a;\n  }\n\n  .md\\:hover\\:text-green-lighter:hover {\n    color: #a2f5bf;\n  }\n\n  .md\\:hover\\:text-green-lightest:hover {\n    color: #e3fcec;\n  }\n\n  .md\\:hover\\:text-teal-darkest:hover {\n    color: #0d3331;\n  }\n\n  .md\\:hover\\:text-teal-darker:hover {\n    color: #20504f;\n  }\n\n  .md\\:hover\\:text-teal-dark:hover {\n    color: #38a89d;\n  }\n\n  .md\\:hover\\:text-teal:hover {\n    color: #4dc0b5;\n  }\n\n  .md\\:hover\\:text-teal-light:hover {\n    color: #64d5ca;\n  }\n\n  .md\\:hover\\:text-teal-lighter:hover {\n    color: #a0f0ed;\n  }\n\n  .md\\:hover\\:text-teal-lightest:hover {\n    color: #e8fffe;\n  }\n\n  .md\\:hover\\:text-blue-darkest:hover {\n    color: #12283a;\n  }\n\n  .md\\:hover\\:text-blue-darker:hover {\n    color: #1c3d5a;\n  }\n\n  .md\\:hover\\:text-blue-dark:hover {\n    color: #2779bd;\n  }\n\n  .md\\:hover\\:text-blue:hover {\n    color: #3490dc;\n  }\n\n  .md\\:hover\\:text-blue-light:hover {\n    color: #6cb2eb;\n  }\n\n  .md\\:hover\\:text-blue-lighter:hover {\n    color: #bcdefa;\n  }\n\n  .md\\:hover\\:text-blue-lightest:hover {\n    color: #eff8ff;\n  }\n\n  .md\\:hover\\:text-indigo-darkest:hover {\n    color: #191e38;\n  }\n\n  .md\\:hover\\:text-indigo-darker:hover {\n    color: #2f365f;\n  }\n\n  .md\\:hover\\:text-indigo-dark:hover {\n    color: #5661b3;\n  }\n\n  .md\\:hover\\:text-indigo:hover {\n    color: #6574cd;\n  }\n\n  .md\\:hover\\:text-indigo-light:hover {\n    color: #7886d7;\n  }\n\n  .md\\:hover\\:text-indigo-lighter:hover {\n    color: #b2b7ff;\n  }\n\n  .md\\:hover\\:text-indigo-lightest:hover {\n    color: #e6e8ff;\n  }\n\n  .md\\:hover\\:text-purple-darkest:hover {\n    color: #21183c;\n  }\n\n  .md\\:hover\\:text-purple-darker:hover {\n    color: #382b5f;\n  }\n\n  .md\\:hover\\:text-purple-dark:hover {\n    color: #794acf;\n  }\n\n  .md\\:hover\\:text-purple:hover {\n    color: #9561e2;\n  }\n\n  .md\\:hover\\:text-purple-light:hover {\n    color: #a779e9;\n  }\n\n  .md\\:hover\\:text-purple-lighter:hover {\n    color: #d6bbfc;\n  }\n\n  .md\\:hover\\:text-purple-lightest:hover {\n    color: #f3ebff;\n  }\n\n  .md\\:hover\\:text-pink-darkest:hover {\n    color: #451225;\n  }\n\n  .md\\:hover\\:text-pink-darker:hover {\n    color: #6f213f;\n  }\n\n  .md\\:hover\\:text-pink-dark:hover {\n    color: #eb5286;\n  }\n\n  .md\\:hover\\:text-pink:hover {\n    color: #f66d9b;\n  }\n\n  .md\\:hover\\:text-pink-light:hover {\n    color: #fa7ea8;\n  }\n\n  .md\\:hover\\:text-pink-lighter:hover {\n    color: #ffbbca;\n  }\n\n  .md\\:hover\\:text-pink-lightest:hover {\n    color: #ffebef;\n  }\n\n  .md\\:text-xs {\n    font-size: .75rem;\n  }\n\n  .md\\:text-sm {\n    font-size: .875rem;\n  }\n\n  .md\\:text-base {\n    font-size: 1rem;\n  }\n\n  .md\\:text-lg {\n    font-size: 1.125rem;\n  }\n\n  .md\\:text-xl {\n    font-size: 1.25rem;\n  }\n\n  .md\\:text-2xl {\n    font-size: 1.5rem;\n  }\n\n  .md\\:text-3xl {\n    font-size: 1.875rem;\n  }\n\n  .md\\:text-4xl {\n    font-size: 2.25rem;\n  }\n\n  .md\\:text-5xl {\n    font-size: 3rem;\n  }\n\n  .md\\:italic {\n    font-style: italic;\n  }\n\n  .md\\:roman {\n    font-style: normal;\n  }\n\n  .md\\:uppercase {\n    text-transform: uppercase;\n  }\n\n  .md\\:lowercase {\n    text-transform: lowercase;\n  }\n\n  .md\\:capitalize {\n    text-transform: capitalize;\n  }\n\n  .md\\:normal-case {\n    text-transform: none;\n  }\n\n  .md\\:underline {\n    text-decoration: underline;\n  }\n\n  .md\\:line-through {\n    text-decoration: line-through;\n  }\n\n  .md\\:no-underline {\n    text-decoration: none;\n  }\n\n  .md\\:antialiased {\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  .md\\:subpixel-antialiased {\n    -webkit-font-smoothing: auto;\n    -moz-osx-font-smoothing: auto;\n  }\n\n  .md\\:hover\\:italic:hover {\n    font-style: italic;\n  }\n\n  .md\\:hover\\:roman:hover {\n    font-style: normal;\n  }\n\n  .md\\:hover\\:uppercase:hover {\n    text-transform: uppercase;\n  }\n\n  .md\\:hover\\:lowercase:hover {\n    text-transform: lowercase;\n  }\n\n  .md\\:hover\\:capitalize:hover {\n    text-transform: capitalize;\n  }\n\n  .md\\:hover\\:normal-case:hover {\n    text-transform: none;\n  }\n\n  .md\\:hover\\:underline:hover {\n    text-decoration: underline;\n  }\n\n  .md\\:hover\\:line-through:hover {\n    text-decoration: line-through;\n  }\n\n  .md\\:hover\\:no-underline:hover {\n    text-decoration: none;\n  }\n\n  .md\\:hover\\:antialiased:hover {\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  .md\\:hover\\:subpixel-antialiased:hover {\n    -webkit-font-smoothing: auto;\n    -moz-osx-font-smoothing: auto;\n  }\n\n  .md\\:tracking-tight {\n    letter-spacing: -0.05em;\n  }\n\n  .md\\:tracking-normal {\n    letter-spacing: 0;\n  }\n\n  .md\\:tracking-wide {\n    letter-spacing: .05em;\n  }\n\n  .md\\:select-none {\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n  }\n\n  .md\\:select-text {\n    -webkit-user-select: text;\n       -moz-user-select: text;\n        -ms-user-select: text;\n            user-select: text;\n  }\n\n  .md\\:align-baseline {\n    vertical-align: baseline;\n  }\n\n  .md\\:align-top {\n    vertical-align: top;\n  }\n\n  .md\\:align-middle {\n    vertical-align: middle;\n  }\n\n  .md\\:align-bottom {\n    vertical-align: bottom;\n  }\n\n  .md\\:align-text-top {\n    vertical-align: text-top;\n  }\n\n  .md\\:align-text-bottom {\n    vertical-align: text-bottom;\n  }\n\n  .md\\:visible {\n    visibility: visible;\n  }\n\n  .md\\:invisible {\n    visibility: hidden;\n  }\n\n  .md\\:whitespace-normal {\n    white-space: normal;\n  }\n\n  .md\\:whitespace-no-wrap {\n    white-space: nowrap;\n  }\n\n  .md\\:whitespace-pre {\n    white-space: pre;\n  }\n\n  .md\\:whitespace-pre-line {\n    white-space: pre-line;\n  }\n\n  .md\\:whitespace-pre-wrap {\n    white-space: pre-wrap;\n  }\n\n  .md\\:break-words {\n    word-wrap: break-word;\n  }\n\n  .md\\:break-normal {\n    word-wrap: normal;\n  }\n\n  .md\\:truncate {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .md\\:w-1 {\n    width: .25rem;\n  }\n\n  .md\\:w-2 {\n    width: .5rem;\n  }\n\n  .md\\:w-3 {\n    width: .75rem;\n  }\n\n  .md\\:w-4 {\n    width: 1rem;\n  }\n\n  .md\\:w-6 {\n    width: 1.5rem;\n  }\n\n  .md\\:w-8 {\n    width: 2rem;\n  }\n\n  .md\\:w-10 {\n    width: 2.5rem;\n  }\n\n  .md\\:w-12 {\n    width: 3rem;\n  }\n\n  .md\\:w-16 {\n    width: 4rem;\n  }\n\n  .md\\:w-24 {\n    width: 6rem;\n  }\n\n  .md\\:w-32 {\n    width: 8rem;\n  }\n\n  .md\\:w-48 {\n    width: 12rem;\n  }\n\n  .md\\:w-64 {\n    width: 16rem;\n  }\n\n  .md\\:w-auto {\n    width: auto;\n  }\n\n  .md\\:w-px {\n    width: 1px;\n  }\n\n  .md\\:w-1\\/2 {\n    width: 50%;\n  }\n\n  .md\\:w-1\\/3 {\n    width: 33.33333%;\n  }\n\n  .md\\:w-2\\/3 {\n    width: 66.66667%;\n  }\n\n  .md\\:w-1\\/4 {\n    width: 25%;\n  }\n\n  .md\\:w-3\\/4 {\n    width: 75%;\n  }\n\n  .md\\:w-1\\/5 {\n    width: 20%;\n  }\n\n  .md\\:w-2\\/5 {\n    width: 40%;\n  }\n\n  .md\\:w-3\\/5 {\n    width: 60%;\n  }\n\n  .md\\:w-4\\/5 {\n    width: 80%;\n  }\n\n  .md\\:w-1\\/6 {\n    width: 16.66667%;\n  }\n\n  .md\\:w-5\\/6 {\n    width: 83.33333%;\n  }\n\n  .md\\:w-full {\n    width: 100%;\n  }\n\n  .md\\:w-screen {\n    width: 100vw;\n  }\n\n  .md\\:z-0 {\n    z-index: 0;\n  }\n\n  .md\\:z-10 {\n    z-index: 10;\n  }\n\n  .md\\:z-20 {\n    z-index: 20;\n  }\n\n  .md\\:z-30 {\n    z-index: 30;\n  }\n\n  .md\\:z-40 {\n    z-index: 40;\n  }\n\n  .md\\:z-50 {\n    z-index: 50;\n  }\n\n  .md\\:z-auto {\n    z-index: auto;\n  }\n}\n\n@media (min-width: 992px) {\n  .lg\\:list-reset {\n    list-style: none;\n    padding: 0;\n  }\n\n  .lg\\:appearance-none {\n    -webkit-appearance: none;\n       -moz-appearance: none;\n            appearance: none;\n  }\n\n  .lg\\:bg-fixed {\n    background-attachment: fixed;\n  }\n\n  .lg\\:bg-local {\n    background-attachment: local;\n  }\n\n  .lg\\:bg-scroll {\n    background-attachment: scroll;\n  }\n\n  .lg\\:bg-transparent {\n    background-color: transparent;\n  }\n\n  .lg\\:bg-black {\n    background-color: #22292f;\n  }\n\n  .lg\\:bg-grey-darkest {\n    background-color: #3d4852;\n  }\n\n  .lg\\:bg-grey-darker {\n    background-color: #606f7b;\n  }\n\n  .lg\\:bg-grey-dark {\n    background-color: #8795a1;\n  }\n\n  .lg\\:bg-grey {\n    background-color: #b8c2cc;\n  }\n\n  .lg\\:bg-grey-light {\n    background-color: #dae1e7;\n  }\n\n  .lg\\:bg-grey-lighter {\n    background-color: #f1f5f8;\n  }\n\n  .lg\\:bg-grey-lightest {\n    background-color: #f8fafc;\n  }\n\n  .lg\\:bg-white {\n    background-color: #fff;\n  }\n\n  .lg\\:bg-red-darkest {\n    background-color: #3b0d0c;\n  }\n\n  .lg\\:bg-red-darker {\n    background-color: #621b18;\n  }\n\n  .lg\\:bg-red-dark {\n    background-color: #cc1f1a;\n  }\n\n  .lg\\:bg-red {\n    background-color: #e3342f;\n  }\n\n  .lg\\:bg-red-light {\n    background-color: #ef5753;\n  }\n\n  .lg\\:bg-red-lighter {\n    background-color: #f9acaa;\n  }\n\n  .lg\\:bg-red-lightest {\n    background-color: #fcebea;\n  }\n\n  .lg\\:bg-orange-darkest {\n    background-color: #462a16;\n  }\n\n  .lg\\:bg-orange-darker {\n    background-color: #613b1f;\n  }\n\n  .lg\\:bg-orange-dark {\n    background-color: #de751f;\n  }\n\n  .lg\\:bg-orange {\n    background-color: #f6993f;\n  }\n\n  .lg\\:bg-orange-light {\n    background-color: #faad63;\n  }\n\n  .lg\\:bg-orange-lighter {\n    background-color: #fcd9b6;\n  }\n\n  .lg\\:bg-orange-lightest {\n    background-color: #fff5eb;\n  }\n\n  .lg\\:bg-yellow-darkest {\n    background-color: #453411;\n  }\n\n  .lg\\:bg-yellow-darker {\n    background-color: #684f1d;\n  }\n\n  .lg\\:bg-yellow-dark {\n    background-color: #f2d024;\n  }\n\n  .lg\\:bg-yellow {\n    background-color: #ffed4a;\n  }\n\n  .lg\\:bg-yellow-light {\n    background-color: #fff382;\n  }\n\n  .lg\\:bg-yellow-lighter {\n    background-color: #fff9c2;\n  }\n\n  .lg\\:bg-yellow-lightest {\n    background-color: #fcfbeb;\n  }\n\n  .lg\\:bg-green-darkest {\n    background-color: #0f2f21;\n  }\n\n  .lg\\:bg-green-darker {\n    background-color: #1a4731;\n  }\n\n  .lg\\:bg-green-dark {\n    background-color: #1f9d55;\n  }\n\n  .lg\\:bg-green {\n    background-color: #38c172;\n  }\n\n  .lg\\:bg-green-light {\n    background-color: #51d88a;\n  }\n\n  .lg\\:bg-green-lighter {\n    background-color: #a2f5bf;\n  }\n\n  .lg\\:bg-green-lightest {\n    background-color: #e3fcec;\n  }\n\n  .lg\\:bg-teal-darkest {\n    background-color: #0d3331;\n  }\n\n  .lg\\:bg-teal-darker {\n    background-color: #20504f;\n  }\n\n  .lg\\:bg-teal-dark {\n    background-color: #38a89d;\n  }\n\n  .lg\\:bg-teal {\n    background-color: #4dc0b5;\n  }\n\n  .lg\\:bg-teal-light {\n    background-color: #64d5ca;\n  }\n\n  .lg\\:bg-teal-lighter {\n    background-color: #a0f0ed;\n  }\n\n  .lg\\:bg-teal-lightest {\n    background-color: #e8fffe;\n  }\n\n  .lg\\:bg-blue-darkest {\n    background-color: #12283a;\n  }\n\n  .lg\\:bg-blue-darker {\n    background-color: #1c3d5a;\n  }\n\n  .lg\\:bg-blue-dark {\n    background-color: #2779bd;\n  }\n\n  .lg\\:bg-blue {\n    background-color: #3490dc;\n  }\n\n  .lg\\:bg-blue-light {\n    background-color: #6cb2eb;\n  }\n\n  .lg\\:bg-blue-lighter {\n    background-color: #bcdefa;\n  }\n\n  .lg\\:bg-blue-lightest {\n    background-color: #eff8ff;\n  }\n\n  .lg\\:bg-indigo-darkest {\n    background-color: #191e38;\n  }\n\n  .lg\\:bg-indigo-darker {\n    background-color: #2f365f;\n  }\n\n  .lg\\:bg-indigo-dark {\n    background-color: #5661b3;\n  }\n\n  .lg\\:bg-indigo {\n    background-color: #6574cd;\n  }\n\n  .lg\\:bg-indigo-light {\n    background-color: #7886d7;\n  }\n\n  .lg\\:bg-indigo-lighter {\n    background-color: #b2b7ff;\n  }\n\n  .lg\\:bg-indigo-lightest {\n    background-color: #e6e8ff;\n  }\n\n  .lg\\:bg-purple-darkest {\n    background-color: #21183c;\n  }\n\n  .lg\\:bg-purple-darker {\n    background-color: #382b5f;\n  }\n\n  .lg\\:bg-purple-dark {\n    background-color: #794acf;\n  }\n\n  .lg\\:bg-purple {\n    background-color: #9561e2;\n  }\n\n  .lg\\:bg-purple-light {\n    background-color: #a779e9;\n  }\n\n  .lg\\:bg-purple-lighter {\n    background-color: #d6bbfc;\n  }\n\n  .lg\\:bg-purple-lightest {\n    background-color: #f3ebff;\n  }\n\n  .lg\\:bg-pink-darkest {\n    background-color: #451225;\n  }\n\n  .lg\\:bg-pink-darker {\n    background-color: #6f213f;\n  }\n\n  .lg\\:bg-pink-dark {\n    background-color: #eb5286;\n  }\n\n  .lg\\:bg-pink {\n    background-color: #f66d9b;\n  }\n\n  .lg\\:bg-pink-light {\n    background-color: #fa7ea8;\n  }\n\n  .lg\\:bg-pink-lighter {\n    background-color: #ffbbca;\n  }\n\n  .lg\\:bg-pink-lightest {\n    background-color: #ffebef;\n  }\n\n  .lg\\:hover\\:bg-transparent:hover {\n    background-color: transparent;\n  }\n\n  .lg\\:hover\\:bg-black:hover {\n    background-color: #22292f;\n  }\n\n  .lg\\:hover\\:bg-grey-darkest:hover {\n    background-color: #3d4852;\n  }\n\n  .lg\\:hover\\:bg-grey-darker:hover {\n    background-color: #606f7b;\n  }\n\n  .lg\\:hover\\:bg-grey-dark:hover {\n    background-color: #8795a1;\n  }\n\n  .lg\\:hover\\:bg-grey:hover {\n    background-color: #b8c2cc;\n  }\n\n  .lg\\:hover\\:bg-grey-light:hover {\n    background-color: #dae1e7;\n  }\n\n  .lg\\:hover\\:bg-grey-lighter:hover {\n    background-color: #f1f5f8;\n  }\n\n  .lg\\:hover\\:bg-grey-lightest:hover {\n    background-color: #f8fafc;\n  }\n\n  .lg\\:hover\\:bg-white:hover {\n    background-color: #fff;\n  }\n\n  .lg\\:hover\\:bg-red-darkest:hover {\n    background-color: #3b0d0c;\n  }\n\n  .lg\\:hover\\:bg-red-darker:hover {\n    background-color: #621b18;\n  }\n\n  .lg\\:hover\\:bg-red-dark:hover {\n    background-color: #cc1f1a;\n  }\n\n  .lg\\:hover\\:bg-red:hover {\n    background-color: #e3342f;\n  }\n\n  .lg\\:hover\\:bg-red-light:hover {\n    background-color: #ef5753;\n  }\n\n  .lg\\:hover\\:bg-red-lighter:hover {\n    background-color: #f9acaa;\n  }\n\n  .lg\\:hover\\:bg-red-lightest:hover {\n    background-color: #fcebea;\n  }\n\n  .lg\\:hover\\:bg-orange-darkest:hover {\n    background-color: #462a16;\n  }\n\n  .lg\\:hover\\:bg-orange-darker:hover {\n    background-color: #613b1f;\n  }\n\n  .lg\\:hover\\:bg-orange-dark:hover {\n    background-color: #de751f;\n  }\n\n  .lg\\:hover\\:bg-orange:hover {\n    background-color: #f6993f;\n  }\n\n  .lg\\:hover\\:bg-orange-light:hover {\n    background-color: #faad63;\n  }\n\n  .lg\\:hover\\:bg-orange-lighter:hover {\n    background-color: #fcd9b6;\n  }\n\n  .lg\\:hover\\:bg-orange-lightest:hover {\n    background-color: #fff5eb;\n  }\n\n  .lg\\:hover\\:bg-yellow-darkest:hover {\n    background-color: #453411;\n  }\n\n  .lg\\:hover\\:bg-yellow-darker:hover {\n    background-color: #684f1d;\n  }\n\n  .lg\\:hover\\:bg-yellow-dark:hover {\n    background-color: #f2d024;\n  }\n\n  .lg\\:hover\\:bg-yellow:hover {\n    background-color: #ffed4a;\n  }\n\n  .lg\\:hover\\:bg-yellow-light:hover {\n    background-color: #fff382;\n  }\n\n  .lg\\:hover\\:bg-yellow-lighter:hover {\n    background-color: #fff9c2;\n  }\n\n  .lg\\:hover\\:bg-yellow-lightest:hover {\n    background-color: #fcfbeb;\n  }\n\n  .lg\\:hover\\:bg-green-darkest:hover {\n    background-color: #0f2f21;\n  }\n\n  .lg\\:hover\\:bg-green-darker:hover {\n    background-color: #1a4731;\n  }\n\n  .lg\\:hover\\:bg-green-dark:hover {\n    background-color: #1f9d55;\n  }\n\n  .lg\\:hover\\:bg-green:hover {\n    background-color: #38c172;\n  }\n\n  .lg\\:hover\\:bg-green-light:hover {\n    background-color: #51d88a;\n  }\n\n  .lg\\:hover\\:bg-green-lighter:hover {\n    background-color: #a2f5bf;\n  }\n\n  .lg\\:hover\\:bg-green-lightest:hover {\n    background-color: #e3fcec;\n  }\n\n  .lg\\:hover\\:bg-teal-darkest:hover {\n    background-color: #0d3331;\n  }\n\n  .lg\\:hover\\:bg-teal-darker:hover {\n    background-color: #20504f;\n  }\n\n  .lg\\:hover\\:bg-teal-dark:hover {\n    background-color: #38a89d;\n  }\n\n  .lg\\:hover\\:bg-teal:hover {\n    background-color: #4dc0b5;\n  }\n\n  .lg\\:hover\\:bg-teal-light:hover {\n    background-color: #64d5ca;\n  }\n\n  .lg\\:hover\\:bg-teal-lighter:hover {\n    background-color: #a0f0ed;\n  }\n\n  .lg\\:hover\\:bg-teal-lightest:hover {\n    background-color: #e8fffe;\n  }\n\n  .lg\\:hover\\:bg-blue-darkest:hover {\n    background-color: #12283a;\n  }\n\n  .lg\\:hover\\:bg-blue-darker:hover {\n    background-color: #1c3d5a;\n  }\n\n  .lg\\:hover\\:bg-blue-dark:hover {\n    background-color: #2779bd;\n  }\n\n  .lg\\:hover\\:bg-blue:hover {\n    background-color: #3490dc;\n  }\n\n  .lg\\:hover\\:bg-blue-light:hover {\n    background-color: #6cb2eb;\n  }\n\n  .lg\\:hover\\:bg-blue-lighter:hover {\n    background-color: #bcdefa;\n  }\n\n  .lg\\:hover\\:bg-blue-lightest:hover {\n    background-color: #eff8ff;\n  }\n\n  .lg\\:hover\\:bg-indigo-darkest:hover {\n    background-color: #191e38;\n  }\n\n  .lg\\:hover\\:bg-indigo-darker:hover {\n    background-color: #2f365f;\n  }\n\n  .lg\\:hover\\:bg-indigo-dark:hover {\n    background-color: #5661b3;\n  }\n\n  .lg\\:hover\\:bg-indigo:hover {\n    background-color: #6574cd;\n  }\n\n  .lg\\:hover\\:bg-indigo-light:hover {\n    background-color: #7886d7;\n  }\n\n  .lg\\:hover\\:bg-indigo-lighter:hover {\n    background-color: #b2b7ff;\n  }\n\n  .lg\\:hover\\:bg-indigo-lightest:hover {\n    background-color: #e6e8ff;\n  }\n\n  .lg\\:hover\\:bg-purple-darkest:hover {\n    background-color: #21183c;\n  }\n\n  .lg\\:hover\\:bg-purple-darker:hover {\n    background-color: #382b5f;\n  }\n\n  .lg\\:hover\\:bg-purple-dark:hover {\n    background-color: #794acf;\n  }\n\n  .lg\\:hover\\:bg-purple:hover {\n    background-color: #9561e2;\n  }\n\n  .lg\\:hover\\:bg-purple-light:hover {\n    background-color: #a779e9;\n  }\n\n  .lg\\:hover\\:bg-purple-lighter:hover {\n    background-color: #d6bbfc;\n  }\n\n  .lg\\:hover\\:bg-purple-lightest:hover {\n    background-color: #f3ebff;\n  }\n\n  .lg\\:hover\\:bg-pink-darkest:hover {\n    background-color: #451225;\n  }\n\n  .lg\\:hover\\:bg-pink-darker:hover {\n    background-color: #6f213f;\n  }\n\n  .lg\\:hover\\:bg-pink-dark:hover {\n    background-color: #eb5286;\n  }\n\n  .lg\\:hover\\:bg-pink:hover {\n    background-color: #f66d9b;\n  }\n\n  .lg\\:hover\\:bg-pink-light:hover {\n    background-color: #fa7ea8;\n  }\n\n  .lg\\:hover\\:bg-pink-lighter:hover {\n    background-color: #ffbbca;\n  }\n\n  .lg\\:hover\\:bg-pink-lightest:hover {\n    background-color: #ffebef;\n  }\n\n  .lg\\:bg-bottom {\n    background-position: bottom;\n  }\n\n  .lg\\:bg-center {\n    background-position: center;\n  }\n\n  .lg\\:bg-left {\n    background-position: left;\n  }\n\n  .lg\\:bg-left-bottom {\n    background-position: left bottom;\n  }\n\n  .lg\\:bg-left-top {\n    background-position: left top;\n  }\n\n  .lg\\:bg-right {\n    background-position: right;\n  }\n\n  .lg\\:bg-right-bottom {\n    background-position: right bottom;\n  }\n\n  .lg\\:bg-right-top {\n    background-position: right top;\n  }\n\n  .lg\\:bg-top {\n    background-position: top;\n  }\n\n  .lg\\:bg-repeat {\n    background-repeat: repeat;\n  }\n\n  .lg\\:bg-no-repeat {\n    background-repeat: no-repeat;\n  }\n\n  .lg\\:bg-repeat-x {\n    background-repeat: repeat-x;\n  }\n\n  .lg\\:bg-repeat-y {\n    background-repeat: repeat-y;\n  }\n\n  .lg\\:bg-auto {\n    background-size: auto;\n  }\n\n  .lg\\:bg-cover {\n    background-size: cover;\n  }\n\n  .lg\\:bg-contain {\n    background-size: contain;\n  }\n\n  .lg\\:border-transparent {\n    border-color: transparent;\n  }\n\n  .lg\\:border-black {\n    border-color: #22292f;\n  }\n\n  .lg\\:border-grey-darkest {\n    border-color: #3d4852;\n  }\n\n  .lg\\:border-grey-darker {\n    border-color: #606f7b;\n  }\n\n  .lg\\:border-grey-dark {\n    border-color: #8795a1;\n  }\n\n  .lg\\:border-grey {\n    border-color: #b8c2cc;\n  }\n\n  .lg\\:border-grey-light {\n    border-color: #dae1e7;\n  }\n\n  .lg\\:border-grey-lighter {\n    border-color: #f1f5f8;\n  }\n\n  .lg\\:border-grey-lightest {\n    border-color: #f8fafc;\n  }\n\n  .lg\\:border-white {\n    border-color: #fff;\n  }\n\n  .lg\\:border-red-darkest {\n    border-color: #3b0d0c;\n  }\n\n  .lg\\:border-red-darker {\n    border-color: #621b18;\n  }\n\n  .lg\\:border-red-dark {\n    border-color: #cc1f1a;\n  }\n\n  .lg\\:border-red {\n    border-color: #e3342f;\n  }\n\n  .lg\\:border-red-light {\n    border-color: #ef5753;\n  }\n\n  .lg\\:border-red-lighter {\n    border-color: #f9acaa;\n  }\n\n  .lg\\:border-red-lightest {\n    border-color: #fcebea;\n  }\n\n  .lg\\:border-orange-darkest {\n    border-color: #462a16;\n  }\n\n  .lg\\:border-orange-darker {\n    border-color: #613b1f;\n  }\n\n  .lg\\:border-orange-dark {\n    border-color: #de751f;\n  }\n\n  .lg\\:border-orange {\n    border-color: #f6993f;\n  }\n\n  .lg\\:border-orange-light {\n    border-color: #faad63;\n  }\n\n  .lg\\:border-orange-lighter {\n    border-color: #fcd9b6;\n  }\n\n  .lg\\:border-orange-lightest {\n    border-color: #fff5eb;\n  }\n\n  .lg\\:border-yellow-darkest {\n    border-color: #453411;\n  }\n\n  .lg\\:border-yellow-darker {\n    border-color: #684f1d;\n  }\n\n  .lg\\:border-yellow-dark {\n    border-color: #f2d024;\n  }\n\n  .lg\\:border-yellow {\n    border-color: #ffed4a;\n  }\n\n  .lg\\:border-yellow-light {\n    border-color: #fff382;\n  }\n\n  .lg\\:border-yellow-lighter {\n    border-color: #fff9c2;\n  }\n\n  .lg\\:border-yellow-lightest {\n    border-color: #fcfbeb;\n  }\n\n  .lg\\:border-green-darkest {\n    border-color: #0f2f21;\n  }\n\n  .lg\\:border-green-darker {\n    border-color: #1a4731;\n  }\n\n  .lg\\:border-green-dark {\n    border-color: #1f9d55;\n  }\n\n  .lg\\:border-green {\n    border-color: #38c172;\n  }\n\n  .lg\\:border-green-light {\n    border-color: #51d88a;\n  }\n\n  .lg\\:border-green-lighter {\n    border-color: #a2f5bf;\n  }\n\n  .lg\\:border-green-lightest {\n    border-color: #e3fcec;\n  }\n\n  .lg\\:border-teal-darkest {\n    border-color: #0d3331;\n  }\n\n  .lg\\:border-teal-darker {\n    border-color: #20504f;\n  }\n\n  .lg\\:border-teal-dark {\n    border-color: #38a89d;\n  }\n\n  .lg\\:border-teal {\n    border-color: #4dc0b5;\n  }\n\n  .lg\\:border-teal-light {\n    border-color: #64d5ca;\n  }\n\n  .lg\\:border-teal-lighter {\n    border-color: #a0f0ed;\n  }\n\n  .lg\\:border-teal-lightest {\n    border-color: #e8fffe;\n  }\n\n  .lg\\:border-blue-darkest {\n    border-color: #12283a;\n  }\n\n  .lg\\:border-blue-darker {\n    border-color: #1c3d5a;\n  }\n\n  .lg\\:border-blue-dark {\n    border-color: #2779bd;\n  }\n\n  .lg\\:border-blue {\n    border-color: #3490dc;\n  }\n\n  .lg\\:border-blue-light {\n    border-color: #6cb2eb;\n  }\n\n  .lg\\:border-blue-lighter {\n    border-color: #bcdefa;\n  }\n\n  .lg\\:border-blue-lightest {\n    border-color: #eff8ff;\n  }\n\n  .lg\\:border-indigo-darkest {\n    border-color: #191e38;\n  }\n\n  .lg\\:border-indigo-darker {\n    border-color: #2f365f;\n  }\n\n  .lg\\:border-indigo-dark {\n    border-color: #5661b3;\n  }\n\n  .lg\\:border-indigo {\n    border-color: #6574cd;\n  }\n\n  .lg\\:border-indigo-light {\n    border-color: #7886d7;\n  }\n\n  .lg\\:border-indigo-lighter {\n    border-color: #b2b7ff;\n  }\n\n  .lg\\:border-indigo-lightest {\n    border-color: #e6e8ff;\n  }\n\n  .lg\\:border-purple-darkest {\n    border-color: #21183c;\n  }\n\n  .lg\\:border-purple-darker {\n    border-color: #382b5f;\n  }\n\n  .lg\\:border-purple-dark {\n    border-color: #794acf;\n  }\n\n  .lg\\:border-purple {\n    border-color: #9561e2;\n  }\n\n  .lg\\:border-purple-light {\n    border-color: #a779e9;\n  }\n\n  .lg\\:border-purple-lighter {\n    border-color: #d6bbfc;\n  }\n\n  .lg\\:border-purple-lightest {\n    border-color: #f3ebff;\n  }\n\n  .lg\\:border-pink-darkest {\n    border-color: #451225;\n  }\n\n  .lg\\:border-pink-darker {\n    border-color: #6f213f;\n  }\n\n  .lg\\:border-pink-dark {\n    border-color: #eb5286;\n  }\n\n  .lg\\:border-pink {\n    border-color: #f66d9b;\n  }\n\n  .lg\\:border-pink-light {\n    border-color: #fa7ea8;\n  }\n\n  .lg\\:border-pink-lighter {\n    border-color: #ffbbca;\n  }\n\n  .lg\\:border-pink-lightest {\n    border-color: #ffebef;\n  }\n\n  .lg\\:hover\\:border-transparent:hover {\n    border-color: transparent;\n  }\n\n  .lg\\:hover\\:border-black:hover {\n    border-color: #22292f;\n  }\n\n  .lg\\:hover\\:border-grey-darkest:hover {\n    border-color: #3d4852;\n  }\n\n  .lg\\:hover\\:border-grey-darker:hover {\n    border-color: #606f7b;\n  }\n\n  .lg\\:hover\\:border-grey-dark:hover {\n    border-color: #8795a1;\n  }\n\n  .lg\\:hover\\:border-grey:hover {\n    border-color: #b8c2cc;\n  }\n\n  .lg\\:hover\\:border-grey-light:hover {\n    border-color: #dae1e7;\n  }\n\n  .lg\\:hover\\:border-grey-lighter:hover {\n    border-color: #f1f5f8;\n  }\n\n  .lg\\:hover\\:border-grey-lightest:hover {\n    border-color: #f8fafc;\n  }\n\n  .lg\\:hover\\:border-white:hover {\n    border-color: #fff;\n  }\n\n  .lg\\:hover\\:border-red-darkest:hover {\n    border-color: #3b0d0c;\n  }\n\n  .lg\\:hover\\:border-red-darker:hover {\n    border-color: #621b18;\n  }\n\n  .lg\\:hover\\:border-red-dark:hover {\n    border-color: #cc1f1a;\n  }\n\n  .lg\\:hover\\:border-red:hover {\n    border-color: #e3342f;\n  }\n\n  .lg\\:hover\\:border-red-light:hover {\n    border-color: #ef5753;\n  }\n\n  .lg\\:hover\\:border-red-lighter:hover {\n    border-color: #f9acaa;\n  }\n\n  .lg\\:hover\\:border-red-lightest:hover {\n    border-color: #fcebea;\n  }\n\n  .lg\\:hover\\:border-orange-darkest:hover {\n    border-color: #462a16;\n  }\n\n  .lg\\:hover\\:border-orange-darker:hover {\n    border-color: #613b1f;\n  }\n\n  .lg\\:hover\\:border-orange-dark:hover {\n    border-color: #de751f;\n  }\n\n  .lg\\:hover\\:border-orange:hover {\n    border-color: #f6993f;\n  }\n\n  .lg\\:hover\\:border-orange-light:hover {\n    border-color: #faad63;\n  }\n\n  .lg\\:hover\\:border-orange-lighter:hover {\n    border-color: #fcd9b6;\n  }\n\n  .lg\\:hover\\:border-orange-lightest:hover {\n    border-color: #fff5eb;\n  }\n\n  .lg\\:hover\\:border-yellow-darkest:hover {\n    border-color: #453411;\n  }\n\n  .lg\\:hover\\:border-yellow-darker:hover {\n    border-color: #684f1d;\n  }\n\n  .lg\\:hover\\:border-yellow-dark:hover {\n    border-color: #f2d024;\n  }\n\n  .lg\\:hover\\:border-yellow:hover {\n    border-color: #ffed4a;\n  }\n\n  .lg\\:hover\\:border-yellow-light:hover {\n    border-color: #fff382;\n  }\n\n  .lg\\:hover\\:border-yellow-lighter:hover {\n    border-color: #fff9c2;\n  }\n\n  .lg\\:hover\\:border-yellow-lightest:hover {\n    border-color: #fcfbeb;\n  }\n\n  .lg\\:hover\\:border-green-darkest:hover {\n    border-color: #0f2f21;\n  }\n\n  .lg\\:hover\\:border-green-darker:hover {\n    border-color: #1a4731;\n  }\n\n  .lg\\:hover\\:border-green-dark:hover {\n    border-color: #1f9d55;\n  }\n\n  .lg\\:hover\\:border-green:hover {\n    border-color: #38c172;\n  }\n\n  .lg\\:hover\\:border-green-light:hover {\n    border-color: #51d88a;\n  }\n\n  .lg\\:hover\\:border-green-lighter:hover {\n    border-color: #a2f5bf;\n  }\n\n  .lg\\:hover\\:border-green-lightest:hover {\n    border-color: #e3fcec;\n  }\n\n  .lg\\:hover\\:border-teal-darkest:hover {\n    border-color: #0d3331;\n  }\n\n  .lg\\:hover\\:border-teal-darker:hover {\n    border-color: #20504f;\n  }\n\n  .lg\\:hover\\:border-teal-dark:hover {\n    border-color: #38a89d;\n  }\n\n  .lg\\:hover\\:border-teal:hover {\n    border-color: #4dc0b5;\n  }\n\n  .lg\\:hover\\:border-teal-light:hover {\n    border-color: #64d5ca;\n  }\n\n  .lg\\:hover\\:border-teal-lighter:hover {\n    border-color: #a0f0ed;\n  }\n\n  .lg\\:hover\\:border-teal-lightest:hover {\n    border-color: #e8fffe;\n  }\n\n  .lg\\:hover\\:border-blue-darkest:hover {\n    border-color: #12283a;\n  }\n\n  .lg\\:hover\\:border-blue-darker:hover {\n    border-color: #1c3d5a;\n  }\n\n  .lg\\:hover\\:border-blue-dark:hover {\n    border-color: #2779bd;\n  }\n\n  .lg\\:hover\\:border-blue:hover {\n    border-color: #3490dc;\n  }\n\n  .lg\\:hover\\:border-blue-light:hover {\n    border-color: #6cb2eb;\n  }\n\n  .lg\\:hover\\:border-blue-lighter:hover {\n    border-color: #bcdefa;\n  }\n\n  .lg\\:hover\\:border-blue-lightest:hover {\n    border-color: #eff8ff;\n  }\n\n  .lg\\:hover\\:border-indigo-darkest:hover {\n    border-color: #191e38;\n  }\n\n  .lg\\:hover\\:border-indigo-darker:hover {\n    border-color: #2f365f;\n  }\n\n  .lg\\:hover\\:border-indigo-dark:hover {\n    border-color: #5661b3;\n  }\n\n  .lg\\:hover\\:border-indigo:hover {\n    border-color: #6574cd;\n  }\n\n  .lg\\:hover\\:border-indigo-light:hover {\n    border-color: #7886d7;\n  }\n\n  .lg\\:hover\\:border-indigo-lighter:hover {\n    border-color: #b2b7ff;\n  }\n\n  .lg\\:hover\\:border-indigo-lightest:hover {\n    border-color: #e6e8ff;\n  }\n\n  .lg\\:hover\\:border-purple-darkest:hover {\n    border-color: #21183c;\n  }\n\n  .lg\\:hover\\:border-purple-darker:hover {\n    border-color: #382b5f;\n  }\n\n  .lg\\:hover\\:border-purple-dark:hover {\n    border-color: #794acf;\n  }\n\n  .lg\\:hover\\:border-purple:hover {\n    border-color: #9561e2;\n  }\n\n  .lg\\:hover\\:border-purple-light:hover {\n    border-color: #a779e9;\n  }\n\n  .lg\\:hover\\:border-purple-lighter:hover {\n    border-color: #d6bbfc;\n  }\n\n  .lg\\:hover\\:border-purple-lightest:hover {\n    border-color: #f3ebff;\n  }\n\n  .lg\\:hover\\:border-pink-darkest:hover {\n    border-color: #451225;\n  }\n\n  .lg\\:hover\\:border-pink-darker:hover {\n    border-color: #6f213f;\n  }\n\n  .lg\\:hover\\:border-pink-dark:hover {\n    border-color: #eb5286;\n  }\n\n  .lg\\:hover\\:border-pink:hover {\n    border-color: #f66d9b;\n  }\n\n  .lg\\:hover\\:border-pink-light:hover {\n    border-color: #fa7ea8;\n  }\n\n  .lg\\:hover\\:border-pink-lighter:hover {\n    border-color: #ffbbca;\n  }\n\n  .lg\\:hover\\:border-pink-lightest:hover {\n    border-color: #ffebef;\n  }\n\n  .lg\\:rounded-none {\n    border-radius: 0;\n  }\n\n  .lg\\:rounded-sm {\n    border-radius: .125rem;\n  }\n\n  .lg\\:rounded {\n    border-radius: .25rem;\n  }\n\n  .lg\\:rounded-lg {\n    border-radius: .5rem;\n  }\n\n  .lg\\:rounded-full {\n    border-radius: 9999px;\n  }\n\n  .lg\\:rounded-t-none {\n    border-top-left-radius: 0;\n    border-top-right-radius: 0;\n  }\n\n  .lg\\:rounded-r-none {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n  }\n\n  .lg\\:rounded-b-none {\n    border-bottom-right-radius: 0;\n    border-bottom-left-radius: 0;\n  }\n\n  .lg\\:rounded-l-none {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n  }\n\n  .lg\\:rounded-t-sm {\n    border-top-left-radius: .125rem;\n    border-top-right-radius: .125rem;\n  }\n\n  .lg\\:rounded-r-sm {\n    border-top-right-radius: .125rem;\n    border-bottom-right-radius: .125rem;\n  }\n\n  .lg\\:rounded-b-sm {\n    border-bottom-right-radius: .125rem;\n    border-bottom-left-radius: .125rem;\n  }\n\n  .lg\\:rounded-l-sm {\n    border-top-left-radius: .125rem;\n    border-bottom-left-radius: .125rem;\n  }\n\n  .lg\\:rounded-t {\n    border-top-left-radius: .25rem;\n    border-top-right-radius: .25rem;\n  }\n\n  .lg\\:rounded-r {\n    border-top-right-radius: .25rem;\n    border-bottom-right-radius: .25rem;\n  }\n\n  .lg\\:rounded-b {\n    border-bottom-right-radius: .25rem;\n    border-bottom-left-radius: .25rem;\n  }\n\n  .lg\\:rounded-l {\n    border-top-left-radius: .25rem;\n    border-bottom-left-radius: .25rem;\n  }\n\n  .lg\\:rounded-t-lg {\n    border-top-left-radius: .5rem;\n    border-top-right-radius: .5rem;\n  }\n\n  .lg\\:rounded-r-lg {\n    border-top-right-radius: .5rem;\n    border-bottom-right-radius: .5rem;\n  }\n\n  .lg\\:rounded-b-lg {\n    border-bottom-right-radius: .5rem;\n    border-bottom-left-radius: .5rem;\n  }\n\n  .lg\\:rounded-l-lg {\n    border-top-left-radius: .5rem;\n    border-bottom-left-radius: .5rem;\n  }\n\n  .lg\\:rounded-t-full {\n    border-top-left-radius: 9999px;\n    border-top-right-radius: 9999px;\n  }\n\n  .lg\\:rounded-r-full {\n    border-top-right-radius: 9999px;\n    border-bottom-right-radius: 9999px;\n  }\n\n  .lg\\:rounded-b-full {\n    border-bottom-right-radius: 9999px;\n    border-bottom-left-radius: 9999px;\n  }\n\n  .lg\\:rounded-l-full {\n    border-top-left-radius: 9999px;\n    border-bottom-left-radius: 9999px;\n  }\n\n  .lg\\:rounded-tl-none {\n    border-top-left-radius: 0;\n  }\n\n  .lg\\:rounded-tr-none {\n    border-top-right-radius: 0;\n  }\n\n  .lg\\:rounded-br-none {\n    border-bottom-right-radius: 0;\n  }\n\n  .lg\\:rounded-bl-none {\n    border-bottom-left-radius: 0;\n  }\n\n  .lg\\:rounded-tl-sm {\n    border-top-left-radius: .125rem;\n  }\n\n  .lg\\:rounded-tr-sm {\n    border-top-right-radius: .125rem;\n  }\n\n  .lg\\:rounded-br-sm {\n    border-bottom-right-radius: .125rem;\n  }\n\n  .lg\\:rounded-bl-sm {\n    border-bottom-left-radius: .125rem;\n  }\n\n  .lg\\:rounded-tl {\n    border-top-left-radius: .25rem;\n  }\n\n  .lg\\:rounded-tr {\n    border-top-right-radius: .25rem;\n  }\n\n  .lg\\:rounded-br {\n    border-bottom-right-radius: .25rem;\n  }\n\n  .lg\\:rounded-bl {\n    border-bottom-left-radius: .25rem;\n  }\n\n  .lg\\:rounded-tl-lg {\n    border-top-left-radius: .5rem;\n  }\n\n  .lg\\:rounded-tr-lg {\n    border-top-right-radius: .5rem;\n  }\n\n  .lg\\:rounded-br-lg {\n    border-bottom-right-radius: .5rem;\n  }\n\n  .lg\\:rounded-bl-lg {\n    border-bottom-left-radius: .5rem;\n  }\n\n  .lg\\:rounded-tl-full {\n    border-top-left-radius: 9999px;\n  }\n\n  .lg\\:rounded-tr-full {\n    border-top-right-radius: 9999px;\n  }\n\n  .lg\\:rounded-br-full {\n    border-bottom-right-radius: 9999px;\n  }\n\n  .lg\\:rounded-bl-full {\n    border-bottom-left-radius: 9999px;\n  }\n\n  .lg\\:border-solid {\n    border-style: solid;\n  }\n\n  .lg\\:border-dashed {\n    border-style: dashed;\n  }\n\n  .lg\\:border-dotted {\n    border-style: dotted;\n  }\n\n  .lg\\:border-none {\n    border-style: none;\n  }\n\n  .lg\\:border-0 {\n    border-width: 0;\n  }\n\n  .lg\\:border-2 {\n    border-width: 2px;\n  }\n\n  .lg\\:border-4 {\n    border-width: 4px;\n  }\n\n  .lg\\:border-8 {\n    border-width: 8px;\n  }\n\n  .lg\\:border {\n    border-width: 1px;\n  }\n\n  .lg\\:border-t-0 {\n    border-top-width: 0;\n  }\n\n  .lg\\:border-r-0 {\n    border-right-width: 0;\n  }\n\n  .lg\\:border-b-0 {\n    border-bottom-width: 0;\n  }\n\n  .lg\\:border-l-0 {\n    border-left-width: 0;\n  }\n\n  .lg\\:border-t-2 {\n    border-top-width: 2px;\n  }\n\n  .lg\\:border-r-2 {\n    border-right-width: 2px;\n  }\n\n  .lg\\:border-b-2 {\n    border-bottom-width: 2px;\n  }\n\n  .lg\\:border-l-2 {\n    border-left-width: 2px;\n  }\n\n  .lg\\:border-t-4 {\n    border-top-width: 4px;\n  }\n\n  .lg\\:border-r-4 {\n    border-right-width: 4px;\n  }\n\n  .lg\\:border-b-4 {\n    border-bottom-width: 4px;\n  }\n\n  .lg\\:border-l-4 {\n    border-left-width: 4px;\n  }\n\n  .lg\\:border-t-8 {\n    border-top-width: 8px;\n  }\n\n  .lg\\:border-r-8 {\n    border-right-width: 8px;\n  }\n\n  .lg\\:border-b-8 {\n    border-bottom-width: 8px;\n  }\n\n  .lg\\:border-l-8 {\n    border-left-width: 8px;\n  }\n\n  .lg\\:border-t {\n    border-top-width: 1px;\n  }\n\n  .lg\\:border-r {\n    border-right-width: 1px;\n  }\n\n  .lg\\:border-b {\n    border-bottom-width: 1px;\n  }\n\n  .lg\\:border-l {\n    border-left-width: 1px;\n  }\n\n  .lg\\:cursor-auto {\n    cursor: auto;\n  }\n\n  .lg\\:cursor-default {\n    cursor: default;\n  }\n\n  .lg\\:cursor-pointer {\n    cursor: pointer;\n  }\n\n  .lg\\:cursor-wait {\n    cursor: wait;\n  }\n\n  .lg\\:cursor-move {\n    cursor: move;\n  }\n\n  .lg\\:cursor-not-allowed {\n    cursor: not-allowed;\n  }\n\n  .lg\\:block {\n    display: block;\n  }\n\n  .lg\\:inline-block {\n    display: inline-block;\n  }\n\n  .lg\\:inline {\n    display: inline;\n  }\n\n  .lg\\:table {\n    display: table;\n  }\n\n  .lg\\:table-row {\n    display: table-row;\n  }\n\n  .lg\\:table-cell {\n    display: table-cell;\n  }\n\n  .lg\\:hidden {\n    display: none;\n  }\n\n  .lg\\:flex {\n    display: flex;\n  }\n\n  .lg\\:inline-flex {\n    display: inline-flex;\n  }\n\n  .lg\\:flex-row {\n    flex-direction: row;\n  }\n\n  .lg\\:flex-row-reverse {\n    flex-direction: row-reverse;\n  }\n\n  .lg\\:flex-col {\n    flex-direction: column;\n  }\n\n  .lg\\:flex-col-reverse {\n    flex-direction: column-reverse;\n  }\n\n  .lg\\:flex-wrap {\n    flex-wrap: wrap;\n  }\n\n  .lg\\:flex-wrap-reverse {\n    flex-wrap: wrap-reverse;\n  }\n\n  .lg\\:flex-no-wrap {\n    flex-wrap: nowrap;\n  }\n\n  .lg\\:items-start {\n    align-items: flex-start;\n  }\n\n  .lg\\:items-end {\n    align-items: flex-end;\n  }\n\n  .lg\\:items-center {\n    align-items: center;\n  }\n\n  .lg\\:items-baseline {\n    align-items: baseline;\n  }\n\n  .lg\\:items-stretch {\n    align-items: stretch;\n  }\n\n  .lg\\:self-auto {\n    align-self: auto;\n  }\n\n  .lg\\:self-start {\n    align-self: flex-start;\n  }\n\n  .lg\\:self-end {\n    align-self: flex-end;\n  }\n\n  .lg\\:self-center {\n    align-self: center;\n  }\n\n  .lg\\:self-stretch {\n    align-self: stretch;\n  }\n\n  .lg\\:justify-start {\n    justify-content: flex-start;\n  }\n\n  .lg\\:justify-end {\n    justify-content: flex-end;\n  }\n\n  .lg\\:justify-center {\n    justify-content: center;\n  }\n\n  .lg\\:justify-between {\n    justify-content: space-between;\n  }\n\n  .lg\\:justify-around {\n    justify-content: space-around;\n  }\n\n  .lg\\:content-center {\n    align-content: center;\n  }\n\n  .lg\\:content-start {\n    align-content: flex-start;\n  }\n\n  .lg\\:content-end {\n    align-content: flex-end;\n  }\n\n  .lg\\:content-between {\n    align-content: space-between;\n  }\n\n  .lg\\:content-around {\n    align-content: space-around;\n  }\n\n  .lg\\:flex-1 {\n    flex: 1;\n  }\n\n  .lg\\:flex-auto {\n    flex: auto;\n  }\n\n  .lg\\:flex-initial {\n    flex: initial;\n  }\n\n  .lg\\:flex-none {\n    flex: none;\n  }\n\n  .lg\\:flex-grow {\n    flex-grow: 1;\n  }\n\n  .lg\\:flex-shrink {\n    flex-shrink: 1;\n  }\n\n  .lg\\:flex-no-grow {\n    flex-grow: 0;\n  }\n\n  .lg\\:flex-no-shrink {\n    flex-shrink: 0;\n  }\n\n  .lg\\:float-right {\n    float: right;\n  }\n\n  .lg\\:float-left {\n    float: left;\n  }\n\n  .lg\\:float-none {\n    float: none;\n  }\n\n  .lg\\:clearfix:after {\n    content: \"\";\n    display: table;\n    clear: both;\n  }\n\n  .lg\\:font-sans {\n    font-family: system-ui, BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;\n  }\n\n  .lg\\:font-serif {\n    font-family: Constantia, Lucida Bright, Lucidabright, Lucida Serif, Lucida, DejaVu Serif, Bitstream Vera Serif, Liberation Serif, Georgia, serif;\n  }\n\n  .lg\\:font-mono {\n    font-family: Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;\n  }\n\n  .lg\\:font-hairline {\n    font-weight: 100;\n  }\n\n  .lg\\:font-thin {\n    font-weight: 200;\n  }\n\n  .lg\\:font-light {\n    font-weight: 300;\n  }\n\n  .lg\\:font-normal {\n    font-weight: 400;\n  }\n\n  .lg\\:font-medium {\n    font-weight: 500;\n  }\n\n  .lg\\:font-semibold {\n    font-weight: 600;\n  }\n\n  .lg\\:font-bold {\n    font-weight: 700;\n  }\n\n  .lg\\:font-extrabold {\n    font-weight: 800;\n  }\n\n  .lg\\:font-black {\n    font-weight: 900;\n  }\n\n  .lg\\:hover\\:font-hairline:hover {\n    font-weight: 100;\n  }\n\n  .lg\\:hover\\:font-thin:hover {\n    font-weight: 200;\n  }\n\n  .lg\\:hover\\:font-light:hover {\n    font-weight: 300;\n  }\n\n  .lg\\:hover\\:font-normal:hover {\n    font-weight: 400;\n  }\n\n  .lg\\:hover\\:font-medium:hover {\n    font-weight: 500;\n  }\n\n  .lg\\:hover\\:font-semibold:hover {\n    font-weight: 600;\n  }\n\n  .lg\\:hover\\:font-bold:hover {\n    font-weight: 700;\n  }\n\n  .lg\\:hover\\:font-extrabold:hover {\n    font-weight: 800;\n  }\n\n  .lg\\:hover\\:font-black:hover {\n    font-weight: 900;\n  }\n\n  .lg\\:h-1 {\n    height: .25rem;\n  }\n\n  .lg\\:h-2 {\n    height: .5rem;\n  }\n\n  .lg\\:h-3 {\n    height: .75rem;\n  }\n\n  .lg\\:h-4 {\n    height: 1rem;\n  }\n\n  .lg\\:h-6 {\n    height: 1.5rem;\n  }\n\n  .lg\\:h-8 {\n    height: 2rem;\n  }\n\n  .lg\\:h-10 {\n    height: 2.5rem;\n  }\n\n  .lg\\:h-12 {\n    height: 3rem;\n  }\n\n  .lg\\:h-16 {\n    height: 4rem;\n  }\n\n  .lg\\:h-24 {\n    height: 6rem;\n  }\n\n  .lg\\:h-32 {\n    height: 8rem;\n  }\n\n  .lg\\:h-48 {\n    height: 12rem;\n  }\n\n  .lg\\:h-64 {\n    height: 16rem;\n  }\n\n  .lg\\:h-auto {\n    height: auto;\n  }\n\n  .lg\\:h-px {\n    height: 1px;\n  }\n\n  .lg\\:h-full {\n    height: 100%;\n  }\n\n  .lg\\:h-screen {\n    height: 100vh;\n  }\n\n  .lg\\:leading-none {\n    line-height: 1;\n  }\n\n  .lg\\:leading-tight {\n    line-height: 1.25;\n  }\n\n  .lg\\:leading-normal {\n    line-height: 1.5;\n  }\n\n  .lg\\:leading-loose {\n    line-height: 2;\n  }\n\n  .lg\\:m-0 {\n    margin: 0;\n  }\n\n  .lg\\:m-1 {\n    margin: .25rem;\n  }\n\n  .lg\\:m-2 {\n    margin: .5rem;\n  }\n\n  .lg\\:m-3 {\n    margin: .75rem;\n  }\n\n  .lg\\:m-4 {\n    margin: 1rem;\n  }\n\n  .lg\\:m-6 {\n    margin: 1.5rem;\n  }\n\n  .lg\\:m-8 {\n    margin: 2rem;\n  }\n\n  .lg\\:m-auto {\n    margin: auto;\n  }\n\n  .lg\\:m-px {\n    margin: 1px;\n  }\n\n  .lg\\:my-0 {\n    margin-top: 0;\n    margin-bottom: 0;\n  }\n\n  .lg\\:mx-0 {\n    margin-left: 0;\n    margin-right: 0;\n  }\n\n  .lg\\:my-1 {\n    margin-top: .25rem;\n    margin-bottom: .25rem;\n  }\n\n  .lg\\:mx-1 {\n    margin-left: .25rem;\n    margin-right: .25rem;\n  }\n\n  .lg\\:my-2 {\n    margin-top: .5rem;\n    margin-bottom: .5rem;\n  }\n\n  .lg\\:mx-2 {\n    margin-left: .5rem;\n    margin-right: .5rem;\n  }\n\n  .lg\\:my-3 {\n    margin-top: .75rem;\n    margin-bottom: .75rem;\n  }\n\n  .lg\\:mx-3 {\n    margin-left: .75rem;\n    margin-right: .75rem;\n  }\n\n  .lg\\:my-4 {\n    margin-top: 1rem;\n    margin-bottom: 1rem;\n  }\n\n  .lg\\:mx-4 {\n    margin-left: 1rem;\n    margin-right: 1rem;\n  }\n\n  .lg\\:my-6 {\n    margin-top: 1.5rem;\n    margin-bottom: 1.5rem;\n  }\n\n  .lg\\:mx-6 {\n    margin-left: 1.5rem;\n    margin-right: 1.5rem;\n  }\n\n  .lg\\:my-8 {\n    margin-top: 2rem;\n    margin-bottom: 2rem;\n  }\n\n  .lg\\:mx-8 {\n    margin-left: 2rem;\n    margin-right: 2rem;\n  }\n\n  .lg\\:my-auto {\n    margin-top: auto;\n    margin-bottom: auto;\n  }\n\n  .lg\\:mx-auto {\n    margin-left: auto;\n    margin-right: auto;\n  }\n\n  .lg\\:my-px {\n    margin-top: 1px;\n    margin-bottom: 1px;\n  }\n\n  .lg\\:mx-px {\n    margin-left: 1px;\n    margin-right: 1px;\n  }\n\n  .lg\\:mt-0 {\n    margin-top: 0;\n  }\n\n  .lg\\:mr-0 {\n    margin-right: 0;\n  }\n\n  .lg\\:mb-0 {\n    margin-bottom: 0;\n  }\n\n  .lg\\:ml-0 {\n    margin-left: 0;\n  }\n\n  .lg\\:mt-1 {\n    margin-top: .25rem;\n  }\n\n  .lg\\:mr-1 {\n    margin-right: .25rem;\n  }\n\n  .lg\\:mb-1 {\n    margin-bottom: .25rem;\n  }\n\n  .lg\\:ml-1 {\n    margin-left: .25rem;\n  }\n\n  .lg\\:mt-2 {\n    margin-top: .5rem;\n  }\n\n  .lg\\:mr-2 {\n    margin-right: .5rem;\n  }\n\n  .lg\\:mb-2 {\n    margin-bottom: .5rem;\n  }\n\n  .lg\\:ml-2 {\n    margin-left: .5rem;\n  }\n\n  .lg\\:mt-3 {\n    margin-top: .75rem;\n  }\n\n  .lg\\:mr-3 {\n    margin-right: .75rem;\n  }\n\n  .lg\\:mb-3 {\n    margin-bottom: .75rem;\n  }\n\n  .lg\\:ml-3 {\n    margin-left: .75rem;\n  }\n\n  .lg\\:mt-4 {\n    margin-top: 1rem;\n  }\n\n  .lg\\:mr-4 {\n    margin-right: 1rem;\n  }\n\n  .lg\\:mb-4 {\n    margin-bottom: 1rem;\n  }\n\n  .lg\\:ml-4 {\n    margin-left: 1rem;\n  }\n\n  .lg\\:mt-6 {\n    margin-top: 1.5rem;\n  }\n\n  .lg\\:mr-6 {\n    margin-right: 1.5rem;\n  }\n\n  .lg\\:mb-6 {\n    margin-bottom: 1.5rem;\n  }\n\n  .lg\\:ml-6 {\n    margin-left: 1.5rem;\n  }\n\n  .lg\\:mt-8 {\n    margin-top: 2rem;\n  }\n\n  .lg\\:mr-8 {\n    margin-right: 2rem;\n  }\n\n  .lg\\:mb-8 {\n    margin-bottom: 2rem;\n  }\n\n  .lg\\:ml-8 {\n    margin-left: 2rem;\n  }\n\n  .lg\\:mt-auto {\n    margin-top: auto;\n  }\n\n  .lg\\:mr-auto {\n    margin-right: auto;\n  }\n\n  .lg\\:mb-auto {\n    margin-bottom: auto;\n  }\n\n  .lg\\:ml-auto {\n    margin-left: auto;\n  }\n\n  .lg\\:mt-px {\n    margin-top: 1px;\n  }\n\n  .lg\\:mr-px {\n    margin-right: 1px;\n  }\n\n  .lg\\:mb-px {\n    margin-bottom: 1px;\n  }\n\n  .lg\\:ml-px {\n    margin-left: 1px;\n  }\n\n  .lg\\:max-h-full {\n    max-height: 100%;\n  }\n\n  .lg\\:max-h-screen {\n    max-height: 100vh;\n  }\n\n  .lg\\:max-w-xs {\n    max-width: 20rem;\n  }\n\n  .lg\\:max-w-sm {\n    max-width: 30rem;\n  }\n\n  .lg\\:max-w-md {\n    max-width: 40rem;\n  }\n\n  .lg\\:max-w-lg {\n    max-width: 50rem;\n  }\n\n  .lg\\:max-w-xl {\n    max-width: 60rem;\n  }\n\n  .lg\\:max-w-2xl {\n    max-width: 70rem;\n  }\n\n  .lg\\:max-w-3xl {\n    max-width: 80rem;\n  }\n\n  .lg\\:max-w-4xl {\n    max-width: 90rem;\n  }\n\n  .lg\\:max-w-5xl {\n    max-width: 100rem;\n  }\n\n  .lg\\:max-w-full {\n    max-width: 100%;\n  }\n\n  .lg\\:min-h-0 {\n    min-height: 0;\n  }\n\n  .lg\\:min-h-full {\n    min-height: 100%;\n  }\n\n  .lg\\:min-h-screen {\n    min-height: 100vh;\n  }\n\n  .lg\\:min-w-0 {\n    min-width: 0;\n  }\n\n  .lg\\:min-w-full {\n    min-width: 100%;\n  }\n\n  .lg\\:-m-0 {\n    margin: 0;\n  }\n\n  .lg\\:-m-1 {\n    margin: -0.25rem;\n  }\n\n  .lg\\:-m-2 {\n    margin: -0.5rem;\n  }\n\n  .lg\\:-m-3 {\n    margin: -0.75rem;\n  }\n\n  .lg\\:-m-4 {\n    margin: -1rem;\n  }\n\n  .lg\\:-m-6 {\n    margin: -1.5rem;\n  }\n\n  .lg\\:-m-8 {\n    margin: -2rem;\n  }\n\n  .lg\\:-m-px {\n    margin: -1px;\n  }\n\n  .lg\\:-my-0 {\n    margin-top: 0;\n    margin-bottom: 0;\n  }\n\n  .lg\\:-mx-0 {\n    margin-left: 0;\n    margin-right: 0;\n  }\n\n  .lg\\:-my-1 {\n    margin-top: -0.25rem;\n    margin-bottom: -0.25rem;\n  }\n\n  .lg\\:-mx-1 {\n    margin-left: -0.25rem;\n    margin-right: -0.25rem;\n  }\n\n  .lg\\:-my-2 {\n    margin-top: -0.5rem;\n    margin-bottom: -0.5rem;\n  }\n\n  .lg\\:-mx-2 {\n    margin-left: -0.5rem;\n    margin-right: -0.5rem;\n  }\n\n  .lg\\:-my-3 {\n    margin-top: -0.75rem;\n    margin-bottom: -0.75rem;\n  }\n\n  .lg\\:-mx-3 {\n    margin-left: -0.75rem;\n    margin-right: -0.75rem;\n  }\n\n  .lg\\:-my-4 {\n    margin-top: -1rem;\n    margin-bottom: -1rem;\n  }\n\n  .lg\\:-mx-4 {\n    margin-left: -1rem;\n    margin-right: -1rem;\n  }\n\n  .lg\\:-my-6 {\n    margin-top: -1.5rem;\n    margin-bottom: -1.5rem;\n  }\n\n  .lg\\:-mx-6 {\n    margin-left: -1.5rem;\n    margin-right: -1.5rem;\n  }\n\n  .lg\\:-my-8 {\n    margin-top: -2rem;\n    margin-bottom: -2rem;\n  }\n\n  .lg\\:-mx-8 {\n    margin-left: -2rem;\n    margin-right: -2rem;\n  }\n\n  .lg\\:-my-px {\n    margin-top: -1px;\n    margin-bottom: -1px;\n  }\n\n  .lg\\:-mx-px {\n    margin-left: -1px;\n    margin-right: -1px;\n  }\n\n  .lg\\:-mt-0 {\n    margin-top: 0;\n  }\n\n  .lg\\:-mr-0 {\n    margin-right: 0;\n  }\n\n  .lg\\:-mb-0 {\n    margin-bottom: 0;\n  }\n\n  .lg\\:-ml-0 {\n    margin-left: 0;\n  }\n\n  .lg\\:-mt-1 {\n    margin-top: -0.25rem;\n  }\n\n  .lg\\:-mr-1 {\n    margin-right: -0.25rem;\n  }\n\n  .lg\\:-mb-1 {\n    margin-bottom: -0.25rem;\n  }\n\n  .lg\\:-ml-1 {\n    margin-left: -0.25rem;\n  }\n\n  .lg\\:-mt-2 {\n    margin-top: -0.5rem;\n  }\n\n  .lg\\:-mr-2 {\n    margin-right: -0.5rem;\n  }\n\n  .lg\\:-mb-2 {\n    margin-bottom: -0.5rem;\n  }\n\n  .lg\\:-ml-2 {\n    margin-left: -0.5rem;\n  }\n\n  .lg\\:-mt-3 {\n    margin-top: -0.75rem;\n  }\n\n  .lg\\:-mr-3 {\n    margin-right: -0.75rem;\n  }\n\n  .lg\\:-mb-3 {\n    margin-bottom: -0.75rem;\n  }\n\n  .lg\\:-ml-3 {\n    margin-left: -0.75rem;\n  }\n\n  .lg\\:-mt-4 {\n    margin-top: -1rem;\n  }\n\n  .lg\\:-mr-4 {\n    margin-right: -1rem;\n  }\n\n  .lg\\:-mb-4 {\n    margin-bottom: -1rem;\n  }\n\n  .lg\\:-ml-4 {\n    margin-left: -1rem;\n  }\n\n  .lg\\:-mt-6 {\n    margin-top: -1.5rem;\n  }\n\n  .lg\\:-mr-6 {\n    margin-right: -1.5rem;\n  }\n\n  .lg\\:-mb-6 {\n    margin-bottom: -1.5rem;\n  }\n\n  .lg\\:-ml-6 {\n    margin-left: -1.5rem;\n  }\n\n  .lg\\:-mt-8 {\n    margin-top: -2rem;\n  }\n\n  .lg\\:-mr-8 {\n    margin-right: -2rem;\n  }\n\n  .lg\\:-mb-8 {\n    margin-bottom: -2rem;\n  }\n\n  .lg\\:-ml-8 {\n    margin-left: -2rem;\n  }\n\n  .lg\\:-mt-px {\n    margin-top: -1px;\n  }\n\n  .lg\\:-mr-px {\n    margin-right: -1px;\n  }\n\n  .lg\\:-mb-px {\n    margin-bottom: -1px;\n  }\n\n  .lg\\:-ml-px {\n    margin-left: -1px;\n  }\n\n  .lg\\:opacity-0 {\n    opacity: 0;\n  }\n\n  .lg\\:opacity-25 {\n    opacity: .25;\n  }\n\n  .lg\\:opacity-50 {\n    opacity: .5;\n  }\n\n  .lg\\:opacity-75 {\n    opacity: .75;\n  }\n\n  .lg\\:opacity-100 {\n    opacity: 1;\n  }\n\n  .lg\\:overflow-auto {\n    overflow: auto;\n  }\n\n  .lg\\:overflow-hidden {\n    overflow: hidden;\n  }\n\n  .lg\\:overflow-visible {\n    overflow: visible;\n  }\n\n  .lg\\:overflow-scroll {\n    overflow: scroll;\n  }\n\n  .lg\\:overflow-x-auto {\n    overflow-x: auto;\n  }\n\n  .lg\\:overflow-y-auto {\n    overflow-y: auto;\n  }\n\n  .lg\\:overflow-x-scroll {\n    overflow-x: scroll;\n  }\n\n  .lg\\:overflow-y-scroll {\n    overflow-y: scroll;\n  }\n\n  .lg\\:scrolling-touch {\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .lg\\:scrolling-auto {\n    -webkit-overflow-scrolling: auto;\n  }\n\n  .lg\\:p-0 {\n    padding: 0;\n  }\n\n  .lg\\:p-1 {\n    padding: .25rem;\n  }\n\n  .lg\\:p-2 {\n    padding: .5rem;\n  }\n\n  .lg\\:p-3 {\n    padding: .75rem;\n  }\n\n  .lg\\:p-4 {\n    padding: 1rem;\n  }\n\n  .lg\\:p-6 {\n    padding: 1.5rem;\n  }\n\n  .lg\\:p-8 {\n    padding: 2rem;\n  }\n\n  .lg\\:p-px {\n    padding: 1px;\n  }\n\n  .lg\\:py-0 {\n    padding-top: 0;\n    padding-bottom: 0;\n  }\n\n  .lg\\:px-0 {\n    padding-left: 0;\n    padding-right: 0;\n  }\n\n  .lg\\:py-1 {\n    padding-top: .25rem;\n    padding-bottom: .25rem;\n  }\n\n  .lg\\:px-1 {\n    padding-left: .25rem;\n    padding-right: .25rem;\n  }\n\n  .lg\\:py-2 {\n    padding-top: .5rem;\n    padding-bottom: .5rem;\n  }\n\n  .lg\\:px-2 {\n    padding-left: .5rem;\n    padding-right: .5rem;\n  }\n\n  .lg\\:py-3 {\n    padding-top: .75rem;\n    padding-bottom: .75rem;\n  }\n\n  .lg\\:px-3 {\n    padding-left: .75rem;\n    padding-right: .75rem;\n  }\n\n  .lg\\:py-4 {\n    padding-top: 1rem;\n    padding-bottom: 1rem;\n  }\n\n  .lg\\:px-4 {\n    padding-left: 1rem;\n    padding-right: 1rem;\n  }\n\n  .lg\\:py-6 {\n    padding-top: 1.5rem;\n    padding-bottom: 1.5rem;\n  }\n\n  .lg\\:px-6 {\n    padding-left: 1.5rem;\n    padding-right: 1.5rem;\n  }\n\n  .lg\\:py-8 {\n    padding-top: 2rem;\n    padding-bottom: 2rem;\n  }\n\n  .lg\\:px-8 {\n    padding-left: 2rem;\n    padding-right: 2rem;\n  }\n\n  .lg\\:py-px {\n    padding-top: 1px;\n    padding-bottom: 1px;\n  }\n\n  .lg\\:px-px {\n    padding-left: 1px;\n    padding-right: 1px;\n  }\n\n  .lg\\:pt-0 {\n    padding-top: 0;\n  }\n\n  .lg\\:pr-0 {\n    padding-right: 0;\n  }\n\n  .lg\\:pb-0 {\n    padding-bottom: 0;\n  }\n\n  .lg\\:pl-0 {\n    padding-left: 0;\n  }\n\n  .lg\\:pt-1 {\n    padding-top: .25rem;\n  }\n\n  .lg\\:pr-1 {\n    padding-right: .25rem;\n  }\n\n  .lg\\:pb-1 {\n    padding-bottom: .25rem;\n  }\n\n  .lg\\:pl-1 {\n    padding-left: .25rem;\n  }\n\n  .lg\\:pt-2 {\n    padding-top: .5rem;\n  }\n\n  .lg\\:pr-2 {\n    padding-right: .5rem;\n  }\n\n  .lg\\:pb-2 {\n    padding-bottom: .5rem;\n  }\n\n  .lg\\:pl-2 {\n    padding-left: .5rem;\n  }\n\n  .lg\\:pt-3 {\n    padding-top: .75rem;\n  }\n\n  .lg\\:pr-3 {\n    padding-right: .75rem;\n  }\n\n  .lg\\:pb-3 {\n    padding-bottom: .75rem;\n  }\n\n  .lg\\:pl-3 {\n    padding-left: .75rem;\n  }\n\n  .lg\\:pt-4 {\n    padding-top: 1rem;\n  }\n\n  .lg\\:pr-4 {\n    padding-right: 1rem;\n  }\n\n  .lg\\:pb-4 {\n    padding-bottom: 1rem;\n  }\n\n  .lg\\:pl-4 {\n    padding-left: 1rem;\n  }\n\n  .lg\\:pt-6 {\n    padding-top: 1.5rem;\n  }\n\n  .lg\\:pr-6 {\n    padding-right: 1.5rem;\n  }\n\n  .lg\\:pb-6 {\n    padding-bottom: 1.5rem;\n  }\n\n  .lg\\:pl-6 {\n    padding-left: 1.5rem;\n  }\n\n  .lg\\:pt-8 {\n    padding-top: 2rem;\n  }\n\n  .lg\\:pr-8 {\n    padding-right: 2rem;\n  }\n\n  .lg\\:pb-8 {\n    padding-bottom: 2rem;\n  }\n\n  .lg\\:pl-8 {\n    padding-left: 2rem;\n  }\n\n  .lg\\:pt-px {\n    padding-top: 1px;\n  }\n\n  .lg\\:pr-px {\n    padding-right: 1px;\n  }\n\n  .lg\\:pb-px {\n    padding-bottom: 1px;\n  }\n\n  .lg\\:pl-px {\n    padding-left: 1px;\n  }\n\n  .lg\\:pointer-events-none {\n    pointer-events: none;\n  }\n\n  .lg\\:pointer-events-auto {\n    pointer-events: auto;\n  }\n\n  .lg\\:static {\n    position: static;\n  }\n\n  .lg\\:fixed {\n    position: fixed;\n  }\n\n  .lg\\:absolute {\n    position: absolute;\n  }\n\n  .lg\\:relative {\n    position: relative;\n  }\n\n  .lg\\:sticky {\n    position: -webkit-sticky;\n    position: sticky;\n  }\n\n  .lg\\:pin-none {\n    top: auto;\n    right: auto;\n    bottom: auto;\n    left: auto;\n  }\n\n  .lg\\:pin {\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n  }\n\n  .lg\\:pin-y {\n    top: 0;\n    bottom: 0;\n  }\n\n  .lg\\:pin-x {\n    right: 0;\n    left: 0;\n  }\n\n  .lg\\:pin-t {\n    top: 0;\n  }\n\n  .lg\\:pin-r {\n    right: 0;\n  }\n\n  .lg\\:pin-b {\n    bottom: 0;\n  }\n\n  .lg\\:pin-l {\n    left: 0;\n  }\n\n  .lg\\:resize-none {\n    resize: none;\n  }\n\n  .lg\\:resize-y {\n    resize: vertical;\n  }\n\n  .lg\\:resize-x {\n    resize: horizontal;\n  }\n\n  .lg\\:resize {\n    resize: both;\n  }\n\n  .lg\\:shadow {\n    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n  }\n\n  .lg\\:shadow-md {\n    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n  }\n\n  .lg\\:shadow-lg {\n    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n  }\n\n  .lg\\:shadow-inner {\n    box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n  }\n\n  .lg\\:shadow-none {\n    box-shadow: none;\n  }\n\n  .lg\\:text-left {\n    text-align: left;\n  }\n\n  .lg\\:text-center {\n    text-align: center;\n  }\n\n  .lg\\:text-right {\n    text-align: right;\n  }\n\n  .lg\\:text-justify {\n    text-align: justify;\n  }\n\n  .lg\\:text-transparent {\n    color: transparent;\n  }\n\n  .lg\\:text-black {\n    color: #22292f;\n  }\n\n  .lg\\:text-grey-darkest {\n    color: #3d4852;\n  }\n\n  .lg\\:text-grey-darker {\n    color: #606f7b;\n  }\n\n  .lg\\:text-grey-dark {\n    color: #8795a1;\n  }\n\n  .lg\\:text-grey {\n    color: #b8c2cc;\n  }\n\n  .lg\\:text-grey-light {\n    color: #dae1e7;\n  }\n\n  .lg\\:text-grey-lighter {\n    color: #f1f5f8;\n  }\n\n  .lg\\:text-grey-lightest {\n    color: #f8fafc;\n  }\n\n  .lg\\:text-white {\n    color: #fff;\n  }\n\n  .lg\\:text-red-darkest {\n    color: #3b0d0c;\n  }\n\n  .lg\\:text-red-darker {\n    color: #621b18;\n  }\n\n  .lg\\:text-red-dark {\n    color: #cc1f1a;\n  }\n\n  .lg\\:text-red {\n    color: #e3342f;\n  }\n\n  .lg\\:text-red-light {\n    color: #ef5753;\n  }\n\n  .lg\\:text-red-lighter {\n    color: #f9acaa;\n  }\n\n  .lg\\:text-red-lightest {\n    color: #fcebea;\n  }\n\n  .lg\\:text-orange-darkest {\n    color: #462a16;\n  }\n\n  .lg\\:text-orange-darker {\n    color: #613b1f;\n  }\n\n  .lg\\:text-orange-dark {\n    color: #de751f;\n  }\n\n  .lg\\:text-orange {\n    color: #f6993f;\n  }\n\n  .lg\\:text-orange-light {\n    color: #faad63;\n  }\n\n  .lg\\:text-orange-lighter {\n    color: #fcd9b6;\n  }\n\n  .lg\\:text-orange-lightest {\n    color: #fff5eb;\n  }\n\n  .lg\\:text-yellow-darkest {\n    color: #453411;\n  }\n\n  .lg\\:text-yellow-darker {\n    color: #684f1d;\n  }\n\n  .lg\\:text-yellow-dark {\n    color: #f2d024;\n  }\n\n  .lg\\:text-yellow {\n    color: #ffed4a;\n  }\n\n  .lg\\:text-yellow-light {\n    color: #fff382;\n  }\n\n  .lg\\:text-yellow-lighter {\n    color: #fff9c2;\n  }\n\n  .lg\\:text-yellow-lightest {\n    color: #fcfbeb;\n  }\n\n  .lg\\:text-green-darkest {\n    color: #0f2f21;\n  }\n\n  .lg\\:text-green-darker {\n    color: #1a4731;\n  }\n\n  .lg\\:text-green-dark {\n    color: #1f9d55;\n  }\n\n  .lg\\:text-green {\n    color: #38c172;\n  }\n\n  .lg\\:text-green-light {\n    color: #51d88a;\n  }\n\n  .lg\\:text-green-lighter {\n    color: #a2f5bf;\n  }\n\n  .lg\\:text-green-lightest {\n    color: #e3fcec;\n  }\n\n  .lg\\:text-teal-darkest {\n    color: #0d3331;\n  }\n\n  .lg\\:text-teal-darker {\n    color: #20504f;\n  }\n\n  .lg\\:text-teal-dark {\n    color: #38a89d;\n  }\n\n  .lg\\:text-teal {\n    color: #4dc0b5;\n  }\n\n  .lg\\:text-teal-light {\n    color: #64d5ca;\n  }\n\n  .lg\\:text-teal-lighter {\n    color: #a0f0ed;\n  }\n\n  .lg\\:text-teal-lightest {\n    color: #e8fffe;\n  }\n\n  .lg\\:text-blue-darkest {\n    color: #12283a;\n  }\n\n  .lg\\:text-blue-darker {\n    color: #1c3d5a;\n  }\n\n  .lg\\:text-blue-dark {\n    color: #2779bd;\n  }\n\n  .lg\\:text-blue {\n    color: #3490dc;\n  }\n\n  .lg\\:text-blue-light {\n    color: #6cb2eb;\n  }\n\n  .lg\\:text-blue-lighter {\n    color: #bcdefa;\n  }\n\n  .lg\\:text-blue-lightest {\n    color: #eff8ff;\n  }\n\n  .lg\\:text-indigo-darkest {\n    color: #191e38;\n  }\n\n  .lg\\:text-indigo-darker {\n    color: #2f365f;\n  }\n\n  .lg\\:text-indigo-dark {\n    color: #5661b3;\n  }\n\n  .lg\\:text-indigo {\n    color: #6574cd;\n  }\n\n  .lg\\:text-indigo-light {\n    color: #7886d7;\n  }\n\n  .lg\\:text-indigo-lighter {\n    color: #b2b7ff;\n  }\n\n  .lg\\:text-indigo-lightest {\n    color: #e6e8ff;\n  }\n\n  .lg\\:text-purple-darkest {\n    color: #21183c;\n  }\n\n  .lg\\:text-purple-darker {\n    color: #382b5f;\n  }\n\n  .lg\\:text-purple-dark {\n    color: #794acf;\n  }\n\n  .lg\\:text-purple {\n    color: #9561e2;\n  }\n\n  .lg\\:text-purple-light {\n    color: #a779e9;\n  }\n\n  .lg\\:text-purple-lighter {\n    color: #d6bbfc;\n  }\n\n  .lg\\:text-purple-lightest {\n    color: #f3ebff;\n  }\n\n  .lg\\:text-pink-darkest {\n    color: #451225;\n  }\n\n  .lg\\:text-pink-darker {\n    color: #6f213f;\n  }\n\n  .lg\\:text-pink-dark {\n    color: #eb5286;\n  }\n\n  .lg\\:text-pink {\n    color: #f66d9b;\n  }\n\n  .lg\\:text-pink-light {\n    color: #fa7ea8;\n  }\n\n  .lg\\:text-pink-lighter {\n    color: #ffbbca;\n  }\n\n  .lg\\:text-pink-lightest {\n    color: #ffebef;\n  }\n\n  .lg\\:hover\\:text-transparent:hover {\n    color: transparent;\n  }\n\n  .lg\\:hover\\:text-black:hover {\n    color: #22292f;\n  }\n\n  .lg\\:hover\\:text-grey-darkest:hover {\n    color: #3d4852;\n  }\n\n  .lg\\:hover\\:text-grey-darker:hover {\n    color: #606f7b;\n  }\n\n  .lg\\:hover\\:text-grey-dark:hover {\n    color: #8795a1;\n  }\n\n  .lg\\:hover\\:text-grey:hover {\n    color: #b8c2cc;\n  }\n\n  .lg\\:hover\\:text-grey-light:hover {\n    color: #dae1e7;\n  }\n\n  .lg\\:hover\\:text-grey-lighter:hover {\n    color: #f1f5f8;\n  }\n\n  .lg\\:hover\\:text-grey-lightest:hover {\n    color: #f8fafc;\n  }\n\n  .lg\\:hover\\:text-white:hover {\n    color: #fff;\n  }\n\n  .lg\\:hover\\:text-red-darkest:hover {\n    color: #3b0d0c;\n  }\n\n  .lg\\:hover\\:text-red-darker:hover {\n    color: #621b18;\n  }\n\n  .lg\\:hover\\:text-red-dark:hover {\n    color: #cc1f1a;\n  }\n\n  .lg\\:hover\\:text-red:hover {\n    color: #e3342f;\n  }\n\n  .lg\\:hover\\:text-red-light:hover {\n    color: #ef5753;\n  }\n\n  .lg\\:hover\\:text-red-lighter:hover {\n    color: #f9acaa;\n  }\n\n  .lg\\:hover\\:text-red-lightest:hover {\n    color: #fcebea;\n  }\n\n  .lg\\:hover\\:text-orange-darkest:hover {\n    color: #462a16;\n  }\n\n  .lg\\:hover\\:text-orange-darker:hover {\n    color: #613b1f;\n  }\n\n  .lg\\:hover\\:text-orange-dark:hover {\n    color: #de751f;\n  }\n\n  .lg\\:hover\\:text-orange:hover {\n    color: #f6993f;\n  }\n\n  .lg\\:hover\\:text-orange-light:hover {\n    color: #faad63;\n  }\n\n  .lg\\:hover\\:text-orange-lighter:hover {\n    color: #fcd9b6;\n  }\n\n  .lg\\:hover\\:text-orange-lightest:hover {\n    color: #fff5eb;\n  }\n\n  .lg\\:hover\\:text-yellow-darkest:hover {\n    color: #453411;\n  }\n\n  .lg\\:hover\\:text-yellow-darker:hover {\n    color: #684f1d;\n  }\n\n  .lg\\:hover\\:text-yellow-dark:hover {\n    color: #f2d024;\n  }\n\n  .lg\\:hover\\:text-yellow:hover {\n    color: #ffed4a;\n  }\n\n  .lg\\:hover\\:text-yellow-light:hover {\n    color: #fff382;\n  }\n\n  .lg\\:hover\\:text-yellow-lighter:hover {\n    color: #fff9c2;\n  }\n\n  .lg\\:hover\\:text-yellow-lightest:hover {\n    color: #fcfbeb;\n  }\n\n  .lg\\:hover\\:text-green-darkest:hover {\n    color: #0f2f21;\n  }\n\n  .lg\\:hover\\:text-green-darker:hover {\n    color: #1a4731;\n  }\n\n  .lg\\:hover\\:text-green-dark:hover {\n    color: #1f9d55;\n  }\n\n  .lg\\:hover\\:text-green:hover {\n    color: #38c172;\n  }\n\n  .lg\\:hover\\:text-green-light:hover {\n    color: #51d88a;\n  }\n\n  .lg\\:hover\\:text-green-lighter:hover {\n    color: #a2f5bf;\n  }\n\n  .lg\\:hover\\:text-green-lightest:hover {\n    color: #e3fcec;\n  }\n\n  .lg\\:hover\\:text-teal-darkest:hover {\n    color: #0d3331;\n  }\n\n  .lg\\:hover\\:text-teal-darker:hover {\n    color: #20504f;\n  }\n\n  .lg\\:hover\\:text-teal-dark:hover {\n    color: #38a89d;\n  }\n\n  .lg\\:hover\\:text-teal:hover {\n    color: #4dc0b5;\n  }\n\n  .lg\\:hover\\:text-teal-light:hover {\n    color: #64d5ca;\n  }\n\n  .lg\\:hover\\:text-teal-lighter:hover {\n    color: #a0f0ed;\n  }\n\n  .lg\\:hover\\:text-teal-lightest:hover {\n    color: #e8fffe;\n  }\n\n  .lg\\:hover\\:text-blue-darkest:hover {\n    color: #12283a;\n  }\n\n  .lg\\:hover\\:text-blue-darker:hover {\n    color: #1c3d5a;\n  }\n\n  .lg\\:hover\\:text-blue-dark:hover {\n    color: #2779bd;\n  }\n\n  .lg\\:hover\\:text-blue:hover {\n    color: #3490dc;\n  }\n\n  .lg\\:hover\\:text-blue-light:hover {\n    color: #6cb2eb;\n  }\n\n  .lg\\:hover\\:text-blue-lighter:hover {\n    color: #bcdefa;\n  }\n\n  .lg\\:hover\\:text-blue-lightest:hover {\n    color: #eff8ff;\n  }\n\n  .lg\\:hover\\:text-indigo-darkest:hover {\n    color: #191e38;\n  }\n\n  .lg\\:hover\\:text-indigo-darker:hover {\n    color: #2f365f;\n  }\n\n  .lg\\:hover\\:text-indigo-dark:hover {\n    color: #5661b3;\n  }\n\n  .lg\\:hover\\:text-indigo:hover {\n    color: #6574cd;\n  }\n\n  .lg\\:hover\\:text-indigo-light:hover {\n    color: #7886d7;\n  }\n\n  .lg\\:hover\\:text-indigo-lighter:hover {\n    color: #b2b7ff;\n  }\n\n  .lg\\:hover\\:text-indigo-lightest:hover {\n    color: #e6e8ff;\n  }\n\n  .lg\\:hover\\:text-purple-darkest:hover {\n    color: #21183c;\n  }\n\n  .lg\\:hover\\:text-purple-darker:hover {\n    color: #382b5f;\n  }\n\n  .lg\\:hover\\:text-purple-dark:hover {\n    color: #794acf;\n  }\n\n  .lg\\:hover\\:text-purple:hover {\n    color: #9561e2;\n  }\n\n  .lg\\:hover\\:text-purple-light:hover {\n    color: #a779e9;\n  }\n\n  .lg\\:hover\\:text-purple-lighter:hover {\n    color: #d6bbfc;\n  }\n\n  .lg\\:hover\\:text-purple-lightest:hover {\n    color: #f3ebff;\n  }\n\n  .lg\\:hover\\:text-pink-darkest:hover {\n    color: #451225;\n  }\n\n  .lg\\:hover\\:text-pink-darker:hover {\n    color: #6f213f;\n  }\n\n  .lg\\:hover\\:text-pink-dark:hover {\n    color: #eb5286;\n  }\n\n  .lg\\:hover\\:text-pink:hover {\n    color: #f66d9b;\n  }\n\n  .lg\\:hover\\:text-pink-light:hover {\n    color: #fa7ea8;\n  }\n\n  .lg\\:hover\\:text-pink-lighter:hover {\n    color: #ffbbca;\n  }\n\n  .lg\\:hover\\:text-pink-lightest:hover {\n    color: #ffebef;\n  }\n\n  .lg\\:text-xs {\n    font-size: .75rem;\n  }\n\n  .lg\\:text-sm {\n    font-size: .875rem;\n  }\n\n  .lg\\:text-base {\n    font-size: 1rem;\n  }\n\n  .lg\\:text-lg {\n    font-size: 1.125rem;\n  }\n\n  .lg\\:text-xl {\n    font-size: 1.25rem;\n  }\n\n  .lg\\:text-2xl {\n    font-size: 1.5rem;\n  }\n\n  .lg\\:text-3xl {\n    font-size: 1.875rem;\n  }\n\n  .lg\\:text-4xl {\n    font-size: 2.25rem;\n  }\n\n  .lg\\:text-5xl {\n    font-size: 3rem;\n  }\n\n  .lg\\:italic {\n    font-style: italic;\n  }\n\n  .lg\\:roman {\n    font-style: normal;\n  }\n\n  .lg\\:uppercase {\n    text-transform: uppercase;\n  }\n\n  .lg\\:lowercase {\n    text-transform: lowercase;\n  }\n\n  .lg\\:capitalize {\n    text-transform: capitalize;\n  }\n\n  .lg\\:normal-case {\n    text-transform: none;\n  }\n\n  .lg\\:underline {\n    text-decoration: underline;\n  }\n\n  .lg\\:line-through {\n    text-decoration: line-through;\n  }\n\n  .lg\\:no-underline {\n    text-decoration: none;\n  }\n\n  .lg\\:antialiased {\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  .lg\\:subpixel-antialiased {\n    -webkit-font-smoothing: auto;\n    -moz-osx-font-smoothing: auto;\n  }\n\n  .lg\\:hover\\:italic:hover {\n    font-style: italic;\n  }\n\n  .lg\\:hover\\:roman:hover {\n    font-style: normal;\n  }\n\n  .lg\\:hover\\:uppercase:hover {\n    text-transform: uppercase;\n  }\n\n  .lg\\:hover\\:lowercase:hover {\n    text-transform: lowercase;\n  }\n\n  .lg\\:hover\\:capitalize:hover {\n    text-transform: capitalize;\n  }\n\n  .lg\\:hover\\:normal-case:hover {\n    text-transform: none;\n  }\n\n  .lg\\:hover\\:underline:hover {\n    text-decoration: underline;\n  }\n\n  .lg\\:hover\\:line-through:hover {\n    text-decoration: line-through;\n  }\n\n  .lg\\:hover\\:no-underline:hover {\n    text-decoration: none;\n  }\n\n  .lg\\:hover\\:antialiased:hover {\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  .lg\\:hover\\:subpixel-antialiased:hover {\n    -webkit-font-smoothing: auto;\n    -moz-osx-font-smoothing: auto;\n  }\n\n  .lg\\:tracking-tight {\n    letter-spacing: -0.05em;\n  }\n\n  .lg\\:tracking-normal {\n    letter-spacing: 0;\n  }\n\n  .lg\\:tracking-wide {\n    letter-spacing: .05em;\n  }\n\n  .lg\\:select-none {\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n  }\n\n  .lg\\:select-text {\n    -webkit-user-select: text;\n       -moz-user-select: text;\n        -ms-user-select: text;\n            user-select: text;\n  }\n\n  .lg\\:align-baseline {\n    vertical-align: baseline;\n  }\n\n  .lg\\:align-top {\n    vertical-align: top;\n  }\n\n  .lg\\:align-middle {\n    vertical-align: middle;\n  }\n\n  .lg\\:align-bottom {\n    vertical-align: bottom;\n  }\n\n  .lg\\:align-text-top {\n    vertical-align: text-top;\n  }\n\n  .lg\\:align-text-bottom {\n    vertical-align: text-bottom;\n  }\n\n  .lg\\:visible {\n    visibility: visible;\n  }\n\n  .lg\\:invisible {\n    visibility: hidden;\n  }\n\n  .lg\\:whitespace-normal {\n    white-space: normal;\n  }\n\n  .lg\\:whitespace-no-wrap {\n    white-space: nowrap;\n  }\n\n  .lg\\:whitespace-pre {\n    white-space: pre;\n  }\n\n  .lg\\:whitespace-pre-line {\n    white-space: pre-line;\n  }\n\n  .lg\\:whitespace-pre-wrap {\n    white-space: pre-wrap;\n  }\n\n  .lg\\:break-words {\n    word-wrap: break-word;\n  }\n\n  .lg\\:break-normal {\n    word-wrap: normal;\n  }\n\n  .lg\\:truncate {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .lg\\:w-1 {\n    width: .25rem;\n  }\n\n  .lg\\:w-2 {\n    width: .5rem;\n  }\n\n  .lg\\:w-3 {\n    width: .75rem;\n  }\n\n  .lg\\:w-4 {\n    width: 1rem;\n  }\n\n  .lg\\:w-6 {\n    width: 1.5rem;\n  }\n\n  .lg\\:w-8 {\n    width: 2rem;\n  }\n\n  .lg\\:w-10 {\n    width: 2.5rem;\n  }\n\n  .lg\\:w-12 {\n    width: 3rem;\n  }\n\n  .lg\\:w-16 {\n    width: 4rem;\n  }\n\n  .lg\\:w-24 {\n    width: 6rem;\n  }\n\n  .lg\\:w-32 {\n    width: 8rem;\n  }\n\n  .lg\\:w-48 {\n    width: 12rem;\n  }\n\n  .lg\\:w-64 {\n    width: 16rem;\n  }\n\n  .lg\\:w-auto {\n    width: auto;\n  }\n\n  .lg\\:w-px {\n    width: 1px;\n  }\n\n  .lg\\:w-1\\/2 {\n    width: 50%;\n  }\n\n  .lg\\:w-1\\/3 {\n    width: 33.33333%;\n  }\n\n  .lg\\:w-2\\/3 {\n    width: 66.66667%;\n  }\n\n  .lg\\:w-1\\/4 {\n    width: 25%;\n  }\n\n  .lg\\:w-3\\/4 {\n    width: 75%;\n  }\n\n  .lg\\:w-1\\/5 {\n    width: 20%;\n  }\n\n  .lg\\:w-2\\/5 {\n    width: 40%;\n  }\n\n  .lg\\:w-3\\/5 {\n    width: 60%;\n  }\n\n  .lg\\:w-4\\/5 {\n    width: 80%;\n  }\n\n  .lg\\:w-1\\/6 {\n    width: 16.66667%;\n  }\n\n  .lg\\:w-5\\/6 {\n    width: 83.33333%;\n  }\n\n  .lg\\:w-full {\n    width: 100%;\n  }\n\n  .lg\\:w-screen {\n    width: 100vw;\n  }\n\n  .lg\\:z-0 {\n    z-index: 0;\n  }\n\n  .lg\\:z-10 {\n    z-index: 10;\n  }\n\n  .lg\\:z-20 {\n    z-index: 20;\n  }\n\n  .lg\\:z-30 {\n    z-index: 30;\n  }\n\n  .lg\\:z-40 {\n    z-index: 40;\n  }\n\n  .lg\\:z-50 {\n    z-index: 50;\n  }\n\n  .lg\\:z-auto {\n    z-index: auto;\n  }\n}\n\n@media (min-width: 1200px) {\n  .xl\\:list-reset {\n    list-style: none;\n    padding: 0;\n  }\n\n  .xl\\:appearance-none {\n    -webkit-appearance: none;\n       -moz-appearance: none;\n            appearance: none;\n  }\n\n  .xl\\:bg-fixed {\n    background-attachment: fixed;\n  }\n\n  .xl\\:bg-local {\n    background-attachment: local;\n  }\n\n  .xl\\:bg-scroll {\n    background-attachment: scroll;\n  }\n\n  .xl\\:bg-transparent {\n    background-color: transparent;\n  }\n\n  .xl\\:bg-black {\n    background-color: #22292f;\n  }\n\n  .xl\\:bg-grey-darkest {\n    background-color: #3d4852;\n  }\n\n  .xl\\:bg-grey-darker {\n    background-color: #606f7b;\n  }\n\n  .xl\\:bg-grey-dark {\n    background-color: #8795a1;\n  }\n\n  .xl\\:bg-grey {\n    background-color: #b8c2cc;\n  }\n\n  .xl\\:bg-grey-light {\n    background-color: #dae1e7;\n  }\n\n  .xl\\:bg-grey-lighter {\n    background-color: #f1f5f8;\n  }\n\n  .xl\\:bg-grey-lightest {\n    background-color: #f8fafc;\n  }\n\n  .xl\\:bg-white {\n    background-color: #fff;\n  }\n\n  .xl\\:bg-red-darkest {\n    background-color: #3b0d0c;\n  }\n\n  .xl\\:bg-red-darker {\n    background-color: #621b18;\n  }\n\n  .xl\\:bg-red-dark {\n    background-color: #cc1f1a;\n  }\n\n  .xl\\:bg-red {\n    background-color: #e3342f;\n  }\n\n  .xl\\:bg-red-light {\n    background-color: #ef5753;\n  }\n\n  .xl\\:bg-red-lighter {\n    background-color: #f9acaa;\n  }\n\n  .xl\\:bg-red-lightest {\n    background-color: #fcebea;\n  }\n\n  .xl\\:bg-orange-darkest {\n    background-color: #462a16;\n  }\n\n  .xl\\:bg-orange-darker {\n    background-color: #613b1f;\n  }\n\n  .xl\\:bg-orange-dark {\n    background-color: #de751f;\n  }\n\n  .xl\\:bg-orange {\n    background-color: #f6993f;\n  }\n\n  .xl\\:bg-orange-light {\n    background-color: #faad63;\n  }\n\n  .xl\\:bg-orange-lighter {\n    background-color: #fcd9b6;\n  }\n\n  .xl\\:bg-orange-lightest {\n    background-color: #fff5eb;\n  }\n\n  .xl\\:bg-yellow-darkest {\n    background-color: #453411;\n  }\n\n  .xl\\:bg-yellow-darker {\n    background-color: #684f1d;\n  }\n\n  .xl\\:bg-yellow-dark {\n    background-color: #f2d024;\n  }\n\n  .xl\\:bg-yellow {\n    background-color: #ffed4a;\n  }\n\n  .xl\\:bg-yellow-light {\n    background-color: #fff382;\n  }\n\n  .xl\\:bg-yellow-lighter {\n    background-color: #fff9c2;\n  }\n\n  .xl\\:bg-yellow-lightest {\n    background-color: #fcfbeb;\n  }\n\n  .xl\\:bg-green-darkest {\n    background-color: #0f2f21;\n  }\n\n  .xl\\:bg-green-darker {\n    background-color: #1a4731;\n  }\n\n  .xl\\:bg-green-dark {\n    background-color: #1f9d55;\n  }\n\n  .xl\\:bg-green {\n    background-color: #38c172;\n  }\n\n  .xl\\:bg-green-light {\n    background-color: #51d88a;\n  }\n\n  .xl\\:bg-green-lighter {\n    background-color: #a2f5bf;\n  }\n\n  .xl\\:bg-green-lightest {\n    background-color: #e3fcec;\n  }\n\n  .xl\\:bg-teal-darkest {\n    background-color: #0d3331;\n  }\n\n  .xl\\:bg-teal-darker {\n    background-color: #20504f;\n  }\n\n  .xl\\:bg-teal-dark {\n    background-color: #38a89d;\n  }\n\n  .xl\\:bg-teal {\n    background-color: #4dc0b5;\n  }\n\n  .xl\\:bg-teal-light {\n    background-color: #64d5ca;\n  }\n\n  .xl\\:bg-teal-lighter {\n    background-color: #a0f0ed;\n  }\n\n  .xl\\:bg-teal-lightest {\n    background-color: #e8fffe;\n  }\n\n  .xl\\:bg-blue-darkest {\n    background-color: #12283a;\n  }\n\n  .xl\\:bg-blue-darker {\n    background-color: #1c3d5a;\n  }\n\n  .xl\\:bg-blue-dark {\n    background-color: #2779bd;\n  }\n\n  .xl\\:bg-blue {\n    background-color: #3490dc;\n  }\n\n  .xl\\:bg-blue-light {\n    background-color: #6cb2eb;\n  }\n\n  .xl\\:bg-blue-lighter {\n    background-color: #bcdefa;\n  }\n\n  .xl\\:bg-blue-lightest {\n    background-color: #eff8ff;\n  }\n\n  .xl\\:bg-indigo-darkest {\n    background-color: #191e38;\n  }\n\n  .xl\\:bg-indigo-darker {\n    background-color: #2f365f;\n  }\n\n  .xl\\:bg-indigo-dark {\n    background-color: #5661b3;\n  }\n\n  .xl\\:bg-indigo {\n    background-color: #6574cd;\n  }\n\n  .xl\\:bg-indigo-light {\n    background-color: #7886d7;\n  }\n\n  .xl\\:bg-indigo-lighter {\n    background-color: #b2b7ff;\n  }\n\n  .xl\\:bg-indigo-lightest {\n    background-color: #e6e8ff;\n  }\n\n  .xl\\:bg-purple-darkest {\n    background-color: #21183c;\n  }\n\n  .xl\\:bg-purple-darker {\n    background-color: #382b5f;\n  }\n\n  .xl\\:bg-purple-dark {\n    background-color: #794acf;\n  }\n\n  .xl\\:bg-purple {\n    background-color: #9561e2;\n  }\n\n  .xl\\:bg-purple-light {\n    background-color: #a779e9;\n  }\n\n  .xl\\:bg-purple-lighter {\n    background-color: #d6bbfc;\n  }\n\n  .xl\\:bg-purple-lightest {\n    background-color: #f3ebff;\n  }\n\n  .xl\\:bg-pink-darkest {\n    background-color: #451225;\n  }\n\n  .xl\\:bg-pink-darker {\n    background-color: #6f213f;\n  }\n\n  .xl\\:bg-pink-dark {\n    background-color: #eb5286;\n  }\n\n  .xl\\:bg-pink {\n    background-color: #f66d9b;\n  }\n\n  .xl\\:bg-pink-light {\n    background-color: #fa7ea8;\n  }\n\n  .xl\\:bg-pink-lighter {\n    background-color: #ffbbca;\n  }\n\n  .xl\\:bg-pink-lightest {\n    background-color: #ffebef;\n  }\n\n  .xl\\:hover\\:bg-transparent:hover {\n    background-color: transparent;\n  }\n\n  .xl\\:hover\\:bg-black:hover {\n    background-color: #22292f;\n  }\n\n  .xl\\:hover\\:bg-grey-darkest:hover {\n    background-color: #3d4852;\n  }\n\n  .xl\\:hover\\:bg-grey-darker:hover {\n    background-color: #606f7b;\n  }\n\n  .xl\\:hover\\:bg-grey-dark:hover {\n    background-color: #8795a1;\n  }\n\n  .xl\\:hover\\:bg-grey:hover {\n    background-color: #b8c2cc;\n  }\n\n  .xl\\:hover\\:bg-grey-light:hover {\n    background-color: #dae1e7;\n  }\n\n  .xl\\:hover\\:bg-grey-lighter:hover {\n    background-color: #f1f5f8;\n  }\n\n  .xl\\:hover\\:bg-grey-lightest:hover {\n    background-color: #f8fafc;\n  }\n\n  .xl\\:hover\\:bg-white:hover {\n    background-color: #fff;\n  }\n\n  .xl\\:hover\\:bg-red-darkest:hover {\n    background-color: #3b0d0c;\n  }\n\n  .xl\\:hover\\:bg-red-darker:hover {\n    background-color: #621b18;\n  }\n\n  .xl\\:hover\\:bg-red-dark:hover {\n    background-color: #cc1f1a;\n  }\n\n  .xl\\:hover\\:bg-red:hover {\n    background-color: #e3342f;\n  }\n\n  .xl\\:hover\\:bg-red-light:hover {\n    background-color: #ef5753;\n  }\n\n  .xl\\:hover\\:bg-red-lighter:hover {\n    background-color: #f9acaa;\n  }\n\n  .xl\\:hover\\:bg-red-lightest:hover {\n    background-color: #fcebea;\n  }\n\n  .xl\\:hover\\:bg-orange-darkest:hover {\n    background-color: #462a16;\n  }\n\n  .xl\\:hover\\:bg-orange-darker:hover {\n    background-color: #613b1f;\n  }\n\n  .xl\\:hover\\:bg-orange-dark:hover {\n    background-color: #de751f;\n  }\n\n  .xl\\:hover\\:bg-orange:hover {\n    background-color: #f6993f;\n  }\n\n  .xl\\:hover\\:bg-orange-light:hover {\n    background-color: #faad63;\n  }\n\n  .xl\\:hover\\:bg-orange-lighter:hover {\n    background-color: #fcd9b6;\n  }\n\n  .xl\\:hover\\:bg-orange-lightest:hover {\n    background-color: #fff5eb;\n  }\n\n  .xl\\:hover\\:bg-yellow-darkest:hover {\n    background-color: #453411;\n  }\n\n  .xl\\:hover\\:bg-yellow-darker:hover {\n    background-color: #684f1d;\n  }\n\n  .xl\\:hover\\:bg-yellow-dark:hover {\n    background-color: #f2d024;\n  }\n\n  .xl\\:hover\\:bg-yellow:hover {\n    background-color: #ffed4a;\n  }\n\n  .xl\\:hover\\:bg-yellow-light:hover {\n    background-color: #fff382;\n  }\n\n  .xl\\:hover\\:bg-yellow-lighter:hover {\n    background-color: #fff9c2;\n  }\n\n  .xl\\:hover\\:bg-yellow-lightest:hover {\n    background-color: #fcfbeb;\n  }\n\n  .xl\\:hover\\:bg-green-darkest:hover {\n    background-color: #0f2f21;\n  }\n\n  .xl\\:hover\\:bg-green-darker:hover {\n    background-color: #1a4731;\n  }\n\n  .xl\\:hover\\:bg-green-dark:hover {\n    background-color: #1f9d55;\n  }\n\n  .xl\\:hover\\:bg-green:hover {\n    background-color: #38c172;\n  }\n\n  .xl\\:hover\\:bg-green-light:hover {\n    background-color: #51d88a;\n  }\n\n  .xl\\:hover\\:bg-green-lighter:hover {\n    background-color: #a2f5bf;\n  }\n\n  .xl\\:hover\\:bg-green-lightest:hover {\n    background-color: #e3fcec;\n  }\n\n  .xl\\:hover\\:bg-teal-darkest:hover {\n    background-color: #0d3331;\n  }\n\n  .xl\\:hover\\:bg-teal-darker:hover {\n    background-color: #20504f;\n  }\n\n  .xl\\:hover\\:bg-teal-dark:hover {\n    background-color: #38a89d;\n  }\n\n  .xl\\:hover\\:bg-teal:hover {\n    background-color: #4dc0b5;\n  }\n\n  .xl\\:hover\\:bg-teal-light:hover {\n    background-color: #64d5ca;\n  }\n\n  .xl\\:hover\\:bg-teal-lighter:hover {\n    background-color: #a0f0ed;\n  }\n\n  .xl\\:hover\\:bg-teal-lightest:hover {\n    background-color: #e8fffe;\n  }\n\n  .xl\\:hover\\:bg-blue-darkest:hover {\n    background-color: #12283a;\n  }\n\n  .xl\\:hover\\:bg-blue-darker:hover {\n    background-color: #1c3d5a;\n  }\n\n  .xl\\:hover\\:bg-blue-dark:hover {\n    background-color: #2779bd;\n  }\n\n  .xl\\:hover\\:bg-blue:hover {\n    background-color: #3490dc;\n  }\n\n  .xl\\:hover\\:bg-blue-light:hover {\n    background-color: #6cb2eb;\n  }\n\n  .xl\\:hover\\:bg-blue-lighter:hover {\n    background-color: #bcdefa;\n  }\n\n  .xl\\:hover\\:bg-blue-lightest:hover {\n    background-color: #eff8ff;\n  }\n\n  .xl\\:hover\\:bg-indigo-darkest:hover {\n    background-color: #191e38;\n  }\n\n  .xl\\:hover\\:bg-indigo-darker:hover {\n    background-color: #2f365f;\n  }\n\n  .xl\\:hover\\:bg-indigo-dark:hover {\n    background-color: #5661b3;\n  }\n\n  .xl\\:hover\\:bg-indigo:hover {\n    background-color: #6574cd;\n  }\n\n  .xl\\:hover\\:bg-indigo-light:hover {\n    background-color: #7886d7;\n  }\n\n  .xl\\:hover\\:bg-indigo-lighter:hover {\n    background-color: #b2b7ff;\n  }\n\n  .xl\\:hover\\:bg-indigo-lightest:hover {\n    background-color: #e6e8ff;\n  }\n\n  .xl\\:hover\\:bg-purple-darkest:hover {\n    background-color: #21183c;\n  }\n\n  .xl\\:hover\\:bg-purple-darker:hover {\n    background-color: #382b5f;\n  }\n\n  .xl\\:hover\\:bg-purple-dark:hover {\n    background-color: #794acf;\n  }\n\n  .xl\\:hover\\:bg-purple:hover {\n    background-color: #9561e2;\n  }\n\n  .xl\\:hover\\:bg-purple-light:hover {\n    background-color: #a779e9;\n  }\n\n  .xl\\:hover\\:bg-purple-lighter:hover {\n    background-color: #d6bbfc;\n  }\n\n  .xl\\:hover\\:bg-purple-lightest:hover {\n    background-color: #f3ebff;\n  }\n\n  .xl\\:hover\\:bg-pink-darkest:hover {\n    background-color: #451225;\n  }\n\n  .xl\\:hover\\:bg-pink-darker:hover {\n    background-color: #6f213f;\n  }\n\n  .xl\\:hover\\:bg-pink-dark:hover {\n    background-color: #eb5286;\n  }\n\n  .xl\\:hover\\:bg-pink:hover {\n    background-color: #f66d9b;\n  }\n\n  .xl\\:hover\\:bg-pink-light:hover {\n    background-color: #fa7ea8;\n  }\n\n  .xl\\:hover\\:bg-pink-lighter:hover {\n    background-color: #ffbbca;\n  }\n\n  .xl\\:hover\\:bg-pink-lightest:hover {\n    background-color: #ffebef;\n  }\n\n  .xl\\:bg-bottom {\n    background-position: bottom;\n  }\n\n  .xl\\:bg-center {\n    background-position: center;\n  }\n\n  .xl\\:bg-left {\n    background-position: left;\n  }\n\n  .xl\\:bg-left-bottom {\n    background-position: left bottom;\n  }\n\n  .xl\\:bg-left-top {\n    background-position: left top;\n  }\n\n  .xl\\:bg-right {\n    background-position: right;\n  }\n\n  .xl\\:bg-right-bottom {\n    background-position: right bottom;\n  }\n\n  .xl\\:bg-right-top {\n    background-position: right top;\n  }\n\n  .xl\\:bg-top {\n    background-position: top;\n  }\n\n  .xl\\:bg-repeat {\n    background-repeat: repeat;\n  }\n\n  .xl\\:bg-no-repeat {\n    background-repeat: no-repeat;\n  }\n\n  .xl\\:bg-repeat-x {\n    background-repeat: repeat-x;\n  }\n\n  .xl\\:bg-repeat-y {\n    background-repeat: repeat-y;\n  }\n\n  .xl\\:bg-auto {\n    background-size: auto;\n  }\n\n  .xl\\:bg-cover {\n    background-size: cover;\n  }\n\n  .xl\\:bg-contain {\n    background-size: contain;\n  }\n\n  .xl\\:border-transparent {\n    border-color: transparent;\n  }\n\n  .xl\\:border-black {\n    border-color: #22292f;\n  }\n\n  .xl\\:border-grey-darkest {\n    border-color: #3d4852;\n  }\n\n  .xl\\:border-grey-darker {\n    border-color: #606f7b;\n  }\n\n  .xl\\:border-grey-dark {\n    border-color: #8795a1;\n  }\n\n  .xl\\:border-grey {\n    border-color: #b8c2cc;\n  }\n\n  .xl\\:border-grey-light {\n    border-color: #dae1e7;\n  }\n\n  .xl\\:border-grey-lighter {\n    border-color: #f1f5f8;\n  }\n\n  .xl\\:border-grey-lightest {\n    border-color: #f8fafc;\n  }\n\n  .xl\\:border-white {\n    border-color: #fff;\n  }\n\n  .xl\\:border-red-darkest {\n    border-color: #3b0d0c;\n  }\n\n  .xl\\:border-red-darker {\n    border-color: #621b18;\n  }\n\n  .xl\\:border-red-dark {\n    border-color: #cc1f1a;\n  }\n\n  .xl\\:border-red {\n    border-color: #e3342f;\n  }\n\n  .xl\\:border-red-light {\n    border-color: #ef5753;\n  }\n\n  .xl\\:border-red-lighter {\n    border-color: #f9acaa;\n  }\n\n  .xl\\:border-red-lightest {\n    border-color: #fcebea;\n  }\n\n  .xl\\:border-orange-darkest {\n    border-color: #462a16;\n  }\n\n  .xl\\:border-orange-darker {\n    border-color: #613b1f;\n  }\n\n  .xl\\:border-orange-dark {\n    border-color: #de751f;\n  }\n\n  .xl\\:border-orange {\n    border-color: #f6993f;\n  }\n\n  .xl\\:border-orange-light {\n    border-color: #faad63;\n  }\n\n  .xl\\:border-orange-lighter {\n    border-color: #fcd9b6;\n  }\n\n  .xl\\:border-orange-lightest {\n    border-color: #fff5eb;\n  }\n\n  .xl\\:border-yellow-darkest {\n    border-color: #453411;\n  }\n\n  .xl\\:border-yellow-darker {\n    border-color: #684f1d;\n  }\n\n  .xl\\:border-yellow-dark {\n    border-color: #f2d024;\n  }\n\n  .xl\\:border-yellow {\n    border-color: #ffed4a;\n  }\n\n  .xl\\:border-yellow-light {\n    border-color: #fff382;\n  }\n\n  .xl\\:border-yellow-lighter {\n    border-color: #fff9c2;\n  }\n\n  .xl\\:border-yellow-lightest {\n    border-color: #fcfbeb;\n  }\n\n  .xl\\:border-green-darkest {\n    border-color: #0f2f21;\n  }\n\n  .xl\\:border-green-darker {\n    border-color: #1a4731;\n  }\n\n  .xl\\:border-green-dark {\n    border-color: #1f9d55;\n  }\n\n  .xl\\:border-green {\n    border-color: #38c172;\n  }\n\n  .xl\\:border-green-light {\n    border-color: #51d88a;\n  }\n\n  .xl\\:border-green-lighter {\n    border-color: #a2f5bf;\n  }\n\n  .xl\\:border-green-lightest {\n    border-color: #e3fcec;\n  }\n\n  .xl\\:border-teal-darkest {\n    border-color: #0d3331;\n  }\n\n  .xl\\:border-teal-darker {\n    border-color: #20504f;\n  }\n\n  .xl\\:border-teal-dark {\n    border-color: #38a89d;\n  }\n\n  .xl\\:border-teal {\n    border-color: #4dc0b5;\n  }\n\n  .xl\\:border-teal-light {\n    border-color: #64d5ca;\n  }\n\n  .xl\\:border-teal-lighter {\n    border-color: #a0f0ed;\n  }\n\n  .xl\\:border-teal-lightest {\n    border-color: #e8fffe;\n  }\n\n  .xl\\:border-blue-darkest {\n    border-color: #12283a;\n  }\n\n  .xl\\:border-blue-darker {\n    border-color: #1c3d5a;\n  }\n\n  .xl\\:border-blue-dark {\n    border-color: #2779bd;\n  }\n\n  .xl\\:border-blue {\n    border-color: #3490dc;\n  }\n\n  .xl\\:border-blue-light {\n    border-color: #6cb2eb;\n  }\n\n  .xl\\:border-blue-lighter {\n    border-color: #bcdefa;\n  }\n\n  .xl\\:border-blue-lightest {\n    border-color: #eff8ff;\n  }\n\n  .xl\\:border-indigo-darkest {\n    border-color: #191e38;\n  }\n\n  .xl\\:border-indigo-darker {\n    border-color: #2f365f;\n  }\n\n  .xl\\:border-indigo-dark {\n    border-color: #5661b3;\n  }\n\n  .xl\\:border-indigo {\n    border-color: #6574cd;\n  }\n\n  .xl\\:border-indigo-light {\n    border-color: #7886d7;\n  }\n\n  .xl\\:border-indigo-lighter {\n    border-color: #b2b7ff;\n  }\n\n  .xl\\:border-indigo-lightest {\n    border-color: #e6e8ff;\n  }\n\n  .xl\\:border-purple-darkest {\n    border-color: #21183c;\n  }\n\n  .xl\\:border-purple-darker {\n    border-color: #382b5f;\n  }\n\n  .xl\\:border-purple-dark {\n    border-color: #794acf;\n  }\n\n  .xl\\:border-purple {\n    border-color: #9561e2;\n  }\n\n  .xl\\:border-purple-light {\n    border-color: #a779e9;\n  }\n\n  .xl\\:border-purple-lighter {\n    border-color: #d6bbfc;\n  }\n\n  .xl\\:border-purple-lightest {\n    border-color: #f3ebff;\n  }\n\n  .xl\\:border-pink-darkest {\n    border-color: #451225;\n  }\n\n  .xl\\:border-pink-darker {\n    border-color: #6f213f;\n  }\n\n  .xl\\:border-pink-dark {\n    border-color: #eb5286;\n  }\n\n  .xl\\:border-pink {\n    border-color: #f66d9b;\n  }\n\n  .xl\\:border-pink-light {\n    border-color: #fa7ea8;\n  }\n\n  .xl\\:border-pink-lighter {\n    border-color: #ffbbca;\n  }\n\n  .xl\\:border-pink-lightest {\n    border-color: #ffebef;\n  }\n\n  .xl\\:hover\\:border-transparent:hover {\n    border-color: transparent;\n  }\n\n  .xl\\:hover\\:border-black:hover {\n    border-color: #22292f;\n  }\n\n  .xl\\:hover\\:border-grey-darkest:hover {\n    border-color: #3d4852;\n  }\n\n  .xl\\:hover\\:border-grey-darker:hover {\n    border-color: #606f7b;\n  }\n\n  .xl\\:hover\\:border-grey-dark:hover {\n    border-color: #8795a1;\n  }\n\n  .xl\\:hover\\:border-grey:hover {\n    border-color: #b8c2cc;\n  }\n\n  .xl\\:hover\\:border-grey-light:hover {\n    border-color: #dae1e7;\n  }\n\n  .xl\\:hover\\:border-grey-lighter:hover {\n    border-color: #f1f5f8;\n  }\n\n  .xl\\:hover\\:border-grey-lightest:hover {\n    border-color: #f8fafc;\n  }\n\n  .xl\\:hover\\:border-white:hover {\n    border-color: #fff;\n  }\n\n  .xl\\:hover\\:border-red-darkest:hover {\n    border-color: #3b0d0c;\n  }\n\n  .xl\\:hover\\:border-red-darker:hover {\n    border-color: #621b18;\n  }\n\n  .xl\\:hover\\:border-red-dark:hover {\n    border-color: #cc1f1a;\n  }\n\n  .xl\\:hover\\:border-red:hover {\n    border-color: #e3342f;\n  }\n\n  .xl\\:hover\\:border-red-light:hover {\n    border-color: #ef5753;\n  }\n\n  .xl\\:hover\\:border-red-lighter:hover {\n    border-color: #f9acaa;\n  }\n\n  .xl\\:hover\\:border-red-lightest:hover {\n    border-color: #fcebea;\n  }\n\n  .xl\\:hover\\:border-orange-darkest:hover {\n    border-color: #462a16;\n  }\n\n  .xl\\:hover\\:border-orange-darker:hover {\n    border-color: #613b1f;\n  }\n\n  .xl\\:hover\\:border-orange-dark:hover {\n    border-color: #de751f;\n  }\n\n  .xl\\:hover\\:border-orange:hover {\n    border-color: #f6993f;\n  }\n\n  .xl\\:hover\\:border-orange-light:hover {\n    border-color: #faad63;\n  }\n\n  .xl\\:hover\\:border-orange-lighter:hover {\n    border-color: #fcd9b6;\n  }\n\n  .xl\\:hover\\:border-orange-lightest:hover {\n    border-color: #fff5eb;\n  }\n\n  .xl\\:hover\\:border-yellow-darkest:hover {\n    border-color: #453411;\n  }\n\n  .xl\\:hover\\:border-yellow-darker:hover {\n    border-color: #684f1d;\n  }\n\n  .xl\\:hover\\:border-yellow-dark:hover {\n    border-color: #f2d024;\n  }\n\n  .xl\\:hover\\:border-yellow:hover {\n    border-color: #ffed4a;\n  }\n\n  .xl\\:hover\\:border-yellow-light:hover {\n    border-color: #fff382;\n  }\n\n  .xl\\:hover\\:border-yellow-lighter:hover {\n    border-color: #fff9c2;\n  }\n\n  .xl\\:hover\\:border-yellow-lightest:hover {\n    border-color: #fcfbeb;\n  }\n\n  .xl\\:hover\\:border-green-darkest:hover {\n    border-color: #0f2f21;\n  }\n\n  .xl\\:hover\\:border-green-darker:hover {\n    border-color: #1a4731;\n  }\n\n  .xl\\:hover\\:border-green-dark:hover {\n    border-color: #1f9d55;\n  }\n\n  .xl\\:hover\\:border-green:hover {\n    border-color: #38c172;\n  }\n\n  .xl\\:hover\\:border-green-light:hover {\n    border-color: #51d88a;\n  }\n\n  .xl\\:hover\\:border-green-lighter:hover {\n    border-color: #a2f5bf;\n  }\n\n  .xl\\:hover\\:border-green-lightest:hover {\n    border-color: #e3fcec;\n  }\n\n  .xl\\:hover\\:border-teal-darkest:hover {\n    border-color: #0d3331;\n  }\n\n  .xl\\:hover\\:border-teal-darker:hover {\n    border-color: #20504f;\n  }\n\n  .xl\\:hover\\:border-teal-dark:hover {\n    border-color: #38a89d;\n  }\n\n  .xl\\:hover\\:border-teal:hover {\n    border-color: #4dc0b5;\n  }\n\n  .xl\\:hover\\:border-teal-light:hover {\n    border-color: #64d5ca;\n  }\n\n  .xl\\:hover\\:border-teal-lighter:hover {\n    border-color: #a0f0ed;\n  }\n\n  .xl\\:hover\\:border-teal-lightest:hover {\n    border-color: #e8fffe;\n  }\n\n  .xl\\:hover\\:border-blue-darkest:hover {\n    border-color: #12283a;\n  }\n\n  .xl\\:hover\\:border-blue-darker:hover {\n    border-color: #1c3d5a;\n  }\n\n  .xl\\:hover\\:border-blue-dark:hover {\n    border-color: #2779bd;\n  }\n\n  .xl\\:hover\\:border-blue:hover {\n    border-color: #3490dc;\n  }\n\n  .xl\\:hover\\:border-blue-light:hover {\n    border-color: #6cb2eb;\n  }\n\n  .xl\\:hover\\:border-blue-lighter:hover {\n    border-color: #bcdefa;\n  }\n\n  .xl\\:hover\\:border-blue-lightest:hover {\n    border-color: #eff8ff;\n  }\n\n  .xl\\:hover\\:border-indigo-darkest:hover {\n    border-color: #191e38;\n  }\n\n  .xl\\:hover\\:border-indigo-darker:hover {\n    border-color: #2f365f;\n  }\n\n  .xl\\:hover\\:border-indigo-dark:hover {\n    border-color: #5661b3;\n  }\n\n  .xl\\:hover\\:border-indigo:hover {\n    border-color: #6574cd;\n  }\n\n  .xl\\:hover\\:border-indigo-light:hover {\n    border-color: #7886d7;\n  }\n\n  .xl\\:hover\\:border-indigo-lighter:hover {\n    border-color: #b2b7ff;\n  }\n\n  .xl\\:hover\\:border-indigo-lightest:hover {\n    border-color: #e6e8ff;\n  }\n\n  .xl\\:hover\\:border-purple-darkest:hover {\n    border-color: #21183c;\n  }\n\n  .xl\\:hover\\:border-purple-darker:hover {\n    border-color: #382b5f;\n  }\n\n  .xl\\:hover\\:border-purple-dark:hover {\n    border-color: #794acf;\n  }\n\n  .xl\\:hover\\:border-purple:hover {\n    border-color: #9561e2;\n  }\n\n  .xl\\:hover\\:border-purple-light:hover {\n    border-color: #a779e9;\n  }\n\n  .xl\\:hover\\:border-purple-lighter:hover {\n    border-color: #d6bbfc;\n  }\n\n  .xl\\:hover\\:border-purple-lightest:hover {\n    border-color: #f3ebff;\n  }\n\n  .xl\\:hover\\:border-pink-darkest:hover {\n    border-color: #451225;\n  }\n\n  .xl\\:hover\\:border-pink-darker:hover {\n    border-color: #6f213f;\n  }\n\n  .xl\\:hover\\:border-pink-dark:hover {\n    border-color: #eb5286;\n  }\n\n  .xl\\:hover\\:border-pink:hover {\n    border-color: #f66d9b;\n  }\n\n  .xl\\:hover\\:border-pink-light:hover {\n    border-color: #fa7ea8;\n  }\n\n  .xl\\:hover\\:border-pink-lighter:hover {\n    border-color: #ffbbca;\n  }\n\n  .xl\\:hover\\:border-pink-lightest:hover {\n    border-color: #ffebef;\n  }\n\n  .xl\\:rounded-none {\n    border-radius: 0;\n  }\n\n  .xl\\:rounded-sm {\n    border-radius: .125rem;\n  }\n\n  .xl\\:rounded {\n    border-radius: .25rem;\n  }\n\n  .xl\\:rounded-lg {\n    border-radius: .5rem;\n  }\n\n  .xl\\:rounded-full {\n    border-radius: 9999px;\n  }\n\n  .xl\\:rounded-t-none {\n    border-top-left-radius: 0;\n    border-top-right-radius: 0;\n  }\n\n  .xl\\:rounded-r-none {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n  }\n\n  .xl\\:rounded-b-none {\n    border-bottom-right-radius: 0;\n    border-bottom-left-radius: 0;\n  }\n\n  .xl\\:rounded-l-none {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n  }\n\n  .xl\\:rounded-t-sm {\n    border-top-left-radius: .125rem;\n    border-top-right-radius: .125rem;\n  }\n\n  .xl\\:rounded-r-sm {\n    border-top-right-radius: .125rem;\n    border-bottom-right-radius: .125rem;\n  }\n\n  .xl\\:rounded-b-sm {\n    border-bottom-right-radius: .125rem;\n    border-bottom-left-radius: .125rem;\n  }\n\n  .xl\\:rounded-l-sm {\n    border-top-left-radius: .125rem;\n    border-bottom-left-radius: .125rem;\n  }\n\n  .xl\\:rounded-t {\n    border-top-left-radius: .25rem;\n    border-top-right-radius: .25rem;\n  }\n\n  .xl\\:rounded-r {\n    border-top-right-radius: .25rem;\n    border-bottom-right-radius: .25rem;\n  }\n\n  .xl\\:rounded-b {\n    border-bottom-right-radius: .25rem;\n    border-bottom-left-radius: .25rem;\n  }\n\n  .xl\\:rounded-l {\n    border-top-left-radius: .25rem;\n    border-bottom-left-radius: .25rem;\n  }\n\n  .xl\\:rounded-t-lg {\n    border-top-left-radius: .5rem;\n    border-top-right-radius: .5rem;\n  }\n\n  .xl\\:rounded-r-lg {\n    border-top-right-radius: .5rem;\n    border-bottom-right-radius: .5rem;\n  }\n\n  .xl\\:rounded-b-lg {\n    border-bottom-right-radius: .5rem;\n    border-bottom-left-radius: .5rem;\n  }\n\n  .xl\\:rounded-l-lg {\n    border-top-left-radius: .5rem;\n    border-bottom-left-radius: .5rem;\n  }\n\n  .xl\\:rounded-t-full {\n    border-top-left-radius: 9999px;\n    border-top-right-radius: 9999px;\n  }\n\n  .xl\\:rounded-r-full {\n    border-top-right-radius: 9999px;\n    border-bottom-right-radius: 9999px;\n  }\n\n  .xl\\:rounded-b-full {\n    border-bottom-right-radius: 9999px;\n    border-bottom-left-radius: 9999px;\n  }\n\n  .xl\\:rounded-l-full {\n    border-top-left-radius: 9999px;\n    border-bottom-left-radius: 9999px;\n  }\n\n  .xl\\:rounded-tl-none {\n    border-top-left-radius: 0;\n  }\n\n  .xl\\:rounded-tr-none {\n    border-top-right-radius: 0;\n  }\n\n  .xl\\:rounded-br-none {\n    border-bottom-right-radius: 0;\n  }\n\n  .xl\\:rounded-bl-none {\n    border-bottom-left-radius: 0;\n  }\n\n  .xl\\:rounded-tl-sm {\n    border-top-left-radius: .125rem;\n  }\n\n  .xl\\:rounded-tr-sm {\n    border-top-right-radius: .125rem;\n  }\n\n  .xl\\:rounded-br-sm {\n    border-bottom-right-radius: .125rem;\n  }\n\n  .xl\\:rounded-bl-sm {\n    border-bottom-left-radius: .125rem;\n  }\n\n  .xl\\:rounded-tl {\n    border-top-left-radius: .25rem;\n  }\n\n  .xl\\:rounded-tr {\n    border-top-right-radius: .25rem;\n  }\n\n  .xl\\:rounded-br {\n    border-bottom-right-radius: .25rem;\n  }\n\n  .xl\\:rounded-bl {\n    border-bottom-left-radius: .25rem;\n  }\n\n  .xl\\:rounded-tl-lg {\n    border-top-left-radius: .5rem;\n  }\n\n  .xl\\:rounded-tr-lg {\n    border-top-right-radius: .5rem;\n  }\n\n  .xl\\:rounded-br-lg {\n    border-bottom-right-radius: .5rem;\n  }\n\n  .xl\\:rounded-bl-lg {\n    border-bottom-left-radius: .5rem;\n  }\n\n  .xl\\:rounded-tl-full {\n    border-top-left-radius: 9999px;\n  }\n\n  .xl\\:rounded-tr-full {\n    border-top-right-radius: 9999px;\n  }\n\n  .xl\\:rounded-br-full {\n    border-bottom-right-radius: 9999px;\n  }\n\n  .xl\\:rounded-bl-full {\n    border-bottom-left-radius: 9999px;\n  }\n\n  .xl\\:border-solid {\n    border-style: solid;\n  }\n\n  .xl\\:border-dashed {\n    border-style: dashed;\n  }\n\n  .xl\\:border-dotted {\n    border-style: dotted;\n  }\n\n  .xl\\:border-none {\n    border-style: none;\n  }\n\n  .xl\\:border-0 {\n    border-width: 0;\n  }\n\n  .xl\\:border-2 {\n    border-width: 2px;\n  }\n\n  .xl\\:border-4 {\n    border-width: 4px;\n  }\n\n  .xl\\:border-8 {\n    border-width: 8px;\n  }\n\n  .xl\\:border {\n    border-width: 1px;\n  }\n\n  .xl\\:border-t-0 {\n    border-top-width: 0;\n  }\n\n  .xl\\:border-r-0 {\n    border-right-width: 0;\n  }\n\n  .xl\\:border-b-0 {\n    border-bottom-width: 0;\n  }\n\n  .xl\\:border-l-0 {\n    border-left-width: 0;\n  }\n\n  .xl\\:border-t-2 {\n    border-top-width: 2px;\n  }\n\n  .xl\\:border-r-2 {\n    border-right-width: 2px;\n  }\n\n  .xl\\:border-b-2 {\n    border-bottom-width: 2px;\n  }\n\n  .xl\\:border-l-2 {\n    border-left-width: 2px;\n  }\n\n  .xl\\:border-t-4 {\n    border-top-width: 4px;\n  }\n\n  .xl\\:border-r-4 {\n    border-right-width: 4px;\n  }\n\n  .xl\\:border-b-4 {\n    border-bottom-width: 4px;\n  }\n\n  .xl\\:border-l-4 {\n    border-left-width: 4px;\n  }\n\n  .xl\\:border-t-8 {\n    border-top-width: 8px;\n  }\n\n  .xl\\:border-r-8 {\n    border-right-width: 8px;\n  }\n\n  .xl\\:border-b-8 {\n    border-bottom-width: 8px;\n  }\n\n  .xl\\:border-l-8 {\n    border-left-width: 8px;\n  }\n\n  .xl\\:border-t {\n    border-top-width: 1px;\n  }\n\n  .xl\\:border-r {\n    border-right-width: 1px;\n  }\n\n  .xl\\:border-b {\n    border-bottom-width: 1px;\n  }\n\n  .xl\\:border-l {\n    border-left-width: 1px;\n  }\n\n  .xl\\:cursor-auto {\n    cursor: auto;\n  }\n\n  .xl\\:cursor-default {\n    cursor: default;\n  }\n\n  .xl\\:cursor-pointer {\n    cursor: pointer;\n  }\n\n  .xl\\:cursor-wait {\n    cursor: wait;\n  }\n\n  .xl\\:cursor-move {\n    cursor: move;\n  }\n\n  .xl\\:cursor-not-allowed {\n    cursor: not-allowed;\n  }\n\n  .xl\\:block {\n    display: block;\n  }\n\n  .xl\\:inline-block {\n    display: inline-block;\n  }\n\n  .xl\\:inline {\n    display: inline;\n  }\n\n  .xl\\:table {\n    display: table;\n  }\n\n  .xl\\:table-row {\n    display: table-row;\n  }\n\n  .xl\\:table-cell {\n    display: table-cell;\n  }\n\n  .xl\\:hidden {\n    display: none;\n  }\n\n  .xl\\:flex {\n    display: flex;\n  }\n\n  .xl\\:inline-flex {\n    display: inline-flex;\n  }\n\n  .xl\\:flex-row {\n    flex-direction: row;\n  }\n\n  .xl\\:flex-row-reverse {\n    flex-direction: row-reverse;\n  }\n\n  .xl\\:flex-col {\n    flex-direction: column;\n  }\n\n  .xl\\:flex-col-reverse {\n    flex-direction: column-reverse;\n  }\n\n  .xl\\:flex-wrap {\n    flex-wrap: wrap;\n  }\n\n  .xl\\:flex-wrap-reverse {\n    flex-wrap: wrap-reverse;\n  }\n\n  .xl\\:flex-no-wrap {\n    flex-wrap: nowrap;\n  }\n\n  .xl\\:items-start {\n    align-items: flex-start;\n  }\n\n  .xl\\:items-end {\n    align-items: flex-end;\n  }\n\n  .xl\\:items-center {\n    align-items: center;\n  }\n\n  .xl\\:items-baseline {\n    align-items: baseline;\n  }\n\n  .xl\\:items-stretch {\n    align-items: stretch;\n  }\n\n  .xl\\:self-auto {\n    align-self: auto;\n  }\n\n  .xl\\:self-start {\n    align-self: flex-start;\n  }\n\n  .xl\\:self-end {\n    align-self: flex-end;\n  }\n\n  .xl\\:self-center {\n    align-self: center;\n  }\n\n  .xl\\:self-stretch {\n    align-self: stretch;\n  }\n\n  .xl\\:justify-start {\n    justify-content: flex-start;\n  }\n\n  .xl\\:justify-end {\n    justify-content: flex-end;\n  }\n\n  .xl\\:justify-center {\n    justify-content: center;\n  }\n\n  .xl\\:justify-between {\n    justify-content: space-between;\n  }\n\n  .xl\\:justify-around {\n    justify-content: space-around;\n  }\n\n  .xl\\:content-center {\n    align-content: center;\n  }\n\n  .xl\\:content-start {\n    align-content: flex-start;\n  }\n\n  .xl\\:content-end {\n    align-content: flex-end;\n  }\n\n  .xl\\:content-between {\n    align-content: space-between;\n  }\n\n  .xl\\:content-around {\n    align-content: space-around;\n  }\n\n  .xl\\:flex-1 {\n    flex: 1;\n  }\n\n  .xl\\:flex-auto {\n    flex: auto;\n  }\n\n  .xl\\:flex-initial {\n    flex: initial;\n  }\n\n  .xl\\:flex-none {\n    flex: none;\n  }\n\n  .xl\\:flex-grow {\n    flex-grow: 1;\n  }\n\n  .xl\\:flex-shrink {\n    flex-shrink: 1;\n  }\n\n  .xl\\:flex-no-grow {\n    flex-grow: 0;\n  }\n\n  .xl\\:flex-no-shrink {\n    flex-shrink: 0;\n  }\n\n  .xl\\:float-right {\n    float: right;\n  }\n\n  .xl\\:float-left {\n    float: left;\n  }\n\n  .xl\\:float-none {\n    float: none;\n  }\n\n  .xl\\:clearfix:after {\n    content: \"\";\n    display: table;\n    clear: both;\n  }\n\n  .xl\\:font-sans {\n    font-family: system-ui, BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;\n  }\n\n  .xl\\:font-serif {\n    font-family: Constantia, Lucida Bright, Lucidabright, Lucida Serif, Lucida, DejaVu Serif, Bitstream Vera Serif, Liberation Serif, Georgia, serif;\n  }\n\n  .xl\\:font-mono {\n    font-family: Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;\n  }\n\n  .xl\\:font-hairline {\n    font-weight: 100;\n  }\n\n  .xl\\:font-thin {\n    font-weight: 200;\n  }\n\n  .xl\\:font-light {\n    font-weight: 300;\n  }\n\n  .xl\\:font-normal {\n    font-weight: 400;\n  }\n\n  .xl\\:font-medium {\n    font-weight: 500;\n  }\n\n  .xl\\:font-semibold {\n    font-weight: 600;\n  }\n\n  .xl\\:font-bold {\n    font-weight: 700;\n  }\n\n  .xl\\:font-extrabold {\n    font-weight: 800;\n  }\n\n  .xl\\:font-black {\n    font-weight: 900;\n  }\n\n  .xl\\:hover\\:font-hairline:hover {\n    font-weight: 100;\n  }\n\n  .xl\\:hover\\:font-thin:hover {\n    font-weight: 200;\n  }\n\n  .xl\\:hover\\:font-light:hover {\n    font-weight: 300;\n  }\n\n  .xl\\:hover\\:font-normal:hover {\n    font-weight: 400;\n  }\n\n  .xl\\:hover\\:font-medium:hover {\n    font-weight: 500;\n  }\n\n  .xl\\:hover\\:font-semibold:hover {\n    font-weight: 600;\n  }\n\n  .xl\\:hover\\:font-bold:hover {\n    font-weight: 700;\n  }\n\n  .xl\\:hover\\:font-extrabold:hover {\n    font-weight: 800;\n  }\n\n  .xl\\:hover\\:font-black:hover {\n    font-weight: 900;\n  }\n\n  .xl\\:h-1 {\n    height: .25rem;\n  }\n\n  .xl\\:h-2 {\n    height: .5rem;\n  }\n\n  .xl\\:h-3 {\n    height: .75rem;\n  }\n\n  .xl\\:h-4 {\n    height: 1rem;\n  }\n\n  .xl\\:h-6 {\n    height: 1.5rem;\n  }\n\n  .xl\\:h-8 {\n    height: 2rem;\n  }\n\n  .xl\\:h-10 {\n    height: 2.5rem;\n  }\n\n  .xl\\:h-12 {\n    height: 3rem;\n  }\n\n  .xl\\:h-16 {\n    height: 4rem;\n  }\n\n  .xl\\:h-24 {\n    height: 6rem;\n  }\n\n  .xl\\:h-32 {\n    height: 8rem;\n  }\n\n  .xl\\:h-48 {\n    height: 12rem;\n  }\n\n  .xl\\:h-64 {\n    height: 16rem;\n  }\n\n  .xl\\:h-auto {\n    height: auto;\n  }\n\n  .xl\\:h-px {\n    height: 1px;\n  }\n\n  .xl\\:h-full {\n    height: 100%;\n  }\n\n  .xl\\:h-screen {\n    height: 100vh;\n  }\n\n  .xl\\:leading-none {\n    line-height: 1;\n  }\n\n  .xl\\:leading-tight {\n    line-height: 1.25;\n  }\n\n  .xl\\:leading-normal {\n    line-height: 1.5;\n  }\n\n  .xl\\:leading-loose {\n    line-height: 2;\n  }\n\n  .xl\\:m-0 {\n    margin: 0;\n  }\n\n  .xl\\:m-1 {\n    margin: .25rem;\n  }\n\n  .xl\\:m-2 {\n    margin: .5rem;\n  }\n\n  .xl\\:m-3 {\n    margin: .75rem;\n  }\n\n  .xl\\:m-4 {\n    margin: 1rem;\n  }\n\n  .xl\\:m-6 {\n    margin: 1.5rem;\n  }\n\n  .xl\\:m-8 {\n    margin: 2rem;\n  }\n\n  .xl\\:m-auto {\n    margin: auto;\n  }\n\n  .xl\\:m-px {\n    margin: 1px;\n  }\n\n  .xl\\:my-0 {\n    margin-top: 0;\n    margin-bottom: 0;\n  }\n\n  .xl\\:mx-0 {\n    margin-left: 0;\n    margin-right: 0;\n  }\n\n  .xl\\:my-1 {\n    margin-top: .25rem;\n    margin-bottom: .25rem;\n  }\n\n  .xl\\:mx-1 {\n    margin-left: .25rem;\n    margin-right: .25rem;\n  }\n\n  .xl\\:my-2 {\n    margin-top: .5rem;\n    margin-bottom: .5rem;\n  }\n\n  .xl\\:mx-2 {\n    margin-left: .5rem;\n    margin-right: .5rem;\n  }\n\n  .xl\\:my-3 {\n    margin-top: .75rem;\n    margin-bottom: .75rem;\n  }\n\n  .xl\\:mx-3 {\n    margin-left: .75rem;\n    margin-right: .75rem;\n  }\n\n  .xl\\:my-4 {\n    margin-top: 1rem;\n    margin-bottom: 1rem;\n  }\n\n  .xl\\:mx-4 {\n    margin-left: 1rem;\n    margin-right: 1rem;\n  }\n\n  .xl\\:my-6 {\n    margin-top: 1.5rem;\n    margin-bottom: 1.5rem;\n  }\n\n  .xl\\:mx-6 {\n    margin-left: 1.5rem;\n    margin-right: 1.5rem;\n  }\n\n  .xl\\:my-8 {\n    margin-top: 2rem;\n    margin-bottom: 2rem;\n  }\n\n  .xl\\:mx-8 {\n    margin-left: 2rem;\n    margin-right: 2rem;\n  }\n\n  .xl\\:my-auto {\n    margin-top: auto;\n    margin-bottom: auto;\n  }\n\n  .xl\\:mx-auto {\n    margin-left: auto;\n    margin-right: auto;\n  }\n\n  .xl\\:my-px {\n    margin-top: 1px;\n    margin-bottom: 1px;\n  }\n\n  .xl\\:mx-px {\n    margin-left: 1px;\n    margin-right: 1px;\n  }\n\n  .xl\\:mt-0 {\n    margin-top: 0;\n  }\n\n  .xl\\:mr-0 {\n    margin-right: 0;\n  }\n\n  .xl\\:mb-0 {\n    margin-bottom: 0;\n  }\n\n  .xl\\:ml-0 {\n    margin-left: 0;\n  }\n\n  .xl\\:mt-1 {\n    margin-top: .25rem;\n  }\n\n  .xl\\:mr-1 {\n    margin-right: .25rem;\n  }\n\n  .xl\\:mb-1 {\n    margin-bottom: .25rem;\n  }\n\n  .xl\\:ml-1 {\n    margin-left: .25rem;\n  }\n\n  .xl\\:mt-2 {\n    margin-top: .5rem;\n  }\n\n  .xl\\:mr-2 {\n    margin-right: .5rem;\n  }\n\n  .xl\\:mb-2 {\n    margin-bottom: .5rem;\n  }\n\n  .xl\\:ml-2 {\n    margin-left: .5rem;\n  }\n\n  .xl\\:mt-3 {\n    margin-top: .75rem;\n  }\n\n  .xl\\:mr-3 {\n    margin-right: .75rem;\n  }\n\n  .xl\\:mb-3 {\n    margin-bottom: .75rem;\n  }\n\n  .xl\\:ml-3 {\n    margin-left: .75rem;\n  }\n\n  .xl\\:mt-4 {\n    margin-top: 1rem;\n  }\n\n  .xl\\:mr-4 {\n    margin-right: 1rem;\n  }\n\n  .xl\\:mb-4 {\n    margin-bottom: 1rem;\n  }\n\n  .xl\\:ml-4 {\n    margin-left: 1rem;\n  }\n\n  .xl\\:mt-6 {\n    margin-top: 1.5rem;\n  }\n\n  .xl\\:mr-6 {\n    margin-right: 1.5rem;\n  }\n\n  .xl\\:mb-6 {\n    margin-bottom: 1.5rem;\n  }\n\n  .xl\\:ml-6 {\n    margin-left: 1.5rem;\n  }\n\n  .xl\\:mt-8 {\n    margin-top: 2rem;\n  }\n\n  .xl\\:mr-8 {\n    margin-right: 2rem;\n  }\n\n  .xl\\:mb-8 {\n    margin-bottom: 2rem;\n  }\n\n  .xl\\:ml-8 {\n    margin-left: 2rem;\n  }\n\n  .xl\\:mt-auto {\n    margin-top: auto;\n  }\n\n  .xl\\:mr-auto {\n    margin-right: auto;\n  }\n\n  .xl\\:mb-auto {\n    margin-bottom: auto;\n  }\n\n  .xl\\:ml-auto {\n    margin-left: auto;\n  }\n\n  .xl\\:mt-px {\n    margin-top: 1px;\n  }\n\n  .xl\\:mr-px {\n    margin-right: 1px;\n  }\n\n  .xl\\:mb-px {\n    margin-bottom: 1px;\n  }\n\n  .xl\\:ml-px {\n    margin-left: 1px;\n  }\n\n  .xl\\:max-h-full {\n    max-height: 100%;\n  }\n\n  .xl\\:max-h-screen {\n    max-height: 100vh;\n  }\n\n  .xl\\:max-w-xs {\n    max-width: 20rem;\n  }\n\n  .xl\\:max-w-sm {\n    max-width: 30rem;\n  }\n\n  .xl\\:max-w-md {\n    max-width: 40rem;\n  }\n\n  .xl\\:max-w-lg {\n    max-width: 50rem;\n  }\n\n  .xl\\:max-w-xl {\n    max-width: 60rem;\n  }\n\n  .xl\\:max-w-2xl {\n    max-width: 70rem;\n  }\n\n  .xl\\:max-w-3xl {\n    max-width: 80rem;\n  }\n\n  .xl\\:max-w-4xl {\n    max-width: 90rem;\n  }\n\n  .xl\\:max-w-5xl {\n    max-width: 100rem;\n  }\n\n  .xl\\:max-w-full {\n    max-width: 100%;\n  }\n\n  .xl\\:min-h-0 {\n    min-height: 0;\n  }\n\n  .xl\\:min-h-full {\n    min-height: 100%;\n  }\n\n  .xl\\:min-h-screen {\n    min-height: 100vh;\n  }\n\n  .xl\\:min-w-0 {\n    min-width: 0;\n  }\n\n  .xl\\:min-w-full {\n    min-width: 100%;\n  }\n\n  .xl\\:-m-0 {\n    margin: 0;\n  }\n\n  .xl\\:-m-1 {\n    margin: -0.25rem;\n  }\n\n  .xl\\:-m-2 {\n    margin: -0.5rem;\n  }\n\n  .xl\\:-m-3 {\n    margin: -0.75rem;\n  }\n\n  .xl\\:-m-4 {\n    margin: -1rem;\n  }\n\n  .xl\\:-m-6 {\n    margin: -1.5rem;\n  }\n\n  .xl\\:-m-8 {\n    margin: -2rem;\n  }\n\n  .xl\\:-m-px {\n    margin: -1px;\n  }\n\n  .xl\\:-my-0 {\n    margin-top: 0;\n    margin-bottom: 0;\n  }\n\n  .xl\\:-mx-0 {\n    margin-left: 0;\n    margin-right: 0;\n  }\n\n  .xl\\:-my-1 {\n    margin-top: -0.25rem;\n    margin-bottom: -0.25rem;\n  }\n\n  .xl\\:-mx-1 {\n    margin-left: -0.25rem;\n    margin-right: -0.25rem;\n  }\n\n  .xl\\:-my-2 {\n    margin-top: -0.5rem;\n    margin-bottom: -0.5rem;\n  }\n\n  .xl\\:-mx-2 {\n    margin-left: -0.5rem;\n    margin-right: -0.5rem;\n  }\n\n  .xl\\:-my-3 {\n    margin-top: -0.75rem;\n    margin-bottom: -0.75rem;\n  }\n\n  .xl\\:-mx-3 {\n    margin-left: -0.75rem;\n    margin-right: -0.75rem;\n  }\n\n  .xl\\:-my-4 {\n    margin-top: -1rem;\n    margin-bottom: -1rem;\n  }\n\n  .xl\\:-mx-4 {\n    margin-left: -1rem;\n    margin-right: -1rem;\n  }\n\n  .xl\\:-my-6 {\n    margin-top: -1.5rem;\n    margin-bottom: -1.5rem;\n  }\n\n  .xl\\:-mx-6 {\n    margin-left: -1.5rem;\n    margin-right: -1.5rem;\n  }\n\n  .xl\\:-my-8 {\n    margin-top: -2rem;\n    margin-bottom: -2rem;\n  }\n\n  .xl\\:-mx-8 {\n    margin-left: -2rem;\n    margin-right: -2rem;\n  }\n\n  .xl\\:-my-px {\n    margin-top: -1px;\n    margin-bottom: -1px;\n  }\n\n  .xl\\:-mx-px {\n    margin-left: -1px;\n    margin-right: -1px;\n  }\n\n  .xl\\:-mt-0 {\n    margin-top: 0;\n  }\n\n  .xl\\:-mr-0 {\n    margin-right: 0;\n  }\n\n  .xl\\:-mb-0 {\n    margin-bottom: 0;\n  }\n\n  .xl\\:-ml-0 {\n    margin-left: 0;\n  }\n\n  .xl\\:-mt-1 {\n    margin-top: -0.25rem;\n  }\n\n  .xl\\:-mr-1 {\n    margin-right: -0.25rem;\n  }\n\n  .xl\\:-mb-1 {\n    margin-bottom: -0.25rem;\n  }\n\n  .xl\\:-ml-1 {\n    margin-left: -0.25rem;\n  }\n\n  .xl\\:-mt-2 {\n    margin-top: -0.5rem;\n  }\n\n  .xl\\:-mr-2 {\n    margin-right: -0.5rem;\n  }\n\n  .xl\\:-mb-2 {\n    margin-bottom: -0.5rem;\n  }\n\n  .xl\\:-ml-2 {\n    margin-left: -0.5rem;\n  }\n\n  .xl\\:-mt-3 {\n    margin-top: -0.75rem;\n  }\n\n  .xl\\:-mr-3 {\n    margin-right: -0.75rem;\n  }\n\n  .xl\\:-mb-3 {\n    margin-bottom: -0.75rem;\n  }\n\n  .xl\\:-ml-3 {\n    margin-left: -0.75rem;\n  }\n\n  .xl\\:-mt-4 {\n    margin-top: -1rem;\n  }\n\n  .xl\\:-mr-4 {\n    margin-right: -1rem;\n  }\n\n  .xl\\:-mb-4 {\n    margin-bottom: -1rem;\n  }\n\n  .xl\\:-ml-4 {\n    margin-left: -1rem;\n  }\n\n  .xl\\:-mt-6 {\n    margin-top: -1.5rem;\n  }\n\n  .xl\\:-mr-6 {\n    margin-right: -1.5rem;\n  }\n\n  .xl\\:-mb-6 {\n    margin-bottom: -1.5rem;\n  }\n\n  .xl\\:-ml-6 {\n    margin-left: -1.5rem;\n  }\n\n  .xl\\:-mt-8 {\n    margin-top: -2rem;\n  }\n\n  .xl\\:-mr-8 {\n    margin-right: -2rem;\n  }\n\n  .xl\\:-mb-8 {\n    margin-bottom: -2rem;\n  }\n\n  .xl\\:-ml-8 {\n    margin-left: -2rem;\n  }\n\n  .xl\\:-mt-px {\n    margin-top: -1px;\n  }\n\n  .xl\\:-mr-px {\n    margin-right: -1px;\n  }\n\n  .xl\\:-mb-px {\n    margin-bottom: -1px;\n  }\n\n  .xl\\:-ml-px {\n    margin-left: -1px;\n  }\n\n  .xl\\:opacity-0 {\n    opacity: 0;\n  }\n\n  .xl\\:opacity-25 {\n    opacity: .25;\n  }\n\n  .xl\\:opacity-50 {\n    opacity: .5;\n  }\n\n  .xl\\:opacity-75 {\n    opacity: .75;\n  }\n\n  .xl\\:opacity-100 {\n    opacity: 1;\n  }\n\n  .xl\\:overflow-auto {\n    overflow: auto;\n  }\n\n  .xl\\:overflow-hidden {\n    overflow: hidden;\n  }\n\n  .xl\\:overflow-visible {\n    overflow: visible;\n  }\n\n  .xl\\:overflow-scroll {\n    overflow: scroll;\n  }\n\n  .xl\\:overflow-x-auto {\n    overflow-x: auto;\n  }\n\n  .xl\\:overflow-y-auto {\n    overflow-y: auto;\n  }\n\n  .xl\\:overflow-x-scroll {\n    overflow-x: scroll;\n  }\n\n  .xl\\:overflow-y-scroll {\n    overflow-y: scroll;\n  }\n\n  .xl\\:scrolling-touch {\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .xl\\:scrolling-auto {\n    -webkit-overflow-scrolling: auto;\n  }\n\n  .xl\\:p-0 {\n    padding: 0;\n  }\n\n  .xl\\:p-1 {\n    padding: .25rem;\n  }\n\n  .xl\\:p-2 {\n    padding: .5rem;\n  }\n\n  .xl\\:p-3 {\n    padding: .75rem;\n  }\n\n  .xl\\:p-4 {\n    padding: 1rem;\n  }\n\n  .xl\\:p-6 {\n    padding: 1.5rem;\n  }\n\n  .xl\\:p-8 {\n    padding: 2rem;\n  }\n\n  .xl\\:p-px {\n    padding: 1px;\n  }\n\n  .xl\\:py-0 {\n    padding-top: 0;\n    padding-bottom: 0;\n  }\n\n  .xl\\:px-0 {\n    padding-left: 0;\n    padding-right: 0;\n  }\n\n  .xl\\:py-1 {\n    padding-top: .25rem;\n    padding-bottom: .25rem;\n  }\n\n  .xl\\:px-1 {\n    padding-left: .25rem;\n    padding-right: .25rem;\n  }\n\n  .xl\\:py-2 {\n    padding-top: .5rem;\n    padding-bottom: .5rem;\n  }\n\n  .xl\\:px-2 {\n    padding-left: .5rem;\n    padding-right: .5rem;\n  }\n\n  .xl\\:py-3 {\n    padding-top: .75rem;\n    padding-bottom: .75rem;\n  }\n\n  .xl\\:px-3 {\n    padding-left: .75rem;\n    padding-right: .75rem;\n  }\n\n  .xl\\:py-4 {\n    padding-top: 1rem;\n    padding-bottom: 1rem;\n  }\n\n  .xl\\:px-4 {\n    padding-left: 1rem;\n    padding-right: 1rem;\n  }\n\n  .xl\\:py-6 {\n    padding-top: 1.5rem;\n    padding-bottom: 1.5rem;\n  }\n\n  .xl\\:px-6 {\n    padding-left: 1.5rem;\n    padding-right: 1.5rem;\n  }\n\n  .xl\\:py-8 {\n    padding-top: 2rem;\n    padding-bottom: 2rem;\n  }\n\n  .xl\\:px-8 {\n    padding-left: 2rem;\n    padding-right: 2rem;\n  }\n\n  .xl\\:py-px {\n    padding-top: 1px;\n    padding-bottom: 1px;\n  }\n\n  .xl\\:px-px {\n    padding-left: 1px;\n    padding-right: 1px;\n  }\n\n  .xl\\:pt-0 {\n    padding-top: 0;\n  }\n\n  .xl\\:pr-0 {\n    padding-right: 0;\n  }\n\n  .xl\\:pb-0 {\n    padding-bottom: 0;\n  }\n\n  .xl\\:pl-0 {\n    padding-left: 0;\n  }\n\n  .xl\\:pt-1 {\n    padding-top: .25rem;\n  }\n\n  .xl\\:pr-1 {\n    padding-right: .25rem;\n  }\n\n  .xl\\:pb-1 {\n    padding-bottom: .25rem;\n  }\n\n  .xl\\:pl-1 {\n    padding-left: .25rem;\n  }\n\n  .xl\\:pt-2 {\n    padding-top: .5rem;\n  }\n\n  .xl\\:pr-2 {\n    padding-right: .5rem;\n  }\n\n  .xl\\:pb-2 {\n    padding-bottom: .5rem;\n  }\n\n  .xl\\:pl-2 {\n    padding-left: .5rem;\n  }\n\n  .xl\\:pt-3 {\n    padding-top: .75rem;\n  }\n\n  .xl\\:pr-3 {\n    padding-right: .75rem;\n  }\n\n  .xl\\:pb-3 {\n    padding-bottom: .75rem;\n  }\n\n  .xl\\:pl-3 {\n    padding-left: .75rem;\n  }\n\n  .xl\\:pt-4 {\n    padding-top: 1rem;\n  }\n\n  .xl\\:pr-4 {\n    padding-right: 1rem;\n  }\n\n  .xl\\:pb-4 {\n    padding-bottom: 1rem;\n  }\n\n  .xl\\:pl-4 {\n    padding-left: 1rem;\n  }\n\n  .xl\\:pt-6 {\n    padding-top: 1.5rem;\n  }\n\n  .xl\\:pr-6 {\n    padding-right: 1.5rem;\n  }\n\n  .xl\\:pb-6 {\n    padding-bottom: 1.5rem;\n  }\n\n  .xl\\:pl-6 {\n    padding-left: 1.5rem;\n  }\n\n  .xl\\:pt-8 {\n    padding-top: 2rem;\n  }\n\n  .xl\\:pr-8 {\n    padding-right: 2rem;\n  }\n\n  .xl\\:pb-8 {\n    padding-bottom: 2rem;\n  }\n\n  .xl\\:pl-8 {\n    padding-left: 2rem;\n  }\n\n  .xl\\:pt-px {\n    padding-top: 1px;\n  }\n\n  .xl\\:pr-px {\n    padding-right: 1px;\n  }\n\n  .xl\\:pb-px {\n    padding-bottom: 1px;\n  }\n\n  .xl\\:pl-px {\n    padding-left: 1px;\n  }\n\n  .xl\\:pointer-events-none {\n    pointer-events: none;\n  }\n\n  .xl\\:pointer-events-auto {\n    pointer-events: auto;\n  }\n\n  .xl\\:static {\n    position: static;\n  }\n\n  .xl\\:fixed {\n    position: fixed;\n  }\n\n  .xl\\:absolute {\n    position: absolute;\n  }\n\n  .xl\\:relative {\n    position: relative;\n  }\n\n  .xl\\:sticky {\n    position: -webkit-sticky;\n    position: sticky;\n  }\n\n  .xl\\:pin-none {\n    top: auto;\n    right: auto;\n    bottom: auto;\n    left: auto;\n  }\n\n  .xl\\:pin {\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n  }\n\n  .xl\\:pin-y {\n    top: 0;\n    bottom: 0;\n  }\n\n  .xl\\:pin-x {\n    right: 0;\n    left: 0;\n  }\n\n  .xl\\:pin-t {\n    top: 0;\n  }\n\n  .xl\\:pin-r {\n    right: 0;\n  }\n\n  .xl\\:pin-b {\n    bottom: 0;\n  }\n\n  .xl\\:pin-l {\n    left: 0;\n  }\n\n  .xl\\:resize-none {\n    resize: none;\n  }\n\n  .xl\\:resize-y {\n    resize: vertical;\n  }\n\n  .xl\\:resize-x {\n    resize: horizontal;\n  }\n\n  .xl\\:resize {\n    resize: both;\n  }\n\n  .xl\\:shadow {\n    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n  }\n\n  .xl\\:shadow-md {\n    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n  }\n\n  .xl\\:shadow-lg {\n    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n  }\n\n  .xl\\:shadow-inner {\n    box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n  }\n\n  .xl\\:shadow-none {\n    box-shadow: none;\n  }\n\n  .xl\\:text-left {\n    text-align: left;\n  }\n\n  .xl\\:text-center {\n    text-align: center;\n  }\n\n  .xl\\:text-right {\n    text-align: right;\n  }\n\n  .xl\\:text-justify {\n    text-align: justify;\n  }\n\n  .xl\\:text-transparent {\n    color: transparent;\n  }\n\n  .xl\\:text-black {\n    color: #22292f;\n  }\n\n  .xl\\:text-grey-darkest {\n    color: #3d4852;\n  }\n\n  .xl\\:text-grey-darker {\n    color: #606f7b;\n  }\n\n  .xl\\:text-grey-dark {\n    color: #8795a1;\n  }\n\n  .xl\\:text-grey {\n    color: #b8c2cc;\n  }\n\n  .xl\\:text-grey-light {\n    color: #dae1e7;\n  }\n\n  .xl\\:text-grey-lighter {\n    color: #f1f5f8;\n  }\n\n  .xl\\:text-grey-lightest {\n    color: #f8fafc;\n  }\n\n  .xl\\:text-white {\n    color: #fff;\n  }\n\n  .xl\\:text-red-darkest {\n    color: #3b0d0c;\n  }\n\n  .xl\\:text-red-darker {\n    color: #621b18;\n  }\n\n  .xl\\:text-red-dark {\n    color: #cc1f1a;\n  }\n\n  .xl\\:text-red {\n    color: #e3342f;\n  }\n\n  .xl\\:text-red-light {\n    color: #ef5753;\n  }\n\n  .xl\\:text-red-lighter {\n    color: #f9acaa;\n  }\n\n  .xl\\:text-red-lightest {\n    color: #fcebea;\n  }\n\n  .xl\\:text-orange-darkest {\n    color: #462a16;\n  }\n\n  .xl\\:text-orange-darker {\n    color: #613b1f;\n  }\n\n  .xl\\:text-orange-dark {\n    color: #de751f;\n  }\n\n  .xl\\:text-orange {\n    color: #f6993f;\n  }\n\n  .xl\\:text-orange-light {\n    color: #faad63;\n  }\n\n  .xl\\:text-orange-lighter {\n    color: #fcd9b6;\n  }\n\n  .xl\\:text-orange-lightest {\n    color: #fff5eb;\n  }\n\n  .xl\\:text-yellow-darkest {\n    color: #453411;\n  }\n\n  .xl\\:text-yellow-darker {\n    color: #684f1d;\n  }\n\n  .xl\\:text-yellow-dark {\n    color: #f2d024;\n  }\n\n  .xl\\:text-yellow {\n    color: #ffed4a;\n  }\n\n  .xl\\:text-yellow-light {\n    color: #fff382;\n  }\n\n  .xl\\:text-yellow-lighter {\n    color: #fff9c2;\n  }\n\n  .xl\\:text-yellow-lightest {\n    color: #fcfbeb;\n  }\n\n  .xl\\:text-green-darkest {\n    color: #0f2f21;\n  }\n\n  .xl\\:text-green-darker {\n    color: #1a4731;\n  }\n\n  .xl\\:text-green-dark {\n    color: #1f9d55;\n  }\n\n  .xl\\:text-green {\n    color: #38c172;\n  }\n\n  .xl\\:text-green-light {\n    color: #51d88a;\n  }\n\n  .xl\\:text-green-lighter {\n    color: #a2f5bf;\n  }\n\n  .xl\\:text-green-lightest {\n    color: #e3fcec;\n  }\n\n  .xl\\:text-teal-darkest {\n    color: #0d3331;\n  }\n\n  .xl\\:text-teal-darker {\n    color: #20504f;\n  }\n\n  .xl\\:text-teal-dark {\n    color: #38a89d;\n  }\n\n  .xl\\:text-teal {\n    color: #4dc0b5;\n  }\n\n  .xl\\:text-teal-light {\n    color: #64d5ca;\n  }\n\n  .xl\\:text-teal-lighter {\n    color: #a0f0ed;\n  }\n\n  .xl\\:text-teal-lightest {\n    color: #e8fffe;\n  }\n\n  .xl\\:text-blue-darkest {\n    color: #12283a;\n  }\n\n  .xl\\:text-blue-darker {\n    color: #1c3d5a;\n  }\n\n  .xl\\:text-blue-dark {\n    color: #2779bd;\n  }\n\n  .xl\\:text-blue {\n    color: #3490dc;\n  }\n\n  .xl\\:text-blue-light {\n    color: #6cb2eb;\n  }\n\n  .xl\\:text-blue-lighter {\n    color: #bcdefa;\n  }\n\n  .xl\\:text-blue-lightest {\n    color: #eff8ff;\n  }\n\n  .xl\\:text-indigo-darkest {\n    color: #191e38;\n  }\n\n  .xl\\:text-indigo-darker {\n    color: #2f365f;\n  }\n\n  .xl\\:text-indigo-dark {\n    color: #5661b3;\n  }\n\n  .xl\\:text-indigo {\n    color: #6574cd;\n  }\n\n  .xl\\:text-indigo-light {\n    color: #7886d7;\n  }\n\n  .xl\\:text-indigo-lighter {\n    color: #b2b7ff;\n  }\n\n  .xl\\:text-indigo-lightest {\n    color: #e6e8ff;\n  }\n\n  .xl\\:text-purple-darkest {\n    color: #21183c;\n  }\n\n  .xl\\:text-purple-darker {\n    color: #382b5f;\n  }\n\n  .xl\\:text-purple-dark {\n    color: #794acf;\n  }\n\n  .xl\\:text-purple {\n    color: #9561e2;\n  }\n\n  .xl\\:text-purple-light {\n    color: #a779e9;\n  }\n\n  .xl\\:text-purple-lighter {\n    color: #d6bbfc;\n  }\n\n  .xl\\:text-purple-lightest {\n    color: #f3ebff;\n  }\n\n  .xl\\:text-pink-darkest {\n    color: #451225;\n  }\n\n  .xl\\:text-pink-darker {\n    color: #6f213f;\n  }\n\n  .xl\\:text-pink-dark {\n    color: #eb5286;\n  }\n\n  .xl\\:text-pink {\n    color: #f66d9b;\n  }\n\n  .xl\\:text-pink-light {\n    color: #fa7ea8;\n  }\n\n  .xl\\:text-pink-lighter {\n    color: #ffbbca;\n  }\n\n  .xl\\:text-pink-lightest {\n    color: #ffebef;\n  }\n\n  .xl\\:hover\\:text-transparent:hover {\n    color: transparent;\n  }\n\n  .xl\\:hover\\:text-black:hover {\n    color: #22292f;\n  }\n\n  .xl\\:hover\\:text-grey-darkest:hover {\n    color: #3d4852;\n  }\n\n  .xl\\:hover\\:text-grey-darker:hover {\n    color: #606f7b;\n  }\n\n  .xl\\:hover\\:text-grey-dark:hover {\n    color: #8795a1;\n  }\n\n  .xl\\:hover\\:text-grey:hover {\n    color: #b8c2cc;\n  }\n\n  .xl\\:hover\\:text-grey-light:hover {\n    color: #dae1e7;\n  }\n\n  .xl\\:hover\\:text-grey-lighter:hover {\n    color: #f1f5f8;\n  }\n\n  .xl\\:hover\\:text-grey-lightest:hover {\n    color: #f8fafc;\n  }\n\n  .xl\\:hover\\:text-white:hover {\n    color: #fff;\n  }\n\n  .xl\\:hover\\:text-red-darkest:hover {\n    color: #3b0d0c;\n  }\n\n  .xl\\:hover\\:text-red-darker:hover {\n    color: #621b18;\n  }\n\n  .xl\\:hover\\:text-red-dark:hover {\n    color: #cc1f1a;\n  }\n\n  .xl\\:hover\\:text-red:hover {\n    color: #e3342f;\n  }\n\n  .xl\\:hover\\:text-red-light:hover {\n    color: #ef5753;\n  }\n\n  .xl\\:hover\\:text-red-lighter:hover {\n    color: #f9acaa;\n  }\n\n  .xl\\:hover\\:text-red-lightest:hover {\n    color: #fcebea;\n  }\n\n  .xl\\:hover\\:text-orange-darkest:hover {\n    color: #462a16;\n  }\n\n  .xl\\:hover\\:text-orange-darker:hover {\n    color: #613b1f;\n  }\n\n  .xl\\:hover\\:text-orange-dark:hover {\n    color: #de751f;\n  }\n\n  .xl\\:hover\\:text-orange:hover {\n    color: #f6993f;\n  }\n\n  .xl\\:hover\\:text-orange-light:hover {\n    color: #faad63;\n  }\n\n  .xl\\:hover\\:text-orange-lighter:hover {\n    color: #fcd9b6;\n  }\n\n  .xl\\:hover\\:text-orange-lightest:hover {\n    color: #fff5eb;\n  }\n\n  .xl\\:hover\\:text-yellow-darkest:hover {\n    color: #453411;\n  }\n\n  .xl\\:hover\\:text-yellow-darker:hover {\n    color: #684f1d;\n  }\n\n  .xl\\:hover\\:text-yellow-dark:hover {\n    color: #f2d024;\n  }\n\n  .xl\\:hover\\:text-yellow:hover {\n    color: #ffed4a;\n  }\n\n  .xl\\:hover\\:text-yellow-light:hover {\n    color: #fff382;\n  }\n\n  .xl\\:hover\\:text-yellow-lighter:hover {\n    color: #fff9c2;\n  }\n\n  .xl\\:hover\\:text-yellow-lightest:hover {\n    color: #fcfbeb;\n  }\n\n  .xl\\:hover\\:text-green-darkest:hover {\n    color: #0f2f21;\n  }\n\n  .xl\\:hover\\:text-green-darker:hover {\n    color: #1a4731;\n  }\n\n  .xl\\:hover\\:text-green-dark:hover {\n    color: #1f9d55;\n  }\n\n  .xl\\:hover\\:text-green:hover {\n    color: #38c172;\n  }\n\n  .xl\\:hover\\:text-green-light:hover {\n    color: #51d88a;\n  }\n\n  .xl\\:hover\\:text-green-lighter:hover {\n    color: #a2f5bf;\n  }\n\n  .xl\\:hover\\:text-green-lightest:hover {\n    color: #e3fcec;\n  }\n\n  .xl\\:hover\\:text-teal-darkest:hover {\n    color: #0d3331;\n  }\n\n  .xl\\:hover\\:text-teal-darker:hover {\n    color: #20504f;\n  }\n\n  .xl\\:hover\\:text-teal-dark:hover {\n    color: #38a89d;\n  }\n\n  .xl\\:hover\\:text-teal:hover {\n    color: #4dc0b5;\n  }\n\n  .xl\\:hover\\:text-teal-light:hover {\n    color: #64d5ca;\n  }\n\n  .xl\\:hover\\:text-teal-lighter:hover {\n    color: #a0f0ed;\n  }\n\n  .xl\\:hover\\:text-teal-lightest:hover {\n    color: #e8fffe;\n  }\n\n  .xl\\:hover\\:text-blue-darkest:hover {\n    color: #12283a;\n  }\n\n  .xl\\:hover\\:text-blue-darker:hover {\n    color: #1c3d5a;\n  }\n\n  .xl\\:hover\\:text-blue-dark:hover {\n    color: #2779bd;\n  }\n\n  .xl\\:hover\\:text-blue:hover {\n    color: #3490dc;\n  }\n\n  .xl\\:hover\\:text-blue-light:hover {\n    color: #6cb2eb;\n  }\n\n  .xl\\:hover\\:text-blue-lighter:hover {\n    color: #bcdefa;\n  }\n\n  .xl\\:hover\\:text-blue-lightest:hover {\n    color: #eff8ff;\n  }\n\n  .xl\\:hover\\:text-indigo-darkest:hover {\n    color: #191e38;\n  }\n\n  .xl\\:hover\\:text-indigo-darker:hover {\n    color: #2f365f;\n  }\n\n  .xl\\:hover\\:text-indigo-dark:hover {\n    color: #5661b3;\n  }\n\n  .xl\\:hover\\:text-indigo:hover {\n    color: #6574cd;\n  }\n\n  .xl\\:hover\\:text-indigo-light:hover {\n    color: #7886d7;\n  }\n\n  .xl\\:hover\\:text-indigo-lighter:hover {\n    color: #b2b7ff;\n  }\n\n  .xl\\:hover\\:text-indigo-lightest:hover {\n    color: #e6e8ff;\n  }\n\n  .xl\\:hover\\:text-purple-darkest:hover {\n    color: #21183c;\n  }\n\n  .xl\\:hover\\:text-purple-darker:hover {\n    color: #382b5f;\n  }\n\n  .xl\\:hover\\:text-purple-dark:hover {\n    color: #794acf;\n  }\n\n  .xl\\:hover\\:text-purple:hover {\n    color: #9561e2;\n  }\n\n  .xl\\:hover\\:text-purple-light:hover {\n    color: #a779e9;\n  }\n\n  .xl\\:hover\\:text-purple-lighter:hover {\n    color: #d6bbfc;\n  }\n\n  .xl\\:hover\\:text-purple-lightest:hover {\n    color: #f3ebff;\n  }\n\n  .xl\\:hover\\:text-pink-darkest:hover {\n    color: #451225;\n  }\n\n  .xl\\:hover\\:text-pink-darker:hover {\n    color: #6f213f;\n  }\n\n  .xl\\:hover\\:text-pink-dark:hover {\n    color: #eb5286;\n  }\n\n  .xl\\:hover\\:text-pink:hover {\n    color: #f66d9b;\n  }\n\n  .xl\\:hover\\:text-pink-light:hover {\n    color: #fa7ea8;\n  }\n\n  .xl\\:hover\\:text-pink-lighter:hover {\n    color: #ffbbca;\n  }\n\n  .xl\\:hover\\:text-pink-lightest:hover {\n    color: #ffebef;\n  }\n\n  .xl\\:text-xs {\n    font-size: .75rem;\n  }\n\n  .xl\\:text-sm {\n    font-size: .875rem;\n  }\n\n  .xl\\:text-base {\n    font-size: 1rem;\n  }\n\n  .xl\\:text-lg {\n    font-size: 1.125rem;\n  }\n\n  .xl\\:text-xl {\n    font-size: 1.25rem;\n  }\n\n  .xl\\:text-2xl {\n    font-size: 1.5rem;\n  }\n\n  .xl\\:text-3xl {\n    font-size: 1.875rem;\n  }\n\n  .xl\\:text-4xl {\n    font-size: 2.25rem;\n  }\n\n  .xl\\:text-5xl {\n    font-size: 3rem;\n  }\n\n  .xl\\:italic {\n    font-style: italic;\n  }\n\n  .xl\\:roman {\n    font-style: normal;\n  }\n\n  .xl\\:uppercase {\n    text-transform: uppercase;\n  }\n\n  .xl\\:lowercase {\n    text-transform: lowercase;\n  }\n\n  .xl\\:capitalize {\n    text-transform: capitalize;\n  }\n\n  .xl\\:normal-case {\n    text-transform: none;\n  }\n\n  .xl\\:underline {\n    text-decoration: underline;\n  }\n\n  .xl\\:line-through {\n    text-decoration: line-through;\n  }\n\n  .xl\\:no-underline {\n    text-decoration: none;\n  }\n\n  .xl\\:antialiased {\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  .xl\\:subpixel-antialiased {\n    -webkit-font-smoothing: auto;\n    -moz-osx-font-smoothing: auto;\n  }\n\n  .xl\\:hover\\:italic:hover {\n    font-style: italic;\n  }\n\n  .xl\\:hover\\:roman:hover {\n    font-style: normal;\n  }\n\n  .xl\\:hover\\:uppercase:hover {\n    text-transform: uppercase;\n  }\n\n  .xl\\:hover\\:lowercase:hover {\n    text-transform: lowercase;\n  }\n\n  .xl\\:hover\\:capitalize:hover {\n    text-transform: capitalize;\n  }\n\n  .xl\\:hover\\:normal-case:hover {\n    text-transform: none;\n  }\n\n  .xl\\:hover\\:underline:hover {\n    text-decoration: underline;\n  }\n\n  .xl\\:hover\\:line-through:hover {\n    text-decoration: line-through;\n  }\n\n  .xl\\:hover\\:no-underline:hover {\n    text-decoration: none;\n  }\n\n  .xl\\:hover\\:antialiased:hover {\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  .xl\\:hover\\:subpixel-antialiased:hover {\n    -webkit-font-smoothing: auto;\n    -moz-osx-font-smoothing: auto;\n  }\n\n  .xl\\:tracking-tight {\n    letter-spacing: -0.05em;\n  }\n\n  .xl\\:tracking-normal {\n    letter-spacing: 0;\n  }\n\n  .xl\\:tracking-wide {\n    letter-spacing: .05em;\n  }\n\n  .xl\\:select-none {\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n  }\n\n  .xl\\:select-text {\n    -webkit-user-select: text;\n       -moz-user-select: text;\n        -ms-user-select: text;\n            user-select: text;\n  }\n\n  .xl\\:align-baseline {\n    vertical-align: baseline;\n  }\n\n  .xl\\:align-top {\n    vertical-align: top;\n  }\n\n  .xl\\:align-middle {\n    vertical-align: middle;\n  }\n\n  .xl\\:align-bottom {\n    vertical-align: bottom;\n  }\n\n  .xl\\:align-text-top {\n    vertical-align: text-top;\n  }\n\n  .xl\\:align-text-bottom {\n    vertical-align: text-bottom;\n  }\n\n  .xl\\:visible {\n    visibility: visible;\n  }\n\n  .xl\\:invisible {\n    visibility: hidden;\n  }\n\n  .xl\\:whitespace-normal {\n    white-space: normal;\n  }\n\n  .xl\\:whitespace-no-wrap {\n    white-space: nowrap;\n  }\n\n  .xl\\:whitespace-pre {\n    white-space: pre;\n  }\n\n  .xl\\:whitespace-pre-line {\n    white-space: pre-line;\n  }\n\n  .xl\\:whitespace-pre-wrap {\n    white-space: pre-wrap;\n  }\n\n  .xl\\:break-words {\n    word-wrap: break-word;\n  }\n\n  .xl\\:break-normal {\n    word-wrap: normal;\n  }\n\n  .xl\\:truncate {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .xl\\:w-1 {\n    width: .25rem;\n  }\n\n  .xl\\:w-2 {\n    width: .5rem;\n  }\n\n  .xl\\:w-3 {\n    width: .75rem;\n  }\n\n  .xl\\:w-4 {\n    width: 1rem;\n  }\n\n  .xl\\:w-6 {\n    width: 1.5rem;\n  }\n\n  .xl\\:w-8 {\n    width: 2rem;\n  }\n\n  .xl\\:w-10 {\n    width: 2.5rem;\n  }\n\n  .xl\\:w-12 {\n    width: 3rem;\n  }\n\n  .xl\\:w-16 {\n    width: 4rem;\n  }\n\n  .xl\\:w-24 {\n    width: 6rem;\n  }\n\n  .xl\\:w-32 {\n    width: 8rem;\n  }\n\n  .xl\\:w-48 {\n    width: 12rem;\n  }\n\n  .xl\\:w-64 {\n    width: 16rem;\n  }\n\n  .xl\\:w-auto {\n    width: auto;\n  }\n\n  .xl\\:w-px {\n    width: 1px;\n  }\n\n  .xl\\:w-1\\/2 {\n    width: 50%;\n  }\n\n  .xl\\:w-1\\/3 {\n    width: 33.33333%;\n  }\n\n  .xl\\:w-2\\/3 {\n    width: 66.66667%;\n  }\n\n  .xl\\:w-1\\/4 {\n    width: 25%;\n  }\n\n  .xl\\:w-3\\/4 {\n    width: 75%;\n  }\n\n  .xl\\:w-1\\/5 {\n    width: 20%;\n  }\n\n  .xl\\:w-2\\/5 {\n    width: 40%;\n  }\n\n  .xl\\:w-3\\/5 {\n    width: 60%;\n  }\n\n  .xl\\:w-4\\/5 {\n    width: 80%;\n  }\n\n  .xl\\:w-1\\/6 {\n    width: 16.66667%;\n  }\n\n  .xl\\:w-5\\/6 {\n    width: 83.33333%;\n  }\n\n  .xl\\:w-full {\n    width: 100%;\n  }\n\n  .xl\\:w-screen {\n    width: 100vw;\n  }\n\n  .xl\\:z-0 {\n    z-index: 0;\n  }\n\n  .xl\\:z-10 {\n    z-index: 10;\n  }\n\n  .xl\\:z-20 {\n    z-index: 20;\n  }\n\n  .xl\\:z-30 {\n    z-index: 30;\n  }\n\n  .xl\\:z-40 {\n    z-index: 40;\n  }\n\n  .xl\\:z-50 {\n    z-index: 50;\n  }\n\n  .xl\\:z-auto {\n    z-index: auto;\n  }\n}\n")
});
___scope___.file("modules/lab/App.css", function(exports, require, module, __filename, __dirname){


require("fuse-box-css")("modules/lab/App.css", "\r\n.grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(4, 1fr);\r\n    grid-gap: .5rem;\r\n}\r\n\r\n.span-col-2 {\r\n    grid-column: span 2 / auto;\r\n}\r\n\r\n.span-row-2 {\r\n    grid-row: span 2 / auto;\r\n}\r\n\r\n/*@media screen and (min-width: 768px) {*/\r\n    /*.grid {*/\r\n        /*grid-template-columns: repeat(2, 1fr);*/\r\n    /*}*/\r\n/*}*/\r\n\r\n@media screen and (min-width: 768px) {\r\n    .grid {\r\n        grid-template-columns: repeat(3, 1fr);\r\n    }\r\n}\r\n\r\n@media screen and (min-width: 1024px) {\r\n    .grid {\r\n        grid-template-columns: repeat(4, 1fr);\r\n    }\r\n}\r\n\r\n.grid a img {\r\n    transition: all .2s ease-in;\r\n    filter: grayscale(100%);\r\n}\r\n\r\n.grid a:hover img {\r\n    filter: grayscale(0);\r\n}")
});
___scope___.file("modules/lab/toolbar.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
//import {observer, inject} from 'mobx-react'
//import styled, { StyledFunction } from 'styled-components';
const core_1 = require("@blueprintjs/core");
const icons_1 = require("@blueprintjs/icons");
exports.ChartDrawerToolbar = () => (React.createElement(core_1.ButtonGroup, { large: true, fill: true },
    React.createElement(core_1.Button, { icon: icons_1.IconNames.CODE }),
    React.createElement(core_1.Button, { icon: icons_1.IconNames.GRAPH }),
    React.createElement(core_1.Button, { icon: icons_1.IconNames.SCATTER_PLOT }),
    React.createElement(core_1.Button, { icon: icons_1.IconNames.GRAPH })));

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
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mobx_1 = require("mobx");
class NavStore {
    constructor() {
        this.goTo = (inputRoute) => this.route = inputRoute;
        this.goToChartDrawer = (inputRoute) => this.chartDrawerRoute = inputRoute;
        this.route = 'home';
    }
    ;
}
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], NavStore.prototype, "route", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], NavStore.prototype, "chartDrawerRoute", void 0);
tslib_1.__decorate([
    mobx_1.action.bound,
    tslib_1.__metadata("design:type", Object)
], NavStore.prototype, "goTo", void 0);
tslib_1.__decorate([
    mobx_1.action.bound,
    tslib_1.__metadata("design:type", Object)
], NavStore.prototype, "goToChartDrawer", void 0);
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
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Object)
], ToggleOpenValue.prototype, "open", void 0);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Object)
], ToggleOpenValue.prototype, "openDrawer", void 0);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Object)
], ToggleOpenValue.prototype, "closeDrawer", void 0);
exports.ToggleOpenValue = ToggleOpenValue;
class TabValue {
    constructor() {
        this.tabValue = 0;
    }
    setTab(event, tabValue) { this.tabValue = tabValue; }
}
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Object)
], TabValue.prototype, "tabValue", void 0);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
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
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Object)
], UiStore.prototype, "title", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Object)
], UiStore.prototype, "themeId", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Object)
], UiStore.prototype, "themeDialogToggle", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Object)
], UiStore.prototype, "menuDrawerToggle", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Object)
], UiStore.prototype, "nodeDrawerToggle", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Object)
], UiStore.prototype, "nodeFormDrawerToggle", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Object)
], UiStore.prototype, "appBarSettingsMenuToggle", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Object)
], UiStore.prototype, "appTabs", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Object)
], UiStore.prototype, "isThemeDialogOpen", void 0);
tslib_1.__decorate([
    mobx_1.computed,
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [])
], UiStore.prototype, "muiTheme", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], UiStore.prototype, "updateTheme", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], UiStore.prototype, "openThemeDialog", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], UiStore.prototype, "closeThemeDialog", null);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", typeof (_a = typeof Error !== "undefined" && Error) === "function" && _a || Object)
], UiStore.prototype, "uiError", void 0);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Object)
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