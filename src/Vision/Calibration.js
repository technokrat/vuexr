const CHESSBOARD_PITCH = 25; // mm
const CHESSBOARD_WIDTH = 9;
const CHESSBOARD_HEIGHT = 6;

export default class Calibration {
  constructor(session, name = "default") {
      this.session = session;
      this.name = name;

      this.findChessboardOngoing = false;
      this.calibrationOngoing = false;
      this.captureNextCalibrationPoints = false;

      this.cameraMatrix = null;
      this.distCoeffs = null;

      this.loadCameraCalibration();
    };

  resetCalibrationPoints () {
    this.session.worker.postMessage({
      operation: 'RESET_CALIBRATION_POINTS',
    });

    this.session.eventCallback({name: 'calibrationCaptureReset'})
  }

  resetCameraCalibration () {
    this.cameraMatrix = null;
    this.distCoeffs = null;
  }

  loadCameraCalibration () {
    let calibration = window.localStorage.getItem(`${this.name}/calibration`);

    if (calibration) {
      calibration = JSON.parse(calibration);
      this.resetCameraCalibration();
      this.cameraMatrix = calibration.cameraMatrix;
      this.distCoeffs = calibration.distCoeffs;
      this.session.eventCallback({name: 'calibrationCalibrated'});
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
      window.localStorage.setItem(`${this.name}/calibration`, JSON.stringify(calibration));
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
    this.session.eventCallback({name: 'calibrationCaptured'})
  }

  findChessBoardCornersCaptureReady() {
    this.session.eventCallback({name: 'calibrationCaptureReady'})
  }

  findChessBoardCornersCaptureNotReady() {
    this.session.eventCallback({name: 'calibrationCaptureNotReady'})
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
    this.session.eventCallback({name: 'calibrationCalibrated'})
  }
}
