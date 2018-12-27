"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = require("../logging");
class LoggingStorageService {
    constructor(opts) {
        this._target = opts.target;
        this._prefix = opts.prefix;
        this._logger = opts.logger || logging_1.ConsoleLoggingService;
    }
    getItem(key) {
        return this._target.getItem(key).then((item) => {
            this._logger.info(`-- ${this._prefix}: Got Item for ${key}: ${JSON.stringify(item)}`);
            return item;
        }).catch((error) => {
            this._logger.warn(`-- ${this._prefix}: Error getting item for key ${key}: ${error}`);
        });
    }
    setItem(key, item) {
        this._logger.info(`-- ${this._prefix}: Setting Item for ${key}: ${JSON.stringify(item)}`);
        return this._target.setItem(key, item).catch((error) => {
            this._logger.warn(`-- ${this._prefix}: Error setting item for key ${key}: ${error}`);
            return Promise.reject(error);
        });
    }
    removeItem(key) {
        this._logger.info(`-- ${this._prefix}: Removing Item for ${key}`);
        return this._target.removeItem(key).catch((error) => {
            this._logger.warn(`-- ${this._prefix}: Error removing item for key ${key}: ${error}`);
            return Promise.reject(error);
        });
    }
}
exports.LoggingStorageService = LoggingStorageService;
