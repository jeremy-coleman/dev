/**
 * Hash history works on electron and the browser without additional setup or tweaks
 */
import * as h from "history";

const _history = h.createHashHistory();

import { RouterStore, syncHistoryWithStore } from "mobx-react-router";

export const ruterStore = new RouterStore();

export const history = syncHistoryWithStore(_history, ruterStore);

export const navigate = (url: string) => {
    history.push(url);
};

export const origin = () => {
    return window && window.location ? window.location.origin : "";
};

export const push = (x: string) => {
    // console.log(`${history.location.pathname} -> ${x}`);
    if (new RegExp(`(\/)?${x}$`).test(history.location.pathname)) { return; }
    history.push(x);
};