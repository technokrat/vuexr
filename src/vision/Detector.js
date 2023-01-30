export default class Detector {
  constructor(session) {
    this.session = session
    this.detectionOngoing = false;
  };

  detect(highlight = true) {
    if (!this.detectionOngoing) {
      this.detectionOngoing = true;

      try {
        this.session.worker.postMessage({
          operation: 'DETECT',
          image: this.session.canvas.getContext('2d').getImageData(0, 0, this.session.canvas.width, this.session.canvas.height),
          calibration: {
            cameraMatrix: JSON.parse(JSON.stringify(this.session.calibration.cameraMatrix)),
            distCoeffs: JSON.parse(JSON.stringify(this.session.calibration.distCoeffs)),
          },
          highlight: highlight
        });
      } catch (e) {
        this.detectionOngoing = false;
        console.log(e);
      }
    }
  }

  detectionFinished(data) {
    this.detectionOngoing = false;
    if (this.session.calibration.calibrationStatus.calibrated) {
      this.session.poser.setMarkers(data.result.markers);
    }
  }
}
