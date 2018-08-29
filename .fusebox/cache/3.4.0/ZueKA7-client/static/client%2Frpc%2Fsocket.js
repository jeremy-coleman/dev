module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst rpc_websockets_1 = require(\"rpc-websockets\");\r\nexports.initiateRpcClient = (port = 9000, host = \"localhost\") => {\r\n    const webSocketString = `ws://${host}:${port}`;\r\n    const ws = new rpc_websockets_1.Client(webSocketString);\r\n    return ws;\r\n};\r\n",
dependencies: ["rpc-websockets"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400690190,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
