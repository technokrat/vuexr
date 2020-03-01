<template>
  <main class="app-body">
    <header>
      <a href="https://www.npmjs.com/package/vuexr" target="_blank">npm</a>
      <a href="https://github.com/technokrat-llc/vuexr" target="_blank">GitHub</a>
      <a href="https://technokrat.ch" target="_blank">Technokrat</a>
    </header>
    <div class="lead">
      <img src="../../doc/vuexr_illustration.svg" style="width: 500px; max-width: 100%;">
      <h1>VueXR</h1>
      <p>Vue-powered Augmented Reality DOM rendering</p>
      <a href="https://github.com/technokrat-llc/vuexr#getting-started" target="_blank">Getting Started</a>
    </div>
    <div class="demo">
        <div v-if="this.step === 'selection'">
          <h2>Demo</h2>
          <p>Open a AR view on one device with a camera, and display the guide on another one (preferably a notebook or desktop computer).</p>
          <a href="" @click.prevent="step = 'view'">Open AR view</a> or <a href="" @click.prevent="step = 'calibration'">Display Guide</a>
        </div>
        <div v-else-if="this.step === 'view'">
          <ar-view v-if="supported">
            <ar-element :id="42" v-slot:="{tracked}">
              <div class="hello">
                <h1>VueXR says hello!</h1>
                <p>Embed any reactive Vue component in this floating element.</p>
              </div>
            </ar-element>
          </ar-view>
          <h3 v-else>Augmented Reality is not supported on this device. Do you have a camera?</h3>
        </div>
        <div v-else-if="this.step === 'calibration'">
          <h2>Calibration</h2>
          <p>Follow the calibration procedure on your AR device. Use the chessboard pattern for calibration below.</p>
          <ar-chessboard />
          <a href="" @click.prevent="step = 'selection'">Back</a> <a href="" @click.prevent="step = 'detection'">Ready</a>
        </div>
        <div v-else-if="this.step === 'detection'">
          <h2>Detection</h2>
          <img src="../assets/6x6_1000-42.svg" style="max-width: 100%;">
          <a href="" @click.prevent="step = 'calibration'">Back</a>
        </div>
    </div>
    <footer>
      MIT Licensed | Copyright © 2020-present Markus Wegmann, <a href="https://technokrat.ch" target="_blank">Technokrat LLC</a>
    </footer>
  </main>
</template>

<script>
  import Vue from "vue";

  const App = Vue.extend({
    data () {
      return {
        supported: false,
        step: 'selection'
      }
    },
    methods: {
      toggle () {
        this.show = !this.show;
      }
    },
    mounted () {
      this.$vuexr.supported().then((supported) => {
        this.supported = supported;
      }).catch(() => {
        this.supported = false;
      })
    }
  });

  export default App;
</script>

<style>
  @import "~normalize.css/normalize.css";

  html, body {
    padding: 0;
    height: 100%;
  }

  body {
    margin: 0;
  }

  .app-body {
    min-height: 100%;
  }

  .hello {
    position: absolute;
    box-sizing: border-box;
    width: 50px;
    height: 50px;
    font-size: 10px;
    border: none;
    padding: 10px;
    background: rgba(255,255,255,0.9);
    border-radius: 3px;
    backdrop-filter: blur(10px);
  }

  .hello1 {
    transform: translate3d(-65px, -25px, -10px) rotateY(-20deg);
  }

  .hello2 {
    transform: translate3d(15px, -25px, -10px) rotateY(+20deg);
  }

  .outer {
    position: absolute;
    overflow: hidden;
    box-sizing: border-box;
    width: 0;
    height: 50px;
    font-size: 10px;
    border: none;
    background: rgba(255,255,255,0.9);
    border-radius: 3px;
    transition: width 0.3s;
    float: right;
    backdrop-filter: blur(10px);
  }

  .outer.tracked {
    width: 50px;
  }

  .inner {
    box-sizing: border-box;
    padding: 10px;
    width: 50px;
    height: 50px;
  }
</style>
