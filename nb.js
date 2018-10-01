// //var fs = require('fs')

// var x = require('./examples/md.ipynb')

// //var input = JSON.parse(fs.readFileSync(process.argv[2]))
// var input = JSON.parse(fs.readFileSync('./md.json'))

// //console.log(input)
// console.log(JSON.stringify(input))


const loadJsonFile = require('load-json-file');

loadJsonFile('md.ipynb').then(json => {
	console.log(json);
	//=> {foo: true}
});