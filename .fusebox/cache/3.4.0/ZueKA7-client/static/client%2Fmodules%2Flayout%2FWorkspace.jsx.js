module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst React = require(\"react\");\r\nconst styled_jss_1 = require(\"styled-jss\");\r\nconst mobx_react_1 = require(\"mobx-react\");\r\nconst Container = styled_jss_1.default('div')({\r\n    position: \"relative\",\r\n    display: 'flex',\r\n    flexGrow: 1,\r\n    flexShrink: 1,\r\n    flexBasis: \"0%\",\r\n    flexDirection: \"column\",\r\n    width: \"100%\",\r\n    margin: 1,\r\n    overflow: 'hidden'\r\n});\r\nexports.MiddlePanel = mobx_react_1.observer((props) => React.createElement(Container, null, props.children));\r\n",
dependencies: ["react","styled-jss","mobx-react"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689103,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
