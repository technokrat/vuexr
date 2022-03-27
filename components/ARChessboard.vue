<template>
  <img :src="pattern" style="max-width: 100%; max-height: 60vh">
</template>

<script>
  import { defineComponent } from "vue";
  import pattern from '../src/Vision/chessboard'

  export default defineComponent({
    data: function () {
      return {
        pattern: pattern
      }
    }
  });
</script>
