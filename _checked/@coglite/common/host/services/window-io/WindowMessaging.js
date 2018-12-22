"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WindowMessagingDefaults = {
    subscribeMessageType: "subscribe",
    unsubscribeMessageType: "unsubscribe"
};
exports.WindowMessagingDefaults = WindowMessagingDefaults;
class WindowMessagingManager {
    constructor(window) {
        this._messageEventSources = [];
        this._onMessage = (event) => {
            if (event.source !== this._window) {
                const data = event.data;
                const idx = this._messageEventSources.indexOf(event.source);
                if (data.type === WindowMessagingDefaults.unsubscribeMessageType && idx >= 0) {
                    this._messageEventSources.splice(idx, 1);
                }
                else if (data.type === WindowMessagingDefaults.subscribeMessageType && idx < 0) {
                    this._messageEventSources.push(event.source);
                }
                else {
                    this._messageEventSources.forEach(s => {
                        if (s !== event.source) {
                            s.postMessage(data, "*");
                        }
                    });
                }
            }
        };
        this._window = window;
    }
    attach() {
        this._window.addEventListener("message", this._onMessage);
    }
    detach() {
        this._window.removeEventListener("message", this._onMessage);
    }
}
exports.WindowMessagingManager = WindowMessagingManager;
const attachWindowMessaging = (window) => {
    const r = new WindowMessagingManager(window);
    r.attach();
    return r;
};
exports.attachWindowMessaging = attachWindowMessaging;
