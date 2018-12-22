"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function clamp(value, min = 0, max = 1) {
    if (value < min) {
        return min;
    }
    if (value > max) {
        return max;
    }
    return value;
}
function convertHexToRGB(color) {
    color = color.substr(1);
    const re = new RegExp(`.{1,${color.length / 3}}`, 'g');
    let colors = color.match(re);
    if (colors && colors[0].length === 1) {
        colors = colors.map(n => n + n);
    }
    return colors ? `rgb(${colors.map(n => parseInt(n, 16)).join(', ')})` : '';
}
exports.convertHexToRGB = convertHexToRGB;
function rgbToHex(color) {
    if (color.indexOf('#') === 0) {
        return color;
    }
    function intToHex(c) {
        const hex = c.toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
    }
    let { values } = decomposeColor(color);
    values = values.map(n => intToHex(n));
    return `#${values.join('')}`;
}
exports.rgbToHex = rgbToHex;
function decomposeColor(color) {
    if (color.charAt(0) === '#') {
        return decomposeColor(convertHexToRGB(color));
    }
    const marker = color.indexOf('(');
    const type = color.substring(0, marker);
    let values = color.substring(marker + 1, color.length - 1).split(',');
    values = values.map(value => parseFloat(value));
    return { type, values };
}
exports.decomposeColor = decomposeColor;
function recomposeColor(color) {
    const { type } = color;
    let { values } = color;
    if (type.indexOf('rgb') !== -1) {
        values = values.map((n, i) => (i < 3 ? parseInt(n, 10) : n));
    }
    if (type.indexOf('hsl') !== -1) {
        values[1] = `${values[1]}%`;
        values[2] = `${values[2]}%`;
    }
    return `${color.type}(${values.join(', ')})`;
}
exports.recomposeColor = recomposeColor;
function getContrastRatio(foreground, background) {
    const lumA = getLuminance(foreground);
    const lumB = getLuminance(background);
    return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}
exports.getContrastRatio = getContrastRatio;
function getLuminance(color) {
    const decomposedColor = decomposeColor(color);
    if (decomposedColor.type.indexOf('rgb') !== -1) {
        const rgb = decomposedColor.values.map(val => {
            val /= 255;
            return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
        });
        return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
    }
    return decomposedColor.values[2] / 100;
}
exports.getLuminance = getLuminance;
function emphasize(color, coefficient = 0.15) {
    return getLuminance(color) > 0.5 ? darken(color, coefficient) : lighten(color, coefficient);
}
exports.emphasize = emphasize;
function fade(color, value) {
    if (!color)
        return color;
    color = decomposeColor(color);
    value = clamp(value);
    if (color.type === 'rgb' || color.type === 'hsl') {
        color.type += 'a';
    }
    color.values[3] = value;
    return recomposeColor(color);
}
exports.fade = fade;
function darken(color, coefficient) {
    if (!color)
        return color;
    color = decomposeColor(color);
    coefficient = clamp(coefficient);
    if (color.type.indexOf('hsl') !== -1) {
        color.values[2] *= 1 - coefficient;
    }
    else if (color.type.indexOf('rgb') !== -1) {
        for (let i = 0; i < 3; i += 1) {
            color.values[i] *= 1 - coefficient;
        }
    }
    return recomposeColor(color);
}
exports.darken = darken;
function lighten(color, coefficient) {
    if (!color)
        return color;
    color = decomposeColor(color);
    coefficient = clamp(coefficient);
    if (color.type.indexOf('hsl') !== -1) {
        color.values[2] += (100 - color.values[2]) * coefficient;
    }
    else if (color.type.indexOf('rgb') !== -1) {
        for (let i = 0; i < 3; i += 1) {
            color.values[i] += (255 - color.values[i]) * coefficient;
        }
    }
    return recomposeColor(color);
}
exports.lighten = lighten;
