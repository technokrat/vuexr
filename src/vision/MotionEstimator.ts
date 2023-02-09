import { mat4, vec4, quat, vec3 } from "gl-matrix";
//@ts-ignore
import Fili from "fili";
import Session, { SessionCallbackType } from "./Session";
import { Transformation } from "./Poser";

const FREQUENCY = 60;
const VELOCITY_DECAY = 0.95;
const POSITION_DECAY = 0.995;
// const DRIFT_COMPENSATION = 1 / FREQUENCY * 0.000001;

export default class MotionEstimator {
  session: Session;
  iirFilter: { x: any; y: any; z: any };
  accelerometerDrift: vec3;
  velocity: vec3;
  position: vec3;
  motionStatus: { acceleration: { error: any }; gyro: { error: any } };
  accelerometer?: LinearAccelerationSensor;
  orientationSensor?: RelativeOrientationSensor;
  orientation?: quat;

  constructor(session: Session) {
    this.session = session;

    const iirCalculator = new Fili.CalcCascades();
    // const availableFilters = iirCalculator.available();

    const iirFilterCoeffs = iirCalculator.lowpass({
      order: 3,
      characteristic: "butterworth",
      Fs: FREQUENCY,
      Fc: 5,
      gain: 0,
      preGain: false,
    });

    this.iirFilter = {
      x: new Fili.IirFilter(iirFilterCoeffs),
      y: new Fili.IirFilter(iirFilterCoeffs),
      z: new Fili.IirFilter(iirFilterCoeffs),
    };

    this.accelerometerDrift = vec3.create();
    this.velocity = vec3.create();
    this.position = vec3.create();

    this.motionStatus = {
      acceleration: {
        error: null,
      },
      gyro: {
        error: null,
      },
    };
  }

  readingHandler(event: Event) {
    const acceleration = vec4.fromValues(
      this.accelerometer?.x ?? 0,
      -(this.accelerometer?.z ?? 0),
      this.accelerometer?.y ?? 0,
      1
    );

    const values = this.orientationSensor?.quaternion ?? [0, 0, 0, 1.0];

    this.orientation = quat.fromValues(
      values[0],
      values[1],
      values[2],
      values[3]
    );

    vec4.transformQuat(acceleration, acceleration, this.orientation);

    acceleration[0] = this.iirFilter.x.singleStep(acceleration[0]);
    acceleration[1] = this.iirFilter.y.singleStep(acceleration[1]);
    acceleration[2] = this.iirFilter.z.singleStep(acceleration[2]);

    // this.accelerometerDrift[0] = this.accelerometerDrift[0] * (1 - DRIFT_COMPENSATION) + acceleration[0] * DRIFT_COMPENSATION;
    // this.accelerometerDrift[1] = this.accelerometerDrift[1] * (1 - DRIFT_COMPENSATION) + acceleration[1] * DRIFT_COMPENSATION;
    // this.accelerometerDrift[2] = this.accelerometerDrift[2] * (1 - DRIFT_COMPENSATION) + acceleration[2] * DRIFT_COMPENSATION;

    // this.velocity[0] += (acceleration[0] - this.accelerometerDrift[0]) / FREQUENCY;
    // this.velocity[1] += (acceleration[1] - this.accelerometerDrift[1]) / FREQUENCY;
    // this.velocity[2] += (acceleration[2] - this.accelerometerDrift[2]) / FREQUENCY;

    this.velocity[0] += acceleration[0] / FREQUENCY;
    this.velocity[1] += acceleration[1] / FREQUENCY;
    this.velocity[2] += acceleration[2] / FREQUENCY;

    this.position[0] += (this.velocity[0] / FREQUENCY) * 1000;
    this.position[1] += (this.velocity[1] / FREQUENCY) * 1000;
    this.position[2] += (this.velocity[2] / FREQUENCY) * 1000;

    this.velocity[0] *= VELOCITY_DECAY;
    this.velocity[1] *= VELOCITY_DECAY;
    this.velocity[2] *= VELOCITY_DECAY;

    this.position[0] *= POSITION_DECAY;
    this.position[1] *= POSITION_DECAY;
    this.position[2] *= POSITION_DECAY;

    // if (this.session.eventCallback) {
    //   this.session.eventCallback({
    //     name: SessionCallbackType.motion,
    //     motion: {
    //       acceleration,
    //       velocity: this.velocity,
    //       position: this.position,
    //     },
    //   });
    // }

    this.session.poser.readjustElements();
  }

