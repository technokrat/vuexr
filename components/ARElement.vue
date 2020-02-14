<template>
  <div class="element">
    <slot></slot>
  </div>
</template>

<script>
  const ARElement = {
    name: 'ar-element',
    props: {
      id: String,
    }
  };
  export default ARElement;
</script>

<style>
  .element {
    position: absolute;
    top:0;
    left: 0;
    background: red;
    width: fit-content;
  }
</style>
