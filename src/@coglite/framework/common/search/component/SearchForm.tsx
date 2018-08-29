import * as React from "react";
import { ISearchFieldModel } from "../model/ISearchFieldModel";
import { observer } from "mobx-react";
import { ISearchFormStyles, getStyles } from "./SearchForm.styles";
import { getClassNames } from "./SearchForm.classNames";
import { IDropdownOption, Dropdown } from "office-ui-fabric-react/lib/Dropdown";
import { BoundDropdown } from "../../component/BoundDropdown";
import { BoundTextField } from "../../component/BoundTextField";
import { IconButton, PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { ISearchSchemaField } from "../ISearchSchemaField";
import { ISearchRequest } from "../ISearchRequest";
import { ISearchRequestProps } from "./ISearchRequestProps";
import { SearchGroupOperator } from "../SearchGroupOperator";
import { KeyCodes } from "@uifabric/utilities";
import { BoundSearchBox } from "../../component/BoundSearchBox";
import { ISearchField } from "../ISearchField";

interface ISearchFormProps extends ISearchRequestProps {
    schema?: ISearchSchemaField[];
    styles?: ISearchFormStyles;
    className?: string;
    onSubmit?: (request : ISearchRequest) => void;
    hideOperator?: boolean;
    hideTextExpand?: boolean;
    textPlaceholder?: string;
}

interface ISearchFormFieldProps extends ISearchFormProps {
    field: ISearchFieldModel;
}

class SearchFormFieldSelector extends React.Component<ISearchFormFieldProps, any> {
    render() {
        const options : IDropdownOption[] = this.props.schema.map(s => {
            return {
                key: s.key,
                text: s.name || s.key
            };
        });
        return <BoundDropdown binding={{ target: this.props.field, key: "name" }} options={options} emptyOptionText="Select a Field..." includeEmptyOption  />;
    }
}

@observer
class SearchFormFieldValueEditor extends React.Component<ISearchFormFieldProps, any> {
    render() {
        return <BoundTextField binding={{ target: this.props.field, key: "searchString" }} />;
    }
}

class SearchFormFieldRemoveAction extends React.Component<ISearchFormFieldProps, any> {
    private _onClick = () => {
        this.props.field.remove();
    }
    render() {
        return <IconButton onClick={this._onClick} iconProps={{ iconName: "Delete" }} title="Remove Field" ariaLabel="Remove Field" />
    }
}

class SearchFormField extends React.Component<ISearchFormFieldProps, any> {
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={classNames.fieldContainer}>
                <div className={classNames.fieldSelectContainer}>
                    <SearchFormFieldSelector {...this.props} />
                </div>
                <div className={classNames.fieldValueContainer}>
                    <SearchFormFieldValueEditor {...this.props} />
                </div>
                <div className={classNames.fieldRemoveContainer}>
                    <SearchFormFieldRemoveAction {...this.props} />
                </div>
            </div>
        );
    }
}

class SearchFormFieldAddAction extends React.Component<ISearchFormProps, any> {
    private _onClick = () => {
        this.props.request.addField();
    }
    render() {
        if(this.props.request.isExpanded) {
            return <PrimaryButton iconProps={{ iconName: "Add"}} onClick={this._onClick}>Add Field</PrimaryButton>;
        }
        return null;
    }
}

@observer
class SearchFormFields extends React.Component<ISearchFormProps, any> {
    render()  {
        if(this.props.schema && this.props.request.isExpanded) {
            const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
            const fieldViews = this.props.request.fields.map((field, idx) => {
                return <SearchFormField key={idx} {...this.props} field={field} />
            });
            if(fieldViews.length > 0) {
                return (
                    <div className={classNames.fieldsContainer}>
                        {fieldViews}
                    </div>
                );
            }
            return null;
        }
        return null;
    }  
}

@observer
class SearchFormSubmitButton extends React.Component<ISearchFormProps, any> {
    private _onClick = () => {
        if(this.props.request.isSpecified) {
            this.props.onSubmit(this.props.request.data);
        }
    }
    render() {
        if(this.props.onSubmit) {
            const disabled = !this.props.request.isSpecified;
            return <PrimaryButton iconProps={{ iconName: "Search"}} onClick={this._onClick} disabled={disabled}>Search</PrimaryButton>
        }
        return null;
    }
}

interface ISearchFormActionProps extends ISearchFormProps {
    hideAddFieldAction?: boolean;
}

@observer
class SearchFormActions extends React.Component<ISearchFormActionProps, any> {
    render() {
        if(this.props.request.isExpanded) {
            const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
            return (
                <div className={classNames.fieldContainer}>
                    {!this.props.hideAddFieldAction && <SearchFormFieldAddAction {...this.props} />}
                    <SearchFormSubmitButton {...this.props} />
                </div>
            );
        }
        return null;
    }
}

