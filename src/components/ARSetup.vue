<template>
  <div class="setup">
    <div v-if="status">
      <div class="close-button" @click="close">×</div>
      <div v-if="showHowToCalibrate">
        <h2 class="title">Camera Calibration</h2>
        <p>
          To make VueXR know how to project virtual elements to the real world,
          we have to calibrate your camera first.
        </p>
        <ol>
          <li>
            Print or display this
            <a href="https://docs.opencv.org/master/pattern.png" target="_blank"
              >chessboard pattern</a
            >
            on another device.
          </li>
          <li>Take a steady aim at the pattern with your camera.</li>
          <li>Press the <strong>Capture</strong> button below.</li>
          <li>Repeat for at least 4 other different perspectives.</li>
          <li>Press the <b>Calibrate</b> button.</li>
        </ol>
        <div style="margin-top: 20px; text-align: center">
          <button class="reset-button" @click="showHowToCalibrate = false">
            Back
          </button>
        </div>
      </div>
      <div v-else>
        <h2 class="title">AR Setup</h2>
        <div class="status-line">
          Video
          <span
            v-if="status.feed?.error"
            class="status-value"
            :title="status.feed.error"
            >✗</span
          >
          <span v-else class="status-value">✓</span>
        </div>
        <select
          class="camera-selection"
          style="margin-top: 5px"
          v-model="selected"
          @change="selectCamera"
        >
          <option disabled value="">Please select a Camera</option>
          <option v-for="item in availableCameras" :value="item.deviceId">
            <span v-if="item.label">{{ item.label }}</span>
            <span v-else>{{ item.deviceId }}</span>
          </option>
        </select>
        <hr />
        <div class="status-line">
          Accelerometer
          <span
            v-if="status.motion && status.motion.acceleration.error"
            class="status-value"
            :title="status.motion.acceleration.error"
            >⚠</span
          >
          <span v-else class="status-value">✓</span>
        </div>
        <hr />
        <div class="status-line">
          Gyroscope
          <span
            v-if="status.motion && status.motion.gyro.error"
            class="status-value"
            :title="status.motion.gyro.error"
            >⚠</span
          >
          <span v-else class="status-value">✓</span>
        </div>
        <hr />
        <div class="status-line">
          Computer Vision
          <span v-if="!status.initialized" class="status-value">✗</span>
          <span v-else class="status-value">✓</span>
        </div>
        <hr />
        <div class="status-line">
          Calibration
          <span v-if="!status.calibration?.calibrated" class="status-value"
            >✗</span
          >
          <span v-else class="status-value">✓</span>
        </div>
        <div
          v-if="status.calibration?.calibrated"
          style="margin-top: 20px; text-align: center"
        >
          <button class="reset-button" @click="reset">Reset Calibration</button>
        </div>
        <div
          v-else-if="!status.feed?.error && status.worker?.initialized"
          style="margin-top: 20px; text-align: center"
        >
          <button class="reset-button" @click="showHowToCalibrate = true">
            How to calibrate
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Session from "../vision/Session";
import {
  ref,
  onMounted,
  computed,
  onUpdated,
} from "vue";
import { ARViewStatus } from "../types";

const selected = ref<string | null>(null);
const showHowToCalibrate = ref<boolean>(false);
const props = defineProps<{ status: ARViewStatus; session: Session }>();
const availableCameras = computed(() => {
  return props.status.feed?.available;
});

const emit = defineEmits(["close"]);

function selectCamera(event: Event) {
  props.session.feed.selectCamera(selected.value!);
}
function reset() {
  props.session.resetCalibration();
}
function close() {
  emit("close");
}
onMounted(() => {
  selected.value = props.session.feed.feedStatus.selected ?? null;
});

onUpdated(() => {
  selected.value = props.session.feed.feedStatus.selected ?? null;
});
</script>

<style scoped lang="scss">
.setup {
  color-scheme: light;
  position: relative;
  box-sizing: border-box;
  max-width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  width: 300px;
  padding: 10px 20px 20px 20px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  border-radius: 4px;
  font-size: 0.8rem;

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
    background-color: rgba(32, 32, 32, 0.8);
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
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
    border: none;
    border-top: 1px solid rgba(0, 0, 0, 0.4);
  }
}
</style>
