import * as React from "react";
import { observer } from "mobx-react";
import DetailsAttribute from "./DetailsAttribute";
import IDetailsAttributeConfig from "../IDetailsAttributeConfig";
import ViewPreferencesModel from "../ViewPreferencesModel";
import { IDetailsItemStyles, getStyles } from "./DetailsItem.styles";
import { getClassNames } from "./DetailsItem.classNames";

interface DetailsItemProps<T> {
    model: T;
    attrConfig: IDetailsAttributeConfig<T>[];
    viewPrefModel: ViewPreferencesModel;
    styles?: IDetailsItemStyles;
    className?: string;
}

@observer
class DetailsItem<T> extends React.Component<DetailsItemProps<T>, any> {
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        let content = this.props.attrConfig.map((field: IDetailsAttributeConfig<T>) => {
            if (this.props.viewPrefModel.isFieldVisible(field.key)) {
                if (field.onRender) {
                    return field.onRender(this.props.model);
                }
                return <DetailsAttribute key={field.key} label={field.name} value={this.props.model[field.key]}/>
            }
        });
        return (
            <div className={classNames.root}>
                {content}
            </div>
        );
    }
}

export{ DetailsItem as default, DetailsItem, DetailsItemProps };