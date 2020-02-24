<template>
  <div class="setup">
    <div v-if="status">
      <div class="close-button" @click="close">×</div>
      <h2 class="title">AR Setup</h2>
      <div class="status-line">
        Video
        <span v-if="this.status.feed.error" class="status-value" :title="this.status.feed.error">✗</span>
        <span v-else class="status-value" :title="this.status.feed.available">✓</span>
      </div>
      <select class="camera-selection" style="margin-top: 5px" v-model="selected" @change="this.selectCamera">
        <option disabled value="">Please select a Camera</option>
        <option v-for="item in availableCameras" :value="item.deviceId">{{item.label}}</option>
      </select>
      <hr>
      <div class="status-line">
        Accelerometer
        <span v-if="this.status.motion.acceleration.error" class="status-value" :title="this.status.motion.acceleration.error">⚠</span>
        <span v-else class="status-value">✓</span>
      </div>
      <hr>
      <div class="status-line">
        Gyroscope
        <span v-if="this.status.motion.gyro.error" class="status-value" :title="this.status.motion.gyro.error">⚠</span>
        <span v-else class="status-value">✓</span>
      </div>
      <hr>
      <div class="status-line">
        Computer Vision
        <span v-if="!this.status.worker.initialized" class="status-value">✗</span>
        <span v-else class="status-value">✓</span>
      </div>
      <hr>
      <div class="status-line">
        Calibration
        <span v-if="!this.status.calibration.calibrated" class="status-value">✗</span>
        <span v-else class="status-value">✓</span>
      </div>
      <div v-if="this.status.calibration.calibrated" style="margin-top: 15px; text-align: center;">
        <button class="reset-button" @click="this.reset">Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import Session from "../src/Vision/Session";

  const ARSetup = Vue.extend({
    data () {
      return {
        selected: null
      }
    },
    computed: {
      availableCameras () {
        return this.status.feed.available
      }
    },
    props: {
      session: Session,
      status: Object
    },
    methods: {
      selectCamera (event) {
        this.session.feed.selectCamera(this.selected)
      },
      reset() {
        this.session.resetCalibration()
      },
      close() {
        this.$emit('close')
      }
    },
    mounted () {
      this.selected = this.session.feed.feedStatus.selected
    },
    updated() {
      this.selected = this.session.feed.feedStatus.selected;
    }
  });
  export default ARSetup;
</script>

<style>
  .setup {
    position: relative;
    box-sizing: border-box;
    max-width: 100%;
    width: 300px;
    height: 360px;
    padding: 10px 20px;
    background-color: rgba(255,255,255,0.8);
    backdrop-filter: blur(5px);
    border-radius: 4px;
  }

  .close-button {
    position: absolute;
    top: 6px;
    right: 10px;
    font-size: 1.5rem;
    line-height: 1.5rem;
    cursor: pointer;
  }

  .camera-selection {
    width: 100%;
  }

  .status-value {
    float: right;
  }

  .title {
    font-weight: lighter;
    text-align: center;
  }

</style>
