module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst React = require(\"react\");\r\nconst styled_jss_1 = require(\"styled-jss\");\r\nexports.Wrapper = styled_jss_1.default('div')({\r\n    padding: 40,\r\n    background: '#f7df1e',\r\n    textAlign: 'center'\r\n});\r\nexports.FillFlex = styled_jss_1.default('div')({\r\n    display: 'flex',\r\n    flex: '1',\r\n    width: '100%',\r\n    height: '100%',\r\n});\r\nexports.Row = styled_jss_1.default('div')({\r\n    display: 'flex',\r\n    flex: '1 1 auto',\r\n    flexDirection: 'row',\r\n    justifyContent: 'stretch'\r\n});\r\nexports.VerticalStretch = styled_jss_1.default('div')({\r\n    display: \"flex\",\r\n    flex: \"1 1 auto\",\r\n    height: \"100%\",\r\n    flexDirection: \"column\",\r\n    justifyContent: \"stretch\"\r\n});\r\nexports.FillParent = styled_jss_1.default('div')({\r\n    position: 'relative',\r\n    top: 0,\r\n    bottom: 0,\r\n    left: 0,\r\n    right: 0,\r\n});\r\nexports.HorizontalStretch = styled_jss_1.default('div')({\r\n    display: 'flex',\r\n    flex: 'auto',\r\n    flexDirection: 'row',\r\n    justifyContent: 'stretch',\r\n});\r\nexports.CssClassWrapper = ({ children, className }) => (React.createElement(\"span\", Object.assign({}, { className }), children));\r\n",
dependencies: ["react","styled-jss"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689109,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
