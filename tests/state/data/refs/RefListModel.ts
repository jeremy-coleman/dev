import { observable, computed } from "mobx";
import {IRefList} from "./IRefList";
import {IRefListItem} from "./IRefListItem";
import * as SortUtils from "@coglite/framework/common/SortUtils";
import {ISortProps} from "@coglite/framework/common/ISortProps";


class RefListModel implements IRefList {
    @observable items : IRefListItem[] = [];

    constructor(items : IRefListItem[]) {
        this.items = items;
    }

    getItemByKey(key: string, defaultItem?: IRefListItem) : IRefListItem {
        const item = this.items.find((item) => {
            return item.key === key;
        });
        return item || defaultItem;
    }

    @computed
    get itemsSorted(): IRefListItem[] {
        const sortProps =  {
            field: "text",
            descending: false
        } as ISortProps;
        return SortUtils.sort(this.items.slice(), sortProps);
    }
}

export { RefListModel as default, RefListModel };