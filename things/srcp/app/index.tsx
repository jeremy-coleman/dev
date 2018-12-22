import {render, h} from 'preact'


var root = document.createElement('div')
root.id = 'root'
document.body.appendChild(root)
let elem, App;
function init() {
	App = require('./main').default;
	elem = render(App, root, elem);
}

init()

	// use preact's devtools
require('preact/devtools');
	// listen for HMR
if ((module as any).hot) {
		(module as any).hot.accept('./main', init);
}

//@ts-ignore
//module.hot.accept()