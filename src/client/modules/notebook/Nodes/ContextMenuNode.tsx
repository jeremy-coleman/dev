import * as classNames from "classnames";
import * as React from "react";

import { Classes, ContextMenu, ContextMenuTarget, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";


/** This component uses the imperative ContextMenu API.*/
export class GraphNode extends React.PureComponent<{}, { isContextMenuOpen: boolean }> {
    public state = { isContextMenuOpen: false };

    public render() {
        const classes = classNames("context-menu-node", { "context-menu-open": this.state.isContextMenuOpen });
        return <div 
                className={classes} 
                onContextMenu={this.showContextMenu}
                draggable={true}
                onDragStart={event => {
                    event.dataTransfer.setData("storm-diagram-node", JSON.stringify({ type: "cogliteDebug" }))
                  }}
                 />;
    }

    private showContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        // must prevent default to cancel parent's context menu
        e.preventDefault();
        // invoke static API, getting coordinates from mouse event
        ContextMenu.show(
            <Menu>
                <MenuItem icon="search-around" text="Search around..." />
                <MenuItem icon="search" text="Object viewer" />
                <MenuItem icon="graph-remove" text="Remove" />
                <MenuItem icon="group-objects" text="Group" />
                <MenuDivider />
                <MenuItem disabled={true} text="Clicked on node" />
            </Menu>,
            { left: e.clientX, top: e.clientY },
            () => this.setState({ isContextMenuOpen: false }),
        );
        // indicate that context menu is open so we can add a CSS class to this element
        this.setState({ isContextMenuOpen: true });
    };
}

/** This component uses the decorator API and implements the IContextMenuTarget interface.*/
@ContextMenuTarget
 class _GraphContextMenuExample extends React.PureComponent<any, {}> {
    public render() {
        return (
            <div {...this.props}>
                <GraphNode />
                <span className={Classes.TEXT_MUTED}>Right-click on node or background.</span>
            </div>
        );
    }

    public renderContextMenu(e: React.MouseEvent<HTMLElement>) {
        return (
            <Menu>
                <MenuItem icon="select" text="Select all" />
                <MenuItem icon="insert" text="Insert...">
                    <MenuItem icon="new-object" text="Object" />
                    <MenuItem icon="new-text-box" text="Text box" />
                    <MenuItem icon="star" text="Astral body" />
                </MenuItem>
                <MenuItem icon="layout" text="Layout...">
                    <MenuItem icon="layout-auto" text="Auto" />
                    <MenuItem icon="layout-circle" text="Circle" />
                    <MenuItem icon="layout-grid" text="Grid" />
                </MenuItem>
                <MenuDivider />
                <MenuItem disabled={true} text={`Clicked at (${e.clientX}, ${e.clientY})`} />
            </Menu>
        );
    }
}

export const GraphContextMenuExample = ContextMenuTarget(_GraphContextMenuExample)