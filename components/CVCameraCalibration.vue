<template>
  <div>
    <video style="width: 100%; display: none;" ref="video"></video>
    <canvas style="width: 100%;" ref="canvas"></canvas>
    <button v-on:click="captureCalibrationPoints">Capture Points</button>
    <button v-on:click="calibrate">Calibrate</button>
    <button v-on:click="reset">Reset</button>
  </div>
</template>

<script>
  import XRVideoCamera from "../src/XRVideoCamera";
  import cv from '../vendor/opencv.js';

  const CVCameraCalibration = {
    name: 'cv-calibration',
    data() {
      return {
        captureCalibrationPointsOnDetection: false,
        calibrationImagePoints: null,
        calibrationObjectPoints: null,
        camera: null
      };
    },
    methods: {
      captureCalibrationPoints() {
        this.captureCalibrationPointsOnDetection = true;
      },
      calibrate() {
        this.camera.calibrate(this.calibrationImagePoints, this.calibrationObjectPoints)
        this.$data.camera.startDetectAruco()
      },
      reset() {
        this.camera.resetCalibrationPoints()
      },
    },
    mounted() {
      this.$data.camera = new XRVideoCamera(this.$refs.video, this.$refs.canvas, {});
      this.$data.camera.load().then(() => {
        this.$data.camera.startFindChessboardCorners((points) => {
          if (this.captureCalibrationPointsOnDetection) {
            this.camera.captureCalibrationPoints(points)
            this.captureCalibrationPointsOnDetection = false;
          } else {
            points.imagePoints.delete()
          }
        });
      })
    }
  };
  export default CVCameraCalibration;
</script>

<style>

</style>
