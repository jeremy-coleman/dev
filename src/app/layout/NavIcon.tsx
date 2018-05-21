
import { ListItem, ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
    route: string;
    icon?: any;
    label?: string;
}

export function NavListIcon({ icon, label, route }: Props) {
  return (
    <MenuItem button component={props => <NavLink {...props as any} exact to={route} />}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </MenuItem>
  )
  }