import {mat4, vec4, quat, vec3} from 'gl-matrix'
import Fili from 'fili'

const FREQUENCY = 60;
const VELOCITY_DECAY = 0.95;
const POSITION_DECAY = 0.995;
const DRIFT_COMPENSATION = 1 / FREQUENCY * 0.000001;

export default class MotionEstimator {
  constructor(session) {
    this.session = session;
    this.accelerometer = new LinearAccelerationSensor({frequency: FREQUENCY, referenceFrame: 'screen'});
    this.orientationSensor = new RelativeOrientationSensor({ frequency: FREQUENCY, referenceFrame: 'screen' });

    const iirCalculator = new Fili.CalcCascades();
    const availableFilters = iirCalculator.available();

    const iirFilterCoeffs = iirCalculator.lowpass({
      order: 3,
      characteristic: 'butterworth',
      Fs: FREQUENCY,
      Fc: 5,
      gain: 0,
      preGain: false
    });

    this.iirFilter = {
      x: new Fili.IirFilter(iirFilterCoeffs),
      y: new Fili.IirFilter(iirFilterCoeffs),
      z: new Fili.IirFilter(iirFilterCoeffs)
    };

    this.accelerometerDrift = {
      x: 0,
      y: 0,
      z: 0
    };
    this.velocity = {
      x: 0,
      y: 0,
      z: 0
    };
    this.position = {
      x: 0,
      y: 0,
      z: 0
    };

    this.accelerometer.addEventListener('reading', e => {
      const acceleration = vec4.fromValues(this.accelerometer.x, -this.accelerometer.z, this.accelerometer.y, 1);
      this.orientation = Array.from(this.orientationSensor.quaternion);

      const rotationQuat = quat.fromValues(
        this.orientationSensor.quaternion[0],
        this.orientationSensor.quaternion[1],
        this.orientationSensor.quaternion[2],
        this.orientationSensor.quaternion[3]
      );

      //quat.invert(rotationQuat, rotationQuat)

      vec4.transformQuat(acceleration, acceleration, rotationQuat);

      acceleration[0] = this.iirFilter.x.singleStep(acceleration[0]);
      acceleration[1] = this.iirFilter.y.singleStep(acceleration[1]);
      acceleration[2] = this.iirFilter.z.singleStep(acceleration[2]);

      // this.accelerometerDrift.x = this.accelerometerDrift.x * (1 - DRIFT_COMPENSATION) + acceleration[0] * DRIFT_COMPENSATION;
      // this.accelerometerDrift.y = this.accelerometerDrift.y * (1 - DRIFT_COMPENSATION) + acceleration[1] * DRIFT_COMPENSATION;
      // this.accelerometerDrift.z = this.accelerometerDrift.z * (1 - DRIFT_COMPENSATION) + acceleration[2] * DRIFT_COMPENSATION;

      // this.velocity.x += (acceleration[0] - this.accelerometerDrift.x) / FREQUENCY;
      // this.velocity.y += (acceleration[1] - this.accelerometerDrift.y) / FREQUENCY;
      // this.velocity.z += (acceleration[2] - this.accelerometerDrift.z) / FREQUENCY;

      this.velocity.x += acceleration[0] / FREQUENCY;
      this.velocity.y += acceleration[1] / FREQUENCY;
      this.velocity.z += acceleration[2] / FREQUENCY;

      this.position.x += this.velocity.x / FREQUENCY * 1000;
      this.position.y += this.velocity.y / FREQUENCY * 1000;
      this.position.z += this.velocity.z / FREQUENCY * 1000;

      this.velocity.x *= VELOCITY_DECAY;
      this.velocity.y *= VELOCITY_DECAY;
      this.velocity.z *= VELOCITY_DECAY;

      this.position.x *= POSITION_DECAY;
      this.position.y *= POSITION_DECAY;
      this.position.z *= POSITION_DECAY;

      this.session.eventCallback({name: 'acceleration', acceleration})
      this.session.eventCallback({name: 'velocity', velocity: this.velocity})
      this.session.eventCallback({name: 'position', position: this.position})

      this.session.poser.readjustElements();
    });
  };

  run () {
    this.orientationSensor.start();
    this.accelerometer.start();
  }

  getOffsetMatrix(referenceTransform) {
    const referenceRotationQuat = quat.fromValues(
      referenceTransform.orientation[0],
      -referenceTransform.orientation[1],
      -referenceTransform.orientation[2],
      referenceTransform.orientation[3]);
    const referenceTransformMat = mat4.create();
    mat4.fromQuat(referenceTransformMat, referenceRotationQuat);

    mat4.translate(
      referenceTransformMat,
      referenceTransformMat,
      vec3.fromValues(
        referenceTransform.position.x,
        referenceTransform.position.y,
        referenceTransform.position.z
      )
    );

    const currentRotationQuat = quat.fromValues(
      this.orientation[0],
      -this.orientation[1],
      -this.orientation[2],
      this.orientation[3]
    );

    const currentTransformMat = mat4.create();
    mat4.fromQuat(currentTransformMat, currentRotationQuat);

    mat4.translate(
      currentTransformMat,
      currentTransformMat,
      vec3.fromValues(
        this.position.x,
        this.position.y,
        this.position.z
      )
    );
    mat4.invert(currentTransformMat, currentTransformMat);

    const differenceMatrix = mat4.create();
    mat4.multiply(differenceMatrix, currentTransformMat, referenceTransformMat);

    return differenceMatrix;
  }

  getCurrentTransform () {
    return {
      orientation: this.orientation,
      position: {
        x: this.position.x,
        y: this.position.y,
        z: this.position.z
      }
    }
  }
}


