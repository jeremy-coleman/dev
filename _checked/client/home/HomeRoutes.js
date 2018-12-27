"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const homeRoutes = [
    {
        key: "workspace",
        title: "Workspace",
        items: [
            {
                key: "sampleViews",
                path: "/samples",
                title: "Samples",
                moduleLoader: () => Promise.resolve().then(() => require("./samples/SamplesHost"))
            }
        ]
    }
];
exports.homeRoutes = homeRoutes;
