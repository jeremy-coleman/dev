interface ISampleRoute {
    key: string;
    title: string;
    moduleLoader?: () => Promise<any>;
    moduleComponent?: string;
    path?: string;
    items?: ISampleRoute[];
}

const sampleRoutes: ISampleRoute[] = [
    {
         key: "samples",
         title: "Dev Samples",
         items: [
            {
                key: "styleguideButtons",
                path: "styleguide/buttons",
                title: "Buttons",
                moduleLoader: () => import("./styleguide/Buttons")
            },
        ]
    }
];

export { sampleRoutes, ISampleRoute }