"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ownerDocument(node) {
    return (node && node.ownerDocument) || document;
}
exports.ownerDocument = ownerDocument;
function ownerWindow(node, fallback = window) {
    const doc = ownerDocument(node);
    return doc.defaultView || doc.parentView || fallback;
}
exports.ownerWindow = ownerWindow;
