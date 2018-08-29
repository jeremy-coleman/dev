import * as React from "react";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { IContextualMenuItem, ContextualMenuItemType } from "office-ui-fabric-react/lib/ContextualMenu";
import { ISortProps } from "../ISortProps";
import { ISortModel } from "../model/ISortModel";
import * as StringUtils from "../StringUtils";
import { IKeyMapFunc } from "../IKeyMapFunc";
import { defaultKeyMap } from "../KeyMapFuncs";
import { Formats } from "../MomentDataUtils";
import { dateFromString } from "../MomentUtils";

interface ICreateMenuItemsFromColumnsOptions {
    columns: IColumn[];
    selectedField?: string;
    onClick?(ev : React.MouseEvent<HTMLElement>, item : IContextualMenuItem) : void;
    context?: any;
}

const createFieldItemsFromColumns = (opts?: ICreateMenuItemsFromColumnsOptions) : IContextualMenuItem[] => {
    const r : IContextualMenuItem[] = [];
    if(opts && opts.columns) {
        opts.columns.forEach((c) => {
            const selected = opts.selectedField === c.fieldName;
            r.push({
                key: c.key,
                fieldName: c.fieldName,
                name: c.name,
                ariaLabel: c.ariaLabel,
                canCheck: true,
                checked: selected,
                onClick: opts.onClick,
                style: selected ? { fontWeight: "bold" } : undefined,
                context: opts.context
            });
        });
    }
    return r;
};

interface ICreateSortOrderItemsOptions {
    sortDescending: boolean;
    onClick?(ev : React.MouseEvent<HTMLElement>, item : IContextualMenuItem) : void;
    context?: any;
}

const createSortOrderItems = (opts?: ICreateSortOrderItemsOptions) : IContextualMenuItem[] => {
    const r : IContextualMenuItem[] = [];
    r.push({
        key: "asc",
        name: "Ascending",
        ariaLabel: "Sort Ascending",
        sortDescending: false,
        canCheck: true,
        checked: !opts || !opts.sortDescending,
        onClick: opts ? opts.onClick : undefined,
        style: !opts || !opts.sortDescending ? { fontWeight: "bold" } : undefined,
        context: opts.context
    });
    r.push({
        key: "desc",
        name: "Descending",
        ariaLabel: "Sort Descending",
        sortDescending: true,
        canCheck: true,
        checked: opts && opts.sortDescending,
        onClick: opts ? opts.onClick : undefined,
        style: opts && opts.sortDescending ? { fontWeight: "bold" } : undefined,
        context: opts.context
    });
    return r;
}

interface ICreateSortItemsOptions {
    columns: IColumn[];
    sortField?: string;
    sortDescending?: boolean;
    onFieldClick?(ev : React.MouseEvent<HTMLElement>, item : IContextualMenuItem) : void;
    onSortOrderClick?(ev : React.MouseEvent<HTMLElement>, item : IContextualMenuItem) : void;
    context?: any;
    disabled?: boolean;
}

const createSortItems = (opts?: ICreateSortItemsOptions) : IContextualMenuItem[] => {
    const r : IContextualMenuItem[] = [];
    if(opts) {
        const fieldItems = createFieldItemsFromColumns({ columns: opts.columns, selectedField: opts.sortField, onClick: opts.onFieldClick, context: opts.context });
        if(fieldItems.length > 0) {
            const fieldSectionItem : IContextualMenuItem = {
                key: "fieldSectionItem",
                itemType: ContextualMenuItemType.Section,
                sectionProps: {
                    key: "fieldSection",
                    title: "Fields",
                    items: fieldItems
                }
            };
            r.push(fieldSectionItem);
        }
        const orderItems = createSortOrderItems({ sortDescending: opts.sortDescending, onClick: opts.onSortOrderClick, context: opts.context });
        const orderSectionItem : IContextualMenuItem = {
            key: "orderSectionItem",
            itemType: ContextualMenuItemType.Section,
            sectionProps: {
                key: "orderSection",
                title: "Order",
                topDivider: fieldItems.length > 0,
                items: orderItems
            }
        };
        r.push(orderSectionItem);
    }
    return r;
};

const createSortItem = (opts?: ICreateSortItemsOptions) : IContextualMenuItem => {
    return {
        key: "sort",
        name: "Sort",
        iconProps: { iconName: "SortLines" },
        ariaLabel: "Sort",
        subMenuProps: {
            items: createSortItems(opts)
        },
        disabled: opts.disabled
    };
};

interface ICreateSortItemFromModelOptions {
    columns: IColumn[];
    sort: ISortModel;
    disabled?: boolean;
}

const onModelSortFieldClick = (e, item) => {
    const sort : ISortModel = item.context;
    sort.setField(item.fieldName);
};

const onModelSortOrderClick = (e, item) => {
    const sort : ISortModel = item.context;
    sort.setDescending(item.sortDescending);
}

const createSortItemFromModel = (opts : ICreateSortItemFromModelOptions) : IContextualMenuItem => {
    return createSortItem({
        sortField: opts.sort.field,
        sortDescending: opts.sort.descending,
        columns: opts.columns,
        context: opts.sort,
        onFieldClick: onModelSortFieldClick,
        onSortOrderClick: onModelSortOrderClick,
        disabled: opts.disabled
    });
};

const applySort = (columns : IColumn[], sortProps?: ISortProps) : IColumn[] => {
    if(sortProps && StringUtils.isNotBlank(sortProps.field)) {
        const r = columns.map((c) => {
            return Object.assign({}, c);
        });
        if(sortProps.field) {
            const sortColumn = r.find((c) => {
                return c.fieldName === sortProps.field;
            });
            if(sortColumn) {
                sortColumn.isSorted = true;
                sortColumn.isSortedDescending = !sortProps.descending; // Reversed, since fabric's definition of 'descending' is 'arrow pointed down' !!!
            }
        }
        return r;
    }
    return columns;
};

const dateKeyMapFunc = <I = any>(dateColumns : IColumn[], format : string = Formats.date) : IKeyMapFunc<I, any> => {
    return (item : I, key : string) => {
        const value = defaultKeyMap(item, key);
        const c = dateColumns.find(c => c.fieldName === key);
        return c ? dateFromString(value as string, format) : value;
    };
};

export {
    applySort,
    createFieldItemsFromColumns,
    createSortOrderItems,
    createSortItems,
    createSortItem,
    createSortItemFromModel,
    ICreateSortItemsOptions,
    ICreateMenuItemsFromColumnsOptions,
    ICreateSortOrderItemsOptions,
    ICreateSortItemFromModelOptions,
    dateKeyMapFunc
};