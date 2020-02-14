import cv from '../../vendor/opencv.js';

export default class Poser {
  constructor(session) {
    this.session = session;
    this.elements = {}
  };

  registerElement(id, element, transform) {
    this.elements[id] = {element, transform}
  }

  setDetection(id, transform) {

  }
}
