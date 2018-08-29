module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = require(\"tslib\");\r\nconst _ = require(\"lodash\");\r\nconst mobx_react_1 = require(\"mobx-react\");\r\nconst React = require(\"react\");\r\nconst core_1 = require(\"../core\");\r\nconst UnknownRenderer_1 = require(\"./UnknownRenderer\");\r\nconst Dispatch = (dispatchFieldProps) => {\r\n    const uischema = dispatchFieldProps.uischema;\r\n    const schema = dispatchFieldProps.schema;\r\n    const field = _.maxBy(dispatchFieldProps.fields, r => r.tester(uischema, schema));\r\n    if (field === undefined || field.tester(uischema, schema) === -1) {\r\n        return React.createElement(UnknownRenderer_1.UnknownRenderer, { type: 'field' });\r\n    }\r\n    else {\r\n        const Field = field.field;\r\n        return (React.createElement(Field, { schema: schema, uischema: uischema, path: dispatchFieldProps.path }));\r\n    }\r\n};\r\nlet DispatchField = class DispatchField extends React.Component {\r\n    render() {\r\n        const _a = this.props, { jsonFormsStore } = _a, ownProps = tslib_1.__rest(_a, [\"jsonFormsStore\"]);\r\n        const effectiveProps = core_1.mapStoreValuesToDispatchFieldProps(jsonFormsStore, ownProps);\r\n        return (React.createElement(Dispatch, Object.assign({}, effectiveProps)));\r\n    }\r\n};\r\nDispatchField = tslib_1.__decorate([\r\n    mobx_react_1.inject(\"jsonFormsStore\"),\r\n    mobx_react_1.observer\r\n], DispatchField);\r\nexports.DispatchField = DispatchField;\r\n",
dependencies: ["tslib","lodash","mobx-react","react","../core","./UnknownRenderer"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689698,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
