import { mat3, mat4, quat, vec3 } from "gl-matrix";
import { computeProjMat } from "./helpers";
import Session from "./Session";
import { WorkerMarker } from "../types";

type ViewCallback = (tracked: string[]) => void;
type ElementCallback = (tracked: boolean) => void;

export interface Transformation {
  orientation: quat;
  position: vec3;
}

interface ViewData {
  id: symbol;
  callback: ViewCallback;
}

interface ElementData {
  id: string;
  element: HTMLElement;
  markerSize?: number;
  callback: ElementCallback;
  tracked: boolean;
  lastRVec: vec3;
  lastTVec: vec3;
  lastRMat: mat4;
  lastTransform?: Transformation;
}

export default class Poser {
  session: Session;
  elements: { [key: string]: ElementData } = {};
  views: ViewData[] = [];
  trackedMarkers: string[] = [];

  constructor(session: Session) {
    this.session = session;
  }

  registerView(id: symbol, callback: ViewCallback) {
    this.views.push({ id, callback });
  }

  unregisterView(id: symbol) {
    this.views = this.views.filter((element) => element.id !== id);
  }

  registerElement(
    id: string,
    element: HTMLElement,
    markerSize: number,
    callback: ElementCallback
  ) {
    this.elements[id] = {
      id,
      element,
      markerSize,
      callback,
      lastRMat: mat4.create(),
      lastRVec: vec3.create(),
      lastTVec: vec3.create(),
      tracked: false,
    };
  }

  unregisterElement(id: string) {
    delete this.elements[id];
  }

  setMarkers(markers: WorkerMarker[]) {
    for (const marker of markers) {
      if (this.elements[marker.id]) {
        if (
          !this.session.motion.motionStatus.acceleration.error &&
          !this.session.motion.motionStatus.gyro.error
        ) {
          this.elements[marker.id].lastTransform =
            this.session.motion.getCurrentTransform();
        } else {
          this.elements[marker.id].lastTransform = {
            orientation: quat.create(),
            position: vec3.create(),
          };
        }
        this.elements[marker.id].lastRVec = marker.rvec;
        this.elements[marker.id].lastTVec = marker.tvec;
        this.elements[marker.id].lastRMat = marker.rmat;
        if (!this.elements[marker.id].tracked) {
          this.elements[marker.id].tracked = true;
          this.elements[marker.id].callback(true);
        }
      }
    }

    const markerIds = markers.map((marker) => marker.id.toString());
    const remainingElementIds = Object.keys(this.elements).filter(
      (key) => !markerIds.includes(key)
    );

    for (const id of remainingElementIds) {
      if (this.elements[id].tracked) {
        this.elements[id].tracked = false;
        this.elements[id].callback(false);
      }
    }

    if (
      this.session.motion.motionStatus.acceleration.error ||
      this.session.motion.motionStatus.gyro.error
    ) {
      this.readjustElements();
    }

    this.trackedMarkers = markerIds;
    this.views.forEach((element) => element.callback(this.trackedMarkers));
  }

  readjustElements() {
    const ratio = (this.session.canvas?.clientWidth ?? 0) / (this.session.canvas?.width ?? 0);
    const allElements = Object.keys(this.elements).map(
      (key) => this.elements[key]
    );

    for (const element of allElements) {
      if (element.lastTransform) {
        const offset = this.session.motion.getOffsetMatrix(
          element.lastTransform
        );
        const projMatrix = computeProjMat(
          ratio,
          this.session.calibration.calibration?.cameraMatrix ?? mat3.create(),
          element.lastRMat,
          element.lastTVec,
          offset
        );
        this.projectElement(element.id, Array.from(projMatrix));
      }
    }
  }

  projectElement(id: string, modelViewMatrix: number[]) {
    const modelViewMatrixWithPrecision = modelViewMatrix.map((el) =>
      el.toFixed(5)
    );
    this.elements[
      id
    ].element.style.transform = `matrix3d(${modelViewMatrixWithPrecision.join(
      ","
    )})`;
  }
}
