(function(FuseBox){FuseBox.$fuse$=FuseBox;
FuseBox.target = "electron";
Object.assign(global.process.env, {"NODE_ENV":"development"})
FuseBox.pkg("default", {}, function(___scope___){
___scope___.file("client/index.jsx", function(exports, require, module, __filename, __dirname){
/* fuse:injection: */ var process = require("process");
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const React = require("react");
const ReactDOM = require("react-dom");
const app_1 = require("./app");
require("./index.styl");
process.on('uncaughtException', (error) => { console.error('[err-client]', error.message, error.stack); });
window.onerror = (message, filename, lineno, colno, error) => { console.error('[err-client]', message, filename, lineno, colno, error); return true; };
electron_1.webFrame.registerURLSchemeAsPrivileged('coglite');
electron_1.webFrame.setZoomLevel(1);
electron_1.webFrame.setZoomFactor(1);
electron_1.webFrame.setVisualZoomLevelLimits(1, 1);
electron_1.webFrame.setLayoutZoomLevelLimits(0, 0);
document.addEventListener("dragover", event => event.preventDefault());
document.addEventListener("drop", event => event.preventDefault());
ReactDOM.render(React.createElement(app_1.AppView, null), document.getElementById("coglite-app-root"));

});
___scope___.file("client/app.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const react_emotion_1 = require("react-emotion");
const theming_1 = require("theming");
const AppLayout_1 = require("./modules/layout/AppLayout");
const FormConfig_1 = require("./modules/notebook/Forms/FormConfig");
const Router_1 = require("./Router");
const stores_1 = require("./stores");
const NavStore_1 = require("./stores/NavStore");
const navStore = new NavStore_1.NavStore();
const stores = {
    nav: navStore,
    store: stores_1.cogStore,
    jsonFormsStore: FormConfig_1.setupStore()
};
let AppViewBase = class AppViewBase extends React.Component {
    render() {
        return (React.createElement(mobx_react_1.Provider, Object.assign({ store: stores }, stores),
            React.createElement(theming_1.ThemeProvider, { theme: stores.store.uiStore.combinedTheme },
                React.createElement("div", { style: { height: '100vh', width: '100vw' } },
                    React.createElement(AppLayout_1.AppLayout, null,
                        React.createElement(Router_1.AppRouter, null))))));
    }
};
AppViewBase = tslib_1.__decorate([
    mobx_react_1.observer
], AppViewBase);
exports.AppView = AppViewBase;
react_emotion_1.injectGlobal `
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

});
___scope___.file("client/modules/layout/AppLayout.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const dimensions_1 = require("./dimensions");
const Footer_1 = require("./Footer");
const IconNavigation_1 = require("./IconNavigation");
const Workspace_1 = require("./Workspace");
const CommandBar_1 = require("./CommandBar");
const ThemeChangeModal_1 = require("../../components/modals/ThemeChangeModal");
let AppLayout = class AppLayout extends React.Component {
    constructor() {
        super(...arguments);
        this.hasError = false;
        this.displayError = () => this.hasError = true;
        this.handleThemeDialogClose = (selectedOption, action) => {
            const uiStore = this.props.store.uiStore;
            if (action === "ok") {
                uiStore.updateTheme(selectedOption);
            }
            uiStore.themeDialogToggle.openDrawer(false);
        };
    }
    componentDidCatch(error, errorInfo) {
        this.displayError();
    }
    render() {
        const { children } = this.props;
        return (React.createElement(dimensions_1.FillFlex, null,
            React.createElement(dimensions_1.Row, null,
                React.createElement(dimensions_1.VerticalStretch, null,
                    React.createElement(CommandBar_1.CommandBar, null),
                    React.createElement(dimensions_1.VerticalStretch, null,
                        React.createElement(dimensions_1.Row, null,
                            React.createElement(IconNavigation_1.IconNavBar, null),
                            React.createElement(dimensions_1.Row, null,
                                React.createElement(Workspace_1.MiddlePanel, null, this.hasError ? (React.createElement(ErrorDisplay, null)) : (children)),
                                React.createElement("div", { style: { width: '0px' } }, "same as above. set width to 100px or something to see")))),
                    React.createElement(Footer_1.StatusFooter, null)),
                React.createElement("div", { style: { width: '0px' } }, "same as above. set width to 100px or something to see")),
            React.createElement(ThemeChangeModal_1.ThemeChangeModal, { style: { width: "80%", maxHeight: 435 }, open: this.props.store.uiStore.themeDialogToggle.open, onOptionDialogClose: this.handleThemeDialogClose, selectedOption: this.props.store.uiStore.themeId, options: ["myriad", "velocity", "ranger"], dialogOptions: { dialogTitle: "Choose Theme", cancelText: "Cancel", okText: "Update" } })));
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
    mobx_react_1.inject('nav', 'store'),
    mobx_react_1.observer
], AppLayout);
exports.AppLayout = AppLayout;
const ErrorDisplay = mobx_react_1.observer((props) => React.createElement("div", { style: { textAlign: 'center', paddingTop: 25, paddingBottom: 25 } },
    React.createElement("h1", null, "An unknown error occurred"),
    React.createElement("h1", null, props.error),
    React.createElement("h1", null, props.errorInfo)));

});
___scope___.file("client/modules/layout/dimensions.jsx", function(exports, require, module, __filename, __dirname){

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
exports.HorizontalStretch = styled_jss_1.default('div')({
    display: 'flex',
    flex: 'auto',
    flexDirection: 'row',
    justifyContent: 'stretch',
});
exports.CssClassWrapper = ({ children, className }) => (React.createElement("span", Object.assign({}, { className }), children));

});
___scope___.file("client/modules/layout/Footer.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const dimensions_1 = require("./dimensions");
const version = '0.0.1';
const copyrightString = '© Copyright Coglite 2018';
const theming_1 = require("theming");
const styled_jss_1 = require("styled-jss");
const FooterDimensions = theming_1.withTheme(styled_jss_1.default('div')(({ theme }) => ({
    border: "0px solid black",
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
exports.StatusFooter = mobx_react_1.observer((props) => (React.createElement(FooterDimensions, null,
    React.createElement(dimensions_1.HorizontalStretch, null,
        React.createElement("span", null, copyrightString),
        React.createElement("div", { style: { flex: 'auto' } }),
        React.createElement("span", null, `Version: ${version || 'pre-release'}`)))));

});
___scope___.file("client/modules/layout/IconNavigation.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const theming_1 = require("theming");
const styled_jss_1 = require("styled-jss");
const mobx_react_1 = require("mobx-react");
const core_1 = require("@material-ui/core");
const Dashboard_1 = require("@material-ui/icons/Dashboard");
exports.Link = mobx_react_1.inject('nav')(mobx_react_1.observer((props) => (React.createElement(core_1.IconButton, Object.assign({}, props, { onClick: () => props.nav.goTo(props.route), color: 'inherit' }), props.icon))));
const LeftNavStylesContainer = theming_1.withTheme(styled_jss_1.default('div')(({ theme }) => ({
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
    backgroundColor: 'white',
    color: theme.palette.primary.main
})));
exports.IconNavBar = theming_1.withTheme(mobx_react_1.observer((props) => (React.createElement(LeftNavStylesContainer, Object.assign({}, props),
    React.createElement(exports.Link, { icon: React.createElement(Dashboard_1.default, null), route: "dashboard" }),
    React.createElement(exports.Link, { icon: React.createElement(Dashboard_1.default, null), route: "notebook" }),
    React.createElement(exports.Link, { icon: React.createElement(Dashboard_1.default, null), route: "charts" }),
    React.createElement(exports.Link, { icon: React.createElement(Dashboard_1.default, null), route: "datasets" }),
    React.createElement(exports.Link, { icon: React.createElement(Dashboard_1.default, null), route: "cloud" }),
    React.createElement(exports.Link, { icon: React.createElement(Dashboard_1.default, null), route: "catalog" }),
    React.createElement(exports.Link, { icon: React.createElement(Dashboard_1.default, null), route: "settings" }),
    React.createElement(exports.Link, { icon: React.createElement(Dashboard_1.default, null), route: "about" })))));

});
___scope___.file("client/modules/layout/Workspace.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_jss_1 = require("styled-jss");
const mobx_react_1 = require("mobx-react");
const Container = styled_jss_1.default('div')({
    position: "relative",
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "0%",
    flexDirection: "column",
    width: "100%",
    margin: 1,
    overflow: 'hidden'
});
exports.MiddlePanel = mobx_react_1.observer((props) => React.createElement(Container, null, props.children));

});
___scope___.file("client/modules/layout/CommandBar.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ColorLens_1 = require("@material-ui/icons/ColorLens");
const Menu_1 = require("@material-ui/icons/Menu");
const IconButton_1 = require("@material-ui/core/IconButton");
const Toolbar_1 = require("@material-ui/core/Toolbar");
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const styled_jss_1 = require("styled-jss");
const theming_1 = require("theming");
const CommandBarDimensions = theming_1.withTheme(styled_jss_1.default('div')(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexDirection: "row",
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    flexWrap: "none",
    overflow: "hidden !important",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
})));
let CommandBar = class CommandBar extends React.Component {
    constructor() {
        super(...arguments);
        this.setTarget = event => { this.currentClickTarget = event.target; };
    }
    render() {
        const { menuDrawerToggle, themeDialogToggle } = this.props.store.uiStore;
        const _commandBar = (React.createElement(CommandBarDimensions, null,
            React.createElement(Toolbar_1.default, null,
                React.createElement(IconButton_1.default, { color: "inherit", "aria-label": "open drawer", onClick: e => { menuDrawerToggle.openDrawer(true); } },
                    React.createElement(Menu_1.default, null)),
                React.createElement("div", null,
                    React.createElement(IconButton_1.default, { onClick: () => themeDialogToggle.toggleDrawer(), color: "inherit" }, React.createElement(ColorLens_1.default, null))))));
        return _commandBar;
    }
};
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Object)
], CommandBar.prototype, "currentClickTarget", void 0);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Object)
], CommandBar.prototype, "setTarget", void 0);
CommandBar = tslib_1.__decorate([
    mobx_react_1.inject("store"),
    mobx_react_1.observer
], CommandBar);
exports.CommandBar = CommandBar;

});
___scope___.file("client/components/modals/ThemeChangeModal.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const core_1 = require("@material-ui/core");
class ThemeChangeModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedOption: "",
        };
        this.handleEntering = () => {
        };
        this.handleCancel = () => {
            this.props.onOptionDialogClose(this.props.selectedOption, "cancel");
        };
        this.handleOk = () => {
            this.props.onOptionDialogClose(this.state.selectedOption, "ok");
        };
        this.handleChange = (event, selectedOption) => {
            this.setState({ selectedOption });
        };
        this.state.selectedOption = this.props.selectedOption;
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedOption !== this.props.selectedOption) {
            this.setState({ selectedOption: nextProps.selectedOption });
        }
    }
    render() {
        const _a = this.props, { selectedOption, options, dialogOptions, open } = _a, other = tslib_1.__rest(_a, ["selectedOption", "options", "dialogOptions", "open"]);
        return (React.createElement(core_1.Dialog, Object.assign({ disableBackdropClick: true, disableEscapeKeyDown: true, maxWidth: "xs", onEntering: this.handleEntering, "aria-labelledby": "confirmation-dialog-title", open: open }, other),
            React.createElement(core_1.DialogTitle, { id: "confirmation-dialog-title" }, dialogOptions.dialogTitle),
            React.createElement(core_1.DialogContent, null,
                React.createElement(core_1.RadioGroup, { "aria-label": "ringtone", name: "ringtone", value: this.state.selectedOption, onChange: this.handleChange }, options.map(option => (React.createElement(core_1.FormControlLabel, { value: option, key: option, control: React.createElement(core_1.Radio, null), label: option }))))),
            React.createElement(core_1.DialogActions, null,
                React.createElement(core_1.Button, { onClick: this.handleCancel, color: "primary" }, dialogOptions.cancelText),
                React.createElement(core_1.Button, { onClick: this.handleOk, color: "primary" }, dialogOptions.okText))));
    }
}
ThemeChangeModal.defaultProps = {
    dialogOptions: {
        dialogTitle: "Coglite Dialog",
        cancelText: "Cancel",
        okText: "Ok",
    },
};
exports.ThemeChangeModal = ThemeChangeModal;

});
___scope___.file("client/modules/notebook/Forms/FormConfig.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RatingControl_1 = require("./RatingControl");
const ratingControlTester_1 = require("./ratingControlTester");
const forms_core_1 = require("../forms-core");
exports.schema = {
    cogliteInput: {
        title: "Input Value",
        type: "object",
        properties: {
            inject: {
                type: "string",
            },
        },
        required: ["inject"],
    },
    cogliteFunctionMath: {
        title: "Math Function",
        type: "object",
        properties: {
            operator: {
                type: "string",
                label: "Operator",
                enum: ["Add", "Subtract", "Divide", "Multiply"],
            },
            operand: {
                type: "string",
            },
        },
    },
    cogliteDebug: {
        title: "Debug",
        type: "object",
        properties: {
            "selectable": {
                "type": "boolean"
            },
            output: {
                type: "string"
            },
        },
    },
};
exports.uischema = {
    cogliteInput: {
        type: "Group",
        label: "Input Value",
        elements: [
            {
                type: "VerticalLayout",
                elements: [
                    {
                        type: "Control",
                        scope: "#/properties/inject",
                    },
                ],
            },
        ],
    },
    cogliteFunctionMath: {
        type: "Group",
        label: "Math Function",
        elements: [
            {
                type: "VerticalLayout",
                elements: [
                    {
                        type: "Control",
                        scope: "#/properties/operator",
                    },
                    {
                        type: "Control",
                        scope: "#/properties/operand",
                    },
                ],
            },
        ],
    },
    cogliteDebug: {
        type: "Group",
        label: "Debug",
        elements: [
            {
                type: "VerticalLayout",
                elements: [
                    {
                        "type": "Control",
                        "label": false,
                        "scope": "#/properties/selectable"
                    },
                    {
                        type: "Control",
                        scope: "#/properties/output",
                        "rule": {
                            "effect": "DISABLE",
                            "condition": {
                                "type": "LEAF",
                                "scope": "#/properties/selectable",
                                "expectedValue": true
                            }
                        }
                    },
                ],
            },
        ],
    },
};
exports.data = {};
exports.setupStore = () => {
    const jsonFormsSetStore = forms_core_1.initializeStore();
    forms_core_1.setData(exports.data, jsonFormsSetStore);
    forms_core_1.setFields(forms_core_1.materialFields, jsonFormsSetStore);
    forms_core_1.setRenderers(forms_core_1.materialRenderers, jsonFormsSetStore);
    forms_core_1.registerRenderer(ratingControlTester_1.default, RatingControl_1.default, jsonFormsSetStore);
    return jsonFormsSetStore;
};

});
___scope___.file("client/modules/notebook/Forms/RatingControl.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const forms_core_1 = require("../forms-core");
const forms_core_2 = require("../forms-core");
const Rating_1 = require("./Rating");
const mobx_react_1 = require("mobx-react");
const RatingControl = ({ data, handleChange, path }) => (React.createElement(Rating_1.Rating, { value: data, onClick: ev => handleChange(path, Number(ev.value)) }));
exports.default = mobx_react_1.inject("jsonFormsStore")(mobx_react_1.observer(class extends React.Component {
    render() {
        const effectiveProps = forms_core_2.createPropsForItem(this.props, forms_core_1.mapStoreValuesToControlProps, forms_core_1.mapUpdateActionToControlProps);
        return (React.createElement(RatingControl, Object.assign({}, effectiveProps)));
    }
}));

});
___scope___.file("client/modules/notebook/forms-core/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./core"), exports);
tslib_1.__exportStar(require("./material"), exports);
tslib_1.__exportStar(require("./react"), exports);

});
___scope___.file("client/modules/notebook/forms-core/core/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./generators"), exports);
tslib_1.__exportStar(require("./models/jsonSchema"), exports);
tslib_1.__exportStar(require("./models/uischema"), exports);
tslib_1.__exportStar(require("./store"), exports);
tslib_1.__exportStar(require("./stores"), exports);
tslib_1.__exportStar(require("./testers"), exports);
tslib_1.__exportStar(require("./util"), exports);
const Test = require("./testers");
exports.Test = Test;
const util_1 = require("./util");
const Helpers = {
    createLabelDescriptionFrom: util_1.createLabelDescriptionFrom,
    convertToValidClassName: util_1.convertToValidClassName
};
exports.Helpers = Helpers;

});
___scope___.file("client/modules/notebook/forms-core/core/generators/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
exports.generateJsonSchema = schema_1.generateJsonSchema;
const uischema_1 = require("./uischema");
exports.generateDefaultUISchema = uischema_1.generateDefaultUISchema;
const Generate = {
    jsonSchema: schema_1.generateJsonSchema,
    uiSchema: uischema_1.generateDefaultUISchema,
};
exports.Generate = Generate;
exports.default = Generate;

});
___scope___.file("client/modules/notebook/forms-core/core/generators/schema.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ADDITIONAL_PROPERTIES = 'additionalProperties';
const REQUIRED_PROPERTIES = 'required';
const distinct = (array, discriminator) => {
    const known = {};
    return array.filter(item => {
        const discriminatorValue = discriminator(item);
        if (known.hasOwnProperty(discriminatorValue)) {
            return false;
        }
        else {
            known[discriminatorValue] = true;
            return true;
        }
    });
};
class Gen {
    constructor(findOption) {
        this.findOption = findOption;
        this.schemaObject = (data) => {
            const props = this.properties(data);
            const schema = {
                'type': 'object',
                'properties': props,
                'additionalProperties': this.findOption(props)(ADDITIONAL_PROPERTIES)
            };
            const required = this.findOption(props)(REQUIRED_PROPERTIES);
            if (required.length > 0) {
                schema.required = required;
            }
            return schema;
        };
        this.properties = (data) => {
            const emptyProps = {};
            return Object
                .keys(data)
                .reduce((acc, propName) => {
                acc[propName] = this.property(data[propName]);
                return acc;
            }, emptyProps);
        };
        this.property = (data) => {
            switch (typeof data) {
                case 'string':
                    return { 'type': 'string' };
                case 'boolean':
                    return { 'type': 'boolean' };
                case 'number':
                    if (Number.isInteger(data)) {
                        return { 'type': 'integer' };
                    }
                    return { 'type': 'number' };
                case 'object':
                    if (data == null) {
                        return { 'type': 'null' };
                    }
                    return this.schemaObjectOrArray(data);
                default:
                    return {};
            }
        };
        this.schemaObjectOrArray = (data) => {
            if (data instanceof Array) {
                return this.schemaArray(data);
            }
            else {
                return this.schemaObject(data);
            }
        };
        this.schemaArray = (data) => {
            if (data.length > 0) {
                const allProperties = data.map(this.property);
                const uniqueProperties = distinct(allProperties, prop => JSON.stringify(prop));
                if (uniqueProperties.length === 1) {
                    return {
                        'type': 'array',
                        'items': uniqueProperties[0]
                    };
                }
                else {
                    return {
                        'type': 'array',
                        'items': {
                            'oneOf': uniqueProperties
                        }
                    };
                }
            }
            else {
                return {
                    'type': 'array',
                    'items': {}
                };
            }
        };
    }
}
exports.generateJsonSchema = (instance, options = {}) => {
    const findOption = (props) => (optionName) => {
        switch (optionName) {
            case ADDITIONAL_PROPERTIES:
                if (options.hasOwnProperty(ADDITIONAL_PROPERTIES)) {
                    return options[ADDITIONAL_PROPERTIES];
                }
                return true;
            case REQUIRED_PROPERTIES:
                if (options.hasOwnProperty(REQUIRED_PROPERTIES)) {
                    return options[REQUIRED_PROPERTIES](props);
                }
                return Object.keys(props);
            default:
                return;
        }
    };
    const gen = new Gen(findOption);
    return gen.schemaObject(instance);
};

});
___scope___.file("client/modules/notebook/forms-core/core/generators/uischema.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const createLayout = (layoutType) => ({
    type: layoutType,
    elements: []
});
const deriveType = (jsonSchema) => {
    if (!_.isEmpty(jsonSchema) &&
        !_.isEmpty(jsonSchema.type) &&
        typeof jsonSchema.type === 'string') {
        return jsonSchema.type;
    }
    if (!_.isEmpty(jsonSchema) &&
        (!_.isEmpty(jsonSchema.properties) || !_.isEmpty(jsonSchema.additionalProperties))) {
        return 'object';
    }
    if (!_.isEmpty(jsonSchema) && !_.isEmpty(jsonSchema.items)) {
        return 'array';
    }
    return 'null';
};
const createControlElement = (label, ref) => ({
    type: 'Control',
    label: label,
    scope: ref,
});
const isLayout = (uischema) => uischema.elements !== undefined;
const wrapInLayoutIfNecessary = (uischema, layoutType) => {
    if (!_.isEmpty(uischema) && !isLayout(uischema)) {
        const verticalLayout = createLayout(layoutType);
        verticalLayout.elements.push(uischema);
        return verticalLayout;
    }
    return uischema;
};
const addLabel = (layout, labelName) => {
    if (!_.isEmpty(labelName)) {
        const label = {
            type: 'Label',
            text: _.startCase(labelName)
        };
        layout.elements.push(label);
    }
};
const generateUISchema = (jsonSchema, schemaElements, currentRef, schemaName, layoutType) => {
    const type = deriveType(jsonSchema);
    switch (type) {
        case 'object':
            const layout = createLayout(layoutType);
            schemaElements.push(layout);
            addLabel(layout, schemaName);
            if (!_.isEmpty(jsonSchema.properties)) {
                const nextRef = currentRef + '/properties';
                Object.keys(jsonSchema.properties).map(propName => {
                    const value = jsonSchema.properties[propName];
                    generateUISchema(value, layout.elements, `${nextRef}/${propName}`, propName, layoutType);
                });
            }
            return layout;
        case 'array':
        case 'string':
        case 'number':
        case 'integer':
        case 'boolean':
            const controlObject = createControlElement(_.startCase(schemaName), currentRef);
            schemaElements.push(controlObject);
            return controlObject;
        case 'null':
            return null;
        default:
            throw new Error('Unknown type: ' + JSON.stringify(jsonSchema));
    }
};
exports.generateDefaultUISchema = (jsonSchema, layoutType = 'VerticalLayout', prefix = '#') => wrapInLayoutIfNecessary(generateUISchema(jsonSchema, [], prefix, '', layoutType), layoutType);

});
___scope___.file("client/modules/notebook/forms-core/core/models/jsonSchema.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

});
___scope___.file("client/modules/notebook/forms-core/core/models/uischema.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RuleEffect;
(function (RuleEffect) {
    RuleEffect["HIDE"] = "HIDE";
    RuleEffect["SHOW"] = "SHOW";
    RuleEffect["ENABLE"] = "ENABLE";
    RuleEffect["DISABLE"] = "DISABLE";
})(RuleEffect = exports.RuleEffect || (exports.RuleEffect = {}));

});
___scope___.file("client/modules/notebook/forms-core/core/store.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

});
___scope___.file("client/modules/notebook/forms-core/core/stores/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

});
___scope___.file("client/modules/notebook/forms-core/core/testers/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const resolvers_1 = require("../util/resolvers");
exports.NOT_APPLICABLE = -1;
exports.isControl = (uischema) => !_.isEmpty(uischema) && uischema.scope !== undefined && uischema.scope !== undefined;
exports.schemaMatches = (predicate) => (uischema, schema) => {
    if (_.isEmpty(uischema) || !exports.isControl(uischema)) {
        return false;
    }
    const schemaPath = uischema.scope;
    if (_.isEmpty(schemaPath)) {
        return false;
    }
    let currentDataSchema = resolvers_1.resolveSchema(schema, schemaPath);
    while (!_.isEmpty(currentDataSchema) && !_.isEmpty(currentDataSchema.$ref)) {
        currentDataSchema = resolvers_1.resolveSchema(schema, currentDataSchema.$ref);
    }
    if (currentDataSchema === undefined) {
        return false;
    }
    return predicate(currentDataSchema);
};
exports.schemaSubPathMatches = (subPath, predicate) => (uischema, schema) => {
    if (_.isEmpty(uischema) || !exports.isControl(uischema)) {
        return false;
    }
    const schemaPath = uischema.scope;
    if (_.isEmpty(schemaPath)) {
        return false;
    }
    let currentDataSchema = resolvers_1.resolveSchema(schema, `${schemaPath}/${subPath}`);
    while (!_.isEmpty(currentDataSchema.$ref)) {
        currentDataSchema = resolvers_1.resolveSchema(schema, currentDataSchema.$ref);
    }
    if (currentDataSchema === undefined) {
        return false;
    }
    return predicate(currentDataSchema);
};
exports.schemaTypeIs = (expectedType) => exports.schemaMatches(schema => !_.isEmpty(schema) && schema.type === expectedType);
exports.formatIs = (expectedFormat) => exports.schemaMatches(schema => !_.isEmpty(schema)
    && schema.format === expectedFormat
    && schema.type === 'string');
exports.uiTypeIs = (expected) => (uischema) => !_.isEmpty(uischema) && uischema.type === expected;
exports.optionIs = (optionName, optionValue) => (uischema) => {
    const options = uischema.options;
    return !_.isEmpty(options) && options[optionName] === optionValue;
};
exports.scopeEndsWith = (expected) => (uischema) => {
    if (_.isEmpty(expected) || !exports.isControl(uischema)) {
        return false;
    }
    return _.endsWith(uischema.scope, expected);
};
exports.scopeEndIs = (expected) => (uischema) => {
    if (_.isEmpty(expected) || !exports.isControl(uischema)) {
        return false;
    }
    const schemaPath = uischema.scope;
    return !_.isEmpty(schemaPath) && _.last(schemaPath.split('/')) === expected;
};
exports.and = (...testers) => (uischema, schema) => testers.reduce((acc, tester) => acc && tester(uischema, schema), true);
exports.or = (...testers) => (uischema, schema) => testers.reduce((acc, tester) => acc || tester(uischema, schema), false);
exports.rankWith = (rank, tester) => (uischema, schema) => {
    if (tester(uischema, schema)) {
        return rank;
    }
    return exports.NOT_APPLICABLE;
};
exports.withIncreasedRank = (by, rankedTester) => (uischema, schema) => {
    const rank = rankedTester(uischema, schema);
    if (rank === exports.NOT_APPLICABLE) {
        return exports.NOT_APPLICABLE;
    }
    return rank + by;
};
exports.isBooleanControl = exports.and(exports.uiTypeIs('Control'), exports.schemaTypeIs('boolean'));
exports.isDateControl = exports.and(exports.uiTypeIs('Control'), exports.formatIs('date'));
exports.isEnumControl = exports.and(exports.uiTypeIs('Control'), exports.schemaMatches(schema => schema.hasOwnProperty('enum')));
exports.isIntegerControl = exports.and(exports.uiTypeIs('Control'), exports.schemaTypeIs('integer'));
exports.isNumberControl = exports.and(exports.uiTypeIs('Control'), exports.schemaTypeIs('number'));
exports.isStringControl = exports.and(exports.uiTypeIs('Control'), exports.schemaTypeIs('string'));
exports.isMultiLineControl = exports.and(exports.uiTypeIs('Control'), exports.optionIs('multi', true));
exports.isTimeControl = exports.and(exports.uiTypeIs('Control'), exports.formatIs('time'));
exports.isDateTimeControl = exports.and(exports.uiTypeIs('Control'), exports.formatIs('date-time'));
exports.isArrayObjectControl = exports.and(exports.uiTypeIs('Control'), exports.schemaMatches(schema => !_.isEmpty(schema)
    && schema.type === 'array'
    && !_.isEmpty(schema.items)
    && !Array.isArray(schema.items)), exports.schemaSubPathMatches('items', schema => schema.type === 'object'));
exports.isRangeControl = exports.and(exports.uiTypeIs('Control'), exports.or(exports.schemaTypeIs('number'), exports.schemaTypeIs('integer')), exports.schemaMatches(schema => schema.hasOwnProperty('maximum') &&
    schema.hasOwnProperty('minimum') &&
    schema.hasOwnProperty('default')));
exports.isNumberFormatControl = exports.and(exports.uiTypeIs('Control'), exports.schemaTypeIs('integer'), exports.optionIs('format', true));

});
___scope___.file("client/modules/notebook/forms-core/core/util/resolvers.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const isObject = (schema) => {
    return schema.properties !== undefined;
};
const isArray = (schema) => {
    return schema.type === 'array' && schema.items !== undefined;
};
exports.resolveData = (instance, dataPath) => {
    const dataPathSegments = dataPath.split('.');
    if (_.isEmpty(dataPath)) {
        return instance;
    }
    return dataPathSegments
        .map(segment => decodeURIComponent(segment))
        .reduce((curInstance, decodedSegment) => {
        if (curInstance === undefined || !curInstance.hasOwnProperty(decodedSegment)) {
            return undefined;
        }
        return curInstance[decodedSegment];
    }, instance);
};
exports.findAllRefs = (schema, result = {}, resolveTuples = false) => {
    if (isObject(schema)) {
        Object.keys(schema.properties).forEach(key => exports.findAllRefs(schema.properties[key], result));
    }
    if (isArray(schema)) {
        if (Array.isArray(schema.items)) {
            if (resolveTuples) {
                schema.items.forEach(child => exports.findAllRefs(child, result));
            }
        }
        else {
            exports.findAllRefs(schema.items, result);
        }
    }
    if (Array.isArray(schema.anyOf)) {
        schema.anyOf.forEach(child => exports.findAllRefs(child, result));
    }
    if (schema.$ref !== undefined) {
        result[schema.$ref] = schema;
    }
    if (schema['links'] !== undefined) {
        schema['links'].forEach(link => {
            if (!_.isEmpty(link.targetSchema.$ref)) {
                result[link.targetSchema.$ref] = schema;
            }
            else {
                exports.findAllRefs(link.targetSchema, result);
            }
        });
    }
    return result;
};
exports.resolveSchema = (schema, schemaPath) => {
    if (_.isEmpty(schema)) {
        return undefined;
    }
    const validPathSegments = schemaPath.split('/');
    const invalidSegment = pathSegment => pathSegment === '#' || pathSegment === undefined || pathSegment === '';
    const resultSchema = validPathSegments.reduce((curSchema, pathSegment) => invalidSegment(pathSegment) ? curSchema : curSchema[pathSegment], schema);
    if (resultSchema !== undefined && resultSchema.$ref !== undefined) {
        return retrieveResolvableSchema(schema, resultSchema.$ref);
    }
    return resultSchema;
};
function retrieveResolvableSchema(full, reference) {
    const child = exports.resolveSchema(full, reference);
    const allRefs = exports.findAllRefs(child);
    const innerSelfReference = allRefs[reference];
    if (innerSelfReference !== undefined) {
        innerSelfReference.$ref = '#';
    }
    return child;
}

});
___scope___.file("client/modules/notebook/forms-core/core/util/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const resolvers_1 = require("./resolvers");
const path_1 = require("./path");
exports.composePaths = path_1.compose;
exports.composeWithUi = path_1.composeWithUi;
exports.toDataPath = path_1.toDataPath;
const runtime_1 = require("./runtime");
exports.isEnabled = runtime_1.isEnabled;
exports.isVisible = runtime_1.isVisible;
var label_1 = require("./label");
exports.createLabelDescriptionFrom = label_1.createLabelDescriptionFrom;
exports.convertToValidClassName = (s) => s.replace('#', 'root')
    .replace(new RegExp('/', 'g'), '_');
exports.formatErrorMessage = errors => {
    if (errors === undefined || errors === null) {
        return '';
    }
    return errors.join('\n');
};
const Resolve = {
    schema: resolvers_1.resolveSchema,
    data: resolvers_1.resolveData
};
exports.Resolve = Resolve;
var resolvers_2 = require("./resolvers");
exports.resolveData = resolvers_2.resolveData;
exports.resolveSchema = resolvers_2.resolveSchema;
const fromScopable = (scopable) => path_1.toDataPathSegments(scopable.scope).join('.');
const Paths = {
    compose: path_1.compose,
    fromScopable
};
exports.Paths = Paths;
const Runtime = {
    isEnabled: runtime_1.isEnabled,
    isVisible: runtime_1.isVisible
};
exports.Runtime = Runtime;
const getErrorAt = (instancePath, store) => {
    return store.coreStore.errorAt(instancePath);
};
exports.getErrorAt = getErrorAt;
const getPropsTransformers = (store) => store.transformPropsStore.transformers;
exports.getPropsTransformers = getPropsTransformers;
const getSubErrorsAt = (instancePath, store) => {
    return store.coreStore.errorAt(instancePath);
};
exports.getSubErrorsAt = getSubErrorsAt;
tslib_1.__exportStar(require("./renderer"), exports);
tslib_1.__exportStar(require("./field"), exports);
tslib_1.__exportStar(require("./runtime"), exports);
tslib_1.__exportStar(require("./Formatted"), exports);
tslib_1.__exportStar(require("./storeUtil"), exports);

});
___scope___.file("client/modules/notebook/forms-core/core/util/path.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
exports.compose = (path1, path2) => {
    let p1 = path1;
    if (!_.isEmpty(path1) && !_.isEmpty(path2) && !path2.startsWith('[')) {
        p1 = path1 + '.';
    }
    if (_.isEmpty(p1)) {
        return path2;
    }
    else if (_.isEmpty(path2)) {
        return p1;
    }
    else {
        return `${p1}${path2}`;
    }
};
exports.toDataPathSegments = (schemaPath) => {
    const segments = schemaPath.split('/');
    const startFromRoot = segments[0] === '#' || segments[0] === '';
    const startIndex = startFromRoot ? 2 : 1;
    return _.range(startIndex, segments.length, 2).map(idx => segments[idx]);
};
exports.toDataPath = (schemaPath) => {
    return exports.toDataPathSegments(schemaPath).join('.');
};
exports.composeWithUi = (scopableUi, path) => {
    const segments = exports.toDataPathSegments(scopableUi.scope);
    if (_.isEmpty(segments) && path === undefined) {
        return '';
    }
    return _.isEmpty(segments) ? path : exports.compose(path, segments.join('.'));
};

});
___scope___.file("client/modules/notebook/forms-core/core/util/runtime.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const uischema_1 = require("../models/uischema");
const path_1 = require("./path");
const resolvers_1 = require("./resolvers");
exports.evalVisibility = (uischema, data) => {
    if (!_.has(uischema, 'rule.condition')) {
        return true;
    }
    const condition = uischema.rule.condition;
    const value = resolvers_1.resolveData(data, path_1.toDataPath(condition.scope));
    const equals = value === condition.expectedValue;
    switch (uischema.rule.effect) {
        case uischema_1.RuleEffect.HIDE: return !equals;
        case uischema_1.RuleEffect.SHOW: return equals;
        default:
            return true;
    }
};
exports.evalEnablement = (uischema, data) => {
    if (!_.has(uischema, 'rule.condition')) {
        return true;
    }
    const condition = uischema.rule.condition;
    const value = resolvers_1.resolveData(data, path_1.toDataPath(condition.scope));
    const equals = value === condition.expectedValue;
    switch (uischema.rule.effect) {
        case uischema_1.RuleEffect.DISABLE: return !equals;
        case uischema_1.RuleEffect.ENABLE: return equals;
        default:
            return true;
    }
};
exports.isVisible = (props, store) => {
    if (props.uischema.rule) {
        return exports.evalVisibility(props.uischema, store.coreStore.extractData);
    }
    return true;
};
exports.isEnabled = (props, store) => {
    if (props.uischema.rule) {
        return exports.evalEnablement(props.uischema, store.coreStore.extractData);
    }
    return true;
};

});
___scope___.file("client/modules/notebook/forms-core/core/util/label.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const deriveLabel = (controlElement) => {
    if (controlElement.scope !== undefined) {
        const ref = controlElement.scope;
        const label = ref.substr(ref.lastIndexOf('/') + 1);
        return _.startCase(label);
    }
    return '';
};
exports.createLabelDescriptionFrom = (withLabel) => {
    const labelProperty = withLabel.label;
    const derivedLabel = deriveLabel(withLabel);
    if (typeof labelProperty === 'boolean') {
        if (labelProperty) {
            return {
                text: derivedLabel,
                show: labelProperty
            };
        }
        else {
            return {
                text: derivedLabel,
                show: labelProperty
            };
        }
    }
    else if (typeof labelProperty === 'string') {
        return {
            text: labelProperty,
            show: true
        };
    }
    else if (typeof labelProperty === 'object') {
        const show = labelProperty.hasOwnProperty('show') ? labelProperty.show : true;
        const label = labelProperty.hasOwnProperty('text') ?
            labelProperty.text : derivedLabel;
        return {
            text: label,
            show
        };
    }
    else {
        return {
            text: derivedLabel,
            show: true
        };
    }
};

});
___scope___.file("client/modules/notebook/forms-core/core/util/renderer.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _ = require("lodash");
const __1 = require("../");
const util_1 = require("../util");
const storeUtil_1 = require("../util/storeUtil");
exports.isPlainLabel = (label) => {
    return typeof label === 'string';
};
exports.mapStoreValuesToRendererProps = (store, ownProps) => ({
    renderers: store.rendererStore.renderers || [],
    schema: ownProps.schema || store.coreStore.extractSchema,
    uischema: ownProps.uischema || store.coreStore.extractUiSchema,
    path: ownProps.path
});
exports.mapStoreValuesToLayoutProps = (store, ownProps) => {
    const visible = _.has(ownProps, 'visible') ? ownProps.visible : util_1.isVisible(ownProps, store);
    return {
        renderers: store.rendererStore.renderers,
        visible,
        path: ownProps.path,
        uischema: ownProps.uischema,
        schema: ownProps.schema
    };
};
const isRequired = (schema, schemaPath) => {
    const pathSegments = schemaPath.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    const nextHigherSchemaSegments = pathSegments.slice(0, pathSegments.length - 2);
    const nextHigherSchemaPath = nextHigherSchemaSegments.join('/');
    const nextHigherSchema = util_1.Resolve.schema(schema, nextHigherSchemaPath);
    return nextHigherSchema !== undefined
        && nextHigherSchema.required !== undefined
        && nextHigherSchema.required.indexOf(lastSegment) !== -1;
};
exports.computeLabel = (label, required) => {
    return required ? label + '*' : label;
};
exports.isDescriptionHidden = (visible, description, isFocused) => {
    return description === undefined ||
        (description !== undefined && !visible) ||
        !isFocused;
};
exports.mapStoreValuesToControlProps = (store, ownProps) => {
    const path = util_1.composeWithUi(ownProps.uischema, ownProps.path);
    const visible = _.has(ownProps, 'visible') ? ownProps.visible : util_1.isVisible(ownProps, store);
    const enabled = _.has(ownProps, 'enabled') ? ownProps.enabled : util_1.isEnabled(ownProps, store);
    const labelDesc = util_1.createLabelDescriptionFrom(ownProps.uischema);
    const label = labelDesc.show ? labelDesc.text : '';
    const errors = __1.getErrorAt(path, store).map(error => error.message);
    const controlElement = ownProps.uischema;
    const id = controlElement.scope || '';
    const required = controlElement.scope !== undefined && isRequired(ownProps.schema, controlElement.scope);
    const resolvedSchema = util_1.Resolve.schema(ownProps.schema, controlElement.scope);
    const description = resolvedSchema !== undefined ? resolvedSchema.description : '';
    const defaultConfig = _.cloneDeep(store.configStore.config);
    const config = _.merge(defaultConfig, controlElement.options);
    return {
        data: util_1.Resolve.data(store.coreStore.extractData, path),
        description,
        errors,
        label,
        visible,
        enabled,
        id,
        path,
        parentPath: ownProps.path,
        required,
        scopedSchema: resolvedSchema,
        uischema: ownProps.uischema,
        schema: ownProps.schema,
        config
    };
};
exports.mapUpdateActionToControlProps = (jsonFormsStore) => ({
    handleChange(path, value) {
        storeUtil_1.updateStore(path, () => value, jsonFormsStore);
    }
});
exports.mapStoreValuesToTableControlProps = (store, ownProps) => {
    const _a = exports.mapStoreValuesToControlProps(store, ownProps), { path } = _a, props = tslib_1.__rest(_a, ["path"]);
    const controlElement = ownProps.uischema;
    const resolvedSchema = util_1.Resolve.schema(ownProps.schema, controlElement.scope + '/items');
    const childErrors = __1.getSubErrorsAt(path, store);
    return Object.assign({}, props, { scopedSchema: resolvedSchema, path,
        childErrors });
};
exports.mapUpdateActionToTableControlProps = (jsonFormsStore) => ({
    addItem: (path) => () => {
        storeUtil_1.updateStore(path, array => {
            if (array === undefined || array === null) {
                return [{}];
            }
            array.push({});
            return array;
        }, jsonFormsStore);
    },
    removeItems: (path, toDelete) => () => {
        storeUtil_1.updateStore(path, array => {
            const clone = _.clone(array);
            toDelete.forEach(s => clone.splice(clone.indexOf(s), 1));
            return clone;
        }, jsonFormsStore);
    }
});

});
___scope___.file("client/modules/notebook/forms-core/core/util/storeUtil.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generators_1 = require("../generators");
const renderers_store_1 = require("../stores/renderers.store");
const fields_store_1 = require("../stores/fields.store");
const config_store_1 = require("../stores/config.store");
const core_store_1 = require("../stores/core.store");
const transformProps_store_1 = require("../stores/transformProps.store");
exports.initializeStore = () => {
    const jsonFormsStore = {
        rendererStore: new renderers_store_1.RendererStore(),
        fieldStore: new fields_store_1.FieldStore(),
        coreStore: new core_store_1.CoreStore(),
        configStore: new config_store_1.ConfigStore(),
        transformPropsStore: new transformProps_store_1.TransformPropsStore()
    };
    return jsonFormsStore;
};
exports.activateStore = (data, schema = generators_1.generateJsonSchema(data), uischema = generators_1.generateDefaultUISchema(schema), jsonFormsStore = exports.initializeStore()) => {
    jsonFormsStore.coreStore.initialize(data, schema, uischema);
    return jsonFormsStore;
};
exports.setData = (data, jsonFormsStore) => {
    jsonFormsStore.coreStore.setData(data);
    return jsonFormsStore;
};
exports.updateStore = (path, updater, jsonFormsStore) => {
    jsonFormsStore.coreStore.updateData(path, updater);
    return jsonFormsStore;
};
exports.setRenderers = (renderers, jsonFormsStore) => {
    jsonFormsStore.rendererStore.setRenderers(renderers);
    return jsonFormsStore;
};
exports.registerRenderer = (tester, renderer, jsonFormsStore) => {
    jsonFormsStore.rendererStore.addRenderer(tester, renderer);
    return jsonFormsStore;
};
exports.setFields = (fields, jsonFormsStore) => {
    jsonFormsStore.fieldStore.setFields(fields);
    return jsonFormsStore;
};
exports.registerField = (tester, field, jsonFormsStore) => {
    jsonFormsStore.fieldStore.addField(tester, field);
    return jsonFormsStore;
};
exports.unregisterField = (tester, jsonFormsStore) => {
    jsonFormsStore.fieldStore.removeField(tester);
    return jsonFormsStore;
};
exports.unregisterRenderer = (tester, jsonFormsStore) => {
    jsonFormsStore.rendererStore.removeRenderer(tester);
    return jsonFormsStore;
};
exports.setConfig = (config, jsonFormsStore) => {
    jsonFormsStore.configStore.setConfiguration(config);
    return jsonFormsStore;
};

});
___scope___.file("client/modules/notebook/forms-core/core/stores/renderers.store.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mobx_1 = require("mobx");
class RendererStore {
    constructor() {
        this.setRenderers = (renderers) => {
            this.renderers = renderers;
        };
        this.addRenderer = (tester, renderer) => {
            this.renderers = this.renderers.concat([{ tester, renderer }]);
        };
        this.removeRenderer = (tester) => {
            this.renderers = this.renderers.filter(t => t.tester !== tester);
        };
        this.renderers = [];
    }
}
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Array)
], RendererStore.prototype, "renderers", void 0);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Object)
], RendererStore.prototype, "setRenderers", void 0);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Object)
], RendererStore.prototype, "addRenderer", void 0);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Object)
], RendererStore.prototype, "removeRenderer", void 0);
exports.RendererStore = RendererStore;

});
___scope___.file("client/modules/notebook/forms-core/core/stores/fields.store.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mobx_1 = require("mobx");
class FieldStore {
    constructor() {
        this.setFields = (fields) => {
            this.fields = fields;
        };
        this.addField = (tester, field) => {
            this.fields = this.fields.concat([{ tester, field }]);
        };
        this.removeField = (tester) => {
            this.fields = this.fields.filter(t => t.tester !== tester);
        };
        this.fields = [];
    }
}
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Array)
], FieldStore.prototype, "fields", void 0);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Object)
], FieldStore.prototype, "setFields", void 0);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Object)
], FieldStore.prototype, "addField", void 0);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Object)
], FieldStore.prototype, "removeField", void 0);
exports.FieldStore = FieldStore;

});
___scope___.file("client/modules/notebook/forms-core/core/stores/config.store.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _ = require("lodash");
const configDefault_1 = require("../configDefault");
const mobx_1 = require("mobx");
class ConfigStore {
    constructor() {
        this.setConfiguration = (config) => {
            this.config = this.applyDefaultConfiguration(config);
        };
        this.config = this.applyDefaultConfiguration();
    }
    applyDefaultConfiguration(config = {}) {
        _.merge(configDefault_1.configDefault, config);
    }
}
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Object)
], ConfigStore.prototype, "config", void 0);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Object)
], ConfigStore.prototype, "setConfiguration", void 0);
exports.ConfigStore = ConfigStore;

});
___scope___.file("client/modules/notebook/forms-core/core/configDefault.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configDefault = {
    restrict: false,
    trim: false
};

});
___scope___.file("client/modules/notebook/forms-core/core/stores/core.store.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var _a;
const _ = require("lodash");
var AJV = require('ajv');
const ajv_1 = require("ajv");
const mobx_1 = require("mobx");
class CoreStore {
    constructor() {
        this.ajv = new AJV({ allErrors: true, jsonPointers: true, errorDataPath: 'property' });
        this.errorAt = (instancePath) => {
            return _.filter(this.errors, (error) => error.dataPath === instancePath);
        };
        this.subErrorsAt = (instancePath) => {
            const path = `${instancePath}.`;
            return _.filter(this.errors, (error) => error.dataPath.startsWith(path));
        };
        this.setData = (data) => {
            this.data = data;
        };
        this.initialize = (data, schema, uischema) => {
            debugger;
            this.data = data;
            this.schema = schema;
            this.uischema = uischema;
            this.validator = this.ajv.compile(schema);
            this.errors = this.sanitizeErrors(this.validator, data);
        };
        this.updateData = (path, updater) => {
            debugger;
            if (path === undefined || path === null) {
            }
            else if (path === '') {
                const result = updater(this.data);
                if (result === undefined || result === null) {
                }
                const sanitizedErrors = this.sanitizeErrors(this.validator, result);
                this.data = result;
                this.errors = sanitizedErrors;
            }
            else {
                const oldData = _.get(this.data, path);
                const newData = updater(oldData);
                const newState = _.set(_.cloneDeep(this.data), path, newData);
                const sanitizedErrors = this.sanitizeErrors(this.validator, newState);
                this.data = newState;
                this.errors = sanitizedErrors;
            }
        };
        this.data = {};
        this.schema = {};
        this.uischema = {};
        this.errors = [];
        this.validator = () => true;
        this.init();
    }
    init() {
        this.ajv.addFormat('time', '^([0-1][0-9]|2[0-3]):[0-5][0-9]$');
    }
    validate(validator, data) {
        const valid = validator(data);
        if (valid) {
            return [];
        }
        return validator.errors;
    }
    ;
    sanitizeErrors(validator, data) {
        let sanitizedErrors = [];
        sanitizedErrors = this.validate(validator, data).map(error => {
            error.dataPath = error.dataPath.replace(/\//g, '.').substr(1);
            return error;
        });
        return sanitizedErrors;
    }
    get extractData() {
        return this.data;
    }
    get extractSchema() {
        return this.schema;
    }
    get extractUiSchema() {
        return this.uischema;
    }
}
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Object)
], CoreStore.prototype, "data", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Object)
], CoreStore.prototype, "schema", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Object)
], CoreStore.prototype, "uischema", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Array)
], CoreStore.prototype, "errors", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", typeof (_a = typeof ajv_1.ValidateFunction !== "undefined" && ajv_1.ValidateFunction) === "function" ? _a : Object)
], CoreStore.prototype, "validator", void 0);
tslib_1.__decorate([
    mobx_1.computed,
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [])
], CoreStore.prototype, "extractData", null);
tslib_1.__decorate([
    mobx_1.computed,
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [])
], CoreStore.prototype, "extractSchema", null);
tslib_1.__decorate([
    mobx_1.computed,
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [])
], CoreStore.prototype, "extractUiSchema", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Object)
], CoreStore.prototype, "setData", void 0);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Object)
], CoreStore.prototype, "initialize", void 0);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Object)
], CoreStore.prototype, "updateData", void 0);
exports.CoreStore = CoreStore;

});
___scope___.file("client/modules/notebook/forms-core/core/stores/transformProps.store.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mobx_1 = require("mobx");
class TransformPropsStore {
    constructor() {
        this.setTransformers = (transformers) => {
            this.transformers = transformers;
        };
        this.addTransformer = (transformer) => {
            this.transformers = this.transformers.concat([transformer]);
        };
        this.transformers = [];
    }
}
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Array)
], TransformPropsStore.prototype, "transformers", void 0);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Object)
], TransformPropsStore.prototype, "setTransformers", void 0);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Object)
], TransformPropsStore.prototype, "addTransformer", void 0);
exports.TransformPropsStore = TransformPropsStore;

});
___scope___.file("client/modules/notebook/forms-core/core/util/field.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const __1 = require("../");
const util_1 = require("../util");
const renderer_1 = require("./renderer");
exports.mapStoreValuesToDispatchFieldProps = (store, ownProps) => {
    const fromActionProps = renderer_1.mapUpdateActionToControlProps(store);
    const fields = store.fieldStore.fields;
    return Object.assign({}, fromActionProps, ownProps, { fields });
};
exports.mapStoreValuesToFieldProps = (store, ownProps) => {
    const path = util_1.composeWithUi(ownProps.uischema, ownProps.path);
    const visible = _.has(ownProps, 'visible') ? ownProps.visible : util_1.isVisible(ownProps, store);
    const enabled = _.has(ownProps, 'enabled') ? ownProps.enabled : util_1.isEnabled(ownProps, store);
    const errors = __1.getErrorAt(path, store).map(error => error.message);
    const isValid = _.isEmpty(errors);
    const controlElement = ownProps.uischema;
    const id = controlElement.scope || '';
    const inputClassName = ['validate'].concat(isValid ? 'valid' : 'invalid');
    const defaultConfig = _.cloneDeep(store.configStore.config);
    const config = _.merge(defaultConfig, ownProps.uischema.options);
    return {
        data: util_1.Resolve.data(store.coreStore.extractData, path),
        className: inputClassName.join(' '),
        visible,
        enabled,
        id,
        path,
        isValid,
        scopedSchema: util_1.Resolve.schema(ownProps.schema, controlElement.scope),
        uischema: ownProps.uischema,
        schema: ownProps.schema,
        config
    };
};
exports.mapUpdateActionToFieldProps = renderer_1.mapUpdateActionToControlProps;

});
___scope___.file("client/modules/notebook/forms-core/core/util/Formatted.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

});
___scope___.file("client/modules/notebook/forms-core/material/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const complex_1 = require("./complex");
const additional_1 = require("./additional");
const controls_1 = require("./controls");
const layouts_1 = require("./layouts");
const fields_1 = require("./fields");
tslib_1.__exportStar(require("./complex"), exports);
tslib_1.__exportStar(require("./controls"), exports);
tslib_1.__exportStar(require("./layouts"), exports);
tslib_1.__exportStar(require("./fields"), exports);
exports.materialRenderers = [
    { tester: complex_1.materialArrayControlTester, renderer: complex_1.MaterialArrayControlRenderer },
    { tester: controls_1.materialBooleanControlTester, renderer: controls_1.MaterialBooleanControl },
    { tester: controls_1.materialNativeControlTester, renderer: controls_1.MaterialNativeControl },
    { tester: controls_1.materialInputControlTester, renderer: controls_1.MaterialInputControl },
    { tester: controls_1.materialDateTimeControlTester, renderer: controls_1.MaterialDateTimeControl },
    { tester: controls_1.materialDateControlTester, renderer: controls_1.MaterialDateControl },
    { tester: layouts_1.materialGroupTester, renderer: layouts_1.MaterialGroupLayout },
    { tester: layouts_1.materialHorizontalLayoutTester, renderer: layouts_1.MaterialHorizontalLayout },
    { tester: layouts_1.materialVerticalLayoutTester, renderer: layouts_1.MaterialVerticalLayout },
    { tester: layouts_1.materialCategorizationTester, renderer: layouts_1.MaterialCategorizationLayout },
    { tester: additional_1.materialLabelRendererTester, renderer: additional_1.MaterialLabelRenderer }
];
exports.materialFields = [
    { tester: fields_1.materialBooleanFieldTester, field: fields_1.MaterialBooleanField },
    { tester: fields_1.materialDateFieldTester, field: fields_1.MaterialDateField },
    { tester: fields_1.materialEnumFieldTester, field: fields_1.MaterialEnumField },
    { tester: fields_1.materialIntegerFieldTester, field: fields_1.MaterialIntegerField },
    { tester: fields_1.materialNumberFieldTester, field: fields_1.MaterialNumberField },
    { tester: fields_1.materialNumberFormatFieldTester, field: fields_1.MaterialNumberFormatField },
    { tester: fields_1.materialSliderFieldTester, field: fields_1.MaterialSliderField },
    { tester: fields_1.materialTextFieldTester, field: fields_1.MaterialTextField },
    { tester: fields_1.materialTimeFieldTester, field: fields_1.MaterialTimeField },
];

});
___scope___.file("client/modules/notebook/forms-core/material/complex/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../core");
const MaterialArrayControlRenderer_1 = require("./MaterialArrayControlRenderer");
exports.MaterialArrayControlRenderer = MaterialArrayControlRenderer_1.default;
exports.materialArrayControlTester = core_1.rankWith(3, core_1.isArrayObjectControl);

});
___scope___.file("client/modules/notebook/forms-core/material/complex/MaterialArrayControlRenderer.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@material-ui/core");
const _ = require("lodash");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const core_2 = require("../../core");
const react_1 = require("../../react");
const MaterialTableControl_1 = require("./MaterialTableControl");
const TableToolbar_1 = require("./TableToolbar");
class MaterialArrayControlRenderer extends react_1.RendererComponent {
    constructor(props) {
        super(props);
        this.select = (_event, index) => {
            const copy = this.state.selected.slice();
            copy[index] = !copy[index];
            this.setState({ selected: copy });
        };
        this.selectAll = (_event, checked) => {
            if (checked) {
                this.setState({ selected: this.createSelection(true) });
                return;
            }
            this.setState({ selected: this.createSelection(false) });
        };
        this.closeConfirmDeleteDialog = () => {
            this.setState({ openConfirmDelete: false });
        };
        this.openConfirmDeleteDialog = () => {
            this.setState({ openConfirmDelete: true });
        };
        this.confirmDelete = () => {
            const selectedIndices = this.state.selected;
            const toDelete = selectedIndices.reduce((acc, value, index) => {
                if (value) {
                    acc.push(this.props.data[index]);
                }
                return acc;
            }, []);
            this.props.removeItems(this.props.path, toDelete)();
            this.closeConfirmDeleteDialog();
            this.setState({ selected: this.createSelection(false) });
        };
        this.isSelected = index => {
            return this.state.selected[index];
        };
        this.createSelection = (selected) => _.fill(Array(this.props.data.length), selected);
        this.state = {
            selected: this.createSelection(false),
            openConfirmDelete: false
        };
    }
    render() {
        const numSelected = this.state.selected ? _.filter(this.state.selected, v => v).length : 0;
        const tableProps = Object.assign({ selectAll: this.selectAll, select: this.select, isSelected: this.isSelected, numSelected }, this.props);
        const toolbarProps = Object.assign({ openConfirmDeleteDialog: this.openConfirmDeleteDialog, numSelected }, this.props);
        const selectedCount = _.filter(this.state.selected, v => v).length;
        return (React.createElement(core_1.Grid, { container: true, direction: 'column', spacing: 0 },
            React.createElement(core_1.Grid, { item: true },
                React.createElement(TableToolbar_1.TableToolbar, Object.assign({}, toolbarProps))),
            React.createElement(core_1.Grid, { item: true },
                React.createElement(MaterialTableControl_1.MaterialTableControl, Object.assign({}, tableProps))),
            React.createElement(core_1.Dialog, { open: this.state.openConfirmDelete, keepMounted: true, onClose: this.closeConfirmDeleteDialog, "aria-labelledby": 'alert-dialog-confirmdelete-title', "aria-describedby": 'alert-dialog-confirmdelete-description' },
                React.createElement(core_1.DialogTitle, { id: 'alert-dialog-confirmdelete-title' }, 'Confirm Deletion'),
                React.createElement(core_1.DialogContent, null,
                    React.createElement(core_1.DialogContentText, { id: 'alert-dialog-confirmdelete-description' },
                        "Are you sure you want to delete the ",
                        selectedCount,
                        " selected objects?")),
                React.createElement(core_1.DialogActions, null,
                    React.createElement(core_1.Button, { onClick: this.closeConfirmDeleteDialog, color: 'primary' }, "No"),
                    React.createElement(core_1.Button, { onClick: this.confirmDelete, color: 'primary' }, "Yes")))));
    }
}
exports.MaterialArrayControlRenderer = MaterialArrayControlRenderer;
let MaterializedArrayControlRenderer = class MaterializedArrayControlRenderer extends React.Component {
    render() {
        const effectiveProps = react_1.createPropsForItem(this.props, core_2.mapStoreValuesToTableControlProps, core_2.mapUpdateActionToTableControlProps);
        return (React.createElement(MaterialArrayControlRenderer, Object.assign({}, effectiveProps)));
    }
};
MaterializedArrayControlRenderer = tslib_1.__decorate([
    mobx_react_1.inject("jsonFormsStore"),
    mobx_react_1.observer
], MaterializedArrayControlRenderer);
exports.default = MaterializedArrayControlRenderer;

});
___scope___.file("client/modules/notebook/forms-core/react/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./Control"), exports);
tslib_1.__exportStar(require("./DispatchField"), exports);
tslib_1.__exportStar(require("./JsonForms"), exports);
tslib_1.__exportStar(require("./Renderer"), exports);
tslib_1.__exportStar(require("./util"), exports);

});
___scope___.file("client/modules/notebook/forms-core/react/Control.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Renderer_1 = require("./Renderer");
class Control extends Renderer_1.RendererComponent {
    constructor(props) {
        super(props);
        this.handleChange = value => {
            this.setState({ value });
            this.updateData(value);
        };
        this.onFocus = () => {
            this.setState({ isFocused: true });
        };
        this.onBlur = () => { this.setState({ isFocused: false }); };
        this.updateData = value => {
            this.props.handleChange(this.props.path, value);
        };
        this.state = {
            value: props.data ? props.data : '',
            isFocused: false
        };
    }
}
exports.Control = Control;

});
___scope___.file("client/modules/notebook/forms-core/react/Renderer.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class RendererComponent extends React.Component {
    constructor(props) {
        super(props);
    }
}
exports.RendererComponent = RendererComponent;

});
___scope___.file("client/modules/notebook/forms-core/react/DispatchField.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _ = require("lodash");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const core_1 = require("../core");
const UnknownRenderer_1 = require("./UnknownRenderer");
const Dispatch = (dispatchFieldProps) => {
    const uischema = dispatchFieldProps.uischema;
    const schema = dispatchFieldProps.schema;
    const field = _.maxBy(dispatchFieldProps.fields, r => r.tester(uischema, schema));
    if (field === undefined || field.tester(uischema, schema) === -1) {
        return React.createElement(UnknownRenderer_1.UnknownRenderer, { type: 'field' });
    }
    else {
        const Field = field.field;
        return (React.createElement(Field, { schema: schema, uischema: uischema, path: dispatchFieldProps.path }));
    }
};
let DispatchField = class DispatchField extends React.Component {
    render() {
        const _a = this.props, { jsonFormsStore } = _a, ownProps = tslib_1.__rest(_a, ["jsonFormsStore"]);
        const effectiveProps = core_1.mapStoreValuesToDispatchFieldProps(jsonFormsStore, ownProps);
        return (React.createElement(Dispatch, Object.assign({}, effectiveProps)));
    }
};
DispatchField = tslib_1.__decorate([
    mobx_react_1.inject("jsonFormsStore"),
    mobx_react_1.observer
], DispatchField);
exports.DispatchField = DispatchField;

});
___scope___.file("client/modules/notebook/forms-core/react/UnknownRenderer.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class UnknownRenderer extends React.Component {
    render() {
        return (React.createElement("div", { style: { color: 'red' } },
            "No applicable ",
            this.props.type,
            " found."));
    }
}
exports.UnknownRenderer = UnknownRenderer;

});
___scope___.file("client/modules/notebook/forms-core/react/JsonForms.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _ = require("lodash");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const core_1 = require("../core");
const UnknownRenderer_1 = require("./UnknownRenderer");
class JsonFormsRenderer extends React.Component {
    render() {
        const { uischema, schema, path, renderers } = this.props;
        const renderer = _.maxBy(renderers, r => r.tester(uischema, schema));
        if (renderer === undefined || renderer.tester(uischema, schema) === -1) {
            return React.createElement(UnknownRenderer_1.UnknownRenderer, { type: 'renderer' });
        }
        else {
            const Render = renderer.renderer;
            return (React.createElement(Render, { uischema: uischema, schema: schema, path: path, renderers: renderers }));
        }
    }
}
let JsonForms = class JsonForms extends React.Component {
    render() {
        const _a = this.props, { jsonFormsStore } = _a, otherProps = tslib_1.__rest(_a, ["jsonFormsStore"]);
        const effectiveProps = core_1.mapStoreValuesToRendererProps(jsonFormsStore, otherProps);
        return (React.createElement(JsonFormsRenderer, Object.assign({}, effectiveProps)));
    }
};
JsonForms = tslib_1.__decorate([
    mobx_react_1.inject("jsonFormsStore"),
    mobx_react_1.observer
], JsonForms);
exports.JsonForms = JsonForms;

});
___scope___.file("client/modules/notebook/forms-core/react/util.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _ = require("lodash");
const core_1 = require("../core");
exports.mergeTransformProps = (store, ownProps, mapStoreValuesToProps = core_1.mapStoreValuesToControlProps) => {
    const transformedProps = (core_1.getPropsTransformers(store) || []).reduce((props, materializer) => _.merge(props, materializer(store, props)), mapStoreValuesToProps(store, ownProps));
    return transformedProps;
};
exports.createPropsForItem = (inputProps, mapStoreValuesToProps, mapUpdateActionToProps = null) => {
    const { jsonFormsStore } = inputProps, ownProps = tslib_1.__rest(inputProps, ["jsonFormsStore"]);
    const effectiveFromStateProps = exports.mergeTransformProps(jsonFormsStore, ownProps, mapStoreValuesToProps);
    const actionProps = mapUpdateActionToProps ? mapUpdateActionToProps(jsonFormsStore) : {};
    return Object.assign({}, effectiveFromStateProps, actionProps);
};

});
___scope___.file("client/modules/notebook/forms-core/material/complex/MaterialTableControl.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const _ = require("lodash");
const React = require("react");
const core_2 = require("../../core");
const react_1 = require("../../react");
const ValidationIcon_1 = require("./ValidationIcon");
const generateCells = (Cell, scopedSchema, rowPath, cellErrors) => Object.keys(scopedSchema.properties)
    .filter(prop => scopedSchema.properties[prop].type !== 'array')
    .map(prop => {
    const cellPath = core_2.Paths.compose(rowPath, prop);
    const props = {
        cellProperty: prop,
        scopedSchema,
        rowPath,
        cellPath,
        errors: cellErrors
    };
    return React.createElement(Cell, Object.assign({ key: cellPath }, props));
});
const EmptyTable = () => (React.createElement(core_1.TableRow, null,
    React.createElement(core_1.TableCell, null, "No data")));
const TableHeaderCell = ({ cellProperty }) => React.createElement(core_1.TableCell, null, _.capitalize(cellProperty));
const TableContentCell = ({ rowPath, cellProperty, cellPath, errors, scopedSchema }) => {
    const cellErrors = errors
        .filter(error => error.dataPath === cellPath)
        .map(error => error.message);
    const createControlElement = (key) => ({
        type: 'Control',
        label: false,
        scope: `#/properties/${key}`
    });
    return (React.createElement(core_1.TableCell, null,
        React.createElement(core_1.Grid, { container: true, alignItems: 'center', justify: 'center', spacing: 0 },
            React.createElement(core_1.Grid, { item: true, xs: 1 },
                React.createElement(ValidationIcon_1.ValidationIcon, { id: `tooltip-${cellPath}`, errorMessages: cellErrors })),
            React.createElement(core_1.Grid, { item: true, xs: true },
                React.createElement(react_1.DispatchField, { schema: scopedSchema, uischema: createControlElement(cellProperty), path: rowPath })))));
};
const TableWithContent = tableProps => {
    const { data, path, scopedSchema, childErrors, select, isSelected } = tableProps;
    return data.map((_child, index) => {
        const childPath = core_2.Paths.compose(path, `${index}`);
        const selected = isSelected(index);
        return (React.createElement(core_1.TableRow, { key: childPath, hover: true, selected: selected },
            React.createElement(core_1.TableCell, { padding: 'checkbox' },
                React.createElement(core_1.Checkbox, { checked: selected, onChange: e => select(e, index) })),
            generateCells(TableContentCell, scopedSchema, childPath, childErrors)));
    });
};
exports.MaterialTableControl = props => {
    const { data, path, scopedSchema, numSelected, selectAll } = props;
    const isEmptyTable = !data || !Array.isArray(data) || data.length === 0;
    const rowCount = data ? data.length : 0;
    return (React.createElement(core_1.Table, null,
        React.createElement(core_1.TableHead, null,
            React.createElement(core_1.TableRow, null,
                React.createElement(core_1.TableCell, { padding: 'checkbox', style: { width: '1em' } },
                    React.createElement(core_1.Checkbox, { indeterminate: numSelected > 0 && numSelected < rowCount, checked: numSelected === rowCount, onChange: selectAll })),
                generateCells(TableHeaderCell, scopedSchema, path))),
        React.createElement(core_1.TableBody, null, isEmptyTable ? React.createElement(EmptyTable, null) : React.createElement(TableWithContent, Object.assign({}, props)))));
};

});
___scope___.file("client/modules/notebook/forms-core/material/complex/ValidationIcon.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const ErrorOutline_1 = require("@material-ui/icons/ErrorOutline");
const React = require("react");
exports.ValidationIcon = ({ id, errorMessages }) => (React.createElement(core_1.Tooltip, { id: id, title: errorMessages.map((e, idx) => React.createElement("div", { key: `${id}_${idx}` }, e)) },
    React.createElement(core_1.Badge, { badgeContent: errorMessages.length },
        React.createElement(ErrorOutline_1.default, { color: 'error' }))));

});
___scope___.file("client/modules/notebook/forms-core/material/complex/TableToolbar.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const Add_1 = require("@material-ui/icons/Add");
const Delete_1 = require("@material-ui/icons/Delete");
const React = require("react");
const core_2 = require("../../core");
const ValidationIcon_1 = require("./ValidationIcon");
exports.TableToolbar = ({ errors, childErrors, label, uischema, numSelected, openConfirmDeleteDialog, addItem, path }) => {
    const controlElement = uischema;
    const labelObject = core_2.Helpers.createLabelDescriptionFrom(controlElement);
    const allErrors = [].concat(errors).concat(childErrors.map(e => e.message));
    return (React.createElement(core_1.Toolbar, { hidden: true },
        React.createElement(core_1.Grid, { container: true, alignItems: 'center', justify: 'space-between' },
            React.createElement(core_1.Grid, { item: true },
                React.createElement(core_1.Typography, { variant: 'title' }, label)),
            React.createElement(core_1.Grid, { item: true },
                React.createElement(ValidationIcon_1.ValidationIcon, { id: 'tooltip-validation', errorMessages: allErrors })),
            React.createElement(core_1.Grid, { item: true },
                React.createElement(core_1.Grid, { container: true },
                    React.createElement(core_1.Grid, { item: true },
                        React.createElement(core_1.Tooltip, { id: 'tooltip-add', title: `Add to ${labelObject.text}`, placement: 'bottom' },
                            React.createElement(core_1.Button, { variant: 'fab', color: 'primary', "aria-label": `Add to ${labelObject.text}`, onClick: addItem(path) },
                                React.createElement(Add_1.default, null)))),
                    React.createElement(core_1.Grid, { item: true },
                        React.createElement(core_1.Tooltip, { title: 'Delete' },
                            React.createElement(core_1.Button, { variant: 'fab', "aria-label": `Delete`, disabled: numSelected === 0, onClick: openConfirmDeleteDialog },
                                React.createElement(Delete_1.default, null)))))))));
};

});
___scope___.file("client/modules/notebook/forms-core/material/additional/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MaterialLabelRenderer_1 = require("./MaterialLabelRenderer");
exports.MaterialLabelRenderer = MaterialLabelRenderer_1.default;
exports.materialLabelRendererTester = MaterialLabelRenderer_1.materialLabelRendererTester;

});
___scope___.file("client/modules/notebook/forms-core/material/additional/MaterialLabelRenderer.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const _ = require("lodash");
const core_1 = require("../../core");
const react_1 = require("../../react");
const core_2 = require("@material-ui/core");
const mobx_react_1 = require("mobx-react");
exports.materialLabelRendererTester = core_1.rankWith(1, core_1.uiTypeIs('Label'));
exports.MaterialLabelRenderer = ({ uischema, visible }) => {
    const labelElement = uischema;
    const style = {};
    if (!visible) {
        style.display = 'none';
    }
    return (React.createElement(core_2.Typography, { variant: 'title', style: style }, labelElement.text !== undefined && labelElement.text !== null && labelElement.text));
};
const mapStoreValuesToProps = (state, ownProps) => {
    const visible = _.has(ownProps, 'visible') ? ownProps.visible : core_1.isVisible(ownProps, state);
    return {
        visible,
    };
};
let MaterializedLabelRenderer = class MaterializedLabelRenderer extends React.Component {
    render() {
        const effectiveProps = react_1.createPropsForItem(this.props, mapStoreValuesToProps);
        return (React.createElement(exports.MaterialLabelRenderer, Object.assign({}, effectiveProps)));
    }
};
MaterializedLabelRenderer = tslib_1.__decorate([
    mobx_react_1.inject("jsonFormsStore"),
    mobx_react_1.observer
], MaterializedLabelRenderer);
exports.default = MaterializedLabelRenderer;

});
___scope___.file("client/modules/notebook/forms-core/material/controls/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MaterialBooleanControl_1 = require("./MaterialBooleanControl");
exports.MaterialBooleanControl = MaterialBooleanControl_1.default;
exports.materialBooleanControlTester = MaterialBooleanControl_1.materialBooleanControlTester;
const MaterialInputControl_1 = require("./MaterialInputControl");
exports.MaterialInputControl = MaterialInputControl_1.default;
exports.materialInputControlTester = MaterialInputControl_1.materialInputControlTester;
const MaterialNativeControl_1 = require("./MaterialNativeControl");
exports.MaterialNativeControl = MaterialNativeControl_1.default;
exports.materialNativeControlTester = MaterialNativeControl_1.materialNativeControlTester;
const MaterialDateControl_1 = require("./MaterialDateControl");
exports.MaterialDateControl = MaterialDateControl_1.default;
exports.materialDateControlTester = MaterialDateControl_1.materialDateControlTester;
const MaterialDateTimeControl_1 = require("./MaterialDateTimeControl");
exports.MaterialDateTimeControl = MaterialDateTimeControl_1.default;
exports.materialDateTimeControlTester = MaterialDateTimeControl_1.materialDateTimeControlTester;

});
___scope___.file("client/modules/notebook/forms-core/material/controls/MaterialBooleanControl.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@material-ui/core");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const core_2 = require("../../core");
const react_1 = require("../../react");
const MaterialBooleanField_1 = require("../fields/MaterialBooleanField");
exports.MaterialBooleanControl = ({ label, uischema, schema, visible, parentPath }) => {
    let style = {};
    if (!visible) {
        style = { display: 'none' };
    }
    return (React.createElement(core_1.FormControlLabel, { style: style, label: label, control: React.createElement(MaterialBooleanField_1.default, { uischema: uischema, schema: schema, path: parentPath }) }));
};
let ConnectedMaterialBooleanControl = class ConnectedMaterialBooleanControl extends React.Component {
    render() {
        const effectiveProps = react_1.createPropsForItem(this.props, core_2.mapStoreValuesToControlProps);
        return (React.createElement(exports.MaterialBooleanControl, Object.assign({}, effectiveProps)));
    }
};
ConnectedMaterialBooleanControl = tslib_1.__decorate([
    mobx_react_1.inject("jsonFormsStore"),
    mobx_react_1.observer
], ConnectedMaterialBooleanControl);
exports.default = ConnectedMaterialBooleanControl;
exports.materialBooleanControlTester = core_2.rankWith(2, core_2.isBooleanControl);

});
___scope___.file("client/modules/notebook/forms-core/material/fields/MaterialBooleanField.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@material-ui/core");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const core_2 = require("../../core");
const react_1 = require("../../react");
exports.MaterialBooleanField = (props) => {
    const { data, className, id, enabled, uischema, path, handleChange } = props;
    const config = { 'autoFocus': uischema.options && uischema.options.focus };
    return (React.createElement(core_1.Checkbox, { checked: data || '', onChange: (_ev, checked) => handleChange(path, checked), className: className, id: id, disabled: !enabled, inputProps: config }));
};
exports.materialBooleanFieldTester = core_2.rankWith(2, core_2.isBooleanControl);
let MaterializedBooleanField = class MaterializedBooleanField extends React.Component {
    render() {
        const effectiveProps = react_1.createPropsForItem(this.props, core_2.mapStoreValuesToFieldProps, core_2.mapUpdateActionToFieldProps);
        return (React.createElement(exports.MaterialBooleanField, Object.assign({}, effectiveProps)));
    }
};
MaterializedBooleanField = tslib_1.__decorate([
    mobx_react_1.inject("jsonFormsStore"),
    mobx_react_1.observer
], MaterializedBooleanField);
exports.default = MaterializedBooleanField;

});
___scope___.file("client/modules/notebook/forms-core/material/controls/MaterialInputControl.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@material-ui/core");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const core_2 = require("../..//core");
const react_1 = require("../../react");
class MaterialInputControl extends react_1.Control {
    render() {
        const { id, description, errors, label, uischema, schema, visible, required, parentPath, config } = this.props;
        const isValid = errors.length === 0;
        const trim = config.trim;
        const style = {};
        if (!visible) {
            style.display = 'none';
        }
        const showDescription = !core_2.isDescriptionHidden(visible, description, this.state.isFocused);
        return (React.createElement(core_1.FormControl, { style: style, fullWidth: !trim, onFocus: this.onFocus, onBlur: this.onBlur },
            React.createElement(core_1.InputLabel, { htmlFor: id, error: !isValid }, core_2.computeLabel(core_2.isPlainLabel(label) ? label : label.default, required)),
            React.createElement(react_1.DispatchField, { uischema: uischema, schema: schema, path: parentPath }),
            React.createElement(core_1.FormHelperText, { error: !isValid }, !isValid ? core_2.formatErrorMessage(errors) : showDescription ? description : null)));
    }
}
exports.MaterialInputControl = MaterialInputControl;
exports.materialInputControlTester = core_2.rankWith(1, core_2.isControl);
let MaterializedInputControl = class MaterializedInputControl extends React.Component {
    render() {
        const effectiveProps = react_1.createPropsForItem(this.props, core_2.mapStoreValuesToControlProps);
        return (React.createElement(MaterialInputControl, Object.assign({}, effectiveProps)));
    }
};
MaterializedInputControl = tslib_1.__decorate([
    mobx_react_1.inject("jsonFormsStore"),
    mobx_react_1.observer
], MaterializedInputControl);
exports.default = MaterializedInputControl;

});
___scope___.file("client/modules/notebook/forms-core/material/controls/MaterialNativeControl.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@material-ui/core");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const core_2 = require("../../core");
const react_1 = require("../../react");
class MaterialNativeControl extends react_1.Control {
    render() {
        const { id, errors, label, scopedSchema, description, visible, required, path, handleChange, data, config } = this.props;
        const isValid = errors.length === 0;
        const trim = config.trim;
        let style = {};
        if (!visible) {
            style = { display: 'none' };
        }
        const onChange = ev => handleChange(path, ev.target.value);
        const fieldType = scopedSchema.format;
        const showDescription = !core_2.isDescriptionHidden(visible, description, this.state.isFocused);
        return (React.createElement(core_1.TextField, { id: id, label: core_2.computeLabel(core_2.isPlainLabel(label) ? label : label.default, required), type: fieldType, error: !isValid, style: style, fullWidth: !trim, onFocus: this.onFocus, onBlur: this.onBlur, helperText: !isValid ? core_2.formatErrorMessage(errors) : showDescription ? description : null, InputLabelProps: { shrink: true }, value: data, onChange: onChange }));
    }
}
exports.MaterialNativeControl = MaterialNativeControl;
exports.materialNativeControlTester = core_2.rankWith(2, core_2.or(core_2.isDateControl, core_2.isTimeControl));
let MaterializedNativeControl = class MaterializedNativeControl extends React.Component {
    render() {
        const effectiveProps = react_1.createPropsForItem(this.props, core_2.mapStoreValuesToControlProps, core_2.mapUpdateActionToControlProps);
        return (React.createElement(MaterialNativeControl, Object.assign({}, effectiveProps)));
    }
};
MaterializedNativeControl = tslib_1.__decorate([
    mobx_react_1.inject("jsonFormsStore"),
    mobx_react_1.observer
], MaterializedNativeControl);
exports.default = MaterializedNativeControl;

});
___scope___.file("client/modules/notebook/forms-core/material/controls/MaterialDateControl.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const KeyboardArrowLeft_1 = require("@material-ui/icons/KeyboardArrowLeft");
const KeyboardArrowRight_1 = require("@material-ui/icons/KeyboardArrowRight");
const _ = require("lodash");
const material_ui_pickers_1 = require("material-ui-pickers");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const core_1 = require("../../core");
const react_1 = require("../../react");
class MaterialDateControl extends react_1.Control {
    render() {
        const { description, id, errors, label, uischema, visible, enabled, required, path, handleChange, data, momentLocale } = this.props;
        const isValid = errors.length === 0;
        const trim = uischema.options && uischema.options.trim;
        const showDescription = !core_1.isDescriptionHidden(visible, description, this.state.isFocused);
        let style = {};
        if (!visible) {
            style = { display: 'none' };
        }
        const inputProps = {};
        const localeDateTimeFormat = momentLocale ? `${momentLocale.localeData().longDateFormat('L')}`
            : 'YYYY-MM-DD';
        let labelText;
        let labelCancel;
        let labelClear;
        if (core_1.isPlainLabel(label)) {
            labelText = label;
            labelCancel = 'Cancel';
            labelClear = 'Clear';
        }
        else {
            labelText = label.default;
            labelCancel = _.startsWith(label.cancel, '%') ? 'Cancel' : label.cancel;
            labelClear = _.startsWith(label.clear, '%') ? 'Clear' : label.clear;
        }
        return (React.createElement(material_ui_pickers_1.DatePicker, { id: id, label: core_1.computeLabel(labelText, required), error: !isValid, style: style, fullWidth: !trim, helperText: !isValid ? errors : showDescription ? description : null, InputLabelProps: { shrink: true }, value: data || null, onChange: datetime => console.log('broken bc moment is fucked'), format: localeDateTimeFormat, clearable: true, disabled: !enabled, autoFocus: uischema.options && uischema.options.focus, onClear: () => handleChange(path, ''), onFocus: this.onFocus, onBlur: this.onBlur, cancelLabel: labelCancel, clearLabel: labelClear, leftArrowIcon: React.createElement(KeyboardArrowLeft_1.default, null), rightArrowIcon: React.createElement(KeyboardArrowRight_1.default, null), InputProps: inputProps }));
    }
}
exports.MaterialDateControl = MaterialDateControl;
exports.addLabelProps = (mapStoreValuesToProps) => (state, ownProps) => {
    const stateProps = mapStoreValuesToProps(state, ownProps);
    return Object.assign({}, stateProps, { label: {
            default: stateProps.label,
            cancel: '%cancel',
            clear: '%clear'
        } });
};
exports.materialDateControlTester = core_1.rankWith(4, core_1.isDateControl);
let MaterializedDateControl = class MaterializedDateControl extends React.Component {
    render() {
        const effectiveProps = react_1.createPropsForItem(this.props, core_1.mapStoreValuesToControlProps, core_1.mapUpdateActionToControlProps);
        return (React.createElement(MaterialDateControl, Object.assign({}, effectiveProps)));
    }
};
MaterializedDateControl = tslib_1.__decorate([
    mobx_react_1.inject("jsonFormsStore"),
    mobx_react_1.observer
], MaterializedDateControl);
exports.default = MaterializedDateControl;

});
___scope___.file("client/modules/notebook/forms-core/material/controls/MaterialDateTimeControl.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const AccessTime_1 = require("@material-ui/icons/AccessTime");
const DateRange_1 = require("@material-ui/icons/DateRange");
const KeyboardArrowLeft_1 = require("@material-ui/icons/KeyboardArrowLeft");
const KeyboardArrowRight_1 = require("@material-ui/icons/KeyboardArrowRight");
const material_ui_pickers_1 = require("material-ui-pickers");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const core_1 = require("../../core");
const react_1 = require("../../react");
class MaterialDateTimeControl extends react_1.Control {
    render() {
        const { id, description, errors, label, uischema, visible, enabled, required, path, handleChange, data, config } = this.props;
        const isValid = errors.length === 0;
        const trim = config.trim;
        let style = {};
        if (!visible) {
            style = { display: 'none' };
        }
        const inputProps = {};
        return (React.createElement(material_ui_pickers_1.DateTimePicker, { id: id, label: core_1.computeLabel(core_1.isPlainLabel(label) ? label : label.default, required), error: !isValid, style: style, fullWidth: !trim, onFocus: this.onFocus, onBlur: this.onBlur, helperText: !isValid ? errors : description, InputLabelProps: { shrink: true, }, value: data || null, onChange: datetime => handleChange(path, datetime ? datetime : ''), format: 'MM/DD/YYYY h:mm a', clearable: true, disabled: !enabled, autoFocus: uischema.options && uischema.options.focus, leftArrowIcon: React.createElement(KeyboardArrowLeft_1.default, null), rightArrowIcon: React.createElement(KeyboardArrowRight_1.default, null), dateRangeIcon: React.createElement(DateRange_1.default, null), timeIcon: React.createElement(AccessTime_1.default, null), onClear: () => handleChange(path, ''), InputProps: inputProps }));
    }
}
exports.MaterialDateTimeControl = MaterialDateTimeControl;
exports.materialDateTimeControlTester = core_1.rankWith(2, core_1.isDateTimeControl);
let MaterializedDateTimeControl = class MaterializedDateTimeControl extends React.Component {
    render() {
        const effectiveProps = react_1.createPropsForItem(this.props, core_1.mapStoreValuesToControlProps, core_1.mapUpdateActionToControlProps);
        return (React.createElement(MaterialDateTimeControl, Object.assign({}, effectiveProps)));
    }
};
MaterializedDateTimeControl = tslib_1.__decorate([
    mobx_react_1.inject("jsonFormsStore"),
    mobx_react_1.observer
], MaterializedDateTimeControl);
exports.default = MaterializedDateTimeControl;

});
___scope___.file("client/modules/notebook/forms-core/material/layouts/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MaterialGroupLayout_1 = require("./MaterialGroupLayout");
exports.MaterialGroupLayout = MaterialGroupLayout_1.default;
exports.materialGroupTester = MaterialGroupLayout_1.materialGroupTester;
const MaterialHorizontalLayout_1 = require("./MaterialHorizontalLayout");
exports.MaterialHorizontalLayout = MaterialHorizontalLayout_1.default;
exports.materialHorizontalLayoutTester = MaterialHorizontalLayout_1.materialHorizontalLayoutTester;
const MaterialVerticalLayout_1 = require("./MaterialVerticalLayout");
exports.MaterialVerticalLayout = MaterialVerticalLayout_1.default;
exports.materialVerticalLayoutTester = MaterialVerticalLayout_1.materialVerticalLayoutTester;
const MaterialCategorizationLayout_1 = require("./MaterialCategorizationLayout");
exports.MaterialCategorizationLayout = MaterialCategorizationLayout_1.default;
exports.materialCategorizationTester = MaterialCategorizationLayout_1.materialCategorizationTester;

});
___scope___.file("client/modules/notebook/forms-core/material/layouts/MaterialGroupLayout.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@material-ui/core");
const _ = require("lodash");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const core_2 = require("../../core");
const react_1 = require("../../react");
const layout_1 = require("../util/layout");
exports.groupTester = core_2.rankWith(1, core_2.uiTypeIs('Group'));
exports.MaterializedGroupLayoutRenderer = props => {
    const { uischema, schema, path, visible } = props;
    const groupLayout = uischema;
    const childProps = Object.assign({ elements: groupLayout.elements, schema,
        path, direction: 'column', visible }, props);
    const style = { marginBottom: '10px' };
    if (!visible) {
        style.display = 'none';
    }
    return (React.createElement(core_1.Card, Object.assign({ style: style }, props),
        !_.isEmpty(groupLayout.label) && React.createElement(core_1.CardHeader, { title: groupLayout.label }),
        React.createElement(core_1.CardContent, null,
            React.createElement(layout_1.MaterialLayoutRenderer, Object.assign({}, childProps)))));
};
let MaterializedGroupLayout = class MaterializedGroupLayout extends React.Component {
    render() {
        const effectiveProps = react_1.createPropsForItem(this.props, core_2.mapStoreValuesToLayoutProps);
        return (React.createElement(exports.MaterializedGroupLayoutRenderer, Object.assign({}, effectiveProps)));
    }
};
MaterializedGroupLayout = tslib_1.__decorate([
    mobx_react_1.inject("jsonFormsStore"),
    mobx_react_1.observer
], MaterializedGroupLayout);
exports.default = MaterializedGroupLayout;
exports.materialGroupTester = core_2.withIncreasedRank(1, exports.groupTester);

});
___scope___.file("client/modules/notebook/forms-core/material/util/layout.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const _ = require("lodash");
const React = require("react");
const react_1 = require("../../react");
const renderChildren = (elements, schema, path) => elements.map((child, index) => (React.createElement(core_1.Grid, { item: true, key: `${path}-${index}`, xs: true },
    React.createElement(react_1.JsonForms, { uischema: child, schema: schema, path: path }))));
exports.MaterialLayoutRenderer = ({ visible, elements, schema, path, direction }) => {
    if (_.isEmpty(elements)) {
        return null;
    }
    else {
        return (React.createElement(core_1.Grid, { container: true, direction: direction }, renderChildren(elements, schema, path)));
    }
};

});
___scope___.file("client/modules/notebook/forms-core/material/layouts/MaterialHorizontalLayout.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const core_1 = require("../../core");
const react_1 = require("../../react");
const layout_1 = require("../util/layout");
exports.materialHorizontalLayoutTester = core_1.rankWith(2, core_1.uiTypeIs('HorizontalLayout'));
exports.MaterialHorizontalLayoutRenderer = ({ schema, uischema, path, visible }) => {
    const horizontalLayout = uischema;
    const childProps = {
        elements: horizontalLayout.elements,
        schema,
        path,
        direction: 'row',
        visible
    };
    return React.createElement(layout_1.MaterialLayoutRenderer, Object.assign({}, childProps));
};
let ConnectedMaterialHorizontalLayoutRendered = class ConnectedMaterialHorizontalLayoutRendered extends React.Component {
    render() {
        const effectiveProps = react_1.createPropsForItem(this.props, core_1.mapStoreValuesToLayoutProps);
        return (React.createElement(exports.MaterialHorizontalLayoutRenderer, Object.assign({}, effectiveProps)));
    }
};
ConnectedMaterialHorizontalLayoutRendered = tslib_1.__decorate([
    mobx_react_1.inject("jsonFormsStore"),
    mobx_react_1.observer
], ConnectedMaterialHorizontalLayoutRendered);
exports.default = ConnectedMaterialHorizontalLayoutRendered;

});
___scope___.file("client/modules/notebook/forms-core/material/layouts/MaterialVerticalLayout.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const core_1 = require("../../core");
const react_1 = require("../../react");
const layout_1 = require("../util/layout");
exports.materialVerticalLayoutTester = core_1.rankWith(1, core_1.uiTypeIs('VerticalLayout'));
exports.MaterialVerticalLayoutRenderer = ({ schema, uischema, path, visible }) => {
    const verticalLayout = uischema;
    const childProps = {
        elements: verticalLayout.elements,
        schema,
        path,
        direction: 'column',
        visible
    };
    return React.createElement(layout_1.MaterialLayoutRenderer, Object.assign({}, childProps));
};
let MaterialVerticalLayout = class MaterialVerticalLayout extends React.Component {
    render() {
        const effectiveProps = react_1.createPropsForItem(this.props, core_1.mapStoreValuesToLayoutProps);
        return (React.createElement(exports.MaterialVerticalLayoutRenderer, Object.assign({}, effectiveProps)));
    }
};
MaterialVerticalLayout = tslib_1.__decorate([
    mobx_react_1.inject("jsonFormsStore"),
    mobx_react_1.observer
], MaterialVerticalLayout);
exports.default = MaterialVerticalLayout;

});
___scope___.file("client/modules/notebook/forms-core/material/layouts/MaterialCategorizationLayout.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@material-ui/core");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const core_2 = require("../../core");
const react_1 = require("../../react");
const layout_1 = require("../util/layout");
const isSingleLevelCategorization = core_2.and(core_2.uiTypeIs('Categorization'), (uischema) => {
    const categorization = uischema;
    return categorization.elements.reduce((acc, e) => acc && e.type === 'Category', true);
});
exports.materialCategorizationTester = core_2.rankWith(1, isSingleLevelCategorization);
class MaterialCategorizationLayoutRenderer extends react_1.RendererComponent {
    constructor(props) {
        super(props);
        this.handleChange = (_event, value) => {
            this.setState({ value });
        };
        this.state = {
            value: 0
        };
    }
    render() {
        const { uischema, schema, path, visible } = this.props;
        const { value } = this.state;
        const categorization = uischema;
        const childProps = Object.assign({ elements: categorization.elements[value].elements, schema,
            path, direction: 'column', visible }, this.props);
        const style = { marginBottom: '10px' };
        if (!visible) {
            style.display = 'none';
        }
        return (React.createElement("div", { style: style },
            React.createElement(core_1.AppBar, { position: 'static' },
                React.createElement(core_1.Tabs, { value: value, onChange: this.handleChange }, categorization.elements.map((e, idx) => React.createElement(core_1.Tab, { key: idx, label: e.label })))),
            React.createElement("div", { style: { marginTop: '0.5em' } },
                React.createElement(layout_1.MaterialLayoutRenderer, Object.assign({}, childProps)))));
    }
}
exports.MaterialCategorizationLayoutRenderer = MaterialCategorizationLayoutRenderer;
let MaterialCategorizationLayout = class MaterialCategorizationLayout extends React.Component {
    render() {
        const effectiveProps = react_1.createPropsForItem(this.props, core_2.mapStoreValuesToLayoutProps);
        return (React.createElement(MaterialCategorizationLayoutRenderer, Object.assign({}, effectiveProps)));
    }
};
MaterialCategorizationLayout = tslib_1.__decorate([
    mobx_react_1.inject("jsonFormsStore"),
    mobx_react_1.observer
], MaterialCategorizationLayout);
exports.default = MaterialCategorizationLayout;

});
___scope___.file("client/modules/notebook/forms-core/material/fields/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MaterialBooleanField_1 = require("./MaterialBooleanField");
exports.MaterialBooleanField = MaterialBooleanField_1.default;
exports.materialBooleanFieldTester = MaterialBooleanField_1.materialBooleanFieldTester;
const MaterialDateField_1 = require("./MaterialDateField");
exports.MaterialDateField = MaterialDateField_1.default;
exports.materialDateFieldTester = MaterialDateField_1.materialDateFieldTester;
const MaterialEnumField_1 = require("./MaterialEnumField");
exports.MaterialEnumField = MaterialEnumField_1.default;
exports.materialEnumFieldTester = MaterialEnumField_1.materialEnumFieldTester;
const MaterialIntegerField_1 = require("./MaterialIntegerField");
exports.MaterialIntegerField = MaterialIntegerField_1.default;
exports.materialIntegerFieldTester = MaterialIntegerField_1.materialIntegerFieldTester;
const MaterialNumberField_1 = require("./MaterialNumberField");
exports.MaterialNumberField = MaterialNumberField_1.default;
exports.materialNumberFieldTester = MaterialNumberField_1.materialNumberFieldTester;
const MaterialNumberFormatField_1 = require("./MaterialNumberFormatField");
exports.MaterialNumberFormatField = MaterialNumberFormatField_1.default;
exports.materialNumberFormatFieldTester = MaterialNumberFormatField_1.materialNumberFormatFieldTester;
const MaterialSliderField_1 = require("./MaterialSliderField");
exports.MaterialSliderField = MaterialSliderField_1.default;
exports.materialSliderFieldTester = MaterialSliderField_1.materialSliderFieldTester;
const MaterialTextField_1 = require("./MaterialTextField");
exports.MaterialTextField = MaterialTextField_1.default;
exports.materialTextFieldTester = MaterialTextField_1.materialTextFieldTester;
const MaterialTimeField_1 = require("./MaterialTimeField");
exports.MaterialTimeField = MaterialTimeField_1.default;
exports.materialTimeFieldTester = MaterialTimeField_1.materialTimeFieldTester;

});
___scope___.file("client/modules/notebook/forms-core/material/fields/MaterialDateField.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@material-ui/core");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const core_2 = require("../../core");
const react_1 = require("../../react");
exports.MaterialDateField = (props) => {
    const { data, className, id, enabled, uischema, path, handleChange } = props;
    return (React.createElement(core_1.Input, { type: 'date', value: data || '', onChange: ev => handleChange(path, ev.target.value), className: className, id: id, disabled: !enabled, autoFocus: uischema.options && uischema.options.focus, fullWidth: true }));
};
exports.materialDateFieldTester = core_2.rankWith(2, core_2.isDateControl);
let MaterializedDateField = class MaterializedDateField extends React.Component {
    render() {
        const effectiveProps = react_1.createPropsForItem(this.props, core_2.mapStoreValuesToFieldProps, core_2.mapUpdateActionToFieldProps);
        return (React.createElement(exports.MaterialDateField, Object.assign({}, effectiveProps)));
    }
};
MaterializedDateField = tslib_1.__decorate([
    mobx_react_1.inject("jsonFormsStore"),
    mobx_react_1.observer
], MaterializedDateField);
exports.default = MaterializedDateField;

});
___scope___.file("client/modules/notebook/forms-core/material/fields/MaterialEnumField.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@material-ui/core");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const core_2 = require("../../core");
const react_1 = require("../../react");
exports.MaterialEnumField = (props) => {
    const { data, className, id, enabled, uischema, path, handleChange, scopedSchema } = props;
    const options = scopedSchema.enum;
    return (React.createElement(core_1.Select, { className: className, id: id, disabled: !enabled, autoFocus: uischema.options && uischema.options.focus, value: data || '', onChange: ev => handleChange(path, ev.target.value), fullWidth: true }, [React.createElement(core_1.MenuItem, { value: '', key: 'empty' })]
        .concat(options.map(optionValue => (React.createElement(core_1.MenuItem, { value: optionValue, key: optionValue }, optionValue))))));
};
exports.materialEnumFieldTester = core_2.rankWith(2, core_2.isEnumControl);
let MaterializedEnumField = class MaterializedEnumField extends React.Component {
    render() {
        const effectiveProps = react_1.createPropsForItem(this.props, core_2.mapStoreValuesToFieldProps, core_2.mapUpdateActionToFieldProps);
        return (React.createElement(exports.MaterialEnumField, Object.assign({}, effectiveProps)));
    }
};
MaterializedEnumField = tslib_1.__decorate([
    mobx_react_1.inject("jsonFormsStore"),
    mobx_react_1.observer
], MaterializedEnumField);
exports.default = MaterializedEnumField;

});
___scope___.file("client/modules/notebook/forms-core/material/fields/MaterialIntegerField.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@material-ui/core");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const core_2 = require("../../core");
const react_1 = require("../../react");
exports.MaterialIntegerField = (props) => {
    const { data, className, id, enabled, uischema, path, handleChange } = props;
    const config = { 'step': '1' };
    return (React.createElement(core_1.Input, { type: 'number', value: data || '', onChange: ev => handleChange(path, parseInt(ev.target.value, 10)), className: className, id: id, disabled: !enabled, autoFocus: uischema.options && uischema.options.focus, inputProps: config, fullWidth: true }));
};
exports.materialIntegerFieldTester = core_2.rankWith(2, core_2.isIntegerControl);
let MaterializedIntegerField = class MaterializedIntegerField extends React.Component {
    render() {
        const effectiveProps = react_1.createPropsForItem(this.props, core_2.mapStoreValuesToFieldProps, core_2.mapUpdateActionToFieldProps);
        return (React.createElement(exports.MaterialIntegerField, Object.assign({}, effectiveProps)));
    }
};
MaterializedIntegerField = tslib_1.__decorate([
    mobx_react_1.inject("jsonFormsStore"),
    mobx_react_1.observer
], MaterializedIntegerField);
exports.default = MaterializedIntegerField;

});
___scope___.file("client/modules/notebook/forms-core/material/fields/MaterialNumberField.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@material-ui/core");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const core_2 = require("../../core");
const react_1 = require("../../react");
exports.MaterialNumberField = (props) => {
    const { data, className, id, enabled, uischema, path, handleChange } = props;
    const config = { 'step': '0.1' };
    return (React.createElement(core_1.Input, { type: 'number', value: data || '', onChange: ev => handleChange(path, Number(ev.target.value)), className: className, id: id, disabled: !enabled, autoFocus: uischema.options && uischema.options.focus, inputProps: config, fullWidth: true }));
};
exports.materialNumberFieldTester = core_2.rankWith(2, core_2.isNumberControl);
let MaterializedNumberField = class MaterializedNumberField extends React.Component {
    render() {
        const effectiveProps = react_1.createPropsForItem(this.props, core_2.mapStoreValuesToFieldProps, core_2.mapUpdateActionToFieldProps);
        return (React.createElement(exports.MaterialNumberField, Object.assign({}, effectiveProps)));
    }
};
MaterializedNumberField = tslib_1.__decorate([
    mobx_react_1.inject("jsonFormsStore"),
    mobx_react_1.observer
], MaterializedNumberField);
exports.default = MaterializedNumberField;

});
___scope___.file("client/modules/notebook/forms-core/material/fields/MaterialNumberFormatField.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@material-ui/core");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const core_2 = require("../../core");
const react_1 = require("../../react");
const MaterialNumberFormatField = (props) => {
    const { className, id, enabled, uischema, isValid, path, handleChange, scopedSchema } = props;
    const maxLength = scopedSchema.maxLength;
    let config;
    if (uischema.options && uischema.options.restrict) {
        config = { 'maxLength': maxLength };
    }
    else {
        config = {};
    }
    const trim = uischema.options && uischema.options.trim;
    const formattedNumber = props.toFormatted(props.data);
    const onChange = ev => {
        const validStringNumber = props.fromFormatted(ev.currentTarget.value);
        handleChange(path, validStringNumber);
    };
    return (React.createElement(core_1.Input, { type: 'text', value: formattedNumber, onChange: onChange, className: className, id: id, disabled: !enabled, autoFocus: uischema.options && uischema.options.focus, multiline: uischema.options && uischema.options.multi, fullWidth: !trim || maxLength === undefined, inputProps: config, error: !isValid }));
};
exports.materialNumberFormatFieldTester = core_2.rankWith(4, core_2.isNumberFormatControl);
let MaterializedNumberFormatField = class MaterializedNumberFormatField extends React.Component {
    render() {
        const effectiveProps = react_1.createPropsForItem(this.props, core_2.mapStoreValuesToFieldProps, core_2.mapUpdateActionToFieldProps);
        return (React.createElement(MaterialNumberFormatField, Object.assign({}, effectiveProps)));
    }
};
MaterializedNumberFormatField = tslib_1.__decorate([
    mobx_react_1.inject("jsonFormsStore"),
    mobx_react_1.observer
], MaterializedNumberFormatField);
exports.default = MaterializedNumberFormatField;

});
___scope___.file("client/modules/notebook/forms-core/material/fields/MaterialSliderField.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@material-ui/core");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const core_2 = require("../../core");
const react_1 = require("../../react");
const MaterialSliderField = (props) => {
    const { data, className, id, enabled, uischema, path, handleChange, scopedSchema } = props;
    const config = { 'max': scopedSchema.maximum, 'min': scopedSchema.minimum };
    return (React.createElement(core_1.Input, { type: 'range', value: data || scopedSchema.default, onChange: ev => handleChange(path, Number(ev.currentTarget.value)), className: className, id: id, disabled: !enabled, autoFocus: uischema.options && uischema.options.focus, inputProps: config, endAdornment: React.createElement("label", { style: { marginLeft: '0.5em' } }, data || scopedSchema.default) }));
};
exports.materialSliderFieldTester = core_2.rankWith(4, core_2.isRangeControl);
let MaterializedSliderField = class MaterializedSliderField extends React.Component {
    render() {
        const effectiveProps = react_1.createPropsForItem(this.props, core_2.mapStoreValuesToFieldProps, core_2.mapUpdateActionToFieldProps);
        return (React.createElement(MaterialSliderField, Object.assign({}, effectiveProps)));
    }
};
MaterializedSliderField = tslib_1.__decorate([
    mobx_react_1.inject("jsonFormsStore"),
    mobx_react_1.observer
], MaterializedSliderField);
exports.default = MaterializedSliderField;

});
___scope___.file("client/modules/notebook/forms-core/material/fields/MaterialTextField.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@material-ui/core");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const core_2 = require("../../core");
const react_1 = require("../../react");
exports.MaterialTextField = (props) => {
    const { data, config, className, id, enabled, uischema, isValid, path, handleChange, scopedSchema } = props;
    const maxLength = scopedSchema.maxLength;
    let inputProps;
    if (config.restrict) {
        inputProps = { 'maxLength': maxLength };
    }
    else {
        inputProps = {};
    }
    if (config.trim && maxLength !== undefined) {
        inputProps.size = maxLength;
    }
    const onChange = ev => handleChange(path, ev.target.value);
    return (React.createElement(core_1.Input, { type: 'text', value: data || '', onChange: onChange, className: className, id: id, disabled: !enabled, autoFocus: uischema.options && uischema.options.focus, multiline: uischema.options && uischema.options.multi, fullWidth: !config.trim || maxLength === undefined, inputProps: inputProps, error: !isValid }));
};
exports.materialTextFieldTester = core_2.rankWith(1, core_2.isStringControl);
let MaterializedTextField = class MaterializedTextField extends React.Component {
    render() {
        const effectiveProps = react_1.createPropsForItem(this.props, core_2.mapStoreValuesToFieldProps, core_2.mapUpdateActionToFieldProps);
        return (React.createElement(exports.MaterialTextField, Object.assign({}, effectiveProps)));
    }
};
MaterializedTextField = tslib_1.__decorate([
    mobx_react_1.inject("jsonFormsStore"),
    mobx_react_1.observer
], MaterializedTextField);
exports.default = MaterializedTextField;

});
___scope___.file("client/modules/notebook/forms-core/material/fields/MaterialTimeField.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@material-ui/core");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const core_2 = require("../../core");
const react_1 = require("../../react");
exports.MaterialTimeField = (props) => {
    const { data, className, id, enabled, uischema, path, handleChange } = props;
    return (React.createElement(core_1.Input, { type: 'time', value: data || '', onChange: ev => handleChange(path, ev.target.value), className: className, id: id, disabled: !enabled, autoFocus: uischema.options && uischema.options.focus, fullWidth: true }));
};
exports.materialTimeFieldTester = core_2.rankWith(2, core_2.isTimeControl);
let MaterializedTimeField = class MaterializedTimeField extends React.Component {
    render() {
        const effectiveProps = react_1.createPropsForItem(this.props, core_2.mapStoreValuesToFieldProps, core_2.mapUpdateActionToFieldProps);
        return (React.createElement(exports.MaterialTimeField, Object.assign({}, effectiveProps)));
    }
};
MaterializedTimeField = tslib_1.__decorate([
    mobx_react_1.inject("jsonFormsStore"),
    mobx_react_1.observer
], MaterializedTimeField);
exports.default = MaterializedTimeField;

});
___scope___.file("client/modules/notebook/Forms/Rating.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class Rating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: props.value,
            hoverAt: null
        };
    }
    handleMouseOver(idx) {
        this.setState({
            hoverAt: idx + 1
        });
    }
    handleMouseOut() {
        this.setState({
            hoverAt: null
        });
    }
    handleClick(idx) {
        this.setState({
            rating: idx + 1
        });
    }
    render() {
        const { onClick } = this.props;
        return (React.createElement("div", null, [0, 1, 2, 3, 4].map(i => {
            const rating = this.state.hoverAt != null ? this.state.hoverAt : this.state.rating;
            return React.createElement("span", { onMouseOver: () => this.handleMouseOver(i), onMouseOut: () => this.handleMouseOut(), onClick: () => {
                    this.handleClick(i);
                    onClick({ value: i + 1 });
                }, key: `${this.props.id}_${i}` }, i < rating ? '\u2605' : '\u2606');
        })));
    }
}
exports.Rating = Rating;

});
___scope___.file("client/modules/notebook/Forms/ratingControlTester.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_core_1 = require("../forms-core");
exports.default = forms_core_1.rankWith(Number.MAX_VALUE, forms_core_1.scopeEndsWith('rating'));

});
___scope___.file("client/Router.jsx", function(exports, require, module, __filename, __dirname){

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
const AppRouter = mobx_react_1.inject('nav')(mobx_react_1.observer((props) => (React.createElement("div", { className: typestyle_1.style(csstips_1.flex, csstips_1.vertical) }, when_switch_1.default(props.nav.route)
    .is('notebook', () => React.createElement(View_1.NotebookView, null))
    .is('datasets', () => React.createElement(modules_1.DatasetsPage, null))
    .is('charts', () => React.createElement(modules_1.SettingsPage, null))
    .is('dashboard', () => React.createElement(modules_1.DashboardPage, null))
    .is('cloud', () => React.createElement(designer_screen_1.DesignerApp, null))
    .is('catalog', () => React.createElement(modules_1.SettingsPage, null))
    .is('settings', () => React.createElement(modules_1.SettingsPage, null))
    .is('about', () => React.createElement(modules_1.AboutPage, null))
    .else(() => React.createElement(View_1.NotebookView, null))))));
exports.AppRouter = AppRouter;

});
___scope___.file("client/modules/notebook/View.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const layout_1 = require("./layout");
const mobx_react_1 = require("mobx-react");
const Canvas_1 = require("./Diagram/Canvas");
exports.NotebookView = mobx_react_1.observer((props) => {
    return (React.createElement(React.Fragment, null,
        React.createElement(layout_1.NotebookLayout, null,
            React.createElement(Canvas_1.Canvas, { num: "2", someProp: 100 }))));
});

});
___scope___.file("client/modules/notebook/layout.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const mobx_react_1 = require("mobx-react");
const NodeDrawer_1 = require("./Drawers/NodeDrawer");
const controlbar_1 = require("./controlbar");
const InputNode_1 = require("./Nodes/InputNode");
const FunctionNode_1 = require("./Nodes/FunctionNode");
const DebugNode_1 = require("./Nodes/DebugNode");
const layout_1 = require("../layout");
require("./diagram.css");
const theming_1 = require("theming");
const styled_jss_1 = require("styled-jss");
const NodeFormDrawer_1 = require("./Drawers/NodeFormDrawer");
const MainWorkSpace = theming_1.withTheme(styled_jss_1.default('div')(({ theme }) => ({
    display: "flex",
    flex: 1,
    height: "100vh",
    width: "100%",
    backgroundColor: theme.palette.primary.main,
})));
let NotebookLayout = class NotebookLayout extends React.Component {
    render() {
        const { nodeFormDrawerToggle, nodeDrawerToggle } = this.props.store.uiStore;
        const nodeDrawer = (React.createElement(NodeDrawer_1.NodeDrawer, null,
            React.createElement(InputNode_1.InputNode, null),
            React.createElement(FunctionNode_1.FunctionNode, null),
            React.createElement(DebugNode_1.DebugNode, null)));
        const nodeFormDrawer = (React.createElement(NodeFormDrawer_1.NodeFormDrawer, null));
        return (React.createElement(layout_1.FillParent, null,
            React.createElement(layout_1.FillFlex, null,
                React.createElement(layout_1.Row, null,
                    React.createElement(layout_1.VerticalStretch, null,
                        React.createElement(layout_1.Row, null,
                            React.createElement(layout_1.Row, null,
                                React.createElement(MainWorkSpace, null,
                                    this.props.children,
                                    React.createElement("div", null))),
                            React.createElement("div", { style: { width: nodeFormDrawerToggle.open ? 'auto' : 0 } }, nodeFormDrawer),
                            React.createElement("div", { style: { width: nodeDrawerToggle.open ? 180 : 0 } }, nodeDrawer),
                            React.createElement(controlbar_1.NotebookControlBar, null)))))));
    }
};
NotebookLayout = tslib_1.__decorate([
    mobx_react_1.inject("store"),
    mobx_react_1.observer
], NotebookLayout);
exports.NotebookLayout = NotebookLayout;

});
___scope___.file("client/modules/notebook/Drawers/NodeDrawer.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const List_1 = require("@material-ui/core/List");
const Divider_1 = require("@material-ui/core/Divider");
const IconButton_1 = require("@material-ui/core/IconButton");
const ArrowForward_1 = require("@material-ui/icons/ArrowForward");
const mobx_react_1 = require("mobx-react");
const core_1 = require("@material-ui/core");
const styled_jss_1 = require("styled-jss");
const layout_1 = require("../../layout");
const NodeDrawerDimensions = styled_jss_1.default(core_1.Card)({
    maxWidth: 180,
    width: '180px',
    minHeight: "100%",
    flex: "1 1 auto",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignmentBaseline: "central",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08)",
});
let headerStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
};
let NodeDrawer = class NodeDrawer extends React.Component {
    render() {
        const { nodeDrawerToggle } = this.props.store.uiStore;
        const nodeDrawer = (React.createElement(NodeDrawerDimensions, null,
            React.createElement(layout_1.VerticalStretch, null,
                React.createElement("div", { style: headerStyles },
                    React.createElement(IconButton_1.default, { onClick: () => nodeDrawerToggle.openDrawer(false) },
                        React.createElement(ArrowForward_1.default, null))),
                React.createElement(Divider_1.default, null),
                React.createElement(List_1.default, null,
                    React.createElement("div", null, this.props.children)))));
        return nodeDrawer;
    }
};
NodeDrawer = tslib_1.__decorate([
    mobx_react_1.inject('store'),
    mobx_react_1.observer
], NodeDrawer);
exports.NodeDrawer = NodeDrawer;

});
___scope___.file("client/modules/layout/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./AppLayout"), exports);
tslib_1.__exportStar(require("./CommandBar"), exports);
tslib_1.__exportStar(require("./dimensions"), exports);
tslib_1.__exportStar(require("./Footer"), exports);
tslib_1.__exportStar(require("./IconNavigation"), exports);
tslib_1.__exportStar(require("./Workspace"), exports);

});
___scope___.file("client/modules/notebook/controlbar.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const PlayCircleFilled_1 = require("@material-ui/icons/PlayCircleFilled");
const FormatAlignRight_1 = require("@material-ui/icons/FormatAlignRight");
const IconButton_1 = require("@material-ui/core/IconButton");
const Close_1 = require("@material-ui/icons/Close");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const styled_jss_1 = require("styled-jss");
const toaster_1 = require("../../components/modals/toaster");
const core_1 = require("@blueprintjs/core");
const Stack_1 = require("../../common/Stack");
const _ = require("lodash");
const socket_1 = require("../../rpc/socket");
const theming_1 = require("theming");
const RightControlBarDimensions = theming_1.withTheme(styled_jss_1.default('div')(({ theme }) => ({
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
    backgroundColor: 'white',
    color: theme.palette.primary.main
})));
let NotebookControlBar = class NotebookControlBar extends React.Component {
    constructor() {
        super(...arguments);
        this.dfsPaths = [];
    }
    render() {
        const { nodeDrawerToggle, diagramModel } = this.props.store.uiStore;
        const isOrphan = (obj) => {
            let isOrphan = false;
            if (obj.cogType) {
                obj.ports.some((port) => {
                    let doBreak = false;
                    if (port.name === "leftCenter" && port.links.length == 0) {
                        isOrphan = true;
                        doBreak = true;
                    }
                    return doBreak;
                });
            }
            else {
                if (!obj.target)
                    isOrphan = true;
            }
            return isOrphan;
        };
        const isTerminalNode = (node) => {
            let isTerminal = false;
            if (node.cogType === "cogliteDebug")
                isTerminal = true;
            else if (node.cogType === "cogliteFunctionMath") {
                node.ports.some((port) => {
                    let doBreak = false;
                    if (port.name === "rightCenter" && port.links.length == 0) {
                        isTerminal = true;
                        doBreak = true;
                    }
                    return doBreak;
                });
            }
            return isTerminal;
        };
        const initializeDiagram = (diagram) => {
            let initiatedNodes = [];
            let initiatedLinks = [];
            diagram.nodes.forEach((node) => {
                if (!isOrphan(node)) {
                    node.label = "unexplored";
                    if (node.cogType === "cogliteInput")
                        node.isRootNode = true;
                    if (isTerminalNode(node)) {
                        node.isTerminal = true;
                    }
                    initiatedNodes.push(node);
                }
            });
            diagram.links.forEach((link) => {
                if (!isOrphan(link)) {
                    link.label = "unexplored";
                    initiatedLinks.push(link);
                }
            });
            diagram.nodes = initiatedNodes;
            diagram.links = initiatedLinks;
            return diagram;
        };
        const traverseModel = (diagram, nodeIndex, nodeLinks) => {
            let currentNode = diagram.nodes[nodeIndex];
            currentNode.label = "visited";
            this.pathStack.push(currentNode);
            if (currentNode.isTerminal) {
                this.dfsPaths.push(_.cloneDeep(this.pathStack.elements()));
            }
            nodeLinks[currentNode.id].forEach((link) => {
                let nextLink = diagram.links.find((currentLink) => currentLink.id === link.id);
                let nextNodeId;
                if (nextLink.label === "unexplored") {
                    if (nextLink.source === currentNode.id)
                        nextNodeId = nextLink.target;
                    else
                        nextNodeId = nextLink.source;
                    let nextNodeIndex = diagram.nodes.findIndex((node) => node.id === nextNodeId);
                    let nextNode = diagram.nodes[nextNodeIndex];
                    if (nextNode.label === "unexplored") {
                        nextLink.label = "discovered";
                        this.pathStack.push(nextLink);
                        traverseModel(diagram, nextNodeIndex, nodeLinks);
                        this.pathStack.pop();
                    }
                    else {
                        nextLink.label = "back";
                    }
                }
            });
            this.pathStack.pop();
        };
        const runModel = () => {
            let serializedDiagram = diagramModel.serializeDiagram();
            serializedDiagram = initializeDiagram(serializedDiagram);
            console.log(serializedDiagram);
            this.pathStack = new Stack_1.Stack();
            this.dfsPaths = [];
            const nodeLinks = {};
            serializedDiagram.links.forEach(link => {
                if (nodeLinks[link.source]) {
                    nodeLinks[link.source].push(link);
                }
                else {
                    nodeLinks[link.source] = [];
                    nodeLinks[link.source].push(link);
                }
                if (nodeLinks[link.target]) {
                    nodeLinks[link.target].push(link);
                }
                else {
                    nodeLinks[link.target] = [];
                    nodeLinks[link.target].push(link);
                }
            });
            serializedDiagram.nodes.some((currentNode, nodeIndex) => {
                let doBreak = false;
                if (currentNode.isRootNode) {
                    traverseModel(serializedDiagram, nodeIndex, nodeLinks);
                    console.log("----The Depth First Search traversal Paths are----");
                    console.log(this.dfsPaths);
                    const { nodeFormsData } = this.props.store.uiStore;
                    let hasErrors = false;
                    const pathSteps = [];
                    this.dfsPaths.forEach((dfsPath) => {
                        let currentPathSteps = [];
                        dfsPath.forEach((obj) => {
                            if (obj.cogType === "cogliteInput") {
                                if (nodeFormsData[obj.cogType] && nodeFormsData[obj.cogType][obj.id]) {
                                    currentPathSteps.push("input");
                                    currentPathSteps.push(nodeFormsData[obj.cogType][obj.id]["inject"]);
                                }
                                else {
                                    hasErrors = true;
                                }
                            }
                            else if (obj.cogType === "cogliteFunctionMath") {
                                if (nodeFormsData[obj.cogType] && nodeFormsData[obj.cogType][obj.id]) {
                                    currentPathSteps.push(nodeFormsData[obj.cogType][obj.id]["operator"]);
                                    currentPathSteps.push(nodeFormsData[obj.cogType][obj.id]["operand"]);
                                }
                                else {
                                    hasErrors = true;
                                }
                            }
                            else if (obj.cogType === "cogliteDebug") {
                                currentPathSteps.push("debug");
                            }
                        });
                        pathSteps.push(currentPathSteps);
                    });
                    if (!hasErrors) {
                        console.log("----The value paths are----");
                        console.log(pathSteps);
                        let ws = socket_1.initiateRpcClient();
                        let previousValue = null;
                        const executeNode = (ws, currentPath) => {
                            if (currentPath.length == 0) {
                                console.log("FUNCTION NODE TERMINALITY...");
                                console.log(previousValue);
                                return;
                            }
                            else {
                                let latestAction = currentPath.shift();
                                if (latestAction === "input") {
                                    previousValue = currentPath.shift();
                                    executeNode(ws, currentPath);
                                }
                                else if (latestAction === "debug") {
                                    console.log("DEBUG ENDPOINT");
                                    console.log(previousValue);
                                    return;
                                }
                                else {
                                    let latestValue = currentPath.shift();
                                    ws.call(latestAction, [previousValue, latestValue]).then(function (result) {
                                        previousValue = result;
                                        executeNode(ws, currentPath);
                                    });
                                }
                            }
                        };
                        pathSteps.forEach((currentPath, currentPathIndex) => {
                            ws.on('open', function () {
                                console.log("--- JSON RPC Websocket execution for path " + currentPathIndex + " INIT");
                                executeNode(ws, currentPath);
                                console.log("--- JSON RPC Websocket execution for path " + currentPathIndex + " END");
                            });
                        });
                    }
                    else {
                        toaster_1.GlobalToaster.show({
                            message: 'Please fill all the forms',
                            intent: core_1.Intent.DANGER,
                            action: {
                                onClick: () => { },
                                text: "add text if u want here"
                            }
                        });
                    }
                    doBreak = true;
                }
                return doBreak;
            });
        };
        return (React.createElement(RightControlBarDimensions, null,
            React.createElement(IconButton_1.default, { onClick: () => nodeDrawerToggle.toggleDrawer(), color: "inherit" }, nodeDrawerToggle.open ? React.createElement(Close_1.default, null) : React.createElement(FormatAlignRight_1.default, null)),
            React.createElement(IconButton_1.default, { onClick: runModel, color: "inherit" },
                React.createElement(PlayCircleFilled_1.default, null))));
    }
};
NotebookControlBar = tslib_1.__decorate([
    mobx_react_1.inject("store", "jsonFormsStore"),
    mobx_react_1.observer
], NotebookControlBar);
exports.NotebookControlBar = NotebookControlBar;

});
___scope___.file("client/components/modals/toaster.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@blueprintjs/core");
const GlobalToaster = core_1.Toaster.create();
exports.default = GlobalToaster;
exports.GlobalToaster = GlobalToaster;

});
___scope___.file("client/common/Stack.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Stack {
    constructor() {
        this.init();
    }
    init() {
        this.items = [];
        this.count = 0;
    }
    getLength() {
        return this.count;
    }
    push(item) {
        this.items.push(item);
        this.count = this.count + 1;
    }
    pop() {
        if (this.count > 0) {
            this.count = this.count - 1;
        }
        return this.items.pop();
    }
    peek() {
        return this.items.slice(-1)[0];
    }
    elements() {
        return this.items;
    }
    empty() {
        this.init();
    }
}
exports.default = Stack;
exports.Stack = Stack;

});
___scope___.file("client/rpc/socket.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rpc_websockets_1 = require("rpc-websockets");
exports.initiateRpcClient = (port = 9000, host = "localhost") => {
    const webSocketString = `ws://${host}:${port}`;
    const ws = new rpc_websockets_1.Client(webSocketString);
    return ws;
};

});
___scope___.file("client/modules/notebook/Nodes/InputNode.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const core_1 = require("@material-ui/core");
const Input_1 = require("@material-ui/icons/Input");
const mobx_react_1 = require("mobx-react");
let InputNode = class InputNode extends React.Component {
    render() {
        const { classes } = this.props;
        const inputNode = (React.createElement(core_1.ListItem, { classes: classes, component: "div", draggable: true, onDragStart: event => {
                event.dataTransfer.setData("storm-diagram-node", JSON.stringify({ type: "cogliteInput" }));
            } },
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
___scope___.file("client/modules/notebook/Nodes/FunctionNode.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const core_1 = require("@material-ui/core");
const Functions_1 = require("@material-ui/icons/Functions");
const mobx_react_1 = require("mobx-react");
const theming_1 = require("theming");
let _FunctionNode = class _FunctionNode extends React.Component {
    render() {
        const { classes } = this.props;
        return (React.createElement(core_1.ListItem, { classes: classes, component: "div", draggable: true, onDragStart: event => {
                event.dataTransfer.setData("storm-diagram-node", JSON.stringify({ type: "cogliteFunctionMath" }));
            } },
            React.createElement(core_1.ListItemIcon, null,
                React.createElement(Functions_1.default, null)),
            React.createElement(core_1.ListItemText, { primary: "Function" })));
    }
};
_FunctionNode = tslib_1.__decorate([
    mobx_react_1.inject('store'),
    mobx_react_1.observer
], _FunctionNode);
exports.FunctionNode = theming_1.withTheme(_FunctionNode);

});
___scope___.file("client/modules/notebook/Nodes/DebugNode.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const core_1 = require("@material-ui/core");
const Pageview_1 = require("@material-ui/icons/Pageview");
const mobx_react_1 = require("mobx-react");
let DebugNode = class DebugNode extends React.Component {
    render() {
        const { classes } = this.props;
        const debugNode = (React.createElement(core_1.ListItem, { classes: classes, component: "div", draggable: true, onDragStart: event => {
                event.dataTransfer.setData("storm-diagram-node", JSON.stringify({ type: "cogliteDebug" }));
            } },
            React.createElement(core_1.ListItemIcon, null,
                React.createElement(Pageview_1.default, null)),
            React.createElement(core_1.ListItemText, { primary: "Debug" })));
        return debugNode;
    }
};
DebugNode = tslib_1.__decorate([
    mobx_react_1.observer
], DebugNode);
exports.DebugNode = DebugNode;

});
___scope___.file("client/modules/notebook/diagram.css", function(exports, require, module, __filename, __dirname){


require("fuse-box-css")("default/client/modules/notebook/diagram.css", ".srd-diagram {\r\n  position: relative;\r\n  flex-grow: 1;\r\n  display: flex;\r\n  cursor: move;\r\n  overflow: hidden; }\r\n  .srd-diagram__selector {\r\n    position: absolute;\r\n    background-color: rgba(0, 192, 255, 0.2);\r\n    border: solid 2px #00c0ff; }\r\n\r\n.srd-link-layer {\r\n  position: absolute;\r\n  height: 100%;\r\n  width: 100%;\r\n  transform-origin: 0 0;\r\n  overflow: visible !important;\r\n  top: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  right: 0; }\r\n\r\n.srd-node-layer {\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  position: absolute;\r\n  pointer-events: none;\r\n  transform-origin: 0 0;\r\n  width: 100%;\r\n  height: 100%; }\r\n\r\n.srd-node {\r\n  position: absolute;\r\n  -webkit-touch-callout: none;\r\n  -webkit-user-select: none;\r\n  user-select: none;\r\n  cursor: move;\r\n  pointer-events: all; }\r\n  .srd-node--selected > * {\r\n    border-color: #00c0ff !important; }\r\n\r\n.srd-port {\r\n  width: 15px;\r\n  height: 15px;\r\n  background: rgba(128, 128, 128, 0.1); }\r\n  .srd-port:hover, .srd-port.selected {\r\n    background: #c0ff00; }\r\n\r\n.srd-default-node {\r\n  background-color: #1e1e1e;\r\n  border-radius: 5px;\r\n  font-family: sans-serif;\r\n  color: white;\r\n  border: solid 2px black;\r\n  overflow: visible;\r\n  font-size: 11px; }\r\n  .srd-default-node__title {\r\n    background: rgba(0, 0, 0, 0.3);\r\n    display: flex;\r\n    white-space: nowrap; }\r\n    .srd-default-node__title > * {\r\n      align-self: center; }\r\n    .srd-default-node__title .fa {\r\n      padding: 5px;\r\n      opacity: 0.2;\r\n      cursor: pointer; }\r\n      .srd-default-node__title .fa:hover {\r\n        opacity: 1.0; }\r\n  .srd-default-node__name {\r\n    flex-grow: 1;\r\n    padding: 5px 5px; }\r\n  .srd-default-node__ports {\r\n    display: flex;\r\n    background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)); }\r\n  .srd-default-node__in, .srd-default-node__out {\r\n    flex-grow: 1;\r\n    display: flex;\r\n    flex-direction: column; }\r\n\r\n.srd-default-port {\r\n  display: flex;\r\n  margin-top: 1px; }\r\n  .srd-default-port > * {\r\n    align-self: center; }\r\n  .srd-default-port__name {\r\n    padding: 0 5px; }\r\n  .srd-default-port--out {\r\n    justify-content: flex-end; }\r\n    .srd-default-port--out .srd-default-port__name {\r\n      justify-content: flex-end;\r\n      text-align: right; }\r\n\r\n.srd-default-label {\r\n  background: rgba(70, 70, 70, 0.8);\r\n  border: 1px solid #333;\r\n  border-radius: 4px;\r\n  color: #fff;\r\n  display: inline-block;\r\n  font-size: smaller;\r\n  padding: 5px; }\r\n\r\n@keyframes dash {\r\n  from {\r\n    stroke-dashoffset: 24; }\r\n  to {\r\n    stroke-dashoffset: 0; } }\r\n\r\n.srd-default-link path {\r\n  fill: none;\r\n  pointer-events: all; }\r\n\r\n.srd-default-link--path-selected {\r\n  stroke: #00c0ff !important;\r\n  stroke-dasharray: 10,2;\r\n  animation: dash 1s linear infinite; }\r\n\r\n.srd-default-link__label {\r\n  pointer-events: none; }\r\n  .srd-default-link__label > div {\r\n    display: inline-block;\r\n    position: absolute; }\r\n\r\n.srd-default-link__point {\r\n  fill: rgba(0, 0, 0, 0.5); }\r\n\r\n.srd-default-link--point-selected {\r\n  fill: #00c0ff; }\r\n\r\n.srd-coglite-canvas {\r\n  height: 100vh;\r\n  min-height: 600px;\r\n  background-color: #F7F7F7 !important;\r\n  background-image: linear-gradient(0deg, transparent 24%, rgba(0, 0, 0, 0.1) 25%, rgba(0, 0, 0, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 0, 0, 0.1) 25%, rgba(0, 0, 0, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0.1) 76%, transparent 77%, transparent);\r\n  background-size: 50px 50px; }\r\n  .srd-coglite-canvas .pointui {\r\n    fill: rgba(255, 255, 255, 0.5); }\r\n\r\n.diagram-layer {\r\n  position: relative;\r\n  height: 100%;\r\n  flex: 1; }\r\n")
});
___scope___.file("client/modules/notebook/Drawers/NodeFormDrawer.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const IconButton_1 = require("@material-ui/core/IconButton");
const ArrowForward_1 = require("@material-ui/icons/ArrowForward");
const mobx_react_1 = require("mobx-react");
const forms_core_1 = require("../forms-core");
const FormConfig_1 = require("../Forms/FormConfig");
const core_1 = require("@material-ui/core");
const styled_jss_1 = require("styled-jss");
const List_1 = require("@material-ui/core/List");
const Divider_1 = require("@material-ui/core/Divider");
const layout_1 = require("../../layout");
const NodeFormDrawerDimensions = styled_jss_1.default(core_1.Card)({
    minWidth: 245,
    minHeight: "100%",
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    alignmentBaseline: "central",
    position: 'relative'
});
let NodeFormDrawer = class NodeFormDrawer extends React.Component {
    render() {
        const { nodeFormDrawerToggle, activeCogliteNodeModel, isDynamicNodeFormUpdate } = this.props.store.uiStore;
        const cogType = activeCogliteNodeModel && activeCogliteNodeModel.model.cogType;
        const updateFormData = () => {
            const { activeCogliteNodeModel, nodeFormsData } = this.props.store.uiStore;
            const currentJsonFormsStoreData = this.props.jsonFormsStore.coreStore.data;
            const currentNodeId = activeCogliteNodeModel.model.id;
            for (const key of Object.keys(currentJsonFormsStoreData)) {
                console.log(key, currentJsonFormsStoreData[key]);
                if (nodeFormsData.hasOwnProperty(key)) {
                    nodeFormsData[key][currentNodeId] = currentJsonFormsStoreData[key];
                }
                else {
                    nodeFormsData[key] = {
                        [currentNodeId]: currentJsonFormsStoreData[key]
                    };
                }
            }
            this.props.store.uiStore.updateNodeFormsData(nodeFormsData);
        };
        if (isDynamicNodeFormUpdate) {
            updateFormData();
        }
        const closeDrawer = () => {
            updateFormData();
            nodeFormDrawerToggle.openDrawer(false);
        };
        const formBlock = (cogType) => {
            if (cogType) {
                if (cogType !== "cogliteDebug")
                    return (React.createElement(forms_core_1.JsonForms, { className: 'test-json-forms', schema: FormConfig_1.schema[cogType], uischema: FormConfig_1.uischema[cogType], path: cogType }));
                else
                    return "Check Console";
            }
            else {
                return null;
            }
        };
        const nodeFormDrawer = (React.createElement(NodeFormDrawerDimensions, null,
            React.createElement(layout_1.VerticalStretch, null,
                React.createElement(core_1.Button, { onClick: updateFormData }, "update"),
                React.createElement("div", { style: nodeFormDrawerHeader },
                    React.createElement(IconButton_1.default, { onClick: closeDrawer },
                        React.createElement(ArrowForward_1.default, null))),
                React.createElement(Divider_1.default, null),
                React.createElement(List_1.default, null,
                    React.createElement("div", { style: formDrawerBlock },
                        formBlock(cogType),
                        React.createElement(core_1.Button, { variant: "contained", color: "primary", style: { margin: '8px' }, onClick: closeDrawer }, "Done"))))));
        return nodeFormDrawer;
    }
};
NodeFormDrawer = tslib_1.__decorate([
    mobx_react_1.inject("store", "jsonFormsStore"),
    mobx_react_1.observer
], NodeFormDrawer);
exports.NodeFormDrawer = NodeFormDrawer;
const formDrawerBlock = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
};
const nodeFormDrawerHeader = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px"
};

});
___scope___.file("client/modules/notebook/Diagram/Canvas.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _ = require("lodash");
const React = require("react");
const storm_react_diagrams_1 = require("storm-react-diagrams");
const CogliteLinkFactory_1 = require("./CogliteLinkFactory");
const CogliteNodeFactory_1 = require("./CogliteNodeFactory");
const CogliteNodeModel_1 = require("./CogliteNodeModel");
const CoglitePortModel_1 = require("./CoglitePortModel");
const SimplePortFactory_1 = require("./SimplePortFactory");
const CogliteDiagramWidget_1 = require("./CogliteDiagramWidget");
const mobx_react_1 = require("mobx-react");
let Canvas = class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.restoreFormData = (newModel) => {
            const { nodeFormsData } = this.props.store.uiStore;
            const currentJsonFormsStoreData = this.props.jsonFormsStore.coreStore.data;
            const currentNodeId = newModel.model.id;
            const currentCogType = newModel.model.cogType;
            let currentImp = null;
            if (nodeFormsData[currentCogType]) {
                currentImp = nodeFormsData[currentCogType][currentNodeId];
                if (!currentImp)
                    currentImp = {};
            }
            if (currentImp) {
                currentJsonFormsStoreData[currentCogType] = currentImp;
                this.props.jsonFormsStore.coreStore.setData(currentJsonFormsStoreData);
            }
        };
        this.handleNodeFormAction = (model) => {
            const { nodeFormDrawerToggle } = this.props.store.uiStore;
            if (model.model.type === "coglite") {
                this.restoreFormData(model);
                this.props.store.uiStore.updateActiveCogliteNodeModel(model);
                nodeFormDrawerToggle.openDrawer(true);
            }
        };
        this.diagramEngine = new storm_react_diagrams_1.DiagramEngine();
        this.diagramEngine.installDefaultFactories();
        this.initialiseModel();
    }
    initialiseModel() {
        this.diagramEngine.registerLinkFactory(new CogliteLinkFactory_1.CogliteLinkFactory());
        this.diagramEngine.registerPortFactory(new SimplePortFactory_1.SimplePortFactory("coglite", config => new CoglitePortModel_1.CoglitePortModel()));
        this.diagramEngine.registerNodeFactory(new CogliteNodeFactory_1.CogliteNodeFactory());
        var model = new storm_react_diagrams_1.DiagramModel();
        var node2 = new CogliteNodeModel_1.CogliteNodeModel("cogliteInput", "Input");
        node2.setPosition(100, 100);
        var node4 = new CogliteNodeModel_1.CogliteNodeModel("cogliteFunctionMath", "Math");
        node4.setPosition(350, 100);
        const node5 = new CogliteNodeModel_1.CogliteNodeModel("cogliteDebug", "Output");
        node5.setPosition(600, 100);
        var link3 = node2.getPort("rightCenter").link(node4.getPort("leftCenter"));
        const link5 = node4.getPort("rightCenter").link(node5.getPort("leftCenter"));
        model.addAll(node2, node4, link3, node5, link5);
        this.diagramEngine.setDiagramModel(model);
        this.props.store.uiStore.setDiagramModel(this.diagramEngine.diagramModel);
    }
    componentDidMount() {
        this.forceUpdate();
    }
    render() {
        return (React.createElement("div", { className: "diagram-layer", onDrop: event => {
                const data = JSON.parse(event.dataTransfer.getData("storm-diagram-node"));
                const currentNodes = this.diagramEngine.getDiagramModel().getNodes();
                const currentNodesKeys = _.keys(currentNodes);
                const isConflictingInput = currentNodesKeys.map(key => currentNodes[key]).find(model => model.cogType === "cogliteInput") && data.type === "cogliteInput";
                if (isConflictingInput) {
                    alert("Cannot add more than one input in a flow");
                }
                else {
                    let node = null;
                    if (data.type === "cogliteInput") {
                        node = new CogliteNodeModel_1.CogliteNodeModel("cogliteInput", "Node " + (currentNodesKeys.length + 1), "rgb(192,255,0)");
                    }
                    else if (data.type === "cogliteFunctionMath") {
                        node = new CogliteNodeModel_1.CogliteNodeModel("cogliteFunctionMath", "Node " + (currentNodesKeys.length + 1), "rgb(0,192,255)");
                    }
                    else {
                        node = new CogliteNodeModel_1.CogliteNodeModel("cogliteDebug", "Node " + (currentNodesKeys.length + 1), "rgb(0,192,255)");
                    }
                    var points = this.diagramEngine.getRelativeMousePoint(event);
                    node.x = points.x;
                    node.y = points.y;
                    this.diagramEngine.getDiagramModel().addNode(node);
                    this.forceUpdate();
                }
            }, onDragOver: event => {
            } },
            React.createElement(CogliteDiagramWidget_1.default, { formAction: this.handleNodeFormAction, className: "srd-coglite-canvas", diagramEngine: this.diagramEngine })));
    }
};
Canvas = tslib_1.__decorate([
    mobx_react_1.inject("store", "jsonFormsStore"),
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object])
], Canvas);
exports.Canvas = Canvas;

});
___scope___.file("client/modules/notebook/Diagram/CogliteLinkFactory.jsx", function(exports, require, module, __filename, __dirname){

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
___scope___.file("client/modules/notebook/Diagram/CogliteLinkModel.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storm_react_diagrams_1 = require("storm-react-diagrams");
const _ = require("lodash");
class CogliteLinkModel extends storm_react_diagrams_1.DefaultLinkModel {
    constructor() {
        super("coglite");
        super.setColor("rgba(0,0,0,0.75)");
        super.setWidth(2);
    }
    setTargetPort(port) {
        if (port !== null && (_.size(port.links) >= port.getMaximumLinks())) {
            return;
        }
        super.setTargetPort(port);
    }
    setSourcePort(port) {
        if (port !== null && (_.size(port.links) >= port.getMaximumLinks())) {
            return;
        }
        super.setSourcePort(port);
    }
}
exports.CogliteLinkModel = CogliteLinkModel;

});
___scope___.file("client/modules/notebook/Diagram/CogliteNodeFactory.jsx", function(exports, require, module, __filename, __dirname){

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
        return React.createElement(CogliteNodeWidget_1.CogliteNodeWidget, { node: node });
    }
    getNewInstance(initialConfig) {
        return new CogliteNodeModel_1.CogliteNodeModel();
    }
}
exports.CogliteNodeFactory = CogliteNodeFactory;

});
___scope___.file("client/modules/notebook/Diagram/CogliteNodeModel.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const storm_react_diagrams_1 = require("storm-react-diagrams");
const CoglitePortModel_1 = require("./CoglitePortModel");
class CogliteNodeModel extends storm_react_diagrams_1.NodeModel {
    constructor(cogType = "cogliteInput", name = "Untitled", color = "rgb(0,192,255)") {
        super("coglite");
        this.cogType = cogType;
        this.name = name;
        this.color = color;
        if (cogType === "cogliteInput" || cogType === "cogliteFunctionMath") {
            this.addPort(new CoglitePortModel_1.CoglitePortModel("rightCenter"));
        }
        if (cogType === "cogliteDebug" || cogType === "cogliteFunctionMath") {
            this.addPort(new CoglitePortModel_1.CoglitePortModel("leftCenter"));
        }
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
___scope___.file("client/modules/notebook/Diagram/CoglitePortModel.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const storm_react_diagrams_1 = require("storm-react-diagrams");
const CogliteLinkModel_1 = require("./CogliteLinkModel");
class CoglitePortModel extends storm_react_diagrams_1.PortModel {
    constructor(pos = "leftCenter") {
        super(pos, "coglite");
        this.position = pos;
        if (this.position === "leftCenter")
            this.maximumLinks = 1;
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
    createBaseLinkModel() {
        if (_.isFinite(this.maximumLinks)) {
            var numberOfLinks = _.size(this.links);
            console.log(this);
            console.log(numberOfLinks);
            console.log(this.maximumLinks);
            if (this.maximumLinks === 1 && numberOfLinks >= 1) {
                return _.values(this.links)[0];
            }
            else if (numberOfLinks >= this.maximumLinks) {
                return null;
            }
        }
        return null;
    }
    createLinkModel() {
        return new CogliteLinkModel_1.CogliteLinkModel();
    }
}
exports.CoglitePortModel = CoglitePortModel;

});
___scope___.file("client/modules/notebook/Diagram/CogliteNodeWidget.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Input_1 = require("@material-ui/icons/Input");
const Functions_1 = require("@material-ui/icons/Functions");
const Pageview_1 = require("@material-ui/icons/Pageview");
const core_1 = require("@material-ui/core");
const Divider_1 = require("@material-ui/core/Divider");
const IconButton_1 = require("@material-ui/core/IconButton");
const Typography_1 = require("@material-ui/core/Typography");
const React = require("react");
const storm_react_diagrams_1 = require("storm-react-diagrams");
const react_jss_1 = require("react-jss");
exports.style = theme => ({
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
    leftCenter: {
        position: "absolute",
        zIndex: 10,
        left: -5,
        top: `calc(100% / 2)`,
    },
    rightCenter: {
        position: "absolute",
        zIndex: 10,
        left: `calc(100% - 5px)`,
        top: `calc(100% / 2)`,
    }
});
class CogliteNodeWidgetBase extends storm_react_diagrams_1.BaseWidget {
    constructor(props) {
        super("srd-coglite-node", props);
        this.state = {};
    }
    getNodeHeaders(cogType) {
        let nodeHeaderIcon = null;
        let nodeHeaderText = null;
        if (cogType === "cogliteInput") {
            nodeHeaderIcon = React.createElement(Input_1.default, null);
            nodeHeaderText = 'Input Node';
        }
        else if (cogType === "cogliteFunctionMath") {
            nodeHeaderIcon = React.createElement(Functions_1.default, null);
            nodeHeaderText = 'Function Node';
        }
        else {
            nodeHeaderIcon = React.createElement(Pageview_1.default, null);
            nodeHeaderText = 'Debug Node';
        }
        return {
            'nodeHeaderIcon': nodeHeaderIcon,
            'nodeHeaderText': nodeHeaderText
        };
    }
    render() {
        const { classes, theme, node } = this.props;
        node.color = node.color || theme.palette.common.white;
        const nodeHeaders = this.getNodeHeaders(node.cogType);
        const rightPorts = (React.createElement("div", null,
            React.createElement("div", { className: classes.rightCenter },
                React.createElement(storm_react_diagrams_1.PortWidget, { name: "rightCenter", node: node }))));
        const leftPorts = (React.createElement("div", null,
            React.createElement("div", { className: classes.leftCenter },
                React.createElement(storm_react_diagrams_1.PortWidget, { name: "leftCenter", node: node }))));
        return (React.createElement("div", { className: classes.cardBasic },
            React.createElement(core_1.Card, { className: classes.details },
                React.createElement("div", null,
                    React.createElement("div", { className: classes.controls },
                        React.createElement(IconButton_1.default, { "aria-label": "Previous", className: classes.playIcon }, nodeHeaders.nodeHeaderIcon),
                        React.createElement(Typography_1.default, { variant: "subheading", className: classes.headerText }, nodeHeaders.nodeHeaderText))),
                React.createElement(Divider_1.default, null),
                React.createElement("div", null,
                    React.createElement(core_1.CardContent, { className: classes.content },
                        React.createElement(Typography_1.default, { component: "p", className: classes.name }, node.name)))),
            node.cogType === "cogliteInput" || node.cogType === "cogliteFunctionMath" ? rightPorts : null,
            node.cogType === "cogliteDebug" || node.cogType === "cogliteFunctionMath" ? leftPorts : null));
    }
}
exports.CogliteNodeWidgetBase = CogliteNodeWidgetBase;
exports.CogliteNodeWidget = react_jss_1.default(exports.style)(CogliteNodeWidgetBase);

});
___scope___.file("client/modules/notebook/Diagram/SimplePortFactory.js", function(exports, require, module, __filename, __dirname){

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
___scope___.file("client/modules/notebook/Diagram/CogliteDiagramWidget.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const storm_react_diagrams_1 = require("storm-react-diagrams");
class CogliteDiagramWidget extends React.Component {
    constructor(props) {
        super(props);
        this.onDoubleClick = (event) => {
            event.preventDefault();
            const model = this.child.getMouseElement(event);
            console.log(model);
            if (model === null) {
            }
            else if (model.model instanceof storm_react_diagrams_1.PortModel) {
            }
            else {
                if (this.props.formAction)
                    this.props.formAction(model);
            }
        };
    }
    render() {
        return (React.createElement("div", { className: "coglite-custom-widget", onDoubleClickCapture: this.onDoubleClick },
            React.createElement(storm_react_diagrams_1.DiagramWidget, Object.assign({ ref: instance => { this.child = instance; } }, this.props))));
    }
}
exports.default = CogliteDiagramWidget;

});
___scope___.file("client/modules/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./notebook"), exports);
tslib_1.__exportStar(require("./datasets"), exports);
tslib_1.__exportStar(require("./charts"), exports);
tslib_1.__exportStar(require("./dashboard"), exports);
tslib_1.__exportStar(require("./about"), exports);
tslib_1.__exportStar(require("./cloud"), exports);
tslib_1.__exportStar(require("./settings"), exports);
tslib_1.__exportStar(require("./layout"), exports);

});
___scope___.file("client/modules/notebook/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./View"), exports);

});
___scope___.file("client/modules/datasets.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
exports.DatasetsPage = () => React.createElement("div", null, "datasets");

});
___scope___.file("client/modules/charts.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
exports.ChartsPage = () => React.createElement("div", null, "Charts");

});
___scope___.file("client/modules/dashboard.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
function DashboardPage() {
    return React.createElement("div", null, "Dashboard");
}
exports.DashboardPage = DashboardPage;

});
___scope___.file("client/modules/about.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
exports.AboutPage = () => React.createElement("div", null, "About");

});
___scope___.file("client/modules/cloud.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const minesweeper_1 = require("~/@coglite/samples/minesweeper");
require("./minesweeper/assets/minesweeper.css");
exports.CloudPage = () => React.createElement("div", null,
    React.createElement(minesweeper_1.MineSweeper, { rows: 16, cols: 24, totalBombs: 12 }));

});
___scope___.file("@coglite/samples/minesweeper/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./minesweeper"), exports);

});
___scope___.file("@coglite/samples/minesweeper/minesweeper.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const TIMER_INTERVAL_MS = 10;
var GameState;
(function (GameState) {
    GameState[GameState["Reset"] = 0] = "Reset";
    GameState[GameState["Playing"] = 1] = "Playing";
    GameState[GameState["Won"] = 2] = "Won";
    GameState[GameState["Lost"] = 3] = "Lost";
})(GameState || (GameState = {}));
var CellValue;
(function (CellValue) {
    CellValue[CellValue["Zero"] = 0] = "Zero";
    CellValue[CellValue["One"] = 1] = "One";
    CellValue[CellValue["Two"] = 2] = "Two";
    CellValue[CellValue["Three"] = 3] = "Three";
    CellValue[CellValue["Four"] = 4] = "Four";
    CellValue[CellValue["Five"] = 5] = "Five";
    CellValue[CellValue["Six"] = 6] = "Six";
    CellValue[CellValue["Seven"] = 7] = "Seven";
    CellValue[CellValue["Eight"] = 8] = "Eight";
    CellValue[CellValue["Bomb"] = 9] = "Bomb";
})(CellValue || (CellValue = {}));
var CellState;
(function (CellState) {
    CellState[CellState["Hidden"] = 0] = "Hidden";
    CellState[CellState["Exposed"] = 1] = "Exposed";
    CellState[CellState["Flagged"] = 2] = "Flagged";
    CellState[CellState["Mistake"] = 3] = "Mistake";
    CellState[CellState["Boom"] = 4] = "Boom";
})(CellState || (CellState = {}));
class CellGrid {
    constructor(rows, cols) {
        this.size = { rows, cols };
        this.cells = CellGrid.init(rows, cols);
        this.flags = 0;
    }
    clone() {
        const newGrid = new CellGrid(this.size.rows, this.size.cols);
        newGrid.cells = this.cells.slice();
        newGrid.flags = this.flags;
        return newGrid;
    }
    mutateFrom(x, y) {
        const newGrid = this.clone();
        newGrid.cells[y] = this.cells[y].slice();
        newGrid.cells[y][x] = { value: this.cells[y][x].value, state: this.cells[y][x].state };
        return newGrid;
    }
    totalCells() {
        return this.cells.length;
    }
    totalRows() {
        return this.size.rows;
    }
    totalCols() {
        return this.size.cols;
    }
    totalFlags() {
        return this.flags;
    }
    incFlags() {
        const newGrid = this.clone();
        newGrid.flags++;
        return newGrid;
    }
    decFlags() {
        const newGrid = this.clone();
        newGrid.flags--;
        return newGrid;
    }
    forEach(fn) {
        for (let y = 0; y < this.size.rows; y++) {
            for (let x = 0; x < this.size.cols; x++) {
                fn.call(this, x, y, this.getCell(x, y));
            }
        }
    }
    reduce(fn, accum) {
        return this.getRows().reduce((accum, row, y) => {
            return row.reduce((accum, cell, x) => {
                return fn.call(this, accum, x, y, this.getCell(x, y));
            }, accum);
        }, accum);
    }
    getRow(y) {
        if (y >= this.size.rows || y < 0 || y % 1 !== 0) {
            return [];
        }
        return this.cells[y];
    }
    getRows() {
        return this.cells;
    }
    hasCell(x, y) {
        if (x < 0 || x >= this.size.cols || y < 0 || y >= this.size.rows) {
            return false;
        }
        return true;
    }
    getCell(x, y) {
        if (this.hasCell(x, y) === false) {
            throw new Error(`no cell at ${x}x${y}`);
        }
        return this.cells[y][x];
    }
    getCellValue(x, y) {
        if (this.hasCell(x, y) === false) {
            throw new Error(`no cell at ${x}x${y}`);
        }
        return this.cells[y][x].value;
    }
    setCellValue(x, y, value) {
        if (this.hasCell(x, y) === false) {
            throw new Error(`no cell at ${x}x${y}`);
        }
        const newGrid = this.mutateFrom(x, y);
        newGrid.cells[y][x].value = value;
        return newGrid;
    }
    getCellState(x, y) {
        if (this.hasCell(x, y) === false) {
            throw new Error(`no cell at ${x}x${y}`);
        }
        return this.cells[y][x].state;
    }
    setCellState(x, y, state) {
        if (this.hasCell(x, y) === false) {
            throw new Error(`no cell at ${x}x${y}`);
        }
        const newGrid = this.mutateFrom(x, y);
        newGrid.cells[y][x].state = state;
        return newGrid;
    }
    getCellNeighbors(x, y) {
        return [
            { x: x + 0, y: y - 1 },
            { x: x + 0, y: y + 1 },
            { x: x + 1, y: y + 0 },
            { x: x - 1, y: y + 0 },
            { x: x + 1, y: y - 1 },
            { x: x - 1, y: y - 1 },
            { x: x + 1, y: y + 1 },
            { x: x - 1, y: y + 1 },
        ].filter((coord) => {
            const legalX = (coord.x >= 0 && coord.x < this.size.cols);
            const legalY = (coord.y >= 0 && coord.y < this.size.rows);
            return legalX && legalY;
        });
    }
    countNeighborBombs(x, y) {
        const neighbors = this.getCellNeighbors(x, y);
        return neighbors.reduce((accum, coord) => {
            const isBomb = this.getCellValue(coord.x, coord.y) === CellValue.Bomb;
            return accum + (isBomb ? 1 : 0);
        }, 0);
    }
    revealAllBombs() {
        return this.reduce((grid, x, y, cell) => {
            if (cell.value === CellValue.Bomb && cell.state == CellState.Hidden) {
                return grid.setCellState(x, y, CellState.Exposed);
            }
            else if (cell.value !== CellValue.Bomb && cell.state === CellState.Flagged) {
                return grid.setCellState(x, y, CellState.Mistake);
            }
            else {
                return grid;
            }
        }, this);
    }
    detonateBomb(x, y) {
        return this.revealAllBombs()
            .setCellState(x, y, CellState.Boom);
    }
    revealCell(x, y) {
        let grid = this;
        const value = grid.getCellValue(x, y);
        const state = grid.getCellState(x, y);
        const neighbors = grid.getCellNeighbors(x, y);
        if (state === CellState.Hidden) {
            if (value === CellValue.Bomb) {
                return grid.detonateBomb(x, y);
            }
            else {
                grid = grid.setCellState(x, y, CellState.Exposed);
            }
        }
        else {
            return grid;
        }
        if (value === CellValue.Zero) {
            neighbors.forEach((neighbor) => {
                grid = grid.revealCell(neighbor.x, neighbor.y);
            });
        }
        return grid;
    }
    flagCell(x, y) {
        const grid = this;
        const state = grid.getCellState(x, y);
        if (state === CellState.Hidden) {
            return grid.setCellState(x, y, CellState.Flagged).incFlags();
        }
        else if (state === CellState.Flagged) {
            return grid.setCellState(x, y, CellState.Hidden).decFlags();
        }
        else {
            return grid;
        }
    }
    isGameOver() {
        const anyDetonated = this.reduce((anyDetonated, x, y, cell) => {
            if (cell.state === CellState.Boom) {
                return true;
            }
            return anyDetonated;
        }, false);
        if (anyDetonated) {
            return true;
        }
        else {
            const allRevealed = this.reduce((allRevealed, x, y, cell) => {
                if (cell.state === CellState.Hidden) {
                    return false;
                }
                return allRevealed;
            }, true);
            return allRevealed;
        }
    }
    isGameWon() {
        return this.reduce((isWon, x, y, cell) => {
            if (cell.state === CellState.Hidden) {
                return false;
            }
            if (cell.value === CellValue.Bomb && cell.state !== CellState.Flagged) {
                return false;
            }
            return isWon;
        }, true);
    }
    static init(rows, cols) {
        const cells = [];
        for (let y = 0; y < rows; y++) {
            cells[y] = [];
            for (let x = 0; x < cols; x++) {
                cells[y][x] = { value: CellValue.Zero, state: CellState.Hidden };
            }
        }
        return cells;
    }
}
class GameTable extends React.PureComponent {
    render() {
        return (React.createElement("table", { className: "game-table" },
            React.createElement("tbody", null, this.props.children)));
    }
}
class GameRow extends React.PureComponent {
    render() {
        return (React.createElement("tr", { className: "game-row" }, this.props.children));
    }
}
class GameCell extends React.PureComponent {
    render() {
        const icon = pickIcon(this.props.value, this.props.state);
        const onClick = (event) => { this.props.onClick(event); };
        const onRightClick = (event) => { this.props.onRightClick(event); };
        return React.createElement("td", { className: `game-cell game-cell-state-${icon}`, onClick: onClick, onContextMenu: onRightClick });
    }
}
class GameStat extends React.PureComponent {
    render() {
        return (React.createElement("div", { className: "stat" },
            React.createElement("p", { className: "value" }, this.props.value),
            React.createElement("p", { className: "name" }, this.props.name)));
    }
}
class MineSweeper extends React.Component {
    constructor(props) {
        super(props);
        this.timerClock = null;
        let grid = new CellGrid(props.rows, props.cols);
        grid = addBombs(grid, props.totalBombs);
        grid = addValues(grid);
        this.state = {
            state: GameState.Reset,
            grid: grid,
            moves: 0,
            timer: 0,
        };
    }
    handleCellClick(x, y) {
        return ((event) => {
            event.preventDefault();
            this.updateGame(this.state.grid.revealCell(x, y));
        }).bind(this);
    }
    handleCellRightClick(x, y) {
        return ((event) => {
            event.preventDefault();
            this.updateGame(this.state.grid.flagCell(x, y));
        }).bind(this);
    }
    startGame() {
        this.setState({
            state: GameState.Playing,
            timer: 0,
        });
        this.startClock();
    }
    wonGame(grid) {
        this.setState({
            state: GameState.Won,
            grid: grid.revealAllBombs(),
        });
        this.stopClock();
    }
    lostGame(grid) {
        this.setState({
            state: GameState.Lost,
            grid: grid.revealAllBombs(),
        });
        this.stopClock();
    }
    startClock() {
        this.resetClock();
        this.timerClock = window.setInterval(() => {
            this.setState({
                timer: this.state.timer + TIMER_INTERVAL_MS,
            });
        }, TIMER_INTERVAL_MS);
    }
    resetClock() {
        this.stopClock();
        this.setState({
            timer: 0,
        });
    }
    stopClock() {
        if (this.timerClock !== null) {
            clearInterval(this.timerClock);
        }
        this.timerClock = null;
    }
    splitTime(time) {
        time = Math.round(time);
        const chunks = [];
        while (time > 0) {
            const chunk = time % 100;
            chunks.push(chunk);
            time -= chunk;
            time /= 100;
        }
        return chunks;
    }
    formatTime() {
        const time = this.state.timer;
        const chunks = this.splitTime(time / 10).map((chunk) => {
            if (chunk < 10) {
                return '0' + chunk.toString();
            }
            else {
                return chunk.toString();
            }
        }).reverse();
        if (chunks.length === 0) {
            return '00:00';
        }
        else if (chunks.length === 1) {
            return '00:' + chunks[0];
        }
        else {
            return chunks.join(':');
        }
    }
    updateGame(grid) {
        switch (this.state.state) {
            case GameState.Won:
            case GameState.Lost:
                return;
            case GameState.Reset:
                this.startGame();
                break;
        }
        this.setState({
            grid: grid,
            moves: this.state.moves + 1,
        });
        if (grid.isGameOver()) {
            if (grid.isGameWon()) {
                this.wonGame(grid);
            }
            else {
                this.lostGame(grid);
            }
        }
    }
    render() {
        return (React.createElement("div", { className: "minesweeper" },
            React.createElement("div", { className: "game" },
                React.createElement(GameTable, null, this.state.grid.getRows().map((cells, y) => {
                    return (React.createElement(GameRow, { key: y }, cells.map((tuple, x) => {
                        return React.createElement(GameCell, { key: x, value: tuple.value, state: tuple.state, onClick: this.handleCellClick(x, y), onRightClick: this.handleCellRightClick(x, y) });
                    })));
                }))),
            React.createElement("div", { className: "footer" },
                React.createElement(GameStat, { value: this.state.grid.totalFlags(), name: "Bombs" }),
                React.createElement(GameStat, { value: this.state.moves, name: "Moves" }),
                React.createElement(GameStat, { value: this.formatTime(), name: "Time" }))));
    }
}
exports.MineSweeper = MineSweeper;
function addBombs(grid, totalBombs) {
    let newGrid = new CellGrid(grid.totalRows(), grid.totalCols());
    let remaining = totalBombs;
    let failedGuesses = 0;
    while (remaining > 0 && failedGuesses < 10) {
        const x = guessBetween(0, grid.totalCols());
        const y = guessBetween(0, grid.totalRows());
        if (newGrid.getCellValue(x, y) !== CellValue.Bomb) {
            newGrid = newGrid.setCellValue(x, y, CellValue.Bomb);
            remaining--;
            failedGuesses = 0;
        }
        else {
            failedGuesses++;
        }
    }
    return newGrid;
}
function guessBetween(low, high) {
    return Math.floor(Math.random() * (high - low)) + low;
}
function addValues(grid) {
    return grid.reduce((grid, x, y, cell) => {
        if (cell.value === CellValue.Bomb) {
            return grid;
        }
        else {
            return grid.setCellValue(x, y, grid.countNeighborBombs(x, y));
        }
    }, grid);
}
function pickIcon(value, state) {
    switch (state) {
        case CellState.Exposed:
            switch (value) {
                case CellValue.Bomb:
                    return 'bomb';
                default:
                    return CellValue[value].toLowerCase();
            }
        case CellState.Flagged:
            return 'flagged';
        case CellState.Mistake:
            return 'mistake';
        case CellState.Boom:
            return 'boom';
        default:
            return 'hidden';
    }
}

});
___scope___.file("client/modules/minesweeper/assets/minesweeper.css", function(exports, require, module, __filename, __dirname){


require("fuse-box-css")("default/client/modules/minesweeper/assets/minesweeper.css", "\r\n      .minesweeper {\r\n        display: table;\r\n        border-radius: 24px;\r\n        background-color: #dfdfdf;\r\n        margin: 64px auto 0;\r\n        padding: 0;\r\n        position: relative;\r\n        font-family: 'Ubuntu', sans-serif;\r\n      }\r\n\r\n      .game {\r\n        margin: 12px;\r\n        padding: 16px 0;\r\n        background-color: white;\r\n        border-radius: 12px 12px 0 0;\r\n      }\r\n\r\n      table, tr, td {\r\n        margin: 0;\r\n        padding: 0;\r\n        border-style: none;\r\n        border-collapse: collapse;\r\n      }\r\n\r\n      .game-table {\r\n        margin: 0 16px;\r\n      }\r\n\r\n      .game-cell {\r\n        width: 24px;\r\n        height: 24px;\r\n        padding: 2px;\r\n        background-size: 24px 24px;\r\n        background-repeat: no-repeat;\r\n        background-position: center;\r\n      }\r\n\r\n      .game-cell-state-hidden  { background-image: url(\"./svg/hidden.svg\"); }\r\n      /*.game-cell-state-zero    { background-image: url(\"./svg/0.svg\"); }*/\r\n      .game-cell-state-one     { background-image: url(\"./svg/1.svg\"); }\r\n      .game-cell-state-two     { background-image: url(\"./svg/2.svg\"); }\r\n      .game-cell-state-three   { background-image: url(\"./svg/3.svg\"); }\r\n      .game-cell-state-four    { background-image: url(\"./svg/4.svg\"); }\r\n      .game-cell-state-five    { background-image: url(\"./svg/5.svg\"); }\r\n      .game-cell-state-six     { background-image: url(\"./svg/6.svg\"); }\r\n      .game-cell-state-seven   { background-image: url(\"./svg/7.svg\"); }\r\n      .game-cell-state-eight   { background-image: url(\"./svg/8.svg\"); }\r\n      .game-cell-state-bomb    { background-image: url(\"./svg/bomb.svg\"); }\r\n      .game-cell-state-flagged { background-image: url(\"./svg/flagged.svg\"); }\r\n      .game-cell-state-mistake { background-image: url(\"./svg/mistake.svg\"); }\r\n      .game-cell-state-boom    { background-image: url(\"./svg/boom.svg\"); }\r\n\r\n      .footer {\r\n        height: 72px;\r\n        margin: 12px;\r\n      }\r\n\r\n      .footer .stat {\r\n        width: 33%;\r\n        display: inline-block;\r\n        text-align: center;\r\n      }\r\n\r\n      .footer .stat .value,\r\n      .footer .stat .name {\r\n        margin: 0;\r\n        padding: 0;\r\n        font-weight: bold;\r\n      }\r\n\r\n      .footer .stat .value {\r\n        margin-top: 16px;\r\n      }\r\n\r\n      .footer .stat .name {\r\n        margin-top: 4px;\r\n        text-transform: uppercase;\r\n        font-size: 80%;\r\n        color: gray;\r\n      }\r\n")
});
___scope___.file("client/modules/settings.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const minesweeper_1 = require("~/@coglite/samples/minesweeper");
require("./minesweeper/assets/minesweeper.css");
exports.SettingsPage = () => React.createElement("div", null,
    React.createElement("h3", null, "settings"),
    React.createElement(minesweeper_1.MineSweeper, { rows: 16, cols: 24, totalBombs: 12 }));

});
___scope___.file("client/modules/workflow-designer/components/workflow-toolbar/designer-screen.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", typeof (_a = typeof designer_state_1.DesignerState !== "undefined" && designer_state_1.DesignerState) === "function" ? _a : Object)
], DesignerScreen.prototype, "designerState", void 0);
DesignerScreen = tslib_1.__decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object])
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
DesignerApp = tslib_1.__decorate([
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], DesignerApp);
exports.DesignerApp = DesignerApp;
function render() {
    let theme = {};
    ReactDOM.render(React.createElement(JssProvider, { jss: jss },
        React.createElement(ThemeProvider, { theme: theme },
            React.createElement(DesignerScreen, null))), document.getElementById('app'));
}
exports.render = render;

});
___scope___.file("client/modules/workflow-designer/style/less/website.less", function(exports, require, module, __filename, __dirname){


require("default/styles.min.css")
});
___scope___.file("client/modules/workflow-designer/components/workflow-toolbar/editor-bar.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var _a;
const path = require("path");
const mobx_react_1 = require("mobx-react");
const React = require("react");
const mobx_1 = require("mobx");
let injectSheet = require('react-jss').default;
const fa_1 = require("react-icons/fa");
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
                            React.createElement(fa_1.FaFileAlt, null))),
                    React.createElement("li", { className: classes.menuItem },
                        React.createElement("a", { href: "#", className: classes.menuLink, onClick: e => this.openNew(e) },
                            React.createElement(fa_1.FaFolderOpen, null))),
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
                                React.createElement(fa_1.FaSave, null)))),
                React.createElement("ul", { className: classes.workflowTabs },
                    React.createElement("li", { className: this.yamlMode ? classes.menuItem : classes.menuItemActive },
                        React.createElement("a", { href: "#", onClick: e => this.setMode(e, false), className: classes.menuLink }, "Workflow")),
                    React.createElement("li", { className: this.yamlMode ? classes.menuItemActive : classes.menuItem },
                        React.createElement("a", { href: "#", onClick: e => this.setMode(e, true), className: classes.menuLink }, "YAML")))));
    }
};
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof React !== "undefined" && React.MouseEvent) === "function" ? _a : Object, Boolean]),
    tslib_1.__metadata("design:returntype", void 0)
], EditorBar.prototype, "setMode", null);
EditorBar = tslib_1.__decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object])
], EditorBar);
exports.EditorBar = EditorBar;

});
___scope___.file("client/modules/workflow-designer/components/workflow-toolbar/designer-state.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], UIState.prototype, "projectName", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], UIState.prototype, "projectPath", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Array)
], UIState.prototype, "projectWorkflows", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], UIState.prototype, "workflowName", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], UIState.prototype, "workflowPath", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Boolean)
], UIState.prototype, "yaml", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Boolean)
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
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Boolean)
], DesignerState.prototype, "dirty", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", typeof (_a = typeof state_1.EditorState !== "undefined" && state_1.EditorState) === "function" ? _a : Object)
], DesignerState.prototype, "editorState", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Boolean)
], DesignerState.prototype, "yamlMode", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], DesignerState.prototype, "yaml", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", UIState)
], DesignerState.prototype, "uiState", void 0);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Boolean]),
    tslib_1.__metadata("design:returntype", void 0)
], DesignerState.prototype, "setDirty", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], DesignerState.prototype, "resetDirtyCheck", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Object)
], DesignerState.prototype, "updateWorkflow", void 0);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Boolean]),
    tslib_1.__metadata("design:returntype", void 0)
], DesignerState.prototype, "updateYaml", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Boolean]),
    tslib_1.__metadata("design:returntype", void 0)
], DesignerState.prototype, "setMode", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Object)
], DesignerState.prototype, "openWorkflow", void 0);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], DesignerState.prototype, "updateUiState", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Object)
], DesignerState.prototype, "newWorkflow", void 0);
exports.DesignerState = DesignerState;

});
___scope___.file("client/modules/workflow-designer/workflow-loader.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
___scope___.file("client/modules/workflow-designer/components/step-code-editor.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], StepCodeEditor.prototype, "updateCode", null);
StepCodeEditor = tslib_1.__decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object])
], StepCodeEditor);
exports.StepCodeEditor = StepCodeEditor;

});
___scope___.file("client/modules/workflow-designer/models/state.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", typeof (_a = typeof workflow_1.Workflow !== "undefined" && workflow_1.Workflow) === "function" ? _a : Object)
], EditorState.prototype, "workflow", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", typeof (_b = typeof workflow_1.WorkflowStep !== "undefined" && workflow_1.WorkflowStep) === "function" ? _b : Object)
], EditorState.prototype, "currentStep", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Array)
], EditorState.prototype, "catalog", void 0);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", void 0)
], EditorState.prototype, "setCatalog", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], EditorState.prototype, "selectInitialStep", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof workflow_1.WorkflowStep !== "undefined" && workflow_1.WorkflowStep) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], EditorState.prototype, "selectStep", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], EditorState.prototype, "clearSelectedStep", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof workflow_1.WorkflowStep !== "undefined" && workflow_1.WorkflowStep) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], EditorState.prototype, "deleteStep", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof workflow_2.StepType !== "undefined" && workflow_2.StepType) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], EditorState.prototype, "changeCurrentStepType", null);
exports.EditorState = EditorState;
;

});
___scope___.file("client/modules/workflow-designer/models/workflow.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var _a, _b, _c, _d;
const mobx_1 = require("mobx");
const workflow_interfaces_1 = require("../workflow-interfaces");
tslib_1.__exportStar(require("../workflow-interfaces"), exports);
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
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Array)
], Workflow.prototype, "steps", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Array)
], Workflow.prototype, "workflowVariables", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Object)
], Workflow.prototype, "transient", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Boolean)
], Workflow.prototype, "ignoreFailure", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Boolean)
], Workflow.prototype, "ignoreValidation", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Boolean)
], Workflow.prototype, "ignoreMissing", void 0);
tslib_1.__decorate([
    mobx_1.computed,
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [])
], Workflow.prototype, "flattenedStepsSimple", null);
tslib_1.__decorate([
    mobx_1.computed,
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [])
], Workflow.prototype, "flattenedStepsAll", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Workflow.prototype, "moveStep", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Workflow.prototype, "addStep", null);
exports.Workflow = Workflow;
class TransientState {
    constructor() {
        this.parseError = [];
        this.errorsDismissed = false;
    }
}
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Array)
], TransientState.prototype, "parseError", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Boolean)
], TransientState.prototype, "errorsDismissed", void 0);
exports.TransientState = TransientState;
class WorkFlowTransientState extends TransientState {
    constructor() {
        super(...arguments);
        this.parseError = [];
        this.errorsDismissed = false;
    }
}
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Array)
], WorkFlowTransientState.prototype, "parseError", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Boolean)
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
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], WorkflowStepBase.prototype, "name", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", TransientState)
], WorkflowStepBase.prototype, "transient", void 0);
exports.WorkflowStepBase = WorkflowStepBase;
class StepTransientState extends TransientState {
}
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], StepTransientState.prototype, "imageSourceTypeSelected", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", typeof (_a = typeof workflow_interfaces_1.HealthType !== "undefined" && workflow_interfaces_1.HealthType) === "function" ? _a : Object)
], StepTransientState.prototype, "healthCheckType", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], StepTransientState.prototype, "action", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Boolean)
], StepTransientState.prototype, "healthConfigured", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Boolean)
], StepTransientState.prototype, "readinessConfigured", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", typeof (_b = typeof workflow_interfaces_1.HealthType !== "undefined" && workflow_interfaces_1.HealthType) === "function" ? _b : Object)
], StepTransientState.prototype, "readinessCheckType", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Boolean)
], StepTransientState.prototype, "sourceOptions", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Boolean)
], StepTransientState.prototype, "failureOptions", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Boolean)
], StepTransientState.prototype, "environmentConfigured", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Boolean)
], StepTransientState.prototype, "volumesConfigured", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Boolean)
], StepTransientState.prototype, "portsConfigured", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], StepTransientState.prototype, "sourceType", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Boolean)
], StepTransientState.prototype, "explicitSourceIncludes", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Boolean)
], StepTransientState.prototype, "explicitSourceExcludes", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Boolean)
], StepTransientState.prototype, "explicitIncludeVariables", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Boolean)
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
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", typeof (_c = typeof workflow_interfaces_1.HealthType !== "undefined" && workflow_interfaces_1.HealthType) === "function" ? _c : Object)
], Health.prototype, "type", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], Health.prototype, "script", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], Health.prototype, "port", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], Health.prototype, "path", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Number)
], Health.prototype, "interval", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Number)
], Health.prototype, "timeout", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Number)
], Health.prototype, "retries", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Number)
], Health.prototype, "grace", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Array)
], Health.prototype, "headers", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", TransientState)
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
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Boolean)
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
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", StepTransientState)
], WorkflowStepSimple.prototype, "transient", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", typeof (_d = typeof workflow_interfaces_1.ImageSource !== "undefined" && workflow_interfaces_1.ImageSource) === "function" ? _d : Object)
], WorkflowStepSimple.prototype, "imageSource", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], WorkflowStepSimple.prototype, "image", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], WorkflowStepSimple.prototype, "dockerfile", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], WorkflowStepSimple.prototype, "target", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], WorkflowStepSimple.prototype, "generator", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], WorkflowStepSimple.prototype, "script", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Boolean)
], WorkflowStepSimple.prototype, "omitSource", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Boolean)
], WorkflowStepSimple.prototype, "ignoreFailure", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Boolean)
], WorkflowStepSimple.prototype, "ignoreValidation", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Boolean)
], WorkflowStepSimple.prototype, "ignoreMissing", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], WorkflowStepSimple.prototype, "sourceLocation", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Health)
], WorkflowStepSimple.prototype, "health", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Readiness)
], WorkflowStepSimple.prototype, "readiness", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Array)
], WorkflowStepSimple.prototype, "environment", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Array)
], WorkflowStepSimple.prototype, "ports", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Array)
], WorkflowStepSimple.prototype, "volumes", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], WorkflowStepSimple.prototype, "dockerignore", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Array)
], WorkflowStepSimple.prototype, "sourceIncludes", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Array)
], WorkflowStepSimple.prototype, "sourceExcludes", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Object)
], WorkflowStepSimple.prototype, "includeVariables", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Object)
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
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Array)
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

});
___scope___.file("client/modules/workflow-designer/workflow-interfaces.js", function(exports, require, module, __filename, __dirname){

"use strict";
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
___scope___.file("client/modules/workflow-designer/services/workflow_service.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WorkflowService {
    constructor() {
        this._urlBase = 'https://s3-eu-west-1.amazonaws.com/dev.stack.foundation/catalog/';
        this.catalogInfoHtmlStrings = {};
    }
    get urlBase() {
        return this._urlBase;
    }
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
    }
}
exports.WorkflowService = WorkflowService;

});
___scope___.file("client/modules/workflow-designer/components/workflow-editor.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const mobx_react_1 = require("mobx-react");
const fa_1 = require("react-icons/fa");
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
                    React.createElement("span", { className: classes.listMobileSwitch }, this.state.mobileMenuOpen ? React.createElement(fa_1.FaAngleUp, null) : React.createElement(fa_1.FaAngleDown, null))),
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
WorkflowEditor = tslib_1.__decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object])
], WorkflowEditor);
exports.WorkflowEditor = WorkflowEditor;

});
___scope___.file("client/modules/workflow-designer/util/translations.js", function(exports, require, module, __filename, __dirname){

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
___scope___.file("client/modules/workflow-designer/services/translation-service.js", function(exports, require, module, __filename, __dirname){

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
___scope___.file("client/modules/workflow-designer/components/step-editor/step-editor.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], StepEditor.prototype, "dismissErrors", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof react_1.ChangeEvent !== "undefined" && react_1.ChangeEvent) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], StepEditor.prototype, "onNameChange", null);
StepEditor = tslib_1.__decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object])
], StepEditor);
exports.StepEditor = StepEditor;

});
___scope___.file("client/modules/workflow-designer/components/step-type-select.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const react_virtualized_select_1 = require("react-virtualized-select");
const translation_service_1 = require("../services/translation-service");
const centered_content_1 = require("../util/centered-content");
const workflow_1 = require("../models/workflow");
let injectSheet = require('react-jss').default;
const style_1 = require("../style");
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
StepTypeSelect = tslib_1.__decorate([
    injectSheet(styles),
    tslib_1.__metadata("design:paramtypes", [Object])
], StepTypeSelect);
exports.StepTypeSelect = StepTypeSelect;

});
___scope___.file("client/modules/workflow-designer/util/centered-content.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
        let _a = this.props, { container, className, classes, sheet, theme } = _a, other = tslib_1.__rest(_a, ["container", "className", "classes", "sheet", "theme"]);
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
CenteredContent = tslib_1.__decorate([
    injectSheet(styles),
    tslib_1.__metadata("design:paramtypes", [Object])
], CenteredContent);
exports.CenteredContent = CenteredContent;

});
___scope___.file("client/modules/workflow-designer/style/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
___scope___.file("client/modules/workflow-designer/style/style.less", function(exports, require, module, __filename, __dirname){


require("default/styles.min.css")
});
___scope___.file("client/modules/workflow-designer/style/style-constants.js", function(exports, require, module, __filename, __dirname){

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
___scope___.file("client/modules/workflow-designer/components/step-editor/simple-step-editor.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
        return (React.createElement("div", null,
            React.createElement(options_1.Options, { ide: this.props.ide, fill: true, options: this.options(), onChange: a => this.setAction(a.value), selected: this.action }),
            this.selectedEditor()));
    }
};
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof workflow_1.ActionType !== "undefined" && workflow_1.ActionType) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], SimpleStepEditor.prototype, "setAction", null);
SimpleStepEditor = tslib_1.__decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object])
], SimpleStepEditor);
exports.SimpleStepEditor = SimpleStepEditor;

});
___scope___.file("client/modules/workflow-designer/components/options.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
Options = tslib_1.__decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object])
], Options);
exports.Options = Options;

});
___scope___.file("client/modules/workflow-designer/components/step-editor/script-step-editor.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
ScriptStepEditor = tslib_1.__decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object])
], ScriptStepEditor);
exports.ScriptStepEditor = ScriptStepEditor;

});
___scope___.file("client/modules/workflow-designer/components/step-editor/step-workflow-variables.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof react_select_1.Option !== "undefined" && react_select_1.Option) === "function" ? _a : Object, String]),
    tslib_1.__metadata("design:returntype", void 0)
], StepWorkflowVariables.prototype, "add", null);
StepWorkflowVariables = tslib_1.__decorate([
    injectSheet(jssStyles),
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object])
], StepWorkflowVariables);
exports.StepWorkflowVariables = StepWorkflowVariables;

});
___scope___.file("client/modules/workflow-designer/components/step-editor/advanced-options.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AdvancedOptions.prototype, "setup", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Function]),
    tslib_1.__metadata("design:returntype", void 0)
], AdvancedOptions.prototype, "runAction", null);
AdvancedOptions = tslib_1.__decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object])
], AdvancedOptions);
exports.AdvancedOptions = AdvancedOptions;

});
___scope___.file("client/modules/workflow-designer/components/step-editor/source-options.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof React !== "undefined" && React.ChangeEvent) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], SourceOptions.prototype, "omitSource", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof React !== "undefined" && React.ChangeEvent) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], SourceOptions.prototype, "updateDockerignore", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], SourceOptions.prototype, "setSourceType", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof react_select_1.Option !== "undefined" && react_select_1.Option) === "function" ? _c : Object, String]),
    tslib_1.__metadata("design:returntype", void 0)
], SourceOptions.prototype, "setSources", null);
SourceOptions = tslib_1.__decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object])
], SourceOptions);
exports.SourceOptions = SourceOptions;

});
___scope___.file("client/modules/workflow-designer/components/step-editor/failure-options.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var _a, _b, _c;
const React = require("react");
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
let injectSheet = require('react-jss').default;
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
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof React !== "undefined" && React.ChangeEvent) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], FailureOptions.prototype, "ignoreFailure", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof React !== "undefined" && React.ChangeEvent) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], FailureOptions.prototype, "ignoreMissing", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof React !== "undefined" && React.ChangeEvent) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], FailureOptions.prototype, "ignoreValidation", null);
FailureOptions = tslib_1.__decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object])
], FailureOptions);
exports.FailureOptions = FailureOptions;

});
___scope___.file("client/modules/workflow-designer/components/step-editor/variables-editor.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var _a, _b;
const React = require("react");
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const fa_1 = require("react-icons/fa");
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
                    React.createElement(fa_1.FaTimesCircle, null),
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
                display: (React.createElement(fa_1.FaFileCode, null)),
                value: 'pair'
            },
            {
                display: (React.createElement(fa_1.FaFont, null)),
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
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof React !== "undefined" && React.MouseEvent) === "function" ? _a : Object, typeof (_b = typeof workflow_1.KeyValueEntry !== "undefined" && workflow_1.KeyValueEntry) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], VariablesEditor.prototype, "remove", null);
VariablesEditor = tslib_1.__decorate([
    injectSheet(jssStyles),
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object])
], VariablesEditor);
exports.VariablesEditor = VariablesEditor;

});
___scope___.file("client/modules/workflow-designer/components/step-editor/volume-options.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var _a;
const React = require("react");
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const fa_1 = require("react-icons/fa");
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
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], EditorVolume.prototype, "mountPath", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
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
                    React.createElement(fa_1.FaTimesCircle, null),
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
        return (React.createElement("div", null, this.sourceEditors()));
    }
};
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof workflow_1.Volume !== "undefined" && workflow_1.Volume) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], VolumeOptions.prototype, "remove", null);
VolumeOptions = tslib_1.__decorate([
    injectSheet(jssStyles),
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object])
], VolumeOptions);
exports.VolumeOptions = VolumeOptions;

});
___scope___.file("client/modules/workflow-designer/components/step-editor/volume-editor.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], VolumeEditor.prototype, "setMountPath", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], VolumeEditor.prototype, "setHostPath", null);
VolumeEditor = tslib_1.__decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object])
], VolumeEditor);
exports.VolumeEditor = VolumeEditor;

});
___scope___.file("client/modules/workflow-designer/components/step-editor/health-options.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var _a, _b;
const React = require("react");
let injectSheet = require('react-jss').default;
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
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
        let onNumberChange = (property, e) => {
            this.setHealthCheckProperty(() => {
                let value = parseInt(e.target.value);
                if (!isNaN(value)) {
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
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof workflow_1.HealthType !== "undefined" && workflow_1.HealthType) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], HealthOptions.prototype, "setHealthCheckType", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Function]),
    tslib_1.__metadata("design:returntype", void 0)
], HealthOptions.prototype, "setHealthCheckProperty", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof React !== "undefined" && React.ChangeEvent) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], HealthOptions.prototype, "toggleSkipWait", null);
HealthOptions = tslib_1.__decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object])
], HealthOptions);
exports.HealthOptions = HealthOptions;

});
___scope___.file("client/modules/workflow-designer/components/step-editor/variable-editor.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], VariableSource.prototype, "file", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], VariableSource.prototype, "name", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
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
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], VariableEditor.prototype, "setFile", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], VariableEditor.prototype, "setName", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], VariableEditor.prototype, "setValue", null);
VariableEditor = tslib_1.__decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object])
], VariableEditor);
exports.VariableEditor = VariableEditor;

});
___scope___.file("client/modules/workflow-designer/components/drop-down-menu.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const mobx_react_1 = require("mobx-react");
let injectSheet = require('react-jss').default;
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
DropDownMenu = tslib_1.__decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object])
], DropDownMenu);
exports.DropDownMenu = DropDownMenu;

});
___scope___.file("client/modules/workflow-designer/components/tooltip.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const mobx_react_1 = require("mobx-react");
const fa_1 = require("react-icons/fa");
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
            React.createElement(fa_1.FaInfoCircle, null),
            React.createElement(ReactTooltip, { id: this.tooltipId }, this.props.children));
    }
};
InfoTooltip = tslib_1.__decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object])
], InfoTooltip);
exports.InfoTooltip = InfoTooltip;

});
___scope___.file("client/modules/workflow-designer/components/step-editor/port-editor.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], PortEntrySource.prototype, "name", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Number)
], PortEntrySource.prototype, "containerPort", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Number)
], PortEntrySource.prototype, "internalPort", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Number)
], PortEntrySource.prototype, "externalPort", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
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
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], PortEditor.prototype, "setName", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], PortEditor.prototype, "setContainerPort", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], PortEditor.prototype, "setInternalPort", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], PortEditor.prototype, "setExternalPort", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], PortEditor.prototype, "setProtocol", null);
PortEditor = tslib_1.__decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object])
], PortEditor);
exports.PortEditor = PortEditor;

});
___scope___.file("client/modules/workflow-designer/components/image-field/image-field.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof workflow_1.UXImageSourceType !== "undefined" && workflow_1.UXImageSourceType) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ImageField.prototype, "setImageSource", null);
ImageField = tslib_1.__decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object])
], ImageField);
exports.ImageField = ImageField;

});
___scope___.file("client/modules/workflow-designer/components/image-field/catalog-image-field.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
tslib_1.__decorate([
    mobx_1.computed,
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [])
], CatalogImageField.prototype, "tags", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Object)
], CatalogImageField.prototype, "onImageChange", void 0);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Object)
], CatalogImageField.prototype, "onTagChange", void 0);
CatalogImageField = tslib_1.__decorate([
    injectSheet(jssStyles),
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object])
], CatalogImageField);
exports.CatalogImageField = CatalogImageField;

});
___scope___.file("client/modules/workflow-designer/components/image-field/catalog-select.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const react_virtualized_select_1 = require("react-virtualized-select");
let injectSheet = require('react-jss').default;
const translation_service_1 = require("../../services/translation-service");
const style_1 = require("../../style");
const centered_content_1 = require("../../util/centered-content");
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
tslib_1.__decorate([
    mobx_1.computed,
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [])
], CatalogSelect.prototype, "options", null);
tslib_1.__decorate([
    mobx_1.computed,
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [])
], CatalogSelect.prototype, "selectedOption", null);
CatalogSelect = tslib_1.__decorate([
    injectSheet(jssStyles),
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object])
], CatalogSelect);
exports.CatalogSelect = CatalogSelect;

});
___scope___.file("client/modules/workflow-designer/components/image-field/manual-image-field.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof React !== "undefined" && React.ChangeEvent) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ManualImageField.prototype, "onImageChange", null);
ManualImageField = tslib_1.__decorate([
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object])
], ManualImageField);
exports.ManualImageField = ManualImageField;

});
___scope___.file("client/modules/workflow-designer/components/image-field/step-image-field.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], StepImageField.prototype, "onImageChange", null);
StepImageField = tslib_1.__decorate([
    injectSheet(jssStyles),
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object])
], StepImageField);
exports.StepImageField = StepImageField;

});
___scope___.file("client/modules/workflow-designer/components/step-editor/dockerfile-step-editor.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var _a;
const React = require("react");
const centered_content_1 = require("../../util/centered-content");
const translation_service_1 = require("../../services/translation-service");
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
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
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof React !== "undefined" && React.ChangeEvent) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], DockerfileStepEditor.prototype, "onDockerfileChange", null);
DockerfileStepEditor = tslib_1.__decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object])
], DockerfileStepEditor);
exports.DockerfileStepEditor = DockerfileStepEditor;

});
___scope___.file("client/modules/workflow-designer/components/step-editor/ext-workflow-step-editor.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var _a;
const React = require("react");
const centered_content_1 = require("../../util/centered-content");
const translation_service_1 = require("../../services/translation-service");
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const step_workflow_variables_1 = require("../../components/step-editor/step-workflow-variables");
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
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof React !== "undefined" && React.ChangeEvent) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ExtWorkflowStepEditor.prototype, "onWorkflowChange", null);
ExtWorkflowStepEditor = tslib_1.__decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object])
], ExtWorkflowStepEditor);
exports.ExtWorkflowStepEditor = ExtWorkflowStepEditor;

});
___scope___.file("client/modules/workflow-designer/components/react-forms/validating-react-component.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
tslib_1.__decorate([
    mobx_2.observable,
    tslib_1.__metadata("design:type", Array)
], FormReactComponent.prototype, "_fields", void 0);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], FormReactComponent.prototype, "refreshFields", null);
FormReactComponent = tslib_1.__decorate([
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object, Object])
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
___scope___.file("client/modules/workflow-designer/components/react-forms/field.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], Field.prototype, "originalRef", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Object)
], Field.prototype, "originalVal", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Object)
], Field.prototype, "fieldVal", void 0);
exports.Field = Field;

});
___scope___.file("client/modules/workflow-designer/components/error-panel.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const mobx_react_1 = require("mobx-react");
const go_1 = require("react-icons/go");
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
                    React.createElement(go_1.GoX, null))));
    }
};
ErrorPanel = tslib_1.__decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object])
], ErrorPanel);
exports.ErrorPanel = ErrorPanel;

});
___scope___.file("client/modules/workflow-designer/components/step-list.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const fa_1 = require("react-icons/fa");
const go_1 = require("react-icons/go");
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
    componentWillUnmount() {
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
            step.transient.parseError.length > 0 && !step.transient.errorsDismissed && React.createElement(go_1.GoAlert, { className: classes.stepError }),
            prefix.length > 0 && React.createElement("span", { className: classes.stepPrefix },
                this.stepPrefix(parentList, key),
                "\u00A0"),
            step.name && step.name.length > 0 ? step.name : '(Unnamed step)'));
    }
    StepHandle() {
        return React.createElement("div", { className: this.props.classes.handle },
            React.createElement("div", { className: this.props.classes.handleDragger }),
            this.props.state.ide ? React.createElement("span", { className: this.props.classes.handleIcon }) : React.createElement(fa_1.FaBars, { className: this.props.classes.handleIcon }));
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
                        React.createElement(fa_1.FaTrash, null),
                        translation_service_1.translate('DELETE'),
                        "...") :
                    React.createElement("span", null,
                        React.createElement(go_1.GoPlus, null),
                        " ",
                        translation_service_1.translate('ADD_STEP'),
                        "..."),
                React.createElement("div", null))));
    }
};
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Object)
], StepList.prototype, "addStep", void 0);
StepList = tslib_1.__decorate([
    injectSheet(styles),
    mobx_react_1.observer,
    tslib_1.__metadata("design:paramtypes", [Object])
], StepList);
exports.StepList = StepList;

});
___scope___.file("client/stores/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UiStore_1 = require("./UiStore");
class CogStore {
    constructor() {
        this.uiStore = new UiStore_1.UiStore();
    }
}
exports.cogStore = new CogStore();

});
___scope___.file("client/stores/UiStore.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var _a;
const styles_1 = require("@material-ui/core/styles");
const mobx_1 = require("mobx");
const office_ui_fabric_react_1 = require("office-ui-fabric-react");
const _ = require("lodash");
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
class ToggleOpenValue {
    constructor() {
        this.open = false;
        this.openDrawer = (open) => {
            this.open = open;
        };
        this.closeDrawer = () => {
            this.open = false;
        };
        this.toggleDrawer = () => {
            this.open = !this.open;
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
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Object)
], ToggleOpenValue.prototype, "toggleDrawer", void 0);
exports.ToggleOpenValue = ToggleOpenValue;
class TabValue {
    constructor() {
        this.tabValue = 0;
    }
    setTab(event, tabValue) {
        this.tabValue = tabValue;
    }
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
        this.themeId = "myriad";
        this.themeDialogToggle = new ToggleOpenValue();
        this.menuDrawerToggle = new ToggleOpenValue();
        this.nodeDrawerToggle = new ToggleOpenValue();
        this.nodeFormDrawerToggle = new ToggleOpenValue();
        this.appBarSettingsMenuToggle = new ToggleOpenValue();
        this.appTabs = new TabValue();
        this.isThemeDialogOpen = false;
        this.activeCogliteNodeModel = null;
        this.diagramModel = null;
        this.nodeFormsData = {};
        this.isDynamicNodeFormUpdate = false;
        this.onError = (error) => {
            this.uiError = error;
        };
    }
    get muiTheme() {
        const basicTheme = styles_1.createMuiTheme({
            palette: {
                primary: {
                    main: exports.palette[this.themeId].primary,
                },
                secondary: {
                    main: exports.palette[this.themeId].secondary,
                }
            }
        });
        basicTheme["shape"] = {
            borderRadius: 4
        };
        return basicTheme;
    }
    get fabricTheme() {
        let fabricTheme = office_ui_fabric_react_1.loadTheme({
            palette: {
                themePrimary: exports.palette[this.themeId].primary
            }
        });
        return fabricTheme;
    }
    get combinedTheme() {
        let combinedTheme = _.merge(this.muiTheme, this.fabricTheme);
        return combinedTheme;
    }
    updateTheme(themeId) {
        this.themeId = themeId;
    }
    updateActiveCogliteNodeModel(model) {
        if (this.nodeFormDrawerToggle.open && (this.activeCogliteNodeModel.model.id !== model.model.id)) {
            this.isDynamicNodeFormUpdate = true;
        }
        this.activeCogliteNodeModel = model;
    }
    openThemeDialog() {
        this.isThemeDialogOpen = true;
    }
    closeThemeDialog() {
        this.isThemeDialogOpen = false;
    }
    setDiagramModel(diagramModel) {
        this.diagramModel = diagramModel;
    }
    updateNodeFormsData(nodeFormsData) {
        this.nodeFormsData = nodeFormsData;
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
    mobx_1.observable,
    tslib_1.__metadata("design:type", Object)
], UiStore.prototype, "activeCogliteNodeModel", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Object)
], UiStore.prototype, "diagramModel", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Object)
], UiStore.prototype, "nodeFormsData", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", Object)
], UiStore.prototype, "isDynamicNodeFormUpdate", void 0);
tslib_1.__decorate([
    mobx_1.computed,
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [])
], UiStore.prototype, "muiTheme", null);
tslib_1.__decorate([
    mobx_1.computed,
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [])
], UiStore.prototype, "fabricTheme", null);
tslib_1.__decorate([
    mobx_1.computed,
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [])
], UiStore.prototype, "combinedTheme", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], UiStore.prototype, "updateTheme", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], UiStore.prototype, "updateActiveCogliteNodeModel", null);
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
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], UiStore.prototype, "setDiagramModel", null);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], UiStore.prototype, "updateNodeFormsData", null);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", typeof (_a = typeof Error !== "undefined" && Error) === "function" ? _a : Object)
], UiStore.prototype, "uiError", void 0);
tslib_1.__decorate([
    mobx_1.action,
    tslib_1.__metadata("design:type", Object)
], UiStore.prototype, "onError", void 0);
exports.UiStore = UiStore;

});
___scope___.file("client/stores/NavStore.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], NavStore.prototype, "route", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], NavStore.prototype, "chartDrawerRoute", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], NavStore.prototype, "mlDrawerRoute", void 0);
tslib_1.__decorate([
    mobx_1.action.bound,
    tslib_1.__metadata("design:type", Object)
], NavStore.prototype, "goTo", void 0);
tslib_1.__decorate([
    mobx_1.action.bound,
    tslib_1.__metadata("design:type", Object)
], NavStore.prototype, "goToChartDrawer", void 0);
tslib_1.__decorate([
    mobx_1.action.bound,
    tslib_1.__metadata("design:type", Object)
], NavStore.prototype, "goToMlDrawer", void 0);
exports.NavStore = NavStore;

});
___scope___.file("client/index.styl", function(exports, require, module, __filename, __dirname){


require("default/styles.min.css")
});
___scope___.file("styles.min.css", function(exports, require, module, __filename, __dirname){

require("fuse-box-css")("styles.min.css");
});
return ___scope___.entry = "client/index.jsx";
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

