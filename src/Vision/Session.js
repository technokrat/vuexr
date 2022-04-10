import Calibration from './Calibration';
import Detector from './Detector';
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

    this.focusEventRegistration = async () => {
      await this.feed.run();
      await this.motion.run();
    };

    this.blurEventRegistration = () => {
      this.feed.stop();
      this.motion.stop();
    };

    this.setup = {
      show: true
    }

    this.calibration.loadCameraCalibration();
  }

  loadSetup () {
    let setup = window.localStorage.getItem(`vuexr/${this.name}/setup`);
    if (setup) {
      setup = JSON.parse(setup);
      return setup
    } else {
      return {
        show: true
      }
    }
  }

  storeSetup () {
    window.localStorage.setItem(`vuexr/${this.name}/setup`, JSON.stringify(this.setup));
  }

  showSetup (show) {
    this.setup.show = show;
    this.storeSetup();
    this.eventCallback({name: 'statusChanged'})
  }

  async init (canvas, eventCallback) {
    this.setup = this.loadSetup();
    this.canvas = canvas;
    this.eventCallback = eventCallback;

    if (!this.initialized) {
      await Promise.all([
        this.feed.init(),
        this.motion.init(),
        this.initWorker()
      ]);
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
    } else if (msg.data.operation === 'CALIBRATE') {
      this.calibration.calibrationFinished(msg.data)
    }
  }

  async run () {
    await this.feed.run();
    await this.motion.run();

    window.addEventListener('focus', this.focusEventRegistration);
    window.addEventListener('blur', this.blurEventRegistration);
  }

  pause () {
    window.removeEventListener('focus', this.focusEventRegistration);
    window.removeEventListener('blur', this.blurEventRegistration);

    this.feed.stop();
    this.motion.stop();
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
