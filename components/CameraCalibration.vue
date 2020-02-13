<template>
  <div>
    <video style="width: 100%; display: none;" ref="video"></video>
    <canvas style="width: 100%;" ref="canvas"></canvas>
    <button v-on:click="captureCalibrationPoints">Capture Calibration Frame</button>
    <button v-on:click="calibrate">Calibrate</button>
    <button v-on:click="reset">Reset</button>
  </div>
</template>

<script>
  import Session from "../src/Vision/Session";

  const CameraCalibration = {
    name: 'camera-calibration',
    data() {
      return {
        session: null
      };
    },
    methods: {
      captureCalibrationPoints() {
        this.session.calibration.setCaptureNextcalibrationPoints()
      },
      calibrate() {
        this.session.calibrate()
      },
      reset() {
        this.session.resetCalibration()
      },
    },
    mounted() {
      this.session = new Session(this.$refs.video, this.$refs.canvas);
    }
  };
  export default CameraCalibration;
</script>

<style>

</style>
