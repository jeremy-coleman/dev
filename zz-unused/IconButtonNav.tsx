import { AccountBalanceWallet, Cloud, Dashboard, HelpOutline, Settings, SwapHoriz } from '@material-ui/icons';
import { IconButton, List } from '@material-ui/core';
import * as React from 'react';
//import injectStylesheet from 'react-jss';
import styled from 'styled-jss'
import { NavLink } from 'react-router-dom';
import { NavListIcon } from './NavIcon';


interface NavIconProps {
    route: string;
    icon?: any;
    label?: string;
}

export function NavIcon({ icon, label, route }: NavIconProps) {
  return (
    <IconButton style={{display: 'flex'}} component={props => <NavLink {...props as any} exact to={route} />}>
      {icon}
      {label}
    </IconButton>
  );
}

const VertFlexContainer = styled(List)({
  display: "flex",
  flex: "auto",
  flexDirection: "column",
  alignItems: "central",
  justifyContent: "flex-start",
  width: 64
})


export const LeftNav = props => (
      <VertFlexContainer>
              <NavListIcon route="/" icon={<Dashboard />} />
              <NavListIcon route="/pages/notebook" icon={<SwapHoriz />} />
              <NavListIcon route="/pages/datasets" icon={<AccountBalanceWallet />} />
              <NavListIcon route="/pages/cloud" icon={<Cloud />} />
              <NavListIcon route="/pages/settings" icon={<Settings />} />
              <NavListIcon route="/pages/about" icon={<HelpOutline />} />
      </VertFlexContainer>
);

//export const LeftNav = injectStylesheet(styles, {withTheme: true})(_LeftNav);


/*
const LeftNavSC = styled('div')({
    width: 64,
    flexDirection: "column",
    alignItems: "central",
    border: "3px solid black"
)}
*/

// add "label" if you want to use text ie: <DrawerItem label="Portfolio" route="/" icon={<Dashboard />} />
