const spawn = require('child_process').spawn;
const electron = require('electron')

function getFileSize(filePath) {
  var size = fs.statSync(filePath).size;
  var i = Math.floor( Math.log(size) / Math.log(1024) );
  //@ts-ignore
  return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
}

class FileSizePlugin {
 fileSize;

        constructor(fileSize) {
         this.filePath = filePath
      }
      
      apply(compiler) {
          compiler.hooks.afterEmit.tap('file-size-plugin', () => {
            getFileSize(filePath)
          }
        )
      }
}

module.exports = FileSizePlugin