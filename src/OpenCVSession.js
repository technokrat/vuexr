import cv from '../src/opencv.js';

export default class OpenCVSession {
  constructor() {
    this.initialized = false;

    cv['onRuntimeInitialized'] = () => {
      this.initialized = true;

      console.log(cv);
    };
  }

  grayOut(canvas) {
    if (this.initialized) {
      let mat = cv.imread(canvas);
      let grayImage = new cv.Mat();
      cv.cvtColor(mat, grayImage, cv.COLOR_BGR2GRAY, 0);
      //cv.detectMarkers();
      cv.imshow(canvas, grayImage);

      mat.delete();
      grayImage.delete();
    }
  }

  calibrate(canvas) {
    if (this.initialized) {
      let objpt = [];
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 6; j++) {
          objpt.push(cv.Point(2.5 * i, 2.5 * j, 0))
        }
      }

      let objectPoints = [];
      let imagePoints = [];

      const size = new cv.Size(9, 6);
      let mat = cv.imread(canvas);
      const corners = cv.findChessboardCorners(size);
      if (corners.returnValue) {
        objectPoints = objectPoints.concat(objpt);
        imagePoints = imagePoints.concat(corners.corners);
      }
    }
  }
}
