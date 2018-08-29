import { sort } from "@coglite/framework/common/SortUtils";
import { autorun, IReactionDisposer } from "mobx";
import { observer } from "mobx-react";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { DetailsList, DetailsRow, DetailsRowCheck, IColumn, IDetailsRowCheckProps, IDetailsRowProps, Selection } from "office-ui-fabric-react/lib/DetailsList";
import * as React from "react";
import { ISelectableListModel } from "./model/ISelectableListModel";
import { SelectableListModel } from "./model/SelectableListModel";

interface ISelectableDetailsListProps {
    list: ISelectableListModel;
    columns: IColumn[];
}

@observer
class SelectableDetailsList extends React.Component<ISelectableDetailsListProps, any> {
    private _selection : Selection
    private _selectionUpdateDisposer : IReactionDisposer;
    private _suppressModelUpdate : boolean = false;
    private _suppressSelectionUpdate : boolean = false;
    constructor(props : ISelectableDetailsListProps) {
        super(props);
        this._selection = new Selection({ onSelectionChanged: this._updateModelFromSelection });
    }
    componentWillReceiveProps(nextProps : ISelectableDetailsListProps) {
        if(this._selectionUpdateDisposer) {
            this._selectionUpdateDisposer();
        }
        this._selectionUpdateDisposer = autorun(this._updateSelectionFromModel);
    }
    componentWillMount() {
        this._selectionUpdateDisposer = autorun(this._updateSelectionFromModel);
    }
    componentWillUnmount() {
        if(this._selectionUpdateDisposer) {
            this._selectionUpdateDisposer();
        }
    }
    private _updateModelFromSelection = () => {
        if(!this._suppressModelUpdate) {
            this._suppressSelectionUpdate = true;
            try {
                this.props.list.setSelection(this._selection.getSelection());
            } finally {
                this._suppressSelectionUpdate = false;
            }
        }
    }
    private _updateSelectionFromModel = () => {
        if(!this._suppressSelectionUpdate) {
            this._suppressModelUpdate = true;
            try {
                this._selection.setChangeEvents(false, true);
                this._selection.setItems(this.props.list.itemsView, true);
                this.props.list.selection.forEach(s => {
                    this._selection.setIndexSelected(this.props.list.itemsView.indexOf(s), true, false);
                });
                this._selection.setChangeEvents(true, false);
            } finally {
                this._suppressModelUpdate = false;
            }
        }
    }
    componentWillReact() {
        this._suppressModelUpdate = true;
    }
    private _onRenderRowCheck = (props : IDetailsRowCheckProps) => {
        return <DetailsRowCheck {...props} />
    }
    private _onRenderRow = (props : IDetailsRowProps) => {
        return <DetailsRow {...props} onRenderCheck={this._onRenderRowCheck} />
    }
    render() {
        return (
            <DetailsList items={this.props.list.itemsView}
                         columns={this.props.columns}
                         selection={this._selection}
                         onRenderRow={this._onRenderRow} />
        );
    }
    componentDidUpdate() {
        this._updateSelectionFromModel();
        this._suppressModelUpdate = false;
    }
}

class SampleDetailsList extends React.Component<any, any> {
    private _list : ISelectableListModel;
    private _sortDescending : boolean = false;
    constructor(props) {
        super(props);
        this._list = new SelectableListModel();
        this._list.setItems([
            {
                firstName: "Some",
                lastName: "Ghit"
            },
            {
                firstName: "Injured",
                lastName: "Pride"
            },
            {
                firstName: "Lost",
                lastName: "Lolly"
            }
        ]);
    }
    private _onJumble = () => {
        let items = this._list.itemsView;
        items = sort(items, { field: "firstName", descending: this._sortDescending });
        this._list.setItems(items);
        this._sortDescending = !this._sortDescending;
    }
    render() {
        const columns : IColumn[] = [
            {
                key: "firstName",
                name: "First Name",
                fieldName: "firstName",
                isResizable: true,
                minWidth: 100
            },
            {
                key: "lastName",
                name: "Last Name",
                fieldName: "lastName",
                isResizable: true,
                minWidth: 100
            }
        ];


        return (
            <div>
                <SelectableDetailsList list={this._list} columns={columns} />
                <DefaultButton onClick={this._onJumble}>Jumble</DefaultButton>
            </div>
        );
    }
}

export { SampleDetailsList, SampleDetailsList as default, SelectableDetailsList, ISelectableDetailsListProps };
