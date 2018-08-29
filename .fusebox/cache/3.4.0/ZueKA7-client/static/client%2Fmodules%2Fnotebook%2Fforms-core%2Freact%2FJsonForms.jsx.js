module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = require(\"tslib\");\r\nconst _ = require(\"lodash\");\r\nconst mobx_react_1 = require(\"mobx-react\");\r\nconst React = require(\"react\");\r\nconst core_1 = require(\"../core\");\r\nconst UnknownRenderer_1 = require(\"./UnknownRenderer\");\r\nclass JsonFormsRenderer extends React.Component {\r\n    render() {\r\n        const { uischema, schema, path, renderers } = this.props;\r\n        const renderer = _.maxBy(renderers, r => r.tester(uischema, schema));\r\n        if (renderer === undefined || renderer.tester(uischema, schema) === -1) {\r\n            return React.createElement(UnknownRenderer_1.UnknownRenderer, { type: 'renderer' });\r\n        }\r\n        else {\r\n            const Render = renderer.renderer;\r\n            return (React.createElement(Render, { uischema: uischema, schema: schema, path: path, renderers: renderers }));\r\n        }\r\n    }\r\n}\r\nlet JsonForms = class JsonForms extends React.Component {\r\n    render() {\r\n        const _a = this.props, { jsonFormsStore } = _a, otherProps = tslib_1.__rest(_a, [\"jsonFormsStore\"]);\r\n        const effectiveProps = core_1.mapStoreValuesToRendererProps(jsonFormsStore, otherProps);\r\n        return (React.createElement(JsonFormsRenderer, Object.assign({}, effectiveProps)));\r\n    }\r\n};\r\nJsonForms = tslib_1.__decorate([\r\n    mobx_react_1.inject(\"jsonFormsStore\"),\r\n    mobx_react_1.observer\r\n], JsonForms);\r\nexports.JsonForms = JsonForms;\r\n",
dependencies: ["tslib","lodash","mobx-react","react","../core","./UnknownRenderer"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689704,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
