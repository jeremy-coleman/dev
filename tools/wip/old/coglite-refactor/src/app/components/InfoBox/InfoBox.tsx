import * as React from 'react'

type Props = {
  large?: true
}

export let InfoBox: React.StatelessComponent<Props> = ({ children, large }) =>
  <div className={'InfoBox' + (large ? ' -Large' : '')}>
    {children}
  </div>
