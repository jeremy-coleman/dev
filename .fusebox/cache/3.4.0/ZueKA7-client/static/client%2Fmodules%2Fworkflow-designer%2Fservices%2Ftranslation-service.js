module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nfunction translate(_key, _args) {\r\n    let key, args = [];\r\n    if (typeof _key === 'string') {\r\n        key = _key;\r\n    }\r\n    else {\r\n        key = _key[0];\r\n        args = args.concat(_key.slice(1));\r\n    }\r\n    if (_args) {\r\n        if (Array.isArray(_args)) {\r\n            args = args.concat(_args);\r\n        }\r\n        else {\r\n            args.push(_args);\r\n        }\r\n    }\r\n    let translated = undefined;\r\n    if (window.translations) {\r\n        translated = window.translations[key];\r\n    }\r\n    if (translated === undefined) {\r\n        console.warn('No translation defined for \"%s\"', key);\r\n        translated = key;\r\n    }\r\n    else {\r\n        for (var i = 0; i < args.length; i++) {\r\n            let position = translated.indexOf('{}');\r\n            if (position < 0) {\r\n                break;\r\n            }\r\n            translated = translated.substring(0, position) + args[i] + translated.substring(position + 2);\r\n        }\r\n    }\r\n    return translated;\r\n}\r\nexports.translate = translate;\r\n",
dependencies: [],
sourceMap: {},
headerContent: undefined,
mtime: 1535400690099,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
