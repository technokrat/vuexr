import Calibration from "./Calibration";
import Detector from "./Detector";
import CameraFeed from "./CameraFeed";
import Poser from "./Poser";
import MotionEstimator from "./MotionEstimator";
import { ARViewStatus, WorkerReturnMessage } from "../types";
import { vec3, vec4 } from "gl-matrix";
export declare enum SessionState {
    CALIBRATION = 0,
    DETECTION = 1
}
export declare enum SessionCallbackType {
    statusChanged = 0,
    motion = 1
}
interface SessionSetup {
    show: boolean;
}
export interface Vector3 {
    x: number;
    y: number;
    z: number;
}
export type Quaternion = [number, number, number, number];
export interface Motion {
    acceleration: vec4;
    velocity: vec3;
    position: vec3;
}
export interface SessionCallbackArgs {
    name: SessionCallbackType;
    status?: ARViewStatus;
    motion?: Motion;
}
type SessionCallback = (args: SessionCallbackArgs) => void;
export default class Session {
    initialized: boolean;
    workerInitialized: boolean;
    name: string;
    state: SessionState;
    feed: CameraFeed;
    poser: Poser;
    motion: MotionEstimator;
    calibration: Calibration;
    detector: Detector;
    eventCallback?: SessionCallback;
    focusEventRegistration: () => Promise<void>;
    blurEventRegistration: () => void;
    setup: SessionSetup;
    canvas?: HTMLCanvasElement;
    context2d?: CanvasRenderingContext2D | null;
    worker?: Worker;
    constructor(name?: string);
    updateStatus(): void;
    loadSetup(): SessionSetup;
    storeSetup(): void;
    showSetup(show: boolean): void;
    init(canvas: HTMLCanvasElement, eventCallback: SessionCallback): Promise<void>;
    initWorker(): Promise<void>;
    workerHandler(msg: {
        data: WorkerReturnMessage;
    }): void;
    run(): Promise<void>;
    pause(): void;
    calibrate(): void;
    resetCalibration(): void;
    process(): void;
}
export {};
//# sourceMappingURL=Session.d.ts.map