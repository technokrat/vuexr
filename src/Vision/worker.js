import cv from '../../vendor/opencv.js';

const ARUCO_SIZE = 50; // mm

class CVProcessor {
  constructor() {
    this.initialized = false;

    cv['onRuntimeInitialized'] = () => {
      this.dict = new cv.aruco_Dictionary(cv.DICT_6X6_250);
      this.initialized = true;
      console.log("Initialized OpenCV inside worker.js");
    };
  }

  detect(data, highlight = false) {
    const markers = [];

    if(this.initialized) {
      const frame = cv.matFromImageData(data.image);
      const rbgFrame = new cv.Mat();
      cv.cvtColor(frame, rbgFrame, cv.COLOR_RGBA2RGB);

      const markerIds = new cv.Mat();
      const markerCorners = new cv.MatVector();
      const rvecs = new cv.Mat();
      const tvecs = new cv.Mat();

      cv.detectMarkers(rbgFrame, this.dict, markerCorners, markerIds);

      if (markerIds.rows > 0) {

        const cameraMatrix = cv.matFromArray(3, 3, cv.CV_64FC1, data.calibration.cameraMatrix);
        const distCoeffs = cv.matFromArray(5, 1, cv.CV_64FC1, data.calibration.distCoeffs);

        cv.estimatePoseSingleMarkers(markerCorners, ARUCO_SIZE, cameraMatrix, distCoeffs, rvecs, tvecs);
        if (highlight) {
          cv.drawDetectedMarkers(rbgFrame, markerCorners, markerIds);
        }

        for (let i = 0; i < markerIds.rows; ++i) {
          let rvec = cv.matFromArray(3, 1, cv.CV_64F, [rvecs.doublePtr(0, i)[0], rvecs.doublePtr(0, i)[1], rvecs.doublePtr(0, i)[2]]);
          let tvec = cv.matFromArray(3, 1, cv.CV_64F, [tvecs.doublePtr(0, i)[0], tvecs.doublePtr(0, i)[1], tvecs.doublePtr(0, i)[2]]);

          markers.push({
            id: markerIds.data32S[i],
            rvec: Array.from(rvec.data64F),
            tvec: Array.from(tvec.data64F)
          });

          if (highlight) {
            cv.drawAxis(rbgFrame, this.calibration.cameraMatrix, this.calibration.distCoeffs, rvec, tvec, ARUCO_SIZE);
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
}

const processor = new CVProcessor();

self.onmessage = msg => {
  if (msg.data.operation === 'DETECT') {
    processor.detect(msg.data)
  }
};


