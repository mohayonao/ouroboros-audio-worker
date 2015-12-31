var AudioContext = global.AudioContext || global.webkitAudioContext;
var WORKER_ENABLED = !!(AudioContext && global === global.window && global.URL && global.Worker);
var IN_WORKER_CONTEXT = !!(global === global.self && global.location);

var pathname = WORKER_ENABLED && (function() {
  var scripts = global.document.getElementsByTagName("script");
  var script = scripts[scripts.length - 1].src;

  return new global.URL(script).pathname;
})();

function run(audioContext, mainThread, workerThread) {
  if (WORKER_ENABLED && audioContext && typeof audioContext.createAudioWorker === "function") {
    return audioContext.createAudioWorker(pathname).then(function(worker) {
      return mainThread(worker, audioContext);
    });
  }
  if (IN_WORKER_CONTEXT) {
    return workerThread(global.self);
  }
  throw new Error("AudioWorker is not supported in this environment")
}

module.exports = { run: run };
