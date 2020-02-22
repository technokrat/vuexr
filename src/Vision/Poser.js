import cv from '../../vendor/opencv.js';
import {computeProjMat} from "./helpers";

export default class Poser {
  constructor(session) {
    this.session = session;
    this.elements = {}
  };

  registerElement(id, element, markerSize, callback) {
    this.elements[id] = {
      id,
      element,
      markerSize,
      callback,
      lastTransform: null,
      lastRVec: null,
      lastTVec: null,
      lastRMat: null,
      tracked: false
    }
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
        this.elements[marker.id].lastRMat = marker.rmat;
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
        const offset = this.session.motion.getOffsetMatrix(element.lastTransform);

        const projMatrix = computeProjMat(ratio, this.session.calibration.cameraMatrix, element.lastRMat, element.lastTVec, offset);
        this.projectElement(element.id, Array.from(projMatrix));
      }
    }
  }

  projectElement(id, modelViewMatrix) {
    modelViewMatrix = modelViewMatrix.map(el => el.toFixed(5))
    this.elements[id].element.style.transform = `matrix3d(${modelViewMatrix.join(',')})`;
  }
}
