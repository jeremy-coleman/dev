import { IAppHost } from "@coglite/framework/common/IAppHost";
import { IRequest } from "@coglite/framework/common/IRequest";

const navStackStateKey = "navStack";

const getNavStack = (host : IAppHost) => {
    return host.getState(navStackStateKey);
};

const pushAndLoad = (host : IAppHost, request : IRequest) => {
    const navStack = host.getState(navStackStateKey, () => {
        return [];
    });
    navStack.push({ path: host.path, title: host.title });
    host.load(request);
};

const popAndLoad = (host : IAppHost, fallbackRequest : IRequest) => {
    const navStack = host.getState(navStackStateKey);
    if(navStack && navStack.length > 0) {
        host.load(navStack.pop());
    } else {
        host.load(fallbackRequest);
    }
};

export { getNavStack, pushAndLoad, popAndLoad };
