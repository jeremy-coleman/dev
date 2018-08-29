module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = require(\"tslib\");\r\nconst mobx_react_1 = require(\"mobx-react\");\r\nconst React = require(\"react\");\r\nconst core_1 = require(\"../../core\");\r\nconst react_1 = require(\"../../react\");\r\nconst layout_1 = require(\"../util/layout\");\r\nexports.materialHorizontalLayoutTester = core_1.rankWith(2, core_1.uiTypeIs('HorizontalLayout'));\r\nexports.MaterialHorizontalLayoutRenderer = ({ schema, uischema, path, visible }) => {\r\n    const horizontalLayout = uischema;\r\n    const childProps = {\r\n        elements: horizontalLayout.elements,\r\n        schema,\r\n        path,\r\n        direction: 'row',\r\n        visible\r\n    };\r\n    return React.createElement(layout_1.MaterialLayoutRenderer, Object.assign({}, childProps));\r\n};\r\nlet ConnectedMaterialHorizontalLayoutRendered = class ConnectedMaterialHorizontalLayoutRendered extends React.Component {\r\n    render() {\r\n        const effectiveProps = react_1.createPropsForItem(this.props, core_1.mapStoreValuesToLayoutProps);\r\n        return (React.createElement(exports.MaterialHorizontalLayoutRenderer, Object.assign({}, effectiveProps)));\r\n    }\r\n};\r\nConnectedMaterialHorizontalLayoutRendered = tslib_1.__decorate([\r\n    mobx_react_1.inject(\"jsonFormsStore\"),\r\n    mobx_react_1.observer\r\n], ConnectedMaterialHorizontalLayoutRendered);\r\nexports.default = ConnectedMaterialHorizontalLayoutRendered;\r\n",
dependencies: ["tslib","mobx-react","react","../../core","../../react","../util/layout"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689660,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
