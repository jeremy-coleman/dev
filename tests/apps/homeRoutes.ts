import { IHomeApp } from "./IHomeApp";


const homeApps: IHomeApp[] = [
    {
        key: "appStore",
        title: "App Store",
        items: [
            {
                key: "bookmarks",
                path: "/ozone/bookmarks",
                title: "My Bookmarks",
                
            },
            {
                key: "storefront",
                path: "/ozone/store",
                title: "App Store"
                
            }
        ]
    },
    {
        key: "portal",
        title: "Portal",
        items: [
            {
                key: "bookmarks",
                path: "/portal/bookmarks",
                title: "Portal Bookmarks",
                
            },
            {
                key: "storefront",
                path: "/portal/store",
                title: "Portal App Store"
                
            }
        ]
    },
    {
        key: "virtualized",
        title: "Virtualized Components",
        items: [
            {
                key: "virtualizedPivot",
                path: "/virtualized/pivot",
                title: "Pivot Spreadsheet",
                moduleLoader: () => import("./virtualized/pivot/VirtualizedPivotApp")
            },
            {
                key: "listSearch",
                path: "/virtualized/listsearch",
                title: "List Search",
                moduleLoader: () => import("./virtualized/searchlist/SearchList")
            }
        ]
    },
    
    {
       key: "workspace",
       title: "Workspace Features",
       items: [
            {
                key: "todoEditor",
                path: "/workspace/todos",
                title: "Todo Editor",
                moduleLoader: () => import("./dev-sample-apps/mvvm-todos/MyTodo")
            },
            {
                key: "raycastDemo",
                path: "/workspace/raycast",
                title: "Raycast",
                moduleLoader: () => import("./dev-sample-apps/raycast/App")
            },
            {
                key: "remoteFileBrowser",
                path: "/workspace/remoteFileBrowser",
                title: "Remote File Browser",
                moduleLoader: () => import("./remote-file-browser/App")
            }
        ]},
        
    {
        key: "samples",
        title: "Fabric Samples",
        items: [
            {
                key: "opener",
                title: "Opener",
                path: "/samples/core/opener",
                moduleLoader: () => import("./dev-sample-apps/Opener")
            },
            {
                key: "details",
                title: "Details",
                path: "/samples/core/details",
                moduleLoader: () => import("@coglite/framework/common/component/samples/Details")
            },
            {
                key: "form",
                title: "Form",
                path: "/samples/core/form",
                moduleLoader: () => import("@coglite/framework/common/component/samples/PersonForm")
            },
            {
                key: "detailsList",
                title: "Selectable Details List",
                path: "/samples/core/detailsList",
                moduleLoader: () => import("./dev-sample-apps/detail-list/DetailsList")
            },
            {
                key: "fabricNavigationView",
                path: "/samples/fabric/navigationview",
                title: "Fabric Navigation View Sample",
                moduleLoader: () => import("@coglite/framework/common/component/samples/NavigationView")
            },
            {
                key: "filefield",
                path: "/samples/fabric/filefield",
                title: "File Opener",
                moduleLoader: () => import("./dev-sample-apps/FileField")
            },
                        {
                key: "fabricTextField",
                path: "/samples/fabric/textfield",
                title: "Fabric Text Field Samples",
                moduleLoader: () => import("@coglite/framework/common/component/samples/TextField")
            },
            {
                key: "fabricPicker",
                path: "/samples/fabric/picker",
                title: "Fabric Picker Samples",
                moduleLoader: () => import("@coglite/framework/common/component/samples/Picker")
            },
            {
                key: "fabricCalendar",
                path: "/samples/fabric/calendar",
                title: "Fabric Calendar Samples",
                moduleLoader: () => import("@coglite/framework/common/component/samples/Calendar")
            },
            {
                key: "fabricPersonForm",
                path: "/samples/fabric/personform",
                title: "Fabric Person Form (Bound Fields)",
                moduleLoader: () => import("@coglite/framework/common/component/samples/PersonForm")
            },
            {
                key: "help",
                title: "Help",
                path: "/help"
            }
            
        ]
    },
       
       /*
        {
        key: "fabricComponents",
        title: "Reusable Fabric Samples",
        items: [
            {
                key: "datatable",
                title: "Data Table",
                path: "/fabric/components/datatable",
                moduleLoader: () => import("./reusable-components/data-table/data-table.component")
            },
            {
                key: "gallery",
                title: "Gallery",
                path: "/fabric/components/gallery",
                moduleLoader: () => import("./reusable-components/gallery/gallery")
            },
           {
                key: "label",
                title: "Label",
                path: "/fabric/components/label",
                moduleLoader: () => import("./reusable-components/label/label.component")
            },
            {
                key: "pickfiles",
                title: "File Picker",
                path: "/fabric/components/filepicker",
                moduleLoader: () => import("./reusable-components/pick-files/pick-files")
            }
            ]
        },
        */
        
        
    
    {
        key: "dashboard",
        title: "Dashboard Samples",
        items: [
            {
                key: "dashboardStack",
                path: "/samples/dashboard/stack",
                title: "Dashboard Stack Sample",
                moduleLoader: () => import("./dev-sample-apps/BoredFabricSamples"),
                moduleComponent: "StackSample"
            },
            {
                key: "dashboardHSplit",
                path: "/samples/dashboard/hsplit",
                title: "Dashboard HSplit Sample",
                moduleLoader: () => import("./dev-sample-apps/BoredFabricSamples"),
                moduleComponent: "HSplitSample"
            },
            {
                key: "dashboardHSplitLeftWidthSet",
                path: "/samples/dashboard/hsplitLeftWidthSet",
                title: "Dashboard HSplit Left Width Set Sample",
                moduleLoader: () => import("./dev-sample-apps/BoredFabricSamples"),
                moduleComponent: "HSplitLeftWidthSetExample"
            },
            {
                key: "dashboardVSplit",
                path: "/samples/dashboard/vsplit",
                title: "Dashboard VSplit Sample",
                moduleLoader: () => import("./dev-sample-apps/BoredFabricSamples"),
                moduleComponent: "VSplitSample"
            },
            {
                key: "dashboardVSplitTopHeightSet",
                path: "/samples/dashboard/vsplitTopHeightSet",
                title: "Dashboard VSplit Top Height Set Sample",
                moduleLoader: () => import("./dev-sample-apps/BoredFabricSamples"),
                moduleComponent: "VSplitTopHeightSetExample"
            },
            {
                key: "dashboardGrid",
                path: "/samples/dashboard/grid",
                title: "Dashboard Grid Sample",
                moduleLoader: () => import("./dev-sample-apps/BoredFabricSamples"),
                moduleComponent: "GridSample"
            }
        
        ]
    }
       
];

export { homeApps }
