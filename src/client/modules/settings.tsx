import * as React from "react"

import {MineSweeper} from '@coglite/samples/minesweeper'
import './minesweeper/assets/minesweeper.css'

export let SettingsPage = () => 
<div>
<h3>settings</h3>
 <MineSweeper rows={16} cols={24} totalBombs={12} />
</div>


//export let SettingsPage = () => <div>Settings</div>
