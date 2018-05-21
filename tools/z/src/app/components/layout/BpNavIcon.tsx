import * as React from 'react'
import { MenuDivider, ButtonGroup, Button, AnchorButton, Icon, IButtonProps, IIconProps, IButtonGroupProps } from "@blueprintjs/core";
import {IconNames} from '@blueprintjs/icons'


import styled from 'styled-components'
import { observer } from 'mobx-react';
import { NavLink, Link, RouteComponentProps } from 'react-router-dom';

const Container = styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  padding: 0px !important;
  list-style: none;
  background-color: teal !important;
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


type IconNavProps = Partial<RouteComponentProps<any, any> & IButtonProps & IIconProps & IButtonGroupProps & any>

let NavIcon = observer(({ icon, route, size, fill, children, ...props }: IconNavProps) => {
  return (
    <NavLink to={route}><Button icon={<Icon icon={icon} fill={fill} iconSize={size}/>}/></NavLink>
     )
})

 const _IconNavBar  = ({fill, vertical, large, size, props}: IconNavProps) => (        
            <ButtonGroup large={true} fill={true} vertical={true}>
                <NavIcon icon={IconNames.MENU} size={40} fill={true} large={true} route="/pages/notebook"/>
                <NavIcon icon={IconNames.DATABASE} size={40} large={true}  route="/pages/notebook"/>
                <NavIcon icon={IconNames.GRAPH} size={40} large={true}  route="/pages/dashboard" />
                <NavIcon icon={IconNames.COG} size={40} large={true}  route="/pages/cloud"/>
            </ButtonGroup >
          
        )


export const IconNavBar =  observer(_IconNavBar)