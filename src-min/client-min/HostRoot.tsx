import { AppHostContainer, attachWindowMessaging, BrowserAppHostModel } from '@coglite/common/host';
import { observer } from 'mobx-react';
import * as React from 'react';

import { AppRouter } from './AppRouter';


attachWindowMessaging(window);


const host = new BrowserAppHostModel();
host.setRoot(true);
host.setRouter(AppRouter);
host.setPublicPath('/');
host.window = window;


export let AppHostRoot = observer(() => <AppHostContainer host={host}/>)
