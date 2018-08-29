module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = require(\"tslib\");\r\nvar _a;\r\nconst React = require(\"react\");\r\nconst mobx_1 = require(\"mobx\");\r\nconst mobx_react_1 = require(\"mobx-react\");\r\nlet ManualImageField = class ManualImageField extends React.Component {\r\n    constructor(props) {\r\n        super(props);\r\n    }\r\n    onImageChange(event) {\r\n        this.props.step.image = event.target.value;\r\n    }\r\n    render() {\r\n        return (React.createElement(\"div\", { className: \"pure-g\" },\r\n            React.createElement(\"div\", { className: \"pure-u-1 native-key-bindings\" },\r\n                React.createElement(\"input\", { type: \"text\", className: \"pure-input-1 input-text native-key-bindings\", name: \"image\", value: this.props.step.image || '', onChange: e => this.onImageChange(e) }))));\r\n    }\r\n};\r\ntslib_1.__decorate([\r\n    mobx_1.action,\r\n    tslib_1.__metadata(\"design:type\", Function),\r\n    tslib_1.__metadata(\"design:paramtypes\", [typeof (_a = typeof React !== \"undefined\" && React.ChangeEvent) === \"function\" ? _a : Object]),\r\n    tslib_1.__metadata(\"design:returntype\", void 0)\r\n], ManualImageField.prototype, \"onImageChange\", null);\r\nManualImageField = tslib_1.__decorate([\r\n    mobx_react_1.observer,\r\n    tslib_1.__metadata(\"design:paramtypes\", [Object])\r\n], ManualImageField);\r\nexports.ManualImageField = ManualImageField;\r\n",
dependencies: ["tslib","react","mobx","mobx-react"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689813,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
