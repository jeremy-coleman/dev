import * as React from 'react'
import {observer} from 'mobx-react'

import {Tester} from '@coglite/tester'

export let DashboardPage = observer(props =>
<div>
  <Tester/>
  Dashboard
  </div>
)
