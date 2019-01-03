type IComponentType = keyof typeof ComponentTypes

 let ComponentTypes = {
    dashboard: "dashboard" as "dashboard",
    stack: "stack" as "stack",
    hsplit: "hsplit" as "hsplit",
    vsplit: "vsplit" as "vsplit",
    window: "window" as "window"
}

export { ComponentTypes, IComponentType }