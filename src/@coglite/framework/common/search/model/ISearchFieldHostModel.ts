import { ISearchFieldModel } from "./ISearchFieldModel";
import { ISearchField } from "../ISearchField";

interface ISearchFieldHostModel {
    fields : ISearchFieldModel[];
    fieldData : ISearchField[];
    fieldCount : number;
    fieldSearchString : string;
    areFieldsSpecified : boolean;
    addField(field?: ISearchField) : ISearchFieldModel;
    removeField(field : ISearchFieldModel) : void;
    setFields(fields : ISearchField[]) : void;
    clearFields() : void;
}

export { ISearchFieldHostModel }