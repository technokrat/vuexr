import cv from '../../vendor/opencv.js';
import Calibration from './Calibration';
import Detector from './Detector';
import {readImage, showImage} from "./helpers";
import CameraFeed from './CameraFeed';
import Poser from "./Poser";
import MotionEstimator from "./MotionEstimator";
import WebXR from "./WebXR";

export default class Session {
  constructor(videoElement, canvas, eventCallback) {
    this.cv = null;
    this.initialized = false;
    this.canvas = canvas;
    this.eventCallback = eventCallback;
    this.feed = new CameraFeed(videoElement, canvas, this);
    this.state = 'CALIBRATION';
    this.poser = new Poser(this);
    this.motion = new MotionEstimator(this);
    this.xr = new WebXR(this);

    this.worker = new Worker("worker.js");
    this.worker.onmessage = msg => {
      if (msg.data.operation === 'DETECT') {
        this.detector.detectionFinished(msg.data)
      }
    };

    cv['onRuntimeInitialized'] = () => {
      this.initialized = true;
      this.cv = cv;
      console.log(cv)
      this.calibration = new Calibration(this);
      this.detector = new Detector(this, this.calibration);

      if (this.calibration.cameraMatrix && this.state === 'CALIBRATION') {
        this.state = 'DETECTION'
      }

      console.log("Initialized OpenCV");
    };

    this.feed.load();
  }

  async enter() {
    await this.xr.enterXR();
  }

  calibrate() {
    this.calibration.calibrate({width: this.canvas.width, height: this.canvas.height});
    //this.calibration.calibrate({width: 1.0, height: this.canvas.height / this.canvas.width})
    this.state = "DETECTION"
  }

  resetCalibration () {
    this.calibration.resetCalibrationPoints();
    this.calibration.resetCameraCalibration();

    this.state = "CALIBRATION"
  }

  process () {
    if (this.initialized) {
      if (this.state === 'CALIBRATION') {
        const frame = readImage(this.canvas);
        this.calibration.findChessBoardCorners(frame);
        showImage(this.canvas, frame);
        frame.delete();
      } else if (this.state === 'DETECTION') {
        //const rgbFrame = this.detector.detect(frame)
        //showImage(this.canvas, rgbFrame);
        //rgbFrame.delete()
        this.detector.detect()
      }
    }
  }
}
