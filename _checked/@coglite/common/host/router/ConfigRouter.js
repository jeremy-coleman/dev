"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConfigRouter {
    constructor(opts) {
        this._env = opts.env || {};
        this._configMap = opts.configMap;
    }
    handleRequest(req, next) {
        let configId = req.params["_configId"] || this._env.configId || this._env.configName;
        if (!configId) {
            configId = "default";
        }
        if (configId !== this._currentConfigId) {
            this._currentConfigId = configId;
            const config = this._configMap[configId];
            if (!config) {
                return Promise.reject({ code: "NOT_FOUND", message: `Unable to find configuration: ${configId}` });
            }
            return config(Object.assign({}, this._env)).then(next);
        }
        return next();
    }
}
exports.ConfigRouter = ConfigRouter;
