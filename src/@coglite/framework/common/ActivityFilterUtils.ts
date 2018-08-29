import * as SearchUtils from "./TextSearchUtils";
import * as StringUtils from "./StringUtils";
import * as DateUtils from "./DateUtils";
import * as moment from "moment";
import { IActivityFilterProps } from "./IActivityFilterProps";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";

interface IItemTransformer<T = any> {
    (item: T) : string[];
}

const textFilterItemImpl = <T = any>(item: any, text : string, transformer: IItemTransformer<T>) => {
    return SearchUtils.containsText(transformer(item), text);
};

const textFilter = <T>(items: T[], text : string, transformer: IItemTransformer<T>) => {
    return items && StringUtils.isNotBlank(text) ? items.filter(item => textFilterItemImpl(item, text, transformer)) : items;
};

const fromFilterItem = (item: any, from: moment.Moment, dateField: IColumn) => {
    return DateUtils.isMomentAfter(DateUtils.momentFromDataText(item[dateField.fieldName]), from);
};

const toFilterItem = (item: any, to: moment.Moment, dateField: IColumn) => {
    return DateUtils.isMomentBefore(DateUtils.momentFromDataText(item[dateField.fieldName]), to);
};

const rangeFilterItem = (item: any, from: moment.Moment, to: moment.Moment, dateField: IColumn) => {
    return fromFilterItem(item, from, dateField) && toFilterItem(item, to, dateField);
};

const rangeFilter = <T>(items : T[], from: moment.Moment, to: moment.Moment, dateField: IColumn) => {
    return items && (from || to) && dateField ? items.filter(item => rangeFilterItem(item, from, to, dateField)) : items;
};

const filter = <T>(items : T[], activityFilter : IActivityFilterProps, transformer: IItemTransformer, dateField?: IColumn) => {
    return activityFilter ? rangeFilter(textFilter(items, activityFilter.filterText, transformer), activityFilter.filterFromDate, activityFilter.filterToDate, dateField) : items;
};

export {
    filter,
    IItemTransformer
};