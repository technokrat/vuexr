import cv from '../../vendor/opencv.js';

import {computeProjMat} from "./helpers";
import {Matrix} from "mathjs";

export default class Poser {
  constructor(session) {
    this.session = session;
    this.elements = {}
  };

  registerElement(id, element) {
    this.elements[id] = {id, element, lastTransform: null, lastRVec: null, lastTVec: null}
  }

  setMarkers(markers) {
    const realWidth = getComputedStyle(this.session.canvas).width.split('px')[0];
    const ratio = realWidth / this.session.canvas.width;

    for (const marker of markers) {
      if (this.elements[marker.id]) {
        this.elements[marker.id].lastTransform = this.session.xr.getCurrentTransform();
        this.elements[marker.id].lastRVec = marker.rvec;
        this.elements[marker.id].lastTVec = marker.tvec;

        const rvec = cv.matFromArray(3,1,cv.CV_64FC1, marker.rvec);
        const tvec = cv.matFromArray(3,1,cv.CV_64FC1, marker.tvec);

        const cameraMatrix = cv.Mat.eye(4,4,cv.CV_64FC1);

        const projMatrix = computeProjMat(ratio, this.session.calibration.cameraMatrix, rvec, tvec, cameraMatrix);
        this.projectTarget(marker.id, Array.from(projMatrix.data64F));

        rvec.delete();
        tvec.delete();
        cameraMatrix.delete();
        projMatrix.delete();
      }
    }
  }

  readjustElements() {
    const realWidth = getComputedStyle(this.session.canvas).width.split('px')[0];
    const ratio = realWidth / this.session.canvas.width;
    const allElements = Object.keys(this.elements).map(key => this.elements[key]);

    for (const element of allElements) {
      if (element.lastTransform) {
        const oldRVec = cv.matFromArray(3,1,cv.CV_64FC1, element.lastRVec);
        const oldTVec = cv.matFromArray(3,1,cv.CV_64FC1, element.lastTVec);
        const offset = this.session.xr.getOffsetMatrix(element.lastTransform);
        const cameraMatrix = cv.matFromArray(4,4,cv.CV_64FC1, Array.from(offset));
        const transposed = cameraMatrix.t();

        const projMatrix = computeProjMat(ratio, this.session.calibration.cameraMatrix, oldRVec, oldTVec, transposed);
        //this.projectTarget(element.id, Array.from(projMatrix.data64F));

        oldRVec.delete();
        oldTVec.delete();
        cameraMatrix.delete();
        projMatrix.delete();
        transposed.delete();
      }
    }
  }

  projectTarget(id, modelViewMatrix) {
    modelViewMatrix = modelViewMatrix.map(element => element.toFixed(5))
    this.elements[id].element.style.transform = `matrix3d(${modelViewMatrix.join(',')})`;
  }
}
