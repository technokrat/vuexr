<template>
  <div class="setup" ref="element">
  </div>
</template>

<script>
  import Vue from "vue";

  const ARSetup = Vue.extend({
    data () {
      return {
        cameraSupport: false,
        accelerometerSupport: false,
        gyroscopeSupport: false,
        openCVLoaded: false,
        error: false,
      }
    },
    mounted () {
      
    }
  });
  export default ARElement;
</script>

<style>
  .element {
    position: absolute;
    top:0;
    left: 0;
    transform-style : preserve-3d;
    transition: transform 0.1s;
    transform-origin: 0 0 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
