import { action, computed } from 'mobx';
import { AppHostModel } from './AppHostModel';



const BrowserAppHostDefaults = {
    windowAppHostKey: "__app_host_dodgy_global__",
    resolveHostMaxWait: 20000,
    resolvePollInterval: 120
};

class BrowserAppHostModel extends AppHostModel {
    private _publicPath : string;
    private _window : Window;
    private _extension : string;
    private _popMerge : any;

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
    setWindow(value : Window) {
        if(value !== this._window) {
            if(this._window) {
                delete this._window[BrowserAppHostDefaults.windowAppHostKey];
            }
            this._window = value;
            if(value) {
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
    
    setPublicPath(publicPath : string) {
        this._publicPath = publicPath;
    }
    
    @action
    setTitle(title : string) {
        super.setTitle(title);
        this.window.document.title = title;
    }

    // getUrl(request : IRequest) : string {

        

    //     let url = PathUtils.joinPaths(PathUtils.sep, this.publicPath, request && request.path ? request.path : this.path);
        
    //     if(this._extension) {
    //         url += this._extension;
    //     }
    
    //     let queryString;
    //     if(request && request.query) {
        
    //     let queryOptions = request.query
        
    //     queryString = Object.keys(queryOptions)
    //         .map(k => `${k}=${queryOptions[k]}`)
    //         .join('&');


    //        // queryString = qs.stringify(request.query);
    //     }
    
    //     if(queryString) {
    //         url += "?" + queryString;
    //     }
        
    //     return url;
    // }

    getUrl(request : IRequest) : string {
        const initPath = request && request.path ? request.path : this.path;
        
        //@ts-ignore
        var parsedSearchUrl = Array.from(new URLSearchParams(window.location.search).entries())

        var queryString =
        parsedSearchUrl.length > 1
            ? parsedSearchUrl
            .map(item => Object.assign({}, { [item[0]]: item[1] }))
            .reduce((acc, curr, {}) => Object.assign(acc, curr))
            : { }

        let url = initPath ? [initPath].join("/") : ""
        
    
        if(queryString) {
            url += "?" + queryString;
        }
        
        return url;
    }

    @action
    setInitialized(initialized : boolean) {
        this._initialized = initialized;
        if(!initialized) {
            this.clearRequest();
            this.window.removeEventListener("popstate", this._onPopState);
        }
    }

//CHANGED
    get locationPath() {
        let path = this.window.location.hash;
        

        // if(this.publicPath) {
        //     const publicPath = StringUtils.stripRight(this.publicPath, PathUtils.sep);
            
        //     var publicPathIdx = path.indexOf(publicPath);
            
        //     if(publicPathIdx >= 0) {
        //         path = path.substring(publicPathIdx + publicPath.length);
        //     }
        // }

        // const extension = PathUtils.extname(path);
        // if(extension) {
        //     path = path.substring(0, path.length - extension.length);
        // }

        return path;
    }





get locationQuery() {
        // const search = this.window.location.search;
        // return search && search.length > 1 ? parse(search.substring(1)) : {}

        //@ts-ignore
var parsedSearchUrl = Array.from(new URLSearchParams(window.location.search).entries())

var searchEntries =
    parsedSearchUrl.length > 1
    ? parsedSearchUrl
    .map(item => Object.assign({}, { [item[0]]: item[1] }))
    .reduce((acc, curr, {}) => Object.assign(acc, curr))
    : { }
return searchEntries
}



// get locationQuery() {
//     // const search = this.window.location.search;
//     // return search && search.length > 1 ? parse(search.substring(1)) : {}

// }

    



    get locationRequest() {
        return { 
            path: this.locationPath,
            query: this.locationQuery 
        };
    }

    @action
    protected _onPopState = (e : PopStateEvent) => {
        this._requestHistory.pop();
        this.setRequest(Object.assign({}, this.defaultRequest, this._popMerge));
        delete this._popMerge;
        this._loadImpl();
    }

    protected _updateUrlHistory(url : string) {
        if(this.request.replace) {
            this.window.history.replaceState({ id: this.id}, null, url);
        } else {
            this.window.history.pushState({ id: this.id }, null, url);
        }
    }

//CHANGED

    protected _init(request?: IRequest) : Promise<any> {
        //this._extension = PathUtils.extname(this.window.location.hash);

        this.window.addEventListener("popstate", this._onPopState);
        return super._init(request);
    }

    protected _defaultLaunch(request : IRequest) : Promise<AppHostModel> {
        const url = this.getUrl(request);
        
        const newWindow = this.window.open(url, request ? request.windowName : undefined, request ? request.windowFeatures : undefined);
        
        return new Promise((resolve, reject) => {
            let interval;
            const startTs = new Date().getTime();
            interval = setInterval(() => {
                const newHost = newWindow[BrowserAppHostDefaults.windowAppHostKey] as BrowserAppHostModel;
                if(newHost) {
                    resolve(newHost);
                    clearInterval(interval);
                }
                const currentTs = new Date().getTime();
                if(currentTs - startTs > BrowserAppHostDefaults.resolveHostMaxWait) {
                    clearInterval(interval);
                    reject("Unable to get new app host instance");
                }
            }, BrowserAppHostDefaults.resolvePollInterval);
        });
    }

    open(request: IRequest) : Promise<AppHostModel> {
        return this.launcher ? Promise.resolve(this.launcher(request)) : this._defaultLaunch(request);
    }

    close() {
        this.window.close();
    }

    back() {
        if(this._requestHistory.length > 0) {
            // so we can indicate to another part of the app using this host what request we came from
            this._popMerge = { isBackNav: true, backFrom: this.request };
            this.window.history.back();
        }
    }

    addEventListener(type, handler) : void {
        this.window.addEventListener(type, handler);
    }
    removeEventListener(type, handler) : void {
        this.window.removeEventListener(type, handler);
    }
    emit(event) {
        this.window.dispatchEvent(event as Event);
    }

    @computed
    get defaultRequest() : IRequest {
        return this.locationRequest;
    }
}

export {
    BrowserAppHostModel
}