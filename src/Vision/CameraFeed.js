import {drawVideoFrameToCanvas} from "./helpers";

const DEFAULTS = {
  constraints: {
    audio: false,
    video: {facingMode: 'environment', width: 640, height: 360}
  }
};

export default class CameraFeed {
  constructor(session, canvas, options) {
    this.session = session;
    this.canvas = canvas;
    this.options = {...DEFAULTS, options};

    this.videoElement = document.createElement('video');
    this.imageCapture = null;
  }

  static supported () {
    if (navigator.mediaDevices && ImageCapture) {
      return true;
    } else {
      false;
    }
  }

  async load() {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia(this.options.constraints)
      const track = mediaStream.getVideoTracks()[0];
      this.imageCapture = new ImageCapture(track);  // https://developer.mozilla.org/en-US/docs/Web/API/ImageCapture

      this.videoElement.srcObject = mediaStream;
      this.videoElement.onloadedmetadata = (e) => {
        this.videoElement.play();
        this.canvas.width = this.videoElement.videoWidth;
        this.canvas.height = this.videoElement.videoHeight;

        this.loop()
      };
    }
    catch (e) {
      console.error('Could not load camera feed!')
    }
  }

  loop() {
    this.imageCapture.grabFrame()
      .then(imageBitmap => {
        drawVideoFrameToCanvas(this.canvas, imageBitmap);
        this.session.process();
        if (!this.destroyed) {
          window.requestAnimationFrame(() => {
            this.loop();
          });
        }
      });
  }

  destroy() {
    this.destroyed = true
  }
}
