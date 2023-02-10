import { vec3, mat4, mat3 } from "gl-matrix";

export interface CalibrationData {
  cameraMatrix: mat3;
  distCoeffs: [number, number, number, number, number];
}

export interface ARViewStatus {
  motion?: { acceleration: { error?: Error | string | null }; gyro: { error?: Error | string | null } };
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

export enum WorkerOperation {
  RESET_CALIBRATION_POINTS,
  FIND_CHESSBOARD_CORNERS,
  CALIBRATE,
  DETECT,
}

export enum WorkerReturn {
  WORKER_READY,
  WORKER_FAILED,
  FIND_CHESSBOARD_CORNERS_CAPTURED,
  FIND_CHESSBOARD_CORNERS_READY,
  FIND_CHESSBOARD_CORNERS_NOT_READY,
  CALIBRATE,
  DETECT,
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