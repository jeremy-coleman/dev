module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = require(\"tslib\");\r\nconst mobx_1 = require(\"mobx\");\r\nclass RendererStore {\r\n    constructor() {\r\n        this.setRenderers = (renderers) => {\r\n            this.renderers = renderers;\r\n        };\r\n        this.addRenderer = (tester, renderer) => {\r\n            this.renderers = this.renderers.concat([{ tester, renderer }]);\r\n        };\r\n        this.removeRenderer = (tester) => {\r\n            this.renderers = this.renderers.filter(t => t.tester !== tester);\r\n        };\r\n        this.renderers = [];\r\n    }\r\n}\r\ntslib_1.__decorate([\r\n    mobx_1.observable,\r\n    tslib_1.__metadata(\"design:type\", Array)\r\n], RendererStore.prototype, \"renderers\", void 0);\r\ntslib_1.__decorate([\r\n    mobx_1.action,\r\n    tslib_1.__metadata(\"design:type\", Object)\r\n], RendererStore.prototype, \"setRenderers\", void 0);\r\ntslib_1.__decorate([\r\n    mobx_1.action,\r\n    tslib_1.__metadata(\"design:type\", Object)\r\n], RendererStore.prototype, \"addRenderer\", void 0);\r\ntslib_1.__decorate([\r\n    mobx_1.action,\r\n    tslib_1.__metadata(\"design:type\", Object)\r\n], RendererStore.prototype, \"removeRenderer\", void 0);\r\nexports.RendererStore = RendererStore;\r\n",
dependencies: ["tslib","mobx"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689397,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
