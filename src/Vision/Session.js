import cv from '../../vendor/opencv.js';
import Calibration from './Calibration';
import Detector from './Detector';
import {readImage, showImage} from "./helpers";
import CameraFeed from './CameraFeed';
import Poser from "./Poser";
import MotionEstimator from "./MotionEstimator";

export default class Session {
  constructor(videoElement, canvas, eventCallback) {
    this.canvas = canvas;
    this.eventCallback = eventCallback
    this.feed = new CameraFeed(videoElement, canvas, this)
    this.initialized = false;
    this.state = 'CALIBRATION';
    this.poser = new Poser(this);
    this.motion = new MotionEstimator(this);

    cv['onRuntimeInitialized'] = () => {
      this.initialized = true;

      this.calibration = new Calibration(this);
      this.detector = new Detector(this, this.calibration);

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
    //this.calibration.calibrate({width: 1.0, height: this.canvas.height / this.canvas.width})
    this.state = "DETECTION"
  }

  resetCalibration () {
    this.calibration.resetCalibrationPoints()
    this.calibration.resetCameraCalibration()

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
