<template>
  <div>
    <ar-view>
      <ar-element :id="23">
        <div class="hello hello1">Hello World!</div>
        <div class="hello hello2">Hello again!</div>
      </ar-element>
      <ar-element :id="50" v-slot:="{tracked}">
        <div class="outer" :class="{tracked: tracked}">
          <div class="inner">
            Other Tag!
          </div>
        </div>
      </ar-element>
    </ar-view>
  </div>
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
    position: absolute;
    box-sizing: border-box;
    width: 50px;
    height: 50px;
    font-size: 10px;
    border: none;
    padding: 10px;
    background: rgba(255,255,255,0.9);
    border-radius: 3px;
    backdrop-filter: blur(10px);
  }

  .hello1 {
    transform: translate3d(-65px, -25px, -10px) rotateY(-20deg);
  }

  .hello2 {
    transform: translate3d(15px, -25px, -10px) rotateY(+20deg);
  }

  .outer {
    position: absolute;
    overflow: hidden;
    box-sizing: border-box;
    width: 0;
    height: 50px;
    font-size: 10px;
    border: none;
    background: rgba(255,255,255,0.9);
    border-radius: 3px;
    transition: width 0.3s;
    float: right;
    backdrop-filter: blur(10px);
  }

  .outer.tracked {
    width: 50px;
  }

  .inner {
    box-sizing: border-box;
    padding: 10px;
    width: 50px;
    height: 50px;
  }


</style>
