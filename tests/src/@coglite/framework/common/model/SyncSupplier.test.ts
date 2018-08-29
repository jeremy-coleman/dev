import { SyncSupplier } from "./SyncSupplier";

describe("Sync Supplier Test", () => {
    test("default", async () => {
        const m = new SyncSupplier<string>();
        await m.load();
        expect(m.sync.hasSynced).toBeTruthy();
        expect(m.sync.error).toBeTruthy();
    });

    test("loader configured", async () => {
        const m = new SyncSupplier<string>();
        m.loader = () => {
            return Promise.resolve("Hello");
        };
        await m.load();
        expect(m.sync.hasSynced).toBeTruthy();
        expect(m.sync.error).toBeFalsy();
        expect(m.value).toBe("Hello");
    });
});