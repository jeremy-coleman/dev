import { SyncSpinner } from "@coglite/framework/common/component/SyncSpinner";
import { observer } from "mobx-react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import * as React from "react";
import { IListing } from "../IListing";
import { IListingSearchModel } from "../model/IListingSearchModel";
import { ListingList } from "./ListingList";
import { getClassNames } from "./ListingSearch.classNames";
import { getStyles, IListingSearchStyles } from "./ListingSearch.styles";
import { ListingTile } from "./ListingTile";
import { ListingViewConfig } from "./ListingViewConfig";



interface IListingSearchProps {
    search: IListingSearchModel;
    styles?: IListingSearchStyles;
    className?: string;
    onOpen?: (listing : IListing) => void;
    onSelectItem?: (listing : IListing) => void;
}

@observer
class ListingSearchInput extends React.Component<IListingSearchProps, any> {
    private _onSearchChange = (newValue : any) => {
        this.props.search.setSearch(newValue);
    } 
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={classNames.input}>
                <SearchBox value={this.props.search.search} placeholder={`Search ${ListingViewConfig.storeLabel}`} onChange={this._onSearchChange} />
            </div>
        );
    }
}
@observer
class ListingSearchResults extends React.Component<IListingSearchProps, any> {
    private _onRenderItem = (listing, idx, props) => {
        return <ListingTile key={listing.id}
                                      listing={listing}
                                      onClick={props.onSelectItem}
                                      onOpen={this.props.onOpen} />;
    }
    private _onRenderDone = () => {
        if(this.props.search.itemsView && this.props.search.itemsView.length > 0) {
            return <ListingList listings={this.props.search.itemsView} compact wrapping onSelectItem={this.props.onSelectItem} onRenderListing={this._onRenderItem} />;
        }
        return <MessageBar messageBarType={MessageBarType.info}>No matching {ListingViewConfig.labelPlural} found</MessageBar>;
    }
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={classNames.results}>
                <SyncSpinner sync={this.props.search.sync} onRenderDone={this._onRenderDone} syncLabel={this.props.search.search ? `Searching ${ListingViewConfig.labelPlural}...` : `Loading ${ListingViewConfig.labelPlural}...`} />
            </div>
        );
    }
}
class ListingSearch extends React.Component<IListingSearchProps, any> {
    componentWillMount() {
        this.props.search.load();
    }
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={classNames.root}>
                <ListingSearchInput {...this.props} />
                <ListingSearchResults {...this.props} />
            </div>
        );
    }
}
export { ListingSearch, IListingSearchProps };
