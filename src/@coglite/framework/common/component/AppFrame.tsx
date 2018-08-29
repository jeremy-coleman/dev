import * as React from "react";
import { IAppHostBaseProps } from "./IAppHostBaseProps";
import { IAppFrameStyles, getStyles } from "./AppFrame.styles";
import { getClassNames } from "./AppFrame.classNames";

interface IAppFrame {
    postMessage(message : any, targetOrigin?: string) : void;
}

interface IAppFrameProps extends IAppHostBaseProps {
    src: string;
    onMessage?: (e : MessageEvent) => void;
    styles?: IAppFrameStyles;
    className?: string;
    componentRef?: (frame : IAppFrame) => void;
}

class AppFrame extends React.Component<IAppFrameProps, any> implements IAppFrame {
    private _frameRef : HTMLIFrameElement;
    private _containerRef : HTMLDivElement;
    private _onResize = () => {
        if(this._containerRef && this._frameRef) {
            const bounds = this._containerRef.getBoundingClientRect();
            this._frameRef.width = String(bounds.width);
            this._frameRef.height = String(bounds.height);
        }
    }
    postMessage(message : any, targetOrigin?: string) {
        this._frameRef.contentWindow.postMessage(message, targetOrigin || this.props.src);
    }
    componentDidMount() {
        const host = this.props.host;
        if(host) {
            host.addEventListener("resize", this._onResize);
            this._onResize();
        }
    }
    componentWillUnmount() {
        if(this.props.host) {
            this.props.host.removeEventListener("resize", this._onResize);
        }
        if(this._frameRef) {
            this._frameRef.removeEventListener("load", this._onFrameLoaded);
            if(this.props.onMessage && this._frameRef.contentWindow) {
                try {
                    this._frameRef.contentWindow.removeEventListener("message", this.props.onMessage);
                } catch(e) {
                    console.warn("Error removing message listener from frame");
                    console.warn(e);
                }
            }
            this._frameRef.src = "about:blank";
        }
    }
    private _onContainerRef = (ref : HTMLDivElement) => {
        this._containerRef = ref;
        this._onResize();
    }
    private _onFrameRef = (ref : HTMLIFrameElement) => {
        this._frameRef = ref;
        this._onResize();
        if(this.props.componentRef) {
            this.props.componentRef(ref ? this : null);
        }
    }
    private _onFrameLoaded = (e) => {
        if(this.props.onMessage) {
            try {
                this._frameRef.contentWindow.addEventListener("message", this.props.onMessage);
            } catch(e) {
                console.warn("Error adding message listener to frame");
                console.warn(e);
            }
        }
    };
    render() {
        const classNames = getClassNames(getStyles(undefined, this.props.styles), this.props.className);            
        return (
            <div className={classNames.root} ref={this._onContainerRef}>
                <iframe className={classNames.frame} ref={this._onFrameRef} src={this.props.src} onLoad={this._onFrameLoaded} />
            </div>
        );
    }
};

export { IAppFrameProps, AppFrame }