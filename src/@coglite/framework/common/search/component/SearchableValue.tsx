import * as React from "react";
import { ISearchField } from "../ISearchField";
import { getClassNames } from "./SearchableValue.classNames";
import { getStyles, ISearchableValueStyles } from "./SearchableValue.styles";
import { Link, css } from "office-ui-fabric-react";
import { isNotBlank } from "../../StringUtils";

interface ISearchableValueProps extends ISearchField {
    onClick?: (field : ISearchField, event?: React.MouseEvent<HTMLElement>) => void;
    title?: string;
    styles?: ISearchableValueStyles;
    className?: string;
}

class SearchableValue extends React.Component<ISearchableValueProps, any> {
    private _onClick = (e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.onClick(this.props, e);
    }
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        const childCount = React.Children.count(this.props.children);
        const title = this.props.title || this.props.onClick && this.props.searchString ? `Search for ${this.props.searchString}` : undefined;
        if(isNotBlank(this.props.searchString) || (!this.props.onClick && childCount > 0)) {
            const content = childCount > 0 ? this.props.children : this.props.searchString;
            const view = (
                <div className={css(classNames.root, { clickable: this.props.onClick ? true : false })}
                     title={title}>
                    {content}
                </div>
            );
            return this.props.onClick ? <Link onClick={this._onClick}>{view}</Link> : view;
        }
        return null; 
    }
}

export { ISearchableValueProps, SearchableValue }