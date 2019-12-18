import cv from '../src/opencv.js';

export default class CVMarkerTracker {
  constructor() {
    this.initialized = false;

    cv['onRuntimeInitialized'] = () => {
      this.initialized = true;
      console.log(cv);
    };
  }

  process(canvas) {
    if (this.initialized) {
      let mat = cv.imread(canvas);
      let grayImage = new cv.Mat();
      cv.cvtColor(mat, grayImage, cv.COLOR_BGR2GRAY, 0);
      cv.detectMarkers();
      cv.imshow(canvas, grayImage);
    }
  }
}
