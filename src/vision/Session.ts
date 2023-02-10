import Calibration from "./Calibration";
import Detector from "./Detector";
import CameraFeed from "./CameraFeed";
import Poser from "./Poser";
import MotionEstimator from "./MotionEstimator";
import { ARViewStatus, WorkerReturn, WorkerReturnMessage } from "../types";
import { vec3, vec4 } from "gl-matrix";

export enum SessionState {
  CALIBRATION,
  DETECTION,
}

export enum SessionCallbackType {
  statusChanged,
  motion,
}

interface SessionSetup {
  show: boolean;
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export type Quaternion = [number, number, number, number];

export interface Motion {
  acceleration: vec4;
  velocity: vec3;
  position: vec3;
}

export interface SessionCallbackArgs {
  name: SessionCallbackType;
  status?: ARViewStatus;
  motion?: Motion;
}

type SessionCallback = (args: SessionCallbackArgs) => void;

export default class Session {
  initialized = false;
  workerInitialized = false;
  name: string;
  state: SessionState;
  feed: CameraFeed;
  poser: Poser;
  motion: MotionEstimator;
  calibration: Calibration;
  detector: Detector;
  eventCallback?: SessionCallback;
  focusEventRegistration: () => Promise<void>;
  blurEventRegistration: () => void;
  setup: SessionSetup;
  canvas?: HTMLCanvasElement;
  context2d?: CanvasRenderingContext2D | null;
  worker?: Worker;

  constructor(name = "default") {
    this.initialized = false;
    this.name = name;
    this.state = SessionState.CALIBRATION;
    this.feed = new CameraFeed(this);
    this.poser = new Poser(this);
    this.motion = new MotionEstimator(this);
    this.calibration = new Calibration(this);
    this.detector = new Detector(this);

    this.focusEventRegistration = async () => {
      await this.feed.run();
      this.motion.run();
    };

    this.blurEventRegistration = () => {
      this.feed.stop();
      this.motion.stop();
    };

    this.setup = {
      show: true,
    };

    this.calibration.loadCameraCalibration();
  }

  updateStatus() {
    const status: ARViewStatus = {
      initialized: this.initialized,
      feed: this.feed.feedStatus,
      motion: this.motion.motionStatus,
      calibration: this.calibration.calibrationStatus,
      setup: this.setup,
    };

    if (this.eventCallback) {
      this.eventCallback({ name: SessionCallbackType.statusChanged, status });
    }
  }

  loadSetup(): SessionSetup {
    const setupString = window.localStorage.getItem(`vuexr/${this.name}/setup`);
    if (setupString) {
      return JSON.parse(setupString) as SessionSetup;
    } else {
      return {
        show: true,
      };
    }
  }

  storeSetup() {
    window.localStorage.setItem(
      `vuexr/${this.name}/setup`,
      JSON.stringify(this.setup)
    );
  }

  showSetup(show: boolean) {
    this.setup.show = show;
    this.storeSetup();
    this.updateStatus();
  }

  async init(canvas: HTMLCanvasElement, eventCallback: SessionCallback) {
    this.setup = this.loadSetup();
    this.canvas = canvas;
    this.context2d = this.canvas.getContext("2d", { willReadFrequently: true });
    this.eventCallback = eventCallback;

    if (!this.initialized) {
      await Promise.all([
        this.feed.init(),
        this.motion.init(),
        this.initWorker(),
      ]);

      this.initialized = true;
    }

    this.eventCallback({ name: SessionCallbackType.statusChanged });
  }

  async initWorker() {
    return new Promise<void>((resolve) => {
      this.worker = new Worker(new URL("../worker.ts", import.meta.url), {
        type: "module",
      });

      this.worker.onmessage = (msg) => {
        if (msg.data.operation === WorkerReturn.WORKER_READY) {
          this.initialized = true;
          this.workerInitialized = true;
          resolve();
        } else if (msg.data.operation === WorkerReturn.WORKER_FAILED) {
          this.workerInitialized = true;
          resolve();
        } else {
          this.workerHandler(msg);
        }
      };
    });
  }

  workerHandler(msg: { data: WorkerReturnMessage }) {
    if (msg.data.operation === WorkerReturn.DETECT) {
      this.detector.detectionFinished(msg.data);
    } else if (
      msg.data.operation === WorkerReturn.FIND_CHESSBOARD_CORNERS_CAPTURED
    ) {
      this.calibration.findChessBoardCornersCaptured();
    } else if (
      msg.data.operation === WorkerReturn.FIND_CHESSBOARD_CORNERS_READY
    ) {
      this.calibration.findChessBoardCornersCaptureReady();
    } else if (
      msg.data.operation === WorkerReturn.FIND_CHESSBOARD_CORNERS_NOT_READY
    ) {
      this.calibration.findChessBoardCornersCaptureNotReady();
    } else if (msg.data.operation === WorkerReturn.CALIBRATE) {
      this.calibration.calibrationFinished(msg.data);
    }
  }

  async run() {
    await this.feed.run();
    await this.motion.run();

    window.addEventListener("focus", this.focusEventRegistration);
    window.addEventListener("blur", this.blurEventRegistration);
  }

  pause() {
    window.removeEventListener("focus", this.focusEventRegistration);
    window.removeEventListener("blur", this.blurEventRegistration);

    this.feed.stop();
    this.motion.stop();
  }

  calibrate() {
    this.calibration.calibrate({
      width: this.canvas?.width ?? 0,
      height: this.canvas?.height ?? 0,
    });
    this.state = SessionState.DETECTION;
  }

  resetCalibration() {
    this.calibration.resetCalibrationPoints();
    this.calibration.resetCameraCalibration();

    this.state = SessionState.CALIBRATION;
  }

  process() {
    if (this.initialized) {
      if (this.state === SessionState.CALIBRATION) {
        this.calibration.findChessBoardCorners();
      } else if (this.state === SessionState.DETECTION) {
        this.detector.detect();
      }
    }
  }
}
