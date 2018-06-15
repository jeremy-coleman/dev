import * as url from 'url';

export const uniqueId = (length?: number) => Math.random().toString(24).substr(2, length);

export function isObject(item: any): boolean {
    return (item && typeof item === 'object' && !Array.isArray(item) && item !== null);
}

export function mergeDeep(target: any, source: any): any {
    let output = Object.assign({}, target);
        {Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
            if (!(key in target))
                Object.assign(output, { [key]: source[key] });
            else
                output[key] = mergeDeep(target[key], source[key]);
            } else {
            Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
}

export const isLocalhostUrl = (urlStr: string): boolean => {
    const parsedUrl = url.parse(urlStr);
    return (parsedUrl.hostname === 'localhost' || parsedUrl.hostname === '127.0.0.1');
}

export const isSecuretUrl = (urlStr: string): boolean => {
    const parsedUrl = url.parse(urlStr);
    return (!!parsedUrl.protocol && parsedUrl.protocol.startsWith('https'));
}

export const safeStringify = (o: any, space: string | number = undefined): string => {
 let cache = [];
 if (typeof o !== 'object')
  return `${o}`;
  return JSON.stringify(o, function (key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                return; } cache.push(value);} return value; }, space);
}

export const approximateObjectSize = (object: any, cache:any[] = []): number => {
    switch (typeof object) {
        case 'boolean': return 4;
        case 'number':  return 8;
        case 'string':  return object.length * 2;
        case 'object':  let bytes = 0; cache.push(object); for (let i in object) {let value = object[i];
            if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) { continue;} cache.push(value);}
                bytes += approximateObjectSize(value, cache); }
            return bytes; default: //value is null, undefined, or a function
            return 0; //this checked for infinite recursion
    }
}

export function repeat(str: string, times: number) {
    let output = '';
    for(let i=0; i<times; ++i){
        output += str;
    }
    return output;
}
