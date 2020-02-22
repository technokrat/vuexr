import cv from '../../vendor/opencv.js';
import Calibration from './Calibration';
import Detector from './Detector';
import {readImage, showImage} from "./helpers";
import CameraFeed from './CameraFeed';
import Poser from "./Poser";
import MotionEstimator from "./MotionEstimator";

export default class Session {
  constructor() {
    this.initialized = false;
    this.state = 'CALIBRATION';
    this.poser = new Poser(this);
    this.motion = new MotionEstimator(this);
    this.calibration = new Calibration(this);
    this.detector = new Detector(this, this.calibration);

    if (this.calibration.cameraMatrix && this.state === 'CALIBRATION') {
      this.state = 'DETECTION'
    }

    this.worker = new Worker("worker.js");
    this.worker.onmessage = msg => {
      if (msg.data.operation === 'DETECT') {
        this.detector.detectionFinished(msg.data)
      } else if (msg.data.operation === 'WORKER_READY') {
        this.initialized = true;
        this.eventCallback({name: 'visionInitialized'})
      } else if (msg.data.operation === 'FIND_CHESSBOARD_CORNERS_CAPTURED') {
        this.calibration.findChessBoardCornersCaptured()
      } else if (msg.data.operation === 'FIND_CHESSBOARD_CORNERS_READY') {
        this.calibration.findChessBoardCornersCaptureReady()
      } else if (msg.data.operation === 'FIND_CHESSBOARD_CORNERS_NOT_READY') {
        this.calibration.findChessBoardCornersCaptureNotReady()
      }
    };
  }

  run (canvas, eventCallback) {
    this.canvas = canvas;
    this.eventCallback = eventCallback;
    this.feed = new CameraFeed(this, canvas, {});
    this.feed.load();
    this.motion.run();
  }

  pause () {
    this.paused = true;
  }

  calibrate() {
    this.calibration.calibrate({width: this.canvas.width, height: this.canvas.height});
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
        this.calibration.findChessBoardCorners();
      } else if (this.state === 'DETECTION') {
        this.detector.detect()
      }
    }
  }
}
