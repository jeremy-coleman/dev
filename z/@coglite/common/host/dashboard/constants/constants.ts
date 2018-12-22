enum WindowResizeType {
    top = "top",
    right = "right",
    bottom = "bottom",
    left = "left",
    topRight = "topRight",
    topLeft = "topLeft",
    bottomRight = "bottomRight",
    bottomLeft = "bottomLeft"
}

type IComponentType = keyof typeof ComponentTypes

 let ComponentTypes = {
    dashboard: "dashboard" as "dashboard",
    dashboardList: "dashboardList" as "dashboardList",
    stack: "stack" as "stack",
    hsplit: "hsplit" as "hsplit",
    vsplit: "vsplit" as "vsplit",
    window: "window" as "window"
}

export { WindowResizeType, ComponentTypes, IComponentType }