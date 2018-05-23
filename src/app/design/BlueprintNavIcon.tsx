import * as React from 'react'
import {Button, Icon, IButtonProps, IIconProps, IButtonGroupProps, AnchorButton } from "@blueprintjs/core";
import { observer } from 'mobx-react';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';


export const StyledButton = styled(Button)`
  background: ${props => props.theme.main} !important;
  color: ${props => props.theme.text} !important;
`;


//const StyledButton: any = SCButton.withComponent<any>(Button)


//export type BlueprintNavIconProps = Partial<RouteComponentProps<any> & IButtonProps & IIconProps & IButtonGroupProps & any>;

export let BlueprintNavIcon = observer(({ icon, route, size, ...props}: any) => {
 return (<NavLink to={route}><StyledButton icon={<Icon icon={icon} iconSize={size}/>}/></NavLink>)})



//@observer
//export class BlueprintNavIcon extends React.Component<any, any> {
//  render(){
 // return (<NavLink to={route}><StyledButton icon={<Icon icon={icon} iconSize={size}/>}/></NavLink>)
//}
//}
