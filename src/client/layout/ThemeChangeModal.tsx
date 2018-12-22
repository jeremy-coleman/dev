import { padding } from 'csstips';
import { action, observable, runInAction } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { style } from 'typestyle';

import { ThemeState, UiState } from '../state';

import {Modal, Button} from '@coglite/common/ux'

type Props = {
  theme?: ThemeState
  ui?: UiState
};


@inject('theme', 'ui')
@observer
export class ThemeChangeModal extends React.Component<Props, any> {

userChoiceHistory = observable.array([this.props.theme.themeId])


@action
handleCancel = () => {
  runInAction(() => {
    this.props.theme.themeId = this.userChoiceHistory[0],
    this.props.ui.themeDialogToggle.toggle()
  })
}


@action
handleOk = () => {
  this.props.ui.themeDialogToggle.toggle()
  this.userChoiceHistory.splice(0, this.userChoiceHistory.length - 1)
}

@action
handleChange = (event, selectedOption) => {
    this.props.theme.themeId = selectedOption
    this.userChoiceHistory.push(event.target.value)
};
  
  render() {
    return (
      <Modal 
        showModal={this.props.ui.themeDialogToggle.open}
        handleClose={this.props.ui.themeDialogToggle.open ? this.handleCancel : void 0}
        //style={{display: 'grid', margin:'auto'}}
      >
       <span style={{margin: 'auto'}} className={style(padding(25))}>
        <h5>{"Choose Theme"}</h5>
            {Object.keys(this.props.theme.brandOptions).map(option => (
              <input checked={option === this.props.theme.themeId} value={option} key={option} type="radio"><label>{option}</label></input>
            ))}
          <button onClick={this.handleCancel}>
            {"Cancel"}
          </button>
          <button onClick={this.handleOk}>
            {"Save"}
          </button>
          </span>
      </Modal>
    )
  }
}







// @action
// handleCancel = () => {
//   runInAction(() => {
//     this.props.theme.themeId = this.userChoiceHistory[0],
//     this.props.ui.themeDialogToggle.toggle()
//   })
// }


// @action
// handleOk = () => {
//   this.props.ui.themeDialogToggle.toggle()
//   this.userChoiceHistory.splice(0, this.userChoiceHistory.length - 1)
// }

// @action
// handleChange = (event, selectedOption) => {
//     this.props.theme.themeId = selectedOption
//     this.userChoiceHistory.push(event.target.value)
//     console.log('change')
//     console.log(this.userChoiceHistory)
//   };


//let userChoiceHistory = observable.array([props.theme.themeId])
const modalState = observable.object({open: false});

let toggleModal = () => {
  modalState.open = !modalState.open
}

// let ThemeChangeModal1 = inject('theme', 'ui')(observer((props) => 
//       <Dialog 
//         open={props.ui.themeDialogToggle.open}
//         onBackdropClick={props.ui.themeDialogToggle.open ? handleCancel : void 0}
//         style={{display: 'grid', margin:'auto'}}
//       >
//        <span style={{margin: 'auto'}} className={style(padding(25))}>
//         <h5>{"Choose Theme"}</h5>
//           <RadioGroup
//             value={this.props.theme.themeId}
//             onChange={this.handleChange}
//             //onSubmit={() => {}}
//           >
//             {Object.keys(props.theme.brandOptions).map(option => (
//               <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
//             ))}
//           </RadioGroup>

//           <Button onClick={handleCancel} color="primary">
//             {"Cancel"}
//           </Button>
//           <Button onClick={handleOk} color="primary">
//             {"Save"}
//           </Button>
//           </span>
//       </Dialog>
//     )
// )
