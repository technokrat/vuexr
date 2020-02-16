import {mat4, vec4, quat} from 'gl-matrix'

const FREQUENCY = 60;
const VELOCITY_DECAY = 0.99;
const DRIFT_COMPENSATION = 1 / FREQUENCY * 0.1;

export default class MotionEstimator {
  constructor(xr) {
    this.xr = xr;
    this.accelerometer = new Accelerometer({frequency: FREQUENCY});

    this.timestamp = null;
    this.accelerometerDrift = {
      x: 0,
      y: 9.95,
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
      if (this.xr.currentTransform) {


        const acceleration = vec4.fromValues(this.accelerometer.x, this.accelerometer.y, this.accelerometer.z, 1);

        const rotationQuat = quat.fromValues(
          this.xr.currentTransform.orientation.x,
          this.xr.currentTransform.orientation.y,
          this.xr.currentTransform.orientation.z,
          this.xr.currentTransform.orientation.w);
        const rotationMat = mat4.create();
        mat4.fromQuat(rotationMat, rotationQuat);

        vec4.transformMat4(acceleration, acceleration, rotationMat);

        // x is right, y is up, z is out of wall

        this.accelerometerDrift.x = this.accelerometerDrift.x * (1 - DRIFT_COMPENSATION) + acceleration[0] * DRIFT_COMPENSATION;
        this.accelerometerDrift.y = this.accelerometerDrift.y * (1 - DRIFT_COMPENSATION) + acceleration[1] * DRIFT_COMPENSATION;
        this.accelerometerDrift.z = this.accelerometerDrift.z * (1 - DRIFT_COMPENSATION) + acceleration[2] * DRIFT_COMPENSATION;

        this.velocity.x += (acceleration[0] - this.accelerometerDrift.x) / FREQUENCY;
        this.velocity.y += (acceleration[1] - this.accelerometerDrift.y) / FREQUENCY;
        this.velocity.z += (acceleration[2] - this.accelerometerDrift.z) / FREQUENCY;

        //this.position.x += this.velocity.x / FREQUENCY * 1000;
        //this.position.y += this.velocity.y / FREQUENCY * 1000;
        //this.position.z += this.velocity.z / FREQUENCY * 1000;
      }

      const decay = VELOCITY_DECAY;

      this.velocity.x *= decay;
      this.velocity.y *= decay;
      this.velocity.z *= decay;
    });

    this.accelerometer.start();
  };


}
