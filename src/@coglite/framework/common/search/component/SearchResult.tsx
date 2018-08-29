import * as React from "react";
import { ISearchListModel } from "../model/ISearchListModel";
import { SearchFieldHighlighting } from "./SearchHighlighting";
import { Link } from "office-ui-fabric-react/lib/Link";
import { getStyles, ISearchResultStyles } from "./SearchResult.styles";
import { getClassNames } from "./SearchResult.classNames";
import { ISearchableValueProps, SearchableValue } from "./SearchableValue";
import { ISearchField } from "../ISearchField";

interface ISearchResultValue {
    field: string;
    value: string;
}

interface ISearchResultProps {
    list: ISearchListModel<any>;
    fields: string[];
    result: any;
    index: number;
    onClickValue?: (props : ISearchField) => void;
    styles?: ISearchResultStyles;
    className?: string;
    title?: string;
}

interface ISearchResultValueProps extends ISearchResultProps, ISearchResultValue {}

interface ISearchResultHighlightProps extends ISearchResultValueProps {
    highlightKey?: string;
}

class SearchResultHighlight extends React.Component<ISearchResultHighlightProps, any> {
    render() {
        const { list, result, field, value } = this.props;
        let highlightKey = this.props.highlightKey || "DOC_ID";
        const highlightId = result[highlightKey];
        const highlight = list.highlighting ? list.highlighting[highlightId] : undefined;
        if(highlight) {
            return <SearchFieldHighlighting highlighting={highlight} field={field} value={value} />;
        }
        return value;
    }
}

class SearchResultValue extends React.Component<ISearchResultValueProps, any> {
    render() {
        return (
            <SearchableValue name={this.props.field} title={this.props.title} searchString={this.props.value} onClick={this.props.onClickValue}>
                <SearchResultHighlight {...this.props}/>
            </SearchableValue>
        );
    }
}

class SearchResultValues extends React.Component<ISearchResultProps, any> {
    render() {
        const valueRendered = {};
        const valueViews = [];
        this.props.fields.forEach(field => {
            const fieldValues = this.props.result[field];
            if(fieldValues) {
                if(fieldValues.forEach) {
                    fieldValues.forEach((fieldValue, idx) => {
                        const value = fieldValue.toUpperCase();
                        if(!valueRendered[value]) {
                            valueViews.push(<SearchResultValue key={`${field}${idx}`} {...this.props} field={field} value={fieldValue} />);
                            valueRendered[value] = true;
                        }
                    });
                } else {
                    const value = fieldValues.toUpperCase();
                    if(!valueRendered[value]) {
                        valueViews.push(<SearchResultValue key={`${field}`} {...this.props} field={field} value={fieldValues} />);
                        valueRendered[value] = true;
                    }
                }
            }
        });
        if(valueViews.length > 0) {
            const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
            return (
                <div className={classNames.root}>
                    {valueViews}
                </div>
            );
        }
        return null;
    }
}

export {
    ISearchResultValue,
    ISearchResultValueProps,
    ISearchResultHighlightProps,
    ISearchResultProps,
    SearchResultValue,
    SearchResultValues
}