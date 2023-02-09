<template>
  <div class="controls" v-if="status">
    <button
      v-if="!status.calibration?.calibrated"
      :disabled="!status.calibration?.captureReady"
      class="capture-image"
      v-on:click="captureCalibrationPoints"
    >
      Capture
    </button>
    <button
      v-if="!status.calibration?.calibrated"
      :disabled="(status.calibration?.captures ?? 0) < 5"
      v-on:click="calibrate"
    >
      <span v-if="!status.calibration?.calibrated">Calibrate</span>
      <span v-else>Recalibrate</span>
    </button>
    <button
      :disabled="
        !status.calibration?.captures && !status.calibration?.calibrated
      "
      v-on:click="reset"
    >
      Reset
    </button>
    <span v-if="!status.calibration?.calibrated" class="hint-text"
      >{{ status.calibration?.captures }}&nbsp;Captures</span
    >
    <span v-else class="hint-text">Calibrated</span>
  </div>
</template>

<script lang="ts" setup>
import Session from "../vision/Session";
import {
  inject,
} from "vue";
import { ARViewStatus } from "../types";

const session = inject<Session>("session")!;
const props = defineProps<{ status: ARViewStatus }>();

function captureCalibrationPoints() {
  session.calibration.setCaptureNextcalibrationPoints();
}
function calibrate() {
  session.calibrate();
}
function reset() {
  session.resetCalibration();
}
</script>

<style scoped lang="scss">
.controls {
  color-scheme: light;
  display: flex;
  gap: 2px;
  align-items: center;

  button {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 2px;
    border: none;
    padding: 5px 10px;
  }

  button:disabled {
    background-color: rgba(255, 255, 255, 0.8);
  }

  .capture-image {
    background-color: rgba(255, 0, 0, 0.8);
    color: white;
    box-shadow: 0 0 4px rgba(255, 64, 64, 1);
  }

  .capture-image:disabled {
    background-color: rgba(128, 0, 0, 0.6);
    border: none; /* some kind of blue border */
    box-shadow: none;
    color: #ccc;
  }

  .hint-text {
    font-size: 0.8rem;
    color: white;
    margin-left: 10px;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  }
}
</style>
