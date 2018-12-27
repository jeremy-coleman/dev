"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const datakit_1 = require("@coglite/common/datakit");
const AppHostModel_1 = require("./AppHostModel");
const BrowserAppHostDefaults = {
    windowAppHostKey: "__app_host_dodgy_global__",
    resolveHostMaxWait: 20000,
    resolvePollInterval: 120
};
class BrowserAppHostModel extends AppHostModel_1.AppHostModel {
    constructor() {
        super(...arguments);
        this._onPopState = (e) => {
            this._requestHistory.pop();
            this.setRequest(Object.assign({}, this.defaultRequest, this._popMerge));
            delete this._popMerge;
            this._loadImpl();
        };
    }
    get root() {
        return true;
    }
    get extension() {
        return this._extension;
    }
    get window() {
        return this._window;
    }
    set window(value) {
        this.setWindow(value);
    }
    setWindow(value) {
        if (value !== this._window) {
            if (this._window) {
                delete this._window[BrowserAppHostDefaults.windowAppHostKey];
            }
            this._window = value;
            if (value) {
                value[BrowserAppHostDefaults.windowAppHostKey] = this;
            }
        }
    }
    get publicPath() {
        return this._publicPath;
    }
    set publicPath(value) {
        this.setPublicPath(value);
    }
    setPublicPath(publicPath) {
        this._publicPath = publicPath;
    }
    setTitle(title) {
        super.setTitle(title);
        this.window.document.title = title;
    }
    getUrl(request) {
        let url = datakit_1.PathUtils.joinPaths(datakit_1.PathUtils.sep, this.publicPath, request && request.path ? request.path : this.path);
        if (this._extension) {
            url += this._extension;
        }
        let queryString;
        if (request && request.query) {
            let queryOptions = request.query;
            queryString = Object.keys(queryOptions)
                .map(k => `${k}=${queryOptions[k]}`)
                .join('&');
        }
        if (queryString) {
            url += "?" + queryString;
        }
        return url;
    }
    setInitialized(initialized) {
        this._initialized = initialized;
        if (!initialized) {
            this.clearRequest();
            this.window.removeEventListener("popstate", this._onPopState);
        }
    }
    get locationPath() {
        let path = this.window.location.hash;
        if (this.publicPath) {
            const publicPath = datakit_1.StringUtils.stripRight(this.publicPath, datakit_1.PathUtils.sep);
            var publicPathIdx = path.indexOf(publicPath);
            if (publicPathIdx >= 0) {
                path = path.substring(publicPathIdx + publicPath.length);
            }
        }
        const extension = datakit_1.PathUtils.extname(path);
        if (extension) {
            path = path.substring(0, path.length - extension.length);
        }
        return path;
    }
    get locationQuery() {
        var parsedSearchUrl = Array.from(new URLSearchParams(window.location.search).entries());
        var searchEntries = parsedSearchUrl.length > 1
            ? parsedSearchUrl
                .map(item => Object.assign({}, { [item[0]]: item[1] }))
                .reduce((acc, curr, {}) => Object.assign(acc, curr))
            : {};
        return searchEntries;
    }
    get locationRequest() {
        return {
            path: this.locationPath,
            query: this.locationQuery
        };
    }
    _updateUrlHistory(url) {
        if (this.request.replace) {
            this.window.history.replaceState({ id: this.id }, null, url);
        }
        else {
            this.window.history.pushState({ id: this.id }, null, url);
        }
    }
    _init(request) {
        this._extension = datakit_1.PathUtils.extname(this.window.location.hash);
        this.window.addEventListener("popstate", this._onPopState);
        return super._init(request);
    }
    _defaultLaunch(request) {
        const url = this.getUrl(request);
        const newWindow = this.window.open(url, request ? request.windowName : undefined, request ? request.windowFeatures : undefined);
        return new Promise((resolve, reject) => {
            let interval;
            const startTs = new Date().getTime();
            interval = setInterval(() => {
                const newHost = newWindow[BrowserAppHostDefaults.windowAppHostKey];
                if (newHost) {
                    resolve(newHost);
                    clearInterval(interval);
                }
                const currentTs = new Date().getTime();
                if (currentTs - startTs > BrowserAppHostDefaults.resolveHostMaxWait) {
                    clearInterval(interval);
                    reject("Unable to get new app host instance");
                }
            }, BrowserAppHostDefaults.resolvePollInterval);
        });
    }
    open(request) {
        return this.launcher ? Promise.resolve(this.launcher(request)) : this._defaultLaunch(request);
    }
    close() {
        this.window.close();
    }
    back() {
        if (this._requestHistory.length > 0) {
            this._popMerge = { isBackNav: true, backFrom: this.request };
            this.window.history.back();
        }
    }
    addEventListener(type, handler) {
        this.window.addEventListener(type, handler);
    }
    removeEventListener(type, handler) {
        this.window.removeEventListener(type, handler);
    }
    emit(event) {
        this.window.dispatchEvent(event);
    }
    get defaultRequest() {
        return this.locationRequest;
    }
}
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BrowserAppHostModel.prototype, "setTitle", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], BrowserAppHostModel.prototype, "setInitialized", null);
__decorate([
    mobx_1.action,
    __metadata("design:type", Object)
], BrowserAppHostModel.prototype, "_onPopState", void 0);
__decorate([
    mobx_1.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], BrowserAppHostModel.prototype, "defaultRequest", null);
exports.BrowserAppHostModel = BrowserAppHostModel;
