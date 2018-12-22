"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const escape = {
    42: "(.*)",
    46: ".",
    47: "\\/",
};
function parse(input) {
    let reg = "";
    let absolute = false;
    if (input[0] === "/") {
        reg += "^";
        absolute = true;
    }
    const str = input.toLowerCase();
    const params = [];
    let param = -1;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        if (char === 58) {
            param = i + 1;
        }
        else if (param !== -1) {
            const isEnd = i === str.length - 1;
            const isSlash = char === 47;
            if (isSlash || isEnd) {
                params.push(input.slice(param, isEnd ? i + 1 : i));
                reg += "(\\w+)" + (isSlash ? escape[char] : "");
                param = -1;
            }
        }
        else {
            const n = escape[char];
            reg += n ? n : str[i];
            if (char === 42)
                params.push("*");
        }
    }
    return {
        regex: new RegExp(reg),
        params,
        absolute,
    };
}
exports.parse = parse;
class PathRegExp {
    constructor(path) {
        this.path = path;
        const res = parse(path);
        this.regex = res.regex;
        this.params = res.params;
        this.absolute = res.absolute;
    }
    match(url, exact = false) {
        const { regex, params } = this;
        regex.lastIndex = 0;
        const res = regex.exec(url.toLowerCase());
        if (res === null)
            return null;
        if (exact && res.input.slice(res[0].length).length > 0)
            return null;
        var out = {
            matched: res[0],
            params: {},
            path: this.path,
            absolute: this.absolute,
        };
        for (let i = 1; i < res.length; i++) {
            const item = res[i];
            if (item) {
                out.params[params[i - 1]] = item;
            }
        }
        return out;
    }
}
exports.PathRegExp = PathRegExp;
function createUrl(reg, params = {}) {
    let path = reg.path;
    for (let i = 0; i < reg.params.length; i++) {
        const name = reg.params[i];
        const needle = name === "*" ? "*" : ":" + name;
        path = path.replace(needle, params[name]);
    }
    return path;
}
exports.createUrl = createUrl;
