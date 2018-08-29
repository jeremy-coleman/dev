import * as React from "react";
import { css } from "@uifabric/utilities/lib/css";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { IIconProps, Icon } from "office-ui-fabric-react/lib/Icon";
import { ContextualMenu, IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { getId } from "office-ui-fabric-react/lib/Utilities";
import { getStyles, IDetailsStyles } from "./Details.styles";
import { getClassNames, IDetailsClassNames } from "./Details.classNames";
import { KeyCodes } from "office-ui-fabric-react/lib/Utilities";

interface IDetailsRemoveActionProps {
    classNames?: IDetailsClassNames;
    onClick?: () => void;
}

interface IDetailsMenuActionProps {
    classNames?: IDetailsClassNames;
    menu?: IContextualMenuItem[];
}

interface IDetailsActionProps {
    classNames?: IDetailsClassNames;
    menu?: IContextualMenuItem[];
    onRemove?: () => void;
}

interface IDetailsState {
    open: boolean;
}

interface IDetailsProps extends IDetailsActionProps {
    summary?: any;
    onRenderSummary?: (props : IDetailsProps) => React.ReactNode;
    iconProps?: IIconProps;
    title?: any;
    open?: boolean;
    border?: boolean;
    controlOnHeaderClick?: boolean;
    className?: string;
    style?: React.CSSProperties;
    headerClassName?: string;
    bodyClassName?: string;
    ariaDescription?: string;
    onOpenChange?: (open: boolean) => void;
    disableControl?: boolean;
    styles?: IDetailsStyles;
}

class DetailsRemoveAction extends React.Component<IDetailsRemoveActionProps, any> {
    private _onClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        this.props.onClick();
    }
    render() {
        return (
            <IconButton className={this.props.classNames ? this.props.classNames.action : undefined}
                        iconProps={{ iconName: "Cancel" }}
                        onClick={this.props.onClick ? this._onClick : undefined}
                        title="Remove"
                        ariaLabel="Remove"
                        ariaDescription="Remove" />
        );
    }
}

interface IDetailsMenuActionState {
    target?: any;
    menuOpen: boolean;
}

class DetailsMenuAction extends React.Component<IDetailsMenuActionProps, IDetailsMenuActionState> {
    constructor(props : IDetailsMenuActionProps) {
        super(props);
        this.state = {
            menuOpen: false
        };
    }
    _handleClick = (e : React.MouseEvent<any>) => {
        this.setState({ target: e.target, menuOpen: !this.state.menuOpen });
    }
    _handleMenuDismiss = () => {
        this.setState({ menuOpen: false });
    }
    render() {
        return (
            <div className={this.props.classNames ? this.props.classNames.action : undefined}>
                <IconButton className="details-action-menu-toggle-button"
                                        iconProps={{ iconName: "Clear" }}
                                        onClick={this._handleClick}
                                        title="Toggle Menu"
                                        ariaLabel="Toggle Menu"
                                        ariaDescription="Toggle Menu" />
                {this.state.menuOpen && (
                    <ContextualMenu items={this.props.menu} shouldFocusOnMount={true} target={this.state.target} onDismiss={this._handleMenuDismiss} />
                )}
            </div>
        );
    }
}

class Details extends React.Component<IDetailsProps, IDetailsState> {
    private _id : string;
    private _classNames : IDetailsClassNames;
    constructor(props : IDetailsProps) {
        super(props);
        this._id = getId("details-");
        this.state = {
            open: props.open !== undefined ? props.open : false
        };
    }
    componentWillReceiveProps(nextProps : IDetailsProps) {
        if(nextProps.open !== undefined) {
            this.setState({ open: nextProps.open });
        }
    }
    private _toggle() {
        const open = !this.state.open;
        this.setState({ open: open });
        if(this.props.onOpenChange) {
            this.props.onOpenChange(open);
        }
    }
    private _onToggleClick = () => {
        this._toggle();
    }
    private _onToggleKeyDown = (e : React.KeyboardEvent<HTMLButtonElement>) => {
        if(e.which === KeyCodes.enter || e.which === KeyCodes.space) {
            e.preventDefault();
            e.stopPropagation();
            this._toggle();
        }
    }
    private _renderSummary() : React.ReactNode {
        let summary;
        if(this.props.summary) {
            summary = this.props.summary;
        } else if(this.props.onRenderSummary) {
            summary = this.props.onRenderSummary(this.props);
        } else {
            summary = [];
            const title = this.props.title || "Details";
            if(this.props.iconProps) {
                summary.push(<Icon key="icon" className={this._classNames.icon} {...this.props.iconProps} />);
            }
            summary.push(<div key="title" className={this._classNames.title}>{title}</div>);
        }

        return <div className={this._classNames.summary}>{summary}</div>;
    }
    private _renderActions() : React.ReactNode {
        if(!this.props.disableControl || this.props.onRemove || (this.props.menu && this.props.menu.length > 0)) {
            return (
                <div className={this._classNames.actionContainer}>
                    {this.props.menu && this.props.menu.length > 0 && (
                        <DetailsMenuAction menu={this.props.menu} classNames={this.props.classNames} />
                    )}
                    {this.props.onRemove && (
                        <DetailsRemoveAction onClick={this.props.onRemove} classNames={this.props.classNames} />
                    )}
                    {this._renderControl()}
                </div>
            );
        }
        return null;
    }
    private _renderControl() : React.ReactNode {
        if(!this.props.disableControl) {
            return (
                <IconButton className={this._classNames.control}
                            iconProps={{ iconName: this.state.open ? "ChevronUp" : "ChevronDown" }}
                            onClick={this._onToggleClick}
                            title={this.state.open ? "Hide" : "Show"}
                            ariaLabel={this.state.open ? "Hide Details" : "Show Details"}
                            ariaDescription={(this.state.open ? "Hide " : "Show ") + (this.props.ariaDescription || "Details")}
                            aria-controls={this._id}
                            onKeyDown={this._onToggleKeyDown} />
            );
        }
        return null;
    }
    private _renderHeader() : React.ReactNode {
        return (
            <div className={css(this._classNames.header, this.props.headerClassName, this.props.controlOnHeaderClick ? "is-control" : undefined)}
                    role={this.props.controlOnHeaderClick ? "button" : undefined}
                    onClick={this.props.controlOnHeaderClick ? this._onToggleClick : undefined}
                    aria-controls={this.props.controlOnHeaderClick ? this._id : undefined}>
                {this._renderSummary()}
                {this._renderActions()}
            </div>
        );
    }
    private _renderBody() : React.ReactNode {
        return (
            <div id={this._id} className={css(this._classNames.body, this.props.bodyClassName, { "is-open": this.state.open})} hidden={!this.state.open}>
                {this.props.children}
            </div>
        );
    }
    render() {
        this._classNames = getClassNames(getStyles(undefined, this.props.styles), this.props.className);
        return (
            <div className={css("details", this._classNames.root, this.props.className, { "is-open": this.state.open, "is-hidden": !this.state.open, "has-border": this.props.border })}
                 aria-expanded={this.state.open}
                 style={this.props.style}>
                {this._renderHeader()}
                {this._renderBody()}
            </div>
        );
    }
}

export { IDetailsProps, IDetailsActionProps, IDetailsState, Details };