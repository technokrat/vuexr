import cv from '../vendor/opencv.js';

const CHESSBOARD_WIDTH = 9
const CHESSBOARD_HEIGHT = 6

export default class OpenCVSession {
  constructor() {
    this.initialized = false;

    cv['onRuntimeInitialized'] = () => {
      this.getChessboardCoordinates()
      this.calibrationImagePoints = new cv.MatVector();
      this.calibrationObjectPoints = new cv.MatVector();
      this.dict = new cv.aruco_Dictionary(cv.DICT_6X6_250);
      //this.detectorParams = new cv.DetectorParameters()
      this.initialized = true;
      console.log("Initialized OpenCV")
      console.log(cv)
    };
  }

  grayOut(canvas) {
    if (this.initialized) {
      let frame = cv.imread(canvas);
      let grayImage = new cv.Mat();
      cv.cvtColor(frame, grayImage, cv.COLOR_BGR2GRAY, 0);
      cv.imshow(canvas, grayImage);

      frame.delete();
      grayImage.delete();
    }
  }

  findChessBoardCorners(canvas) {
    if (this.initialized) {
      const size = new cv.Size(CHESSBOARD_WIDTH, CHESSBOARD_HEIGHT);
      let corners = new cv.Mat();

      let frame = cv.imread(canvas);

      cv.cvtColor(frame, frame, cv.COLOR_RGBA2RGB, 0);

      let success = cv.findChessboardCorners(frame, size, corners)

      if (success) {
        const white = new cv.Scalar(128, 0, 255, 192);

        for (let i = 0; i < corners.size().height; i++) {
          const x = corners.floatAt(i, 0)
          const y = corners.floatAt(i, 1)
          const point = new cv.Point(x, y)

          cv.circle(frame, point, 2, white, 2)
        }

        cv.imshow(canvas, frame);
        frame.delete()
        return {imagePoints: corners, objectPoints: this.chessboardPoints}

      } else {
        frame.delete()
        corners.delete()

        return null
      }
    } else {
      return null
    }
  }

  captureCalibrationPoints(points) {
    this.calibrationImagePoints.push_back(points.imagePoints)
    this.calibrationObjectPoints.push_back(points.objectPoints)
  }

  resetCalibrationPoints() {
    this.calibrationImagePoints = new cv.MatVector();
    this.calibrationObjectPoints = new cv.MatVector();
  }

  calibrate(size) {
    if (this.initialized) {
      const cameraMatrix = new cv.Mat()
      const distCoeffs = new cv.Mat()

      const rvecs = new cv.MatVector()
      const tvecs = new cv.MatVector()

      const stdDeviationsIntrinsics = new cv.Mat()
      const stdDeviationsExtrinsics = new cv.Mat()

      const perViewErrors = new cv.Mat()
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
      )

      this.cameraMatrix = cameraMatrix
      this.distCoeffs = distCoeffs

      return {
        cameraMatrix,
        distCoeffs
      }
    } else {
      return null
    }
  }

  detectAruco(canvas) {
    if (this.initialized) {
      let frame = cv.imread(canvas);

      cv.cvtColor(frame, frame, cv.COLOR_RGBA2RGB, 0);

      const markerIds = new cv.Mat();
      const markerCorners = new cv.MatVector();
      const rvecs = new cv.Mat();
      const tvecs = new cv.Mat();

      cv.detectMarkers(frame, this.dict, markerCorners, markerIds)

      if (markerIds.rows > 0) {
        cv.drawDetectedMarkers(frame, markerCorners, markerIds)

        cv.estimatePoseSingleMarkers(markerCorners, 0.1, this.cameraMatrix, this.distCoeffs, rvecs, tvecs)

        for(let i=0; i < markerIds.rows; ++i) {
          let rvec = cv.matFromArray(3, 1, cv.CV_64F, [rvecs.doublePtr(0, i)[0], rvecs.doublePtr(0, i)[1], rvecs.doublePtr(0, i)[2]]);
          let tvec = cv.matFromArray(3, 1, cv.CV_64F, [tvecs.doublePtr(0, i)[0], tvecs.doublePtr(0, i)[1], tvecs.doublePtr(0, i)[2]]);
          cv.drawAxis(frame, this.cameraMatrix, this.distCoeffs, rvec, tvec, 0.1);
          rvec.delete();
          tvec.delete();
        }
      }

      cv.imshow(canvas, frame);

      markerIds.delete()
      markerCorners.delete()

      frame.delete()
    }
  }

  getChessboardCoordinates() {
    const points = []

    for (let j = 0; j < CHESSBOARD_HEIGHT; j++) {
    for (let i = 0; i < CHESSBOARD_WIDTH; i++) {
        //points.push(new cv.Point(2.5 * i, 2.5 * j, 0))
        points.push(2.5 * i)
        points.push(2.5 * j)
        points.push(0)
      }
    }

    this.chessboardPoints = cv.matFromArray(CHESSBOARD_WIDTH * CHESSBOARD_HEIGHT, 1, cv.CV_32FC3, points)
  }


}
