import cv from '../../vendor/opencv.js';
import Calibration from './Calibration';
import Detector from './Detector';
import {readImage, showImage} from "./helpers";
import CameraFeed from './CameraFeed';

export default class Session {
  constructor(videoElement, canvas) {
    this.canvas = canvas;
    this.feed = new CameraFeed(videoElement, canvas, this)
    this.initialized = false;
    this.state = 'CALIBRATION';

    cv['onRuntimeInitialized'] = () => {
      this.initialized = true;

      this.calibration = new Calibration();
      this.detector = new Detector(this.calibration);

      if (this.calibration.cameraMatrix) {
        this.state = 'DETECTION'
      }

      console.log("Initialized OpenCV");
      console.log(cv)
    };

    this.feed.load();
  }

  calibrate() {
    this.calibration.calibrate({width: this.canvas.width, height: this.canvas.height})
    this.state = "DETECTION"
  }

  resetCalibration () {
    this.calibration.removeCalibrationPoints()
    this.calibration.removeCalibrationData()
    this.state = "CALIBRATION"
  }

  process () {
    if (this.initialized) {
      const frame = readImage(this.canvas)
      if (this.state === 'CALIBRATION') {
        this.calibration.findChessBoardCorners(frame)
        showImage(this.canvas, frame);
      } else if (this.state === 'DETECTION') {
        const rgbFrame = this.detector.detect(frame)
        showImage(this.canvas, rgbFrame);
        rgbFrame.delete()
      }


      frame.delete();
    }
  }
}
