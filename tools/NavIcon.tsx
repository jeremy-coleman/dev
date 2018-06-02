import { ListItem, ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import * as React from 'react';
import {NavStore} from '../stores/NavStore'
import { observer, inject } from 'mobx-react';
import {withTheme} from 'theming'


type LinkProps = {
  route: string
  nav?: NavStore
  classes?: any
};


const Link: React.SFC<LinkProps> = inject('nav')(observer((props: LinkProps) => (
  <a href='#' {...props}
    onClick={() => props.nav.goTo(props.route)}>
    {(props as React.Props<any>).children}
  </a>
)))



interface NavListIconProps {
    route: string;
    icon?: any;
    label?: string;
}

function _NavListIcon({ icon, label, route }: NavListIconProps) {
  return (
    <ListItem button component={props => <Link {...props as any} route={route} />}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  )
  }

export const NavListIcon = withTheme(_NavListIcon);