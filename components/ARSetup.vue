<template>
  <div class="setup">
    <div v-if="status">
      <h4 class="title">Augmented Reality Setup</h4>
      <div class="status-line">
        Video
        <span v-if="this.status.feed.error" class="status-value" :title="this.status.feed.error">❌</span>
        <span v-else class="status-value" :title="this.status.feed.available">✓</span>
      </div>
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
        <span v-if="!this.status.worker.initialized" class="status-value">❌</span>
        <span v-else class="status-value">✓</span>
      </div>
      <hr>
      <select class="camera-selection" v-model="selected" @change="this.selectCamera">
        <option disabled value="">Please select a Camera</option>
        <option v-for="item in availableCameras" :value="item.deviceId">{{item.label}}</option>
      </select>
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
    box-sizing: border-box;
    max-width: 100%;
    width: 300px;
    padding: 20px 20px;
    margin: 20px;
    background-color: white;
    border-radius: 4px;
  }

  .camera-selection {
    width: 100%;
  }

  .status-value {
    float: right;
  }

  .title {
    text-align: center;
  }

</style>
