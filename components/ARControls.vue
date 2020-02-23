<template>
  <div class="controls">
      <button v-if="!calibrated" :disabled="!captureReady" class="capture-image" v-on:click="captureCalibrationPoints">Capture Frame</button>
      <button v-if="!calibrated" :disabled="!captures" v-on:click="calibrate">
        <span v-if="!calibrated">Calibrate</span>
        <span v-else>Recalibrate</span>
      </button>
      <button :disabled="!captures && !calibrated" v-on:click="reset">Reset</button>
      <span v-if="!calibrated" class="hint-text">{{captures}}&nbsp;Captures</span>
      <span v-else class="hint-text">Calibrated</span>
  </div>
</template>

<script>
  import Vue from "vue";
  import Session from "../src/Vision/Session";

  const ARControls = Vue.extend({
    data () {
      return {

      }
    },
    props: {
      session: Session,
      status: Object
    },
    mounted () {

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
    }
  });
  export default ARControls;
</script>

<style>

</style>
