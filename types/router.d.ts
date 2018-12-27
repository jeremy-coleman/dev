type IRouterManager = {
    use(pathOrRouter: string | IRouter | IRequestHandler, router?: IRouter | IRequestHandler) : void;
}

type IRouter = {
    handleRequest(req : {
    app?: any;
    basePath?: string;
    path?: string;
    params?: { [key: string]: any };
    [key : string] : any;
}, next?: IRequestHandler) : Promise<any> | any;
}


type IRequestHandler = {
    (req?: {
        app?: any;
        basePath?: string;
        path?: string;
        params?: { [key: string]: any };
        [key : string] : any
    }, 
    next?: IRequestHandler
) : Promise<any> | any;
}


type IRequest = {
    app?: any;
    basePath?: string;
    path?: string;
    params?: { [key: string]: any };
    [key : string] : any;
}


type IPathTestResult = {
    match: boolean;
    params?: any;
}


type IPathTemplateOptions = {
    sensitive?: boolean;
    strict?: boolean;
    end?: boolean;
    delimiter?: string;
};



type IExactPathOptions = {
    allowTrailingSlash?: boolean;
}

type IReactRouterOptions = {
    exportKey?: string;
    exact?: boolean;
    allowTrailingSlash?: boolean;
    requestPropKey?: string;
}

type IRequestContext = {
    request: IRequest;
    next: boolean;
    value?: any;
}


type IConfig = {
    (env : any) : Promise<any>;
}

type IConfigMap = {
    [key : string] : IConfig;
}

type IConfigRouterOptions = {
    env?: any;
    configMap: IConfigMap;
}

// export { IConfig, IConfigMap, IConfigRouterOptions, IRouterManager , IRouter , IRequestHandler , IRequest , IPathTestResult , IPathTemplateOptions , IExactPathOptions, IReactRouterOptions, IRequestContext  }