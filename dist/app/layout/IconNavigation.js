"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const styled_jss_1 = require("styled-jss");
const icons_1 = require("@material-ui/icons");
const NavIcon_1 = require("./NavIcon");
const core_1 = require("@material-ui/core");
const VertFlexContainer = styled_jss_1.default(core_1.Card)({
    maxWidth: '64px',
    minHeight: '100%',
    flex: '1 1 auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignmentBaseline: 'central',
    marginBottom: '5px'
});
let IconNavBar = class IconNavBar extends React.Component {
    render() {
        const nav = this.props;
        return (React.createElement(VertFlexContainer, Object.assign({}, this.props),
            React.createElement(NavIcon_1.NavListIcon, { route: "/", icon: React.createElement(icons_1.Dashboard, null) }),
            React.createElement(NavIcon_1.NavListIcon, { route: "/pages/notebook", icon: React.createElement(icons_1.SwapHoriz, null) }),
            React.createElement(NavIcon_1.NavListIcon, { route: "/pages/charts", icon: React.createElement(icons_1.SwapHoriz, null) }),
            React.createElement(NavIcon_1.NavListIcon, { route: "/pages/datasets", icon: React.createElement(icons_1.AccountBalanceWallet, null) }),
            React.createElement(NavIcon_1.NavListIcon, { route: "/pages/workflowgraph", icon: React.createElement(icons_1.SwapHoriz, null) }),
            React.createElement(NavIcon_1.NavListIcon, { route: "/pages/cloud", icon: React.createElement(icons_1.Cloud, null) }),
            React.createElement(NavIcon_1.NavListIcon, { route: "/pages/settings", icon: React.createElement(icons_1.Settings, null) }),
            React.createElement(NavIcon_1.NavListIcon, { route: "/pages/about", icon: React.createElement(icons_1.HelpOutline, null) })));
    }
};
IconNavBar = __decorate([
    mobx_react_1.inject('navigation'),
    mobx_react_1.observer
], IconNavBar);
exports.IconNavBar = IconNavBar;
/*
const VertFlexContainer = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
  justify-content: flex-start;
`;
*/
/*
 export const IconNavigation  = observer(({fill, vertical, large, size, props}: BlueprintNavIconProps) => (
            <StyledButtonGroup large={true} fill={true} vertical={true}>
                <BlueprintNavIcon icon={IconNames.DASHBOARD} size={35} large={true} route="/"/>
                <BlueprintNavIcon icon={IconNames.CODE} size={35} large={true} route="/pages/notebook"/>
                <BlueprintNavIcon icon={IconNames.CHART} size={35} large={true} route="/pages/charts"/>
                <BlueprintNavIcon icon={IconNames.DATABASE} size={35} large={true}  route="/pages/datasets"/>
                <BlueprintNavIcon icon={IconNames.GRAPH} size={35} large={true}  route="/pages/dashboard" />
                <BlueprintNavIcon icon={IconNames.CLOUD} size={35} large={true}  route="/pages/cloud"/>
                <BlueprintNavIcon icon={IconNames.COG} size={35} large={true}  route="/pages/settings"/>
                <BlueprintNavIcon icon={IconNames.HELP} size={35} large={true}  route="/pages/about"/>
            </StyledButtonGroup >
  ))
  */
//import styled from 'styled-components'
/*
const Container = styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  padding: 0px !important;
  list-style: none;
  background-color: ${props => props.theme.main} !important;
  color: ${props => props.theme.text} !important;
  width: 50px !important;
  border-color: white;
  border: 10px;
`;

const VertFlexContainer = styled(ButtonGroup)`
  display: flex;
  flex: auto;
  flex-direction: column;
  justify-content: flex-start;
`;

export const MenuIcon = styled(Button)`
  background: ${props => props.theme.main} !important;
  color: ${props => props.theme.text} !important;
`;

export const MenuIconDivider = styled(MenuDivider)`
  width: 50px !important;
`;

const LeftNavSC = styled.div`
    width: 64px;
    flex-direction: column;
    align-items: central;
    border: 3px solid black;
`
*/ 