  async init() {
    if (LinearAccelerationSensor && RelativeOrientationSensor) {
      try {
        this.accelerometer = new LinearAccelerationSensor({
          frequency: FREQUENCY,
          referenceFrame: "screen",
        });
        this.accelerometer.addEventListener("error", (event) => {
          if (event.error.name === "NotAllowedError") {
            this.motionStatus.acceleration = {
              error: event.error,
            };
          } else if (event.error.name === "NotReadableError") {
            this.motionStatus.acceleration = {
              error: event.error,
            };
          }
          this.accelerometer?.stop();

          this.session.updateStatus();
        });

        this.orientationSensor = new RelativeOrientationSensor({
          frequency: FREQUENCY,
          referenceFrame: "screen",
        });
        this.orientationSensor.addEventListener("error", (event) => {
          if (event.error.name === "NotAllowedError") {
            this.motionStatus.gyro = {
              error: event.error,
            };
          } else if (event.error.name === "NotReadableError") {
            this.motionStatus.gyro = {
              error: event.error,
            };
          }
          this.orientationSensor?.stop();
          this.session.updateStatus();
        });

        this.accelerometer.addEventListener("reading", (e) => {
          this.readingHandler(e);
        });

        this.run();
      } catch (error: any) {
        // Handle construction errors.
        if (error.name === "SecurityError") {
          this.motionStatus = {
            acceleration: {
              error: "Permission denied",
            },
            gyro: {
              error: "Permission denied",
            },
          };
        } else if (error.name === "ReferenceError") {
          this.motionStatus = {
            acceleration: {
              error: "Sensor is not supported by the User Agent.",
            },
            gyro: {
              error: "Sensor is not supported by the User Agent.",
            },
          };
        } else {
          this.motionStatus = {
            acceleration: {
              error: error,
            },
            gyro: {
              error: error,
            },
          };
        }
      }
    } else {
      this.motionStatus = {
        acceleration: {
          error: "NotSupported",
        },
        gyro: {
          error: "NotSupported",
        },
      };
    }
  }

  run() {
    if (this.orientationSensor) {
      this.orientationSensor.start();
    }
    if (this.accelerometer) {
      this.accelerometer.start();
    }
  }

  stop() {
    if (this.orientationSensor) {
      this.orientationSensor.stop();
    }
    if (this.accelerometer) {
      this.accelerometer.stop();
    }
  }

  getOffsetMatrix(referenceTransform: { orientation: quat; position: vec3 }) {
    if (
      !this.motionStatus.acceleration.error &&
      !this.motionStatus.gyro.error
    ) {
      const referenceRotationQuat = quat.fromValues(
        referenceTransform.orientation[0],
        -referenceTransform.orientation[1],
        -referenceTransform.orientation[2],
        referenceTransform.orientation[3]
      );
      const referenceTransformMat = mat4.create();
      mat4.fromQuat(referenceTransformMat, referenceRotationQuat);

      mat4.translate(
        referenceTransformMat,
        referenceTransformMat,
        referenceTransform.position
      );

      const currentRotationQuat = quat.fromValues(
        this.orientation![0],
        -this.orientation![1],
        -this.orientation![2],
        this.orientation![3]
      );

      const currentTransformMat = mat4.create();
      mat4.fromQuat(currentTransformMat, currentRotationQuat);

      mat4.translate(currentTransformMat, currentTransformMat, this.position);
      mat4.invert(currentTransformMat, currentTransformMat);

      const differenceMatrix = mat4.create();
      mat4.multiply(
        differenceMatrix,
        currentTransformMat,
        referenceTransformMat
      );

      return differenceMatrix;
    } else {
      return mat4.create();
    }
  }

  getCurrentTransform(): Transformation {
    return {
      orientation: this.orientation!,
      position: this.position
    };
  }
}
