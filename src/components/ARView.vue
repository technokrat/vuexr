<template>
  <div class="ar-view-wrapper" ref="wrapper">
    <div class="ar-view">
      <canvas class="ar-canvas" ref="canvas"></canvas>
      <div
        :style="{
          opacity:
            state.status.initialized && state.status.calibration?.calibrated
              ? 1.0
              : 0.0,
        }"
        class="elements"
        ref="elements"
      >
        <slot :trackedMarkers="state.trackedMarkers"> </slot>
      </div>
    </div>
    <div @click="openSetup" class="setup-button">⚙</div>
    <div
      v-if="
        state.status.initialized &&
        state.status.feed?.selected &&
        !state.status.calibration?.calibrated
      "
      class="controls-container"
    >
      <ARControls :session="session" :status="state.status"></ARControls>
    </div>
    <div v-if="state.status.initialized" class="setup-container">
      <ARSetup
        v-if="state.status.setup?.show"
        :session="session"
        :status="state.status"
        @close="closeSetup"
      ></ARSetup>
    </div>
    <div v-else class="loading-text">Loading&hellip;</div>
  </div>
</template>

<script lang="ts" setup>
import ARSetup from "./ARSetup.vue";
import ARControls from "./ARControls.vue";

import { reactive, inject, ref, onMounted, onUnmounted, provide } from "vue";
import Session, {
  SessionCallbackArgs,
  SessionCallbackType,
} from "../vision/Session";
import { VueXRManager } from "../VueXRManager";
import { ARViewStatus } from "../types";

const props = defineProps<{ name?: string }>();

const vueXRManager: VueXRManager = inject("vuexr")!;
const session: Session = vueXRManager.requestSession(props.name);
provide("session", session);

const state = reactive<{ status: ARViewStatus; trackedMarkers: string[] }>({
  status: {},
  trackedMarkers: [],
});
const canvas = ref<HTMLCanvasElement>();
const wrapper = ref<HTMLDivElement>();
const id = Symbol();

function closeSetup() {
  session.showSetup(false);
}
function openSetup() {
  session.showSetup(true);
}

function sessionCallback(event: SessionCallbackArgs) {
  if (event.name === SessionCallbackType.statusChanged && event.status) {
    state.status = event.status;
  }
}

function resizeCanvas() {
  const aspectRatio = (canvas.value?.width ?? 0) / (canvas.value?.height ?? 0);
  const availableWidth = wrapper.value?.clientWidth ?? 0;
  const availableHeight = wrapper.value?.clientHeight ?? 0;
  const availableAspectRatio = availableWidth / availableHeight;

  if (aspectRatio >= availableAspectRatio) {
    const width = availableWidth;
    const height = availableWidth / aspectRatio;

    if (canvas.value) {
      canvas.value.style.width = `${width}px`;
      canvas.value.style.height = `${height}px`;
    }
  } else {
    const width = availableHeight * aspectRatio;
    const height = availableHeight;

    if (canvas.value) {
      canvas.value.style.width = `${width}px`;
      canvas.value.style.height = `${height}px`;
    }
  }
}

const resizeCanvasCaller = () => {
  resizeCanvas();
};

onMounted(async () => {
  await session.init(canvas.value!, (event) => {
    sessionCallback(event);
  });

  session.poser.registerView(id, (tracked: string[]) => {
    state.trackedMarkers = tracked;
  });

  await session.run();
  await resizeCanvas();

  window.addEventListener("resize", resizeCanvasCaller);
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeCanvasCaller);
  session.poser.unregisterView(id);
  session.pause();
});
</script>

<style scoped>
.ar-view-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #333344;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.ar-view {
  position: relative;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
}

.setup-button {
  position: absolute;
  z-index: 2;
  top: 8px;
  right: 8px;
  color: white;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 1.2rem;
}

.setup-container {
  position: absolute;
  z-index: 5;
  top: max(calc(50% - 180px), 10px);
  left: calc(50% - 150px);
}

.controls-container {
  position: absolute;
  z-index: 1;
  bottom: 8px;
  left: 8px;
}

.loading-text {
  position: absolute;
  top: calc(50% - 0.8rem);
  text-align: center;
  font-size: 0.8rem;
  line-height: 0.8rem;
  color: white;
  margin-left: 10px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
}
</style>
