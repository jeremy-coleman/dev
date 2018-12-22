import { observer } from 'mobx-react';
import * as React from 'react';

import { getBoundValue, getErrorMessage, setBoundValue } from '../models';



@observer
class BoundTextField extends React.Component<any, any> {
    private _onChange = (e: React.ChangeEvent<any>) => {
        setBoundValue(this.props as any, e.currentTarget.value);
        if(this.props.onChange) {
            this.props.onChange(e.currentTarget.value);
        }
    }


    render() {
        const value = getBoundValue(this.props as any);
        return (
            <input {...this.props}
                type='text'
                onChange={this._onChange}
                value={this.props.errors && this.props.errors.length ? getErrorMessage(this.props as any, this.props.errors) : (value || "")}
                style={{margin: '5px', width: '100%'}}
                />
        )
    }
}

export { BoundTextField }
