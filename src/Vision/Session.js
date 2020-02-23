import cv from '../../vendor/opencv.js';
import Calibration from './Calibration';
import Detector from './Detector';
import {readImage, showImage} from "./helpers";
import CameraFeed from './CameraFeed';
import Poser from "./Poser";
import MotionEstimator from "./MotionEstimator";

export default class Session {
  constructor(name = 'default') {
    this.initialized = false;
    this.name = name;
    this.state = 'CALIBRATION';
    this.feed = new CameraFeed(this);
    this.poser = new Poser(this);
    this.motion = new MotionEstimator(this);
    this.calibration = new Calibration(this);
    this.detector = new Detector(this);
    this.workerStatus = {error: null, initialized: false};
    this.eventCallback = null;
  }

  async init (canvas, eventCallback) {
    this.canvas = canvas
    this.eventCallback = eventCallback

    if (!this.initialized) {
      await Promise.all([
        this.feed.init(),
        this.motion.init(),
        this.initWorker()
      ])
      this.initialized = true;
    }

    this.eventCallback({name: 'statusChanged'})
  }

  async initWorker () {
    return new Promise((resolve, reject) => {
      this.worker = new Worker("worker.js");
      this.worker.onmessage = msg => {
        if (msg.data.operation === 'WORKER_READY') {
          this.initialized = true;
          this.workerStatus = {error: null, initialized: true};
          resolve();
        } else if (msg.data.operation === 'WORKER_FAILED') {
          this.workerStatus = {error: "WorkerFailed", initialized: false};
          resolve();
        } else {
          this.workerHandler(msg)
        }
      };
    })
  }

  workerHandler(msg) {
    if (msg.data.operation === 'DETECT') {
      this.detector.detectionFinished(msg.data)
    } else if (msg.data.operation === 'FIND_CHESSBOARD_CORNERS_CAPTURED') {
      this.calibration.findChessBoardCornersCaptured()
    } else if (msg.data.operation === 'FIND_CHESSBOARD_CORNERS_READY') {
      this.calibration.findChessBoardCornersCaptureReady()
    } else if (msg.data.operation === 'FIND_CHESSBOARD_CORNERS_NOT_READY') {
      this.calibration.findChessBoardCornersCaptureNotReady()
    }
  }

  run (selected = null) {
    this.feed.run();
    this.motion.run();
  }

  pause () {
    this.feed.stop();
    this.motion.stop();
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
