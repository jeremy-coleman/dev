import  {AppBar}  from 'material-ui'
import FlatButton from 'material-ui/FlatButton'
import * as React from 'react'

export let Header = () =>
  <AppBar
    className='Header'
    title='Coglite'
    iconElementRight={
      <FlatButton
        href='https://github.com/coglite/coglite-desktop'
        label='Github'
        style={{ color: '#fff' }}
        target='_blank'
      />
    }
    style={{
      backgroundColor: '#607D8B'
    }}
  />