@observer
class SearchFormExpandButton extends React.Component<ISearchRequestProps, any> {
    private _onClick = () => {
        this.props.request.setExpanded(!this.props.request.isExpanded);
    }
    render() {
        const { request } = this.props;
        const iconTitle = request.isExpanded ? "Hide Extended Search" : "Show Extended Search";
        return (
            <IconButton onClick={this._onClick}
                        iconProps={{ iconName: request.isExpanded ? "ChevronUp" : "ChevronDown" }}
                        title={iconTitle}
                        ariaLabel={iconTitle}
                        styles={{ root: { height: "100%" }}} />
        );
    }
}

class SearchFormTextSearch extends React.Component<ISearchFormProps, any> {
    private _onSearch = () => {
        if(this.props.onSubmit && this.props.request.isSpecified) {
            this.props.onSubmit(this.props.request.data);
        }
    }
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <BoundSearchBox className={classNames.textSearch} binding={{ target: this.props.request, key: "searchString" }} placeholder={this.props.textPlaceholder || "Search"} onSearch={this._onSearch} />
        );
    }
}

class SearchFormTextSearchContainer extends React.Component<ISearchFormProps, any> {
    render() {
        const textSearch = <SearchFormTextSearch {...this.props} />;
        if(!this.props.hideTextExpand) {
            const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
            return (
                <div className={classNames.textSearchContainer}>
                    {textSearch}
                    <SearchFormExpandButton {...this.props} />
                </div>
            );
        }
        return textSearch;
    }
}

@observer
class SearchFormOperator extends React.Component<ISearchFormProps, any> {
    private _onChanged = (option : IDropdownOption) => {
        this.props.request.setOp(option.key as SearchGroupOperator);
    }
    render() {
        if(this.props.request.isExpanded && !this.props.hideOperator) {
            const op = this.props.request.op;
            const options : IDropdownOption[] = [
                {
                    key: SearchGroupOperator.AND,
                    text: "AND - results will match all of the specified terms/phrases"
                },
                {
                    key: SearchGroupOperator.OR,
                    text: "OR - results will match any of the specified terms/phrases"
                }
            ];
            const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
            return (
                <div className={classNames.inputContainer}>
                    <Dropdown options={options} selectedKey={op} onChanged={this._onChanged} label="Operator" />
                </div>
            );
        }
        return null;
    }
}

class SearchForm extends React.Component<ISearchFormProps, any> {
    private _onKeyDown = (e : React.KeyboardEvent<HTMLElement>) => {
        if(e.which === KeyCodes.enter && this.props.request.isSpecified) {
            this.props.onSubmit(this.props.request.data);
        }
    }
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={classNames.root} onKeyDown={this._onKeyDown}>
                <div className={classNames.content}>
                    <SearchFormTextSearchContainer {...this.props} />
                    <SearchFormOperator {...this.props} />
                    <SearchFormFields {...this.props} />
                    <SearchFormActions {...this.props} />
                </div>
            </div>
        );
    }
}

@observer
class StaticSearchFormFields extends React.Component<ISearchFormProps, any> {
    private _ensureFields(props : ISearchFormProps) {
        const fields : ISearchField[] = [];
        props.schema.forEach(se => {
            const field = props.request.fields.find(f => f.name === se.key);
            if(!field) {
                fields.push({ name: se.key, searchString: "" });
            } else {
                fields.push(field);
            }
        });
        props.request.setFields(fields);
    }
    componentWillMount() {
       this._ensureFields(this.props);
    }
    componentWillReceiveProps(nextProps : ISearchFormProps) {
        console.log("-- Component Will Receive Props");
        this._ensureFields(nextProps);
    }
    render() {
        if(this.props.request.isExpanded) {
            const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
            return this.props.request.fields.map(field => {
                const se = this.props.schema.find(e => e.key === field.name);
                return (
                    <div key={field.name} className={classNames.inputContainer}>
                        <BoundTextField label={se.name} binding={{ target: field, key: "searchString" }} />
                    </div>
                );
            });
        }
        return null;
    }
}

class StaticSearchForm extends React.Component<ISearchFormProps, any> {
    private _onKeyDown = (e : React.KeyboardEvent<HTMLElement>) => {
        if(e.which === KeyCodes.enter && this.props.request.isSpecified) {
            this.props.onSubmit(this.props.request.data);
        }
    }
    render() {
        if(this.props.schema) {
            const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
            return (
                <div className={classNames.root} onKeyDown={this._onKeyDown}>
                    <div className={classNames.content}>
                        <SearchFormTextSearchContainer {...this.props} />
                        <SearchFormOperator {...this.props} />
                        <StaticSearchFormFields {...this.props} />
                        <SearchFormActions {...this.props} hideAddFieldAction />
                    </div>
                </div>
            );
        }
        return null;
    }
}

export {
    ISearchFormProps,
    ISearchFormFieldProps,
    SearchFormFields,
    SearchFormField,
    SearchFormTextSearch,
    SearchFormTextSearchContainer,
    SearchFormOperator,
    SearchFormActions,
    SearchForm,
    StaticSearchForm,
    StaticSearchFormFields
}