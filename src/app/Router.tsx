import * as React from 'react'
import styled from 'styled-jss'
import when from 'when-switch'
import { style } from 'typestyle'
import { flex, vertical } from 'csstips'



import {NavStore} from './stores/NavStore'
import { observer, inject } from 'mobx-react';


import { NotebookView } from './pages/notebook/View';
import { NotebookPage, DatasetsPage, ChartsPage, DashboardPage, CloudPage, SettingsPage, AboutPage, WorkflowGraph} from './pages'


interface RouterProps {
  nav?: NavStore
}

const AppRouter = inject('nav')(observer((props: RouterProps) => (
  <div className={style(flex, vertical)}>
    {
      when(props.nav.route)
        .is('notebook', () => <NotebookView />)
        .is('datasets', () => <DatasetsPage />)
        .is('charts', () => <ChartsPage />)
        .is('dashboard', () => <DashboardPage />)
        .is('cloud', () => <CloudPage />)
        .is('settings', () => <SettingsPage />)
        .is('about', () => <AboutPage />)
        .is('workflow', () => <WorkflowGraph />)
        .else(() => <DashboardPage />)
    }
  </div>
)
))

export default AppRouter

