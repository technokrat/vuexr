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
            cameraMatrix: this.session.calibration.cameraMatrix,
            distCoeffs: this.session.calibration.distCoeffs
          },
          highlight: highlight
        })
      } catch {
        this.detectionOngoing = false;
      }
    }
  }

  detectionFinished(data) {
    this.detectionOngoing = false;
    this.session.poser.setMarkers(data.result.markers);
  }
}
