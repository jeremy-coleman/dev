import * as React from 'react'
import { stylesheet } from 'typestyle';
import { ComponentRemoveStore } from './_actions';
import { AppPortalManager } from './AppPortalManager';
import { ComponentRemoveDialog } from './ComponentRemoveDialog';
import { ComponentView } from './Factory';
import { DashboardModel } from '../models/Dashboard';
import { observer } from 'mobx-react';


// using typestyle WAS causing the app tiles to not render on startup

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




interface IDashboardProps {
    dashboard: DashboardModel;
    className?: string;
    host?: IEventTarget;
    classes?: any
}


class DashboardPortals extends React.Component<IDashboardProps, any> {
    ref = React.createRef<HTMLDivElement>()
    
    componentDidMount() {
        this.props.dashboard.setPortalManager(new AppPortalManager(this.ref.current));
    }
    componentWillReceiveProps(nextProps : IDashboardProps) {
        if(nextProps.dashboard !== this.props.dashboard) {
            const currentPortalManager = this.props.dashboard.portalManager;
            if(currentPortalManager) {
                currentPortalManager.destroy();
            }
            this.props.dashboard.setPortalManager(new AppPortalManager(this.ref.current));
        }
    }
    render() {
        return (
            <div ref={this.ref}></div>
        );
    }
}


@observer
class DashboardView extends React.Component<IDashboardProps, any> {
    ref = React.createRef<HTMLDivElement>()
    
    private _resizeToViewport() {
        if(this.ref) {
            const bounds = this.ref.current.getBoundingClientRect();
            this.props.dashboard.resize(bounds.width, bounds.height);
        }
    }

    private _onHostResize = () => this._resizeToViewport();
    

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

    componentWillReceiveProps(nextProps : IDashboardProps) {
        if(nextProps.host !== this.props.host) {
            this._removeHostListener(this.props.host);
            this._addHostListener(nextProps.host);
        }
    }

    componentDidUpdate() {
        this._resizeToViewport();
    }

    render() {
        const { dashboard} = this.props;
        const component = dashboard.component;
        return (
            <div id={this.props.dashboard.id} className={dashboardStyles.root} ref={this.ref}>
                <ComponentRemoveDialog remove={ComponentRemoveStore} />
                <div className={dashboardStyles.content}>
                    <DashboardPortals {...this.props} />
                    <ComponentView component={component} />
                </div>
            </div>
        );
    }
}




export { IDashboardProps, DashboardView }

