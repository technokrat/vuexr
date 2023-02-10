import { WorkerOperation, WorkerReturnMessage } from "../types";
import Session from "./Session";

export default class Detector {
  session: Session;
  detectionOngoing = false;
  constructor(session: Session) {
    this.session = session;
  }

  detect(highlight = true) {
    if (!this.detectionOngoing) {
      this.detectionOngoing = true;

      try {
        this.session.worker?.postMessage({
          operation: WorkerOperation.DETECT,
          image: this.session.context2d?.getImageData(
              0,
              0,
              this.session.canvas?.width ?? 0,
              this.session.canvas?.height ?? 0,
            ),
          calibration: {
            cameraMatrix: JSON.parse(
              JSON.stringify(this.session.calibration.calibration?.cameraMatrix)
            ),
            distCoeffs: JSON.parse(
              JSON.stringify(this.session.calibration.calibration?.distCoeffs)
            ),
          },
          highlight: highlight,
        });
      } catch (e) {
        this.detectionOngoing = false;
        console.log(e);
      }
    }
  }

  detectionFinished(data: WorkerReturnMessage) {
    this.detectionOngoing = false;
    if (this.session.calibration.calibrationStatus.calibrated) {
      this.session.poser.setMarkers(data.markers ?? []);
    }
  }
}
