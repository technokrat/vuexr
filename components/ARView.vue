<template>
  <div class="ar-view-wrapper" ref="wrapper">
    <div class="ar-view">
      <canvas class="ar-canvas" ref="canvas"></canvas>
      <div class="elements" ref="elements">
        <slot v-if="this.status && this.status.calibration.calibrated"></slot>
      </div>
    </div>
    <div @click="this.openSetup" class="setup-button">
      ⚙
    </div>
    <div v-if="this.status && this.status.initialized && !this.status.calibration.calibrated" class="controls-container">
      <ARControls :session="this.session" :status="this.status"></ARControls>
    </div>
    <div v-if="this.status && this.status.initialized" class="setup-container">
      <ARSetup v-if="this.status.setup.show" :session="this.session" :status="this.status" @close="this.closeSetup"></ARSetup>
    </div>
    <div v-else class="loading-text">
      Loading&hellip;
    </div>
  </div>
</template>

<script>
  import ARSetup from "./ARSetup.vue";
  import ARControls from "./ARControls.vue";

  import {defineComponent} from "vue";

  export default defineComponent({
    data() {
      return {
        session: null,
        status: null,
      };
    },
    props: {
      name: {
        type: String,
        default: 'default'
      }
    },
    methods: {
      updateElements () {
        this.$slots.default.forEach(vnode => {
          if (vnode.componentOptions && vnode.componentOptions.tag === 'ar-element') {
            this.session.poser.registerElement(
              vnode.componentOptions.propsData.id,
              vnode.elm
            )
          }
        })
      },
      closeSetup () {
        this.session.showSetup(false);
      },
      openSetup () {
        this.session.showSetup(true);
      },
      sessionCallback (event) {
        if (event.name === 'initialized' || event.name === 'statusChanged') {
          this.status = {
            initialized: this.session.initialized,
            feed: this.session.feed.feedStatus,
            motion: this.session.motion.motionStatus,
            worker: this.session.workerStatus,
            calibration: this.session.calibration.calibrationStatus,
            setup: this.session.setup
          }
        }
      },
      resizeCanvas () {
        const aspectRatio = this.$refs.canvas.width / this.$refs.canvas.height;
        const computedStyle = getComputedStyle(this.$refs.wrapper);
        const availableWidth = computedStyle.width.split('px')[0];
        const availableHeight = computedStyle.height.split('px')[0];

        const availableAspectRatio = availableWidth / availableHeight;

        if (aspectRatio >= availableAspectRatio) {
          const width = availableWidth;
          const height = availableWidth / aspectRatio;

          this.$refs.canvas.style.width = `${width}px`;
          this.$refs.canvas.style.height = `${height}px`
        } else {
          const width = availableHeight * aspectRatio;
          const height = availableHeight;

          this.$refs.canvas.style.width = `${width}px`;
          this.$refs.canvas.style.height = `${height}px`
        }
      }
    },
    beforeMount() {
      this.session = this.$vuexr.requestSession(this.name);
    },
    async mounted () {
      await this.session.init(this.$refs.canvas, (event) => {
        this.sessionCallback(event)
      });
      await this.session.run();
      await this.resizeCanvas();

      window.addEventListener('resize', () => {
        this.resizeCanvas();
      })
    },
    destroyed() {
      this.$slots.default.forEach(vnode => {
        if (vnode.componentOptions && vnode.componentOptions.tag === 'ar-element') {
          this.session.poser.unregisterElement(
            vnode.componentOptions.propsData.id
          )
        }
      });

      window.removeEventListener('resize', this.resizeCanvas);

      this.session.pause();
    },
    components: {
      ARSetup,
      ARControls
    }
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

  .ar-canvas {

  }

  .setup-button {
    position: absolute;
    z-index: 2;
    top: 5px;
    right: 5px;
    color: white;
    text-shadow: 0 1px 1px rgba(0,0,0,0.5);
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
    bottom: 0;
    left: 5px;
  }

  .loading-text {
    position: absolute;
    top: calc(50% - 0.8rem);
    text-align: center;
    font-size: 0.8rem;
    line-height: 0.8rem;
    color: white;
    margin-left: 10px;
    text-shadow: 0 1px 1px rgba(0,0,0,0.5);
  }
</style>
