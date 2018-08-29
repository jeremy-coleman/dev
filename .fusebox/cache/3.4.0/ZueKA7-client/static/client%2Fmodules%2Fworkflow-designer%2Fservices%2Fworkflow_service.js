module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass WorkflowService {\r\n    constructor() {\r\n        this._urlBase = 'https://s3-eu-west-1.amazonaws.com/dev.stack.foundation/catalog/';\r\n        this.catalogInfoHtmlStrings = {};\r\n    }\r\n    get urlBase() {\r\n        return this._urlBase;\r\n    }\r\n    getWorkflowImagesCatalog(refresh = false) {\r\n        if (this.catalogImages && !refresh) {\r\n            return Promise.resolve(this.catalogImages);\r\n        }\r\n        else {\r\n            return fetch(this._urlBase + 'catalog.json')\r\n                .then(response => response.json())\r\n                .then(catalog => {\r\n                this.catalogImages = catalog;\r\n                return this.catalogImages;\r\n            });\r\n        }\r\n    }\r\n    downloadYAML(workflow, filename = 'workflow.yaml') {\r\n    }\r\n}\r\nexports.WorkflowService = WorkflowService;\r\n",
dependencies: [],
sourceMap: {},
headerContent: undefined,
mtime: 1535400690107,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
