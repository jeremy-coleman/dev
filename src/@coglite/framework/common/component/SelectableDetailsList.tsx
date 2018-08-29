import * as React from "react";
import { observer } from "mobx-react";
import { ISelectableListModel } from "../model/ISelectableListModel";
import {
    IColumn,
    SelectionMode,
    DetailsList,
    Selection,
    DetailsListLayoutMode,
    ConstrainMode,
    CheckboxVisibility,
    IDetailsRowProps,
    DetailsRow
} from "office-ui-fabric-react/lib/DetailsList";
import { IListProps } from "office-ui-fabric-react";
import { DetailsRowFields, IDetailsRowFieldsProps } from "office-ui-fabric-react/lib/components/DetailsList/DetailsRowFields";
import { ISelectableDetailsListStyles, getStyles } from "./SelectableDetailsList.styles";
import { getClassNames } from "./SelectableDetailsList.classNames";

interface ISelectableDetailsListProps {
    list: ISelectableListModel<any>;
    compact?: boolean;
    columns?: IColumn[];
    selectionMode?: SelectionMode;
    onItemInvoked?: (item : any, index?: number, ev?: Event) => void;
    onColumnHeaderClick?: (e : React.MouseEvent<HTMLElement>, column : IColumn) => void;
    layoutMode?: DetailsListLayoutMode;
    constrainMode?: ConstrainMode;
    checkboxVisibility?: CheckboxVisibility;
    onShouldVirtualize?: (props : IListProps) => boolean;
    skipViewportMeasures?: boolean;
    fieldRowSelectionDisabled?: boolean;
    styles?: ISelectableDetailsListStyles;
    className?: string;
}

class SelectionDisabledRowFields extends React.Component<IDetailsRowFieldsProps, any> {
    render() {
        return (
            <div data-selection-disabled>
                <DetailsRowFields {...this.props} />
            </div>
        );
    }
}

export { SelectionDisabledRowFields }

interface IDetailsRowWrapperProps {
    onItemInvoked?: (item : any, index?: number, event?: any) => void;
    rowProps?: IDetailsRowProps;
}

@observer
class DetailsRowWrapper extends React.Component<IDetailsRowWrapperProps, any> {
    private _onDoubleClick = (e : React.MouseEvent<HTMLDivElement>) => {
        this.props.onItemInvoked(this.props.rowProps.item, this.props.rowProps.itemIndex, e);
    }
    render() {
        const row = <DetailsRow {...this.props.rowProps} rowFieldsAs={SelectionDisabledRowFields} />;
        return (
            <div onDoubleClick={this.props.onItemInvoked ? this._onDoubleClick : undefined}>
                {row}
            </div>
        );
    }
}

@observer
class SelectableDetailsList extends React.Component<ISelectableDetailsListProps, any> {
    private _selection : Selection;
    private _suppressModelUpdate : boolean = false;
    constructor(props : ISelectableDetailsListProps) {
        super(props);
        this._selection = new Selection({ onSelectionChanged: this._updateModelFromSelection });
    }
    private _updateModelFromSelection = () => {
        if(!this._suppressModelUpdate) {
            this.props.list.selection.setSelectedItems(this._selection.getSelection());
        }
    }
    private _updateSelectionFromModel = () => {
        const s = this._selection;
        s.setChangeEvents(false, true);
        s.setItems(this.props.list.itemsView.slice(0), true);
        const selectedIndexes = this.props.list.selectedIndexes;
        selectedIndexes.forEach(si => {
            s.setIndexSelected(si, true, false);
        });
        s.setChangeEvents(true, false);
    }

    componentDidMount() {
        this._updateSelectionFromModel();
    }

    componentWillUpdate() {
        this._suppressModelUpdate = true;
    }

    private _onRenderRow = (rowProps : IDetailsRowProps) => {
        if(this.props.fieldRowSelectionDisabled) {
            return <DetailsRowWrapper rowProps={rowProps} onItemInvoked={this.props.onItemInvoked} />;
        }
        return <DetailsRow {...rowProps} />;
    }

    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        const itemsView = this.props.list.itemsView.slice(0);
        return (
            <DetailsList
                className={classNames.root}
                {...this.props}
                items={itemsView}
                selection={this._selection}
                onRenderRow={this._onRenderRow} />
        );
    }

    componentDidUpdate() {
        this._updateSelectionFromModel();
        this._suppressModelUpdate = false;
    }
}

export { ISelectableDetailsListProps, SelectableDetailsList }