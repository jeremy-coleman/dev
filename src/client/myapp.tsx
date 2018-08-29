import * as React from 'react'

import { hot } from 'react-hot-loader';

export function Hello(){
 return  <div>hizz</div>
}

class _MyAppBase extends React.Component {
    public render(): JSX.Element {
        return (
          <div>
          <Hello/>
          </div>
                

        );
    }
}

export let MyAppBase = hot(module)(_MyAppBase)
