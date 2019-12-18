<template>
  <div ref="view"
       style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background-color: #333;">
    <video style="width: 100%;" ref="xrvideo"></video>
    <canvas style="width: 100%;" ref="xrcanvas"></canvas>
    <button v-if="!xrSession" style="position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%)"
            v-on:click="enterXR">Start XR
    </button>
    <div v-if="xrSession" class="target" ref="target">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import {mat4, vec3} from 'gl-matrix'
  import XRVideoCamera from "../src/XRVideoCamera";

  const XRView = {
    name: 'xr-view',
    data() {
      return {
        available: true,
        xrSession: null,
        xrReferenceSpace: null,
        ctx: null,
        view: null,
        dimensions: null,
      };
    },
    methods: {
      projectTarget(matrix) {
        this.$refs.target.style.transform = `matrix3d(${matrix.join(',')})`;
      },

      enterXR() {
        this.getCamera();

        if (navigator.xr) {
          navigator.xr.isSessionSupported('inline').then((isSupported) => {
            if (isSupported) {
              if (!this.$data.xrSession) {
                navigator.xr.requestSession('inline', {optionalFeatures: ['local', 'unbounded']})
                  .then((session) => {
                    this.$data.xrSession = session;

                    const xrSession = this.$data.xrSession;
                    this.$data.ctx = document.createElement("canvas").getContext('webgl');
                    const ctx = this.$data.ctx;
                    xrSession.requestReferenceSpace('local').then((referenceSpace) => {
                      this.$data.xrReferenceSpace = referenceSpace;
                      // }).then(() => {
                      //   ctx.makeXRCompatible();
                    }).then(() => {
                      xrSession.updateRenderState({baseLayer: new XRWebGLLayer(xrSession, ctx)});
                    }).then(() => {
                      xrSession.requestAnimationFrame(this.onDrawFrame);
                    });

                  });
              }
            }
          });
        } else {
          this.$data.available = false;
        }
      },
      drawScene(view) {
        let modelMatrix = mat4.create();
        mat4.identity(modelMatrix);
        mat4.rotate(modelMatrix, modelMatrix, 0.5*Math.PI, vec3.fromValues(1,0,0));
        mat4.translate(modelMatrix, modelMatrix, vec3.fromValues(0, 0, 0));



        //mat4.transpose(modelViewMatrix, modelViewMatrix);
        //mat4.invert(modelViewMatrix, modelViewMatrix);

        let viewMatrix = mat4.fromValues(-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        console.log("Transform");
        console.log(view.transform.inverse.matrix);
        console.log(viewMatrix);
        mat4.multiply(viewMatrix, viewMatrix, view.transform.inverse.matrix);

        console.log(viewMatrix);


        let modelViewMatrix = mat4.create();
        mat4.multiply(modelViewMatrix, viewMatrix, modelMatrix);

        // let projectionMatrix = mat4.create();
        // mat4.frustum(projectionMatrix, -this.$data.dimensions.width / 2, this.$data.dimensions.width / 2, -this.$data.dimensions.height / 2, this.$data.dimensions.height / 2, 1000, 1000000);

        //console.log(modelViewMatrix);

        this.projectTarget(modelViewMatrix);
      },
      onDrawFrame(timestamp, xrFrame) {
        // Do we have an active session?
        if (this.$data.xrSession) {
          const xrSession = this.$data.xrSession;
          let glLayer = xrSession.renderState.baseLayer;
          let pose = xrFrame.getViewerPose(this.$data.xrReferenceSpace);
          if (pose) {
            // Run imaginary 3D engine's simulation to step forward physics, animations, etc.
            //scene.updateScene(timestamp, xrFrame);

            this.$data.ctx.bindFramebuffer(this.$data.ctx.FRAMEBUFFER, glLayer.framebuffer);

            for (let view of pose.views) {
              let viewport = glLayer.getViewport(view);
              this.$data.ctx.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
              this.drawScene(view);
            }
          }
          // Request the next animation callback
          xrSession.requestAnimationFrame(this.onDrawFrame);
        } else {
          // No session available, so render a default mono view.
          //gl.viewport(0, 0, glCanvas.width, glCanvas.height);
          //drawSceneFromDefaultView();

          // Request the next window callback
          window.requestAnimationFrame(onDrawFrame);
        }
      },
    },
    mounted() {
      this.$data.dimensions = {
        width: this.$refs.view.clientWidth,
        height: this.$refs.view.clientHeight,
      };

      this.$data.camera = new XRVideoCamera(this.$refs.xrvideo, this.$refs.xrcanvas, {});
      this.$data.camera.load();
    }
  };
  export default XRView;
</script>

<style>
  .target {
    position: absolute;
    top: 50%;
    left: 50%;
  }
</style>
