import 'tslib'
import 'reflect-metadata'
import { remote } from 'electron';
import * as React from 'react';
import { render } from 'react-dom';

//import Button from './components/Button';

import {Button} from '@coglite/button';

const main = remote.require("./main").FuseBox.main("default/project/desktop/main.js");

interface Props {
}
interface State {
  body: string;
}

class Main extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      body: "hello world",
    };
  }

  render(): JSX.Element {
    const {body} = this.state;

    return (
      <div>
        <h1>sample app</h1>
        <p>{body}</p>
        <Button onClick={this.handleClick}>styled button</Button>
      </div>
    );
  }

  handleClick() {
    alert(main.fn());
  }
}

render(<Main />, document.getElementById("root"));
