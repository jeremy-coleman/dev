import { ListItem, ListItemIcon, ListItemText } from 'material-ui';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import {observer} from 'mobx-react'

interface NavIconProps {
    route: string;
    icon?: any;
    label?: string;
}

export let NavIcon = observer(({ icon, label, route }: NavIconProps) => {
  return (
    <ListItem button component={props => <NavLink {...props as any} exact to={route} />}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  );
})