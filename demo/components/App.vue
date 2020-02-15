<template>
<!--  <xr-view>-->
<!--    <div style="background-color: rgba(255,255,255,0.5); backdrop-filter: blur(3px); border-radius: 5px; width: 100px; height: 100px;">Hello VR</div>-->
<!--  </xr-view>-->
  <ar-view>
    <ar-element :id="23">
<!--      <div style="border: none; transform: translateZ(-0px); padding: 10px;-->
<!--    background: rgba(255,255,255,0.9);-->
<!--    border-radius: 10px;">Hello World!</div>-->
        <div style="position: absolute; transform: translateX(-100px) rotateY(-20deg); border: none; padding: 10px;
    background: rgba(255,255,255,0.9);
    border-radius: 10px;">Hello Links</div>
        <div style="position: absolute; transform: translateX(+100px) rotateY(20deg); border: none; padding: 10px;
    background: rgba(255,255,255,0.9);
    border-radius: 10px;">Hello Rechts</div>
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
