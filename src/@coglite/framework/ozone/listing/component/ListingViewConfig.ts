interface IListingViewConfig {
    label: string;
    labelPlural: string;
    storeLabel: string;
}

const ListingViewConfig : IListingViewConfig = {
    label: "Listing",
    labelPlural: "Listings",
    storeLabel: "Store"
};

export { ListingViewConfig, IListingViewConfig }