import * as React from 'react'
import {observer} from 'mobx-react'
import { CounterView, CounterState } from "../counter";

export let CounterDemo = observer(props =>
<div>Counter Demo
<CounterView state={new CounterState()} />
</div>
)
