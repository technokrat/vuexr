<template>
  <div class="element">
    <div class="inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  const ARElement = {
    name: 'ar-element',
    props: {
      id: Number,
    }
  };
  export default ARElement;
</script>

<style>
  .element {
    position: absolute;
    box-sizing: border-box;
    top:0;
    left: 0;
  }

  .inner {
    padding: 10px;
    background: rgba(255,255,255,0.5);
    //transform: rotateX(180deg);
    width: fit-content;
    backface-visibility: visible;
    backdrop-filter: ;
  }
</style>
