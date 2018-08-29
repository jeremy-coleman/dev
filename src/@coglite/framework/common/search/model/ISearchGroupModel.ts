import { ISearchGroup } from "../ISearchGroup";
import { ISearchField } from "../ISearchField";
import { ISearchFieldModel } from "./ISearchFieldModel";

interface ISearchGroupModel extends ISearchGroup {
    parent : ISearchGroup;
    groups : ISearchGroupModel[];
    groupData : ISearchGroup[];
    fields : ISearchFieldModel[];
    fieldData : ISearchField[];
    searchString : string;
    data : ISearchGroup;
    isSpecified : boolean;
    setSearchString(searchString : string) : void;
    setData(data : ISearchGroup) : void;
    setOp(op : string) : void;
    addField(field?: ISearchField) : ISearchFieldModel;
    removeField(field : ISearchFieldModel) : void;
    setFields(fields : ISearchField[]) : void;
    clearFields() : void;
    addGroup(group?: ISearchGroup) : ISearchGroupModel;
    removeGroup(group : ISearchGroupModel) : void;
    setGroups(groups : ISearchGroup[]) : void;
    clearGroups() : void;
    clear() : void;
    remove() : void;
}

export { ISearchGroupModel }