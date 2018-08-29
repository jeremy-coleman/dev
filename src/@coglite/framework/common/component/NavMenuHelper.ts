import { IAppHost } from "../IAppHost";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";

const createBackItem = (host : IAppHost, fallback?: IContextualMenuItem) : IContextualMenuItem => {
    if(host.canGoBack) {
        const backRequest = host.backRequest;
        return {
            key: "back",
            iconProps: {
                iconName: "Back"
            },
            host: host,
            path: backRequest.path,
            title: backRequest.title ? `Back to ${backRequest.title}` : "Back",
            onClick: () => {
                host.back();
            }
        };
    }
    return fallback;
};

export { createBackItem }