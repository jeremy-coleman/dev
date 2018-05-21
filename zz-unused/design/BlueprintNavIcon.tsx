import * as React from 'react'
import {Button, Icon, IButtonProps, IIconProps, IButtonGroupProps, AnchorButton } from "@blueprintjs/core";
import { observer } from 'mobx-react';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';


export const SCButton = styled.button`
  background: ${props => props.theme.main} !important;
  color: ${props => props.theme.text} !important;
`;


const StyledButton: any = SCButton.withComponent<any>(Button)


export type BlueprintNavIconProps = Partial<RouteComponentProps<any, any> & IButtonProps & IIconProps & IButtonGroupProps & any>;

//export let BlueprintNavIcon = observer(({ icon, route, size, children, props, className, style }: any) => {
 // return (<StyledButton href={route} icon={<Icon icon={icon} iconSize={size}/>}/>)})



@observer
export class BlueprintNavIcon extends React.Component<BlueprintNavIconProps, any> {
  render(){
  const {route, icon, size, Classes, ...props} = this.props as BlueprintNavIconProps
  return (<NavLink to={route}><StyledButton icon={<Icon icon={icon} iconSize={size}/>}/></NavLink>)
}
}
