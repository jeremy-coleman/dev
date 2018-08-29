module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = require(\"tslib\");\r\nconst core_1 = require(\"@material-ui/core\");\r\nconst mobx_react_1 = require(\"mobx-react\");\r\nconst React = require(\"react\");\r\nconst core_2 = require(\"../../core\");\r\nconst react_1 = require(\"../../react\");\r\nexports.MaterialDateField = (props) => {\r\n    const { data, className, id, enabled, uischema, path, handleChange } = props;\r\n    return (React.createElement(core_1.Input, { type: 'date', value: data || '', onChange: ev => handleChange(path, ev.target.value), className: className, id: id, disabled: !enabled, autoFocus: uischema.options && uischema.options.focus, fullWidth: true }));\r\n};\r\nexports.materialDateFieldTester = core_2.rankWith(2, core_2.isDateControl);\r\nlet MaterializedDateField = class MaterializedDateField extends React.Component {\r\n    render() {\r\n        const effectiveProps = react_1.createPropsForItem(this.props, core_2.mapStoreValuesToFieldProps, core_2.mapUpdateActionToFieldProps);\r\n        return (React.createElement(exports.MaterialDateField, Object.assign({}, effectiveProps)));\r\n    }\r\n};\r\nMaterializedDateField = tslib_1.__decorate([\r\n    mobx_react_1.inject(\"jsonFormsStore\"),\r\n    mobx_react_1.observer\r\n], MaterializedDateField);\r\nexports.default = MaterializedDateField;\r\n",
dependencies: ["tslib","@material-ui/core","mobx-react","react","../../core","../../react"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689579,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
