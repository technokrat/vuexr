<template>
  <img alt="Chessboard pattern for camera calibration" :src="pattern" style="max-width: 100%; max-height: 100%">
</template>

<script>
  import { defineComponent } from "vue";
  import pattern from '../vision/chessboard'

  export default defineComponent({
    data: function () {
      return {
        pattern: pattern
      }
    }
  });
</script>
