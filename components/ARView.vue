<template>
  <div class="ar-view">
    <canvas class="ar-canvas" ref="canvas"></canvas>
    <div class="elements" ref="elements">
      <slot></slot>
    </div>
    <div class="setup-container">
      <ARSetup :session="this.session" :status="this.status"></ARSetup>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import ARSetup from "./ARSetup.vue";

  const ARView = Vue.extend({
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
      sessionCallback (event) {
        if (event.name === 'initialized' || event.name === 'statusChanged') {
          this.status = {
            initialized: this.session.initialized,
            feed: this.session.feed.feedStatus,
            motion: this.session.motion.motionStatus,
            worker: this.session.workerStatus
          }
        }

      }
    },
    beforeMount() {
      this.session = this.$vuexr.requestSession(this.name)
    },
    mounted () {
      this.session.init(this.$refs.canvas, (event) => {
        this.sessionCallback(event)
      }).then(() => {
        this.session.run();
      })
    },
    destroyed() {
      this.$slots.default.forEach(vnode => {
        if (vnode.componentOptions && vnode.componentOptions.tag === 'ar-element') {
          this.session.poser.unregisterElement(
            vnode.componentOptions.propsData.id
          )
        }
      })

      this.session.pause();
    },
    components: {
      ARSetup
    }
  });
  export default ARView;
</script>

<style>
  .ar-view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100%;
    background: #333344;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    overflow: hidden;
  }

  .setup-container {

  }

  .camera-canvas {
    width: 100%;
    opacity: 1.0;
  }

  .calibration-assistant-buttons {
    margin: 10px;
    position: absolute;
    bottom: 0;
  }

  button {
    background-color: rgba(255,255,255,0.8);
    //backdrop-filter: blur(5px);
    border-radius: 2px;
    border: none;
    padding: 5px 10px;
    margin-bottom: 5px;
  }

  button:disabled {
    background-color: rgba(255,255,255,0.8);
  }

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
    color: white; font-family: sans-serif; margin-left: 10px;
    text-shadow: 0 1px 1px rgba(0,0,0,0.5);
  }

</style>
