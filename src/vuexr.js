import XRCanvasDirective from './directives/XRCanvasDirective.js';

const VueXR = {
    install(Vue, options) {
        Vue.directive(XRCanvasDirective.name, XRCanvasDirective);
    }
};

export default VueXR;

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueXR)
}
