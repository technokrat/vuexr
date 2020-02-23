const CHESSBOARD_PITCH = 25; // mm
const CHESSBOARD_WIDTH = 9;
const CHESSBOARD_HEIGHT = 6;

export default class Calibration {
  constructor(session) {
    this.session = session;

    this.findChessboardOngoing = false;
    this.calibrationOngoing = false;
    this.captureNextCalibrationPoints = false;

    this.cameraMatrix = null;
    this.distCoeffs = null;

    this.calibrationStatus =  {
      captureReady: false,
      calibrated: false,
      captures: 0,
    }
  };

  resetCalibrationPoints () {
    this.session.worker.postMessage({
      operation: 'RESET_CALIBRATION_POINTS',
    });

    this.calibrationStatus.captures = 0
    this.session.eventCallback({name: 'statusChanged'})
  }

  resetCameraCalibration () {
    this.cameraMatrix = null;
    this.distCoeffs = null;

    this.calibrationStatus.calibrated = false
    this.session.eventCallback({name: 'statusChanged'})
  }

  loadCameraCalibration () {
    let calibration = window.localStorage.getItem(`vuexr/${this.session.name}/calibration/${this.session.feed.feedStatus.selected}`);

    if (calibration) {
      calibration = JSON.parse(calibration);
      this.resetCameraCalibration();
      this.cameraMatrix = calibration.cameraMatrix;
      this.distCoeffs = calibration.distCoeffs;
      this.calibrationStatus.calibrated = true;
      this.session.eventCallback({name: 'statusChanged'});
      return true
    } else {
      return false
    }
  }

  storeCameraCalibration () {
    if (this.cameraMatrix) {
      const calibration = {
        cameraMatrix: this.cameraMatrix,
        distCoeffs: this.distCoeffs
      };
      window.localStorage.setItem(`vuexr/${this.session.name}/calibration/${this.session.feed.feedStatus.selected}`, JSON.stringify(calibration));
      return true
    } else {
      return false
    }
  }

  findChessBoardCorners() {
    if (!this.findChessboardOngoing) {
      this.findChessboardOngoing = true;
      this.session.worker.postMessage({
        operation: 'FIND_CHESSBOARD_CORNERS',
        image: this.session.canvas.getContext('2d').getImageData(0, 0, this.session.canvas.width, this.session.canvas.height),
        captureNextCalibrationPoints: this.captureNextCalibrationPoints,
        highlight: highlight
      })
    }
  }

  findChessBoardCornersCaptured() {
    this.captureNextCalibrationPoints = false;
    this.calibrationStatus.captures++
    this.session.eventCallback({name: 'statusChanged'})
  }

  findChessBoardCornersCaptureReady() {
    this.calibrationStatus.captureReady = true
    this.session.eventCallback({name: 'statusChanged'})
  }

  findChessBoardCornersCaptureNotReady() {
    this.calibrationStatus.captureReady = false
    this.session.eventCallback({name: 'statusChanged'})
  }

  setCaptureNextcalibrationPoints () {
    this.captureNextCalibrationPoints = true
  }

  calibrate(size) {
    if (!this.calibrationOngoing) {
      this.calibrationOngoing = true;
      this.session.worker.postMessage({
        operation: 'CALIBRATE',
        width: size.width,
        height: size.height,
        highlight: highlight
      })
    }
  }

  calibrationFinished(data) {
    this.calibrationOngoing = false;
    this.cameraMatrix = data.result.cameraMatrix;
    this.distCoeffs = data.result.distCoeffs;

    this.storeCameraCalibration();

    this.calibrationStatus.calibrated = true;
    this.session.eventCallback({name: 'statusChanged'})
  }
}
