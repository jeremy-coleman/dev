
interface CharMap {
    cr: string;
    lf: string;
    tab: string;
    space: string;
    zero: string;
    nine: string;
    a: string;
    z: string;
    A: string;
    Z: string;
    [k : string] : string;
}

const chars : CharMap = {
    cr: "\r",
    lf: "\n",
    tab: "\t",
    space: " ",
    zero: "0",
    nine: "9",
    a: "a",
    z: "z",
    A: "A",
    Z: "Z"
};

interface CharCodeMap {
    cr: number,
    lf: number,
    tab: number,
    space: number,
    zero: number,
    nine: number,
    a: number,
    z: number,
    A: number,
    Z: number,
    [k : string] : number
}


const charCodes : CharCodeMap = {
    cr: chars.cr.charCodeAt(0),
    lf: chars.lf.charCodeAt(0),
    tab: chars.tab.charCodeAt(0),
    space: chars.space.charCodeAt(0),
    zero: chars.zero.charCodeAt(0),
    nine: chars.nine.charCodeAt(0),
    a: chars.a.charCodeAt(0),
    z: chars.z.charCodeAt(0),
    A: chars.A.charCodeAt(0),
    Z: chars.Z.charCodeAt(0)
};

const isWhitespace = (ch : string) => {
    var code = ch.charCodeAt(0);
    return isNaN(code) ||
            (code >= 9 && code <= 13) ||
            code === 32 ||
            code === 133 ||
            code === 160 ||
            code === 5760 ||
            (code >= 8192 && code <= 8202) ||
            code === 8232 ||
            code === 8233 ||
            code === 8239 ||
            code === 8287 ||
            code === 12288;
};

const isNotWhitespace = (ch : string) => {
    return !isWhitespace(ch);
};

const isDigit  = (ch : string) => {
    var code = ch.charCodeAt(0);
    return code >= charCodes.zero && code <= charCodes.nine;
};

const isNotDigit  = (ch : string) => {
    return !isDigit(ch);
};

const isAlpha  = (ch : string) => {
    var code = ch.charCodeAt(0);
    return (code >= charCodes.a && code <= charCodes.z) || (code >= charCodes.A && code <= charCodes.Z);
};

const isNotAlpha  = (ch : string) => {
    return !isAlpha(ch);
};

const isAlphaNumeric  = (ch : string) => {
    return isAlpha(ch) || isDigit(ch);
};

const isNotAlphaNumeric  = (ch : string) => {
    return !isAlpha(ch) && !isDigit(ch);
};

export {
    isWhitespace,
    isWhitespace as whitespace,
    isNotWhitespace,
    isNotWhitespace as nonWhitespace,
    isDigit,
    isDigit as digit,
    isNotDigit,
    isNotDigit as nonDigit,
    isAlpha,
    isAlpha as alpha,
    isNotAlpha,
    isNotAlpha as nonAlpha,
    isAlphaNumeric,
    isAlphaNumeric as alphaNumeric,
    isNotAlphaNumeric,
    isNotAlphaNumeric as nonAlphaNumeric
};