import Session from "./vision/Session";

export class VueXRManager {
  private sessions: { [x: string]: any; };

  constructor() {
    this.sessions = {}
  }

  requestSession(name = "default") : any {
    if (!this.sessions[name]) {
      this.sessions[name] = new Session()
    }

    return this.sessions[name]
  }

  removeSession(name = "default") {
    this.sessions[name].pause();
    delete this.sessions[name];
  }

  async check() {
    if (window.isSecureContext) {
      // @ts-ignore
      if (navigator.mediaDevices && window.ImageCapture) {
        const streams = (await navigator.mediaDevices.enumerateDevices()).filter(stream => stream.kind === 'videoinput');

        if (streams.length) {
          return {
            supported: true,
            error: null
          }
        } else {
          return {
            supported: false,
            error: 'No camera is connected.'
          }
        }
      }
      return {
        supported: false,
        error: 'MediaDevices and/or ImageCapture API not supported.'
      };
    } else {
      return {
        supported: false,
        error: 'You are not in a secure connection. Is HTTPS enabled?'
      };
    }
  }
}
