
export default class MotionEstimator {
  constructor(session) {
    this.session = session;

    this.gyroscope = new Gyroscope({frequency: 60});

    this.gyroscope.addEventListener('reading', e => {
      console.log("Angular velocity along the X-axis " + this.gyroscope.x);
      console.log("Angular velocity along the Y-axis " + this.gyroscope.y);
      console.log("Angular velocity along the Z-axis " + this.gyroscope.z);
    });
    this.gyroscope.start();
    console.log(this.gyroscope)
  };
}
