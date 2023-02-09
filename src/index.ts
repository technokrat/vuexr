import ARView from "./components/ARView.vue";
import ARElement from "./components/ARElement.vue";
import ARChessboard from "./components/ARChessboard.vue";
import { VueXRManager } from "./VueXRManager";

import { App, Plugin } from "vue";

export const VueXR: Plugin = {
  install(app: App, options?: any) {
    app.component("ar-view", ARView);
    app.component("ar-element", ARElement);
    app.component("ar-chessboard", ARChessboard);
    const vueXRManager = new VueXRManager();
    app.config.globalProperties.$vuexr = vueXRManager;
    app.provide("vuexr", vueXRManager);
  },
};
