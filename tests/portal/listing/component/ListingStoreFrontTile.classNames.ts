import { mergeStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IListingStoreFrontTileStyles } from "./ListingStoreFrontTile.styles";

interface IListingStoreFrontTileClassNames {
    root?: string;
    top?: string;
    banner?: string;
    content?: string;
    title?: string;
    shortDescription?: string;
    footer?: string;
}

const getClassNames = memoizeFunction((styles : IListingStoreFrontTileStyles, className : string, clickable : boolean) => {
    return mergeStyleSets({
        root: ["listing-store-front-tile", className, styles.root, clickable && styles.clickableRoot],
        top: ["listing-store-front-tile-top", styles.top],
        banner: ["listing-store-front-tile-banner", styles.banner],
        content: ["listing-store-front-tile-content", styles.content],
        title: ["listing-store-front-tile-title", styles.title],
        shortDescription: ["listing-store-front-tile-short-description", styles.shortDescription],
        footer: ["listing-store-front-tile-footer", styles.footer]
    });
});

export { IListingStoreFrontTileClassNames, getClassNames };
