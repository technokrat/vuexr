import { WorkerReturnMessage, CalibrationData } from "../types";
import Session from "./Session";
export default class Calibration {
    session: Session;
    findChessboardOngoing: boolean;
    calibrationOngoing: boolean;
    captureNextCalibrationPoints: boolean;
    calibrationStatus: {
        captureReady: boolean;
        calibrated: boolean;
        captures: number;
    };
    calibration: CalibrationData | null;
    constructor(session: Session);
    resetCalibrationPoints(): void;
    resetCameraCalibration(): void;
    loadCameraCalibration(): boolean;
    storeCameraCalibration(): boolean;
    findChessBoardCorners(highlight?: boolean): void;
    findChessBoardCornersCaptured(): void;
    findChessBoardCornersCaptureReady(): void;
    findChessBoardCornersCaptureNotReady(): void;
    setCaptureNextcalibrationPoints(): void;
    calibrate(size: {
        width: number;
        height: number;
    }): void;
    calibrationFinished(data: WorkerReturnMessage): void;
}
//# sourceMappingURL=Calibration.d.ts.map