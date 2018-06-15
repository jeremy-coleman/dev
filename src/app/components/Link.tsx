import * as React from 'react'
import { observer, inject } from 'mobx-react';
import { NavStore } from '../stores/NavStore';
import { Button, IButtonProps } from "@blueprintjs/core";

type LinkProps = {
  route: string
  nav?: NavStore
  classes?: any
  className?: any
};


export const Link: React.SFC<LinkProps & IButtonProps> = inject('nav')(observer((props: LinkProps) => (
  <Button minimal={true} {...props}
    onClick={() => props.nav.goTo(props.route)}>
    {(props as React.Props<any>).children}
  </Button>
)))



/*
const LinkStyle = style({
  color: 'black',
  textDecoration: 'none',
  transitionDuration: '0.3s',
  padding: [0, 10, 0, 10],
  $nest: {
    '&:hover': {
      color: '#6642C6',
      transform: scale3d(1.1, 1.1, 1.1)
    }
  }
})
*/
