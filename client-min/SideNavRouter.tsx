import { flex, vertical } from 'csstips';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { style } from 'typestyle';
import when from 'when-switch';

import { AppHostRoot } from './HostRoot';
import { AboutPage, DashboardPage, DatasetsPage, SettingsPage, CloudPage, CatalogPage, NotebookPage, ChartsPage } from './pages';
import { NavState } from './state';


interface RouterProps {
  nav?: NavState
}

const SideNavRouter = inject('nav')(observer((props: RouterProps) => (
  <div className={style(flex, vertical)}>
    {
      when(props.nav.route)
        .is('workspace', () => <AppHostRoot />)
        .is('notebook', () => <NotebookPage />)
        .is('datasets', () => <DatasetsPage />)
        .is('charts', () => <ChartsPage />)
        .is('dashboard', () => <DashboardPage />)
        .is('cloud', () => <CloudPage />)
        .is('catalog', () => <CatalogPage />)
        .is('settings', () => <SettingsPage />)
        .is('about', () => <AboutPage />)
        .else(() => <AppHostRoot />)
    }
  </div>
)
))

export {SideNavRouter}
export default SideNavRouter

