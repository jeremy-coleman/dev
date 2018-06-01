import { MenuItem, SelectField } from 'material-ui'
import * as React from 'react'

export let FieldSelector: any = (): any =>
  <SelectField value='data'>
    <MenuItem value='data' primaryText='data' />
  </SelectField>
