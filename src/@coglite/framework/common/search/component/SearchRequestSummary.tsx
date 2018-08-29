import * as React from "react";
import { isNotBlank } from "../../StringUtils";
import { DefinitionList } from "../../component/DefinitionList";
import { SearchGroupOperator } from "../SearchGroupOperator";
import { ISearchField } from "../ISearchField";
import { ISearchRequest } from "../ISearchRequest";
import { getStyles, ISearchRequestSummaryStyles } from "./SearchRequestSummary.styles";
import { getClassNames, ISearchRequestSummaryClassNames } from "./SearchRequestSummary.classNames";

interface ISearchRequestSummaryProps {
    request: ISearchRequest;
    styles?: ISearchRequestSummaryStyles;
    className?: string;
    hideOperator?: boolean;
}

class SearchRequestSummary extends React.Component<ISearchRequestSummaryProps, any> {
    private _classNames : ISearchRequestSummaryClassNames;
    private _renderField = (field : ISearchField, index: number) => {
        return <DefinitionList className={this._classNames.value} key={`${field.name}${index}`} name={field.name}>{field.searchString}</DefinitionList>
    }
    render() {
        const { request } = this.props;
        this._classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={this._classNames.root}>
                {isNotBlank(request.searchString) ? <DefinitionList className={this._classNames.value} name="Search String">{request.searchString}</DefinitionList> : undefined}
                {!this.props.hideOperator && <DefinitionList name="Op" className={this._classNames.value}>{request.op || SearchGroupOperator.AND}</DefinitionList>}
                {request.fields ? request.fields.map((field, index) => {
                    return this._renderField(field, index);
                }) : undefined}
            </div>
        )
    }
}

export { ISearchRequestSummaryProps, SearchRequestSummary }