import _Vue from "vue";

import ARView from '../components/ARView.vue';
import ARElement from "../components/ARElement.vue";
import Session from "./Vision/Session";

export class VueXR {
  private sessions: { [x: string]: any; };
  static install (Vue: typeof _Vue, options?: any) {
    Vue.component('ar-view', ARView);
    Vue.component('ar-element', ARElement);
    const vuexr = new VueXR();
    Vue.prototype.$vuexr = vuexr
    Object.defineProperties(Vue.prototype, {
      $vuexr: {
        get() {
          return vuexr
        }
      },
    })
  }

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
}

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueXR)
}
