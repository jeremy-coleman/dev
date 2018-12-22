import { Modal } from '@coglite/common/ux';
import { observer } from 'mobx-react';
import * as React from 'react';

import { SupplierModel } from '../../models';




interface IDashboardRemoveProps {
    supplier: SupplierModel<IDashboard>;
}


let DashboardRemoveDialog = observer((props: IDashboardRemoveProps) => {
    const _onClickCancel = () => props.supplier.clearValue();
    
    const _onClickSave = () => Promise.all([
        props.supplier.value.removeFromParent(),
        props.supplier.clearValue()
     ])
    const _onDismissed = () => props.supplier.clearValue();
    
    return (
            <Modal 
            showModal={!props.supplier.value ? false : true} 
            handleClose={_onDismissed} 
            //style={{display: 'grid', margin:'auto'}}
            >
            <span style={{margin: 'auto', padding: 25}}>
            <p style={{padding: 25}}>`Are you sure you want to remove all Dashboards?`</p>
            <div>{"Remove all Dashboards"}</div>
            <div>
                <button onClick={_onClickCancel}>Cancel</button>
                <button onClick={_onClickSave}>OK</button>
            </div>
            </span>
            </Modal>
        )
})


export { IDashboardRemoveProps, DashboardRemoveDialog }

// @observer
// class DashboardRemoveDialog extends React.Component<IDashboardRemoveProps, any> {
//     private _onClickCancel = () => {
//         this.props.supplier.clearValue();
//     }
//     private _onClickSave = () => {
//         this.props.supplier.value.removeFromParent();
//         this.props.supplier.clearValue();
//     }
//     private _onDismissed = () => {
//         this.props.supplier.clearValue();
//     }
//     render() {
//         return (
//             <Dialog 
//                 open={!this.props.supplier.value ? false : true}
//                 onClose={this._onDismissed}
//             >
//             <DialogContentText>{this.props.supplier.value ? <p>`Are you sure you want to remove all Dashboards?`</p> : ""}</DialogContentText>
//             <DialogTitle>{this.props.supplier.value ? "Remove all Dashboards" : ""}</DialogTitle>
//             <DialogActions>
//                 <button variant='contained' color='secondary' onClick={this._onClickCancel}>Cancel</button>
//                 <button variant='contained' color='primary' onClick={this._onClickSave}>OK</button>
//             </DialogActions>
//             </Dialog>
//         )
//     }
// }