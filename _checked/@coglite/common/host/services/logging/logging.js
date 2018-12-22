"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConsoleLoggingService = console;
exports.ConsoleLoggingService = ConsoleLoggingService;
class CollectingLoggingService {
    get infos() {
        return this._infos ? [].concat(this._infos) : [];
    }
    get warns() {
        return this._warns ? [].concat(this._warns) : [];
    }
    get errors() {
        return this._errors ? [].concat(this._errors) : [];
    }
    info(message, ...optionalParams) {
        if (!this._infos) {
            this._infos = [];
        }
        this._infos.push({ message: message, optionalParams: optionalParams });
    }
    warn(message, ...optionalParams) {
        if (!this._warns) {
            this._warns = [];
        }
        this._warns.push({ message: message, optionalParams: optionalParams });
    }
    error(message, ...optionalParams) {
        if (!this._errors) {
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
exports.CollectingLoggingService = CollectingLoggingService;
class ControlledLoggingService {
    constructor(opts) {
        this._target = opts.target;
        this._activeSupplier = opts.activeSupplier || true;
    }
    info(message, ...optionalParams) {
        if (this._activeSupplier()) {
            this._target.info(message, optionalParams);
        }
    }
    warn(message, ...optionalParams) {
        if (this._activeSupplier()) {
            this._target.warn(message, optionalParams);
        }
    }
    error(message, ...optionalParams) {
        if (this._activeSupplier()) {
            this._target.error(message, optionalParams);
        }
    }
}
exports.ControlledLoggingService = ControlledLoggingService;
