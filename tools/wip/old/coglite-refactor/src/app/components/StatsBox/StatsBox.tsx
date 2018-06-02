import * as React from 'react'

type StatsBoxProps = {
  className?: string
  withBorders?: true
  withHorizontalLines?: true
}

export let StatsBox: React.StatelessComponent<StatsBoxProps> = ({children, className, withBorders, withHorizontalLines}) =>
  <table className={
    'StatsBox'
    + (className ? ` ${className}` : '')
    + (withBorders ? ' -withBorders' : '')
    + (withHorizontalLines ? ' -withHorizontalLines' : '')
  }>
    <tbody>{children}</tbody>
  </table>
