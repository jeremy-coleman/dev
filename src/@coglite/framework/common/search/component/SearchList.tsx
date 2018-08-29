import * as React from "react";
import { Sync } from "../../component/Sync";
import { ISearchListModel } from "../model/ISearchListModel";
import { observer } from "mobx-react";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { CommandBarButton } from "office-ui-fabric-react/lib/Button";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import { SearchListViewType } from "../model/SearchListViewType";

interface ISearchListProps {
    list: ISearchListModel<any>;
}

interface ISearchListContainerProps extends ISearchListProps {
    onRenderList?: (props : ISearchListProps) => React.ReactNode;
    onRenderDefault?: (props : ISearchListProps) => React.ReactNode;
}

class SearchListContainer extends React.Component<ISearchListContainerProps, any> {
    private _onRenderSyncDefault = () => {
        if(this.props.onRenderDefault) {
            return this.props.onRenderDefault(this.props);
        }
        return null;
    }
    private _onRenderSyncDone = () => {
        return this.props.onRenderList(this.props);
    }
    render() {
        return (
            <Sync sync={this.props.list.sync}
                    onRenderDefault={this._onRenderSyncDefault}
                    onRenderDone={this._onRenderSyncDone}
                    syncLabel="Searching..." />
        );
    }
}

@observer
class SearchListViewTypeCommandBarButton extends React.Component<ISearchListProps, any> {
    private _onClickViewItem = (e, item) => {
        this.props.list.setViewType(item.key);
    }
    render() {
        const items : IContextualMenuItem[] = [
            {
                key: SearchListViewType.LIST,
                name: "List",
                title: "View as List",
                ariaLabel: "View Search Result as List",
                iconProps: {
                    iconName: "List"
                },
                canCheck: true,
                checked: this.props.list.viewType === SearchListViewType.LIST,
                onClick: this._onClickViewItem
            },
            {
                key: SearchListViewType.DETAILS_LIST,
                name: "Table",
                title: "View as Table",
                ariaLabel: "View Search Results as Table",
                iconProps: {
                    iconName: "Table"
                },
                canCheck: true,
                checked: this.props.list.viewType === SearchListViewType.DETAILS_LIST,
                onClick: this._onClickViewItem
            }
        ];
        const currentItem = items.find(item => item.key === this.props.list.viewType);
        const title = currentItem.key === SearchListViewType.LIST ? "Viewing Search Results as List" : "Viewing Search Results as Table";
        return (
            <CommandBarButton menuProps={{ items: items }} iconProps={currentItem.iconProps} title={title} ariaLabel={title} />
        );
    }
}

const createViewTypeMenuItem = (props : ISearchListProps) : IContextualMenuItem => {
    return {
        key: "searchListViewType",
        onRender: (item) => {
            return <SearchListViewTypeCommandBarButton key={item.key} {...props} />
        }
    };
};

@observer
class SearchListRefreshCommandBarButton extends React.Component<ISearchListProps, any> {
    private _onRenderSyncing = () => {
        return <Spinner size={SpinnerSize.small} title="Refreshing..." />;
    }
    private _onClick = () => {
        this.props.list.refresh();
    }
    render() {
        const { list } = this.props;
        const syncing = list.sync.syncing;
        return <CommandBarButton iconProps={!syncing ? { iconName: "Refresh" } : undefined}
                                 onRenderIcon={syncing ? this._onRenderSyncing : undefined}
                                 onClick={this._onClick}
                                 title={syncing ? "Refreshing..." : "Refresh Search Results"} />
    }
}

const createRefreshMenuItem = (props : ISearchListProps) : IContextualMenuItem => {
    return {
        key: "searchListRefresh",
        onRender: (item) => {
            return <SearchListRefreshCommandBarButton key={item.key} {...props} />;
        }
    }
};

@observer
class SearchListSummaryCommandBarButton extends React.Component<ISearchListProps, any> {
    render() {
        const { list } = this.props;
        const { syncing, hasSynced } = list.sync;
        if(syncing || !hasSynced || list.total === 0) {
            return null;
        }
        return (
            <CommandBarButton iconProps={{ iconName: "Info" }}>
                Showing {list.itemsView.length} of {list.total}
            </CommandBarButton>
        )
    }
}

const createSummaryMenuItem = (props : ISearchListProps) : IContextualMenuItem => {
    return {
        key: "searchListSummary",
        onRender: (item) => {
            return <SearchListSummaryCommandBarButton key={item.key} {...props} />;
        }
    }
};

export {
    SearchListContainer,
    ISearchListProps,
    ISearchListContainerProps,
    createViewTypeMenuItem,
    createRefreshMenuItem,
    createSummaryMenuItem
}