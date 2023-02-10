import { mat4, quat, vec3 } from "gl-matrix";
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
    elements: {
        [key: string]: ElementData;
    };
    views: ViewData[];
    trackedMarkers: string[];
    constructor(session: Session);
    registerView(id: symbol, callback: ViewCallback): void;
    unregisterView(id: symbol): void;
    registerElement(id: string, element: HTMLElement, markerSize: number, callback: ElementCallback): void;
    unregisterElement(id: string): void;
    setMarkers(markers: WorkerMarker[]): void;
    readjustElements(): void;
    projectElement(id: string, modelViewMatrix: number[]): void;
}
export {};
//# sourceMappingURL=Poser.d.ts.map