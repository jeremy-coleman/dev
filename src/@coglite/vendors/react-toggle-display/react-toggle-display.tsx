import * as React from 'react';

export interface ToggleDisplayProps {
  tag?: string
  hide?: boolean
  show?: boolean
  if?: boolean
}



//const propsToRemove = Object.keys(ToggleDisplay.props as ToggleDisplayProps);

function isDefined(val) {
	return val != null;
}

function shouldHide(props) {
	if(isDefined(props.show)) {
		return !props.show;
	}
	else if(isDefined(props.hide)) {
		return props.hide;
	}
	return false;
}



export function ToggleDisplay(props: ToggleDisplayProps): React.ReactElement<ToggleDisplayProps> {
	const propsToRemove = Object.keys(props);
  
  function pickProps(props) {
	const newProps = Object.assign({}, props);
	
  propsToRemove.forEach(prop => {
		if(prop in newProps) {
			delete newProps[prop];
		}
	});
	return newProps;
}
  
  if(props.if === false) {
		return null;
	}

	let style: React.CSSProperties = {};
	
  if(shouldHide(props)) {
		style.display = 'none';
	}

  props.tag = 'span';
	const Tag = props.tag
  
	// prevent our props from being leaked down onto the children
	const newProps = pickProps(props);

	return (
		<Tag style={style} {...newProps} />
	);
}

