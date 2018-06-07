import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {observable} from 'mobx'
import {
  AngularWidget
} from '../loader';

import {
  TestComponent
} from './app.component';

import {
  TestModule
} from './app.module';


//const TestObject = new AngularWidget<TestComponent, TestModule>(TestComponent, TestModule);

interface IProps{
  name: string
}

export class TestJSX extends React.Component<IProps, any> {
 TestObject = new AngularWidget<TestComponent, TestModule>(TestComponent, TestModule);

  constructor(props) {
    super(props);

    this.TestObject.componentReady.promise.then(() => {
     this.TestObject.ngZone.run(() => {
       this.TestObject.componentInstance.color = this.props.name
        //console.log(this.componentInstance)
      });
    });

  }

  
  render() {
    return ([
      <div>
        {[this.TestObject.foundNode]}
        </div>

    ]);
  }
}

//import '../style/index.css';

//export const TestWidget = new AngularWidget<TestComponent, TestModule>(TestComponent, TestModule);



interface ITestJSX {
  name?: string
}
/*
export class TestJSX extends AngularWidget<TestComponent, TestModule> {


  constructor(TestComponent, TestModule, props) {
    super(TestComponent, TestModule, props);

    //const node = document.createElement('div')

    //const testNode = ReactDOM.findDOMNode(TestWidget)

    this.componentReady.promise.then(() => {
     this.ngZone.run(() => {
       let thisWidget = ReactDOM.findDOMNode(this.node)
       //this.componentInstance = this.node
        //console.log(this.componentInstance)
      });
    });

  }
  render() {
    const {name} = this.props
    return (

        <div>hi {thisWidget.name}</div>

    );
  }
}*/


/*
class ContentWidget extends React.Component<AngularWidget<TestComponent, TestModule>> {
  node: Element;
   //node = React.createRef<Element>();


  constructor(props, name: string) {
    super(props);

    const testNode = ReactDOM.findDOMNode(this.node)

    this.props.componentReady.promise.then(() => {
      this.props.ngZone.run(() => {
        this.props.componentInstance.color = name.toLowerCase();
      });
    });
  }

    render(){
      return(
        <div ref={testNode}>
          <div>
            <input></input>
            </div>
            </div>
      )
    }
  }
*/


