import { Modal } from '@coglite/common/ux';
import { observer } from 'mobx-react';
import * as React from 'react';

import { SupplierModel } from '../../models';




interface IDashboardListClearProps {
    supplier: SupplierModel<IDashboardList>;
}

let  DashboardListClearDialog  = observer((props: IDashboardListClearProps) => {
     const _onClickCancel = () => props.supplier.clearValue();
    
     const _onClickSave = () => Promise.all([
        props.supplier.value.clear(),
        props.supplier.clearValue()
     ])

     const _onDismissed = () => props.supplier.clearValue();
    
        return (
                <Modal 
                showModal={props.supplier.value ? true : false} 
                handleClose={_onDismissed} 
                //style={{display: 'grid', margin:'auto'}}
                >
                        <span style={{margin: 'auto', padding: 25}}>
                        <div>Are you sure you want to remove all Dashboards?</div>
                        <div>Remove all Dashboards</div>
                        <div>
                            <button  onClick={_onClickCancel}>Cancel</button>
                            <button  onClick={_onClickSave}>OK</button>
                        </div>
                        </span>
                </Modal>
            )
})
    

export { IDashboardListClearProps, DashboardListClearDialog }



// @observer
// class DashboardListClearDialog1 extends React.Component<IDashboardListClearProps, any> {
//     private _onClickCancel = () => {
//         this.props.supplier.clearValue();
//     }
//     private _onClickSave = () => {
//         this.props.supplier.value.clear();
//         this.props.supplier.clearValue();
//     }
//     private _onDismissed = () => {
//         this.props.supplier.clearValue();
//     }
//     render() {
//         return (
//             <Dialog 
//                 open={this.props.supplier.value ? true : false}
//                 onClose={this._onDismissed}
//             >
//             {this.props.supplier.value &&
//             <React.Fragment>
//             <DialogContentText>{this.props.supplier.value ? `Are you sure you want to remove all Dashboards?` : ""}</DialogContentText>
//             <DialogTitle>{this.props.supplier.value ? "Remove all Dashboards" : ""}</DialogTitle>
//             <DialogActions>
//                 <button variant='contained' color='secondary' onClick={this._onClickCancel}>Cancel</button>
//                 <button variant='contained' color='primary' onClick={this._onClickSave}>OK</button>
//             </DialogActions>
//              </React.Fragment>
//             }
//             <div id='annoying-mui-props-workaround' style={{display: 'none'}}/>
//             </Dialog>
//         )
//     }
// }
