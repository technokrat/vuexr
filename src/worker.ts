/* eslint-disable */

import { mat4, vec3 } from "gl-matrix";
//@ts-ignore
import cv from "./opencv/build_simd/opencv";
import { WorkerReturn, WorkerReturnMessage, WorkerData, WorkerMarker, WorkerOperation } from "./types";

const ARUCO_SIZE = 50; // mm

const CHESSBOARD_PITCH = 25; // mm
const CHESSBOARD_WIDTH = 9;
const CHESSBOARD_HEIGHT = 6;

interface OpenCV {
  calibrateCameraExtended: any;
  Scalar: any;
  Point: any;
  circle: any;
  CALIB_CB_NORMALIZE_IMAGE: any;
  CALIB_CB_ADAPTIVE_THRESH: any;
  findChessboardCorners: any;
  Size: any;
  Rodrigues: any;
  drawAxis: any;
  CV_64F: any;
  drawDetectedMarkers: any;
  estimatePoseSingleMarkers: any;
  CV_64FC1: any;
  detectMarkers: any;
  cvtColor: any;
  COLOR_RGBA2RGB: any;
  Mat: any;
  matFromImageData: any;
  CV_32FC3: any;
  matFromArray: any;
  MatVector: any;
  DICT_6X6_250: any;
  aruco_Dictionary: any;
  ready: Promise<void>;
}

class CVProcessor {
  initialized = false;
  cv: OpenCV;
  dict: any;
  calibrationImagePoints: any;
  calibrationObjectPoints: any;
  chessboardPoints: any;

