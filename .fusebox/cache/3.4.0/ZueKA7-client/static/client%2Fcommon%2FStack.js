module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass Stack {\r\n    constructor() {\r\n        this.init();\r\n    }\r\n    init() {\r\n        this.items = [];\r\n        this.count = 0;\r\n    }\r\n    getLength() {\r\n        return this.count;\r\n    }\r\n    push(item) {\r\n        this.items.push(item);\r\n        this.count = this.count + 1;\r\n    }\r\n    pop() {\r\n        if (this.count > 0) {\r\n            this.count = this.count - 1;\r\n        }\r\n        return this.items.pop();\r\n    }\r\n    peek() {\r\n        return this.items.slice(-1)[0];\r\n    }\r\n    elements() {\r\n        return this.items;\r\n    }\r\n    empty() {\r\n        this.init();\r\n    }\r\n}\r\nexports.default = Stack;\r\nexports.Stack = Stack;\r\n",
dependencies: [],
sourceMap: {},
headerContent: undefined,
mtime: 1535400688982,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
