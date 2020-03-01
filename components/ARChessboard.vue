<template>
  <img :src="pattern" style="max-width: 100%; max-height: 60vh">
</template>

<script>
  import Vue from "vue";

  import pattern from '../src/Vision/chessboard'

  const ARChessboard = Vue.extend({
    data: function () {
      return {
        pattern: pattern
      }
    }
  });
  export default ARChessboard;
</script>
