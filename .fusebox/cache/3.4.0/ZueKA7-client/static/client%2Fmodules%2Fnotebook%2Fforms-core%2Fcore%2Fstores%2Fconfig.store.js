module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = require(\"tslib\");\r\nconst _ = require(\"lodash\");\r\nconst configDefault_1 = require(\"../configDefault\");\r\nconst mobx_1 = require(\"mobx\");\r\nclass ConfigStore {\r\n    constructor() {\r\n        this.setConfiguration = (config) => {\r\n            this.config = this.applyDefaultConfiguration(config);\r\n        };\r\n        this.config = this.applyDefaultConfiguration();\r\n    }\r\n    applyDefaultConfiguration(config = {}) {\r\n        _.merge(configDefault_1.configDefault, config);\r\n    }\r\n}\r\ntslib_1.__decorate([\r\n    mobx_1.observable,\r\n    tslib_1.__metadata(\"design:type\", Object)\r\n], ConfigStore.prototype, \"config\", void 0);\r\ntslib_1.__decorate([\r\n    mobx_1.action,\r\n    tslib_1.__metadata(\"design:type\", Object)\r\n], ConfigStore.prototype, \"setConfiguration\", void 0);\r\nexports.ConfigStore = ConfigStore;\r\n",
dependencies: ["tslib","lodash","../configDefault","mobx"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689369,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
