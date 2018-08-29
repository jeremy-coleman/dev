module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst rpc_websockets_1 = require(\"rpc-websockets\");\r\nexports.initiateRpcServer = (port = 9000, host = \"localhost\") => {\r\n    const server = new rpc_websockets_1.Server({ port: port, host: host });\r\n    server.register('Add', function (params) {\r\n        return parseFloat(params[0]) + parseFloat(params[1]);\r\n    });\r\n    server.register('Subtract', function (params) {\r\n        return parseFloat(params[0]) - parseFloat(params[1]);\r\n    });\r\n    server.register('Divide', function (params) {\r\n        return parseFloat(params[0]) / parseFloat(params[1]);\r\n    });\r\n    server.register('Multiply', function (params) {\r\n        return parseFloat(params[0]) * parseFloat(params[1]);\r\n    });\r\n    server.event('initialised');\r\n    server.emit('initialised');\r\n    return server;\r\n};\r\nexports.closeRpcServer = (server) => {\r\n    server.close();\r\n};\r\nexports.executeRequest = (ws, method, params, callback) => {\r\n    ws.on('open', function () {\r\n        console.log(\"OK BLOCK!!!\");\r\n        const callMethod = ws[method](...params);\r\n        if (callback)\r\n            callMethod.then(callback);\r\n    });\r\n};\r\n",
dependencies: ["rpc-websockets"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400690365,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
