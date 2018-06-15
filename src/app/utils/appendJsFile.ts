export function appendJsFile(url, callback) {
  var s = document.createElement('script'),
    head = document.getElementsByTagName('head')[0];
  s.type = 'text/javascript';
  s.charset = 'utf-8';
  s.src = url;
  s.onload = () => {
    callback && callback();
  };
  head.insertBefore(s, head.firstChild);
  return s;
}