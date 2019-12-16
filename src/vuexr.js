import XRView from '../components/XRView.vue';

const VueXR = {
  install(Vue, options) {
    Vue.component(XRView.name, XRView);
  }
};

export default VueXR;

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueXR)
}
