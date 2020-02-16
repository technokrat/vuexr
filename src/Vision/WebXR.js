import MotionEstimator from "./MotionEstimator";
import {mat4, quat, vec3} from 'gl-matrix'


export default class WebXR {
  constructor(session) {
    this.session = session;
    this.motion = new MotionEstimator(this);
    this.available = false;
    this.initialized = false;
    this.xrSession = null;
    this.ctx = null;
    this.referenceSpace = null;

    this.currentTransform = null;
  }

  async enterXR() {
    if (navigator.xr) {
      const inlineSupported = await navigator.xr.isSessionSupported('inline')
      if (inlineSupported) {
        if (!this.xrSession) {
          this.xrSession = await navigator.xr.requestSession('inline', {requiredFeatures: ['local']})
          this.ctx = document.createElement("canvas").getContext('webgl');
          this.referenceSpace = await this.xrSession.requestReferenceSpace('local')
          // this.ctx.makeXRCompatible();
          await this.xrSession.updateRenderState({baseLayer: new XRWebGLLayer(this.xrSession, this.ctx)});
          this.xrSession.requestAnimationFrame((timestamp, xrFrame) => this.loop(timestamp, xrFrame));
        }
      }
    } else {
      this.available = false;
      this.initialized = true;
    }
  }

  loop(timestamp, xrFrame) {
    let glLayer = this.xrSession.renderState.baseLayer;
    let pose = xrFrame.getViewerPose(this.referenceSpace);
    if (pose) {
      this.currentTransform = pose.transform;
      this.session.poser.readjustElements();
      //this.ctx.bindFramebuffer(this.ctx.FRAMEBUFFER, glLayer.framebuffer);

      // for (let view of pose.views) {
      //   const viewport = glLayer.getViewport(view);
      //   this.ctx.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
      // }
    }
    // Request the next animation callback
    this.xrSession.requestAnimationFrame((timestamp, xrFrame) => this.loop(timestamp, xrFrame));
  }

  getCurrentTransform () {
    return {
      transform: this.currentTransform,
      position: this.motion.position
    }
  }

  getOffsetMatrix(referenceTransform) {
    // const referenceTransformMat = mat4.fromValues(
    //   referenceTransform.transform.matrix[0],
    //   referenceTransform.transform.matrix[1],
    //   referenceTransform.transform.matrix[2],
    //   referenceTransform.transform.matrix[3],
    //   referenceTransform.transform.matrix[4],
    //   referenceTransform.transform.matrix[5],
    //   referenceTransform.transform.matrix[6],
    //   referenceTransform.transform.matrix[7],
    //   referenceTransform.transform.matrix[8],
    //   referenceTransform.transform.matrix[9],
    //   referenceTransform.transform.matrix[10],
    //   referenceTransform.transform.matrix[11],
    //   referenceTransform.transform.matrix[12],
    //   referenceTransform.transform.matrix[13],
    //   referenceTransform.transform.matrix[14],
    //   referenceTransform.transform.matrix[15],
    // );

    const referenceRotationQuat = quat.fromValues(
      referenceTransform.transform.orientation.x,
      -referenceTransform.transform.orientation.y,
      -referenceTransform.transform.orientation.z,
      referenceTransform.transform.orientation.w);
    const referenceTransformMat = mat4.create();
    mat4.fromQuat(referenceTransformMat, referenceRotationQuat);

    mat4.translate(
      referenceTransformMat,
      referenceTransformMat,
      vec3.fromValues(
        referenceTransform.position.x,
        referenceTransform.position.y,
        referenceTransform.position.z
      )
    );


    // const currentTransformMat = mat4.fromValues(
    //   this.currentTransform.matrix[0],
    //   this.currentTransform.matrix[1],
    //   this.currentTransform.matrix[2],
    //   this.currentTransform.matrix[3],
    //   this.currentTransform.matrix[4],
    //   this.currentTransform.matrix[5],
    //   this.currentTransform.matrix[6],
    //   this.currentTransform.matrix[7],
    //   this.currentTransform.matrix[8],
    //   this.currentTransform.matrix[9],
    //   this.currentTransform.matrix[10],
    //   this.currentTransform.matrix[11],
    //   this.currentTransform.matrix[12],
    //   this.currentTransform.matrix[13],
    //   this.currentTransform.matrix[14],
    //   this.currentTransform.matrix[15],
    // );

    const currentRotationQuat = quat.fromValues(
      this.currentTransform.orientation.x,
      -this.currentTransform.orientation.y,
      -this.currentTransform.orientation.z,
      this.currentTransform.orientation.w);
    const currentTransformMat = mat4.create();
    mat4.fromQuat(currentTransformMat, currentRotationQuat);

    mat4.translate(
      currentTransformMat,
      currentTransformMat,
      vec3.fromValues(
        this.motion.position.x,
        this.motion.position.y,
        this.motion.position.z
      )
    );
    mat4.invert(currentTransformMat, currentTransformMat);

    const differenceMatrix = mat4.create();
    mat4.multiply(differenceMatrix, currentTransformMat, referenceTransformMat);

    return differenceMatrix;
  }
}
