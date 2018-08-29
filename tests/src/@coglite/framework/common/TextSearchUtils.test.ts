import * as SearchUtils from "./TextSearchUtils";

describe("Search Utilities", () => {
    test("containsText()", () => {
        const sample = { firstName: "Sunburn", lastName: "Slapper" };
        expect(SearchUtils.containsText(sample, "sunburn")).toBeTruthy();
        expect(SearchUtils.containsText(sample, "slapper")).toBeTruthy();
        expect(SearchUtils.containsText(sample, "dunno")).toBeFalsy();
        expect(SearchUtils.containsText(undefined, "foo")).toBeFalsy();
        expect(SearchUtils.containsText(null, "foo")).toBeFalsy();
    });
});