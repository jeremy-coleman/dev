import { Modal } from '@coglite/common/ux';
import { observer } from 'mobx-react';
import * as React from 'react';




interface IComponentRemoveProps {
    remove: IComponentRemove;
}

@observer
class ComponentRemoveDialog extends React.Component<IComponentRemoveProps, any> {
    private _onClickCancel = () => {
        this.props.remove.cancel();
    }
    private _onClickSave = () => {
        this.props.remove.save();
    }
    private _onDismissed = () => {
        this.props.remove.cancel();
    }
    render() {

        const c = this.props.remove.component;
        let title;
        if(c) {
            if(c.type === "stack" || c.type === "list") {
                title = "all Tabs";
            }
        }
        if(!title) {
            title = "the Tab";
        }
    return (
            <Modal 
            showModal={!this.props.remove.active? false : true} 
            handleClose={this._onDismissed} 
            //style={{display: 'grid', margin: 'auto', padding: 25}}
            >
            <h1>{`Close ${title}`}</h1>
            <div>{`Are you sure you want to close ${title}?`}</div>
            <div>
                <button onClick={this._onClickCancel}>Cancel</button>
                <button  onClick={this._onClickSave}>OK</button>
            </div>
            </Modal>
        )
    }
}

export { IComponentRemoveProps, ComponentRemoveDialog }