<template>
  <div class="app-body">
    <header>
      <span class="title">Vue<strong>XR</strong></span>
      <span class="links">
      <a href="https://www.npmjs.com/package/vuexr" target="_blank">npm</a>
      <a href="https://github.com/technokrat-llc/vuexr" target="_blank">GitHub</a>
      <a href="https://technokrat.ch" target="_blank">Technokrat</a>
      </span>
    </header>
    <div class="lead">
      <img src="../../assets/vuexr_illustration_website.svg" style="width: 500px; max-width: 100%;"
           alt="Vue XR on a smart toaster.">
      <h1 class="main-title">Vue<strong>XR</strong></h1>
      <h2 class="description">Vue-powered Augmented Reality DOM rendering</h2>
      <p class="action">
        <a class="getting-started action-button" href="https://github.com/technokrat-llc/vuexr#getting-started"
           target="_blank">
          Get Started →
        </a>
      </p>
    </div>
    <div class="demo">
      <div class="selection" v-if="this.step === 'selection'">
        <h1>Demo</h1>
        <p>Open an AR view on one device with a camera, and display the guide on another one (preferably a notebook or
          desktop computer).</p>
        <p><small>Supports Chrome 99+</small></p>
        <div class="actions">
          <a class="open-view action-button" href="" @click.prevent="step = 'view'">Open AR View</a>
          <span class="or">or</span>
          <a class="open-guide action-button" href="" @click.prevent="step = 'calibration'">Display Guide</a>
        </div>
      </div>
      <div class="view" v-else-if="this.step === 'view'">
        <div v-if="supported" class="supported">
          <!-- The magic happens here! -->
          <ar-view>
            <ar-element :id="42" v-slot:="{tracked}">
              <div class="hello">
                <h1 class="title">Vue<strong>XR</strong> says hello!</h1>
                <p>Embed <strong>any</strong> DOM element in augmented reality.</p>
                <div style="position: absolute; bottom: 0; right: 10px;">
                  <p><small>Powered by <img src="../../assets/technokrat_banner.svg"
                                            style="height: 9px; display: inline-block; vertical-align: middle;"
                                            alt="Technokrat Logo"></small></p>
                </div>
              </div>
            </ar-element>
          </ar-view>
          <a class="back-button" href="" @click.prevent="step = 'selection'">Back</a>
        </div>
        <div class="not-supported" v-else>
          <h2>Not supported!</h2>
          <p>Augmented Reality is <strong>not</strong> supported on this device.</p>
          <p v-if="this.supportError">{{ this.supportError }}</p>
          <a class="action-button" href="" @click.prevent="step = 'selection'">Back</a>
        </div>
      </div>
      <div class="calibration" v-else-if="this.step === 'calibration'">
        <h2>Calibration</h2>
        <p>Follow the calibration procedure on your AR device. Use the chessboard pattern below for calibration.</p>
        <a class="back-button action-button" href="" @click.prevent="step = 'selection'">Back</a><a
        class="ready-button action-button" href="" @click.prevent="step = 'detection'">Calibrated</a>
        <div class="chessboard">
          <ar-chessboard style="max-height: 60vh;"/>
        </div>
      </div>
      <div class="detection" v-else-if="this.step === 'detection'">
        <h2>Detection</h2>
        <div class="aruco-wrapper">
          <code>ID 42</code>
          <img src="../../assets/6x6_1000-42.svg">
        </div>
        <a class="action-button" href="" @click.prevent="step = 'calibration'">Back</a>
      </div>
    </div>
    <footer>
      MIT Licensed | Copyright © 2020-present Markus Wegmann, <a href="https://technokrat.ch" target="_blank">Technokrat
      LLC</a>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      supported: false,
      supportError: null,
      step: 'selection'
    }
  },
  methods: {
    toggle() {
      this.show = !this.show;
    }
  },
  mounted() {
    this.$vuexr.check().then(({supported, error}) => {
      this.supported = supported;
      this.supportError = error;
    }).catch(() => {
      this.supported = false;
    })
  }
};
</script>

<style lang="scss">
@import "normalize.css/normalize.css";

:root {
  --blue-darkest: #131C25;
  --blue-light: #169CFC;
  --white: #E3E4E5;
  --grey-light: #919191;
  --yellow: #E3B044;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;;
  font-weight: 400;
  overflow-x: hidden;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.25;
}

