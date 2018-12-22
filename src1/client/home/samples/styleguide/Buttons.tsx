import * as React from 'react'
import {observer} from 'mobx-react'

import {FileField} from '@coglite/common/host'

export let DetailsSample = observer((props) =>
<div>
<div>File Field</div>
<FileField/>
</div>
)

export default DetailsSample