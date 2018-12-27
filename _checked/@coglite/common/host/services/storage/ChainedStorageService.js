"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChainedStorageService {
    constructor(services) {
        this._chain = [];
        if (services) {
            services.forEach(s => this.addService(s));
        }
    }
    addService(service) {
        this._chain.push(service);
    }
    _getItemInternal(key, index) {
        if (index >= this._chain.length) {
            return Promise.resolve();
        }
        return this._chain[index].getItem(key).then(item => {
            if (item) {
                if (index > 0) {
                    let c = index - 1;
                    const cp = [];
                    while (c >= 0) {
                        cp.push(this._chain[c].setItem(key, item));
                        c--;
                    }
                    return Promise.all(cp).then(() => {
                        return item;
                    });
                }
                return Promise.resolve(item);
            }
            return this._getItemInternal(key, index + 1);
        });
    }
    getItem(key) {
        return this._getItemInternal(key, 0);
    }
    setItem(key, item) {
        const cp = this._chain.map(s => {
            return s.setItem(key, item);
        });
        return Promise.all(cp);
    }
    removeItem(key) {
        const cp = this._chain.map(s => {
            return s.removeItem(key);
        });
        return Promise.all(cp);
    }
}
exports.ChainedStorageService = ChainedStorageService;
