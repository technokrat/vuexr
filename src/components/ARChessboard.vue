<template>
  <img
    alt="Chessboard pattern for camera calibration"
    :src="pattern"
    style="max-width: 100%; max-height: 100%"
  />
</template>

<script lang="ts" setup>
import pattern from "../vision/Chessboard";
</script>
