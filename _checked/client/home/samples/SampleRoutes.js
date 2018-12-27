"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sampleRoutes = [
    {
        key: "samples",
        title: "Dev Samples",
        items: [
            {
                key: "styleguideButtons",
                path: "styleguide/buttons",
                title: "Buttons",
                moduleLoader: () => Promise.resolve().then(() => require("./styleguide/Buttons"))
            },
        ]
    }
];
exports.sampleRoutes = sampleRoutes;
