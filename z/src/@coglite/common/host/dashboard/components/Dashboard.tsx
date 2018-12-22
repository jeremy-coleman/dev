import { css } from '@coglite/common/ux';
import { observer } from 'mobx-react';
import * as React from 'react';
import { stylesheet } from 'typestyle';

import { SyncComponent } from '../../components';
import { ComponentRemoveStore } from '../stores';
import { AppPortalManager } from './AppPortalManager';
import { ComponentRemoveDialog } from './ComponentRemoveDialog';
import { ComponentView } from './ComponentView';


// using typestyle causes the app tiles to not render on startup

export const dashboardStyles = stylesheet({
        root: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: "transparent",
            overflow: "hidden",
            "&.hidden": {
                    top: -1,
                    left: -1,
                    width: 0,
                    height: 0,
                    overflow: "hidden"
                }
            
        },
        content: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: "hidden",
            background: "transparent",
                "&.overflow": {
                    overflow: "auto"
                }
            
        },
        overlay: {
            backgroundColor: 'white',
            opacity: 0.1,
                "&.hsplit": {
                    cursor: "ew-resize"
                },
                "&.vsplit": {
                    cursor: "ns-resize"
                }
            
        }
    })






interface IDashboardProps {
    dashboard: IDashboard;
    className?: string;
    hidden?: boolean;
    host?: IEventTarget;
    classes?: any
}

interface IDashboardOverlayProps {
    dashboard: IDashboard;
    className?: string;
}

let DashboardBlockOverlay = observer((props: IDashboardOverlayProps) => 
    <React.Fragment>
        {
            props.dashboard.blockSource &&
            <div 
                className={css(props.className, props.dashboard.blockSource.type)}
                style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, zIndex: 2 }}
            />
        }
    </React.Fragment>
)



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
class DashboardViewTemplate extends React.Component<IDashboardProps, any> {
    ref = React.createRef<HTMLDivElement>()
    
    //componentWillReact(){}

    private _resizeToViewport() {
        if(this.ref) {
            const bounds = this.ref.current.getBoundingClientRect();
            this.props.dashboard.resize(bounds.width, bounds.height);
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

    componentWillReceiveProps(nextProps : IDashboardProps) {
        if(nextProps.host !== this.props.host) {
            this._removeHostListener(this.props.host);
            this._addHostListener(nextProps.host);
        }
    }

    render() {
        const { dashboard} = this.props;
        const component = dashboard.component;
        return (
            <div id={this.props.dashboard.id}
                className={css(dashboardStyles.root, { hidden: this.props.hidden })}
                ref={this.ref}>
                <DashboardBlockOverlay dashboard={this.props.dashboard} className={dashboardStyles.overlay} />
                <ComponentRemoveDialog remove={ComponentRemoveStore} />
                <div className={css(dashboardStyles.content, { "overflow": component && component.isWindowManager && (component as IWindowManager).isRequiresOverflow ? true : false })}>
                    <DashboardPortals {...this.props} />
                    <ComponentView component={component} />
                </div>
            </div>
        );
    }

    //@TODO debounce this

    componentDidUpdate() {
        this._resizeToViewport();
    }
}



let DashboardView = DashboardViewTemplate


let renderDashboardView = observer((props) => <DashboardView {...props} />)

let DashboardContainer = observer((props) => 
        <SyncComponent 
            sync={props.dashboard.sync}
            syncLabel="Loading Dashboard..."
            onRenderDone={renderDashboardView} />
)


export { IDashboardProps, DashboardContainer, DashboardView }