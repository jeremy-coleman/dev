import * as React from 'react'
import { observer } from "mobx-react";
import {stylesheet} from 'typestyle'

export const styles = stylesheet({
  /* Styles applied to the root element. */
  root: {
    height: '100%',
    display: 'flex',
    flex: '0 0 auto',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    // Remove grey highlight
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent', // Reset default value
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 'none',
    border: 0,
    //border: "5px solid orange",
    margin: 0,
    borderRadius: 0,
    padding: 0,
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    appearance: 'none',
    '-moz-appearance': 'none', // Reset
    '-webkit-appearance': 'none', // Reset
    textDecoration: 'none',
    // So we take precedent over the style of a native <a /> element.
    color: 'inherit',
    $nest:{
    '&::-moz-focus-inner': {
      borderStyle: 'none', // Remove Firefox dotted outline.
    },
    '&.disabled': {
      pointerEvents: 'none', // Disable link interactions
      cursor: 'default',
    }
    }
  },
  /* Styles applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Styles applied to the root element if keyboard focused. */
  focusVisible: {},
})



///import Button from '@material-ui/core/Button';


const styledBy = (property, mapping) => props => mapping[props[property]];


let GRADIENTS = {
    red: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      
    },
    blue: {
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
}
}

const myButtonStyle = stylesheet({
  root: {
      //@ts-ignore
    background: GRADIENTS.blue.background,
    border: 0,
    borderRadius: 3,
    boxShadow: GRADIENTS.blue.boxShadow,
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

let MyButton = ({ color, ...props }) => <button className={myButtonStyle.root} {...props}>{props.children}</button>

export function AdpatingRenderProps() {
  return (
    <div>
      <MyButton color="red">Red</MyButton>
      <br />
      <br />
      <MyButton color="blue">Blue</MyButton>
    </div>
  );
}




export let Button = observer((props) => 
        <button onClick={props.onClick} className={styles.root}>
            {props.children}
        </button>
)

