module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst React = require(\"react\");\r\nconst mobx_react_1 = require(\"mobx-react\");\r\nconst dimensions_1 = require(\"./dimensions\");\r\nconst version = '0.0.1';\r\nconst copyrightString = '© Copyright Coglite 2018';\r\nconst theming_1 = require(\"theming\");\r\nconst styled_jss_1 = require(\"styled-jss\");\r\nconst FooterDimensions = theming_1.withTheme(styled_jss_1.default('div')(({ theme }) => ({\r\n    border: \"0px solid black\",\r\n    display: \"flex\",\r\n    maxHeight: 25,\r\n    minHeight: 25,\r\n    width: \"100%\",\r\n    flexDirection: \"row\",\r\n    position: \"relative\",\r\n    bottom: 0,\r\n    left: 0,\r\n    right: 0,\r\n    flexWrap: \"none\",\r\n    backgroundColor: theme.palette.primary.main,\r\n    color: theme.palette.primary.contrastText,\r\n})));\r\nexports.StatusFooter = mobx_react_1.observer((props) => (React.createElement(FooterDimensions, null,\r\n    React.createElement(dimensions_1.HorizontalStretch, null,\r\n        React.createElement(\"span\", null, copyrightString),\r\n        React.createElement(\"div\", { style: { flex: 'auto' } }),\r\n        React.createElement(\"span\", null, `Version: ${version || 'pre-release'}`)))));\r\n",
dependencies: ["react","mobx-react","./dimensions","theming","styled-jss"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689089,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
