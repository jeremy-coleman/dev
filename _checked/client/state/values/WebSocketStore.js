"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
class MobxWebsocketStore {
    constructor(openWebsocket, closeWebsocket, opts) {
        this.opts = {
            id: 'MobxWebsocketStore',
            resetDataOnOpen: true
        };
        this.openWebsocket = openWebsocket;
        this.closeWebsocket = closeWebsocket;
        this.atom = mobx_1.createAtom("MobXWebsocketAtom", this.startListening.bind(this), this.stopListening.bind(this));
        if (opts) {
            this.opts = Object.assign({}, this.opts, opts);
        }
    }
    get data() {
        this.atom.reportObserved();
        return this.__data;
    }
    set data(value) {
        this.__data = value;
        this.atom.reportChanged();
    }
    get id() {
        return this.opts.id;
    }
    startListening() {
        if (this.opts.resetDataOnOpen) {
            this.__data = null;
        }
        this.openWebsocket(this);
    }
    stopListening() {
        this.closeWebsocket(this);
    }
}
exports.default = MobxWebsocketStore;
