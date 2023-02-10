import { vec3, mat4, mat3 } from "gl-matrix";
export interface CalibrationData {
    cameraMatrix: mat3;
    distCoeffs: [number, number, number, number, number];
}
export interface ARViewStatus {
    motion?: {
        acceleration: {
            error?: Error | string | null;
        };
        gyro: {
            error?: Error | string | null;
        };
    };
    initialized?: boolean;
    feed?: {
        selected?: string | null;
        available?: MediaDeviceInfo[];
        error?: Error | string | null;
    };
    calibration?: {
        calibrated: boolean;
        captureReady: boolean;
        captures: number;
    };
    setup?: {
        show: boolean;
    };
}
export declare enum WorkerOperation {
    RESET_CALIBRATION_POINTS = 0,
    FIND_CHESSBOARD_CORNERS = 1,
    CALIBRATE = 2,
    DETECT = 3
}
export declare enum WorkerReturn {
    WORKER_READY = 0,
    WORKER_FAILED = 1,
    FIND_CHESSBOARD_CORNERS_CAPTURED = 2,
    FIND_CHESSBOARD_CORNERS_READY = 3,
    FIND_CHESSBOARD_CORNERS_NOT_READY = 4,
    CALIBRATE = 5,
    DETECT = 6
}
export interface WorkerMarker {
    id: string;
    rvec: vec3;
    tvec: vec3;
    rmat: mat4;
}
export interface WorkerData {
    operation: WorkerOperation;
    width?: number;
    height?: number;
    image?: ImageBitmap;
    calibration?: CalibrationData;
    captureNextCalibrationPoints?: boolean;
}
export interface WorkerReturnMessage {
    operation: WorkerReturn;
    calibration?: CalibrationData;
    markers?: WorkerMarker[];
}
//# sourceMappingURL=types.d.ts.map