FuseBox.import("default/client/index.jsx");
FuseBox.main("default/client/index.jsx");
})
(function(e){function r(e){var r=e.charCodeAt(0),n=e.charCodeAt(1);if((m||58!==n)&&(r>=97&&r<=122||64===r)){if(64===r){var t=e.split("/"),i=t.splice(2,t.length).join("/");return[t[0]+"/"+t[1],i||void 0]}var o=e.indexOf("/");if(o===-1)return[e];var a=e.substring(0,o),f=e.substring(o+1);return[a,f]}}function n(e){return e.substring(0,e.lastIndexOf("/"))||"./"}function t(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];for(var n=[],t=0,i=arguments.length;t<i;t++)n=n.concat(arguments[t].split("/"));for(var o=[],t=0,i=n.length;t<i;t++){var a=n[t];a&&"."!==a&&(".."===a?o.pop():o.push(a))}return""===n[0]&&o.unshift(""),o.join("/")||(o.length?"/":".")}function i(e){var r=e.match(/\.(\w{1,})$/);return r&&r[1]?e:e+".js"}function o(e){if(m){var r,n=document,t=n.getElementsByTagName("head")[0];/\.css$/.test(e)?(r=n.createElement("link"),r.rel="stylesheet",r.type="text/css",r.href=e):(r=n.createElement("script"),r.type="text/javascript",r.src=e,r.async=!0),t.insertBefore(r,t.firstChild)}}function a(e,r){for(var n in e)e.hasOwnProperty(n)&&r(n,e[n])}function f(e){return{server:require(e)}}function u(e,n){var o=n.path||"./",a=n.pkg||"default",u=r(e);if(u&&(o="./",a=u[0],n.v&&n.v[a]&&(a=a+"@"+n.v[a]),e=u[1]),e)if(126===e.charCodeAt(0))e=e.slice(2,e.length),o="./";else if(!m&&(47===e.charCodeAt(0)||58===e.charCodeAt(1)))return f(e);var s=x[a];if(!s){if(m&&"electron"!==_.target)throw"Package not found "+a;return f(a+(e?"/"+e:""))}e=e?e:"./"+s.s.entry;var l,d=t(o,e),c=i(d),p=s.f[c];return!p&&c.indexOf("*")>-1&&(l=c),p||l||(c=t(d,"/","index.js"),p=s.f[c],p||"."!==d||(c=s.s&&s.s.entry||"index.js",p=s.f[c]),p||(c=d+".js",p=s.f[c]),p||(p=s.f[d+".jsx"]),p||(c=d+"/index.jsx",p=s.f[c])),{file:p,wildcard:l,pkgName:a,versions:s.v,filePath:d,validPath:c}}function s(e,r,n){if(void 0===n&&(n={}),!m)return r(/\.(js|json)$/.test(e)?h.require(e):"");if(n&&n.ajaxed===e)return console.error(e,"does not provide a module");var i=new XMLHttpRequest;i.onreadystatechange=function(){if(4==i.readyState)if(200==i.status){var n=i.getResponseHeader("Content-Type"),o=i.responseText;/json/.test(n)?o="module.exports = "+o:/javascript/.test(n)||(o="module.exports = "+JSON.stringify(o));var a=t("./",e);_.dynamic(a,o),r(_.import(e,{ajaxed:e}))}else console.error(e,"not found on request"),r(void 0)},i.open("GET",e,!0),i.send()}function l(e,r){var n=y[e];if(n)for(var t in n){var i=n[t].apply(null,r);if(i===!1)return!1}}function d(e){if(null!==e&&["function","object","array"].indexOf(typeof e)!==-1&&!e.hasOwnProperty("default"))return Object.isFrozen(e)?void(e.default=e):void Object.defineProperty(e,"default",{value:e,writable:!0,enumerable:!1})}function c(e,r){if(void 0===r&&(r={}),58===e.charCodeAt(4)||58===e.charCodeAt(5))return o(e);var t=u(e,r);if(t.server)return t.server;var i=t.file;if(t.wildcard){var a=new RegExp(t.wildcard.replace(/\*/g,"@").replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&").replace(/@@/g,".*").replace(/@/g,"[a-z0-9$_-]+"),"i"),f=x[t.pkgName];if(f){var p={};for(var v in f.f)a.test(v)&&(p[v]=c(t.pkgName+"/"+v));return p}}if(!i){var g="function"==typeof r,y=l("async",[e,r]);if(y===!1)return;return s(e,function(e){return g?r(e):null},r)}var w=t.pkgName;if(i.locals&&i.locals.module)return i.locals.module.exports;var b=i.locals={},j=n(t.validPath);b.exports={},b.module={exports:b.exports},b.require=function(e,r){var n=c(e,{pkg:w,path:j,v:t.versions});return _.sdep&&d(n),n},m||!h.require.main?b.require.main={filename:"./",paths:[]}:b.require.main=h.require.main;var k=[b.module.exports,b.require,b.module,t.validPath,j,w];return l("before-import",k),i.fn.apply(k[0],k),l("after-import",k),b.module.exports}if(e.FuseBox)return e.FuseBox;var p="undefined"!=typeof ServiceWorkerGlobalScope,v="undefined"!=typeof WorkerGlobalScope,m="undefined"!=typeof window&&"undefined"!=typeof window.navigator||v||p,h=m?v||p?{}:window:global;m&&(h.global=v||p?{}:window),e=m&&"undefined"==typeof __fbx__dnm__?e:module.exports;var g=m?v||p?{}:window.__fsbx__=window.__fsbx__||{}:h.$fsbx=h.$fsbx||{};m||(h.require=require);var x=g.p=g.p||{},y=g.e=g.e||{},_=function(){function r(){}return r.global=function(e,r){return void 0===r?h[e]:void(h[e]=r)},r.import=function(e,r){return c(e,r)},r.on=function(e,r){y[e]=y[e]||[],y[e].push(r)},r.exists=function(e){try{var r=u(e,{});return void 0!==r.file}catch(e){return!1}},r.remove=function(e){var r=u(e,{}),n=x[r.pkgName];n&&n.f[r.validPath]&&delete n.f[r.validPath]},r.main=function(e){return this.mainFile=e,r.import(e,{})},r.expose=function(r){var n=function(n){var t=r[n].alias,i=c(r[n].pkg);"*"===t?a(i,function(r,n){return e[r]=n}):"object"==typeof t?a(t,function(r,n){return e[n]=i[r]}):e[t]=i};for(var t in r)n(t)},r.dynamic=function(r,n,t){this.pkg(t&&t.pkg||"default",{},function(t){t.file(r,function(r,t,i,o,a){var f=new Function("__fbx__dnm__","exports","require","module","__filename","__dirname","__root__",n);f(!0,r,t,i,o,a,e)})})},r.flush=function(e){var r=x.default;for(var n in r.f)e&&!e(n)||delete r.f[n].locals},r.pkg=function(e,r,n){if(x[e])return n(x[e].s);var t=x[e]={};return t.f={},t.v=r,t.s={file:function(e,r){return t.f[e]={fn:r}}},n(t.s)},r.addPlugin=function(e){this.plugins.push(e)},r.packages=x,r.isBrowser=m,r.isServer=!m,r.plugins=[],r}();return m||(h.FuseBox=_),e.FuseBox=_}(this))