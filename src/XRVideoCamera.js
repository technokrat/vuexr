import OpenCVSession from './OpenCVSession.js'

const DEFAULTS = {
  constraints: {
    audio: false,
    video: {facingMode: 'environment', height: 720, width: 1280}
  }
};

export default class XRVideoCamera {

  constructor(videoElement, canvas, options) {
    this.videoElement = videoElement;
    this.canvas = canvas;
    this.options = {...DEFAULTS, options};
    this.imageCapture = null;

    this.opencv = new OpenCVSession();
  }

  load() {
    navigator.mediaDevices.getUserMedia(this.options.constraints).then((mediaStream) => {
      const track = mediaStream.getVideoTracks()[0]; // https://developer.mozilla.org/en-US/docs/Web/API/ImageCapture
      this.imageCapture = new ImageCapture(track);

      this.videoElement.srcObject = mediaStream;
      this.videoElement.onloadedmetadata = (e) => {
        this.videoElement.play();
        this.canvas.width = this.videoElement.videoWidth;
        this.canvas.height = this.videoElement.videoHeight;
      };

      window.requestAnimationFrame(() => {this.processCalibration();});
    })
  }

  drawFrameToCanvas(canvas, img) {
    canvas.width = getComputedStyle(canvas).width.split('px')[0];
    canvas.height = getComputedStyle(canvas).height.split('px')[0];
    let ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
    let x = (canvas.width - img.width * ratio) / 2;
    let y = (canvas.height - img.height * ratio) / 2;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height,
      x, y, img.width * ratio, img.height * ratio);
  }

  process() {
    this.imageCapture.grabFrame()
      .then(imageBitmap => {
        this.drawFrameToCanvas(this.canvas, imageBitmap);

        this.opencv.grayOut(this.canvas);

        window.requestAnimationFrame(() => {this.process();});
      });
  }

  processCalibration() {
    this.imageCapture.grabFrame()
      .then(imageBitmap => {
        this.drawFrameToCanvas(this.canvas, imageBitmap);

        this.opencv.calibrate(this.canvas);

        window.requestAnimationFrame(() => {this.processCalibration();});
      });
  }
}
