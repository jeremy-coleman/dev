import { configure } from 'mobx';
import { observer, Provider as MobxProvider } from 'mobx-react';
import * as React from 'react';


import {state} from './state';
import { AppShellLayout } from './layout/AppShellLayout';
import { SideNavRouter } from './SideNavRouter';

configure({ enforceActions: "never" })


export let AppView = observer((props) =>  
    <MobxProvider store={state} theme={state.theme} {...state}>
        <div style={{height: '100vh', width: '100vw', overflow: 'hidden'}}>
          <AppShellLayout {...props}>
              <SideNavRouter/>
          </AppShellLayout>
        </div>
    </MobxProvider>
)

//-------IMPORT ORDER IS IMPORTANT - WILL CAUSE ERRORS FOR SEQUENCE ID OTHERWISE---//


// import state from './state';                                    <- must come first
// import { AppShellLayout } from './layout/AppShellLayout';
// import { SideNavRouter } from './SideNavRouter';

