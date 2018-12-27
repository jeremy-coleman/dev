import * as React from 'react'

import { hot } from 'react-hot-loader';
import {MineSweeper} from './minesweeper'


// export function Hello(){
//  return  <div>hiz</div>
// }

class _MyAppBase extends React.Component {
    public render(): JSX.Element {
        return (
          <div>
          <MineSweeper rows={16} cols={24} totalBombs={12}/>
          </div>
                

        );
    }
}

export let MyAppBase = hot(module)(_MyAppBase)

//@ts-ignore
if (module.hot){module.hot.accept()}