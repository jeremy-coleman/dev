import { observable, computed, action, IReactionDisposer, autorun } from "mobx";
import { ISearchRequestModel } from "./ISearchRequestModel";
import { ISearchRequest } from "../ISearchRequest";
import { isNotBlank } from "../../StringUtils";
import { SearchGroupOperator } from "../SearchGroupOperator";
import { SearchFieldHostModel } from "./SearchFieldHostModel";
import { ISearchField } from "../ISearchField";

class SearchRequestModel extends SearchFieldHostModel implements ISearchRequestModel {
    @observable private _searchString : string;
    @observable protected _op : SearchGroupOperator;
    @observable private _expanded = false;

    constructor(data?: ISearchRequest) {
        super();
        this.setData(data);
    }

    @computed
    get isExpanded() {
        return this._expanded;
    }
    set isExpanded(value) {
        this.setExpanded(value);
    }
    @action
    setExpanded(expanded : boolean) {
        this._expanded = expanded;
        if(expanded && this.fieldCount === 0) {
            this.addField();
        }
    }

    @computed
    get op() {
        return this._op || SearchGroupOperator.AND;
    }
    set op(value) {
        this.setOp(value);
    }
    @action
    setOp(operator : SearchGroupOperator) {
        this._op = operator;
    }

    @computed
    get data() : ISearchRequest {
        return {
            searchString: this.isSearchingStringSpecified ? this._searchString : undefined,
            fields: this.areFieldsSpecified && this.isExpanded ? this.fieldData : undefined,
            op: this._op
        };
    }
    set data(value : ISearchRequest) {
        this.setData(value);
    }

    @action
    setData(data : ISearchRequest) {
        this.setSearchString(data ? data.searchString : undefined);
        this.setFields(data ? data.fields : undefined);
        this.setOp(data ? data.op : undefined);
    }

    @computed
    get searchString() {
        return this._searchString;
    }
    set searchString(value) {
        this.setSearchString(value);
    }
    @action
    setSearchString(search : string) : void {
        this._searchString = search;
        // NOTE: potentially search during typing
    }

    @computed
    get areFieldsSpecified() {
        return this.fields.some(f => f.isSpecified);
    }

    @computed
    get isSearchingStringSpecified() {
        return isNotBlank(this._searchString);
    }

    @computed
    get isSpecified() : boolean {
        return this.isSearchingStringSpecified || this.areFieldsSpecified;
    }

    @action
    clear() {
        this._searchString = undefined;
        this._op = undefined;
        this.clearFields();
    }

    @action
    setFields(fields : ISearchField[]) {
        super.setFields(fields);
        if(this.fieldCount === 0 && this.isExpanded) {
            this.addField();
        }
    }

    toJSON() {
        return this.data;
    }
}

export { SearchRequestModel }