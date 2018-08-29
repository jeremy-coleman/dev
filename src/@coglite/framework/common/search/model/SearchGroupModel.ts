import { observable, action, computed } from "mobx";
import { ISearchFieldModel } from "./ISearchFieldModel";
import { ISearchField } from "../ISearchField";
import { SearchFieldModel } from "./SearchFieldModel";
import { ISearchGroupModel } from "./ISearchGroupModel";
import { ISearchGroup } from "../ISearchGroup";
import { SearchGroupOperator } from "../SearchGroupOperator";
import { SearchFieldHostModel } from "./SearchFieldHostModel";

class SearchGroupModel extends SearchFieldHostModel implements ISearchGroupModel {
    @observable protected _op : string;
    @observable fields : ISearchFieldModel[] = [];
    @observable groups : ISearchGroupModel[] = [];
    @observable.ref parent : ISearchGroupModel;

    constructor(data?: ISearchGroup) {
        super();
        this.setData(data);
    }

    @computed
    get op() {
        return this._op || SearchGroupOperator.AND;
    }
    set op(value) {
        this.setOp(value);
    }
    @action
    setOp(op : string) {
        this._op = op;
    }

    @action
    addField(field?: ISearchField) : ISearchFieldModel {
        const m = new SearchFieldModel(field);
        m.parent = this;
        this.fields.push(m);
        return m;
    }

    @action
    removeField(field : ISearchFieldModel) {
        const idx = this.fields.indexOf(field);
        if(idx >= 0) {
            this.fields.splice(idx, 1);
        }
    }

    @action
    setFields(fields : ISearchField[]) {
        this.clearFields();
        if(fields) {
            fields.forEach(field => {
                this.addField(field);
            });
        }
    }

    @action
    clearFields() : void {
        this.fields = [];
    }

    @action
    addGroup(group?: ISearchGroup) : ISearchGroupModel {
        const m = new SearchGroupModel(group);
        m.parent = this;
        this.groups.push(m);
        return m;
        
    }

    @action
    removeGroup(group : ISearchGroupModel) {
        const idx = this.groups.indexOf(group);
        if(idx >= 0) {
            this.groups.splice(idx, 1);
        }
    }

    @action
    remove() {
        if(this.parent) {
            this.parent.removeGroup(this);
            this.parent = undefined;
        }
    }

    @action
    setGroups(groups : ISearchGroup[]) {
        this.clearGroups();
        if(groups) {
            groups.forEach(g => {
                this.addGroup(g);
            });
        }
    }

    @action
    clearGroups() {
        this.groups = [];
    }

    @computed
    get fieldData() : ISearchField[] {
        const fieldData : ISearchField[] = [];
        this.fields.forEach(f => {
            if(f.isSpecified) {
                fieldData.push(f.data);
            }
        });
        return fieldData;
    }

    @computed
    get groupData() : ISearchGroup[] {
        const groupData : ISearchGroup[] = [];
        this.groups.forEach(g => {
            if(g.isSpecified) {
                groupData.push(g.data);
            }
        });
        return groupData;
    }

    @action
    clear() {
        this.clearFields();
        this.clearGroups();
        this._op = undefined;
    }

    @computed
    get isSpecified() {
        return this.fields.some(f => f.isSpecified) || this.groups.some(g => g.isSpecified);
    }

    @computed
    get data() : ISearchGroup {
        const fieldData = this.fieldData;
        const groupData = this.groupData;
        return {
            op: this._op,
            fields: fieldData && fieldData.length > 0 ? fieldData : undefined,
            groups: groupData && groupData.length > 0 ? groupData : undefined
        };
    }
    set data(value) {
        this.setData(value);
    }

    @action
    setData(data : ISearchGroup) {
        this.setOp(data ? data.op : undefined);
        this.setFields(data ? data.fields : undefined);
        this.setGroups(data ? data.groups : undefined);
    }

    @computed
    get searchString() : string {
        // only supporting fields at present
        const els : string[] = [];
        this.fields.forEach(f => {
            if(f.isSpecified) {
                els.push(`${f.name}:${f.searchString}`);
            }
        });
        return els.join(" ");
    }
    set searchString(value) {
        this.setSearchString(value);
    }
    @action
    setSearchString(searchString : string) {
        // TODO
    }
}

export { SearchGroupModel }