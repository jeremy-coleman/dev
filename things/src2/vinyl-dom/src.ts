//var VFile = require('vinyl');
//import * as Vinyl from 'vinyl'



var Readable = require('stream').Readable;
var VFile = require('vinyl')


export function src(element) {

  var stream = new Readable({ objectMode: true });
  //var stream = new ReadableStream(element);
  var value;

  if (typeof element === 'string') {
    element = document.querySelector(element);
  }

  if (element) {
    value = element.value || element.innerHTML;
    stream.push(new VFile({
      path: element.id || '',
      contents: new Buffer(value)
    }));
  }

  stream.push(null);
  return stream;

}



/**
 * Creates a stream out of the inner HTML or value of a DOM element.
 * @param {string|object} - CSS selector or DOM element to use.
 */
