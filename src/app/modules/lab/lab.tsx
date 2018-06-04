import * as React from 'react'
import {observer} from 'mobx-react'
import { CogliteLabApp } from './App';
import { FillParent } from '../../design';
import { ChartDrawerToolbar } from './toolbar';


export let SettingsPage = observer((props) =>

<FillParent>
 <ChartDrawerToolbar/>
<CogliteLabApp/>

</FillParent>
)