import * as React from 'react';
import MainTabs from './components/MainTabs';
import JupyterLauncher from './JupyterLauncher';


class App extends React.Component {
	launcher: JupyterLauncher;

	constructor(props) {
		super(props);
		this.launcher = new JupyterLauncher();
	}

	componentDidMount() {
		document.title = "Jupyter Mate version 0 "
	}

  render() {
    return <MainTabs launcher={this.launcher} />
  }
}

export default App;