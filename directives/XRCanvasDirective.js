const XRCanvasDirective = {
  name: 'xr-canvas',
  install(Vue, options) {
    Vue.directive(XRCanvas.name, XRCanvas);
  }
};

export default VueXR;
