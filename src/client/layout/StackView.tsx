import { observer } from 'mobx-react';
import * as React from 'react';
import { stylesheet } from 'typestyle';

import { ComponentRemoveStore } from '@coglite/common/host';
import { AppPortalManager } from '@coglite/common/host';
import { ComponentRemoveDialog } from '@coglite/common/host';
import { ComponentView } from '@coglite/common/host';
import { StackModel } from '@coglite/common/host';
import { WindowAppHost } from '@coglite/common/host';

// using typestyle causes the app tiles to not render on startup

export const dashboardStyles = stylesheet({
        root: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: "transparent",
            overflow: "hidden"
            
        },
        content: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: "hidden",
            background: "transparent",
            
        },
        overlay: {
            backgroundColor: 'white',
            opacity: 0.1,
            $nest:{
                "&.hsplit": {
                    cursor: "ew-resize"
                },
                "&.vsplit": {
                    cursor: "ns-resize"
                }
            }
        }
    })




interface IStackProps {
    stack: StackModel;
    className?: string;
    host?: IEventTarget;
    classes?: any
}


class StackPortals extends React.Component<IStackProps, any> {
    ref = React.createRef<HTMLDivElement>()
    
    componentDidMount() {
        this.props.stack.setPortalManager(new AppPortalManager(this.ref.current));
    }
    componentWillReceiveProps(nextProps : IStackProps) {
        if(nextProps.stack !== this.props.stack) {
            const currentPortalManager = this.props.stack.portalManager;
            if(currentPortalManager) {
                currentPortalManager.destroy();
            }
            this.props.stack.setPortalManager(new AppPortalManager(this.ref.current));
        }
    }
    render() {
        return (
            <div ref={this.ref}></div>
        );
    }
}


@observer
class StackView extends React.Component<IStackProps, any> {
    ref = React.createRef<HTMLDivElement>()
    
    //componentWillReact(){}

    private _resizeToViewport() {
        if(this.ref) {
            const bounds = this.ref.current.getBoundingClientRect();
            this.props.stack.resize(bounds.width, bounds.height);
        }
    }

    private _onHostResize = () => {
        this._resizeToViewport();
    }

    private _addHostListener(host : IEventTarget) {
        if(host) {
            host.addEventListener("resize", this._onHostResize);
        }
    }
    
    private _removeHostListener(host : IEventTarget) {
        if(host) {
            host.removeEventListener("resize", this._onHostResize);
        }
    }

    componentDidMount() {
        this._addHostListener(this.props.host);
        this._resizeToViewport();
    }

    componentWillUnmount() {
        this._removeHostListener(this.props.host);
    }

    componentWillReceiveProps(nextProps : IStackProps) {
        if(nextProps.host !== this.props.host) {
            this._removeHostListener(this.props.host);
            this._addHostListener(nextProps.host);
        }
    }

    render() {
        const { stack} = this.props;
        return (
            <div id={this.props.stack.id} className={dashboardStyles.root} ref={this.ref}>
                <ComponentRemoveDialog remove={ComponentRemoveStore} />
                <div className={dashboardStyles.content}>
                    <StackPortals {...this.props} />
                    <ComponentView component={stack} />
                </div>
            </div>
        );
    }

    //@TODO debounce this

    componentDidUpdate() {
        this._resizeToViewport();
    }
}




export { IStackProps, StackView }