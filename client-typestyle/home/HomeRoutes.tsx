import * as React from 'react'


interface IHomeRoute {
    key: string;
    title: string;
    moduleLoader?: () => Promise<any>;
    moduleComponent?: string;
    path?: string;
    items?: IHomeRoute[];
    tabIcon?: any
}

const homeRoutes: IHomeRoute[] = [
    {
         key: "workspace",
         title: "Workspace",
         items: [
            
            {
                key: "sampleViews",
                path: "/samples",
                title: "Samples",
                moduleLoader: () => import("./samples/SamplesHost")
            }

        ]}
];

export { homeRoutes, IHomeRoute }