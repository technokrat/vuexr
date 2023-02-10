/// <reference types="w3c-generic-sensor" />
import { mat4, quat, vec3 } from "gl-matrix";
import Session from "./Session";
import { Transformation } from "./Poser";
interface IirFilter {
    singleStep: (input: number) => number;
}
export default class MotionEstimator {
    session: Session;
    iirFilter: {
        x: IirFilter;
        y: IirFilter;
        z: IirFilter;
    };
    accelerometerDrift: vec3;
    velocity: vec3;
    position: vec3;
    orientation: quat;
    motionStatus: {
        acceleration: {
            error?: Error | string | null;
        };
        gyro: {
            error?: Error | string | null;
        };
    };
    accelerometer?: LinearAccelerationSensor;
    orientationSensor?: RelativeOrientationSensor;
    constructor(session: Session);
    readingHandler(): void;
    init(): Promise<void>;
    run(): void;
    stop(): void;
    getOffsetMatrix(referenceTransform: {
        orientation: quat;
        position: vec3;
    }): mat4;
    getCurrentTransform(): Transformation;
}
export {};
//# sourceMappingURL=MotionEstimator.d.ts.map