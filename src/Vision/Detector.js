import cv from '../../vendor/opencv.js';

const ARUCO_SIZE = 50; // mm

export default class Detector {
  constructor(session, calibration) {
    this.session = session
    this.calibration = calibration;
    this.dict = new cv.aruco_Dictionary(cv.DICT_6X6_250);
  };

  detect(frame, highlight = true) {
    const rbgFrame = new cv.Mat();
    cv.cvtColor(frame, rbgFrame, cv.COLOR_RGBA2RGB);

    const markerIds = new cv.Mat();
    const markerCorners = new cv.MatVector();
    const rvecs = new cv.Mat();
    const tvecs = new cv.Mat();

    cv.detectMarkers(rbgFrame, this.dict, markerCorners, markerIds);

    if (markerIds.rows > 0) {
      cv.estimatePoseSingleMarkers(markerCorners, ARUCO_SIZE, this.calibration.cameraMatrix, this.calibration.distCoeffs, rvecs, tvecs);
      if (highlight) {
        cv.drawDetectedMarkers(rbgFrame, markerCorners, markerIds);
      }

      for (let i = 0; i < markerIds.rows; ++i) {
        let rvec = cv.matFromArray(3, 1, cv.CV_64F, [rvecs.doublePtr(0, i)[0], rvecs.doublePtr(0, i)[1], rvecs.doublePtr(0, i)[2]]);
        let tvec = cv.matFromArray(3, 1, cv.CV_64F, [tvecs.doublePtr(0, i)[0], tvecs.doublePtr(0, i)[1], tvecs.doublePtr(0, i)[2]]);

        this.session.poser.setDetectionTransform(markerIds.data32S[i], rvec, tvec)

        if (highlight) {
          cv.drawAxis(rbgFrame, this.calibration.cameraMatrix, this.calibration.distCoeffs, rvec, tvec, ARUCO_SIZE);
        }
        rvec.delete();
        tvec.delete();
      }
    }

    markerIds.delete();
    markerCorners.delete();
    return rbgFrame
  }

}
