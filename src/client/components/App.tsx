import * as React from 'react';


let appHeaderStyles =  {
  backgroundColor: 'rgb(26, 196, 40)',
  height: '150px',
  padding: '20px',
  color: 'blue'
}

//0 kb dev overhead
//123kb vs 190.9kb for prod
import {observer, inject} from 'mobx-react'

type Props = {
  actionStore: any
};

@inject('actionStore')
@observer
class App extends React.Component<any, any> {
  render () {
    return (
   <div>
    <ul>
      <li>inlined image:<div className="inline"></div></li>
      <li>copied image:<div className="copy"></div></li>
    </ul>
      <div className='App'>
        <div style={appHeaderStyles}>
          <svg className='App-logo' />
          <h1>React Browserify Demo {this.props.actionStore.instructionMsg}</h1>
        </div>
        <p className='App-intro'>
          <button 
            style={{background: 'green', color: 'blue', width: '100px', height: '50px'}}
            onClick={this.props.actionStore.sayAloha}
          >{this.props.actionStore.buttonMsg}
          </button>
        </p>
      </div>
    </div>
    );
  }
}

export {App}



//export let App = hot(module)(AppBase)
//          <img src='assets/images/logo.svg' alt='logo' className='App-logo' />
//        <div className='App-header'>
//        <div className='App-header' style={appHeaderStyles}>