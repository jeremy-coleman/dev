module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = require(\"tslib\");\r\nconst mobx_1 = require(\"mobx\");\r\nclass NavStore {\r\n    constructor() {\r\n        this.goTo = (inputRoute) => this.route = inputRoute;\r\n        this.goToChartDrawer = (inputRoute) => this.chartDrawerRoute = inputRoute;\r\n        this.goToMlDrawer = (inputRoute) => this.mlDrawerRoute = inputRoute;\r\n        this.route = 'home';\r\n    }\r\n    ;\r\n}\r\ntslib_1.__decorate([\r\n    mobx_1.observable,\r\n    tslib_1.__metadata(\"design:type\", String)\r\n], NavStore.prototype, \"route\", void 0);\r\ntslib_1.__decorate([\r\n    mobx_1.observable,\r\n    tslib_1.__metadata(\"design:type\", String)\r\n], NavStore.prototype, \"chartDrawerRoute\", void 0);\r\ntslib_1.__decorate([\r\n    mobx_1.observable,\r\n    tslib_1.__metadata(\"design:type\", String)\r\n], NavStore.prototype, \"mlDrawerRoute\", void 0);\r\ntslib_1.__decorate([\r\n    mobx_1.action.bound,\r\n    tslib_1.__metadata(\"design:type\", Object)\r\n], NavStore.prototype, \"goTo\", void 0);\r\ntslib_1.__decorate([\r\n    mobx_1.action.bound,\r\n    tslib_1.__metadata(\"design:type\", Object)\r\n], NavStore.prototype, \"goToChartDrawer\", void 0);\r\ntslib_1.__decorate([\r\n    mobx_1.action.bound,\r\n    tslib_1.__metadata(\"design:type\", Object)\r\n], NavStore.prototype, \"goToMlDrawer\", void 0);\r\nexports.NavStore = NavStore;\r\n",
dependencies: ["tslib","mobx"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400690197,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
