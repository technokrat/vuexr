export default class Detector {
  constructor(session, calibration) {
    this.session = session
    this.calibration = calibration;
    this.detectionOngoing = false;
  };

  detect(highlight = true) {
    if (!this.detectionOngoing) {
      this.detectionOngoing = true;
      this.session.worker.postMessage({
        operation: 'DETECT',
        image: this.session.canvas.getContext('2d').getImageData(0, 0, this.session.canvas.width, this.session.canvas.height),
        calibration: {
          cameraMatrix: this.session.calibration.cameraMatrix,
          distCoeffs: this.session.calibration.distCoeffs
        },
        highlight: highlight
      })
    }
  }

  detectionFinished(data) {
    this.detectionOngoing = false;
    this.session.poser.setMarkers(data.result.markers);
  }

}