  constructor() {
    this.cv = cv as OpenCV;
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
      operation: WorkerReturn.WORKER_READY,
    } as WorkerReturnMessage);
  }

  constructChessboardCoordinates() {
    const points = [];

    for (let j = 0; j < CHESSBOARD_HEIGHT; j++) {
      for (let i = 0; i < CHESSBOARD_WIDTH; i++) {
        points.push(CHESSBOARD_PITCH * i);
        points.push(CHESSBOARD_PITCH * j);
        points.push(0);
      }
    }

    this.chessboardPoints = this.cv.matFromArray(
      CHESSBOARD_WIDTH * CHESSBOARD_HEIGHT,
      1,
      this.cv.CV_32FC3,
      points
    );
  }

  detect(data: WorkerData, highlight = false) {
    const markers: WorkerMarker[] = [];

    if (this.initialized) {
      const frame = this.cv.matFromImageData(data.image);
      const rbgFrame = new this.cv.Mat();
      this.cv.cvtColor(frame, rbgFrame, this.cv.COLOR_RGBA2RGB);

      const markerIds = new this.cv.Mat();
      const markerCorners = new this.cv.MatVector();
      const rvecs = new this.cv.Mat();
      const tvecs = new this.cv.Mat();

      this.cv.detectMarkers(rbgFrame, this.dict, markerCorners, markerIds);

      if (markerIds.rows > 0) {
        const cameraMatrix = this.cv.matFromArray(
          3,
          3,
          this.cv.CV_64FC1,
          data.calibration!.cameraMatrix
        );
        const distCoeffs = this.cv.matFromArray(
          5,
          1,
          this.cv.CV_64FC1,
          data.calibration!.distCoeffs
        );

        this.cv.estimatePoseSingleMarkers(
          markerCorners,
          ARUCO_SIZE,
          cameraMatrix,
          distCoeffs,
          rvecs,
          tvecs
        );
        if (highlight) {
          this.cv.drawDetectedMarkers(rbgFrame, markerCorners, markerIds);
        }

        for (let i = 0; i < markerIds.rows; ++i) {
          const rvec = this.cv.matFromArray(3, 1, this.cv.CV_64F, [
            rvecs.doublePtr(0, i)[0],
            rvecs.doublePtr(0, i)[1],
            rvecs.doublePtr(0, i)[2],
          ]);
          const tvec = this.cv.matFromArray(3, 1, this.cv.CV_64F, [
            tvecs.doublePtr(0, i)[0],
            tvecs.doublePtr(0, i)[1],
            tvecs.doublePtr(0, i)[2],
          ]);

          const rotMat = new this.cv.Mat(3, 3, this.cv.CV_64FC1);
          //Convert rotation vector into rotation matrix
          this.cv.Rodrigues(rvec, rotMat);

          markers.push({
            id: markerIds.data32S[i],
            rvec: Array.from(rvec.data64F) as vec3,
            tvec: Array.from(tvec.data64F) as vec3,
            rmat: Array.from(rotMat.data64F) as mat4,
          });

          rotMat.delete();

          if (highlight && data.calibration) {
            this.cv.drawAxis(
              rbgFrame,
              data.calibration.cameraMatrix,
              data.calibration.distCoeffs,
              rvec,
              tvec,
              ARUCO_SIZE
            );
          }

          rvec.delete();
          tvec.delete();
        }

        distCoeffs.delete();
        cameraMatrix.delete();
      }

      //markerIds.delete();
      markerCorners.delete();
      rbgFrame.delete();
      frame.delete();
    }

    postMessage({
      operation: WorkerReturn.DETECT,
      markers,
    } as WorkerReturnMessage);
  }

  findChessBoardCorners(data: WorkerData, highlight = false) {
    const frame = this.cv.matFromImageData(data.image);
    const corners = new this.cv.Mat();
    const size = new this.cv.Size(CHESSBOARD_WIDTH, CHESSBOARD_HEIGHT);
    const success = this.cv.findChessboardCorners(
      frame,
      size,
      corners,
      this.cv.CALIB_CB_ADAPTIVE_THRESH + this.cv.CALIB_CB_NORMALIZE_IMAGE
    );

    if (success) {
      if (highlight) {
        for (let i = 0; i < corners.size().height; i++) {
          const x = corners.floatAt(i, 0);
          const y = corners.floatAt(i, 1);
          const point = new this.cv.Point(x, y);

          this.cv.circle(
            frame,
            point,
            4,
            new this.cv.Scalar(192, 0, 255, 192),
            4
          );
        }
      }

      if (data.captureNextCalibrationPoints) {
        this.captureCalibrationPoints({
          imagePoints: corners,
          objectPoints: this.chessboardPoints,
        });

        postMessage({
          operation: WorkerReturn.FIND_CHESSBOARD_CORNERS_CAPTURED,
        } as WorkerReturnMessage);
      } else {
        postMessage({
          operation: WorkerReturn.FIND_CHESSBOARD_CORNERS_READY,
        } as WorkerReturnMessage);
      }
    } else {
      corners.delete();
      postMessage({
        operation: WorkerReturn.FIND_CHESSBOARD_CORNERS_NOT_READY,
      } as WorkerReturnMessage);
    }

    frame.delete();
  }

  captureCalibrationPoints(points: { imagePoints: any; objectPoints: any }) {
    console.log(points);
    this.calibrationImagePoints.push_back(points.imagePoints);
    this.calibrationObjectPoints.push_back(points.objectPoints);
  }

  resetCalibrationPoints() {
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

  calibrate(data: WorkerData) {
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
      distCoeffs: Array.from(distCoeffs.data64F),
    };

    cameraMatrix.delete();
    distCoeffs.delete();

    postMessage({
      operation: WorkerReturn.CALIBRATE,
      calibration,
    } as WorkerReturnMessage);
  }
}

const processor = new CVProcessor();

self.onmessage = (msg) => {
  if (msg.data.operation === WorkerOperation.DETECT) {
    processor.detect(msg.data);
  } else if (msg.data.operation === WorkerOperation.FIND_CHESSBOARD_CORNERS) {
    processor.findChessBoardCorners(msg.data);
  } else if (msg.data.operation === WorkerOperation.RESET_CALIBRATION_POINTS) {
    processor.resetCalibrationPoints();
  } else if (msg.data.operation === WorkerOperation.CALIBRATE) {
    processor.calibrate(msg.data);
  }
};
