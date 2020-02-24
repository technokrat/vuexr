<template>
  <div class="controls">
      <div v-if="this.status">
        <button v-if="!this.status.calibration.calibrated" :disabled="!this.status.calibration.captureReady" class="capture-image" v-on:click="captureCalibrationPoints">Capture Frame</button>
        <button v-if="!this.status.calibration.calibrated" :disabled="!this.status.calibration.captures" v-on:click="calibrate">
          <span v-if="!this.status.calibration.calibrated">Calibrate</span>
          <span v-else>Recalibrate</span>
        </button>
        <button :disabled="!this.status.calibration.captures && !this.status.calibration.calibrated" v-on:click="reset">Reset</button>
        <span v-if="!this.status.calibration.calibrated" class="hint-text">{{this.status.calibration.captures}}&nbsp;Captures</span>
        <span v-else class="hint-text">Calibrated</span>
      </div>
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
  .capture-image {
    background-color: rgba(255,0,0,0.8);
    color: white;
  }

  .capture-image:disabled {
    background-color: rgba(255,0,0,0.6);
    color: #ddd;
  }

  .hint-text {
    font-size: 0.8rem;
    color: white;
    margin-left: 10px;
    text-shadow: 0 1px 1px rgba(0,0,0,0.5);
  }
</style>
