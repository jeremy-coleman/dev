import * as React from "react";
import { IDetailsAttributeStyles, getStyles } from "./DetailsAttribute.styles";
import { getClassNames } from "./DetailsAttribute.classNames";

interface DetailsAttributeProps {
    label: string;
    value: string;
    onRender?: (item?: any) => React.ReactNode;
    styles?: IDetailsAttributeStyles;
    className?: string;
}

class DetailsAttribute extends React.Component<DetailsAttributeProps, any> {
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={classNames.root}>
                <div className="ms-Grid ms-Grid-col ms-sm12 ms-md6">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6">
                            <span className={classNames.label}>{this.props.label}</span>
                        </div>
                        <div className="ms-Grid-col ms-sm6">
                            {
                                this.props.onRender ?
                                    this.props.onRender() :
                                    <span className={classNames.value}>{this.props.value}</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export { DetailsAttribute as default, DetailsAttribute, DetailsAttributeProps };