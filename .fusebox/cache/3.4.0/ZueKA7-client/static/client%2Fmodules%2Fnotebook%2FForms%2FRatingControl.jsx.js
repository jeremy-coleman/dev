module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst React = require(\"react\");\r\nconst forms_core_1 = require(\"../forms-core\");\r\nconst forms_core_2 = require(\"../forms-core\");\r\nconst Rating_1 = require(\"./Rating\");\r\nconst mobx_react_1 = require(\"mobx-react\");\r\nconst RatingControl = ({ data, handleChange, path }) => (React.createElement(Rating_1.Rating, { value: data, onClick: ev => handleChange(path, Number(ev.value)) }));\r\nexports.default = mobx_react_1.inject(\"jsonFormsStore\")(mobx_react_1.observer(class extends React.Component {\r\n    render() {\r\n        const effectiveProps = forms_core_2.createPropsForItem(this.props, forms_core_1.mapStoreValuesToControlProps, forms_core_1.mapUpdateActionToControlProps);\r\n        return (React.createElement(RatingControl, Object.assign({}, effectiveProps)));\r\n    }\r\n}));\r\n",
dependencies: ["react","../forms-core","../forms-core","./Rating","mobx-react"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689245,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
