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

  setMarkers(markers) {
    const realWidth = getComputedStyle(this.session.canvas).width.split('px')[0];
    const ratio = realWidth / this.session.canvas.width;

    for (const marker of markers) {
      if (this.elements[marker.id]) {
        const rvec = cv.matFromArray(3,1,cv.CV_64FC1, marker.rvec);
        const tvec = cv.matFromArray(3,1,cv.CV_64FC1, marker.tvec);

        const projMatrix = computeProjMat(ratio, this.session.calibration.cameraMatrix, rvec, tvec);
        this.projectTarget(marker.id, Array.from(projMatrix.data64F));

        rvec.delete();
        tvec.delete();
        projMatrix.delete();
      }
    }
  }

  projectTarget(id, modelViewMatrix) {
    modelViewMatrix = modelViewMatrix.map(element => element.toFixed(5))
    this.elements[id].element.style.transform = `matrix3d(${modelViewMatrix.join(',')})`;
  }


}
