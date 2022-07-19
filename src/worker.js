import cv from './opencv/build_simd/opencv';

const ARUCO_SIZE = 50; // mm

const CHESSBOARD_PITCH = 25; // mm
const CHESSBOARD_WIDTH = 9;
const CHESSBOARD_HEIGHT = 6;

class CVProcessor {

  constructor() {
    this.initialized = false;
    this.cv = cv;
    this.init();
  }

  async init() {
    await this.cv.ready;
    this.dict = new this.cv.aruco_Dictionary(this.cv.DICT_6X6_250);

    this.constructChessboardCoordinates();
    this.calibrationImagePoints = new this.cv.MatVector();
    this.calibrationObjectPoints = new this.cv.MatVector();

    this.initialized = true;
    console.log("Initialized OpenCV inside worker.js");

    postMessage({
      operation: 'WORKER_READY',
    });
  }

  constructChessboardCoordinates() {
    const points = [];

    for (let j = 0; j < CHESSBOARD_HEIGHT; j++) {
      for (let i = 0; i < CHESSBOARD_WIDTH; i++) {
        points.push(CHESSBOARD_PITCH * i);
        points.push(CHESSBOARD_PITCH * j);
        points.push(0)
      }
    }

    this.chessboardPoints = this.cv.matFromArray(CHESSBOARD_WIDTH * CHESSBOARD_HEIGHT, 1, this.cv.CV_32FC3, points)
  }

  detect(data, highlight = false) {
    const markers = [];

    if(this.initialized) {
      const frame = this.cv.matFromImageData(data.image);
      const rbgFrame = new this.cv.Mat();
      this.cv.cvtColor(frame, rbgFrame, this.cv.COLOR_RGBA2RGB);

      const markerIds = new this.cv.Mat();
      const markerCorners = new this.cv.MatVector();
      const rvecs = new this.cv.Mat();
      const tvecs = new this.cv.Mat();

      this.cv.detectMarkers(rbgFrame, this.dict, markerCorners, markerIds);

      if (markerIds.rows > 0) {
        const cameraMatrix = this.cv.matFromArray(3, 3, this.cv.CV_64FC1, data.calibration.cameraMatrix);
        const distCoeffs = this.cv.matFromArray(5, 1, this.cv.CV_64FC1, data.calibration.distCoeffs);

        this.cv.estimatePoseSingleMarkers(markerCorners, ARUCO_SIZE, cameraMatrix, distCoeffs, rvecs, tvecs);
        if (highlight) {
          this.cv.drawDetectedMarkers(rbgFrame, markerCorners, markerIds);
        }

        for (let i = 0; i < markerIds.rows; ++i) {
          let rvec = this.cv.matFromArray(3, 1, this.cv.CV_64F, [rvecs.doublePtr(0, i)[0], rvecs.doublePtr(0, i)[1], rvecs.doublePtr(0, i)[2]]);
          let tvec = this.cv.matFromArray(3, 1, this.cv.CV_64F, [tvecs.doublePtr(0, i)[0], tvecs.doublePtr(0, i)[1], tvecs.doublePtr(0, i)[2]]);

          const rotMat = new this.cv.Mat(3, 3, this.cv.CV_64FC1);
          //Convert rotation vector into rotation matrix
          this.cv.Rodrigues(rvec, rotMat);

          markers.push({
            id: markerIds.data32S[i],
            rvec: Array.from(rvec.data64F),
            tvec: Array.from(tvec.data64F),
            rmat: Array.from(rotMat.data64F)
          });

          rotMat.delete();

          if (highlight) {
            this.cv.drawAxis(rbgFrame, this.calibration.cameraMatrix, this.calibration.distCoeffs, rvec, tvec, ARUCO_SIZE);
          }

          rvec.delete();
          tvec.delete();
        }

        distCoeffs.delete();
        cameraMatrix.delete()
      }

      //markerIds.delete();
      markerCorners.delete();
      rbgFrame.delete();
      frame.delete();
    }

    postMessage({
      operation: 'DETECT',
      result: {
        markers
      }
    });
  }

