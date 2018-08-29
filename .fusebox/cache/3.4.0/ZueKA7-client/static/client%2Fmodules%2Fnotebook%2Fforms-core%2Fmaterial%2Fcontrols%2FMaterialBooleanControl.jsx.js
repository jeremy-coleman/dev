module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = require(\"tslib\");\r\nconst core_1 = require(\"@material-ui/core\");\r\nconst mobx_react_1 = require(\"mobx-react\");\r\nconst React = require(\"react\");\r\nconst core_2 = require(\"../../core\");\r\nconst react_1 = require(\"../../react\");\r\nconst MaterialBooleanField_1 = require(\"../fields/MaterialBooleanField\");\r\nexports.MaterialBooleanControl = ({ label, uischema, schema, visible, parentPath }) => {\r\n    let style = {};\r\n    if (!visible) {\r\n        style = { display: 'none' };\r\n    }\r\n    return (React.createElement(core_1.FormControlLabel, { style: style, label: label, control: React.createElement(MaterialBooleanField_1.default, { uischema: uischema, schema: schema, path: parentPath }) }));\r\n};\r\nlet ConnectedMaterialBooleanControl = class ConnectedMaterialBooleanControl extends React.Component {\r\n    render() {\r\n        const effectiveProps = react_1.createPropsForItem(this.props, core_2.mapStoreValuesToControlProps);\r\n        return (React.createElement(exports.MaterialBooleanControl, Object.assign({}, effectiveProps)));\r\n    }\r\n};\r\nConnectedMaterialBooleanControl = tslib_1.__decorate([\r\n    mobx_react_1.inject(\"jsonFormsStore\"),\r\n    mobx_react_1.observer\r\n], ConnectedMaterialBooleanControl);\r\nexports.default = ConnectedMaterialBooleanControl;\r\nexports.materialBooleanControlTester = core_2.rankWith(2, core_2.isBooleanControl);\r\n",
dependencies: ["tslib","@material-ui/core","mobx-react","react","../../core","../../react","../fields/MaterialBooleanField"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689537,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
