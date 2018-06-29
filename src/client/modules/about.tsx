import * as React from 'react'
import {observer} from 'mobx-react'

export let AboutPage = observer((props) =>
<div><SettingsKeybindings/></div>
)



import {KeyCombo} from '@blueprintjs/core';

export class SettingsKeybindings extends React.Component {
  render() {
    return (
      <div style={{width: '100%', height: '100vh'}}>
        <input
          style={{width: '80%', display:'block'}}
          className='pt-input'
          type='text'
          placeholder='Search for keybinding...'
        />
        <table className='pt-table pt-small pt-interactive'style={{width: '100%',height: '100vh',overflowY: 'scroll'}}>
          <thead>
          <tr>
            <th>Keybinding</th>
            <th>Command</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td><KeyCombo combo="ctrl + 1" /></td>
            <td>Switch to tab 1</td>
          </tr>
          <tr>
            <td><KeyCombo combo="ctrl + 2" /></td>
            <td>Switch to tab 2</td>
          </tr>
          <tr>
            <td><KeyCombo combo="ctrl + 3" /></td>
            <td>Switch to tab 3</td>
          </tr>
          <tr>
            <td><KeyCombo combo="ctrl + 4" /></td>
            <td>Switch to tab 4</td>
          </tr>
          <tr>
            <td><KeyCombo combo="ctrl + 5" /></td>
            <td>Switch to tab 5</td>
          </tr>
          <tr>
            <td><KeyCombo combo="ctrl + 6" /></td>
            <td>Switch to tab 6</td>
          </tr>
          <tr>
            <td><KeyCombo combo="ctrl + 7" /></td>
            <td>Switch to tab 7</td>
          </tr>
          <tr>
            <td><KeyCombo combo="ctrl + 8" /></td>
            <td>Switch to tab 8</td>
          </tr>
          <tr>
            <td><KeyCombo combo="ctrl + 9" /></td>
            <td>Switch to tab 9</td>
          </tr>
          <tr>
            <td><KeyCombo combo="ctrl + 0" /></td>
            <td>Switch to the last tab</td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
