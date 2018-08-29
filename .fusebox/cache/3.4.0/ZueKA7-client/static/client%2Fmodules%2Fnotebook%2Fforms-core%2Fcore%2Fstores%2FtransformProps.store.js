module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = require(\"tslib\");\r\nconst mobx_1 = require(\"mobx\");\r\nclass TransformPropsStore {\r\n    constructor() {\r\n        this.setTransformers = (transformers) => {\r\n            this.transformers = transformers;\r\n        };\r\n        this.addTransformer = (transformer) => {\r\n            this.transformers = this.transformers.concat([transformer]);\r\n        };\r\n        this.transformers = [];\r\n    }\r\n}\r\ntslib_1.__decorate([\r\n    mobx_1.observable,\r\n    tslib_1.__metadata(\"design:type\", Array)\r\n], TransformPropsStore.prototype, \"transformers\", void 0);\r\ntslib_1.__decorate([\r\n    mobx_1.action,\r\n    tslib_1.__metadata(\"design:type\", Object)\r\n], TransformPropsStore.prototype, \"setTransformers\", void 0);\r\ntslib_1.__decorate([\r\n    mobx_1.action,\r\n    tslib_1.__metadata(\"design:type\", Object)\r\n], TransformPropsStore.prototype, \"addTransformer\", void 0);\r\nexports.TransformPropsStore = TransformPropsStore;\r\n",
dependencies: ["tslib","mobx"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689402,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
