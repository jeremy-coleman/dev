import { mergeStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IListingTileStyles } from "./ListingTile.styles";

interface IListingTileClassNames {
    root?: string;
    top?: string;
    banner?: string;
    content?: string;
    title?: string;
    shortDescription?: string;
    footer?: string;
}

const getClassNames = memoizeFunction((styles : IListingTileStyles, className : string, clickable : boolean) => {
    return mergeStyleSets({
        root: ["listing-tile", className, styles.root, clickable && styles.clickableRoot],
        top: ["listing-tile-top", styles.top],
        banner: ["listing-tile-banner", styles.banner],
        content: ["listing-tile-content", styles.content],
        title: ["listing-tile-title", styles.title],
        shortDescription: ["listing-tile-short-description", styles.shortDescription],
        footer: ["listing-tile-footer", styles.footer]
    });
});

export { IListingTileClassNames, getClassNames }