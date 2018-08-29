import { ListModel } from "@coglite/framework/common/model/ListModel";
import { ICategory } from "../ICategory";
import { CategoryServiceContext } from "../service/CategoryServiceContext";
import { ICategoryService } from "../service/ICategoryService";

class CategoryListModel extends ListModel<ICategory> {
    private _service : ICategoryService;
    get service() {
        return this._service || CategoryServiceContext.value;
    }
    set service(value) {
        this._service = value;
    }

    protected _loadImpl() {
        return this.service.getCategories();
    }
}

export { CategoryListModel };
