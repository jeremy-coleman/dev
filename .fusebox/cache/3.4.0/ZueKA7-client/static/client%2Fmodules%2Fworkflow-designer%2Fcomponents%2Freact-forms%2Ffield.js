module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = require(\"tslib\");\r\nconst mobx_1 = require(\"mobx\");\r\nclass Field {\r\n    constructor(originalRef, validator) {\r\n        this._errors = [];\r\n        this.originalRef = originalRef;\r\n        this._validator = validator;\r\n        this._errors = [];\r\n    }\r\n    get valid() {\r\n        return this._errors && this._errors.length === 0;\r\n    }\r\n    get errors() {\r\n        return this._errors;\r\n    }\r\n    updateValue(value) {\r\n        this.fieldVal = value;\r\n        this.validate();\r\n    }\r\n    validate() {\r\n        if (this._validator) {\r\n            this._errors = this._validator(this.fieldVal) || [];\r\n        }\r\n    }\r\n}\r\ntslib_1.__decorate([\r\n    mobx_1.observable,\r\n    tslib_1.__metadata(\"design:type\", String)\r\n], Field.prototype, \"originalRef\", void 0);\r\ntslib_1.__decorate([\r\n    mobx_1.observable,\r\n    tslib_1.__metadata(\"design:type\", Object)\r\n], Field.prototype, \"originalVal\", void 0);\r\ntslib_1.__decorate([\r\n    mobx_1.observable,\r\n    tslib_1.__metadata(\"design:type\", Object)\r\n], Field.prototype, \"fieldVal\", void 0);\r\nexports.Field = Field;\r\n",
dependencies: ["tslib","mobx"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689837,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
