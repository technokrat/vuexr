<template>
  <div class="calibration-assistant">
    <video style="width: 100%; display: none" ref="video"></video>
    <canvas style="width: 100%; opacity: 1.0;" ref="canvas"></canvas>
    <div class="elements" ref="elements">
      <slot></slot>
    </div>
    <div v-if="visionReady" class="calibration-assistant-buttons">
      <button v-if="!calibrated" :disabled="!captureReady" class="capture-image" v-on:click="captureCalibrationPoints">Capture Frame</button>
      <button v-if="!calibrated" :disabled="!captures" v-on:click="calibrate">
        <span v-if="!calibrated">Calibrate</span>
        <span v-else>Recalibrate</span>
      </button>
      <button :disabled="!captures && !calibrated" v-on:click="reset">Reset</button>
      <span v-if="!calibrated" class="hint-text">{{captures}}&nbsp;Captures</span>
      <span v-else class="hint-text">Calibrated</span>
    </div>
    <div v-else class="loadingCV">
      Loading CV&hellip;
    </div>
  </div>
</template>

<script>
  import Session from "../src/Vision/Session";

  const ARView = {
    name: 'ar-view',
    data() {
      return {
        session: null,
        captures: 0,
        calibrated: false,
        captureReady: false,
        visionReady: false,
      };
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
      updateElements() {
        this.$slots.default.forEach(vnode => {
          if (vnode.componentOptions && vnode.componentOptions.tag === 'ar-element') {
            //console.log(vnode)
            this.session.poser.registerElement(
              vnode.componentOptions.propsData.id,
              vnode.elm
            )
          }
        })
      }
    },
    beforeMount() {
      this.session = new Session();
    },
    mounted () {
      this.session.run(this.$refs.video, this.$refs.canvas, (event) => {
        if (event.name === 'calibrationReset') {
          this.calibrated = false
        } else if (event.name === 'calibrationCaptureReset') {
          this.captures = 0;
        } else if (event.name === 'calibrationCalibrated') {
          this.calibrated = true
        } else if (event.name === 'calibrationCaptured') {
          this.captures++
        } else if (event.name === 'calibrationCaptureReady') {
          this.captureReady = true
        } else if (event.name === 'calibrationCaptureNotReady') {
          this.captureReady = false
        } else if (event.name === 'visionInitialized') {
          this.visionReady = true
        }
      });
    }
  };
  export default ARView;
</script>

<style>
  .ball {
    width: 5px;
    height: 5px;
    border-radius: 2.5px;
    position: absolute;
    top: calc(50% - 2.5px);
    left: calc(50% - 2.5px);
    background: red;
  }

  .ball2 {
    width: 5px;
    height: 5px;
    border-radius: 2.5px;
    position: absolute;
    top: calc(50% - 2.5px);
    left: calc(50% - 2.5px);
    background: green;
  }

  .calibration-assistant {
    width: 100%;
    position: relative;
    background: gray;
    overflow: hidden;
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

  .loadingCV {
    position: absolute;
    top: calc(50% - 0.4rem);
    text-align: center;
    width: 100%;
    line-height: 0.8rem;
    font-size: 0.8rem;
    color: white; font-family: sans-serif; margin-left: 10px;
    text-shadow: 0 1px 1px rgba(0,0,0,0.5);
  }

</style>
