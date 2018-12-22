import * as React from 'react';
import {css} from './css';

export function cloneElementWithClassName(child, className) {
  return React.cloneElement(child, {
    className: css(child.props.className, className)
  });
}

export function cloneChildrenWithClassName(children, className) {
  return React.Children.map(children, child => {
    return React.isValidElement(child) && cloneElementWithClassName(child, className);
  });
}

export function isMuiElement(element, muiNames) {
  return React.isValidElement(element as any) && muiNames.indexOf(element.type.muiName) !== -1;
}


export let setRef = (ref, value) => void typeof ref === 'function' ? ref(value) : ref.current = value;
