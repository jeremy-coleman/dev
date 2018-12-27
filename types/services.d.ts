interface IStorageService  {
    getItem(key : string) : Promise<any>;
    setItem(key : string, item : any) : Promise<any>;
    removeItem(key : string) : Promise<any>;
    size?: any,
    clear?(): Promise<void>
}

type ILoggingService = {
    info(message : any, ...optionalParams : any[]) : void;
    warn(message : any, ...optionalParams : any[]) : void;
    error(message : any, ...optionalParams : any[]) : void;
}

interface ILogEntry {
    message: any;
    optionalParams?: any[];
}

interface IControlledLoggingServiceOptions {
    target : ILoggingService;
    activeSupplier?: boolean
}

//export { IStorageService };