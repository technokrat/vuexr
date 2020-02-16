import {drawVideoFrameToCanvas} from "./helpers";

const DEFAULTS = {
  constraints: {
    audio: false,
    video: {facingMode: 'environment', width: 640, height: 360}
    //video: {facingMode: 'environment'}
  }
};

export default class CameraFeed {
  constructor(videoElement, canvas, session, options) {
    this.videoElement = videoElement;
    this.canvas = canvas;
    this.session = session;
    this.options = {...DEFAULTS, options};
    this.imageCapture = null;
  }

  async load() {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia(this.options.constraints)
      const track = mediaStream.getVideoTracks()[0]; // https://developer.mozilla.org/en-US/docs/Web/API/ImageCapture
      this.imageCapture = new ImageCapture(track);

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
