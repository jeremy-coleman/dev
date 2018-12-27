//https://github.com/wpmoon/react-boo

import * as React from 'react';
import { MDFontIconOnly } from './MuiFontIcon';
import { observer } from 'mobx-react';


type ModalProps = {
  showModal?: boolean
  showCloseButton?: boolean
  closeOnBackgroundClick?: boolean
  handleClose?: (...args) => void,
  dialogBoxStyle?: any,
  backgroundStyle?: any,
  moveCloseButtonToRight?: boolean
  children?: any,
  style?: any,
  className?: any
}

let closeButtonStyle: any = {
      paddingBottom: '8px',
      float: 'right',
      top: 0,
      right: 0,
      cursor: 'pointer',
      verticalAlign: 'top',
}

 let defaultBackgroundStyle = {
      position: 'fixed',
      top: '0',
      left: '0',
      width:'100%',
      height: '100%',
      background: `rgba(0, 0, 0, 0.6)`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 4
    }

let defaultDialogBoxStyle = {
      maxWidth: '70%',
      borderRadius: '5px',
      padding: '20px',
      background: 'white',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 5
}




let stopEventPropagation = (event) => event.stopPropagation();

let Modal = observer((props: ModalProps) =>
<React.Fragment>
    {props.showModal &&
      <div style={props.backgroundStyle || defaultBackgroundStyle} onClick={props.handleClose}>
        <div style={props.dialogBoxStyle || defaultDialogBoxStyle} onClick={stopEventPropagation}>
        {props.showCloseButton ? (<div onClick={props.handleClose} style={closeButtonStyle}>X</div>) : null}
          
          <div>{props.children}</div>
        </div>
      </div>
    }
</React.Fragment>
)


export {Modal}
export default Modal;

