import ARView from '../components/ARView.vue';
import ARElement from "../components/ARElement.vue";

const VueXR = {
  install(Vue, options) {
    Vue.component(ARView.name, ARView);
    Vue.component(ARElement.name, ARElement);
    Vue.prototype.$vuexr = this;
  }
};

export default VueXR;

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueXR)
}
