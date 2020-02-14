<template>
  <div class="calibration-assistant">
    <video style="width: 100%; display: none;" ref="video"></video>
    <canvas style="width: 100%;" ref="canvas"></canvas>
    <div class="elements" ref="elements">
      <slot></slot>
    </div>
    <div class="calibration-assistant-buttons">
      <button v-if="!calibrated" :disabled="!captureReady" class="capture-image" v-on:click="captureCalibrationPoints">Capture Calibration Frame</button>
      <button v-if="!calibrated" :disabled="!captures" v-on:click="calibrate">
        <span v-if="!calibrated">Calibrate</span>
        <span v-else>Recalibrate</span>
      </button>
      <button :disabled="!captures && !calibrated" v-on:click="reset">Reset</button>
      <span v-if="!calibrated" class="hint-text">{{captures}} Captures</span>
      <span v-else class="hint-text">Calibrated</span>
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
    },
    mounted() {
      this.session = new Session(this.$refs.video, this.$refs.canvas, (event) => {
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
        }
      });

      this.$slots.default.forEach(vnode => {
        if (vnode.componentOptions.tag === 'ar-element') {
          //console.log(vnode)
          this.session.poser.registerElement(
            vnode.componentOptions.propsData.id,
            vnode.elm,
            vnode.componentOptions.propsData.transform
          )
        }
      })

    }
  };
  export default ARView;
</script>

<style>
  .calibration-assistant {
    width: 100%;
    position: relative;
    background: gray;
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
