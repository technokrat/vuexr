
const REFRESH_RATE = 1/60;
const VELOCITY_DECAY = 0.98;

export default class MotionEstimator {
  constructor(session) {
    this.session = session;

    this.orientation = null;
    this.motion = null;
    this.velocity = {
      x: 0,
      y: 0,
      z: 0
    };
    this.position = {
      x: 0,
      y: 0,
      z: 0
    }

    window.addEventListener('deviceorientation', e => {
      this.orientation = e
    });

    window.addEventListener("devicemotion", e => {
      if (this.motion && this.orientation) {
        const oldTimeStamp = this.motion.timeStamp;
        const interval = (e.timeStamp - oldTimeStamp) / 1000;

        if (interval <= 0.2) {
          this.position.x += this.velocity.x * interval;
          this.position.y += this.velocity.y * interval;
          this.position.z += this.velocity.z * interval;

          this.velocity.x += e.acceleration.x * interval;
          this.velocity.y += e.acceleration.y * interval;
          this.velocity.z += e.acceleration.z * interval;
        }
      }

      this.motion = e;

      const decay = VELOCITY_DECAY;

      this.velocity.x *= decay;
      this.velocity.y *= decay;
      this.velocity.z *= decay;

      this.session.eventCallback({
        name: 'motionUpdated',
        acceleration: this.motion.acceleration,
        velocity: this.velocity,
        position: this.position,
        orientation: this.orientation,
      })
    });
  };


}
