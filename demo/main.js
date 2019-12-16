import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';

import VueXR from '../src/vuexr';
import App from './App';

///////////////////////
//  Use Vue plugins  //
///////////////////////
Vue.use(VueXR);

const app = new Vue({
  el: '#vuexr-demo-app',
  render: h => h(App),
});

export default app;
