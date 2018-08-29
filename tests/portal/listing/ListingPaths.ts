


/**
 * NOTE: this exists so we can override paths used at the application level 'easily'
 */
interface IListingPaths {
    store?: () => string;
    allListings?: () => string;
    add?: () => string;
    details?: (listingId : string | number) => string;
    edit?: (listingId : string | number) => string;
    launch?: (listingId : string | number) => string;
}

const ListingPaths : IListingPaths = {
    store() {
        return "/portal/store";
    },
    allListings() {
        return "/portal/listings";
    },
    add() {
        return "/portal/listings/add";
    },
    details(listingId) {
        return `/portal/listings/${encodeURIComponent(String(listingId))}`;
    },
    edit(listingId) {
        return `/portal/listings/${encodeURIComponent(String(listingId))}/edit`;
    },
    launch(listingId) {
        return `/portal/listings/${encodeURIComponent(String(listingId))}/launch`;
    }
};

export { IListingPaths, ListingPaths };
