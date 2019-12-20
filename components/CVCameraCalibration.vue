<template>
  <div>
    <video style="width: 100%; display: none;" ref="video"></video>
    <canvas style="width: 100%;" ref="canvas"></canvas>
    <button v-on:click="takeImage">Take Photo</button>
    <button v-on:click="calibrate">Calibrate</button>
    <button v-on:click="reset">Reset</button>
    <span>{{images.length}} images taken</span>
  </div>
</template>

<script>
  import XRVideoCamera from "../src/XRVideoCamera";

  const CVCameraCalibration = {
    name: 'cv-calibration',
    data() {
      return {
        images: [],
      };
    },
    methods: {
      takeImage() {

      },
      calibrate() {

      },
      reset() {

      },
    },
    mounted() {
      this.$data.camera = new XRVideoCamera(this.$refs.video, this.$refs.canvas, {});
      this.$data.camera.load();
    }
  };
  export default CVCameraCalibration;
</script>

<style>

</style>
