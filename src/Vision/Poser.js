import cv from '../../vendor/opencv.js';

import {computeProjMat} from "./helpers";

export default class Poser {
  constructor(session) {
    this.session = session;
    this.elements = {}
  };

  registerElement(id, element, transform) {
    this.elements[id] = {element, transform}
  }

  setDetectionTransform(id, rvec, tvec) {
    if (this.elements[id]) {
      const projMatrix = computeProjMat(this.session, this.session.calibration.cameraMatrix, rvec, tvec)
      this.projectTarget(id, Array.from(projMatrix.data64F));
    }
  }

  projectTarget(id, modelViewMatrix) {
    modelViewMatrix = modelViewMatrix.map(element => element.toFixed(5))

    this.elements[id].element.style.transform = `matrix3d(${modelViewMatrix.join(',')})`;
  }


}
