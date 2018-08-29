import { IDashboard } from "./IDashboard";
import { IRouter } from "@coglite/framework/common/IRouter";
import { IRequest } from "@coglite/framework/common/IRequest";
import { IConsumerFunc } from "@coglite/framework/common/IConsumerFunc";
import { IPredicateFunc } from "@coglite/framework/common/IPredicateFunc";
import { ISupplierFunc } from "@coglite/framework/common/ISupplierFunc";
import { IViewport } from "./IViewport";
import { IPortalManager } from "./IPortalManager";
import { IComponentFactory } from "./IComponentFactory";

interface IComponent extends IViewport {
    id: string;
    type: string;
    parent: IComponent;
    dashboard: IDashboard;
    root: IComponent;
    config : any;
    router: IRouter;
    isWindowManager: boolean;
    portalManager: IPortalManager;
    componentFactory: IComponentFactory;
    closeDisabled: boolean;
    x: number;
    rx: number;
    y: number;
    ry: number;
    width: number;
    height: number;
    setPortalManager(portalManager : IPortalManager) : void;
    setRouter(router : IRouter) : void;
    addApp: IRequest | ISupplierFunc<IRequest>;
    setAddApp(addApp : IRequest | ISupplierFunc<IRequest>) : void;
    setConfig(state : any) : void;
    remove(comp : IComponent) : void;
    removeFromParent() : void;
    replace(newComp : IComponent, oldComp : IComponent) : void;
    visit(callback : IConsumerFunc<IComponent>) : void;
    findFirst(predicate : IPredicateFunc<IComponent>) : IComponent;
    findAll(predicate : IPredicateFunc<IComponent>) : IComponent[];
    close() : void;
    setCloseDisabled(closeDisabled : boolean) : void;
    /**
     * Resize the viewport
     * @param width
     * @param height 
     */
    resize(width : number, height : number) : void;
    /**
     * Position the viewport
     * @param x
     * @param y 
     */
    position(x : number, y : number) : void;
    /**
     * Sets the viewport relative to the dashboard
     * @param x
     * @param y 
     * @param width 
     * @param height 
     */
    setViewport(x : number, y: number, width : number, height : number) : void;
    /**
     * Resets the viewport on the component
     */
    resetViewport() : void;
}

export { IComponent }