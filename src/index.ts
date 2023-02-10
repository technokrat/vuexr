import ARView from "./components/ARView.vue";
import ARElement from "./components/ARElement.vue";
import ARChessboard from "./components/ARChessboard.vue";
import { VueXRManager } from "./VueXRManager";

import { App, Plugin } from "vue";

export const VueXR: Plugin = {
  install(app: App) {
    app.component("ArView", ARView);
    app.component("ArElement", ARElement);
    app.component("ArChessboard", ARChessboard);
    const vueXRManager = new VueXRManager();
    app.config.globalProperties.$vuexr = vueXRManager;
    app.provide("vuexr", vueXRManager);
  },
};
