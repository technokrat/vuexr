import _Vue from "vue";

import ARView from '../components/ARView.vue';
import ARElement from "../components/ARElement.vue";

export function VueXR(Vue: typeof _Vue, options?: any) {
  Vue.component('ar-view', ARView);
  Vue.component('ar-element', ARElement);
}

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueXR)
}
