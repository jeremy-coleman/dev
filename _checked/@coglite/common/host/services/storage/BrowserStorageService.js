"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BrowserStorageService {
    constructor(storage) {
        this._storage = storage;
        this._storageManager = new StorageManager();
    }
    getItem(key) {
        try {
            const itemSpec = this._storage.getItem(key);
            let r;
            if (itemSpec) {
                r = JSON.parse(itemSpec);
            }
            return Promise.resolve(r);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    setItem(key, item) {
        try {
            this._storage.setItem(key, JSON.stringify(item));
            return Promise.resolve();
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    removeItem(key) {
        try {
            this._storage.removeItem(key);
            return Promise.resolve();
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    async clear() {
        this._storage.clear();
        return Promise.resolve();
    }
    async size() {
        this._storageManager.estimate();
    }
}
exports.BrowserStorageService = BrowserStorageService;
class LocalStorageService extends BrowserStorageService {
    constructor() {
        super(window.localStorage);
    }
}
exports.LocalStorageService = LocalStorageService;
class SessionStorageService extends BrowserStorageService {
    constructor() {
        super(window.sessionStorage);
    }
}
exports.SessionStorageService = SessionStorageService;
