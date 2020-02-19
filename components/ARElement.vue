<template>
  <div class="element" ref="element">
    <transition name="fade">
      <div v-if="show">
        <slot v-bind:tracked="tracked"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
  import Vue from "vue";

  const ARElement = Vue.extend({
    data () {
      return {
        show: false,
        timeoutHandler: null,
        tracked: false
      }
    },
    props: {
      id: Number,
      timeout: {
        type: Number,
        default: 1000
      },
    },
    mounted () {
      this.$parent.$data.session.poser.registerElement(this.id, this.$refs.element, (tracked) => {
        this.tracked = tracked;

        if (tracked) {
          this.show = true;
          window.clearTimeout(this.timeoutHandler);
          this.timeoutHandler = null
        } else {
          this.timeoutHandler = window.setTimeout(() => {
            this.show = false
          }, this.timeout)
        }
      })
    },
    destroyed () {
      this.$parent.$data.session.poser.unregisterElement(this.id)
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
