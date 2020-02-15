<template>
  <div class="element">
      <slot></slot>
  </div>
</template>

<script>
  const ARElement = {
    name: 'ar-element',
    props: {
      id: Number,
    },
  };
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
</style>
