import { ListModel } from "@coglite/framework/common/model/ListModel";
import { action, observable } from "mobx";
import { ISelectableListModel } from "./ISelectableListModel";

class SelectableListModel<T = any> extends ListModel<T> implements ISelectableListModel<T> {
    @observable selection : T[] = [];

    @action
    setSelection(selection : T[]) {
        this.selection = [];
        if(selection) {
            selection.forEach(s => this.selection.push(s));
        }
    }
}

export { SelectableListModel };
