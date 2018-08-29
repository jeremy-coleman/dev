import { IListModel } from "@coglite/framework/common/model/IListModel";

interface ISelectableListModel<T = any> extends IListModel<T> {
    selection: T[];
    setSelection(selection : T[]) : void;
}

export { ISelectableListModel };
