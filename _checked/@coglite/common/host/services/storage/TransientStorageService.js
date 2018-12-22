"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TransientStorageService {
    constructor() {
        this.items = {};
    }
    getItem(key) {
        return Promise.resolve(this.items[key]);
    }
    setItem(key, item) {
        this.items[key] = item;
        return Promise.resolve();
    }
    removeItem(key) {
        delete this.items[key];
        return Promise.resolve();
    }
}
exports.TransientStorageService = TransientStorageService;
