import * as React from 'react'
import { observer, inject } from 'mobx-react';
import styled from 'styled-components'
import { ListItem, ListItemIcon, ListItemText, MenuItem, Card } from '@material-ui/core';
import {NavStore} from '../stores/NavStore'


import { Link } from '../components/Link';
import { IconNames } from '@blueprintjs/icons';
import { ButtonGroup } from '@blueprintjs/core';


  const LeftNavStylesContainer = styled.div`
      max-width: 48px;
      min-width: 48px;
      width: 48px;
      min-height: 100%;
      flex: 1 1 auto;
      position: relative;
      display: flex;
      flex-direction: column;
      alignment-baseline: central;
      overflow: hidden;
      border: 3px solid white;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);
      ;`

    export const IconNavBar  = observer((props) => (
      <LeftNavStylesContainer >
          <Link icon={IconNames.PROJECTS} large={true}  route="dashboard" />
          <Link icon={IconNames.GRAPH} large={true} route="notebook"/>
          <Link icon={IconNames.CHART} large={true} route="charts"/>
          <Link icon={IconNames.DATABASE} large={true}  route="datasets"/>
          <Link icon={IconNames.CLOUD} large={true}  route="cloud"/>
          <Link icon={IconNames.COG} large={true}  route="settings"/>
          <Link icon={IconNames.HELP} large={true}  route="about"/>
      </LeftNavStylesContainer >
    ))

