
const ConsoleLoggingService : ILoggingService = console;


class CollectingLoggingService implements ILoggingService {
    private _infos : ILogEntry[];
    private _warns : ILogEntry[];
    private _errors : ILogEntry[];
    get infos() : ILogEntry[] {
        return this._infos ? [].concat(this._infos) : [];
    }
    get warns() : ILogEntry[] {
        return this._warns ? [].concat(this._warns) : [];
    }
    get errors() : ILogEntry[] {
        return this._errors ? [].concat(this._errors) : [];
    }
    info(message : any, ...optionalParams : any[]) : void {
        if(!this._infos) {
            this._infos = [];
        }
        this._infos.push({ message: message, optionalParams: optionalParams });
    }
    warn(message : any, ...optionalParams : any[]) : void {
        if(!this._warns) {
            this._warns = [];
        }
        this._warns.push({ message: message, optionalParams: optionalParams });
    }
    error(message : any, ...optionalParams : any[]) : void {
        if(!this._errors) {
            this._errors = [];
        }
        this._errors.push({ message: message, optionalParams: optionalParams });
    }
    clear() {
        delete this._infos;
        delete this._warns;
        delete this._errors;
    }
}



class ControlledLoggingService implements ILoggingService {
    private _target : ILoggingService;
    private _activeSupplier
    
    constructor(opts : IControlledLoggingServiceOptions) {
        this._target = opts.target;
        this._activeSupplier = opts.activeSupplier || true;
    }

    info(message : any, ...optionalParams : any[]) : void {
        if(this._activeSupplier()) {
            this._target.info(message, optionalParams);
        }
    }
    warn(message : any, ...optionalParams : any[]) : void {
        if(this._activeSupplier()) {
            this._target.warn(message, optionalParams);
        }
    }
    error(message : any, ...optionalParams : any[]) : void {
        if(this._activeSupplier()) {
            this._target.error(message, optionalParams);
        }
    }
}

export { ControlledLoggingService }
export { ConsoleLoggingService }
export { CollectingLoggingService }