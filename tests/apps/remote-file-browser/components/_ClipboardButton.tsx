import * as React from 'react';
import * as PropTypes from 'prop-types';

class ClipboardButton extends React.Component<any, any> {
  static propTypes = {
    options: function(props, propName, componentName) {
      const options = props[propName];
      if (options && typeof options !== 'object' || Array.isArray(options)) {
        return new Error(`Invalid props '${propName}' supplied to '${componentName}'. ` +
        `'${propName}' is not an object.`);
      }

      if (props['option-text'] !== undefined) {
        const optionText = props['option-text'];
        if (typeof optionText !== 'function') {
          return new Error(`Invalid props 'option-text' supplied to '${componentName}'. ` +
          `'option-text' is not a function.`);
        }
      }
    },
    type: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    component: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
    ]),
  }

  static defaultProps = {
    onClick: function() {},
  }
  
  clipboard: any;
  element: any;


  propsWith(regexp, remove=false) {
    const object = {};

    Object.keys(this.props).forEach(function(key) {
      if (key.search(regexp) !== -1) {
        const objectKey = remove ? key.replace(regexp, '') : key;
        object[objectKey] = this.props[key];
      }
    }, this);

    return object;
  }

  componentWillUnmount() {
    this.clipboard && this.clipboard.destroy();
  }

  componentDidMount() {
    // Support old API by trying to assign this.props.options first;
    const options = this.props.options || this.propsWith(/^option-/, true);
    const element = this.element;
    const Clipboard = require('clipboard');
    this.clipboard = new Clipboard(element, options);

    const callbacks = this.propsWith(/^on/, true);
    Object.keys(callbacks).forEach(function(callback) {
      this.clipboard.on(callback.toLowerCase(), this.props['on' + callback]);
    }, this);
  }

  render() {
    const attributes = {
      type: this.getType(),
      className: this.props.className || '',
      style: this.props.style || {},
      ref: element => { this.element = element; },
      onClick: this.props.onClick,
      ...this.propsWith(/^data-/),
      ...this.propsWith(/^button-/, true),
    };

    return React.createElement(
      this.getComponent(),
      attributes,
      this.props.children
    );
  }

  getType() {
    if (this.getComponent() === 'button' || this.getComponent() === 'input') {
      return this.props.type || 'button';
    }
    else {
      return undefined;
    }
  }

  getComponent() {
    return this.props.component || 'button';
  }
}

export {ClipboardButton as default, ClipboardButton};