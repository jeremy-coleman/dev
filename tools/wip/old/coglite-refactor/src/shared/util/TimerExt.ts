

export const TimerExt = (audioCtx) => {
    var fn: any
    var ms: any
    var frameCount = 1000;

    this.audioCtx = audioCtx;
    this.id = 1;
    this.status = {};
    this.arrayBuffer = this.audioCtx.createBuffer(2, frameCount, this.audioCtx.sampleRate);
  

  let setTimeout = (fn, ms) => {
    var id = this.id ++;
    var source = this.audioCtx.createBufferSource();

    this.status[id] = true;

    source.buffer = this.arrayBuffer;
    source.loop = true;
    source.connect(this.audioCtx.destination);
    source.onended = () => {
      if (this.status[id]) {
        this.clearTimeout(id);
        fn();
      }
    };

    source.start();
    source.stop(this.audioCtx.currentTime + (ms / 1000));

    return id;
  }

  let setInterval = (fn, ms) => {
    var id = this.id ++;
    var compositeFn = () => {
      if (this.status[id]) {
        fn();
        this.setTimeout(compositeFn, ms);
      }
    };

    this.status[id] = true;
    this.setTimeout(compositeFn, ms);

   return id;
  }

  var clearTimeout = (id) => 
    delete this.status[id];
  

 var clearInterval= (id) => 
    this.clearTimeout(id);
  
}