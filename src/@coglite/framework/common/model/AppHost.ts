import { AbstractAppHost } from "./AbstractAppHost";
import { IEventEmitter } from "../IEventEmitter";
import { EventEmitter } from "../EventEmitter";
import { IRequest } from "../IRequest";

class AppHost extends AbstractAppHost {
    protected _events : IEventEmitter = new EventEmitter();
    private _defaultRequest : IRequest;

    get defaultRequest() : IRequest {
        return Object.assign({}, this._defaultRequest);
    }
    set defaultRequest(value : IRequest) {
        this.setDefaultRequest(value);
    }
    setDefaultRequest(defaultRequest : IRequest) {
        this._defaultRequest = defaultRequest;
    }

    close() {
        // does nothing
    }

    addEventListener(type, handler) : void {
        this._events.addEventListener(type, handler);
    }

    removeEventListener(type, handler) : void {
        this._events.addEventListener(type, handler);
    }

    emit(event) : void {
        this._events.emit(event);
    }
}

export { AppHost }