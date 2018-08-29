module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = require(\"tslib\");\r\nconst _ = require(\"lodash\");\r\nconst core_1 = require(\"../core\");\r\nexports.mergeTransformProps = (store, ownProps, mapStoreValuesToProps = core_1.mapStoreValuesToControlProps) => {\r\n    const transformedProps = (core_1.getPropsTransformers(store) || []).reduce((props, materializer) => _.merge(props, materializer(store, props)), mapStoreValuesToProps(store, ownProps));\r\n    return transformedProps;\r\n};\r\nexports.createPropsForItem = (inputProps, mapStoreValuesToProps, mapUpdateActionToProps = null) => {\r\n    const { jsonFormsStore } = inputProps, ownProps = tslib_1.__rest(inputProps, [\"jsonFormsStore\"]);\r\n    const effectiveFromStateProps = exports.mergeTransformProps(jsonFormsStore, ownProps, mapStoreValuesToProps);\r\n    const actionProps = mapUpdateActionToProps ? mapUpdateActionToProps(jsonFormsStore) : {};\r\n    return Object.assign({}, effectiveFromStateProps, actionProps);\r\n};\r\n",
dependencies: ["tslib","lodash","../core"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689732,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
