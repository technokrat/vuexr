const DEFAULTS = {
  constraints: {
    audio: false,
    video: {facingMode: 'environment'}
  }
};

export default class XRVideoCamera {

  constructor(videoElement, options) {
    this.videoElement = videoElement;
    this.options = {...DEFAULTS, options};
  }

  async load() {
    let mediaStream = await navigator.mediaDevices.getUserMedia(this.options.constraints);

    this.videoElement.srcObject = mediaStream;
    this.videoElement.onloadedmetadata = function (e) {
      this.videoElement.play();
    };
  }
}
