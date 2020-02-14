<template>
<!--  <xr-view>-->
<!--    <div style="background-color: rgba(255,255,255,0.5); backdrop-filter: blur(3px); border-radius: 5px; width: 100px; height: 100px;">Hello VR</div>-->
<!--  </xr-view>-->
  <ar-view>
    <ar-element id="13">
      <span>Hello World</span>
    </ar-element>
  </ar-view>
</template>

<script>
  const App = {
    name: 'app',
  };

  export default App;
</script>

<style>
  html, body {
    padding: 0;
    height: 100%;
  }

  body {
    margin: 0;
  }
</style>
