import * as React from 'react'
import { style } from 'typestyle'
import { scale3d } from 'csx'
import {NavStore} from '../stores/NavStore'
import { observer, inject } from 'mobx-react';

type LinkProps = {
  route: string
  nav?: NavStore
};

const LinkStyle = style({
  color: 'white',
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



const Link: React.SFC<LinkProps> = inject('nav')(observer((props: LinkProps) => (
  <a href='#' className={LinkStyle}
    onClick={() => props.nav.goTo(props.route)}>
    {(props as React.Props<any>).children}
  </a>
)))

export default Link