import * as React from 'react'
import {observer} from 'mobx-react'
import {withTheme} from 'theming'
import styled from 'styled-jss'

import {PolynomialRegression} from '../../polynomial-regression'

export let ModelTab = withTheme(observer((props) =>
<div>
model
<PolynomialRegression/>
</div>
))
