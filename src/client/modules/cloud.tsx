import * as React from "react"
import {MineSweeper} from '@coglite/samples/minesweeper'
import './minesweeper/assets/minesweeper.css'

export let CloudPage = () => 
<div>
 <MineSweeper rows={16} cols={24} totalBombs={12} />
</div>
