var shell = require('shelljs')
var jupyterCheck = shell.which('python')

//var jupyterExecPath = jupyterCheck.stdout

var jupyterCheck = shell.which('jupyter')
//var jupyterExecPath = jupyterCheck.stdout
console.log(jupyterCheck)