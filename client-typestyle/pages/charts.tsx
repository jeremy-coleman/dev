import * as React from 'react'
import {observer} from 'mobx-react'
import {Modal} from '@coglite/common/ux'
import { observable } from 'mobx';


 let backgroundStyle: React.CSSProperties ={
    position: 'fixed',
    top: '0',
    left: '0',
    width:'100%',
    height: '100%',
    background: `rgba(0, 0, 0, 0.6)`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  // Object: adds or overrides the default stylings for the modal window.
 let dialogBoxStyle: React.CSSProperties = {
    maxWidth: '70%',
    borderRadius: '5px',
    padding: '20px',
    background: 'white',
    display: 'flex',
    flexDirection: 'column'
  };

const modalState = observable.object({open: false});

let toggleModal = () => {
  modalState.open = !modalState.open
}

let safeClose = () => modalState.open ? toggleModal() : void 0;

export let ChartsPage = observer((props) =>
<>
<div>Charts</div>
<button onClick={toggleModal}>open the modal</button>
<Modal
  showModal={modalState.open}
  showCloseButton={true}
  closeOnBackgroundClick={true}
  moveCloseButtonToRight={true}
  handleClose={toggleModal}
  backgroundStyle={backgroundStyle}
  dialogBoxStyle={dialogBoxStyle}
>
<div>hiiiiiii</div>
</Modal>
</>
)




//   // Boolean!: determines if modal should be displayed or not.
//   showModal={modalState.open}

//   // Boolean: shows the built-in close button at the top of the modal window.
//   showCloseButton={true}

//   // Boolean: closes the modal window when the background is clicked.
//   closeOnBackgroundClick={true}

//   // Boolean: moves the built-in close button to the right side of the modal window
//   moveCloseButtonToRight={false}

//   // Function: toggles the value of showModal. Required if setting closeOnBackgroundClick and/or showCloseButton to true.
//   handleClose={toggleModal}

//   // Object: adds or overrides the default stylings for background.
//   backgroundStyle={backgroundStyle}


//   // Object: adds or overrides the default stylings for the modal window.
//   defaultDialogBoxStyle={defaultDialogBoxStyle}