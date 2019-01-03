import * as React from 'react'
import {observer} from 'mobx-react'


import {AdpatingRenderProps, Button} from '@coglite/common/ux'


export let DatasetsPage = observer((props) =>
<>
<div>datasets</div>
<AdpatingRenderProps/>
<Button>hi</Button>
</>
)