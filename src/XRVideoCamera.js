import OpenCVSession from './OpenCVSession.js'

const DEFAULTS = {
  constraints: {
    audio: false,
    video: {facingMode: 'environment', width: 1280, height: 720}
  }
};

export default class XRVideoCamera {

  constructor(videoElement, canvas, options) {
    this.videoElement = videoElement;
    this.canvas = canvas;
    this.options = {...DEFAULTS, options};
    this.imageCapture = null;
    this.calibrated = false;

    this.opencv = new OpenCVSession();
  }

  async load() {
    const mediaStream = await navigator.mediaDevices.getUserMedia(this.options.constraints)
    const track = mediaStream.getVideoTracks()[0]; // https://developer.mozilla.org/en-US/docs/Web/API/ImageCapture
    this.imageCapture = new ImageCapture(track);

    this.videoElement.srcObject = mediaStream;
    this.videoElement.onloadedmetadata = (e) => {
      this.videoElement.play();
      this.canvas.width = this.videoElement.videoWidth;
      this.canvas.height = this.videoElement.videoHeight;
    };
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

  // process() {
  //   this.imageCapture.grabFrame()
  //     .then(imageBitmap => {
  //       this.drawFrameToCanvas(this.canvas, imageBitmap);
  //
  //       //this.opencv.grayOut(this.canvas);
  //
  //       window.requestAnimationFrame(() => {this.process();});
  //     });
  // }

  startFindChessboardCorners(callback) {
    this.imageCapture.grabFrame()
      .then(imageBitmap => {
        this.drawFrameToCanvas(this.canvas, imageBitmap);

        const result = this.opencv.findChessBoardCorners(this.canvas);

        if (result && callback) {
          callback(result);
        }

        if (!this.destroyed && !this.calibrated) {
          window.requestAnimationFrame(() => {this.startFindChessboardCorners(callback);});
        }
      });
  }

  startDetectAruco() {
    this.imageCapture.grabFrame()
      .then(imageBitmap => {
        this.drawFrameToCanvas(this.canvas, imageBitmap);

        const result = this.opencv.detectAruco(this.canvas);

        if (!this.destroyed) {
          window.requestAnimationFrame(() => {this.startDetectAruco();});
        }
      });
  }

  captureCalibrationPoints(points) {
    this.opencv.captureCalibrationPoints(points)
  }

  resetCalibrationPoints() {
    this.opencv.resetCalibrationPoints()
  }

  calibrate() {
    this.opencv.calibrate({width: this.videoElement.videoWidth, height: this.videoElement.videoHeight})
    this.calibrated = true
  }

  destroy() {
    this.destroyed = true
  }
}
