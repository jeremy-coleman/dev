export type IComponentType = keyof typeof ComponentTypes

export let ComponentTypes = {
    dashboard: "dashboard" as "dashboard",
    dashboardList: "dashboardList" as "dashboardList",
    stack: "stack" as "stack",
    hsplit: "hsplit" as "hsplit",
    vsplit: "vsplit" as "vsplit",
    window: "window" as "window"
}
