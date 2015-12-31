# OUROBOROS AUDIO WORKER

## Installation

```
$ npm install ouroboros-audio-worker
```

## API

- `run(audioContext: AudioContext, mainThread: function, workerThread: function): void`

## Example

```js
const OuroborosAudioWorker = require("ouroboros-audio-worker");
const AudioContext = global.AudioContext || global.webkitAudioContext;

function mainThread(worker, audioContext) {
  worker.postMessage("hello!"); // (1) send to the worker
  worker.onmessage = function(e) { // (4) receive from the worker
    console.log(e.data); // → good bye!    
  };
}

function workerThread(self) {
  self.onmessage = function(e) { // (2) receive from the main thread
    console.log(e.data); // → hello!
    self.postMessage("good bye!"); // (3) send to the main thread
  }
}

let audioContext = AudioContext ? new AudioContext() : null;

OuroborosAudioWorker.run(audioContext, mainThread, workerThread);
```

## License

MIT
