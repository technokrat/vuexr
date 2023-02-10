import { drawVideoFrameToCanvas } from "./helpers";
import Session from "./Session";

interface FeedOptions {
  constraints?: {
    audio?: boolean;
    video?: {
      facingMode?: VideoFacingModeEnum;
    };
  };
}

const DEFAULTS: FeedOptions = {
  constraints: {
    audio: false,
    video: { facingMode: "environment" },
  },
};

interface FeedStatus {
  error?: string;
  available?: MediaDeviceInfo[];
  selected?: string | null;
}

export default class CameraFeed {
  session: Session;
  options: FeedOptions;
  paused = false;
  mediaStream?: MediaStream;
  track?: MediaStreamTrack;
  videoElement: HTMLVideoElement;
  imageCapture?: ImageCapture;
  feedStatus: FeedStatus = {};
  animationFrameRequest?: number;

  constructor(session: Session, options?: FeedOptions) {
    this.session = session;
    this.options = { ...DEFAULTS, ...options };
    this.videoElement = document.createElement("video");
  }

  async init() {
    if (!navigator.mediaDevices || !ImageCapture) {
      this.feedStatus = {
        error: "mediaDevices and/or ImageCapture API not supported!",
      };
    }
  }

  loadCamera() {
    let camera = window.localStorage.getItem(
      `vuexr/${this.session.name}/camera`
    );
    if (camera) {
      camera = JSON.parse(camera);
      return camera;
    } else {
      return null;
    }
  }

  storeCamera() {
    if (this.feedStatus.selected) {
      window.localStorage.setItem(
        `vuexr/${this.session.name}/camera`,
        JSON.stringify(this.feedStatus.selected)
      );
      return true;
    } else {
      return false;
    }
  }

  stop() {
    if (this.mediaStream) {
      if (this.animationFrameRequest !== undefined) {
        window.cancelAnimationFrame(this.animationFrameRequest);
      }
      this.track?.stop();
      this.track = undefined;
      this.mediaStream = undefined;
      this.imageCapture = undefined;
    }
  }

  async selectCamera(id: string) {
    if (this.feedStatus.selected !== id) {
      this.stop();
      this.feedStatus.selected = id;
      this.storeCamera();
      this.session.calibration.resetCalibrationPoints();
      await this.run();

      this.session.updateStatus();
    }
  }

  async listAvailable() {
    if (navigator.mediaDevices && ImageCapture) {
      const streams = await navigator.mediaDevices.enumerateDevices();
      return streams.filter((stream) => stream.kind === "videoinput");
    }

    return [];
  }

  async run() {
    try {
      if (this.feedStatus.selected) {
        this.mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: this.feedStatus.selected },
        });
      } else {
        this.mediaStream = await navigator.mediaDevices.getUserMedia(
          this.options.constraints
        );
      }

      this.track = this.mediaStream.getVideoTracks()[0];
      this.feedStatus.selected = this.track.getSettings().deviceId;
      this.storeCamera();

      const available = await this.listAvailable();
      const selected = this.loadCamera();
      this.feedStatus = {
        available,
        selected: selected ?? undefined,
      };

      this.session.calibration.loadCameraCalibration();

      this.session.updateStatus();

      this.imageCapture = new ImageCapture(this.track); // https://developer.mozilla.org/en-US/docs/Web/API/ImageCapture

      this.videoElement.srcObject = this.mediaStream;

      await new Promise<void>((resolve) => {
        this.videoElement.onloadedmetadata = () => {
          this.videoElement.play();
          if (this.session.canvas) {
            this.session.canvas.width = this.videoElement.videoWidth;
            this.session.canvas.height = this.videoElement.videoHeight;
          }

          this.loop();
          resolve();
        };
      });
    } catch (e) {
      console.log(e);
    }
  }

  async loop() {
    if (this.imageCapture) {
      try {
        const bitmap = await this.imageCapture.grabFrame();
        if (this.session.canvas) {
          drawVideoFrameToCanvas(this.session.canvas, bitmap);
        }
        this.session.process();
      } catch (e) {
        //console.log(e);
      } finally {
        if (!this.paused) {
          this.animationFrameRequest = window.requestAnimationFrame(() => {
            this.loop();
          });
        }
      }
    }
  }
}
