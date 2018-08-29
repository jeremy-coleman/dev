module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = require(\"tslib\");\r\nconst React = require(\"react\");\r\nconst mobx_react_1 = require(\"mobx-react\");\r\nconst go_1 = require(\"react-icons/go\");\r\nlet injectSheet = require('react-jss').default;\r\nconst style_1 = require(\"../style\");\r\nconst styles = (theme) => {\r\n    return style_1.errorStyles(theme);\r\n};\r\nlet ErrorPanel = class ErrorPanel extends React.Component {\r\n    constructor(props) {\r\n        super(props);\r\n    }\r\n    render() {\r\n        let classes = this.props.classes;\r\n        return React.createElement(\"div\", { className: \"block\" },\r\n            React.createElement(\"div\", { className: classes.errorPanel },\r\n                this.props.message,\r\n                React.createElement(\"div\", { onClick: () => this.props.onClose && this.props.onClose(), className: classes.errorPanelClose },\r\n                    React.createElement(go_1.GoX, null))));\r\n    }\r\n};\r\nErrorPanel = tslib_1.__decorate([\r\n    injectSheet(styles),\r\n    mobx_react_1.observer,\r\n    tslib_1.__metadata(\"design:paramtypes\", [Object])\r\n], ErrorPanel);\r\nexports.ErrorPanel = ErrorPanel;\r\n",
dependencies: ["tslib","react","mobx-react","react-icons/go","react-jss","../style"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689779,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
