import {drawVideoFrameToCanvas} from "./helpers";

const DEFAULTS = {
  constraints: {
    audio: false,
    video: {facingMode: 'environment'}
  }
};

export default class CameraFeed {
  constructor(session, options) {
    this.session = session;
    this.options = {...DEFAULTS, options};

    this.paused = false;

    this.mediaStream = null;
    this.track = null;
    this.camera = null;
    this.videoElement = document.createElement('video');
    this.imageCapture = null;

    this.feedStatus = {
      error: null,
      available: [],
      selected: null
    }
  }

  async init () {
    try {
      const available = await this.listAvailable();
      const selected = this.loadCamera();
      this.feedStatus = {
        error: null,
        available,
        selected
      }
    } catch (e) {
      this.feedStatus = {
        error: e,
        available: [],
        selected: null
      }
    }
  }

  loadCamera () {
    let camera = window.localStorage.getItem(`vuexr/${this.session.name}/camera`);
    if (camera) {
      camera = JSON.parse(camera);
      return camera
    } else {
      return null
    }
  }

  storeCamera () {
    if (this.feedStatus.selected) {
      window.localStorage.setItem(`vuexr/${this.session.name}/camera`, JSON.stringify(this.feedStatus.selected));
      return true
    } else {
      return false
    }
  }

  stop () {
    if (this.mediaStream) {
      window.cancelAnimationFrame(this.animationFrameRequest)
      this.track.stop();
      this.track = null;
      this.mediaStream = null;
      this.imageCapture = null;
    }
  }

  async selectCamera (id) {
    this.stop();
    this.feedStatus.selected = id;
    this.storeCamera();
    await this.run();

    this.session.eventCallback({name: 'statusChanged'});
  }

  async listAvailable () {
    if (navigator.mediaDevices && ImageCapture) {
      const streams = await navigator.mediaDevices.enumerateDevices();
      return streams.filter(stream => stream.kind === 'videoinput');
    }

    return [];
  }

  async run() {
    try {
      if (this.feedStatus.selected) {
        this.mediaStream = await navigator.mediaDevices.getUserMedia({video: { deviceId: this.feedStatus.selected }})
      } else {
        this.mediaStream = await navigator.mediaDevices.getUserMedia(this.options.constraints);
      }

      this.track = this.mediaStream.getVideoTracks()[0];
      this.feedStatus.selected = this.track.getSettings().deviceId
      this.storeCamera();
      this.session.eventCallback({name: 'statusChanged'});

      this.session.calibration.loadCameraCalibration()

      this.imageCapture = new ImageCapture(this.track);  // https://developer.mozilla.org/en-US/docs/Web/API/ImageCapture

      this.videoElement.srcObject = this.mediaStream;
      this.videoElement.onloadedmetadata = (e) => {
        this.videoElement.play();
        this.session.canvas.width = this.videoElement.videoWidth;
        this.session.canvas.height = this.videoElement.videoHeight;

        this.loop()
      };
    }
    catch (e) {
      console.error(e)
    }
  }

  loop() {
    if (this.imageCapture) {
      this.imageCapture.grabFrame()
        .then(imageBitmap => {
          drawVideoFrameToCanvas(this.session.canvas, imageBitmap);
          this.session.process();
          if (!this.paused) {
            this.animationFrameRequest = window.requestAnimationFrame(() => {
              this.loop();
            });
          }
        }).catch(() => {

      });
    }
  }
}
