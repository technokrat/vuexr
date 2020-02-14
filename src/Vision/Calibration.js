import cv from '../../vendor/opencv.js';

const CHESSBOARD_PITCH = 25; // mm
const CHESSBOARD_WIDTH = 9;
const CHESSBOARD_HEIGHT = 6;

export default class Calibration {
  constructor(session, name = "default_camera") {
      this.session = session;
      this.name = name;
      this.constructChessboardCoordinates();
      this.calibrationImagePoints = new cv.MatVector();
      this.calibrationObjectPoints = new cv.MatVector();
      this.cameraMatrix = null;
      this.distCoeffs = null;

      this.loadCameraCalibration();
    };

  destroy() {
    if (this.calibrationObjectPoints.rows) {
      this.calibrationObjectPoints.get(0).delete();
    }

    for (let i = 0; i < this.calibrationImagePoints.rows; i++) {
      this.calibrationImagePoints.get(i).delete();
    }
    this.calibrationImagePoints.delete();
    this.calibrationObjectPoints.delete();


  }

  resetCalibrationPoints () {
    for (let i = 0; i < this.calibrationImagePoints.rows; i++) {
      this.calibrationImagePoints.get(i).delete();
    }

    this.session.eventCallback({name: 'calibrationCaptureReset'})

    this.calibrationImagePoints.delete();
    this.calibrationObjectPoints.delete();

    this.calibrationImagePoints = new cv.MatVector();
    this.calibrationObjectPoints = new cv.MatVector();
  }

  resetCameraCalibration () {
    if (this.cameraMatrix) {
      this.cameraMatrix.delete();
      this.cameraMatrix = null;
      this.distCoeffs.delete();
      this.distCoeffs = null;
      this.session.eventCallback({name: 'calibrationReset'})
      return true
    } else {
      return false
    }
  }

  loadCameraCalibration () {
    let calibration = window.localStorage.getItem(`${this.name}/calibration`);

    if (calibration) {
      calibration = JSON.parse(calibration);
      this.resetCameraCalibration();
      this.cameraMatrix = cv.matFromArray(3, 3, cv.CV_64FC1, calibration.cameraMatrix);
      this.distCoeffs = cv.matFromArray(5, 1, cv.CV_64FC1, calibration.distCoeffs);
      this.session.eventCallback({name: 'calibrationCalibrated'})
      return true
    } else {
      return false
    }
  }

  storeCameraCalibration () {
    if (this.cameraMatrix) {
      const calibration = {
        cameraMatrix: Array.from(this.cameraMatrix.data64F),
        distCoeffs: Array.from(this.distCoeffs.data64F)
      };
      window.localStorage.setItem(`${this.name}/calibration`, JSON.stringify(calibration));
      return true
    } else {
      return false
    }
  }

  constructChessboardCoordinates() {
    const size = new cv.Size(CHESSBOARD_WIDTH, CHESSBOARD_HEIGHT);
    const points = [];

    for (let j = 0; j < CHESSBOARD_HEIGHT; j++) {
      for (let i = 0; i < CHESSBOARD_WIDTH; i++) {
        //points.push(new cv.Point(2.5 * i, 2.5 * j, 0))
        points.push(CHESSBOARD_PITCH * i);
        points.push(CHESSBOARD_PITCH * j);
        points.push(0)
      }
    }

    this.chessboardPoints = cv.matFromArray(CHESSBOARD_WIDTH * CHESSBOARD_HEIGHT, 1, cv.CV_32FC3, points)
  }

  findChessBoardCorners(frame, highlight = true) {
      const corners = new cv.Mat();
      const size = new cv.Size(CHESSBOARD_WIDTH, CHESSBOARD_HEIGHT);
      const success = cv.findChessboardCorners(frame, size, corners);

      const highlightColor = new cv.Scalar(192, 0, 255, 192);

      if (success) {
        if (highlight) {
          for (let i = 0; i < corners.size().height; i++) {
            const x = corners.floatAt(i, 0);
            const y = corners.floatAt(i, 1);
            const point = new cv.Point(x, y);

            cv.circle(frame, point, 4, highlightColor, 4)
          }
        }

        if (this.captureNextCalibrationPoints) {
          this.captureCalibrationPoints({
            imagePoints: corners,
            objectPoints: this.chessboardPoints
          });

          this.session.eventCallback({name: 'calibrationCaptured'});
          this.captureNextCalibrationPoints = false
        } else {
          this.session.eventCallback({name: 'calibrationCaptureReady'});
        }
      } else {
        this.session.eventCallback({name: 'calibrationCaptureNotReady'});
        corners.delete();
      }
  }

  setCaptureNextcalibrationPoints () {
    this.captureNextCalibrationPoints = true
  }

  captureCalibrationPoints(points) {
    this.calibrationImagePoints.push_back(points.imagePoints);
    this.calibrationObjectPoints.push_back(points.objectPoints)
  }

  calibrate(size) {
      const cameraMatrix = new cv.Mat();
      const distCoeffs = new cv.Mat();

      const rvecs = new cv.MatVector();
      const tvecs = new cv.MatVector();

      const stdDeviationsIntrinsics = new cv.Mat();
      const stdDeviationsExtrinsics = new cv.Mat();

      const perViewErrors = new cv.Mat();
      cv.calibrateCameraExtended(
        this.calibrationObjectPoints,
        this.calibrationImagePoints,
        size,
        cameraMatrix,
        distCoeffs,
        rvecs,
        tvecs,
        stdDeviationsIntrinsics,
        stdDeviationsExtrinsics,
        perViewErrors
      );

      console.log('mau')

      this.cameraMatrix = cameraMatrix;
      this.distCoeffs = distCoeffs;

      rvecs.delete();
      tvecs.delete();
      stdDeviationsIntrinsics.delete();
      stdDeviationsExtrinsics.delete();

      this.storeCameraCalibration();
      this.session.eventCallback({name: 'calibrationCalibrated'})

      return {
        cameraMatrix,
        distCoeffs
      }
  }
}
