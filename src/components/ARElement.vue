<template>
  <div class="element" ref="element">
    <transition name="fade">
      <div v-if="state.show">
        <slot v-bind:tracked="state.tracked"></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import {
  reactive,
  inject,
  ref,
  onMounted,
  onUnmounted,
} from "vue";
import Session from "../vision/Session";

interface State {
  show: boolean;
  timeoutHandler: number | null;
  tracked: boolean;
}

const state = reactive<State>({
  show: false,
  timeoutHandler: null,
  tracked: false,
});

const session = inject<Session>("session")!;
const props = withDefaults(
  defineProps<{
    id: string | number;
    timeout?: number;
    markerSize?: number;
  }>(),
  { timeout: 1000, markerSize: 50 }
);

const element = ref(null);

onMounted(() => {
  (session as Session).poser.registerElement(
    props.id.toString(),
    element.value!,
    props.markerSize,
    (tracked: boolean) => {
      state.tracked = tracked ?? false;

      if (tracked) {
        state.show = true;
        if (state.timeoutHandler != null) {
          window.clearTimeout(state.timeoutHandler);
          state.timeoutHandler = null;
        }
      } else {
        state.timeoutHandler = window.setTimeout(() => {
          state.show = false;
        }, props.timeout);
      }
    }
  );
});

onUnmounted(() => {
  (session as Session).poser.unregisterElement(props.id.toString());
});
</script>

<style scoped>
.element {
  position: absolute;
  top: 0;
  left: 0;
  transform-style: preserve-3d;
  transition: transform 0.05s;
  transform-origin: 0 0 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
