module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = require(\"tslib\");\r\nconst mobx_1 = require(\"mobx\");\r\nclass FieldStore {\r\n    constructor() {\r\n        this.setFields = (fields) => {\r\n            this.fields = fields;\r\n        };\r\n        this.addField = (tester, field) => {\r\n            this.fields = this.fields.concat([{ tester, field }]);\r\n        };\r\n        this.removeField = (tester) => {\r\n            this.fields = this.fields.filter(t => t.tester !== tester);\r\n        };\r\n        this.fields = [];\r\n    }\r\n}\r\ntslib_1.__decorate([\r\n    mobx_1.observable,\r\n    tslib_1.__metadata(\"design:type\", Array)\r\n], FieldStore.prototype, \"fields\", void 0);\r\ntslib_1.__decorate([\r\n    mobx_1.action,\r\n    tslib_1.__metadata(\"design:type\", Object)\r\n], FieldStore.prototype, \"setFields\", void 0);\r\ntslib_1.__decorate([\r\n    mobx_1.action,\r\n    tslib_1.__metadata(\"design:type\", Object)\r\n], FieldStore.prototype, \"addField\", void 0);\r\ntslib_1.__decorate([\r\n    mobx_1.action,\r\n    tslib_1.__metadata(\"design:type\", Object)\r\n], FieldStore.prototype, \"removeField\", void 0);\r\nexports.FieldStore = FieldStore;\r\n",
dependencies: ["tslib","mobx"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689387,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
