module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst React = require(\"react\");\r\nclass UnknownRenderer extends React.Component {\r\n    render() {\r\n        return (React.createElement(\"div\", { style: { color: 'red' } },\r\n            \"No applicable \",\r\n            this.props.type,\r\n            \" found.\"));\r\n    }\r\n}\r\nexports.UnknownRenderer = UnknownRenderer;\r\n",
dependencies: ["react"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689717,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
