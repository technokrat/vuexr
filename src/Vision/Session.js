import cv from '../../vendor/opencv.js';
import Calibration from './Calibration';
import Detector from './Detector';
import {readImage, showImage} from "./helpers";
import CameraFeed from './CameraFeed';
import Poser from "./Poser";
import MotionEstimator from "./MotionEstimator";

export default class Session {
  constructor() {
    this.cv = null;
    this.initialized = false;
    this.state = 'CALIBRATION';
    this.poser = new Poser(this);
    this.motion = new MotionEstimator(this);

    this.worker = new Worker("worker.js");
    this.worker.onmessage = msg => {
      if (msg.data.operation === 'DETECT') {
        this.detector.detectionFinished(msg.data)
      }
    };

    cv['onRuntimeInitialized'] = () => {
      this.cv = cv;
      this.calibration = new Calibration(this);
      this.detector = new Detector(this, this.calibration);

      if (this.calibration.cameraMatrix && this.state === 'CALIBRATION') {
        this.state = 'DETECTION'
      }

      this.initialized = true;
      this.eventCallback({name: 'visionInitialized'})
    };
  }

  run (videoElement, canvas, eventCallback) {
    this.canvas = canvas;
    this.eventCallback = eventCallback;
    this.feed = new CameraFeed(videoElement, canvas, this);
    this.feed.load();
    this.motion.run();
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
