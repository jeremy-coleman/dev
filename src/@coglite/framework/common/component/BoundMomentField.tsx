import * as React from "react";
import { observer } from "mobx-react";
import { MomentField, IMomentFieldProps } from "./MomentField";
import * as moment from "moment";
import { IBoundProps } from "./IBoundProps";
import { setBoundValue, getBoundValue } from "./BoundHelper";

interface IBoundMomentFieldProps extends IMomentFieldProps, IBoundProps<any, moment.Moment> {}

@observer
class BoundMomentField extends React.Component<IBoundMomentFieldProps, any> {
    private _onChanged = (value : moment.Moment) => {
        setBoundValue(this.props, value);
        if(this.props.onChange) {
            this.props.onChange(value);
        }
    }
    render() {
        const value = getBoundValue(this.props);
        return <MomentField {...this.props} onChange={this._onChanged} value={value} />
    }
}

export { IBoundMomentFieldProps, BoundMomentField }