import cv from './opencv.js';

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
  }

  load() {
    navigator.mediaDevices.getUserMedia(this.options.constraints).then((mediaStream) => {
      const track = mediaStream.getVideoTracks()[0]; // https://developer.mozilla.org/en-US/docs/Web/API/ImageCapture
      this.imageCapture = new ImageCapture(track);

      this.videoElement.srcObject = mediaStream;
      this.videoElement.onloadedmetadata = (e) => {
        this.videoElement.play();
      };

      cv['onRuntimeInitialized'] = () => {
        this.processOpenCV();
      };


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

  processOpenCV() {
    this.imageCapture.grabFrame()
      .then(imageBitmap => {
        this.drawFrameToCanvas(this.canvas, imageBitmap);

        let mat = cv.imread(this.canvas);
        let grayImage = new cv.Mat();
        cv.cvtColor(mat, grayImage, cv.COLOR_BGR2GRAY, 0);

        cv.imshow(this.canvas, grayImage);
        this.processOpenCV();
      });
  }
}
