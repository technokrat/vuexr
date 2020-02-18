import cv from '../../vendor/opencv.js';
import {computeProjMat} from "./helpers";

export default class Poser {
  constructor(session) {
    this.session = session;
    this.elements = {}
  };

  registerElement(id, element, callback) {
    this.elements[id] = {id, element, lastTransform: null, lastRVec: null, lastTVec: null, callback, tracked: false}
  }

  unregisterElement(id, element) {
    delete this.elements[id]
  }

  setMarkers(markers) {
    const realWidth = getComputedStyle(this.session.canvas).width.split('px')[0];
    const ratio = realWidth / this.session.canvas.width;

    for (const marker of markers) {
      if (this.elements[marker.id]) {
        this.elements[marker.id].lastTransform = this.session.motion.getCurrentTransform();
        this.elements[marker.id].lastRVec = marker.rvec;
        this.elements[marker.id].lastTVec = marker.tvec;
        if (!this.elements[marker.id].tracked) {
          this.elements[marker.id].tracked = true;
          this.elements[marker.id].callback(true)
        }
      }
    }

    const markerIds = markers.map(marker => marker.id.toString());
    const remainingElementIds = Object.keys(this.elements).filter(key => !(markerIds.includes(key)));

    for (const id of remainingElementIds) {
      if (this.elements[id].tracked) {
        this.elements[id].tracked = false;
        this.elements[id].callback(false)
      }
    }
  }

  readjustElements() {
    const realWidth = getComputedStyle(this.session.canvas).width.split('px')[0];
    const ratio = realWidth / this.session.canvas.width;
    const allElements = Object.keys(this.elements).map(key => this.elements[key]);

    for (const element of allElements) {
      if (element.lastTransform) {
        const rvec = cv.matFromArray(3,1,cv.CV_64FC1, element.lastRVec);
        const tvec = cv.matFromArray(3,1,cv.CV_64FC1, element.lastTVec);
        const offset = this.session.motion.getOffsetMatrix(element.lastTransform);
        const cameraMatrix = cv.matFromArray(4,4,cv.CV_64FC1, Array.from(offset));
        const transposed = cameraMatrix.t();

        const projMatrix = computeProjMat(ratio, this.session.calibration.cameraMatrix, rvec, tvec, transposed);
        this.projectElement(element.id, Array.from(projMatrix.data64F));

        rvec.delete();
        tvec.delete();
        cameraMatrix.delete();
        projMatrix.delete();
        transposed.delete();
      }
    }
  }

  projectElement(id, modelViewMatrix) {
    modelViewMatrix = modelViewMatrix.map(el => el.toFixed(5))
    this.elements[id].element.style.transform = `matrix3d(${modelViewMatrix.join(',')})`;
  }
}
