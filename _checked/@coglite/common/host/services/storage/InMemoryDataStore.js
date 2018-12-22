"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InMemoryDataStore {
    constructor() {
        this._data = new Map();
    }
    async setItem(key, value) {
        this._data.set(key, value);
        return Promise.resolve();
    }
    async getItem(key) {
        return Promise.resolve(this._data.get(key));
    }
    async removeItem(key) {
        this._data.delete(key);
        return Promise.resolve();
    }
    async clear() {
        this._data.clear();
        return Promise.resolve();
    }
    get size() {
        return this._data.size;
    }
}
exports.InMemoryDataStore = InMemoryDataStore;
