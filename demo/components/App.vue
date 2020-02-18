<template>
<!--  <xr-view>-->
<!--    <div style="background-color: rgba(255,255,255,0.5); backdrop-filter: blur(3px); border-radius: 5px; width: 100px; height: 100px;">Hello VR</div>-->
<!--  </xr-view>-->
  <ar-view>
    <ar-element :id="23">
<!--      <div style="border: none; transform: translateZ(-0px); padding: 10px;-->
<!--    background: rgba(255,255,255,0.9);-->
<!--    border-radius: 10px;">Hello World!</div>-->
        <div class="hello hello1">Hello World!</div>
        <div class="hello hello2">Hello again!</div>
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

  .hello {
    position: absolute; box-sizing: border-box; width: 50px; height: 50px; font-size: 10px; border: none; padding: 10px; background: rgba(255,255,255,0.9); border-radius: 10px;
  }

  .hello1 {
    transform: translate3d(-65px, -25px, -10px) rotateY(-20deg);
  }

  .hello2 {
    transform: translate3d(15px, -25px, -10px) rotateY(+20deg);
  }
</style>
