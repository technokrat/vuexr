<template>
  <div class="setup">
    <div v-if="status">
      <div class="close-button" @click="close">×</div>
      <div v-if="showHowToCalibrate">
        <h2 class="title">Camera Calibration</h2>
        <p>To make VueXR know how to project virtual elements to the real world, we have to calibrate your camera first.</p>
        <ol>
          <li>Print or display this <a href="https://docs.opencv.org/master/pattern.png" target="_blank">chessboard pattern</a> on another device.</li>
          <li>Take a steady aim at the pattern with your camera.</li>
          <li>Press the <strong>Capture</strong> button below.</li>
          <li>Repeat for at least 4 other different perspectives.</li>
          <li>Press the <b>Calibrate</b> button.</li>
        </ol>
        <div style="margin-top: 20px; text-align: center;">
          <button class="reset-button" @click="showHowToCalibrate = false">Back</button>
        </div>
      </div>
      <div v-else>
        <h2 class="title">AR Setup</h2>
        <div class="status-line">
          Video
          <span v-if="this.status.feed.error" class="status-value" :title="this.status.feed.error">✗</span>
          <span v-else class="status-value">✓</span>
        </div>
        <select class="camera-selection" style="margin-top: 5px" v-model="selected" @change="this.selectCamera">
          <option disabled value="">Please select a Camera</option>
          <option v-for="item in availableCameras" :value="item.deviceId">
            <span v-if="item.label">{{item.label}}</span>
            <span v-else>{{item.deviceId}}</span>
          </option>
        </select>
        <hr>
        <div class="status-line">
          Accelerometer
          <span v-if="this.status.motion && this.status.motion.acceleration.error" class="status-value" :title="this.status.motion.acceleration.error">⚠</span>
          <span v-else class="status-value">✓</span>
        </div>
        <hr>
        <div class="status-line">
          Gyroscope
          <span v-if="this.status.motion && this.status.motion.gyro.error" class="status-value" :title="this.status.motion.gyro.error">⚠</span>
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
        <div v-if="this.status.calibration.calibrated" style="margin-top: 20px; text-align: center;">
          <button class="reset-button" @click="this.reset">Reset Calibration</button>
        </div>
        <div v-else-if="!this.status.feed.error && this.status.worker.initialized" style="margin-top: 20px; text-align: center;">
          <button class="reset-button" @click="showHowToCalibrate = true">How to calibrate</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Session from "../src/Vision/Session";
  import {defineComponent} from "vue";

  export default defineComponent({
    data () {
      return {
        selected: null,
        showHowToCalibrate: false,
      }
    },
    computed: {
      availableCameras () {
        return this.status.feed.available
      },
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
      this.selected = this.session.feed.feedStatus.selected;
    },
    updated() {
      this.selected = this.session.feed.feedStatus.selected;
    }
  });
</script>

<style scoped>
  .setup {
    position: relative;
    box-sizing: border-box;
    max-width: 100%;
    max-height: 80vh;
    overflow-y: auto;
    width: 300px;
    padding: 10px 20px 20px 20px;
    background-color: rgba(255,255,255,0.8);
    backdrop-filter: blur(5px);
    border-radius: 4px;
    font-size: 0.8rem;
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

  button {
    background-color: rgba(32,32,32,0.8);
    color: white;
    border-radius: 30px;
    padding: 10px 15px;
    margin-bottom: 5px;
    cursor: pointer;
    border: none;
  }

  button:focus {
    border: none;
    outline: none;
  }

  hr {
    border: none;
    border-top: 1px solid rgba(0,0,0,0.4);
  }
</style>