  findChessBoardCorners(data, highlight = false) {
    const frame = this.cv.matFromImageData(data.image);
    const corners = new this.cv.Mat();
    const size = new this.cv.Size(CHESSBOARD_WIDTH, CHESSBOARD_HEIGHT);
    const success = this.cv.findChessboardCorners(frame, size, corners, this.cv.CALIB_CB_ADAPTIVE_THRESH + this.cv.CALIB_CB_NORMALIZE_IMAGE);

    if (success) {
      if (highlight) {
        for (let i = 0; i < corners.size().height; i++) {
          const x = corners.floatAt(i, 0);
          const y = corners.floatAt(i, 1);
          const point = new this.cv.Point(x, y);

          this.cv.circle(frame, point, 4, new this.cv.Scalar(192, 0, 255, 192), 4)
        }
      }

      if (data.captureNextCalibrationPoints) {
        this.captureCalibrationPoints({
          imagePoints: corners,
          objectPoints: this.chessboardPoints
        });

        postMessage({
          operation: 'FIND_CHESSBOARD_CORNERS_CAPTURED',
        });
      } else {
        postMessage({
          operation: 'FIND_CHESSBOARD_CORNERS_READY',
        });
      }
    } else {
      corners.delete();
      postMessage({
        operation: 'FIND_CHESSBOARD_CORNERS_NOT_READY',
      });
    }

    frame.delete();
  }

  captureCalibrationPoints(points) {
    this.calibrationImagePoints.push_back(points.imagePoints);
    this.calibrationObjectPoints.push_back(points.objectPoints)
  }

  resetCalibrationPoints () {
    if (this.calibrationImagePoints) {
      for (let i = 0; i < this.calibrationImagePoints.size(); i++) {
        this.calibrationImagePoints.get(i).delete();
      }
      this.calibrationImagePoints.delete();
      this.calibrationImagePoints = new this.cv.MatVector();
    }

    if (this.calibrationObjectPoints) {
      this.calibrationObjectPoints.delete();
      this.calibrationObjectPoints = new this.cv.MatVector();
    }
  }

  calibrate(data) {
    const cameraMatrix = new this.cv.Mat();
    const distCoeffs = new this.cv.Mat();

    const rvecs = new this.cv.MatVector();
    const tvecs = new this.cv.MatVector();

    const stdDeviationsIntrinsics = new this.cv.Mat();
    const stdDeviationsExtrinsics = new this.cv.Mat();

    const perViewErrors = new this.cv.Mat();
    this.cv.calibrateCameraExtended(
      this.calibrationObjectPoints,
      this.calibrationImagePoints,
      new this.cv.Size(data.width, data.height),
      cameraMatrix,
      distCoeffs,
      rvecs,
      tvecs,
      stdDeviationsIntrinsics,
      stdDeviationsExtrinsics,
      perViewErrors
    );

    rvecs.delete();
    tvecs.delete();
    stdDeviationsIntrinsics.delete();
    stdDeviationsExtrinsics.delete();

    const calibration = {
      cameraMatrix: Array.from(cameraMatrix.data64F),
      distCoeffs: Array.from(distCoeffs.data64F)
    };

    cameraMatrix.delete();
    distCoeffs.delete();

    postMessage({
      operation: 'CALIBRATE',
      result: {
        calibration
      }
    });
  }
}

const processor = new CVProcessor();

self.onmessage = msg => {
  if (msg.data.operation === 'DETECT') {
    processor.detect(msg.data)
  } else if (msg.data.operation === 'FIND_CHESSBOARD_CORNERS') {
    processor.findChessBoardCorners(msg.data)
  } else if (msg.data.operation === 'RESET_CALIBRATION_POINTS') {
    processor.resetCalibrationPoints()
  } else if (msg.data.operation === 'CALIBRATE') {
    processor.calibrate(msg.data)
  }
};