ol, p, ul {
  line-height: 1.7;
}

.app-body {
  box-sizing: border-box;
  min-height: 100%;
  color: #333;
  scroll-snap-type: y proximity;
}

header {
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  width: 100%;
  position: fixed;
  padding: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  z-index: 10;
}

header .links {
  float: right;
}

header a {
  text-decoration: none;
  margin: 8px;
  color: #333;
  font-weight: 500;
}

.lead {
  padding: 30px 10px;
  text-align: center;
  max-width: 1000px;
  margin: 0 auto;
}

.lead h1 {
  font-weight: 300;
  font-size: 3rem;
  margin: 1.8rem auto;
}

.lead .description {
  font-weight: 400;
  margin: 1.8rem auto;
  color: rgb(106, 139, 173);
}

.lead .action {
  margin: 1.8rem auto;
}

.action-button {
  display: inline-block;
  font-size: 1.2rem;
  color: #fff;
  background-color: #3eaf7c;
  padding: .8rem 1.6rem;
  border-radius: 4px;
  transition: background-color .1s ease;
  box-sizing: border-box;
  border-bottom: 1px solid #389d70;
  font-weight: 500;
  text-decoration: none;
  line-height: 1.7;
}

.action-button:hover {
  background-color: #4abf8a;
}

.demo {
  background-color: #5c05a5;
  min-height: 30vh;
  transition: height 0.2s;
  scroll-snap-align: center;
}

.demo > .selection {
  padding: 20px 30px;
}

.demo > .selection > h1 {
  color: white;
  margin: 1.8rem auto;
  text-align: center;
}

.demo > .selection > p {
  color: white;
  margin: 1.8rem auto;
  width: 24em;
  max-width: 100%;
  text-align: center;
}

.demo > .selection > .actions {
  margin: 1.8rem auto;
  width: fit-content;
  color: white;
  text-align: center;
}

.demo > .selection > .actions > .action-button {
  margin: 10px 0;
}

.demo > .selection > .actions > .or {
  display: inline-block;
  padding: 0 0.5rem;
}

.demo > .view > .not-supported {
  padding: 20px 30px;
  text-align: center;
}

.demo > .view > .not-supported > p, .demo > .view > .not-supported > h2 {
  margin: 1.8rem auto;
  color: white;
  width: 24em;
  max-width: 100%;
}

.demo > .view > .supported {
  position: relative;
  height: 80vh;
}

.demo > .view > .supported > .back-button {
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(255, 255, 255, 0.8);
  padding: 8px;
  border-radius: 2px;

  text-decoration: none;
  color: #333333;
}

.demo > .calibration {
  padding: 20px 30px;
  text-align: center;
}

.demo > .calibration > p, .demo > .calibration > h2 {
  margin: 1.8rem auto;
  color: white;
  width: 24em;
  max-width: 100%;
}

.demo > .calibration > p, .demo > .calibration > .action-button {
  margin: 1.8rem auto;
}

.demo > .calibration > .ready-button {
  margin-left: 10px;
}

.demo > .detection {
  padding: 20px 30px;
  text-align: center;
}

.demo > .detection > h2 {
  color: white;
  margin: 1.8rem auto;
  text-align: center;
}

.demo > .detection > .aruco-wrapper > code {
  display: block;
  text-align: center;
  margin: 1.8rem 0 0 0;
}

.demo > .detection > .aruco-wrapper {
  padding: 30px;
  background-color: white;
  width: fit-content;
  margin: 1.8rem auto;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
}

.demo > .detection > .action-button {
  margin: 1.8rem auto;
}

.demo > .detection > .aruco-wrapper > img {
  max-width: 100%;
  max-height: 30vh;
  margin: 1.6rem 0;
  display: block;
}

footer {
  padding: 2.5rem;
  border-top: 1px solid #eaecef;
  text-align: center;
  color: #4e6e8e;
}

footer a {
  text-decoration: none;
}

.hello {
  font-size: 9px;
  box-sizing: border-box;
  width: 150px;
  height: 150px;
  border: none;
  padding: 10px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  transform: translate3d(-75px, -75px, 0);
}

.hello > .title {
  margin-top: 10px;
  font-weight: 300;

}

</style>
