<template>
  <img :src="pattern" style="width: 100%;">
</template>

<script>
  import Vue from "vue";

  import pattern from '../vendor/pattern.png'

  const ARChessboard = Vue.extend({
    data: function () {
      return {
        pattern: pattern
      }
    }
  });
  export default ARChessboard;
</script>
