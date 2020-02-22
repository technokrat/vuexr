import Session from "./Session";

export default class SessionManager {
  constructor() {
    this.sessions = {}
  }

  requestSession(name = "default") {
    if (!this.sessions[name]) {
      this.sessions[name] = new Session()
    }

    return this.sessions[name]
  }

  removeSession(name = "default") {
    this.sessions[name].destroy();
    delete this.sessions[name];
  }
}
