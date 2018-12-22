"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATA_PORTAL_ATTRIBUTE = 'data-portal-element';
function setVirtualParent(child, parent) {
    let virtualChild = child;
    let virtualParent = parent;
    if (!virtualChild._virtual) {
        virtualChild._virtual = {
            children: []
        };
    }
    let oldParent = virtualChild._virtual.parent;
    if (oldParent && oldParent !== parent) {
        let index = oldParent._virtual.children.indexOf(virtualChild);
        if (index > -1) {
            oldParent._virtual.children.splice(index, 1);
        }
    }
    virtualChild._virtual.parent = virtualParent || undefined;
    if (virtualParent) {
        if (!virtualParent._virtual) {
            virtualParent._virtual = {
                children: []
            };
        }
        virtualParent._virtual.children.push(virtualChild);
    }
}
exports.setVirtualParent = setVirtualParent;
function getVirtualParent(child) {
    let parent;
    if (child && isVirtualElement(child)) {
        parent = child._virtual.parent;
    }
    return parent;
}
exports.getVirtualParent = getVirtualParent;
function getParent(child, allowVirtualParents = true) {
    return (child &&
        ((allowVirtualParents && getVirtualParent(child)) || (child.parentNode && child.parentNode)));
}
exports.getParent = getParent;
function getChildren(parent, allowVirtualChildren = true) {
    const children = [];
    if (parent) {
        for (let i = 0; i < parent.children.length; i++) {
            children.push(parent.children.item(i));
        }
        if (allowVirtualChildren && isVirtualElement(parent)) {
            children.push(...parent._virtual.children);
        }
    }
    return children;
}
exports.getChildren = getChildren;
function elementContains(parent, child, allowVirtualParents = true) {
    let isContained = false;
    if (parent && child) {
        if (allowVirtualParents) {
            isContained = false;
            while (child) {
                let nextParent = getParent(child);
                if (nextParent === parent) {
                    isContained = true;
                    break;
                }
                child = nextParent;
            }
        }
        else if (parent.contains) {
            isContained = parent.contains(child);
        }
    }
    return isContained;
}
exports.elementContains = elementContains;
let _isSSR = false;
function setSSR(isEnabled) {
    _isSSR = isEnabled;
}
exports.setSSR = setSSR;
function getWindow(rootElement) {
    if (_isSSR || typeof window === 'undefined') {
        return undefined;
    }
    else {
        return rootElement && rootElement.ownerDocument && rootElement.ownerDocument.defaultView
            ? rootElement.ownerDocument.defaultView
            : window;
    }
}
exports.getWindow = getWindow;
function getDocument(rootElement) {
    if (_isSSR || typeof document === 'undefined') {
        return undefined;
    }
    else {
        return rootElement && rootElement.ownerDocument ? rootElement.ownerDocument : document;
    }
}
exports.getDocument = getDocument;
function getRect(element) {
    let rect;
    if (element) {
        if (element === window) {
            rect = {
                left: 0,
                top: 0,
                width: window.innerWidth,
                height: window.innerHeight,
                right: window.innerWidth,
                bottom: window.innerHeight
            };
        }
        else if (element.getBoundingClientRect) {
            rect = element.getBoundingClientRect();
        }
    }
    return rect;
}
exports.getRect = getRect;
function setPortalAttribute(element) {
    element.setAttribute(exports.DATA_PORTAL_ATTRIBUTE, 'true');
}
exports.setPortalAttribute = setPortalAttribute;
function portalContainsElement(target, parent) {
    const elementMatch = findElementRecursive(target, (testElement) => parent === testElement || testElement.hasAttribute(exports.DATA_PORTAL_ATTRIBUTE));
    return elementMatch !== null && elementMatch.hasAttribute(exports.DATA_PORTAL_ATTRIBUTE);
}
exports.portalContainsElement = portalContainsElement;
function findElementRecursive(element, matchFunction) {
    if (!element || element === document.body) {
        return null;
    }
    return matchFunction(element) ? element : findElementRecursive(getParent(element), matchFunction);
}
exports.findElementRecursive = findElementRecursive;
function elementContainsAttribute(element, attribute) {
    let elementMatch = findElementRecursive(element, (testElement) => testElement.hasAttribute(attribute));
    return elementMatch && elementMatch.getAttribute(attribute);
}
exports.elementContainsAttribute = elementContainsAttribute;
function isVirtualElement(element) {
    return element && !!element._virtual;
}
