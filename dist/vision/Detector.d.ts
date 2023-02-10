import { WorkerReturnMessage } from "../types";
import Session from "./Session";
export default class Detector {
    session: Session;
    detectionOngoing: boolean;
    constructor(session: Session);
    detect(highlight?: boolean): void;
    detectionFinished(data: WorkerReturnMessage): void;
}
//# sourceMappingURL=Detector.d.ts.map