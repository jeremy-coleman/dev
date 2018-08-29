module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst _ = require(\"lodash\");\r\nexports.compose = (path1, path2) => {\r\n    let p1 = path1;\r\n    if (!_.isEmpty(path1) && !_.isEmpty(path2) && !path2.startsWith('[')) {\r\n        p1 = path1 + '.';\r\n    }\r\n    if (_.isEmpty(p1)) {\r\n        return path2;\r\n    }\r\n    else if (_.isEmpty(path2)) {\r\n        return p1;\r\n    }\r\n    else {\r\n        return `${p1}${path2}`;\r\n    }\r\n};\r\nexports.toDataPathSegments = (schemaPath) => {\r\n    const segments = schemaPath.split('/');\r\n    const startFromRoot = segments[0] === '#' || segments[0] === '';\r\n    const startIndex = startFromRoot ? 2 : 1;\r\n    return _.range(startIndex, segments.length, 2).map(idx => segments[idx]);\r\n};\r\nexports.toDataPath = (schemaPath) => {\r\n    return exports.toDataPathSegments(schemaPath).join('.');\r\n};\r\nexports.composeWithUi = (scopableUi, path) => {\r\n    const segments = exports.toDataPathSegments(scopableUi.scope);\r\n    if (_.isEmpty(segments) && path === undefined) {\r\n        return '';\r\n    }\r\n    return _.isEmpty(segments) ? path : exports.compose(path, segments.join('.'));\r\n};\r\n",
dependencies: ["lodash"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689450,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
