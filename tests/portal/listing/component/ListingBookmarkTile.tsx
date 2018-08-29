import { css } from "@uifabric/utilities/lib";
import { Icon, Image } from "office-ui-fabric-react";
import * as React from "react";
import { IListing } from "../IListing";
import { getClassNames, IListingBookmarkTileClassNames } from "./ListingBookmarkTile.classNames";
import { getStyles, IListingBookmarkTileStyles } from "./ListingBookmarkTile.styles";



interface IListingBookmarkTileProps {
    listing: IListing;
    onClick?: (listing : IListing) => void;
    onRemove?: (listing : IListing) => void;
    className?: string;
    styles?: IListingBookmarkTileStyles;
}

class ListingBookmarkTile extends React.Component<IListingBookmarkTileProps, any> {
    private _classNames : IListingBookmarkTileClassNames;
    private _onClick = () => {
        this.props.onClick(this.props.listing);
    }
    private _onClickRemove = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        this.props.onRemove(this.props.listing);
    }
    private _renderIcon() : React.ReactNode {
        const listingSmallIcon = this.props.listing.small_icon;
        let image;
        let isIcon = false;
        if(listingSmallIcon && listingSmallIcon.url) {
            image = <Image width={16} height={16} src={listingSmallIcon.url} alt={this.props.listing.title} />;
        } else {
            isIcon = true;
            image = <Icon iconName="Puzzle" className="thumnail-icon" title={this.props.listing.title} />
        }
        return (
            <div className={css(this._classNames.icon, { "is-icon": isIcon })}>
                {image}
            </div>
        );
    }
    private _renderTitle() : React.ReactNode {
        return (
            <h5 className={this._classNames.title}>
                {this.props.listing.title}
            </h5>
        );
    }
    private _renderRemoveAction() : React.ReactNode {
        if(this.props.onRemove) {
            return (
                <button className={this._classNames.removeAction} onClick={this._onClickRemove} title={`Remove Bookmark: ${this.props.listing.title}`}>
                    <Icon iconName="ChromeClose" />
                </button>
            );
        }
        return null;
    }
    private _renderHeaderActions() : React.ReactNode {
        return (
            <div className={this._classNames.headerActions}>
                {this._renderRemoveAction()}
            </div>
        );
    }
    private _renderHeader() : React.ReactNode {
        return (
            <div className={this._classNames.header}>
                {this._renderIcon()}
                {this._renderTitle()} 
                {this._renderHeaderActions()} 
            </div>
        );
    }
    private _renderBanner() : React.ReactNode {
        const listingBannerIcon = this.props.listing.banner_icon;
        let banner;
        let bannerIsIcon = false;
        if(listingBannerIcon && listingBannerIcon.url) {
            banner = <Image width={220} height={137} src={listingBannerIcon.url} alt={this.props.listing.title} />;
        } else {
            bannerIsIcon = true;
            banner = <Icon iconName="Puzzle" className="banner-icon" title={this.props.listing.title} />
        }
        return (
            <div className={css(this._classNames.banner, { "is-icon": bannerIsIcon })}>
                {banner}
            </div>
        );
    }
    render() {
        this._classNames = getClassNames(getStyles(null, this.props.styles), this.props.className, this.props.onClick ? true : false);
        return (
            <div className={this._classNames.root}
                 role={this.props.onClick ? "button" : undefined}
                 onClick={this.props.onClick ? this._onClick : undefined}
                 title={this.props.listing.description_short}>
                {this._renderHeader()}
                {this._renderBanner()}
            </div>
        );
    }
}
export { IListingBookmarkTileProps, ListingBookmarkTile };
