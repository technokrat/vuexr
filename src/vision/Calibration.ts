import { WorkerReturnMessage, WorkerOperation } from "../types";
import Session, { SessionCallbackType, SessionState } from "./Session";

export interface CalibrationData {
  cameraMatrix: number[];
  distCoeffs: number[];
}

export default class Calibration {
  session: Session;
  findChessboardOngoing: boolean;
  calibrationOngoing: boolean;
  captureNextCalibrationPoints: boolean;
  calibrationStatus: {
    captureReady: boolean;
    calibrated: boolean;
    captures: number;
  };
  calibration: CalibrationData | null = null;

  constructor(session: Session) {
    this.session = session;

    this.findChessboardOngoing = false;
    this.calibrationOngoing = false;
    this.captureNextCalibrationPoints = false;

    this.calibrationStatus = {
      captureReady: false,
      calibrated: false,
      captures: 0,
    };
  }

  resetCalibrationPoints() {
    if (this.session.worker) {
      this.session.worker.postMessage({
        operation: WorkerOperation.RESET_CALIBRATION_POINTS,
      });
    }

    this.calibrationStatus.captures = 0;
    this.session.updateStatus();
  }

  resetCameraCalibration() {
    this.calibration = null;
    this.calibrationStatus.calibrated = false;
    this.session.updateStatus();
  }

  loadCameraCalibration() {
    let calibrationString = window.localStorage.getItem(
      `vuexr/${this.session.name}/calibration/${this.session.feed.feedStatus.selected}`
    );

    if (calibrationString) {
      const calibration = JSON.parse(calibrationString) as CalibrationData;
      this.resetCameraCalibration();
      this.calibration = calibration;
      this.calibrationStatus.calibrated = true;
      this.session.state = SessionState.DETECTION;
      this.session.updateStatus();
      return true;
    } else {
      return false;
    }
  }

  storeCameraCalibration() {
    if (this.calibration) {
      window.localStorage.setItem(
        `vuexr/${this.session.name}/calibration/${this.session.feed.feedStatus.selected}`,
        JSON.stringify(this.calibration)
      );
      return true;
    } else {
      return false;
    }
  }

  findChessBoardCorners(highlight = true) {
    if (
      !this.findChessboardOngoing &&
      this.session.canvas &&
      this.session.worker
    ) {
      this.findChessboardOngoing = true;
      this.session.worker.postMessage({
        operation: WorkerOperation.FIND_CHESSBOARD_CORNERS,
        image: this.session.context2d?.getImageData(
            0,
            0,
            this.session.canvas.width,
            this.session.canvas.height,
          ),
        captureNextCalibrationPoints: this.captureNextCalibrationPoints,
        highlight: highlight,
      });
    }
  }

  findChessBoardCornersCaptured() {
    this.findChessboardOngoing = false;
    this.captureNextCalibrationPoints = false;
    this.calibrationStatus.captures++;
    this.session.updateStatus();
  }

  findChessBoardCornersCaptureReady() {
    this.findChessboardOngoing = false;
    this.calibrationStatus.captureReady = true;
    this.session.updateStatus();
  }

  findChessBoardCornersCaptureNotReady() {
    this.findChessboardOngoing = false;
    this.calibrationStatus.captureReady = false;
    this.session.updateStatus();
  }

  setCaptureNextcalibrationPoints() {
    this.captureNextCalibrationPoints = true;
  }

  calibrate(size: { width: number; height: number }) {
    if (!this.calibrationOngoing) {
      this.calibrationOngoing = true;
      this.session.worker?.postMessage({
        operation: WorkerOperation.CALIBRATE,
        width: size.width,
        height: size.height,
      });
    }
  }

  calibrationFinished(data: WorkerReturnMessage) {
    this.calibrationOngoing = false;
    this.calibration = data.calibration!;
    this.storeCameraCalibration();

    this.calibrationStatus.calibrated = true;
    this.session.updateStatus();
  }
}
