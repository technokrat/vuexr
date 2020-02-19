# VueXR
VueXR is a Vue plugin that let's you project regular DOM components onto **augmented reality** (AR) markers in real-time.

It is just as easy as:

```html
<ar-view>
  <ar-element :id="23">
    <div class="hello">Hello World!</div>
  </ar-element>
</ar-view>
```

With VueXR, you are able to build a proof-of-concept AR-Prototype in minutes, using your existing 2D web-application.
There is no need for you to dive into complex and hard to understand computer graphics – **just use your web development
skills!**

To achieve such functionality, we use *OpenCV.js*, *CSS-Transforms*, *Sensor API* and *Web Workers API* on a picture
stream from your devices camera. Have a look at our sources or contact me at [mw@technokrat.ch](mailto:mw@technokrat.ch)
or at https://technokrat.ch

### Getting Started

First install the `vuexr` npm package.

```sh
npm install vuexr

# or

yarn add vuexr
```

Then add `vuexr` to your index.ts (or index.ts)

```javascript
import Vue from 'vue';

// Import the VueXR plugin
import VueXR from 'vuexr';
// or const VueXR = require('vuexr');

// Install the VueXR plugin
Vue.use(VueXR);

// Initialize your application
const app = new Vue({
    // …
});
```

Add the following inside your preferred component (e.g. *App.vue*)

```vue
<template>
    <ar-view>
      <ar-element :id="23">
        <div class="hello">Hello World!</div>
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
  .hello {
    position: absolute;
    box-sizing: border-box;
    width: 50px;
    height: 50px;
    background: rgba(255,255,255,0.9);
    padding: 10px;
    font-size: 10px;
  }
</style>
```

You need to copy the [opencv_js.wasm](./vendor/opencv_js.wasm) and [worker.js](./dist/worker.js) file to your static/public
folder (where your deployed *index.html* is located). See the [demo.webpack.config.js](./demo.webpack.config.js) for
inspiration.

You are now ready to test the application with a smartphone. Remember that you have to connect via `HTTPS` or
`localhost` for VueXR to work. Accept the camera permission request.

#### Calibration
For each new device we first need to calibrate the camera (i.e. automatically calculate the focal length), to project our
DOM elements with the correct perspective. Just open [this chessboard pattern](./vendor/pattern.png) on a different
screen, and try to fit all chessboard fields into the camera's view. VueXR will highlight the chessboard's intersection
points. Press the red *Capture Frame* button, and repeat this around eight times for different perspectives. Press the
*Calibrate* button when you are finished. You are now ready to detect the ArUco markers.

## Usage

### General
In general, you only require two new components to use VueXR

* `<ar-view>` is our wrapper around the AR-session. It does initialize all required components for computer vision, camera,
and position tracking. It can contain arbitrarily many `<ar-element>`'s
* `<ar-element>` is the container around the content rendered onto a ArUco marker.
    * The `id` attribute (of type `Number`) is required and assigns a unique ArUco identifier.
    * The `timeout` attribute (of type `Number` in milliseconds, default `1000`) sets the time, a `<ar-element>` vanishes
    after it is not detected by the camera anymore
    * The `markerSize` attribute (of type `Number` in millimeters, default `50`) sets the size of the respective ArUco
    marker, for precise projection.

### Markers
VueXR can detect **6x6** ArUco markers up to decimal ID `250`. The are quite robust, and encode orientation and identity
in one. Use this [generator webpage](http://chev.me/arucogen/) to print out a marker and stick it onto your toaster!

An `<ar-element>`'s origin is based in the middle of the marker. Use absolute positioning or CSS transforms to correctly
align the content.

### Nested Transformations
You might use nested transformations inside your `<ar-element>`'s content, e.g. `transform3d(10px, 20px 30px)`. Ensure to
set the CSS attribute `transform-style` to `preserve-3d` for all nested elements.

### Tracking State & Animations
By default, if a `<ar-element>` times out due to not being tracked anymore, it will fade out and it's content removed from the DOM.
See (https://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components).

If you want to handle things yourself, VueXR offers you a way to check if an `<ar-element>` is tracked from inside your
`<ar-element>`'s content using [Scoped Slots](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots)

Just use the following pattern to access the `tracked` property for a given `<ar-element>`:

```vue
<ar-view>
  <ar-element :id="50" v-slot:="{tracked}">
    <div class="hello" :class="{tracked: tracked}">
      Hello World!
    </div>
  </ar-element>
</ar-view>
```

Of course you are free to assign `tracked` to a sub-components property, use it for conditional rendering, and other
fun stuff (VueXR fully supports the reactive features of Vue).

To animate the content based on the `tracked` state, you are free to use CSS transitions and/or animations. E.g. you could
write

```vue
<style>
  .hello {
    position: absolute;
    background-color: rgba(255,255,255,0.9);
    transition: background-color 0.3s, color 0.3s;
  }

  .hello.tracked {
    background-color: red;
    color: white;
  }
</style>
```

### Sizing
One *millimeter* (*mm*) in real-world matches one *pixel* (*`px`*) in the CSS transformation world.

## Demo
Clone this repository and run

```sh
yarn install
yarn run dev:demo
```

You can now access a demo application of VueXR under `http://localhost:9000`. To see some AR-content point your camera
onto AruCo markers with ID `23` and `50`.

## License
VueXR is licensed under the [*MIT License*](./LICENSE).

VueXR Copyright (c) 2020. Markus Wegmann, Technokrat LLC.

Technokrat LLC and the developers of VueXR are not liable for any damages in relation to the use or installment of VueXR.

## Future Work
* More customizable and user-friendly initialization UI
* Compile OpenCV.js with WebAssembly SIMD support
* Move calibration to web worker
* Support for TypeScript and code cleanup
* Documentation and Webpage (incl. Demo)
* More responsive position tracking
* DOM-Rendering in WebXR API

If you are interested in supporting this project contact me at [mw@technokrat.ch](mailto:mw@technokrat.ch)
